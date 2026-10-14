import type { Scene } from '@graphlearning/flow'
import { networkingAddresses } from './addresses'
import { networkingRoutes } from './routes'
import { networkingSockets } from './sockets'
import { networkingDns } from './dns'
import { networkingConfig } from './config'
import { networkingDiagnosis } from './diagnosis'
import { networkingSsh } from './ssh'
import { networkingRemote } from './remote'
import { networkingExposure } from './exposure'

// Course 7 scene bundle, spread into src/scenes/index.ts.
export const networkingScenes: Scene[] = [
  networkingAddresses,
  networkingRoutes,
  networkingSockets,
  networkingDns,
  networkingConfig,
  networkingDiagnosis,
  networkingSsh,
  networkingRemote,
  networkingExposure,
]
