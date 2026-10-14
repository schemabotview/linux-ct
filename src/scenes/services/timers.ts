import type { Scene } from '@graphlearning/flow'

// §8 — the nightly report as a timer plus a oneshot service, and the cron line it replaces.
// Persistent=true runs a missed 02:00 at the next boot; plain cron simply skips it.
export const servicesTimers: Scene = {
  id: 'services-timers',
  title: 'Timers and cron',
  flow: 'TB',
  nodes: [
    {
      id: 'timer',
      kind: 'code',
      filename: 'reportd-report.timer  +  reportd-report.service',
      label: `[Timer]                              # reportd-report.timer
OnCalendar=*-*-* 02:00:00
Persistent=true                      # run a missed slot at next boot
RandomizedDelaySec=5min

[Service]                            # reportd-report.service
Type=oneshot
User=reportd
ExecStart=/opt/reportd/bin/make-report \\
    /var/lib/reportd/incoming /var/lib/reportd/reports/latest.csv`,
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ systemctl list-timers reportd-report.timer
NEXT                        LEFT     LAST                        UNIT
Tue 2026-10-13 02:03:41 UTC 15h left Mon 2026-10-12 02:01:12 UTC reportd-report.timer
$ cat /etc/cron.d/reportd               # the cron equivalent
0 2 * * *  reportd  /opt/reportd/bin/make-report /var/lib/…`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Timer or cron',
      headers: ['', 'systemd timer', 'cron'],
      values: [
        ['missed while off', 'Persistent=true catches up', 'skipped'],
        ['logs', 'journalctl -u reportd-report', 'mail, if configured'],
        ['environment', 'the unit’s, explicit', 'PATH=/usr/bin:/bin'],
        ['overlapping runs', 'never: one start at a time', 'possible'],
      ],
    },
  ],
  edges: [
    { source: 'timer', target: 'evidence' },
    { source: 'evidence', target: 'compare' },
  ],
}
