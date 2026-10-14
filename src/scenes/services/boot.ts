import type { Scene } from '@graphlearning/flow'

// §3 — chapter 1's boot chain in depth: where each stage lives and what its failure looks like.
// Kernel version and UUID illustrative; /boot layout is Debian's.
export const servicesBoot: Scene = {
  id: 'services-boot',
  title: 'Firmware to root filesystem',
  flow: 'TB',
  nodes: [
    {
      id: 'stages',
      kind: 'table',
      label: 'Where each stage lives, and how it fails',
      headers: ['stage', 'lives in', 'when it breaks you see'],
      values: [
        ['UEFI firmware', 'the machine’s flash', 'no boot device found'],
        ['GRUB', 'EFI partition + /boot/grub', 'grub rescue> prompt'],
        ['kernel', '/boot/vmlinuz-6.12…', 'kernel panic'],
        ['initramfs', '/boot/initrd.img-6.12…', '(initramfs) shell: root not found'],
        ['root filesystem', 'the disk named by root=', 'emergency mode'],
      ],
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — illustrative output',
      label: `$ cat /proc/cmdline                     # what GRUB passed the kernel
BOOT_IMAGE=/boot/vmlinuz-6.12.48+deb13-amd64 root=UUID=4f1c…e2 ro quiet
$ ls /boot
config-6.12.48+deb13-amd64      initrd.img-6.12.48+deb13-amd64
config-6.12.43+deb13-amd64      initrd.img-6.12.43+deb13-amd64
grub  System.map-…              vmlinuz-6.12.48+deb13-amd64
                                vmlinuz-6.12.43+deb13-amd64`,
    },
    {
      id: 'recovery',
      label: 'Recovery paths at the GRUB menu',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'older', label: 'Older kernel', sub: 'Debian keeps the previous one', icon: 'history' },
        { id: 'rescue', label: 'Rescue target', sub: 'e: edit the kernel line', icon: 'pencil' },
      ],
    },
  ],
  edges: [
    { source: 'stages', target: 'evidence' },
    { source: 'evidence', target: 'recovery' },
  ],
}
