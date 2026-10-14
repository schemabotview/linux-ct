import type { Section } from '../types'

export const scriptsAndInvocation: Section = {
  id: 'scripts-and-invocation',
  title: 'Script files, shebangs and arguments',
  scene: 'scripting-invocation',
  focus: 'ways',
  slide: `## Script files, shebangs and arguments

A script is a text file of commands. The first line, the **shebang** \`#!\`, tells the kernel which **interpreter** to run it with.

### Running it
- \`./make-report\` — uses the shebang; needs the **x** bit
- \`bash make-report\` — names the interpreter directly
- \`sh make-report\` — on Debian, \`sh\` is **dash**, not Bash: Bash syntax breaks
- \`source make-report\` — runs inside **this** shell; its \`cd\` and variables stay

### Arguments
- \`$1\`, \`$2\` … each argument; \`$#\` how many; \`$0\` the script's name
- \`"$@"\` — all of them, each kept as one word

### Diagnostics go to stderr
- \`>&2\` keeps messages out of the script's real output`,
  narration:
    "This chapter turns the commands you've learned into make-report, a small script that summarises a day of incoming records. A script is just a text file of commands. Its first line, starting with hash bang, is called the shebang, and it tells the kernel which interpreter should run the file. Here it is slash bin slash bash. The lines after it name the two arguments the script expects, and the last line prints a diagnostic. Note the greater than ampersand two at the end: diagnostics go to standard error, so they never mix with the report on standard output. The table compares four ways to run the same file. Dot slash make-report asks the kernel to execute it, which needs the execute bit, set once with chmod plus x, and then the shebang decides the interpreter. bash make-report names the interpreter yourself, so no execute bit is needed. sh make-report looks equivalent, but on Debian sh is dash, a smaller, faster shell without Bash's extensions. A Bash script run that way either fails or, worse, behaves subtly differently. And source runs the file inside your current shell, not in a child, so any cd or variable it sets remains afterwards. That's sometimes what you want for configuration, but rarely for a tool. Inside the script, dollar one and dollar two are the arguments, dollar hash counts them, dollar zero is the script's own name, and quoted dollar at passes all of them on, each intact. Next: making decisions.",
}
