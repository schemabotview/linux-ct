import type { Section } from '../types'

export const findingFiles: Section = {
  id: 'finding-files',
  title: 'Finding files and choosing inspection tools',
  scene: 'files-finding',
  focus: 'find',
  slide: `## Finding files and choosing inspection tools

\`find\` walks a directory tree **right now** and tests every entry against the conditions you give it.

### Reading a find command
- **Where** to start, then **tests**: name, type, age, size
- Tests are combined with AND by default
- Quote the pattern — \`'*.csv'\` is for find, not for the shell

### Live walk or index
- \`find\` is always current, but slower on large trees
- \`plocate\` searches a prebuilt index: fast, but can be **stale** *(not installed by default)*

### Then pick the tool by the question
- Type, metadata, start or end, the whole file, or the exact bytes
- Start with the **least invasive** tool: look before you open an editor`,
  narration:
    "The last skill in this chapter is finding things, and then looking at them with the right tool. find walks a directory tree as it exists right now, and tests every entry against the conditions you give it. Read the first command left to right. Start at the lab directory. Match names ending in dot csv. Modified less than one day ago. Larger than one kibibyte. The tests are combined with AND, so only files passing all of them are printed. Notice the quotes around star dot csv. Without them, Bash would try to expand the pattern itself, against the current directory, before find ever saw it. That is chapter three's subject, but the habit starts here. The second command uses dash xtype l to list dangling symbolic links, like the one we created two sections ago. Because find walks the live tree, it is always accurate, but it can be slow on a large one. The alternative, plocate, searches a prebuilt index of file names. It is very fast, but only as current as its last update, and Debian does not install it by default. Once you have found a file, choose the inspection tool by the question you are asking, as the table shows. file for what kind of content, stat for size, owner and times, head and tail for the start and the end, less to read the whole thing safely, and od for the exact bytes. Start with the least invasive tool. That completes the filesystem. Next chapter: connecting commands together.",
}
