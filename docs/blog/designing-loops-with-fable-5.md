---
title: 用 Fable 5 设计循环
description: Lance Martin 分享如何用 Claude Fable 5 设计自我纠错循环与跨会话记忆，让模型在环境反馈中持续改进。
---

# 用 Fable 5 设计循环

> 原文：Lance Martin / @RLanceMartin, [Designing loops with Fable 5](https://x.com/RLanceMartin/status/2064397389189071163)  
> 说明：以下为中文完整翻译，尽量保留原文结构与语气；文中配图为原文图片。

![](/images/designing-loops-with-fable-5/hero.jpg)

Claude Fable 5 这样的 Mythos 级模型，已经改变了 Anthropic 许多人工作的方式。我想分享两个技巧，帮助大家更好地用好这一类模型。

## 自我纠错循环

最近大家对循环很感兴趣。@bcherny 曾经提到，“（他的）工作就是写循环”。让模型围绕一个评测进行 hillclimb，是提升任务表现的常见方法：[Claude Code 中的 /goal](https://code.claude.com/docs/en/goal) 和 [Claude Managed Agent 中的 Outcomes](https://platform.claude.com/docs/en/managed-agents/define-outcomes)，都是可以把这个通用方法应用到你具体任务上的原语。

正如我们在 [Fable 5 提示词指南](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5) 中提到的，Fable 5 很擅长在循环中自我纠错。一个设计良好的目标或评分 rubric，会给 Claude 运行所在的环境增加反馈。这让 Claude 可以运行、通过目标或 rubric 收集反馈、自我纠错，然后继续推进，直到目标或 rubric 被满足。

![](/images/designing-loops-with-fable-5/01.jpg)

我分享一个用来测试 Fable 的玩具例子：[Parameter Golf](https://github.com/openai/parameter-golf)。这是一个开源 ML 工程挑战，目标是在 8xH100 上、10 分钟以内，训练出能装进 16MB artifact 的最佳模型。

它有点像 [@karpathy 的 autoresearch 项目](https://github.com/karpathy/autoresearch)：它测试一个 agent 编辑基础训练代码（一个 `train_gpt.py` 文件）、启动训练、轮询日志、读取分数，并决定下一步该跑什么实验的能力。

我用 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)（CMA）在这个挑战上比较了 Fable 5 和 Opus 4.7。CMA 提供 agent harness，也提供 [托管沙盒](https://www.anthropic.com/engineering/managed-agents)，所以很适合用 Fable 5 处理长时间运行的任务。对于 Parameter Golf，我给 CMA 接入了 8xH100 GPU，作为一个 [自托管沙盒](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes)。

有一个微妙点：负责评判的东西很重要。我们已经看到，模型在对自己的输出做自我批判时会遇到问题。Prithvi Rajasekaran 在我们的工程博客中[写过这件事](https://www.anthropic.com/engineering/harness-design-long-running-apps)。

![](/images/designing-loops-with-fable-5/02.jpg)

我们发现，对于 Fable 5 来说，验证器子 agent 往往比自我批判效果更好，因为评分发生在一个独立的上下文窗口中。CMA 中的 [Outcomes](https://platform.claude.com/docs/en/managed-agents/define-outcomes) 会通过为你生成一个评分子 agent 来处理这一点。

每次测试时，我都会提供一个 rubric（一个文件），其中包含九条可检查标准（例如：运行 baseline、运行 20 个实验等）。然后，我让 Parameter Golf 最多运行 8 小时。Outcomes 评分器会确认所有实验标准都已满足，然后才允许 Claude 停止工作。

Fable 5 对训练流水线的改进幅度，大约是 Opus 4.7 的 6 倍。如果我们把实验分成结构性实验（例如架构变化）和标量实验（例如调整一个常数），Fable 5 会押注更大的结构性变化，并表现出韧性（例如，即使量化带来回退，也会继续推进，最终得到它最大的收益）。

Opus 4.7 的第一个实验带来了一个小幅收益，而之后几乎所有实验都遵循同一个模板：调整一个标量、测量、如果结果为正就保留。

## 记忆

记忆是 Fable 擅长的另一个领域。我们可以把它理解成一个跨会话的外循环：Claude 在一个会话中写入记忆，而这些记忆可以在未来会话中被检索出来。相关最佳实践见 [Claude 提示词最佳实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)。

@pgasawa 和团队最近发布了 Continual Learning Bench 1.0，所以我想在 Fable 5 和更早的模型上测试这一点。

> Parth Asawa：今天，我们发布 Continual Learning Bench 1.0：第一个用于衡量 AI 系统如何在在线环境中改进的现实基准。今天的基准假设模型是无状态的。每个样本都是独立的，一个系统完成任务后，就像什么都没发生一样继续下一个任务。但已部署的 AI 系统应该能从经验中学习。我们用新颖、经过专家验证的任务测试了 10 多个前沿系统，发现它们在学习方面仍有大量提升空间。[(1/n)](https://x.com/pgasawa/status/2051361012838957144)

我比较了 Fable 5、Opus 4.7 和 Sonnet 4.6 在该基准中一个任务上的表现：这个任务要求一个 agent 在可以访问 SQL 数据库的情况下，回答一系列顺序问题。每个问题都是一个独立的 agent 会话，并且提供记忆。

为此，我使用了带 [memory](https://platform.claude.com/docs/en/managed-agents/memory) 的 CMA，它让每个 agent 都可以访问一个挂载的文件系统，而这个文件系统可以跨会话共享。

![](/images/designing-loops-with-fable-5/03.jpg)

对于这个任务，有效使用记忆得益于一个递进过程：失败（答错并记录）、调查（在继续之前弄清楚为什么）、验证（把诊断转化为已检查的事实）、提炼（把验证结果转化为通用规则），以及查阅（读取规则，而不是重新推导）。

Sonnet 4.6 大约停在第 1 步：它的存储是一串失败记录和开放式猜测（例如，“也许是 `prc` 而不是 `prc_usd`？”）。它很少查阅之前的笔记。要提升表现，需要针对任务编写专门的记忆指令。

Opus 4.7 大约停在第 3 步：它会创建一份 schema 参考，并标出不确定性（例如，“可能 `prc` 是以美分计？验证。”），但验证覆盖率很低：只覆盖 7-33% 的问题（中位运行大约 17%）。

Fable 5 往往能完成整个递进过程：在它最强的运行中，验证覆盖率最高达到 73%（30 个问题中有 22 个），并且会把学到的东西提炼成通用规则，帮助未来任务。

---

与其直接提示和操控 Fable 5，通常更好的做法是设计循环，让模型能够根据环境反馈进行自我纠错（例如通过 `/goal` 或 Outcomes），并管理自己的上下文（例如通过记忆）。

我这里只分享了几个自己跑过的小规模实验，但值得你亲自用有挑战性的任务测试 Fable 5，并用循环来实现自我纠错或记忆。

要开始，可以查看我们的[文档](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5)，或者询问最新版 Claude Code。它可以使用我们内置的 [`/claude-api` skill](https://github.com/anthropics/skills/tree/main/skills/claude-api) 来告诉你 Fable 5（例如提示词最佳实践）、`/goal`、Claude Managed Agents 或其他 API 功能。
