---
title: mini-zustand 实现 zustand 核心
date: 2022-10-09
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

## 基本使用

- 更多用法请查看[官方文档](https://github.com/pmndrs/zustand)
- 安装 zustand

```ts
pnpm add zustand
```

- 创建一个 countStore

```tsx
const useCountStore = create((set, get) => ({
  count: 0,
  addCount: () => set((state) => ({ count: state.count + 1 })), // 设置 count
  getAsycCount: async () => {
    const count = get().count; // 获取 count

    set((state) => ({ count: state.count + 10 })); // 同步更新 count

    const count = await Promise.resove(100);

    set((state) => ({ count })); // 异步更新 count
  },
}));
```

- 组件中使用 countStore

```tsx
// 第二种使用方式
import { useShallow } from "zustand/react/shallow";

function Count() {
  // 第一种使用方式
  const count = useCountStore((state) => state.count);
  const addCount = useCountStore((state) => state.addCount);
  // 第二种使用方式
  const { count, addCount } = useCountStore(
    useShallow((state) => ({
      count: state.count,
      addCount: state.addCount,
    })),
  );

  return (
    <div className="count">
      <h1>count: {count}</h1>
      <button onClick={addCount}>addCount</button>
    </div>
  );
}
```

## 实现

- 整体的实现思路就是 `发布订阅` 模式。

```tsx
import { useSyncExternalState } from "react";

const createStore = (createState) => {
  let state;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;

    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);

      listeners.forEach((listener) => {
        listener(state, previousState);
      });
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  const api = {
    setState,
    getState,
    subscribe,
    destroy,
  };

  state = createState(setState, getState, api);

  return api;
};

const useStore = (api, selector = api.getState) => {
  const slice = useSyncExternalState(api.subscribe, selector);

  return slice;
};

const create = (createState) => {
  const api = createStore(createState);

  const useBoundStore = (selector, equalityFn) => {
    return useStore(api, selector);
  };

  Object.assign(useBoundStore, api);

  return useBoundStore;
};

export default create;
```

## zustand 中间件

- 1. create 函数的`入参`是一个函数 `selector`，selector 函数将会被 `zustand` 调用，并且传递`三个参数` set get api。
- 2. 我们写一个函数 myPlugin 只要`保证出参`符合 zustand 的`入参`不就可以在 myPlugin 中做自己事了嘛。

```tsx
const useCountStore = create((set, get) => ());

const myPlugin = (selector) => {
  return (set, get, api) => {
    const setState = api.setState;

    // 这里的 setState 函数 将会是 selector 函数的第一个参数；
    // selector 接受两个参数 数据源 state  replace
    api.setState = (newState, replace) => setState(newState, replace);

    return selector(api.setState, get, api);
  };
};

```

- 3. 使用自己的插件 就这么简单

```tsx
const useCountStore = create(myPlugin((set, get) => ()));
```
