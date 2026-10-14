import type { Scene } from '@graphlearning/flow'
import { filesPaths } from './paths'
import { filesLayout } from './layout'
import { filesMetadata } from './metadata'
import { filesOperations } from './operations'
import { filesLinks } from './links'
import { filesResolution } from './resolution'
import { filesText } from './text'
import { filesFinding } from './finding'

// Course 2 scene bundle, spread into src/scenes/index.ts.
export const filesScenes: Scene[] = [
  filesPaths,
  filesLayout,
  filesMetadata,
  filesOperations,
  filesLinks,
  filesResolution,
  filesText,
  filesFinding,
]
