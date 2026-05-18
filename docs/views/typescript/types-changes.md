---
title: TypeScript - 内置类型体操篇
date: 2022-06-25
sidebar: auto
tags:
  - TypeScript
categories:
  - TypeScript
---

## Pick

1. `Pick<T, U>`用于抽取对象子集，挑选一组属性并组成一个新的类型。

```ts
type TUser = {
  name: string;
  age: number;
  address: string[];
};

type TUserPick = Pick<TUser, "address" | "name">;

type TUserPick = {
  address: string[];
  name: string;
};
```

2. `Pick`实现

- 第一个参数 T，表示要抽取的目标对象。
- 第二个参数 U，具有一个约束：U 一定要来自 T 所有属性字面量的联合类型。

```ts
type MyPick<T, U extends keyof T> = { [K in U]: T[K] };
```

## Partial

1. `Partial<T>`将所有属性映射为可选的。

```ts
type TUser = {
  name: string;
  age: number;
  address: string[];
};

type TUserPartial = Partial<TUser>;

type TUserPartial = {
  name?: string | undefined;
  age?: number | undefined;
  address?: string[] | undefined;
};
```

2. `Partial`实现

- [K in keyof T]遍历 T 上的所有属性
- ?:设置为属性为可选的
- T[K]设置类型为原来的类型

```ts
type MyPartial<T extends object> = { [K in keyof T]?: T[K] | undefined };
```

## Readonly

1. `Readonly<T>`将所有属性映射为只读的。

```ts
type TUser = {
  name: string;
  age: number;
  address: string[];
};

type TUserReadonly = Readonly<TUser>;

type TUserReadonly = {
  readonly name: string;
  readonly age: number;
  readonly address: string[];
};
```

2. `Readonly`实现

- [K in keyof T]遍历 T 上的所有属性
- readonly 设置为属性为只读
- T[K]设置类型为原来的类型

```ts
type MyReadonly<T extends object> = {
  readonly [K in keyof T]: T[K];
};
```

## Exclude

1. `Exclude<T, U>`会返回 联合类型 T 中不包含 联合类型 U 的部分。。

```ts
type TExclude = Exclude<"number" | "string" | "boolean", "number">;

type TExclude = "string" | "boolean";
```

2. `Exclude`实现

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

## Extract

1. `Extract<T, U>`提取联合类型 T 和联合类型 U 的交集。

```ts
type TExtract = Extract<"string" | "boolean", "number" | "string">;

type TExtract = "string";
```

2. `Extract`实现

```ts
type MyExtract<T, U> = T extends U ? T : never;
```

## Omit

1. `Omit<T, U>`从类型 T 中剔除 U 中的所有属性。

```ts
type TUser = {
  name: string;
  age: number;
  address: string[];
};

type TOmit1 = Omit<TUser, "name">;

type TOmit1 = {
  address: string[];
  age: number;
};
```

2. `Omit`实现

```ts
type MyOmit<T, U extends string | number | symbol> = { [K in Exclude<keyof T, U>]: T[K] };
```

## NonNullable

1. `NonNullable<T>`用来过滤类型中的 null 及 undefined 类型。

```ts
type T1 = NonNullable<string | number | undefined>; // string | number
type T2 = NonNullable<string[] | null | undefined>; // string[]
```

2. `NonNullable`实现

```ts
type MyNonNullable<T> = T extends null | undefined ? never : T;
// or
type MyNonNullable<T> = T & {};
```

## Parameters

1. `Parameters<T>`获取函数的参数类型，将每个参数类型放在一个元组中。

```ts
type T1 = Parameters<() => string>; // []

type T2 = Parameters<(arg: string) => void>; // [string]

type T3 = Parameters<(arg1: string, arg2: number) => void>; // [arg1: string, arg2: number]
```

2. `Parameters`实现

- Parameters 首先约束参数 T 必须是个函数类型
- 判断 T 是否是函数类型，如果是则使用 infer P 暂时存一下函数的参数类型，后面的语句直接用 P 即可得到这个类型并返回，否则就返回 never

```ts
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
  ? P
  : never;
```

## ReturnType

1. `ReturnType<T>`获取函数的返回值类型。

```ts
type T0 = ReturnType<() => string>; // string

type T1 = ReturnType<(s: string) => void>; // void
```

2. `ReturnType`实现

- ReturnType 首先约束参数 T 必须是个函数类型
- 判断 T 是否是函数类型，如果是则使用 infer R 暂时存一下函数的返回值类型，后面的语句直接用 R 即可得到这个类型并返回，否则就返回 any

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

## ConstructorParameters

1. `ConstructorParameters<T>`获取构造函数的参数。

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
type T0 = ConstructorParameters<typeof Person>; // [name: string]

type T1 = ConstructorParameters<string>; // never
```

2. `ConstructorParameters`实现

- ConstructorParameters 首先约束参数 T 必须是个可以 new 的构造函数类型
- 如果是则使用 infer R 暂时存一下构造函数的参数类型，后面的语句直接用 P 即可得到这个类型并返回，否则就返回 never。

```ts
type MyConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
```

## 待续...
