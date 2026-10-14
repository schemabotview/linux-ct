import type { Scene } from '@graphlearning/flow'

// §8 — the plan's closing diagram: reportd's files, identity, unit, listener, storage, logs, limits
// and recovery plan in one board, each card naming the chapter that built it, then the next
// evidence to collect when a symptom crosses layers. Further specialisation is on the slide only.
export const operationsLifecycle: Scene = {
  id: 'operations-lifecycle',
  title: 'reportd, end to end',
  flow: 'TB',
  nodes: [
    {
      id: 'service',
      label: 'reportd on one Debian 13 host',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'files', label: 'Files', sub: '/opt, /etc, /var/lib/reportd (2)', pattern: 'storage', icon: 'folder' },
        { id: 'identity', label: 'Identity', sub: 'user reportd, no shell (4)', pattern: 'user', icon: 'fingerprint' },
        { id: 'unit', label: 'Unit + timer', sub: 'reportd.service, nightly (6)', pattern: 'service', icon: 'gears' },
        { id: 'listener', label: 'Listener', sub: '127.0.0.1:8080 behind TLS (7)', pattern: 'network', icon: 'plug' },
        { id: 'storage', label: 'Storage', sub: 'ext4 on vg0-var (8)', pattern: 'storage', icon: 'harddrive' },
        { id: 'logs', label: 'Logs', sub: 'journal + logrotate (6)', pattern: 'service', icon: 'scroll' },
        { id: 'limits', label: 'Limits', sub: 'MemoryMax, sandbox (6, 9)', pattern: 'warn', icon: 'gauge' },
        { id: 'recovery', label: 'Recovery', sub: 'backups, drill, runbook (8, 10)', pattern: 'user', icon: 'history' },
      ],
    },
    {
      id: 'crossing',
      kind: 'table',
      label: 'When a symptom crosses layers: the next evidence',
      headers: ['you see', 'next, check', 'because'],
      values: [
        ['503s from the proxy', 'reportd accept queue, journal', 'network symptom, app cause (9)'],
        ['writes fail, df shows space', 'df -i, lsof +L1', 'inodes or a deleted-open file (8)'],
        ['start fails after an update', 'journal → namei → AppArmor', 'three access checks (4, 10)'],
        ['OOM-killed, host has RAM', 'memory.max, memory.events', 'the cgroup limit (9)'],
      ],
    },
  ],
  edges: [
    { source: 'service', target: 'crossing', label: 'when something breaks' },
  ],
}
