import type { Section } from '../types'

export const packagesAndTrust: Section = {
  id: 'packages-and-trust',
  title: 'Packages, repositories and trust',
  scene: 'services-trust',
  focus: 'release',
  slide: `## Packages, repositories and trust

A **package** is software plus metadata: version, dependencies, files, and scripts to run on install. A **repository** publishes packages, and a **signature** says who published them.

### Where apt looks
- \`/etc/apt/sources.list.d/*.sources\` *(deb822 format, Debian 13 default)*
- Each source names its URL, suites, components — and the **key** that must sign it

### The chain of hashes
- The signed **InRelease** file lists hashes of the indexes
- Each index lists the hash of every \`.deb\`
- A mismatch anywhere: apt refuses

### What you are trusting
- The **signer**, not the mirror or the network path
- Install scripts run **as root** — adding a repository grants its signer that power`,
  narration:
    "Chapter six turns reportd into software that the system installs, starts and supervises. It begins with packages. A package bundles a program's files with metadata: its version, what it depends on, and small scripts that run when it is installed or removed. Packages come from repositories, and Debian 13 describes them in files under slash etc slash apt slash sources dot list dot d, using the deb822 format shown at the top. Each source names a URL, the suites to use, such as trixie and trixie-updates, the components, and, crucially, the signing key that its contents must be signed with. The middle of the scene shows how a download is checked. apt update fetches the InRelease file, which is signed by the archive key installed on your system. That file lists cryptographic hashes of the package indexes. Each index, in turn, lists the hash of every package file. So when apt downloads a dot deb, it can verify that file against a chain that ends in a signature it trusts. A mirror, a proxy or an attacker on the network can serve you old or missing files, but cannot forge new ones. That tells you exactly what you are trusting: the signer. And because package scripts run as root during installation, adding any third-party repository gives its signer the power to run code as root on your machine. Treat it as that kind of decision. Next: reading a package transaction before making it.",
}
