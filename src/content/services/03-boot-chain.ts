import type { Section } from '../types'

export const bootChain: Section = {
  id: 'boot-chain',
  title: 'Firmware, bootloader, kernel and initramfs',
  scene: 'services-boot',
  focus: 'stages',
  slide: `## Firmware, bootloader, kernel and initramfs

Chapter 1 named the stages. Here is **where each lives** and **what its failure looks like** — which is how a boot problem is located.

### Handoffs
- **UEFI** loads GRUB from the EFI system partition
- **GRUB** loads a kernel and initramfs from \`/boot\`, with a **command line**
- **initramfs** finds the real root (\`root=UUID=…\`) and switches to it

### Evidence on a running system
- \`/proc/cmdline\` — exactly what the kernel was given
- \`/boot\` — installed kernels, each with its own initramfs

### Recovery
- Debian keeps the **previous kernel**: choose it in GRUB's menu
- Add \`systemd.unit=rescue.target\` for a root shell — needs **console access**`,
  narration:
    "In chapter one, the boot was a list of handoffs. Now that you're responsible for a system, you need to know where each stage lives, because the error you see tells you which one broke. The table pairs them up. UEFI firmware lives on the machine itself; if it finds nothing bootable, it says so before Linux is involved at all. GRUB lives on the EFI system partition and in slash boot slash grub; if its own files are damaged, you land at a grub rescue prompt. The kernel and the initramfs are files in slash boot. A kernel that can't start halts with a panic. An initramfs that can't find the root filesystem drops you into a minimal initramfs shell. And if the root filesystem is found but something listed for mounting fails, systemd starts emergency mode. On a running system, two pieces of evidence matter. slash proc slash cmdline shows exactly what GRUB passed to the kernel, including root equals UUID, which is how the initramfs knows which disk to mount. And slash boot shows the installed kernels. Debian keeps the previous one when a new kernel is installed, each with its own initramfs. That gives you the first recovery path: if a new kernel misbehaves, pick the older one from GRUB's advanced menu. The second is editing the kernel line at the menu and adding systemd dot unit equals rescue dot target, which boots to a root shell with almost nothing started. Both need console access, so make sure you have it before you need it. Next: what systemd manages once it's running.",
}
