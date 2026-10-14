import type { Section } from '../types'

export const blockDevicesAndTheStack: Section = {
  id: 'block-devices-and-the-stack',
  title: 'Block devices, partitions and the storage stack',
  scene: 'storage-stack',
  focus: 'lv',
  slide: `## Block devices, partitions and the storage stack

Between a path and a disk there may be **several layers**, each a block device built on the one below.

### Reading \`lsblk\`
- **disk** → **part**itions → optional **crypt** (LUKS) → **lvm** volumes
- Each row shows its filesystem type and where it is mounted

### Tracing a path to its storage
- \`findmnt -T /var/lib/reportd\` — the mount that holds it
- Here: \`/var\`, on logical volume \`vg0-var\`

### Why it matters
- Each layer has its own **failure** and its own **tool**
- An encrypted layer must be **unlocked** before anything above it exists
- "Disk full" is a property of **one filesystem**, not of the machine`,
  narration:
    "On a simple machine, a disk holds partitions and each partition holds a filesystem. Real servers often stack more layers in between, and lsblk shows them as a tree. Read this one from the top. One NVMe disk has three partitions. The first is the small EFI system partition from chapter six, mounted at slash boot slash efi. The second holds slash boot. The third is encrypted with LUKS, and when it's unlocked at boot it appears as a new block device, the crypt row. That device is in turn a physical volume for LVM, which carves it into logical volumes: one for the root filesystem, and one for slash var. Every layer is a block device built on the one beneath it. Now trace a path down through the stack, as the plan asks. findmnt dash capital T, given reportd's state directory, reports the mount that contains it: slash var, on the logical volume vg zero dash var. So reportd's data passes through a filesystem, a logical volume, an encryption layer, a partition and finally the disk, as the diagram below lays out. That matters for two reasons. Each layer has its own way of failing and its own tools: an encrypted volume that won't unlock is a different problem from a filesystem error. And capacity belongs to a single filesystem. When slash var fills up, slash may have plenty of room, and reportd still can't write. Next: filesystems, mount options, and fstab.",
}
