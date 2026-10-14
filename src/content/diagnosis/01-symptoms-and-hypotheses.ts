import type { Section } from '../types'

export const symptomsAndHypotheses: Section = {
  id: 'symptoms-and-hypotheses',
  title: 'Symptoms, timelines, baselines and hypotheses',
  scene: 'diagnosis-method',
  focus: 'table',
  slide: `## Symptoms, timelines, baselines and hypotheses

Diagnosis starts from what **users** experience, not from whichever graph looks alarming. Write the symptom down **precisely**.

### Four questions first
- **Symptom** — what exactly is wrong, measured? *p95 8 s, some 503s*
- **Timeline** — when did it start, and when is it worst?
- **Baseline** — what does normal look like, under the same load?
- **Hypotheses** — several, each one **testable**

### Keep competing explanations alive
- Each hypothesis **predicts** something you can check
- Choose the check that **separates** them
- Drop a hypothesis only when evidence **contradicts** it

### The rest of this chapter
- One layer per section, on this one incident`,
  narration:
    "Chapter nine is about finding out why a system misbehaves, and it follows one incident from start to finish. Since Tuesday, the reports page has been slow. The method begins with four questions, and it's worth writing the answers down. The symptom, as users experience it and measured: the ninety-fifth percentile response time is eight seconds, it used to be zero point four, and some requests now fail with five oh three. The timeline: it started on Tuesday around two in the morning, and it's worst at nine, when people arrive. The baseline: last week, under the same load, the same page took zero point four seconds. Without a baseline, you can't tell whether a number is unusual. Then, hypotheses, deliberately more than one. The table lists four candidate explanations. The CPU could be saturated. The machine could be short of memory. The disk could be slow. Or Tuesday's change could be the cause. The useful thing about writing them down this way is the middle column: each hypothesis predicts specific evidence, and the last column says how to look for it. A good next step is the check that separates hypotheses, rather than one that would fit all of them. And resist the urge to settle on the first explanation that seems plausible. Keep the others alive until evidence actually contradicts them. The next five sections take one resource at a time, on this same incident, starting with the CPU.",
}
