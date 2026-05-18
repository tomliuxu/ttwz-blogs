---
title: Vue 快捷写法汇总
date: 2022-03-12
sidebar: auto
tags:
  - Vue
categories:
  - Vue
---

## 1. 动态路由参数解耦

```javascript
// routes.ts
 {
    path: "/editor/:pid",
    name: "Editor",
    meta: {
      title: "editor",
      keepAlive: false,
    },
    component: () => import("@/views/editor/index.vue"),
    props: true
  },

  // 组件中
  props: {
    pid: {
      type: string,
      require: true,
      default: ''
    }
  }
```

## 2. 监听组件销毁前事件

```javascript
  mounted() {
    this.$on("hook:beforeDestroy", () => {
      // do something
    });
  }
```

## 3. computed 解构 当前实例 中的数据或者方法

```javascript
export default {
  data() {
    return {
      userName: "jack",
    };
  },
  computed: {
    getUser({ userName, submit }) {
      return userName;
    },
  },
  methods: {
    submit() {
      // do something
    },
  },
};
```

## 4. 监听子组件各个生命周期事件

```javascript
// App.vue
<template>
  <div id="app">
    <Child @hook:mouted="handleMounted" />
    <Child @hook:created="handleCreated" />
    <Child @hook:updated="handleUpdated" />
  </div>
</template>
```
