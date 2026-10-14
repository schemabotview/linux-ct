import type { Course } from '../types'
import { interfacesAndAddresses } from './01-interfaces-and-addresses'
import { routesAndGateways } from './02-routes-and-gateways'
import { portsAndSockets } from './03-ports-and-sockets'
import { dnsResolution } from './04-dns-resolution'
import { networkConfiguration } from './05-network-configuration'
import { layeredDiagnosis } from './06-layered-diagnosis'
import { sshIdentity } from './07-ssh-identity'
import { remoteCommandsAndTransfer } from './08-remote-commands-and-transfer'
import { firewallsAndExposure } from './09-firewalls-and-exposure'

// Course 7 — Networking and Remote Access (LINUX-COURSE-PLAN.md, chapter 7).
export const networking: Course = {
  id: 'networking',
  title: 'Networking and remote access',
  sections: [
    interfacesAndAddresses,
    routesAndGateways,
    portsAndSockets,
    dnsResolution,
    networkConfiguration,
    layeredDiagnosis,
    sshIdentity,
    remoteCommandsAndTransfer,
    firewallsAndExposure,
  ],
}
