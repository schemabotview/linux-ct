import type { Section } from '../types'

export const sedAndAwk: Section = {
  id: 'sed-and-awk',
  title: 'sed and awk',
  scene: 'shell-sed-awk',
  focus: 'awk',
  slide: `## sed and awk

Two small languages for text. **sed** edits a stream of lines; **awk** splits each line into fields and computes.

### sed: substitute
- \`s/pattern/replacement/\` — edit each line as it passes
- Writes to **stdout**: preview it first
- \`-i.bak\` edits the file in place **and keeps a backup**

### awk: fields and totals
- \`-F,\` sets the separator; \`$1\`, \`$3\` are fields
- Arrays accumulate; the \`END\` block runs after the last line
- Debian's default \`awk\` is **mawk**; POSIX programs run the same in gawk

### Keep them bounded
- \`for (s in total)\` has **no order** — pipe to \`sort\`
- Past a few lines, write a real script`,
  narration:
    "sed and awk are both small programming languages, and you only need a little of each to be productive. sed, the stream editor, reads lines, applies edits, and writes the result to standard output. Its workhorse is the substitute command: s, slash, pattern, slash, replacement. The first card fixes inconsistent store names, turning store seven and store zero seven into the same spelling. Because sed writes to standard output, the first run is just a preview, piped into head. Only when the output looks right does the second command use dash i to edit the file in place, and the dot bak suffix keeps a copy of the original. That backup is your rollback, as the listing shows. The pattern uses backslash question mark, a GNU extension, which is why the card says GNU sed. awk thinks in fields. Dash capital F comma splits each CSV line at commas, so dollar one is the store and dollar three is the record count. The program adds each count into an array keyed by store, and the END block, which runs after the last line, prints the totals: fifty for store zero seven, seventeen for store twelve. On Debian the default awk is mawk, and this program is plain POSIX awk, so it runs the same in GNU awk. Two boundaries. awk's for in loop has no defined order, so if order matters, pipe the result to sort. And once a sed or awk program grows past a few lines, it has become a real program, and deserves a real script. Next: filenames that break scripts.",
}
