---
title: Ahooks-3.7.8 State篇 useDebounce 源码解读
date: 2022-10-29
sidebar: auto
tags:
  - ReactAhooks
categories:
  - ReactAhooks
---

# 用来防抖的 Hook。

## 使用演示

```tsx
import React, { useState } from "react";
import { useDebounce } from "ahooks";

export default () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Typed value'
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
```

## 实现

```tsx
// 整体的思路就是用 lodash 的防抖函数包装一下目标函数，然后需要用 useMemo再包裹一下
import { debounce } from "lodash/debounce";
import { useLatest } from "ahooks";
function useDenounceFn(fn) {
  const fnRef = useLatest(fn);

  const debounced = useMemo(
    () => debounce(() => fnRef.current(), options.wait ?? 1000, options),
    [],
  );

  useUnMounted(() => debounced.cancel());

  return {
    debounced,
    cancel: debounced.cancel,
  };
}

function useDebounce(value, options) {
  const [state, setState] = useState(value);

  const { debounced } = useDenounceFn(() => {
    setState(() => value);
  }, options);

  // value变化的时候需要做一些事，所以需要用到 useEffect 且依赖项是 [value]
  useEffect(() => {
    debounced();
  }, [value]);

  return state;
}
```

## 源码

```ts
import debounce from "lodash/debounce";
import { useMemo } from "react";
import type { DebounceOptions } from "../useDebounce/debounceOptions";
import useLatest from "../useLatest";
import useUnmount from "../useUnmount";
import { isFunction } from "../utils";
import isDev from "../utils/isDev";

type noop = (...args: any[]) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;
```
