---
title: JavaScript localStorage 封装
date: 2021-09-11
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

## 单页面监听 localStorage 变动

- 方法 1：重写 localStorage.setItem()方法

  ```javascript
  const oldSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function (key, newValue) {
    if (key === "你要监听的key") {
      // do something
    }
    oldSetItem(key, newValue);
  };
  ```

- 方法 2：封装原生 localStorage 的 api,生成自己的自定义功能
  ```javascript
  var myStorage = {
    setItem(key, val, ...rest){
      // do something
      window.localStorage.setItem(key,val)
    }
    getItem(key,..rest){
      // do something
      return window.localStorage. getItem(key)
    }
    // ...其他方法
  }
  export default myStorage
  ```
- 方法 3：监听 localStorage 时间
  ```javascript
  // 重写setItem方法
  const oldSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function (key, newValue) {
    var setItemEvent = new Event("setItemEvent");
    setItemEvent.key = key;
    setItemEvent.newValue = newValue;
    window.dispatchEvent(setItemEvent);
    oldSetItem.apply(this, arguments);
  };
  // 添加监听事件
  window.addEventListener("setItemEvent", function ({ key, newValue }) {
    // do something   key,newValue
  });
  ```

## 不同页面监听 localStorage 变动

```javascript
window.addEventListener("storage", function (e) {
  if (e.key === "你要监听的key") {
    // do something
    console.log(e.newValue);
  }
});
```

## localStorage 封装

```javascript
import CryptoJS from "crypto-js";

/**
 *
 * @method encrypts
 * @description 加密数据
 * @example encrypts(data)
 * @params { unknown } data
 * @params { string } key = '1234567890000000'
 * @params { string } iv = '1234567890000000'
 * @returns boolean
 * @version v1.0.0
 * @author liuxu 2022-12-07
 *
 */

export function encrypts(
  data: string | object,
  key = "1234567890000000",
  iv = "1234567890000000",
): string {
  const string = JSON.stringify(data);
  return CryptoJS.AES.encrypt(string, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString();
}

/**
 *
 * @method decrypts
 * @description 解密数据
 * @example decrypts(data)
 * @params { unknown } data
 * @params { string } key = '1234567890000000'
 * @params { string } iv = '1234567890000000'
 * @returns boolean
 * @version v1.0.0
 * @author liuxu 2022-12-07
 *
 */

export function decrypts(data: string, key = "1234567890000000", iv = "1234567890000000"): string {
  return JSON.parse(
    CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8),
  );
}

interface Options {
  expire: number;
  once?: boolean;
}

class Storage {
  private is(data: unknown, type: string) {
    return Object.prototype.toString.call(data) === `[object ${type}]`;
  }

  private toString(data: unknown) {
    if (!data) return "";
    return window.JSON.stringify(data);
  }

  private toParse(data: string | null) {
    if (!data) return "";
    return window.JSON.parse(data);
  }

  public set = (key: string, value: any, options = {} as Options) => {
    const params = {
      value,
      options: {
        expire: options.expire ?? 1000 * 10,
        once: options.once ?? false,
      },
      stamp: Date.now(),
    };
    window.localStorage.setItem(`__storage_${key}`, encrypts(this.toString(params)));
  };

  public remove = (key: string) => {
    window.localStorage.removeItem(`__storage_${key}`);
  };

  public get = (key: string) => {
    const keyItem = window.localStorage.getItem(`__storage_${key}`);
    if (!keyItem) return null;

    const {
      value,
      options: { expire },
      stamp,
    } = this.toParse(decrypts(keyItem));

    const isExpired = Date.now() - stamp > expire;

    if (isExpired) {
      this.remove(key);
      return new Error(`__storage_${key} 值已过期，将自动删除`);
    }
    return value;
  };
}

export default () => new Storage();
```

## 参考链接

- [localStorage 单页面及不同页面监听变动](https://blog.csdn.net/qq_42076140/article/details/80307326)
- [vue 怎么监听 localStorage 值得变化](https://segmentfault.com/q/1010000015906159)
- [vuex 持久化插件](https://github.com/robinvdvleuten/vuex-persistedstate)
