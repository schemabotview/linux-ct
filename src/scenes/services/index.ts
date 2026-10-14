import type { Scene } from '@graphlearning/flow'
import { servicesTrust } from './trust'
import { servicesApt } from './apt'
import { servicesBoot } from './boot'
import { servicesSystemd } from './systemd'
import { servicesUnit } from './unit'
import { servicesLifecycle } from './lifecycle'
import { servicesLogs } from './logs'
import { servicesTimers } from './timers'
import { servicesHardening } from './hardening'

// Course 6 scene bundle, spread into src/scenes/index.ts.
export const servicesScenes: Scene[] = [
  servicesTrust,
  servicesApt,
  servicesBoot,
  servicesSystemd,
  servicesUnit,
  servicesLifecycle,
  servicesLogs,
  servicesTimers,
  servicesHardening,
]
