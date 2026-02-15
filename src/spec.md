# Specification

## Summary
**Goal:** Expand the homepage “Tickets & Passes” section with five new pass options and make all pass options selectable with a UI-only “secure” call-to-action.

**Planned changes:**
- Update `frontend/src/components/sections/InfoLocationSection.tsx` to add five additional pass options to the existing Tickets & Passes list:
  - Content Creator Pass ($4) with a creator/influencer-focused description
  - Touch Pass (Included with Regular Pass; ask to upgrade) with an interactive/touch-allowed description
  - Skip the Line Pass ($34) with a priority entry description
  - Blackout Pass (Included with ticket) with a darkness-related warning description
  - Kid Pass ($8) with a younger guests/family-friendly description
- Add single-select (radio-group style) pass selection behavior with accessible, obvious selection states (keyboard navigable).
- Add a “Secure your pass” call-to-action that is disabled until a pass is selected, and on activation shows immediate UI feedback that includes the selected pass name (UI-only; no payments).

**User-visible outcome:** On the homepage, users can view the five new passes alongside existing ones, select exactly one pass, and click “Secure your pass” to get immediate confirmation of the selected pass without any checkout or payment flow.
