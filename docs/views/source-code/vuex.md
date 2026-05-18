---
title: mini-vuex 实现一个简单版的vuex
date: 2022-06-11
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

- index.ts

```javascript
import { inject } from "vue";
import Store from "./store";

export const defaultStoreKey = "store";

/**
 *
 * @description
 * @param options
 * @returns
 */
function createStore(options: any) {
  return new Store(options);
}

function useStore(storeKey = defaultStoreKey) {
  return inject(storeKey);
}

export { createStore, useStore };
```

- store.ts

```javascript
import { App, reactive } from "vue";
import { State, Getters } from "./types";
import { defaultStoreKey } from "./cosntant";

export function forEachObject(obj: Record<string, any>, cb: Fn) {
  Reflect.ownKeys(obj).forEach((key: string) => cb(key, obj[key]));
}

class Store {
  private _state?: State;
  private _getters?: Getters = Object.create(null);
  private _mutations? = Object.create(null);
  private _actions? = Object.create(null);

  constructor(options: any) {
    const store = this;
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options;
    store._state = reactive({ data: state });

    // getters
    forEachObject(getters, (key, getter) => {
      Object.defineProperty(store._getters, key, {
        get() {
          return getter(store.state);
        },
      });
    });

    // mutations
    forEachObject(mutations, (key, mutation) => {
      store._mutations[key] = (payload: unknown) => {
        mutation.call(store, store.state, payload);
      };
    });

    // actions
    forEachObject(actions, (key, action) => {
      store._actions[key] = (payload: unknown) => {
        action.call(store, store, payload);
      };
    });
  }

  get state() {
    return this._state?.data;
  }

  install(app: App, storeKey = defaultStoreKey) {
    app.provide(storeKey, this);
    app.config.globalProperties.$store = this;
  }

  commit = (type: string, payload: unknown) => {
    this._mutations[type](payload);
  };

  dispatch = (type: string, payload: unknown) => {
    this._actions[type](payload);
  };
}

export default Store;

```
