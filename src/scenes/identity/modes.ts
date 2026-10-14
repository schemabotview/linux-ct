import type { Scene } from '@graphlearning/flow'

// §2 — what r, w and x mean on a file versus a directory, and the plan's illustration: trace an
// access failure through every parent with namei -l (util-linux) BEFORE touching the file's mode.
export const identityModes: Scene = {
  id: 'identity-modes',
  title: 'Permission bits',
  flow: 'TB',
  nodes: [
    {
      id: 'meaning',
      kind: 'table',
      label: 'One bit, two meanings',
      headers: ['bit', 'on a file', 'on a directory'],
      values: [
        ['r (4)', 'read the content', 'list the names in it'],
        ['w (2)', 'change the content', 'create, rename, delete entries'],
        ['x (1)', 'run it as a program', 'search: pass through, open by name'],
      ],
    },
    {
      id: 'trace',
      kind: 'code',
      filename: 'bash — as learner, illustrative output',
      label: `$ cat /srv/shared/reports/oct-12.csv
cat: /srv/shared/reports/oct-12.csv: Permission denied
$ namei -l /srv/shared/reports/oct-12.csv
f: /srv/shared/reports/oct-12.csv
drwxr-xr-x root    root    /
drwxr-xr-x root    root    srv
drwxr-x--- reportd reportd shared      # ← no x for "other": stops here
drwxr-xr-x reportd reportd reports
-rw-r--r-- reportd reportd oct-12.csv  # the file was never the problem`,
    },
    {
      id: 'reading',
      label: 'Reading -rwxr-x---',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'u', label: 'rwx · 7', sub: 'owner', pattern: 'user', icon: 'fingerprint' },
        { id: 'g', label: 'r-x · 5', sub: 'group', pattern: 'service', icon: 'users' },
        { id: 'o', label: '--- · 0', sub: 'everyone else', pattern: 'external', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'meaning', target: 'trace', label: 'check every parent' },
    { source: 'trace', target: 'reading', label: 'chmod 750 = this' },
  ],
}
