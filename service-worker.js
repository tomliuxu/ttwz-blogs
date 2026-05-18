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
    "revision": "34c9731fdf9c0dc7cc6a5b474353a2ab"
  },
  {
    "url": "about/index.html",
    "revision": "a17eda3b422313014002256ce1de3f82"
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
    "url": "assets/js/10.2aabd76a.js",
    "revision": "f883dc494a9034d58121100e6efbbe46"
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
    "url": "assets/js/14.ad7d9540.js",
    "revision": "0c31748ada4b6b17bc3732e3b476d8dc"
  },
  {
    "url": "assets/js/15.0b800f05.js",
    "revision": "bfac0587f53753a556f2d061ffac3923"
  },
  {
    "url": "assets/js/16.23b875bd.js",
    "revision": "a98cce0fcc3273afbe318519291290dc"
  },
  {
    "url": "assets/js/17.1852895a.js",
    "revision": "6e43f063d89f428d6e664359068de0e9"
  },
  {
    "url": "assets/js/18.7683d8c9.js",
    "revision": "973817fade9517b233a37c44daa1af01"
  },
  {
    "url": "assets/js/19.c5daa8b5.js",
    "revision": "7c6ebbb81b137c349e99ac4086212ab2"
  },
  {
    "url": "assets/js/20.b9098d22.js",
    "revision": "f8f7ede9cea715b8a88661c4cfc89510"
  },
  {
    "url": "assets/js/21.eb93b651.js",
    "revision": "7a0fe84c567177c42bd43a799adeb25e"
  },
  {
    "url": "assets/js/22.61069f39.js",
    "revision": "83639afd502deb17d4d9c6e11acd8bb7"
  },
  {
    "url": "assets/js/23.0bdfc5c7.js",
    "revision": "12cb1a63b0e93d201ad841a27a0cbb00"
  },
  {
    "url": "assets/js/24.68fdc0d9.js",
    "revision": "e58e5364351b7355ebbd82bd2989836b"
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
    "url": "assets/js/29.2837f815.js",
    "revision": "dd5427390eebd9f4678c0e8318e1fa67"
  },
  {
    "url": "assets/js/3.0372b456.js",
    "revision": "a5bb535093ebb467215e9f07c3a444c7"
  },
  {
    "url": "assets/js/30.0c1911ba.js",
    "revision": "1ea08f9170bc33acbd2b57e7a1765c84"
  },
  {
    "url": "assets/js/31.784d01f7.js",
    "revision": "976c95e08bdf34b9ace5766b5f234af3"
  },
  {
    "url": "assets/js/32.e10b983a.js",
    "revision": "ace279f98c0cb1cb13fd96afa57f4eef"
  },
  {
    "url": "assets/js/33.1dc77f24.js",
    "revision": "9066dde55846b963d1745817506847c3"
  },
  {
    "url": "assets/js/34.3e28c7b1.js",
    "revision": "e4632f2f037b2478d7a9a113362578ac"
  },
  {
    "url": "assets/js/35.87737316.js",
    "revision": "102162eeb49557526c90e1ca984da7fd"
  },
  {
    "url": "assets/js/36.a0de58c3.js",
    "revision": "9c5a2b156718b5799ee9077baf8abe66"
  },
  {
    "url": "assets/js/37.b7ee0d55.js",
    "revision": "dc94b9a1ba5415a89a8707d0b26ce390"
  },
  {
    "url": "assets/js/38.975ec3b2.js",
    "revision": "914c4164e5272e28b981074169d2a719"
  },
  {
    "url": "assets/js/39.d2126f01.js",
    "revision": "9fc534c4805d320eaea133d04baee638"
  },
  {
    "url": "assets/js/4.40af2689.js",
    "revision": "74645a4dcf6ee43584c902f6eced13f5"
  },
  {
    "url": "assets/js/40.51118f2c.js",
    "revision": "5e94d7450c4c562076fea0b53c79f3a9"
  },
  {
    "url": "assets/js/41.b1c1c03e.js",
    "revision": "53372b21c1ecf135b4b12f1803b3ace1"
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
    "url": "assets/js/44.adc11702.js",
    "revision": "d8e625627d97331f5f0f0ed94103615b"
  },
  {
    "url": "assets/js/45.9099ae50.js",
    "revision": "c1b6fd7b91da7a55af5fafad9cd3d924"
  },
  {
    "url": "assets/js/46.e4b9e7d4.js",
    "revision": "f226cf7f3c907e45ee346dd9351eda5b"
  },
  {
    "url": "assets/js/47.5c03f344.js",
    "revision": "d4e09ec1024c82b6394f7b30c6e810f5"
  },
  {
    "url": "assets/js/48.5d3256bd.js",
    "revision": "e4b0ba9799bd89e3fff9a45107b7b042"
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
    "url": "assets/js/50.0061bed0.js",
    "revision": "8f3450fe70b424731962c36036c6457c"
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
    "url": "assets/js/8.5a53cddc.js",
    "revision": "dea76fa92c61d7b8d1e59640eb8b9473"
  },
  {
    "url": "assets/js/9.61691add.js",
    "revision": "41db3be8e8b30678f534943820cd7868"
  },
  {
    "url": "assets/js/app.d188163f.js",
    "revision": "73e391d82be74fed772282c491ba1abe"
  },
  {
    "url": "categories/FrontEnd/index.html",
    "revision": "8a846df2948c51b9fdd07f839c9de841"
  },
  {
    "url": "categories/index.html",
    "revision": "2554c192586e44fdb4ae835f6afeee0e"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "2f584339a10ce6ce03ae07d94ab2dba2"
  },
  {
    "url": "categories/ReactAhooks/index.html",
    "revision": "1d15cc678557a00ad478d6117f331f25"
  },
  {
    "url": "categories/SourceCode/index.html",
    "revision": "e91693731b70d7f53523fe785d67b5ce"
  },
  {
    "url": "categories/TypeScript/index.html",
    "revision": "b37a3b0b206e43af77f0f818a221db67"
  },
  {
    "url": "categories/Vite/index.html",
    "revision": "ad33e1819e5e8a2e0e8d89242baea061"
  },
  {
    "url": "categories/Vue/index.html",
    "revision": "241d6ee4b90ce2e2403411e3895ce376"
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
    "revision": "d4baa75f30055b99a98002e2f35992b8"
  },
  {
    "url": "note/index.html",
    "revision": "14eba7fbff072b5c1c1b3c937d68bae3"
  },
  {
    "url": "note/ui-link/1.html",
    "revision": "062d82c22c970690e8ecd562bb5bbc52"
  },
  {
    "url": "note/ui-link/2.html",
    "revision": "584ca3aa3ef7fef2019e94ed4aa8a285"
  },
  {
    "url": "note/ui-link/3.html",
    "revision": "a81e723480d8c9091e73d1664e95d38a"
  },
  {
    "url": "star.png",
    "revision": "f839cadd169727f31a195d0b53d05807"
  },
  {
    "url": "tag/FrontEnd/index.html",
    "revision": "84ed04b7cc16963a2872012679ea586f"
  },
  {
    "url": "tag/index.html",
    "revision": "051323cd3b6b6f843897ca30bc4967ea"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "85e9bf5145cd358da85d11925ec3c87a"
  },
  {
    "url": "tag/ReactAhooks/index.html",
    "revision": "1face6c4941c1a38193314c46a5c69e3"
  },
  {
    "url": "tag/SourceCode/index.html",
    "revision": "2b005bc3ef688d37e644c08041850451"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "8562e35d2b5f67adde3973a9862332cc"
  },
  {
    "url": "tag/Vite/index.html",
    "revision": "e748ed765160cea0c4c08a1063522d56"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "1e44f9238ba59892a2303d279d47edcf"
  },
  {
    "url": "timeline/index.html",
    "revision": "e9d6178533ee10b1da578feeb2fd6e62"
  },
  {
    "url": "views/javascript/array.html",
    "revision": "4f03fbe3f9b3e8de2abcc7cd9f016f19"
  },
  {
    "url": "views/javascript/async.html",
    "revision": "188f4e133c3c90c65cbbca111d6b11a0"
  },
  {
    "url": "views/javascript/eventbus.html",
    "revision": "10d387d8ef500bf54d999280963982cc"
  },
  {
    "url": "views/javascript/fn.html",
    "revision": "81142a4d7e9c42c03074301b55917ffa"
  },
  {
    "url": "views/javascript/mylocalstorage.html",
    "revision": "59b3d02aad8d511c3f74fa7139bdcd20"
  },
  {
    "url": "views/javascript/mypromise.html",
    "revision": "c007c87cbe35e30c2d997f4b3788c9aa"
  },
  {
    "url": "views/javascript/upload.html",
    "revision": "790243cd23fab9c0a0da17f992157855"
  },
  {
    "url": "views/react-ahooks/dev/usetrackedeffect/index.html",
    "revision": "f68d0b4d4c7103a125a3d3ea0b2f438c"
  },
  {
    "url": "views/react-ahooks/dev/usewhydidyouupdate/index.html",
    "revision": "e5170b461000e5820b74f9f734275a18"
  },
  {
    "url": "views/react-ahooks/effect/useupdate/index.html",
    "revision": "06a218d9a30a44ceae2b97255e25019d"
  },
  {
    "url": "views/react-ahooks/effect/useupdateeffect/index.html",
    "revision": "f6810888fdfdeb5845fd639d3fad4975"
  },
  {
    "url": "views/react-ahooks/life-cycle/usemount/index.html",
    "revision": "004cc0d90388188d14046740e630ac0e"
  },
  {
    "url": "views/react-ahooks/life-cycle/useunmount/index.html",
    "revision": "a7f3fa218d667b6f859b252b36707c2e"
  },
  {
    "url": "views/react-ahooks/life-cycle/useunmountedref/index.html",
    "revision": "35d181119a294eaf0348f31f8a0d6e90"
  },
  {
    "url": "views/react-ahooks/state/useboolean/index.html",
    "revision": "478c89666dcecf264e9150d335e50dbb"
  },
  {
    "url": "views/react-ahooks/state/usedebounce/index.html",
    "revision": "d5114242c2c0ea03d0cd1cdde16ca9f5"
  },
  {
    "url": "views/react-ahooks/state/usetoggle/index.html",
    "revision": "cf8d4f8a1fd02b88105e4a197a841c3c"
  },
  {
    "url": "views/source-code/computed.html",
    "revision": "eb3f29fb68c490e898b2c58226965b0a"
  },
  {
    "url": "views/source-code/effect.html",
    "revision": "c0e6a4b6888575500520efe23c7bb330"
  },
  {
    "url": "views/source-code/reactivity.html",
    "revision": "d91bbc1ad11819deeaf213aca48f6134"
  },
  {
    "url": "views/source-code/ref.html",
    "revision": "d8f693143fa28d94ddfe1e8c39e83a88"
  },
  {
    "url": "views/source-code/vuex.html",
    "revision": "39a7fc7cc10ed60e82d03b006d0aae52"
  },
  {
    "url": "views/source-code/watch.html",
    "revision": "2c706c95bf25c9b97e5ee69d78c0e575"
  },
  {
    "url": "views/typescript/decorator.html",
    "revision": "68a3ec45902bcbd22e703a926be865b5"
  },
  {
    "url": "views/typescript/types-changes.html",
    "revision": "4c50dc258026e28a84afb77c73599fd3"
  },
  {
    "url": "views/vite/create-code.html",
    "revision": "84a178c19656f0fd60e3a6e02b51630f"
  },
  {
    "url": "views/vite/create-lint.html",
    "revision": "aea6044618cf5850fb027ba82d4796c1"
  },
  {
    "url": "views/vite/jsx.html",
    "revision": "180e77acfbe8c28a6bd11a918b0a5479"
  },
  {
    "url": "views/vue/message.html",
    "revision": "8aa0774aea839d2f3e3aeab839b110e5"
  },
  {
    "url": "views/vue/option-api.html",
    "revision": "ef16ea0bad1c8617c894395c0d21cc10"
  },
  {
    "url": "views/vue/popup.html",
    "revision": "e8fb386621fc761b16ec6a54a3190599"
  },
  {
    "url": "views/vue/refresh.html",
    "revision": "be92b8027312262e7fc8842b6d1b6574"
  },
  {
    "url": "views/zustand/create.html",
    "revision": "027e66f15de92763a98923f392b07cc7"
  },
  {
    "url": "views/zustand/index.html",
    "revision": "dedb12ca1ba541450df8cdd8aab88f65"
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
