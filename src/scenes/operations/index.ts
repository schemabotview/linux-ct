import type { Scene } from '@graphlearning/flow'
import { operationsThreats } from './threats'
import { operationsAccess } from './access'
import { operationsPolicy } from './policy'
import { operationsSecrets } from './secrets'
import { operationsRestore } from './restore'
import { operationsRecovery } from './recovery'
import { operationsChange } from './change'
import { operationsLifecycle } from './lifecycle'

// Course 10 scene bundle, spread into src/scenes/index.ts.
export const operationsScenes: Scene[] = [
  operationsThreats,
  operationsAccess,
  operationsPolicy,
  operationsSecrets,
  operationsRestore,
  operationsRecovery,
  operationsChange,
  operationsLifecycle,
]
