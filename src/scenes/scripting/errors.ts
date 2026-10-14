import type { Scene } from '@graphlearning/flow'

// §5 — failure handling: set -e is useful but context-dependent (ignored inside if/while
// conditions, in && / || lists except the last command, and in functions called from those), so
// important steps get explicit checks. trap … EXIT runs cleanup however the script ends.
export const scriptingErrors: Scene = {
  id: 'scripting-errors',
  title: 'Errors, traps, cleanup',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'make-report — failure handling',
      label: `set -euo pipefail                     # stop on many failures — not all
die() { echo "make-report: $*" >&2; exit 1; }

work=$(mktemp -d) || die "no temp dir"
trap 'rm -rf -- "$work"' EXIT          # runs on success, failure or Ctrl-C

sort -- "$input_dir"/*.csv > "$work/all.csv" || die "sort failed"
summarise "$work/all.csv" > "$work/report" || die "summary failed"`,
    },
    {
      id: 'sete',
      kind: 'table',
      label: 'Where set -e does NOT stop the script',
      headers: ['context', 'example'],
      values: [
        ['an if / while condition', 'if summarise f; then …'],
        ['any but the last in && / ||', 'summarise f && echo ok'],
        ['a function called from those', 'its failing lines carry on'],
        ['a pipeline stage, without pipefail', 'grep x f | sort'],
      ],
    },
    {
      id: 'run',
      kind: 'code',
      filename: 'bash — an interrupted run, illustrative output',
      label: `$ ./make-report incoming reports/oct-12.csv
^C
$ ls /tmp/tmp.*            # trap EXIT removed the work directory
ls: cannot access '/tmp/tmp.*': No such file or directory`,
    },
  ],
  edges: [
    { source: 'code', target: 'sete', label: 'so check what matters' },
    { source: 'sete', target: 'run' },
  ],
}
