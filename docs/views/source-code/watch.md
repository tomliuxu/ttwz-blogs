---
title: mini-vue3 watch
date: 2022-06-04
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

## watch 实现

```javascript
import { ReactiveEffect } from "./effect";
import { isReactive } from "./reactivity";
import { WatchCallback } from "./types/watch";
import { isObject, isFunction } from "@myvue/shared";

function traversal(value: any, set = new Set()) {
  if (!isObject(value)) return value;

  if (set.has(value)) {
    return value;
  }

  set.add(value);

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      traversal(value[key], set);
    }
  }

  return value;
}

export function watch(source: any, callback: WatchCallback) {
  let getter, setter, oldValue: any, newValue, clean;

  if (isReactive(source)) {
    getter = () => traversal(source);
  } else if (isFunction(source)) {
    getter = source;
  } else {
    return;
  }

  const onCleanup = (fn) => {
    clean = fn;
  };

  setter = () => {
    clean && clean();
    newValue = _effect.run();
    callback(oldValue, newValue, onCleanup);
    oldValue = newValue;
  };

  const _effect = new ReactiveEffect(getter, setter);
  oldValue = _effect.run();
}
```
