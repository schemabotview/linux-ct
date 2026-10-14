import type { Section } from '../types'

export const loggingAndIdempotency: Section = {
  id: 'logging-and-idempotency',
  title: 'Logging, idempotency and retries',
  scene: 'scripting-robustness',
  focus: 'idem',
  slide: `## Logging, idempotency and retries

An automated script will be interrupted, rerun and run twice. Design so that every one of those is **safe**.

### Log what happened
- Timestamp, action, input — to **stderr**
- \`logger -t make-report\` also sends it to the system **journal**

### Idempotent: run twice = run once
- A **done marker** per input, written only **after** success
- Rerunning skips completed work: a crash after file 40 of 100 redoes only the **remaining 60**

### Retries
- **Bounded**: three attempts, not forever
- **Back off** between attempts; log each failure
- Retry only what can **succeed later**: a busy server, not a bad file`,
  narration:
    "Once a script runs unattended, three things will certainly happen to it. It will be interrupted, it will be rerun, and sooner or later it will run twice for the same day. Each of those should be harmless. Start with logging. The log function prints a timestamp and a message to standard error, and also hands the message to logger, which writes it to the system journal tagged make-report. When something goes wrong at three in the morning, the journal is where you'll look first, in chapter six. Next, idempotency: running the script twice should have the same effect as running it once. The loop gives each input file a done marker in a state directory, and skips files that already have one. The crucial detail is the order. The marker is written only after the file was processed successfully. Write it first, and a crash in between marks unfinished work as done. The same design gives you resumable partial completion. If the script dies after forty files out of a hundred, the next run processes only the remaining sixty. Finally, retries. Some failures are temporary: a busy disk, a network hiccup. The inner loop tries each file up to three times, waiting longer after each failure and logging every attempt, then gives up on that file and moves on. Two rules keep retries honest. Always bound them, and only retry what could succeed later. A malformed file will fail the same way every time. The bottom card is the morning after: the journal shows three attempts on store twelve and the give-up, and the state directory shows that a rerun will redo only that one file. Last in this chapter: handing the script to a scheduler.",
}
