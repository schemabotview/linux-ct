import type { Section } from '../types'

export const capacityAndInodes: Section = {
  id: 'capacity-and-inodes',
  title: 'Capacity, inodes and deleted-open files',
  scene: 'storage-capacity',
  focus: 'causes',
  slide: `## Capacity, inodes and deleted-open files

"No space left on device" has more than one cause, and the usual tools can **disagree**. Use each for what it measures.

### Three views
- \`df -h\` — blocks used, as the **filesystem** counts them
- \`df -i\` — **inodes** used: one per file, fixed when created
- \`du -sh\` — adds up the files it can **reach by name**

### When df says full and du does not
- A **deleted file still open** — \`lsof +L1\` finds the holder
- Files **hidden under a mount point** — invisible to du
- ext4's **reserved blocks** for root

### When blocks are free but writes fail
- **Inodes are exhausted** — millions of tiny files
- **Quotas** can cap one user or group`,
  narration:
    "reportd starts failing with no space left on device, and the investigation shows why you should know exactly what each tool measures. df dash h reports slash var completely full: one hundred and eighty-six gigabytes used. df dash i counts inodes, the per-file records from chapter two, and only four percent are used, so it isn't a flood of tiny files. Then du dash s h adds up everything it can reach under slash var by name, and finds only seventy-one gigabytes. Over a hundred gigabytes are unaccounted for. The table lists the usual reasons df and du disagree. The first is the one from chapters two and six: a file that has been deleted but is still held open. Its blocks are still allocated, so df counts them, but it has no name, so du can't see it. lsof plus L one lists open files with no remaining links, and here it is: reportd still writing to a log file that someone deleted, now a hundred and fifteen gigabytes. Restarting reportd, or telling it to reopen its logs, releases the space. The second reason is files hidden under a mount point. If data was written into a directory before another filesystem was mounted on top of it, those files still use space, but no path reaches them until you unmount. The third is ext4's reserved blocks, kept back for root by default. And the reverse case exists too. If inodes run out, writes fail even with gigabytes of free blocks. Quotas can also cap a single user or group. Next: pooling disks, and what redundancy does not protect.",
}
