---
title: Vue Toast 组件开发
date: 2022-03-19
sidebar: auto
tags:
  - Vue
categories:
  - Vue
---

## 目录结构

> Popup
>
> > - index.ts
> > - index.vue

- index.ts

```javascript
import MyPopup from "./index.vue";
export default {
  install(Vue: any) {
    Vue.component("Popups", MyPopup);
    function hide(instance, vm, duration: number) {
      vm.t = setTimeout(async () => {
        await vm.setShow(false, 800);
        vm.$destroy();
        document.body.removeChild(vm.$el);
        clearTimeout(vm.t);
        vm.t = null;
        vm = null;
        instance = null;
      }, duration);
    }

    function show({ title, duration }: Record<string, any>) {
      const instance = new (Vue.extend(MyPopup))({
        propsData: {
          title,
        },
      });

      const vm = instance.$mount();
      document.body.appendChild(vm.$el);
      vm.setShow(true);

      hide(instance, vm, duration);
    }

    Vue.prototype.$popup = {
      show,
      hide,
    };
  },
};
```

- index.vue

```vue
<template>
  <transition name="fade">
    <div class="my-popup" v-show="show">
      <p>title: {{ title }}</p>
      <p>age: {{ age }}</p>
      <p>timer: {{ timer }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyPopup",
  props: {
    title: {
      type: String,
      default: "this is my popup",
    },
  },
  data() {
    return {
      timer: null,
      age: 30,
      show: false,
    };
  },
  methods: {
    setShow(status, delay = 0) {
      return new Promise((resovle) => {
        this.show = status;
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.timer = null;
          resovle();
        }, delay);
      });
    },
  },
};
</script>

<style lang="scss">
.my-popup {
  width: 300px;
  height: 200px;
  background-color: pink;
  color: #000;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 20px;
  text-align: center;
  z-index: 9999;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
  transform: translatey(-50px);
  opacity: 0;
}
</style>
```
