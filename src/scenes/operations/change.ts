import type { Scene } from '@graphlearning/flow'

// §7 — a change record written before the change, a runbook written before the incident, and the
// shape of an incident update. Content is reportd's; the format is a suggestion, not a standard.
export const operationsChange: Scene = {
  id: 'operations-change',
  title: 'Changes, runbooks, communication',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'code',
      filename: 'changes/2026-10-20-reportd-2.6.md',
      label: `What:     upgrade reportd 2.5 → 2.6; add AppArmor rule for tls/
Why:      2.6 adds TLS to the database connection
Risk:     service fails to start (seen in staging: §3)
Test:     staging replay; GET /reports/latest returns 200
Rollback: apt install reportd=2.5-1; restore profile; < 5 min
Window:   Tue 10:00–10:30, announced in #reports`,
    },
    {
      id: 'runbook',
      kind: 'code',
      filename: 'runbooks/reportd-down.md',
      label: `1. curl -si 127.0.0.1:8080/reports/latest   failure class?   (7)
2. systemctl status reportd; journalctl -u reportd -b   (6)
3. df -h /var; df -i /var                               (8)
4. oom_kill in memory.events?                           (9)
5. a recent change? /var/log/apt/history.log            (9)
6. down > 15 min: roll back the last change, then investigate`,
    },
    {
      id: 'comms',
      label: 'An incident update says',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'impact', label: 'Impact', sub: 'who is affected, how', pattern: 'user', icon: 'users' },
        { id: 'known', label: 'Known', sub: 'facts, with times', pattern: 'service', icon: 'circlecheck' },
        { id: 'unknown', label: 'Not yet known', sub: 'said plainly', pattern: 'warn', icon: 'search' },
        { id: 'next', label: 'Next update', sub: 'a time, and keep it', pattern: 'storage', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'record', target: 'runbook' },
    { source: 'runbook', target: 'comms', label: 'while it runs' },
  ],
}
