module.exports = {
  title: 'Vue Content Loading',
  description: 'Vue component to easily build (or use presets) SVG loading cards Facebook like',

  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
  ],

  themeConfig: {
    repo: 'LucasLeandro1204/vue-content-loading',
    repoLabel: 'GitHub',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    displayAllHeaders: true,

    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Presets',
        link: '/presets/',
      },
    ],

    sidebar: [
      '/guide/',
      '/presets/',
      '/development/',
    ],
  },
};
