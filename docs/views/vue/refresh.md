---
title: Vue 无感刷新token
date: 2022-10-22
sidebar: auto
tags:
  - Vue
categories:
  - Vue
---

## 实现思路

- 1. 在 axios 的响应拦截器中判断状态码（暂时约定为 401 为 token 失效）是否是 401；如果是那就说明需要调用 getRefreshToken 接口去获取新的 token，同时应该将当前的这个接口放到队列里面，因为他的响应数据并没有正常返回的。
- 2. 在步骤一的过程中如果有调用新的接口那么此时应该保存到一个队列里面，等 getRefreshToken 接口完毕以后再重新将队列里面的接口调用一遍。
- 3. 基于步骤一、步骤二我们需要一个 flag 来标识是否正在获取刷新 token 中

```ts
import router from "@/router";
import axios from "axios";

enum HttpStatusCode {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

enum RequestType {
  Request = "Request",
  Response = "Response",
}

let isRefreshing = false;
const requestQueen = [];
const refreshTokenUrl = ["/api/auth/refresh/token"];

const request = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  timeout: 10000,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    if (refreshTokenUrl.includes(config.url as string)) {
      return Promise.resolve(config);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        requestQueen.push({
          requestType: RequestType.Request,
          config,
          resolve,
        });
      });
    }

    Object.assign(config.headers, {
      token: sessionStorage.getItem("token") as string,
    });

    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    const { status, data, config } = response;

    if (status === HttpStatusCode.Unauthorized) {
      return new Promise((resolve) => {
        requestQueen.push({
          config,
          requestType: RequestType.Response,
          resolve,
        });

        // 某一刻多个接口同时401只需要执行一次
        if (!isRefreshing) {
          const refreshToken = sessionStorage.getItem("refreshToken") as string;

          if (!isRefreshing) {
            router.replace("/login");
            return Promise.reject(data);
          }
          getRefreshToken(refreshToken);
        }
      });
    }

    if (status === HttpStatusCode.OK) {
      return Promise.resolve(data);
    }

    return Promise.reject(data);
  },
  (err) => {
    return Promise.reject(err);
  },
);

function reset() {
  router.replace("/login");
  isRefreshing = false;
  requestQueen.length = 0;
}

async function getRefreshToken(refreshToken: string) {
  try {
    isRefreshing = true;
    const { token } = await request.get("/api/auth/refresh/token", {
      params: {
        refreshToken,
      },
    });
    // 用 refreshToken 去获取新的 token,如果没有返回值，说明 refreshToken 也过期了，那就去要重新登陆了
    if (!token) {
      reset();
      return;
    }

    sessionStorage.setItem("token", token);
    isRefreshing = false;

    // 这里是不能使用 for、for of循环的，那样子就变成了同步执行 （同步执行：执行一个，下一个等待上一个执行完毕再开始执行）
    !!requestQueen.length &&
      Array.from({ length: requestQueen.length }).forEach(async () => {
        const requestItem = requestQueen.shift();
        if (!requestItem) return;
        const { requestType, resolve, config } = requestItem;

        if (requestType === RequestType.Request) {
          Object.assign(config.headers, {
            token: sessionStorage.getItem("token") as string,
          });
          resolve(config);
        } else {
          resolve(await request(config));
        }
      });
  } catch (error) {
    reset();
  }
}
```
