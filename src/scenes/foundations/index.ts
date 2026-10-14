import type { Scene } from '@graphlearning/flow'
import { foundationsLayers } from './layers'
import { foundationsBoot } from './boot'
import { foundationsCommandPath } from './command-path'
import { foundationsFirstSession } from './first-session'
import { foundationsHelp } from './help'
import { foundationsBoundaries } from './boundaries'

// Course 1 scene bundle, spread into src/scenes/index.ts.
export const foundationsScenes: Scene[] = [
  foundationsLayers,
  foundationsBoot,
  foundationsCommandPath,
  foundationsFirstSession,
  foundationsHelp,
  foundationsBoundaries,
]
