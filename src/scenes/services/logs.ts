import type { Scene } from '@graphlearning/flow'

// §7 — a failed start read from status and the journal: status=217/USER means systemd could not
// switch to User=reportd because the account does not exist yet. Then reportd's own log files and
// their rotation. Output illustrative, trimmed.
export const servicesLogs: Scene = {
  id: 'services-logs',
  title: 'The journal and log files',
  flow: 'TB',
  nodes: [
    {
      id: 'failed',
      kind: 'code',
      filename: 'bash — a failed start, illustrative output',
      label: `$ systemctl status reportd
× reportd.service - reportd: daily store reports over HTTP
     Active: failed (Result: exit-code) since Mon 2026-10-12 10:02:11 UTC
    Process: 3301 ExecStart=/opt/reportd/bin/reportd … (code=exited, status=217/USER)
$ journalctl -u reportd -b -p warning      # this unit, this boot, warnings+
reportd.service: Failed to determine user credentials: No such process
reportd.service: Failed at step USER spawning /opt/reportd/bin/reportd: No such process
$ sudo adduser --system --group --home /var/lib/reportd reportd   # the fix`,
    },
    {
      id: 'rotate',
      kind: 'code',
      filename: '/etc/logrotate.d/reportd',
      label: `/var/log/reportd/*.log {
    weekly
    rotate 8                 # keep eight old files
    compress
    missingok
    postrotate
        systemctl kill -s HUP reportd.service   # reopen: no deleted-open file
    endscript
}`,
    },
    {
      id: 'where',
      label: 'Two places logs live',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'journal', label: 'The journal', sub: 'stdout/stderr of every unit; size-capped', pattern: 'storage', icon: 'scroll' },
        { id: 'files', label: 'App log files', sub: '/var/log/reportd: rotated by logrotate', pattern: 'service', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'failed', target: 'rotate' },
    { source: 'rotate', target: 'where' },
  ],
}
