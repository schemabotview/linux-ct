import type { Section } from '../types'

export const systemdUnitsAndTargets: Section = {
  id: 'systemd-units-and-targets',
  title: 'PID 1, systemd units and targets',
  scene: 'services-systemd',
  focus: 'target',
  slide: `## PID 1, systemd units and targets

systemd manages everything it starts as **units**: named, typed objects described by small text files, with dependencies between them.

### Unit types
- **.service** — a supervised process, like \`reportd.service\`
- **.timer**, **.socket**, **.path** — start a service on a schedule, connection or file change
- **.mount** — a filesystem; **.target** — a named group of units

### Targets are goal states
- \`multi-user.target\` — a full system without a desktop
- \`graphical.target\` adds the desktop; \`rescue.target\` almost nothing

### Two managers
- The **system** manager is PID 1, running as root
- Each logged-in user gets a **user** manager: \`systemctl --user\``,
  narration:
    "Once the kernel starts systemd as process one, systemd manages everything else as units. A unit is a named object of a particular type, described by a small text file, with declared relationships to other units. The scene lists the types you will meet. A service is a process that systemd starts and supervises: reportd will be one. A timer starts a service on a schedule, a socket starts a service when someone connects, and a path unit starts a service when a file appears or changes. A mount unit represents a mounted filesystem. And a target is a named group of units, used as a goal state. systemctl get-default shows the target the system boots towards: multi-user dot target, a complete system without a graphical desktop, which is normal for servers. graphical dot target includes everything in multi-user plus a desktop, and rescue dot target, from the previous section, includes almost nothing. When reportd's unit says it is wanted by multi-user dot target, it is joining that group. systemctl list-units lists what's loaded and its state. Here, cron and the SSH server are active and running. Notice also that there are two kinds of manager. The system manager is process one, runs as root, and manages services for the whole machine. Each logged-in user also gets their own user manager, reached with systemctl dash dash user, which can run personal services and timers without any root access. Next: writing reportd's own unit file.",
}
