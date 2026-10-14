import type { Course } from '../types'
import { scriptsAndInvocation } from './01-scripts-and-invocation'
import { conditionsAndTests } from './02-conditions-and-tests'
import { loopsAndFunctions } from './03-loops-and-functions'
import { arraysAndInput } from './04-arrays-and-input'
import { errorsAndCleanup } from './05-errors-and-cleanup'
import { temporaryFilesAndRaces } from './06-temporary-files-and-races'
import { loggingAndIdempotency } from './07-logging-and-idempotency'
import { schedulingAndLanguageChoice } from './08-scheduling-and-language-choice'

// Course 5 — Shell Scripting and Reliable Automation (LINUX-COURSE-PLAN.md, chapter 5).
export const scripting: Course = {
  id: 'scripting',
  title: 'Shell scripting and reliable automation',
  sections: [
    scriptsAndInvocation,
    conditionsAndTests,
    loopsAndFunctions,
    arraysAndInput,
    errorsAndCleanup,
    temporaryFilesAndRaces,
    loggingAndIdempotency,
    schedulingAndLanguageChoice,
  ],
}
