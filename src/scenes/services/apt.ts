import type { Scene } from '@graphlearning/flow'

// §2 — read the transaction before making it. Output in apt 3.0's layout (Debian 13); sizes
// illustrative. dpkg answers "what did this package install" and "which package owns this file".
export const servicesApt: Scene = {
  id: 'services-apt',
  title: 'apt and dpkg',
  flow: 'TB',
  nodes: [
    {
      id: 'preview',
      kind: 'code',
      filename: 'bash — apt 3.0, illustrative, trimmed',
      label: `$ apt install --simulate jq          # no root needed, changes nothing
Installing:
  jq
Installing dependencies:
  libjq1  libonig5
Summary:
  Upgrading: 0, Installing: 3, Removing: 0, Not Upgrading: 0
$ sudo apt install jq                 # the same, for real
$ dpkg -L jq | grep bin               # what it installed
/usr/bin/jq
$ dpkg -S /usr/bin/jq                 # who owns this file
jq: /usr/bin/jq`,
    },
    {
      id: 'verbs',
      kind: 'table',
      label: 'Changing the system',
      headers: ['command', 'does', 'configuration in /etc'],
      values: [
        ['apt update', 'refresh the indexes', 'untouched'],
        ['apt upgrade', 'newer versions of installed', 'yours kept; asks on conflict'],
        ['apt remove pkg', 'removes the program', 'kept'],
        ['apt purge pkg', 'removes program and config', 'deleted'],
      ],
    },
  ],
  edges: [{ source: 'preview', target: 'verbs', label: 'then decide' }],
}
