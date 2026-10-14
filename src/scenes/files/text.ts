import type { Scene } from '@graphlearning/flow'

// §7 — viewing and editing tools, then the classic Windows-line-ending failure: a script saved with
// CRLF makes the kernel look for an interpreter called "bash\r". Debian 13 installs nano and
// vim-tiny by default; dos2unix is not default, so the fix uses sed on a lab copy.
export const filesText: Scene = {
  id: 'files-text',
  title: 'Pagers, editors, line endings',
  flow: 'TB',
  nodes: [
    {
      id: 'tools',
      label: 'Look, then edit',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'less', label: 'less', sub: 'page through; q quits, / searches', pattern: 'service', icon: 'search' },
        { id: 'nano', label: 'nano', sub: 'simple editor; keys shown on screen', pattern: 'user', icon: 'pencil' },
        { id: 'vi', label: 'vi', sub: 'modal editor; on every system', pattern: 'user', icon: 'code' },
      ],
    },
    {
      id: 'crlf',
      kind: 'code',
      filename: 'bash — a script edited on Windows, illustrative output',
      label: `$ ./count.sh
bash: ./count.sh: /bin/bash^M: bad interpreter: No such file or directory
$ file count.sh
count.sh: … ASCII text executable, with CRLF line terminators
$ cat -A count.sh | head -1           # ^M is the \\r byte
#!/bin/bash^M$
$ sed -i 's/\\r$//' count.sh          # strip it (edits in place)`,
    },
    {
      id: 'enc',
      label: 'Text is bytes plus an agreement',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'utf8', label: 'Encoding', sub: 'Debian assumes UTF-8', icon: 'hash' },
        { id: 'eol', label: 'Line ending', sub: 'Linux: \\n · Windows: \\r\\n', icon: 'scissors' },
      ],
    },
  ],
  edges: [
    { source: 'tools', target: 'crlf', label: 'looks fine, fails' },
    { source: 'enc', target: 'crlf', label: 'hidden \\r' },
  ],
}
