import type { Scene } from '@graphlearning/flow'

// §6 — one timeline built from several sources: apt's history log, the journal, and the metrics
// already gathered. Correlation narrows the search; the plan's caution is that one correlated
// metric does not establish cause. Times illustrative.
export const diagnosisCorrelate: Scene = {
  id: 'diagnosis-correlate',
  title: 'Correlating evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'Tuesday, from four sources',
      headers: ['time', 'source', 'event'],
      values: [
        ['01:40', '/var/log/apt/history.log', 'reportd 2.4 → 2.5 upgraded'],
        ['02:00', 'journal: reportd-report', 'nightly report starts'],
        ['02:00–09:30', 'iostat', 'w_await 1 ms → 39 ms'],
        ['09:00', 'access log', 'p95 latency 8 s, 503s begin'],
        ['09:30', 'journal: reportd-report', 'report finishes (was 20 min)'],
      ],
    },
    {
      id: 'queries',
      kind: 'code',
      filename: 'bash — building it',
      label: `$ grep -A3 'Start-Date: 2026-10-13' /var/log/apt/history.log
$ journalctl -u reportd-report --since '2026-10-13 01:00' --until '2026-10-13 10:00'
$ journalctl -p warning --since '2026-10-13 01:00' -o short-iso`,
    },
    {
      id: 'caution',
      label: 'Correlated is not caused',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'both', label: 'Both started 02:00', sub: 'upgrade or report? test each', icon: 'gitbranch' },
        { id: 'third', label: 'A third cause', sub: 'both may follow something else', icon: 'search' },
        { id: 'predict', label: 'Predict, then test', sub: 'a cause predicts the next fact', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'queries', label: 'how' },
    { source: 'queries', target: 'caution' },
  ],
}
