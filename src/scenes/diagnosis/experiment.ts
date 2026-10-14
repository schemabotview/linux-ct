import type { Scene } from '@graphlearning/flow'

// §9 — closing the incident with an experiment: one change, the same measurement before and after,
// a rollback ready, and the trade-off written down. Numbers illustrative.
export const diagnosisExperiment: Scene = {
  id: 'diagnosis-experiment',
  title: 'Change one thing, measure again',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      label: 'Hypothesis: the 2.5 report fsyncs every row',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'change', label: '1 · One change', sub: 'batch=1000 in reportd.conf', pattern: 'service', icon: 'wrench' },
        { id: 'measure', label: '2 · Same measure', sub: 'replay Tuesday’s report, same host', pattern: 'storage', icon: 'ruler' },
        { id: 'rollback', label: '3 · Rollback ready', sub: 'reportd.conf.bak, one restart', pattern: 'warn', icon: 'history' },
        { id: 'record', label: '4 · Record it', sub: 'what, why, before, after', pattern: 'user', icon: 'scroll' },
      ],
    },
    {
      id: 'result',
      kind: 'table',
      label: 'Before and after, same replay',
      headers: ['measure', 'batch=1', 'batch=1000'],
      values: [
        ['report duration', '7 h 30 min', '19 min'],
        ['w_await during report', '39 ms', '2 ms'],
        ['GET p95 during report', '8.1 s', '0.45 s'],
        ['rows lost if power fails mid-report', '≤ 1', '≤ 1000 — re-run covers it'],
      ],
    },
  ],
  edges: [{ source: 'plan', target: 'result', label: 'then decide' }],
}
