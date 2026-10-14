import type { Section } from '../types'

export const changeControlAndRunbooks: Section = {
  id: 'change-control-and-runbooks',
  title: 'Controlled changes, rollback, runbooks and communication',
  scene: 'operations-change',
  focus: 'runbook',
  slide: `## Controlled changes, rollback, runbooks and communication

Most outages follow a **change**. Writing the change down **before** making it is how you make it safe.

### A change record
- **What** and **why**; the **risk** you expect
- How you will **test** it; the **rollback**, with its time
- **When**, and who has been told

### A runbook
- Written **before** the incident, used **during** it
- Ordered checks, each pointing to its evidence
- A **time limit** after which you roll back first and investigate after

### Communicating during an incident
- **Impact**, **what is known**, **what is not yet known**
- The time of the **next update** — and keep to it
- Afterwards: a **blameless review** — what made the mistake easy?`,
  narration:
    "Look back at this course's incidents and most of them began with a change: an upgrade, a configuration edit, a new firewall rule. So the last operational habit is making changes deliberately. The first card is a change record, written before the reportd two point six upgrade. What is changing, and why. The risk: the service might fail to start, which staging already showed, in section three. How it will be tested. The rollback, and how long it takes: under five minutes. And the window, announced to the people who use reportd. Writing it takes ten minutes, and it forces you to know the rollback before you need it. The second card is a runbook for reportd being down. It's written before the incident, by someone calm, and used during it, by someone who may not be. Each step is an ordered check pointing at evidence from an earlier chapter: which class of failure curl reports, the service's status and journal, disk space and inodes, the cgroup's OOM count, recent changes. And step six is a time limit: if it's still down after fifteen minutes, roll back the last change first and investigate afterwards. Restoring service usually matters more than understanding the cause immediately. Finally, communication. People affected by an outage need four things in every update: the impact, who is affected and how; what is known, with times; what is not known yet, said plainly; and when the next update will come. Then keep to that time, even if there's nothing new. And afterwards, hold a blameless review: not who made the mistake, but what made it easy to make, and what will make it harder next time. Last: the whole system, in one picture.",
}
