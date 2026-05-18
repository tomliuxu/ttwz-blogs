<template>
  <div class="kbn">
    <div class="kbn_wp">
      <span v-show="loading" class="kbn_wp_load"> loading...</span>

      <div class="kbn_wp_mbox" v-show="messageBoxVisible">
        {{ msg }}
      </div>
      <div
        v-show="!displayBanNiang"
        :style="editorButtonStyles"
        class="kbn_wp_btns"
        @mouseenter="messageBoxVisible = true"
        @mouseleave="messageBoxVisible = false"
      >
        <!-- 看板娘回到首页 icon -->
        <i
          class="kbnfont kbn-ban-home ban-home kbn_icon"
          @click="goHomePage"
          @mouseenter="handleHoverMessage('home')"
          @mouseleave="resetMessage"
        ></i>

        <!-- 看板娘关闭 icon -->
        <i
          class="kbnfont kbn-ban-close close kbn_icon"
          @click="closeKbn"
          @mouseenter="handleHoverMessage('close')"
          @mouseleave="resetMessage"
        ></i>
        <!-- 看板娘插件地址 icon-->
        <a
          target="_blank"
          href="https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html"
          class="kbn_icon"
        >
          <i
            class="kbnfont kbn-ban-info info"
            @mouseenter="handleHoverMessage('more')"
            @mouseleave="resetMessage"
          ></i>
        </a>
        <!-- 看板娘换肤 icon-->
        <i
          class="kbnfont kbn-ban-theme skin kbn_icon"
          @click="changeModelTheme"
          @mouseenter="handleHoverMessage('theme')"
          @mouseleave="resetMessage"
        ></i>
      </div>
      <canvas
        v-show="!loading && !displayBanNiang"
        id="kbncvs"
        :style="{ ...currentTheme['style'] }"
        :width="currentTheme['style'].width"
        :height="currentTheme['style'].height"
      ></canvas>
    </div>
    <div class="kbn_label" v-show="displayBanNiang" @click="showKbn">小小看板娘</div>
  </div>
</template>

<script>
import live2dJSString from "./assets/js/live2d";
import modelSource from "./constant";
export default {
  name: "KanBanNiang",
  data() {
    return {
      loading: false,
      displayBanNiang: false,
      messageBoxVisible: false,
      msgType: "",
      currentTheme: modelSource[0],
      editorButtonStyles: EDITOR_BTN_STYLES, // 操作按钮的样式
    };
  },
  computed: {
    msg({ msgType }) {
      return MESSAGES[msgType];
    },

    modelThemeLength() {
      return modelSource.length;
    },
    modelStyle() {
      return MODEL_STYLE;
    },
    isMobile() {
      return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    },
  },
  mounted() {
    this.initKbn();
  },
  methods: {
    handleHoverMessage(type) {
      this.msgType = type;
    },
    resetMessage() {
      // this.messages.message = 'reset'
    },
    goHomePage() {
      const { $router, $route } = this;

      $route.path !== "/" && $router.push("/");
    },
    changeModelTheme() {
      this.loading = true;
      const themes = modelSource.filter((v) => v.name !== this.currentTheme.name);

      const randomNum = Math.floor(Math.random() * (this.modelThemeLength - 1));
      this.currentTheme = themes[randomNum] || modelSource[0];
      this.initKbn();
    },
    closeKbn() {
      this.displayBanNiang = true;
    },
    showKbn() {
      this.displayBanNiang = false;
      this.initKbn();
    },
    async initKbn() {
      try {
        this.loading = true;

        const { sourceURL } = this.currentTheme;

        if (this.isMobile) {
          this.loading = false;
          console.log("手机端不支持加载看板娘");
          return;
        }

        !window.loadlive2d && this.autoInjectScript();

        await this.loadKbnSource("get", sourceURL);
        window.loadlive2d("kbncvs", sourceURL);
      } catch (error) {
        this.displayKbn();
      } finally {
        this.loading = false;
      }
    },
    displayKbn() {
      document.querySelector(".kbn").style.display = "none";
    },
    autoInjectScript() {
      const script = document.createElement("script");
      script.innerHTML = live2dJSString;
      document.getElementsByTagName("body")[0].appendChild(script);
    },
    loadKbnSource(type, sourceURL) {
      return new Promise((resolve, reject) => {
        var ajax = new XMLHttpRequest();
        ajax.open(type, sourceURL);
        ajax.send();
        ajax.onreadystatechange = function () {
          if (ajax.status !== 200) {
            console.log("看板娘的CDN资源加载失败了，请稍后刷新页面重试！");
            reject(404);
          }
        };
        setTimeout(() => {
          resolve(200);
        }, 0);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@require './assets/iconfont/iconfont.css'
.kbn
  position fixed
  right 26px
  bottom 135px

  &_label
    color $accentColor
    height 20px
    padding 10px
    cursor pointer
    border-radius 4px
    // 其他主题识别不到变量时使用
    background-color rgba(231, 234, 241, 0.5)
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2)
    // reco主题
    box-shadow var(--box-shadow)
    background-color var(--background-color)
  &_wp
    color #00adb5
    &_load {
    }
    &_mbox
      max-height 230px
      padding 5px 10px
      white-space nowrap
      font-size 14px
      position absolute
      right 60px
      top 137px
      border-radius 8px
      background-color lighten($accentColor, 50%)
      color $textColor
      opacity 0.8
    &_btns
      display flex
      flex-direction column
      justify-content space-between
      text-align right
    i
      font-size 20px
      cursor pointer
      color lighten($textColor, 50%)

      &:hover
          color lighten($accentColor, 50%)
    .kbn_icon {
      margin-bottom 10px
    }
    #kbncvs
      pointer-events none
      position absolute
      z-index 9999
</style>
