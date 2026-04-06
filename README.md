# VEX Linux Chrome Fix

Fixes VEXcode web apps on Linux (Pop!_OS, Ubuntu, etc.)

## Problem
VEXcode detects Linux with touch support as Android tablet and shows:
> "Web-based VEXcode IQ is not supported on Android"

## Solution
A simple Chrome extension that sets maxTouchPoints to 0.

## Supported platforms
- codeiq.vex.com (VEX IQ)
- codeair.vex.com (VEX AIR)
- code123.vex.com (VEX 123)
- codego.vex.com (VEX GO)
- codeaim.vex.com (VEX AIM)
- codeexp.vex.com (VEX EXP)
- codev5.vex.com (VEX V5)

## Installation
1. Download: **Code → Download ZIP**
2. Extract the ZIP
3. Open Chrome → `chrome://extensions`
4. Enable **Developer mode** (top right toggle)
5. Click **Load unpacked**
6. Select the extracted folder
7. Open any VEXcode URL — it works! ✅

## Requirements
- Google Chrome installed as **.deb** (NOT Flatpak or Snap!)
- Linux (tested on Pop!_OS COSMIC)

## Install Chrome correctly
```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt -f install
```

## USB connection (to download code to robot)
```bash
sudo usermod -a -G dialout $USER
# Log out and log back in
```

## About this fix
This fix was discovered and developed by **Oliver Buček** from RoboTech STEM Center 
in Ptuj, Slovenia, while setting up VEXcode for Linux-based classrooms. After 
investigating the browser console errors, he identified that VEXcode incorrectly 
uses `navigator.maxTouchPoints > 0` to detect Android tablets — which also triggers 
on Linux systems that report touch support. This Chrome extension overrides that 
value to 0, allowing VEXcode to run normally on any Linux desktop.

**Oliver Buček** — RoboTech STEM Center, Ptuj, Slovenia
VEX Robotics Ambassador for Slovenia 🇸🇮
[robotech.si](https://robotech.si)

## License
MIT — free to use and share
