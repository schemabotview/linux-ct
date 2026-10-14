import type { Section } from '../types'

export const threatsAndLeastPrivilege: Section = {
  id: 'threats-and-least-privilege',
  title: 'Threats, ownership and least privilege',
  scene: 'operations-threats',
  focus: 'model',
  slide: `## Threats, ownership and least privilege

Security starts with **specific** questions: what could go wrong, **how** it would reach us, and which control stops it.

### A small threat model
- A **stolen key**, a **bug** in reportd, a **bad package**, an **operator mistake**
- Each has a **path in** — and a control on that path

### Measure the attack surface
- **Listening sockets** — \`ss -lntu\`
- **Who can become root** — the sudo group
- **Set-user-ID programs** and **installed packages**

### Three principles
- Every part has a **named owner**
- **Least privilege**: each identity gets only what its job needs
- **Remove** what is not used — it cannot be attacked`,
  narration:
    "The final chapter brings everything together around operating reportd safely, and it starts with security as a set of specific questions. Not is the system secure, but: what could go wrong, how would it reach us, and what stops it? The table is a small threat model for reportd's host. A stolen SSH key arrives through port twenty-two and an account with sudo, so the controls are key-only logins, few people with sudo, and logs that show who did what. A bug in reportd is reached through the proxy, so reportd runs as its own user, in a sandbox, bound to loopback, which are chapters four, six and seven. A malicious package arrives through a repository, so the host uses Debian's sources only. And an operator mistake, perhaps the most likely of all, happens in a root shell, which is why sudo runs one command at a time, and why backups exist. Then measure the attack surface rather than guessing it. ss lists every listening socket: here reportd on loopback, SSH, and the proxy, and nothing else. The sudo group says exactly who can become root. find lists set-user-ID programs, which run with their owner's privileges; a new one appearing deserves a question. And every one of the six hundred and twelve installed packages is code you trust. Three principles follow. Every part of the system has a named owner who answers for it. Every identity gets only what its job needs. And whatever isn't used should be removed, because what isn't there can't be attacked. Next: patching, and changing access without locking yourself out.",
}
