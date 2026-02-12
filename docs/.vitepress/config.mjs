import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Site",
  description: "A VitePress Site",
  base: '/my-site/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '博客', link: '/blog/big-things-happening' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '博客',
        items: [
          { text: '大事正在发生', link: '/blog/big-things-happening' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/haskaomni' }
    ]
  }
})
