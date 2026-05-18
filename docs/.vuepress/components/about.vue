<template>
  <div class="about">
    <p>{{ currentValue }}</p>
  </div>
</template>

<script>
const list = [
  {
    id: 1,
    value: "最是人间留不住，朱颜辞镜花辞树。",
    author: "王国维",
  },
  {
    id: 2,
    value: "花开生两面，人生佛魔间。",
    author: "刘义庆",
  },
  {
    id: 3,
    value: "十年生死两茫茫，不思量，自难忘。",
    author: "苏轼",
  },
  {
    id: 2,
    value: "路漫漫其修远兮，我将上下而求索",
    author: "",
  },
];
export default {
  name: "about",
  data() {
    return {
      index: 0,
      list,
      timer: null,
      dealy: 1000 * 60,
    };
  },
  computed: {
    currentValue({ list, index }) {
      return list[index].value || "";
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.index = this.index + 1 > this.list.length - 1 ? 0 : this.index + 1;
    }, this.dealy);

    this.$once("hook:beforeDestroy", () => {
      this.timer && clearInterval(this.timer);
      this.timer = null;
    });
  },
};
</script>

<style>
.test img {
  width: 100px;
  height: 100px;
}
</style>
