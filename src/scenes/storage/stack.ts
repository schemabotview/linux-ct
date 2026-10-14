import type { Scene } from '@graphlearning/flow'

// §2 — the layers between a path and the hardware, read from lsblk, then reportd's state path traced
// down to the logical volume that holds it. Layout illustrative: EFI + /boot + LUKS + LVM.
export const storageStack: Scene = {
  id: 'storage-stack',
  title: 'The storage stack',
  flow: 'TB',
  nodes: [
    {
      id: 'lsblk',
      kind: 'code',
      filename: 'bash — lsblk, illustrative output',
      label: `$ lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
NAME                SIZE TYPE  FSTYPE      MOUNTPOINTS
nvme0n1           476.9G disk
├─nvme0n1p1         512M part  vfat        /boot/efi
├─nvme0n1p2         1.0G part  ext4        /boot
└─nvme0n1p3       475.4G part  crypto_LUKS
  └─nvme0n1p3_crypt 475.4G crypt LVM2_member
    ├─vg0-root       40G lvm   ext4        /
    └─vg0-var       200G lvm   ext4        /var
$ findmnt -T /var/lib/reportd -o TARGET,SOURCE
TARGET SOURCE
/var   /dev/mapper/vg0-var`,
    },
    {
      id: 'layers',
      label: 'From path to platter, for /var/lib/reportd',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'path', label: 'Path', sub: '/var/lib/reportd', pattern: 'user', icon: 'folder' },
        { id: 'fs', label: 'Filesystem', sub: 'ext4, mounted at /var', pattern: 'service', icon: 'file' },
        { id: 'lv', label: 'Logical volume', sub: 'vg0-var: resizable', pattern: 'service', icon: 'layers' },
        { id: 'crypt', label: 'Encryption', sub: 'LUKS: locked at rest', pattern: 'network', icon: 'lock' },
        { id: 'part', label: 'Partition', sub: 'nvme0n1p3', pattern: 'storage', icon: 'harddrive' },
        { id: 'disk', label: 'Disk', sub: 'one NVMe device', pattern: 'storage', icon: 'server' },
      ],
    },
  ],
  edges: [{ source: 'lsblk', target: 'layers', label: 'read top-down' }],
}
