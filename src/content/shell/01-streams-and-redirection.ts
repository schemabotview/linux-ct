import type { Section } from '../types'

export const streamsAndRedirection: Section = {
  id: 'streams-and-redirection',
  title: 'Standard streams and redirection',
  scene: 'shell-redirection',
  focus: 'order',
  slide: `## Standard streams and redirection

Every process starts with three open **file descriptors**. Redirection changes where they point **before** the program runs.

### The three streams
- **0 stdin** — input; \`< file\` reads from a file
- **1 stdout** — results; \`>\` replaces a file, \`>>\` appends
- **2 stderr** — errors and diagnostics; \`2>\` sends them elsewhere

### Order matters
- Redirections apply **left to right**
- \`2>&1\` means "fd 2 now points **where fd 1 points at this moment**"
- \`>out 2>&1\` — both streams into \`out\`
- \`2>&1 >out\` — errors still on the terminal

### Useful targets
- \`/dev/null\` discards whatever is written to it`,
  narration:
    "So far each command has printed straight to the terminal. In fact every process starts with three open file descriptors, numbered zero, one and two. Zero is standard input, where a program reads. One is standard output, for results. Two is standard error, for error messages and diagnostics. By default all three are connected to your terminal, which is why results and errors appear mixed together. Redirection lets the shell connect them somewhere else before the program even starts. Less than reads input from a file. Greater than sends standard output to a file, replacing it, and double greater than appends. Two greater than redirects standard error. Now the detail that catches everyone. Redirections are applied from left to right, and two greater than ampersand one does not mean join the streams forever. It means: make descriptor two point wherever descriptor one points right now. The table traces both orders. In the first, greater than out moves descriptor one to the file, then two is pointed at the same place, so both lines land in out. In the second, two is copied from one while one still points at the terminal, and only afterwards does one move to the file. The error stays on screen. The session below shows exactly that, using ls on one name that exists and one that doesn't, which conveniently produces one line on each stream. And slash dev slash null is a special file that discards anything written to it. Next: connecting one command's output to another's input.",
}
