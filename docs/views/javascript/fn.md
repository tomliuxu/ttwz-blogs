---
title: JavaScript 手写功能函数汇总
date: 2022-07-09
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

## 2. 实现深拷贝

- 存在的缺陷：没有考虑 value 是 Function Map Set 等类型
- 解决缺陷的方法：lodash.js

```javascript
export const deepClone = (target: any, weakMap = new WeakMap()) => {
  if (target == null || typeof target !== "object") {
    return target;
  }

  if (target instanceof "Date") {
    return new Date(target);
  }

  if (target instanceof "RegExp") {
    return new RegExp(target);
  }

  if (weakMap.has(target)) {
    return weakMap.get(target);
  }

  const result = new target.conststructor();
  weakMap.set(target, result);
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = deepClone(target[key], weakMap);
    }
  }
};
```

## 3. 实现 new 关键字

```javascript
export function myNew(fn: () => unknown, ...thisArgs) {
  const result = Object.create(null);
  Reflect.setPrototypeOf(result, fn.prototype);
  const res = fn.call(result, ...thisArgs);
  return typeof res === "object" ? res : result;
}
```

## 4. 实现一个缓存函数

```javascript
function cache(fn) {
  const resultMap = new Map();

  return function (params) {
    if (resultMap.has(params)) {
      return resultMap.get(params);
    }

    const result = fn.apply(this, Array.from(arguments));
    resultMap.set(params, result);

    return result;
  };
}
```

## 5. 实现一个只会执行一次的函数

```javascript
function once(fn) {
  let result = null;
  let isExecuted = false;

  return function () {
    if (isExecuted) return result;
    result = fn.apply(this, Array.from(arguments));
    isExecuted = true;
    return result;
  };
}
```

## 6. 模拟微任务

```js
function mockMicrotask(fn) {
  if (typeof Promise !== "undefined") {
    return Promise.resolve().then(fn);
  }

  if (typeof MutationObserver !== "undefined") {
    const mo = new MutationObserver(fn);
    const textNode = document.createTextNode("0");

    mo.observe(textNode, {
      characterData: true,
    });

    textNode.textContent = "1";
    return;
  }

  setTimeout(fn);
}
```

## 7. 实现单例模式

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function singleton(className) {
  let instance = null;
  return new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args);
      }

      return instance as object;
    },
  });
}

const PersonProxy = singleton(Person);
const person = new PersonProxy("jack", 23);
```

## 8. 树形化数据

- 8-1. 方法一

```javascript
function arrayToTree(routes: Record<string, any>[]) {
  const result = []; // 存放结果集
  const routeMap: Record<string, any> = {};
  for (const routeItem of routes) {
    const { id, pid } = routeItem;

    if (!routeMap[id]) {
      routeMap[id] = {
        children: [],
      };
    }
    routeMap[id] = {
      ...routeItem,
      children: routeMap[id]["children"],
    };

    const routeMapItem = routeMap[id];

    if (!pid) {
      result.push(routeMapItem);
    } else {
      if (!routeMap[pid]) {
        routeMap[pid] = {
          children: [],
        };
      }
      routeMap[pid].children.push(routeMapItem);
    }
  }
  return result;
}
```

- 8-2. 方法二

```javascript
function arrayToTree(routes) {
  const parent = routes.filter((v) => [0, "0"].includes(v.pid));
  const childrens = routes.filter((v) => ![0, "0"].includes(v.pid));

  function fn(parent, children) {
    parent.forEach((p) => {
      children.forEach((c, ci) => {
        if (p.id === c.pid) {
          const _children = JSON.parse(JSON.stringify(children));
          _children.splice(ci, 1);
          fn([c], _children);

          p.children && p.children.length ? p.children.push(c) : (p.children = [c]);
        }
      });
    });
  }

  fn(parent, childrens);
  return parent;
}
```

## 9. 树形数据拍平

- 9-1. 方法一

```javascript
function flatTree(list) {
  return list.reduce((total, item) => {
    total.push(item);
    if (item.children && item.children.length) {
      total.push(...flatTree(item.children));
    }

    return total;
  }, []);
}
```

- 9-2. 方法二

```javascript
function flatTree(treeList) {
  const result = [];

  function fn(list, res) {
    list.forEach((item) => {
      res.push(item);
      if (item.children && item.children.length) {
        fn(item.children, res);
      }
    });
  }

  fn(treeList, result);

  return result;
}
```

## 10. 根据参数从树形结构里面找到某一项

```javascript
function findItemByCode(code, list) {
  let rest = null;
  for (const item of list) {
    if (item.name === code) {
      rest = item;
      return rest;
    }

    if (item.children && item.children.length) {
      rest = findItemByCode(code, item.children);

      if (rest) {
        return rest;
      }
    }
  }

  return rest;
}
```

## 11. 手写 call

```ts
Function.prototype.MyCall = function (ctx, ...args) {
  const _this = [undefined, null].includes(ctx) ? globalThis : Object(ctx);
  const _key = Symbol("key");
  Object.defineProperty(ctx, _key, {
    enumerable: false,
    configurable: true,
    value: _this,
  });
  const _result = ctx[_key](...args);
  Reflect.deleteProperty(_this, _key);
  return _result;
};
```
