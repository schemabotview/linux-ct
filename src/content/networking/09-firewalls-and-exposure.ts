import type { Section } from '../types'

export const firewallsAndExposure: Section = {
  id: 'firewalls-and-exposure',
  title: 'Firewalls, TLS and exposure boundaries',
  scene: 'networking-exposure',
  focus: 'proxy',
  slide: `## Firewalls, TLS and exposure boundaries

A public request passes **several independent controls** before it reaches reportd. Each can stop it — and each must be understood when debugging.

### The layers
- **Upstream** firewall — router or cloud security group
- **Host** firewall — nftables *(Debian's framework)*
- **Reverse proxy** — terminates **TLS** on 443
- **reportd** — still bound to **loopback**

### Why this design
- Only the proxy is exposed; reportd is unreachable from outside **by construction**
- TLS protects the request **in transit**, up to the proxy

### Changing a firewall safely
- Keep your current session open; **test from a second one**
- Know your **console** recovery path before you start`,
  narration:
    "The last question is who can reach reportd at all, and the answer is a series of independent controls, any of which can stop a request. The diagram follows a public request in order. An upstream firewall, a home router or a cloud provider's security group, allows only port four four three through. The host's own firewall, written in nftables, Debian's firewall framework, allows SSH and HTTPS in and drops everything else. The ruleset below it is a minimal illustration: drop by default, accept replies to connections this host started, accept loopback, accept ports twenty-two and four four three. Then a reverse proxy listens on four four three. It terminates TLS, meaning it holds the certificate and decrypts the request, and forwards it to reportd over loopback. And reportd itself is still bound to one two seven dot zero dot zero dot one. That's the design reason from section three. reportd is unreachable from outside by construction, not just because a firewall rule happens to block it. If a rule is ever deleted by mistake, reportd is still not exposed. Only the proxy faces the network, and TLS protects the request in transit as far as the proxy. When debugging, remember that every layer can block traffic, and a timeout from section six could come from any of them. Finally, the plan's warning. A firewall or SSH change can lock you out of the machine you're changing. Keep your existing session open, test from a second one, and know your console path before you start. Next chapter: where reportd's data actually lives.",
}
