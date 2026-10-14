import type { Section } from '../types'

export const processesForkAndExec: Section = {
  id: 'processes-fork-and-exec',
  title: 'Processes: fork, exec and inheritance',
  scene: 'identity-fork-exec',
  focus: 'exec',
  slide: `## Processes: fork, exec and inheritance

A **process** is a running program with its own memory, identity and open files. New processes are made in two steps.

### Two steps
- **fork** — the parent is copied; the child gets a new **PID**
- **exec** — the child **replaces** its program with another one
- Between the two, the shell sets up **redirections** in the child

### The child inherits a copy of
- **Identity**: UID and groups
- The **exported environment**
- The **current directory**
- **Open file descriptors**

### Evidence
- Every process records its parent: **PPID**
- \`ps -o pid,ppid,cmd --forest\` draws the tree`,
  narration:
    "Every command you have run so far became a process: a running program with its own memory, its own identity and its own set of open files. Here is how a new one is made, step by step. Bash, process twenty-two oh one, reads the line sort app dot log, greater than, sorted dot log. It calls fork, and the kernel makes a copy of Bash: process twenty-two forty, the child. For a moment, two nearly identical shells exist. In the child, Bash now performs the redirection, pointing descriptor one at sorted dot log. Then the child calls exec, which replaces the Bash program inside it with slash usr slash bin slash sort. Same process, same PID, different program. That ordering explains a lot of what you've already seen. The table lists what the child inherits, always as a copy. Your user and groups, so sort can read exactly what you can and nothing more. The exported environment, which is why export mattered in chapter three. The current directory, so relative names mean the same thing. And the open file descriptors, including the redirection the shell just set up, so sort simply writes to its standard output and never knows a file is involved. Because these are copies, nothing the child does to them reaches the parent, which is the cd story from chapter one once more. Every process also records its parent's ID, PPID. ps with dash dash forest uses it to draw the family tree. Next: controlling running processes with jobs and signals.",
}
