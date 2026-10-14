# CLAUDE.md — linux-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*. The syllabus is `LINUX-COURSE-PLAN.md`;
> this file maps it onto the repo.

## What this repo is

A GraphL concept app: one concept, N courses, each course a list of sections. A **section** is
`(scene, slide, narration)` and is one segment of the course video. One section = one slide.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Course arc

One plan chapter = one course. Course id = folder under `src/content/`, `src/scenes/` and
`public/audio/`. Routes are `#/<courseId>-<sectionId>`; `#/` is the catalog.

| # | course id | plan chapter | plan sections |
| --- | --- | --- | --- |
| 1 | `foundations` | System Foundations and a First Session | 6 |
| 2 | `files` | Files, Paths, and the Filesystem Namespace | 8 |
| 3 | `shell` | Shell Composition and Text Processing | 9 |
| 4 | `identity` | Users, Permissions, and Process Lifecycle | 8 |
| 5 | `scripting` | Shell Scripting and Reliable Automation | 8 |
| 6 | `services` | Software, Boot, and Managed Services | 9 |
| 7 | `networking` | Networking and Remote Access | 9 |
| 8 | `storage` | Devices, Filesystems, and Persistent Storage | 8 |
| 9 | `diagnosis` | Resource Behaviour and Systematic Diagnosis | 9 |
| 10 | `operations` | Security, Recovery, and Integrated Operations | 8 |

Courses are registered in `src/content/index.ts`, `src/scenes/index.ts` and `scripts/titles.json`
only once authored — an empty registry is the honest state, not a placeholder course.

Section files are `src/content/<course>/NN-<section-id>.ts`. Scene ids are globally unique, so
prefix them with the course id when a bare name could collide (`files-inode-links`).

## Content conventions (from the plan)

- **Reference environment:** Debian 13 "trixie", GNU userland, Bash, systemd. Label what is
  Bash-specific, GNU-specific, systemd-specific or Debian-specific on the slide, not only in narration.
- **Output is illustrative unless captured.** A code card showing output says so in its `filename`
  (e.g. `illustrative output`) unless it was captured on a trixie system with versions recorded.
- **Observation before mutation.** Any card that changes state names the privilege it needs and sits
  beside its rollback; removal examples use explicit disposable paths under `~/lab/`.
- **Recurring example — fixed names, used everywhere:**

  | thing | name |
  | --- | --- |
  | project | `reportd` — reads incoming records, writes reports, serves them over HTTP |
  | lab directory (ch 1–5) | `~/lab/reportd/` with `incoming/`, `reports/`, `app.log` |
  | script (ch 5) | `make-report` |
  | service user / group (ch 4, 6) | `reportd` |
  | installed paths (ch 6+) | `/opt/reportd/`, `/etc/reportd/reportd.conf`, `/var/lib/reportd/`, `/var/log/reportd/` |
  | unit / timer (ch 6) | `reportd.service`, `reportd-report.timer` |
  | endpoint (ch 7) | `127.0.0.1:8080`, `GET /reports/latest` |

## Scene inventory

None yet. List each scene here as it is authored: `id` — course — what it shows — which sections use it.

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

These are read off the rendered route by eye — `check` models no density at all. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
