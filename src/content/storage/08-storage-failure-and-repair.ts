import type { Section } from '../types'

export const storageFailureAndRepair: Section = {
  id: 'storage-failure-and-repair',
  title: 'Storage failure, repair boundaries and restoration',
  scene: 'storage-repair',
  focus: 'lab',
  slide: `## Storage failure, repair boundaries and restoration

Storage problems show up as **kernel errors**, failing **health checks**, or a filesystem marked **inconsistent**. Repair has prerequisites.

### Evidence
- \`dmesg\` — I/O errors from the device, errors from the filesystem
- \`smartctl -H\` — the disk's own health verdict *(smartmontools)*

### Rehearse on a disposable image
- \`truncate\` + \`mkfs.ext4\` — a filesystem in a file under \`~/lab\`
- \`e2fsck -n\` — check **read-only** first; \`-y\` repairs

### On a real disk
- **Unmount** — never repair a mounted filesystem
- A **failing disk**: copy it first; repair works on the copy
- **Repair is not restore**: it may lose files; a tested backup may be faster`,
  narration:
    "Finally, what to do when storage actually fails. The evidence usually arrives in the kernel log first. The card shows two kinds. The first line is from the NVMe driver: an I/O error reading a block, which means the device itself failed a request. The second is from ext4, which hit a problem reading a directory. smartctl, from the smartmontools package, asks the drive for its own health assessment, and this one reports failed. Together that points at failing hardware, not just a damaged filesystem. Repair is something to rehearse before you need it, and the plan is explicit that you shouldn't practise on real disks. The middle card creates a disposable filesystem inside a one hundred megabyte file in the lab directory. e2fsck can check it like a real disk. The dash n flag opens it read-only and answers no to every proposed fix, so you can see what it would change before letting it change anything. Then dash y applies the repairs. On a real system, the order in the bottom box matters. Stop writing, and unmount the filesystem: repairing a mounted filesystem can destroy it. If the disk itself is failing, every read stresses it further, so copy the whole device to healthy storage first and repair the copy. Check before fixing. And keep in mind that repair and restore are different things. fsck makes a filesystem consistent again, which can mean discarding damaged files. Often the faster, safer path is a fresh filesystem and a tested restore. Next chapter: diagnosing resource problems systematically.",
}
