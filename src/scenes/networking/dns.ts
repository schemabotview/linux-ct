import type { Scene } from '@graphlearning/flow'

// §4 — two resolution paths that can disagree: getent follows nsswitch.conf (files first, so
// /etc/hosts wins), while dig asks a DNS server directly. Server-style nsswitch shown; Debian
// desktops add mdns. Addresses illustrative.
export const networkingDns: Scene = {
  id: 'networking-dns',
  title: 'How a name becomes an address',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'getent hosts reports.lab.example',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'nss', label: '1 · nsswitch.conf', sub: 'hosts: files dns', pattern: 'service', icon: 'sortarrows' },
        { id: 'files', label: '2 · /etc/hosts', sub: 'a local override, if listed', pattern: 'user', icon: 'file' },
        { id: 'resolv', label: '3 · resolv.conf', sub: 'which DNS server to ask', pattern: 'service', icon: 'gears' },
        { id: 'server', label: '4 · DNS server', sub: 'answers; caches by TTL', pattern: 'network', icon: 'globe' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ getent hosts reports.lab.example     # what programs will use
10.0.0.99       reports.lab.example        # from /etc/hosts
$ dig +short reports.lab.example        # DNS only (bind9-dnsutils)
192.168.1.20
$ grep reports /etc/hosts
10.0.0.99  reports.lab.example         # a forgotten test entry`,
    },
    {
      id: 'lesson',
      label: 'When they disagree',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'trust', label: 'Trust getent', sub: 'it follows the real lookup order', icon: 'search' },
        { id: 'ttl', label: 'Caches', sub: 'old answers live until the TTL ends', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'session' },
    { source: 'session', target: 'lesson' },
  ],
}
