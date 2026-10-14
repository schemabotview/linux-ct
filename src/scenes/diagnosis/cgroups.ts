import type { Scene } from '@graphlearning/flow'

// §8 — the host has memory to spare, yet reportd is OOM-killed: its cgroup v2 limit (MemoryMax=
// from chapter 6) is what was reached. Files under /sys/fs/cgroup per the kernel's cgroup-v2 guide;
// unit messages are systemd's. Output illustrative.
export const diagnosisCgroups: Scene = {
  id: 'diagnosis-cgroups',
  title: 'Host view, service view',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ free -h | sed -n 2p                       # the host: plenty available
Mem:  15Gi  3.4Gi  1.1Gi  210Mi  11Gi  12Gi
$ cd /sys/fs/cgroup/system.slice/reportd.service
$ cat memory.max memory.current             # the service: at its ceiling
268435456
268402688
$ grep oom_kill memory.events
oom_kill 3
$ journalctl -u reportd | tail -2
reportd.service: A process of this unit has been killed by the OOM killer.
reportd.service: Failed with result 'oom-kill'.`,
    },
    {
      id: 'boundaries',
      label: 'Two kernel features, two questions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'cg', label: 'cgroups', sub: 'how much may it use? limits, accounting', pattern: 'service', icon: 'gauge' },
        { id: 'ns', label: 'Namespaces', sub: 'what can it see? PIDs, mounts, network', pattern: 'network', icon: 'boxes' },
      ],
    },
    {
      id: 'containers',
      label: 'Containers are both — and not more',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'view', label: 'Inside, top lies', sub: 'it may show the host’s totals', icon: 'search' },
        { id: 'iso', label: 'Not full isolation', sub: 'one kernel, shared by all', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'boundaries' },
    { source: 'boundaries', target: 'containers' },
  ],
}
