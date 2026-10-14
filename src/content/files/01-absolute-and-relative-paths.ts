import type { Section } from '../types'

export const absoluteAndRelativePaths: Section = {
  id: 'absolute-and-relative-paths',
  title: 'Absolute and relative paths',
  scene: 'files-paths',
  focus: 'resolve',
  slide: `## Absolute and relative paths

Every file is reached by a **path**: directory names joined by \`/\`. What a path means depends on **where it starts**.

### Two kinds of path
- **Absolute** — starts with \`/\`, means the same thing from anywhere
- **Relative** — no leading \`/\`, resolved from the **current directory**
- \`.\` is this directory, \`..\` is its parent

### Shortcuts the shell adds
- \`~\` is your home directory, \`cd -\` returns to the previous one
- These are **Bash expansions**: they happen before the command runs

### The contrast
- \`ls ~/lab\` works; \`ls "~/lab"\` fails
- Quoted, \`~\` reaches the program as a literal character — and no directory is called \`~\``,
  narration:
    "Commands act on files, and every file is reached by a path: a list of directory names joined by slashes. The question is always where the path starts. An absolute path begins with a slash, the root of the tree, so slash etc slash hostname means the same file no matter where you are. A relative path has no leading slash, and it is resolved from the current directory, the one we met in chapter one. The table shows four paths written from the lab directory. incoming slash a dot csv simply continues downward. dot dot means the parent, so dot dot slash reportd slash app dot log climbs one level and comes straight back, which looks pointless but is legal and resolves to the same file. Single dot means the current directory itself. The session below the table moves around with cd. cd dot dot climbs, and cd dash returns to wherever you were before. Then there is tilde. Tilde is not part of the filesystem at all. Bash replaces it with your home directory before the command ever runs. That is why the two commands at the bottom behave differently. ls tilde slash lab works, because Bash expanded it. Put it in quotes, and Bash leaves it alone, so ls receives a literal tilde and looks for a directory with that name, which does not exist. Knowing which layer interprets a character will come back again and again in chapter three. Next: what the top-level directories are for.",
}
