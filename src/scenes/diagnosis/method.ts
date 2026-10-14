import type { Scene } from '@graphlearning/flow'

// §1 — the method this chapter uses throughout: state the symptom as users see it, place it on a
// timeline against a baseline, list competing hypotheses, and choose the check that separates them.
// The reportd slowdown is the chapter's running incident.
export const diagnosisMethod: Scene = {
  id: 'diagnosis-method',
  title: 'Symptoms, baselines, hypotheses',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'GET /reports/latest is slow',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'symptom', label: '1 · Symptom', sub: 'p95 8 s, was 0.4 s; some 503s', pattern: 'user', icon: 'bell' },
        { id: 'timeline', label: '2 · Timeline', sub: 'since Tue 02:00; worst at 09:00', pattern: 'service', icon: 'calendar' },
        { id: 'baseline', label: '3 · Baseline', sub: 'last week: same load, 0.4 s', pattern: 'storage', icon: 'barchart' },
        { id: 'hyp', label: '4 · Hypotheses', sub: 'several, each testable', pattern: 'network', icon: 'gitbranch' },
      ],
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Competing hypotheses, and what would separate them',
      headers: ['hypothesis', 'predicts', 'check'],
      values: [
        ['CPU saturated', 'high us/sy, run queue > cores', 'top, vmstat'],
        ['memory pressure', 'swap in/out, PSI memory', 'vmstat, /proc/pressure'],
        ['disk latency', 'high await, tasks in D', 'iostat -x'],
        ['Tuesday’s change', 'starts exactly at the deploy', 'journal, apt history'],
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'table', label: 'write them down' }],
}
