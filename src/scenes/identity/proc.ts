import type { Scene } from '@graphlearning/flow'

// §8 — /proc/<pid> as live evidence about one process, and per-process resource limits. 1024 is the
// usual soft limit for open files in a Debian login session; the hard limit is set by systemd.
export const identityProc: Scene = {
  id: 'identity-proc',
  title: '/proc and resource limits',
  flow: 'TB',
  nodes: [
    {
      id: 'fds',
      kind: 'code',
      filename: 'bash — this shell, illustrative output',
      label: `$ ls -l /proc/$$/fd
lrwx------ 1 learner learner 64 Oct 12 10:05 0 -> /dev/pts/0
lrwx------ 1 learner learner 64 Oct 12 10:05 1 -> /dev/pts/0
lrwx------ 1 learner learner 64 Oct 12 10:05 2 -> /dev/pts/0
$ ulimit -n; ulimit -Hn          # open-files limit: soft, hard
1024
524288
$ grep -E 'State|Threads' /proc/$$/status
State:  S (sleeping)
Threads:        1`,
    },
    {
      id: 'entries',
      kind: 'table',
      label: 'One directory per process: /proc/<pid>/',
      headers: ['entry', 'answers'],
      values: [
        ['cmdline', 'what exactly was run'],
        ['cwd', 'its current directory'],
        ['environ', 'its environment (owner or root only)'],
        ['fd/', 'every open file, pipe and socket'],
        ['limits', 'its resource limits'],
      ],
    },
    {
      id: 'limit',
      label: 'When a limit is hit',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'emfile', label: 'Too many open files', sub: 'EMFILE: soft limit reached', icon: 'ban' },
        { id: 'inherit', label: 'Inherited', sub: 'children start with the same', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'fds', target: 'entries' },
    { source: 'entries', target: 'limit' },
  ],
}
