---
title: Ahooks-3.7.8 LifeCycle篇 useUnmountedRef 源码解读
date: 2022-09-03
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# useUnmountedRef

获取当前组件是否已经卸载的 Hook。

## 使用演示

```ts
import { useBoolean, useUnmountedRef } from "ahooks";
import { useEffect } from "react";

const MyComponent = () => {
  const unmountedRef = useUnmountedRef();
  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        console.info("component is alive");
      }
    }, 3000);
  }, []);

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
import { useEffect, useRef } from "react";
// - 1. 使用 useEffect(() => {}, []) 模拟出组件将要已加载、将要卸载的时机；

const useUnmountedRef = () => {
  const unmountedRef = useRef(false); // 2. 已加载时机设置 false
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true; // 2. 将要卸载的时候设置 true
    };
  }, []);
  return unmountedRef;
};
```

## 源码

```ts
import { useEffect, useRef } from "react";

const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};
```
