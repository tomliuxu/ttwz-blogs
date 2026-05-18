const { resolve } = require('path')

module.exports = (options, context) => ({
  define() {
    const { editorBtnStyles, messages } = options

    return {
      MESSAGES: messages,
      EDITOR_BTN_STYLES: editorBtnStyles
    }
  },
  name: '@vuepress-reco/vuepress-plugin-kan-ban-niang',
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'KanBanNiang'
})
