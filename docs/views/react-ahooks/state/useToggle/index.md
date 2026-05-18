---
title: Ahooks-3.7.8 State篇 useToggle 源码解读
date: 2022-09-30
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# 用于在两个状态值间切换的 Hook。

## 使用演示

- 示例一

```ts
import React from "react";
import { useToggle } from "ahooks";

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();
  const [state, { toggle, set, setLeft, setRight }] = useToggle("Hello", "World");

  return (
    <div>
      <div>
        <p>Effects 1：{`${state}`}</p>
        <p>
          <button type='button' onClick={toggle}>
            Toggle
          </button>
          <button type='button' onClick={setLeft} style={{ margin: "0 8px" }}>
            Toggle False
          </button>
          <button type='button' onClick={setRight}>
            Toggle True
          </button>
        </p>
      </div>
      <div>
        <p>Effects 2：{state}</p>
        <p>
          <button type='button' onClick={toggle}>
            Toggle
          </button>
          <button type='button' onClick={() => set("Hello")} style={{ margin: "0 8px" }}>
            Set Hello
          </button>
          <button type='button' onClick={() => set("World")}>
            Set World
          </button>
          <button type='button' onClick={setLeft} style={{ margin: "0 8px" }}>
            Set Left
          </button>
          <button type='button' onClick={setRight}>
            Set Right
          </button>
        </p>
      </div>
    </div>
  );
};
```

- 示例二

```ts
import React from "react";
import { useToggle } from "ahooks";

export default () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle("Hello", "World");

  return (
    <div>
      <p>Effects 2：{state}</p>
      <p>
        <button type='button' onClick={toggle}>
          Toggle
        </button>
        <button type='button' onClick={() => set("Hello")} style={{ margin: "0 8px" }}>
          Set Hello
        </button>
        <button type='button' onClick={() => set("World")}>
          Set World
        </button>
        <button type='button' onClick={setLeft} style={{ margin: "0 8px" }}>
          Set Left
        </button>
        <button type='button' onClick={setRight}>
          Set Right
        </button>
      </p>
    </div>
  );
};
```

## 实现

```ts
// 第一个是初始值，默认是false
function useToggle(defaultValue = false, reverseValue?: R) {
  const [state, setState] = useState(defaultValue);

  // 为保证返回的对象引用地址不变 使用了 useMemo
  const actions = useMemo(() => {
    const reverseValueOrigin = reverseValue === undefined ? !defaultValue : reverseValue;

    // 在初始值与取反值之间切换
    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    // 设置给定的值
    const set = (value) => setState(value);
    // 设置初始值
    const setLeft = () => setState(defaultValue);
    // 设置取反的值
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
}
```

## 源码

```ts
import { useMemo, useState } from "react";

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
    // useToggle ignore value change
    // }, [defaultValue, reverseValue]);
  }, []);

  return [state, actions];
}

export default useToggle;
```
