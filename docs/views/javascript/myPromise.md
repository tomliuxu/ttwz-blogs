---
title: JavaScript Promise api使用及实现
date: 2022-07-23
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

## Promise 的基本使用

- 1. 模拟一个服务端接口,接口将会在 2s 以后返回指定的数据。

```javascript
function getUserInfo(data: unknown, delay = 2000): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        data ?? {
          userName: "jack",
          age: 20,
          gender: "男",
        },
      );
    }, delay);
  });
}

async function getDataByService(): void {
  try {
    const res = await getUserInfo();
    // res  ==> do something ...
  } catch {
    // error  ==> do error
  }
}

getDataByService();
```

- 2. 执行一个函数(通常是一个服务端接口或者是一个返回 Promise 实例的函数)，当执行成功以后将会返回 函数的结果，执行失败以后将会重新执行 timers 次

```javascript
/**
 *
 * @method entryFn
 * @description 调用一个函数 fn 当fn调用失败以后 将重新调用  timers 次
 * @example entryFn(() => console.log('aaa), 4)
 * @params { Function } fun
 * @params { number } timers
 * @returns Promise<unknown>
 * @version v1.0.0
 * @author liuxu 2022-12-10
 *
 */

function entryFn(fun: Fn, timers: number): Promise<unknown> {
  return new Promise(async (resolve, reject) => {
    const executesTimes = Array.from(new Array(timers)).map((_, i) => i);
    for (const item of executesTimes) {
      try {
        const res = await fun();
        if (res === "SUCCESS") {
          resolve(res);
          return;
        }
      } catch (error) {
        console.log(`函数错误${item + 1}次`);
      }
    }
    reject("error");
  });
}
```

## Promise.all() 的使用说明

- 1. **Promise.all()** 参数类型是 **Promise[]** ，只有数组的**每一个 Promise** 状态都为 **fulfilled** 时才会返回结果集； 否则将抛出一个 **error**。

```javascript
function p1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("p1");
    }, 3000);
  });
}

function p2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("p2");
    }, 1000);
  });
}

async function fn() {
  try {
    // 只有 p2() p1() 的状态都为 fulfilled 才会正常获取到 res 否则会抛出 error
    const res = await Promise.all([p2(), p1()]);
    console.log("res ==> :", res);
  } catch (error) {
    console.log("fn-error ==> :", error);
  }
}

fn();
```

- 2. **Promise.all()** 手写示例

```javascript
function all(promiseList: Promise<unknown>[]) {
  const result: unknown[] = [];

  return new Promise((resolve, reject) => {
    promiseList.forEach((fn, i) => {
      Promise.resolve(fn)
        .then((fnRes) => {
          result.push(fnRes);
          i === promiseList.length - 1 && resolve(result);
        })
        .catch(reject);
    });
  });
}
```

## Promise.allSettled() 的使用说明

- 1. **Promise.allSettled()** 参数类型是 **Promise[]** ，无论数组里**每一个 Promise** 的状态改变为为 **fulfilled** 或者是 **rejected** 都将会返回一个结果集

```javascript
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const status = Math.random();
      status > 0.5
        ? resolve({
            status,
            name: "p1-success",
          })
        : reject({
            status,
            name: "p1-fail",
          });
    }, 3000);
  });
}

function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const status = Math.random();
      status > 0.5
        ? resolve({
            status,
            name: "p2-success",
          })
        : reject({
            status,
            name: "p2-fail",
          });
    }, 1000);
  });
}

async function fn() {
  try {
    // 注意点
    //  1. 如果两个 Promise 状态都是 fulfilled , res 的数据结构是
    //   [
    //     {
    //       status: 'fulfilled',
    //       value:  // value 的值为 p2() 执行以后 resolve() 的值
    //     },
    //      {
    //       status: 'fulfilled',
    //       value:  // // value 的值为 p1() 执行以后 resolve() 的值
    //     }
    //   ]
    // 2. 如果两个 Promise 状态都是 rejected , res 的数据结构是
    //   [
    //     {
    //       status: 'rejected',
    //       reason:  // reason 的值为 p2() 执行以后 rejected() 的值
    //     },
    //     {
    //       status: 'rejected',
    //       reason:  // reason 的值为 p1() 执行以后 rejected() 的值
    //     }
    //   ]
    // 3. 如果两个 Promise 状态一个是 fulfilled 一个是 rejected , res 的数据结构 但在数组中的顺序是不能确定的  以下只是假设 p1() 执行以后状态是fulfilled , p2() 执行以后状态是 rejected 的。
    //   [
    //     {
    //       status: 'fulfilled',
    //       value:  // value 的值为 p1() 执行以后 resolve() 的值
    //     },
    //     {
    //       status: 'rejected',
    //       reason:  // reason 的值为 p2() 执行以后 rejected() 的值
    //     }
    //   ]

    const res = await Promise.allSettled([p2(), p1()]);
    console.log("res ==> :", res);
  } catch (error) {
    console.log("fn-error ==> :", error);
  }
}

fn();
```

- 2. **Promise.allSettled()** 手写示例

```javascript
function allSettled(promiseList: Promise<unknown>[]) {
  const result: unknown[] = [];

  return new Promise((resovle) => {
    promiseList.forEach((fn, i) => {
      Promise.resolve(fn)
        .then((fnRes) => {
          result.push({
            value: fnRes,
            status: "fulfilled",
          });
        })
        .catch((fnErrorRes) => {
          result.push({
            reason: fnErrorRes,
            status: "rejected",
          });
        })
        .finally(() => {
          i === promiseList.length - 1 && resovle(result);
        });
    });
  });
}
```

## Promise.any() 的使用说明

- 1. **Promise.any()** 参数类型是 **Promise[]** ，返回数组中**第一个状态为 fulfilled** 的 Promise 的结果

```javascript
function p1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("p1");
    }, 3000);
  });
}

function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("p2");
    }, 1000);
  });
}

async function fn() {
  try {
    // res 的值为 p1() 执行以后 resolve() 的值
    const res = await Promise.any([p2(), p1()]);
    console.log("res ==> :", res);
  } catch (error) {
    console.log("fn-error ==> :", error);
  }
}

fn();
```

- 2. **Promise.any()** 手写示例

```javascript
function any(promiseList: Promise<unknown>[]) {
  return new Promise((resolve, reject) => {
    promiseList.forEach((fn, i) => {
      Promise.resolve(fn)
        .then(resolve)
        .catch(() => {
          i === promiseList.length - 1 && reject("no data");
        });
    });
  });
}
```

## Promise.race() 的使用说明

- 1. **Promise.race()** 参数类型是 **Promise[]** ，返回数组中**第一个状态改变**(Promise 的状态为 **fulfilled** 或者 **rejected** 都为状态改变)的 Promise 的结果

```javascript
function p1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("p1");
    }, 3000);
  });
}

function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("p2");
    }, 1000);
  });
}

async function fn() {
  try {
    // res 的值为 p2() 执行以后 rejected() 的值
    const res = await Promise.race([p2(), p1()]);
    console.log("res ==> :", res);
  } catch (error) {
    console.log("fn-error ==> :", error);
  }
}

fn();
```

- 2. **Promise.race()** 手写示例

```javascript
function race(promiseList: Promise<unknown>[]) {
  return new Promise((resolve, reject) => {
    promiseList.forEach((fn, i) => {
      Promise.resolve(fn).then(resolve, reject);
    });
  });
}
```

## Promise 简单版实现

```javascript
export type Fn = (t?: any) => unknown;

const PENDING = Symbol("PENDING");
const FULFILLED = Symbol("FULFILLED");
const REJECTED = Symbol("REJECTED");

class MyPromise {
  value: any;
  status: Symbol;
  reason: any;
  onRejectedCallBacks: Fn[] = [];
  onResolvedCallBacks: Fn[] = [];
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value: any) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallBacks.forEach((cb: Fn) => cb());
      }
    };
    const reject = (reason: any) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallBacks.forEach((cb: Fn) => cb);
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled: Fn, onRejected: Fn) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      this.onRejectedCallBacks.push(() => onRejected(this.reason));
      this.onResolvedCallBacks.push(() => onFulfilled(this.value));
    }
  }
}

export default MyPromise;
```
