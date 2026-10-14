import type { Scene } from '@graphlearning/flow'

// §1 — kernel device names are assigned in discovery order and can change between boots; udev
// creates stable symlinks under /dev/disk/ from serial numbers and filesystem UUIDs. IDs and UUIDs
// illustrative.
export const storageDevices: Scene = {
  id: 'storage-devices',
  title: 'Devices and stable names',
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: 'A disk appears',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'kernel', label: '1 · Kernel', sub: 'driver finds it: nvme0n1', pattern: 'service', icon: 'cpu' },
        { id: 'udev', label: '2 · udev', sub: 'reads its IDs, applies rules', pattern: 'service', icon: 'gears' },
        { id: 'links', label: '3 · /dev/disk/', sub: 'stable symlinks to the node', pattern: 'storage', icon: 'link' },
      ],
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — illustrative output, trimmed',
      label: `$ ls -l /dev/disk/by-id/ | grep -v part
nvme-SAMSUNG_MZVL2512_S5XYNA0R123456 -> ../../nvme0n1
ata-WDC_WD40EFRX_WD-WCC7K1234567    -> ../../sda
$ sudo blkid /dev/sda1
/dev/sda1: UUID="9a6e…c41d" TYPE="ext4" PARTUUID="5c1e…-01"`,
    },
    {
      id: 'names',
      kind: 'table',
      label: 'Which name to use',
      headers: ['name', 'stable?', 'use it for'],
      values: [
        ['/dev/sda, /dev/nvme0n1', 'no: discovery order', 'a quick look, now'],
        ['/dev/disk/by-id/…', 'yes: the hardware', 'picking a physical disk'],
        ['UUID=… (filesystem)', 'yes: the filesystem', 'fstab and mounting'],
      ],
    },
  ],
  edges: [
    { source: 'flow', target: 'evidence' },
    { source: 'evidence', target: 'names' },
  ],
}
