import type { Section } from '../types'

export const journalAndLogs: Section = {
  id: 'journal-and-logs',
  title: 'The journal, application logs and rotation',
  scene: 'services-logs',
  focus: 'failed',
  slide: `## The journal, application logs and rotation

Every unit's output goes to the **journal**, indexed by unit, boot and priority. Applications may also write their **own** log files.

### Reading a failed start
- \`systemctl status\` — state, exit code, latest lines
- \`journalctl -u reportd -b -p warning\` — this unit, this boot, warnings and worse
- \`217/USER\`: systemd could not switch to **User=reportd**

### Retention
- The journal is **size-capped** and rotates itself
- App log files are rotated by **logrotate**

### Rotate without leaking space
- Tell the app to **reopen** its file after rotation
- Otherwise it keeps writing to a **deleted** file — chapter 2's trap`,
  narration:
    "Services have no terminal, so their output goes to the journal, the log managed by systemd. Every line is stored with the unit that produced it, the boot it happened in, and a priority, so you can ask precise questions. Here's the plan's failed start. systemctl status shows the service failed, and the Process line has the key detail: status two hundred and seventeen, slash USER. journalctl dash u reportd, dash b for this boot, dash p warning for warnings and worse, shows systemd's own explanation: it failed to determine user credentials. The unit says User equals reportd, and that account doesn't exist yet. The fix is the adduser command on the last line, creating reportd as a system account with its home in slash var slash lib slash reportd. Notice how the evidence chain runs from status, to the journal, to an identity problem from chapter four. Applications may also write their own log files, and reportd writes under slash var slash log slash reportd. Those need rotation, or they grow until the disk is full, and logrotate does it from small configuration files. This one rotates weekly, keeps eight old files, and compresses them. The postrotate step matters most. After logrotate renames the current file, reportd still holds it open and keeps writing to it. Sending it HUP tells it to reopen its log by name. Skip that, and when the old file is eventually deleted, you have chapter two's deleted-but-open file, quietly using disk space. The journal itself is size-capped and rotates automatically. Next: running things on a schedule.",
}
