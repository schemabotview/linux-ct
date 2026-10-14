import type { Section } from '../types'

export const backupAndRestoreValidation: Section = {
  id: 'backup-and-restore-validation',
  title: 'Backup strategy, restore validation and objectives',
  scene: 'operations-restore',
  focus: 'timeline',
  slide: `## Backup strategy, restore validation and objectives

Two numbers turn "we have backups" into a **plan you can test**.

### Recovery objectives
- **RPO** — how much recent data you can afford to lose: here **24 hours**
- **RTO** — how long until it works again: here **2 hours**
- Agree them **with the people who rely on the service**

### A restore drill
- On a **scratch host**, never over production
- In order: **dependencies**, then **data**, then **the application**
- Time every step — the total is your real RTO

### Validate the data, not the files
- Checksums match the backup log
- The database's own **integrity check** passes
- **Row counts** and a real request match what was recorded`,
  narration:
    "Chapter eight said a backup you haven't restored from is a hope, not a plan. Two numbers turn it into a plan you can test. The recovery point objective is how much recent data you can afford to lose. reportd takes nightly backups, so up to twenty-four hours of records could be lost; if that's too much, back up more often. The recovery time objective is how long the service can be down. Here, two hours. These are business decisions, so agree them with the people who rely on reportd, not just among administrators. Then prove them with a drill. The table is the plan's supplied restore evidence, from a quarterly drill on a scratch host, never on top of production. The order matters. First the dependencies: a host, with the right version of reportd installed. Then the data: the state database, copied back, with a checksum that matches the one recorded when the backup was taken. Then the database's own integrity check. Then the reports archive, with its file count. And finally the application: a real request to slash reports slash latest that returns the right totals. The total time, thirty-one minutes, is your measured recovery time, comfortably inside the objective. The card shows the most important principle. Validate the data, not just the files. A file can copy perfectly and still contain a broken database. So the drill runs SQLite's integrity check, and compares a row count with the count the backup job recorded. Only then is the backup known to be good. Next: recovering each layer, and two very different incidents.",
}
