import type { Scene } from '@graphlearning/flow'

// §2 — the boot chain as numbered stages, and the one command that times them. Chapter 6 returns to
// every stage in depth; here the point is the order and the handoffs. systemd-analyze timings are
// illustrative.
export const foundationsBoot: Scene = {
  id: 'foundations-boot',
  title: 'From power-on to a prompt',
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'Each stage hands over to the next',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'firmware', label: '1 · Firmware', sub: 'UEFI finds a boot loader', pattern: 'storage', icon: 'power' },
        { id: 'loader', label: '2 · Boot loader', sub: 'GRUB loads kernel + initramfs', pattern: 'storage', icon: 'box' },
        { id: 'kernel', label: '3 · Kernel', sub: 'drives the hardware', pattern: 'service', icon: 'cpu' },
        { id: 'initramfs', label: '4 · initramfs', sub: 'finds and mounts the root fs', pattern: 'service', icon: 'harddrive' },
        { id: 'pid1', label: '5 · PID 1', sub: 'systemd, the first process', pattern: 'service', icon: 'gears' },
        { id: 'services', label: '6 · Services', sub: 'units started toward a target', pattern: 'service', icon: 'boxes' },
        { id: 'login', label: '7 · Login', sub: 'console, SSH or desktop', pattern: 'user', icon: 'dooropen' },
        { id: 'session', label: '8 · Session', sub: 'your shell, as you', pattern: 'user', icon: 'terminal' },
      ],
    },
    {
      id: 'analyze',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ systemd-analyze
Startup finished in 4.1s (firmware) + 1.9s (loader)
  + 1.7s (kernel) + 2.3s (initrd) + 6.8s (userspace) = 16.8s
graphical.target reached after 6.6s in userspace.`,
    },
  ],
  edges: [{ source: 'chain', target: 'analyze', label: 'measured per stage' }],
}
