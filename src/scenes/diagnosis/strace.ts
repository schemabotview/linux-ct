import type { Scene } from '@graphlearning/flow'

// §7 — strace shows a process's system calls and their results: here the nightly report retrying a
// missing file and being denied another. strace needs permission to trace (normally root), slows
// the traced process, and prints data the process handles. Output illustrative, trimmed.
export const diagnosisStrace: Scene = {
  id: 'diagnosis-strace',
  title: 'Watching system calls',
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'code',
      filename: 'bash — sudo strace, illustrative output, trimmed',
      label: `$ sudo strace -f -tt -T -e trace=openat,fsync -p 5120
09:12:01.204 openat(AT_FDCWD, "/var/lib/reportd/incoming/store-12.csv", O_RDONLY) = -1 ENOENT
09:12:01.205 openat(AT_FDCWD, "/var/lib/reportd/incoming/store-12.csv", O_RDONLY) = -1 ENOENT
09:12:03.610 openat(AT_FDCWD, "/srv/archive/2025.idx", O_RDONLY) = -1 EACCES
09:12:03.611 fsync(7)                  = 0 <2.871>     # 2.9 s in one fsync
$ sudo strace -c -f -p 5120            # or: a summary per syscall`,
    },
    {
      id: 'reading',
      kind: 'table',
      label: 'Reading a line',
      headers: ['part', 'example', 'tells you'],
      values: [
        ['syscall and arguments', 'openat(…, "…/store-12.csv")', 'exactly what was asked'],
        ['result', '= -1 ENOENT', 'chapter 2’s errors, by name'],
        ['<duration>, from -T', '<2.871>', 'where the time went'],
      ],
    },
    {
      id: 'cost',
      label: 'Before you attach it',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'overhead', label: 'Overhead', sub: 'the process runs much slower', icon: 'gauge' },
        { id: 'secrets', label: 'Sensitive data', sub: 'buffers, paths, tokens appear', icon: 'lock' },
        { id: 'scope', label: 'Narrow it', sub: '-e trace=…, short, then detach', icon: 'funnel' },
      ],
    },
  ],
  edges: [
    { source: 'trace', target: 'reading' },
    { source: 'reading', target: 'cost' },
  ],
}
