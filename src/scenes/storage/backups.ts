import type { Scene } from '@graphlearning/flow'

// §7 — consistency and retention for reportd's state. A snapshot of a running database is only
// crash-consistent; the database's own backup is application-consistent. sqlite3 .backup uses
// SQLite's online backup API. Paths illustrative.
export const storageBackups: Scene = {
  id: 'storage-backups',
  title: 'Snapshots, backups, retention',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Two kinds of consistent',
      headers: ['method', 'captures', 'consistent as'],
      values: [
        ['LVM / filesystem snapshot', 'every block at one instant', 'after a crash: may need recovery'],
        ['the app’s own backup', 'a state the app vouches for', 'the application: ready to use'],
      ],
    },
    {
      id: 'job',
      kind: 'code',
      filename: 'reportd backup — application-consistent, then off the host',
      label: `$ sqlite3 /var/lib/reportd/state.db \\
    ".backup /var/backups/reportd/state-$(date +%F).db"
$ tar -czf /var/backups/reportd/reports-$(date +%F).tar.gz \\
    -C /var/lib/reportd reports
$ rsync -a /var/backups/reportd/ backup.lab.example:reportd/   # another host`,
    },
    {
      id: 'retention',
      label: 'Keep, and how long',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'daily', label: '7 daily', sub: 'yesterday’s mistake', pattern: 'service', icon: 'calendar' },
        { id: 'weekly', label: '4 weekly', sub: 'last month’s mistake', pattern: 'service', icon: 'history' },
        { id: 'offsite', label: 'One copy away', sub: 'different host, different site', pattern: 'storage', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'job' },
    { source: 'job', target: 'retention' },
  ],
}
