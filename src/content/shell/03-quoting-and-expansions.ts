import type { Section } from '../types'

export const quotingAndExpansions: Section = {
  id: 'quoting-and-expansions',
  title: 'Quoting, word splitting and expansions',
  scene: 'shell-expansion',
  focus: 'split',
  slide: `## Quoting, word splitting and expansions

Before running a command, Bash **rewrites the line**: it expands variables and patterns, then splits the result into words.

### The order matters
- Braces, tilde, then **$-forms**: variables, \`$(command)\`, arithmetic
- Unquoted results are **split** into words, then **globs** are matched
- Finally the quotes are removed

### Quoting controls it
- \`"$f"\` — expands, but stays **one word**
- \`'$f'\` — nothing expands at all
- Unquoted \`$f\` holding \`store 07.csv\` becomes **two** arguments

### Globs that match nothing
- Bash passes \`*.txt\` through **literally** by default
- **Rule of thumb:** quote every variable expansion unless you want splitting`,
  narration:
    "When you press enter, Bash does not run your line as typed. It rewrites it first, in a fixed order, and most shell bugs come from forgetting one of these steps. The scene lists them. Brace expansion turns a, open brace, one comma two, close brace, into a one and a two. Tilde becomes your home directory. Then the dollar forms: variables, command substitution, which runs a command and inserts its output, and arithmetic. Then comes the dangerous step. Any result that was not inside double quotes is split into separate words wherever it contains spaces, tabs or newlines. After that, words containing star or question mark are matched against filenames. And finally, the quote characters themselves are removed, so the program never sees them. The session shows the consequences. The variable f holds a filename with a space. Unquoted, it splits into two words, store and zero seven dot csv, and ls looks for two files that don't exist. Quoted, it stays one argument and works. Single quotes go further: nothing inside them expands at all, which is why dollar HOME prints literally on the left and as a path on the right. The last example surprises people too. When a pattern matches no files, Bash, by default, passes it through unchanged, so ls receives a literal star dot txt. The rule of thumb that follows from all this: put double quotes around every variable expansion, unless you specifically want splitting. Next: variables, the environment, and how Bash finds commands.",
}
