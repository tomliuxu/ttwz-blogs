const head = require('./config/head')
const plugins = require('./plugins')
const themeConfig = require('./config/themeConfig')

module.exports = {
  dest: 'blog',
  theme: 'reco',
  title: '铁头娃子的小世界',
  description: '',
  base: '/ttwzlx-blogs/', // 部署的根路径
  markdown: {
    lineNumbers: true
  },
  dest: './dist',
  head,
  plugins,
  themeConfig
}
