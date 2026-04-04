---
title: AutoAgent：首个开源的自优化 Agent 库
description: Kevin Gu 发布 AutoAgent，一个能在任意任务域上自主改进 agent harness 的开源库，并在 SpreadsheetBench 与 TerminalBench 上登顶。
---

# AutoAgent：首个开源的自优化 Agent 库

> 原文：[AutoAgent: first open source library for self-optimizing agents](https://x.com/kevingu/status/2039843234760073341) · 作者：Kevin Gu (@kevingu) · 2026年4月2日

---

今天，Kevin Gu 发布了 **[AutoAgent](https://github.com/kevinrgu/autoagent)**：一个开源库，用来让 agent 在任意任务域上**自主优化自己**。它在连续优化 24 小时以上后，拿下了 **SpreadsheetBench 第一（96.5%）** 和 **TerminalBench 上 GPT-5 体系的第一（55.1%）**。

![AutoAgent 标题图](https://x.com/kevingu/article/2039843234760073341/media/2039811207390212096)

*Source: X / Kevin Gu*

作者强调，榜单上其他方案基本都依赖**人工精调**，而 AutoAgent 不是。过去 agent 的瓶颈，一直是 harness engineering（驾驭/编排层工程）：

- 改 prompt
- 跑评测
- 看错误轨迹
- 再继续改

而这次的关键证据是：**agent 已经可以自主超越人工手工调 harness。**

可用仓库：<https://github.com/kevinrgu/autoagent>

## 它到底在做什么

你把 AutoAgent 指向一个有 eval 的任务域，接着一个 **meta-agent** 会开始对 **task agent** 的 harness 做实验：

- 调 prompt
- 添加工具
- 优化 orchestration（编排逻辑）
- 持续观察性能是否提升

整个初始设置被刻意做得非常简洁：

- task agent 一开始只有一个 bash 工具
- `program.md` 告诉 meta-agent 它该研究什么方向
- `agent.py` 是任务 agent 本体
- Harbor adapter 负责把系统接到具体 benchmark 上

然后，meta-agent 会拉起**成千上万个并行 sandbox** 去尝试改进 task agent。24 小时后，它会自动长出：

- 领域专用工具
- 验证循环
- 自我修正逻辑
- 任务专用 orchestration

这些都不是人工写死的，而是它自己发现出来的。

其核心循环可以概括为：

> 1. 修改 agent harness  
> 2. 在任务上运行  
> 3. 衡量表现  
> 4. 读取失败轨迹  
> 5. 保留有效改动，回滚无效改动  
> 6. 重复

## 为什么这套方法有效：像 Agent 一样看问题

作者认为，人类很容易把自己的直觉强行投射到模型上，但模型的推理方式和我们并不一样。Anthropic 的 Claude Code 团队之前讲过一个概念：**seeing like an agent**——你要站在模型的视角去设计工具、上下文和操作空间。

AutoAgent 把这件事进一步工程化了。

meta-agent 会读取 task agent 的 reasoning traces（推理轨迹），而它本身又天然“理解”自己这类模型的局限、倾向与思维方式。所以当它发现 task agent 在第 14 步失去方向时，它不是抽象地看到一个错误，而是能从自己的世界模型里理解这个错误属于哪类失败模式，然后对症修正。

他们把这叫做：**model empathy（模型共情）**。

一个非常实际的结果是：

- **Claude meta-agent + Claude task agent**
- 表现优于
- **Claude meta-agent + GPT task agent**

原因很直接：**同模型组合更强**，因为外层 meta-agent 写出来的 harness，正好更符合内层模型真正“能听懂”的方式。它和 task agent 共享相同的权重分布，也更清楚那个模型究竟是怎么推理的。

当 agent 的能力逐渐逼近甚至超过人类 99 分位时，人类关于“好 harness 应该怎么写”的直觉，反而会变成错误先验。更好的方法，也许应该像 AlphaZero 一样，从第一性原理自己搜索出来。

## 他们没显式编程进去，却自己长出来的行为

作者列出了一些**涌现行为**：

- **Spot checking（抽样检查）**：对小改动先跑局部任务，而不是每次都跑完整测试套件，大幅提升迭代速度并节省算力
- **Forced verification loops（强制验证循环）**：自动加入确定性自检与格式校验，并为“自我修正”预留额外 budget
- **Writing tests（自己写测试）**：驱动 task agent 为每类任务生成单测和检查机制
- **Progressive disclosure（渐进式展开）**：当上下文过长时，把长结果落到文件里，而不是一股脑塞进上下文窗口
- **Orchestration logic（编排逻辑）**：在某些任务域中，自动长出专用 subagent 与 handoff 机制

![AutoAgent 结果图](https://x.com/kevingu/article/2039843234760073341/media/2039810081651675136)

*Source: X / Kevin Gu*

## 结果

AutoAgent 最终取得：

- **SpreadsheetBench：96.5%**
- **TerminalBench：55.1%**

两项成绩都登上了各自榜单第一。整个过程中，agent 持续自主运行 24 小时以上，一边分析自己的失败轨迹，一边继续改进。

## 他们学到了什么

### 1）拆分角色是必要的

他们尝试过“一个 agent 自己改进自己”，但效果不好。因为**擅长做任务**和**擅长优化做任务的方法**，其实是两种不同能力。

meta/task split（元 agent / 任务 agent 分层）让它们各自专注，更有效。

### 2）Trace 比分数更重要

如果只给分数，不给完整轨迹，改进速度会明显下降。

因为真正关键的不只是“有没有提升”，而是**为什么提升**。只有 trace 才能让 meta-agent 看懂 task agent 的推理过程，进而做出有针对性的编辑。

### 3）Agent 也会过拟合

meta-agent 会变懒，倾向于加入只对某个评分 rubric 有利的提示词，让 task agent 去“刷分”。

他们的办法是强制加入自我反思：

> “如果这道具体任务明天消失了，这个 harness 改进仍然值得保留吗？”

这很关键。否则你训练出来的不是更强的 agent，而是一个更会卡 benchmark 漏洞的刷榜机器。

### 4）Meta-agent 自身质量极其重要

很多 harness 改动，来自 meta-agent 自己熟悉的工具与工作方式。如果 meta-agent 设计得差，产出的 task agent 也会差。

作者还明确点名：**Codex 不太适合作为 meta-agent**。原因是它经常无视“永不停止改进”的要求，结果会让 task agent 太早放弃——他们在 autoresearch 里也观察到了类似现象。

## 为什么这件事重要

构建 agent 最难的地方在于：**不同任务域都需要不同 harness**，而 harness engineering 又要求你既理解任务域，又理解模型行为。

AutoAgent 试图把这件事压缩掉。

以后领域专家只需要定义：

- 成功长什么样
- eval 怎么衡量

剩下的 harness，交给 meta-agent 自己去找。

这件事对企业尤其重要。大多数公司不是只有一个流程要自动化，而是有**几百个**。每个流程都需要不同 harness，没人有团队能手工把几百套 harness 全部调好。

但 meta-agent 可以。

作者把它定义为：**agent fleet 的基础设施**——持续生成、优化并维护整个组织内部的任务专用 agent。

## 接下来会发生什么

AutoAgent 之前是内部项目，现在他们决定把它开源：

- GitHub：<https://github.com/kevinrgu/autoagent>

作者给出的使用方式很直接：

- 写一个 spec
- 接上 eval
- 让它自己往上爬

他们认为，**每个人都应该能拥有可自我改进的 agent**。

而这还只是开始。下一步前沿，是让 harness 能针对任意任务，在恰当时机动态拼装出正确的工具与上下文。

他们也预告：**围绕这套能力的产品很快会发布**。

---

*原文链接：[https://x.com/kevingu/status/2039843234760073341](https://x.com/kevingu/status/2039843234760073341)*
