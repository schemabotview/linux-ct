import type { Scene } from '@graphlearning/flow'

// §8 — an ssh command line is parsed TWICE: by your local shell, then by the remote shell. Quoting
// decides which side expands ~ and *. Transfer with rsync (dry run first) and reuse one connection
// with ControlMaster (ssh_config(5)).
export const networkingRemote: Scene = {
  id: 'networking-remote',
  title: 'Remote commands and transfer',
  flow: 'TB',
  nodes: [
    {
      id: 'quoting',
      kind: 'table',
      label: 'Who expands ~ and *?',
      headers: ['you type', 'expanded by', 'result'],
      values: [
        ['ssh lab ls ~/lab/reportd/*.csv', 'your local shell', 'local home, local matches'],
        ["ssh lab 'ls ~/lab/reportd/*.csv'", 'the remote shell', 'lab’s own files'],
      ],
    },
    {
      id: 'transfer',
      kind: 'code',
      filename: 'bash — scoped transfer, illustrative output',
      label: `$ rsync -av --dry-run lab:lab/reportd/reports/ ./reports-from-lab/
receiving incremental file list
oct-11.csv
oct-12.csv
$ rsync -av lab:lab/reportd/reports/ ./reports-from-lab/   # then for real`,
    },
    {
      id: 'reuse',
      kind: 'code',
      filename: '~/.ssh/config — reuse one connection',
      label: `Host lab
    HostName lab.example
    User learner
    ControlMaster auto
    ControlPath ~/.ssh/cm-%C
    ControlPersist 10m`,
    },
  ],
  edges: [
    { source: 'quoting', target: 'transfer' },
    { source: 'transfer', target: 'reuse', label: 'many commands, one login' },
  ],
}
