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
**Modules 01–07 authored end-to-end** — every section has `.ipynb` + `.slide` + `.tts`, and
`manifest.json` wires them onto the `linux` scene (§1 = hook on the whole map; §2–10 with
per-section `focus`/`highlight`). Verified rendering in graphl-movie (slides trimmed to fit
the non-scrolling 1080p pane). `audio/` is empty by design — the **owner** generates the
`.wav`s from `tts/` via Colab, then the manifest `audio` fields resolve. **Pushed** to
`github.com/schemabotview/linux-ct` (public). Modules 08–10 pending (same pattern).

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

### 02 — The Shell & Its Mechanics  ✅ authored (10)
Frames the `lx-shell` band — how a typed line becomes a running program: shortcuts,
variables/environment, quoting, redirection, pipes, globs, and the expansion order.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | How the shell turns a line into a running program | `02-01-shell-pipeline` | **hook** — whole map |
| 2 | Keyboard shortcuts | `02-02-keyboard-shortcuts` | `lx-shell` → `lx-shells` |
| 3 | Variables | `02-03-variables` | `lx-expansion` → `lx-pvar` |
| 4 | The environment (inherited) | `02-04-the-environment` | `lx-process` → `lx-fork`,`lx-exec` |
| 5 | `export` | `02-05-export` | `lx-expansion` → `lx-pvar` |
| 6 | Quoting | `02-06-quoting` | `lx-expansion` → `lx-quote` |
| 7 | Redirection — `>` `<` & here-docs *(merged)* | `02-07-redirection` | `lx-streams` |
| 8 | Pipes | `02-08-pipes` | `lx-streams` → `lx-stdout`,`lx-stdin` |
| 9 | Globs | `02-09-globs` | `lx-expansion` → `lx-glob` |
| 10 | Expansion order (8 phases) | `02-10-expansion-order` | `lx-expansion` |

### 03 — Files, Folders & Permissions  ✅ authored (10)
Frames the `lx-vfs` and `lx-perms` bands — files, inodes, links, the seven file types,
and the read/write/execute permission model.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Files, inodes & the permission model | `03-01-files-and-inodes` | **hook** — whole map |
| 2 | Create & view *(touch/mkdir + cat/less)* | `03-02-create-and-view` | `lx-vfs` |
| 3 | Copy, move & rename *(cp + mv)* | `03-03-copy-move-rename` | `lx-vfs` → `lx-file` |
| 4 | Deleting — `rm`, `rm -r` | `03-04-deleting` | `lx-vfs` |
| 5 | Links — hard vs symbolic | `03-05-links` | `lx-vfs` → `lx-hardlink`,`lx-symlink`,`lx-inode` |
| 6 | The seven file types | `03-06-file-types` | `lx-vfs` → `lx-file` |
| 7 | The permissions model | `03-07-permissions-model` | `lx-perms` → `lx-rwx` |
| 8 | Reading `ls -l` | `03-08-reading-ls-l` | `lx-perms` → `lx-rwx` |
| 9 | `chmod` | `03-09-chmod` | `lx-perms` → `lx-rwx` |
| 10 | Ownership & defaults *(chown/chgrp + umask)* | `03-10-ownership-defaults` | `lx-perms` |

### 04 — Text Processing & Find  ✅ authored (10)
Frames the `lx-streams` band (text through pipes) with `lx-vfs` for `find`.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Text as streams through pipes | `04-01-text-as-streams` | **hook** — whole map |
| 2 | The Unix philosophy | `04-02-unix-philosophy` | `lx-streams` |
| 3 | `grep` | `04-03-grep` | `lx-streams` |
| 4 | Regular expressions | `04-04-regex` | `lx-streams` |
| 5 | `sed` | `04-05-sed` | `lx-streams` |
| 6 | `awk` | `04-06-awk` | `lx-streams` |
| 7 | Supporting cast *(cut/sort/uniq + tr/wc + top-N)* | `04-07-supporting-cast` | `lx-streams` |
| 8 | `find` | `04-08-find` | `lx-vfs` |
| 9 | `find -exec` | `04-09-find-exec` | `lx-vfs` → `lx-file` |
| 10 | Archives — `tar` + the tar-pipe | `04-10-archives-tar` | `lx-streams` |

### 05 — Processes, Jobs & Signals  ✅ authored (10)
Frames the `lx-process` and `lx-sched` bands — a process from fork to exit, states,
jobs, signals, and priority.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | A process from fork to exit | `05-01-fork-to-exit` | **hook** — whole map |
| 2 | What a process is | `05-02-what-a-process-is` | `lx-process` → `lx-fork`,`lx-exec`,`lx-wait`,`lx-exit` |
| 3 | Viewing processes *(ps/top/htop)* | `05-03-viewing-processes` | `lx-sched` → `lx-pid-table` |
| 4 | Process states — R/S/D/T/Z | `05-04-process-states` | `lx-sched` → `lx-runqueue` |
| 5 | Jobs — fg/bg | `05-05-jobs` | `lx-process` |
| 6 | Surviving session loss *(nohup/tmux)* | `05-06-surviving-session-loss` | `lx-process` |
| 7 | Signals | `05-07-signals` | `lx-sched` → `lx-sigterm` |
| 8 | Sending signals *(kill/killall/pkill)* | `05-08-sending-signals` | `lx-sched` → `lx-sigterm` |
| 9 | Priority — `nice`/`renice` | `05-09-priority-nice` | `lx-sched` → `lx-nice` |
| 10 | Scheduled tasks *(cron/at/timers)* | `05-10-scheduled-tasks` | `lx-systemd` |

### 06 — Users, Groups & Access Control  ✅ authored (10)
Frames the `lx-users` band with `lx-perms` for the SUID/SGID/ACL beats.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | Identity, credentials & access | `06-01-identity-and-access` | **hook** — whole map |
| 2 | The user model — uid/gid | `06-02-user-model` | `lx-users` → `lx-uid`,`lx-gid` |
| 3 | Account databases *(passwd/shadow/group)* | `06-03-account-databases` | `lx-users` → `lx-passwd` |
| 4 | Managing users *(useradd/usermod + chage)* | `06-04-managing-users` | `lx-users` → `lx-passwd` |
| 5 | Managing groups | `06-05-managing-groups` | `lx-users` → `lx-gid` |
| 6 | `su` vs `sudo` | `06-06-su-vs-sudo` | `lx-users` → `lx-sudo` |
| 7 | `sudo` deep dive | `06-07-sudo-deep-dive` | `lx-users` → `lx-sudo` |
| 8 | SUID / SGID / sticky | `06-08-suid-sgid-sticky` | `lx-perms` → `lx-suid`,`lx-sgid` |
| 9 | ACLs | `06-09-acls` | `lx-perms` → `lx-acl` |
| 10 | Login mechanics *(PAM + startup files)* | `06-10-login-mechanics` | `lx-users` |

### 07 — Storage, Filesystems & Mounts  ✅ authored (10)
Frames the `lx-block` band (the storage stack) with `lx-vfs` for mounts and `lx-mem` for swap.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | The storage stack, top to bottom | `07-01-storage-stack` | **hook** — whole map |
| 2 | Block devices & naming *(+ lsblk)* | `07-02-block-devices` | `lx-block` → `lx-blk` |
| 3 | Partitions — MBR vs GPT | `07-03-partitions` | `lx-block` → `lx-blk` |
| 4 | Filesystems | `07-04-filesystems` | `lx-block` → `lx-fs` |
| 5 | Mounting | `07-05-mounting` | `lx-vfs` → `lx-mount` |
| 6 | Persistent mounts *(fstab + UUID)* | `07-06-persistent-mounts` | `lx-vfs` → `lx-mount` |
| 7 | Disk space — `df`/`du` | `07-07-disk-space` | `lx-block` → `lx-fs` |
| 8 | Swap | `07-08-swap` | `lx-mem` → `lx-swap` |
| 9 | LVM *(+ ops)* | `07-09-lvm` | `lx-block` → `lx-lvm` |
| 10 | RAID *(+ quotas)* | `07-10-raid` | `lx-block` → `lx-raid` |

### 08 — Networking & SSH  (10)
Frames the `lx-net` band — the network stack, the socket, SSH, and the firewall.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | The network stack & the socket | `08-01-network-stack` | **hook** — whole map |
| 2 | TCP/IP refresher | `08-02-tcp-ip-refresher` | `lx-net` → `lx-tcp` |
| 3 | Interfaces & getting an IP *(static/DHCP + nmcli)* | `08-03-interfaces-and-ip` | `lx-net` → `lx-sockets` |
| 4 | Routing | `08-04-routing` | `lx-net` → `lx-tcp` |
| 5 | DNS | `08-05-dns` | `lx-net` → `lx-tcp` |
| 6 | SSH | `08-06-ssh` | `lx-net` → `lx-ssh` |
| 7 | SSH keys | `08-07-ssh-keys` | `lx-net` → `lx-ssh` |
| 8 | SSH config & agent | `08-08-ssh-config-agent` | `lx-net` → `lx-ssh` |
| 9 | `sshd` & file transfer *(scp/rsync)* | `08-09-sshd-file-transfer` | `lx-net` → `lx-ssh` |
| 10 | Firewalls & troubleshooting | `08-10-firewalls` | `lx-net` → `lx-netfilter` |

### 09 — Services, Boot, systemd & Packages  (10)
Frames the `lx-systemd` column with `lx-boot` (boot chain) and `lx-pkg` (packages).

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | How Linux starts & stays running | `09-01-boot-and-services` | **hook** — whole map |
| 2 | What systemd is (PID 1) | `09-02-what-systemd-is` | `lx-systemd` → `lx-units` |
| 3 | Unit types | `09-03-unit-types` | `lx-systemd` → `lx-units` |
| 4 | `systemctl` + status | `09-04-systemctl` | `lx-systemd` → `lx-units` |
| 5 | Writing a service unit + drop-ins | `09-05-writing-a-service` | `lx-systemd` → `lx-units` |
| 6 | Targets | `09-06-targets` | `lx-systemd` → `lx-targets` |
| 7 | Logs *(journald + /var/log)* | `09-07-logs` | `lx-systemd` → `lx-journald` |
| 8 | The boot chain *(GRUB → initramfs → systemd)* | `09-08-boot-chain` | `lx-boot` → `lx-grub`,`lx-initramfs` |
| 9 | Package management *(apt/dnf)* | `09-09-package-management` | `lx-pkg` → `lx-apt`,`lx-dnf` |
| 10 | Repositories | `09-10-repositories` | `lx-pkg` → `lx-apt` |

### 10 — Scripting, Troubleshooting & LFCS Prep  (11)
Frames `lx-shell` + `lx-trace`, then tours the whole map as troubleshooting playbooks.

| # | Section | slug | focus → highlight |
|---|---|---|---|
| 1 | From one-liners to production scripts & troubleshooting | `10-01-scripts-and-troubleshooting` | **hook** — whole map |
| 2 | Scripting essentials | `10-02-scripting-essentials` | `lx-shell` → `lx-shells` |
| 3 | Conditionals & loops | `10-03-conditionals-and-loops` | `lx-shell` |
| 4 | Functions, exit codes, `set -euo pipefail` | `10-04-functions-and-safety` | `lx-shell` → `lx-streams` |
| 5 | Troubleshooting methodology | `10-05-troubleshooting-method` | `lx-trace` |
| 6 | Playbook — disk full | `10-06-playbook-disk-full` | `lx-block` → `lx-fs` |
| 7 | Playbook — OOM | `10-07-playbook-oom` | `lx-mem` → `lx-oom` |
| 8 | Playbook — runaway CPU | `10-08-playbook-cpu` | `lx-sched` → `lx-runqueue`,`lx-nice` |
| 9 | Playbook — network down | `10-09-playbook-network` | `lx-net` → `lx-netfilter` |
| 10 | Playbook — service won't start | `10-10-playbook-service` | `lx-systemd` → `lx-units` |
| 11 | Security & perf + LFCS prep *(SELinux/AppArmor + vmstat/iostat + exam)* | `10-11-security-perf-lfcs` | `lx-trace` → `lx-strace`,`lx-perf`,`lx-ebpf` |

**Total:** 101 sections (10 × 10 + one 11). Every `focus`/`highlight` targets a node that
exists in the ported `linux` scene.
