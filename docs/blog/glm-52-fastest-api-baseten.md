---
title: 我们如何构建世界最快的 GLM-5.2 API
description: Baseten 介绍其 GLM-5.2 推理优化：NVFP4 量化、KV 感知路由、prefill/decode 解耦和 MTP 推测，让 API 达到 280+ tokens/s。
date: 2026-06-23
source: https://x.com/philipkiely/status/2069212319746506968
---

# 我们如何构建世界最快的 GLM-5.2 API

> 原文：Philip Kiely / @philipkiely，[How we built the world's fastest API for GLM-5.2](https://x.com/philipkiely/status/2069212319746506968)  
> 说明：以下为中文完整翻译，尽量保留原文结构与技术表述；配图来自原文 X Article。

![](/images/glm-52-fastest-api-baseten/01.jpg)

[GLM-5.2](https://www.baseten.co/library/glm-52/) 是 DeepSeek-R1 之后开源模型领域最大的新闻。

![科技领袖正在把 GLM-5.2 视为开放模型前沿智能的新高水位](/images/glm-52-fastest-api-baseten/06.jpg)

很容易理解为什么。GLM-5.2 以一小部分成本，提供了可与 GPT 5.5 和 Opus 4.8 相比的性能；纯按 token 计算，通常便宜 70%-80%（可以用我们的[计算器估算你的工作负载能节省多少](https://www.baseten.co/resources/calculator/)）。

但一个模型不能只是聪明和便宜。要在生产环境中真正有用，模型还必须快速、可靠，并且能够规模化可用。要兑现“前沿开放智能”的承诺，需要非常出色的推理能力。

因此，我们构建了世界最快的 GLM-5.2 API。根据 Artificial Analysis 的测量，目前它可以提供超过 280 tokens/s 的服务速度。

![GLM-5.2 在 Baseten Model APIs 上以 SOTA 速度运行，Artificial Analysis 于 2026 年 6 月 22 日测量](/images/glm-52-fastest-api-baseten/08.jpg)

我们通过在整个推理流程中使用多项技术实现了这一性能：

- 更新自定义推理引擎，为 GLM-5.2 架构实现 shared DSA 支持。
- 从原始 FP8 权重出发，内部完成并校准 NVFP4 量化；在 BFCL 这类智能体基准上，它展现出与原始权重等价的质量。
- 使用基于 NVIDIA Dynamo 工具构建的 KV-aware routing，确保较高 KV cache 命中率，从而降低 prefill 负担，并在包含重复前缀的请求中改善 TTFT。
- 使用 NVIDIA Dynamo toolkit 构建解耦式推理，在观测到的工作负载形态上实现 2 倍更高 TPS。
- 通过实现对 GLM-5.2 Multi-Token Prediction heads 的支持，用推测执行进一步提升 TPS。

你可以直接通过 [Baseten Model APIs 上的 GLM-5.2](https://www.baseten.co/library/glm-52/) 体验这种性能。对于高流量工作负载，我们也提供 GLM-5.2 的专属部署。

![Notion 通过 Baseten 提供 GLM-5.2](/images/glm-52-fastest-api-baseten/05.jpg)

## GLM-5.2 概览

[Z.ai 发布的 GLM-5.2](https://z.ai/blog/glm-5.2) 是一个 744B 参数的前沿大语言模型，擅长智能体任务（尤其是写代码），并支持最高 100 万 token 的上下文窗口。它使用了与前代 GLM-5.1 类似的架构：MoE（40B 激活参数）、非思考与思考模式，以及完全开放的 MIT 许可证。虽然 GLM-5.2 与 GLM-5.1 有很多共同点，但它现在使用 shared DSA 权重，而我们已经在自定义 runtime engine 中实现了对它的支持。

![GLM-5.2 在各类任务上提供前沿性能。图片来自 Z AI。](/images/glm-52-fastest-api-baseten/04.jpg)

GLM-5.2 的基准分数很强，但到了今天，AI 构建者已经知道：模型的实用性不只取决于标准评测上的表现。在实践中，GLM-5.2 达到甚至超过了其基准所暗示的能力。它确实是一个非常适合写代码、运行 agent，以及处理其他前沿语言模型任务的优秀模型。

## 面向 Blackwell GPU 的高质量 NVFP4 量化

我们的 Model APIs 运行在 NVIDIA Blackwell GPU 上，并使用 [Baseten Inference Stack](https://www.baseten.co/resources/guide/the-baseten-inference-stack/) 中的自定义推理引擎。所选 runtime 使用 NVFP4 权重来最大化性能。我们从原始 FP8 权重出发，使用 NVIDIA ModelOpt 在内部完成了到 NVFP4 的量化。NVFP4 是 NVIDIA 提供的一种 4-bit 浮点数据格式，它使用双重 scale factor 来保留较高动态范围并维持模型质量。

在量化模型的校准和测试中，我们重点确保 GLM-5.2 在 agent 常见模式上忠实工作。在 BFCL 函数调用基准上，我们观察到原生 FP8 权重与我们的 NVFP4 量化版本表现大致等价，多次运行的分数差异都处在该基准的误差范围内。

NVFP4 量化通过启用更快的 tensor core，并降低 VRAM 带宽压力，同时改善了 time to first token 和 tokens per second。

![TTFT 和 TPS 表现都很出色，Artificial Analysis 于 2026 年 6 月 22 日测量](/images/glm-52-fastest-api-baseten/09.jpg)

## 使用 NVIDIA Dynamo 做缓存感知路由

GLM-5.2 特别适合长上下文请求和复杂智能体任务。这些工作负载通常具有很长的输入序列。通过在请求之间复用 KV cache，我们可以跳过共享序列上昂贵的 prefill 过程。

我们通常会在 time to first token（TTFT）的语境下讨论 KV cache 复用。不过，对 GLM-5.2 这类推理模型来说，更重要的通常是 time to first answer token（TTFAT）：它把 TTFT 与推理序列上的一部分 TPS 合并考虑。

![GLM-5.2 的 Time to First Answer Token，Artificial Analysis 于 2026 年 6 月 22 日测量](/images/glm-52-fastest-api-baseten/03.jpg)

这张图显示，在平均 7.9 秒生成第一个答案 token 的时间里，有 7.1 秒花在生成推理 token 上，只有 0.8 秒花在处理输入序列上。

即便如此，把 TTFT 降到 800ms 对系统整体响应性和吞吐量仍然很重要。在大规模生产部署中，KV cache 会分布在多个独立副本上。我们使用 NVIDIA Dynamo 提供的工具来路由传入请求。

![KV-aware routing 会把请求发送给已经缓存相关上下文的副本，通过避免重复 prefill 计算节省时间](/images/glm-52-fastest-api-baseten/07.jpg)

多租户 API 上的精确缓存命中率取决于特定时刻的具体流量画像。到目前为止，我们在相当异构的流量中观察到了很高的命中率，这降低了 prefill 负载，并改善了端到端性能。

## 使用 NVIDIA Dynamo 解耦 prefill 与 decode

我们对 GLM-5.2 所做的最高影响力性能优化之一，是解耦 prefill 和 decode。

LLM 推理中有两个不同阶段：

- **Prefill**：计算受限的过程，负责处理输入序列、构建 KV cache，并生成第一个输出 token。Prefill 性能决定 TTFT。
- **Decode**：内存受限的过程，负责生成后续输出 token。Decode 性能决定 TPS。

传统上，单个 GPU 节点会同时处理 prefill 和 decode。通过解耦，这些工作负载会在独立 engine 上运行。这带来几个好处：

- Prefill 和 decode 可以独立运行，互不争抢资源。
- 我们可以按需在 prefill 和 decode 之间分配不等量资源（通常来说，我们会配置比 decode engine 更多的 prefill engine）。
- 运行 prefill 和 decode 的推理 engine 可以使用不同配置，分别针对推理流水线中各自部分的需求进行优化。

只要可能，KV cache 仍然会被复用。这意味着 prefill worker 只会用于处理新的输入序列。

![解耦式推理使用独立的 prefill worker 和 decode worker](/images/glm-52-fastest-api-baseten/02.png)

实现 PD disaggregation 的很大一部分挑战，在于 prefill engine 与 decode engine 之间可靠、低开销的通信和编排。NVIDIA Dynamo 提供了一套开发者工具，用来实现解耦所需的关键组件：

- 当所有 prefill engine 都饱和时，用 prefill queue 保存请求。
- 对 conditional disaggregation 提供稳健支持：根据 prefix cache 之后的输入序列长度，以及 prefill queue 大小等可配置阈值进行 prefill 路由。
- 基于 NIXL 的高效 KV transfer：把 KV 从 prefill engine 传到 decode engine，并在两个 engine 使用不同 TP 配置时，用 kernel 在不同布局之间转置 KV block。

在 GLM-5.2 的聚合式部署与解耦式部署正面对比基准中，我们观察到解耦式推理的 tokens per second 提高了 2 倍。

## 用 Multi-Token Prediction 提升 TPS

GLM-5.2 自带了改进后的 Multi-Token Prediction（MTP）层，它降低了生成 draft token 的成本，并提高了这些 token 的接受率。

简单回顾一下：MTP 是几种推测方法之一。推测执行的过程，是在模型一次 forward pass 中生成不止一个 token，目标是提高 TPS。由于所有算法都有 verification step，推测方法是无损的性能优化。

我们使用这些 MTP 层生成 draft token，并测试了多种序列长度，以找到生成长序列和保持高接受率之间的正确平衡。在过去几个月里，我们围绕 MTP 做了[大量工作](https://www.baseten.co/blog/boosting-mtp-acceptance-rates-in-baseten-speculation-engine/)，而 GLM-5.2 使用的推测机制仍然还有继续释放的空间。

## 在生产中运行 GLM-5.2

看到这类基准结果时，自然会问：同样的性能是否真的能在生产中维持？

事实上，我们不仅能在生产中交付这种性能，而且对于 GLM-5.2 的大规模专属部署，还能获得更好的工作负载特定性能。可以使用的杠杆包括：

- 使用任务特定 speculator，它们基于代表预期生产数据的输入和输出序列训练。
- 从单租户流量中获得更稳定的缓存命中。
- 调整 disaggregation 配置，使 prefill engine 与 decode engine 的比例匹配流量画像。
- 配置并行度和 batching 设置，以获得所需的延迟与吞吐量权衡。

如果需要 GLM-5.2 的专属部署，可以[联系我们团队](https://www.baseten.co/talk-to-us/)；也可以从今天开始使用我们的 [model API](https://www.baseten.co/library/glm-52/) 测试这个模型。

这项工作的全部功劳属于 Alex Korte、Magdy Saleh、Tri Dao、Anant Desai、Bryce Dubayah、Abu Qader，以及 Baseten 其他优秀工程团队成员。我只是那个很幸运、能够写文章介绍他们辛勤工作的人。
