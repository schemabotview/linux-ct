import type { Section } from '../types'

export const memoryAndOom: Section = {
  id: 'memory-and-oom',
  title: 'Memory, reclaim, swap pressure and OOM',
  scene: 'diagnosis-memory',
  focus: 'signals',
  slide: `## Memory, reclaim, swap pressure and OOM

Linux uses spare memory as **cache**, so "free" is usually low on a healthy system. Pressure shows in **behaviour**, not in that number.

### Signs of real pressure
- \`vmstat\` \`si\`/\`so\` — pages swapped **in and out**, sustained
- \`/proc/pressure/memory\` — the share of time tasks **stalled** waiting for memory
- **available** low and still falling

### When reclaim is not enough
- The **OOM killer** ends a process to free memory
- It leaves a line in the **kernel log**: who, and how big

### Free memory is not memory pressure
- Cache is **given back on demand**
- Judge by **stalls and swapping**, not by "free"`,
  narration:
    "The second suspect is memory, and the most common mistake is reading free memory as the measure of health. Chapter eight showed why it isn't. Linux deliberately fills spare RAM with cache, and gives it back the moment programs need it. A healthy busy server often has very little free memory. Pressure shows up as behaviour instead, and the card gathers three kinds of evidence. vmstat, sampled every five seconds, has swap columns. si and so are pages swapped in and swapped out per second. Occasional swapping is normal. Sustained swapping in both directions, as here, means the system keeps evicting memory it needs again soon after, which is called thrashing. The second source is pressure stall information, in slash proc slash pressure slash memory. It reports the share of recent time that some tasks, or all tasks, were stalled waiting for memory. Thirty-one percent over the last ten seconds is a lot of lost work. The third is the kernel log. When reclaim can't free enough, the out-of-memory killer picks a process and ends it, and logs which one and how much memory it held. Here it killed reportd, and the message begins with memory cgroup, a detail section eight will explain. The table summarises the signals worth trusting. So, free memory is not memory pressure. Judge memory by stalls, swapping and the OOM log. Next: storage, and the difference between busy and slow.",
}
