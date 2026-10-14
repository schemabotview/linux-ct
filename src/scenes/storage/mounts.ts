import type { Scene } from '@graphlearning/flow'

// §3 — a persistent mount in /etc/fstab by UUID, its options, and the safe way to apply it. On
// systemd systems fstab lines become .mount units; a failing non-`nofail` mount stops boot in
// emergency mode (chapter 6). UUIDs illustrative.
export const storageMounts: Scene = {
  id: 'storage-mounts',
  title: 'Filesystems, mounts, fstab',
  flow: 'TB',
  nodes: [
    {
      id: 'fstab',
      kind: 'code',
      filename: '/etc/fstab — an added data disk',
      label: `# device       mount point   type options                      dump pass
UUID=9a6e…c41d  /srv/archive  ext4 defaults,nofail,noexec,nodev  0    2`,
    },
    {
      id: 'apply',
      kind: 'code',
      filename: 'bash — check before you reboot, needs root',
      label: `$ sudo findmnt --verify                 # syntax, UUIDs, fs types
Success, no errors or warnings detected
$ sudo systemctl daemon-reload          # regenerate the .mount units
$ sudo mount /srv/archive               # mount this one now
$ findmnt /srv/archive
TARGET       SOURCE    FSTYPE OPTIONS
/srv/archive /dev/sda1 ext4   rw,nodev,noexec,relatime`,
    },
    {
      id: 'options',
      kind: 'table',
      label: 'Options worth knowing',
      headers: ['option', 'effect'],
      values: [
        ['nofail', 'boot continues if the disk is missing'],
        ['noexec, nodev, nosuid', 'no programs, devices or set-ID here'],
        ['ro', 'read-only'],
        ['relatime (default)', 'fewer access-time writes'],
      ],
    },
  ],
  edges: [
    { source: 'fstab', target: 'apply' },
    { source: 'apply', target: 'options' },
  ],
}
