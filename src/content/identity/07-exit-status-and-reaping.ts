import type { Section } from '../types'

export const exitStatusAndReaping: Section = {
  id: 'exit-status-and-reaping',
  title: 'Exit status, waiting and zombies',
  scene: 'identity-reaping',
  focus: 'zombie',
  slide: `## Exit status, waiting and zombies

A process ends in **two steps**: it **exits**, then its parent **collects** the exit status. Between the two, it is a **zombie**.

### The parent's job
- \`wait\` returns the child's **exit status** to the parent
- In Bash, \`wait "$pid"\` puts it in \`$?\`
- Collecting it **reaps** the child: the entry disappears

### Reading a zombie
- **State Z**, shown as \`<defunct>\`
- Holds **no memory** and uses **no CPU** — just a process-table slot
- It has already exited: **killing it does nothing**

### Fixing it
- Find the **parent** (PPID) — it is not calling wait
- If the parent dies, **PID 1 adopts** the orphans and reaps them`,
  narration:
    "Exiting is only half of a process's ending. When a program finishes, it calls exit with a status number, and the kernel frees its memory and closes its files. But the status still has to be delivered to someone: the parent, which may want to know whether the child succeeded. So the kernel keeps a small entry for the child until the parent collects that status by calling wait. Collecting it is called reaping, and then the entry is gone. The row at the top shows the life cycle. In the session, Bash starts make-report in the background and saves its PID. wait on that PID blocks until the child finishes, and then dollar question mark holds its status, three, the code the script chose for invalid input. Between exiting and being reaped, a process is a zombie. ps shows it with state Z, and the command in angle brackets, defunct. A zombie holds no memory and uses no CPU; it is only a process table entry holding a number. That's why the next line achieves nothing: kill dash nine on a zombie does nothing, because the process has already exited. There is nothing left to kill. So a zombie is evidence about its parent. Look at its PPID, and find out why that program never calls wait. A few zombies are harmless; thousands can exhaust the process table. And if the parent itself exits, its orphaned children are adopted by process one, systemd, which reaps them promptly. Last in this chapter: the live evidence the kernel keeps about each process.",
}
