
# Hemta — Frontend Product Context & Functional Understanding

## 1. What is Hemta?

Hemta is a **native macOS download manager** designed to provide a faster, more reliable, and more privacy-focused alternative to downloading files directly through a web browser.

The core idea is simple:

> **Hemta takes control of downloads and makes them faster, resumable, reliable, and easier to manage.**

It is intended to feel like a proper macOS application rather than a web-based download tool or a port of an existing Windows application.

Hemta focuses primarily on **HTTP/HTTPS downloads on macOS**.

---

# 2. The Problem Hemta Solves

Browser downloads work well for small and simple downloads, but they become frustrating when downloading large files or dealing with unreliable connections.

A download can be interrupted because of:

- Internet disconnection
- Network changes
- Mac going to sleep
- Application crashes
- System restarts
- Temporary server failures
- Browser crashes or being closed
- Download servers becoming temporarily unavailable

With a conventional browser download, users may lose progress or have limited control over how the download is handled.

Hemta is designed to solve this by treating downloading as a **managed process** rather than simply transferring a file from a URL to disk.

The desired experience is:

> A download should continue whenever possible instead of forcing the user to start over.

---

# 3. Core Product Promise

There are four major ideas behind Hemta:

### Speed

Hemta can divide supported downloads into multiple segments and download those segments concurrently.

Instead of:

`Server → One connection → File`

Hemta can use:

`Server → Multiple connections → Multiple file segments → Complete file`

This can improve download performance when the server and network support concurrent ranged requests.

---

### Reliability

Downloads should survive normal interruptions.

Hemta is designed to support:

- Pause/resume
- Automatic retries
- Failed connection recovery
- Network changes
- Sleep/wake cycles
- Application crashes
- System restarts
- Partial-download recovery

The important concept for the frontend is that a download has a **persistent lifecycle**.

It isn't simply:

`Downloading → Done`

It can move through states such as:

`Queued → Downloading → Paused → Resuming → Retrying → Completed`

or:

`Downloading → Interrupted → Recovering → Downloading`

The UI therefore needs to communicate meaningful download states rather than treating everything as a simple progress bar.

---

# 4. Download Acceleration

One of Hemta's important technical capabilities is segmented downloading.

For compatible servers, Hemta can split a file into multiple ranges and download those ranges concurrently.

For example:

```text
Large File
│
├── Segment 1 ────────┐
├── Segment 2 ────────┤
├── Segment 3 ────────┤ → Combined File
├── Segment 4 ────────┤
└── Segment 5 ────────┘
```

The download engine manages these connections and reconstructs the final file.

However, not every server supports ranged/concurrent downloading.

When necessary, Hemta should gracefully fall back to a sequential download rather than failing simply because acceleration is unavailable.

This distinction may be useful to expose in the UI where appropriate, but the frontend should not assume every download is segmented.

---

# 5. Browser Integration

Hemta is designed to work alongside the user's existing browsers.

The goal is that users should not have to manually copy a download URL and paste it into Hemta every time.

Hemta is intended to integrate with browsers including:

- Safari
- Chrome
- Edge
- Brave
- Arc
- Vivaldi
- Opera

The basic flow is:

```text
User finds a file online
        ↓
User clicks download
        ↓
Browser integration detects the download
        ↓
Hemta receives the download
        ↓
Hemta manages the download
        ↓
File is saved locally
```

Safari uses a dedicated browser extension approach, while Chromium-based browsers communicate through native messaging.

From a product perspective, the important thing is:

> **Hemta should feel like the download engine behind the browser rather than another application the user has to manually operate.**

---

# 6. Hemta Runs in the Background

Hemta is architecturally separated into a user-facing application and a background agent.

Conceptually:

```text
                 Hemta UI
                    │
                    │
                    ▼
              Hemta Agent
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
    Downloads    Database     Scheduler
        │
        ▼
      Disk
```

The user-facing application is responsible primarily for presenting and controlling the product.

The background agent handles the actual download operations and related background work.

This is important because **downloads should not depend on the main window remaining open**.

A user should be able to:

1. Start a download.
2. Close the Hemta window.
3. Continue using their Mac.
4. Have Hemta continue managing the download in the background.
5. Open Hemta later and see the current state.

Therefore, the frontend should be understood as a **control and monitoring interface for a persistent background download system**.

---

# 7. Main Concepts the Frontend Needs to Represent

The frontend will primarily revolve around several core concepts.

## Downloads

A download represents a file being transferred or managed by Hemta.

A download may contain information such as:

- File name
- File size
- Downloaded amount
- Progress
- Download speed
- Remaining time
- Source URL
- Destination
- Current state
- Error/retry information
- Completion information
- Pause/resume capability

Downloads can exist independently of whether the main application window is currently open.

---

## Queue

The queue represents downloads waiting to be processed.

Users may have multiple downloads and Hemta needs to manage their execution according to its scheduling and concurrency rules.

The frontend should therefore allow the user to understand:

- What is currently downloading
- What is waiting
- What has been paused
- What failed
- What has completed

---

## History

Completed and previously managed downloads should remain discoverable.

The user should be able to find previously downloaded files and understand what happened to their downloads.

History is therefore different from the active download queue.

---

## Categories

Downloads can be organized into categories.

The exact visual organization is a frontend decision, but conceptually categories help users manage different types of files.

Examples might include:

- Applications
- Documents
- Videos
- Archives
- Other

The important point is that categorization is a management feature, not the core downloading mechanism.

---

# 8. Download Lifecycle

A download can have multiple states.

The frontend should be prepared for states including:

### Queued

The download exists but has not started yet.

### Downloading

The file is actively being transferred.

Relevant information may include:

- Percentage complete
- Current speed
- Downloaded size
- Total size
- Estimated remaining time

### Paused

The user intentionally stopped the download.

The download should retain its existing progress.

### Retrying

A connection or server issue occurred and Hemta is attempting recovery.

### Interrupted

The download cannot currently continue, potentially because of network or server conditions.

### Completed

The file has successfully finished downloading and has been validated according to the download engine's rules.

### Failed

Hemta could not complete the download after the available recovery mechanisms were exhausted.

The frontend should distinguish these states clearly because they communicate very different things to the user.

---

# 9. Recovery Is a Major Product Feature

Recovery is not an edge case in Hemta.

It is one of the reasons the application exists.

The engine is designed to maintain download state/checkpoints so that an interrupted download can continue from its previous progress where technically possible.

For example:

```text
Download: 8.4 GB / 12 GB
        ↓
Internet disconnects
        ↓
Hemta detects interruption
        ↓
Connection recovery
        ↓
Download resumes
        ↓
8.4 GB → 12 GB
```

The user should not interpret a temporary interruption as losing their download.

The frontend therefore needs to communicate the difference between:

**"Something temporarily interrupted the download."**

and

**"This download has permanently failed."**

---

# 10. Network and Sleep/Wake Behavior

Hemta is designed for real-world macOS usage.

Users may:

- Change Wi-Fi networks
- Disconnect from the Internet
- Close their Mac
- Put the Mac to sleep
- Wake the Mac later
- Temporarily lose connectivity

The download engine is designed to handle these situations and recover where possible.

The frontend should therefore expect download state changes that happen **without the user explicitly pressing a button**.

For example:

```text
Downloading
     ↓
Network unavailable
     ↓
Waiting / Recovering
     ↓
Network restored
     ↓
Downloading
```

This is an important distinction from a static file downloader.

---

# 11. Add Download

Users should also be able to explicitly add a download.

Conceptually, this means providing a URL or otherwise selecting a downloadable resource and allowing Hemta to take over.

The frontend needs to support the concept of:

- Download URL
- File name when available
- Destination
- Download initiation
- Existing/duplicate download handling where applicable

The exact interaction and presentation are left to the frontend implementation.

---

# 12. File Management

Hemta ultimately manages files on the user's Mac.

Users should be able to perform actions such as:

- Open a downloaded file
- Reveal the file in Finder
- Access its location
- Inspect download information
- Remove downloads from the interface
- Manage completed downloads

The application is therefore not just monitoring network transfers; it is also a **local file management interface around downloaded content**.

---

# 13. Notifications and macOS Integration

Hemta is intended to behave like a native macOS utility.

Relevant platform integrations include concepts such as:

- macOS notifications
- Dock progress
- Menu bar presence
- Quick Look
- Finder integration
- Drag and drop
- Native macOS application behavior

For example, a user may start a large download and then move on to another application.

They shouldn't need to keep Hemta open in the foreground simply to know that the download completed.

The system can communicate important events through native macOS mechanisms.

---

# 14. Search

As the number of downloads grows, users need to find specific files quickly.

The application therefore includes search/history functionality.

Search should conceptually allow users to locate downloads based on information associated with them, such as:

- File name
- Download history
- Category
- Other relevant metadata

The exact search experience is a frontend decision.

---

# 15. Inspector / Detailed Download Information

A download can contain significantly more information than can reasonably be shown in a primary list.

The product therefore supports the concept of a detailed inspector for an individual download.

The inspector can provide additional information such as:

- Full file name
- Source
- Destination
- File size
- Progress
- Speed
- Status
- Download details
- Relevant technical information

The frontend engineer should treat the main download list and detailed download information as two levels of information rather than trying to expose everything simultaneously.

---

# 16. Bandwidth and Download Control

Hemta includes download-management capabilities beyond simply starting and stopping files.

The engine supports concepts such as:

- Concurrent downloads
- Segment/connections management
- Bandwidth control
- Scheduling
- Retry/backoff behavior
- Sequential fallback

These features exist to make downloads efficient without unnecessarily consuming the user's entire network connection.

For example, users may want several downloads running while still keeping bandwidth available for video calls, browsing, gaming, or other activities.

---

# 17. Privacy Philosophy

Privacy is a major part of Hemta's product positioning.

Hemta is designed around a **local-first approach**.

A major principle is:

> **Zero usage telemetry.**

Hemta does not need to send users' download activity to a remote analytics system to provide its core functionality.

The product is intended to keep the user's download management experience local to their Mac.

This should be considered a core product value rather than a minor technical detail.

---

# 18. Security

Hemta is designed specifically for macOS and takes advantage of the platform's security model.

The architecture includes concepts such as:

- Sandboxed components where appropriate
- Hardened communication between components
- Secure handling of browser-related information
- In-memory handling of sensitive cookie/session information
- macOS notarization/security hardening

The frontend should not expose sensitive technical information unnecessarily.

The important product-level message is:

> **Hemta is designed to be a trustworthy native Mac application, not an application that requires sending users' download information to a third-party cloud service.**

---

# 19. What Hemta Is NOT

The scope of the product is intentionally focused.

Hemta is **not intended to become**:

- A BitTorrent client
- A general website crawler
- A website mirroring tool
- An FTP/SFTP client
- A cloud storage/synchronization service
- A remote download-control server
- A cross-platform Windows/Linux application

The primary focus is:

> **Reliable, fast HTTP/HTTPS downloading on macOS.**

This scope should be respected when building the frontend so the product does not accidentally become represented as something broader than it actually is.

---

# 20. Typical User Journey

A typical Hemta user journey could look like this:

### First use

```text
Install Hemta
     ↓
Configure required browser integration
     ↓
Use the browser normally
```

### Starting a download

```text
Find file online
     ↓
Click download
     ↓
Hemta captures the download
     ↓
Download enters Hemta
     ↓
Hemta begins managing it
```

### During download

```text
Download
   ↓
Multiple connections where supported
   ↓
Progress tracking
   ↓
Automatic recovery if necessary
```

### Interruption

```text
Network failure
      ↓
Hemta detects problem
      ↓
Retry / wait / recover
      ↓
Resume download
```

### Completion

```text
Download completes
       ↓
File is saved locally
       ↓
User receives completion feedback
       ↓
Download becomes part of history
       ↓
User can open/reveal/manage the file
```

---

# 21. What the Frontend Is Actually Building

The frontend is essentially the **control center for Hemta's download engine**.

It needs to allow the user to understand and control:

**What is downloading?**

**What is waiting?**

**What has finished?**

**What failed?**

**How fast is it downloading?**

**How much remains?**

**Where is the file?**

**Can I pause/resume/cancel it?**

**What happened when something went wrong?**

**What downloads have I previously completed?**

The UI should make the complexity of the underlying download engine feel simple.

The user should not need to understand:

- HTTP range requests
- Connection segmentation
- XPC
- Retry algorithms
- Checkpointing
- Network recovery
- Background agents

Those are implementation details.

The frontend's job is to turn that complexity into a clear user experience.

---

# 22. Product Mental Model

The simplest way to understand Hemta is:

```text
                 INTERNET
                    │
                    ▼
             ┌─────────────┐
             │    Hemta    │
             │ Download    │
             │   Engine    │
             └──────┬──────┘
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
     Speed       Recovery     Management
       │            │            │
       └────────────┼────────────┘
                    ▼
               LOCAL FILE
                    │
                    ▼
                  USER
```

Hemta sits between the **Internet and the user's local files**, managing the entire download lifecycle.

---

# 23. Most Important Product Principles

When making frontend decisions, keep these principles in mind:

### 1. Downloads are persistent

A download isn't tied to the lifetime of the UI window.

### 2. Reliability matters as much as speed

Hemta isn't simply an "accelerator." Recovery is one of its defining capabilities.

### 3. Complexity should be hidden

The download engine is technically sophisticated, but the user experience should remain understandable.

### 4. The application is native to macOS

It should behave like a Mac application and integrate naturally with the operating system.

### 5. Local-first and private

The product does not depend on cloud infrastructure for its fundamental download-management functionality.

### 6. Users need control

Users should be able to understand, pause, resume, cancel, organize, inspect, and manage downloads.

### 7. State changes matter

The frontend must handle asynchronous state changes because the background engine can continue operating independently of the UI.

---

# 24. One-Sentence Product Definition

**Hemta is a native macOS download manager that captures browser downloads, accelerates compatible downloads through concurrent connections, reliably resumes interrupted transfers, and gives users complete local control over their downloads without usage telemetry.**

---

# 25. Short Product Description

**Hemta is a fast, reliable, privacy-focused download manager built specifically for macOS. It takes over browser downloads, accelerates supported transfers, automatically recovers from interruptions, and continues managing downloads in the background—even when the main application window is closed.**

The frontend should communicate this product clearly while leaving the visual language, layout, component architecture, interaction design, and implementation decisions to the frontend engineer.