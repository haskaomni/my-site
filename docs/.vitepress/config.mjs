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
      { text: '博客', link: '/blog/nvidia-ai-five-layer-cake' }
    ],
    sidebar: [
      {
        text: '🤖 AI 技术与工具',
        collapsed: false,
        items: [
          { text: '驾驭工程即控制论', link: '/blog/harness-engineering-is-cybernetics' },
          { text: '我如何使用 Claude Code', link: '/blog/how-i-use-claude-code' },
          { text: 'Claude C 编译器：揭示软件的未来', link: '/blog/claude-c-compiler-future-of-software' },
          { text: 'ARC-AGI-3：Opus 4.6 vs Gemini 3.1 Pro', link: '/blog/arc-agi-3-opus-vs-gemini' },
          { text: 'AI 图片生成模型横评', link: '/blog/ai-image-model-compare' },
          { text: 'InferenceX v2：Blackwell vs AMD vs Hopper', link: '/blog/inferencex-v2-blackwell-vs-amd' },
          { text: '7 个实战 Agent 运行模式', link: '/blog/openclaw-autonomous-agent-patterns' },
          { text: 'Shell + Skills + 压缩', link: '/blog/skills-shell-tips' },
        ]
      },
      {
        text: '📈 宏观经济与投资',
        collapsed: false,
        items: [
          { text: 'AI 是一块五层蛋糕', link: '/blog/nvidia-ai-five-layer-cake' },
          { text: '5个扑克概念，让你成为更好的交易者', link: '/blog/poker-concepts-for-trading' },
          { text: '内存短缺是人为制造的吗？', link: '/blog/is-the-memory-shortage-intentional' },
          { text: '指数地平线：最不对称的时刻', link: '/blog/the-exponential-horizon' },
          { text: '英伟达财报前的一些思考', link: '/blog/nvidia-thoughts-before-earnings' },
          { text: '2028 全球智能繁荣', link: '/blog/2028-global-intelligence-boom' },
          { text: '2028 全球智能危机', link: '/blog/2028-global-intelligence-crisis' },
          { text: '12 个 Claude 提示词，替代投行工作', link: '/blog/claude-financial-prompts' },
          { text: 'Anthropic 经济未来：AI 变革与投资机会', link: '/blog/anthropic-economic-futures' },
          { text: '世界秩序已正式崩塌', link: '/blog/world-order-broken-down' },
        ]
      },
      {
        text: '💡 AI 与社会',
        collapsed: false,
        items: [
          { text: '大事正在发生', link: '/blog/big-things-happening' },
          { text: '那我该怎么办？', link: '/blog/so-what-should-i-do' },
          { text: '留下的代价', link: '/blog/cost-of-staying' },
          { text: '解决一切：2035 年实现富足', link: '/blog/solve-everything' },
          { text: '工具形状的物体', link: '/blog/tool-shaped-objects' },
        ]
      },
      {
        text: '📊 价值投资',
        collapsed: false,
        items: [
          { text: '硅升碳降·价值筛选 2026-03-11', link: '/blog/value-screen-2026-03-11' },
          { text: '硅升碳降·价值筛选 2026-03-10', link: '/blog/value-screen-2026-03-10' },
          { text: '硅升碳降·价值筛选 2026-03-09', link: '/blog/value-screen-2026-03-09' },
          { text: '硅升碳降·价值筛选 2026-03-06', link: '/blog/value-screen-2026-03-06' },
          { text: '硅升碳降·价值筛选 2026-03-05', link: '/blog/value-screen-2026-03-05' },
          { text: '硅升碳降·价值筛选 2026-03-04', link: '/blog/value-screen-2026-03-04' },
          { text: '硅升碳降·价值筛选 2026-03-03', link: '/blog/value-screen-2026-03-03' },
          { text: '硅升碳降·价值筛选 2026-03-02', link: '/blog/value-screen-2026-03-02' },
        ]
      },
      {
        text: '🔗 Web3',
        collapsed: false,
        items: [
          { text: 'Jane Street 如何操纵比特币价格', link: '/blog/jane-street-broke-bitcoin-price' },
          { text: 'Zero：去中心化多核世界计算机', link: '/blog/layerzero-zero' },
        ]
      },
      {
        text: '🧠 其他',
        collapsed: true,
        items: [
          { text: '量子计算机给自己取名 YOVUH', link: '/blog/quantum-computer-named-itself-yovuh' },
          { text: '心智编程现实：完整操作系统', link: '/blog/mind-programs-reality' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/haskaomni' }
    ]
  }
})
