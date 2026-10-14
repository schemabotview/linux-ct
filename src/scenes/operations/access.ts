import type { Scene } from '@graphlearning/flow'

// §2 — patching with Debian's unattended-upgrades, and the plan's illustration: an SSH change made
// with a recovery path. sshd -t validates; `reload` keeps existing sessions; a second session tests
// before the first one closes. Debian 13's ssh unit is ssh.service.
export const operationsAccess: Scene = {
  id: 'operations-access',
  title: 'Patching and safe access changes',
  flow: 'TB',
  nodes: [
    {
      id: 'patch',
      kind: 'code',
      filename: 'bash — security updates, illustrative output',
      label: `$ sudo apt install unattended-upgrades      # daily security updates
$ sudo unattended-upgrade --dry-run -d | tail -1
No packages found that can be upgraded unattended
$ sudo needrestart -r l                     # old code still running (needrestart pkg)`,
    },
    {
      id: 'ssh',
      kind: 'code',
      filename: '/etc/ssh/sshd_config.d/50-hardening.conf',
      label: `PasswordAuthentication no
PermitRootLogin no
AllowGroups sudo reportd-admins`,
    },
    {
      id: 'steps',
      label: 'Changing SSH without locking yourself out',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'keep', label: '1 · Keep session A', sub: 'do not close it until step 4', pattern: 'user', icon: 'terminal' },
        { id: 'test', label: '2 · sshd -t', sub: 'syntax check before reload', pattern: 'service', icon: 'circlecheck' },
        { id: 'reload', label: '3 · reload ssh', sub: 'existing sessions survive', pattern: 'service', icon: 'repeat' },
        { id: 'second', label: '4 · Log in as B', sub: 'works? close A. fails? undo in A', pattern: 'warn', icon: 'key' },
      ],
    },
  ],
  edges: [
    { source: 'patch', target: 'ssh', label: 'then access' },
    { source: 'ssh', target: 'steps', label: 'apply it' },
  ],
}
