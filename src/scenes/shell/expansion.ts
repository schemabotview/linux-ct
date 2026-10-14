import type { Scene } from '@graphlearning/flow'

// §3 — Bash's expansion order (bash(1) EXPANSION), then the two failures it explains: an unquoted
// variable split into words, and a glob that matched nothing passed through literally (Bash's
// default; nullglob/failglob change it).
export const shellExpansion: Scene = {
  id: 'shell-expansion',
  title: 'What Bash does to a line first',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'Expansions, in order',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'brace', label: '1 · Braces', sub: 'a{1,2} → a1 a2', pattern: 'service', icon: 'braces' },
        { id: 'tilde', label: '2 · Tilde', sub: '~ → /home/learner', pattern: 'service', icon: 'folder' },
        { id: 'param', label: '3 · $ forms', sub: 'variables, $(cmd), $((1+1))', pattern: 'service', icon: 'code' },
        { id: 'split', label: '4 · Splitting', sub: 'unquoted results split on spaces', pattern: 'warn', icon: 'scissors' },
        { id: 'glob', label: '5 · Globs', sub: '*.csv → matching names', pattern: 'service', icon: 'search' },
        { id: 'quote', label: '6 · Quote removal', sub: 'the quotes themselves go', pattern: 'service', icon: 'circleslash' },
      ],
    },
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — inside ~/lab/reportd/incoming, illustrative output',
      label: `$ f="store 07.csv"
$ ls $f                       # split into two words
ls: cannot access 'store': No such file or directory
ls: cannot access '07.csv': No such file or directory
$ ls "$f"                     # one word, as intended
'store 07.csv'
$ echo '$HOME' "$HOME"        # single quotes: nothing expands
$HOME /home/learner
$ ls *.txt                    # no match: passed through as-is
ls: cannot access '*.txt': No such file or directory`,
    },
  ],
  edges: [{ source: 'steps', target: 'session', label: 'explains' }],
}
