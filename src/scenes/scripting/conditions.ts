import type { Scene } from '@graphlearning/flow'

// §2 — `if` runs a COMMAND and branches on its exit status; [[ ]] is one such command (a Bash
// keyword). The input checks are make-report's own. Exit codes 2 (usage) and 3 (bad input) are this
// script's convention.
export const scriptingConditions: Scene = {
  id: 'scripting-conditions',
  title: 'Branching on status',
  flow: 'TB',
  nodes: [
    {
      id: 'checks',
      kind: 'code',
      filename: 'make-report — validate before doing anything',
      label: `if [[ $# -ne 2 ]]; then
  echo "usage: make-report INPUT_DIR REPORT_FILE" >&2
  exit 2
fi
if [[ ! -d $input_dir || ! -r $input_dir ]]; then
  echo "make-report: cannot read $input_dir" >&2
  exit 3
fi
if grep -q ',,' "$input_dir"/*.csv; then     # any command can be a condition
  echo "make-report: warning: empty fields" >&2
fi`,
    },
    {
      id: 'tests',
      kind: 'table',
      label: 'Tests you will use',
      headers: ['test', 'true when'],
      values: [
        ['-e / -f / -d path', 'exists / regular file / directory'],
        ['-r / -w path', 'you can read / write it'],
        ['-n str / -z str', 'string non-empty / empty'],
        ['a == b,  a != b', 'strings equal / differ'],
        ['n -eq m,  n -lt m', 'integers equal / less than'],
      ],
    },
    {
      id: 'forms',
      label: 'Three spellings',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'if', label: 'if cmd; then', sub: 'branch on cmd’s status', pattern: 'service', icon: 'gitbranch' },
        { id: 'dbl', label: '[[ … ]]', sub: 'Bash test: no word splitting', pattern: 'user', icon: 'braces' },
        { id: 'and', label: 'a && b || c', sub: 'short: c also runs if b fails', pattern: 'warn', icon: 'merge' },
      ],
    },
  ],
  edges: [
    { source: 'checks', target: 'tests' },
    { source: 'tests', target: 'forms' },
  ],
}
