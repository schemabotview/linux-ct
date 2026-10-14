import type { Section } from '../types'

export const networkBottlenecks: Section = {
  id: 'network-bottlenecks',
  title: 'Network throughput, retransmissions and queues',
  scene: 'diagnosis-network',
  focus: 'where',
  slide: `## Network throughput, retransmissions and queues

Clients see timeouts and 503s, which look like a network fault. The evidence on the server says where the queue actually is.

### Server-side evidence
- \`ss -lnt\` on a listener: **Recv-Q** is the accept queue, **Send-Q** its limit
- \`nstat\` — kernel counters: **listen overflows**, **retransmissions**
- \`ip -s link\` — interface **errors and drops**

### Where the bottleneck is
- Accept queue full → the **application** accepts too slowly
- Retransmissions rising → **loss** on the path
- Drops on the interface → this host's **NIC or driver**

### A network symptom, an application cause
- Here retransmissions are low; the queue fills **behind reportd**
- So ask why reportd is slow — the previous sections answer it`,
  narration:
    "From the clients' side, this incident looks like a network problem: timeouts and five oh three errors. The server's own evidence tells a more precise story. For a listening socket, ss shows two queue numbers that mean something special. Recv Q is the number of connections that have completed the TCP handshake but haven't yet been accepted by the application, and Send Q is the limit of that queue. reportd's listener shows one hundred and twenty-nine waiting against a limit of one hundred and twenty-eight. The queue is full. nstat reads the kernel's network counters, and listen overflows shows over four thousand connections dropped because that queue had no room. Retransmissions, by contrast, are low, so packets aren't being lost on the path. The table turns that into a rule of thumb. A full accept queue points at the application accepting too slowly. Rising retransmissions point at loss somewhere on the path or a congested link. Errors and drops on the interface point at this host's network card or driver. And traffic at the link's full speed points at bandwidth itself. Here, the network is carrying everything it's given. The queue is filling behind reportd, because reportd is slow to accept, because, as the previous sections suggested, its threads are waiting on storage. A network symptom with an application cause is extremely common, and the habit of following the queue to whoever isn't draining it is what finds it. Next: putting all of the evidence on one timeline.",
}
