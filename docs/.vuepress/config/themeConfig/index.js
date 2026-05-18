const friendLink = require("./friendLink");
const nav = require("./nav");
const sidebar = require("./sidebar");
const blogConfig = require("./blogConfig");
module.exports = {
  type: "blog",
  huawei: false,
  nav,
  friendLink,
  blogConfig,
  activeHeaderLinks: false,
  logo: "",
  search: true, // 是否允许全局搜索
  searchMaxSuggestions: 10,
  sidebar, // 侧边栏
  subSidebar: "auto", // 自动形成侧边栏
  sidebarDepth: 1,
  displayAllHeaders: false,
  lastUpdated: "Last Updated", // 最后更新时间
  author: "铁头娃子",
  authorAvatar:
    "https://p26-passport.byteacctimg.com/img/user-avatar/49a42beebf221133693940ce73a348a0~120x120.awebp", // avatar
  record: "", // 备案号
  recordLink: "https://beian.miit.gov.cn/",
  cyberSecurityRecord: "",
  cyberSecurityLink: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41172602000151",
  startYear: "2021", // 项目开始时间
  /**
   * valine 设置 (if you need valine comment )
   */
  valineConfig: {
    appId: "XDwlSXS2pD137bPrPpwQaqqD-gzGzoHsz", // your appId
    appKey: "CQ8FKrMUP76LwycPcKlDoRqV", // your appKey
    placeholder: "来吧，开始你的表演",
    avatar: "wavatar",
    serverUrl: "https://leanserver.smallsunnyfox.com",
  },
};
