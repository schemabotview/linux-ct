import type { Section } from '../types'

export const integratedLifecycle: Section = {
  id: 'integrated-lifecycle',
  title: 'The integrated service lifecycle',
  scene: 'operations-lifecycle',
  focus: 'crossing',
  slide: `## The integrated service lifecycle

reportd began as one command in chapter 1. It is now a **supervised, limited, recoverable service** — and every part of it is something you can explain.

### Eight parts, eight chapters
- Files, identity, unit and timer, listener
- Storage, logs, limits, recovery plan

### When a symptom crosses layers
- Name the **next evidence**, not the final answer
- 503s → the app's queue; full disk with space → inodes or deleted-open
- Start failure after an update → journal, then permissions, then policy

### Where competence comes from
- This course gives the **models**; operating real systems needs **supervised practice**
- Next: a distribution in depth, networking, security, or kernel and containers`,
  narration:
    "In chapter one, reportd was an empty directory and a first command. Here it is now, as one picture. Its files live in the places chapter two described. It runs as its own identity, from chapter four. A unit and a timer, from chapter six, start it, supervise it and run its nightly report. It listens on loopback behind TLS, from chapter seven. Its data sits on a logical volume, from chapter eight. Its logs go to the journal and are rotated. Its memory and access are limited by its cgroup and sandbox, from chapters six and nine. And it has a recovery plan: tested backups, a drill and a runbook, from chapters eight and ten. Every card names the chapter that built it, and every one is something you can now explain. The table is the skill this course has really been building. When a symptom crosses layers, the goal isn't to guess the final answer immediately, but to name the next piece of evidence. Five oh threes from the proxy point to reportd's accept queue and journal, a network symptom with an application cause. Writes failing on a disk with free space point to inodes, or a deleted-but-open file. A start failure after an update points to the journal, then permissions, then policy. An OOM kill on a host with free memory points to the cgroup's limit. One honest boundary to finish with. This course has given you working models of a Linux system. Real operational competence comes from practice on real systems, ideally with someone experienced alongside. From here, you might go deeper into one distribution, into networking, into security, or into the kernel and container platforms.",
}
