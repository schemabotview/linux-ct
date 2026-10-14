import type { Section } from '../types'

export const pageCacheAndPersistence: Section = {
  id: 'page-cache-and-persistence',
  title: 'Page cache, buffered writes and persistence',
  scene: 'storage-persistence',
  focus: 'claims',
  slide: `## Page cache, buffered writes and persistence

When \`write()\` returns, the data is usually only in **memory**. It reaches the disk **later**, unless the program asks.

### The path of a write
- Bytes are copied into the **page cache** and marked **dirty**
- The kernel writes them back **seconds later**
- \`fsync()\` forces the file's data out **now**, through the device cache

### Three different claims
- **Write succeeded** — not durable
- **Flushed** — the file's data survives power loss
- **Renamed durably** — also needs \`fsync()\` on the **directory**

### Memory that looks used
- \`buff/cache\` is reclaimable cache; read **available**, not **free**
- **Swap** holds pages moved out of RAM under pressure`,
  narration:
    "Chapter five promised to explain why an atomic rename isn't the same as durability. Here's why. When a program writes to a file and write returns successfully, the data is usually not on the disk yet. The kernel has copied it into the page cache, a large area of memory holding file data, and marked those pages dirty. A few seconds later, the kernel writes them back to the device in the background, and even then the disk may hold them in its own volatile cache for a while. The diagram shows the four places one write passes through. That design makes most programs fast, but it means three different claims must be kept apart, as the table does. Write succeeded only says the kernel accepted the bytes. If the power fails now, they may be gone. The data was flushed is a stronger claim, and the program gets it by calling fsync on the file, which doesn't return until the data has reached stable storage. And for the write-then-rename pattern, the rename itself is a change to the directory, so the directory needs an fsync too before the new name is durable. Databases do all of this carefully; simple scripts usually don't. The page cache also explains a common misreading of free. Here buff slash cache is eleven gigabytes and free is just one point two, which looks alarming. It isn't. Cache is given back the moment programs need memory, which is why available, at twelve gigabytes, is the column to read. Swap holds pages moved out of RAM under real pressure, which is chapter nine's subject. Next: snapshots, backups, and consistency.",
}
