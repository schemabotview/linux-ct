import type { Section } from '../types'

export const portsAndSockets: Section = {
  id: 'ports-and-sockets',
  title: 'TCP, UDP, ports and listening sockets',
  scene: 'networking-sockets',
  focus: 'bind',
  slide: `## TCP, UDP, ports and listening sockets

An address reaches a **host**; a **port** reaches a program on it. A program that accepts connections holds a **listening socket**.

### Transports
- **TCP** — a connection: ordered, acknowledged, retransmitted
- **UDP** — independent datagrams: no connection, no retransmission

### Reading \`ss -lntp\`
- \`-l\` listening, \`-n\` numeric, \`-t\` TCP, \`-p\` process *(needs root for others' processes)*
- reportd: \`127.0.0.1:8080\`; sshd: \`0.0.0.0:22\` and \`[::]:22\`

### The bind address decides who can connect
- **Loopback** — only programs on this host
- **One address** — anything that can route to it
- **0.0.0.0 / [::]** — every address the host has`,
  narration:
    "An IP address gets a packet to the right host. A port number gets it to the right program on that host. A program that wants to receive connections opens a socket, binds it to an address and port, and listens. There are two transports you'll meet constantly. TCP sets up a connection, and delivers data in order, acknowledging it and retransmitting anything lost. Web traffic and SSH use TCP. UDP sends independent datagrams with none of that machinery: no connection, no ordering, no retries. DNS queries typically use UDP. ss shows sockets. With dash l n t p, it lists listening TCP sockets, numerically, with the owning process, which needs root to see other users' processes. Two programs are listening here. reportd listens on one two seven dot zero dot zero dot one, port eighty eighty. sshd listens on zero dot zero dot zero dot zero, port twenty-two, and again on the IPv6 equivalent. The address in front of the port is the bind address, and as the table shows, it decides who can connect at all, before any firewall is consulted. Bound to loopback, reportd accepts connections only from programs on this same host. Bound to one interface address, it accepts anything that can route to that address. Bound to zero dot zero dot zero dot zero, or square brackets colon colon, it listens on every address the host has. reportd's loopback binding is deliberate, and section nine shows why. Next: turning names into addresses.",
}
