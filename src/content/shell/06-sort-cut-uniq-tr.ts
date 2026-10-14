import type { Section } from '../types'

export const sortCutUniqTr: Section = {
  id: 'sort-cut-uniq-tr',
  title: 'sort, cut, uniq and tr',
  scene: 'shell-sort-uniq',
  focus: 'u',
  slide: `## sort, cut, uniq and tr

Small tools, one job each, combined in a pipeline. Know each one's **assumption** about the data.

### The tools
- \`cut -d' ' -f3\` — keep a field, split on **one** delimiter character
- \`sort\` — order lines; \`-n\` numeric, \`-r\` reverse
- \`uniq -c\` — count runs of **adjacent** identical lines
- \`tr\` — translate or delete single characters, e.g. \`tr -d '\\r'\`

### Why sort comes first
- \`uniq\` only merges duplicates that are **next to each other**
- Without \`sort\`, the same store is counted twice

### Where line tools stop fitting
- CSV allows **quoted delimiters**: \`"Leeds, UK"\`
- \`cut\` splits it anyway — use a CSV-aware parser instead`,
  narration:
    "This pipeline is the classic Unix move: small tools, each doing one job, joined together. The question is how many errors each store produced. grep keeps only the ERROR lines. cut dash d space dash f three keeps the third space-separated field, which is the store name. The first card shows the result: store zero seven, store twelve, store zero seven. Now count them with uniq dash c. You might expect two for store zero seven. Instead you get one, one, one. uniq only merges identical lines that are next to each other, and the two store zero seven lines are separated by store twelve. Sorting first puts identical lines together, and then uniq dash c counts each run correctly. A final sort dash r n orders the counts from highest to lowest. That ordering, sort then uniq, is worth memorising. tr belongs to the same family. It translates or deletes single characters, for example tr dash d backslash r strips the Windows carriage returns from chapter two. Every one of these tools assumes something about the data: one record per line, and fields separated by a single, unambiguous character. Real data often breaks that. The second card is a CSV file where the city field contains a comma inside quotes, which is perfectly legal CSV. cut has no idea about quotes, splits on that comma anyway, and returns a fragment. When the format has rules like quoting, stop using line tools and use a parser that understands it, such as Python's csv module. Next: sed and awk.",
}
