---
title: Ahooks-3.7.8 State篇 useBoolean 源码解读
date: 2022-09-10
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# 管理 boolean 状态的 Hook。

## 使用演示

```ts
import React from "react";
import { useBoolean } from "ahooks";

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <button type='button' onClick={toggle}>
          Toggle
        </button>
        <button type='button' onClick={setFalse} style={{ margin: "0 16px" }}>
          Set false
        </button>
        <button type='button' onClick={setTrue}>
          Set true
        </button>
      </p>
    </div>
  );
};
```

## 实现

```ts
function useBoolean(defaultValue = false) {
  const [state, set] = useToggle(!!defaultValue);
  // 永久缓存 actions
  const actions = useMemo(() => ({
    state,
    useToggle,
    set: (value) => set(value),
    setTrue: () => set(true)
    setFalse: () => set(false)
  }), []);

  return [state, actions];
}
```

## 源码

```ts
import { useMemo } from "react";
import { useToggle } from "ahooks";

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, { toggle, set }] = useToggle(!!defaultValue);

  const actions: Actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v) => set(!!v),
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}
```
