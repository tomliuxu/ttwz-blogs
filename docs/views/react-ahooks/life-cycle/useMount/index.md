---
title: Ahooks-3.7.8 LifeCycle篇 useMount 源码解读
date: 2022-08-20
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# useMount

只在组件初始化时执行的 Hook。

## 使用演示

```ts
import { useMount, useBoolean } from "ahooks";

const MyComponent = () => {
  useMount(() => {
    console.info("mount");
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useBoolean(false);

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
// 1. 使用 useEffect(() => {}, []) 模拟出组件组件已渲染时机；
const useMount = (fn: () => void) => {
  useEffect(() => {
    // 2. 此时调用目标函数。注意参数有可能不是一个函数；
    fn?.();
  }, []);
};
```

## 源码

```ts
const useMount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  useEffect(() => {
    fn?.();
  }, []);
};
```
