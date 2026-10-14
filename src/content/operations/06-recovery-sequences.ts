import type { Section } from '../types'

export const recoverySequences: Section = {
  id: 'recovery-sequences',
  title: 'Boot, service, network and storage recovery',
  scene: 'operations-recovery',
  focus: 'contrast',
  slide: `## Boot, service, network and storage recovery

Every layer has its **first evidence** and its **first move** — each one built in an earlier chapter.

### By layer
- **Boot** — older kernel or rescue target
- **Service** — roll back the package or configuration
- **Network** — the console, then revert the change
- **Storage** — stop writes, copy, then restore

### Two incidents, different sequences
- **Compromised credential** — **contain** first, then investigate; the host may not be trustworthy
- **Data loss** — **restore** from the last good backup; the host is fine
- Doing the wrong one first makes things worse

### Rolling back a package
- Needs a repository that still carries the **old version**
- \`apt-mark hold\` stops it upgrading again`,
  narration:
    "When something breaks, the first job is to recover, and the table collects the recovery paths you have already learned, one per layer. If the system won't boot, chapter six's older kernel or rescue target gets you a working shell. If a service fails, its status and journal identify the problem, and the fastest recovery is often to roll back the package or configuration that changed. If the network is broken, often by your own change, the console from chapter seven lets you revert it. And if storage fails, chapter eight's sequence applies: stop writing, copy, then restore. The plan's contrast is in the second table, because two incidents that both feel like emergencies need opposite instincts. Suppose an SSH key has been stolen. The first move is containment: remove the key and end its sessions, before anything else. Then investigate what it touched, using the auth log and the journal. And until you know, don't trust the host; it may need rebuilding from scratch. Now suppose the reports were deleted by mistake. Nothing hostile happened, the host is fine, and the first move is simply to stop writes and restore from the last good backup, validated as in the previous section. Restoring first after a compromise can bring the attacker's changes back. Investigating at length before restoring lost data just extends the outage. The card shows a service rollback concretely. One honest caveat: pinning the old version requires a repository that still has it, here reportd's own, and apt-mark hold prevents the next upgrade from undoing the rollback. Next: making changes, and talking during incidents.",
}
