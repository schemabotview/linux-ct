import type { Course } from '../types'
import { devicesAndIdentifiers } from './01-devices-and-identifiers'
import { blockDevicesAndTheStack } from './02-block-devices-and-the-stack'
import { filesystemsAndFstab } from './03-filesystems-and-fstab'
import { capacityAndInodes } from './04-capacity-and-inodes'
import { lvmRaidAndFailureDomains } from './05-lvm-raid-and-failure-domains'
import { pageCacheAndPersistence } from './06-page-cache-and-persistence'
import { snapshotsAndBackups } from './07-snapshots-and-backups'
import { storageFailureAndRepair } from './08-storage-failure-and-repair'

// Course 8 — Devices, Filesystems, and Persistent Storage (LINUX-COURSE-PLAN.md, chapter 8).
export const storage: Course = {
  id: 'storage',
  title: 'Devices, filesystems and persistent storage',
  sections: [
    devicesAndIdentifiers,
    blockDevicesAndTheStack,
    filesystemsAndFstab,
    capacityAndInodes,
    lvmRaidAndFailureDomains,
    pageCacheAndPersistence,
    snapshotsAndBackups,
    storageFailureAndRepair,
  ],
}
