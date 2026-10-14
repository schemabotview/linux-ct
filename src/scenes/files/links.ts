import type { Scene } from '@graphlearning/flow'

// §5 — two hard links to one inode, a symbolic link to a pathname, and the object's lifetime: data
// is freed when no name AND no open descriptor refers to it. The deleted-open line is the lsof
// shape on Debian; numbers illustrative.
export const filesLinks: Scene = {
  id: 'files-links',
  title: 'Names, inodes, and lifetime',
  flow: 'TB',
  nodes: [
    {
      id: 'model',
      label: 'Two kinds of link',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'hard1', label: 'reports/oct-12.csv', sub: 'name → inode 1311950', pattern: 'user', icon: 'file' },
        { id: 'hard2', label: 'archive/oct-12.csv', sub: 'hard link: same inode', pattern: 'user', icon: 'copy' },
        { id: 'inode', label: 'Inode 1311950', sub: 'metadata + data; Links: 2', pattern: 'storage', icon: 'database' },
        { id: 'sym', label: 'latest', sub: 'symlink: stores a path', pattern: 'external', icon: 'link' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ ln reports/oct-12.csv archive/oct-12.csv     # hard link
$ ln -s reports/oct-12.csv latest                # symbolic link
$ rm reports/oct-12.csv
$ head -1 archive/oct-12.csv                     # data survives
date,source,records
$ cat latest
cat: latest: No such file or directory           # dangling
$ rm big.log                       # process 4182 still writes it
$ readlink /proc/4182/fd/3
/home/learner/lab/reportd/big.log (deleted)      # name gone, file not`,
    },
    {
      id: 'lifetime',
      label: 'Removing a name is not freeing space',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'names', label: 'Other names', sub: 'Links > 0 keeps the data', icon: 'link' },
        { id: 'open', label: 'Open files', sub: 'a process holding it keeps it', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'model', target: 'session' },
    { source: 'lifetime', target: 'session', label: 'freed when both reach 0' },
  ],
}
