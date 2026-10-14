import type { Scene } from '@graphlearning/flow'

// §5 — recovery objectives, and the plan's supplied restore evidence as a timeline: dependencies
// first, then data, then validation of the application data, not just of the files. Times and counts
// illustrative.
export const operationsRestore: Scene = {
  id: 'operations-restore',
  title: 'Recovery objectives and a tested restore',
  flow: 'TB',
  nodes: [
    {
      id: 'objectives',
      label: 'Two numbers to agree in advance',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'rpo', label: 'RPO: 24 h', sub: 'data you can afford to lose', pattern: 'storage', icon: 'history' },
        { id: 'rto', label: 'RTO: 2 h', sub: 'time until it works again', pattern: 'service', icon: 'clock' },
      ],
    },
    {
      id: 'timeline',
      kind: 'table',
      label: 'Quarterly restore drill, onto a scratch host',
      headers: ['time', 'step', 'evidence'],
      values: [
        ['00:00', 'host built, reportd 2.6 installed', 'apt, systemctl status'],
        ['00:18', 'state-2026-10-12.db copied back', 'sha256 matches the backup log'],
        ['00:21', 'database integrity checked', 'PRAGMA integrity_check: ok'],
        ['00:24', 'reports archive extracted', '412 files, as recorded'],
        ['00:31', 'GET /reports/latest', '200, rows match Oct 12 totals'],
      ],
    },
    {
      id: 'validate',
      kind: 'code',
      filename: 'bash — validate the data, not just the files',
      label: `$ sqlite3 state.db 'PRAGMA integrity_check;'
ok
$ sqlite3 state.db "SELECT count(*) FROM records WHERE day='2026-10-12';"
48112                          # the backup log recorded 48112`,
    },
  ],
  edges: [
    { source: 'objectives', target: 'timeline', label: 'prove them' },
    { source: 'timeline', target: 'validate' },
  ],
}
