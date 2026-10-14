import type { Section } from '../types'

export const arraysAndInput: Section = {
  id: 'arrays-and-input',
  title: 'Quoting, arrays and reading input',
  scene: 'scripting-arguments',
  focus: 'demo',
  slide: `## Quoting, arrays and reading input

Most script bugs are arguments being **re-split** on the way through. Bash has one correct form for each job.

### Passing arguments on
- \`"$@"\` — every argument, each **kept whole**
- \`$@\` unquoted, or \`$*\` — re-split on spaces
- \`"$*"\` — everything joined into **one** string

### Lists belong in arrays
- \`files=( "$dir"/*.csv )\` — one element per name
- \`"\${files[@]}"\` expands to them, unsplit; \`\${#files[@]}\` counts them *(Bash)*

### Reading lines
- \`while IFS= read -r line\` — each line **exactly** as written
- \`IFS=\` keeps leading spaces; \`-r\` keeps backslashes
- State the input format: here, **one filename per line**`,
  narration:
    "Most shell script bugs have the same cause: a value that was one argument gets split into several on its way through the script. Bash has one correct form for each job, and this section collects them. The first card sets two arguments, store zero seven dot csv and store twelve dot csv, each with a space, and passes them to a tiny helper that prints each argument it receives between angle brackets. With quoted dollar at, it receives exactly two, intact. With unquoted dollar at, Bash re-splits them into four useless pieces. With quoted dollar star, it gets a single argument, everything joined together. So when a script hands its arguments to another command, the form is always quoted dollar at. The same principle applies to lists you build yourself. Don't store a list of filenames in one string and hope to split it later. Put it in an array: files equals, parentheses, the glob. Each element is one name. Quoted dollar, brace, files, square brackets at, brace, expands to all of them, unsplit, and the hash form counts them. Arrays are a Bash feature, not portable shell. Finally, reading input line by line. The correct form is while I F S equals nothing, read dash r. Setting IFS to empty stops read trimming leading and trailing spaces, and dash r stops it interpreting backslashes. Together they deliver each line exactly as written. And always state the format you expect, here one filename per line, because no line-based loop can handle a filename containing a newline. Next: what happens when something fails.",
}
