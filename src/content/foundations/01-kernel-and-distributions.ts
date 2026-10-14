import type { Section } from '../types'

export const kernelAndDistributions: Section = {
  id: 'kernel-and-distributions',
  title: 'Kernel, user space and distributions',
  scene: 'foundations-layers',
  focus: 'kernel',
  slide: `## Kernel, user space and distributions

**Linux** is strictly the **kernel**: the one program that controls the hardware and decides which process runs, what memory it gets and which files it may touch. Everything you interact with directly runs **above** it, in **user space**.

### Two layers, two jobs
- **Kernel** — processes, memory, devices, filesystems, networking
- **User space** — shells, utilities, services and applications, which ask the kernel for everything

### A distribution is a choice of user space
- **Debian 13 "trixie"** picks the packages, versions, defaults and update policy
- It also ships a kernel build — but the kernel is **not** the distribution

### Two questions, two commands
- \`uname -r\` — which **kernel** is running now
- \`/etc/os-release\` — which **distribution** these files came from`,
  narration:
    "Before typing anything, it helps to know what you are typing into. Strictly speaking, Linux is one program: the kernel. It is the only software that talks to the hardware directly, and it decides which process runs next, how much memory each one gets, and which files each one is allowed to open. Everything else runs above it, in what is called user space. Your shell, the ls command, the web server, the package manager: all of them are ordinary programs that ask the kernel to do things on their behalf. A distribution, such as Debian thirteen, codenamed trixie, is a set of decisions about that user space. Which packages exist, which versions, which configuration files and defaults, and how updates arrive. Debian also ships a kernel build, but that does not make the kernel and the distribution the same thing, and the two commands at the top of the scene show why. uname dash r asks the running kernel for its release, here six point twelve, built by Debian for trixie. Reading slash etc slash os-release reads a plain file that the distribution installed, and it names Debian thirteen. Most of the time those two agree. Later in this chapter you will see a container where they don't: the kernel belongs to one system, and the files belong to another. Keeping these two identities apart is the first habit of this course. Next, how a powered-off machine becomes a system you can log in to.",
}
