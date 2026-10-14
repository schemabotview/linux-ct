import type { Section } from '../types'

export const unusualFilenames: Section = {
  id: 'unusual-filenames',
  title: 'Unusual filenames and NUL-delimited lists',
  scene: 'shell-filenames',
  focus: 'lists',
  slide: `## Unusual filenames and NUL-delimited lists

A Linux filename may contain **any byte except \`/\` and NUL** — including spaces, newlines and a leading dash.

### A name that looks like an option
- \`rm -draft.csv\` is parsed as options \`-d -r -a …\`
- \`--\` ends option parsing; \`./-draft.csv\` is plainly a path

### Lists of names
- \`for f in $(ls)\` splits on spaces and newlines: **never safe**
- A glob, \`for f in ./*\`, gives each name as one word
- Quote it when used: \`"$f"\`

### NUL-delimited composition
- NUL cannot appear in a name, so it is a **safe separator**
- \`find -print0\` with \`xargs -0\` or \`read -d ''\` *(GNU find, Bash)*`,
  narration:
    "Most tools assume filenames are tidy. Linux doesn't. A name can contain any byte except the slash and the NUL byte. Spaces, quotes, newlines and a leading dash are all legal, and sooner or later one of them will arrive in your incoming directory. Start with the leading dash. rm dash draft dot csv looks like a request to remove a file, but rm sees options: d, r, then a, which it doesn't know. GNU rm even suggests the fix. There are two. A double dash tells the command that options have ended and everything after is an argument. Or write dot slash in front, which makes it unmistakably a path. Next, lists of names. The table compares three ways of handing many files to another command. Looping over the output of ls breaks on spaces, on newlines, and on leading dashes, because that output is just text that the shell splits into words. A glob like dot slash star is safe, because Bash produces each matching name as one complete word; you then quote the variable when you use it. And when the list comes from find, use the NUL byte as the separator. Since NUL can never appear in a filename, it's the one delimiter that cannot be confused with data. find dash print zero writes names separated by NUL, and xargs dash zero reads them, or a Bash while loop with read dash d and an empty string. The flags are GNU find and Bash features. Last in this chapter: archives.",
}
