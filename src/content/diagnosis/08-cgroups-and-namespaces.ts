import type { Section } from '../types'

export const cgroupsAndNamespaces: Section = {
  id: 'cgroups-and-namespaces',
  title: 'cgroups, namespaces and resource boundaries',
  scene: 'diagnosis-cgroups',
  focus: 'evidence',
  slide: `## cgroups, namespaces and resource boundaries

A service can run out of a resource while the **host** has plenty, because limits apply to **groups of processes**.

### cgroups: how much may it use?
- Each unit runs in its own **control group** *(cgroup v2)*
- \`MemoryMax=\` from chapter 6 is \`memory.max\` here
- \`memory.events\` counts **oom_kill**s inside the group

### Host-wide versus the service's limit
- The host: **12 GiB available**
- reportd: at its **256 MiB** ceiling, killed three times

### Namespaces: what can it see?
- Separate views of PIDs, mounts, network, users
- Inside a container, tools may still show **host totals**

### Containers are not complete isolation
- Every container shares **one kernel**`,
  narration:
    "Section three found the OOM killer ending reportd, but the host had memory to spare. This section explains that apparent contradiction, and with it, what containers really are. free shows the host with twelve gigabytes available. But every systemd unit runs in its own control group, or cgroup, a kernel feature that groups processes so their resources can be counted and limited together. Chapter six gave reportd a MemoryMax of two hundred and fifty-six megabytes, and that setting is simply the memory dot max file in reportd's cgroup directory under slash sys slash fs slash cgroup. memory dot current shows it right at that ceiling, and memory dot events shows the kernel's OOM killer has acted inside this group three times. The journal confirms it in systemd's words: failed with result oom-kill. The host had memory. reportd's group did not. During the slow report, requests piled up inside reportd faster than it could finish them, and its memory grew until it hit the limit. The limit did its job: it protected the rest of the machine from reportd. A second kernel feature, namespaces, answers a different question: not how much a process may use, but what it can see. Separate namespaces give a process its own view of process IDs, mounts, network interfaces and users. A container is simply processes combining both features. That has two consequences worth remembering. Inside a container, tools like top may still report the host's totals, not the container's limits. And containers are not complete isolation, because every container on a host shares one kernel. Last in this chapter: fixing it, and proving the fix.",
}
