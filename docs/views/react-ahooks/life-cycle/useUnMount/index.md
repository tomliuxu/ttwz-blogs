---
title: Ahooks-3.7.8 LifeCycle篇 useUnMount 源码解读
date: 2022-08-27
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# useUnMount

只在组件卸载时执行的 Hook。

## 使用演示

```ts
import { useBoolean, useUnmount } from "ahooks";

const MyComponent = () => {
  useUnmount(() => {
    console.info("unmount");
  });

  return <p>Hello World!</p>;
};

export default () => {
  const [state, { toggle }] = useBoolean(true);

  return (
    <>
      <button type='button' onClick={toggle}>
        {state ? "unmount" : "mount"}
      </button>
      {state && <MyComponent />}
    </>
  );
};
```

## 实现

```ts
const useUnmount = (fn: () => void) => {
  // 1. 使用 useEffect 模拟出组件将要卸载的时机；
  // useEffect(() => () => {
  // 卸载时执行的函数 fn
  // }, []);

  const fnRef = useLatest(fn); // 2. useLatest(fn) 可以保证 fn 的地址永远是最新的，有可能在组件卸载前，fn 可能已经更新了很多次

  useEffect(
    () => () => {
      fnRef.current(); // 3. 此时调用目标函数；
    },
    [],
  );
};
```

## 源码

```ts
const useUnmount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};
```
