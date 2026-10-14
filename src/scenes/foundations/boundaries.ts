import type { Scene } from '@graphlearning/flow'

// §6 — where the kernel, the boot and PID 1 come from in each environment. The container run shows
// §1's two identity commands disagreeing: the kernel is the host's, os-release is the image's.
// Versions are illustrative; podman is Debian-packaged.
export const foundationsBoundaries: Scene = {
  id: 'foundations-boundaries',
  title: 'Host, VM, container, WSL',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Whose kernel, whose boot, whose PID 1',
      headers: ['environment', 'kernel', 'boots itself?', 'PID 1'],
      values: [
        ['physical host', 'its own', 'yes: firmware up', 'systemd'],
        ['virtual machine', 'its own (guest)', 'yes: virtual firmware', 'systemd'],
        ['container', 'the host’s, shared', 'no: just started', 'the image’s command'],
        ['WSL 2', 'Microsoft’s, in a VM', 'no: Windows starts it', 'systemd if enabled'],
      ],
    },
    {
      id: 'container',
      kind: 'code',
      filename: 'bash — same host, illustrative output',
      label: `$ uname -r
6.12.48+deb13-amd64
$ podman run --rm alpine:3.22 \\
    sh -c 'uname -r; grep PRETTY /etc/os-release'
6.12.48+deb13-amd64                 # the host's kernel
PRETTY_NAME="Alpine Linux v3.22"    # the image's files`,
    },
    {
      id: 'macos',
      label: 'macOS is not Linux',
      sub: 'Darwin kernel, BSD-style tools',
      pattern: 'warn',
      icon: 'circleslash',
      framed: true,
    },
  ],
  edges: [
    { source: 'compare', target: 'container', label: 'shared kernel, shown' },
    { source: 'container', target: 'macos' },
  ],
}
