import type { Scene } from '@graphlearning/flow'

// §4 — sudo separates authentication (prove you are learner) from authorisation (sudoers says
// learner may run this as root), and logs both. The redirection trap: `>` is performed by YOUR
// shell before sudo runs. Root is UID 0, but capabilities, namespaces and AppArmor (on by default in
// Debian 13) can still limit a root process.
export const identitySudo: Scene = {
  id: 'identity-sudo',
  title: 'sudo and the privilege boundary',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'sudo apt update',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'authn', label: '1 · Authenticate', sub: 'your own password', pattern: 'user', icon: 'key' },
        { id: 'authz', label: '2 · Authorise', sub: 'sudoers: may learner?', pattern: 'service', icon: 'shieldcheck' },
        { id: 'log', label: '3 · Record', sub: 'who, where, what: journal', pattern: 'storage', icon: 'scroll' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — the tee line changes /etc/motd as root',
      label: `$ sudo -l
User learner may run the following commands on lab:
    (ALL : ALL) ALL                       # from the sudo group
$ sudo echo 'motd' > /etc/motd
bash: /etc/motd: Permission denied        # > ran in YOUR shell
$ echo 'motd' | sudo tee /etc/motd >/dev/null   # tee runs as root`,
    },
    {
      id: 'limits',
      label: 'Root is not unlimited',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'caps', label: 'Capabilities', sub: 'root split into named powers', icon: 'key' },
        { id: 'ns', label: 'Namespaces', sub: 'root in a container ≠ host root', icon: 'boxes' },
        { id: 'mac', label: 'AppArmor', sub: 'policy can still say no', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'steps', target: 'session' },
    { source: 'session', target: 'limits' },
  ],
}
