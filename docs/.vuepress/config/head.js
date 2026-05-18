module.exports = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }
  ],
  ['link', { rel: 'manifest', href: '/manifest.json' }],
  ['meta', { name: 'theme-color', content: '#FF66CC' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-icon', href: '/icons/LatteAndCat.png' }],
  [
    'link',
    { rel: 'mask-icon', href: '/icons/LatteAndCat.svg', color: '#FF66CC' }
  ],
  [
    'meta',
    { name: 'msapplication-TileImage', content: '/icons/LatteAndCat.png' }
  ],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
]
