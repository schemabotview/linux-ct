import { foundations } from './foundations'
import { files } from './files'
import { shell } from './shell'
import { identity } from './identity'
import { scripting } from './scripting'
import { services } from './services'
import { networking } from './networking'
import { storage } from './storage'
import { diagnosis } from './diagnosis'
import { operations } from './operations'
import type { Course, Section } from './types'

// Course registry, in syllabus order (LINUX-COURSE-PLAN.md chapters 1–10). Courses are added here
// as each is authored.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [files.id]: files,
  [shell.id]: shell,
  [identity.id]: identity,
  [scripting.id]: scripting,
  [services.id]: services,
  [networking.id]: networking,
  [storage.id]: storage,
  [diagnosis.id]: diagnosis,
  [operations.id]: operations,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
