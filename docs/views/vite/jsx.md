---
title: Vue3 项目中使用jsx指南
date: 2022-04-30
sidebar: auto
tags:
  - Vue
categories:
  - Vue
---

### 安装 @vitejs/plugin-vue-jsx 插件 vite.config.ts 添加以下代码

```javascript
pnpm add @vitejs/plugin-vue-jsx

// vite.config.ts
import VueJsx from '@vitejs/plugin-vue-jsx'
defineConfig({
    plugins: [VueJsx()]
})
```

### 新建 Demo.jsx

```javascript
// Demo.jsx vue中书写jsx的方式有很多中 官方最推荐的就是  defineComponent({})
import { ref, reactive, nextTick, defineComponent, withModifiers } from "vue";
import Comp1 from "./Comp1";
import Comp3 from "./Comp3";
export default defineComponent({
  props: {},
  emits: [],
  setup() {
    const hobby = ref("和老婆一起玩");
    const user = reactive({
      name: "base-data",
      age: 38,
    });
    const baseData = ref("base-data");
    const elRefs = ref();
    const isShow = ref(true);
    const userName = ref("jackkkk");
    const userInfo = reactive({
      address: "china",
      age: "20",
    });
    const list = ref([
      {
        value: 1,
        style: {
          color: "red",
        },
        active: true,
      },
      {
        value: 2,
        style: {
          color: "pink",
        },
        active: false,
      },
      {
        value: 3,
        style: {
          color: "green",
        },
        active: false,
      },
      {
        value: 4,
        style: {
          color: "#3a96ff",
        },
        active: false,
      },
    ]);

    const handleWpClick = () => {
      console.log("事件冒泡到父容器啦 ==> :");
      isShow.value = !isShow.value;
    };

    const handleClickItem = async (e, item, i) => {
      console.log(
        "itemInfo ==> :",
        `pageX: ${e.pageX}--value: ${item.value}--index: ${i}--active: ${item.active}`,
      );
      item.active = !item.active;
      item.style.color && (item.style.color = "");
      !item.style.color && (item.style.color = "pink");
      await nextTick();
      console.log("elRefs ==> :", elRefs.value);
    };

    const handleHobbyBlur = (e) => {
      console.log(
        "失去焦点啦,会触发父元素事件",
        "e.target.value ==> :",
        e.target.value,
        "modelValue ==> :",
        hobby.value,
      );
    };
    const handleHobbyChange = (e) => {
      console.log(
        "change...,不会触发父元素事件",
        "e.target.value ==> :",
        e.target.value,
        "modelValue ==> :",
        hobby.value,
      );
    };

    const handleHobbyKeydown = (e) => {
      if (e.keyCode === 13) {
        console.log("enter ==> :");
      }
    };

    return () => (
      <div className='demo'>
        <div className='demo_wp' onClick={handleWpClick}>
          <h2>vue中 jsx用法示例</h2>
          <div className='demo_field'>
            <p>1. 基本变量ref的使用: {baseData.value}</p>
            <p>
              基本变量reactive的使用: {user.name}-{user.age}
            </p>
            -----------
          </div>
          <div className='dome_field'>
            <p>2. v-if v-else v-show 使用：</p>
            <p>{user.age > 30 ? "中年" : "青年"}</p>
            <p>{user.age > 30 ? <span>中年</span> : <span>青年</span>}</p>
            <p v-show={isShow.value}>show something</p>
            -----------
          </div>

          <div className='dome_field' ref={elRefs}>
            <p>3. v-for 动态样式、class绑定 ref 使用 ：</p>
            {list.value.map((v, i) => (
              <p
                key={i}
                style={v.style}
                className={`base_item ${v.active ? "base_yes" : "base_no"}`}
                onClick={(e) => handleClickItem(e, v, i)}
              >
                value: {v.value}--active: {v.active}
              </p>
            ))}
            -----------
          </div>

          <div className='dome_field'>
            <p>4. 事件绑定 事件修饰符 事件回调函数传参 使用：</p>
            <p>
              {/* .stop ==> event.stopPropagation() .prevent ==> event.preventDefault() .self ==> if
              (event.target !== event.currentTarget) return */}
            </p>
            <van-field
              v-model={hobby.value}
              onInput={withModifiers((e) => handleHobbyChange(e), ["stop"])}
              onBlur={(e) => handleHobbyBlur(e)}
              onKeydown={handleHobbyKeydown}
              label='爱好'
              placeholder='请输入喜欢的事情'
            />
            -----------
          </div>

          <div className='dome_field'>
            <p>5. 插槽 具名插槽 作用域插槽</p>
            <h3>第一种写法</h3>
            <Comp3
              v-slots={{
                default: () => <p>我是插槽 default data</p>,
                header: (header) => (
                  <div>
                    <p>我是插槽 header data</p>
                    <p>{`我接受到啦在${header.position}组件的数据，数据是${JSON.stringify(
                      header,
                    )}`}</p>
                  </div>
                ),
                footer: (footer) => (
                  <div>
                    <p>我是插槽 footer data</p>
                    <p>{`我接受到啦在${footer.position}组件的数据，数据是${JSON.stringify(
                      footer,
                    )}`}</p>
                  </div>
                ),
              }}
            ></Comp3>
            <p>---------------</p>
            <h3>第二种写法</h3>
            <Comp3>
              {{
                default: () => <p>我是插槽 default data</p>,
                header: (header) => (
                  <div>
                    <p>我是插槽 header data</p>
                    <p>{`我接受到啦在${header.position}组件的数据，数据是${JSON.stringify(
                      header,
                    )}`}</p>
                  </div>
                ),
                footer: (footer) => (
                  <div>
                    <p>我是插槽 footer data</p>
                    <p>{`我接受到啦在${footer.position}组件的数据，数据是${JSON.stringify(
                      footer,
                    )}`}</p>
                  </div>
                ),
              }}
            </Comp3>
          </div>
          <div className='dome_field'>
            <p>6. v-model 单个 多个使用</p>
            <Comp1 v-model:userName={userName.value} v-model:userInfo={userInfo}></Comp1>
            <p>Dome -- userName: {userName.value}</p>
            <p>Dome -- userInfo: {JSON.stringify(userInfo)}</p>
          </div>
        </div>
      </div>
    );
  },
});
```

### 新建 index.vue

```javascript
// index.vue
<template>
  <Dome> </Dome>
</template>
<script lang="ts" setup>
  import Dome from "./components/Dome.jsx";
<script>
```

### 新建 Comp1.jsx

```javascript
// Comp1.jsx
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    userName: {
      type: String,
      require: true,
      default: "",
    },
    userInfo: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
  emits: ["update:userName", "update:userInfo"],
  setup(props, { emit }) {
    const uname = computed({
      get() {
        return props.userName;
      },
      set(val) {
        emit("update:userName", val);
      },
    });

    const uinfo = computed({
      get() {
        return props.userInfo;
      },
      set(val) {
        emit("update:userInfo", Object.assign(props.userInfo, val));
      },
    });

    return () => (
      <div className='comp1'>
        <p>组件name: Comp1</p>
        <div>
          <p>Comp1 -- userName </p>
          <van-field v-model={uname.value} label='userName' placeholder='请输入用户名' />
        </div>
        <div>
          <p>Comp1 -- userInfo </p>
          <van-field v-model={uinfo.value.address} label='address' placeholder='请输入address' />
          <van-field v-model={uinfo.value.age} label='age' placeholder='请输入age' />
        </div>
      </div>
    );
  },
});
```

### 新建 Comp2.jsx

```javascript
// Comp2.jsx
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => <div className='comp2'>comp2</div>;
  },
});
```

### 新建 Comp3.jsx

```javascript
// Comp3.jsx
import { defineComponent, reactive, renderSlot } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    const comp3SlotData = reactive({
      header: {
        name: "header",
        position: "Comp3",
      },
      footer: {
        name: "footer",
        position: "Comp3",
      },
    });
    return () => (
      <div className='comp3'>
        <p>组件name: Comp3</p>
        <section className='comp3_default'>
          <p> default 插槽的内容</p>
          {/* <p>{slots?.default()}</p> */}
          <p>{renderSlot(slots, "default")}</p>
        </section>
        <section className='comp3_header'>
          <p> header 插槽的内容</p>
          {/* <p>{slots?.header(comp3SlotData.header)}</p> */}
          <p>{renderSlot(slots, "header", comp3SlotData.header)}</p>
        </section>
        <section className='comp3_footer'>
          <p> footer 插槽的内容</p>
          {/* 第一种写法 */}
          {/* <p>{slots?.footer(comp3SlotData.footer)}</p> */}
          {/* 第二种写法 */}
          <p>{renderSlot(slots, "footer", comp3SlotData.footer)}</p>
        </section>
      </div>
    );
  },
});
```
