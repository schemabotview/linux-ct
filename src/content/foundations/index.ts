import type { Course } from '../types'
import { kernelAndDistributions } from './01-kernel-and-distributions'
import { bootToSession } from './02-boot-to-session'
import { shellsAndCommands } from './03-shells-and-commands'
import { firstSession } from './04-first-session'
import { commandSyntaxAndHelp } from './05-command-syntax-and-help'
import { hostsVmsAndContainers } from './06-hosts-vms-and-containers'

// Course 1 — System Foundations and a First Session (LINUX-COURSE-PLAN.md, chapter 1).
export const foundations: Course = {
  id: 'foundations',
  title: 'System foundations and a first session',
  sections: [
    kernelAndDistributions,
    bootToSession,
    shellsAndCommands,
    firstSession,
    commandSyntaxAndHelp,
    hostsVmsAndContainers,
  ],
}
