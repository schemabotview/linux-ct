import type { Scene } from '@graphlearning/flow'

// §1 — one directory, four ways of writing a path to things around it, and the one case where the
// shell, not the kernel, decides: a quoted ~ is never expanded. Current directory throughout is
// /home/learner/lab/reportd.
export const filesPaths: Scene = {
  id: 'files-paths',
  title: 'Absolute, relative, and ~',
  flow: 'TB',
  nodes: [
    {
      id: 'resolve',
      kind: 'table',
      label: 'From /home/learner/lab/reportd',
      headers: ['you write', 'kind', 'resolves to'],
      values: [
        ['incoming/a.csv', 'relative', '/home/learner/lab/reportd/incoming/a.csv'],
        ['../reportd/app.log', 'relative', '/home/learner/lab/reportd/app.log'],
        ['/etc/hostname', 'absolute', '/etc/hostname — from anywhere'],
        ['~/lab', 'shell expands ~', '/home/learner/lab'],
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — moving around, illustrative output',
      label: `$ cd incoming && pwd
/home/learner/lab/reportd/incoming
$ cd .. && pwd                # .. is the parent
/home/learner/lab/reportd
$ cd - >/dev/null; pwd        # - is the previous directory
/home/learner/lab/reportd/incoming`,
    },
    {
      id: 'tilde',
      label: 'The kernel never sees ~',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'unquoted', label: 'ls ~/lab', sub: 'Bash expands it first: works', icon: 'circlecheck' },
        { id: 'quoted', label: 'ls "~/lab"', sub: 'literal ~: No such file', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'resolve', target: 'session' },
    { source: 'session', target: 'tilde' },
  ],
}
