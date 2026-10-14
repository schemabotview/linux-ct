import type { Scene } from '@graphlearning/flow'

// §1 — where packages come from and why apt trusts them: a deb822 source names a repository and the
// key that must have signed it; the signed Release file pins the hashes of the indexes, which pin
// the hashes of each .deb. Keyring filename as shipped by debian-archive-keyring; illustrative.
export const servicesTrust: Scene = {
  id: 'services-trust',
  title: 'Repositories and the chain of trust',
  flow: 'TB',
  nodes: [
    {
      id: 'source',
      kind: 'code',
      filename: '/etc/apt/sources.list.d/debian.sources — illustrative',
      label: `Types: deb
URIs: http://deb.debian.org/debian
Suites: trixie trixie-updates
Components: main
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg`,
    },
    {
      id: 'chain',
      label: 'How a download is checked',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'key', label: '1 · Archive key', sub: 'installed locally, trusted', pattern: 'user', icon: 'key' },
        { id: 'release', label: '2 · InRelease', sub: 'signed; lists index hashes', pattern: 'service', icon: 'fingerprint' },
        { id: 'packages', label: '3 · Packages index', sub: 'lists each .deb’s hash', pattern: 'service', icon: 'table' },
        { id: 'deb', label: '4 · The .deb', sub: 'hash must match to install', pattern: 'external', icon: 'package' },
      ],
    },
    {
      id: 'boundary',
      label: 'What you are trusting',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'signer', label: 'The signer', sub: 'not the mirror or the network', icon: 'shieldcheck' },
        { id: 'scripts', label: 'Install scripts', sub: 'run as root on your system', icon: 'filecode' },
        { id: 'third', label: 'A new repo', sub: 'adds a signer with that power', icon: 'plug' },
      ],
    },
  ],
  edges: [
    { source: 'source', target: 'chain', label: 'apt update' },
    { source: 'source', target: 'boundary' },
  ],
}
