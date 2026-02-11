# Specification

## Summary
**Goal:** Autoplay looping chainsaw background audio on the homepage (without blocking usability), add a new “Camp Riley (Coming 2027)” kid show with a generated image, and update the “Grave danger dace” scare zone image to “Undead Dance Party.”

**Planned changes:**
- Update homepage audio behavior to attempt autoplay of `/assets/audio/chainsaw-loop.mp3` on initial load, while keeping the site fully usable if autoplay is blocked and allowing audio start via the existing user-gesture sound control.
- Add a new Live Show entry for **Camp Riley** labeled as a kid show and **Coming 2027**, including an original English description that clearly communicates the Coming 2027 status.
- Add a new generated image asset for Camp Riley and wire it into `frontend/src/content/generatedImages.ts` so the show card renders the new image.
- Add a new generated image asset for “Undead Dance Party” and update `frontend/src/content/generatedImages.ts` so the scare zone entry for “Grave danger dace” uses the new image.

**User-visible outcome:** On visiting the homepage, chainsaw audio will try to start automatically and can be enabled via existing sound controls if blocked; the Shows section will include “Camp Riley (Coming 2027)” with a new image and description; and the “Grave danger dace” scare zone card will display the new “Undead Dance Party” image.
