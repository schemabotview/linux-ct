import type { Scene } from '@graphlearning/flow'

// §1 — the head of make-report and the four ways to run it. On Debian /bin/sh is dash, so running
// a Bash script with `sh` silently switches language. `source` runs it inside the current shell.
export const scriptingInvocation: Scene = {
  id: 'scripting-invocation',
  title: 'A script and how it runs',
  flow: 'TB',
  nodes: [
    {
      id: 'script',
      kind: 'code',
      filename: '~/lab/reportd/make-report',
      label: `#!/bin/bash
# make-report — summarise one day of incoming records
# usage: make-report INPUT_DIR REPORT_FILE

input_dir=$1          # first argument
report=$2             # second argument
echo "$0: $# arguments: $*" >&2`,
    },
    {
      id: 'ways',
      kind: 'table',
      label: 'Four ways to run it',
      headers: ['you type', 'who interprets it', 'notes'],
      values: [
        ['./make-report a b', 'the #! line: /bin/bash', 'needs chmod +x'],
        ['bash make-report a b', 'bash, explicitly', 'no x bit needed'],
        ['sh make-report a b', 'dash on Debian', 'Bash syntax breaks'],
        ['source make-report a b', 'THIS shell', 'its variables and cd stay'],
      ],
    },
    {
      id: 'args',
      label: 'Positional parameters',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'zero', label: '$0', sub: 'the script name', pattern: 'service', icon: 'file' },
        { id: 'one', label: '$1, $2 …', sub: 'each argument', pattern: 'service', icon: 'hash' },
        { id: 'count', label: '$#', sub: 'how many', pattern: 'service', icon: 'sigma' },
        { id: 'all', label: '"$@"', sub: 'all, each kept whole', pattern: 'user', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'script', target: 'ways', label: 'chmod +x make-report' },
    { source: 'args', target: 'ways' },
  ],
}
