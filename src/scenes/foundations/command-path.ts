import type { Scene } from '@graphlearning/flow'

// §3 — one command's path from keystroke to output as numbered steps, beside the `type` evidence that tells a
// built-in from an external program. The `ls` alias is what Debian's default ~/.bashrc defines.
export const foundationsCommandPath: Scene = {
  id: 'foundations-command-path',
  title: 'Terminal → shell → program → kernel',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'What happens when you type ls',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'terminal', label: '1 · Terminal', sub: 'sends keys, draws text', pattern: 'user', icon: 'monitor' },
        { id: 'bash', label: '2 · Bash', sub: 'parses the line, finds ls', pattern: 'service', icon: 'terminal' },
        { id: 'ls', label: '3 · /usr/bin/ls', sub: 'child via fork + exec', pattern: 'external', icon: 'file' },
        { id: 'kern', label: '4 · Kernel', sub: 'system calls read the dir', pattern: 'storage', icon: 'cpu' },
      ],
    },
    {
      id: 'type',
      kind: 'code',
      filename: 'bash — what kind of command is it?',
      label: `$ type cd
cd is a shell builtin          # runs inside Bash itself
$ type ls
ls is aliased to \`ls --color=auto'
$ type -P ls
/usr/bin/ls                    # an external program`,
    },
    {
      id: 'why',
      label: 'Why cd must be a built-in',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'own-dir', label: 'Own directory', sub: 'every process has its own', icon: 'folder' },
        { id: 'child', label: 'A child cannot', sub: 'change its parent’s directory', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'type', label: 'which kind?' },
    { source: 'type', target: 'why' },
  ],
}
