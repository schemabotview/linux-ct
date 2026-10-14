import type { Scene } from '@graphlearning/flow'

// §8 — find as the live search, and choosing an inspection tool by the question being asked. The
// find predicates are GNU findutils; plocate is a Debian package, not installed by default.
export const filesFinding: Scene = {
  id: 'files-finding',
  title: 'Finding and inspecting',
  flow: 'TB',
  nodes: [
    {
      id: 'find',
      kind: 'code',
      filename: 'bash — GNU find, illustrative output',
      label: `$ find ~/lab/reportd -name '*.csv' -mtime -1 -size +1k
/home/learner/lab/reportd/incoming/store-07.csv
/home/learner/lab/reportd/incoming/store-12.csv
#      └ where   └ name pattern  └ <1 day  └ >1 KiB
$ find ~/lab/reportd -xtype l            # dangling symlinks
/home/learner/lab/reportd/latest`,
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Pick the tool by the question',
      headers: ['question', 'tool'],
      values: [
        ['what kind of content is it?', 'file'],
        ['size, owner, times, inode?', 'stat'],
        ['the first or last lines?', 'head, tail'],
        ['read the whole thing safely?', 'less'],
        ['the exact bytes?', 'od -c'],
      ],
    },
    {
      id: 'live',
      label: 'Live walk or index',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'walk', label: 'find', sub: 'walks the tree now: current, slower', icon: 'tree' },
        { id: 'index', label: 'plocate', sub: 'reads an index: fast, can be stale', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'find', target: 'choose', label: 'then inspect' },
    { source: 'choose', target: 'live' },
  ],
}
