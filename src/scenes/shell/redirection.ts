import type { Scene } from '@graphlearning/flow'

// §1 — the three standard streams, and the plan's redirection-order contrast traced as a
// descriptor table: redirections are applied left to right, and `2>&1` copies wherever fd 1 points
// AT THAT MOMENT. `ls` on one existing and one missing name gives one line on each stream.
export const shellRedirection: Scene = {
  id: 'shell-redirection',
  title: 'Three streams, applied left to right',
  flow: 'TB',
  nodes: [
    {
      id: 'streams',
      label: 'Every process starts with three',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'fd0', label: '0 · stdin', sub: 'input; < file', pattern: 'user', icon: 'file' },
        { id: 'fd1', label: '1 · stdout', sub: 'results; > or >>', pattern: 'service', icon: 'terminal' },
        { id: 'fd2', label: '2 · stderr', sub: 'errors; 2>', pattern: 'warn', icon: 'bell' },
      ],
    },
    {
      id: 'order',
      kind: 'table',
      label: 'Where fd 1 and fd 2 point after each step',
      headers: ['command', 'step', 'fd 1', 'fd 2'],
      values: [
        ['ls … >out 2>&1', '>out', 'out', 'terminal'],
        ['', '2>&1', 'out', 'out'],
        ['ls … 2>&1 >out', '2>&1', 'terminal', 'terminal'],
        ['', '>out', 'out', 'terminal'],
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — inside ~/lab/reportd, illustrative output',
      label: `$ ls app.log missing >out 2>&1        # both lines go to out
$ ls app.log missing 2>&1 >out        # the error stays on screen
ls: cannot access 'missing': No such file or directory
$ ls app.log missing 2>/dev/null      # discard errors only
app.log`,
    },
  ],
  edges: [
    { source: 'streams', target: 'session' },
    { source: 'order', target: 'session', label: 'observed' },
  ],
}
