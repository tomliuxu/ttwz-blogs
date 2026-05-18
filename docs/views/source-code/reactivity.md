---
title: mini-vue3 reactivity
date: 2022-05-14
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

## reactivity 实现

```javascript
import { isObject } from "@myvue/shared";

import { activeEffect, track, trigger } from "./effect";

const reactivityMap = new WeakMap();
enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

export function isReactive(obj: unknown) {
  return !!(obj && obj[ReactiveFlags.IS_REACTIVE]);
}
export const reactivity = (object: any) => {
  // 情况1. 不是 object 类型就什么也不做
  if (!isObject(object)) {
    console.log("obj不是 Object类型 ==> :");
    return;
  }
  /**
   * @desc 这里是考虑当初传入的对象是代理过的对象 情况下
   * @resolve 第一次执行 object[ReactiveFlags.IS_REACTIVE] 这个取值操作时 因为此时对象不是代理过的，那就需要去代理，就正常返回一个代理对象；如果是代理过的对象，执行 object[ReactiveFlags.IS_REACTIVE] 时 就会会触发 get 方法 ，反过来说 能触发 get 方法说明是代理过的，那就直接返回
   */
  if (object[ReactiveFlags.IS_REACTIVE]) {
    return object;
  }

  /**
   * @desc 这里是考虑当初传入的对象 obj 是已经代理过 但是现在又想在代理一次
   * @resolve 不用代理 直接返回他的代理对象
   */
  const objectProxy = reactivityMap.get(object);
  if (objectProxy) {
    return objectProxy;
  }

  const proxy = new Proxy(object as Object, {
    get(target, key, reciver) {
      if (key === ReactiveFlags.IS_REACTIVE) return true;

      track(target, key);
      const res: unknown = Reflect.get(target, key, reciver);

      if (isObject(res)) return reactivity(res);

      return res;
    },
    set(target, key, newValue, reciver) {
      const oldVal = (target as Record<string | symbol, any>)[key];
      const result = Reflect.set(target, key, newValue, reciver);

      if (oldVal !== newValue) {
        trigger(target, key);
      }

      return result;
    },
  });

  reactivityMap.set(object, proxy);
  return proxy;
};

```
