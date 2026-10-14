import type { Scene } from '@graphlearning/flow'

// §8 — filenames may contain anything except / and NUL. A leading dash is read as an option, so
// `--` ends options; spaces and newlines break line-based lists, so NUL-delimited lists
// (find -print0 with xargs -0 or read -d '') are the safe composition. -print0 / -0 / -d '' are
// GNU find, GNU xargs and Bash respectively.
export const shellFilenames: Scene = {
  id: 'shell-filenames',
  title: 'Names that break scripts',
  flow: 'TB',
  nodes: [
    {
      id: 'dash',
      kind: 'code',
      filename: 'bash — a name that looks like an option',
      label: `$ rm -draft.csv
rm: invalid option -- 'a'
Try 'rm ./-draft.csv' to remove the file '-draft.csv'.
$ rm -- -draft.csv            # -- : options end here
$ rm ./-draft.csv             # or make it a path`,
    },
    {
      id: 'lists',
      kind: 'table',
      label: 'Passing many names to another command',
      headers: ['approach', 'spaces', 'newlines', 'leading -'],
      values: [
        ['for f in $(ls)', 'breaks', 'breaks', 'breaks'],
        ['for f in ./*; "$f"', 'safe', 'safe', 'safe'],
        ['find -print0 | xargs -0', 'safe', 'safe', 'safe'],
      ],
    },
    {
      id: 'nul',
      kind: 'code',
      filename: 'bash — NUL-delimited, GNU find + Bash',
      label: `$ find incoming -name '*.csv' -print0 |
>   xargs -0 wc -l
$ find incoming -name '*.csv' -print0 |
>   while IFS= read -r -d '' f; do
>     printf 'checking %s\\n' "$f"
>   done`,
    },
  ],
  edges: [
    { source: 'dash', target: 'lists' },
    { source: 'lists', target: 'nul', label: 'NUL cannot appear in a name' },
  ],
}
