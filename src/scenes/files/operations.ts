import type { Scene } from '@graphlearning/flow'

// §4 — the four everyday operations, observed with inode numbers so the difference between a new
// object and a renamed one is visible. Everything happens inside ~/lab/reportd; the removal names
// an explicit disposable path.
export const filesOperations: Scene = {
  id: 'files-operations',
  title: 'mkdir, cp, mv, rm',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — inside ~/lab/reportd, illustrative output',
      label: `$ mkdir -p reports scratch
$ cp -p app.log scratch/app.copy     # new file, new inode
$ mv scratch/app.copy scratch/old.log  # same inode, new name
$ ls -i app.log scratch/old.log
1311907 app.log
1311944 scratch/old.log
$ rm -ri scratch                     # asks per file; no undo
rm: descend into directory 'scratch'? y`,
    },
    {
      id: 'effects',
      kind: 'table',
      label: 'What each one actually changes',
      headers: ['command', 'on the same filesystem', 'risk'],
      values: [
        ['mkdir -p', 'adds directory entries', 'none: -p skips existing'],
        ['cp', 'new inode, copied bytes', 'overwrites a target silently'],
        ['mv', 'renames: same inode', 'overwrites a target silently'],
        ['rm', 'removes a name', 'no recycle bin'],
      ],
    },
    {
      id: 'guards',
      label: 'Guards worth typing',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'i', label: '-i', sub: 'ask before overwrite or removal', icon: 'shieldcheck' },
        { id: 'b', label: '-b', sub: 'keep a backup of the target', icon: 'copy' },
        { id: 'look', label: 'ls first', sub: 'see what a pattern matches', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'session', target: 'effects', label: 'inode numbers show it' },
    { source: 'effects', target: 'guards' },
  ],
}
