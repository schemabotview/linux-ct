import type { Scene } from '@graphlearning/flow'

// §6 — the plan's pipeline over sample ERROR lines: uniq only merges ADJACENT duplicates, so it
// needs sort first. Then the limit of line tools: cut splits on every comma, including one inside a
// quoted CSV field.
export const shellSortUniq: Scene = {
  id: 'shell-sort-uniq',
  title: 'Counting with sort and uniq',
  flow: 'TB',
  nodes: [
    {
      id: 'pipeline',
      kind: 'code',
      filename: 'bash — counting failures per store, illustrative output',
      label: `$ grep ERROR app.log | cut -d' ' -f3
store-07
store-12
store-07
$ grep ERROR app.log | cut -d' ' -f3 | uniq -c
      1 store-07                # not adjacent: not merged
      1 store-12
      1 store-07
$ grep ERROR app.log | cut -d' ' -f3 | sort | uniq -c | sort -rn
      2 store-07
      1 store-12`,
    },
    {
      id: 'stages',
      label: 'One job per stage',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'g', label: 'grep', sub: 'keep lines', pattern: 'service', icon: 'funnel' },
        { id: 'c', label: 'cut', sub: 'keep a field', pattern: 'service', icon: 'scissors' },
        { id: 's', label: 'sort', sub: 'group equal lines', pattern: 'service', icon: 'sortarrows' },
        { id: 'u', label: 'uniq -c', sub: 'count each run', pattern: 'service', icon: 'hash' },
      ],
    },
    {
      id: 'csv',
      kind: 'code',
      filename: 'bash — where line tools stop fitting',
      label: `$ cat incoming/stores.csv
store,city,records
store-07,"Leeds, UK",42
$ cut -d, -f3 incoming/stores.csv
records
 UK"                           # the quoted comma split the field`,
    },
  ],
  edges: [
    { source: 'pipeline', target: 'csv', label: 'lines and delimiters only' },
    { source: 'stages', target: 'csv' },
  ],
}
