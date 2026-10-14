import type { Scene } from '@graphlearning/flow'
import { scriptingInvocation } from './invocation'
import { scriptingConditions } from './conditions'
import { scriptingLoops } from './loops'
import { scriptingArguments } from './arguments'
import { scriptingErrors } from './errors'
import { scriptingPublish } from './publish'
import { scriptingRobustness } from './robustness'
import { scriptingHandoff } from './handoff'

// Course 5 scene bundle, spread into src/scenes/index.ts.
export const scriptingScenes: Scene[] = [
  scriptingInvocation,
  scriptingConditions,
  scriptingLoops,
  scriptingArguments,
  scriptingErrors,
  scriptingPublish,
  scriptingRobustness,
  scriptingHandoff,
]
