import type { Section } from '../types'

export const pathResolutionAndMounts: Section = {
  id: 'path-resolution-and-mounts',
  title: 'Path resolution and mounts',
  scene: 'files-resolution',
  focus: 'var',
  slide: `## Path resolution and mounts

The kernel resolves a path **one component at a time**, checking each directory as it goes.

### Each step can stop the walk
- Every directory on the way needs **search (x)** permission
- A **symlink** is replaced by its target path, and the walk continues
- A **mount point** switches to another filesystem — the name does not show it

### Two failures that look alike
- **No such file or directory** — a name is missing
- **Permission denied** — a directory on the way cannot be searched
- Find the step: check each parent before touching the file itself

### One namespace
- \`findmnt --target <path>\` shows which filesystem holds a path`,
  narration:
    "When a program opens slash var slash lib slash reportd slash state dot db, the kernel does not look up that string in one go. It walks it, one component at a time, as the numbered steps show. It starts at the root directory. It looks up var in the root. Here, var is a mount point: a whole separate filesystem, on a different disk, has been attached at that name. The walk carries on inside the new filesystem, and nothing in the path tells you that happened. Then it looks up lib, then reportd, and finally state dot db. At every directory along the way, the kernel checks that the caller has search permission, the x bit, on that directory. And if any component is a symbolic link, its stored path is spliced in and walked in turn. This model turns two confusing error messages into precise evidence. No such file or directory means some name along the path does not exist. Permission denied means a directory on the way could not be searched, even if the file itself would be readable. In the second example, sam's home directory is mode seven hundred, which Debian twelve and later use for new home directories, so the walk stops there. When access fails, check each parent directory in turn before changing anything on the file itself. Finally, findmnt dash dash target tells you which filesystem actually holds a path, which matters the moment one disk fills up and another does not. Next: viewing and editing text, and the invisible differences between files.",
}
