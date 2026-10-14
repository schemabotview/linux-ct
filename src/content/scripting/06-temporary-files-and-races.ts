import type { Section } from '../types'

export const temporaryFilesAndRaces: Section = {
  id: 'temporary-files-and-races',
  title: 'Temporary files, concurrency and publishing',
  scene: 'scripting-publish',
  focus: 'compare',
  slide: `## Temporary files, concurrency and publishing

Another program may read the report **while** make-report is writing it. Publish results so readers never see half of one.

### Write, then rename
- Write a temporary file in the **same directory**
- \`mv\` it over the target: the name switches **atomically**
- Readers see the **old** report or the **new** one, never a partial one

### What rename does not promise
- **Across filesystems**, \`mv\` copies — not atomic
- **Atomic is not durable**: after a crash, data may not be on disk yet
- \`mktemp\` creates mode **0600** — set the mode you want before publishing

### Two runs at once
- A timer and a person can both start it
- \`flock -n\` refuses a second run *(util-linux)*`,
  narration:
    "Once make-report runs on a schedule, other programs will read its output, and they don't wait politely until it's finished. The table compares two ways of writing reports slash latest dot csv. Write it directly, and a reader that opens the file mid-run sees half a report; so does everyone after a crash. Instead, write to a temporary file in the same directory, and when it is complete, mv it over the target. On one filesystem, that rename replaces the name in a single step, so any reader sees either the complete old report or the complete new one, never a mixture. Note the details in the code. mktemp creates the temporary file next to the target, not in slash tmp, because a rename across filesystems becomes a copy and loses the atomic switch. mktemp also creates files readable only by their owner, mode six hundred, so the script sets the mode it actually wants before publishing. And there's a limit the plan insists on. Atomic is not durable. After a power cut, the rename may have reached the disk and the data not, or neither. Durability needs an explicit flush, which chapter eight explains. The other problem is two runs at once, say the timer and a person testing. Both would write and rename, and the results would interleave. The first two lines open a lock file on descriptor nine, and flock dash n takes an exclusive lock without waiting, so a second run exits with a clear message instead. Next: logging, safe reruns and retries.",
}
