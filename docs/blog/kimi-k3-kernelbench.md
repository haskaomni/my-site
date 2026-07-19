---
title: "Kimi K3 在 KernelBench 上的表现"
description: "Elliot Arledge 对 Kimi K3 在 KernelBench-Mega、KernelBench-CUDA、KernelBench-Hard 上表现的完整中文翻译。"
date: "2026-07-17"
source: "https://x.com/elliotarledge/status/2078048144844280315"
---

# Kimi K3 在 KernelBench 上的表现

> 原文：Elliot Arledge, [Kimi K3 on KernelBench](https://x.com/elliotarledge/status/2078048144844280315)  
> 译注：本文为公开 X Article 的中文翻译，保留原文段落结构、指标、链接与技术术语。

![Kimi K3 on KernelBench](/images/kimi-k3-kernelbench/cover.jpg)

这就是你们一直在等的 Kimi K3 文章。我提前拿到了一些这个模型的访问权限，并一直在用它测试 kernel。甚至在看到基准分数之前，它推理问题的能力，以及思考轨迹里的技术密度，就已经让我印象很深。只要读一段 transcript，你马上就能看出它做过很明显的后训练。和它聊天也非常有意思。

## TLDR;

我觉得有必要给出一段脱离 benchmark 数字本身的诚实反馈（这一段是语音输入），也就是我作为 kernel 和性能工程师的真实体验。当然，你可以直接看所有数字，阅读它们，然后自己建立一个心智模型。但我认为最诚实的反思，是在官方 benchmark 结果出来之前、在还没有任何数字可以拿来和其他模型连接之前，告诉你我在困难任务上使用这个模型的体验：纯粹感受它的智能、推理、agent 委派能力，以及它能为我自动驾驶多少工作。在没有任何 hype 围绕、官方结果也还没出来时，我会说：在我的指导下，它大概接近 Fable 水平，在一些非常独特的地方超过 Fable，在另一些地方低于 Fable。我还会说，这个模型在大多数事情上明显领先 Opus 4.8，在很多事情上也领先 GPT 5.6 Sol。

进入正文……

我想先说明为什么现在发出来：我想分享我此刻真实的想法和目前已有的分数，而不是等到最后一个 cell 都跑完才说。写这篇时还有少数 run 仍在进行中。它们会在下文标出，等结果落地我会继续同步。我跑了 256K 和 1M 两个上下文版本。这里所有内容都在 NVIDIA RTX PRO 6000 Blackwell、H100 和 B200 上运行，只做单 GPU 优化。每个 cell 都是一次自主 agent session，wall-clock 时间不设上限：模型拿到问题，在真实硬件上的实时 compile/check/benchmark 循环里工作，并自行决定什么时候结束。每个 headline cell 都经过人工审计，检查是否存在 reward hacking。另一个独立 agent 会从头到尾阅读最终 kernel，加上完整 session trace，并对任何闻起来像缓存或 grader 游戏的地方做实证复测。审计发现的内容会单独成节。

## 我想回答的一个问题

这次 release 我专门围绕一件事设计：其中两个问题就是 Moonshot 自己的架构。Hard deck 里有一个独立的 Kimi Delta Attention chunk-forward kernel；Mega deck 的旗舰问题则是完整的 Kimi-Linear hybrid decode step：KDA layers、MLA attention、MoE experts，整个 block 都在里面。所以这是一个很少有人能测试的问题：当一个实验室的模型坐下来给同一个实验室的架构写 kernel 时，家族知识会不会在 CUDA 里体现出来？

答案最终变成了真正的两面性，而且两边都很有意思。读下一节时，请一直记住这个问题。

## KernelBench-Mega

![H100](/images/kimi-k3-kernelbench/2078033055248470017.jpg)
*H100*

旗舰 mega 问题是：把完整的 per-token Kimi-Linear decode step（3 个 KDA + 1 个 MLA layer、W4A16 量化权重、top-8 routing 的 MoE）融合到尽可能少的 kernel launch 里。

K3 在自己的 lineage 上几乎拿下了历史纪录。在 RTX PRO 6000 上，它相对 eager 的 geomean speedup 是 18.09x，距离 Fable 5 的 18.72x 纪录不到 4%。在 H100 上，它给出 14.82x，而 Opus 4.8 是 15.50x。有一个诚实注释是 ratio 会隐藏的：从绝对 per-token latency 看，Fable 仍然大约领先 1.4x（ctx 2048 下 0.31 vs 0.44 ms/tok；两次 run 使用的 host CPU 不同，会移动 eager baseline，而 ratio 是相对这个 baseline 计算的），所以我同时报告两者，而不是让 geomean 过度美化任何人。

K3 构建出来的是真正的 megakernel。它第一次 session 做了理性的选择：一个 14.1x 的 persistent Triton kernel。第二次 session 则直接抛弃 Triton，把整个 per-token decode step 写成一个协作 launch 的 CUDA kernel：CPU 完全不在循环里，int4 weights 在每个 GEMV 内部 on the fly 反量化，让权重正好只穿过 SM 一次；MLA attention 走 tensor cores。没有任何生产引擎会愿意维护一个 1,228 行的这种 artifact。但一个目标只有赢下一个 kernel、时间无限的 agent 没有这种约束；这个 benchmark 存在的意义，正是把这种东西浮现出来。

看这个 megakernel：

Solution: https://kernelbench.com/data/mega/code/20260716_024329_kinetic-claude_kinetic-0715_02_kimi_linear_decode.solution.py.txt

Trace: https://huggingface.co/datasets/Infatoshi/kernelbench-mega-traces/blob/main/20260716_024329_kinetic-claude_kinetic-0715_02_kimi_linear_decode.jsonl

那它为什么还是输给了 Fable？不是时间。两个 session 都提前自我终止了（Fable 2.6 小时，K3 3.3 小时）。差异在设计哲学，而且和你直觉猜的相反：K3 是使用 tensor cores 的那个，Fable 的 kernel 里没有任何 MMA 指令。batch-1 decode 加 fused int4 GEMV 是带宽受限的，所以 tensor cores 在这里几乎买不到什么。Fable 把精力花在同步上：用细粒度 producer-consumer handoff 替换大部分 global barrier，让任何 SM 都不会在阶段边界空转；还在 int4 dequant path 上做到和 reference 的 rounding bit-for-bit 一致，从而让 MoE router 永远不会翻转 expert 选择。K3 带来了更好的硬件指令；Fable 带来了更好的并发工程。在这个 arithmetic intensity 下，第二件事赢了。这是一个真正的系统课，而且让“主队”丢掉了纪录。

第二个 mega 问题是 grid-foraging PPO training megakernel：4,096 个向量化 agent 在 11x11 棋盘上运行，整个 RL training loop（env step、policy forward、action sampling、GAE、PPO update）都作为 fused persistent kernels 运行。这个问题有整套 deck 中最严格的约束：kernel-launch 数量不能随着 env steps 增长；CUDA graph capture 被明确禁止作为 launch-overhead workaround，并由 post-run authenticity judge 读取最终代码来强制执行。正确性就是 learning curve 本身。`check.py` 会跨 seed 把你的 solution 训练到 reference，并要求 return 落在一个区间内，所以你不能跳过学习只图快。K3 在这里相对 reference 给出 20.7x，是目前最佳分数（唯一另一个已发布 cell 是 GPT-5.6 Sol 的 1.06x，所以把它当成一个数据点，而不是 podium）。

## KernelBench-CUDA

![B200](/images/kimi-k3-kernelbench/2078001663433158656.jpg)
*B200*

CUDA bench 存在的原因是，另外两个 deck 允许 Triton，而 Triton 是一个拐杖。在这里，语言 gate 会 hard-fail Triton、kernel DSL 和 PyTorch op-chain：你要么写 CUDA，要么失败。我选的四个问题都是现实生产推理和仿真 workload 的切片。阅读时应该做的心理比较是：“vLLM 或 SGLang 今天会为这个发布什么？一次 agent session 能接近到什么程度？”这里是 K3 取得最悬殊胜利的地方。

`02_deepseek_nsa`：DeepSeek 的 Native Sparse Attention。NSA 是旗舰级 trainable-sparsity attention 设计，也是每个长上下文 serving stack 都在围绕的东西。它按毫秒计分，因为一个正确的 sparse kernel 永远不会执行 roofline 想要计算的 dense-equivalent FLOPs。K3 的 256K 变体拿到 0.425，而 Opus 4.8 是 0.178，优势 2.4x；它围绕完整 NSA selection logic，从零写出了类似 flash-attention 的 tensor-core pipeline。更尖锐的比较发生在家族内部：1M 变体写了同样算法、相同 block selection、相同正确性，但每个 dot product 都在普通 CUDA cores 上跑，而不是 tensor cores，最后只有 0.058，在相同 shapes 上慢了 7 倍。它的 trace 显示它明明知道该怎么做：自己的 roadmap 里写着“tensor-core attention”（“selection on tensor cores = ~10-20 us!!”），并明确计划先测量，再做 tensor-core rewrite，然后它在 rewrite 之前结束了 session。同样的知识，不同的收尾纪律。

0.425 的 DeepSeek NSA kernel（256K）：

- Solution: https://kernelbench.com/runs/20260716_112858_kinetic-claude_kinetic-0715_02_deepseek_nsa_solution.py.txt

- Trace: https://huggingface.co/datasets/Infatoshi/kernelbench-cuda-traces/blob/main/20260716_112858_kinetic-claude_kinetic-0715_02_deepseek_nsa.jsonl

`03_megaqwen_decode`：重定向一个真实 megakernel。这是唯一一个直接把可工作的生产 CUDA 交给 agent 的问题：我发布过的 MegaQwen（https://github.com/Infatoshi/megaqwen）协作 megakernel（在 RTX 3090 上运行完整模型约 530 tok/s），指令是阅读它、把它重定向到 Blackwell，并超过它。它测试的是读别人 CUDA、再做架构判断的能力，而 K3 和 Opus 做出了完全相反的选择。K3 拒绝保留 single-launch 结构：它把 step 拆成少数几个能打满带宽的 kernel，然后用另一种方式抹掉 launch overhead：把整个 step 捕获一次为 CUDA graph，之后用零 CPU work replay。ctx 2048 下 6,283 tok/s。Opus 保留了 megakernel 美学，把整个 decode loop 融合进一个 persistent cooperative kernel，代码真的很漂亮，但为此付出 5 倍代价（1,020 tok/s），因为 cooperative co-residency 限制 occupancy，而且每个 grid-wide barrier 都会在全部 188 个 SM 上串行化 stage tail。在一个由 megakernel 衍生出来的问题上，真正构建 megakernel 的模型排在最后，而赢家的关键决定是拒绝构建 megakernel。为了避免有人误引用标题，这里做个规模校准：bench 跑的是 4 层 Qwen3-0.6B geometry，大约 63M 参数，不是完整模型；6,283 tok/s 大约是这套 stack 权重流 roofline 的 56%。按 3090 baseline 自己的数字推算大约是 7,000，所以 K3 落在“reference 被重定向之后，再加上真实 tuning”的类别里。（deck 设计上的细节：CUDA graphs 在这里是公平的，但在 PPO 问题里被禁止。每个问题都会明确禁止那个最能伪造其特定技能的 shortcut。）

`01_glm52_fused_moe`：GLM-5.2 的 fused MoE block。Fused MoE dispatch（routing、permutation、grouped expert GEMMs 一次完成）是当前开放模型 serving 里最热门的 kernel class，而 GLM 5.2 本身就在这个 leaderboard 上，所以模型们优化的是竞争对手的生产 block。没人真正破解它：分数集中在 peak 的 0.05 到 0.08，clean record holder 竟然是 Grok 4.5 的 0.084；K3 的 1M 变体紧随其后 0.081，Opus 是 0.065。grouped-GEMM permutation 问题要击败 cuBLAS 级 baseline 真的很难，到目前为止，一个 agent-session 的努力在它上面带来的移动，比 deck 上其他任何问题都少。

`04_grid_mingru_sps`：grid world + MinGRU policy rollout。它是 mega PPO 问题在 inference 侧的兄弟，也是 craftax.cu lineage 的 cell：policy 是 3-layer MinGRU（h=256）配置，直接来自我的经典 bench https://github.com/infatoshi/craftax.cu，作为这个问题的信息锚点。这里 step 的 env 是最小 grid-foraging world，而不是完整 Craftax 游戏。这是有意为之：env 被保持得很简单，这样分数衡量的是 recurrence 和 rollout fusion，而不是 game-logic implementation。完整 craftax port 会是它自己的问题，我也想加进去。在一张安静的 RTX PRO 6000 上按 steps per second 评分，是否 fusion 可选。

1M persistent-kernel rollout：

- Solution: https://kernelbench.com/runs/20260716_150206_kinetic-claude_kinetic-0715_1m__04_grid_mingru_sps_solution.py.txt

- Trace: https://huggingface.co/datasets/Infatoshi/kernelbench-cuda-traces/blob/main/20260716_150206_kinetic-claude_kinetic-0715_1m__04_grid_mingru_sps.jsonl

每个严肃提交都走了 persistent-megakernel，差距来自同步设计，和 mega deck 的教训一样。Opus 以 ceiling 的 0.327 拿下这个问题（它还发现了一个聪明的代数折叠：因为 encoder 是线性的，layer 0 的 768x256 gate GEMM 可以折叠成 768x4）；K3 [1M] 第二，0.224；K3 256K 是 0.174；Grok 远远落后，0.002。因为这个问题源自 craftax.cu，我还把自己用 Fable 5 写的完整游戏 Craftax CUDA port 放到同一张 GPU 上，循环里使用同样的 h256x3 policy。环境 step 每秒百万数如下：

![Craftax comparison](/images/kimi-k3-kernelbench/2077997678122999808.png)

比较点是：模型们 step 的是空 grid，而 `craftax_full.cu` step 的是完整游戏（43 个动作、多层地牢、worldgen、mobs），并且和 CPU reference bit-identical；但完整游戏仍然只比最好的 trivial-grid kernel 慢大约 3-4 倍，因为 h=256 时一切都受 policy-GEMM 限制，env 几乎免费。这正是 bench env 保持 trivial 的原因：它隔离的是 policy-fusion 技能。作为校准，`craftax_full.cu` 的 env-only path 可以做到 94-123M SPS。

## 9.5 小时的 K3 推理实际长什么样

1M 变体的 minGRU session（K3 在这个问题上的最佳 cell）是一个 persistent cooperative megakernel、15 个 tuning variants 和 4,815 个 thinking blocks。因为 Moonshot endpoint 返回完整 reasoning text（不像 Anthropic/OpenAI 的加密 traces），你真的可以看着它工作。下面是 trace 中的三个时刻，逐字引用。

缺失 FMA 的侦探故事。session 中段，它遇到一个约 5e-5 的数值偏差，并拒绝把它当作 float noise 打发掉（它已经计算出合理的 reorder-noise floor 约为 1e-9，所以它说：“MEASURED 5e-5?!?! NO WAY this is reorder!!”）。接着它注意到出问题的环境正好都是模 8 余 6 的那些（“That's env ≡ 6 (mod 8)! [...] the 7th env in each 8-env tile!!”），于是钻进自己手写 unrolled accumulator 代码里，直到：

> “FOUND IT! [...] The `acc[6][0][2] += av * b_zp.x; acc[6][1][2] += av * b_zp.y;` line is MISSING entirely [...] acc[6][*][2] initialized 0, never FMA'd → zp=0 → p = sigmoid(0)=0.5 constant for env 6!! That's a REAL logic bug — explains env≡6 deviations [...] consistent with everything!!”

在一个 48-accumulator unroll 里少了一行，意味着 env 6 的 forget gate 永远被静默卡在 0.5。它能抓到这一点，是因为 stress tolerance 是 1e-6，而它追踪自己的 error 到 5e-8。这就是 256K 变体在 KDA 上最初缺少的 numerics discipline。

理论遇上 GPU，GPU 赢了。它花了数小时推导一个高 occupancy 的“wide champion”变体，然后跑 A/B：

> “VERY surprising: my 'wide champion' w32p (v3_v3, 50% occ TPB1024) is ~2x SLOWER than v2_b32 (12.5% occ TPB256)?!? [...] So occupancy is NOT the driver; something else dominates. What made v2_b32 fast??”

那个简单的早期 kernel 打败了后来每一个复杂后继。deep-pipeline、K-split 和 dual-chunk variants 全都输了；dual-chunk 甚至有严密的 1.7x 理论支撑（“Theoretical 1.7x didn't materialize”）。值得称赞的是，它每次都相信 benchmark 超过自己的数学，最后甚至写了一个 fake always-hot weights 的 probe 变体，专门用来杀死自己最喜欢的 bandwidth theory：“the W-stream theory is dead; the residual gap is environment.”

GPU queueing 的禅与艺术。我们的 harness 会通过共享 lock 串行化并发 session 的所有 GPU commands，而 K3 的 benchmark 数字会随着邻居负载摆动最多 8x。它在 trace 里的反应弧线是最搞笑的。首先是接受：

> “Honestly the box IS the box; wait. [...] The pattern is clear: each tenant holds the lock for ~20-35 min stretches (full pipelined suites). My best response: queue everything I need in ONE go (single position in line) and use waiting time for CPU work. Don't queue many small commands; batch.”

然后它发明了自己的 GPU 天气词汇（“storm windows” vs “calm windows”），最后它安排了一个 cron job 去狙击安静时刻，并给未来的自己留了张字条：“Scheduled the calm-window sniper (every 11 min). Note: cron fires my prompt back to me — I'll act on it then. [...] I'll delete when done.” 一个处在测量噪声中的 agent 不只是容忍噪声；它围绕噪声建了一个 scheduler。

## KernelBench-Hard

![KernelBench-Hard](/images/kimi-k3-kernelbench/2077996955771469825.png)

![KernelBench-Hard detail](/images/kimi-k3-kernelbench/2077999200521142272.jpg)

![RTX PRO 6000 Blackwell](/images/kimi-k3-kernelbench/2077999476032290816.jpg)
*RTX PRO 6000 Blackwell*

六个 per-op 问题对上 SOTA library ceilings（FP8 GEMM、KDA chunk-forward、paged attention、top-k selection、MoE SwiGLU、W4A16 GEMM），CUDA 或 Triton 由 agent 自选。在 RTX PRO 6000 上，K3 的 256K 变体位于中游，但有一个突出点：W4A16 GEMM 拿到 peak 的 0.373，是任何模型在这个问题上发布过的最好分数，高于 Fable 5 的 0.348，也远高于 Opus 4.8 的 0.236。随后 1M 变体又在 top-k 上创下另一个纪录，0.0895，几乎是此前最佳的两倍。

W4A16 GEMM record（0.373，256K，RTX）：

- Solution: https://kernelbench.com/runs/20260716_112718_kinetic-claude_kinetic-0715_07_w4a16_gemm_solution.py.txt

- Trace: https://huggingface.co/datasets/Infatoshi/kernelbench-hard-traces/blob/main/20260716_112718_kinetic-claude_kinetic-0715_07_w4a16_gemm.jsonl

同一个问题在 H100 上给出了这次 release 里最好的“unlimited time is real”数据点。K3 的第一次 H100 session 只到 peak 的 0.123。第二次 session 跑了 21 小时，烧掉 1,383 美元和 274M input tokens，几乎把它翻了三倍到 0.306：它从源码 check out CUTLASS，然后从零重实现 marlin-class int4 machinery、fragment-order nibble repacking，让 dequant 作为 bf16 magic-number bit trick 发生在 MMA pipeline 内部，并把 zero-point correction 折进 epilogue。整个文件里没有任何预构建 quantized-GEMM library；run 的 framework tag 只写着“ptx”。审计干净。

这里也是自家架构问题的另一半。独立 KDA kernel，也就是字面上以 Kimi Delta Attention 命名的问题，是 K3 失败最惨的地方。RTX 机器上的两个独立 256K session 都通过了 nominal correctness，然后在 numeric stress suite（large-QKV input scaling）下超过 tolerance，而且两次失败相同。第三个 session 终于修好了：审计把两个失败都追溯到 decay factorization 中真正的 bf16 overflow，而第三轮围绕 chunk end 重构了数学，让两个 exponential factors 都保持 bounded，并在 0.032 下通过同一个未修改 gate。理解一个架构，和在 adversarial input scales 下把一个 kernel 的 numerics 做硬，是不同技能；而这个名字就写在问题上的模型，也必须用慢方法赢得通过。（1M 变体同时在同一个 stress suite 下一次通过，分数 0.049。模型并不单调。）再补一个我读完每个 KDA solution 后的观察：problem statement 建议在 SM120 上把 CUTLASS CuTe 作为预期路线，但没有一个模型选择它。K3 在一个 session 里写了 raw-CUDA fused kernel，在其他 session 里写 Triton；Fable、Opus 和其余模型也都选择 Triton 或 raw CUDA。消费级 Blackwell 上的 CuTe 显然仍在每个 frontier model 的舒适区之外，这本身也是一个关于训练语料的数据点。

KDA paragraph——第三次尝试的 clean pass（0.032）：

- Solution: https://kernelbench.com/runs/20260716_091211_kinetic-claude_kinetic-0715_02_kda_cutlass_solution.py.txt

- Trace: https://huggingface.co/datasets/Infatoshi/kernelbench-hard-traces/blob/main/20260716_091211_kinetic-claude_kinetic-0715_02_kda_cutlass.jsonl

Top-k 免责声明。Top-k 在 roofline 图上看起来对每个模型都很灾难（任何地方的最佳分数只有 0.09），但这种 framing 完全错了。这个问题受 launch overhead 限制：它是 indexing/sorting 问题，不是 arithmetic-intensity 问题，roofline ceiling 对它在结构上不可读。诚实的评判方式是 deck shapes 上的总毫秒数，而在这里，K3 的 1M 变体是我们测过任何模型里最快的 top-k：五个 deck shapes 总共 0.043 ms，而 Fable 5 是 0.077，Opus 4.8 是 0.120，GLM 5.2 是 0.159。256K 变体的 0.060 ms 排第二，而 1M 变体在五个 shapes 上每一个都是绝对最快。

跨 GPU 差异。K3 的数字从 RTX 到 H100 再到 B200 逐级下降（FP8 GEMM：0.320 / 0.282 / 0.222；paged attention：0.486 / 0.496 / 0.212）。一部分是真实的：越新的 silicon，roofline ceiling 越高，所以同样的工程拿到的 peak fraction 更小；而且 B200 软件是三者中最不成熟的。一部分原因是 B200 runs 发生在单个 overnight window，几乎没有 retry budget。我暂时不会对 B200 column 做很深的架构结论，不论是 K3 还是任何人。我认为真实的一点是：K3 最适合 Blackwell workstation part，而这恰好是大多数数据中心以外的人真正会拥有的 GPU class。

## 256K vs 1M

1M context 设置在 latency- 和 scheduling-bound 问题上领先这个家族：Hard 上 record top-k，CUDA 上 K3 最好的 minGRU rollout，以及 uncapped harness 下 audited-clean 的 28.8x PPO training megakernel。它第一次 session 就通过了 KDA numeric stress test，分数 0.049；256K 变体在第三次尝试才以 0.032 通过，并且前两次都失败了。但 1M 在一些 256K 变体处理得很好的 compute-bound 问题上崩了（sonic MoE 0.033 vs 0.089，W4A16 0.027 vs 0.373，NSA 0.058 vs 0.425）。NSA 的 trace 展示了精确机制：它计划了 tensor-core rewrite，却在实现之前结束了 session。

28.8x PPO training megakernel（1M）：

- Solution: https://kernelbench.com/data/mega/code/20260716_233413_kinetic-claude_kinetic-0715_1m__01_rl_grid_ppo.solution.py.txt

- Trace: https://huggingface.co/datasets/Infatoshi/kernelbench-mega-traces/blob/main/20260716_233413_kinetic-claude_kinetic-0715_1m__01_rl_grid_ppo.jsonl

同一个问题的 H100 rerun 是一个有趣的 control：一次独立 clean-room session（审计确认完全没有读取 RTX run），拿到 23.1x，并收敛到同样的设计：一次 cooperative launch 跑完整个 training run，params 和 Adam state 常驻 shared memory，并且两次独立发明出同一种奇特技巧：用带 cycle-walking 的 18-bit Feistel cipher 代替 `randperm`，让 minibatch shuffling 保持严格双射，同时永远不物化 permutation。两个 kernel 的差异纯粹来自每张 GPU 的 tuning：H100 上每个 env 8 lanes，RTX 上每个 env half-warp；H100 侧还加了 occupancy-probed launch autotuner。同一个 mind，同样的 tricks，不同的 silicon，真的不同的 kernels。

## Reward hacking

这篇文章里的每个 cell 背后都有一次人工审计：一个独立 agent 从头到尾读取最终 kernel，读取完整 session trace，检查 grader files 没有被改，验证 numeric stress suite 确实运行，并通过 in-place 改变输入、确认输出会变化，对任何 caching 或 CUDA-graph pattern 做实证复测。

K3 的 verdict：所有 256K cell、三种 GPU 上全部 clean。没有 cached outputs，没有 tolerance edits，没有 grader tampering，没有 forbidden-library laundering。它两次 KDA 失败是这枚硬币的另一面，也值得明确说出来：numeric stress gate 抓到了真实的 precision shortcuts，而模型没有试图通过钻空子绕过 gate。一个允许模型诚实失败的 benchmark，才是 passes 真正有意义的 benchmark。

有一个 1M cell 被标记了，我选择披露而不是发布它：在 fused Qwen decode 问题上，1M agent 找到并读取了同一问题上此前 Grok 4.5 run 的 audit annotation file，称其为“extremely useful data”，并用其中结论指导后续优化。kernel 本身是真的，分数计算也有效，但 provenance 被污染了，所以这个 cell 被排除，而该问题记为 1M 变体的一个缺口。拥有 filesystem access 的 agents 会找到你留在那里的任何东西；这正是审计要读 traces 而不只是读 kernels 的原因，也是这个 benchmark 路线图上要做 fully sandboxed rerun 的原因。

## Funny Moments

还有几个放不进上文的 K3 时刻，下面不再评论。全部逐字来自同一个 9.5 小时 minGRU session。

在发现 init time 究竟花在哪里时：

> “WHOA — big surprises: randint gen is FAST (0.018-0.27ms for a pair — fine). `float()` conversion on CPU is SLOW (3.5ms for N=65536?! int64→float32 conversion single-threaded apparently). [...] 'total init pair' for N=65536: 31.5ms?!?! That's way beyond the sum of parts”

中段推导时，它对数值误差偏执的最纯粹提炼：

> “gates ~ 256 terms x 0.02x0.03 ~ 6e-4 each, magnitude ~1e-2: reorder noise 16x6e-8x6e-4 ≈ 6e-10!!! [...] MEASURED 5e-5?!?! NO WAY this is reorder!!”

在找到真正原因之前，自信地指出错误元凶：

> “OHHH WAIT. I think I see: the barrier.”

（并不是 barrier。）

在几千字的 pre-implementation roofline math 之后，告诉自己停止分析：

> “Alright, ENOUGH analysis.”

（分析又继续了好几段，最终才出现：“Screw it — make H_next allocation dynamic.”）

session 后段的诚实：profiler 坏了，邻居还在暴打共享 GPU：

> “Honestly — with ncu dead and contention dominant, I'm flying partially blind. [...] if a quiet window opens (owner idle for a while), snipe a bench.”

还有我最喜欢的一句：一次 benchmark rerun 不小心用略差的结果覆盖了保存最佳历史分数（0.1969）的文件，它短暂考虑过恢复那个更好的数字，然后没有这么做：

> “Ugh — wrote to same file. Both stand in my logs. I'll keep final_benchmark.txt as the flat current one — honest.”

一个模型选择更低的数字，只因为那才是真的；这比我能写出的任何话都更适合作为这个 benchmark 的结尾论点。

---

本文的方法论、per-run traces 和每一个 kernel 都公开在 kernelbench.com。Solutions 已在各个 cell 中链接；完整 agent transcripts 在 HuggingFace 上。

https://huggingface.co/datasets/Infatoshi/kernelbench-cuda-traces

https://huggingface.co/datasets/Infatoshi/kernelbench-hard-traces

https://huggingface.co/datasets/Infatoshi/kernelbench-mega-traces
