---
title: JavaScript 异步代码同步化
date: 2022-11-05
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

```ts
function getData() {
  const res = window.fetch("https://api.oick.cn/lishi/api.php");
  console.log("res ==> :", res);
}

function reuqestAsync(initialFunc) {
  const _fetch = window.fetch;

  const result = {
    data: null,
    error: null,
    status: "pending",
  };

  window.fetch = function (...args) {
    if (result.status === "fulfilled") {
      return result.data;
    }

    if (result.status === "rejected") {
      return result.error;
    }

    const promise = _fetch(...args)
      .then((res) => res.json())
      .then((res) => {
        result.data = res;
        result.status = "fulfilled";
      })
      .catch((error) => {
        result.error = error;
        result.status = "rejected";
      });

    throw promise;
  };

  try {
    initialFunc();
  } catch (error) {
    if (error instanceof Promise) {
      error.then(initialFunc, initialFunc);
    }

    return error;
  }
}

reuqestAsync(getData);
```
