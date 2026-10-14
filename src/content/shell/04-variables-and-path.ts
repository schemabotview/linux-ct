import type { Section } from '../types'

export const variablesAndPath: Section = {
  id: 'variables-and-path',
  title: 'Variables, environment and PATH',
  scene: 'shell-variables',
  focus: 'path',
  slide: `## Variables, environment and PATH

A **shell variable** lives inside one shell. The **environment** is the subset that is **copied** to every child process it starts.

### Shell variable or environment
- \`NAME=value\` — visible only in this shell
- \`export NAME\` — copied to children from now on
- A child gets a **copy**: it can never change its parent's

### How a command name is found
- Alias, then function, then built-in, then **PATH**
- \`PATH\` is a list of directories, searched **left to right**
- The first match wins; \`type -a name\` shows all of them

### The current directory is not searched
- \`make-report\` fails; \`./make-report\` says exactly where it is
- Deliberate: a file dropped in \`.\` cannot hijack a command`,
  narration:
    "Variables come in two flavours, and mixing them up is a classic source of it works in my terminal but not in the script. A plain assignment, like REPORT DIR equals a path, creates a shell variable. It exists only inside this one shell. The session proves it: a child bash, started with bash dash c, prints empty brackets because it never received the value. export marks the variable for the environment, and from then on every child process this shell starts gets a copy. That word copy matters. A child can change its own copy, but never its parent's, the same rule we met with cd. The environment also holds PATH, which is how Bash finds external commands. Bash first checks for an alias, then a shell function, then a built-in. Only if none matches does it search PATH, a colon-separated list of directories, from left to right, and run the first match it finds. type dash a lists every candidate, in order. The PATH shown is Debian's default for ordinary users. Notice what is missing from it: the current directory. That is why make-report, a script sitting in the lab directory, is reported as command not found, while dot slash make-report works, because it names the file directly. This is deliberate. If the current directory were searched, anyone able to drop a file called ls into a directory you visit could run code as you. Next: searching text with grep and regular expressions.",
}
