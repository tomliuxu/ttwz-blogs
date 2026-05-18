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
    "revision": "40acf38db26713dc7ca315f667d6eee6"
  },
  {
    "url": "about/index.html",
    "revision": "242b88ad5c6b563af6b694c716072131"
  },
  {
    "url": "assets/css/0.styles.1101ddcc.css",
    "revision": "2f0b398a001530aa344d2154185aff0f"
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
    "url": "assets/js/1.e479ce56.js",
    "revision": "9bc761279037bd057700069654ba39e8"
  },
  {
    "url": "assets/js/10.6a80932b.js",
    "revision": "93da95ce7c5109b076600a88f0009b38"
  },
  {
    "url": "assets/js/11.2d2839a6.js",
    "revision": "8d36bfe3fa2a7c3ad5e561bf8d81940a"
  },
  {
    "url": "assets/js/12.c58cf514.js",
    "revision": "252601db976260fb7ddb7132f11d9d38"
  },
  {
    "url": "assets/js/13.457faad3.js",
    "revision": "d299190fcf00bcca3ba1ef57699e1930"
  },
  {
    "url": "assets/js/14.44e8c679.js",
    "revision": "671df4037e23de51f45c88433c2315ad"
  },
  {
    "url": "assets/js/15.a913d52a.js",
    "revision": "d002649aa2231338e72620feb7b0e3f9"
  },
  {
    "url": "assets/js/16.dfed7729.js",
    "revision": "877b0954a7052abe74d0ef9743adde41"
  },
  {
    "url": "assets/js/17.9eb0759a.js",
    "revision": "c277adff1d56c4562820ef21d4431b7a"
  },
  {
    "url": "assets/js/18.81e2c34d.js",
    "revision": "5a58a1c5e53974a2605a18a949914f50"
  },
  {
    "url": "assets/js/19.f0d9253b.js",
    "revision": "65655062fa52246d3ce8fc19f44e0bcb"
  },
  {
    "url": "assets/js/20.9b9feba9.js",
    "revision": "e00ea6bde4a58a646bf2ba80aa600a90"
  },
  {
    "url": "assets/js/21.830e4136.js",
    "revision": "8a9595a0c1bf04d7946543c5f64fc81e"
  },
  {
    "url": "assets/js/22.c768294a.js",
    "revision": "57cd12bbc2d4b60ee4e92973236e2e4e"
  },
  {
    "url": "assets/js/23.c0018204.js",
    "revision": "62df4d4cdd0ea49a96df126c2d871bee"
  },
  {
    "url": "assets/js/24.9c0aaaf6.js",
    "revision": "c6318b3b86aae61229d80b4040667615"
  },
  {
    "url": "assets/js/25.17e1742b.js",
    "revision": "0098f2f27caeb125debf48a921902ef1"
  },
  {
    "url": "assets/js/26.f75faab7.js",
    "revision": "15680902dfa35427ee33ff9ca168caad"
  },
  {
    "url": "assets/js/27.d3f76d44.js",
    "revision": "b0977d56d99e5540fb70706ec433106d"
  },
  {
    "url": "assets/js/28.d49ab066.js",
    "revision": "ce69c8aa648671350cd7a71770471dfb"
  },
  {
    "url": "assets/js/29.100b1dd3.js",
    "revision": "9d93a259f840c2ffe5b46936e2a8836a"
  },
  {
    "url": "assets/js/3.efc60c34.js",
    "revision": "75d99894f0baf642abcf253a42bcb04b"
  },
  {
    "url": "assets/js/30.3dccf267.js",
    "revision": "401f3f18fd62232d612a99a36c391e1d"
  },
  {
    "url": "assets/js/31.546b8e97.js",
    "revision": "3ea6ef7ba77c403729dd6a03fd56b8a8"
  },
  {
    "url": "assets/js/32.0da84a96.js",
    "revision": "664012209b5e5990786a0e9122b6c6a8"
  },
  {
    "url": "assets/js/33.f2527c4b.js",
    "revision": "b6c434c213459bf7d07400b83033af7d"
  },
  {
    "url": "assets/js/34.c811e961.js",
    "revision": "8d47dc7634d4720819088b0961766cea"
  },
  {
    "url": "assets/js/35.e50cdce4.js",
    "revision": "be0cd9c45f056471187cfb1e0abf5b44"
  },
  {
    "url": "assets/js/36.b812828d.js",
    "revision": "550d958856522aec662e4850deffe0ef"
  },
  {
    "url": "assets/js/37.edd78ac1.js",
    "revision": "ab8a083f0f59a1d9ad769fd7553877df"
  },
  {
    "url": "assets/js/38.2b1a0544.js",
    "revision": "f8fca930e6f52ff8be063cc7e1f1acf0"
  },
  {
    "url": "assets/js/39.582f190e.js",
    "revision": "d0bdd78e1606b91e90f36fd53c7297da"
  },
  {
    "url": "assets/js/4.65e18e94.js",
    "revision": "9cefe82e9df65a817e535bb59cd59db5"
  },
  {
    "url": "assets/js/40.c1eeefb5.js",
    "revision": "612583641b8c343682a97f6025fa3f36"
  },
  {
    "url": "assets/js/41.24709f0d.js",
    "revision": "b631607145f9357dad065cffcb831426"
  },
  {
    "url": "assets/js/42.138016d4.js",
    "revision": "6bed5b2c51b14ca6ee74e9fd17a52b77"
  },
  {
    "url": "assets/js/43.c4bdb005.js",
    "revision": "2b59417af80b1d02a5021db0372bdc65"
  },
  {
    "url": "assets/js/44.6e3cbe58.js",
    "revision": "9322d037466de1b161461d6a4ee21fa2"
  },
  {
    "url": "assets/js/45.3229933e.js",
    "revision": "fa301aad43482be62a7e7b9be48caf06"
  },
  {
    "url": "assets/js/46.39bb97fc.js",
    "revision": "6adf63b052fe40e70a066e5ac0808223"
  },
  {
    "url": "assets/js/47.3a5d7d91.js",
    "revision": "6c19fd95ce2620f43e341f6607baa0bd"
  },
  {
    "url": "assets/js/48.dcaedce5.js",
    "revision": "6f670f62a27febae2fcb4c169c05585e"
  },
  {
    "url": "assets/js/49.5a7f6574.js",
    "revision": "26006baf976419a87d48d57aa5ad505f"
  },
  {
    "url": "assets/js/5.c02c84e6.js",
    "revision": "d5c620ab0e73f41d5d4adcfe3c973928"
  },
  {
    "url": "assets/js/50.41235a1f.js",
    "revision": "e55bde5646c3e579db8b9161c279de1a"
  },
  {
    "url": "assets/js/51.60be34eb.js",
    "revision": "203c1a99a1da5652a6e0c6d7cede8439"
  },
  {
    "url": "assets/js/6.f80adabf.js",
    "revision": "ef2677e8e172182c53162c0a790c0ea1"
  },
  {
    "url": "assets/js/7.de8a164d.js",
    "revision": "dffabffe11750fa4ca84be12e98cbf0f"
  },
  {
    "url": "assets/js/8.1e1c9c24.js",
    "revision": "effc336bfe8993665ca4e02640a365e8"
  },
  {
    "url": "assets/js/9.a26e0943.js",
    "revision": "abd43dc8ddfa0891f3a58315833d2b2e"
  },
  {
    "url": "assets/js/app.12d98f9b.js",
    "revision": "10dddc94bce3094a97029cd5f0dac329"
  },
  {
    "url": "categories/FrontEnd/index.html",
    "revision": "2c441da34fbed8ed4a88c0f3b4bd9fdd"
  },
  {
    "url": "categories/index.html",
    "revision": "5399335b54cff7f4a8d0763d0ff73862"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "130ca037118495e0bfcc72c3283c3d7b"
  },
  {
    "url": "categories/ReactAhooks/index.html",
    "revision": "dbb2b8b25d6f88593281c4ec06f937f5"
  },
  {
    "url": "categories/SourceCode/index.html",
    "revision": "77566de0a258651389c14325f2b0c838"
  },
  {
    "url": "categories/TypeScript/index.html",
    "revision": "0e037e244d76750e8ba07ae7164b38dc"
  },
  {
    "url": "categories/Vite/index.html",
    "revision": "d019478d34d98ab674067ba283526107"
  },
  {
    "url": "categories/Vue/index.html",
    "revision": "aa2c6f55b9ac7587944b6fbb7ee531d9"
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
    "revision": "ce06792248bc383900494f16afdbd160"
  },
  {
    "url": "note/index.html",
    "revision": "4bb6157f22fa6ef133de16824f7b22be"
  },
  {
    "url": "note/ui-link/1.html",
    "revision": "d9affeef5c30c3c916271620e0f9a2dd"
  },
  {
    "url": "note/ui-link/2.html",
    "revision": "d19153753c1e0255416dfe14ee919159"
  },
  {
    "url": "note/ui-link/3.html",
    "revision": "727d7ac4a884faad9c01828b5613e761"
  },
  {
    "url": "star.png",
    "revision": "f839cadd169727f31a195d0b53d05807"
  },
  {
    "url": "tag/FrontEnd/index.html",
    "revision": "4a9b59fd9f3bad28a7103d2dbf9063a8"
  },
  {
    "url": "tag/index.html",
    "revision": "a98797937c11a759f1baf0ded1e2e4c7"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "84634d2c86b11f71971c1dfb53632aa2"
  },
  {
    "url": "tag/ReactAhooks/index.html",
    "revision": "bc5d19bbbea19816c2df49c783fd92b4"
  },
  {
    "url": "tag/SourceCode/index.html",
    "revision": "1be318da3936b41e8ea9f00f46248c79"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "bae6217db7a1216fab1c250ed09daca2"
  },
  {
    "url": "tag/Vite/index.html",
    "revision": "e406a9d6b3c802cef18133e03d0c5904"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "fc3083b68f85ff898437df6fe2f2ef86"
  },
  {
    "url": "timeline/index.html",
    "revision": "70ad60e8c12a8a0fd61f067c60b3c3cd"
  },
  {
    "url": "views/javascript/array.html",
    "revision": "24d86d68f65a4bb8d4898575899cf0b7"
  },
  {
    "url": "views/javascript/async.html",
    "revision": "6de9500cade39f7b2b2b80a1e287aa87"
  },
  {
    "url": "views/javascript/eventbus.html",
    "revision": "8552efd5763d24e46f9179fc544d9cd5"
  },
  {
    "url": "views/javascript/fn.html",
    "revision": "aaf00d3b9584194bec41b75e6562e501"
  },
  {
    "url": "views/javascript/mylocalstorage.html",
    "revision": "0a513514bcf4337482c6d6d4aaad163c"
  },
  {
    "url": "views/javascript/mypromise.html",
    "revision": "57425017d0d26dd5f7096e2bfb75bc63"
  },
  {
    "url": "views/javascript/upload.html",
    "revision": "1735c918f9725546f31193af0e60bc7a"
  },
  {
    "url": "views/react-ahooks/dev/usetrackedeffect/index.html",
    "revision": "138503508fc5c941350d5945ca11e6c8"
  },
  {
    "url": "views/react-ahooks/dev/usewhydidyouupdate/index.html",
    "revision": "cd5d4e66fd786cbe2243dddc7602c660"
  },
  {
    "url": "views/react-ahooks/effect/useupdate/index.html",
    "revision": "0e587a5f3ee04172cd1a687355a156c1"
  },
  {
    "url": "views/react-ahooks/effect/useupdateeffect/index.html",
    "revision": "03f44eace9f8b8fffc0b97bc3158125f"
  },
  {
    "url": "views/react-ahooks/life-cycle/usemount/index.html",
    "revision": "79dfbdefb6d1f5143245db88639ad65c"
  },
  {
    "url": "views/react-ahooks/life-cycle/useunmount/index.html",
    "revision": "f84e582de45d789746832d619fdda054"
  },
  {
    "url": "views/react-ahooks/life-cycle/useunmountedref/index.html",
    "revision": "bd542d61db4c6ecab6c29362a3f3acf4"
  },
  {
    "url": "views/react-ahooks/state/useboolean/index.html",
    "revision": "56dd862eb425027f49f922d44f7a115c"
  },
  {
    "url": "views/react-ahooks/state/usedebounce/index.html",
    "revision": "ce344f503dbcb860760cbcb6c767e2c4"
  },
  {
    "url": "views/react-ahooks/state/usetoggle/index.html",
    "revision": "e4c17129665bfaaef028c68dffe76bd0"
  },
  {
    "url": "views/source-code/computed.html",
    "revision": "a3bf4063cbbb85473af78652f6c848ab"
  },
  {
    "url": "views/source-code/effect.html",
    "revision": "2e41ff5bc56364123197a87f402a1433"
  },
  {
    "url": "views/source-code/reactivity.html",
    "revision": "c98f7991ae3db9e6fc3f05af3c3979e8"
  },
  {
    "url": "views/source-code/ref.html",
    "revision": "dc7acca8486f9f612b0705c4bad381ae"
  },
  {
    "url": "views/source-code/vuex.html",
    "revision": "2a725775b81b85a4a75a7454b3d80e9b"
  },
  {
    "url": "views/source-code/watch.html",
    "revision": "064206b888a28efebfa77a853e25d0a5"
  },
  {
    "url": "views/typescript/decorator.html",
    "revision": "92779c7f84771f803ef0db2ff98d7746"
  },
  {
    "url": "views/typescript/types-changes.html",
    "revision": "241b3af3a413f79344d7edac9130b003"
  },
  {
    "url": "views/vite/create-code.html",
    "revision": "9914a0fba13df67b7f7b92c32c97fb27"
  },
  {
    "url": "views/vite/create-lint.html",
    "revision": "1bcf721e3abf9a7c288d5a1c46ca7595"
  },
  {
    "url": "views/vite/jsx.html",
    "revision": "345da8ffe5e8fe1f919e8c6161437f5a"
  },
  {
    "url": "views/vue/message.html",
    "revision": "b8f1ae71156b85d51a25f06e41beab9f"
  },
  {
    "url": "views/vue/option-api.html",
    "revision": "311e34bad9bc446f3f93c2fb59a1e372"
  },
  {
    "url": "views/vue/popup.html",
    "revision": "3f0d4d95b50c4c2cfaf5dd0831dc2d92"
  },
  {
    "url": "views/vue/refresh.html",
    "revision": "44e94e9f72a383cc8e2fc3cee58d10c7"
  },
  {
    "url": "views/zustand/create.html",
    "revision": "f9cdb01887037c33befe3f9400dfacc2"
  },
  {
    "url": "views/zustand/index.html",
    "revision": "8f89653eccd7392c2b6f910793d2bb3e"
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
