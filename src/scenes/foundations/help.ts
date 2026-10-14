import type { Scene } from '@graphlearning/flow'

// §5 — reading a synopsis instead of memorising options. The SYNOPSIS line is GNU coreutils' ls(1);
// `man cd` failing is the Debian default (no manpages-posix), which is the cue to use `help`.
export const foundationsHelp: Scene = {
  id: 'foundations-help',
  title: 'Synopsis, options, manual sections',
  flow: 'TB',
  nodes: [
    {
      id: 'synopsis',
      kind: 'code',
      filename: 'man 1 ls — reading the SYNOPSIS',
      label: `ls [OPTION]... [FILE]...
   └ [ ] optional   └ ... may repeat

$ ls -l --sort=time incoming/
  │  │  └ long option, with a value
  │  └ short option
  └ command          incoming/ = argument`,
    },
    {
      id: 'where',
      kind: 'code',
      filename: 'bash — where the help lives',
      label: `$ man cd
No manual entry for cd
$ help cd | head -1        # built-ins: ask Bash
cd: cd [-L|[-P [-e]] [-@]] [dir]
$ man -f passwd            # one name, two sections
passwd (1)  - change user password
passwd (5)  - the password file`,
    },
    {
      id: 'sections',
      kind: 'table',
      label: 'Manual sections you will meet',
      headers: ['section', 'holds', 'example'],
      values: [
        ['1', 'user commands', 'ls(1)'],
        ['5', 'file formats', 'passwd(5)'],
        ['7', 'overviews', 'signal(7)'],
        ['8', 'admin commands', 'mount(8)'],
      ],
    },
  ],
  edges: [
    { source: 'synopsis', target: 'where' },
    { source: 'where', target: 'sections', label: 'man 5 passwd' },
  ],
}
