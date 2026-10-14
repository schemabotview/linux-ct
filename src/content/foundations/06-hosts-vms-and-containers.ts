import type { Section } from '../types'

export const hostsVmsAndContainers: Section = {
  id: 'hosts-vms-and-containers',
  title: 'Hosts, VMs, containers and WSL',
  scene: 'foundations-boundaries',
  focus: 'container',
  slide: `## Hosts, VMs, containers and WSL

"A Linux system" can mean four different things. They differ in **whose kernel** runs, **whether anything boots**, and **what PID 1 is**.

### Own kernel
- A **physical host** boots from real firmware
- A **virtual machine** boots its own kernel on virtual hardware

### Shared or borrowed kernel
- A **container** shares the **host's kernel**; nothing boots, its first process is the image's command
- **WSL 2** runs Microsoft's Linux kernel in a lightweight VM that Windows starts

### What this changes for you
- Boot, kernel and service examples may **not apply** in a container
- \`uname -r\` and \`/etc/os-release\` can name **different systems**
- **macOS is not Linux** — similar commands, different kernel and tools`,
  narration:
    "Before going further, it is worth knowing exactly what kind of Linux you are sitting in, because the course's boot, kernel and service examples don't apply equally everywhere. The table compares four environments. A physical host runs its own kernel, and boots the way the previous sections described, from real firmware. A virtual machine does the same on virtual hardware: it has its own kernel and its own boot, and its own systemd as process one. A container is different in kind. It does not boot at all, and it has no kernel of its own. It is a group of ordinary processes on the host, given their own view of files, processes and network, and its first process is whatever command the image says to run, which is often the application itself, not systemd. WSL two, on Windows, runs a Linux kernel built by Microsoft inside a lightweight virtual machine that Windows starts for you. It runs systemd only when that is enabled. The code card makes the container case concrete. On a Debian thirteen host, uname dash r reports Debian's kernel. Inside an Alpine container on the same host, uname still reports Debian's kernel, because it is the same kernel, while os-release names Alpine, because those are the image's files. These are the two identities from the first section, now disagreeing. And one last boundary: macOS is not Linux. Many commands look the same, but the kernel and the tools underneath are different. Next chapter: files, paths, and the names commands act on.",
}
