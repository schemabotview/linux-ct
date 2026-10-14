import type { Scene } from '@graphlearning/flow'

// §3 — listening sockets read with ss (iproute2): the bind address decides who can connect at all.
// reportd listens on loopback only; sshd on every address. Process column needs root to show other
// users' processes; trimmed.
export const networkingSockets: Scene = {
  id: 'networking-sockets',
  title: 'Ports, sockets, bind addresses',
  flow: 'TB',
  nodes: [
    {
      id: 'ss',
      kind: 'code',
      filename: 'bash — sudo ss -lntp, illustrative, trimmed',
      label: `State  Local Address:Port  Process
LISTEN 127.0.0.1:8080       users:(("reportd",pid=3410,fd=5))
LISTEN 0.0.0.0:22           users:(("sshd",pid=612,fd=3))
LISTEN [::]:22              users:(("sshd",pid=612,fd=4))
# -l listening  -n numbers, not names  -t TCP  -p process`,
    },
    {
      id: 'bind',
      kind: 'table',
      label: 'Who can connect, by bind address',
      headers: ['listening on', 'reachable from'],
      values: [
        ['127.0.0.1:8080', 'this host only'],
        ['192.168.1.20:8080', 'anything that can route to that address'],
        ['0.0.0.0:8080 or [::]:8080', 'every address the host has'],
      ],
    },
    {
      id: 'proto',
      label: 'Two transports',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'tcp', label: 'TCP', sub: 'connection, ordered, retransmitted', pattern: 'service', icon: 'link' },
        { id: 'udp', label: 'UDP', sub: 'single datagrams; no connection', pattern: 'network', icon: 'zap' },
      ],
    },
  ],
  edges: [
    { source: 'ss', target: 'bind' },
    { source: 'bind', target: 'proto' },
  ],
}
