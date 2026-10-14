import type { Section } from '../types'

export const unitConfiguration: Section = {
  id: 'unit-configuration',
  title: 'Unit files, drop-ins and dependencies',
  scene: 'services-unit',
  focus: 'deps',
  slide: `## Unit files, drop-ins and dependencies

A unit file has sections: **[Unit]** for description and relationships, **[Service]** for how to run it, **[Install]** for what \`enable\` does.

### Where unit files live
- \`/usr/lib/systemd/system/\` — from packages; do not edit
- \`/etc/systemd/system/\` — local units and **drop-ins**, which win
- \`systemctl edit\` creates a drop-in; \`systemctl cat\` shows the result

### Ordering is not requirement
- \`After=B\` only orders: it **does not start** B
- \`Wants=B\` starts B but does not wait for it
- \`Requires=B\` also stops this unit if B stops
- Usually you want **Wants= plus After=**

### Waiting for the network
- \`network-online.target\` — configured, not merely started`,
  narration:
    "Here is reportd's unit file. It has three sections. Unit holds a description and relationships to other units. Service says how to run it: as the reportd account, with this command line and configuration file. And Install says what enable should do, here: add reportd to multi-user dot target. Where the file lives matters. Units installed by packages live under slash usr slash lib slash systemd, and you should never edit those, because the next upgrade replaces them. Local units and local changes go under slash etc slash systemd slash system, which takes precedence. To change one setting, don't copy the whole file. sudo systemctl edit reportd creates a drop-in, a small file holding only your change, here an environment variable for the listen address. systemctl cat then shows the unit file and every drop-in, in the order they apply, which is the first thing to check when a service doesn't behave as its file suggests. Now the most misunderstood pair of directives, and the table spells them out. After equals B only controls order. If both units are being started anyway, this one waits for B. It does not cause B to be started. Wants equals B does cause B to start, but doesn't wait for it. Requires is stronger: if B stops, this unit stops too. So the usual combination is Wants plus After, exactly as reportd uses for network dash online dot target, the target that means networking is actually configured, not merely that the network service has started. Next: starting, enabling, and when a service is really ready.",
}
