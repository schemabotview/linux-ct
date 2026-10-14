import type { Section } from '../types'

export const archivesAndCompression: Section = {
  id: 'archives-and-compression',
  title: 'Archives and compression',
  scene: 'shell-archives',
  focus: 'session',
  slide: `## Archives and compression

An **archive** bundles many files, with their names and metadata, into one. **Compression** makes that bundle smaller. \`tar\` does both.

### The usual three steps
- \`tar -czf\` — create a gzip-compressed archive
- \`tar -tzvf\` — **list** it: names, owners, modes, sizes
- \`tar -xzf … -C dir\` — extract into a directory **you chose**

### Read the listing first
- Is everything under **one top folder**?
- Any **absolute** or \`../\` paths trying to escape?
- Would it **overwrite** files that already exist?

### What tar keeps
- Names, modes, times; owners are restored **only for root**
- GNU tar strips leading \`/\` and \`../\` — a safeguard, not a guarantee`,
  narration:
    "The last tool in this chapter packages files up. An archive bundles many files, along with their names, permissions and timestamps, into a single file. Compression makes that file smaller. tar does both, and three commands cover almost everything. The first creates an archive. Dash c for create, z for gzip compression, f for the archive's filename, and dash capital C to change into the lab directory first, so that names inside the archive start at reports, not at your home directory. The second command lists the archive without extracting anything: dash t for list, v for the details. Read this before every extraction, especially for archives you did not make yourself. The bottom of the scene says what you are looking for. Does everything sit under one top folder, or will hundreds of files spill into the current directory? Do any names start with a slash or contain dot dot, trying to escape the destination? And would anything overwrite files that already exist, which tar does silently? GNU tar strips leading slashes and dot dot components by default, which helps, but it is a safeguard, not a reason to skip the listing. Then extract with dash x, into a directory created for the purpose, named with dash capital C. A note on metadata. tar records owners and modes, but when an ordinary user extracts, the files belong to that user; only root restores the original owners. You'll see why in chapter four. That completes the toolkit. Next chapter: who runs a command, and how processes live.",
}
