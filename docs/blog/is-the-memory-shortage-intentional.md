---
title: 内存短缺是人为制造的吗？
description: Contrary Research 深度分析：OpenAI 购买的内存晶圆远超实际需求，AI 公司可能在故意制造内存短缺，以扼杀端侧推理、保护云端推理的商业模式。
---

# 内存短缺是人为制造的吗？

> 原文作者：Claire Burch · Contrary Research
> 原文链接：[Contrary Research](https://research.contrary.com/report/is-the-memory-shortage-intentional)
> 发布日期：2026 年 2 月 24 日（更新）
> 阅读时长：约 31 分钟

---

过去两年，AI 基础设施的叙事一直围绕着对计算能力的巨大且不断增长的需求及其经济后果展开——数据中心的建设，以及由此带来的[土地](https://www.cnet.com/tech/services-and-software/features/ai-data-centers-are-coming-for-your-land-water-and-power/)、[水](https://www.lincolninst.edu/publications/land-lines-magazine/articles/land-water-impacts-data-centers/)、[电力](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai)和[铜](https://www.reuters.com/business/energy/ai-boost-copper-demand-50-by-2040-more-mines-needed-ensure-supply-sp-says-2026-01-08/)等关键资源的短缺。

但在所有这些瓶颈中，**内存是迄今为止最重要的**。

对内存的需求现在已经超过了对其他计算能力驱动因素的需求。这一影响不仅会波及数据中心的经济学，还会波及每一台消费级和企业级硬件设备的成本。

本文拆解了内存价格的市场走势、其在消费和工业电子市场的连锁反应，以及围绕 AI 正在形成的供需曲线。关键是，我们解释了为什么 OpenAI 等 AI 公司购买的内存似乎远超其实际需求，以及端侧推理的威胁实际上如何可能激励了一场**人为制造的内存短缺**。

## 2025-2026 年的内存价格

内存价格在过去两年极度波动。

市场动荡始于 2025 年夏天的[关税](https://www.nytimes.com/2025/04/25/business/trump-tariffs-american-importers.html)政策。在此期间，企业通过[削减](https://www.economist.com/the-world-ahead/2025/11/12/companies-will-struggle-to-stay-on-top-of-tariff-chaos)安全库存来最小化意外成本传递的风险，降低了需求。

与此同时，二级内存市场停滞。通常情况下，当三星等主要生产商升级生产线时，会将旧设备出售给低成本制造商，从而扩大全球内存产能。但这一循环实际上已经[停止](https://www.pcgamer.com/hardware/samsung-and-sk-hynix-the-worlds-biggest-makers-of-dram-and-flash-memory-chips-have-potentially-lost-the-right-to-buy-us-equipment-for-use-in-their-china-based-factories/)——韩国企业[担心](https://www.reuters.com/technology/samsung-sk-hynix-halt-old-equipment-sales-over-fears-us-backlash-ft-reports-2024-03-12/)因向中国关联实体出售技术而遭受美国报复，选择将功能性设备闲置而非转售，导致宝贵的产能被搁置。这一放缓因美国商务部对三星和 SK Hynix 等半导体巨头实施严格的进口许可[要求](https://www.pcgamer.com/hardware/samsung-and-sk-hynix-the-worlds-biggest-makers-of-dram-and-flash-memory-chips-have-potentially-lost-the-right-to-buy-us-equipment-for-use-in-their-china-based-factories/)而进一步加剧。

价格上涨始于 2025 年秋季，当时超大规模公司和前沿 AI 巨头开始制定 2026 年及以后的数据中心资本支出计划和预算。这些涨价始于 2025 年 9 月初数据存储硬件制造商 TSMC 和 Sandisk 表面上一次性的 [10%](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/) 涨幅，接着两周后，DRAM 和 NAND 内存芯片的主要制造商 Micron 宣布 [30%](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/) 的涨价。

2025 年 10 月，据报道 [OpenAI](https://research.contrary.com/company/openai) 仅一家就计划消耗全球 DRAM 可用产能的 [40%](https://www.tomshardware.com/pc-components/dram/openais-stargate-project-to-consume-up-to-40-percent-of-global-dram-output-inks-deal-with-samsung-and-sk-hynix-to-the-tune-of-up-to-900-000-wafers-per-month)，即每月 [90 万片晶圆](https://www.tomshardware.com/pc-components/dram/openais-stargate-project-to-consume-up-to-40-percent-of-global-dram-output-inks-deal-with-samsung-and-sk-hynix-to-the-tune-of-up-to-900-000-wafers-per-month)，用于其全球 Stargate 计算集群。这一内存容量将通过同时与[三星](https://news.samsung.com/global/samsung-and-openai-announce-strategic-partnership-to-accelerate-advancements-in-global-ai-infrastructure)和 SK Hynix 签署的两份[协议](https://www.tomshardware.com/pc-components/dram/openais-stargate-project-to-consume-up-to-40-percent-of-global-dram-output-inks-deal-with-samsung-and-sk-hynix-to-the-tune-of-up-to-900-000-wafers-per-month)来供应。作为协议的一部分，三星将与 OpenAI 合作运营和设计位于韩国的 Stargate 数据中心。这两笔交易购买的都是未切割、未加工的[原始晶圆](https://www.tomshardware.com/pc-components/dram/openais-stargate-project-to-consume-up-to-40-percent-of-global-dram-output-inks-deal-with-samsung-and-sk-hynix-to-the-tune-of-up-to-900-000-wafers-per-month)，而非成品内存模块，为 RAM 变种或 HBM 内存堆叠的制造保留了灵活性（尽管三星和 SK Hynix 可能是制造这些组件的公司）。

韩国总统顾问金容范在 2025 年 10 月[表示](https://www.reuters.com/business/media-telecom/samsung-sk-hynix-supply-memory-chips-openais-stargate-project-2025-10-01/)，OpenAI 正在"寻求在 2029 年订购 90 万片半导体晶圆"，但未说明该公司在 2025 年至 2029 年期间每月将购买多少。每月 90 万片的产能可能要到接近 [2029 年](https://www.datacenterdynamics.com/en/news/samsung-and-sk-hynix-to-scale-up-memory-production-capacity-in-2026-to-meet-ai-demand/)才能实现，因为截至 2026 年 2 月，三星和 SK Hynix 的产能分别估计约为每月 [68 万片](https://www.chosun.com/english/industry-en/2026/02/18/KKWPN5FKDNC53GCGKB5KGTXJSY/)和 [62 万片](https://x.com/jukan05/status/1973531213295190294)。声称 OpenAI 将消耗全球内存产出 [40%](https://www.tomshardware.com/pc-components/dram/openais-stargate-project-to-consume-up-to-40-percent-of-global-dram-output-inks-deal-with-samsung-and-sk-hynix-to-the-tune-of-up-to-900-000-wafers-per-month) 的说法是基于未来产能预测的。

这一公告进一步推高了各类内存硬件组件的价格，因为不同速度和持久性特征的内存基础设施组件具有高度的可替代性。在随后几个月，内存价格增长随着供应收缩进一步加速：2025 年 12 月初，DRAM 库存水平同比下降 [80%](https://x.com/KobeissiLetter/status/2000321021145202696?s=20)，按当时的消耗速度仅剩[三周](https://x.com/KobeissiLetter/status/2000321021145202696?s=20)的可用供应量（低于 2025 年 7 月的 [9.5 周](https://x.com/KobeissiLetter/status/2000321021145202696?s=20)）。

![内存价格自 2025 年秋季以来暴涨](/my-site/images/memory-shortage/01-dram-inventory-bloomberg.png)
*Source: [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)*

截至 2026 年 2 月，NAND 芯片价格上涨超过 [500%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)，DRAM 芯片价格上涨超过 [600%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)。这一价格突然上涨的影响是广泛的，但其驱动因素可能更为重要。消费者内存可用性的降低是否会增加对云存储的依赖和对数据中心的需求？端侧 AI 的机会窗口是否在刚刚打开时就已关闭？

## 内存存储类型

计算机内存，就像神经系统的记忆一样，是实现长期和短期信息存储与��索的基础设施。内存存储层次结构使计算机能够根据不同技术与处理器的接近程度，按层级平衡速度、容量和成本。

在这一层次结构的最顶端是 **SRAM**（静态随机存取存储器），一种易失性、超快速的介质，直接集成在 CPU 缓存中，用于存储正在使用的信息，延迟在亚纳秒级别。其下是 **DRAM**（动态随机存取存储器），作为系统的主要"工作内存"；它为打开的应用程序和活跃数据提供更大的容量，但延迟略高（数十纳秒），且需要持续供电来刷新数据。最后，长期存储层依赖 **NAND Flash**，一种非易失性技术，见于固态硬盘（SSD），无需供电即可保留大量数据，以更高的延迟（在微秒级而非纳秒级运行）换取更大容量的持久存储能力。

![内存层次结构金字塔](/my-site/images/memory-shortage/02-memory-hierarchy-nomadsemi.png)
*Source: [Nomad Semi](https://www.nomadsemi.com/p/deep-dive-on-memory-primer)*

### NAND

NAND Flash 是一种[非易失性](https://nexusindustrialmemory.com/guides/what-is-nand-memory/)存储技术，意味着它无需供电即可保留数据，不同于 DRAM 或 SRAM（断电即丢失数据）。NAND Flash 存在于 SSD、USB 闪存盘、SD 卡和智能手机中。"NAND"这个名字[来源于](https://nexusindustrialmemory.com/guides/what-is-nand-memory/)同名的布尔逻辑门（NOT AND），描述了存储单元的电气配置方式及其表示二进制数据的方式。

虽然 NAND 不在 OpenAI [交易](https://techcrunch.com/2025/10/01/openai-ropes-in-samsung-sk-hynix-to-source-memory-chips-for-stargate/)的范围内，但由于产能被转移到更动态的内存组件，NAND 也受到了内存短缺的影响。例如，三星在 2025 年 11 月[宣布](https://www.techpowerup.com/343119/samsung-reallocates-nand-production-to-dram-across-korean-fabs)将韩国工厂的 NAND 产能重新分配给 DRAM 生产。

### DRAM

DRAM，即动态随机存取存储器，是几乎所有现代计算设备中的主要[工作内存](https://semiconductor.samsung.com/dram/)。与 NAND Flash 等非易失性存储不同，DRAM 是易失性的，意味着断电后会立即[丢失](https://semiconductor.samsung.com/dram/)全部内容。对于非 AI 服务器系统，DRAM 已经占硬件成本的近 [50%](https://newsletter.semianalysis.com/p/the-memory-wall)。无论是在计算集群还是消费电子中，截至 2026 年 2 月，有几种主要的 DRAM 类型在使用，近几个月价格都有所上涨：

**[DDR5](https://newsletter.semianalysis.com/p/the-memory-wall)（第五代双倍数据速率）** 是桌面和笔记本电脑使用的标准内存，旨在为通用计算任务平衡性能、容量和成本。它采用可拆卸的 DIMM 模块，是三者中唯一允许用户在购买后升级的内存类型。

DDR5 现货价格在过去六个月上涨了 [600%](https://archive.is/o/bqogk/https://www.bloomberg.com/news/articles/2026-01-29/apple-sales-trounce-estimates-after-iphone-fuels-record-quarter)。截至 2025 年 12 月，64GB DDR5 晶圆套件的价格已[超过](https://x.com/aakashgupta/status/2006499990084952413)了使用它们的游戏主机。32GB DDR5 套件在 2025 年 7 月至年底之间价格[翻倍](https://x.com/aakashgupta/status/2006499990084952413)以上。2025 年 11 月，三星完全[停止](https://wccftech.com/dram-prices-have-risen-by-a-whopping-172-this-year-alone/)了 DDR5 DRAM 的定价，因为无法承诺满足现有合同之外的未来需求。

![DDR5 RAM 均价走势（澳元）](/my-site/images/memory-shortage/04-ddr5-prices-avtech.png)
*Source: [AV Tech](https://www.avtech.com.au/insights/promotions-and-special-offers/understanding-the-2026-global-memory-price-surge)*

**LPDDR5X（低功耗 DDR5 增强版）** 是为智能手机、平板电脑和轻薄笔记本电脑打造的低功耗变体，其中[电池续航](https://newsletter.semianalysis.com/p/the-memory-wall)比峰值性能更重要。它直接焊接在设备主板上，牺牲了可升级性，但换来了更小巧、更节能的设计。

**GDDR6（第六代图形双倍数据速率）** 专为独立[显卡](https://newsletter.semianalysis.com/p/the-memory-wall)设计，需要在所有其他考量之上提供巨大的内存带宽来为数千个 GPU 核心供数据。它通过 PAM4 信号技术实现这一目标——一种更先进的电气技术，使其每秒传输的数据量远[超过](https://newsletter.semianalysis.com/p/the-memory-wall) DDR5 或 LPDDR5X，代价是[更高](https://newsletter.semianalysis.com/p/the-memory-wall)的功耗和散热。

### 高带宽内存（HBM）

高带宽内存（HBM）是一种[高性能](https://www.appliedmaterials.com/us/en/semiconductor/markets-and-inflections/memory/hbm.html)内存架构，专为需要极快速移动大量数据的应用设计，如 GPU 渲染和 AI 工作负载。HBM 不是将内存芯片放在距离处理器较远的电路板上，而是将多个 DRAM die [垂直堆叠](https://www.appliedmaterials.com/us/en/semiconductor/markets-and-inflections/memory/hbm.html)，并通过穿透硅本身的微小垂直电气通道（称为硅穿孔，TSV）将它们连接起来。然后将这些堆叠直接安装在处理器旁边的共享硅基板（称为中介层）上，使两个组件保持极近的距离。这种紧密[集成](https://www.microchipusa.com/electrical-components/ultimate-guide-to-high-bandwidth-memory)，加上异常宽的数据总线（允许比传统显存更多的数据并行传输），使 HBM 比 GDDR6 等传统平面内存解决方案具有显著更高的带宽和更好的每比特传输能效。

![HBM 高带宽内存架构详解](/my-site/images/memory-shortage/05-hbm-architecture-ft.png)
*Source: [Financial Times](https://www.ft.com/content/f3ee292b-ba56-4e9f-944a-da26d5706583)*

在 AI 芯片中，消耗最多能量的不是原始逻辑计算，而是 GPU 和内存之间[持续的数据移动](https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future)。HBM 通过物理上更靠近处理器并提供高带宽数据连接来解决这一问题，与传统 DDR 相比降低了每次数据传输的能源成本。HBM 的数据传输速率比 DDR 高[一个数量级](https://www.ai-supremacy.com/p/why-memory-defines-ai-hardware-supremacy-hbm)，是为大规模并行处理需求量身定制的，使其成为 GPU 的理想搭档。

## 内存价格的历史规律

历史上，内存芯片的供需呈[周期性](https://www.semiconductors.org/wp-content/uploads/2021/02/Highest-Volume-Mainstream-Memory_Omdia.pdf)演变，由[两个原则](https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades)驱动：

- **[摩尔定律](https://www.asml.com/en/technology/all-about-microchips/moores-law)**：微芯片上的晶体管数量大约每两年翻一番，带来计算能力和性能的指数级增长，同时降低成本
- **[Dennard 缩放定律](https://www.sciencedirect.com/topics/computer-science/dennard-scaling)**：随着晶体管缩小，其功率密度保持恒定，使功耗与面积成比例，而电压和电流随尺寸缩小而下降

这两种动态的[结合](https://newsletter.semianalysis.com/p/the-memory-wall)使得每个芯片上更多的晶体管与更高效的计算集群并行发展，创造了更低的每比特成本价格，[导致](https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades)内存供应商之间的价格竞赛和客户内存能力的繁荣。这种渐进式改进在过去十年放缓，落后于计算堆栈其他层的改进。虽然摩尔定律在逻辑芯片中的衰亡已被[充分记录](https://newsletter.semianalysis.com/p/the-memory-wall)，但在内存芯片中的放缓更为剧烈。

![DRAM 每 GB 成本自 1973 年以来的下降趋势](/my-site/images/memory-shortage/07-dram-cost-history-semianalysis.png)
*Source: [SemiAnalysis](https://newsletter.semianalysis.com/p/the-memory-wall)*

内存的[周期性驱动因素](https://www.nomadsemi.com/p/deep-dive-on-memory-primer)与其他大宗硬件类似——价格随需求变化和有利价格下的囤积而起伏，同时新供应上线需要时间和投资。

## 当前内存价格的驱动力

如上所述，内存价格上涨的主要驱动力是超大规模公司和 AI 实验室的需求，它们正在买断现有 DRAM 晶圆产能以推动数据中心的持续增长。表面上，这些公司正在[消耗](https://www.fabricatedknowledge.com/p/another-conversation-with-val-bercovici)内存供应，以实现更先进 AI 能力的训练和推理，包括在目前受限于可用模型上下文的任务上取得进展（AI 系统中的内存既用于存储模型权重，也用于存储会话上下文，更关键的是用于 [RL 训练](https://www.fabricatedknowledge.com/p/another-conversation-with-val-bercovici)）。在 2026 年 1 月 CES 上，Jensen Huang 在讨论 AI 基础设施时[提到](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)了这一路障，说："**一个 HBM 已经不够大了**"，同时展示了一张写着"**上下文是新的瓶颈**"的幻灯片。这些公司据报已经开始谈判 [2027 年](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)的 DRAM 供应合同。

与此同时，响应这一需求涌入的芯片制造商正在将产能从 NAND 重新分配到 DRAM 生产，影响了各个层面的内存。三星在 2025 年 11 月[宣布](https://www.techpowerup.com/343119/samsung-reallocates-nand-production-to-dram-across-korean-fabs)将韩国工厂的 NAND 产能重新分配给 DRAM，尽管两个市场的价格和需求都在上升。其他公司，如传统上是 OEM 消费电子制造商的华硕，据报也在[考虑](https://x.com/Pirat_Nation/status/2004250791062995081)进入 DRAM 市场以应对内存短缺。同样，Micron 在 2025 年 12 月[宣布](https://sourceability.com/post/micron-exits-crucial-as-ai-becomes-a-top-priority)计划关闭面向消费者设备的 Crucial 产品线，优先供应 AI 内存资产，[称](https://tbot.substack.com/p/own-no-ram-and-be-happy)："AI 驱动的数据中心增长导致内存和存储需求激增。Micron 做出了关闭 Crucial 消费业务这一艰难决定，以改善对我们在快速增长领域中更大、更具战略性客户的供应和支持。"

一位内存行业顾问描述了内存生产商面临的动态以及对投资者的吸引力，[说道](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)：

> "简直是白捡的钱……他们什么都没做。没有新工厂，没有新运输，什么都没有。他们只是收到了比一年前多一倍的钱。"

内存组件的生产商和消费者的股价都相应地重新定价。自 2025 年 9 月以来，消费技术硬件股票下跌约 [-10%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)，而内存芯片股票上涨 [+160%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)。韩国 SK Hynix 涨超 [150%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)，日本 Kioxia Holdings 和台湾南亚科技各涨超 [270%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)，美国 Sandisk 涨近 [1000%](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)。Sandisk 的价格爆发尤其令内存行业人士[惊讶](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)，它成为了 2025 年标普 500 [表现最好](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)的股票。

![DDR4 DRAM 和 NAND 晶圆价格急涨](/my-site/images/memory-shortage/09-ddr4-nand-prices-sherwood.png)
*Source: [Sherwood](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)*

在 Sandisk 8 月的财报电话会议上，该公司 CFO [表示](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)："市场正在变得更加紧张，有时候我们的客户想要的产品我们没有。"仅一个月后的 9 月，他[更新](https://sherwood.news/markets/inside-sandisks-transformation-from-thumb-drive-dinosaur-to-the-hottest/)了这一指引："市场很紧张，我们将继续看到全面提价的机会。"

### 短缺将持续多久？

虽然内存芯片消费股的定价已将供应正常化预期[纳入](https://www.timesnownews.com/business-economy/industry/how-ais-memory-hunger-is-triggering-a-global-chip-crisis-markets-cant-handle-it-article-153589825)一到两个季度，但 SK Hynix 等芯片制造商[表示](https://www.techpowerup.com/344063/sk-hynix-forecasts-tight-memory-supply-lasting-through-2028)短缺可能持续到 2028 年，订单已完全排满至 2027 年 Q4。该公司宣布扩建其正在施工的 [5000 亿美元](https://www.pcgamer.com/hardware/memory/to-meet-tremendous-and-humongous-demand-from-ai-customers-sk-hynix-accelerates-2027-fab-plans-by-three-months-with-an-even-fresher-fab-beginning-wafer-production-next-month/)晶圆厂，预计 2027 年 2 月投产。

这种长期有限的内存芯片供应也影响了国际[出口](https://www.bloomberg.com/news/articles/2026-01-15/memory-shortage-to-hit-nvidia-china-approvals-us-lawmaker-says)协议。2026 年 1 月，美国商务部[发布](https://www.bloomberg.com/news/articles/2026-01-15/memory-shortage-to-hit-nvidia-china-approvals-us-lawmaker-says)了一项限制向中国公司销售 H200 AI 处理器的规定，部分原因是内存供应限制。一位美国众议员在给商务部长 Howard Lutnick 的信中[写道](https://www.bloomberg.com/news/articles/2026-01-15/memory-shortage-to-hit-nvidia-china-approvals-us-lawmaker-says)："由于严重的供应限制，配备 HBM3E 且运往中国的芯片代表着一种机会成本——这些 HBM3E 本可以被美国客户使用"，并[表示](https://www.bloomberg.com/news/articles/2026-01-15/memory-shortage-to-hit-nvidia-china-approvals-us-lawmaker-says) DRAM 芯片的短缺对现有的出口和许可协议构成了"直接挑战"。这些出口[协议](https://www.federalregister.gov/documents/2026/01/15/2026-00789/revision-to-license-review-policy-for-advanced-computing-commodities)仅允许在不会对美国买家造成延迟或将代工产能从美国订单转移的情况下向中国销售。

## OpenAI 是否在过度购买内存？

即使考虑到 AI 驱动的数据中心建设规模，内存晶圆定价所受的极端影响也值得更仔细的审视。当你比较 OpenAI 实际购买的内存量与其既定基础设施目标所明确需要的量时，你会开始看到一个显著的差异。

虽然数学计算相当复杂，但可能讲述了一个简单的故事（如果你对分析细节感兴趣，请参见附录）。OpenAI 与三星和 SK Hynix 签约每月购买 [90 万片](https://openai.com/index/samsung-and-sk-join-stargate/)内存晶圆。合作伙伴的评论似乎表明这是一个[月度](https://www.reuters.com/business/media-telecom/samsung-sk-hynix-supply-memory-chips-openais-stargate-project-2025-10-01/)数字，因此 12 个月总计 **1080 万片**晶圆。在需求方面，一个满配 [10GW](https://openai.com/index/five-new-stargate-sites/) 的 Stargate 集群需要约 300 万块 GB200 Bianca 板。每块板总共需要约 50% 的内存晶圆；分为嵌入其两个 [B200 GPU](https://www.serversimply.com/blog/technical-analysis-of-the-blackwell-b200) 中的 HBM3e 堆叠（约 30%）和其 [480GB](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) LPDDR5X 系统内存（约 20%）。这使得整个集群的晶圆需求约为 **300 万片**。

因此，根据我们的最佳估计，OpenAI 可能需要的不到其计划购买的 1080 万片晶圆的 30%。这是一个相当大的缺口——那么解释是什么？最直接的解读是对未来产能需求的激进前瞻性布局。但更尖锐的解读可能是：**OpenAI，以及可能在 2026 年资本支出计划中进行类似采购的其他 AI 实验室，正在故意垄断内存供应，以排除端侧推理成为广泛替代方案的可能性。**

## 端侧计算的威胁

考虑一个假设。假设 OpenAI 正在购买超出需求的内存，以防止用户拥有计算替代方案——比如足够的设备端内存来本地运行模型。虽然 OpenAI 是唯一披露了特定内存交易的主要实验室，但其他 AI 实验室或计算提供商可能在其 2026 年资本支出计划中规划类似的采购。尽管 AI 实验室发布可在设备端运行的小型模型有潜在好处——可以减轻对云计算的需求并降低云端推理的[延迟](https://x.com/aakashgupta/status/2006499990084952413)要求——但完全脱离云端的失控风险太高了。

截至 2025 年，可下载和微调的开源权重模型仅比最先进模型落后[三个月](https://www.linkedin.com/posts/scottbelsky_data-we-should-be-more-focused-on-via-compound-activity-7403050124165206016-VeLA/)，而前沿 AI 实验室的性能在消费设备上仅 [12 个月](https://www.linkedin.com/posts/scottbelsky_data-we-should-be-more-focused-on-via-compound-activity-7403050124165206016-VeLA/)后就可以被复制。这使得消费者以一次性内存采购成本免费运行模型的可能性非常现实。

![前沿模型与消费级 GPU 上开源模型的性能差距](/my-site/images/memory-shortage/10-ondevice-ai-epochai.png)
*Source: [Epoch AI](https://epoch.ai/data-insights/consumer-gpu-model-gap)*

推理业务的流失对专有模型提供商有多大影响？这些公司的商业模式（[广告](https://research.contrary.com/report/artificial-influence-the-rise-of-advertising-in-ai)之外）围绕着向客户收取推理费用，而不是模型权重（模型训练的产出）的使用权。今天的 AI 公司正在建设理论上将同等服务于模型训练和推理的基础设施。值得区分的是，模型训练成本在该模型产生收入之前就已发生，而推理费用则随着模型使用的分发而赚取。在一项研究中，研究人员[发现](https://epoch.ai/publications/trading-off-compute-in-training-and-inference)推理计算的成本随训练计算的平方根缩放，但跨查询的总推理成本导致的费用与训练模型的费用大致相当。该报告[指出](https://epoch.ai/publications/trading-off-compute-in-training-and-inference)：

> "2024 年 2 月，Sam Altman 声称 OpenAI 目前每天生成约 1000 亿个 token，即每年约 36 万亿个 token。鉴于现代语言模型的训练数据规模在 10 万亿 token 量级，且训练期间处理 token 的成本约为推理期间的三倍，一个简单的分析表明 OpenAI 的年度推理成本与其年度模型训练成本处于同一数量级。"

这意味着推理需求的流失可能使 AI 公司承受其预期总计算容量一半的损失，并迫使这些公司同时演进 AI 模型的复杂性和商业模式的根本形态。[Perplexity](https://research.contrary.com/company/perplexity) CEO Aravind Srinivas 称端侧推理是对数据中心的**最大威胁**，说道：

> "如果智能可以被打包到本地运行，在设备上的芯片上运行，那就不需要在集中式数据中心进行推理了，而且更好的是，随芯片一起的模型会适应你……但想象一下我们攻克了测试时训练，有些任务你在本地系统上反复执行，AI 观察着你做这些，你不介意 AI 观察因为 AI 就在你的电脑上，不会去服务器，它适应你，随时间推移开始自动化你做的很多事情……那是你的智能，你拥有它，那是你的大脑。"

### 端侧推理的硬件要求

能在消费设备上运行的语言模型能力正在与前沿模型同步提升。截至 2026 年 2 月，那些落后前沿模型 12 个月的模型仍然需要不少内存。即使是参数最少的 LLM 也需要约 [14GB](https://newsletter.semianalysis.com/p/on-device-ai-double-edged-sword) 的 16 位内存。iPhone 历史上搭载 [3 到 12GB](https://www.threads.com/@applesclubs/post/DRW5JTSAuZt/i-phone-ram-history-in-one-frame-how-much-ram-does-your-i-phone-have) RAM，笔记本电脑在 [8 到 16GB](https://www.macrumors.com/2024/04/26/apple-mac-base-ram-boosts-ended-tim-cook/) 之间，最强大的机器可达 [64GB](https://www.macrumors.com/2024/04/26/apple-mac-base-ram-boosts-ended-tim-cook/)。据估计，消费设备上可本地运行的最大模型规模为 [30-40 亿](https://newsletter.semianalysis.com/p/on-device-ai-double-edged-sword)参数，而最先进模型的参数量达到[数千亿](https://www.technologyreview.com/2026/01/07/1130795/what-even-is-a-parameter/)甚至万亿级别。

![推理成本趋向零将如何改变软件](/my-site/images/memory-shortage/11-model-size-compound.png)
*Source: [Compound](https://www.linkedin.com/posts/scottbelsky_data-we-should-be-more-focused-on-via-compound-activity-7403050124165206016-VeLA/)*

通过迁移学习、稀疏化和量化等[技术](https://www.semianalysis.com/i/98654125/sparsity)可以降低内存容量需求，但这些改变可能影响模型精度且实施并不简单：

- **量化**：通过将精度降低到 [FP8](https://www.emergentmind.com/topics/int4-fp8-variant)（8 位）或 [int4](https://www.emergentmind.com/topics/int4-fp8-variant)（4 位有符号），每个参数的比特数减少，使设备能够运行参数多 [2-4 倍](https://www.emergentmind.com/topics/int4-fp8-variant)的模型。虽然这会导致精度略有损失，但运行更大模型的性能收益通常大于缺点。虽然 [FP4](https://lambda.ai/blog/lambda-1cc-fp4-nvidia-hgx-b200)（4 位）格式是理想的，但不太可能在近期内被当前的客户端硬件支持。
- **稀疏化**：Google DeepMind [探索](https://arxiv.org/pdf/2309.08520)了对完全训练好的模型进行尺寸缩减，这些模型包含具有零权重的参数[子集](https://www.zdnet.com/article/less-is-a-lot-more-when-it-comes-to-ai-says-googles-deepmind/)。目前，这些零值消耗了宝贵的内存带宽和计算周期，尽管在数学上结果为零。优化系统以避免传输或计算这些权重代表了一个重大的效率提升机会。
- **剪枝**：在模型中有意创造稀疏性。Google 的 "Sparse is Enough" [研究](https://arxiv.org/abs/2111.12763)表明，强制将权重设为零可以在显著提高速度的同时保持模型质量。高级[技术](https://arxiv.org/pdf/2209.07617)，如衰减稀疏性掩码，实现了超过 [50%](https://arxiv.org/pdf/2209.07617) 的模型尺寸缩减。此外，[SparseGPT](https://arxiv.org/abs/2301.00774) 表明，将剪枝与量化结合可以将 [1750 亿](https://arxiv.org/abs/2301.00774)参数的 GPT-3 模型的内存占用减少 [75%](https://arxiv.org/abs/2301.00774)，精度损失仅 1%。

通过组合这些技术——即 4 位量化加 50% 稀疏性——开发者可以实现模型容量的 8 倍提升。如果这些技术能在各种用例中最小化精度损失，现代硬件能力将得到显著改善：iPhone 可以承载约 50 亿参数模型，2025 年配备高速 LPDDR5x 内存的高端智能手机可运行高达约 140 亿参数的模型。

端侧推理有着有意义的潜在好处——零延迟、无需网络连接、无逐次查询费用。配备专用[神经处理单元](https://www.lenovo.com/us/en/glossary/what-is-an-npu/)（NPU）的 AI PC 已经存在，支持语音助手、实时转录、视频通话背景去除和智能文档摘要等任务，无需向外部服务器发送数据。Intel 的 Core Ultra Series 3 平台配备了 [50 TOPS](https://www.intc.com/news-events/press-releases/detail/1757/ces-2026-intel-core-ultra-series-3-debuts-as-first-built)（每秒万亿次运算）的 NPU，预计将为 OEM 厂商的 [200 多款](https://www.edge-ai-vision.com/2026/01/intel-core-ultra-series-3-debut-as-first-built-on-intel-18a)笔记本设计提供动力，将设备端 AI 能力从高端设备推向主流市场。Mac Mini M4 受到 AI 开发者的[需求](https://www.tomshardware.com/tech-industry/artificial-intelligence/openclaw-fueled-ordering-frenzy-creates-apple-mac-shortage-delivery-for-high-unified-memory-units-now-ranges-from-6-days-to-6-weeks)追捧，用作本地运行自主 Agent 的常开硬件平台，其统一内存架构使其能够作为低功耗个人 AI 服务器运行。除消费计算外，端侧推理还用于[物联网系统](https://iotbusinessnews.com/2025/11/23/on-device-ai-for-iot-sensors-when-local-inference-finally-makes-sense/)（如无需云上传即可执行目标检测和人脸识别的家庭安防摄像头），以及[汽车](https://developer.arm.com/community/arm-community-blogs/b/automotive-blog/posts/building-an-on-device-multimodal-assistant-for-automobiles)中的驾驶员监控系统、车道保持辅助和导航系统（在没有蜂窝信号的区域运行）。

OpenAI 的 [Whisper](https://openai.com/index/whisper/) 语音识别模型已成为设备端转录和翻译的参考实现。Whisper Large-v3 在干净音频上实现了低至 [2.7%](https://vatis.tech/blog/a-deep-dive-into-openai-whispers-technology) 的词错误率，处理速度达到 [216 倍](https://groq.com/blog/whisper-large-v3-turbo-now-available-on-groq-combining-speed-quality-for-speech-recognition)实时速度，使 60 分钟的音频文件可在约 17 秒内转录完成，支持 [99 种语言](https://www.gladia.io/blog/what-is-openai-whisper)，无需互联网连接或云处理。AR 和 VR 头显的手部追踪和眼球追踪也依赖于设备端模型，以超过 [60Hz](https://vrarwiki.com/wiki/Motion-to-photon_latency) 的帧率处理传感器数据，延迟低于 [20 毫秒](https://vrarwiki.com/wiki/Motion-to-photon_latency)——这些要求由于往返网络延迟而无法通过云端推理满足。可穿戴设备和生物监测系统同样[依赖](https://www.nature.com/articles/s41467-025-67728-y)本地处理来分析心率变异性、检测跌倒、监测睡眠阶段并实时触发警报，避免了云端方法固有的延迟、隐私风险和连接依赖。

## 保护对云的投资

除了防御端侧推理外，一些人还提出，消费设备的内存供应正被有意限制，作为强制使用云服务的[机制](https://hiddencomplexity.substack.com/p/the-coming-consumer-eletronics-crash)。这一结果假设了一个 AI 推理需求低于预期的世界——要么因为用户使用端侧推理，要么因为 AI 的整体使用量未达预期。在这个世界中，超大规模公司和 AI 实验室及其金融和基础设施合作伙伴将建设远超需求的云计算能力。

在这个世界中，有限的设备端[内存](https://tbot.substack.com/p/own-no-ram-and-be-happy)将迫使用户将消息、邮件、照片和个人数据存储在云端而非设备上。这被描述为为过剩数据中心容量[制造需求](https://hiddencomplexity.substack.com/p/the-coming-consumer-eletronics-crash)的后备计划：

![关于让人们依赖云计算订阅的推文](/my-site/images/memory-shortage/tweet-cloud-computing.png)
*Source: [X](https://x.com/NINtendo_maya/status/2000576934049186117?s=20)*

云存储市场预计将从 2024 年的 [$1345 亿](https://www.rootsanalysis.com/cloud-storage-market)增长到 2035 年的 [$1.1 万亿](https://www.rootsanalysis.com/cloud-storage-market)，增长近 10 倍。从"厚"到"薄"计算选项的[转变](https://stratechery.com/2026/thin-is-in)被用户和提供商共同认为，允许客户[分摊](https://stratechery.com/2026/thin-is-in)计算和内存的成本，代价是更高的延迟和基于订阅的定价，但好处是物理上更[轻薄](https://stratechery.com/2026/thin-is-in)的设备。

## 内存短缺的连锁反应

内存组件至关重要，因为即使是最强大的处理器也只能以它能访问数据的速度运行。内存容量和带宽使 GPU 能够在推理期间保存整个 AI 模型的参数，显卡能够按需渲染高分辨率场景，超级计算机能够大规模模拟复杂的物理系统，智能手机能够运行多个应用程序而不卡顿。随着内存供应持续受限，预计将对广泛行业的价格和生产产生影响。

### 电动车和传统汽车

汽车 OEM 分析师[警告](https://finance.yahoo.com/news/ubs-sees-memory-chip-shortage-184328458.html)，传统汽车制造商的中断风险"可能从 2026 年 Q2 开始"，建模场景表明 2026 年通用 OEM 的 EBIT 打击可能达 [5%](https://finance.yahoo.com/news/ubs-sees-memory-chip-shortage-184328458.html)。本田在其 Q1 财报电话会议上标记了内存组件的供应风险，据报[被迫](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)在 2026 年 1 月调整其生产计划以应对供应紧张。该行业的供应压力因芯片制造商[逐步淘汰](https://www.automotivelogistics.media/supply-chain/auto-sector-at-risk-as-chip-suppliers-favour-ai-data-centres-says-sampp/2582197)汽车行业仍广泛使用的老一代 DRAM（包括 DDR4 和 LPDDR4）而加剧，这些内存用于先进驾驶辅助系统、发动机控制单元和信息娱乐系统。

电动汽车制造商面临更大压力，因为电动车的每辆车内存搭载量[更多](https://www.evengineeringonline.com/why-software-is-replacing-hardware-in-evs/)——由于其软件定义架构、ADAS 能力和集中式计算系统。比亚迪和特斯拉是汽车 DRAM 的最大消费者之[一](https://www.investors.com/news/tesla-ceo-elon-musk-byd-evs-ai-chips-data-centers-dram/)，整个汽车行业约占全球 DRAM 市场的 [10%](https://www.investors.com/news/tesla-ceo-elon-musk-byd-evs-ai-chips-data-centers-dram/)。部分电动车制造商，[包括](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)比亚迪，正试图通过[自研](https://www.imd.org/ibyimd/innovation/four-lessons-from-byds-rise-and-why-tesla-should-be-worried/) AI 芯片或建设自己的[半导体](https://www.imd.org/ibyimd/innovation/four-lessons-from-byds-rise-and-why-tesla-should-be-worried/)生产线来减少对外部供应商的依赖。

### 手机

DRAM 和 NAND 成本上涨推高了手机的物料清单（BoM）成本。内存通常占智能手机总 BoM 的 [15-20%](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)，导致行业对生产和定价能否在未来几年维持 2025 年水平持怀疑态度。2026 年全球智能手机出货量预测下调了 [2.6%](https://counterpointresearch.com/en/insights/2026-smartphone-shipment-forecasts-revised-down-as-memory-shortage-drives-bom-costs-up)，目前预计出货量将下降 [2.1%](https://counterpointresearch.com/en/insights/2026-smartphone-shipment-forecasts-revised-down-as-memory-shortage-drives-bom-costs-up)，低端设备 BoM 成本增加约 [25%](https://counterpointresearch.com/en/insights/2026-smartphone-shipment-forecasts-revised-down-as-memory-shortage-drives-bom-costs-up)，高端手机约增加 [10%](https://counterpointresearch.com/en/insights/2026-smartphone-shipment-forecasts-revised-down-as-memory-shortage-drives-bom-costs-up)。已出售的产品将配备[更少](https://www.techradar.com/phones/the-ram-crisis-will-see-smartphone-specs-go-backwards-in-2026-experts-warn-heres-why)的设备端内存——历史上以 [8GB](https://www.techradar.com/phones/the-ram-crisis-will-see-smartphone-specs-go-backwards-in-2026-experts-warn-heres-why) 销售的基础款预计将降至仅 [4GB](https://www.techradar.com/phones/the-ram-crisis-will-see-smartphone-specs-go-backwards-in-2026-experts-warn-heres-why) RAM。手机 OEM 使用的长期 DRAM 合同价格在 2025 年 Q4 同比增长超过 [75%](https://intuitionlabs.ai/articles/ram-shortage-2025-ai-demand)。

这导致了小米等手机制造商股价下跌，小米[表达](https://www.bloomberg.com/news/articles/2026-01-29/apple-sales-trounce-estimates-after-iphone-fuels-record-quarter)了对投入成本上升的担忧：一份泄露的小米预算文件显示，尽管该公司与内存供应商有[合作关系](https://www.spglobal.com/ratings/en/regulatory/article/-/view/type/HTML/id/3491120)，仍预计每部手机的 DRAM 组件成本至少上涨 [25%](https://x.com/aakashgupta/status/2006499990084952413)。高通[告诉](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)投资者，手机产量将受到内存可用性的限制，在其 2026 年 2 月的 Q1 业绩报告中[表示](https://sherwood.news/markets/qualcomm-q1-earnings-report-ai-boom-bubble-smartphones/)，多家中国 OEM 客户已采取措施"减少手机生产计划和渠道库存"，因为"全行业的内存短缺和价格上涨""可能在整个财年定义手机行业的整体规模"。

### 个人电脑

鉴于现货内存价格以及部分制造商已积累的内存库存，买预装 PC 首次被认为比自己从零组装[更便宜](https://www.tomsguide.com/news/live/ram-price-crisis-updates)。尽管如此，部分消费 PC 现在比 2025 年 10 月贵 [$800-$1500](https://hiddencomplexity.substack.com/p/the-coming-consumer-eletronics-crash)，2026 和 2027 年发布的 PC 预计在相同价位上提供[更低](https://www.pcmag.com/explainers/how-to-save-on-desktop-pc-memory-ram-shortage)的基础内存。外部硬盘和固态硬盘的[价格](https://www.tomshardware.com/pc-components/hdds/hard-drive-prices-have-surged-by-an-average-of-46-percent-since-september-iconic-24tb-seagate-barracuda-now-usd500-as-ai-claims-another-victim)也在上涨，消费者在设备外但本地升级内存容量的[选择](https://www.reddit.com/r/datastorage/comments/1q63kaz/with_hddssd_prices_going_up_how_are_you_adjusting/)越来越少。NAND 晶圆构成 SSD 物料清单的[大部分](https://www.tomshardware.com/reviews/jmicron-jmf670h-ssd-controller,4161.html)，导致 SSD 价格上涨超过 [240%](https://www.pcgamer.com/hardware/memory/kingston-sounds-the-ssd-pricing-alarm-as-the-company-has-seen-a-246-percent-increase-in-nand-wafer-prices-with-the-biggest-increase-within-the-last-60-days/)。

主要 PC 制造商联想和戴尔的股价自 10 月宣布主要内存组件供应限制以来双双下跌超过 [25%](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)，戴尔、宏碁和仁宝等公司已被分析师[下调](https://www.tomshardware.com/pc-components/ddr5/ai-led-dram-supply-crunch-reportedly-has-morgan-stanley-downgrading-major-oems-skyrocketing-memory-prices-could-erode-server-and-pc-margins)评级。罗技等笔记本外设制造商的股价也有所[下跌](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)。2026 年 2 月，联想 CEO [描述](https://www.bloomberg.com/news/articles/2026-02-12/lenovo-s-sales-lifted-by-ai-and-rush-to-beat-memory-price-hikes)这一状况时说："这种供需结构性失衡不是简单的短期波动。"

### 游戏主机

内存短缺对游戏主机和设备以及需要这些设备的游戏软件提供商的影响，由 [Epic Games](https://research.contrary.com/company/epic-games) 的 Tim Sweeney 在 2025 年 11 月[阐述](https://x.com/TimSweeneyEpic)："**RAM 价格上涨将在未来几年成为高端游戏的真正问题。工厂正在将领先的 DRAM 产能转向满足 AI 需求，数据中心的出价远高于消费设备制造商。**"主要主机制造商任天堂[警告](https://www.bloomberg.com/news/articles/2026-02-09/memory-chip-squeeze-wreaks-havoc-in-markets-with-more-to-come)内存可用性限制将压缩其 2026 年利润，这对一家 Switch 2 发售依赖于稳定且可负担的组件供应的公司来说是一个重大担忧。

短缺据报对微软 [Xbox](https://www.mooreslawisdead.com/post/sam-altman-s-dirty-dram-deal) 的影响比索尼 PlayStation [更为严重](https://www.mooreslawisdead.com/post/sam-altman-s-dirty-dram-deal)，据报 Xbox 的库存水平明显更低——这一差异可能影响主要主机 OEM 如何度过供应有限的时期。索尼据报正在[考虑](https://stratechery.com/2026/thin-is-in)将下一代 PlayStation 的发布推迟到 2028 年或 2029 年。

### 其他半导体封装

半导体和独立 GPU 市场是内存短缺正在扰乱产品策略的另一个领域。例如，AMD 的 Radeon 系列[暴露](https://www.mooreslawisdead.com/post/sam-altman-s-dirty-dram-deal)了一个问题——AMD 不像 NVIDIA 那样将 GDDR 内存打包到供应给 AIB（Add-in Board）合作伙伴的物料清单套件中。这意味着采购 Radeon GPU 的 AIB 合作伙伴必须在现货市场上自行[采购](https://www.reddit.com/r/hardware/comments/1okjrn7/amd_throws_loyal_radeon_customers_into_the_trash/) GDDR 配额，而现在的现货价格已经难以承受。原本被期待为有竞争力的高容量 Radeon 产品 RX 9070 GRE 16GB 版本，似乎已因此被[取消](https://www.mooreslawisdead.com/post/sam-altman-s-dirty-dram-deal)。

NVIDIA 为制造合作伙伴维护集中式内存库存的模式，为近期内存市场波动提供了一定的结构性缓冲。然而，一些高容量 GPU 配置——如假想的 24GB RTX 5080 SUPER——由于库存不足而无限期[搁置](https://www.reddit.com/r/RTX5080/comments/1pmw7ti/several_reasons_why_i_think_there_wont_be_an_rtx/)。NVIDIA 已[告知](https://www.theverge.com/tech/874439/nvidia-rtx-50-super-60-series-delay)合作伙伴，SUPER 刷新版可能在 2026 年 Q3 到来，但这在很大程度上被视为与新 GDDR 产能预期上线时间挂钩的占位符，而非确定承诺。

## 两个计算世界

内存短缺远非又一个数据中心瓶颈。这不是新晶圆厂上线后就能解决的暂时性问题。这是**计算基础设施为谁而建**这一结构性重新调整的第一个可见后果。超大规模公司和前沿 AI 实验室已将自己插入内存供应漏斗的顶端。但这使得所有其他人——从汽车制造商到智能手机 OEM 和 PC 制造商——都意识到，他们对关键投入的获取不再有保障。

我们对 OpenAI 晶圆购买量的分析表明，相对于其既定基础设施需求存在明显的过度购买。无论这反映的是简单的激进前瞻性布局，还是故意垄断供应以切断端侧竞争，对市场其余部分的影响是相同的。曾经是整个行业关键投入的内存正在上游被捕获，价格冲击将同时波及各个品类。

更具体地说，这一关键资源的底层制造商已明确表示，这代表着持久性转变而非暂时性挫折。显然，SK Hynix、三星和 Micron 等公司都有扩大产能的动力。但尽管它们有投资扩产的意愿，仍预计短缺将延续到 2027 年之后。而来自 AI 实验室的结构性需求只会随着能力的提升和相应内存需求的增加而增长。

云端主导推理与端侧计算之间的辩论，今天仍是一个真正开放的问题——没有明显的答案。本地运行个性化 AI 的愿景当然是合理且经济上有吸引力的，但它需要的内存目前正被那些执意拥有云端推理的参与者（从 AI 模型到微软或亚马逊等支持性超大规模公司本身）所垄断。这种张力将推向两个世界之一。一方面，一个廉价、充裕的端侧计算世界；另一方面，一个深度固化的云推理护城河，在从模型架构到芯片设计的各个层面创建生态系统锁定的蛛网。

## 附录

### OpenAI 内存过度购买的数学计算

将 OpenAI 购买的内存晶圆总量与其计划建设的总计算能力进行比较，为理解 AI 应用中内存晶圆的供需平衡提供了基准。注意，关于 OpenAI 签约的到底是每月 [90 万片晶圆](https://openai.com/index/samsung-and-sk-join-stargate/)起始（如其初始新闻稿所[述](https://openai.com/index/samsung-and-sk-join-stargate/)）还是每月 [90 万颗内存芯片](https://finance.yahoo.com/news/altman-makes-ai-deal-samsung-190454350.html)（每片晶圆可生产数百到数千颗芯片），投机者之间存在一些[混淆](https://semiwiki.com/forum/threads/openai-ceo-rumored-to-secure-ai-chip-and-server-supply-in-low-key-visit-to-taiwan.23733/)。

**购买的晶圆总量**

计算 OpenAI 两份合同下购买的晶圆总量相当简单。该公司的官方公告称将从三星和 SK Hynix 获得每月 [90 万片](https://openai.com/index/samsung-and-sk-join-stargate/)内存晶圆，但未说明持续多长时间。韩国总统顾问金容范在 2025 年 10 月[表示](https://www.reuters.com/business/media-telecom/samsung-sk-hynix-supply-memory-chips-openais-stargate-project-2025-10-01/)，OpenAI 正在"寻求在 2029 年订购 90 万片半导体晶圆"，但未说明 2025 年至 2029 年期间每月购买量。为简化分析，我们假设该公司仅购买 12 个月的每月 90 万片晶圆——即使考虑到未来四年的某些产能爬坡，这也可能是保守估计。总计 90 万 × 12 = **1080 万片**内存晶圆。这些晶圆是圆形的，直径约 [12 英寸](https://www.micron.com/about/blog/memory/dram/inside-1a-the-worlds-most-advanced-dram-process-technology)（300mm），可用于制造许多单独的 DRAM 或 HBM 组件。

**需要的晶圆总量**

推算 OpenAI 实际需要的晶圆总量是一个更具挑战性的问题。OpenAI 的 Stargate 计算集群总计预估将达到 [10GW](https://openai.com/index/five-new-stargate-sites/)（从最初的 [4.5GW](https://openai.com/index/stargate-advances-with-partnership-with-oracle/) 和 [7GW](https://www.datacenterdynamics.com/en/news/openai-announces-five-more-us-stargate-data-centers-with-oracle-and-softbank/) 目标上调）。Jensen Huang 估计 Stargate 总共需要[四到五百万](https://www.cnbc.com/2025/09/22/nvidia-openai-data-center.html) GPU 来服务 [10GW](https://www.cnbc.com/2025/09/22/nvidia-openai-data-center.html) 的容量（Stargate 站点已交付 [200 万](https://sherwood.news/tech/rising-ambitions-and-skyrocketing-costs-heres-what-we-know-about-project/) GPU）。

截至 2026 年 2 月，Stargate 项目已安装了 NVIDIA Blackwell GB200 超级芯片。每个超级芯片（组装为称为 [Bianca Board](https://wccftech.com/nvidia-recent-switch-to-the-bianca-compute-board-from-cordelia-for-gb300-blackwell-ultra-gpus-is-seen-as-a-positive-development/) 的内部电路板）包含两个 GPU（Blackwell B200 Tensor Core GPU，GB200 中的 B）、一个 CPU（Grace，NVIDIA 基于 ARM 的 CPU，GB200 中的 G）和 LPDDR5X DRAM 组件（以及电源和连接组件）。

![NVIDIA Grace Blackwell Ultra 超级芯片](/my-site/images/memory-shortage/12-gb200-nvidia.png)
*Source: [Nvidia](https://developer.nvidia.com/blog/inside-nvidia-blackwell-ultra-the-chip-powering-the-ai-factory-era/)*

![GB200 Bianca Board 架构图](/my-site/images/memory-shortage/13-bianca-board-semianalysis.png)
*Source: [SemiAnalysis](https://newsletter.semianalysis.com/p/gb200-hardware-architecture-and-component)*

如上所述，这些组件中的每一个都包含内存，生产时需要内存晶圆。

**Blackwell B200 Tensor Core GPU**

![Micron HBM3E 高带宽内存](/my-site/images/memory-shortage/14-hbm3e-micron.png)
*Source: [Micron](https://www.micron.com/products/memory/hbm)*

每个 GB200 超级芯片板载两个 Blackwell B200 Tensor Core GPU。每个 B200 GPU 内置 [8 组](https://www.serversimply.com/blog/technical-analysis-of-the-blackwell-b200) HBM3e（24GB 8-Hi），每个 GPU 共 192GB 内存。每组具有 [24GB](https://www.serversimply.com/blog/technical-analysis-of-the-blackwell-b200) 内存的堆叠由 8 颗 die 组成，每颗 [3GB](https://news.skhynix.com/sk-hynix-begins-volume-production-of-the-world-first-12-layer-hbm3e/) 内存，每个 GPU 共需 64 颗 3GB die。典型 3GB die 的尺寸为 [121mm²](https://eureka.patsnap.com/insight/the-hbm-wars-sk-hynixs-dominance-samsungs-roadmap-and-the-looming-threat-of-cyclicality)，标准 300mm DRAM 晶圆的可用面积约为 70,686mm²。根据标准公式（考虑边缘损耗和切割线）：

> 毛 die 数 ≈ （晶圆��积）/（die 面积）−（π × 晶圆直径）/（die 边长）

![HBM 晶圆良率计算](/my-site/images/memory-shortage/15-hbm-wafer-calc.png)
*Source: Contrary Research, [NVIDIA](https://www.serversimply.com/blog/technical-analysis-of-the-blackwell-b200), [SK Hynix](https://news.skhynix.com/sk-hynix-begins-volume-production-of-the-world-first-12-layer-hbm3e/), [Eureka](https://eureka.patsnap.com/insight/the-hbm-wars-sk-hynixs-dominance-samsungs-roadmap-and-the-looming-threat-of-cyclicality)*

这表明一个 Blackwell B200 Tensor Core GPU 的 64 颗 die 需要约一片晶圆的 **15%**，因此一块板载两个 B200 的 GB200 Bianca Board 需要约 **30%** 的晶圆。

**LPDDR5X**

![Micron LPDDR5X 内存](/my-site/images/memory-shortage/16-lpddr5x-micron.png)
*Source: [Micron](https://www.micron.com/products/memory/dram-components/lpddr5x)*

像 NVIDIA Grace CPU 这样的 CPU 没有内置内存，而是使用嵌入在超级芯片上的内存。每个 GB200 超级芯片包含高达 [480GB](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) 的 LPDDR5X DRAM 容量。尽管是比 HBM 更便宜的内存，但庞大的容量需要大量的硅。单个 LPDDR5X 组件由堆叠的 die（在原始内存晶圆上蚀刻的电路）制成。高端应用中最常见的 LPDDR5X die 密度为每颗 2GB，但 NVIDIA 未披露 GB200 中使用的具体 die 密度（部分应用也使用 4GB die）。

假设 GB200 使用 2GB die 密度，480GB 内存需要 240 颗 die。每片晶圆可制造的 DRAM die 数量从几百到超过一千不等，取决于 die 的尺寸和缺陷损耗比例。一个示例 2GB LPDDR5X die 是三星 K4L6E165YC，采用三星 1a 制程制造，尺寸为 [7.50mm × 6.26mm](https://www.techinsights.com/blog/samsung-1a-16gb-lpddr5x-dram-transistor) = 约 47mm²。标准 DRAM 晶圆直径 300mm，可用面积约 70,686mm²。我们可以使用与上面相同的计算：

![DRAM 晶圆良率计算](/my-site/images/memory-shortage/17-dram-wafer-calc.png)
*Source: Contrary Research, [NVIDIA](https://www.nvidia.com/en-us/data-center/gb200-nvl72/), [TechInsights](https://www.techinsights.com/blog/samsung-1a-16gb-lpddr5x-dram-transistor), [Chip Log](https://www.chiplog.io/p/fundamental-guide-to-understanding)*

这表明一块 480GB DRAM 容量的 GB200 Bianca Board 需要 240 颗 die，即一片典型内存晶圆的 **20%**。

**总结**

每个 GB200 包含：

- 两个 Blackwell B200 GPU，需要约一片晶圆的 **30%**（每个 15%）
- 480GB LPDDR5X 容量，需要约一片晶圆的 **20%**

Jensen Huang 估计 Stargate 将需要[四到五百万](https://www.cnbc.com/2025/09/22/nvidia-openai-data-center.html) GPU，但未说明这个数字指的是 GB200（每个板载两个 GPU）还是单个 GPU。一些估计认为 100 万个 GB200（即 200 万个 B200）需要 3GW 供电。NVIDIA 表示 DGX GB200 NVL72 机架（包含 36 个 GB200，即 72 个 B200）功耗 [120kW](https://docs.nvidia.com/dgx/dgxgb200-user-guide/hardware.html)，包括[风冷单元](https://docs.nvidia.com/dgx/dgxgb200-user-guide/hardware.html)。这表明 10GW 集群将由 **300 万块** GB200 Bianca Board（即 600 万个 GPU）组成。

![B200 GPU 总量计算](/my-site/images/memory-shortage/18-total-b200-calc.png)
*Source: Contrary Research*

假设 OpenAI 确实需要 300 万个 GB200，内存晶圆的总需求应为 600 万 ×（30% + 20%）= **300 万片**晶圆。这不到其计划购买的 1080 万片的 **30%**。当然，这是一个粗略估计：OpenAI 可能购买 90 万片/月超过或不到 12 个月。Stargate 集群的容量或特性也可能发生变化。

---

*重要披露：本文仅供信息和教育目的分发，不构成购买任何证券的要约或参与任何交易策略的邀请。Contrary LLC 对所呈现材料的准确性、充分性或完整性不作任何保证。*
