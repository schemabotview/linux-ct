import type { Section } from '../types'

export const usersGroupsAndOwnership: Section = {
  id: 'users-groups-and-ownership',
  title: 'Users, groups and ownership',
  scene: 'identity-accounts',
  focus: 'record',
  slide: `## Users, groups and ownership

An account is a **record**: a name mapped to a **UID**, a primary **GID**, a home directory and a login shell. Groups collect accounts so access can be granted once.

### Reading the evidence
- \`getent passwd learner\` — the account record, through every configured source
- \`getent group sudo\` — the group and its members
- \`ls -l\` — every file has exactly **one owner** and **one group**

### UIDs on Debian
- **0** is root; **1–999** are system accounts for services; **1000+** are people
- Services such as **reportd** get their own system account

### What is checked
- The kernel compares **numbers**: your UID and **all** your groups
- Names are labels for people`,
  narration:
    "Chapter one showed that you are a number to the kernel. This chapter builds on that, starting with where the number comes from. getent passwd learner prints the account record, as seven colon-separated fields. The name, an x meaning the password hash is kept separately in slash etc slash shadow, the user ID, the primary group ID, a comment field, the home directory, and the login shell. getent reads through every account source the system is configured to use, so it also finds accounts that aren't stored in slash etc slash passwd, such as ones from a directory server. Groups work the same way. getent group sudo shows group twenty-seven, and lists learner as a supplementary member. Every file, in turn, has exactly one owner and one group, which ls dash l shows in the third and fourth columns. The table shows how Debian divides the number space. Zero is root, the superuser. One to nine hundred and ninety-nine are system accounts, created for services rather than people, such as www-data for web servers, and later in this course, reportd. One thousand and up are people. Giving each service its own account is a design choice you will see again: if the service is compromised, the attacker gets only what that account can reach. And remember what the kernel actually compares. Not names, but numbers: your user ID, and every group ID you hold, primary and supplementary. Next, what those numbers are allowed to do.",
}
