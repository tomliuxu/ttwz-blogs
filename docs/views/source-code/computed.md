---
title: mini-vue3 computed
date: 2022-05-21
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

## computed 实现

```javascript
import { isObject } from "@myvue/shared";
import { Fn, Getter, Setter, GetterOrOptions, GetterOrOption } from "./types/effect";
import { ReactiveEffect, trackEffect, triggerEffect } from "./effect";

class ComputedRefImpl {
  private getter: Getter;
  private setter: Setter;
  private _effect: ReactiveEffect;
  private _isDirty = true;
  private _dep = new Set<ReactiveEffect>();
  private __v_isRef = true;
  private __v_isReadonly = true;
  private _value: any;

  constructor(getter: Getter, setter: Setter) {
    this.getter = getter;
    this.setter = setter;

    this._effect = new ReactiveEffect(getter, () => {
      // 依赖的响应式数据变化了 会走到这里
      if (!this._isDirty) {
        this._isDirty = true;

        triggerEffect(this._dep);
      }
    });
  }

  get value() {
    trackEffect(this._dep);

    if (this._isDirty) {
      this._isDirty = false;
      this._value = this._effect.run();
    }

    return this._value;
  }

  set value(newValue: any) {
    this.setter(newValue);
  }
}

export function computed(getterOrOptions: GetterOrOptions) {
  let getter, setter;
  const isObj = isObject(getterOrOptions);

  if (isObj) {
    const { get, set } = getterOrOptions as GetterOrOption;
    getter = get as Getter;
    setter = set;
  } else {
    getter = getterOrOptions as Getter;
    setter = () => console.log("no setter");
  }

  return new ComputedRefImpl(getter, setter);
}

```
