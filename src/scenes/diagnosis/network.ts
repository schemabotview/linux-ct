import type { Scene } from '@graphlearning/flow'

// §5 — network evidence on the server side: a full accept queue on reportd's listening socket (for
// LISTEN sockets, ss shows the queue length as Recv-Q and its limit as Send-Q), retransmissions per
// connection, and interface drops. Output illustrative.
export const diagnosisNetwork: Scene = {
  id: 'diagnosis-network',
  title: 'Queues, retransmissions, bottlenecks',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — on reportd’s host, illustrative output',
      label: `$ ss -lnt 'sport = :8080'
State   Recv-Q Send-Q Local Address:Port
LISTEN  129    128    127.0.0.1:8080        # accept queue full
$ nstat -az TcpExtListenOverflows TcpRetransSegs
TcpExtListenOverflows   4410                # connections dropped
TcpRetransSegs           212                 # low: the path is fine`,
    },
    {
      id: 'where',
      kind: 'table',
      label: 'Where the bottleneck is',
      headers: ['evidence', 'points to'],
      values: [
        ['listen queue full, overflows rising', 'the app accepts too slowly'],
        ['retransmissions rising', 'loss on the path, or a congested link'],
        ['interface drops / errors', 'this host’s NIC or driver'],
        ['bytes/s at link speed', 'bandwidth itself'],
      ],
    },
    {
      id: 'lesson',
      label: 'A network symptom, an application cause',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'slow', label: 'Slow accept', sub: 'the queue fills behind the app', icon: 'clock' },
        { id: 'back', label: 'Look back', sub: 'why is the app slow? CPU, I/O?', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'where' },
    { source: 'where', target: 'lesson' },
  ],
}
