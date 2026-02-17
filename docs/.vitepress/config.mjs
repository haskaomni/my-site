import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Omni笔记",
  description: "AI · Web3 · 前沿科技翻译与笔记",
  base: '/my-site/',
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://haskaomni.github.io/my-site/og-cover.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://haskaomni.github.io/my-site/og-cover.png' }],
  ],
  transformPageData(pageData) {
    const title = pageData.frontmatter.title || pageData.title || 'Omni笔记'
    const desc = pageData.frontmatter.description || pageData.description || 'AI · Web3 · 前沿科技翻译与笔记'
    const url = `https://haskaomni.github.io/my-site/${pageData.relativePath.replace(/\.md$/, '.html')}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }],
    )
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/openclaw-autonomous-agent-patterns' }
    ],
    sidebar: [
      {
        text: '博客',
        items: [
          { text: '留下的代价', link: '/blog/cost-of-staying' },
          { text: 'InferenceX v2：Blackwell vs AMD vs Hopper', link: '/blog/inferencex-v2-blackwell-vs-amd' },
          { text: '世界秩序已正式崩塌', link: '/blog/world-order-broken-down' },
          { text: '解决一切：2035 年实现富足', link: '/blog/solve-everything' },
          { text: '12 个 Claude 提示词，替代投行工作', link: '/blog/claude-financial-prompts' },
          { text: 'Anthropic 经济未来：AI 变革与投资机会', link: '/blog/anthropic-economic-futures' },
          { text: '7 个实战 Agent 运行模式', link: '/blog/openclaw-autonomous-agent-patterns' },
          { text: 'AI 图片生成模型横评', link: '/blog/ai-image-model-compare' },
          { text: '那我该怎么办？', link: '/blog/so-what-should-i-do' },
          { text: '工具形状的物体', link: '/blog/tool-shaped-objects' },
          { text: '大事正在发生', link: '/blog/big-things-happening' },
          { text: 'Shell + Skills + 压缩', link: '/blog/skills-shell-tips' },
          { text: 'Zero：去中心化多核世界计算机', link: '/blog/layerzero-zero' },
          { text: '心智编程现实：完整操作系统', link: '/blog/mind-programs-reality' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/haskaomni' }
    ]
  }
})
