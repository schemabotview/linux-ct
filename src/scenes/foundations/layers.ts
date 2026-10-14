import type { Scene } from '@graphlearning/flow'

// §1 — two identity commands, and the two different things they report on. `uname -r` asks the
// running kernel; /etc/os-release is a file the distribution ships. Values are illustrative of a
// Debian 13 amd64 system; the kernel string's `+deb13` shape is Debian's.
export const foundationsLayers: Scene = {
  id: 'foundations-layers',
  title: 'Kernel, user space, distribution',
  flow: 'TB',
  nodes: [
    {
      id: 'identity',
      kind: 'code',
      filename: 'bash — illustrative output, Debian 13',
      label: `$ uname -r                # asks the running kernel
6.12.48+deb13-amd64
$ cat /etc/os-release     # reads a file Debian ships
PRETTY_NAME="Debian GNU/Linux 13 (trixie)"
VERSION_ID="13"
VERSION_CODENAME=trixie
ID=debian`,
    },
    {
      id: 'system',
      label: 'One running system',
      pattern: 'group',
      children: [
        { id: 'userspace', label: 'User space', sub: 'shells, utilities, services, apps', pattern: 'user', icon: 'terminal' },
        { id: 'kernel', label: 'Kernel', sub: 'processes, memory, devices, files', pattern: 'service', icon: 'cpu' },
        { id: 'hardware', label: 'Hardware', sub: 'CPU, RAM, disks, network cards', pattern: 'storage', icon: 'server' },
      ],
    },
    {
      id: 'distro',
      label: 'What the distribution decides',
      pattern: 'external',
      children: [
        { id: 'packages', label: 'Packages', sub: 'which builds, which versions', icon: 'package' },
        { id: 'release', label: 'Release', sub: 'Debian 13, updates, support', icon: 'calendar' },
        { id: 'defaults', label: 'Defaults', sub: 'paths, config, init system', icon: 'gears' },
      ],
    },
  ],
  edges: [
    { source: 'identity', target: 'system', label: 'uname -r' },
    { source: 'identity', target: 'distro', label: 'os-release' },
  ],
}
