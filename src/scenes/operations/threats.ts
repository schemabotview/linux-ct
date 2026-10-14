import type { Scene } from '@graphlearning/flow'

// §1 — a small threat model for reportd's host and the evidence that measures its attack surface:
// listening sockets, accounts with sudo, set-user-ID programs, installed packages. Output
// illustrative, trimmed.
export const operationsThreats: Scene = {
  id: 'operations-threats',
  title: 'Threats and attack surface',
  flow: 'TB',
  nodes: [
    {
      id: 'model',
      kind: 'table',
      label: 'reportd’s host: what could go wrong, and the control',
      headers: ['threat', 'reaches us through', 'control'],
      values: [
        ['stolen SSH key', 'port 22, a sudo account', 'keys only, few sudoers, logs'],
        ['bug in reportd', 'the proxy on 443', 'own user, sandbox, loopback bind'],
        ['malicious package', 'a third-party repository', 'Debian sources only'],
        ['operator mistake', 'a root shell', 'sudo per command, backups'],
      ],
    },
    {
      id: 'surface',
      kind: 'code',
      filename: 'bash — measure the surface, illustrative output',
      label: `$ sudo ss -lntu | awk 'NR>1 {print $1, $5}'
tcp 127.0.0.1:8080
tcp 0.0.0.0:22
tcp 0.0.0.0:443
$ getent group sudo
sudo:x:27:learner,sam
$ find / -xdev -perm -4000 -type f 2>/dev/null | wc -l
14                          # set-user-ID programs: review new ones
$ dpkg -l | grep -c '^ii'
612                         # every package is code you trust`,
    },
    {
      id: 'principles',
      label: 'Three principles',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'owner', label: 'Named owners', sub: 'someone answers for each part', pattern: 'user', icon: 'users' },
        { id: 'least', label: 'Least privilege', sub: 'only what the job needs', pattern: 'service', icon: 'lock' },
        { id: 'small', label: 'Small surface', sub: 'remove what is not used', pattern: 'storage', icon: 'scissors' },
      ],
    },
  ],
  edges: [
    { source: 'model', target: 'surface', label: 'measure it' },
    { source: 'surface', target: 'principles' },
  ],
}
