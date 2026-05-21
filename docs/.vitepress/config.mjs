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
      { text: '博客', link: '/blog/economics-of-last-1cm-ai-gpu-power' }
    ],
    sidebar: [
      {
        text: '🤖 AI 技术与工具',
        collapsed: false,
        items: [
          { text: 'Karri Saarinen：关于 AI 的一些笔记', link: '/blog/karri-saarinen-some-notes-on-ai' },
          { text: '霍尔木兹海峡：Citrini 实地考察', link: '/blog/strait-of-hormuz-citrini-field-trip' },
          { text: 'AutoAgent：首个开源的自优化 Agent 库', link: '/blog/autoagent-self-optimizing-agents' },
          { text: '黄仁勋对谈实录：NVIDIA、AI 革命与万亿级未来', link: '/blog/jensen-huang-lex-fridman-transcript' },
          { text: '驾驭工程即控制论', link: '/blog/harness-engineering-is-cybernetics' },
          { text: '我如何使用 Claude Code', link: '/blog/how-i-use-claude-code' },
          { text: 'Claude C 编译器：揭示软件的未来', link: '/blog/claude-c-compiler-future-of-software' },
          { text: 'ARC-AGI-3：Opus 4.6 vs Gemini 3.1 Pro', link: '/blog/arc-agi-3-opus-vs-gemini' },
          { text: 'AI 图片生成模型横评', link: '/blog/ai-image-model-compare' },
          { text: 'GTC 2026 深度复盘：七芯五架一平台', link: '/blog/nvidia-gtc-2026-post-keynote-reaction' },
          { text: 'InferenceX v2：Blackwell vs AMD vs Hopper', link: '/blog/inferencex-v2-blackwell-vs-amd' },
          { text: '7 个实战 Agent 运行模式', link: '/blog/openclaw-autonomous-agent-patterns' },
          { text: 'Shell + Skills + 压缩', link: '/blog/skills-shell-tips' },
        ]
      },
      {
        text: '💾 半导体与硬件',
        collapsed: false,
        items: [
          { text: 'Agentic AI 的存储冲击', link: '/blog/the-agentic-ai-storage-shock' },
          { text: '最后 1 厘米的经济学：AI GPU 电源', link: '/blog/economics-of-last-1cm-ai-gpu-power' },
          { text: 'AI 供应链瓶颈评级：Irrational Analysis 访谈', link: '/blog/ai-supply-chain-bottlenecks-irrational-analysis-interview' },
          { text: '一颗芯片如何诞生：从设计、制造到交付', link: '/blog/chip-design-manufacturing-delivery' },
        ]
      },
      {
        text: '📈 宏观经济与投资',
        collapsed: false,
        items: [
          { text: 'AI 供应链瓶颈股票清单', link: '/blog/ai-supply-chain-bottleneck-stocks-from-tweet' },
          { text: 'NVIDIA 800 VDC 生态供应商股票清单', link: '/blog/nvidia-800vdc-ecosystem-stocks' },
          { text: '终端价值的崩塌：AI让护城河变临时', link: '/blog/collapse-of-terminal-value' },
          { text: '超音速海啸：未来6个月', link: '/blog/supersonic-tsunami-next-6-months' },
          { text: '聪明人为什么总没钱：5个数学错误', link: '/blog/why-smart-people-stay-broke' },
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
          { text: 'Claude Mythos 系统卡导读', link: '/blog/claude-mythos-system-card' },
          { text: 'Sam Altman 能被托付未来吗？', link: '/blog/sam-altman-trust-and-openai-governance' },
          { text: 'iOS Web 音频开发踩坑实录', link: '/blog/ios-web-audio-pitfalls' },
          { text: '从层级制到智能体公司', link: '/blog/from-hierarchy-to-intelligence' },
          { text: 'AI 正在进化——也在改写我们对智能的理解', link: '/blog/ai-evolving-changing-understanding-of-intelligence' },
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
          { text: '每日价值筛选 2026-04-06：算力硬件、光学复苏、卖水网络里的三张便宜票', link: '/blog/value-screen-2026-04-06' },
          { text: '每日价值筛选 2026-03-30：AI 基础设施里最便宜的三张票', link: '/blog/value-screen-2026-03-30' },
          { text: '硅升碳降·价值筛选总纲', link: '/blog/value-screen-overview' },
        ]
      },
      {
        text: '🔗 Web3',
        collapsed: false,
        items: [
          { text: '挖矿 Pearl/PRL：PoUW 链的收益、风险与单机启动提示词', link: '/blog/pearl-prl-pouw-mining' },
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
