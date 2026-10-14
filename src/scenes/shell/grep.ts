import type { Scene } from '@graphlearning/flow'

// §5 — grep over the lab log: the regex dot that matches too much, -F for literal text, and the
// locale caveat. Patterns are POSIX basic regex unless -E; options are GNU grep.
export const shellGrep: Scene = {
  id: 'shell-grep',
  title: 'grep, regex, and literal text',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — grep over app.log, illustrative output',
      label: `$ grep -n 'ERROR' app.log
14:2026-10-12T09:14:03 ERROR store-07 parse failed: line 3
22:2026-10-12T09:20:41 ERROR store-12 parse failed: line 9
$ grep -c 'v1.2' app.log      # . means ANY character
5                              # also matched v1-2, v172
$ grep -cF 'v1.2' app.log     # -F: fixed string
2
$ grep -cv 'INFO' app.log     # -v: lines NOT matching
9`,
    },
    {
      id: 'tokens',
      kind: 'table',
      label: 'Regex characters you will meet',
      headers: ['pattern', 'matches', 'extended (-E)'],
      values: [
        ['.', 'any one character', 'same'],
        ['^ERROR', 'ERROR at line start', 'same'],
        ['[0-9]*', 'zero or more digits', 'same'],
        ['store-\\(07\\|12\\)', 'store-07 or store-12', 'store-(07|12)'],
      ],
    },
    {
      id: 'locale',
      label: 'Locale changes the answer',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'class', label: '[[:upper:]]', sub: 'means what your locale says', icon: 'regex' },
        { id: 'lcall', label: 'LC_ALL=C', sub: 'plain bytes: predictable, fast', icon: 'hash' },
      ],
    },
  ],
  edges: [
    { source: 'session', target: 'tokens' },
    { source: 'tokens', target: 'locale' },
  ],
}
