import type { Scene } from '@graphlearning/flow'

// §5 — how the shell runs an external command: fork (a copy of the shell), then exec (the copy
// becomes the program). What the child inherits is what explains PATH, cwd and redirection
// behaviour. PIDs illustrative.
export const identityForkExec: Scene = {
  id: 'identity-fork-exec',
  title: 'fork, exec, inherit',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'Bash runs: sort app.log > sorted.log',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'parent', label: '1 · Bash, PID 2201', sub: 'parses the line', pattern: 'service', icon: 'terminal' },
        { id: 'fork', label: '2 · fork()', sub: 'PID 2240: a copy of Bash', pattern: 'service', icon: 'copy' },
        { id: 'redirect', label: '3 · In the child', sub: 'fd 1 → sorted.log', pattern: 'network', icon: 'file' },
        { id: 'exec', label: '4 · exec()', sub: 'PID 2240 becomes sort', pattern: 'external', icon: 'zap' },
      ],
    },
    {
      id: 'inherit',
      kind: 'table',
      label: 'What the child inherits — as a copy',
      headers: ['inherited', 'why it matters'],
      values: [
        ['UID and groups', 'sort can read only what you can'],
        ['exported environment', 'PATH, LANG, REPORT_DIR'],
        ['current directory', 'relative names resolve the same'],
        ['open file descriptors', 'the redirection already in place'],
      ],
    },
    {
      id: 'tree',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ ps -o pid,ppid,cmd --forest
  PID  PPID CMD
 2201  2180 -bash
 2240  2201  \\_ sort app.log`,
    },
  ],
  edges: [
    { source: 'steps', target: 'inherit' },
    { source: 'inherit', target: 'tree', label: 'PPID links them' },
  ],
}
