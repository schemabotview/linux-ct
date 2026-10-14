import type { Scene } from '@graphlearning/flow'

// §3 — free memory is not pressure. Pressure shows as reclaim, swapping (vmstat si/so) and PSI
// stall time (/proc/pressure/memory, kernel PSI docs). The OOM killer leaves its record in the
// kernel log — here a cgroup's, which §8 explains. Output illustrative.
export const diagnosisMemory: Scene = {
  id: 'diagnosis-memory',
  title: 'Memory, reclaim, swap, OOM',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ vmstat 5 3
procs ----memory---- ---swap-- ---io--- ----cpu----
 r  b   free   cache   si   so   bi   bo us sy id wa     # KiB, trimmed
 2  1 184320 1153400 2400 3100  950  410 12  9 40 39
$ cat /proc/pressure/memory
some avg10=31.20 avg60=24.87 avg300=11.02 total=91233412
full avg10=12.45 avg60=9.10 avg300=4.31 total=30122845
$ journalctl -k | grep -i 'out of memory'
Memory cgroup out of memory: Killed process 3410 (reportd) total-vm:612004kB, anon-rss:259812kB`,
    },
    {
      id: 'signals',
      kind: 'table',
      label: 'Signs of real pressure',
      headers: ['signal', 'means'],
      values: [
        ['si / so non-zero, sustained', 'pages swapped in and out: thrashing'],
        ['PSI some avg10 high', 'tasks stalled waiting for memory'],
        ['available low and falling', 'cache already given back'],
        ['"… out of memory: Killed …"', 'the kernel chose a victim'],
      ],
    },
    {
      id: 'notfree',
      label: 'Low "free" alone is not a problem',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'cache', label: 'Cache fills RAM', sub: 'by design: reclaimed on demand', icon: 'memory' },
        { id: 'watch', label: 'Watch behaviour', sub: 'stalls and swapping, not the number', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'signals' },
    { source: 'signals', target: 'notfree' },
  ],
}
