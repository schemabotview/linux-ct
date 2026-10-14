import type { Scene } from '@graphlearning/flow'

// §3 — the plan's illustration: after an update reportd will not start; the evidence is followed
// from the journal through identity and path permissions to an AppArmor denial. Profile name and
// paths illustrative; the audit line shape is AppArmor's.
export const operationsPolicy: Scene = {
  id: 'operations-policy',
  title: 'Capabilities and mandatory access control',
  flow: 'TB',
  nodes: [
    {
      id: 'trail',
      kind: 'code',
      filename: 'bash — reportd 2.6 will not start, illustrative output',
      label: `$ journalctl -u reportd -b | tail -1
reportd[4102]: open /etc/reportd/tls/key.pem: permission denied
$ sudo -u reportd id                      # identity: as expected
uid=998(reportd) gid=998(reportd) groups=998(reportd)
$ namei -l /etc/reportd/tls/key.pem       # mode and owner: fine
-rw-r----- root reportd key.pem
$ journalctl -k | grep DENIED | tail -1   # policy: there it is
apparmor="DENIED" operation="open" profile="reportd" name="/etc/reportd/tls/key.pem" requested_mask="r"`,
    },
    {
      id: 'layers',
      label: 'Three checks, in order — any can refuse',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'dac', label: 'Permissions', sub: 'owner, group, mode, ACL', pattern: 'user', icon: 'lock' },
        { id: 'caps', label: 'Capabilities', sub: 'e.g. CAP_NET_BIND_SERVICE', pattern: 'service', icon: 'key' },
        { id: 'mac', label: 'AppArmor', sub: 'the profile’s allowed paths', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'distro',
      kind: 'table',
      label: 'Mandatory access control by family',
      headers: ['family', 'default MAC', 'see denials with'],
      values: [
        ['Debian, Ubuntu, SUSE', 'AppArmor (paths)', 'aa-status, journalctl -k'],
        ['Fedora, RHEL', 'SELinux (labels)', 'ausearch -m avc'],
      ],
    },
  ],
  edges: [
    { source: 'trail', target: 'layers', label: 'the third check refused' },
    { source: 'layers', target: 'distro' },
  ],
}
