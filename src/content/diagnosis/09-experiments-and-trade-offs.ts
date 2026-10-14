import type { Section } from '../types'

export const experimentsAndTradeOffs: Section = {
  id: 'experiments-and-trade-offs',
  title: 'Performance trade-offs, experiments and confirmation',
  scene: 'diagnosis-experiment',
  focus: 'result',
  slide: `## Performance trade-offs, experiments and confirmation

A fix is a **hypothesis** too. Change **one** thing, measure it the **same way**, and keep the rollback ready.

### The experiment
- **One change**: commit every 1000 rows, not every row
- **Same measurement**: replay Tuesday's report on the same host
- **Rollback**: the previous config, one restart away

### The result
- Report: 7 h 30 min → **19 min**
- Write latency: 39 ms → **2 ms**; user p95: 8.1 s → **0.45 s**

### Every gain has a cost
- A power cut mid-report could now lose up to **1000 rows**
- Acceptable here: the report is **idempotent**, so a rerun repairs it
- **Write down** what changed, why, and the evidence`,
  narration:
    "The evidence points at the new report calling fsync after every row. The fix is also a hypothesis, and it gets tested the same way. The plan at the top has four parts. Make one change only: here, a configuration setting that commits every thousand rows instead of every row. If you change three things at once and the problem goes away, you won't know which one mattered, or what the other two broke. Measure it the same way as before: replay Tuesday's report on the same host, under the same load, so before and after are comparable. Keep the rollback ready: the previous configuration file is saved, and going back is one restart. And record what you did. The table shows the result. The report now takes nineteen minutes instead of seven and a half hours. Write latency during the report falls from thirty-nine milliseconds to two. And the number users actually feel, the ninety-fifth percentile response time, falls from eight seconds back to under half a second, close to last week's baseline. The last row is the trade-off, and it belongs in the table, not in a footnote. Committing every thousand rows means a power cut in the middle of the report could lose up to a thousand rows instead of one. That's acceptable here, because chapter five made the report idempotent: rerunning it rebuilds the missing rows. For a payments system, the answer might be different. Every performance gain has a cost somewhere. Diagnosis is complete when you can state the cause, the evidence and the cost. Next chapter: security, recovery and operating the whole system.",
}
