# pokeBuilder

A competitive Pokémon builder focused on **fast team creation, matchup clarity, and practical AI-assisted decisions**.

The app already combines a searchable Pokédex, weakness/counter inspection, multi-team storage, and a much more competitive-aware Team Builder for **PRO PvP** workflows.

---

## Current Product Direction

The goal is not just to list Pokémon, but to help the user:
- build cleaner 6-mon cores faster
- understand team weaknesses instantly
- evaluate counters against specific enemy teams
- adapt to real meta threats without leaving the app

---

## What Is Already Implemented

### Pokédex & Core UX
- Fast Pokédex search by name, ID, and type
- Dual-type filtering
- Clickable type badges with a full Type Chart modal
- Weakness / resistance breakdown per Pokémon
- Dark / Light mode toggle with persistence

### Team Builder
- Multi-team management with rename, save-state persistence, import/export JSON
- Up to **50 stored slots** per team workspace
- Full stat editing: level, IVs, EVs, nature, moves, item, ability, Tera type
- Recommended build helper for common physical / special / tank / mixed roles
- **Showdown import and full Showdown export**
- **Shareable team links** through URL encoding
- **One-click Export Report** in Battle Calculate: copies Showdown paste + share link together
- Slot cards show **BST (Base Stat Total)** with color-coded tiers and competitive context (ability, Tera type, role, nature, item)

### AI Builder
- **Auto-Build 6** with phase-based scoring
- Real role detection using actual stat profiles
- Ability-aware scoring for high-impact competitive abilities
- Weather / terrain / Trick Room / Intimidate / Regenerator synergy rewards
- Item-aware scoring for common competitive items
- Move completeness penalties for incomplete or low-quality sets
- IV quality checks for offensive speed-based picks
- 4x weakness penalties and defensive synergy balancing

### Battle Analysis
- Archetype recognition for Rain, Sun, Sand, Snow, Trick Room, Tailwind
- Speed-control warnings when a team is too slow
- Meta Threat Check against the **PRO PvP** 3-tier threat model (Sweepers / Pivots / Walls)
- Battle context controls for weather, terrain, screens, and hazard chip during damage analysis
- **Speed Tier Comparison** versus current meta threats
- **Stat Comparison** panel: HP / ATK / DEF / SpA / SpD / SPE bars displayed at the top of the Battle Calculate panel, right next to Speed Tier — my team shown in **green** using actual EV/IV/level/nature, opponent shown in **red** at maximum potential (31 IV · 252 EV · Lv 100); switch between stats with pill buttons
- Assassin / Target Mode with editable opponent team
- Exact defender setup editor for imported threats (level, nature, IVs, EVs)
- Opponent Showdown paste support
- Best-counter suggestions using moves, typings, and context
- Lead recommendation and safer switch-in guidance versus imported threats
- Estimated damage ranges with **OHKO / 2HKO / 3HKO** labels
- Priority move awareness in matchup scoring
- Counter scoring upgraded for pivots, recovery loops, status pressure, and hazard pressure
- Matchup summaries that explain why a selected core still struggles against specific threats
- **Battle Calculate is always open** — no collapse/expand required
- **Full Gen 9 damage formula**: burn (−50% ATK), Choice Band/Specs/Life Orb modifiers, weather/terrain boosts, Doubles spread penalty (×0.75), full 16-step random roll range
- **Move flag chips** on every move: priority tier (+N/−N), two-turn warning, contact tag, high-crit indicator, multi-hit total damage, recoil %, drain %
- **Critical hit overlay**: "Crit: X%–Y%" shown alongside normal range; high-crit moves (Slash, Night Slash, Stone Edge…) marked with ⭐
- **Sturdy / Focus Sash flag**: OHKO label changes to "OHKO*" with a "*Sash/Sturdy" warning chip
- **Leftovers / Black Sludge recovery**: estimated hits-to-KO recalculated accounting for per-turn healing; "Heals through" shown if recovery outpaces damage
- **Extended ability immunity table**: Wonder Guard, Dry Skin, Sap Sipper, Earth Eater, Fluffy, Heatproof, Purifying Salt, Ice Scales, Well-Baked Body, Wind Rider
- **Contact proc warnings** in Battle Prep: Static (30% paralysis), Flame Body (30% burn), Rough Skin/Iron Barbs (100% recoil), Rocky Helmet — flagged when a contact move would trigger them
- **Tailwind ×2 and Paralysis ×0.5 toggles** in Battle Context — applied in speed comparison and "who goes first" tip

### Competitive Data Upgrades
- Dynamic defensive logic for abilities such as Levitate, Thick Fat, Flash Fire, Volt Absorb, Water Absorb and more
- Therian formes added with correct stats and competitive abilities
- Expanded held item pool for better build flexibility
- Optional local/external JSON data bundle refresh flow for threats, abilities, moves, and recommended items

### Team Workflow & Sharing
- Better comparison view for multiple saved teams with side-by-side summary metrics
- Offline-ready PWA shell with manifest + service worker caching for the core app

---

## Structure For Easier Future Updates

The project is already in a good split for future maintenance, so no extra redistribution was necessary right now.

- `index.html` → app shell and script loading order
- `dex.js` → Pokédex view, search, theme handling
- `utils.js` → type, damage, sprite, and shared helpers
- `team/` → Team Builder logic split by responsibility:
  - `team-core.js` → state and persistence
  - `team-io.js` → import/export, Showdown, share links
  - `team-ai.js` → Auto-Build scoring
  - `team-analytics.js` → archetypes, meta checks, damage estimates
  - `team-ui.js` / `team-oop.js` → UI rendering and opponent tools
- `data/` → stats, moves, abilities, sprites, type chart data

If the app grows further, the next clean split should be **inside analytics/AI by feature**, not a broad rewrite now.

---

## Roadmap

### Next High-Value Updates
- [x] Expand the meta selector with newer regulations and additional ranked formats
- [x] Add a **meta-data refresh workflow** so threat lists can be updated faster without manual deep edits
- [x] Improve the AI builder with **team-style presets** (balance, hyper offense, rain, sand, Trick Room)
- [x] Upgrade the build helper to suggest **EV spreads, natures, and items together** with stronger competitive logic
- [x] Add **Tera-aware offensive and defensive scoring** across team analysis and threat checks
- [x] Move Suggestions in Counter Intelligence — rank all equipped moves by calculated damage vs each opponent, with type effectiveness badges and "USE FIRST" label
- [x] Battle Prep tips per counter — speed comparison, guaranteed OHKO detection, and incoming damage warning using real IV/EV/nature/level data

### UX / Product Polish
- [x] Mobile-first responsive upgrade for the Team Builder and analysis panels
- [x] One-click export/share package for team + matchup report
- [x] Cleaner card/details view for each Pokémon with more competitive context
- [x] Better comparison views for multiple saved teams

### Data & Automation
- [x] Optional integration path for external meta sources when stable/public data is available
- [x] Easier data refresh process for threats, abilities, moves, and recommended items
- [x] Offline/PWA support once the competitive analysis flow is stable

---

## Future Updates — Making the Calculator More Realistic

The items below represent the most impactful upgrades to close the gap between pokeBuilder and a full competitive battle simulator. They are grouped by theme.

---

### 🎯 Damage Calculator — Accuracy & Depth

| Feature | Status | Notes |
|---|---|---|
| **Full Gen 9 damage formula with all modifiers** | ✅ Done | Burn halves physical ATK, held item boosts (Choice Band ×1.5, Life Orb ×1.3), weather/terrain boosts, and full random-roll range all applied. |
| **Burn / paralysis toggle** | ✅ Done | Battle Context toggles: "Attacker is Burned (−50% ATK)" and "My Pokémon Paralysed (−50% Spd)" — both applied to damage calc and speed tier. |
| **Multi-hit move damage** | ✅ Done | Moves like Bullet Seed / Population Bomb show per-hit %, plus a "Total: ~X%" estimate at average hit count (e.g. ×3.5 avg for 2–5 hits). |
| **Recoil and drain tracking** | ✅ Done | Recoil % and Drain % flags shown as colour-coded chips next to each move in the move suggestion panel. |
| **Critical hit overlay** | ✅ Done | Normal damage range shown alongside "Crit: X%–Y%" (×1.5). High-crit moves (Slash, Night Slash, Stone Edge, etc.) marked with ⭐. |
| **Speed tier precision: Choice Scarf, Tailwind, paralysis** | ✅ Done | Tailwind ×2 and Paralysis ×0.5 toggles added to Battle Context; applied in speed comparison and "who goes first" output. |

---

### ⚔️ Moves — Richer Competitive Modelling

| Feature | Status | Notes |
|---|---|---|
| **Move priority tiers in battle prep** | ✅ Done | Priority bracket shown as a coloured "+N Prio" chip on each move. Moves are sorted by damage, then flagged independently. |
| **Two-turn moves and charging mechanics** | ✅ Done | Two-turn moves (Fly, Dig, Solar Beam, Phantom Force…) show an orange "2-Turn" warning chip — opponent can act freely on charge turn. |
| **Spread moves in doubles (VGC)** | ✅ Done | When Doubles mode is on, spread moves (Earthquake, Rock Slide, Heat Wave, etc.) automatically apply ×0.75 to damage output. |
| **Z-Move and Dynamax/Gigantamax move conversion** | ⏳ Skipped | PRO does not use these mechanics — skipped intentionally for now. |
| **Contact vs non-contact distinction** | ✅ Done | Contact moves show a blue "Contact" chip. Battle Prep also warns when opponent's ability (Static, Flame Body, etc.) has a proc chance on contact. |

---

### 🛡️ Defensive Layer — Status, Items, Hazards

| Feature | Status | Notes |
|---|---|---|
| **Stealth Rock and Spike damage pre-calculation** | ✅ Done (prior) | SR/Spikes chip shown in Battle Context and factored into damage estimates as "after hazards" range. |
| **Leftovers / Black Sludge / Shell Bell recovery tracking** | ✅ Done | When defender holds Leftovers or Black Sludge, the estimated "hits to KO" accounts for per-turn recovery. "Heals through" shown if recovery outpaces damage. |
| **Ability activation probability** | ✅ Done | Battle Prep tip warns when a contact move triggers an opponent ability with a proc chance (Static 30%, Flame Body 30%, Rough Skin 100%, etc.). |
| **Sturdy / Focus Sash survival flag** | ✅ Done | OHKO labels change to "OHKO*" with a "*Sash/Sturdy" note when the defender has Sturdy, Multiscale, or a Focus Sash. |
| **Wonder Guard, Dry Skin, and full ability immunity table** | ✅ Done | Extended immunity logic: Wonder Guard (blocks non-SE), Dry Skin (Water immunity / Fire weakness), Sap Sipper, Earth Eater, Well-Baked Body, Wind Rider, Fluffy, Heatproof, Purifying Salt, Ice Scales. |

---

### 🌦️ Field Conditions & Environment

| Feature | Why it matters |
|---|---|
| **Weather state toggle in Battle Calculate** | Let the user set the current weather (Rain / Sun / Sand / Hail-Snow) once, and have all damage estimates automatically apply the ×2 / ×0.5 weather modifiers. Sand and Hail tick-damage against non-immune types is also part of this. |
| **Terrain toggle** | Electric / Grassy / Psychic / Misty Terrain all modify damage and conditions. Grassy Terrain heals 1/16 HP per turn (also halves Earthquake damage), Psychic Terrain blocks priority moves, etc. |
| **Rooms: Trick Room, Magic Room, Wonder Room** | Trick Room is already detected for the Archetype panel. Adding it as a damage-context toggle (e.g., slowest mon acts first — show reordered Speed bars) and Wonder Room (swap Def/SpDef) would complete the field-state picture. |

---

### 📊 Team-Level Intelligence

| Feature | Status | Notes |
|---|---|---|
| **Win-condition detection** | ✅ Done | Identifies setup sweepers (Swords Dance, Nasty Plot, Calm Mind, Dragon Dance, Shell Smash…), weather abusers (Swift Swim, Chlorophyll, Sand Rush, Slush Rush), and Trick Room abusers — surfaces primary win-condition per Pokémon in the Battle Calculate panel. |
| **Defensive core analysis** | ✅ Done | Automatically scores all pairs on the team and highlights the two Pokémon whose types best complement each other defensively, listing covered weaknesses, shared weaknesses, and remaining gaps. |
| **Role redundancy warning** | ✅ Done | Classifies each Pokémon's role (Physical Attacker, Special Attacker, Setup Sweeper, Tank/Wall, Support) and flags pairs that share the same role with overlapping types. |
| **Lead pair optimiser (VGC / Doubles)** | ✅ Done | When Doubles mode is active, scores every Pokémon's lead potential (Fake Out, Intimidate, Tailwind, Follow Me, spread moves, speed) and recommends the best lead pair with synergy notes. |
| **Turn-by-turn scenario simulator (MVP)** | ✅ Done | A 3-turn preview for the first two selected Pokémon: shows estimated HP % remaining each turn using their best equipped moves, including Leftovers recovery and Life Orb recoil, with a trade outcome verdict. |

---

### 🗄️ Data Quality & Freshness

| Feature | Status | Notes |
|---|---|---|
| **Move base-power accuracy for variable-power moves** | ✅ Done | Gyro Ball power is calculated from actual Speed stats; Grass Knot / Low Kick use an 80 BP estimate; Facade shows 70 / 140 based on the burn / paralysis Battle Context toggle; Acrobatics shows 55 / 110 based on whether the attacker holds an item; Eruption / Water Spout default to 150 BP at full HP; Wring Out / Crush Grip default to ~100 BP. Each shows a labelled note in the damage result. |
| **Held item modifier table** | ✅ Done | All 17 type-boosting hold items (Charcoal, Mystic Water, Magnet, Miracle Seed, etc.), all 18 corresponding Plates (Flame Plate, Splash Plate, Zap Plate…), Choice Band / Specs, Life Orb, Expert Belt, Muscle Band, Wise Glasses, Light Ball, and Thick Club are applied automatically to damage estimates. |
| **Ability offensive modifier table** | ✅ Done | Adaptability (STAB ×2), Huge Power / Pure Power (ATK ×2), Sheer Force (×1.3), Technician (×1.5 for ≤60 BP moves), Transistor (Electric ×1.3), Dragon's Maw (Dragon ×1.5), Water Bubble (Water ×2), Gorilla Tactics (physical ×1.5), Hustle (physical ×1.5), Guts (physical ×1.5 when statused), Solar Power (special ×1.5 in Sun) all applied. |
| **Full moveset database with PP and secondary effects** | ✅ Done | `MOVE_METADATA` table added in `data/move-info.js` with PP counts and secondary effect data (chance + effect label) for 80+ competitive moves. Body Press added to `MOVE_INFO`. Variable-power resolution covers Gyro Ball, Grass Knot, Low Kick, Facade, Hex, Eruption, Acrobatics, Wring Out, Crush Grip, and Body Press. |

---

## Roadmap Focus

We are intentionally prioritising updates that add **real competitive value** to the builder and analysis flow.

That means the next work should mainly improve:
- smarter building
- better matchup guidance
- more accurate damage and scenario modelling
- faster meta updates
- easier sharing and iteration
