import type { Scene } from '@graphlearning/flow'

// §7 — a process's life ends in two steps: it exits, then its parent collects the status (wait).
// Between the two it is a zombie: no memory, no CPU, just a process-table entry holding the status.
// Orphans are re-parented to PID 1 (or a subreaper), which reaps them.
export const identityReaping: Scene = {
  id: 'identity-reaping',
  title: 'Exit, wait, reap',
  flow: 'TB',
  nodes: [
    {
      id: 'life',
      label: 'The end of a process',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'running', label: '1 · Running', sub: 'state R or S', pattern: 'service', icon: 'zap' },
        { id: 'exited', label: '2 · exit(3)', sub: 'memory and files freed', pattern: 'service', icon: 'power' },
        { id: 'zombie', label: '3 · Zombie', sub: 'state Z: only the status kept', pattern: 'warn', icon: 'skull' },
        { id: 'reaped', label: '4 · Reaped', sub: 'parent called wait(): gone', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ ./make-report bad.csv & pid=$!
[1] 2402
$ wait "$pid"; echo "status $?"
status 3                         # the child's exit code, delivered
$ ps -o pid,ppid,stat,cmd -p 2450
  PID  PPID STAT CMD
 2450  2449 Z    [report-worker] <defunct>
$ kill -9 2450                   # does nothing: it already exited`,
    },
    {
      id: 'fix',
      label: 'A zombie is a parent problem',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'parent', label: 'Fix the parent', sub: 'it never calls wait()', icon: 'wrench' },
        { id: 'orphan', label: 'Orphans', sub: 'PID 1 adopts and reaps them', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'life', target: 'session' },
    { source: 'session', target: 'fix' },
  ],
}
