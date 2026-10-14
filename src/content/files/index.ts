import type { Course } from '../types'
import { absoluteAndRelativePaths } from './01-absolute-and-relative-paths'
import { directoryLayout } from './02-directory-layout'
import { fileTypesAndMetadata } from './03-file-types-and-metadata'
import { createCopyMoveRemove } from './04-create-copy-move-remove'
import { inodesAndLinks } from './05-inodes-and-links'
import { pathResolutionAndMounts } from './06-path-resolution-and-mounts'
import { editorsPagersAndEncodings } from './07-editors-pagers-and-encodings'
import { findingFiles } from './08-finding-files'

// Course 2 — Files, Paths, and the Filesystem Namespace (LINUX-COURSE-PLAN.md, chapter 2).
export const files: Course = {
  id: 'files',
  title: 'Files, paths and the filesystem namespace',
  sections: [
    absoluteAndRelativePaths,
    directoryLayout,
    fileTypesAndMetadata,
    createCopyMoveRemove,
    inodesAndLinks,
    pathResolutionAndMounts,
    editorsPagersAndEncodings,
    findingFiles,
  ],
}
