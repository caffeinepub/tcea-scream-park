# Specification

## Summary
**Goal:** Make the haunted attraction site feel more intense and polished by enhancing the Auditions experience, adding new scenic content/images, expanding Sneak Peek coverage, and rewriting venue copy in a professional-but-scary tone.

**Planned changes:**
- Add a clearly labeled external “Scream Team Auditions” link (placeholder URL defined in frontend code) to the Auditions section; open in a new tab and keep existing Scare Actor/Dancer signup dialogs working.
- Update Auditions section copy and presentation to feel noticeably scarier while remaining English-only.
- Add and wire in a new AI-generated “Clown Town” interior/scenic elevation image as a static asset under `frontend/public/assets/generated`, and update the “Inside Clown Town” interior elevation section to use it.
- Add and surface a new AI-generated “Vicky’s Saw” scenic elevation image for the Terror Hell Hole sneak peek (image + title + professional-but-scary English description) without replacing the existing Hell Hole hero content.
- Add a new “Toys Come to Play” Sneak Peek card and implement a dedicated full sneak peek page/route consistent with existing sneak peek pages, including hash navigation and back-navigation behavior.
- Rewrite tagline and description copy (English-only) for all haunted houses, scare zones, and food booths in the static content modules (`hauntedHouses.ts`, `scareZones.ts`, `foodBooths.ts`) to be more professional while still scary, preserving existing booth menu structure.

**User-visible outcome:** Visitors see a scarier Auditions section with a new external auditions link, new/expanded sneak peek experiences (including Toys Come to Play and Vicky’s Saw), updated Clown Town interior imagery, and refreshed professional-but-scary descriptions across all houses, zones, and booths.
