import type { Section } from '../types'

export const routesAndGateways: Section = {
  id: 'routes-and-gateways',
  title: 'Routes, gateways and reachability',
  scene: 'networking-routes',
  focus: 'match',
  slide: `## Routes, gateways and reachability

For every outgoing packet, the kernel consults the **routing table**: which route covers this destination, and where should the packet go next?

### Reading \`ip route\`
- \`192.168.1.0/24 dev enp1s0\` — the local subnet, delivered **directly**
- \`default via 192.168.1.1\` — everything else, sent to the **gateway**

### The decision
- The **longest matching prefix** wins
- \`default\` (\`0.0.0.0/0\`) matches anything, so it loses to every specific route
- \`ip route get <address>\` shows the choice for one destination

### A route is not reachability
- The **reply** needs a route back too
- Every router on the way makes its own decision`,
  narration:
    "Once a packet has a destination address, the kernel has to decide where to send it next, and that is the routing table's job. ip route shows a typical table. The second line covers the local subnet: anything in one nine two dot one six eight dot one dot zero slash twenty-four is reached directly through enp one s zero. The first line is the default route: anything else goes via one nine two dot one six eight dot one, the gateway, a router that knows how to reach other networks. The kernel's rule is longest prefix match. Among all the routes whose prefix contains the destination, the most specific wins. The default route, zero dot zero dot zero dot zero slash zero, contains every address, so it matches everything but wins only when nothing more specific does. You don't need to work this out by hand. ip route get asks the kernel what it would do for one address. A neighbour on the subnet is delivered directly, out of enp one s zero. A public address like nine dot nine dot nine dot nine goes via the gateway. One caution belongs here, because it explains many connection problems. Having a route is not the same as being reachable. The reply has to find its way back, so the far end needs a route to you. And every router along the path makes its own decision, with its own table. A missing route anywhere, in either direction, looks like a timeout from where you sit. Next: what is actually listening when a packet arrives.",
}
