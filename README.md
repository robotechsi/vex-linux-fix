# VEX Linux Fix

A Chrome/Chromium extension that fixes two long-standing issues preventing **VEXcode** and **VEXcode VR** from working correctly on Linux.

If you teach robotics on Linux and have hit *"not running on Android"* or VR playgrounds that load but won't run code, this extension is for you.

---

## What it fixes

### 1. "Not running on Android" error (all VEXcode web apps)
On Linux desktops with touch support, `navigator.maxTouchPoints > 0` causes VEX to misdetect the machine as an Android tablet and refuse to load. The extension overrides `maxTouchPoints` to `0`.

Affected apps: `codeiq`, `codeair`, `code123`, `codeaim`, `codev5`.

### 2. VEXcode VR playgrounds load but code won't run
On `vr.vex.com`, the Unity simulation loads but pressing **Play** does nothing — the robot never moves. The cause is a chain of cross-origin isolation problems:

- The page needs `SharedArrayBuffer`, which requires **COOP** + **COEP** headers (Unity WebGL threading).
- The interpreter Web Workers (`SimPythonInterpreterWebWorker`, `SimVMWebWorker`) fail silently because, on a `crossOriginIsolated` page, **every worker script must also carry `Cross-Origin-Embedder-Policy: require-corp`** — and VEX's server does not send it.
- All subresources additionally need `Cross-Origin-Resource-Policy: cross-origin`.
- A report-only CSP interferes with worker creation and is removed.

The extension injects the missing headers via `declarativeNetRequest` and applies the content-script fix inside the `VRWindow.html` iframe (`all_frames: true`, `world: MAIN`).

---

## Installation

1. Download or clone this repository:
```bash
   git clone https://github.com/robotechsi/vex-linux-fix.git
```
2. Open Chrome (or Chromium) and go to `chrome://extensions`
3. Turn on **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `vex-linux-fix` folder
6. Open `vr.vex.com` (or any VEXcode web app) in a **new tab**

The extension loads automatically on every launch — no need to reinstall after restarting Chrome.

---

## Verifying it works

### VEXcode VR
1. Open `vr.vex.com`, select a playground, write a simple command, press **Play** → the robot should move.
2. To confirm the headers are applied: open DevTools (F12) → **Network** tab → click `SimPythonInterpreterWebWorker.bundle.js` → **Response Headers** → `Cross-Origin-Embedder-Policy` should read `require-corp` (not `NOT-SET`).

### VEXcode (codeiq, etc.)
1. Open the app — it should load instead of showing the Android error.
2. In the console, `navigator.maxTouchPoints` should return `0`.

---

## Notes & troubleshooting

- **Enable hardware acceleration** in Chrome (`chrome://settings/system`) — VEXcode VR is a 3D Unity app and needs the GPU.
- The benign warning `WebGL: INVALID_ENUM: getInternalformatParameter` can be ignored; the simulation still runs.
- If the extension fails to load with an error about the `worker` resource type, your Chrome version may not support it. Remove `"worker"` from `resourceTypes` in `rules.json` (the `script` type usually covers worker scripts) and reload.
- This is an unofficial community fix. VEX does not officially support Linux for VEXcode VR.

---

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (MV3); declares matches, permissions, content script |
| `fix.js` | Content script — overrides `maxTouchPoints` |
| `rules.json` | `declarativeNetRequest` rules — injects COOP/COEP/CORP headers, removes CSP |

---

## License

Free and open source. Share with your Linux-using coach friends.

Made by [RoboTech](https://robotech.si) — VEX Robotics Ambassador, Slovenia.
