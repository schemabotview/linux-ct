import type { Section } from '../types'

export const snapshotsAndBackups: Section = {
  id: 'snapshots-and-backups',
  title: 'Snapshots, backups, consistency and retention',
  scene: 'storage-backups',
  focus: 'kinds',
  slide: `## Snapshots, backups, consistency and retention

A backup is only useful if it can be **restored to a working state**. That depends on **when** and **how** it was taken.

### Two kinds of consistency
- A **snapshot** of a running database is **crash-consistent**: like pulling the plug
- The application's **own backup** is **application-consistent**: ready to use

### reportd's backup
- \`sqlite3 … ".backup …"\` — a consistent copy of the state database
- Reports archived with \`tar\`; both copied to **another host**

### Retention
- **Several generations**: a mistake may be noticed late
- At least one copy **off the host** and ideally off the site
- Backups are only trusted once a **restore** has been tested`,
  narration:
    "A backup is only worth what you can restore from it, and that depends on how it was taken. The table contrasts two methods. An LVM or filesystem snapshot captures every block at one instant, which is quick and convenient. But if a database was in the middle of a transaction at that instant, the snapshot contains exactly what a sudden power cut would have left. That's called crash-consistent. The database will probably recover from it, but it has to go through its crash recovery to do so, and not every application can. The alternative is to ask the application itself for a backup. Then you get a state the application vouches for, ready to use as it is: application-consistent. The card is reportd's nightly backup. sqlite3's dot backup command takes a consistent copy of the state database while reportd keeps running. tar archives the reports directory, as in chapter three. And rsync copies both to another host, because a backup on the same machine shares that machine's fate, as the previous section showed. Retention is the other half. Keeping only last night's copy is not enough, because mistakes are often noticed late. Keep several generations: here seven daily and four weekly, so you can go back to before last month's bad change. Keep at least one copy away from the host, and ideally away from the site. And remember chapter ten's point now: a backup you haven't restored from is a hope, not a plan. Last in this chapter: when storage fails.",
}
