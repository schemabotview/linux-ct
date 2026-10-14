import type { Course } from '../types'
import { threatsAndLeastPrivilege } from './01-threats-and-least-privilege'
import { patchingAndAccess } from './02-patching-and-access'
import { capabilitiesAndMac } from './03-capabilities-and-mac'
import { secretsAndAudit } from './04-secrets-and-audit'
import { backupAndRestoreValidation } from './05-backup-and-restore-validation'
import { recoverySequences } from './06-recovery-sequences'
import { changeControlAndRunbooks } from './07-change-control-and-runbooks'
import { integratedLifecycle } from './08-integrated-lifecycle'

// Course 10 — Security, Recovery, and Integrated Operations (LINUX-COURSE-PLAN.md, chapter 10).
export const operations: Course = {
  id: 'operations',
  title: 'Security, recovery and integrated operations',
  sections: [
    threatsAndLeastPrivilege,
    patchingAndAccess,
    capabilitiesAndMac,
    secretsAndAudit,
    backupAndRestoreValidation,
    recoverySequences,
    changeControlAndRunbooks,
    integratedLifecycle,
  ],
}
