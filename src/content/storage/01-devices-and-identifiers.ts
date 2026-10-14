import type { Section } from '../types'

export const devicesAndIdentifiers: Section = {
  id: 'devices-and-identifiers',
  title: 'Device discovery, udev and stable identifiers',
  scene: 'storage-devices',
  focus: 'names',
  slide: `## Device discovery, udev and stable identifiers

When the kernel finds a disk, it creates a **device file** under \`/dev\`. Its name depends on **discovery order** — so it can change.

### From hardware to a name
- A driver detects the device: \`sda\`, \`nvme0n1\`
- **udev** reads its serial numbers and filesystem IDs
- …and creates **stable symlinks** under \`/dev/disk/\`

### Names that change, names that do not
- \`/dev/sdb\` today may be \`/dev/sdc\` after adding a disk
- \`/dev/disk/by-id/…\` follows the **physical disk**
- \`UUID=…\` follows the **filesystem** on it

### The rule
- Configuration that must survive a reboot uses **UUID** or **by-id**
- \`blkid\` and \`lsblk -f\` show each filesystem's UUID and type`,
  narration:
    "Chapter eight is about where reportd's data actually lives, starting with the disks themselves. When the kernel discovers a storage device, a driver gives it a name, like s d a for a SATA disk or n v m e zero n one for an NVMe drive, and a device file appears under slash dev. The catch is that these names are handed out in discovery order. Add a disk, move a cable, or let two controllers race at boot, and yesterday's s d b can become today's s d c. Anything that refers to a disk by that name can suddenly point at the wrong one. That's why udev exists. When a device appears, udev reads its identifiers, such as the model and serial number, and the UUID of any filesystem on it, and creates symbolic links under slash dev slash disk that don't change. The card shows two of them. The by-id links are named after the physical disk's model and serial, so they follow the hardware wherever it's plugged in. blkid shows the filesystem's UUID, a random identifier written when the filesystem was created, so it follows the filesystem, even if it's copied to another disk. The table turns that into a rule. Kernel names are fine for a quick look right now. To choose a physical disk, for example one to replace, use by-id. And for anything that must survive a reboot, especially slash etc slash fstab, use UUID. Next: the layers between a path and a disk.",
}
