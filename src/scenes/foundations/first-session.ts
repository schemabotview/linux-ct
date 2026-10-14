import type { Scene } from '@graphlearning/flow'

// §4 — a first command sequence, read as evidence about three separate things: who you are, where
// home is, and where you are now. The user is `learner`; group list trimmed. This is where the
// recurring example's lab directory, ~/lab/reportd, is created.
export const foundationsFirstSession: Scene = {
  id: 'foundations-first-session',
  title: 'Who, home, and here',
  flow: 'TB',
  nodes: [
    {
      id: 'sequence',
      kind: 'code',
      filename: 'bash — a first session, illustrative output',
      label: `$ id
uid=1000(learner) gid=1000(learner) groups=1000(learner),27(sudo)
$ echo "$HOME"
/home/learner
$ pwd
/home/learner
$ mkdir -p ~/lab/reportd/incoming && cd ~/lab/reportd
$ pwd
/home/learner/lab/reportd
$ ls
incoming`,
    },
    {
      id: 'facts',
      label: 'Three separate facts',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'who', label: 'Identity', sub: 'a UID and groups; the name is a label', pattern: 'user', icon: 'fingerprint' },
        { id: 'home', label: 'Home', sub: 'fixed per account; ~ means it', pattern: 'storage', icon: 'folder' },
        { id: 'here', label: 'Current dir', sub: 'per process; cd moves it', pattern: 'service', icon: 'link' },
      ],
    },
    {
      id: 'relative',
      label: 'One relative name, two answers',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'from-lab', label: 'In ~/lab/reportd', sub: 'ls incoming: lists it', icon: 'circlecheck' },
        { id: 'from-home', label: 'In ~', sub: 'ls incoming: No such file', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'sequence', target: 'facts', label: 'the output tells you' },
    { source: 'facts', target: 'relative', label: 'resolved from here' },
  ],
}
