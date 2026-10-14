import type { Scene } from '@graphlearning/flow'
import { storageDevices } from './devices'
import { storageStack } from './stack'
import { storageMounts } from './mounts'
import { storageCapacity } from './capacity'
import { storageRedundancy } from './redundancy'
import { storagePersistence } from './persistence'
import { storageBackups } from './backups'
import { storageRepair } from './repair'

// Course 8 scene bundle, spread into src/scenes/index.ts.
export const storageScenes: Scene[] = [
  storageDevices,
  storageStack,
  storageMounts,
  storageCapacity,
  storageRedundancy,
  storagePersistence,
  storageBackups,
  storageRepair,
]
