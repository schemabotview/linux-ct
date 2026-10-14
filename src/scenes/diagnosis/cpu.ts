import type { Scene } from '@graphlearning/flow'

// §2 — load average is not CPU percentage. On Linux it averages tasks that are runnable OR in
// uninterruptible sleep (state D), so heavy I/O waiting raises it with idle CPUs. procps top/vmstat
// output, illustrative.
export const diagnosisCpu: Scene = {
  id: 'diagnosis-cpu',
  title: 'CPU, load and contention',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — two hosts, both with load 8, illustrative output',
      label: `$ nproc
8
# host A — CPU-bound
%Cpu(s): 91.0 us,  6.2 sy,  0.0 ni,  2.1 id,  0.4 wa
load average: 8.12, 7.90, 6.33
# host B — waiting on storage
%Cpu(s):  3.1 us,  1.4 sy,  0.0 ni, 41.0 id, 54.3 wa
load average: 8.05, 7.71, 6.10`,
    },
    {
      id: 'fields',
      kind: 'table',
      label: 'Reading the CPU line',
      headers: ['field', 'time spent'],
      values: [
        ['us / sy', 'running user code / kernel code'],
        ['id', 'idle, nothing to run'],
        ['wa', 'idle, while some task waits on I/O'],
        ['st', 'stolen by the hypervisor (VMs)'],
      ],
    },
    {
      id: 'load',
      label: 'What load average counts',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'r', label: 'Runnable', sub: 'running or waiting for a CPU', icon: 'cpu' },
        { id: 'd', label: 'State D', sub: 'blocked in the kernel, often disk', icon: 'harddrive' },
        { id: 'cores', label: 'Compare', sub: 'with nproc, and with the trend', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'fields' },
    { source: 'fields', target: 'load', label: 'load ≠ CPU %' },
  ],
}
