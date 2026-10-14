import type { Scene } from '@graphlearning/flow'
import { diagnosisMethod } from './method'
import { diagnosisCpu } from './cpu'
import { diagnosisMemory } from './memory'
import { diagnosisIo } from './io'
import { diagnosisNetwork } from './network'
import { diagnosisCorrelate } from './correlate'
import { diagnosisStrace } from './strace'
import { diagnosisCgroups } from './cgroups'
import { diagnosisExperiment } from './experiment'

// Course 9 scene bundle, spread into src/scenes/index.ts.
export const diagnosisScenes: Scene[] = [
  diagnosisMethod,
  diagnosisCpu,
  diagnosisMemory,
  diagnosisIo,
  diagnosisNetwork,
  diagnosisCorrelate,
  diagnosisStrace,
  diagnosisCgroups,
  diagnosisExperiment,
]
