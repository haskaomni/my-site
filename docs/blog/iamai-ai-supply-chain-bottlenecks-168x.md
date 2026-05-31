---
title: "Iamai on AI Supply Chain Bottlenecks: HBM, CPUs, Optics, Power, and Space Data Centers"
description: "An English translated digest of 168X's conversation with AI supply-chain researcher Iamai, covering NVIDIA, HBM, optical modules, CPUs, custom ASICs, token economics, Bitcoin, AI data centers, Chinese memory, and space infrastructure."
date: 2026-05-31
source: https://x.com/168X_Fortune/status/2057714667242529022
---

# Iamai on AI Supply Chain Bottlenecks: HBM, CPUs, Optics, Power, and Space Data Centers

> Source: 168X on X, "Iamai 拆解 AI 产业链瓶颈：从 HBM、CPU、光模块、电力到太空数据中心，谁最缺？"
>
> Original link: [x.com/168X_Fortune/status/2057714667242529022](https://x.com/168X_Fortune/status/2057714667242529022)
>
> Note: This is an English translated digest of the interview, reorganized for readability. It preserves the key arguments and investment logic, but is not a verbatim full transcript. For learning and research only; not investment advice.

## One-Line Thesis

Iamai's central view is that the AI boom is still in an early stage: short-term bottlenecks are concentrated in HBM, optical networking, CPUs, cooling, and data-center execution, while the long-term ceiling is energy. The real top signal for the AI trade would be energy prices rising to an unaffordable level.

## Who Is Iamai?

Iamai describes himself as an AI supply-chain researcher. He began paying close attention to AI after ChatGPT emerged in 2023 and took an early, concentrated position in NVIDIA. His deeper intellectual trigger, however, came earlier: AlphaGo's 2016 match against Lee Sedol convinced him that AI would eventually break human expectations in an exponential way.

His bio includes terms such as Post-AGI, complex systems, and futurist. By Post-AGI, he means that AGI is something he treats as inevitable, and he makes today's investment decisions by looking backward from a future after AGI. Complex systems matter because intelligence, markets, and AI capabilities all involve emergence. Financial markets are also complex systems whose evolution has a degree of computational irreducibility: they are hard to predict precisely, but that is also what makes them fascinating.

## The Main AI Supply-Chain Bottlenecks

Asked about the relationship between GPU, HBM, optical modules, power, and data centers, Iamai separates the timeline into two layers:

- In the long run, the binding constraint is electricity.
- In the short run, the bottlenecks are a collection of supply-chain frictions.
- The most important current bottleneck is HBM, or high-bandwidth memory.
- Optical modules are also important, though their true breakout may come later.
- CPU demand is beginning to re-emerge as agentic workloads become more complex.

In his view, AI infrastructure is not a single-component story. GPU, memory, networking, power, cooling, and data-center operations all scale together, but their growth coefficients differ. That difference creates timing gaps in the market.

Memory began to break out around October of last year. Optical modules may lag memory slightly, but their demand will rise as GPU clusters become larger and inter-rack communication becomes more important.

## Why Optical Modules Matter

Iamai explains optical modules by comparing them to the Ethernet cable in a home computer, except with vastly higher bandwidth. A consumer cable may be 1Gbps. AI data centers increasingly use 800G and 1.6T optical modules, meaning 800 to 1,600 times the bandwidth of a home gigabit link.

The need for optical modules comes from machine-to-machine communication. Earlier data-center clusters were not yet large enough for interconnect demand to fully show up. As GPU shipments rise and cluster sizes expand, nodes need more bandwidth between one another, creating the optical-module boom.

The reason memory and optics grow at different speeds is user demand. Agentic workloads push context sizes higher, which increases KV-cache and memory requirements. Optical demand rises because racks need to communicate with other racks over longer distances. A single rack cannot hold infinite GPU density because cooling and power impose limits, so the system must scale across racks.

His investment conclusion is that memory currently offers the more obvious large opportunity. In a BOM comparison from GB300 to Rubin, he sees memory demand growing around 400%, while optical modules, NVLink, and network chips grow closer to 120% in that particular framing. But optics may show up more at the data-center system level, especially in rack-to-rack interconnects.

## CPUs Are Coming Back

The conversation then turns to AMD and the return of CPUs in AI data centers. Iamai's view is that agentic workloads are reviving CPU demand.

When people run tools such as Claude Code locally, CPU may not feel like the main bottleneck. But at data-center scale, agentic systems involve diverse and complex workflows. They often require non-neural-network computation: simulation, orchestration, logic, tool execution, and interactions between AI systems and the real world.

That means the AI data center is no longer only about GPUs. CPUs become more important as AI systems move from simple model calls toward long-horizon, tool-using agents.

## Custom ASICs: Useful, But Often Overhyped

Iamai does not dismiss custom ASICs. They have value when a company knows its workload clearly and can optimize around that specific need.

But he rejects the simplistic idea that custom chips eliminate the need for GPUs. His example is Midjourney reportedly spending a long time adapting to TPUs, only to discover that the return on time and effort may have been better if they had focused on NVIDIA infrastructure.

For startups especially, ASIC work can become a case of "picking up sesame seeds while dropping the watermelon." The AI frontier changes so quickly that time spent optimizing for a custom architecture may carry a large opportunity cost. Unless the workload is very clear and stable, GPUs remain hard to beat because they are flexible, mature, and supported by a deep software ecosystem.

## Frontier Models: Long-Horizon Consistency Is the Core

Iamai believes the strongest frontier systems today are Claude, Claude Code, and Opus, especially for work and coding tasks. GPT-5.5 is also competitive, and the frontier labs remain close.

He is more skeptical of directions that prioritize multimodality for its own sake. In his view, the key capability is not simply any-to-any input/output. The core is long-horizon task consistency: the ability to pursue a goal over many steps while maintaining coherence and direction.

Once a model has strong long-horizon consistency, it can support recursive self-improvement. That is the path that matters most, because it can lower R&D costs dramatically. Instead of relying on large numbers of AI researchers, a system with a clear target and recursive improvement loop can work toward the target on its own.

This is why he thinks Anthropic is on the right path. He interprets Karpathy's move to Anthropic, after working on AutoResearch-like recursive systems, as a signal that the recursive self-improvement direction is strategically important.

## Token Economics: The First Principle

For Iamai, token economics reduces to a simple question: if you invest one dollar into AI, can you get two dollars back?

If the answer is yes, recursive self-improvement and continued scaling can sustain themselves. If not, the system is simply burning money.

This is why he cares less about traditional chip benchmarks than about whether the whole system can complete long-horizon tasks economically. The benchmark that matters is not just raw speed, utilization, latency, or KV-cache size in isolation. The real question is whether the AI system can turn compute spending into valuable output.

He uses investing as an analogy. Investing is fundamentally a long-horizon consistency game. Buffett and Munger achieved strong long-term returns because they maintained a coherent value-investing framework over decades despite noise, distractions, and market emotion.

## Where Are We in the AI Market Cycle?

Iamai sees signs of local overheating in some AI-related sectors. Memory had become overheated and started pulling back. Optical-module stocks had risen dramatically in a few months, so short-term corrections are natural.

But from a long-term perspective, he still thinks the AI trade is early because demand for compute has no obvious upper bound.

His clearest top signal is energy: if power prices jump to levels that make AI infrastructure unaffordable, and if civil power supply becomes strained because all available electricity is being redirected toward data centers, then the AI trade has likely reached a stage top.

Until that kind of energy-price spike appears, he does not see a definitive top.

## Portfolio Logic: NVIDIA as Core, Bottlenecks as Upside

Iamai's largest position remains NVIDIA because he sees its future growth as the most certain.

For investors seeking higher-beta opportunities, he points to areas such as memory, optical modules, and CPUs. His tactical approach is simple: if these names pull back toward moving averages such as the 5-day or 14-day line and one has no position, those areas may be better entry points. These assets often track an internal growth curve. When prices deviate too far above that curve and the curvature becomes too steep, the sector is overheated and may require de-risking.

For defensive positioning, he prefers cash more than gold. He sees gold as similar to Bitcoin in that much of its value is consensus-based, though gold has higher recognition among central banks. Cash allows him to add back to AI-related assets when they finish correcting.

## Bitcoin in a Post-AGI World

Iamai believes Bitcoin may become more valuable in a Post-AGI world. If Bitcoin ever reaches extremely high prices, such as $10 million per coin, that would imply that total world wealth has expanded enormously.

He thinks such expansion could plausibly be driven by AI. Human intelligence has limits, and economic growth may have been constrained by those limits. AI could push society beyond that bottleneck.

In that world, wealth needs a vehicle. Otherwise, it is diluted by inflation or forced back into productive assets, creating excessive volatility and economic instability. Bitcoin may serve as a stabilizer or hedge, not only against fiat risk but also against extreme AI-era risks, including the possibility that AI systems dominate economic life.

His practical point is psychological as much as financial: if someone is all-in on AI, the volatility can be hard to endure. Diversifying into something like Bitcoin may make it easier to stay in the long-term game.

He also notes that crypto-market liquidity has weakened. From his experience developing crypto quant strategies with friends, he believes more advanced institutions and strategies may be continuously extracting liquidity. His advice to BTC holders is not to provide liquidity to the market unnecessarily; hold it securely.

## AI Cloud and Data Centers: More Than a Shell

Iamai had previously liked IREN because of its physical execution capability. As a former Bitcoin-mining-style operator, it had locked in significant power resources. But he later came to appreciate companies such as CoreWeave and Nebius more.

The reason is execution complexity. xAI was able to deploy 100,000 GPUs in a very short time and sell compute effectively to Anthropic. Not every team can do that.

Bitcoin mining and AI inference are different. AI data centers require complex cooling, networking, power delivery, and management systems. Building the outer shell of a data center is comparatively easy. Making the machines inside run reliably is much harder.

He cites Jane Street's Blackwell data-center setup as an example: each Blackwell rack comes with extensive cooling, power, networking, and switching infrastructure. What looks like one rack is actually part of a dense and complicated system.

For mining companies transitioning into AI compute, the key gap is AI understanding and operational capability. CoreWeave has more AI-focused engineering depth. IREN has tried to strengthen this area through acquisition, and other mining-derived operators may need to do the same.

## Chinese Memory and the YMTC Question

Asked whether China can do to memory what it did to solar, Iamai says China's manufacturing capacity is extremely strong. Constraints that may limit memory production elsewhere, such as electricity, construction capability, and supply-chain coordination, are less binding in China.

The likely ceiling is lithography-equipment availability, especially at the advanced end.

But he also emphasizes that memory is not as simple as solar panels. Solar modules eventually commoditize because conversion efficiency has a practical ceiling. Memory has more layers of differentiation. The high end is HBM, and HBM itself keeps advancing from HBM2 to HBM3, HBM3E, HBM4, and beyond.

GPU demand for high-bandwidth memory is simple: faster and more is better. Unlike a solar farm, where panels can remain in place for years, memory continues to move up the stack. Therefore, while solar capacity can clearly become oversupplied, memory may not follow the same path as easily.

## Space Data Centers

Iamai thinks space will eventually become a major theme. If data centers keep expanding on Earth, they will run into permitting, regulation, power, and land constraints. Eventually, some data-center activity will move into space.

With Starship reducing launch costs, the feasibility of space-based AI data centers improves. The biggest unresolved issue is cooling. When the theme approaches commercialization, he thinks space-cooling companies may become interesting. He mentions CPSH as a very small company he is studying, though he does not present it as a settled conclusion.

Space data centers would also create demand for laser communication, which connects conceptually with today's optical-communication supply chain.

## Software vs. Hardware

On whether software stocks could come back as semiconductor names correct, Iamai remains focused on physical-world constraints.

Software companies can still be good businesses, but the more visible opportunity is in solving physical bottlenecks: chips, memory, networking, power, cooling, and data-center execution. In his view, the AI era is currently constrained more by atoms than by code.

## How Individuals Should Respond

For ordinary professionals, Iamai recommends two practical responses:

1. Learn to use AI tools well, because AI collaboration will significantly increase productivity.
2. Own some exposure to the relevant trend, so that one can participate economically in the future being built.

He also built his own dashboard to track AI-industry bottlenecks visually. The reason is that the AI supply chain is even more complex than the traditional semiconductor chain, with optical modules, power semiconductors, cooling, memory, and many other subfields. A data-driven dashboard helps him understand where bottlenecks are and hold positions through volatility.

He says the product was built largely with Codex. The core challenge was solving data-source integration. Brokerages such as Longbridge provide APIs; by giving API documentation to Codex, he could connect data sources and customize the dashboard.

## Capitalism After AGI

The interview ends with a broader question: if AI creates explosive productivity and perhaps universal basic income, how should we think about capital?

Iamai's answer is that late-stage AI could partially eliminate capitalism. Once AGI or ASI can enter the economic system and see bottlenecks at a macro level, society may not need investors searching for alpha in the same way. AI could identify constraints and allocate resources directly.

Before recursive self-improvement is fully achieved, access to compute, energy, robots, and AI resources may still matter. After that point, even those privileges may lose meaning.

His final advice is almost existential: try to live as long as possible. If one lives long enough to see the Singularity, one may not need to win every trade or beat AI. Being alive and healthy at that moment may be the real option value.

Or, as the interview frames it more simply: in the AI era, perhaps the best thing an ordinary person can do is sleep well, eat well, stay healthy, and remain in the game.

## My Takeaway

The most useful part of this conversation is its systems-level framing. It does not treat the AI trade as merely a GPU story. It maps the boom across several layers:

- HBM and DRAM determine how much context and inference capacity can scale.
- Optical modules determine how effectively large clusters communicate.
- CPUs return because agents need orchestration and non-neural computation.
- Power becomes the ultimate ceiling.
- Data-center execution separates real AI cloud operators from simple land-and-power holders.
- Space infrastructure may become relevant once Earth-based constraints become too binding.

The underlying message is that AI investing is becoming a bottleneck-allocation game. The scarce resource changes over time, but the winner is whoever identifies the next binding constraint before it becomes obvious.
