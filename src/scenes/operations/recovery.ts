import type { Scene } from '@graphlearning/flow'

// §6 — recovery sequences per layer, each pointing back to the chapter that built the knowledge,
// and the plan's contrast: containing a compromised credential is a different sequence from
// restoring lost data. Pinning an older version needs a repository (here reportd's own) that still
// carries it; Debian's archive keeps only the current version of a package.
export const operationsRecovery: Scene = {
  id: 'operations-recovery',
  title: 'Recovery sequences by layer',
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      kind: 'table',
      label: 'First evidence, first move',
      headers: ['layer', 'first evidence', 'recovery path'],
      values: [
        ['boot', 'GRUB / emergency mode', 'older kernel, rescue target (ch 6)'],
        ['service', 'systemctl status, journal', 'roll back the package or config (ch 6)'],
        ['network', 'curl error class, ss', 'console, revert the change (ch 7)'],
        ['storage', 'dmesg, df, fsck -n', 'stop writes, copy, restore (ch 8)'],
      ],
    },
    {
      id: 'contrast',
      kind: 'table',
      label: 'Two incidents, two different sequences',
      headers: ['', 'a stolen SSH key', 'reports deleted'],
      values: [
        ['first', 'contain: remove the key, end sessions', 'stop writes to the volume'],
        ['then', 'find what it touched: auth log, journal', 'restore from the last good backup'],
        ['trust the host?', 'not until you know — maybe rebuild', 'yes: nothing hostile happened'],
        ['done when', 'credentials rotated, access reviewed', 'data validated, as in §5'],
      ],
    },
    {
      id: 'rollback',
      kind: 'code',
      filename: 'bash — a service rollback, needs root',
      label: `$ apt list -a reportd 2>/dev/null | head -3    # reportd's own repo keeps old versions
reportd/trixie 2.6-1 amd64 [installed]
reportd/trixie 2.5-1 amd64
$ sudo apt install reportd=2.5-1 && sudo apt-mark hold reportd`,
    },
  ],
  edges: [
    { source: 'layers', target: 'contrast' },
    { source: 'contrast', target: 'rollback', label: 'the service row, concretely' },
  ],
}
