import type { Section } from '../types'

export const errorsAndCleanup: Section = {
  id: 'errors-and-cleanup',
  title: 'Error handling, traps and cleanup',
  scene: 'scripting-errors',
  focus: 'sete',
  slide: `## Error handling, traps and cleanup

By default, a Bash script **keeps going** after a command fails. Decide deliberately what stops it.

### set -euo pipefail
- \`-e\` exit on an unchecked failure; \`-u\` unset variables are errors
- \`pipefail\` — a failing stage fails the pipeline *(Bash)*

### set -e is context-dependent
- **Ignored** in \`if\` and \`while\` conditions and before \`&&\` / \`||\`
- …and inside functions called from those places
- So check what matters **explicitly**: \`cmd || die "…"\`

### Clean up however it ends
- \`trap '…' EXIT\` runs on success, failure or Ctrl-C
- Pair every \`mktemp\` with a trap that removes it
- \`die\` exits, so the trap cleans up after failures too`,
  narration:
    "Without instructions, a Bash script carries on after a command fails, running the next line on whatever was left behind. The usual first step is set dash e u o pipefail. Dash e exits when a command fails and nothing checked it. Dash u treats a reference to an unset variable as an error, which catches typos. And pipefail, from chapter three, makes a failing pipeline stage count. These help, but dash e in particular has rules that surprise experienced people, and the table lists them. A failure does not stop the script if the command is an if or while condition, if it comes before and and or or or, or if it happens inside a function that was itself called from one of those places. So a perfectly reasonable if summarise then line disables dash e for everything summarise does. That's why the script on the left doesn't rely on dash e alone. Each important step ends with or or die, an explicit check that prints a message and exits. You can see exactly where failure is handled by reading the code. The other half is cleanup. The script creates a temporary working directory with mktemp dash d, and immediately sets a trap on EXIT that removes it. That trap runs however the script ends: success, a die, or an interrupt. The bottom card shows the interrupted run from the plan. Control C stops make-report half way, and the temporary directory is gone anyway. Every mktemp should be followed by its trap. Next: publishing results safely, and two runs at once.",
}
