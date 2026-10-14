import type { Section } from '../types'

export const correlatingEvidence: Section = {
  id: 'correlating-evidence',
  title: 'Correlating logs, metrics and recent changes',
  scene: 'diagnosis-correlate',
  focus: 'caution',
  slide: `## Correlating logs, metrics and recent changes

Each source shows one layer. Put them on **one timeline** and look for what **changed** first.

### Sources
- **Change records** — \`/var/log/apt/history.log\`, deploy notes
- **Logs** — \`journalctl --since … --until …\` for each unit
- **Metrics** — the iostat and latency numbers already gathered

### What the timeline shows
- reportd **2.5** was installed at 01:40
- The nightly report then ran for **7.5 hours** instead of 20 minutes
- Write latency and user latency rose **together**

### One correlated metric is not a cause
- Two things starting together may share a **third** cause
- A real cause **predicts** something new — test that prediction`,
  narration:
    "Each tool so far has shown one layer. The next step is to put everything on a single timeline, because the order in which things changed is often the strongest evidence you have. The table merges four sources for Tuesday. apt's history log records every package transaction, and at one forty, reportd was upgraded from two point four to two point five. At two, the journal shows the nightly report starting, as it always does. From two until nine thirty, iostat shows write latency rising from one millisecond to thirty-nine. At nine, the access log shows user latency at eight seconds and five oh threes beginning. And at nine thirty, the journal shows the report finally finishing. It normally takes twenty minutes; this time it took seven and a half hours. The card shows the commands that built it: apt's history log for changes, and journalctl with since and until for each unit's view of the same window. It's very tempting to stop here and declare the upgrade guilty. But the plan's caution belongs exactly at this point. A correlation is not a cause. The upgrade and the long report both start around two, so which one is responsible? Perhaps the new version's report writes differently. Perhaps the report was always going to be slow on Tuesdays and the upgrade is a coincidence. Or a third thing explains both. A genuine cause predicts something you haven't observed yet. If the new report is the cause, then watching it should show what it is doing to the disk. That's the next section: watching the report's system calls.",
}
