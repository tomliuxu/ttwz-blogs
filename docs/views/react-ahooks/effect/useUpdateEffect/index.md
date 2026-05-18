---
title: Ahooks-3.7.8 Effect 篇 useUpdateEffect 源码解读
date: 2022-09-24
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# `useUpdateEffect` 用法等同于 `useEffect`，但是会忽略首次执行，只在依赖更新时执行。

## 使用演示

```ts
import React, { useEffect, useState } from "react";
import { useUpdateEffect } from "ahooks";

export default () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount((c) => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <button type='button' onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
```

## 实现

- 需要忽略首次执行,那就要有一个 flag 来记录是否是首次渲染;
- 第一次渲染的时候判断一下 flag 是否是 false; 如果是,把 flag 置为 false,其他什么也别做;如果不是就执行对应的逻辑;
- 组件销毁的时候需要重置 flag 为 flase

```ts
function useUpdateEffect(effect, deps) {
  const isFirstRender = useRef(true);

  useEffect(() => () => (isFirstRender.current = true), []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return effect();
    }
  }, deps);
}
```

## 源码

```ts
import { useRef } from "react";
import type { useEffect, useLayoutEffect } from "react";

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
  (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    // for react-refresh
    hook(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };

export default createUpdateEffect(useEffect);
```
