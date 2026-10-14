import type { Scene } from '@graphlearning/flow'

// §6 — the kernel walking a path one component at a time (path_resolution(7)): every directory on
// the way needs search (x) permission, and a mount point switches filesystems mid-walk without the
// name showing it. Debian 12+ creates home directories 0700. Device names illustrative.
export const filesResolution: Scene = {
  id: 'files-resolution',
  title: 'Resolving /var/lib/reportd/state.db',
  flow: 'TB',
  nodes: [
    {
      id: 'walk',
      label: 'One component at a time',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'root', label: '1 · /', sub: 'start at the root (sda2)', pattern: 'service', icon: 'folder' },
        { id: 'var', label: '2 · var', sub: 'mount point: now sdb1', pattern: 'storage', icon: 'harddrive' },
        { id: 'lib', label: '3 · lib', sub: 'needs x on /var', pattern: 'service', icon: 'folder' },
        { id: 'reportd', label: '4 · reportd', sub: 'needs x on /var/lib', pattern: 'service', icon: 'folder' },
        { id: 'state', label: '5 · state.db', sub: 'needs x on reportd, then r', pattern: 'user', icon: 'file' },
        { id: 'link', label: 'A symlink', sub: 'its path is walked in turn', pattern: 'external', icon: 'link' },
      ],
    },
    {
      id: 'errors',
      kind: 'code',
      filename: 'bash — two different failures, illustrative output',
      label: `$ cat /home/learner/lab/reportd/missing.csv
cat: ...: No such file or directory      # ENOENT: no such name
$ cat /home/sam/notes.txt
cat: ...: Permission denied              # EACCES: /home/sam is 0700
$ findmnt --target /var/lib/reportd
TARGET SOURCE    FSTYPE OPTIONS
/var   /dev/sdb1 ext4   rw,relatime`,
    },
  ],
  edges: [{ source: 'walk', target: 'errors', label: 'which step failed?' }],
}
