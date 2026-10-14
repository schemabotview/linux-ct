import type { Section } from '../types'

export const secretsAndAudit: Section = {
  id: 'secrets-and-audit',
  title: 'Secrets, audit evidence and log protection',
  scene: 'operations-secrets',
  focus: 'where',
  slide: `## Secrets, audit evidence and log protection

A secret is only as private as **every place it is copied to**. Unit files, environments and command lines are copied to many places.

### Where a password leaks
- \`Environment=\` — shown by \`systemctl show\` and \`/proc/<pid>/environ\`
- A command-line argument — visible in \`ps\` to **every** user
- A world-readable file — readable by anyone on the host

### Better
- **systemd credentials**: \`LoadCredential=\` from a root-only file — only the service sees it

### Evidence you can trust
- Limit who reads logs: \`adm\`, \`systemd-journal\` groups
- **Ship logs off the host** — root can edit local ones
- **Retain** them: incidents are often found weeks later`,
  narration:
    "reportd now needs a database password, and the question is where to put it. The table follows the password to every place it would be readable. Put it in an Environment line in the unit file, and it's shown by systemctl show, and readable in slash proc slash pid slash environ by the service's owner and root. Pass it on the command line, and ps shows it to every user on the machine. Put it in an ordinary file with the default mode six four four, and anyone on the host can read it. The better option is systemd's credentials mechanism. The password lives in a file that only root can read. LoadCredential tells systemd to hand a copy to reportd when it starts, in a private directory that only that service can see, and reportd reads it from there at run time. Nothing else on the system ever has it. The other half of this section is evidence. When something goes wrong, whether a mistake or an attack, logs are how you reconstruct what happened, so they need protecting too. On Debian, only members of the adm and systemd-journal groups can read the full system journal, and that list should stay short. More importantly, an attacker who becomes root can edit or delete local logs. Shipping logs to a separate log server, as they're written, keeps a copy that the compromised host cannot change. And keep them long enough. Incidents are often discovered weeks after they began, and the logs from the first day are the ones you'll want. Next: proving that backups can actually be restored.",
}
