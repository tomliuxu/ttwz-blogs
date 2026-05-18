---
title: JavaScript 常用遍历方法实现
date: 2022-07-02
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

## 1. 实现 Array.forEach

```javascript
function forEach(fn, argsThis = window) {
  const _this = this;

  for (let i = 0; i < _this.length; i++) {
    fn.call(argsThis, _this[i], i, _this);
  }
}
```

## 2. 实现 Array.map

```javascript
function map(cb, argsThis = window) {
  const result = [];
  const _this = this;

  for (let i = 0; i < _this.length; i++) {
    const itemResult = cb.call(argsThis, deepClone(_this[i]), i, deepClone(_this));

    result.push(itemResult);
  }

  return result;
}
```

## 3. 实现 Array.filter

```javascript
function filter(cb, argsThis = window) {
  const result = [];
  const _this = this;

  for (let i = 0; i < _this.length; i++) {
    const itemResult = cb.call(argsThis, _this[i], i, _this);
    itemResult && result.push(deepClone(_this[i]));
  }

  return result;
}
```

## 4. 实现 Array.some

```javascript
function some(cb, argsThis = window) {
  const _this = this;

  for (let i = 0; i < _this.length; i++) {
    const itemStatus = cb.call(argsThis, _this[i], i, _this);

    if (itemStatus) {
      return true;
    }
  }

  return false;
}
```

## 5. 实现 Array.every

```javascript
function every(cb, argsThis = window) {
  const _this = this;
  const length = this.length;

  for (let i = 0; i < length; i++) {
    const itemStatus = cb.call(argsThis, _this[i], i, _this);

    if (!itemStatus) {
      return false;
    }
  }

  return true;
}
```
