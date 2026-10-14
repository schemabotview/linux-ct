import type { Scene } from '@graphlearning/flow'

// §3 — make-report's per-file loop as a function. `local` limits a variable to the function;
// `return` sets a function's status, `exit` ends the whole script (so the loop body uses exit). The awk program is chapter 3's.
export const scriptingLoops: Scene = {
  id: 'scripting-loops',
  title: 'Loops and functions',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'make-report — one function, one loop',
      label: `summarise() {                     # $1 here is the function's own
  local file=$1                   # visible only inside summarise
  awk -F, '{ n += $3 } END { print n+0 }' "$file"
}

total=0
for file in "$input_dir"/*.csv; do
  [[ -e $file ]] || continue      # glob matched nothing
  count=$(summarise "$file") || exit 1
  printf '%s,%d\\n' "\${file##*/}" "$count"
  total=$(( total + count ))
done
echo "total,$total"`,
    },
    {
      id: 'parts',
      label: 'The pieces',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'for', label: 'for … in', sub: 'one word at a time', pattern: 'service', icon: 'repeat' },
        { id: 'func', label: 'name() { … }', sub: 'a command you define', pattern: 'user', icon: 'code' },
        { id: 'local', label: 'local', sub: 'no leak into the caller', pattern: 'user', icon: 'lock' },
        { id: 'ret', label: 'return / exit', sub: 'end the function / the script', pattern: 'warn', icon: 'dooropen' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'parts', label: 'reusable steps' }],
}
