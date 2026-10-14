import type { Scene } from '@graphlearning/flow'

// §8 — signs of storage failure, and filesystem repair rehearsed on a disposable image file, never a
// real disk. e2fsck needs the filesystem unmounted; -n opens it read-only and answers "no" to every
// fix. smartctl is smartmontools. Output illustrative.
export const storageRepair: Scene = {
  id: 'storage-repair',
  title: 'Failure, repair, restore',
  flow: 'TB',
  nodes: [
    {
      id: 'signs',
      kind: 'code',
      filename: 'bash — evidence, illustrative output',
      label: `$ sudo dmesg --level=err | tail -2
nvme0n1: I/O Cmd(0x2) @ LBA 81920, 8 blocks, I/O Error (sct 0x2 / sc 0x81)
EXT4-fs error (device dm-2): ext4_find_entry:1683: inode #1311: reading directory lblock 0
$ sudo smartctl -H /dev/nvme0n1
SMART overall-health self-assessment test result: FAILED!`,
    },
    {
      id: 'lab',
      kind: 'code',
      filename: 'bash — rehearse on a disposable image in ~/lab',
      label: `$ truncate -s 100M ~/lab/disk.img && mkfs.ext4 -q ~/lab/disk.img
$ e2fsck -fn ~/lab/disk.img      # -n: read-only, change nothing
~/lab/disk.img: 11/25600 files (0.0% non-contiguous), 5953/25600 blocks
$ e2fsck -fy ~/lab/disk.img      # only now repair — and only unmounted`,
    },
    {
      id: 'order',
      label: 'When it is a real disk',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'stop', label: '1 · Stop writing', sub: 'unmount; every write risks more', icon: 'ban' },
        { id: 'copy', label: '2 · Copy first', sub: 'image a failing disk before repair', icon: 'copy' },
        { id: 'fsck', label: '3 · Check, then fix', sub: 'fsck -n before fsck -y', icon: 'wrench' },
        { id: 'restore', label: '4 · Or restore', sub: 'a tested backup may be quicker', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'signs', target: 'lab', label: 'practise first' },
    { source: 'lab', target: 'order' },
  ],
}
