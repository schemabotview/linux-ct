import type { Section } from '../types'

export const schedulingAndLanguageChoice: Section = {
  id: 'scheduling-and-language-choice',
  title: 'Scheduling handoff and shell versus Python',
  scene: 'scripting-handoff',
  focus: 'env',
  slide: `## Scheduling handoff and shell versus Python

A script that works in your terminal can fail on a schedule, because **almost nothing about its environment is the same**.

### What changes when a scheduler runs it
- A minimal **PATH**, a different **current directory**
- **No terminal**: a prompt waits forever, or fails
- Output goes to a **log**, not your screen

### Prepare it for handoff
- **Absolute paths** for inputs, outputs and commands it relies on
- **Never prompt**; fail with a clear message and status
- A meaningful **exit status** — the scheduler acts on it

### Know when to stop writing shell
- Shell is best at **running programs and moving files**
- Real parsing, data structures or tests → **Python**`,
  narration:
    "The last step for make-report is handing it to the system to run on a schedule, which chapter six sets up with a systemd timer. Before that, it's worth knowing why scripts that work perfectly in your terminal so often fail the first time they run unattended. The table compares the two environments. Your terminal has your PATH, with any directories you've added. A scheduled job gets a minimal one: for cron, just slash usr slash bin and slash bin. Your shell is wherever you last used cd; a scheduled job starts in slash or in the home directory. There's no terminal, so anything that asks a question either waits forever or fails. And output goes to a log, or to mail, or nowhere, unless something captures it. So prepare the script. Use absolute paths for every file it reads and writes. Never prompt; fail with a message to standard error and a distinct status instead. And make the exit status meaningful, because the scheduler and its logs are how you'll learn about failures. The second table answers a question every script eventually raises: should this still be shell? Shell is excellent at running other programs, joining them in pipelines, and moving files around. It is poor at parsing structured formats like CSV and JSON properly, at data structures and arithmetic, and at being tested. When the job is mostly the second kind, or the script passes a hundred lines or so, rewrite it in Python. That completes scripting. Next chapter: software, boot, and services.",
}
