import type { Section } from '../types'

export const storageIo: Section = {
  id: 'storage-io',
  title: 'Storage I/O: throughput, latency, queues',
  scene: 'diagnosis-io',
  focus: 'lat',
  slide: `## Storage I/O: throughput, latency, queues

A disk can be **busy** without being **slow**, and slow without moving much data. Read four quantities separately.

### From \`iostat -x\` *(sysstat)*
- **Throughput** — kB/s read and written
- **Latency** — \`r_await\`, \`w_await\`: milliseconds per request
- **Queue** — \`aqu-sz\`: requests waiting on average
- **%util** — time with at least one request in flight

### What users feel is latency
- Here **writes** wait 39 ms while reads take 0.4 ms
- A deep queue means something writes **in bulk**

### %util misleads on SSDs
- NVMe serves many requests **in parallel**
- 100 % busy is not proof of saturation — **await** is the better signal`,
  narration:
    "The third suspect is storage, and here the trap is the word busy. A disk can be busy without being slow, and it can be slow while moving very little data. iostat dash x, from the sysstat package, separates four quantities, and the scene labels each. Throughput is how much data moves, in kilobytes per second. Latency is how long each request takes, in milliseconds: r await for reads and w await for writes. The queue, a q u dash s z, is the average number of requests waiting. And percent util is the share of time the device had at least one request in progress. Now read this device. Reads take zero point four milliseconds, which is fine. Writes take thirty-nine milliseconds, nearly a hundred times longer, with an average of thirty-five requests queued. Something is writing in bulk, and every write queues behind it. What users feel is latency, and reportd's requests are stuck behind that queue, which is also why host B's tasks were in state D. Notice the last column: ninety-nine point eight percent utilisation. On an old single spinning disk, that would mean saturated. An NVMe drive handles many requests in parallel, so one hundred percent util only says there was always something in flight, not that it couldn't take more. On solid-state storage, await and the queue are the better evidence. So the disk hypothesis is gaining support. But what is doing all the writing? Hold that question. Next: the network's view of the same incident.",
}
