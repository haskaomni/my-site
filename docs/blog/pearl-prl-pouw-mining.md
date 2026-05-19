---
title: 挖矿 Pearl/PRL：PoUW 链的收益、风险与单机启动提示词
description: Pearl/PRL 是一个基于 Proof of Useful Work 的早期 L1，把 AI 矩阵乘法变成挖矿工作。本文整理官方与社区资料，介绍挖矿路线、收益公式、风险清单，并附给 AI Agent 的单机挖矿提示词。
---

# 挖矿 Pearl/PRL：PoUW 链的收益、风险与单机启动提示词

Pearl，也常被矿工称为 PRL 或 PEARL，是一个基于 **Proof of Useful Work**（PoUW）的早期 Layer 1 区块链。

它最吸引人的地方，不是“又一个新矿币”，而是它试图回答一个老问题：既然 PoW 一定要消耗真实计算，为什么这些计算不能顺便做点有用的事？

比特币把电力和哈希计算变成了货币。Pearl 想做的是把 AI 算力，尤其是矩阵乘法（MatMul/GEMM），变成链上共识的一部分。

> 免责声明：本文仅作技术和信息整理，不构成投资建议。PRL/PEARL 属于早期加密网络，存在价格、流动性、协议、安全、合规和硬件投入风险。挖矿前请自行核验官网、GitHub、矿池、钱包和链上信息。

## Pearl 是什么？

Pearl 官方 GitHub 对自己的描述是：Pearl 是一个基于 Proof-of-Useful-Work 协议的 L1 区块链，挖矿通过任意矩阵乘法的副产品完成。其理论基础来自 arXiv 论文 [Proofs of Useful Work from Arbitrary Matrix Multiplication](https://arxiv.org/abs/2504.09971)。

从公开资料看，Pearl 的技术栈包括：

- `pearld`：Pearl 全节点。
- `Oyster`：钱包守护进程。
- `prlctl`：节点和钱包 CLI 工具。
- `vLLM miner`：基于 vLLM 的 GPU 挖矿组件。
- `pearl-gateway`：连接 Pearl 全节点和 GPU miner 的网关。
- ZK proof / Plonky2 相关验证组件。
- NoisyGEMM / CUDA kernel：用于 PoUW 的矩阵乘法计算。

传统 PoW 里，矿工不停计算哈希，直到找到满足难度目标的 nonce。Pearl 的思路则是：让矿工执行大型矩阵乘法，再把计算结果包装成可以验证的 PoW 证书，从而让链上节点能够低成本验证矿工确实做了足够的工作。

这类设计的意义在于，矩阵乘法正好是 AI 训练和推理里的核心瓶颈。现代大模型、Transformer、Llama、Stable Diffusion，本质上都大量依赖矩阵乘法。因此 Pearl 的叙事是：同样一张 GPU，既能服务 AI 推理，也能为区块链提供安全性。

## PoUW 和普通 PoW 的区别

普通 PoW 的安全性来自“计算成本不可伪造”。比特币矿工必须消耗真实电力和硬件成本去计算哈希。

PoUW 也保留了这个思想，但它试图把计算内容换成有外部用途的任务。

| 项目 | 比特币 PoW | Pearl PoUW |
| --- | --- | --- |
| 工作内容 | SHA-256 哈希 | GPU 矩阵乘法 / AI 推理相关计算 |
| 主要硬件 | ASIC | NVIDIA GPU，尤其是 H100/H200 或支持 tensor core 的 GPU |
| 计算外部用途 | 基本没有 | 理论上可服务 AI 推理 / MatMul |
| 安全来源 | 哈希难度 | 可验证的有用计算难度 |
| 主要叙事 | 数字黄金 | AI 算力货币化 / 2-for-1 compute |

Pearl 官方和 Pearl Compute 反复强调的关键词是 **2-for-1**：同一份 GPU 计算既用于 AI，又用于链上共识。这个想法很有吸引力，但也要注意，它仍处于早期阶段，真实商业闭环、AI 需求匹配、矿工经济模型和去中心化程度都还需要时间验证。

## 现在怎么挖 Pearl？

目前公开资料里，Pearl 挖矿大致有三条路线。

### 路线一：官方参考路线，全节点 + vLLM miner

这是最符合 Pearl 原始 PoUW 叙事的方式。

官方 GitHub README 给出的流程大致是：

1. 构建 Pearl 仓库。
2. 创建 Oyster 钱包。
3. 启动 `pearld` 全节点。
4. 启动 `pearl-gateway`。
5. 启动基于 vLLM 的 GPU miner。

官方文档里提到的核心命令包括：

```bash
task build:blockchain
task build:miner
```

创建钱包：

```bash
./bin/oyster -u rpcuser -P rpcpass --create
```

获取挖矿地址：

```bash
./bin/oyster -u rpcuser -P rpcpass &
./bin/prlctl -u rpcuser -P rpcpass -s https://localhost:44207 getnewaddress
```

启动节点：

```bash
./bin/pearld \
  --rpcuser=rpcuser \
  --rpcpass=rpcpass \
  --rpclisten=0.0.0.0:44107 \
  --miningaddr=<your-taproot-address> \
  --txindex
```

然后通过环境变量连接 gateway：

```bash
export PEARLD_RPC_URL="http://localhost:44107"
export PEARLD_RPC_USER="rpcuser"
export PEARLD_RPC_PASSWORD="***"
export PEARLD_MINING_ADDRESS="<your-taproot-address>"

pearl-gateway start
```

官方 vLLM miner Docker 示例里使用的模型是：

```text
pearl-ai/Llama-3.3-70B-Instruct-pearl
```

这一套更偏“完整节点 + AI 推理 + PoUW”的路线，但门槛较高。

### 路线二：H100/H200 云 GPU 路线

Spheron 的 Pearl 节点指南提到，Pearl 参考 miner 对 GPU 架构有很强要求，重点是 Hopper-class GPU，也就是 H100/H200。

资料中提到的配置大致是：

| 配置 | 最低 | 推荐 |
| --- | --- | --- |
| GPU | H100 80GB | H200 141GB |
| 系统内存 | 64GB | 128GB |
| 硬盘 | 200GB NVMe | 500GB NVMe |
| 系统 | Ubuntu 22.04 | Ubuntu 22.04 |
| CUDA | 12.x | 12.x |
| 网络 | 100Mbps | 1Gbps |

Spheron 文中给出的 2026 年 5 月 17 日附近价格参考：

| GPU | 按需价格 | Spot 价格 | 按需月成本 |
| --- | --- | --- | --- |
| H100 SXM5 80GB | 约 3.90 美元/小时 | 约 1.63 美元/小时 | 约 2,847 美元/月 |
| H200 SXM5 141GB | 约 4.62 美元/小时 | 约 1.92 美元/小时 | 约 3,373 美元/月 |

注意，这只是云 GPU 成本，不代表收益。PRL 产出取决于全网算力、区块奖励、出块速度、矿池费用、机器在线率和是否能稳定提交有效 proof。

### 路线三：社区矿池 / 第三方 miner

除了官方参考 miner，社区里也出现了矿池和第三方 CUDA miner，例如：

- AlphaPool Pearl pool。
- Akoya pool。
- MinePearl 社区指南。
- Lord of Pearls dashboard / guide。

这些资料声称可以支持更多 NVIDIA GPU，包括 RTX 30/40/50 系列、V100、A100、H100/H200 等，并且部分矿池声称单实例只需要约 2GB VRAM。

例如 AlphaPool 页面显示：

- PPLNS 费用约 5%。
- Solo 费用约 5%。
- 登录格式类似 `<your_PRL_address>.<worker_name>`。
- Pool endpoint 类似 `us2.alphapool.tech:5566`。
- Solo endpoint 类似 `us2.alphapool.tech:5567`。

示例命令类似：

```bash
./alpha-miner \
  --pool stratum+tcp://pearl.alphapool.tech:5566 \
  --address prl1pYOUR_PEARL_ADDRESS \
  --worker myrig
```

Akoya 页面给出的 Docker 示例类似：

```bash
docker run -d --gpus all --restart=unless-stopped --name akoya-miner \
  -e AKOYA_POOL_WALLET=YOUR_PEARL_ADDRESS \
  -e AKOYA_POOL_WORKER=YOUR_WORKER_NAME \
  registry.akoyapool.com/akoya-miner:latest
```

但这里必须强调：第三方 miner 和矿池需要额外信任。

它们的优点是上手快、硬件门槛可能更低、PPLNS 收益更平滑；缺点是你要信任矿池、二进制程序、费用规则、支付规则和实际算力统计。某些社区 miner 可能更偏“优化出块 / 提交 share”，未必完整体现 Pearl 官方“AI useful work”的原始设计。

## 收益怎么计算？

PRL 挖矿收益不能简单看“每天挖多少个币”，而要拆成几个变量：

```text
每日 PRL 收益 =
你的算力 / 全网算力
× 每日出块数
× 当前区块奖励
× 在线率
× (1 - 矿池费)
- 孤块 / 无效 share 损失
```

如果换成美元收益：

```text
每日净收益 =
每日 PRL 收益 × PRL 市场价格
- GPU 租赁成本
- 电费
- 机器折旧
- 网络 / 维护成本
```

问题在于，PRL 目前仍很早期，公开资料里也反复提到它可能还没有充分的交易所价格发现。因此很多时候你只能计算“挖到多少 PRL”，但很难准确计算“赚了多少美元”。

### 一个示例计算

以检索到的 AlphaPool 页面数据为例，当时页面显示：

- 网络算力：约 8.27 EH/s。
- 当前区块奖励：约 2,738 PRL。
- 区块时间：约 3 分 14 秒。
- H100 社区 miner 算力示例：约 610-620 TH/s。
- 矿池费：约 5%。

先估算每日出块：

```text
24 × 60 × 60 ÷ 194 秒 ≈ 445 个区块/天
```

全网每日释放：

```text
445 × 2,738 ≈ 1,218,000 PRL/天
```

单张 H100 如果按 610 TH/s 估算，全网 8.27 EH/s 等于 8,270,000 TH/s：

```text
610 ÷ 8,270,000 ≈ 0.0000738
```

理论每日 PRL：

```text
1,218,000 × 0.0000738 ≈ 90 PRL/天
```

扣除 5% 矿池费：

```text
90 × 0.95 ≈ 85.5 PRL/天
```

如果 H100 云 GPU 成本是 3.90 美元/小时：

```text
3.90 × 24 = 93.6 美元/天
```

那么仅覆盖云 GPU 成本所需 PRL 价格约为：

```text
93.6 ÷ 85.5 ≈ 1.09 美元/PRL
```

如果用 Spot H100，按 1.63 美元/小时：

```text
1.63 × 24 = 39.12 美元/天
39.12 ÷ 85.5 ≈ 0.46 美元/PRL
```

这只是示例，不是收益承诺。实际结果会受到以下因素影响：

- 全网算力上涨会摊薄单机收益。
- 区块奖励会随高度下降。
- 出块时间和难度会变化。
- 矿池统计口径可能变化。
- PRL 没有充分流动性时，账面收益无法兑现。
- 云 GPU Spot 会被抢占，导致掉线和重同步。
- Solo 挖矿有极大波动，可能很久不出块。

### 消费级 GPU 怎么算？

如果使用第三方矿池声称支持的 RTX 4090，AlphaPool 页面曾给出约 150-160 TH/s 的示例算力。

按 150 TH/s 粗略估算：

```text
150 ÷ 8,270,000 × 1,218,000 ≈ 22 PRL/天
```

如果扣除 5% 矿池费，约：

```text
20.9 PRL/天
```

如果你是闲置显卡，主要成本是电费；如果你是专门买卡，则还要加入显卡折旧、主机成本、维护成本和二手残值风险。

## 收益的核心变量

### 全网算力

越多人进场，单机占比越低。早期链常见情况是：收益看起来很高，吸引矿工加入，然后全网算力迅速上涨，单机产出下降。

### 区块奖励

不同资料里出现过约 2,700-2,800 PRL/区块的数字，但区块奖励会随链高度变化。不要用旧文章里的奖励长期估算。

### 出块速度

不同 explorer / pool 页面可能显示不同统计窗口下的出块速度。计算时应以当前网络页面为准，而不是固定假设“一分钟一块”或“三分钟一块”。

### 矿池费和支付规则

PPLNS 更平滑，但有矿池费、确认期、最低支付门槛。Solo 理论收益不扣 PPLNS 分摊，但波动巨大，适合大算力或愿意赌运气的人。

### PRL 流动性和价格

这是最大变量。如果 PRL 没有交易所、没有深度、没有买盘，那么挖到的币只是账面资产。早期 PoW 币经常出现“能挖但卖不掉”的情况。

## 主要风险

### 价格和流动性风险

PRL 可能未来有价格发现，也可能长期没有有效流动性。早期挖矿最常见的误区是用“未来可能上市后的价格”倒推今天的收益，这非常危险。

更稳妥的做法是：

```text
先按 0 流动性看待 PRL，
再判断自己是否愿意承担 GPU 成本。
```

### 硬件投入风险

官方参考路线偏 H100/H200，租赁成本极高。按需 H100 一天就可能接近 100 美元，H200 更贵。若 PRL 无法变现，成本会非常真实。

自有显卡虽然没有租金，但有：

- 电费。
- 散热。
- 风扇损耗。
- 显存 / 核心长期高负载风险。
- 机会成本。
- 二手折价。

### 协议早期风险

Pearl 主网公开资料显示是 2026 年 4 月下旬才上线，属于非常早期的 L1。早期链可能出现：

- 共识 bug。
- 节点版本不兼容。
- 硬分叉。
- 钱包问题。
- 区块浏览器统计错误。
- 网络中心化。
- 矿工软件频繁更新。

这类风险不是理论风险，而是早期链的常态。

### 第三方 miner 风险

社区 miner 可能带来更广泛的硬件支持，但也带来信任问题：

- 二进制是否安全。
- 是否有抽水。
- 是否真实上报算力。
- 是否偷换钱包地址。
- 是否包含恶意代码。
- 是否与官方协议长期兼容。
- 是否真的在做 useful work。

如果要运行第三方 miner，建议用隔离机器、最小权限、单独钱包地址，不要在主力工作机或存有私钥的机器上直接跑未知二进制。

### 矿池风险

矿池可能出现：

- 拖欠支付。
- 统计不透明。
- 费用调整。
- PPLNS 窗口规则变化。
- 被攻击或跑路。
- 单点中心化。

矿池越大，收益越平滑，但网络中心化风险越高。

### 云平台和合规风险

一些云 GPU 平台不允许挖矿，或者对高功耗、长期满载、区块链节点、端口开放有额外限制。开机前必须阅读服务条款，否则可能被封号、清退或扣费。

### 钱包安全风险

挖矿流程里最敏感的是钱包和私钥。注意：

- 不要把助记词发给 AI、矿池、客服或脚本。
- 挖矿地址可以公开，私钥绝不能公开。
- 用专门的钱包收矿。
- 定期转出到冷钱包。
- 只从官方 GitHub 或可信 release 下载。
- 校验 hash / checksum。
- 不要用 root 运行未知 miner。

## 适合什么人挖？

Pearl 更适合：

- 有闲置 NVIDIA GPU 的矿工。
- 熟悉 Linux、Docker、CUDA、驱动的人。
- 能承受早期币归零风险的人。
- 已经在跑 AI 推理，想尝试“额外挖矿收益”的人。
- 能持续跟踪 GitHub、Discord、矿池公告的人。

不太适合：

- 只看到高收益截图就冲的人。
- 用信用卡或贷款租 H100 的人。
- 不懂钱包和私钥管理的新手。
- 无法承受几周甚至几个月无变现的人。
- 在生产机器上随便跑未知 miner 的人。

## 我的判断：机会很性感，账本要冷静

Pearl 最吸引人的地方，不是“现在能挖多少币”，而是它试图解决 PoW 最大的叙事缺陷：计算浪费。

如果 Pearl 的 PoUW 真的能把 AI 推理、矩阵乘法和区块链安全结合起来，那么它确实有一个比普通小 PoW 链更强的故事：矿工不是单纯烧电，而是在贡献 AI 时代最核心的算力。

但从矿工角度，当前最大的矛盾是：

```text
技术叙事很强，
经济闭环还早。
```

PRL 是否有足够流动性？AI useful work 是否能形成真实需求？矿工收入是否能覆盖 H100/H200 成本？社区 miner 是否会偏离官方 PoUW 设计？这些都还需要市场验证。

所以比较理性的参与方式是：

- 有闲置 GPU：可以小规模试挖。
- 想租 H100/H200：先按最悲观价格计算。
- 想长期挖：优先关注官方版本、矿池信誉和全网算力趋势。
- 想投机：只投入能承受归零的钱。

## 给 AI Agent 的单机挖矿提示词

下面这段可以直接复制给 Cursor、Claude Code、Codex、Devin 或其他能操作服务器的 AI Agent。建议在一台干净的 Ubuntu 22.04 GPU 机器上使用。

```text
你是我的 Linux 运维和挖矿配置助手。目标是在这台机器上安全地开始挖 Pearl / PRL / PEARL PoUW 挖矿。

重要规则：
1. 一次只执行一个命令，执行前先解释目的。
2. 每一步都要等待我贴回输出，再判断是否继续。
3. 不要读取、上传、打印、保存我的助记词、私钥或钱包私钥。
4. 不要运行 rm -rf、格式化磁盘、重装系统、修改防火墙开放公网 RPC 等破坏性或高风险命令，除非我明确确认。
5. 不要把任何钱包私钥、seed phrase、API key、SSH key 发到网络。
6. 优先使用官方 GitHub、官方文档、矿池官网和 release 页面。下载二进制后尽量校验 checksum。
7. 如果发现当前硬件不适合挖矿，要直接说明，不要强行继续。

你需要帮我完成以下任务：

第一阶段：识别机器环境
- 检查 OS 版本：lsb_release -a 或 /etc/os-release
- 检查 GPU：nvidia-smi
- 检查 CUDA/driver：nvidia-smi、nvcc --version，如 nvcc 不存在则说明
- 检查 Docker：docker --version
- 检查 NVIDIA Container Toolkit：docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
- 检查 CPU、内存、硬盘：lscpu、free -h、df -h
- 判断这台机器适合哪条路线：
  A. 官方 Pearl 全节点 + vLLM miner 路线，通常需要 H100/H200
  B. 社区矿池/第三方 miner 路线，可能支持 RTX 30/40/50、A100、V100、H100/H200，但需要额外信任第三方二进制

第二阶段：准备钱包地址
- 询问我是否已经有 PRL 收款地址。
- 如果我已有地址，只记录公开地址，不要询问私钥。
- 如果我没有地址，指导我用官方钱包或官方 Oyster/desktop wallet 创建钱包。
- 创建钱包时反复提醒我：助记词只能离线保存，不能贴给你，不能贴给任何网站或矿池。

第三阶段：选择挖矿方式
请先给我两个方案，并让我选择：

方案 A：官方参考路线
- 从 https://github.com/pearl-research-labs/pearl 获取最新代码或 release
- 构建 pearld、prlctl、oyster、miner
- 启动全节点并同步
- 创建或导入钱包地址
- 启动 pearl-gateway
- 启动 vLLM miner
- 适合 H100/H200，技术门槛高，但更接近官方 PoUW 设计

方案 B：矿池快速路线
- 使用我选择的矿池，例如 AlphaPool 或 Akoya
- 从矿池官网获取最新 miner 下载地址或 Docker 镜像
- 用我的 PRL 收款地址配置 worker
- 启动 miner
- 监控 share、算力、温度、功耗和矿池支付
- 上手快，但要承担第三方 miner 和矿池信任风险

第四阶段：如果选择官方路线
- 安装必要依赖：git、build-essential、Go、Rust、uv、go-task、Docker、NVIDIA Container Toolkit
- clone 官方 repo：https://github.com/pearl-research-labs/pearl
- 查看 README 和 Taskfile，确认当前构建命令，不要凭记忆执行
- 构建 blockchain：task build:blockchain
- 如硬件满足要求，再构建 miner：task build:miner
- 启动 oyster 创建钱包或使用已有地址
- 启动 pearld，设置 rpcuser/rpcpass/miningaddr
- 等待节点同步，使用 prlctl 查询状态
- 节点同步完成后启动 pearl-gateway 和 vLLM miner
- 监控日志中是否有 template fetched、share submitted、block submitted、accepted 等信息

第五阶段：如果选择矿池快速路线
- 打开矿池官网，确认最新 endpoint、fee、miner 下载方式、支持硬件和钱包地址格式
- 不要从搜索广告下载 miner
- 下载 miner 后检查文件权限、版本和 checksum
- 用非 root 用户运行
- 使用我的 PRL 地址和 worker 名称启动，例如：
  ./alpha-miner --pool stratum+tcp://<pool_host>:<port> --address <MY_PRL_ADDRESS> --worker <WORKER_NAME>
- 或使用矿池官方 Docker 命令，但必须先解释每个参数含义
- 启动后监控：
  nvidia-smi
  miner 日志
  share accepted/rejected
  GPU 温度
  功耗
  矿池 dashboard 上的钱包地址页面

第六阶段：收益和风险核算
- 帮我记录：
  我的 GPU 型号
  本地算力
  全网算力
  当前区块奖励
  当前出块速度
  矿池费
  电费或云 GPU 小时费
- 用公式估算：
  每日 PRL = 我的算力 / 全网算力 × 每日出块数 × 当前区块奖励 × (1 - 矿池费)
  每日成本 = 电费或云 GPU 成本
  盈亏平衡 PRL 价格 = 每日成本 / 每日 PRL
- 明确提醒：这不是收益保证，PRL 可能没有流动性，也可能无法卖出。

现在先执行第一阶段。请从检查 OS、GPU、驱动和硬盘开始。一次只给我一个命令。
```

## 结论

Pearl / PRL 是一个值得关注的早期 PoUW 项目。它的技术叙事比普通小矿币更有意思：用 AI 时代最核心的矩阵乘法来替代传统哈希挖矿，让 GPU 算力既服务共识，也可能服务 AI 推理。

但矿工真正要关心的是三件事：

```text
我每天能挖多少 PRL？
这些 PRL 有没有流动性？
我的硬件和电费成本能不能扛住不确定性？
```

如果你有闲置 GPU，可以小规模试挖，把它当成早期实验和彩票型仓位。如果你要租 H100/H200 重投入，就必须先把最坏情况算清楚：PRL 可能短期无法卖出，全网算力可能快速上涨，矿池和 miner 可能频繁变化。

Pearl 的故事很性感，但挖矿账本要冷静。真正适合参与的人，不是最会 FOMO 的人，而是能持续跟踪数据、控制成本、保护钱包、及时升级软件的人。

## 参考资料

- Pearl GitHub：[pearl-research-labs/pearl](https://github.com/pearl-research-labs/pearl)
- PoUW 论文：[Proofs of Useful Work from Arbitrary Matrix Multiplication](https://arxiv.org/abs/2504.09971)
- Pearl Compute：[compute.pearlresearch.ai](https://compute.pearlresearch.ai/)
- Spheron Pearl 节点指南：[How to Run a Pearl Research Node on GPU Cloud](https://www.spheron.network/blog/run-pearl-research-node-gpu-cloud-h100-h200/)
- AlphaPool Pearl：[pearl.alphapool.tech](https://pearl.alphapool.tech/)
- Akoya Pool：[akoyapool.com](https://akoyapool.com/)
- Lord of Pearls：[lordofpearls.xyz](https://lordofpearls.xyz/)
