import type { Section } from '../types'

export const patchingAndAccess: Section = {
  id: 'patching-and-access',
  title: 'Patching, SSH configuration and access continuity',
  scene: 'operations-access',
  focus: 'steps',
  slide: `## Patching, SSH configuration and access continuity

Most break-ins use **known, already-fixed** flaws. Keeping up with updates is the cheapest control you have.

### Patching on Debian
- **unattended-upgrades** installs security updates daily
- A patched library protects nothing until programs using it **restart**

### Hardening SSH
- A **drop-in** in \`sshd_config.d/\`: no passwords, no root login, allowed groups
- Each line closes a path from the threat model

### Never lose access while changing it
- Keep your **current session** open
- \`sshd -t\` validates; \`reload\` keeps existing sessions alive
- Test from a **second session** before closing the first
- Know the **console** path if both fail`,
  narration:
    "Most real intrusions don't use clever new attacks. They use known flaws that were fixed months ago on systems that weren't updated. So patching is the cheapest and most effective control in this chapter. Debian's unattended-upgrades package installs security updates automatically every day, and a dry run shows what it would do. One subtlety: replacing a library on disk doesn't change programs that already loaded the old one. Until they restart, they keep running the vulnerable code, and needrestart lists which ones. Next, SSH, the front door from the threat model. The configuration goes in a drop-in file, in the same spirit as chapter six's unit drop-ins, so package upgrades never overwrite it. It turns off password logins, so only keys work. It refuses direct root logins, so every administrator arrives as themselves and uses sudo. And it limits logins to named groups. Each line closes a specific path. The plan's illustration is about how you apply a change like this, because a mistake in SSH configuration can lock you out of the machine you're fixing. The numbered steps are the safe sequence. Keep your current session, A, open throughout. Run sshd dash t to check the syntax. Reload rather than restart, so existing sessions survive. Then log in from a second session, B. If that works, close A. If it doesn't, you still have A to undo the change. And know in advance how to reach the console if everything else fails. The same sequence applies to firewall changes from chapter seven. Next: when correct permissions still aren't enough.",
}
