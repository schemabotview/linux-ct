import type { Section } from '../types'

export const inodesAndLinks: Section = {
  id: 'inodes-and-links',
  title: 'Inodes, hard links and symbolic links',
  scene: 'files-links',
  focus: 'inode',
  slide: `## Inodes, hard links and symbolic links

A directory is a list of **names pointing at inodes**. The inode holds the file; a name is just one way to reach it.

### Hard link
- A **second name** for the same inode — equal to the first
- The inode counts its names: **Links: 2**
- Same filesystem only; not for directories

### Symbolic link
- A small file that **stores a path**, followed when used
- Can cross filesystems and point at directories
- If the target goes, the link **dangles**

### Object lifetime
- The data is freed only when **no names** remain **and no process** has it open
- Removing a name is **not** the same as reclaiming space`,
  narration:
    "Here is the model that explains a lot of surprising behaviour. A directory is just a table of names, and each name points at an inode. The inode is the file: its metadata and its data. The name is only a way of reaching it. A hard link is a second name pointing at the same inode. The diagram shows the October twelfth report reachable from reports and from archive. Neither name is the original; they are equal, and the inode simply counts them, Links two. Hard links only work within one filesystem, and not for directories. A symbolic link is different in kind. It is a tiny file whose content is a path, and the kernel follows that path each time the link is used. It can point across filesystems and at directories, but it depends on the path still being there. The session shows the consequence. After removing reports slash oct twelve, the hard link in archive still reads the data, because the inode still has one name. The symbolic link called latest now points at a path that no longer exists, so it dangles: No such file or directory. And this brings us to object lifetime. The kernel frees an inode's data only when its link count reaches zero and no process still has the file open. That is why deleting a large log that a running program is writing to can free no space at all. The last lines of the session show exactly that: after removing big dot log, the file descriptor of the process still writing it points at the same file, now marked deleted. The name is gone; the file is not. Chapter eight returns to this when disks fill up. Next: how the kernel walks a path.",
}
