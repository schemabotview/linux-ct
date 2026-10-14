import type { Section } from '../types'

export const networkConfiguration: Section = {
  id: 'network-configuration',
  title: 'DHCP, network managers and persistence',
  scene: 'networking-config',
  focus: 'managers',
  slide: `## DHCP, network managers and persistence

The kernel holds the **current** network state. A **network manager** holds the configuration that recreates it at every boot.

### Runtime changes
- \`ip address add\`, \`ip route add\` — take effect **immediately**
- …and are **lost** at reboot or when the manager reapplies its config
- Useful for testing; keep the matching \`del\` as the rollback

### Persistent configuration
- Written to the manager's own files, applied at boot
- **DHCP** supplies address, gateway and DNS server automatically

### One manager per interface
- Debian servers: **ifupdown**; desktops: **NetworkManager**
- Find out which one is in charge **before** editing anything`,
  narration:
    "There are two layers to network configuration, and confusing them leads to changes that vanish. The kernel holds the current state: the addresses, routes and settings in effect right now. ip can change that state directly. The first card adds a second address to enp one s zero, and it works immediately. The next line removes it again, which is the rollback to keep next to every runtime change. But even if you don't remove it, the address is gone after the next reboot, or the next time the interface is restarted, because nothing recorded it. Runtime changes are for testing. Persistence belongs to a network manager, a program that reads configuration files at boot and recreates the state. The second card is the classic Debian server configuration, from the ifupdown package, in slash etc slash network slash interfaces. It brings enp one s zero up automatically and asks DHCP for its settings. DHCP, the dynamic host configuration protocol, lets a server on the network hand out the address, the default gateway and the DNS server to use, so they don't have to be written on each machine. IPv6 here uses router advertisements instead. The table lists the three managers you'll meet on Debian. ifupdown on servers, NetworkManager on desktops and laptops, and systemd-networkd on many cloud images. Each has its own files, and an interface should belong to exactly one. So before editing anything, find out which manager is in charge of the interface, and change its configuration rather than another's. Next: diagnosing a failed request, layer by layer.",
}
