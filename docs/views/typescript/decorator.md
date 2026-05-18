---
title: TypeScript - 装饰器篇
date: 2022-07-16
sidebar: auto
tags:
  - TypeScript
categories:
  - TypeScript
---

## 1. 环境配置

因为在 TypeScript 中装饰器还是一项`实验性特性`，因此`默认`是`关闭`的，需要启用的话需要在命令行或 tsconfig.json 里启用 `experimentalDecorators`。

```ts
 {
    "compilerOptions": {
      "experimentalDecorators": true
    }
  }
```

## 2. 什么是装饰器

装饰器本质上是一个独立的函数，它可以对类、方法、访问器、属性或参数进行修饰，且一个装饰器可以装饰多个对象，去掉装饰器后被装饰对象依然可以正常的使用。

## 3. 装饰器的声明方式与种类

- 3.1 一般方式

```ts
function Log(...args: any[]) {}

@Log
class Person {}
```

- 3.2 工厂方式

```ts
function Log(customParameter: any) {
  return function (...args: any[]) {};
}

@Log("hello world")
class Person {}
```

- 3.3 `一般方式`与`工厂方式`声明的`区别`在`是否需要向装饰器函数传递参数`
- 3.4 装饰器的写法就是 @ + 方法名字 （方法名字建议使用大驼峰）
- 3.5 装饰器的种类：`类装饰器`、`属性装饰器`、`方法装饰器`、`参数装饰器`、`访问器装饰器`

```ts
// 1. 类装饰器
@BirdClassDecorator
class Bird {
  // 2. 属性装饰器
  @NamePropertyDecorator
  name: string;

  // 3. 方法装饰器
  @FlyMethodDecorator
  fly(
    // 4. 参数装饰器
    @ParameterDecorator
    meters: number,
  ) {}

  // 5. 访问器装饰器
  @EggAccessorDecorator
  get egg() {}
}
```

## 4. 装饰器之`类装饰器`

类装饰器只有一个参数 `构造函数 constructor`

- 4-1. `一般方式` 声明`类装饰器`

```ts
function PersonClassDecorator<T extends TConstructor>(constructor: T) {
  return class extends constructor {
    name: string; // 属性重写
    newProperty: string; // 可以添加新的属性，在使用添加的新的属性时，ts不会出现代码提示（请看优化1）
    constructor(...rest: any[]) {
      // 必须使用剩余参数否则ts会提示报错
      super(...rest); // 父类必须调用
      this.name = rest[0];
      this.newProperty = rest.at(-1);
    }

    say() {} // 添加新的方法
    eat() {
      console.log("新的eat ==> :");
    } // 重写方法
  };
}

@PersonClassDecorator
class Person {
  name: string;
  age: string;
  constructor(name: string, age: string) {
    this.age = age;
    this.name = name + " 没有改变过";
    console.log("1 ==> :");
  }

  eat() {
    console.log("eat ==> :");
  }
}
const p1 = new Person("李四", "25", "我是一个新的属性");
console.log("p1 ==>", p1); // Person {name: '张三', age: '25', newProperty: '我是一个新的属性'}
console.log("p1.name ==>", p1.age); // 这里ts不会出现代码提示，是ts目前关于装饰器的一个`缺陷`，毕竟还不是正是功能，可以理解。
```

- 4-2. `工厂方式` 声明`类装饰器`

```ts
function PersonClassDecorator(params: string) {
  console.log("params ==> :", params);
  return function <T extends TConstructor>(parentConstructor: T) {
    return class extends parentConstructor {
      name: string; // 属性重写
      newProperty: string; // 可以添加新的属性，在使用添加的新的属性时，ts不会出现代码提示（优化1）
      constructor(...rest: any[]) {
        // 必须使用剩余参数否则ts会提示报错
        super(...rest); // 父类必须调用
        this.name = rest[0];
        this.newProperty = rest.at(-1);
      }

      say() {} // 添加新的方法
      eat() {
        console.log("新的eat ==> :");
      }
    };
  };
}

@PersonClassDecorator("hahha")
class Person {
  name: string;
  age: string;
  constructor(name: string, age: string) {
    this.age = age;
    this.name = name + " 没有改变过";
    console.log("1 ==> :");
  }

  eat() {
    console.log("eat ==> :");
  }
}
const p1 = new Person("李四", "25", "我是一个新的属性");
console.log("p1 ==>", p1); // Person {name: '张三', age: '25', newProperty: '我是一个新的属性'}
console.log("p1.name ==>", p1.age); // 这里ts不会出现代码提示，是ts目前关于装饰器的一个缺陷，毕竟还不是正是功能，可以理解
```

- 4-3. 优化 1

```ts
function PersonClassDecorator(params: string) {
  console.log("params ==> :", params);
  return function <T extends { new (...args: any[]): {} }>(parentConstructor: T) {
    return class extends parentConstructor {
      name: string; // 属性重写
      newProperty: string;
      constructor(name: string, age: string, newProperty: string) {
        super(name, age);
        this.name = name;
        this.newProperty = newProperty;
      }

      say() {
        console.log("say ==> :");
      } // 添加新的方法
      eat() {
        console.log("新的eat ==> :");
      }
    };
  };
}
const Person = PersonClassDecorator("person")(
  class {
    name: string;
    age: string;
    constructor(name: string, age: string) {
      this.age = age;
      this.name = name + " 没有改变过";
      console.log("1 ==> :");
    }

    eat() {
      console.log("eat ==> :");
    }
  },
);

const p1 = new Person("李四", "25", "我是一个新的属性");
console.log("p1 ==>", p1);
console.log("p1.name ==>", p1.name); // 这里ts会出现代码提示
```

## 5. 装饰器之`方法装饰器`

- 5-1. 装饰器函数的三个参数对于`实例属性`分别是 `类的原型对象（prototype）`、`方法的名字（Function.name）`、`属性描述符`（descriptor 的值如下所示）；对于`静态属性`分别是 `类的构造函数（constructor）`、`方法的名字`（Function.name）、`属性描述符`（descriptor 的值如下所示）。
  - 5-1-1. 关于属性描述符的说明，（以 5-3.示例中的被装饰的函数 say 举例：）
    1. value 属性修改以后，可`重写 say`方法。
    2. enumerable 属性描述符设置为 false 之后，类的实例对象的属性枚举中不会出现`say`属性。
    3. configurable 属性描述符设置为 false 之后，类的实例化对象的`say`方法不能删除。
    4. writable 属性描述符设置为 false 之后，类的实例化对象的`say`方法不能重写。

```json
 {
    value: [Function (anonymous)],
    writable: true,
    enumerable: true,
    configurable: true
  }
```

- 5-2. 关于一个函数被多个装饰器装饰，本文不做演示与讨论。

- 5-3. 方法装饰的一般使用方式都是通过重写第三个参数 descriptor 的 四个属性来达到自己的需求。下面这个例子是通过重写 descriptor.value 的值来收集参数示例。

```ts
function SayDecoractor1(value = "") {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    const rowFn = descriptor.value;

    descriptor.value = function (...rest: any[]) {
      const res = rowFn.apply(this, [value, ...rest]);

      return res + "xxx";
    };
  };
}

class Person {
  @SayDecoractor1("default1")
  say(name: string) {
    console.log("say ==> :", arguments);
    return name;
  }
}
console.log('new Person().say("jack"); ==> :', new Person().say("jack"));
```

## 6. 装饰器之`属性装饰器`

- 6-1. 实例属性装饰器的`两个参数`是 `原型对象`、`属性名字`；静态属性装饰器的`两个参数`是 `构造函数`、`属性名字`。

- 6-2. `使用属性装饰器，直接对属性的值做修改，实际上是做不到的`，请看以下示例 1：

```ts
// 示例1

function NewUser(target: object, propertyKey: string) {
  let value = target[propertyKey];

  Object.defineProperty(target, propertyKey, {
    set: function (newVal) {
      value = newVal;
    },
    get: function () {
      return "Hello, " + value;
    },
    enumerable: true,
    configurable: true,
  });
}

class Welcome {
  @NewUser
  user: String;
  constructor(user: String) {
    this.user = user;
  }
}

const welcome = new Welcome("Peter");
console.log(welcome.user);
```

- 6-2-1. 属性是声明在实例对象上；代理原型对象后，访问 user 属性，因为实例对象上有这个属性，所以不会沿着原型链向上查找，所以不会触发 get()

```ts
function NameDecorator(target: any, key: string): any {
  target[key] = "bro";
}
class Test {
  @NameDecorator
  name = "fruit";
}
const test = new Test();
console.log(test.name); // 输出为fruit，为什么不是bro呢？
```

- 6-2-2. Test 的 name 属性是在 constructor 构造器上的，而装饰器修改的是 prototype 上的 name 属性。修改的根本不是一个东西。而在运行时，先会找实例上的 name 属性，实例上有 name 属性，就不会再找 prototype 上的 name 属性了。实例上没有 name 属性的时候，才会沿着原型链向上找 name 属性。

## 7. 装饰器之`访问器装饰器`

- 7-1. 访问器装饰器的`三个参数`是 `原型对象`、`属性名字`、`属性描述符`。
- 7-2. 访问器装饰器可以弥补属性装饰器的缺陷（示例 1）

```ts
// 示例1
function Log(params: unknown) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const getter = descriptor.get;
    const setter = descriptor.set;

    descriptor.get = function () {
      const value = getter?.call(this);
      //  do something ...
      return "get " + value + params;
    };

    descriptor.set = function (newValue: unknown) {
      //  do something ...
      return setter?.call(this, "set " + newValue + params);
    };
  };
}

class Example {
  private _message = "Hello, world!";

  @Log("hahha")
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}

const example = new Example();
console.log("message1", example.message);
example.message = "New message";
console.log("message2", example.message);
```

- 7-3. 通过重写描述符的 get、set 方法来操作 message 属性读写。

## 8. 装饰器之`参数装饰器`

- 8-1. 参数装饰器的`三个参数`是 `原型对象`、`形参的名字`、`该形参在所有参数中的索引`。
- 8-2. 参数装饰器一般用来`加工参数`、`校验参数`等等，下面的例子可以帮你了解参数装饰器的基本使用。
- 8-3. 下面的例子在使用的过程中如果出现 console.log 在控制台不显示的情况，请使用 tsc 将 ts 代码转换成 js，使用 node 运行。

```ts
function Log(params: string) {
  return function (target: object, methodName: string, parameterIndex: number) {
    const originalMethod = target[methodName];

    target[methodName] = function (...args: any[]) {
      const parameterValue = args[parameterIndex];
      console.log(`Calling ${methodName} with parameter ${parameterValue}`);
      return originalMethod.apply(this, args);
    };
  };
}

class Example {
  @Log
  greet(@log("xx") name: string) {
    console.log(`Hello, ${name}!`);
  }
}

const example = new Example();
example.greet("John"); // Calling greet with parameter John, Hello, John!
```

- 8-3. Log 装饰器用于记录函数参数的值。它通过修改函数的实现来在调用函数时记录参数的值。

```ts
function ToUpperCase() {
  function (target: object, methodName: string, parameterIndex: number) {
  const originalMethod = target[methodName];

  target[methodName] = function (...args: any[]) {
    const parameterValue = args[parameterIndex];
    args[parameterIndex] = parameterValue.toUpperCase();
    return originalMethod.apply(this, args);
  };
}
}

class Example {
  greet(@ToUpperCase('xxx') message: string) {
    console.log(message);
  }
}

const example = new Example();
example.greet("hello"); // HELLO
```

- 8-4. ToUpperCase 装饰器用于将函数参数转换为大写。它通过修改函数的实现来在调用函数之前将参数转换为大写。
