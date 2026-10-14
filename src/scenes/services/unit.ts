import type { Scene } from '@graphlearning/flow'

// §5 — reportd's unit file and a local override. `After=` only orders; `Wants=`/`Requires=` pull
// units in. network-online.target is the documented way to wait for configured networking.
// Overrides go in a drop-in so a package upgrade never overwrites them.
export const servicesUnit: Scene = {
  id: 'services-unit',
  title: 'A unit file and a drop-in',
  flow: 'TB',
  nodes: [
    {
      id: 'unit',
      kind: 'code',
      filename: '/etc/systemd/system/reportd.service',
      label: `[Unit]
Description=reportd: daily store reports over HTTP
Wants=network-online.target          # pull it in…
After=network-online.target          # …and start after it

[Service]
User=reportd
ExecStart=/opt/reportd/bin/reportd --config /etc/reportd/reportd.conf

[Install]
WantedBy=multi-user.target           # used by "enable"`,
    },
    {
      id: 'dropin',
      kind: 'code',
      filename: 'sudo systemctl edit reportd → …/reportd.service.d/override.conf',
      label: `[Service]
Environment=REPORTD_LISTEN=127.0.0.1:8080
$ systemctl cat reportd       # the file AND every drop-in, in order`,
    },
    {
      id: 'deps',
      kind: 'table',
      label: 'Ordering is not requirement',
      headers: ['directive', 'starts the other unit?', 'waits for it?'],
      values: [
        ['After=B', 'no', 'yes, if both are starting'],
        ['Wants=B', 'yes', 'no'],
        ['Requires=B', 'yes; stops with it', 'no'],
        ['Wants=B + After=B', 'yes', 'yes'],
      ],
    },
  ],
  edges: [
    { source: 'unit', target: 'dropin', label: 'local change' },
    { source: 'dropin', target: 'deps' },
  ],
}
