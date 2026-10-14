import type { Section } from '../types'

export const layeredDiagnosis: Section = {
  id: 'layered-diagnosis',
  title: 'Layered diagnosis from interface to application',
  scene: 'networking-diagnosis',
  focus: 'meaning',
  slide: `## Layered diagnosis from interface to application

"Can't reach reportd" has many causes. Read the **exact** error, decide **which layer** it points to, and test that layer.

### Four failures that look alike
- **Could not resolve** — the name, before any packet is sent
- **Connection refused**, fast — the host answered: **nothing listening** on that address and port
- **Timeout** — packets lost or dropped somewhere: route, firewall, host down
- **HTTP 503** — the network worked; the **application** answered with an error

### Each points somewhere — none proves a cause
- Refused here was reportd's **loopback** bind, not a crash

### Ping is a weak test
- ICMP is often filtered; ping failing does not mean the app is unreachable
- Test the **real port and protocol**`,
  narration:
    "When someone says they can't reach reportd, the most useful thing you can do is read the exact error, because each kind of failure points at a different layer. The card shows four attempts with curl. The first fails with could not resolve host. No packet was ever sent to reportd; name resolution failed, and here the reason is a typo in the name. The second fails almost instantly with couldn't connect. A fast failure like that usually means the host was reached and actively refused the connection, because nothing was listening on that address and port. And look closely: the client used the host's network address, but reportd listens only on loopback, as section three showed. Nothing is broken; it's configured that way. The third waits five seconds and gives up. A timeout means packets disappeared somewhere: no route, a firewall silently dropping them, or a host that's down. It tells you something on the path is wrong, but not which hop. The fourth succeeds at the network level completely. The server answered with HTTP five oh three, an application error. The network is fine; look at reportd's logs. The table summarises what each suggests, and, just as important, what it does not prove. Treat each as a hypothesis about a layer, then test that layer. And be careful with ping. Many networks filter its packets, so a failed ping proves very little about whether a service is reachable. Test the real port with the real protocol. Next: logging in to remote machines safely.",
}
