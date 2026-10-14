import type { Section } from '../types'

export const filesystemsAndFstab: Section = {
  id: 'filesystems-and-fstab',
  title: 'Filesystems, mount options and fstab',
  scene: 'storage-mounts',
  focus: 'apply',
  slide: `## Filesystems, mount options and fstab

A **filesystem** organises a block device into files and directories. **Mounting** attaches it to the tree at a directory; \`/etc/fstab\` makes that happen at every boot.

### An fstab line
- **Device** by \`UUID=\`, **mount point**, **type**, **options**, dump, fsck order
- systemd turns each line into a \`.mount\` unit

### Options with consequences
- \`nofail\` — boot continues if this disk is missing
- \`noexec\`, \`nodev\`, \`nosuid\` — refuse programs, device files, set-ID
- \`ro\` — read-only

### Apply it safely
- \`findmnt --verify\` checks the file
- Mount it **now** and look — before trusting a reboot
- A bad line without \`nofail\` stops boot in **emergency mode**`,
  narration:
    "A filesystem is the structure that turns a block device into named files and directories: ext4 here, which is Debian's default. To use one, it has to be mounted, attached to the directory tree at a mount point, and slash etc slash fstab lists the mounts to make at every boot. The first card adds a data disk for archived reports. Each line has six fields: the device, by UUID as the previous section recommended, the mount point, the filesystem type, a comma-separated list of options, and two numbers for the old dump tool and for the order of filesystem checks at boot. On a systemd system, each line is turned into a mount unit, so the same dependency machinery from chapter six applies. The options deserve thought. nofail means that if this disk is missing at boot, the system carries on without it. Without it, a missing data disk stops the whole boot. noexec, nodev and nosuid refuse to run programs, honour device files, or apply set-ID bits from this filesystem, which is sensible for a disk that only stores data. ro mounts it read-only. Then apply it carefully, because fstab mistakes surface at the worst moment: the next reboot. findmnt dash dash verify checks the file for syntax errors, unknown UUIDs and wrong types. daemon-reload regenerates the mount units, and mounting it now lets you confirm the options took effect, as the last line shows. A broken line without nofail drops the next boot into emergency mode, needing the console. Next: when the disk fills, and the numbers don't agree.",
}
