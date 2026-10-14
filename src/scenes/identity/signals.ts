import type { Scene } from '@graphlearning/flow'

// §6 — job control in one session, the signals worth knowing (signal(7)), and the plan's caveat:
// SIGKILL cannot be caught, but a task in uninterruptible sleep (state D) does not disappear until
// the kernel operation it waits on returns.
export const identitySignals: Scene = {
  id: 'identity-signals',
  title: 'Jobs and signals',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — job control, illustrative output',
      label: `$ sleep 300 &                # run in the background
[1] 2310
$ jobs
[1]+  Running                 sleep 300 &
$ kill %1                     # SIGTERM by default
[1]+  Terminated              sleep 300
$ ./make-report big.csv       # foreground; then Ctrl-Z
^Z
[1]+  Stopped                 ./make-report big.csv
$ bg                          # continue it in the background`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Signals you will send',
      headers: ['signal', 'sent by', 'default', 'can be caught?'],
      values: [
        ['INT (2)', 'Ctrl-C', 'terminate', 'yes'],
        ['TERM (15)', 'kill, systemctl stop', 'terminate', 'yes: clean up first'],
        ['HUP (1)', 'terminal closed', 'terminate', 'yes'],
        ['TSTP (20)', 'Ctrl-Z', 'stop', 'yes'],
        ['KILL (9)', 'kill -9', 'terminate', 'never'],
      ],
    },
    {
      id: 'caveat',
      label: 'KILL is not instant',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'try', label: 'TERM first', sub: 'let it flush and remove temp files', icon: 'clock' },
        { id: 'dstate', label: 'State D', sub: 'blocked in the kernel: waits', icon: 'harddrive' },
      ],
    },
  ],
  edges: [
    { source: 'session', target: 'table' },
    { source: 'table', target: 'caveat' },
  ],
}
