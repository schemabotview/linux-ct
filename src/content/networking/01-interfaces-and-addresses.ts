import type { Section } from '../types'

export const interfacesAndAddresses: Section = {
  id: 'interfaces-and-addresses',
  title: 'Interfaces, addresses and prefixes',
  scene: 'networking-addresses',
  focus: 'prefix',
  slide: `## Interfaces, addresses and prefixes

A host talks to the network through **interfaces**, and each interface can hold several **addresses**, IPv4 and IPv6 at once.

### Reading \`ip address\`
- \`lo\` — loopback: traffic that never leaves this host
- \`enp1s0\` — a real network card; its **state** and **link address**
- \`inet\` is IPv4, \`inet6\` is IPv6

### The prefix length
- \`/24\` — the first 24 bits name the **network**, the rest the **host**
- Addresses in the same prefix are **on-link**: reachable without a router

### Three kinds of address
- **Loopback** — this host only
- **Global** — routable across networks
- **Link-local** \`fe80::\` — only on the directly attached link`,
  narration:
    "Chapter seven follows a request from a client to reportd and back, and it starts with addresses. A host talks to the network through interfaces, and ip address lists them. The first, lo, is loopback: a virtual interface for traffic that never leaves this machine, with the addresses one twenty-seven dot zero dot zero dot one and colon colon one. The second, enp one s zero, is a real network card. Its flags say it's up and has a link, and its link slash ether line shows its hardware address. Below that are the addresses that matter. inet is IPv4, here one nine two dot one six eight dot one dot twenty, slash twenty-four. inet6 is IPv6, and this interface has two of them, which is completely normal. The slash twenty-four is the prefix length, and the table reads it. The first twenty-four bits name the network, one nine two dot one six eight dot one; the last eight name this host on it. Every address sharing that prefix is on-link: this host can reach it directly, with no router in between. The other addresses fall into three kinds. Loopback addresses are reachable only from this host itself, which is why reportd will listen on one. Global addresses can be routed across networks. And link-local IPv6 addresses, starting f e eight zero, exist on every IPv6 interface, but only work on the directly attached link. Next: how a packet for somewhere else finds its way out.",
}
