# Specification

## Summary
**Goal:** Add a CMS-style content system and a calendar so admins can manage haunt-related items (events, scare zones, shows, hayrides) with shared operating dates and per-item overrides.

**Planned changes:**
- Backend: Add CRUD support with stable storage for four content types: Events, Scare Zones, Shows, and Attractions (hayrides), each with at least id, name, and English description.
- Backend: Implement distinct, type-specific custom fields per content type with validation so only applicable fields can be set.
- Backend: Add a single “main haunt operating schedule” (start/end dates) that content items inherit by default, with a per-item override option.
- Backend + Frontend: Seed initial CMS items (editable in the UI): Events “Scream break” (April), “Purge” (May), “east coast” (2027), “Transworld” (2027); Attraction “Farwell haunted hayride”; Scare Zone “Grave Hell”; Show “Lost spirits” (coming 2027), each with an editable English description and editable date representation.
- Frontend: Add authenticated admin/editor CMS screens (hash-routed) to list/create/edit/delete all four types, including description, type-specific fields, and inherit/override date controls.
- Frontend: Add a hash-routed calendar view that shows items on their effective dates, supports filtering by type, and shows item details on selection.
- Frontend: Wire CMS + calendar data loading and mutations to the backend using the existing actor hook and React Query, including refetch/invalidation and English error states.

**User-visible outcome:** Authenticated users can manage Events, Scare Zones, Shows, and Attractions in a CMS UI, control whether items follow the main haunt schedule or use custom dates, and view all scheduled items in a filterable calendar with detail views.
