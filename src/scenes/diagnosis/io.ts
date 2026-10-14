import type { Scene } from '@graphlearning/flow'

// §4 — storage I/O read with iostat -x (sysstat): throughput, latency (await), queue depth (aqu-sz)
// and %util. On SSD/NVMe, which serve many requests in parallel, 100 %util does not mean
// saturated. Output illustrative, columns trimmed.
export const diagnosisIo: Scene = {
  id: 'diagnosis-io',
  title: 'Throughput, latency, queues',
  flow: 'TB',
  nodes: [
    {
      id: 'iostat',
      kind: 'code',
      filename: 'bash — iostat -x 5, illustrative, trimmed',
      label: `Device     r/s    w/s   rkB/s   wkB/s r_await w_await aqu-sz  %util
nvme0n1   42.0  910.0   1680  118400    0.41   38.90  35.40  99.80
#         └ requests/s ┘ └ throughput  ┘ └ latency, ms ┘ └ queue ┘`,
    },
    {
      id: 'quantities',
      label: 'Four different quantities',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'thru', label: 'Throughput', sub: 'kB per second moved', pattern: 'service', icon: 'waves' },
        { id: 'lat', label: 'Latency', sub: 'await: ms per request', pattern: 'warn', icon: 'clock' },
        { id: 'queue', label: 'Queue', sub: 'aqu-sz: requests waiting', pattern: 'network', icon: 'boxes' },
        { id: 'util', label: '%util', sub: 'time with ≥1 request busy', pattern: 'storage', icon: 'gauge' },
      ],
    },
    {
      id: 'reading',
      kind: 'table',
      label: 'Reading this one',
      headers: ['observation', 'interpretation'],
      values: [
        ['w_await 38.9 ms, r_await 0.4 ms', 'writes are queueing; reads are fine'],
        ['aqu-sz 35', 'a deep queue: something writes in bulk'],
        ['%util 99.8 on NVMe', 'busy, but not proof of saturation'],
      ],
    },
  ],
  edges: [
    { source: 'iostat', target: 'quantities' },
    { source: 'quantities', target: 'reading', label: 'together' },
  ],
}
