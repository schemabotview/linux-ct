import type { Scene } from '@graphlearning/flow'

// §9 — the path a public request takes to reportd, with each control that can stop it. nftables is
// Debian's firewall framework; this ruleset is a minimal illustration, not a recommended policy.
// TLS terminates at the reverse proxy; reportd itself stays on loopback.
export const networkingExposure: Scene = {
  id: 'networking-exposure',
  title: 'Firewalls, TLS and exposure',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'https://reports.lab.example/reports/latest',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'upstream', label: '1 · Upstream', sub: 'router or cloud firewall: 443 only', pattern: 'external', icon: 'shieldcheck' },
        { id: 'host', label: '2 · Host firewall', sub: 'nftables: 22 and 443 in', pattern: 'network', icon: 'shieldcheck' },
        { id: 'proxy', label: '3 · Reverse proxy', sub: ':443, TLS ends here', pattern: 'service', icon: 'lock' },
        { id: 'app', label: '4 · reportd', sub: '127.0.0.1:8080, plain HTTP', pattern: 'user', icon: 'server' },
      ],
    },
    {
      id: 'nft',
      kind: 'code',
      filename: '/etc/nftables.conf — minimal illustration',
      label: `table inet filter {
  chain input {
    type filter hook input priority 0; policy drop;
    ct state established,related accept      # replies to our traffic
    iif lo accept
    tcp dport { 22, 443 } accept
  }
}`,
    },
    {
      id: 'rules',
      label: 'Before you change it',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'session', label: 'Keep a session', sub: 'test from a second one', icon: 'terminal' },
        { id: 'console', label: 'Console path', sub: 'if SSH is cut off', icon: 'monitor' },
        { id: 'layers', label: 'Several layers', sub: 'any one can block', icon: 'layers' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'nft', label: 'layer 2, written out' },
    { source: 'nft', target: 'rules' },
  ],
}
