import type { Scene } from '@graphlearning/flow'

// §4 — where reportd's database password should and should not live, and protecting the evidence
// that audits it. LoadCredential= is systemd's credentials mechanism (systemd.exec(5)); journal
// read access on Debian is via the adm or systemd-journal groups.
export const operationsSecrets: Scene = {
  id: 'operations-secrets',
  title: 'Secrets and audit evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'where',
      kind: 'table',
      label: 'A password for reportd: where it ends up',
      headers: ['placed in', 'also readable via'],
      values: [
        ['Environment= in the unit', 'systemctl show, /proc/<pid>/environ'],
        ['the command line', 'ps, by every user'],
        ['a 0644 file in /etc', 'anyone on the host'],
        ['LoadCredential= (0600, root)', 'only reportd, at run time'],
      ],
    },
    {
      id: 'unit',
      kind: 'code',
      filename: 'reportd.service — credentials, not environment',
      label: `[Service]
LoadCredential=db-password:/etc/reportd/credentials/db-password
# reportd reads $CREDENTIALS_DIRECTORY/db-password`,
    },
    {
      id: 'evidence',
      label: 'Keep the evidence trustworthy',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'who', label: 'Who can read', sub: 'adm, systemd-journal groups', pattern: 'user', icon: 'users' },
        { id: 'ship', label: 'Ship it off', sub: 'a root attacker can edit local logs', pattern: 'network', icon: 'share' },
        { id: 'keep', label: 'Keep it long', sub: 'incidents are found weeks later', pattern: 'storage', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'where', target: 'unit' },
    { source: 'unit', target: 'evidence', label: 'and audit it' },
  ],
}
