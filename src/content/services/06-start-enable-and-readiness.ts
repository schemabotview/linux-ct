import type { Section } from '../types'

export const startEnableAndReadiness: Section = {
  id: 'start-enable-and-readiness',
  title: 'Start, enable, reload and readiness',
  scene: 'services-lifecycle',
  focus: 'session',
  slide: `## Start, enable, reload and readiness

Several \`systemctl\` verbs sound alike and do different things. Use the one that matches what you mean.

### Now versus at boot
- \`start\` runs it **now**; \`enable\` makes it start **at boot**
- **Enabled is not running** — \`enable --now\` does both

### Two kinds of reload
- \`daemon-reload\` — **systemd** re-reads unit files after you edit them
- \`reload\` — the **application** re-reads its own configuration
- \`restart\` — stop and start: brief downtime

### Started is not ready
- \`Type=simple\`: "active" as soon as the process **exists**
- The app may still be loading — requests fail meanwhile
- \`Type=notify\`: active when the app reports **READY**`,
  narration:
    "systemctl has several verbs that sound alike, and mixing them up causes most surprises with services. The table lists them. start runs the service now, and that's all; after a reboot it won't be running. enable creates a symlink so the service starts at boot, and, importantly, does not start it now. The session shows it. After enable, is-active still says inactive. enable dash dash now does both at once. The two reloads are different again. daemon-reload tells systemd itself to re-read unit files, which you need after editing one by hand; systemctl edit does it for you. reload asks the application to re-read its own configuration, usually by sending it a signal, without stopping it. restart stops and starts it, with a short interruption. Then readiness, which the plan singles out. In the session, start succeeds and curl immediately fails to connect. Nothing is broken. With the default service type, simple, systemd considers the service started the moment the process exists. But reportd still has to load its configuration and open its listening socket, and a request arriving in that window fails. Units that depend on reportd with After are released at the same moment, and hit the same problem. The fix is in the program and the unit together. With Type equals notify, the program tells systemd when it's actually ready, and only then is the unit marked active. So when a service reports active, ask which kind of active it means. Next: reading a service's logs.",
}
