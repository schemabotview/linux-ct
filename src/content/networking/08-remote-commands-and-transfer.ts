import type { Section } from '../types'

export const remoteCommandsAndTransfer: Section = {
  id: 'remote-commands-and-transfer',
  title: 'Remote commands, transfer and connection reuse',
  scene: 'networking-remote',
  focus: 'quoting',
  slide: `## Remote commands, transfer and connection reuse

\`ssh host command\` runs one command remotely. The line is parsed **twice**: by your **local** shell, then by the **remote** one.

### Quoting decides which side expands
- Unquoted \`~\` and \`*\` — expanded **locally**, against your own machine
- Inside single quotes — passed through and expanded **remotely**

### Transferring files
- \`rsync -av\` — copies only what changed; keeps modes and times
- Run with \`--dry-run\` first to see what would move
- A trailing \`/\` on the source means **its contents**

### Reusing connections
- \`ControlMaster\` in \`~/.ssh/config\` shares one login across many commands`,
  narration:
    "Logging in interactively is only one way to use SSH. ssh followed by a host and a command runs that one command remotely and returns its output, which is how scripts and other tools work with remote machines. The trap is that your command line is parsed twice: first by your local shell, then by the shell on the remote machine. Chapter three's expansion rules apply at both ends, and quoting decides which end does what. In the first row of the table, tilde and star are unquoted, so your local shell expands them first: tilde becomes your home directory on your own machine, and the star is matched against your own files. What reaches the remote machine is the result. In the second row, the single quotes protect everything from your local shell, so the remote shell expands tilde and star against the remote machine's files. That is almost always what you mean. For copying files, rsync is the tool to learn. It copies only what has changed, preserves modes and times with dash a, and can run as a dry run first, listing exactly what it would transfer. Note the trailing slash on the source: it means the directory's contents, not the directory itself, which is the most common rsync surprise. Finally, if you run many short commands against the same host, each one pays for a full login. ControlMaster in your SSH configuration keeps the first connection open and reuses it for the rest. Last in this chapter: who can reach reportd at all.",
}
