# TCEA Scream Fest

## Current State
The project has a fully built TCEA Scream Fest website with:
- 5 haunted houses (Schoolhouse Break, Terror Hell Hole, Obsession, Blackout, Asylum Hell)
- 4 scare zones (Carnevil Bros Circus, Screamtown Chaos, Steampunk Break, Zombieville)
- 3 shows (Bee Dance Show, Monster Bash, Deadman's Revenge)
- 5 icon characters (Fiona the Clown, Grimm, Baron, Vex, Mama Bones)
- 2 food booths (Sharks Hell, Slider Cook Booth)
- Special attractions (Scream Cornmaze, Kids Haunted Hayride)
- Ticket/pass system (General Admission $30, Bloody Pass, U Think U Brave Pass, Horn Pass)
- Procession info, info section, footer
- Lots of existing AI-generated images
- Backend with content management, auditions, tunnel maps, etc.

## Requested Changes (Diff)

### Add
- Tickets updated to $20 general admission; add VIP pass and Regular pass and Touch pass
- Season pass at $70; merch at $13
- Ghost Town scare zone with AI-generated image and scary description
- Mark 4 zones open for 2026: Ghost Town, Carnevil Bros Circus, Zombieville, Steampunk Break
- Mark 4 houses open for 2026: Asylum Hell, Terror Hell Hole, Obsession, Schoolhouse Break
- Scream Team auditions announcement: April 11–29th, 2–9 PM
- Official haunt season open date: August 22nd
- Events section: Chaos Purge (July 2026, 6 PM–1 AM) and Christmas Wonderland (December 2026) with AI images
- Costume character team hiring: March next year, minimum height 5'10", weight 200 lbs, must be available all weekends
- Haunted house supervisors audition info: just come to auditions in August
- Auditions page/section with all audition types and links for applications
- Sinister Slide Gear sponsor description and badge
- Transworld and East Coast Haunt Convention 2027 section with description

### Modify
- Ticket prices updated to $20 base
- "2026 Open" badges on the 4 open houses and 4 open zones
- All text across the site remains white/bright for readability

### Remove
- No content removed

## Implementation Plan
1. Generate Ghost Town AI image (scary/horror style)
2. Generate Chaos Purge event AI image
3. Generate Christmas Wonderland event AI image
4. Update App.tsx frontend to:
   - Add Ghost Town to SCARE_ZONES data
   - Add "Open 2026" badges to the 4 open zones/houses
   - Update ticket prices and add VIP/Regular/Touch pass + season pass info
   - Add events section with Chaos Purge and Christmas Wonderland
   - Add auditions section with Scream Team dates and all audition types
   - Add sponsor banner (Sinister Slide Gear)
   - Add conventions section (Transworld + East Coast Haunt)
   - Add costume character team hiring and haunted house supervisor info
