# Specification

## Summary
**Goal:** Force background chainsaw audio to autoplay at 60% volume with no sound controls, and add an automatic looping clown-laugh fallback when autoplay is blocked.

**Planned changes:**
- Set the existing chainsaw loop (`/assets/audio/chainsaw-loop.mp3`) to loop continuously, default volume 0.6, and attempt autoplay on page load.
- Remove all user-facing sound UI, including any sound on/off toggle and any “Enable sound” prompt UI.
- Add a new static fallback audio asset (`/assets/audio/clown-laugh.mp3`) and attempt to autoplay it (looping) if chainsaw autoplay fails/throws.
- Add best-effort autoplay mitigation: when autoplay is blocked, register first-user-gesture listeners (e.g., click/tap, keydown, pointerdown) to re-attempt starting chainsaw (then fallback if needed) and clean up listeners after successful playback.

**User-visible outcome:** The site plays a looping chainsaw background sound automatically at 60% volume; if autoplay is blocked, it will start automatically after the first user interaction, falling back to a looping clown-laugh if the chainsaw cannot start—without any sound buttons or prompts.
