---
title: Ahooks-3.7.8 Effect篇 useUpdate 源码解读
date: 2022-09-17
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# `useUpdate` 会返回一个函数，调用该函数会强制组件重新渲染,类似于 Vue 的 forceUpdate。

## 使用演示

```ts
import React from "react";
import { useUpdate } from "ahooks";

export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <button type='button' onClick={update} style={{ marginTop: 8 }}>
        update
      </button>
    </>
  );
};
```

## 实现

- 利用 useState 的 set 方法调用就重新 render 的特性,保证每次的值都不一样就行.

```ts
function useUpdate1() {
  const [_, setUpdate] = useState({});

  return useMemo(() => () => setUpdate({}), []);
}

function useUpdate2() {
  const [_, setUpdate] = useState({});

  return useCallback(() => setUpdate({}), []);
}
```

## 源码

```ts
import { useCallback, useState } from "react";

const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
```
