import type { Scene } from '@graphlearning/flow'

// §2 — a pipeline is concurrent processes joined stdout→stdin; stderr bypasses the pipe. Its exit
// status is the LAST command's unless Bash's pipefail is set. PIPESTATUS and pipefail are Bash.
export const shellPipelines: Scene = {
  id: 'shell-pipelines',
  title: 'Pipelines and their status',
  flow: 'TB',
  nodes: [
    {
      id: 'pipe',
      label: 'grep ERROR missing.log | wc -l',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'grep', label: 'grep', sub: 'fails: exit status 2', pattern: 'warn', icon: 'search' },
        { id: 'conn', label: 'pipe', sub: 'grep stdout → wc stdin', pattern: 'network', icon: 'plug' },
        { id: 'wc', label: 'wc -l', sub: 'counts 0 lines: exit 0', pattern: 'service', icon: 'hash' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ grep ERROR missing.log | wc -l
grep: missing.log: No such file or directory   # stderr: not piped
0
$ echo $?
0                                  # the LAST command's status
$ grep ERROR missing.log | wc -l; echo "\${PIPESTATUS[@]}"
2 0                                # every stage, Bash only
$ set -o pipefail
$ grep ERROR missing.log | wc -l; echo $?
2                                  # rightmost failure wins`,
    },
    {
      id: 'meaning',
      label: 'Reading a status',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'zero', label: '0', sub: 'success', pattern: 'service', icon: 'circlecheck' },
        { id: 'nonzero', label: '1–255', sub: 'failure; meaning per command', pattern: 'warn', icon: 'ban' },
        { id: 'grep1', label: 'grep: 1', sub: 'no match: not an error', pattern: 'external', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'pipe', target: 'session', label: 'run it' },
    { source: 'session', target: 'meaning' },
  ],
}
