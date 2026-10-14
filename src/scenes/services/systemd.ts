import type { Scene } from '@graphlearning/flow'

// §4 — what systemd manages: units of several types, grouped by targets, in two managers (the
// system one as PID 1, and one per logged-in user). Output trimmed and illustrative.
export const servicesSystemd: Scene = {
  id: 'services-systemd',
  title: 'PID 1, units and targets',
  flow: 'TB',
  nodes: [
    {
      id: 'types',
      label: 'Unit types you will meet',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'service', label: '.service', sub: 'a process to run and supervise', pattern: 'service', icon: 'gears' },
        { id: 'timer', label: '.timer', sub: 'starts a service on a schedule', pattern: 'service', icon: 'clock' },
        { id: 'socket', label: '.socket', sub: 'a listener that starts a service', pattern: 'network', icon: 'plug' },
        { id: 'mount', label: '.mount', sub: 'a filesystem at a path', pattern: 'storage', icon: 'harddrive' },
        { id: 'target', label: '.target', sub: 'a named group: a goal state', pattern: 'user', icon: 'layers' },
        { id: 'path', label: '.path', sub: 'starts a service on file change', pattern: 'external', icon: 'folder' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ systemctl get-default
multi-user.target                      # the goal at boot (no desktop)
$ systemctl list-units --type=service --state=running
  UNIT                 LOAD   ACTIVE SUB     DESCRIPTION
  cron.service         loaded active running Regular background program …
  ssh.service          loaded active running OpenBSD Secure Shell server
  …
$ systemctl --user status              # your own manager, as learner`,
    },
    {
      id: 'managers',
      label: 'Two managers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'system', label: 'System', sub: 'PID 1, root: services for everyone', pattern: 'service', icon: 'server' },
        { id: 'user', label: 'Per user', sub: 'systemctl --user: your session', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'types', target: 'session' },
    { source: 'session', target: 'managers' },
  ],
}
