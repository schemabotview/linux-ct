import type { Scene } from '@graphlearning/flow'

// §6 — the plan's four look-alike failures from the client side, and what each does and does not
// establish. curl 8.x message wording; hosts and ports illustrative.
export const networkingDiagnosis: Scene = {
  id: 'networking-diagnosis',
  title: 'Four failures that look alike',
  flow: 'TB',
  nodes: [
    {
      id: 'curls',
      kind: 'code',
      filename: 'bash — curl from a client, illustrative output',
      label: `$ curl reports.lab.exmaple/reports/latest
curl: (6) Could not resolve host: reports.lab.exmaple
$ curl 192.168.1.20:8080/reports/latest
curl: (7) Failed to connect to 192.168.1.20 port 8080 after 1 ms: Couldn't connect to server
$ curl --connect-timeout 5 192.0.2.10:8080/reports/latest
curl: (28) Failed to connect to 192.0.2.10 port 8080 after 5002 ms: Timeout was reached
$ curl -si 127.0.0.1:8080/reports/latest | head -1
HTTP/1.1 503 Service Unavailable`,
    },
    {
      id: 'meaning',
      kind: 'table',
      label: 'What each one tells you',
      headers: ['symptom', 'suggests', 'does not prove'],
      values: [
        ['could not resolve', 'name lookup failed', 'that the server is down'],
        ['refused, fast', 'host reached; nothing listening there', 'the app is broken'],
        ['timeout', 'packets dropped on the way', 'which hop dropped them'],
        ['HTTP 503', 'network fine; the app answered', 'anything about the network'],
      ],
    },
    {
      id: 'ping',
      label: 'And ping?',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'icmp', label: 'Ping fails', sub: 'ICMP is often filtered', icon: 'ban' },
        { id: 'app', label: 'Ask the app', sub: 'test the real port and protocol', icon: 'plug' },
      ],
    },
  ],
  edges: [
    { source: 'curls', target: 'meaning' },
    { source: 'meaning', target: 'ping' },
  ],
}
