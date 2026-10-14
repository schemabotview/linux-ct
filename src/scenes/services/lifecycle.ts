import type { Scene } from '@graphlearning/flow'

// §6 — the verbs that are routinely confused, and readiness: with Type=simple systemd reports
// "active" as soon as the process exists, before reportd is listening. Type=notify waits for the
// program to say READY=1. Symlink message is systemd 257's wording; illustrative.
export const servicesLifecycle: Scene = {
  id: 'services-lifecycle',
  title: 'start, enable, reload, ready',
  flow: 'TB',
  nodes: [
    {
      id: 'verbs',
      kind: 'table',
      label: 'Which one do you mean?',
      headers: ['command', 'effect', 'survives reboot?'],
      values: [
        ['systemctl start', 'run it now', 'no'],
        ['systemctl enable', 'start at boot (a symlink)', 'yes — not started now'],
        ['systemctl enable --now', 'both', 'yes'],
        ['systemctl daemon-reload', 'systemd re-reads unit files', '—'],
        ['systemctl reload', 'the app re-reads ITS config', '—'],
        ['systemctl restart', 'stop, then start', '—'],
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ sudo systemctl enable reportd
Created symlink '/etc/systemd/system/multi-user.target.wants/reportd.service'
  → '/etc/systemd/system/reportd.service'.
$ systemctl is-active reportd
inactive                                  # enabled ≠ running
$ sudo systemctl start reportd && curl -s 127.0.0.1:8080/reports/latest
curl: (7) Failed to connect to 127.0.0.1 port 8080   # started ≠ ready`,
    },
    {
      id: 'ready',
      label: 'When is it "started"?',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'simple', label: 'Type=simple', sub: 'as soon as the process exists', icon: 'zap' },
        { id: 'notify', label: 'Type=notify', sub: 'when the app says READY=1', icon: 'bell' },
      ],
    },
  ],
  edges: [
    { source: 'verbs', target: 'session' },
    { source: 'session', target: 'ready' },
  ],
}
