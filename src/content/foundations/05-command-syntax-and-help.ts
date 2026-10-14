import type { Section } from '../types'

export const commandSyntaxAndHelp: Section = {
  id: 'command-syntax-and-help',
  title: 'Command syntax and finding help',
  scene: 'foundations-help',
  focus: 'synopsis',
  slide: `## Command syntax and finding help

You do not need to memorise options. You need to **read a synopsis** and know **which help system** documents the command.

### Reading a command line
- **Command** first, then **options**, then **arguments**
- \`-l\` is a short option; \`--sort=time\` is a long one with a value
- In a synopsis, \`[ ]\` is optional and \`...\` may repeat

### Where the help lives
- \`man ls\` — the manual page for a program
- \`help cd\` — Bash's own help for **built-ins**
- \`ls --help\` — a quick summary *(GNU convention)*

### Manual sections
- One name can mean several things: \`passwd(1)\` is a command, \`passwd(5)\` a file format
- \`man 5 passwd\` picks the section`,
  narration:
    "Nobody memorises every option of every command, and you shouldn't try. What you need instead is to read a command line, and to know where its documentation lives. Look at the annotated line in the middle of the scene. ls is the command. Dash l is a short option, one dash and one letter. Dash dash sort equals time is a long option with a value, and long options are a GNU convention you will see across Debian. incoming slash, at the end, is an argument: the thing the command acts on. The manual page summarises all of this in a synopsis line. Square brackets mean optional, and three dots mean the item may repeat. So ls, option repeated, file repeated, says that ls works with no options and no files at all, and with as many of each as you like. Now, where the help lives. man ls opens the manual page. But try man cd and Debian says there is no entry, because cd is not a program; it is part of Bash. For built-ins, ask Bash with help cd. Many GNU programs also print a quick summary with dash dash help. Finally, manual pages are split into numbered sections. Section one is user commands, five is file formats, seven is overviews, eight is administration commands. That matters when one name means two things. passwd in section one changes your password; passwd in section five describes the file that stores accounts. Last in this chapter: where your Linux is actually running.",
}
