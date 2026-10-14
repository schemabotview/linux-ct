import type { Section } from '../types'

export const umaskAclsAndSpecialBits: Section = {
  id: 'umask-acls-and-special-bits',
  title: 'umask, ACLs and special bits',
  scene: 'identity-special',
  focus: 'acl',
  slide: `## umask, ACLs and special bits

The nine bits are not the whole story. Defaults, extra entries and three special bits change what happens.

### umask: the default
- The **umask** removes bits from what programs request: Debian's **022** turns 666 into 644, 777 into 755

### ACLs: more than three classes
- \`setfacl -m u:reportd:rx\` grants one extra user
- A **default ACL** on a directory applies to new files inside
- \`+\` after the mode in \`ls -l\` means an ACL is present

### Special bits
- **set-user-ID** — runs as the file's owner, as \`passwd\` does
- **set-group-ID** on a directory — new files inherit its group
- **sticky** on a directory — only owners delete their own files`,
  narration:
    "Three refinements complete the permission model. First, defaults. When a program creates a file, it usually asks for mode six six six, read and write for everyone, or seven seven seven for a directory. The process's umask then removes bits from that request. Debian's default umask is zero two two, which removes write for group and others, so new files come out six four four and new directories seven five five, as the table shows. A stricter umask, like zero seven seven, makes new files private by default. Second, access control lists. Owner, group and other is sometimes too coarse. Here the reportd service account needs to read the lab's incoming directory without being added to learner's group. setfacl dash m adds a named entry for exactly that user. setfacl dash d adds a default ACL, which new files created inside the directory will inherit. ls marks a file that has an ACL with a plus sign after its mode, so always look for it. And setfacl dash b removes every extra entry, which is the rollback. Third, the special bits. Set-user-ID on a program makes it run as the program file's owner; passwd uses it so that ordinary users can update the root-owned shadow file, in a controlled way. Set-group-ID on a directory makes new files inherit the directory's group, which is useful for shared project areas. And the sticky bit, which you'll see on slash tmp, lets everyone create files there but only delete their own. Next: becoming root, briefly and accountably.",
}
