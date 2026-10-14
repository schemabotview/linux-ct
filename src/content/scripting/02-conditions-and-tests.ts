import type { Section } from '../types'

export const conditionsAndTests: Section = {
  id: 'conditions-and-tests',
  title: 'Conditions, tests and branching',
  scene: 'scripting-conditions',
  focus: 'checks',
  slide: `## Conditions, tests and branching

\`if\` runs a **command** and branches on its **exit status**: zero means true. A test is just a command that answers with a status.

### Tests
- \`[[ … ]]\` — Bash's test: files, strings, numbers; no word splitting inside
- \`-d\`, \`-f\`, \`-r\` — directory, regular file, readable
- \`==\` compares strings; \`-eq\`, \`-lt\` compare integers

### Any command can be a condition
- \`if grep -q ',,' file\` — branch on whether grep matched

### Validate first, fail clearly
- Check arguments and inputs **before** doing any work
- Message to stderr, then a **distinct exit status**: 2 for usage, 3 for bad input

### A shortcut with a catch
- In \`a && b || c\`, **c** also runs when **b** fails`,
  narration:
    "Scripts make decisions with if, and the key idea is that if does not evaluate an expression. It runs a command and looks at its exit status. Zero means true; anything else means false. A test is simply a command whose only job is to answer with a status. The block on the left is the start of make-report's real work: validating its inputs before touching anything. The first check uses double square brackets, Bash's test command, to compare dollar hash, the argument count, with two. If it's wrong, the script prints a usage line to standard error and exits with status two. The second check asks whether the input is a directory, with dash d, and whether it's readable, with dash r, and exits with status three if not. Using different statuses for different failures lets whatever runs this script, a person or a scheduler, tell them apart. The third check shows that any command can be a condition. grep dash q prints nothing, and its status says whether it found two commas in a row, meaning an empty field. The table lists the tests you will use most. Note that double equals compares strings, while dash e q and dash l t compare integers; mixing them up gives wrong answers without errors. And one shortcut deserves a warning. a and and b or or c looks like if-then-else, but c also runs when b fails. Use a real if when that matters. Next: loops and functions.",
}
