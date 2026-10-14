import type { Section } from '../types'

export const aptAndDpkg: Section = {
  id: 'apt-and-dpkg',
  title: 'Installing, updating and removing with apt',
  scene: 'services-apt',
  focus: 'preview',
  slide: `## Installing, updating and removing with apt

\`apt\` plans a **transaction** — install this, add those dependencies, remove that — and shows it to you before doing anything.

### Read before you mutate
- \`--simulate\` shows the plan and changes nothing
- Look for **removals** you did not expect

### The verbs
- \`update\` refreshes indexes; \`upgrade\` installs newer versions
- \`remove\` keeps configuration; \`purge\` deletes it too

### Your configuration is protected
- Files under \`/etc\` from a package are **conffiles**
- On upgrade, edited conffiles are **kept**, and apt asks on conflict

### Asking dpkg
- \`dpkg -L pkg\` — what a package installed
- \`dpkg -S /path\` — which package owns a file`,
  narration:
    "apt is the tool you use to change installed software, and the habit to build is reading its plan before agreeing to it. apt install dash dash simulate jq asks for the plan without changing anything, and doesn't even need root. Debian thirteen ships apt version three, with this tidier layout. It will install jq, two libraries it depends on, and nothing will be removed. That last line is the one to check every time. A transaction that quietly removes something important is the classic way to break a server. Only then run the real command with sudo. The table lists the verbs. apt update refreshes the package indexes from the repositories; it installs nothing. apt upgrade installs newer versions of what you already have. apt remove uninstalls a program but keeps its configuration files, in case you reinstall it. apt purge deletes the configuration as well. That distinction exists because Debian protects configuration. Files that a package installs under slash etc are marked as conffiles. When an upgrade brings a new version of a conffile you have edited, your version is kept, and apt asks you what to do rather than overwriting it. Underneath apt is dpkg, the lower-level tool that actually installs package files, and it can answer two questions apt can't easily answer. dpkg dash capital L lists every file a package installed, and dpkg dash capital S tells you which package owns a given file. Next: what happens between power-on and systemd, in more detail.",
}
