import type { Section } from '../types'

export const lvmRaidAndFailureDomains: Section = {
  id: 'lvm-raid-and-failure-domains',
  title: 'LVM, RAID and failure domains',
  scene: 'storage-redundancy',
  focus: 'threats',
  slide: `## LVM, RAID and failure domains

**LVM** makes storage **flexible**. **RAID** makes it **survive a disk failure**. Neither is a backup.

### LVM
- Physical volumes join a **volume group**; logical volumes are carved from it
- \`lvextend --resizefs\` grows a volume and its filesystem together

### RAID 1
- Every write goes to **two disks**
- One disk can fail with **no downtime and no data loss**

### Redundancy is not backup
- A mirror copies **mistakes and corruption instantly**
- Both copies share one **failure domain**: host, room, attacker
- A backup is **independent**, **older**, and **elsewhere**`,
  narration:
    "Two technologies often sit in the storage stack, and they solve different problems. LVM, the logical volume manager, is about flexibility. Disks or partitions become physical volumes, they're pooled into a volume group, and logical volumes are carved out of the pool. The payoff is in the card. When slash var runs short, vgs shows the free space left in the group, and lvextend dash dash resizefs grows the logical volume and the filesystem on it in one step, while it's mounted. RAID is about surviving hardware failure. In RAID one, every write goes to two disks, so when one dies, the other carries on with no downtime and no data lost. Here is the contrast the plan insists on, and the table lays it out. Ask what survives each failure. A dead disk? The mirror survives it, and so does a backup. Now an administrator runs rm dash r f on the wrong directory. The mirror faithfully deletes the files on both disks, immediately. Same for an application that writes bad data, or corruption from a bug. And both disks share a failure domain: the same server, the same room, the same attacker. A fire, a theft or ransomware on the host takes both. A backup survives all of these, but only because it is independent of the original, older than the mistake, and stored somewhere else. So redundancy keeps the service running through a hardware fault. A backup is what lets you recover from everything else. Next: what a successful write actually promises.",
}
