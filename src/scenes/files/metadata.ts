import type { Scene } from '@graphlearning/flow'

// §3 — three inspection commands on the lab's files. `ls -l` and `stat` read metadata from the
// inode; `file` reads the first bytes of content. GNU coreutils 9 stat layout, trimmed.
export const filesMetadata: Scene = {
  id: 'files-metadata',
  title: 'Type, metadata, content',
  flow: 'TB',
  nodes: [
    {
      id: 'ls',
      kind: 'code',
      filename: 'bash — ls -l, illustrative output',
      label: `$ ls -l
-rw-r--r-- 1 learner learner 2140 Oct 12 09:14 app.log
drwxr-xr-x 2 learner learner 4096 Oct 12 09:02 incoming
lrwxrwxrwx 1 learner learner   18 Oct 12 09:20 latest -> reports/oct-12.csv
└ type: - file · d directory · l symlink`,
    },
    {
      id: 'stat',
      kind: 'code',
      filename: 'bash — stat app.log, trimmed',
      label: `  Size: 2140        Blocks: 8      regular file
 Inode: 1311907     Links: 1
Access: (0644/-rw-r--r--)  Uid: (1000/learner)
Modify: 2026-10-12 09:14:03   # content last written
Change: 2026-10-12 09:14:03   # metadata last changed
 Birth: 2026-10-12 08:55:41   # creation, if the fs records it`,
    },
    {
      id: 'traps',
      label: 'Two traps',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'file', label: 'file reads bytes', sub: 'file app.log: ASCII text', icon: 'search' },
        { id: 'ext', label: 'Names lie', sub: '.csv is a habit, not a type', icon: 'tag' },
        { id: 'ctime', label: 'Change ≠ birth', sub: 'ctime is not creation time', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'ls', target: 'stat', label: 'one inode, more detail' },
    { source: 'stat', target: 'traps' },
  ],
}
