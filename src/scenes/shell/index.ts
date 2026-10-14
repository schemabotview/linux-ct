import type { Scene } from '@graphlearning/flow'
import { shellRedirection } from './redirection'
import { shellPipelines } from './pipelines'
import { shellExpansion } from './expansion'
import { shellVariables } from './variables'
import { shellGrep } from './grep'
import { shellSortUniq } from './sort-uniq'
import { shellSedAwk } from './sed-awk'
import { shellFilenames } from './filenames'
import { shellArchives } from './archives'

// Course 3 scene bundle, spread into src/scenes/index.ts.
export const shellScenes: Scene[] = [
  shellRedirection,
  shellPipelines,
  shellExpansion,
  shellVariables,
  shellGrep,
  shellSortUniq,
  shellSedAwk,
  shellFilenames,
  shellArchives,
]
