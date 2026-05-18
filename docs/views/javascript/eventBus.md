---
title: JavaScript EventBus实现
date: 2022-07-30
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

```javascript
type Func = (rest?: any) => unknown;


class EventBus {
  private _event: Map<string, Set<Func>> = new Map();

  private hasKey(key: string): boolean {
    return this._event.has(key);
  }

  private getValueByKey(key: string): Set<Func> {
    return this._event.get(key) ?? new Set();
  }

  private removeValueByKey(key: string): void {
    this._event.delete(key);
  }

  on(key: string, callback: Func) {
    if (!this.hasKey(key)) {
      this._event.set(key, new Set([callback]));
      return;
    }
    const _callbackSet = this.getValueByKey(key);
    !_callbackSet.has(callback) && _callbackSet.add(callback);
  }

  emit(key: string, ...rest: unknown[]) {
    if (!this.hasKey(key)) {
      throw new Error(`请先注册[${key}]事件`);
    }

    const callbackSet = this.getValueByKey(key);
    callbackSet.forEach((callback: Func) => {
      callback(...rest);
    });
  }

  once(key: string, callback: Func) {
    const cb = (...rest: any[]) => {
      callback(...rest);
      this.off(key, cb);
    };

    this.on(key, cb);
  }

  off(key: string, callback: Func) {
    if (!this.hasKey(key)) return;

    const _callbackSet = this.getValueByKey(key);

    _callbackSet.delete(callback);

    if (!_callbackSet.size) {
      this.removeValueByKey(key);
    }
  }

  clear() {
    this._event.forEach((v) => {
      v.clear();
    });
    this._event.clear();
  }
}

export default () => {
  return new EventBus();
};

```
