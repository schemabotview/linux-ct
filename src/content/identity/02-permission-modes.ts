import type { Section } from '../types'

export const permissionModes: Section = {
  id: 'permission-modes',
  title: 'Permission modes',
  scene: 'identity-modes',
  focus: 'trace',
  slide: `## Permission modes

Each file has three sets of **read, write, execute** bits: for its **owner**, its **group**, and **everyone else**. The first set that matches you is the only one used.

### Directories are different
- **r** — list the names inside
- **w** — create, rename or delete entries *(with x)*
- **x** — **search**: pass through, open things by name
- Deleting a file needs **w on its directory**, not on the file

### Trace before you chmod
- \`namei -l <path>\` shows every parent's mode and owner
- The failure is often a **parent directory**, not the file

### Numeric modes
- r=4, w=2, x=1, added per class: \`chmod 750\` is \`rwxr-x---\``,
  narration:
    "Every file carries nine permission bits, in three sets of three. Read, write and execute, for the owner, for the group, and for everyone else. When you access a file, the kernel picks one set, the first that applies to you: the owner set if you own it, otherwise the group set if you are in its group, otherwise the last set. Only that set is used. On a file, the bits mean what you would expect. On a directory, they mean something different, and the table spells it out. Read lets you list the names inside. Write lets you create, rename and delete entries, which also needs execute. And execute means search: permission to pass through the directory and open things inside it by name. That has a consequence people find surprising. Deleting a file needs write permission on the directory that contains it, not on the file itself. Now the plan's illustration. learner cannot read a report under slash srv slash shared. The tempting fix is to chmod the file. Instead, namei dash l walks the path and prints every component's mode and owner. Slash and srv are fine. shared is mode seven fifty, owned by reportd, and learner is neither the owner nor in the group, so the last set applies, and it has no x. The walk stops there. The file's own mode was never the problem, and changing it would have done nothing. Finally, numeric modes: read is four, write two, execute one, added up per set, so seven fifty is r w x, r dash x, nothing. Next: the defaults, and the bits beyond these nine.",
}
