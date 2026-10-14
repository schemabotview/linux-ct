import type { Course } from '../types'
import { usersGroupsAndOwnership } from './01-users-groups-and-ownership'
import { permissionModes } from './02-permission-modes'
import { umaskAclsAndSpecialBits } from './03-umask-acls-and-special-bits'
import { sudoAndPrivilege } from './04-sudo-and-privilege'
import { processesForkAndExec } from './05-processes-fork-and-exec'
import { jobsAndSignals } from './06-jobs-and-signals'
import { exitStatusAndReaping } from './07-exit-status-and-reaping'
import { fileDescriptorsAndLimits } from './08-file-descriptors-and-limits'

// Course 4 — Users, Permissions, and Process Lifecycle (LINUX-COURSE-PLAN.md, chapter 4).
export const identity: Course = {
  id: 'identity',
  title: 'Users, permissions and process lifecycle',
  sections: [
    usersGroupsAndOwnership,
    permissionModes,
    umaskAclsAndSpecialBits,
    sudoAndPrivilege,
    processesForkAndExec,
    jobsAndSignals,
    exitStatusAndReaping,
    fileDescriptorsAndLimits,
  ],
}
