import type { Section } from '../types'

export const loopsAndFunctions: Section = {
  id: 'loops-and-functions',
  title: 'Loops, functions and scope',
  scene: 'scripting-loops',
  focus: 'func',
  slide: `## Loops, functions and scope

Loops repeat a block for each item; functions give a name to a block so it can be reused and tested on its own.

### for over files
- \`for file in "$input_dir"/*.csv\` — one name per pass, spaces safe
- Guard with \`[[ -e $file ]] || continue\` when nothing matched

### Functions
- \`name() { … }\` defines a command; arguments arrive as \`$1\` …
- \`local\` keeps a variable **inside** the function
- Without \`local\`, every variable is **global** to the script

### Ending early
- \`continue\` / \`break\` — next item / leave the loop
- \`return\` — end the **function** with a status
- \`exit\` — end the **whole script**`,
  narration:
    "make-report needs to do the same thing for every CSV file in the input directory, which is what loops are for. for file in, followed by the input directory and star dot csv, gives the loop one complete filename per pass, spaces and all, because the glob produces whole words, as chapter three explained. There is one edge case. If the directory has no CSV files, Bash passes the pattern through literally, so the first line inside the loop checks that the file exists, and continue skips to the next pass if not. The work for each file lives in a function called summarise. A function is a command you define yourself. Inside it, dollar one is the function's own first argument, not the script's. The word local makes the variable file exist only inside the function. That matters more than it looks. Without local, every variable in a Bash script is global, so a function can silently overwrite a variable its caller was using. The loop calls summarise inside command substitution, captures the count, prints the filename and count, and adds the count to a running total, which is printed at the end. The double dollar parentheses do integer arithmetic. Finally, four ways to stop early, which are easily confused. continue moves on to the next item. break leaves the loop. return ends a function and sets its status. And exit ends the entire script, wherever it is called from. Next: getting arguments and input lines through a script intact.",
}
