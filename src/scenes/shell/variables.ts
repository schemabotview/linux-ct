import type { Scene } from '@graphlearning/flow'

// §4 — shell variables versus the exported environment a child inherits, and how a command name is
// looked up. The PATH shown is Debian 13's default for ordinary users (/etc/profile).
export const shellVariables: Scene = {
  id: 'shell-variables',
  title: 'Variables, environment, PATH',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ REPORT_DIR=~/lab/reportd/reports      # shell variable
$ bash -c 'echo "[$REPORT_DIR]"'        # a child process
[]
$ export REPORT_DIR                      # now in the environment
$ bash -c 'echo "[$REPORT_DIR]"'
[/home/learner/lab/reportd/reports]
$ echo "$PATH"
/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
$ make-report
bash: make-report: command not found   # . is not in PATH
$ ./make-report                          # say where it is`,
    },
    {
      id: 'lookup',
      label: 'How Bash finds a command name',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'alias', label: '1 · Alias', sub: 'interactive shells only', pattern: 'user', icon: 'tag' },
        { id: 'func', label: '2 · Function', sub: 'defined in this shell', pattern: 'user', icon: 'code' },
        { id: 'builtin', label: '3 · Built-in', sub: 'cd, echo, export', pattern: 'service', icon: 'terminal' },
        { id: 'path', label: '4 · PATH', sub: 'each directory, left to right', pattern: 'external', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [{ source: 'session', target: 'lookup', label: 'type -a name shows it' }],
}
