import type { Section } from '../types'

export const tracingSystemCalls: Section = {
  id: 'tracing-system-calls',
  title: 'System-call tracing and observation overhead',
  scene: 'diagnosis-strace',
  focus: 'trace',
  slide: `## System-call tracing and observation overhead

\`strace\` shows each **system call** a process makes, its arguments and its result — the exact conversation between program and kernel.

### Reading the trace
- \`openat(…) = -1 ENOENT\` — a missing file, retried
- \`= -1 EACCES\` — permission denied, by name
- \`fsync(7) = 0 <2.871>\` — **2.9 seconds** in one call *(-T)*

### What it confirmed
- The 2.5 report calls \`fsync\` after **every row**
- That is the bulk writing behind the queue

### Before you attach it
- It needs permission to trace — usually **root**
- The traced process runs **much slower**
- Output contains **real data**: paths, contents, tokens
- Narrow with \`-e trace=\`, keep it short, then detach`,
  narration:
    "When metrics say something is wrong but not why, you can watch a process directly. strace shows each system call it makes, every request to the kernel, with its arguments, its result and, with dash capital T, how long it took. Here it is attached to the running nightly report, process fifty-one twenty, showing only two kinds of call: opening files and fsync. The first two lines show the report trying to open store twelve's CSV and getting ENOENT, no such file, twice. That's chapter two's error, now reported by name, and it's a separate bug worth noting. The third line is an EACCES, permission denied, on an archive index, chapter four's error. And the fourth line is the answer to our question. A single fsync took two point eight seven seconds. The summary mode, dash c, totals time per system call, and it shows that the new report calls fsync after every row it writes. Chapter eight explained what fsync costs: each call waits until data reaches stable storage. Thousands of them, one after another, produce exactly the deep write queue iostat showed. The prediction from the previous section is confirmed. Now the plan's cautions, which are not optional. strace needs permission to trace the process, normally root. It slows the traced process considerably, so on a struggling production service, it can make things worse. And it prints real data: file contents, paths, sometimes passwords or tokens, which then sit in your terminal and logs. Trace narrowly, briefly, and then detach. Next: why reportd was killed when the host had memory to spare.",
}
