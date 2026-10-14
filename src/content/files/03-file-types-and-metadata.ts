import type { Section } from '../types'

export const fileTypesAndMetadata: Section = {
  id: 'file-types-and-metadata',
  title: 'File types and metadata',
  scene: 'files-metadata',
  focus: 'stat',
  slide: `## File types and metadata

A file is **content plus metadata**. The metadata — type, size, owner, permissions, times — lives in the file's **inode**, not in its name.

### Reading the evidence
- \`ls -l\` — the first character is the **type**: \`-\` file, \`d\` directory, \`l\` symlink
- \`stat\` — everything the inode records, including its number and link count
- \`file\` — looks at the **content** and guesses what it is

### Three timestamps, often confused
- **Modify** — content last written
- **Change** — metadata last changed (permissions, owner, links)
- **Birth** — creation, only where the filesystem records it

### The traps
- The extension is a naming habit; nothing enforces it
- **ctime is not creation time**`,
  narration:
    "A file is more than its bytes. It also carries metadata: what type of object it is, how big, who owns it, who may read or write it, and when things happened to it. All of that lives in a structure called the inode, and, as the next sections show, the name is stored somewhere else entirely. The first card is ls dash l on the lab directory. Read the first character of each line. A dash is a regular file, d is a directory, and l is a symbolic link, which ls helpfully shows pointing at its target. Then come permissions, the link count, the owner and group, the size and the modification time. stat shows the same inode in full. It adds the inode number and the times, and there are three of them that people regularly confuse. Modify is when the content was last written. Change is when the metadata last changed, for example a chmod or a new hard link. And Birth is creation time, which only some filesystems record. So ctime, the change time, is not creation time, whatever its name suggests. Finally, file ignores the name and reads the first bytes of content to guess what kind of data it is. That matters, because nothing on Linux enforces extensions. A file called dot csv can contain anything, and a program with no extension at all is perfectly normal. When it matters, check the content. Next, the commands that create, copy, move and remove files.",
}
