# linux-ct

**Linux — From a First Session to Reliable System Operations.** A GraphL concept app: ten courses,
one per chapter of [`LINUX-COURSE-PLAN.md`](LINUX-COURSE-PLAN.md), each a list of sections. Served at
`graphl.in/linux-ct/`.

Scaffolded from [`schemabotview/content-repo-template`](https://github.com/schemabotview/content-repo-template).

```sh
npm install
npm run dev          # http://localhost:5173
```

## The content model

- **concept ⊃ course ⊃ section.** A **section** is `(scene, slide, narration)` — one slide, one
  segment of the course video.
- **Left = scene, right = slide.** The scene is a react-flow diagram *or* a code card, rendered by
  `@graphlearning/flow`. The slide is markdown. Scenes are declarative: **never write x or y**.
- Narration wavs come from a Colab + Chatterbox pass (`scripts/colab_generate_audio.ipynb`), never
  by hand, into `public/audio/<course>/<section-id>.wav`.

```
LINUX-COURSE-PLAN.md   the syllabus — 10 chapters, 82 plan sections
src/content/           courses → sections (one file per section) + registry
src/scenes/            scenes, one folder per course + registry
src/main.tsx           mounts <ConceptApp> from @graphlearning/shell
src/theme.css          --brand / --brand-hover / --accent-2 (Linux gold, shared with schemabotview/linux)
scripts/               check-content.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/ narration wavs
```

Course ids, file conventions and the recurring-example names are in [`CLAUDE.md`](CLAUDE.md).

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
```

…and **the section looked at in the browser** — the three commands pass on frames that are visually
wrong. Routes are `#/<course>-<section>`; `#/` is the catalog.

Before the first deploy: Settings → Pages → Source = **GitHub Actions**, then list the site in
`ui-graphl`'s `catalog.json`.
