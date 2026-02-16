---
title: "InferenceX v2：NVIDIA Blackwell 对比 AMD 对比 Hopper"
description: "SemiAnalysis 发布 InferenceX v2 基准测试，全面对比 GB300 NVL72、MI355X、B200、H100 在 DeepSeek R1 推理上的性能，涵盖分离式服务、宽专家并行、MTP 等前沿推理优化技术。"
---

# InferenceX v2：NVIDIA Blackwell 对比 AMD 对比 Hopper

> **原文**：[InferenceX v2: NVIDIA Blackwell Vs AMD vs Hopper](https://newsletter.semianalysis.com/p/inferencex-v2-nvidia-blackwell-vs)
> **来源**：SemiAnalysis Newsletter | **作者**：Dylan Patel, Cam Quilici, Bryan Shan 等 | **日期**：2026年2月16日
> **副标题**：GB300 NVL72, MI355X, B200, H100, Disaggregated Serving（分离式服务）, Wide Expert Parallelism（宽专家并行）, Large Mixture of Experts（大规模混合专家）, SGLang, vLLM, TRTLLM

---

InferenceX v2（前身为 InferenceMAX）在 InferenceMAX v1 的基础上构建而成。InferenceMAX v1 是我们的[开源、持续更新的推理基准测试](https://github.com/SemiAnalysisAI/InferenceX)，为 AI 推理性能和经济性设立了新标准。InferenceMAX v1 超越了静态的、单一时间点的基准测试，通过在数百颗芯片和流行的开源框架上运行持续测试来评估性能。[免费仪表盘可在此查看。](https://inferencemax.ai/)

![InferenceMAX GitHub 概览](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e9a8353-ca83-4bd3-ab4a-3541132f6665_1680x1175.png)

我们的基准测试已被[几乎所有主要计算购买者广泛复现、验证和/或支持](https://inferencemax.semianalysis.com/quotes)，包括 [Google Cloud](https://cloud.google.com/blog/products/compute/scaling-moe-inference-with-nvidia-dynamo-on-google-cloud-a4x)、[Microsoft Azure](https://blog.aks.azure.com/2025/10/24/dynamo-on-aks#enterprise-scale-inference-experiments--dynamo-with-gb200-running-on-aks)、[Oracle、OpenAI](https://inferencemax.semianalysis.com/quotes) 等众多机构。

InferenceX v2 在此基础上进一步扩展。它将覆盖范围扩大到包括大规模 DeepSeek MoE 分离式推理（disagg prefill，简称"disagg"）以及宽专家并行（wideEP）优化，覆盖了 NVIDIA 过去 4 年推出的全部 6 款西方市场 GPU SKU，以及 AMD 过去 3 年推出的所有西方市场 GPU SKU——InferenceX v2 在一次完整基准测试运行中使用了近 1000 颗前沿 GPU。

在今天的发布中，InferenceX v2 成为首个在整个 Pareto 前沿曲线上对 Blackwell Ultra GB300 NVL72 和 B300 进行基准测试的套件，也是首个测试 disagg+wideEP 多节点 FP4 和 FP8 MI355X 性能的第三方基准测试。在 InferenceX 的未来迭代中，我们将继续重点关注分离式服务与宽专家并行，因为这正是 OpenAI、Anthropic、xAI、Google DeepMind、DeepSeek 等前沿 AI 实验室以及 TogetherAI、Baseten、Fireworks 等高级 API 提供商在生产中部署的方案。在本文中，我们还将分析围绕[最新 Claude Code Fast mode 功能](https://code.claude.com/docs/en/fast-mode)的系统工程原理和经济学。

我们的基准测试完全基于 Apache 2.0 许可证开源——这意味着我们能够以与 AI 软件生态系统同样快速的速度推进。如果您喜欢我们的工作并希望给予支持，[请在我们的 GitHub 上点个 Star](https://github.com/SemiAnalysisAI/InferenceX)！我们还在 [https://inferencex.com](https://inferencemax.semianalysis.com/) 提供免费数据可视化工具，供 ML 社区的每个人自行探索完整数据集。

我们将在 DeepSeek v4 和其他流行的中国前沿模型发布时提供第 0 天支持。在过去 6 个月中，我们清理了大量技术债务，现在能够在稳定的基础设施上快速迭代。今年晚些时候，我们还将把 TPU v7 Ironwood 和 Trainium3 加入 InferenceX！如果您想在获得有竞争力的薪酬的同时为我们有影响力的使命做出贡献，[请考虑在此申请](https://app.dover.com/apply/semianalysis/2a9c8da5-6d59-4ac8-8302-3877345dbce1)。

## 关键结果摘要

![关键结果概览](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ed3fe4a-93e9-4c47-8fb2-91f17da1b7c5_2392x1418.png)

我们在 FP8 MI355X disagg+wideEP SGLang 上看到了与 FP8 B200 disagg+wideEP SGLang 具有竞争力的性能/TCO（总拥有成本）结果，但与广泛使用的 Dynamo TRTLLM B200 FP8 相比，TRT 继续遥遥领先。AMD SGLang Disagg prefill+wideEP 在 FP8 上能够匹配 NVIDIA 的 SGLang 性能，这是一个令人振奋的消息。

我们还发现，在单节点聚合式服务方面，AMD 的 SGLang 在 FP8 上提供了比 NVIDIA SGLang 更好的性能/TCO。[值得高兴的是，AMD 已经废弃了他们的 vLLM 二等 fork，转向更多地上游化，以提供一流的体验。](https://x.com/vllm_project/status/2013928644302033208)

当涉及到最突出的前沿大规模推理服务所使用的最新推理技术（如 disagg prefill+wideEP+FP4）时，Nvidia 在 B200、B300 和机架级 GB200/GB300 NVL72 上跨 SGLang 和 TRTLLM 绝对碾压。Nvidia GPU 在能效方面也占据主导地位，在所有工作负载中，每 token 的全口径配置 picoJoules 能量要低得多。

转向 AMD，我们发现 AMD 系统和软件在推理方面最大的问题是**可组合性（composability）**。也就是说，AMD 的许多推理优化实现单独工作时表现良好，但当与其他优化组合使用时，结果并不如预期那样有竞争力。具体来说，disagg prefill、wideEP 和 FP4 推理优化的可组合性需要显著改进。

虽然在仅启用 SOTA 推理优化子集时，AMD 的性能具有竞争力，但当启用实验室使用的所有三个主要优化时，AMD 的性能目前无法与 Nvidia 竞争。我们强烈建议 AMD 重点关注不同推理优化的可组合性。我们被告知，AMD 将在春节后开始关注 FP4+分布式推理在其整个软件栈中的软件可组合性，因为他们大多数 disagg prefill+wideEP 的 10x 推理工程师都驻扎在中国。

**Nvidia 的 GB300 NVL72 不负众望。** 它在 FP8 vs FP4 上实现了高达 100 倍的提升（相对于强劲的 H100 disagg+wideEP+MTP 基线），在 FP8 vs FP8 上实现了 65 倍。在 H100 vs GB200 NVL72 上，我们在 75 tok/s/user 时看到高达 55 倍的实际性能差异。机架级 Blackwell NVL72 彻底碾压 Hopper。正如 Jensen 在 GTC 2025 上所说，[他是"首席收入摧毁者"](https://newsletter.semianalysis.com/i/174558496/ai-total-cost-of-ownership-cost-declines)。

在 GTC 2024 上，Jensen 声称 Blackwell 将在推理上相比 H100 提供高达 30 倍的性能提升，Jensen 承诺不足，交付过多。这应该会在一段时间内遏制分析师们关于"Jensen Math"的笑话。

## 致谢

我们要感谢 Jensen Huang 和 Ian Buck 对这一开源努力的支持，他们提供了最新的 GB300 NVL72 系统以及代表过去四年所有 GPU SKU 的服务器访问权限。我们要感谢 Nvidia 团队允许我们在近 1000 颗 GPU 上进行独立基准测试。感谢 Jatin Gangani、Kedar Potdar、Sridhar Ramaswamy、Ishan Dhanani、Sahithi Chigurupati 以及许多其他 Nvidia 推理工程师帮助验证和优化 Blackwell 和 Hopper 配置。

我们也感谢 Lisa Su 和 Anush Elangovan 对 InferenceMAX 的支持，以及与数十名 AMD 工程师（如 Chun、Andy、Bill、Ramine、Theresa、Parth 等）合作为 InferenceMAX 和上游 vLLM/SGLang bug 修复做出贡献。

我们还要认可 SGLang、vLLM 和 TensorRT-LLM 维护者构建了世界一流的软件栈并将其开源给全世界。相关文章：

- [SemiAnalysis InferenceMAX: vLLM maintainers & NVIDIA accelerate Blackwell Inference](https://blog.vllm.ai/2025/10/09/blackwell-inferencemax.html)
- [GPT-OSS Performance Optimizations: Pushing Pareto Frontier](https://blog.vllm.ai/2026/02/01/gpt-oss-optimizations.html)
- [SGLang & NVIDIA Accelerating SemiAnalysis InferenceMAX & GB200 Together](https://lmsys.org/blog/2025-10-14-sa-inference-max/)

InferenceX 计划还得到了 OpenAI、Microsoft、vLLM、Tri Dao、PyTorch Foundation、Oracle 等众多主要计算购买者和 ML 社区杰出成员的支持。[完整名单可在此查看](https://inferencemax.semianalysis.com/quotes)。

## 技术背景入门

本节将简要介绍可能帮助读者更好解读结果的技术概念。部分读者可以跳过此节直接查看结果分析。我们将在结果分析之后对部分主题进行更深入的探讨。

### 吞吐量与延迟的权衡

LLM 推理的基本权衡是吞吐量（throughput）与延迟（latency）。交互性（interactivity, tok/s/user）描述了系统中每个用户接收 token 的速度——它是每输出 token 时间（TPOT）的倒数。吞吐量（tok/s）描述了系统在所有用户中总共能产出多少 token。可以通过批处理请求来实现更高的总吞吐量，但每个请求分配到的 FLOPs 更少，因此完成更慢。

这类似于乘坐公共汽车与赛车的选择。公共汽车服务许多乘客，但也需要频繁停车，但成本可以在许多乘客之间分摊。赛车只能载一两名乘客，但几乎不需要额外停车，意味着总体旅行时间更快，但每位乘客的费用要高得多。没有一刀切的解决方案。

![吞吐量 vs 交互性示意图](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18c9a3dd-3777-44d5-a3e2-b4d28140df38_2106x1380.png)

本文展示的大多数基准测试结果是一条曲线。重要的是在各种交互性/延迟级别下分析吞吐量，而不是只看最大吞吐量（通常只能在单一低交互性下实现）。例如，实时语音模型需要极低的延迟以保持自然"对话"，而基本的 QA 聊天机器人可以允许更高的延迟。

成本/性能 per TCO vs 交互性/端到端延迟曲线大致遵循吞吐量 vs 交互性/端到端延迟曲线：更多 token/小时意味着更低的每 token 成本，因为固定的 $/小时成本被分摊到更多产出的 token 上。

### Prefill（预填充）与 Decode（解码）

推理包含两个主要阶段：prefill 和 decode。Prefill 发生在请求生命周期的第一个前向传播中。它是计算密集型的，因为请求中的所有 token 被并行处理。此阶段负责"填充"序列的 KV cache。在 prefill 之后，响应被逐 token 生成（或解码）。每个前向传播从 HBM 加载序列的整个 KV cache，同时仅对单个 token 执行计算，使得 decode 成为内存（带宽）密集型。

当 prefill 和 decode 在同一引擎上执行时，prefill 不断打断 decode 批次，导致整体性能更差。

### 分离式预填充（Disaggregated Prefill）

分离式预填充（又称 PD disaggregation，简称"disagg"）是将 prefill 和 decode 阶段分离到不同的 GPU 池或集群上的做法。这些独立的 prefill 和 decode 池可以独立调优和扩展以匹配工作负载需求。

### 并行策略：TP、EP、DP

- **TP（张量并行）**：允许在小批量大小下最大化交互性，但必须在每一层执行 all-reduce。
- **EP（专家并行）**：分片专家，利用 MoE 的稀疏性，缺点是需要在 MoE 层执行 all-to-all 集合通信（比 all-reduce 等更简单的集合更昂贵），并且在小批量时可能不平衡。
- **DP（数据并行）**：在多组 GPU（rank）上复制整个模型（或模型的部分，如 attention），然后在 rank 之间负载均衡请求。它最容易扩展，但会重复权重加载，在规模化时可能造成浪费。

## 性能随时间的改进

InferenceX 的主要目标之一是可视化性能随时间的改进。虽然新芯片以 O(年) 的节奏发布，但软件发布以 O(周) 的节奏进行。

### AMD 的改进

AMD 团队已经显著改进了 SGLang DeepSeek R1 FP4 所有配置的性能。在相同交互性下，AMD 在不到 2 个月的时间内几乎将吞吐量翻倍。此外，我们推动 AMD 将其分叉 SGLang 镜像中的性能增强改动上游化到官方 SGLang 镜像中。从 2025 年 12 月到 2026 年 1 月，AMD 的软件性能提升了高达 2 倍。

![AMD 性能改进](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0bd5df8-c675-4dce-a853-dfa6f4d381af_1498x1102.png)

为了继续接近一流体验，AMD 需要通过计算贡献和代码贡献增加对 vLLM 和 SGLang 维护者的支持，并增加为 AMD 工作的审查者以加速 AMD PR 合入上游的审查流程。

![SemiAnalysis 团队](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff7fc9e49-b04b-41b0-b0ec-df0d912c0a3c_800x434.jpeg)

### Nvidia 的改进

另一方面，Nvidia 的结果更为稳定，B200 SGLang 在类似时期内仅有小幅改进。

![Nvidia B200 改进](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F19e48a4c-0c1b-4681-b180-03ef0c8c2ce3_2346x1340.png)

许多成熟的 SKU 改进很少。例如，H200 TRT 单节点在 10 月以来的 4 个月内性能没有变化，但这是因为 Hopper 的支持从第 1 天起就很出色，性能一直接近峰值理论值，难以提供增量性能提升。

![Hopper 成熟 SKU](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fca0fbb96-36c4-4040-a022-49f2185b661a_2074x1224.png)

MI300X 和 MI325X 看到了一些改进，主要来自最新的 SGLang 版本。请注意，在 InferenceX 的大部分历史中，AMD 使用的是未上游化的"私有" ROCm 镜像，因此 2026 年 1 月之前的运行不能直接与更近期的运行进行比较。

![MI300X/MI325X](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4b8c3b9b-7536-4cba-8b85-854d25169864_1922x1726.png)

GB200 Dynamo TRT-LLM disagg 也看到了一些显著改进，最大吞吐量在一个多月内增加了 20%。我们还看到中间交互性的改进，这里部署了 wide EP。这可能是由于 GB200 上的 wide EP kernel 逐渐成熟。

![GB200 Dynamo TRT](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb4fa8dc-176c-4224-9ab5-6ebfe8f6af9c_1493x1280.png)

B200 SGLang 自我们首次发布以来，在 FP4 和 FP8 场景中都看到了稳定且持续的改进，自去年 10 月以来在某些交互性级别上每 GPU 吞吐量翻倍。

![B200 SGLang](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d5636b8-69d8-4676-9c3c-823da8d03514_2638x1840.png)

### MI355X 分离式推理

对于 MI355X 分离式推理服务，AMD 推荐使用 SGLang 配合 MoRI。[MoRI 是 AMD 的 MoE dispatch/combine 集合通信和 KV Cache 传输库](https://github.com/ROCm/mori/tree/main)，由 AMD 出色的中国工程团队从头构建。虽然 MoRI 需要更多开放的 CI 和测试，但我们强烈支持 MoRI 所采取的方向。这是因为 MoRI 不是像 AMD 历史做法那样从 NVIDIA 的 NCCL fork 出 RCCL，而是从头开始构建，汲取了 RCCL/NCCL 的经验教训，构建了一个全新的包。MoRI 的使用也带来了良好的加速，在超过一个月的时间里，在 20-45 tok/s/user 交互性范围内，每 GPU 吞吐量增加了 20% 以上。

![MI355X MoRI](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b0d71aa-e6aa-425f-bbcc-25e2c1de2f4d_1900x1744.png)

### vLLM 状况

对于 MI300X 和 MI325X，我们在整体上看到了边际改进。一些 AITER 优化帮助了 MI300X 在所有交互性上的性能，切换到上游 vLLM ROCm 镜像也带来了改进。

![GPT-OSS MI300/325](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10e95c72-6372-415e-8e51-d8021815182c_2142x1784.png)

不幸的是，MI355X 仍然使用 vLLM 0.10.1 构建的 fork（rocm/7.0:rocm7.0_ubuntu_22.04_vllm_0.10.1_instinct_20250927_rc1）。当前官方镜像（写作时为 0.15.1）尚未针对 MI355X 优化并会遇到硬错误。据悉，vLLM 0.16.0 最终将提供 MI355X 所需的所有更改以获得更好的性能。

回到 Nvidia 系统，Hopper 和 Blackwell 在 vLLM 0.11.2 到 0.13.0 之间都看到了稳定的性能提升。我们还观察到最新 TRT-LLM 1.2.0 版本的性能提升。

![vLLM Nvidia](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53a95093-3d25-4d01-9d64-64ea9e113749_2376x1760.png)

![vLLM 对比](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77c591fb-74ef-46ce-bba2-9f82a52f5f6f_2362x1752.png)

### 分离式推理框架

NVIDIA 使用 [Dynamo](https://docs.nvidia.com/dynamo/design-docs/overall-architecture) 作为其分离式推理设置。Dynamo 是一个为多节点分布式推理设计的推理框架，具有 prefill-decode 分离、请求路由和 KV cache 卸载等技术。它与推理引擎无关，允许我们在基准测试中使用 SGLang 和 TRT LLM 作为后端。

对于 AMD，我们使用 SGLang 配合两个不同的 KV cache 传输框架：[MoRI](https://github.com/rocm/mori) 和 Mooncake。Mooncake [最近加入了 PyTorch 生态系统](https://pytorch.org/blog/mooncake-joins-pytorch-ecosystem/)，支持 prefill-decode 分离和许多容错多节点功能。

## 结果分析

### Disagg 对比聚合式推理

在几乎所有交互性级别上，disagg 在每 GPU 总 token 吞吐量方面优于聚合式推理（灰线）。多节点分离式预填充彻底碾压单节点聚合式服务。

![Disagg Nvidia](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ace6118-029a-44df-b0ef-2e7595e6f388_2032x1339.png)

Nvidia 继续推出 B200/GB200 FP8 的新更新。最新数据显示 DeepSeek FP8 B200 TRT 单节点（MTP 启用/禁用）vs GB200 Dynamo+TRT disagg（MTP 启用/禁用），表明持续的工程努力在改进机架级推理软件和 wideEP kernel。

![B200 FP8 TRT](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F29485790-238d-4e1d-aa48-0559c79c9855_2132x1247.png)

### MI355X Disagg 对比聚合式推理

比较 MI355X 分离式推理与聚合式推理时，我们注意到类似的模式。分离式推理仅在低交互性、高批量大小时超越聚合式推理。这在 FP4 上同样如此，可能是由于 kernel 优化不足。

![MI355X disagg vs agg](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F25a7c41e-fa99-4117-8e49-ac121a22bf0f_2092x1241.png)

在 MI355X 上组合 disagg prefill+wideEP 与 FP4 时，我们观察到性能欠佳。虽然理论模型显示 MI355X 上的 disagg 推理应该远好于单节点，但由于在组合多个 SOTA 推理优化时 ROCm 软件栈中缺乏 kernel 和集合通信优化，disagg 在较高交互性级别上实际表现更差。

![MI355X FP4 disagg](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d82d32f-089b-405d-b4ef-94b4956676ed_2078x1233.png)

### NVL72 成本优势

TensorRT LLM 已经在全球提供商（如 TogetherAI）上每小时服务数十亿 token，它真正让 GB200 NVL72 和 GB300 NVL72 大放异彩，在高吞吐量下提供两倍多的性能。MTP 进一步提升了这些结果。

NVL72 系列更大 world size 带来的优势在成本图表中也很明显。在固定 60 tok/s/user 交互性级别下，每个 GB200 NVL GPU 产生的 token/s 略少于每个 B200 的三倍。

![NVL72 成本 60tok](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F36087d46-94e1-4629-90cb-4b0dfad1a8c1_1856x827.png)

随着交互性增加，这一差距缩小。在 130 tok/s/user 时，GB200 NVL72 几乎没有优势，在 $/百万 token 基础上甚至更贵。在低批量大小时，推理工作负载缩小到足以适应单个 HGX 节点的 NVLink 域（即 8 个 GPU），GB200 NVL72 的大规模扩展优势开始消失。

![NVL72 成本 130tok](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3e287d0e-947f-4fd7-9dc8-d697fad9ac7d_1781x822.png)

### MI355X vs B200：FP8 Disagg Pareto 前沿

在今天 InferenceX v2 的发布中，ML 社区首次能够看到开源 MI355X 分布式推理的完整 Pareto 前沿。

对于 FP8 disagg prefill，MI355X（MoRI SGLang）与 B200（Dynamo SGLang）相当有竞争力。两种配置都不使用 wide EP，所有 prefill/decode 实例最多使用 EP8。在吞吐量与交互性 Pareto 前沿的两端，MI355X 略落后于 B200。然而，MI355X disagg 在曲线中间的某些交互性级别上有轻微优势。B200 和 MI355X 都受益于 MTP，我们观察到两种芯片在使用 MTP 时相同的相对性能改进。

![FP8 disagg B200 vs MI355X](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F99728443-e697-49cc-8416-7a380c60ad12_2147x1249.png)

然而，如果我们只测量输出（decode）token 吞吐量，我们看到 B200 在较低交互性级别上的输出 token 吞吐量比 MI355X 高得多。

![输出解码吞吐量](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff67a92c3-b159-4b2a-bf87-ecbb7002b23c_2118x1306.png)

### FP4：AMD 的可组合性问题

尽管 MI355X 在 FP8 disagg 上具有竞争力，但其 FP4 性能受到可组合性问题的影响。AMD 单节点 FP4 性能还不错，但当我们比较 AMD FP4 disagg prefill 与 Nvidia 时，性能欠佳，MI355X 被 Nvidia 的 B200 彻底碾压。在 1k1k 场景中，MI355X（MoRI SGLang）启用 MTP 勉强能够击败 B200（Dynamo SGLang）不启用 MTP。

![FP4 AMD vs Nvidia](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa5b9e7bc-c484-4400-9ffe-96ed4bbfb70f_2138x1236.png)

一旦引入 Dynamo TRT-LLM，B200 的性能进一步提升，MI355X 即使启用 MTP 也无法匹配 B200 使用 Dynamo TRT-LLM 和 MTP 的性能。MI355X 只能通过使用 MTP 来匹配 B200（不使用 MTP），且仅在 ~60 tok/s/user 到 ~120 tok/s/user 的交互性范围内。

![TRT-LLM vs MI355X](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0be8b8f5-b627-4dc9-938b-4a407ef19c34_2103x1233.png)

比较 Dynamo TRTLLM B200 disagg prefill 与 SGLang MoRI MI355 disagg prefill 时，由于 TRTLLM 上 disagg prefill 的更成熟实现，AMD 被彻底碾压。

![TRTLLM B200 vs SGLang MI355](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F89827e17-6cfd-42f1-b250-d7f07cbe6a09_2120x1242.png)

![Dwarkesh Podcast 讨论](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc53a37b8-dd9f-4142-b114-60e6e2c7f3e7_3446x1946.png)

### MI355X Pareto 前沿配置

下图展示了构成 MI355X（MoRI SGLang）Pareto 前沿的各种并行配置。请注意，目前没有使用 wide EP（即没有 EP 16、32 等的配置）。

![MI355X Pareto 配置](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe1b62a52-bd6a-4cd1-82e7-65b6903d82ac_2996x1774.png)

## TCO（总拥有成本）分析

### OpenRouter 数据

以下是 OpenRouter 上所有服务 DeepSeek R1 0528 FP8 的推理提供商的列表，以及它们的每百万输入/输出 token 成本和平均交互性。不考虑 Chutes，中间水平的提供商以大约 35 tok/s/user 的交互性服务。

![OpenRouter 数据](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce79108c-8341-4100-86de-943d8ca3c34e_916x1190.png)

我们可以使用真实的 InferenceX 数据在 35 tok/sec/user 的交互性级别上插值每百万输入/输出 token 的成本。这是一个合理的交互性级别。

需要注意的是，这最好被理解为基线数据，并不完全代表真实世界的推理，主要因为 InferenceX 在随机数据上进行基准测试并禁用了前缀缓存（prefix caching）。换句话说，性能/成本至少会这么好。

比较此交互性级别下的 disagg+wideEP 配置，我们看到分布式推理技术在性能/TCO 和总吞吐量方面的有效性。我们还看到大规模扩展域（如 GB300 和 GB200 NVL72）在每 GPU 总吞吐量上绝对占主导地位。

有趣的是，在此交互性级别（8k1k 工作负载类型）上，启用 MTP 时 B200 可以实现最佳性能/TCO。

![TCO 表](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff200bfa6-02b5-464f-a4ea-ffe88cb6ed49_2520x81.png)

### 推理经济学深度分析

让我们利用上述发现深入了解大规模服务 LLM 的单位经济学。从上述 OpenRouter 数据中，我们看到 Crusoe 以 36 tok/sec/user 的交互性、$1.35/M 输入 token 和 $5.40/M 输出 token 服务。如果我们假设没有缓存命中且 Crusoe 至少使用 H200 和 MTP、disagg 和 wide EP 等 SOTA 推理技术，上述数据表明他们的成本不超过 $0.226/M 输入 token 和 $2.955/M 输出 token，输入 token 的利润率高达 83% 毛利率（折旧计入销售成本），输出 token 的毛利率为 45%。

当然，这些假设可能不完全正确，且这些计算没有考虑停机时间或利用不足，但这给出了使用 InferenceX 数据可以做的一些有趣数学的概念。更多推理经济学分析可以在 [SemiAnalysis Tokenomics Model](https://semianalysis.com/tokenomics-model/) 中找到。

OpenRouter 数据还显示 Nebius AI Studio (Fast) 以 167 tok/sec/user 的交互性、$2/M 输入、$6/M 输出 token 服务 DeepSeek FP4。

在如此高的交互性下，有必要使用 MTP 等投机解码技术来实现足够高的吞吐量以使推理在经济上可行。

![125 tok/s MTP](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fccabb1a5-220a-4623-a615-245053808f24_2086x1738.png)

## 宽专家并行（WideEP）与分离式预填充

### EP 的带宽需求

EP 需要 all-to-all 通信，每个 GPU 都需要向其他每个 GPU 发送 token。这对带宽需求极大。Nvidia 的服务器有两个独立的网络域：

- **NVLink 域（NVL72 机架内）**：72 个 GPU 通过 NVLink 连接，每 GPU 900 GB/s 单向带宽。这大约是基于 InfiniBand/以太网的横向扩展网络带宽的 7-10 倍。
- **InfiniBand/RoCEv2 以太网（NVL72 机架外）**：通常每 GPU 单向 400-800 Gbit/s（50-100 GB/s）。

![WideEP 带宽图](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ed2a472-3511-4b29-afbd-0c593795085a_2434x1430.png)

### TP vs EP 的通信成本

TP 在 GPU 之间分片每一层的权重矩阵。这意味着每一层的每个 token 都需要最多两次 all-reduce 通信。对于 EP，all-to-all 仅在 MoE 层执行。每个 GPU 只发送路由到每个专家的 token。这意味着与 TP 相比，EP 在所有层上的通信成本更低。

因为 EP 的 all-to-all 通信带宽需求随参与者数量增长，所以在跨越较慢的 IB/Eth 网络之前尽量留在高带宽 NVLink 域内是更好的。使用 NVL72，可以在不离开 NVLink 的情况下跨 72 个 GPU 进行 EP，而上一代（仅有 8-GPU NVLink 域）只能在 NVLink 速度下跨 8 个 GPU 进行 EP。

### Wide EP 的权重加载效率优势

Wide EP 在权重加载效率方面也有重大优势。对于 DeepSeek R1 这样的模型，decode 是内存带宽受限的：瓶颈在于 GPU 从 HBM 加载权重的速度。使用 wide EP（例如 DEP32），32 个 GPU 共同持有并加载 670B 权重一次，每个只加载其分片（~21B）。所有 32 个芯片的总 HBM 带宽被应用于加载模型的单个副本。相比之下，使用较窄的 EP 和更多 DP 副本（例如 5×DEP8），5 个副本中的每一个都需要自己的完整 670B 权重副本——这意味着整个系统中有 5×670B = 3.35T 的冗余权重加载。EP 在芯片间分摊权重；DP 复制它们。这就是为什么由 NVLink 等高带宽互连实现的更宽 EP 可以提供显著更好的每 GPU 吞吐量。

### 何时使用 TP vs EP

通常，由于负载均衡，TP 在较低并发时更受青睐。在小批量大小时，EP 受到不均匀的 token 到专家路由的影响，使一些 GPU 利用不足而其他则过载。TP 避免了这个问题，因为每个 GPU 持有每个专家的一个切片，总是得到等份的工作量。

在较高并发时，这种权衡发生变化。专家激活在较大批量大小下变得更均匀分布，EP 的通信和权重加载优势超过了 TP 昂贵的逐层 all-reduce。在曲线中间，混合 TP+EP 配置通过在每个专家内使用小 TP 组进行负载均衡，同时在更广泛的 GPU 集上使用 EP 来分摊权重和减少通信，来平衡两种考虑。

### Prefill/Decode 分离的作用

对于较高的交互性级别（低批量大小），大规模扩展 world size 往往不会提供更强的性能。B300 通过 IB 进行的 disagg 与 GB300 NVL72 的性能相同，因为工作负载受延迟而非带宽限制。

Prefill 是计算密集型和突发性的；decode 是内存带宽受限和稳态的。当它们共享相同的 GPU 时，会互相干扰，导致延迟抖动和容量浪费。将它们分离到专用的 GPU 池上，让每个运行匹配其特性的工作负载，提高了有效利用率。这就是为什么分离式 B200 配置在吞吐量-交互性曲线中间优于单节点 B200。

[旁注：TogetherAI 的 10x 推理工程师注意到了多轮对话流量的模式，其中第一轮 prefill 的需求与后续轮次的 prefill 非常不同，并将其分离以获得更好的 TTFT 性能。](https://www.together.ai/blog/cache-aware-disaggregated-inference)

## Jensen 兑现承诺：Hopper vs Blackwell

在 GTC 2024 上，Jensen 在台上承诺从 H100 到 GB200 NVL72 将有高达 30 倍的性能提升，[每个人都认为这是经典的营销吹嘘，在现实世界中无法实现。](https://newsletter.semianalysis.com/p/nvidia-blackwell-perf-tco-analysis) 许多人试图为这种被认为是现实扭曲场的东西贴上标签，以便继续说"Jensen Math"的笑话。

![Jensen GTC 承诺](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4fec3378-2cf4-4c1c-a40d-bcbd788c9a70_3022x1964.jpeg)

但结果是笑话开在了他们身上。快进近两年后，我们现在可以看到这根本不是营销炒作，Jensen 实际上一直在低估 Blackwell 的性能。根据我们的测试，Blackwell 在大规模 MoE 推理方面如此出色，相比于强劲的 H100 disagg+wideEP FP8 基线，在 116 toks/s/user 时，它在 GB200 NVL72 FP4 上提供高达 **98 倍**更好的性能，在 GB300 NVL72 FP4 上提供高达 **100 倍**更好的性能！也许新的 Jensen Math 规则是他交付的是他承诺的两倍 token 吞吐量。花得越多，省得越多！

![Hopper vs Blackwell 98-100x](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F70638c7e-69a6-43f2-96a4-23766bcabbd2_2121x1248.png)

即使考虑到 Blackwell 和 Blackwell Ultra 增加的总拥有成本，我们也看到与 Hopper 相比 **9.7 倍**（40 tok/s/user）到高达 **65 倍**（116 tok/s/user）的每美元 token 改进。[您可以在我们的免费网站上详细探索 Hopper vs Blackwell 性能](https://inferencemax.semianalysis.com/?i_seq=8k%2F1k&g_model=DeepSeek-R1-0528&g_rundate=2026-02-12&g_runid=21928999802&i_prec=fp4%2Cfp8&i_metric=y_costh&i_log=1#inference)。Blackwell 的性能比 Hopper 好到我们需要在仪表盘上使用对数刻度来可视化它。

![Hopper vs Blackwell TCO](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F402b23af-7ad6-46e4-97af-a5698ea2bd87_2176x1416.png)

### B300 vs GB300 NVL72

如前所述，B300 服务器最多只能使用 900GByte/s/GPU 的 NVLink 纵向扩展网络连接 8 个 GPU，而 GB300 NVL72 服务器使用 NVLink 纵向扩展网络连接 72 个 GPU。因此，当我们需要超过 8 个 GPU（但少于 72 个 GPU）用于推理设置时，需要引入多个 B300 服务器节点来组成推理系统，这意味着通信回退到较低的 InfiniBand XDR 横向扩展网络（每 GPU 800Gbit/s 单向带宽）。与机架级 GB300 NVL72 相比，后者通过 NVLink 连接 72 个 GPU（每 GPU 900GByte/s 单向带宽），机架级服务器允许推理设置中的 GPU 以超过 **9 倍**的更高带宽相互通信。

![B300 vs GB300 NVL72](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8664f48c-037c-45cc-b6f8-1999ed0cee0e_2298x1430.png)

虽然 GB300 NVL72 的全口径每 GPU 成本更高，但这只是将每 TCO 带宽优势降低到 8 倍。机架级架构的带宽优势直接驱动每 token 成本大幅降低。Google TPU、AWS Trainium 和 Nvidia 是当今唯一部署了机架级系统设计的 AI 芯片。AMD 首个机架级 MI455X UALoE72 系统的工程样品和小批量生产将在 2026 下半年进行，但由于制造延迟，大规模生产和首批生产 token 将在 MI455X UALoE72 上于 2027 年 Q2 才能生成。

### Blackwell Ultra vs Blackwell

在纸面上，新发布的 Blackwell Ultra 与 Blackwell 具有相同的内存带宽、相同的 FP8 性能，仅有 1.5 倍更高的 FP4 性能，但在实际测量中，我们看到 Blackwell Ultra 有高达 **1.5 倍**更好的 FP8 性能，不过在 FP4 上仅有 **1.1 倍**更好的性能。这可能是因为 Blackwell Ultra 是新发布的 GPU，软件尚未完全优化。

![Blackwell Ultra vs Blackwell](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F58c7b664-76a7-454b-ac99-036b0b6f4abb_2132x1456.png)

### AMD SKU 代际对比

在 AMD SKU 上，我们看到 MI355X 相比 MI300X 有高达 **10 倍**更好的性能。AMD 目前仅在 MI355X 上实现了 DeepSeek SGLang 分离式推理，尚未提交 MI300X 或 MI325X 分离式推理结果，可能是由于旧 SKU 上的软件问题仍在解决中。

![MI355X vs MI300X](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6dd3138-e228-4121-a061-4aa92c84d6a4_2334x1390.png)

在成本方面，对于 FP8 的 DeepSeek R1，在 24 tok/s/user 的交互性下，MI355X 提供推理的成本比 MI325X 便宜略少于 3 倍。每个 GPU 的吞吐量是 MI325X 的略少于 4 倍。

![MI355X TCO vs MI325X](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fab1ad749-fe92-4209-9347-4456d22b0cfd_2088x1432.png)

## AMD 的可组合性问题

虽然 AMD 在单节点 FP4 上表现尚可，在 FP8 分布式推理上与 B200 SGLang 有竞争力，但当前 AMD 开源推理栈的问题在于，虽然各个推理优化单独表现良好，但真实客户是将多个优化组合在一起部署。顶级 AI 实验室都在同时使用 FP4、分离式推理和宽专家并行，而这正是问题发生的地方。

![AMD 可组合性](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feddd9541-ed5a-4e49-aab2-291d49fd7e68_2132x1252.png)

AMD 的软件仍未达标，SemiAnalysis 和 AMD 的理论光速建模表明，对于 FP4，使用宽专家并行的分离式推理应该比 MI355X 单节点推理表现更好。不幸的是，软件仍然是 AMD GPU 的巨大瓶颈。AMD 管理层需要继续调整工程人才的资源分配——例如，将工程资源从没人使用的单节点宠物项目（如 ATOM）重新分配到修复上述分离式推理、宽专家并行和 FP4 之间推理优化的可组合性问题上。

AMD 在开源分布式推理、宽专家并行和 FP4 可组合性方面落后 Nvidia 超过六个月，[Nvidia 和 SGLang 团队六个月前就展示了他们在 DeepSeek 上的 NVFP4 性能](https://lmsys.org/blog/2025-09-25-gb200-part-2/)。

## AMD ATOM 引擎

AMD 推出了名为 ATOM 的新推理引擎。ATOM 可以提供略好的单节点性能，但在许多功能上完全缺失，使其无法用于真实工作负载。例如，它不支持 NVMe 或 CPU KV Cache 卸载、工具解析、宽专家并行或分离式服务。这导致没有客户在生产中使用它。与 Nvidia 的 TRTLLM 不同——后者在 TogetherAI 等公司每小时全球产生数十亿 token，并[支持工具解析和其他功能](https://nvidia.github.io/TensorRT-LLM/commands/trtllm-serve/trtllm-serve.html#cmdoption-trtllm-serve-serve-tool_parser)——目前没有 token 工厂使用 ATOM。

![ATOM vs others](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda3b4a10-0f65-403d-a9f6-093b86753c02_2120x1258.png)

此外，开源推理引擎（如 vLLM）的维护者对 AMD 感到失望，因为 AMD 提供的工程和 GPU 资源不足。例如，vLLM 首席维护者 Simon Mo 在 GitHub RFC 中表示，他仍然没有可用的 MI355X 可以添加到 vLLM CI 中，因此用户体验很差。目前 vLLM 上有零个 MI355X 测试，而 NVIDIA 的 B200 在 vLLM 上有许多测试。上游 vLLM 至少还需要 20 台 MI300 机器、20 台 MI325 机器和 20 台 MI355X 机器才能达到与 CUDA 相同的可用性水平。

![vLLM GitHub issue](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F96fd0617-347d-49a1-a971-19e42faeab25_1435x1289.png)

我们在 SemiAnalysis 一直在努力让 AMD 为 vLLM 贡献更多计算资源，在过去几周内取得了一些成功。vLLM 将开始获得几台 MI355X 机器，以便将 CI 测试覆盖率从 0% 提升到非 0%。

此外，vLLM 维护者表示由于缺乏机器资源，他们无法支持 ROCm 的第 0 天 vLLM 支持。这种上市时间的巨大差距继续导致 ROCm 落后，并为 Nvidia 继续收取惊人的 75% 毛利率（成本 4 倍加价）留下了巨大的空间。

AMD 也没有足够的提交者"通过功能引导和代码所有权展示了持续的上游参与"，并且缺乏可以审查自己代码的审查者。这就是为什么 ROCm vLLM 的开发速度比 CUDA vLLM 慢得多。

AMD 有许多在 ATOM 上工作的有才华的 10x 工程师，我们鼓励 AMD 管理层考虑将这些 10x 工程师重新部署到人们实际使用的库和框架上，如 vLLM 和 SGLang。

## 投机解码与多 Token 预测（MTP）

### 投机解码（Speculative Decoding）

投机解码通过使用一个小型、廉价的草稿模型（draft model）来提前提出几个 token，从而降低自回归生成的成本。大模型然后在单个前向传播中检查提出的 token，类似于 prefill 计算。对于给定的输入序列长度，当输入多了 N 个 token 时，单个前向传播可以大致花费相同的时间。

![投机解码](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb2b2aa12-c308-4f4b-84f7-969228600ce5_2296x1126.png)

这个关于额外 token 生产和相同时间预算的假设对于稠密模型最为成立，因为批量验证可以跨多个位置重用相同的权重流。对于混合专家模型，不同的 token 可能路由到不同的专家，因此验证多个草稿 token 可能激活比单 token 解码更多的专家，迫使从内存中获取额外的专家权重。

### 多 Token 预测（Multi-Token Prediction, MTP）

多 Token 预测追求类似的收益而无需单独的草稿模型。在模型架构中添加辅助预测头，使单个模型可以从相同的底层表示提出几个未来 token。这改善了分布对齐，因为提议来自最终对其评分的同一模型。MTP 还避免了服务额外模型的运营复杂性，但需要 MTP 头与主模型一起预训练。

![MTP 性能](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27ee5a46-78b5-40dd-b76d-1f096e0ae06d_1755x1154.png)

在所有 SKU 上，启用 MTP 都会带来性能提升。通过利用通常未使用的 logits 来验证额外的 token，只增加了最小的计算开销，节省了 decode 期间昂贵的额外权重加载。

![MTP SKU 对比](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffb5fc8fa-d129-475c-bb87-664e08bc6179_1773x1151.png)

在大批量大小时，推理体制与低批量大小相比不那么受内存带宽限制。由于投机解码（包括 MTP）通过用多余计算换取更少的内存受限解码步骤来工作，来自投机 token 的额外验证工作可能无法完全利用空闲计算，导致在高批量大小时改进较小。

### MTP 的成本节省

在成本方面，MTP 可以带来巨大的成本节省。下表显示，DeepSeek-R1-0528 在 FP4 上使用 Dynamo TRT 运行的成本为 $0.251/百万总 token，但启用 MTP 可以将成本大幅降低到仅 $0.057/百万总 token。

![MTP 成本](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdcf44984-9cb9-49ae-b35a-aeb5b5d14244_1566x1778.png)

### MTP 与模型准确性

在所有配置中，在其他条件不变的情况下，使用 MTP 的 DeepSeek R1 增加了交互性，对模型准确性没有显著影响。这与 DeepSeek V3 技术报告的发现一致。

![MTP 准确性](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1143164c-b38f-4ca9-888a-e9e270d6ef48_1757x1187.png)

关于 MTP 性能数字的有效性，有人可能会争辩合成数据集的分布可能不像真实数据。然而，比较 MTBench 和我们 1k1k 基准测试之间的 MTP 接受行为，我们看到非常相似的分布，确认我们的 InferenceX 基准测试是真实世界生产性能的良好代理。

![MTP 验证](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6c4a7c01-3d56-486d-b959-cb4b6468f56f_2408x1390.png)

## 准确性评估

吞吐量优化有时会悄悄地牺牲准确性（例如通过过度放松的接受率、解码调整、数值不稳定的 kernel 或端点配置错误）。没有评估的话，配置错误的服务器仍然可以产出很好的吞吐量数字但给出垃圾答案。例如，这一额外的检查层帮助我们发现了 GPT-OSS 的某些 DP attention 实现的问题。

每个代表性吞吐量配置现在都有一个关联的数值准确性检查。目前我们只使用 GSM8k，但作为一个非常简单的基准测试，评估分数可能不会因数值计算的差异而改变太多。因此，我们计划在未来扩展到更难的基准测试，如 GPQA、HLE、MATH-500、SWE-Bench verified。

![准确性评估](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe58e6323-b5d1-4221-9c51-ff39b44d1f98_1779x1180.png)

另一种性能-准确性权衡的形式是量化。以较低精度服务模型可能导致更差的模型输出。对于 DeepSeek R1，FP8 运行的评估分数略高于 FP4。

## Anthropic Fast Mode 与推理经济学

Anthropic 最近与 Opus 4.6 一起发布了"[fast mode（快速模式）](https://code.claude.com/docs/en/fast-mode)"。价值主张：相同的模型质量，约 2.5 倍的速度，约 6-12 倍的价格。这两个数字可能看起来令人惊讶，一些用户推测[这必须需要新硬件](https://x.com/Yuchenj_UW/status/2020214926133063705)。并非如此。

![Anthropic 定价](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcad37655-7b9a-4c86-81a8-3314ad0526fe_1694x348.png)

![Anthropic Fast Mode](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4bb71482-fe77-4e33-b5cb-b7db512b61c1_1700x439.png)

事实上，这只是基本权衡在起作用。任何模型都可以在广泛的交互性级别（每用户 token/sec）下服务，每百万 token 的成本（CPMT）相应变化。用我们的类比来说，奔驰既制造公共汽车也制造赛车。

精打细算的人可能认为 fast mode 更贵，但从总拥有成本的角度来看，fast mode 在某些情况下实际上要便宜得多。例如，一个 GB200 NVL72 机架可能花费 330 万美元，因此，如果 Claude Code 的 agent 循环（在生产中运行在 Trainium 上）的工具调用请求 NVL72 机架，而这些机架运行推理慢 2.5 倍，你就需要 2.5 倍的机架来交付推理，意味着不启用 fast mode 将额外花费近 500 万美元。

![Fast mode 对比](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F66509f21-d3e5-435f-9163-50d9be56c789_1930x1162.png)

考虑一个在 B200 上使用 TRT-LLM 服务的 DeepSeek R1 0528 FP4 编码工作流。在 50 tok/sec/user 的交互性下，推理成本约为 $0.56/M 输出 token。在 125 tok/sec/user 时，这上升到约 $4/M 输出 token——2.5 倍的速度提升带来 ~7 倍的价格提升，与我们在 Anthropic fast mode 中看到的非常相似。

![Fast mode 2](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6621150f-7da2-44ae-9695-493374487825_1972x1122.png)

这直接源于 LLM 推理中的基本延迟-吞吐量权衡。在高批量大小时，GPU 实现更好的利用率和更大的总 token 吞吐量，更多用户被并发服务，每 token 成本更低。在低批量大小和每请求更大的并行度时，每个用户获得更快的响应，但总 token 吞吐量下降。由于[加速器的每小时成本](https://semianalysis.com/ai-cloud-tco-model/)无论如何使用都是固定的，较低的吞吐量意味着更少的 token 来分摊成本，因此每 token 价格更高。

简而言之，fast mode 不一定是硬件故事，而仅仅是在相同 GPU 上用吞吐量换取延迟的自然结果。

### MTP 大幅降低成本

我们还观察到，MTP 等推理优化技术可以直接导致更便宜的推理——不需要新芯片。

以 DeepSeek R1 FP4 在 8k/1k 工作负载上为例。在 150 tok/sec/user 的交互性级别下，基线 GB300 Dynamo TRT 的每百万 token 成本约为 $2.35，而启用 MTP 将价格降低到约 $0.11。仅通过使用推理优化技术，在此交互性级别上实现了约 **21 倍**的价格下降。

![MTP 成本降低全图](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F132f55e4-43c7-4df3-bb4e-1408d85c2782_2718x1796.png)

![MTP 150tok](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff88b30b6-aa73-4ad2-a008-b2e8f940cfd0_1958x1104.png)

![MTP 150tok 2](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6dfa226-93d7-4596-9dc5-feebd5ef1dce_1966x1098.png)

在 50 tok/sec/user 的固定交互性级别下，我们进一步看到 MTP 能在各种芯片上有效降低 CPMT 的程度。

![MTP 全面对比](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8742f134-05d4-4a07-9257-8c93b4730cd7_2704x1790.png)

![MTP 50tok](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbc992849-b42d-4899-81a3-77105c86886b_1950x1250.png)

## WideEP 与 Disagg 深度解析

### 专家并行的工作原理

到目前为止，大多数前沿 AI 实验室采用混合专家（MoE）模型架构而非稠密架构。在 MoE 架构中，每个 token 只激活一部分"专家"。例如，DeepSeek R1 有 671B 总参数，但只有 37B 活跃参数。具体来说，DeepSeek R1 有 256 个路由专家（和 1 个共享专家），每个 token 被路由到 8 个不同的专家。

考虑在单个 8-GPU 服务器上服务 DeepSeek R1。在 671B 参数下，需要某种形式的并行来将模型放入可用 HBM。朴素方法是张量并行（TP），将每个权重矩阵分片到所有 GPU 上。这对稠密模型很好用但忽略了 MoE 的稀疏激活模式。使用 TP=8，每个专家的权重分片到所有 8 个 GPU 上，意味着每个专家激活都需要跨所有 GPU 的 all-reduce，即使每个 token 只有 256 中的 8 个专家被激活。

专家并行采用更合适的方法，将完整专家分配给各个 GPU。使用 EP=8，我们将每层 256 个专家分配到 8 个 GPU 上，每层每 GPU 共 32 个专家。每个 GPU 持有大约 1/8 的专家权重加上非专家权重（attention 投影、嵌入、归一化和共享专家）的完整副本。

![EP8 DP8 架构图](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2f923fd4-57c0-418e-8b01-49025b9c48d5_8236x3544.png)

### Wide EP 的工作原理

显而易见的扩展方式是复制：部署 N 个独立的 EP8 实例跨 N 个节点。每个实例独立服务请求，无跨节点通信。这线性扩展吞吐量，但每个 GPU 仍然持有每层 32 个专家，每个 token 最多激活 32 个本地专家中的 8 个。75% 的专家权重在 HBM 中处于冷状态。

宽专家并行（WideEP）采取不同的方法，通过跨节点扩展 EP 而不是复制独立实例。在 64-GPU 集群（8 个节点）上，DP64/EP64 在每层每 GPU 上仅放置 256/64 = 4 个专家，每个仍持有非专家权重的完整副本。在 MoE 阶段，来自所有 64 个 DP rank 的 token 通过 all-to-all 分发到托管其路由专家的 GPU。

这比单节点 EP8 基线产生三个复合优势：首先，将每 GPU 专家占用从 32 减少到 4，释放大量 HBM 用于 KV cache。其次，每个 GPU 仅加载 4 个专家的权重，将集体 HBM 带宽集中在 1/8 的权重上。第三，通过在 NVLink 域内进行 all-to-all，通信开销保持在可管理水平。

![WideEP EP64 架构图](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ae2668e-28ef-4a1f-8ab1-0b5f1373a1d1_8476x3546.png)

### 分离式预填充架构

![DistServe disagg 图](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0bc87a96-aa31-4b37-99c6-603c98f332f3_1318x733.png)

![NIXL GitHub](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b56d901-ef89-43c9-8d11-c18062f1b7b9_1165x1165.png)

### 专家激活率与批量大小

![专家激活率](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ca10b5a-f80e-45b4-8d22-e3134d30b54d_2232x1446.png)

## DeepSeek R1 单节点结果

### B200 单节点 Pareto 前沿

![单节点 B200 Pareto](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd13280a5-ddc2-4610-84bb-bf470301cc8e_2086x1233.png)

### Disagg WideEP Pareto 前沿

![Disagg WideEP Pareto](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbfdcb99e-dc02-4468-bd72-b25a7be6c15d_2380x1386.png)

### MI355X vs B200 单节点 FP8

![DeepSeek 单节点 MI355X vs B200 FP8](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa4e8da6f-c4ee-4d39-96ae-9143459d3ea9_2102x1236.png)

### 单节点 TCO 对比

![单节点 TCO](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7ce2b96f-840d-411b-9c6c-2f821219fba5_2130x1444.png)

### 单节点 FP4

![单节点 FP4](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdbc1dd2c-e15c-45b7-acf7-508d38ad1913_2406x1430.png)

### H200 vs MI325X

![H200 vs MI325X](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff3ba43db-8f65-4b28-a4a2-66282670449f_2117x1236.png)

## GPT-OSS 120B 结果

![GPT-OSS 120B 全 SKU](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F478b3a9a-c57d-4766-bde1-c3ee1fef550a_2068x1178.png)

![GPT-OSS TCO](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F028672d5-2c24-4dbd-974d-9f50d163df27_1796x1182.png)

### B200 vs GB200 NVL72

![B200 vs GB200 NVL72](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0186cfbc-1b42-46ae-ae1a-0d7791afcb20_2081x1306.png)

## 基础设施与 CI 更新

![GitHub Actions pipeline](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F74936db5-88cb-418e-932a-e7a8693a6857_2904x2845.png)

![GitHub outages 1](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3b921859-49f3-4b0b-b02e-dd0bf7a36e2e_3000x975.png)

![GitHub outages 2](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd7aad58-ba30-4364-9565-980ae6464534_3000x975.png)

## 未来规划

我们将在 DeepSeek v4 和其他流行的中国前沿模型发布时提供第 0 天支持。今年晚些时候，我们还将把 TPU v7 Ironwood 和 Trainium3 加入 InferenceX。

我们将继续重点关注分离式服务与宽专家并行，因为这是前沿 AI 实验室和高级 API 提供商在生产中部署的方案。

如果您想加入我们的使命，[请在此申请](https://app.dover.com/apply/semianalysis/2a9c8da5-6d59-4ac8-8302-3877345dbce1)。

---

> 本文翻译自 [SemiAnalysis Newsletter](https://newsletter.semianalysis.com/p/inferencex-v2-nvidia-blackwell-vs)，版权归原作者所有。翻译仅供学习参考。
