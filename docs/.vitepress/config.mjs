import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Omni笔记",
  description: "AI · Web3 · 前沿科技翻译与笔记",
  base: '/my-site/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/big-things-happening' }
    ],
    sidebar: [
      {
        text: '博客',
        items: [
          { text: '大事正在发生', link: '/blog/big-things-happening' },
          { text: 'Shell + Skills + 压缩', link: '/blog/skills-shell-tips' },
          { text: 'Zero：去中心化多核世界计算机', link: '/blog/layerzero-zero' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/haskaomni' }
    ]
  }
})
