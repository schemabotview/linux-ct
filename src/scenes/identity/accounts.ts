import type { Scene } from '@graphlearning/flow'

// §1 — an account record read field by field, the UID ranges Debian uses (adduser.conf / Debian
// Policy 9.2), and the reportd system account that chapter 6 creates. getent reads through NSS, so
// it also shows accounts that are not in /etc/passwd.
export const identityAccounts: Scene = {
  id: 'identity-accounts',
  title: 'Users, groups, ownership',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ getent passwd learner
learner:x:1000:1000:Learner,,,:/home/learner:/bin/bash
#  name  │ UID  GID  comment      home         login shell
#        └ x: password hash lives in /etc/shadow
$ getent group sudo
sudo:x:27:learner
$ ls -l app.log
-rw-r--r-- 1 learner learner 2140 Oct 12 09:14 app.log
#            owner   group`,
    },
    {
      id: 'ranges',
      kind: 'table',
      label: 'UIDs on Debian',
      headers: ['UID', 'who', 'example'],
      values: [
        ['0', 'root: the superuser', 'root'],
        ['1–999', 'system accounts for services', 'www-data, reportd'],
        ['1000+', 'people', 'learner'],
      ],
    },
    {
      id: 'facts',
      label: 'What the kernel actually checks',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'uid', label: 'Numbers', sub: 'UID and GIDs, never names', pattern: 'user', icon: 'fingerprint' },
        { id: 'groups', label: 'All groups', sub: 'primary plus supplementary', pattern: 'user', icon: 'users' },
        { id: 'owner', label: 'Each inode', sub: 'one owner UID, one group GID', pattern: 'storage', icon: 'file' },
      ],
    },
  ],
  edges: [
    { source: 'record', target: 'ranges' },
    { source: 'ranges', target: 'facts' },
  ],
}
