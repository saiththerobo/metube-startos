<p align="center">
  <img src="icon.svg" alt="MeTube Logo" width="21%">
</p>

# MeTube on StartOS

> **Upstream repo:** <https://github.com/alexta69/metube>

MeTube is a self-hosted web UI for yt-dlp that lets you download videos and audio from YouTube, Vimeo, SoundCloud, and hundreds of other sites. Paste a URL, pick a format, and your media is saved directly on your server.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                        |
| ------------- | ---------------------------- |
| Image         | `alexta69/metube`            |
| Architectures | x86_64, aarch64              |
| Port          | 8081                         |

---

## Volume and Data Layout

| Volume      | Mount Point | Purpose                              |
| ----------- | ----------- | ------------------------------------ |
| `main`      | `/config`   | Package state (store.json)           |
| `downloads` | `/downloads`| Downloaded files (local mode)        |

When File Browser mode is selected the filebrowser `data` volume is mounted at `/mnt/filebrowser` and downloads go to `/mnt/filebrowser/metube-downloads`.

---

## Installation and First-Run Flow

On first install a critical task prompts the user to choose a **Download Destination**:

- **Local Storage** — files saved to the `downloads` volume on-device
- **File Browser** — files saved into the File Browser dependency's data volume (requires File Browser to be installed)

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose          |
| --------- | ---- | -------- | ---------------- |
| Web UI    | 8081 | HTTP     | MeTube web UI    |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

| Action                     | Description                                        |
| -------------------------- | -------------------------------------------------- |
| Select Download Destination | Switch between Local Storage and File Browser      |

---

## Backups and Restore

**Included in backup:**

- `main` volume (package state)

**Restore behavior:** Volume is fully restored before the service starts.

---

## Health Checks

| Check         | Method                | Messages                                                                        |
| ------------- | --------------------- | ------------------------------------------------------------------------------- |
| Web Interface | Port listening (8081) | Success: "The web interface is ready" / Error: "The web interface is not ready" |

---

## Dependencies

| Dependency   | Required | Version      | Purpose                              |
| ------------ | -------- | ------------ | ------------------------------------ |
| File Browser | Optional | >=2.62.2:0   | Save downloads to File Browser       |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: metube
image: alexta69/metube
architectures: [x86_64, aarch64]
volumes:
  main: /config
  downloads: /downloads
ports:
  ui: 8081
dependencies:
  filebrowser: optional, >=2.62.2:0
actions:
  download-destination: select download destination (local or filebrowser)
startos_managed_env_vars:
  DOWNLOAD_DIR: set per download destination selection
  TEMP_DIR: set same as DOWNLOAD_DIR
```
