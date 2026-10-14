import type { Section } from '../types'

export const bootToSession: Section = {
  id: 'boot-to-session',
  title: 'From power-on to a session',
  scene: 'foundations-boot',
  focus: 'pid1',
  slide: `## From power-on to a session

A running Linux system is the end of a **chain of handoffs**. Each stage does one job, loads the next one, and gets out of the way.

### Hardware to kernel
- **Firmware** (UEFI) finds a boot loader on disk
- **GRUB** loads the kernel and a small **initramfs** into memory
- The **initramfs** finds the real root filesystem and mounts it

### Kernel to you
- The kernel starts **PID 1** — on Debian, **systemd**
- systemd starts **services** until it reaches its target
- A **login** service lets you in, and your **shell** starts as you

### Why the order matters
- A failure is **located by stage**: no GRUB menu and no login prompt are different problems
- \`systemd-analyze\` times each stage *(systemd-specific)*`,
  narration:
    "When you sit down at a running Linux system, you are seeing the last link in a chain. It is worth knowing the links now, because every boot problem later in the course is found by asking which link broke. Power comes on and the firmware, on modern machines UEFI, looks for a boot loader. On Debian that is usually GRUB, and its whole job is to load two files into memory: the kernel, and a small starter filesystem called the initramfs. The kernel takes over the hardware, and the initramfs does the awkward work of finding the real root filesystem, which might sit on an encrypted disk or a RAID set, and mounting it. Then the kernel starts the very first process, process ID one. On Debian that is systemd. Every other process on the system descends from it. systemd starts services in dependency order until it reaches a goal it calls a target, and one of those services offers a way to log in, whether that is a text console, an SSH server, or a graphical login screen. Once you are authenticated, a shell starts, running as you. That shell is your session. The code card shows systemd-analyze, which breaks the boot into exactly these stages and times each one. Notice that it is a systemd tool, not a portable one. In chapter six we come back to every stage in depth. For now, keep the order. Next: what actually happens between your keyboard and that shell.",
}
