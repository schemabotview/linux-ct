import type { Scene } from '@graphlearning/flow'

// §5 — LVM's three layers and what redundancy (RAID 1) does and does not protect against. The
// table is the plan's "redundancy versus an independent recoverable backup" contrast.
export const storageRedundancy: Scene = {
  id: 'storage-redundancy',
  title: 'LVM, RAID, and what they do not protect',
  flow: 'TB',
  nodes: [
    {
      id: 'lvm',
      label: 'LVM: pooled, resizable volumes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'pv', label: 'Physical volumes', sub: 'disks or partitions', pattern: 'storage', icon: 'harddrive' },
        { id: 'vg', label: 'Volume group', sub: 'vg0: one pool of space', pattern: 'service', icon: 'boxes' },
        { id: 'lv', label: 'Logical volumes', sub: 'root, var: grow when needed', pattern: 'user', icon: 'layers' },
      ],
    },
    {
      id: 'grow',
      kind: 'code',
      filename: 'bash — grow /var by 20G, needs root and free space in vg0',
      label: `$ sudo vgs vg0                              # check free space first
  VG  #PV #LV #SN Attr   VSize   VFree
  vg0   1   2   0 wz--n- 475.4g 235.4g
$ sudo lvextend --resizefs -L +20G vg0/var   # volume, then filesystem`,
    },
    {
      id: 'threats',
      kind: 'table',
      label: 'What survives each failure',
      headers: ['failure', 'RAID 1 mirror', 'backup elsewhere'],
      values: [
        ['one disk dies', 'yes', 'yes'],
        ['rm -rf of the wrong directory', 'no: mirrored at once', 'yes'],
        ['application writes bad data', 'no: mirrored at once', 'yes, an older copy'],
        ['fire, theft, ransomware on host', 'no: same failure domain', 'yes, if isolated'],
      ],
    },
  ],
  edges: [
    { source: 'lvm', target: 'grow' },
    { source: 'grow', target: 'threats', label: 'flexibility is not safety' },
  ],
}
