import type { Scene } from '@graphlearning/flow'

// §3 — umask subtracts from the creation mode; ACLs add named entries beyond owner/group/other;
// the three special bits as they appear in ls. Debian's default umask is 022. setfacl/getfacl are
// the `acl` package.
export const identitySpecial: Scene = {
  id: 'identity-special',
  title: 'umask, ACLs, special bits',
  flow: 'TB',
  nodes: [
    {
      id: 'umask',
      kind: 'table',
      label: 'umask 022: what new objects get',
      headers: ['object', 'requested', 'minus umask', 'result'],
      values: [
        ['file', '666', '022', '644  rw-r--r--'],
        ['directory', '777', '022', '755  rwxr-xr-x'],
      ],
    },
    {
      id: 'acl',
      kind: 'code',
      filename: 'bash — ACLs; assumes the reportd account exists',
      label: `$ setfacl -m u:reportd:rx ~/lab/reportd/incoming      # one extra user
$ setfacl -d -m u:reportd:r ~/lab/reportd/incoming   # default for new files
$ ls -ld ~/lab/reportd/incoming
drwxr-xr-x+ 2 learner learner 4096 Oct 12 09:02 incoming   # + : ACL present
$ setfacl -b ~/lab/reportd/incoming                  # rollback: remove all`,
    },
    {
      id: 'bits',
      kind: 'table',
      label: 'Special bits, as ls shows them',
      headers: ['bit', 'example', 'effect'],
      values: [
        ['set-user-ID', '-rwsr-xr-x /usr/bin/passwd', 'runs as the file owner'],
        ['set-group-ID', 'drwxrwsr-x /srv/shared', 'new files get the dir group'],
        ['sticky', 'drwxrwxrwt /tmp', 'only owners delete their files'],
      ],
    },
  ],
  edges: [
    { source: 'umask', target: 'acl', label: 'more than three classes' },
    { source: 'acl', target: 'bits' },
  ],
}
