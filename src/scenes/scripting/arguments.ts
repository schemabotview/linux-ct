import type { Scene } from '@graphlearning/flow'

// §4 — argument preservation: "$@" keeps each argument whole, $* and unquoted $@ re-split them.
// Arrays hold lists without re-splitting. `IFS= read -r` reads one line verbatim: no trimming, no
// backslash processing. The stated input format is one filename per line.
export const scriptingArguments: Scene = {
  id: 'scripting-arguments',
  title: 'Keeping arguments whole',
  flow: 'TB',
  nodes: [
    {
      id: 'demo',
      kind: 'code',
      filename: 'bash — show-args prints one argument per line',
      label: `$ set -- "store 07.csv" "store 12.csv"     # two arguments
$ show-args "$@"        $ show-args $@        $ show-args "$*"
<store 07.csv>          <store>               <store 07.csv store 12.csv>
<store 12.csv>          <07.csv>
                        <store>
                        <12.csv>`,
    },
    {
      id: 'arrays',
      kind: 'code',
      filename: 'make-report — lists and line input',
      label: `files=( "$input_dir"/*.csv )               # an array, one name each
echo "\${#files[@]} files"                     # how many
wc -l -- "\${files[@]}"                        # all of them, unsplit

# skip-list: one filename per line
while IFS= read -r name; do
  skip["$name"]=1                             # declare -A skip, earlier
done < "$input_dir/.skip"`,
    },
    {
      id: 'rules',
      label: 'Rules that prevent most bugs',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'at', label: '"$@"', sub: 'pass arguments on unchanged', icon: 'copy' },
        { id: 'arr', label: '"${a[@]}"', sub: 'lists live in arrays, not strings', icon: 'table' },
        { id: 'read', label: 'IFS= read -r', sub: 'a line exactly as written', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'demo', target: 'arrays' },
    { source: 'arrays', target: 'rules' },
  ],
}
