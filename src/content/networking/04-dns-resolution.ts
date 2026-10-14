import type { Section } from '../types'

export const dnsResolution: Section = {
  id: 'dns-resolution',
  title: 'DNS and name resolution',
  scene: 'networking-dns',
  focus: 'nss',
  slide: `## DNS and name resolution

Programs ask the **C library** to resolve a name. It follows \`/etc/nsswitch.conf\`, which may consult **local files before DNS**.

### The lookup order
- \`hosts: files dns\` — \`/etc/hosts\` first, then DNS
- \`/etc/resolv.conf\` — which DNS server to ask
- DNS servers **cache** answers for their **TTL**

### Two tools, two paths
- \`getent hosts name\` — the **same path** programs use
- \`dig name\` — asks DNS **directly**, skipping \`/etc/hosts\` *(bind9-dnsutils)*

### When they disagree
- A forgotten \`/etc/hosts\` entry beats DNS — for every program
- A changed record may stay stale **until its TTL expires**`,
  narration:
    "People type names, but packets need addresses, so almost every connection begins with name resolution. A program doesn't usually speak DNS itself. It asks the C library, and the library follows slash etc slash nsswitch dot conf. On a Debian server, the hosts line says files, then dns. Files means slash etc slash hosts, a local table that is checked first. Only if the name isn't there does the library ask a DNS server, the one named in slash etc slash resolv dot conf. That server either knows the answer or asks others, and caches what it learns for as long as the record's time-to-live allows. The session shows why the order matters. getent hosts follows exactly the same path that curl, ssh and reportd will use, and it returns ten dot zero dot zero dot ninety-nine. dig asks the DNS server directly, skipping slash etc slash hosts, and returns one nine two dot one six eight dot one dot twenty. Two tools, two different answers. The grep reveals the cause: a forgotten test entry in slash etc slash hosts, overriding DNS for every program on this machine. dig is in the bind nine dnsutils package and is excellent for investigating DNS itself, but to know what your programs will actually connect to, trust getent. And remember caches. After a DNS record changes, clients and servers may keep the old answer until its time-to-live expires, so a fix can be correct and still not visible yet. Next: where network configuration lives, and what survives a reboot.",
}
