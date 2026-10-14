import type { Section } from '../types'

export const pipelinesAndStatus: Section = {
  id: 'pipelines-and-status',
  title: 'Pipelines and exit status',
  scene: 'shell-pipelines',
  focus: 'session',
  slide: `## Pipelines and exit status

A **pipeline** runs several commands **at the same time**, connecting each one's stdout to the next one's stdin. stderr is **not** piped.

### Exit status
- Every command ends with a number: **0** means success
- Non-zero means failure — what each value means is up to the command
- \`$?\` holds the status of the **last** command

### A pipeline's status
- By default, it is the status of the **last** stage only
- An early failure can hide behind a successful \`wc\`
- \`\${PIPESTATUS[@]}\` lists every stage *(Bash)*
- \`set -o pipefail\` makes the pipeline fail if **any** stage fails *(Bash)*

### Not every non-zero is an error
- \`grep\` returns **1** when nothing matched`,
  narration:
    "The vertical bar joins commands into a pipeline. The shell starts every stage at the same time, as separate processes, and connects the standard output of each one to the standard input of the next. Data flows through as it is produced, without temporary files. Notice what is not connected: standard error. When grep can't open its file, its complaint goes straight to the terminal, not down the pipe. Every command also finishes with an exit status, a number from zero to two hundred and fifty-five. Zero means success. Anything else means some kind of failure, and what each value means is documented per command. Dollar question mark holds the status of the last command that ran. And this is where pipelines surprise people. The status of a pipeline is the status of its last stage. In the session, grep fails with status two because the file is missing, but wc happily counts zero lines and succeeds, so the whole pipeline reports success. A script checking dollar question mark would carry on as if nothing were wrong. Bash offers two remedies. The PIPESTATUS array records every stage's status, here two then zero. And set dash o pipefail makes the pipeline's status the rightmost non-zero one, so the failure surfaces. Both are Bash features, not portable shell. One more reading tip: non-zero is not always an error. grep returns one simply when nothing matched. Next: what Bash does to your command line before running anything.",
}
