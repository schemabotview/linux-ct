import type { Scene } from '@graphlearning/flow'

// §7 — sed for a bounded edit (stream first, in place only with a backup) and awk for a per-field
// summary. Debian's default awk is mawk; the program shown is POSIX awk and runs the same in gawk.
export const shellSedAwk: Scene = {
  id: 'shell-sed-awk',
  title: 'sed edits, awk summarises',
  flow: 'TB',
  nodes: [
    {
      id: 'sed',
      kind: 'code',
      filename: 'bash — GNU sed: substitute, preview first',
      label: `$ sed 's/store-0\\?7/store-07/' incoming/day.csv | head -3
$ sed -i.bak 's/store-0\\?7/store-07/' incoming/day.csv
$ ls incoming/day.csv*
incoming/day.csv  incoming/day.csv.bak   # .bak: the rollback`,
    },
    {
      id: 'awk',
      kind: 'code',
      filename: 'bash — awk: total records per store',
      label: `$ cat incoming/day.csv
store-07,2026-10-12,42
store-12,2026-10-12,17
store-07,2026-10-12,8
$ awk -F, '{ total[$1] += $3 }
           END { for (s in total) print s, total[s] }' incoming/day.csv
store-07 50
store-12 17`,
    },
    {
      id: 'bounds',
      label: 'Keep them bounded',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'preview', label: 'Preview', sub: 'stream to the screen before -i', icon: 'search' },
        { id: 'order', label: 'Order', sub: 'for (s in …) is unordered: pipe to sort', icon: 'sortarrows' },
        { id: 'grow', label: 'Growing?', sub: 'past a few lines, write a script', icon: 'filecode' },
      ],
    },
  ],
  edges: [
    { source: 'sed', target: 'awk' },
    { source: 'bounds', target: 'awk' },
  ],
}
