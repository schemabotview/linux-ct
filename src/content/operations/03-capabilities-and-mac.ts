import type { Section } from '../types'

export const capabilitiesAndMac: Section = {
  id: 'capabilities-and-mac',
  title: 'Capabilities, AppArmor and SELinux',
  scene: 'operations-policy',
  focus: 'mac',
  slide: `## Capabilities, AppArmor and SELinux

Access passes **several independent checks**. When permissions look right and access still fails, look at the **next** check.

### Following the evidence
- **Journal**: reportd cannot open its TLS key
- **Identity**: \`id\` — reportd, as expected
- **Permissions**: \`namei -l\` — group-readable by reportd
- **Policy**: an **AppArmor DENIED** line names the profile and path

### The checks
- **Permissions** — owner, group, mode, ACLs *(chapter 4)*
- **Capabilities** — single powers, e.g. binding port 443 without root
- **Mandatory access control** — a policy even root cannot override

### Distribution-specific
- Debian and Ubuntu: **AppArmor**, by path
- Fedora and RHEL: **SELinux**, by label`,
  narration:
    "This section is the plan's worked illustration of evidence across layers. After an update to version two point six, reportd won't start. The journal gives the first fact: it can't open its TLS private key, permission denied. Chapter four's habits come first. Is it running as the identity we expect? sudo dash u reportd id says yes: user reportd, group reportd. Can that identity reach the file? namei dash l shows the key is readable by the reportd group, and every parent can be searched. By the classic rules, this access should succeed. So the refusal must come from a different check, and the kernel log has it: an AppArmor line, denied, operation open, profile reportd, and the exact path. The new version reads its key from a directory its AppArmor profile didn't allow. The fix is a profile change, not a chmod, and chmodding the key wider would have weakened security without fixing anything. The middle row names the independent checks. Ordinary permissions come first. Capabilities split root's power into single privileges, so a service can, for example, be given only the ability to bind to port four four three, instead of running as root. And mandatory access control is a policy loaded into the kernel that even root cannot override. Which one you meet depends on the distribution, and the table labels it. Debian and Ubuntu use AppArmor, with rules written as file paths. Fedora and Red Hat use SELinux, with rules written in terms of labels. The method is the same: read the denial, then change the policy deliberately. Next: secrets, and the evidence trail.",
}
