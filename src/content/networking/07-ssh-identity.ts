import type { Section } from '../types'

export const sshIdentity: Section = {
  id: 'ssh-identity',
  title: 'SSH host keys, user keys and agents',
  scene: 'networking-ssh',
  focus: 'hostkey',
  slide: `## SSH host keys, user keys and agents

SSH checks **two** identities, in order: first the **server** proves who it is, then **you** do.

### 1 · The host key
- On first connection you see the server's key **fingerprint**
- Compare it with one obtained **another way**, then accept
- It is saved in \`~/.ssh/known_hosts\` and checked every time

### 2 · Your key
- \`ssh-keygen\` makes a key pair; the **private** half never leaves your machine
- \`ssh-copy-id\` installs the **public** half on the server
- An **agent** holds unlocked keys for your session

### Never normalise
- A **changed host key** warning — investigate first
- Disabling host key checking, or **forwarding your agent** to hosts you don't trust`,
  narration:
    "SSH is how you will administer reportd's host remotely, and its security rests on checking two identities, in a fixed order. First, the server proves who it is. Every SSH server has a host key, and the first time you connect, your client has nothing to compare it with, so it shows you the key's fingerprint and asks. This is the moment that matters. Compare the fingerprint with one you got another way, for example from the administrator, or from the console of a machine you just built. If it matches, accept, and the key is saved in known hosts, then checked silently on every later connection. Only then do you prove who you are. Passwords work, but keys are better. ssh-keygen creates a key pair. The private half stays on your machine, ideally protected by a passphrase, and ssh-copy-id installs the public half on the server. An agent can hold your unlocked key for the session, so you type the passphrase once. Three habits are worth refusing to form. If SSH warns that a host key has changed, stop and find out why. It may be a reinstalled server, or it may be someone in the middle. Never switch host key checking off to make a warning go away, because that removes the first check entirely. And don't forward your agent to machines you don't fully trust: anyone with root there can use your keys while you're connected. Next: running commands and copying files over SSH.",
}
