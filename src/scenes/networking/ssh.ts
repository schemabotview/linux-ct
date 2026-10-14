import type { Scene } from '@graphlearning/flow'

// §7 — SSH authenticates in two directions: first the SERVER proves it holds the host key you
// expect (known_hosts), then YOU prove your identity, here with a key. OpenSSH 10 messages;
// fingerprint truncated.
export const networkingSsh: Scene = {
  id: 'networking-ssh',
  title: 'SSH: two identities',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'ssh learner@lab.example',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'hostkey', label: '1 · The host', sub: 'key must match known_hosts', pattern: 'service', icon: 'server' },
        { id: 'user', label: '2 · You', sub: 'your key, from ~/.ssh or agent', pattern: 'user', icon: 'key' },
      ],
    },
    {
      id: 'first',
      kind: 'code',
      filename: 'bash — first connection, illustrative output',
      label: `$ ssh learner@lab.example
The authenticity of host 'lab.example (192.168.1.20)' can't be established.
ED25519 key fingerprint is SHA256:q3Vt…J8k.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
#  compare with the fingerprint the admin gave you — out of band
$ ssh-keygen -t ed25519                  # your own key pair, once
$ ssh-copy-id learner@lab.example        # installs the PUBLIC half`,
    },
    {
      id: 'warn',
      label: 'Never normalise these',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'changed', label: 'Key changed', sub: 'find out why before connecting', icon: 'bell' },
        { id: 'nocheck', label: 'StrictHost…=no', sub: 'switches the check off', icon: 'ban' },
        { id: 'agent', label: 'Agent forwarding', sub: 'the remote root can use your keys', icon: 'share' },
      ],
    },
  ],
  edges: [
    { source: 'steps', target: 'first' },
    { source: 'first', target: 'warn' },
  ],
}
