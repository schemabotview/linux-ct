import type { Scene } from '@graphlearning/flow'

// §1 — interfaces and their addresses, read from `ip address` (iproute2), and what a prefix length
// means. Addresses are from documentation and private ranges; interface name is a typical
// predictable name.
export const networkingAddresses: Scene = {
  id: 'networking-addresses',
  title: 'Interfaces and addresses',
  flow: 'TB',
  nodes: [
    {
      id: 'ip',
      kind: 'code',
      filename: 'bash — ip address, illustrative, trimmed',
      label: `$ ip address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: enp1s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500
    link/ether 52:54:00:3a:7c:01
    inet 192.168.1.20/24 brd 192.168.1.255 scope global enp1s0
    inet6 2001:db8:1::20/64 scope global
    inet6 fe80::5054:ff:fe3a:7c01/64 scope link`,
    },
    {
      id: 'prefix',
      kind: 'table',
      label: 'Reading 192.168.1.20/24',
      headers: ['part', 'value', 'meaning'],
      values: [
        ['network (first 24 bits)', '192.168.1.0', 'the local subnet'],
        ['host (last 8 bits)', '.20', 'this machine on it'],
        ['usable hosts', '.1 – .254', '254 neighbours, no router needed'],
      ],
    },
    {
      id: 'kinds',
      label: 'Address kinds on one host',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'loop', label: 'Loopback', sub: '127.0.0.1, ::1: this host only', pattern: 'user', icon: 'repeat' },
        { id: 'global', label: 'Global', sub: 'reachable across routers', pattern: 'network', icon: 'globe' },
        { id: 'link', label: 'Link-local', sub: 'fe80::: this cable only', pattern: 'storage', icon: 'link' },
      ],
    },
  ],
  edges: [
    { source: 'ip', target: 'prefix' },
    { source: 'prefix', target: 'kinds' },
  ],
}
