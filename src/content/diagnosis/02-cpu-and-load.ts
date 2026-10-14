import type { Section } from '../types'

export const cpuAndLoad: Section = {
  id: 'cpu-and-load',
  title: 'CPU utilisation, load average and contention',
  scene: 'diagnosis-cpu',
  focus: 'load',
  slide: `## CPU utilisation, load average and contention

**CPU utilisation** says how busy the processors were. **Load average** counts tasks wanting to run — and on Linux, tasks **blocked on I/O** too.

### Reading top's CPU line
- \`us\`, \`sy\` — running user and kernel code
- \`id\` — idle; \`wa\` — idle **while** tasks wait for I/O
- \`st\` — time a VM's hypervisor took away

### Load average is not CPU percentage
- An average of **runnable** plus **uninterruptible (D)** tasks
- Compare with **nproc**, and watch the 1-, 5- and 15-minute **trend**
- Load 8 on 8 cores can mean **busy CPUs** — or **waiting disks**

### CPU contention looks like
- High \`us\`/\`sy\`, little idle, a run queue above the core count`,
  narration:
    "The first suspect is usually the processor, and two numbers get confused here more than anywhere else. CPU utilisation says what the processors spent their time doing. top's CPU line breaks it down. us and sy are time running user programs and the kernel. id is idle. wa is also idle, but idle while at least one task was waiting for input or output. And st, on a virtual machine, is time the hypervisor gave to someone else. Load average is a different measure. It's an average number of tasks that wanted to run, over one, five and fifteen minutes. On Linux, it counts not only tasks that are running or waiting for a CPU, but also tasks in uninterruptible sleep, state D from chapter four, which usually means waiting on a disk. That's why the card compares two hosts with eight cores and the same load of about eight. Host A is CPU-bound: ninety-one percent user time, almost nothing idle. Its load really is eight busy processors. Host B has a load of eight with forty-one percent idle and fifty-four percent waiting on I/O. Its processors are mostly doing nothing. The load is tasks stuck waiting for storage. So load average is not CPU percentage, and the same number can describe opposite problems. Compare load with nproc, look at the trend across the three averages, and then read the CPU line to see what kind of load it is. reportd's host looks like host B. Next: memory, and why low free memory is usually fine.",
}
