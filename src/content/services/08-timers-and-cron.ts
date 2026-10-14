import type { Section } from '../types'

export const timersAndCron: Section = {
  id: 'timers-and-cron',
  title: 'Timers, cron and scheduling semantics',
  scene: 'services-timers',
  focus: 'timer',
  slide: `## Timers, cron and scheduling semantics

The nightly report is a **timer** that starts a **oneshot service**. cron can do the same job, with different guarantees.

### The pair
- \`reportd-report.timer\` — **when**: \`OnCalendar=*-*-* 02:00:00\`
- \`reportd-report.service\` — **what**: run make-report once, as reportd
- \`systemctl list-timers\` shows the last and next run

### Semantics worth choosing
- \`Persistent=true\` — a run missed while powered off happens at next boot
- \`RandomizedDelaySec\` spreads load; a running job is never started twice

### The environment is the unit's
- Not your shell's PATH or directory — chapter 5's handoff
- Output goes to \`journalctl -u reportd-report\``,
  narration:
    "Chapter five prepared make-report to run unattended. Here is the scheduler. With systemd, a schedule is two units. The timer says when: OnCalendar, every day at two in the morning. The service it starts says what: a oneshot service, meaning it runs a command to completion rather than staying up, as the reportd account, with absolute paths for both arguments. systemctl list-timers shows when it last ran and when it will run next. A few settings change the semantics in ways worth choosing deliberately. Persistent equals true means that if the machine was off at two o'clock, the run happens shortly after the next boot instead of being skipped. RandomizedDelaySec adds a random delay of up to five minutes, which matters when hundreds of machines share one schedule and one database. And a timer never starts a second copy of its service while the first is still running, which removes one of the races from chapter five. The bottom of the scene compares this with cron, the traditional scheduler, still widely used. The cron line is shorter: minute, hour, day, month, weekday, user, command. But a run missed while the machine is off is simply skipped, output goes to mail if anything is configured to deliver it, the environment is cron's minimal PATH, and nothing stops two runs overlapping. Either can be the right choice; what matters is knowing which guarantees you're relying on. Last in this chapter: giving reportd only the privileges it needs.",
}
