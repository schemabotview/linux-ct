# Linux — From a First Session to Reliable System Operations

## Audience and prerequisites

For learners new to Linux with basic computer and file familiarity. No programming, networking, or administration background is required. Introduce these ideas where they first become necessary.

Scope: command-line use, files, shell composition, identities and processes, scripting, software and services, networking, storage, diagnosis, security, and recovery. This is a general course independent of certifications. Use commands, annotated output, scripts, configuration, diagrams, and incident walkthroughs. Following examples is optional; no submitted exercises or learner monitoring are required.

Reference environment: **Debian 13 “trixie”, GNU userland, Bash, and systemd**, researched on **2026-10-12**. Detailed lessons should record installed package/kernel versions and verify local manuals. Distribution-packaged manuals anchor targeted semantics; latest upstream kernel documentation is conceptual evidence rather than a promise of local feature availability. Label Bash-specific syntax, GNU options, systemd behaviour, and distribution-specific administration separately from portable concepts. macOS is not Linux; containers, virtual machines, and WSL differ in kernel, boot, and service boundaries. A prepared Linux environment is sufficient; installation and privileged changes are optional demonstrations.

Target: construct and explain routine command workflows, trace files/processes/services/request paths, interpret diagnostic evidence, and justify operational changes and recovery choices. Completion does not establish assessed production competence.

Structure: **10 chapters, 82 sections**, distributed **6, 8, 9, 8, 8, 9, 9, 8, 9, and 8**. Counts follow conceptual weight; sections need not take equal teaching time.

## Learning spine

Enter a running system → navigate files → compose commands and inspect data → understand identity and processes → automate repeatable work → manage software and services → connect networks → understand persistent storage → diagnose resource limits → secure and recover the whole system.

Recurring example: a small file-processing service reads incoming records, produces reports, and exposes results through a web endpoint. Begin with an interactive command; gradually introduce a script, service identity, managed process, configuration, logs, network clients, persistent storage, and an operational runbook. Application implementation is supplied as needed so it does not become a programming prerequisite.

Teaching method: objective → mental model → annotated command/configuration → expected output or evidence → contrasting failure → outcome → bridge. Introduce a few useful commands before explaining deeper mechanisms. Use isolated example directories and clearly label illustrative output, privileges, and mutations. Teach observation before changing state; recovery and rollback belong beside the changes they support.

## Chapter 1 — System Foundations and a First Session

Objective: Explain the main system layers and follow a command from the terminal to its result.

1. Kernel, user space, distributions, and the role of system software
2. Boot-to-session overview: how a running system becomes available
3. Terminals, shells, built-ins, external commands, and graphical applications
4. Login identity, home directory, current directory, and a first command sequence
5. Command syntax, arguments, options, help, and manual sections
6. Physical hosts, virtual machines, containers, and WSL boundaries

Worked illustrations: Annotate `id`, `pwd`, `uname -r`, and `cat /etc/os-release`; distinguish kernel identity from distribution identity. Trace terminal → Bash → utility → kernel → output. Compare `type cd` with `type ls`, and explain why changing directory affects the shell itself. Show how to read a command synopsis without memorising every option.

Outcome: Interpret a first session, identify the component responsible for a command's behaviour, and locate relevant help.

Bridge: Commands act on named objects; next we establish how files and paths organise those objects.

## Chapter 2 — Files, Paths, and the Filesystem Namespace

Objective: Explain how names resolve to filesystem objects and manipulate a small directory tree predictably.

1. Absolute and relative paths, working directories, and home-directory notation
2. Directory layout: configuration, executables, variable data, homes, and runtime state
3. File types, metadata, timestamps, and content inspection
4. Creating, copying, moving, and removing files and directories
5. Inodes, hard links, symbolic links, and object lifetime
6. Path resolution, directory traversal, and mounts in one namespace
7. Editors, pagers, encodings, and line-ending differences
8. Finding files and selecting appropriate inspection tools

Worked illustrations: Follow `mkdir`, `cp`, `mv`, `ls -l`, `stat`, `file`, `less`, and `find` over an isolated report directory. Draw two hard links to one inode and a symbolic link to a pathname. Contrast a missing target with denied directory traversal. Preview an unlinked file still held open by a process; explain why removing a name need not immediately reclaim storage. Use explicit disposable paths for removal examples.

Outcome: Trace a path, distinguish names from underlying objects, and explain the effects of routine file operations.

Bridge: Individual commands become more useful when their input and output can be connected.

## Chapter 3 — Shell Composition and Text Processing

Objective: Build understandable command pipelines and explain how the shell prepares their inputs.

1. Standard input, output, error, and redirection order
2. Pipelines, command status, pipeline status, and Bash pipefail
3. Quoting, word splitting, expansions, and filename patterns
4. Shell variables, exported environment, PATH, and command lookup
5. grep, regular expressions, literal matching, and locale effects
6. sort, cut, uniq, tr, and structured versus line-oriented data
7. sed and awk for bounded text transformations and summaries
8. Unusual filenames, option terminators, and NUL-delimited composition
9. Archives, compression, metadata, and extraction boundaries

Worked illustrations: Explain `grep 'ERROR' app.log | sort | uniq -c` with sample lines and output, including why `uniq` only groups adjacent matches. Compare `>out 2>&1` with `2>&1 >out` using descriptor diagrams. Show a quoted filename containing spaces, `find ... -print0` with a compatible consumer, and a literal pattern versus regex. Contrast a simple delimited text example with CSV containing quoted delimiters; introduce a proper parser when line tools stop fitting. Inspect an archive before extraction into a dedicated directory.

Outcome: Explain each stage of a pipeline, predict quoting/redirection effects, and recognise the limits of text-processing shortcuts.

Bridge: Command results also depend on who runs them and how their processes live.

## Chapter 4 — Users, Permissions, and Process Lifecycle

Objective: Connect identity and access rules to process creation, execution, and termination.

1. Users, groups, UID/GID, supplementary groups, and ownership
2. Permission modes and the distinct meanings of directory read/write/search
3. umask, ACLs, set-user-ID/set-group-ID, and the sticky bit
4. sudo, authentication, authorisation, and privilege boundaries
5. Parent/child processes, fork/exec concepts, and inherited environment
6. Jobs, sessions, foreground/background work, and signals
7. Exit status, waiting, zombies, and process reaping
8. File descriptors, /proc evidence, and process resource limits

Worked illustrations: Trace an access failure through every parent directory before changing file permissions. Compare a creation mode with umask and discuss default ACL effects. Draw shell → child → executed program with inherited descriptors. Annotate `ps`, `jobs`, `wait`, and a TERM-to-exit timeline. Explain that SIGKILL cannot be caught but does not guarantee instantaneous disappearance of a task blocked in the kernel. Treat root privileges in the context of capabilities, namespaces, and mandatory access controls.

Outcome: Explain permission decisions and process evidence, choose a proportionate signal, and distinguish an exited unreaped process from a running one.

Bridge: With command and process semantics established, repeatable work can become a reliable script.

## Chapter 5 — Shell Scripting and Reliable Automation

Objective: Explain small Bash programs whose inputs, failures, and effects remain visible.

1. Script files, shebangs, interpreters, positional arguments, and invocation
2. Conditions, tests, command status, and explicit branching
3. Loops, functions, scope, and reusable command sequences
4. Quoting, arrays, input reading, and argument preservation
5. Error propagation, traps, cleanup, and limits of set -e
6. Temporary files, concurrent runs, races, and publication of results
7. Logging, idempotency, retries, and partial completion
8. Scheduling handoff and choosing shell versus Python

Worked illustrations: Annotate a small report script from arguments through output and exit status. Use `"$@"` to preserve arguments and `IFS= read -r` for a stated line-input format. Walk through a missing input and an interrupted run with temporary-file cleanup. Explain the context-dependent behaviour of `set -e`, explicit status checks, and pipeline handling. Compare writing a partial destination directly with preparing a temporary result and renaming it on the same filesystem; atomic name replacement is distinct from crash durability. Avoid treating shell variables as storage for arbitrary binary data.

Outcome: Follow a script's control flow, identify failure and concurrency assumptions, and justify when a richer programming language is appropriate.

Bridge: A script run by a person differs from a service maintained by the operating system.

## Chapter 6 — Software, Boot, and Managed Services

Objective: Explain how trusted software becomes a configured, supervised service across system startup.

1. Packages, repositories, dependencies, signatures, and trust boundaries
2. Installing, updating, removing, and preserving configuration with apt/dpkg
3. Firmware, bootloader, kernel, initramfs, and root filesystem handoff
4. PID 1, systemd units, targets, and system versus user managers
5. Service configuration, drop-ins, dependencies, and ordering
6. Start, enable, reload, restart, and application readiness
7. Journal, application logs, retention, and log rotation
8. Timers, cron, scheduling semantics, and execution environment
9. Service users, restart policy, resource controls, and sandboxing

Worked illustrations: Read a package transaction and its proposed changes before showing mutation. Annotate a small service unit and use `systemctl cat`, `systemctl status`, and `journalctl -u` evidence to explain a failed start. Separate `After=` ordering from requirement dependencies, and `enable` from immediate start. Explain service-type readiness: process creation does not necessarily mean requests can succeed. Contrast an interactive PATH/current directory with a scheduled process; distinguish reloading a manager's unit definitions from asking an application to reload configuration. Revisit least privilege and storage paths in the service unit.

Outcome: Trace software and service lifecycle, interpret startup/log evidence, and justify a configuration or supervision change.

Bridge: A locally running service now needs a correctly understood client-to-service network path.

## Chapter 7 — Networking and Remote Access

Objective: Trace network communication through addressing, routing, resolution, listening sockets, and authentication.

1. Interfaces, IPv4/IPv6, prefixes, subnets, and local addresses
2. Routes, default gateways, next hops, and reachability
3. TCP/UDP, ports, listening sockets, and bind addresses
4. DNS, local name-service configuration, caching, and resolution paths
5. DHCP, network managers, and runtime versus persistent configuration
6. Layered diagnosis from interface to application response
7. SSH host identity, user authentication, keys, and agent boundaries
8. File transfer, remote commands, quoting, and connection reuse
9. Host firewalls, upstream controls, TLS, and exposure boundaries

Worked illustrations: Annotate `ip address`, `ip route`, `ss -lnt`, `getent hosts`, and a request trace. Compare a loopback-only listener with a remotely reachable bind address. Contrast resolution failure, connection refusal, timeout, and an HTTP error without assuming each symptom proves one cause. Explain why ping failure alone does not establish application unreachability. Walk through host-key verification separately from user login; never normalise bypassing verification. Compare local and remote shell parsing in an SSH command and illustrate a scoped file transfer.

Outcome: Locate evidence along a request path, distinguish transport from application failures, and explain remote-access trust decisions.

Bridge: Services also depend on persistent data; next we examine the storage layers beneath their paths.

## Chapter 8 — Devices, Filesystems, and Persistent Storage

Objective: Explain how persistent devices become mounted filesystems and how storage failures affect applications.

1. Device discovery, device files, udev, and stable identifiers
2. Block devices, partitions, and the storage-layer stack
3. Filesystems, mount points, mount options, and fstab
4. Capacity, inode exhaustion, quotas, and deleted-open files
5. LVM, RAID, redundancy, and failure-domain boundaries
6. Swap, page cache, buffered writes, and persistence
7. Snapshots, backups, consistency, and retention
8. Storage failure, filesystem repair boundaries, and restoration

Worked illustrations: Read a supplied `lsblk` tree, mount listing, and illustrative fstab entry; trace a service path to its backing filesystem. Compare `df -h`, `df -i`, and `du` evidence, including a deleted-open log and mounted-over directory. Diagram redundancy versus an independent recoverable backup. Trace application writes through buffering and explain that successful writes, flushes, and power-loss durability are different claims. Compare crash-consistent and application-consistent snapshots. Explain repair prerequisites using a disposable disk-image scenario rather than requiring changes to real disks.

Outcome: Map a path to storage layers, explain common space discrepancies, and reason about recoverability and consistency.

Bridge: Files, processes, networks, and storage now provide the component models needed for systematic performance diagnosis.

## Chapter 9 — Resource Behaviour and Systematic Diagnosis

Objective: Build and revise a diagnosis from measured symptoms rather than isolated command output.

1. User-visible symptoms, timelines, baselines, and competing hypotheses
2. CPU utilisation, load average, scheduling, and contention
3. Memory, cache, reclaim, swap pressure, and OOM events
4. Storage I/O, throughput, latency, queues, and saturation
5. Network throughput, retransmissions, socket queues, and bottlenecks
6. Correlating logs, metrics, process evidence, and recent changes
7. System-call tracing, file access, and observation overhead
8. cgroups, namespaces, container visibility, and resource boundaries
9. Performance trade-offs, experiments, and confirming improvement

Worked illustrations: Compare supplied `top`, `vmstat`, `iostat`, `ss`, and journal excerpts for CPU-bound work and storage waiting. Explain why load average is not CPU percentage and free memory alone does not describe memory pressure. Read a short `strace` excerpt with a missing file or denied access, noting permissions, sensitive data, and overhead. Contrast host-wide memory with a service's cgroup limit and its OOM evidence. Trace a latency hypothesis through an intervention and subsequent measurements; one correlated metric is insufficient to establish cause.

Outcome: Propose evidence-backed hypotheses, recognise misleading metrics, and justify a bounded diagnostic or tuning step.

Bridge: Diagnosis becomes sustainable operations when access, changes, recovery, and ownership are planned together.

## Chapter 10 — Security, Recovery, and Integrated Operations

Objective: Integrate least privilege, controlled change, diagnostic evidence, and recovery into a coherent service lifecycle.

1. Threats, ownership, least privilege, and attack-surface reduction
2. Patching, network exposure, SSH configuration, and access continuity
3. Capabilities, SELinux/AppArmor, and distribution-specific policy choices
4. Secrets, audit evidence, log protection, and retention
5. Backup strategy, restore validation, and recovery objectives
6. Boot, service, network, and storage recovery sequences
7. Controlled changes, rollback, runbooks, and incident communication
8. Integrated service lifecycle and further specialisation

Worked illustrations: Trace an update followed by a denied service start through journal, identity, path permissions, and policy evidence. Compare compromised-credential containment with restoration after data loss. Show a recovery timeline using supplied backup/restore evidence, including dependencies and validation of application data. Explain a firewall or SSH change with an existing-session/console recovery path. Finish with the recurring service's files, identity, unit, listener, storage, logs, limits, and recovery plan in one diagram; identify the next evidence required when a symptom crosses layers.

Outcome: Explain an operational design and recovery sequence, identify its assumptions, and justify choices using the system models developed throughout the course.

Bridge: Continue with supervised practice and deeper specialisation in distribution administration, networking, security, storage, kernel internals, or container platforms. Real operational competence requires experience beyond course completion.

## Sources and scope

Research checked on **2026-10-12**. Sources inform coverage and targeted conceptual checks; this is not an exhaustive audit of every tool or package.

- [Debian 13 “trixie” release information](https://www.debian.org/releases/trixie/) establishes the distribution baseline. [Debian Reference](https://www.debian.org/doc/manuals/debian-reference/) and chapters [1: tutorials](https://www.debian.org/doc/manuals/debian-reference/ch01.en.html), [2: packages](https://www.debian.org/doc/manuals/debian-reference/ch02.en.html), [5: networking](https://www.debian.org/doc/manuals/debian-reference/ch05.en.html), and [9: system tips](https://www.debian.org/doc/manuals/debian-reference/ch09.en.html) support operational coverage. Embedded historical examples require local-version checks.
- Debian-packaged [Bash manual](https://manpages.debian.org/trixie/bash/bash.1.en.html), [path resolution](https://manpages.debian.org/trixie/manpages/path_resolution.7.en.html), and [signals](https://manpages.debian.org/trixie/manpages/signal.7.en.html) support targeted shell, path, and process semantics.
- Packaged [systemd.service](https://manpages.debian.org/trixie/systemd/systemd.service.5.en.html) and [systemd.unit](https://manpages.debian.org/trixie/systemd/systemd.unit.5.en.html) support service types, dependencies, and ordering. [ss](https://manpages.debian.org/trixie/iproute2/ss.8.en.html) and [OpenSSH client](https://manpages.debian.org/trixie/openssh-client/ssh.1.en.html) support socket and remote-access examples.
- [Linux administrator-guide contents](https://www.kernel.org/doc/html/latest/admin-guide/index.html) and [cgroup v2 guide](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html) support system/resource coverage. Verify kernel version, configuration, privileges, and controller availability for detailed examples.
- Brian Ward, [How Linux Works, third edition](https://nostarch.com/howlinuxworks3/): publisher description and [detailed contents](https://nostarch.com/download/samples/HLW3rd_DTOC.pdf) inspected for whole-system coverage and progression; full text was not read. William Shotts, [The Linux Command Line](https://linuxcommand.org/tlcl.php): author's overview inspected for command-line teaching progression; book text was not accessed.

Direct upstream Bash/Coreutils, freedesktop systemd, and man7 fetches initially failed; successful Debian-packaged manuals supplied targeted alternatives. A separate mount manual fetch also failed; storage coverage uses Debian Reference and conceptual sources, with exact mount/repair options to be verified during lesson authoring. Commands and outputs above are teaching specifications, not an executed Linux lab; no Linux execution validation is claimed.

Boundaries: kernel/driver development, complete desktop administration, advanced routing/VPNs, clustered storage, exhaustive security policy, Kubernetes, and distribution certification objectives need separate courses. Introduce namespaces/cgroups to explain resource and visibility boundaries without implying containers are complete security isolation. Detailed lessons should provide actual small examples and labelled expected results, retain distribution/tool differences, and revisit dense topics in manageable explanations.
