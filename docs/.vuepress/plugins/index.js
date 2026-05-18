const kbn = require("./KanBanNiang");
const music = require("./BgMusic");
module.exports = [
  // [
  //   kbn,
  //   {
  //     editorBtnVisible: true,
  //     messages: {
  //       default: 'default',
  //       home: '心里的花，我想要带你回家。',
  //       close: '你知道我喜欢吃什么吗？痴痴地望着你,哈哈哈哈哈。',
  //       more: '想知道关于我的更多信息吗？点击带你回到我的家',
  //       theme: '你喜欢我的其他小伙伴吗？！！！'
  //     }
  //   }
  // ],
  // [
  //   music,
  //   {
  //     audios: [
  //       {
  //         name: '我再没见过 像你一般的星空',
  //         artist: 'Seto',
  //         url: 'https://assets.smallsunnyfox.com/music/2.mp3',
  //         cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
  //       },
  //       {
  //         name: '萤火之森',
  //         artist: 'CMJ',
  //         url: 'https://assets.smallsunnyfox.com/music/3.mp3',
  //         cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
  //       }
  //     ]
  //   }
  // ],
  [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新",
      },
    },
  ],
  [
    "permalink-pinyin",
    {
      lowercase: true,
      separator: "-",
    },
  ],
];
