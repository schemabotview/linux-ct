import type { Section } from '../types'

export const editorsPagersAndEncodings: Section = {
  id: 'editors-pagers-and-encodings',
  title: 'Editors, pagers and line endings',
  scene: 'files-text',
  focus: 'crlf',
  slide: `## Editors, pagers and line endings

Most configuration and data on Linux is **plain text**, so viewing and editing it safely is a daily skill.

### Tools on a default Debian system
- \`less\` — read without changing; \`/\` searches, \`q\` quits
- \`nano\` — a simple editor with its keys listed on screen
- \`vi\` — a modal editor found on almost every Unix-like system

### Text is bytes plus an agreement
- **Encoding**: Debian expects **UTF-8**
- **Line ending**: Linux uses \`\\n\`; Windows uses \`\\r\\n\`

### When it looks right but fails
- A script saved with Windows endings reports \`bad interpreter\`
- \`file\` and \`cat -A\` reveal the hidden \`\\r\``,
  narration:
    "Configuration files, logs, scripts and the reportd records are all plain text, so you need tools to read and edit text safely. To read, use less. It pages through a file of any size without changing it; slash searches, and q quits. To edit, Debian installs two editors by default. nano is the friendly one, with its key commands listed along the bottom of the screen. vi is modal, harder at first, and present on almost every Unix-like system you will ever log in to, so it is worth learning the basics eventually. Now, the subtle part. Text is just bytes, plus an agreement about what they mean. One agreement is the encoding, and Debian assumes UTF-8. The other is how a line ends. Linux ends each line with a single newline character. Windows ends each line with a carriage return followed by a newline. Most of the time you cannot see the difference, and that is exactly the problem. The card in the middle shows a script written on a Windows machine. Running it fails with bad interpreter, and the error mentions slash bin slash bash followed by caret M. The kernel is looking for a program literally named bash plus a carriage return. file confirms it, reporting CRLF line terminators, and cat dash capital A makes the hidden character visible as caret M. One sed command strips it from the end of each line. When something looks right but fails, inspect the bytes. Next: finding files, and choosing the right tool to inspect them.",
}
