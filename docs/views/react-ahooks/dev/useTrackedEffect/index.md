---
title: Ahooks-3.7.8 Dev篇 useTrackedEffect 源码解读
date: 2022-08-06
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# useTrackedEffect

追踪是哪个依赖变化触发了 `useEffect` 的执行。

## 使用演示

```ts
import React, { useState } from "react";
import { useTrackedEffect } from "ahooks";

export default () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useTrackedEffect(
    (changes) => {
      console.log("Index of changed dependencies: ", changes);
    },
    [count, count2],
  );

  return (
    <div>
      <p>Please open the browser console to view the output!</p>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>count + 1</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <p>Count2: {count2}</p>
        <button onClick={() => setCount2((c) => c + 1)}>count + 1</button>
      </div>
    </div>
  );
};
```

## 实现

```ts
// 1. 需要排查的现象是会导致组件 rerender 的 props; 我们倒着想，组件会 rerender 如果组件内部有 useEffect(fn) 必然会重新调用fn，并且我们需要指定依赖项，因为就是这些依赖项中的某些key导致组件的 rerender；所以该 hook 需要使用到 useEffect 且依赖项是接收的 deps
// 2. 初次渲染的时候我们需要对比 undefined (存疑1) 与第一次的 deps；组件 rerender 的时候 需要记录本次 deps 与 下一次的 deps 做对比；这样子就能看出来是 deps 中的 哪些 key 导致的 rerender

// 初始渲染 previousDepsRef.current => null   deps -> deps1
// 第二次   previousDepsRef.current => deps1  deps -> deps2
// 第二次   previousDepsRef.current => deps2  deps -> deps3

const useTrackedEffect = (effect, deps) => {
  const previousDepsRef = useRef<T>();

  useEffect(() => {
    // 3. diffTwoDeps的返回值就是一个发生变化的key的索引集合   [0，1] => deps 中第一个参数、第二个参数发生变化了
    const changes = diffTwoDeps(previousDepsRef.current, deps);
    // 4. 获得变化的索引集合以后，需要记录变化前后的 deps
    const previousDeps = previousDepsRef.current; // 4-1. 变化前的 （初始渲染时，就是 undefined）
    previousDepsRef.current = deps; // 4-1. 变化后的（初始渲染时，就是 第一次传进来的 deps）
    return effect(changes, previousDeps, deps);
  }, deps);
};
```

### 存疑 1

初始化渲染的时候也会输出值，如果不想输出变化的 deps 参数索引可以将 previousDepsRef 的默认值设置为 deps

```ts
const previousDepsRef = useRef<T>(deps);
```

## 源码

```ts
import type { DependencyList } from "react";
import { useEffect, useRef } from "react";

type Effect<T extends DependencyList> = (
  changes?: number[],
  previousDeps?: T,
  currentDeps?: T,
) => void | (() => void);

const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
  //Let's do a reference equality check on 2 dependency list.
  //If deps1 is defined, we iterate over deps1 and do comparison on each element with equivalent element from deps2
  //As this func is used only in this hook, we assume 2 deps always have same length.
  return deps1
    ? deps1
        .map((_ele, idx) => (!Object.is(deps1[idx], deps2?.[idx]) ? idx : -1))
        .filter((ele) => ele >= 0)
    : deps2
    ? deps2.map((_ele, idx) => idx)
    : [];
};

const useTrackedEffect = <T extends DependencyList>(effect: Effect<T>, deps?: [...T]) => {
  const previousDepsRef = useRef<T>();

  useEffect(() => {
    const changes = diffTwoDeps(previousDepsRef.current, deps);
    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;
    return effect(changes, previousDeps, deps);
  }, deps);
};

export default useTrackedEffect;
```
