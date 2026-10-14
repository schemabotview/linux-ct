import type { Scene } from '@graphlearning/flow'
import { identityAccounts } from './accounts'
import { identityModes } from './modes'
import { identitySpecial } from './special'
import { identitySudo } from './sudo'
import { identityForkExec } from './fork-exec'
import { identitySignals } from './signals'
import { identityReaping } from './reaping'
import { identityProc } from './proc'

// Course 4 scene bundle, spread into src/scenes/index.ts.
export const identityScenes: Scene[] = [
  identityAccounts,
  identityModes,
  identitySpecial,
  identitySudo,
  identityForkExec,
  identitySignals,
  identityReaping,
  identityProc,
]
