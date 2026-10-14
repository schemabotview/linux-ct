import type { Section } from '../types'

export const firstSession: Section = {
  id: 'first-session',
  title: 'Identity, home and current directory',
  scene: 'foundations-first-session',
  focus: 'here',
  slide: `## Identity, home and current directory

A new shell already carries three facts. Read them **before** changing anything — they explain most "it worked for me" surprises.

### Who you are — \`id\`
- The kernel checks the **UID** and **groups**, not the name
- \`learner\` is a label the system maps to UID 1000

### Where home is — \`$HOME\`
- Set at login from your account; \`~\` expands to it
- Your files, settings and this course's **lab directory** live here

### Where you are now — \`pwd\`
- The **current directory** belongs to this shell process
- Names without a leading \`/\` are resolved **from here**
- Home and current directory start equal — then \`cd\` separates them
- This course works inside **\`~/lab/reportd\`**`,
  narration:
    "Let's read a first session as evidence. Every line here answers a question, and the habit of asking them before changing anything will save you a lot of confusion later. The first command is id. It shows your user ID, one thousand, your primary group, and the other groups you belong to. Notice that learner is in brackets. The kernel never checks names; it checks numbers, and the name is a label mapped onto the number. That distinction comes back in chapter four. Next, echo dollar HOME prints your home directory. It is set when you log in, from your account record, and the tilde character is shorthand for it. Then pwd, print working directory, shows where this shell currently is. Right after login, home and the current directory are the same place, which is why beginners often confuse them. They are different things. Home is fixed for your account. The current directory belongs to this one shell process, and it is what every relative name is resolved from. The next line creates the course's lab directory. mkdir dash p makes every missing level, and the double ampersand runs cd only if mkdir succeeded. Now pwd reports a different answer, while home has not moved. The box at the bottom shows why that matters. The name incoming, with no leading slash, is resolved from the current directory. From the lab directory, ls incoming finds it. From home, the very same command reports no such file. Nothing about the file changed; only where the shell was standing. Everything in this course happens under tilde slash lab slash reportd, a small project that will grow from a folder of records into a running service. Next: how to read a command line, and where to find its help.",
}
