import type { Scene } from '@graphlearning/flow'

// §2 — the top-level directories by purpose, then where the recurring service will put each kind
// of thing in chapter 6. Debian 13 has merged /usr: /bin, /sbin and /lib are symlinks into /usr.
export const filesLayout: Scene = {
  id: 'files-layout',
  title: 'Where things live',
  flow: 'TB',
  nodes: [
    {
      id: 'tree',
      label: 'One tree, sorted by purpose',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'etc', label: '/etc', sub: 'system configuration', pattern: 'service', icon: 'gears' },
        { id: 'usr', label: '/usr', sub: 'installed programs and libraries', pattern: 'external', icon: 'package' },
        { id: 'var', label: '/var', sub: 'data that grows: logs, state', pattern: 'storage', icon: 'database' },
        { id: 'home', label: '/home', sub: 'one directory per user', pattern: 'user', icon: 'users' },
        { id: 'run', label: '/run', sub: 'runtime state, gone at reboot', pattern: 'network', icon: 'zap' },
        { id: 'proc', label: '/proc, /sys', sub: 'kernel views, not disk files', pattern: 'network', icon: 'cpu' },
      ],
    },
    {
      id: 'reportd',
      kind: 'table',
      label: 'Where reportd will live (chapter 6)',
      headers: ['path', 'holds', 'kind'],
      values: [
        ['/opt/reportd/', 'the application', 'add-on software'],
        ['/etc/reportd/reportd.conf', 'its settings', 'configuration'],
        ['/var/lib/reportd/', 'incoming and reports', 'persistent state'],
        ['/var/log/reportd/', 'its own log files', 'growing data'],
      ],
    },
    {
      id: 'merged',
      kind: 'code',
      filename: 'bash — Debian 13 merged /usr, illustrative output',
      label: `$ ls -ld /bin
lrwxrwxrwx 1 root root 7 Aug  9 11:02 /bin -> usr/bin`,
    },
  ],
  edges: [
    { source: 'tree', target: 'reportd', label: 'same rules, one service' },
    { source: 'reportd', target: 'merged' },
  ],
}
