import type { Section } from '../types'

export const createCopyMoveRemove: Section = {
  id: 'create-copy-move-remove',
  title: 'Creating, copying, moving and removing',
  scene: 'files-operations',
  focus: 'effects',
  slide: `## Creating, copying, moving and removing

Four commands do most of the work. Each changes something different, and **none of them asks before overwriting** unless told to.

### What really happens
- \`mkdir -p\` — creates every missing directory, quietly skips existing ones
- \`cp\` — a **new** file with a new inode; \`-p\` keeps times and mode
- \`mv\` — on one filesystem, a **rename**: same inode, new name
- \`rm\` — removes names; there is **no recycle bin**

### Work defensively
- Practise in **disposable paths**, such as \`~/lab/reportd/scratch\`
- \`-i\` asks before overwrite or removal; \`-b\` keeps a backup
- \`ls\` a pattern **before** handing it to \`rm\``,
  narration:
    "Most file work comes down to four commands, and the useful skill is predicting exactly what each one changes. The session on the left runs inside the lab directory. mkdir dash p creates reports and scratch, making any missing parent directories and staying quiet if they already exist. cp copies app dot log into scratch. A copy is a brand new file: new inode, new bytes, and with dash p it keeps the original's times and permissions. mv then renames the copy. Within one filesystem, a move does not touch the data at all; it changes a name and keeps the same inode, which is why moving a huge file is instant. ls dash i proves it, printing inode numbers: the original and the copy have different ones, and the renamed file kept the copy's. Moving across filesystems is different, and becomes a copy followed by a delete. Now the dangerous part. cp and mv both overwrite an existing target without asking, and rm has no recycle bin. Once a name is removed, the shell offers no way back. So build some habits. Practise in disposable directories, like scratch here, named explicitly. Use dash i to be asked before each overwrite or removal, or dash b to keep a backup of whatever would be replaced. And before handing a wildcard pattern to rm, run ls with the same pattern and read what it matches. Next: what a name actually is, and why removing one may not free any space.",
}
