import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Site",
  description: "A VitePress Site",
  base: '/my-site/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
