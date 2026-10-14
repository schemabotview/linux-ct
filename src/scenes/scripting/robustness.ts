import type { Scene } from '@graphlearning/flow'

// §7 — making reruns safe: log what happened (to stderr and, via logger, the journal), mark each
// input done only after its output is published, and retry transient failures a bounded number of
// times with backoff. `logger -t` tags journal entries; it is in bsdutils (essential on Debian).
export const scriptingRobustness: Scene = {
  id: 'scripting-robustness',
  title: 'Logging, idempotency, retries',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'make-report — safe to run again',
      label: `log() { printf '%s %s\\n' "$(date -Is)" "$*" >&2
        logger -t make-report -- "$*"; }

for file in "$input_dir"/*.csv; do
  done_mark="$state_dir/\${file##*/}.done"
  [[ -e $done_mark ]] && continue    # done: skip
  ok=0
  for attempt in 1 2 3; do           # bounded
    process "$file" && { ok=1; break; }
    log "attempt $attempt failed: $file"
    sleep $(( attempt * 5 ))         # back off
  done
  (( ok )) || { log "giving up: $file"; continue; }
  touch -- "$done_mark"              # only after success
done`,
    },
    {
      id: 'props',
      label: 'Three properties',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'log', label: 'Logged', sub: 'when, what, which input', pattern: 'storage', icon: 'scroll' },
        { id: 'idem', label: 'Idempotent', sub: 'run twice = run once', pattern: 'service', icon: 'repeat' },
        { id: 'partial', label: 'Resumable', sub: 'a crash redoes only the rest', pattern: 'user', icon: 'history' },
      ],
    },
    {
      id: 'evidence',
      kind: 'code',
      filename: 'bash — the morning after, illustrative output',
      label: `$ journalctl -t make-report -o cat --since today
attempt 1 failed: incoming/store-12.csv
attempt 2 failed: incoming/store-12.csv
attempt 3 failed: incoming/store-12.csv
giving up: incoming/store-12.csv
$ ls state/                  # a rerun only redoes store-12
store-07.csv.done  store-09.csv.done`,
    },
  ],
  edges: [
    { source: 'code', target: 'evidence', label: 'the 02:00 run' },
    { source: 'props', target: 'evidence' },
  ],
}
