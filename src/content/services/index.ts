import type { Course } from '../types'
import { packagesAndTrust } from './01-packages-and-trust'
import { aptAndDpkg } from './02-apt-and-dpkg'
import { bootChain } from './03-boot-chain'
import { systemdUnitsAndTargets } from './04-systemd-units-and-targets'
import { unitConfiguration } from './05-unit-configuration'
import { startEnableAndReadiness } from './06-start-enable-and-readiness'
import { journalAndLogs } from './07-journal-and-logs'
import { timersAndCron } from './08-timers-and-cron'
import { serviceHardening } from './09-service-hardening'

// Course 6 — Software, Boot, and Managed Services (LINUX-COURSE-PLAN.md, chapter 6).
export const services: Course = {
  id: 'services',
  title: 'Software, boot and managed services',
  sections: [
    packagesAndTrust,
    aptAndDpkg,
    bootChain,
    systemdUnitsAndTargets,
    unitConfiguration,
    startEnableAndReadiness,
    journalAndLogs,
    timersAndCron,
    serviceHardening,
  ],
}
