import type { Scene } from '@graphlearning/flow'

// §8 — what changes when the scheduler, not a person, starts the script (detail in chapter 6), and
// when to stop writing shell. The PATH shown is cron's default; systemd uses its own default.
export const scriptingHandoff: Scene = {
  id: 'scripting-handoff',
  title: 'Scheduled runs and choosing a language',
  flow: 'TB',
  nodes: [
    {
      id: 'env',
      kind: 'table',
      label: 'Interactive versus scheduled',
      headers: ['', 'your terminal', 'cron or a timer'],
      values: [
        ['PATH', 'yours, with extras', '/usr/bin:/bin (cron default)'],
        ['current directory', 'wherever you were', '/ or the home directory'],
        ['terminal', 'yes: prompts work', 'none: nobody answers'],
        ['output', 'your screen', 'journal or mail, if captured'],
      ],
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Shell or Python?',
      headers: ['the job is mostly…', 'reach for'],
      values: [
        ['running commands, moving files', 'shell'],
        ['a pipeline of existing tools', 'shell'],
        ['parsing CSV / JSON properly', 'Python'],
        ['data structures, maths, many branches', 'Python'],
        ['over ~100 lines, or needs tests', 'Python'],
      ],
    },
    {
      id: 'rule',
      label: 'Before handing over',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'abs', label: 'Absolute paths', sub: 'no reliance on cd or PATH', icon: 'folder' },
        { id: 'nonint', label: 'No prompts', sub: 'fail, do not wait for input', icon: 'ban' },
        { id: 'status', label: 'Exit status', sub: 'the scheduler reads it', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'env', target: 'choose' },
    { source: 'choose', target: 'rule' },
  ],
}
