# Championship Manager 97/98 for iPhone

A personal project: the original DOS version of CM 97/98 running in Safari through [js-dos](https://js-dos.com) (DOSBox compiled to WebAssembly), packaged as an offline web app with touch controls.

**This repository contains no game files.** CM 97/98 was never released as freeware, so you bring your own copy and it stays on your device.

## Play

1. Open the GitHub Pages link in Safari on the iPhone or iPad.
2. Share → Add to Home Screen, then open it from the new icon.
3. Put your CM 97/98 folder (the one with `CM2E16.EXE`) in the Files app, press and hold it, and tap Compress to make a .zip.
4. In the app, tap Load game and pick the .zip. It's stored on the device; you only do this once.
5. Tap Kick off.

## Controls

- The round button floating over the game opens the tools: Keys, Right, Fit/Wide, Keep and Exit. It fades when you're not using it; drag it anywhere it's out of the way (the spot is remembered).

- Tap to click. Drag with one finger to drag in the game (players and arrows on the tactics screen).
- Press and hold for a right click (keep holding and move to drag with the right button).
- Right makes your next tap or drag use the right button.
- Two fingers: drag to scroll, pinch to zoom. Wide fills the width of the screen (bigger text); Fit shows the whole screen; Reset undoes a zoom.
- Fast matches: the app presses Space for you at each kick-off (both halves), so matches play at the game's fast speed, about three times quicker. Turn it off in the menu to watch at normal speed.
- Keys opens the phone keyboard, plus Esc, Enter, Tab, arrows and Page Up/Down.
- Keep stores your saves on the device straight away (it also happens on its own every 90 seconds while you play, and when you leave). Exit goes back to the home screen.

## Saves

Saves are kept in the browser's storage on the device, separately from the game, one file at a time, so only what changed is rewritten. Use Back up saves on the home screen to put a copy in Files, and Restore a backup to bring one back (to the same device or another one).

If iOS ever closes the app mid-game (usually when it's short of memory), the next launch says so and shows details you can copy.

Replacing the game (for example with an updated database) keeps your saves and Hall of Fame. Any database you changed in the Data Editor is dropped so the new one is used.

On iPhone, the Home Screen app keeps its own storage, separate from Safari. Load your game from the Home Screen icon, not from a Safari tab.

## Speed and battery

The game waits for you in a loop, which would keep a CPU core flat out (and the phone hot) even on a still screen. The app pauses the emulator whenever the screen has been still for a few seconds and the game isn't busy (it shows a football pointer while it's working), and resumes the moment you touch it. It also pauses when the app is in the background. Processing runs at full speed.

The emulator runs flat out, which on a recent phone is faster than the PCs the game was made for. Creating a new game still takes a few minutes, as it did in 1997.

## What's in here

- `index.html` launcher, touch-to-mouse controls, keyboard, save storage and backup
- `sw.js` service worker that keeps the app on the device for offline play
- `vendor/emu/` js-dos emulators 8.5.2 (`emulators` on npm, GPL v2): `wdosbox` and `wlibzip`
- `vendor/fflate.js` zip library (MIT)

Championship Manager 97/98 is © Sports Interactive / Eidos (now Square Enix). This project is unofficial and not affiliated with or endorsed by them.
