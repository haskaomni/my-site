---
title: Agent 的持续学习：Replit 如何把评估变成改进循环
description: Michele Catasta 分享 Replit Agent 的持续学习实践：从 ViBench、线上 A/B、生产轨迹聚类到自我改进循环，持续优化 agent harness 与上下文层。
date: 2026-07-07
source: https://x.com/pirroh/status/2074118901143679414
---

# Agent 的持续学习：Replit 如何把评估变成改进循环

> 原文：Michele Catasta / @pirroh，[Continual Learning for Agents](https://x.com/pirroh/status/2074118901143679414)  
> 说明：以下为中文译介与要点整理，基于公开 X Article 改写，不是逐字全文转载；配图来自原文并本地化保存。

![Agent 的持续学习封面](/images/continual-learning-for-agents/cover.jpg)

很多人一提到 continual learning（持续学习），第一反应就是：持续更新模型权重。但在今天的 agent 生态里，这个理解并不完整。

原因很现实：大量生产环境里的 agent，底层依赖的是封闭前沿模型。你不能访问权重，也就谈不上直接微调这些权重。对绝大多数 agent 产品团队来说，权重层面的持续学习并不是可操作选项。

但这不意味着 agent 不能学习。

Replit 的观点是：agent 系统至少可以在三个层面变好：

- **模型层**：模型本身的能力提升，通常由模型供应商控制。
- **Harness 层**：驱动 agent 的代码、工具、提示词、评测、编排逻辑。
- **上下文层**：围绕具体 agent、用户、组织沉淀的记忆、偏好、项目状态与交互历史。

如果无法改模型权重，真正的机会就在后两层。Harness 层可以从生产轨迹里发现模式，持续改进工具和指令；上下文层可以让产品在用户、团队和组织维度个性化。两者叠加之后，agent 就可以在不训练底层模型的情况下，形成每天都能发版的复利式改进。

## 为什么评估必须进入改进循环

Replit Agent 的典型用户不是拿着一个现成仓库来让模型修 bug。他们通常只有一个想法：用自然语言描述目标，然后期待 agent 从零构建一个可运行应用。

这让评估变得很难。

传统编码 benchmark 往往有明确环境、固定测试、固定接口。SWE-bench、Terminal-Bench 这类评测很有价值，但它们衡量的是 agent 在受控任务里能否修复或完成某段代码。而 vibe coding 用户关心的不是 diff 是否漂亮，也不是某个函数签名是否正确，而是：

- 应用能不能打开？
- 核心流程能不能跑通？
- 最终成品是否符合一开始的自然语言需求？

也就是说，评估对象从“代码”变成了“成品应用本身”。

过去，评估更像发版前的闸门：跑一遍 eval，看分数，决定是否上线。这个模式适合发布周期慢、系统变化少的场景。但 agent 产品变化太快：模型会换，prompt 会改，工具会加，产品入口也在演进。单一分数无法解释用户真正关心什么、生产环境哪里在坏、下一步该修什么。

所以 Replit 把评估从 launch check 变成 improvement loop：评估不只是决定能不能发版，而是持续回答“应该修哪里、怎么修、修完有没有真的变好”。

![从一次性评估到持续改进循环](/images/continual-learning-for-agents/eval-loop.jpg)

## ViBench：为 vibe coding 设计的端到端评测

为了解决“用户想要的是可用应用，而不是局部代码正确”这个问题，Replit 构建了 **ViBench**。

ViBench 的核心思想很简单：用自然语言产品需求文档（PRD）作为输入，让 agent 从零构建一个真实可运行的应用，再用自然语言测试计划检查成品是否满足需求。

这和传统编码基准最大的区别在于：

- agent 不被限制在既有仓库、既有路由或固定 scaffold 里；
- agent 可以自己选择技术栈、schema、页面结构和交互流程；
- evaluator 不能预先知道 DOM、selector 或路由，只能像真实用户一样探索应用；
- 测试目标是产品功能是否成立，而不是某个局部单元测试是否通过。

Replit 的评测 agent 以 Playwright 为骨架，在 notebook 式环境里一步步探索应用：打开页面、理解结构、点击交互、验证功能。这样才能处理文件操作、离线模拟、多租户等复杂应用场景。

![ViBench 让行为评估器固定，改变输入与构建方式](/images/continual-learning-for-agents/vibench.jpg)

ViBench 还可以扩展到不同 workload：

- **从零构建应用**：最典型的 vibe coding 场景。
- **在已有应用上加功能**：更接近真实用户中途继续迭代项目的需求。
- **Vibe-to-ref / Vibe-on-Vibe**：用 agent 自己生成的应用继续做后续扩展，观察错误是否累积。
- **新产品形态评估**：例如并行构建、merge、subagent 分解等新交互模式。

早期结果给了 Replit 两个重要教训：

1. 编码基准上的高分不一定能迁移到完整应用构建，尤其是开放权重模型。
2. 很多模型在扩展自己写出来的代码时会变差，因为前一轮留下的问题会在后续请求中累积。

这让团队把目标从“写出能过测试的代码”推进到“构建能承受下一轮用户请求的应用”。

## 离线 benchmark 不够，还要线上 A/B

Replit 仍然非常重视离线评测，但他们并不把它当作唯一裁判。原因是，很多 agent 改动在受控环境里看起来更好，到了真实用户那里却可能退化。

真实用户是不受控的：他们会半途改主意，会组合奇怪功能，会放弃项目，会遇到测试集从未覆盖的失败模式。

因此 Replit 会对大多数影响 agent 行为的更新做 A/B：

- prompt 改动
- 工具改动
- harness 修订
- 模型替换
- 较大的行为策略变化

A/B 关注的不只是成功率，还包括用户是否继续推进、成本是否异常、情绪是否变化、最终是否真的发布了东西。

![A/B 能显示生产行为变化，但聚合指标需要进一步解释](/images/continual-learning-for-agents/ab-tests.jpg)

但 A/B 的难点是：指标本身不解释原因。

例如运行时长上升，到底是 agent 做了更多有用工作，还是卡住了？成本下降，是更高效了，还是悄悄少做了某些必要步骤？用户情绪下降，是哪些场景退化了？哪些失败模式是新出现的？

这就需要第三个层次：生产轨迹分析。

## Telescope：从生产轨迹里发现真正坏掉的东西

Replit 用 **Telescope** 做 trace analysis 和 clustering。A/B 告诉团队“生产行为变了”，Telescope 解释“为什么变了”。

在生产规模下，不可能让工程师阅读每一条 agent 轨迹。Telescope 的做法是把大量 session 压缩成可行动的问题簇：

- 读取用户消息、agent 回复、工具调用、错误、metadata 和其他上下文；
- 总结每条轨迹里发生了什么；
- 将这些摘要 embedding 化；
- 用密度聚类方法发现相似失败模式；
- 随着分布变化，对新 session 做分类。

目标不是简单统计失败次数，而是发现那些“藏在聚合指标背后”的系统性问题。

一个典型例子是端口失败、冷启动失败、环境配置退化这类长尾问题。单看整体指标可能不明显，但当 Telescope 把相似轨迹聚成一类，工程师就可以从 compact facet 入口快速下钻到代表性 session，再结合日志和可观测性数据定位原因。

这类系统的价值在于，它把零散失败转化成产品问题：哪些 workflow 最常见？哪些被用户放弃？哪些错误反复出现？某个修复是否真的缩小了目标问题簇？

## 自我改进循环：让 agent 帮忙改进 agent

当 ViBench、A/B 和 Telescope 都建立起来之后，瓶颈就变了：团队已经知道哪里失败、失败频率、影响范围，下一步是把这些证据转成可执行修复。

Replit 的做法是引入一个 self-improvement loop：如果 agent 能帮助用户构建软件，它也应该能帮助工程师改进 agent 本身。

这个循环大致是：

1. 读取生产日志、trace cluster 和近期失败案例。
2. 找出值得追踪的假设。
3. 生成候选改动，例如 prompt、工具、skill、harness 逻辑或回归测试。
4. 打开带有推理说明的 draft PR。
5. 用 ViBench、A/B、轨迹数据和近期 baseline 衡量结果。
6. 建议 ship、iterate 或 drop。

![Agent 改进循环：发现问题、提出改动、评估结果、决定去留](/images/continual-learning-for-agents/optimization-loop.jpg)

关键点是：这不是自动发版。循环可以准备证据和第一版实现，但工程师仍然审查结果并决定是否上线。

每次运行都会记录自己尝试了什么、结果如何、哪些失败了。久而久之，未来的运行就可以复用有效经验，避开已知死路，提出更容易泛化的改动。

原文给了一个具体案例：某次 Telescope 发现一个小但持续增长的问题簇，指向冷启动场景下环境设置的静默退化。循环读取受影响轨迹，提出补丁，添加回归测试，并在 ViBench 上确认主路径没有退化。工程师审查后当天上线。上线后，用户情绪恢复，受影响用户被解锁。

这就是他们想要的形态：系统找到真实失败模式，把它连接到具体用户影响，提出合适粒度的修复，并带回足够证据让人类做发版决策。

## 人类判断仍然是关键瓶颈

虽然聚类、提出假设、生成改动、跑评估和整理证据都可以越来越自动化，但 Replit 强调，人类判断并没有消失，反而集中在更关键的位置：

- **选择假设**：系统能暴露大量失败，但人类要决定哪些问题值得花夜间预算去追。
- **确定架构方向**：轨迹可能显示用户放弃某个 workflow，但到底是修 agent 行为、改产品入口，还是重做交互面，需要产品和工程判断。
- **维护评测目标**：eval 不是行政工作，它定义了 agent 要爬的山。如果评测奖励了错误行为，优化循环会忠实地走向错误方向。
- **批准发布**：发版不是看一个数字，而是理解证据、评估影响面、决定风险是否可接受，并承担 rollout 责任。

换句话说，agent 可以承担更多搜索、测量和综合工作，但人类仍然负责方向、品味和最终取舍。

## 这篇文章真正重要的地方

这篇文章最有价值的地方，不在于某个具体 benchmark 或内部工具名，而在于它给出了一个生产级 agent 产品的持续学习框架：

- **不要把持续学习窄化为权重更新**。在封闭模型时代，harness 和 context 才是大多数团队能控制的复利层。
- **评估必须从一次性闸门变成反馈系统**。分数只能帮你做局部判断，生产轨迹才能告诉你下一步该修什么。
- **端到端行为比局部代码正确更接近用户价值**。vibe coding 的核心评估对象是用户看到的应用。
- **A/B 与 trace clustering 是互补的**。A/B 发现行为变化，聚类解释变化来源。
- **自我改进需要人类审查，而不是全自动发版**。agent 可以提出更好的候选改动，但工程师仍然是系统目标函数的守门人。

最后一句可以概括整篇文章：评估不再只是发版前的门禁，它正在变成决定修什么、测什么、发什么的核心循环。真正的目标不是得到更好看的数字，而是把用户失败转化为更好的 release，让更多想法变成用户愿意发布的应用。

## 参考链接

- 原文 X Article：<https://x.com/pirroh/status/2074118901143679414>
- Continual learning for AI agents：<https://www.langchain.com/blog/continual-learning-for-ai-agents>
- ViBench：<https://vibench.ai/>
- SWE-bench：<https://arxiv.org/abs/2310.06770>
- Terminal-Bench：<https://arxiv.org/abs/2601.11868>
- Replit automated self-testing：<https://replit.com/blog/automated-self-testing>
- Infrastructure noise in agentic coding evals：<https://www.anthropic.com/engineering/infrastructure-noise>
- Replit Snapshot Engine：<https://replit.com/blog/inside-replits-snapshot-engine>
- Braintrust Topics architecture：<https://www.braintrust.dev/blog/topics-architecture>
