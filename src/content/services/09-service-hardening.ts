import type { Section } from '../types'

export const serviceHardening: Section = {
  id: 'service-hardening',
  title: 'Service users, restart policy and sandboxing',
  scene: 'services-hardening',
  focus: 'sandbox',
  slide: `## Service users, restart policy and sandboxing

A unit file can do more than start a program: it can **limit** what the program is able to touch, use and become.

### Identity and paths
- \`User=reportd\` — never root
- \`StateDirectory=\`, \`LogsDirectory=\` — created and owned for it

### Supervision
- \`Restart=on-failure\` with a delay; systemd gives up after **repeated** failures

### Resources *(cgroup v2)*
- \`MemoryMax=\` — above it, the service is **OOM-killed**, not the host
- \`CPUQuota=\` — a ceiling, not a reservation

### Sandbox
- \`ProtectSystem=strict\` — the OS is read-only to it
- \`ProtectHome=\`, \`PrivateTmp=\`, \`NoNewPrivileges=\`; \`systemd-analyze security\` scores the rest`,
  narration:
    "A unit file can do much more than start a program. It can limit what the program can touch, how much it can use, and what it can become. This is least privilege from chapter four, applied by the service manager. Start with identity. reportd runs as its own account, never as root. StateDirectory and LogsDirectory tell systemd to create slash var slash lib slash reportd and slash var slash log slash reportd, owned by that account, so the package doesn't need to set permissions by hand. Next, supervision. Restart equals on-failure restarts reportd if it crashes, after a five second delay. systemd also has a start limit: if a unit fails repeatedly in a short window, it stops trying, so a broken configuration doesn't loop forever. Then resources, enforced by the kernel's control groups, which chapter nine examines. MemoryMax caps reportd's memory. If it exceeds that, the kernel's out-of-memory killer acts inside reportd's group only, instead of picking a victim from the whole machine. CPUQuota is a ceiling, not a guarantee. Finally, the sandbox. ProtectSystem equals strict makes the entire operating system read-only to reportd, except the directories it was given. ProtectHome hides home directories completely. PrivateTmp gives it its own temporary directory, and NoNewPrivileges stops it gaining privileges through set-user-ID programs. systemd-analyze security scores what remains exposed. Treat that number as a prompt for review, not a verdict. That completes software and services. Next chapter: reaching reportd over the network.",
}
