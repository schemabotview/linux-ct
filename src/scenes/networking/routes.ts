import type { Scene } from '@graphlearning/flow'

// §2 — the routing table and the question the kernel answers for every packet: which route matches
// most specifically, and is the next hop the destination itself or a gateway? `ip route get`
// shows the decision for one address.
export const networkingRoutes: Scene = {
  id: 'networking-routes',
  title: 'Routes and next hops',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ ip route
default via 192.168.1.1 dev enp1s0 proto dhcp
192.168.1.0/24 dev enp1s0 proto kernel scope link src 192.168.1.20
$ ip route get 192.168.1.30            # a neighbour: delivered directly
192.168.1.30 dev enp1s0 src 192.168.1.20
$ ip route get 9.9.9.9                 # elsewhere: via the gateway
9.9.9.9 via 192.168.1.1 dev enp1s0 src 192.168.1.20`,
    },
    {
      id: 'decision',
      label: 'For each packet',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'match', label: '1 · Match', sub: 'longest prefix that contains it', pattern: 'service', icon: 'search' },
        { id: 'direct', label: '2a · On-link', sub: 'send straight to the host', pattern: 'network', icon: 'link' },
        { id: 'gw', label: '2b · via gateway', sub: 'send to the router instead', pattern: 'network', icon: 'router' },
        { id: 'default', label: 'default', sub: '0.0.0.0/0: matches anything', pattern: 'external', icon: 'globe' },
      ],
    },
    {
      id: 'reach',
      label: 'A route is not reachability',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'oneway', label: 'Both directions', sub: 'the reply needs a route back', icon: 'swap' },
        { id: 'path', label: 'Every hop', sub: 'each router decides again', icon: 'workflow' },
      ],
    },
  ],
  edges: [
    { source: 'table', target: 'decision' },
    { source: 'decision', target: 'reach' },
  ],
}
