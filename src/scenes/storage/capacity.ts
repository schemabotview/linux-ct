import type { Scene } from '@graphlearning/flow'

// §4 — three views of "space" that disagree, and why: inode exhaustion, a deleted-but-open file
// (lsof +L1 lists open files with link count 0) and a directory hidden under a mount. ext4 also
// reserves ~5% for root by default. Numbers illustrative.
export const storageCapacity: Scene = {
  id: 'storage-capacity',
  title: 'Space that does not add up',
  flow: 'TB',
  nodes: [
    {
      id: 'views',
      kind: 'code',
      filename: 'bash — /var reports full, illustrative output',
      label: `$ df -h /var                     # blocks, as the filesystem counts
Filesystem           Size  Used Avail Use% Mounted on
/dev/mapper/vg0-var  196G  186G     0 100% /var
$ df -i /var                     # inodes: one per file
Filesystem           Inodes IUsed IFree IUse% Mounted on
/dev/mapper/vg0-var     13M  412K   12M    4% /var
$ sudo du -sh /var               # adds up the names it can see
71G     /var
$ sudo lsof +L1 /var             # open, but no name left
reportd 3410 reportd 4w REG 253,2 123480117248 0 1311 /var/log/reportd/app.log (deleted)`,
    },
    {
      id: 'causes',
      kind: 'table',
      label: 'Why df and du disagree',
      headers: ['cause', 'df', 'du', 'fix'],
      values: [
        ['deleted but still open', 'counts it', 'cannot see it', 'restart or reopen the holder'],
        ['files under a mount point', 'counts it', 'cannot see it', 'unmount and look underneath'],
        ['ext4 reserved blocks', 'Avail is lower', '—', 'expected: room for root'],
        ['inodes used up', '"No space" with blocks free', '—', 'fewer, larger files'],
      ],
    },
  ],
  edges: [{ source: 'views', target: 'causes', label: '115G hiding here' }],
}
