import type { Section } from '../types'

export const shellsAndCommands: Section = {
  id: 'shells-and-commands',
  title: 'Terminals, shells and commands',
  scene: 'foundations-command-path',
  focus: 'bash',
  slide: `## Terminals, shells and commands

The **terminal** only moves characters: your keys in, text out. The **shell** — here **Bash** — reads the line, works out what it means, and runs it.

### Two kinds of command
- **Built-in** — code inside Bash itself, like \`cd\` and \`echo\`
- **External** — a program file, like \`/usr/bin/ls\`, run as a **child process**
- \`type\` tells you which one you are about to run

### Why \`cd\` is built in
- Every process has its **own** current directory
- A child process cannot change its parent's
- So \`cd\` has to run **inside** the shell to move it

### Graphical applications
- Also processes, asking the same kernel — they draw windows instead of writing text`,
  narration:
    "Three different programs cooperate every time you run a command, and it pays to be able to name them. The terminal is the window, or the text console, that shows characters and sends your key presses. It does not understand commands at all. The shell does. On Debian, the interactive shell is Bash. It reads the line you typed, splits it into words, works out what the first word refers to, and then runs it. Some commands are built into Bash. Others are separate program files. For ls, Bash creates a child process, the fork, and that child replaces itself with the program at slash usr slash bin slash ls, the exec. ls then asks the kernel to read the directory through system calls, and its output travels back to the terminal. The type command tells you which kind of command a name is. type cd says shell builtin. type ls says it is an alias, a shortcut Debian's default configuration adds for colour, and type dash capital P shows the program file behind it. Here is why the difference matters. Every process has its own current directory. If cd were a separate program, it would change its own directory and then exit, and your shell would be exactly where it was. A child cannot change its parent. So cd has to run inside the shell. Graphical applications follow the same rules: they are processes too, they just draw windows. Next, your first session, read as evidence.",
}
