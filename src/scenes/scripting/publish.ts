import type { Scene } from '@graphlearning/flow'

// §6 — publishing a result: write a temp file in the SAME directory, then rename over the target.
// rename(2) replaces the name atomically, so readers see old or new, never half. That is not crash
// durability: data still has to reach the disk (fsync / sync, chapter 8). flock is util-linux.
export const scriptingPublish: Scene = {
  id: 'scripting-publish',
  title: 'Temporary files and publishing',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'A reader opens reports/latest.csv mid-run',
      headers: ['approach', 'reader sees', 'after a crash'],
      values: [
        ['write latest.csv directly', 'half a report', 'half a report'],
        ['write .tmp, then mv over', 'old or new, never half', 'old or new*'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'make-report — publish and guard against a second run',
      label: `exec 9> "$report_dir/.make-report.lock"
flock -n 9 || die "another run is in progress"   # util-linux

tmp=$(mktemp "$report_dir/.latest.XXXXXX")       # same filesystem
summarise_all > "$tmp" || die "summary failed"
chmod 644 -- "$tmp"                              # mktemp makes it 0600
mv -f -- "$tmp" "$report_dir/latest.csv"         # atomic rename`,
    },
    {
      id: 'limits',
      label: 'What the rename does not promise',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'fs', label: 'Same filesystem', sub: 'across mounts, mv copies', icon: 'harddrive' },
        { id: 'dur', label: '*Durability', sub: 'on disk needs a flush: chapter 8', icon: 'power' },
        { id: 'race', label: 'Two runs', sub: 'without a lock, both write', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'code' },
    { source: 'code', target: 'limits' },
  ],
}
