import type { Scene } from '@graphlearning/flow'

// §9 — reportd's [Service] section after review: its own identity, restart policy with a limit,
// resource controls (cgroup v2) and sandboxing. All are systemd.exec(5) / systemd.resource-control(5)
// directives; the exposure score wording is systemd-analyze security's.
export const servicesHardening: Scene = {
  id: 'services-hardening',
  title: 'Least privilege for a service',
  flow: 'TB',
  nodes: [
    {
      id: 'unit',
      kind: 'code',
      filename: 'reportd.service — [Service] after review',
      label: `[Service]
User=reportd
StateDirectory=reportd        # /var/lib/reportd, owned by reportd
LogsDirectory=reportd         # /var/log/reportd
Restart=on-failure
RestartSec=5s
MemoryMax=256M                # a cgroup limit: OOM-killed above it
CPUQuota=50%
NoNewPrivileges=yes
ProtectSystem=strict          # the whole OS read-only…
ProtectHome=yes               # …and no /home at all
PrivateTmp=yes`,
    },
    {
      id: 'groups',
      label: 'Four kinds of control',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'who', label: 'Identity', sub: 'its own user, its own dirs', pattern: 'user', icon: 'fingerprint' },
        { id: 'restart', label: 'Supervision', sub: 'restart, but not forever', pattern: 'service', icon: 'repeat' },
        { id: 'limits', label: 'Resources', sub: 'memory and CPU ceilings', pattern: 'storage', icon: 'gauge' },
        { id: 'sandbox', label: 'Sandbox', sub: 'sees only what it needs', pattern: 'network', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'check',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ systemd-analyze security reportd.service | tail -1
→ Overall exposure level for reportd.service: 4.9 OK`,
    },
  ],
  edges: [
    { source: 'unit', target: 'check', label: 'measure it' },
    { source: 'groups', target: 'check' },
  ],
}
