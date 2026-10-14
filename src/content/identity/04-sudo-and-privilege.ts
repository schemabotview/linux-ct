import type { Section } from '../types'

export const sudoAndPrivilege: Section = {
  id: 'sudo-and-privilege',
  title: 'sudo and privilege boundaries',
  scene: 'identity-sudo',
  focus: 'authz',
  slide: `## sudo and privilege boundaries

\`sudo\` runs **one command** as another user, usually root, after checking **who you are** and **whether policy allows it**.

### Two separate checks
- **Authentication** — prove you are learner, with your own password
- **Authorisation** — \`/etc/sudoers\` says what learner may run; \`sudo -l\` lists it
- Every use is **logged**

### The redirection trap
- In \`sudo echo x > /etc/motd\`, **your** shell opens the file
- Pipe into \`sudo tee\` so the write happens as root

### Root is not unlimited
- **Capabilities** split root's power into named pieces
- **Namespaces**: root in a container is not root on the host
- **AppArmor** *(enabled by default on Debian)* can still refuse`,
  narration:
    "Administration needs root, the account with user ID zero, but logging in as root all day is a bad idea. sudo is the alternative: it runs one command as another user, usually root, and only after two separate checks. The first is authentication: proving you are learner, by typing learner's own password, not root's. The second is authorisation: the policy in slash etc slash sudoers decides whether learner may run this command, as this user. On Debian, members of the sudo group may run anything. And every use is recorded with who ran what, from where, which is the accountability that a shared root password never gives you. sudo dash l shows exactly what you are permitted. Now a trap that catches everybody once. sudo echo, then greater than slash etc slash motd, fails with permission denied, even though echo ran as root. Remember chapter three: the redirection is performed by your shell, as you, before sudo even starts. The fix is to pipe into sudo tee, so that the program opening the file is the one running as root. Note that the last line really does change a system file. Finally, root is less absolute than it sounds. Modern kernels split root's power into named capabilities, which a service can be given individually. Namespaces mean root inside a container is not root on the host. And mandatory access control, AppArmor on Debian, can refuse a root process that steps outside its profile. Chapter ten returns to all three. Next: what a process actually is.",
}
