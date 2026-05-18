---
title: mini-vue3 effect
date: 2022-05-07
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

## effect 依赖收集实现

```javascript
import type { Fn, EffectOptions } from "./types/effect";

/**
 * @param {activeEffect}
 * @desc: activeEffect 的存在是为了在 effect 执行的时候触发代理对象的 get set 方法收集当前代理对象的某一个属性对应的副作用函数。 activeEffect 在赋值前也应该记录一下之前的值，等当前的 effect 执行完以后 activeEffect 的值应该是前一个 activeEffect 的值， 不应该直接赋值 null (是考虑 effect(() => effect(() => effect()))) ；怎么做到呢？
 * 1. 找一个中间变量 previousEffect， activeEffect 赋值前记录当前的值 即 previousEffect = activeEffect
 * 2. 此时 activeEffect 赋值为当前 ReactiveEffect 的实例
 * 3. activeEffect 赋值以后，就可以执行 effect, 执行完以后呢， activeEffect就应该恢复为前一个值 即：activeEffect =  previousEffect
 * 4. previousEffect 在第3步执行完后，就设为 null
 */
export let activeEffect: any = undefined;

/**
 * @desc 这里是考虑 副作用函数嵌套副作用函数的时候； 每一次的副作用函数执行前，当前这份副作用的 deps 会有在上一次副作用函数收集的副作用函数集合 Set
 * 副作用函数fn 执行 -> 用到的响应式数据开始收集当前的副作用函数
 * @resolve 每一次副作用函数执行前 要先清理一次本次副作用函数的 deps
 */
const cleanupEffect = (reactiveEffect: ReactiveEffect) => {
  reactiveEffect.deps.forEach((effect: Set<ReactiveEffect>) => {
    effect.delete(reactiveEffect);
  });
  reactiveEffect.deps.length = 0;
};

export class ReactiveEffect {
  deps = [];
  /**
   * @param {previousEffect}
   * @desc: 就是一个简单的中间变量，目的是为了记录 activeEffect 的上一个值
   */
  public previousEffect = null;
  public active = true; // 当前这个effect 是否是激活状态
  fn: Fn;
  scheduler: Fn;
  constructor(fn: Fn, scheduler: Fn) {
    this.fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    try {
      if (!this.active) return this.fn();
      this.previousEffect = activeEffect;
      activeEffect = this;
      cleanupEffect(this);
      return this.fn();
    } finally {
      activeEffect = this.previousEffect;
      this.previousEffect = null;
    }
  }

  stop() {
    if (this.active) {
      this.active = false;

      cleanupEffect(this);
    }
  }
}

export const effect = (fn: Fn, options?: EffectOptions) => {
  const _effect = new ReactiveEffect(fn, options?.scheduler as Fn);
  _effect.run();
  let runner = _effect.run.bind(_effect);

  runner.effect = _effect;

  return runner;
};

const targetWeakMap: WeakMap<object, Map<string | symbol, Set<ReactiveEffect>>> = new WeakMap();

export function trackEffect(depsKey: Set<ReactiveEffect>) {
  if (!activeEffect) return;
  const shouldTrack = !depsKey.has(activeEffect);

  if (shouldTrack) {
    depsKey.add(activeEffect);
    activeEffect.deps.push(depsKey);
  }
}

export function triggerEffect(depsKey: Set<ReactiveEffect> | undefined) {
  depsKey &&
    new Set(depsKey).forEach(
      /**
       * @desc 这里是考虑 响应式对象 set 的时候又触发了 收集依赖且依赖和当前依赖一样 此时 响应式对象的 某一个 key 里面就会有一样的
       * @resolve
       */

      (reactiveEffect) => {
        if (reactiveEffect !== activeEffect) {
          if (reactiveEffect.scheduler) {
            reactiveEffect.scheduler();
          } else {
            reactiveEffect.run();
          }
        }
      },
    );
}

export function track(target: object, key: string | symbol) {
  if (!activeEffect) return;
  console.log("track ==> :", key);
  let depsTarget = targetWeakMap.get(target);
  if (!depsTarget) {
    targetWeakMap.set(target, (depsTarget = new Map()));
  }

  let depsKey = depsTarget.get(key);

  if (!depsKey) {
    depsTarget.set(key, (depsKey = new Set()));
  }
  trackEffect(depsKey);
}

export function trigger(target: object, key: string | symbol) {
  const depsTarget = targetWeakMap.get(target);
  if (!depsTarget) return;
  console.log("trigger ==> :", key);
  const depsKey = depsTarget.get(key);
  triggerEffect(depsKey);
}

```

## effect 依赖收集流程梳理

```javascript
const app = document.querySelector("#app");
const user1 = reactivity({ age: 30，name: 'user1' });
const user2 = reactivity({ age: 40，name: 'user2' });

const sideEffect = () => (app.innerHTML = `我叫做${user1.name},我今年${user1.age}岁了,我叫做${user2.name},我今年${user2.age}岁了`);
effect(sideEffect)



activeEffect.deps = [Set([sideEffect]), Set([sideEffect])];
```

- 1. effect 函数执行，副作用函数 sideEffect 执行，生成 ReactiveEffect 实例并且赋值给 activeEffect；同时， sideEffect 执行时内部使用到响应式数据，会收集使用该响应式数据的副作用函数，数据结构见下图；
- 2. 在响应式数据收集副作用函数时，activeEffect 内部会将当前副作用函数内部使用到的响应式数据的副作用集合(Set([]))收集起来，用来下一次依赖收集时，先做一次清空处理；
- 3. 当 activeEffect 内部的 deps 先执行清空操作时，副作用函数再执行；这样子可以保证每一次收集的副作用函数都是有效的；

```javascript
[
  [
    user1,
    [
      ["name1", Set([sideEffect])],
      ["age1", Set([sideEffect])],
    ],
    user2,
    [
      ["name2", Set([sideEffect])],
      ["age2", Set([sideEffect])],
    ],
  ],
];
```
