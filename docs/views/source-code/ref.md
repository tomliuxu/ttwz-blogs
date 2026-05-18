---
title: mini-vue3 ref
date: 2022-05-28
sidebar: auto
tags:
  - SourceCode
categories:
  - SourceCode
---

## ref 实现 待完善

```javascript
import { isObject } from "@myvue/shared";
import { reactivity } from "./reactivity";
import { trackEffect, triggerEffect } from "./effect";
import { ReactiveEffect } from "./effect";

function toReactive(value: any) {
  return isObject(value) ? reactivity(value) : value;
}

export class RefImpl {
  private _value: any;
  private rawValue: any;
  private deps: Set<ReactiveEffect> = new Set();
  private __v_isRef = true;

  constructor(rawValue: any) {
    this._value = toReactive(rawValue);
  }

  get value() {
    trackEffect(this.deps);
    return this._value;
  }

  set value(newValue: any) {
    if (this._value !== newValue) {
      this._value = toReactive(newValue);
      this.rawValue = newValue;
      triggerEffect(this.deps);
    }
  }
}

export function ref(value: any) {
  return new RefImpl(value);
}

```
