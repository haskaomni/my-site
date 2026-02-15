---
title: 12 个 Claude 提示词，替代 15 万美元/年的投行工作
description: AI 现在能像高盛分析师一样构建金融模型——12 个免费的 Claude 提示词，涵盖 DCF、三大报表、并购、LBO、IPO 等核心投行分析
---

# 12 个 Claude 提示词，替代 15 万美元/年的投行工作

**作者：Nav Toor ([@heynavtoor](https://x.com/heynavtoor))**
**日期：2026 年 2 月 14 日**
**原文：[X/Twitter](https://x.com/heynavtoor/status/2022646952664641694)**

---

> 重磅：AI 现在能像高盛分析师一样构建金融模型（而且免费）。以下是 12 个 Claude 提示词，可以替代年薪 15 万美元的投行工作。

## 1/ DCF 估值模型

**现金流折现（DCF）** 是投行估值的核心方法。这个提示词让 AI 扮演高盛高级分析师，输出完整的 DCF 模型，包含自由现金流预测、WACC 计算、终值估算、敏感性分析和多情景估值区间。

```text
You are a Senior Analyst at Goldman Sachs. I need a complete DCF (Discounted Cash Flow) valuation model for [COMPANY NAME].

Please provide:
- Free cash flow projections: Next 5 years with growth assumptions
- WACC calculation: Cost of equity + cost of debt breakdown
- Terminal value: Both perpetuity growth and exit multiple methods
- Sensitivity analysis: How value changes with different assumptions
- Discount rate justification: Why we chose this WACC
- Key drivers: What makes cash flow go up or down
- Comparable companies: How our assumptions compare to peers
- Valuation range: Bull case, base case, bear case scenarios

Format as investment banking pitch book valuation page with clear formulas.
Company: [DESCRIBE COMPANY, INDUSTRY, FINANCIALS]
```

## 2/ 三大报表联动模型

**三大报表模型**（利润表、资产负债表、现金流量表）是投行建模的基础。这个提示词让 AI 扮演摩根士丹利 VP，构建完整的五年期三表联动模型，包含公式链接和错误检查。

```text
You are a VP at Morgan Stanley. I need a complete three-statement model for [COMPANY NAME].

Please provide:
- Income statement: Revenue, costs, EBITDA, net income (5 years)
- Balance sheet: Assets, liabilities, equity (5 years)
- Cash flow statement: Operating, investing, financing activities (5 years)
- Link formulas: How statements connect (net income → cash flow → balance sheet)
- Working capital: How AR, inventory, and AP change
- Debt schedule: Principal payments and interest expense
- Key assumptions: Revenue growth, margins, capex as % of sales
- Error checks: Balance sheet balancing and circular references

Format as Excel-style model with formulas explained in plain English.
Company: [DESCRIBE BUSINESS, CURRENT FINANCIALS, GROWTH STAGE]
```

## 3/ 并购增厚/摊薄分析

**增厚/摊薄分析**用于评估并购交易对收购方每股收益（EPS）的影响。这个提示词让 AI 扮演摩根大通董事总经理，分析交易结构、合并报表、协同效应和盈亏平衡点。

```text
You are a Managing Director at JP Morgan. I need an accretion/dilution analysis for [ACQUIRER] buying [TARGET].

Please provide:
- Deal structure: Cash vs. stock mix and total consideration
- Pro forma income statement: Combined company earnings
- EPS impact: Accretion or dilution percentage
- Synergies: Cost savings and revenue opportunities with dollar amounts
- Funding sources: Debt, cash on hand, or equity issuance
- Credit impact: How debt/EBITDA ratio changes
- Break-even analysis: What synergies needed to be accretive
- Sensitivity table: EPS impact at different purchase prices

Format as M&A analysis memo with deal recommendations.
Deal: [DESCRIBE ACQUIRER, TARGET, DEAL SIZE, RATIONALE]
```

## 4/ LBO（杠杆收购）模型

**杠杆收购模型**是私募股权的核心分析工具。这个提示词让 AI 扮演 KKR 的 PE 投资经理，构建完整的 LBO 模型，涵盖资金来源与用途、债务结构、退出情景和 IRR 计算。

```text
You are a Private Equity Associate at KKR. I need a complete LBO model for [COMPANY NAME].

Please provide:
- Sources and uses: How deal is funded (debt, equity, fees)
- Debt structure: Senior debt, mezzanine, interest rates, covenants
- Cash flow sweep: How excess cash pays down debt
- Exit scenarios: Strategic sale vs. IPO in year 5
- IRR calculation: Internal rate of return for equity investors
- Cash-on-cash multiple: Total proceeds divided by equity invested
- Debt paydown schedule: Year-by-year principal reduction
- Management assumptions: EBITDA growth and margin improvement

Format as private equity investment committee memo with returns analysis.
Company: [DESCRIBE COMPANY, EBITDA, ASKING PRICE, INDUSTRY]
```

## 5/ 可比公司分析（Comps）

**交易类比法**通过对标同行业上市公司的估值倍数来为目标公司定价。这个提示词让 AI 扮演花旗银行股票研究分析师，筛选同业公司、计算估值倍数并给出隐含估值区间。

```text
You are an Equity Research Analyst at Citi. I need a trading comps analysis for [COMPANY NAME].

Please provide:
- Peer group: 10-15 public companies in same industry
- Trading multiples: EV/EBITDA, EV/Revenue, P/E for each peer
- Financial metrics: Revenue, EBITDA, margins for comparison
- Valuation range: 25th percentile, median, 75th percentile multiples
- Implied valuation: What our company is worth at each multiple
- Adjustments: Why our company deserves premium or discount
- Growth comparison: How our growth compares to peers
- Quality screen: Which peers are most comparable and why

Format as comparable company valuation table with multiples highlighted.
Company: [DESCRIBE COMPANY, FINANCIALS, CLOSEST COMPETITORS]
```

## 6/ 先例交易分析

**先例交易分析**通过研究历史并购案例来确定目标公司的合理估值。这个提示词让 AI 扮演 Lazard 的并购银行家，梳理过去五年的相关交易、分析控制权溢价和市场环境变化。

```text
You are an M&A Banker at Lazard. I need a precedent transaction analysis for [COMPANY/INDUSTRY].

Please provide:
- Transaction universe: 15-20 relevant M&A deals in past 5 years
- Deal multiples: EV/EBITDA, EV/Revenue paid in each transaction
- Deal characteristics: Acquirer, target, deal size, date, rationale
- Premium analysis: Control premium paid over trading price
- Valuation range: 25th percentile, median, 75th percentile of multiples
- Deal adjustments: Strategic vs. financial buyers, synergy levels
- Market conditions: How M&A market has changed over time
- Implied valuation: What our company is worth based on precedents

Format as M&A valuation analysis with transaction comparables table.
Company: [DESCRIBE COMPANY, INDUSTRY, POTENTIAL BUYERS]
```

## 7/ IPO 估值与定价分析

**IPO 定价分析**用于确定公司上市的发行价格区间。这个提示词让 AI 扮演巴克莱资本市场银行家，分析发行结构、估值区间、稀释效应和首日涨幅预期。

```text
You are a Capital Markets Banker at Barclays. I need an IPO pricing analysis for [COMPANY NAME].

Please provide:
- Offering structure: Primary vs. secondary shares, total raise
- Pre-money valuation: Company value before IPO proceeds
- Post-money valuation: Company value after IPO proceeds
- Comparable IPOs: Recent deals in same sector with pricing multiples
- Valuation range: Low, mid, high price per share scenarios
- Dilution analysis: How much existing owners get diluted
- Float analysis: Percentage of company trading publicly
- First-day pop expectation: Typical underpricing in sector

Format as IPO pricing memo with share price recommendation range.
Company: [DESCRIBE COMPANY, FINANCIALS, IPO SIZE, COMPARABLES]
```

## 8/ 信用分析与债务承受能力模型

**债务承受能力分析**用于评估公司能安全举借多少债务。这个提示词让 AI 扮演瑞信杠杆融资银行家，分析杠杆率、利息覆盖倍数、债务分层结构和财务契约条款。

```text
You are a Leveraged Finance Banker at Credit Suisse. I need a debt capacity analysis for [COMPANY NAME].

Please provide:
- EBITDA analysis: Last 3 years and next 3 years projected
- Leverage ratios: Total Debt/EBITDA industry standards
- Interest coverage: EBITDA/Interest expense minimum thresholds
- Debt structure: Senior secured, unsecured, subordinated layers
- Covenants: Financial maintenance tests (leverage, coverage)
- Maximum debt: How much company can borrow responsibly
- Pricing grid: Interest rates at different leverage levels
- Refinancing analysis: When existing debt matures and needs rollover

Format as credit memo with debt capacity recommendation.
Company: [DESCRIBE COMPANY, CURRENT DEBT, EBITDA, INDUSTRY]
```

## 9/ 分部估值（SOTP）

**分部加总估值法**将多元化公司拆分为独立业务单元分别估值。这个提示词让 AI 扮演 Evercore 的重组顾问，对各业务板块采用最适合的估值方法，计算拆分价值。

```text
You are a Restructuring Advisor at Evercore. I need a sum-of-the-parts valuation for [COMPANY NAME].

Please provide:
- Business segments: Break company into distinct operating divisions
- Segment financials: Revenue, EBITDA, margins for each division
- Valuation methodology: Best approach for each segment (DCF, comps, multiples)
- Segment values: Individual valuation for each business unit
- Corporate costs: Overhead to allocate or remove
- Debt allocation: How to assign debt to each segment
- Total value: Sum of all parts minus debt plus cash
- Value per share: Implied stock price from SOTP analysis

Format as restructuring analysis with breakup valuation scenarios.
Company: [DESCRIBE COMPANY, BUSINESS SEGMENTS, FINANCIALS]
```

## 10/ 运营模型与单位经济学

**运营模型**从底层构建收入预测，分析单位经济学指标。这个提示词让 AI 扮演泛大西洋投资的成长型股权投资人，构建包含 CAC、LTV、回本周期和烧钱率的详细运营模型。

```text
You are a Growth Equity Investor at General Atlantic. I need a detailed operating model for [COMPANY NAME].

Please provide:
- Revenue build: Bottom-up forecast by customer, product, or geography
- Unit economics: CAC, LTV, payback period, gross margin per unit
- Cohort analysis: How different customer vintages perform over time
- Key drivers: What makes revenue and costs move
- Scenario planning: Upside, base, downside case assumptions
- Burn rate: Monthly cash consumption and runway calculation
- Breakeven analysis: When company becomes cash flow positive
- Scaling assumptions: How unit economics improve with growth

Format as operating model with monthly projections for year 1, quarterly for years 2-3.
Company: [DESCRIBE BUSINESS MODEL, CURRENT METRICS, GROWTH RATE]
```

## 11/ 敏感性与情景分析

**敏感性分析**量化关键假设变动对估值结果的影响。这个提示词让 AI 扮演瑞银风控副总裁，执行单变量/双变量敏感性分析、情景构建和蒙特卡洛模拟输入设定。

```text
You are a Risk Management VP at UBS. I need sensitivity and scenario analysis for [COMPANY/MODEL].

Please provide:
- One-way sensitivity: How value changes with one variable (revenue growth, margin, WACC)
- Two-way sensitivity: How value changes with two variables simultaneously
- Scenario builder: Best case (all positives), base case (likely), worst case (all negatives)
- Monte Carlo inputs: Probability distributions for key assumptions
- Breakeven analysis: What must go right for deal to work
- Downside protection: How bad can things get before disaster
- Risk factors: Top 5 assumptions with biggest impact on value
- Hedging strategies: How to protect against key risks

Format as risk analysis memo with sensitivity tables and scenario outcomes.
Model: [DESCRIBE VALUATION, KEY ASSUMPTIONS, RISK FACTORS]
```

## 12/ 投资委员会备忘录

**投委会备忘录**是投资决策的最终文件。这个提示词让 AI 扮演黑石合伙人，撰写包含执行摘要、投资论点、估值汇总、回报分析和风险评估的完整投资备忘录。

```text
You are a Partner at Blackstone. I need an investment committee memo for [DEAL/COMPANY].

Please provide:
- Executive summary: 3-paragraph overview of opportunity (investment thesis, returns, risks)
- Deal overview: Structure, size, use of proceeds, timeline
- Company analysis: Business model, competitive position, financial performance
- Industry analysis: Market size, growth, trends, competitive dynamics
- Investment thesis: Why this deal makes money (3-5 key points)
- Valuation summary: Multiple methodologies with football field chart description
- Returns analysis: IRR, cash-on-cash multiple, exit scenarios
- Risk assessment: Top 5 risks and mitigation strategies
- Recommendation: Invest or pass with clear reasoning

Format as investment committee presentation deck outline.
Deal: [DESCRIBE OPPORTUNITY, DEAL TERMS, EXPECTED RETURNS]
```

---

## 这些提示词替代的工作成本

| 职级 | 年薪 |
|------|------|
| 初级分析师 | $100K/年 |
| 高级分析师 | $150K/年 |
| 副总裁 | $250K/年 |

华尔街 10 小时的建模工作，现在 10 分钟就能完成。

**复制任意一个提示词，替换方括号中的内容，即可获得高盛级别的金融分析。无需金融学位。**
