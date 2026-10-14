import type { Scene } from '@graphlearning/flow'

// §5 — runtime changes (ip) versus persistent configuration (whichever manager the system uses).
// A Debian server install uses ifupdown by default; desktops use NetworkManager; systemd-networkd is
// available. Use the one the system already uses.
export const networkingConfig: Scene = {
  id: 'networking-config',
  title: 'Runtime and persistent configuration',
  flow: 'TB',
  nodes: [
    {
      id: 'runtime',
      kind: 'code',
      filename: 'bash — a runtime change, needs root',
      label: `$ sudo ip address add 192.168.1.50/24 dev enp1s0    # takes effect now…
$ sudo ip address del 192.168.1.50/24 dev enp1s0    # …the rollback
#  …and either way it is gone after a reboot or an interface restart`,
    },
    {
      id: 'persistent',
      kind: 'code',
      filename: '/etc/network/interfaces — ifupdown, Debian server default',
      label: `auto enp1s0
iface enp1s0 inet dhcp          # address, route and DNS from DHCP

iface enp1s0 inet6 auto         # IPv6 by router advertisement`,
    },
    {
      id: 'managers',
      kind: 'table',
      label: 'Who owns the configuration?',
      headers: ['manager', 'typical on', 'configured in'],
      values: [
        ['ifupdown', 'Debian servers', '/etc/network/interfaces'],
        ['NetworkManager', 'desktops, laptops', 'nmcli, /etc/NetworkManager/'],
        ['systemd-networkd', 'minimal and cloud images', '/etc/systemd/network/'],
      ],
    },
  ],
  edges: [
    { source: 'runtime', target: 'persistent', label: 'to keep it' },
    { source: 'persistent', target: 'managers' },
  ],
}
