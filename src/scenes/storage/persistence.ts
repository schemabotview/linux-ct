import type { Scene } from '@graphlearning/flow'

// §6 — the plan's three claims, kept apart: write() returned, the data was flushed, the data
// survives power loss. Page cache, writeback and fsync per the kernel's admin guide; free(1) output
// illustrative.
export const storagePersistence: Scene = {
  id: 'storage-persistence',
  title: 'From write() to the disk',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'One write, four places',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'app', label: '1 · write() returns', sub: 'bytes copied to the kernel', pattern: 'user', icon: 'file' },
        { id: 'cache', label: '2 · Page cache', sub: 'in RAM, marked dirty', pattern: 'service', icon: 'memory' },
        { id: 'writeback', label: '3 · Writeback', sub: 'seconds later, or on fsync()', pattern: 'network', icon: 'clock' },
        { id: 'media', label: '4 · Stable media', sub: 'device cache flushed too', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'claims',
      kind: 'table',
      label: 'Three different claims',
      headers: ['claim', 'guaranteed by', 'survives power loss?'],
      values: [
        ['"write succeeded"', 'write() returning', 'no'],
        ['"it was flushed"', 'fsync() on the file', 'the file data, yes'],
        ['"the rename is durable"', 'fsync() on the directory too', 'yes'],
      ],
    },
    {
      id: 'free',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ free -h
               total   used   free  shared  buff/cache  available
Mem:            15Gi  3.1Gi  1.2Gi   210Mi        11Gi       12Gi
Swap:          4.0Gi     0B  4.0Gi
$ grep -E '^(Dirty|Writeback):' /proc/meminfo
Dirty:             48212 kB      # written, not yet on disk
Writeback:             0 kB`,
    },
  ],
  edges: [
    { source: 'path', target: 'claims' },
    { source: 'claims', target: 'free', label: 'cache is not "used" memory' },
  ],
}
