import type { Section } from '../types'

export const grepAndRegularExpressions: Section = {
  id: 'grep-and-regular-expressions',
  title: 'grep and regular expressions',
  scene: 'shell-grep',
  focus: 'session',
  slide: `## grep and regular expressions

\`grep\` prints the lines that match a **pattern**. By default the pattern is a **regular expression**, not plain text.

### Everyday options
- \`-n\` line numbers, \`-c\` count, \`-v\` invert, \`-i\` ignore case
- \`-E\` extended regex: \`+\`, \`?\`, \`|\` and \`( )\` without backslashes

### Literal or pattern
- In a regex, \`.\` matches **any** character, so \`v1.2\` also matches \`v172\`
- \`-F\` treats the pattern as **fixed text**
- Single-quote patterns so the shell leaves them alone

### Locale
- Character classes and ranges follow your **locale**
- \`LC_ALL=C\` gives plain byte matching: predictable, and faster`,
  narration:
    "grep reads lines and prints the ones that match a pattern. It is the tool you will reach for most when reading logs. The first command finds ERROR in the lab's app dot log, and dash n adds the line number of each match. Other options you will use constantly: dash c to count matching lines instead of printing them, dash v to invert the match, and dash i to ignore case. Here is the trap. grep's pattern is a regular expression, and in regular expressions some characters are special. The dot matches any single character. So searching for v one dot two also matches v one dash two and v one seven two, and the count comes back as five, not two. When you mean literal text, say so with dash capital F, for fixed string. Then dot is just a dot, and the count is correct. Always put patterns in single quotes too, so Bash doesn't expand anything in them first. The table shows the regex pieces you will meet most: dot for any character, caret to anchor at the start of a line, square brackets for a set of characters, star for repetition, and alternation, which needs backslashes in basic syntax but not with dash capital E. Finally, locale. What a character class like upper case means, and how ranges sort, depends on your language settings. Setting L C underscore ALL equals C switches to plain byte matching, which is predictable and noticeably faster on large files. Next: sorting and counting.",
}
