import type { Course } from '../types'
import { symptomsAndHypotheses } from './01-symptoms-and-hypotheses'
import { cpuAndLoad } from './02-cpu-and-load'
import { memoryAndOom } from './03-memory-and-oom'
import { storageIo } from './04-storage-io'
import { networkBottlenecks } from './05-network-bottlenecks'
import { correlatingEvidence } from './06-correlating-evidence'
import { tracingSystemCalls } from './07-tracing-system-calls'
import { cgroupsAndNamespaces } from './08-cgroups-and-namespaces'
import { experimentsAndTradeOffs } from './09-experiments-and-trade-offs'

// Course 9 — Resource Behaviour and Systematic Diagnosis (LINUX-COURSE-PLAN.md, chapter 9).
export const diagnosis: Course = {
  id: 'diagnosis',
  title: 'Resource behaviour and systematic diagnosis',
  sections: [
    symptomsAndHypotheses,
    cpuAndLoad,
    memoryAndOom,
    storageIo,
    networkBottlenecks,
    correlatingEvidence,
    tracingSystemCalls,
    cgroupsAndNamespaces,
    experimentsAndTradeOffs,
  ],
}
