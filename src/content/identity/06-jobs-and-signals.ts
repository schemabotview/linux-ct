import type { Section } from '../types'

export const jobsAndSignals: Section = {
  id: 'jobs-and-signals',
  title: 'Jobs, sessions and signals',
  scene: 'identity-signals',
  focus: 'table',
  slide: `## Jobs, sessions and signals

A **signal** is a short notification the kernel delivers to a process. Most can be **handled**; two cannot.

### Job control in Bash
- \`&\` runs in the background; \`jobs\` lists them
- **Ctrl-Z** stops the foreground job; \`bg\` and \`fg\` resume it
- \`kill %1\` signals job 1

### Choose a proportionate signal
- **TERM** — "please finish": the program can clean up first
- **INT** — Ctrl-C; **HUP** — the terminal went away
- **KILL** — cannot be caught: no cleanup, no flushing

### KILL is not instant
- A task blocked **inside the kernel** (state **D**) only goes when that operation returns
- Send TERM, wait, then escalate`,
  narration:
    "Processes need to be controlled from outside: paused, resumed and stopped. The mechanism is the signal, a small numbered notification that the kernel delivers to a process. The session shows Bash's job control. sleep three hundred with an ampersand runs in the background, and jobs lists it as job one. kill percent one sends it a signal, and jobs then reports it terminated. Next, make-report runs in the foreground, and pressing control Z stops it, pausing it rather than ending it. bg resumes it in the background, and fg would bring it back to the front. The table lists the signals you will actually send. Control C sends INT. kill, and systemctl stop, send TERM by default. HUP is sent when the terminal goes away. Control Z sends TSTP. All of these can be caught by the program, which is the point: on TERM, a well-written program finishes the current record, flushes its output, removes temporary files and exits cleanly. KILL is different. It cannot be caught or ignored at all. The process gets no chance to clean up, which is exactly why it should be your last resort, not your first. So the proportionate sequence is TERM, wait a little, and only then KILL. And even KILL is not instant. A process blocked inside the kernel, for example waiting on a stuck network filesystem, shows state D in ps, and it will not disappear until that kernel operation returns. Next: what happens after a process exits.",
}
