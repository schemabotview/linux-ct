# linux-ct

Video-first content for the **Linux** concept, consumed at runtime by the
[`graphl-movie`](../graphl-movie) app. Content only — notebooks, narration (`.tts` →
`.wav`), authored one-screen slides (`.slide`: a `# Title`, `## ` sub-labels, short prose,
fenced code, and `- `/numbered lists with **bold** key terms), and the wiring
`manifest.json`. Nothing to build or run here. For the authoring contract and folder
layout, see [`CLAUDE.md`](./CLAUDE.md).

This file is the **course outline** — the human-facing map of modules and sections. It is
the plan we author against; the machine source of truth for structure is `manifest.json`
(once authored).

**Status:** spine agreed — **10 modules × ~10 sections** (101 total, below). The `linux`
scene is **ported into graphl-movie** (`src/scenes/linux.ts`, registered + catalog entry).
**Modules 01–02 authored end-to-end** — every section has `.ipynb` + `.slide` + `.tts`, and
`manifest.json` wires them onto the `linux` scene (§1 = hook on the whole map; §2–10 with
per-section `focus`/`highlight`). Verified rendering in graphl-movie (slides trimmed to fit
the non-scrolling 1080p pane). `audio/` is empty by design — the **owner** generates the
`.wav`s from `tts/` via Colab, then the manifest `audio` fields resolve. **Pushed** to
`github.com/schemabotview/linux-ct` (public). Modules 03–10 pending (same pattern).

## The scene — one dense map, framed per section

Every Linux module rides a **single dense scene**, `linux` (app-owned, ported into
graphl-movie from `../graphl-ux/src/scenes/linux.ts`). It is the whole Linux system on one
16:9 map — five stacked privilege bands, top→bottom: **Userspace (ring 3) → C Library →
Syscall Boundary → Kernel (ring 0) → Hardware**, plus the container primitives and
filesystem-view columns. Geometry is the lesson: the stacked bands are the privilege
descent a syscall makes; side-by-side subsystems are parallel kernel facilities.

Each module frames one band/subsystem of that map via per-section `focus` (camera) +
`highlight` (spotlight in-place, the rest dims), so the learner keeps one mental model the
whole course. **§1 of each module is the hook — the full map** (no focus), the picture the
rest of the module zooms into.

## Module spine (from `../linux-content`)

The source curriculum is the **10-module Linux path** in `../linux-content` (the
graphl-ux-era repo, source of truth for the notebook split). The video set keeps all 10
modules, each normalized to **~10 tight teaching sections** (a section = one narrated slide
+ scene focus, ≈ one page). The source notebooks run 10–18 `## ` headings each; we
consolidate fine-grained reference beats and drop pure scaffolding to land near ~10.

| # | Module | Source notebook (`../linux-content`) | `## ` in source | Scene | Frames (`lx-*` anchors) |
|---|---|---|---|---|---|
| 01 | Getting Started with Linux | `01-getting-started-with-linux.ipynb` | 11 | `linux` | whole map (hook) → `lx-userspace` |
| 02 | The Shell & Its Mechanics | `02-the-shell-and-its-mechanics.ipynb` | 10 | `linux` | `lx-shell` (`lx-shells` · `lx-expansion` · `lx-streams`) |
| 03 | Files, Folders & Permissions | `03-files-folders-and-permissions.ipynb` | 13 | `linux` | `lx-vfs` · `lx-perms` · `lx-fhs` |
| 04 | Text Processing & Find | `04-text-processing-and-find.ipynb` | 12 | `linux` | `lx-streams` (pipes/redirection) · `lx-vfs` |
| 05 | Processes, Jobs & Signals | `05-processes-jobs-and-signals.ipynb` | 14 | `linux` | `lx-process` · `lx-sched` (`lx-sigterm`/`lx-nice`) |
| 06 | Users, Groups & Access Control | `06-users-groups-and-access-control.ipynb` | 13 | `linux` | `lx-users` · `lx-perms` (`lx-suid`/`lx-acl`) |
| 07 | Storage, Filesystems & Mounts | `07-storage-filesystems-and-mounts.ipynb` | 14 | `linux` | `lx-block` (`lx-fs`/`lx-lvm`/`lx-raid`) · `lx-vfs` (mount) |
| 08 | Networking & SSH | `08-networking-and-ssh.ipynb` | 14 | `linux` | `lx-net` (`lx-sockets`/`lx-tcp`/`lx-ssh`/`lx-netfilter`) |
| 09 | Services, Boot, systemd & Packages | `09-services-boot-systemd-and-packages.ipynb` | 12 | `linux` | `lx-services-col` (`lx-systemd`/`lx-boot`/`lx-pkg`) |
| 10 | Scripting, Troubleshooting & LFCS Prep | `10-scripting-troubleshooting-and-lfcs-prep.ipynb` | 18 | `linux` | `lx-shell` + `lx-trace` → whole-map synthesis |

The "Frames" column is the **intended** wiring (which subsystem of the one `linux` map each
module zooms into) — recorded here to guide section authoring; the authoritative per-section
`focus`/`highlight` lands in `manifest.json`.

## Sections

Each module is normalized to **~10 tight teaching sections** (module 10 → 11). **§1 is the
hook** — it rides the whole `linux` map (no camera `focus`); §2–N each `focus` one `lx-*`
box and `highlight` the relevant nodes. Merges/drops consolidate the fine-grained source
beats. The lists below are the agreed spine; `manifest.json` is the machine source of truth.

### 01 — Getting Started with Linux  ✅ authored (10)
Stays in the userspace / shell / filesystem-view region (beginner-appropriate — establishes
"you are here" on the map).

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | What Linux is — and the shape of the whole system | `01-01-what-linux-is` | **hook** — whole map |
| 2 | Getting a Linux to practise on | `01-02-getting-linux` | `lx-userspace` |
| 3 | Logging in — the shell prompt & your session | `01-03-logging-in` | `lx-shell` |
| 4 | Where am I? — `pwd`, `whoami`, first commands | `01-04-where-am-i` | `lx-shell` → `lx-shells` |
| 5 | Listing a directory — `ls` | `01-05-listing-ls` | `lx-fhs` → `lx-fhs-home` |
| 6 | Moving around — `cd`, `.`, `..`, `~` | `01-06-moving-around` | `lx-fhs` → `lx-fhs-home`,`lx-fhs-etc` |
| 7 | The anatomy of a command | `01-07-command-anatomy` | `lx-shell` → `lx-shells`,`lx-expansion` |
| 8 | A tour of the filesystem hierarchy | `01-08-filesystem-tour` | `lx-fhs` → all `lx-fhs-*` |
| 9 | Tab completion & history | `01-09-tab-and-history` | `lx-shell` → `lx-shells` |
| 10 | Getting help — `man`, `--help`, `apropos` | `01-10-getting-help` | `lx-shell` → `lx-shells` |

### 02 — The Shell & Its Mechanics  (10)
1. Hook — how the shell turns a line into a running program *(whole map)* · 2. Keyboard shortcuts → `lx-shells` · 3. Variables → `lx-expansion`/`lx-pvar` · 4. The environment (inherited) → `lx-process`/`lx-fork`,`lx-exec` · 5. `export` → `lx-expansion`/`lx-pvar` · 6. Quoting → `lx-expansion`/`lx-quote` · 7. Redirection `>` `<` here-docs *(merged)* → `lx-streams` · 8. Pipes → `lx-streams`/`lx-stdout`,`lx-stdin` · 9. Globs → `lx-expansion`/`lx-glob` · 10. Expansion order (8 phases) → `lx-expansion`

### 03 — Files, Folders & Permissions  (10)
1. Hook — files, inodes & the permission model *(whole map)* · 2. Create & view *(touch/mkdir + cat/less)* → `lx-vfs` · 3. Copy/move/rename *(cp+mv)* → `lx-vfs`/`lx-file` · 4. Deleting — `rm`, `rm -r` → `lx-vfs` · 5. Links — hard vs symbolic → `lx-vfs`/`lx-hardlink`,`lx-symlink`,`lx-inode` · 6. The seven file types → `lx-vfs`/`lx-file` · 7. Permissions model → `lx-perms`/`lx-rwx` · 8. Reading `ls -l` → `lx-perms`/`lx-rwx` · 9. `chmod` → `lx-perms`/`lx-rwx` · 10. Ownership & defaults *(chown/chgrp+umask)* → `lx-perms`

### 04 — Text Processing & Find  (10)
1. Hook — text as streams through pipes *(whole map)* · 2. Unix philosophy → `lx-streams` · 3. `grep` → `lx-streams` · 4. Regular expressions → `lx-streams` · 5. `sed` → `lx-streams` · 6. `awk` → `lx-streams` · 7. Supporting cast *(cut/sort/uniq+tr/wc+top-N)* → `lx-streams` · 8. `find` → `lx-vfs` · 9. `find -exec` → `lx-vfs`/`lx-file` · 10. Archives — `tar` + tar-pipe → `lx-streams`

### 05 — Processes, Jobs & Signals  (10)
1. Hook — a process from fork to exit *(whole map)* · 2. What a process is → `lx-process`/`lx-fork`,`lx-exec`,`lx-wait`,`lx-exit` · 3. Viewing *(ps/top/htop)* → `lx-sched`/`lx-pid-table` · 4. Process states R/S/D/T/Z → `lx-sched`/`lx-runqueue` · 5. Jobs — fg/bg → `lx-process` · 6. Surviving session loss *(nohup/tmux)* → `lx-process` · 7. Signals → `lx-sched`/`lx-sigterm` · 8. Sending signals *(kill/killall/pkill)* → `lx-sched`/`lx-sigterm` · 9. Priority — `nice`/`renice` → `lx-sched`/`lx-nice` · 10. Scheduled tasks *(cron/at/timers)* → `lx-systemd`

### 06 — Users, Groups & Access Control  (10)
1. Hook — identity, credentials & access *(whole map)* · 2. User model — uid/gid → `lx-users`/`lx-uid`,`lx-gid` · 3. Account databases *(passwd/shadow/group)* → `lx-users`/`lx-passwd` · 4. Managing users *(useradd/usermod+chage)* → `lx-users`/`lx-passwd` · 5. Managing groups → `lx-users`/`lx-gid` · 6. `su` vs `sudo` → `lx-users`/`lx-sudo` · 7. `sudo` deep dive → `lx-users`/`lx-sudo` · 8. SUID/SGID/sticky → `lx-perms`/`lx-suid`,`lx-sgid` · 9. ACLs → `lx-perms`/`lx-acl` · 10. Login mechanics *(PAM + startup files)* → `lx-users`

### 07 — Storage, Filesystems & Mounts  (10)
1. Hook — the storage stack top-to-bottom *(whole map)* · 2. Block devices & naming *(+lsblk)* → `lx-block`/`lx-blk` · 3. Partitions — MBR vs GPT → `lx-block`/`lx-blk` · 4. Filesystems → `lx-block`/`lx-fs` · 5. Mounting → `lx-vfs`/`lx-mount` · 6. Persistent mounts *(fstab+UUID)* → `lx-vfs`/`lx-mount` · 7. Disk space — `df`/`du` → `lx-block`/`lx-fs` · 8. Swap → `lx-mem`/`lx-swap` · 9. LVM *(+ops)* → `lx-block`/`lx-lvm` · 10. RAID *(+quotas)* → `lx-block`/`lx-raid`

### 08 — Networking & SSH  (10)
1. Hook — the network stack & the socket *(whole map)* · 2. TCP/IP refresher → `lx-net`/`lx-tcp` · 3. Interfaces & getting an IP *(static/DHCP+nmcli)* → `lx-net`/`lx-sockets` · 4. Routing → `lx-net`/`lx-tcp` · 5. DNS → `lx-net`/`lx-tcp` · 6. SSH → `lx-net`/`lx-ssh` · 7. SSH keys → `lx-net`/`lx-ssh` · 8. SSH config & agent → `lx-net`/`lx-ssh` · 9. `sshd` & file transfer *(scp/rsync)* → `lx-net`/`lx-ssh` · 10. Firewalls & troubleshooting → `lx-net`/`lx-netfilter`

### 09 — Services, Boot, systemd & Packages  (10)
1. Hook — how Linux starts & stays running *(whole map)* · 2. What systemd is (PID 1) → `lx-systemd`/`lx-units` · 3. Unit types → `lx-systemd`/`lx-units` · 4. `systemctl` + status → `lx-systemd`/`lx-units` · 5. Writing a service unit + drop-ins → `lx-systemd`/`lx-units` · 6. Targets → `lx-systemd`/`lx-targets` · 7. Logs *(journald + /var/log)* → `lx-systemd`/`lx-journald` · 8. The boot chain *(GRUB → initramfs → systemd)* → `lx-boot`/`lx-grub`,`lx-initramfs` · 9. Package management *(apt/dnf)* → `lx-pkg`/`lx-apt`,`lx-dnf` · 10. Repositories → `lx-pkg`/`lx-apt`

### 10 — Scripting, Troubleshooting & LFCS Prep  (11)
1. Hook — from one-liners to production scripts & troubleshooting *(whole map)* · 2. Scripting essentials → `lx-shell`/`lx-shells` · 3. Conditionals & loops → `lx-shell` · 4. Functions, exit codes, `set -euo pipefail` → `lx-shell`/`lx-streams` · 5. Troubleshooting methodology → `lx-trace` · 6. Playbook — disk full → `lx-block`/`lx-fs` · 7. Playbook — OOM → `lx-mem`/`lx-oom` · 8. Playbook — runaway CPU → `lx-sched`/`lx-runqueue`,`lx-nice` · 9. Playbook — network down → `lx-net`/`lx-netfilter` · 10. Playbook — service won't start → `lx-systemd`/`lx-units` · 11. Security & perf + LFCS prep *(SELinux/AppArmor + vmstat/iostat + exam)* → `lx-trace`/`lx-strace`,`lx-perf`,`lx-ebpf`

**Total:** 101 sections (10 × 10 + one 11). Every `focus`/`highlight` targets a node that
exists in the ported `linux` scene.
