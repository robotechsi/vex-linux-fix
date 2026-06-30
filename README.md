# VEX Linux Fix

Makes **VEXcode** and **VEXcode VR** work on Linux computers.

If your VR playground loads but the robot won't move when you press **Play**, or you get a *"not running on Android"* error, this fixes it.

You do **not** need to be technical. Just follow the steps below. It takes about 3 minutes. You only do this once.

---

## What you need to know first

This is a small "add-on" for the Chrome browser (called an *extension*). Once you install it, it works quietly in the background every time you open a VEX website. **You never have to open it or click it again.** You install it once and forget about it.

The browser does **not** look for any folder. You are not opening files in VEX. You are just telling Chrome once: "use this add-on." After that, Chrome remembers.

> You must use the **Google Chrome** browser (or Chromium). This does not work in Firefox or Safari.

---

## Step 1 — Download the files

1. Near the top of this page, click the green **`< > Code`** button.
2. In the menu that opens, click **Download ZIP**.
3. A file called **`vex-linux-fix-main.zip`** will download (usually into your **Downloads** folder).

---

## Step 2 — Unzip the files

A ZIP is a compressed package. You need to "unzip" (extract) it first.

1. Open your **Files** application and go to the **Downloads** folder.
2. **Right-click** the file `vex-linux-fix-main.zip`.
3. Choose **Extract Here** (or **Extract...**).
4. You now have a normal folder called **`vex-linux-fix-main`**.

> **Important:** Move this folder somewhere you will NOT delete it — for example your **Home** folder or **Documents**. Do **not** leave it in Downloads if you tend to clean that out.
>
> **Why?** Chrome does not copy the add-on. It reads it from this folder every time it starts. If you later delete or move the folder, the add-on stops working. Pick a permanent home for it now.

---

## Step 3 — Open the Chrome extensions page

1. Open **Google Chrome**.
2. Click in the address bar at the top (where website addresses go).
3. Type exactly this and press **Enter**:
   ```
   chrome://extensions
   ```
4. A page titled **Extensions** opens.

---

## Step 4 — Turn on Developer mode

1. Look at the **top-right corner** of the Extensions page.
2. There is a switch labelled **Developer mode**.
3. Click it so it turns **ON** (blue).
4. Three new buttons appear near the top-left: **Load unpacked**, **Pack extension**, **Update**.

---

## Step 5 — Load the add-on

1. Click the **Load unpacked** button.
2. A file picker window opens.
3. Find and **single-click** the folder **`vex-linux-fix-main`** (the one you unzipped in Step 2) so it is selected.
4. Click the **Open** / **Select** button (bottom-right of that window).

> You are selecting the **folder itself**, not a file inside it. Just click the folder once so it's highlighted, then click Open.

5. A card called **VEX Touch Fix** now appears on the Extensions page. Done — it's installed.

---

## Step 6 — Use VEX as normal

1. Open a **new tab**.
2. Go to **`vr.vex.com`** (or any VEXcode website).
3. Pick a playground, write your code, press **Play** — the robot moves.

That's it. The add-on now works automatically every time, including after you close and reopen Chrome. **You never need to repeat these steps.**

---

## Frequently asked questions

**Do I have to open the folder when I want to use VEX?**
No. Never. Once installed in Step 5, Chrome handles everything. You just open the VEX website like before.

**Do I have to reinstall it every time I start my computer?**
No. It stays installed permanently.

**It stopped working after a while — why?**
You probably moved or deleted the `vex-linux-fix-main` folder. Put it back, or just repeat Steps 1–5. (This is why Step 2 says to keep it somewhere permanent.)

**Can I move the folder after installing?**
Don't. If you must, move it first, then redo Step 5 pointing at the new location.

**Is this safe? Does it collect my data?**
Yes, safe. It collects nothing and sends nothing anywhere. It only adjusts browser settings on VEX websites so they work on Linux.

**The Extensions page shows a warning about Developer mode.**
That's normal. Chrome shows that message for any add-on installed this way (not from the official store). You can ignore it.

---

## For technical users — what it actually does

Two fixes for known Linux issues:

1. **"Not running on Android"** — overrides `navigator.maxTouchPoints` to `0`, because Linux desktops with touch support are misdetected as Android tablets by VEX.

2. **VR playground loads but Play does nothing** — VEXcode VR needs cross-origin isolation (`SharedArrayBuffer`) for its Unity WebGL workers. The extension uses `declarativeNetRequest` to inject the missing headers:
   - `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` on frames **and worker scripts** (the worker scripts missing COEP is what silently killed the interpreter)
   - `Cross-Origin-Resource-Policy: cross-origin` on all subresources
   - removes a report-only CSP that interfered with worker creation

   The content script runs in the `VRWindow.html` iframe via `all_frames: true`, `world: MAIN`.

Files: `manifest.json`, `rules.json`, `fix.js`.

---

## License

Free and open source. Please share with other Linux-using VEX coaches.

Made by [RoboTech](https://robotech.si) — VEX Robotics Ambassador, Slovenia.
