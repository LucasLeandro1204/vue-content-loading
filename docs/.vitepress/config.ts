import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue Content Loading',
  description: 'Tiny, accessible SVG content loaders for Vue 3.',
  base: '/vue-content-loading/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['link', { rel: 'icon', href: '/vue-content-loading/logo.svg', type: 'image/svg+xml' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Presets', link: '/presets' },
      { text: 'Migration', link: '/guide/migration' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Custom loaders', link: '/guide/custom-loaders' },
          { text: 'Accessibility', link: '/guide/accessibility' },
          { text: 'Why SVG', link: '/guide/why-svg' },
          { text: 'Migrate from v1', link: '/guide/migration' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Presets', link: '/presets' },
          { text: 'Development', link: '/development' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LucasLeandro1204/vue-content-loading' },
    ],
    editLink: {
      pattern: 'https://github.com/LucasLeandro1204/vue-content-loading/edit/develop/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2017-present Lucas Leandro',
    },
  },
});
