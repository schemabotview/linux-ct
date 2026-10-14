import type { Course } from '../types'
import { streamsAndRedirection } from './01-streams-and-redirection'
import { pipelinesAndStatus } from './02-pipelines-and-status'
import { quotingAndExpansions } from './03-quoting-and-expansions'
import { variablesAndPath } from './04-variables-and-path'
import { grepAndRegularExpressions } from './05-grep-and-regular-expressions'
import { sortCutUniqTr } from './06-sort-cut-uniq-tr'
import { sedAndAwk } from './07-sed-and-awk'
import { unusualFilenames } from './08-unusual-filenames'
import { archivesAndCompression } from './09-archives-and-compression'

// Course 3 — Shell Composition and Text Processing (LINUX-COURSE-PLAN.md, chapter 3).
export const shell: Course = {
  id: 'shell',
  title: 'Shell composition and text processing',
  sections: [
    streamsAndRedirection,
    pipelinesAndStatus,
    quotingAndExpansions,
    variablesAndPath,
    grepAndRegularExpressions,
    sortCutUniqTr,
    sedAndAwk,
    unusualFilenames,
    archivesAndCompression,
  ],
}
