/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "3c2cfc6be6da0c3083b50bbb4f6a60ce"
  },
  {
    "url": "about/index.html",
    "revision": "026c04c93af0aa0153a1cb5773b2d6f5"
  },
  {
    "url": "assets/css/0.styles.b0474fc2.css",
    "revision": "9a3f279b644161861d8b61947ab36319"
  },
  {
    "url": "assets/fonts/iconfont.938fa69e.woff",
    "revision": "938fa69ea89bccb0f20d643cc5f07cbe"
  },
  {
    "url": "assets/fonts/iconfont.ecabaf00.ttf",
    "revision": "ecabaf00c2c5be9907d524bb21a0f0dc"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/eslint-1.aeb6182b.jpg",
    "revision": "aeb6182b1c15e0b686d940e6e4d289a0"
  },
  {
    "url": "assets/img/husky-1.e999ae6c.jpg",
    "revision": "e999ae6c7dc0fd993bae9307f475cfbd"
  },
  {
    "url": "assets/img/lint-1.bc0209c8.jpg",
    "revision": "bc0209c86b31883dc0fab0cc84d30605"
  },
  {
    "url": "assets/img/lint-2.e7eceec8.jpg",
    "revision": "e7eceec87ea83f7076dec32cf77f3b5f"
  },
  {
    "url": "assets/img/message.13eb9a33.gif",
    "revision": "13eb9a333d517351b49e008951c28b64"
  },
  {
    "url": "assets/img/prettier-1.47a75255.jpg",
    "revision": "47a75255fb874410d604ee9b95587aa0"
  },
  {
    "url": "assets/img/success.1d189b80.jpg",
    "revision": "1d189b80f4fae30d0d252b20859aec07"
  },
  {
    "url": "assets/js/1.e2cd867f.js",
    "revision": "7bfc116991903ebd5d9de8d4342caf4e"
  },
  {
    "url": "assets/js/10.141849cf.js",
    "revision": "5a89241dcb44b07620674c34d76c305e"
  },
  {
    "url": "assets/js/11.1f4e8984.js",
    "revision": "3f1e7175387cf88fbf72692e71169330"
  },
  {
    "url": "assets/js/12.1819389e.js",
    "revision": "d01cbede76da37bd12964f1ba49f8819"
  },
  {
    "url": "assets/js/13.1c1c55cd.js",
    "revision": "11f2edb933d4741598daf4b33a4d19ce"
  },
  {
    "url": "assets/js/14.3adcf107.js",
    "revision": "6c56e068074173a9b9745b2257f9c79d"
  },
  {
    "url": "assets/js/15.40b1a953.js",
    "revision": "4090c3f98d81e09dc169c426a7b9a8d1"
  },
  {
    "url": "assets/js/16.bb0932b5.js",
    "revision": "090dca6454674cc38ec5eab32502039e"
  },
  {
    "url": "assets/js/17.cd5c4ea7.js",
    "revision": "ad1db3bc3fb76cb1b7d97ca8c0013d85"
  },
  {
    "url": "assets/js/18.95d92c79.js",
    "revision": "456f3fd0ea045da94c0b63fdff10a859"
  },
  {
    "url": "assets/js/19.f9a7b88c.js",
    "revision": "00ac8f4ecc322e09117877c1ca11ada6"
  },
  {
    "url": "assets/js/20.b9098d22.js",
    "revision": "f8f7ede9cea715b8a88661c4cfc89510"
  },
  {
    "url": "assets/js/21.750540f7.js",
    "revision": "9f50161275a67fb80c7bbdbcb4107cf2"
  },
  {
    "url": "assets/js/22.f8d72eb4.js",
    "revision": "96891771acca38fca5eb0a7ce2bf1f31"
  },
  {
    "url": "assets/js/23.0bdfc5c7.js",
    "revision": "12cb1a63b0e93d201ad841a27a0cbb00"
  },
  {
    "url": "assets/js/24.2f92481c.js",
    "revision": "940383abb15da056f3ae4b305aca015d"
  },
  {
    "url": "assets/js/25.8a82f86b.js",
    "revision": "fbf57ee5ea258d4658715ed889a2551d"
  },
  {
    "url": "assets/js/26.cb8f5e64.js",
    "revision": "acecb00b883b3b825b10abfde905ce46"
  },
  {
    "url": "assets/js/27.b78caa47.js",
    "revision": "9039741cfd05efca805b967873703d79"
  },
  {
    "url": "assets/js/28.c22d5dd0.js",
    "revision": "b8d30adc2ad955dedb2b5b03f9cdb6c9"
  },
  {
    "url": "assets/js/29.2278d886.js",
    "revision": "150b8960d6071f1443f2724b220bd910"
  },
  {
    "url": "assets/js/3.0372b456.js",
    "revision": "a5bb535093ebb467215e9f07c3a444c7"
  },
  {
    "url": "assets/js/30.3ba1306a.js",
    "revision": "337c1c6755bc3de36211a4788b3b5c0b"
  },
  {
    "url": "assets/js/31.4e779455.js",
    "revision": "4a95aadb642f25bb84a1abfce7cd84f7"
  },
  {
    "url": "assets/js/32.aa70e37f.js",
    "revision": "a74a5d25792211b138ef47c9dadb32ff"
  },
  {
    "url": "assets/js/33.9be869df.js",
    "revision": "3ccb608865e1ce6a515ede919668726c"
  },
  {
    "url": "assets/js/34.faac9174.js",
    "revision": "39e2cbfc4b2d460e6af3be1a79fc2b34"
  },
  {
    "url": "assets/js/35.6f3a2600.js",
    "revision": "d472d646670848e6bb0914e5bb7ccb24"
  },
  {
    "url": "assets/js/36.a0de58c3.js",
    "revision": "9c5a2b156718b5799ee9077baf8abe66"
  },
  {
    "url": "assets/js/37.dabbfae2.js",
    "revision": "82322d4f6cc325326b2381a0dab3f483"
  },
  {
    "url": "assets/js/38.3f84fee0.js",
    "revision": "69ebbaf97f0792b63fe0db7b3aafe5c7"
  },
  {
    "url": "assets/js/39.ff01a58c.js",
    "revision": "e3c88f7a05df6593cfd38489132f6b23"
  },
  {
    "url": "assets/js/4.40af2689.js",
    "revision": "74645a4dcf6ee43584c902f6eced13f5"
  },
  {
    "url": "assets/js/40.43a455f7.js",
    "revision": "b8bbb9468a27374d58652c264ebff028"
  },
  {
    "url": "assets/js/41.21e590d0.js",
    "revision": "a610c67fcf57b0a80b3df4a75ada49bb"
  },
  {
    "url": "assets/js/42.363edcce.js",
    "revision": "7ace0df93de3248cead74b6ffec08c04"
  },
  {
    "url": "assets/js/43.8eaf80a8.js",
    "revision": "422750f505d0352ef56eeb2701ba71a7"
  },
  {
    "url": "assets/js/44.8ca16d45.js",
    "revision": "35e3a71b484864bd0dd1788384412c68"
  },
  {
    "url": "assets/js/45.7604665c.js",
    "revision": "67f8abdaac3b1395e33edde1072f7f5c"
  },
  {
    "url": "assets/js/46.85e9e7f0.js",
    "revision": "059eedc185a8432167167f5841644492"
  },
  {
    "url": "assets/js/47.5800cd84.js",
    "revision": "d73d36cb01f440d80052fb1410d559ce"
  },
  {
    "url": "assets/js/48.5583f733.js",
    "revision": "70d8c8dd1f386d1050c4886c0a82c935"
  },
  {
    "url": "assets/js/49.ccb3ab03.js",
    "revision": "e8d56ef48b2c88876b50ca9c648328bb"
  },
  {
    "url": "assets/js/5.5d9891be.js",
    "revision": "5e8f92c883efa455218d9eb092966b3c"
  },
  {
    "url": "assets/js/50.73451aa1.js",
    "revision": "504cc52df5bd2aa073712e52077d6b1c"
  },
  {
    "url": "assets/js/51.44b447df.js",
    "revision": "dc4a45e85fbc19fadddd93414f5b763b"
  },
  {
    "url": "assets/js/6.94c894b7.js",
    "revision": "c522b7883507fb2eeeaee12c7d7fcb6f"
  },
  {
    "url": "assets/js/7.59c82211.js",
    "revision": "4b52c0de3c61a9ebbe00dc1bd3104ee2"
  },
  {
    "url": "assets/js/8.cb14ffa2.js",
    "revision": "b4b9ccd8e07199b1af4918207f75b0f4"
  },
  {
    "url": "assets/js/9.61691add.js",
    "revision": "41db3be8e8b30678f534943820cd7868"
  },
  {
    "url": "assets/js/app.b996f5d3.js",
    "revision": "f5c48274f03c8c1bee3c13ffe698e1cc"
  },
  {
    "url": "categories/FrontEnd/index.html",
    "revision": "1ef704c29dca081182221b47e16499ad"
  },
  {
    "url": "categories/index.html",
    "revision": "d5d41fca287e182ca72abfc8bc50a84b"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "e72f2bd4d42b1e556606501572777be1"
  },
  {
    "url": "categories/ReactAhooks/index.html",
    "revision": "7c2ec4045f2e52fc992849cd8ee0199e"
  },
  {
    "url": "categories/SourceCode/index.html",
    "revision": "7ce0f0be6c6e7aefc2ae2248473b34fc"
  },
  {
    "url": "categories/TypeScript/index.html",
    "revision": "ce62e703cc7ad51d2e0a21d06ed4e214"
  },
  {
    "url": "categories/Vite/index.html",
    "revision": "139fd0c51357a5d25f1eb05a5ebb1596"
  },
  {
    "url": "categories/Vue/index.html",
    "revision": "4e21019ae1dde033fafa458abd7bf66c"
  },
  {
    "url": "icons/cat128.png",
    "revision": "a5c5942bcb1a10affff8c4029383fa79"
  },
  {
    "url": "icons/cat16.png",
    "revision": "1aec0693ff6e320c0adedf185806b1ab"
  },
  {
    "url": "icons/cat48.png",
    "revision": "231db9fe2dd479a3aac7da8194bb9fd5"
  },
  {
    "url": "icons/LatteAndCat.png",
    "revision": "a5c5942bcb1a10affff8c4029383fa79"
  },
  {
    "url": "icons/LatteAndCat.svg",
    "revision": "ec9380aaccc3ef15b7150505a7c5f524"
  },
  {
    "url": "index.html",
    "revision": "be4d322609bef66437caa63444572e5c"
  },
  {
    "url": "note/index.html",
    "revision": "ba83c9c1c43d5e9a56662d5bcc551bae"
  },
  {
    "url": "note/ui-link/1.html",
    "revision": "bedf5aee11a38a7c1082938ef4ecd3e4"
  },
  {
    "url": "note/ui-link/2.html",
    "revision": "01b02d729323069bfed7ab61dac75333"
  },
  {
    "url": "note/ui-link/3.html",
    "revision": "b6e6d69b8142a0fc100b9ce0b73cd6c2"
  },
  {
    "url": "star.png",
    "revision": "f839cadd169727f31a195d0b53d05807"
  },
  {
    "url": "tag/FrontEnd/index.html",
    "revision": "0d6a859e382be1a0d515995dc9a64d5b"
  },
  {
    "url": "tag/index.html",
    "revision": "976b01554e2eae1d263df292bf5acd1c"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "7a7cd4969582b324480c71304d55371f"
  },
  {
    "url": "tag/ReactAhooks/index.html",
    "revision": "cc29854c563cec07db3b0287ef394f10"
  },
  {
    "url": "tag/SourceCode/index.html",
    "revision": "286fbc07f6f2841896592baf64afb670"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "62fa80cdd304ece049da26f3088bd27b"
  },
  {
    "url": "tag/Vite/index.html",
    "revision": "a095deb338682a875d1739720a2f6df0"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "3d80bc44c37f5f21acad89fd530b74c3"
  },
  {
    "url": "timeline/index.html",
    "revision": "c956485205c637fe7a6cc8db790e5335"
  },
  {
    "url": "views/javascript/array.html",
    "revision": "fd477a36190dbd434e450bb89564b1e0"
  },
  {
    "url": "views/javascript/async.html",
    "revision": "5e040ec1f8c4b8f992726f24632fafa8"
  },
  {
    "url": "views/javascript/eventbus.html",
    "revision": "cdeeaf0388c4f190995e409a28d009e8"
  },
  {
    "url": "views/javascript/fn.html",
    "revision": "6a86f5bc9dd083e86eea303c34a21bef"
  },
  {
    "url": "views/javascript/mylocalstorage.html",
    "revision": "df3e24c45b163a1d0a9140811cd2a81b"
  },
  {
    "url": "views/javascript/mypromise.html",
    "revision": "902dba3fc7c53d28d8783ba7dc2eea92"
  },
  {
    "url": "views/javascript/upload.html",
    "revision": "7e2258e55842172d54aa5b91d4a7a3cc"
  },
  {
    "url": "views/react-ahooks/dev/usetrackedeffect/index.html",
    "revision": "a2afcd29798a1919cf11e2442e874a1a"
  },
  {
    "url": "views/react-ahooks/dev/usewhydidyouupdate/index.html",
    "revision": "5732a315c452283a8bf7daa8147d84ad"
  },
  {
    "url": "views/react-ahooks/effect/useupdate/index.html",
    "revision": "bc24f73b149094fffcfb7dcd56102251"
  },
  {
    "url": "views/react-ahooks/effect/useupdateeffect/index.html",
    "revision": "a8a0282f5ed3c2089ce48e64212f8af7"
  },
  {
    "url": "views/react-ahooks/life-cycle/usemount/index.html",
    "revision": "2f28ab29ffc6cba0e53c9118d02184dc"
  },
  {
    "url": "views/react-ahooks/life-cycle/useunmount/index.html",
    "revision": "e5e8b6a32696522fde1d12a0f01662a0"
  },
  {
    "url": "views/react-ahooks/life-cycle/useunmountedref/index.html",
    "revision": "fdd05846701a182aa5f1a91e65760d37"
  },
  {
    "url": "views/react-ahooks/state/useboolean/index.html",
    "revision": "7778be9ddac30540eabc9ac539fdd536"
  },
  {
    "url": "views/react-ahooks/state/usedebounce/index.html",
    "revision": "b850f2737e99526505f9b00f64033124"
  },
  {
    "url": "views/react-ahooks/state/usetoggle/index.html",
    "revision": "28dadf260a2c87129007d94fd419abdb"
  },
  {
    "url": "views/source-code/computed.html",
    "revision": "5704bd922edc409852e218d89f22585d"
  },
  {
    "url": "views/source-code/effect.html",
    "revision": "e5f788cca82217af7c335f2812c2348d"
  },
  {
    "url": "views/source-code/reactivity.html",
    "revision": "50c1e11a9e10dbea1bea6d89715f8a7d"
  },
  {
    "url": "views/source-code/ref.html",
    "revision": "443d4963eb4180280be629cdfb97f2e1"
  },
  {
    "url": "views/source-code/vuex.html",
    "revision": "8d847763d6f75ef7390d6b9f7b29eac4"
  },
  {
    "url": "views/source-code/watch.html",
    "revision": "3b2cbf07aec58737ab976f3260d57824"
  },
  {
    "url": "views/typescript/decorator.html",
    "revision": "bc8405d1d8866f78db81310939d72f2b"
  },
  {
    "url": "views/typescript/types-changes.html",
    "revision": "88d38763d2f1cce8742204247bdae8ee"
  },
  {
    "url": "views/vite/create-code.html",
    "revision": "e221b27477ccdb9b6d1d3e7455ab8f7c"
  },
  {
    "url": "views/vite/create-lint.html",
    "revision": "9c2094d9a1202bbca2c6aef647c74c37"
  },
  {
    "url": "views/vite/jsx.html",
    "revision": "aa9a777a1d582085cadf99ccd1cb636c"
  },
  {
    "url": "views/vue/message.html",
    "revision": "5dcd49369f4f97122a9d127f604133fc"
  },
  {
    "url": "views/vue/option-api.html",
    "revision": "0eb6d2bb0b249d7bc9b77bbccf9e7763"
  },
  {
    "url": "views/vue/popup.html",
    "revision": "61dcb280819a5316e563330444816dab"
  },
  {
    "url": "views/vue/refresh.html",
    "revision": "566f0a2866107bf7635ccf36b412a0c8"
  },
  {
    "url": "views/zustand/create.html",
    "revision": "43623c3dc12e33c1736e27df252a8e4a"
  },
  {
    "url": "views/zustand/index.html",
    "revision": "7a99b38541869c42c184b9aff306d4d3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
