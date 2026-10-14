import type { Scene } from '@graphlearning/flow'
import { foundationsScenes } from './foundations'
import { filesScenes } from './files'
import { shellScenes } from './shell'
import { identityScenes } from './identity'
import { scriptingScenes } from './scripting'
import { servicesScenes } from './services'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...foundationsScenes, ...filesScenes, ...shellScenes, ...identityScenes, ...scriptingScenes, ...servicesScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
