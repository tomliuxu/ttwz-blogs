---
title: Ahooks-3.7.8 Dev篇 useWhyDidYouUpdate 源码解读
date: 2022-08-13
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# useWhyDidYouUpdate

帮助开发者排查是哪个属性改变导致了组件的 rerender。

## 使用演示

```ts
import { useWhyDidYouUpdate } from "ahooks";
import React, { useState } from "react";

const Demo: React.FC<{ count: number }> = (props) => {
  const [randomNum, setRandomNum] = useState(Math.random());

  useWhyDidYouUpdate("useWhyDidYouUpdateComponent", { ...props, randomNum });

  return (
    <div>
      <div>
        <span>number: {props.count}</span>
      </div>
      <div>
        randomNum: {randomNum}
        <button onClick={() => setRandomNum(Math.random)} style={{ marginLeft: 8 }}>
          🎲
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Demo count={count} />
      <div>
        <button onClick={() => setCount((prevCount) => prevCount - 1)}>count -</button>
        <button onClick={() => setCount((prevCount) => prevCount + 1)} style={{ marginLeft: 8 }}>
          count +
        </button>
      </div>
      <p style={{ marginTop: 8 }}>Please open the browser console to view the output!</p>
    </div>
  );
};

export default App;
```

## 实现

```ts
const useWhyDidYouUpdate = (compName, props) => {
  const oldPropsRef = useRef(deps);

  // 1. 需要排查的现象是会导致组件 rerender 的 props; 我们倒着想，组件会 rerender 如果组件内部有 useEffect(fn) 必然会重新调用fn，并且我们不能指定依赖项，否则就达不到每次更新都调用 fn 的目的；所以该 hook 需要使用到 useEffect，并且没有依赖项
  // 2. 组件初始渲染的时候，我们需要先记录一下第一次的 props 方便待会组件 rerender 的时候与新的 props 作对比，所以需要用到 useRef
  // 3. 当组件 rerender时我们需要一次对比，比较新的 props 与老的 props 到底哪些 key 发生了变化，然后收集这些 key value
  useEffect(() => {
    if (oldPropsRef.current) {
      const allKeys = Object.keys(...oldPropsRef.current, ...deps);
      let changeKey = {};
      allKeys.forEach((key) => {
        if (!Object.is(oldPropsRef.current[key], deps[key])) {
          changeKey[key] = {
            from: oldPropsRef[key],
            to: deps[key],
          };
        }

        if (Object.keys(changeKey).length) {
          console.log("changeKey ==> :", changeKey);
        }
      });
    }
    oldPropsRef.current = deps;
  });
};
```

## 源码

```ts
import { useEffect, useRef } from "react";

export type IProps = Record<string, any>;

export default function useWhyDidYouUpdate(componentName: string, props: IProps) {
  const prevProps = useRef<IProps>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
}
```
