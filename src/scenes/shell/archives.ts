import type { Scene } from '@graphlearning/flow'

// §9 — create, LIST, then extract into a dedicated directory. GNU tar strips a leading / and
// leading ../ from member names by default; that does not make every archive safe, so the listing
// comes first. Sizes and dates illustrative.
export const shellArchives: Scene = {
  id: 'shell-archives',
  title: 'tar: create, inspect, extract',
  flow: 'TB',
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'bash — GNU tar, illustrative output',
      label: `$ tar -czf reports-2026-10.tar.gz -C ~/lab/reportd reports
$ tar -tzvf reports-2026-10.tar.gz     # list first
drwxr-xr-x learner/learner    0 2026-10-12 09:30 reports/
-rw-r--r-- learner/learner 2140 2026-10-12 09:30 reports/oct-12.csv
$ mkdir -p ~/lab/restore
$ tar -xzf reports-2026-10.tar.gz -C ~/lab/restore`,
    },
    {
      id: 'flags',
      label: 'The letters',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c', label: '-c / -t / -x', sub: 'create, list, extract', pattern: 'service', icon: 'box' },
        { id: 'z', label: '-z', sub: 'gzip; -J xz, --zstd', pattern: 'service', icon: 'package' },
        { id: 'f', label: '-f', sub: 'the archive file', pattern: 'service', icon: 'file' },
        { id: 'C', label: '-C', sub: 'change directory first', pattern: 'service', icon: 'folder' },
      ],
    },
    {
      id: 'risks',
      label: 'What the listing is checking for',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'bomb', label: 'No top folder', sub: 'hundreds of files land in .', icon: 'boxes' },
        { id: 'escape', label: 'Escaping paths', sub: 'absolute or ../ members', icon: 'dooropen' },
        { id: 'overwrite', label: 'Overwrites', sub: 'existing files replaced quietly', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'session', target: 'flags' },
    { source: 'session', target: 'risks', label: 'before -x' },
  ],
}
