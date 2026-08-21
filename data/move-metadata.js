// PP counts and secondary effects for competitive moves.
// secondary: { chance: %, effect: 'description' } — the on-hit secondary effect.
// pp: base PP count for the move.
const MOVE_METADATA = {
    // --- Damaging moves with secondary effects ---
    'flamethrower':     { pp: 15, secondary: { chance: 10, effect: 'Burn' } },
    'fire-blast':       { pp: 5,  secondary: { chance: 10, effect: 'Burn' } },
    'ember':            { pp: 25, secondary: { chance: 10, effect: 'Burn' } },
    'heat-wave':        { pp: 10, secondary: { chance: 10, effect: 'Burn' } },
    'lava-plume':       { pp: 15, secondary: { chance: 30, effect: 'Burn' } },
    'scald':            { pp: 15, secondary: { chance: 30, effect: 'Burn' } },
    'scorching-sands':  { pp: 10, secondary: { chance: 30, effect: 'Burn' } },
    'thunder':          { pp: 10, secondary: { chance: 30, effect: 'Paralysis' } },
    'thunderbolt':      { pp: 15, secondary: { chance: 10, effect: 'Paralysis' } },
    'discharge':        { pp: 15, secondary: { chance: 30, effect: 'Paralysis' } },
    'thunder-shock':    { pp: 30, secondary: { chance: 10, effect: 'Paralysis' } },
    'spark':            { pp: 20, secondary: { chance: 30, effect: 'Paralysis' } },
    'nuzzle':           { pp: 20, secondary: { chance: 100, effect: 'Paralysis' } },
    'blizzard':         { pp: 5,  secondary: { chance: 10, effect: 'Freeze' } },
    'ice-beam':         { pp: 10, secondary: { chance: 10, effect: 'Freeze' } },
    'powder-snow':      { pp: 25, secondary: { chance: 10, effect: 'Freeze' } },
    'psychic':          { pp: 10, secondary: { chance: 10, effect: 'SpDef −1' } },
    'shadow-ball':      { pp: 15, secondary: { chance: 20, effect: 'SpDef −1' } },
    'energy-ball':      { pp: 10, secondary: { chance: 10, effect: 'SpDef −1' } },
    'earth-power':      { pp: 10, secondary: { chance: 10, effect: 'SpDef −1' } },
    'flash-cannon':     { pp: 10, secondary: { chance: 10, effect: 'SpDef −1' } },
    'muddy-water':      { pp: 10, secondary: { chance: 30, effect: 'Accuracy −1' } },
    'rock-blast':       { pp: 10 },
    'rock-slide':       { pp: 10, secondary: { chance: 30, effect: 'Flinch' } },
    'air-slash':        { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'iron-head':        { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'bite':             { pp: 25, secondary: { chance: 30, effect: 'Flinch' } },
    'headbutt':         { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'waterfall':        { pp: 15, secondary: { chance: 20, effect: 'Flinch' } },
    'stomp':            { pp: 20, secondary: { chance: 30, effect: 'Flinch' } },
    'extrasensory':     { pp: 20, secondary: { chance: 10, effect: 'Flinch' } },
    'dragon-rush':      { pp: 10, secondary: { chance: 20, effect: 'Flinch' } },
    'body-slam':        { pp: 15, secondary: { chance: 30, effect: 'Paralysis' } },
    'tri-attack':       { pp: 10, secondary: { chance: 20, effect: 'Burn / Freeze / Paralysis' } },
    'sludge-bomb':      { pp: 10, secondary: { chance: 30, effect: 'Poison' } },
    'sludge-wave':      { pp: 10, secondary: { chance: 10, effect: 'Poison' } },
    'cross-poison':     { pp: 20, secondary: { chance: 10, effect: 'Poison' } },
    'poison-jab':       { pp: 20, secondary: { chance: 30, effect: 'Poison' } },
    'gunk-shot':        { pp: 5,  secondary: { chance: 30, effect: 'Poison' } },
    'crunch':           { pp: 15, secondary: { chance: 20, effect: 'Def −1' } },
    'breaking-swipe':   { pp: 15, secondary: { chance: 100, effect: 'Atk −1 (all opponents)' } },
    'power-whip':       { pp: 10 },
    'close-combat':     { pp: 5,  secondary: { chance: 100, effect: 'Def & SpDef −1 (user)' } },
    'superpower':       { pp: 5,  secondary: { chance: 100, effect: 'Atk & Def −1 (user)' } },
    'brave-bird':       { pp: 15 },
    'flare-blitz':      { pp: 15, secondary: { chance: 10, effect: 'Burn' } },
    'wild-charge':      { pp: 15 },
    'volt-tackle':      { pp: 15, secondary: { chance: 10, effect: 'Paralysis' } },
    'wood-hammer':      { pp: 15 },
    'earthquake':       { pp: 10 },
    'surf':             { pp: 15 },
    'hydro-pump':       { pp: 5 },
    'hurricane':        { pp: 10, secondary: { chance: 30, effect: 'Confusion' } },
    'moonblast':        { pp: 15, secondary: { chance: 30, effect: 'SpAtk −1' } },
    'dazzling-gleam':   { pp: 10 },
    'play-rough':       { pp: 10, secondary: { chance: 10, effect: 'Atk −1' } },
    'iron-defense':     { pp: 15 },
    'calm-mind':        { pp: 20 },
    'nasty-plot':       { pp: 20 },
    'swords-dance':     { pp: 20 },
    'quiver-dance':     { pp: 20 },
    'dragon-dance':     { pp: 20 },
    'shell-smash':      { pp: 15 },
    'bulk-up':          { pp: 20 },
    'trick-room':       { pp: 5 },
    'tailwind':         { pp: 15 },
    'spore':            { pp: 15, secondary: { chance: 100, effect: 'Sleep' } },
    'sleep-powder':     { pp: 15, secondary: { chance: 75, effect: 'Sleep' } },
    'will-o-wisp':      { pp: 15, secondary: { chance: 85, effect: 'Burn' } },
    'thunder-wave':     { pp: 20, secondary: { chance: 100, effect: 'Paralysis' } },
    'toxic':            { pp: 10, secondary: { chance: 100, effect: 'Bad Poison' } },
    // --- Moves with no secondary but common PP reference ---
    'protect':          { pp: 10 },
    'detect':           { pp: 5 },
    'follow-me':        { pp: 20 },
    'rage-powder':      { pp: 20 },
    'fake-out':         { pp: 10 },
    'u-turn':           { pp: 20 },
    'volt-switch':      { pp: 20 },
    'flip-turn':        { pp: 20 },
    'stealth-rock':     { pp: 20 },
    'rapid-spin':       { pp: 40 },
    'defog':            { pp: 15 },
    'recover':          { pp: 10 },
    'roost':            { pp: 10 },
    'slack-off':        { pp: 10 },
    'shore-up':         { pp: 10 },
    'morning-sun':      { pp: 5 },
    'moonlight':        { pp: 5 },
    'synthesis':        { pp: 5 },
    'wish':             { pp: 10 },
    // --- Damaging moves with secondary effects (Προσθήκη) ---
    
    // Status / Stat drops / Burns / Paralysis
    'sacred-fire':     { pp: 5,  secondary: { chance: 50, effect: 'Burn' } },
    'ice-punch':       { pp: 15, secondary: { chance: 10, effect: 'Freeze' } },
    'fire-punch':      { pp: 15, secondary: { chance: 10, effect: 'Burn' } },
    'thunder-punch':   { pp: 15, secondary: { chance: 10, effect: 'Paralysis' } },
    'secret-power':    { pp: 20, secondary: { chance: 30, effect: 'Environment-based status' } },
    'zap-cannon':      { pp: 5,  secondary: { chance: 100, effect: 'Paralysis' } },
    'signal-beam':     { pp: 15, secondary: { chance: 10, effect: 'Confusion' } },
    'confusion':       { pp: 25, secondary: { chance: 10, effect: 'Confusion' } },
    'psybeam':         { pp: 20, secondary: { chance: 10, effect: 'Confusion' } },
    'water-pulse':     { pp: 20, secondary: { chance: 20, effect: 'Confusion' } },
    'dizzy-punch':     { pp: 10, secondary: { chance: 20, effect: 'Confusion' } },
    'dynamic-punch':   { pp: 5,  secondary: { chance: 100, effect: 'Confusion' } },
    'hyper-voice':     { pp: 10 }, // (χωρίς secondary, αλλά καλό να υπάρχει αν χρειαστεί)
    
    // Stat Lowering (Attacker / Defender)
    'acid-spray':      { pp: 20, secondary: { chance: 100, effect: 'SpDef −2' } },
    'crunch':          { pp: 15, secondary: { chance: 20, effect: 'Def −1' } },
    'shadow-bone':     { pp: 10, secondary: { chance: 20, effect: 'Def −1' } },
    'liquidation':     { pp: 15, secondary: { chance: 20, effect: 'Def −1' } },
    'flash-cannon':    { pp: 10, secondary: { chance: 10, effect: 'SpDef −1' } },
    'mystical-fire':   { pp: 10, secondary: { chance: 100, effect: 'SpAtk −1' } },
    'moonblast':       { pp: 15, secondary: { chance: 30, effect: 'SpAtk −1' } },
    'snarl':           { pp: 15, secondary: { chance: 100, effect: 'SpAtk −1' } },
    'struggle-bug':    { pp: 20, secondary: { chance: 100, effect: 'SpAtk −1' } },
    'trop-kick':       { pp: 15, secondary: { chance: 100, effect: 'Atk −1' } },
    'spirit-break':    { pp: 15, secondary: { chance: 100, effect: 'SpAtk −1' } },
    'lunge':           { pp: 15, secondary: { chance: 100, effect: 'Atk −1' } },
    'fire-lash':       { pp: 15, secondary: { chance: 100, effect: 'Def −1' } },
    'meteor-mash':     { pp: 10, secondary: { chance: 20, effect: 'Atk +1 (user)' } },
    'charge-beam':     { pp: 10, secondary: { chance: 70, effect: 'SpAtk +1 (user)' } },
    'lumina-crash':    { pp: 10, secondary: { chance: 100, effect: 'SpDef −2' } },
    'torch-song':      { pp: 10, secondary: { chance: 100, effect: 'SpAtk +1 (user)' } },
    'aqua-step':       { pp: 10, secondary: { chance: 100, effect: 'Spe +1 (user)' } },
    'trailblaze':      { pp: 20, secondary: { chance: 100, effect: 'Spe +1 (user)' } },
    'esper-wing':      { pp: 10, secondary: { chance: 100, effect: 'Spe +1 (user)' } },
    
    // Flinch
    'dark-pulse':      { pp: 15, secondary: { chance: 20, effect: 'Flinch' } },
    'zen-headbutt':    { pp: 15, secondary: { chance: 20, effect: 'Flinch' } },
    'icicle-crash':    { pp: 10, secondary: { chance: 30, effect: 'Flinch' } },
    'heart-stamp':     { pp: 25, secondary: { chance: 30, effect: 'Flinch' } },
    'steamroller':     { pp: 20, secondary: { chance: 30, effect: 'Flinch' } },
    
    // Self / Target Stat Changes (Moves like Close Combat etc. already partially there)
    'leaf-storm':      { pp: 5,  secondary: { chance: 100, effect: 'SpAtk −2 (user)' } },
    'overheat':        { pp: 5,  secondary: { chance: 100, effect: 'SpAtk −2 (user)' } },
    'draco-meteor':    { pp: 5,  secondary: { chance: 100, effect: 'SpAtk −2 (user)' } },
    'psycho-boost':    { pp: 5,  secondary: { chance: 100, effect: 'SpAtk −2 (user)' } },
    'fleur-cannon':    { pp: 5,  secondary: { chance: 100, effect: 'SpAtk −2 (user)' } },
    'hammer-arm':      { pp: 10, secondary: { chance: 100, effect: 'Spe −1 (user)' } },
    'ice-hammer':      { pp: 10, secondary: { chance: 100, effect: 'Spe −1 (user)' } },
    'spin-out':        { pp: 5,  secondary: { chance: 100, effect: 'Spe −2 (user)' } },

    // --- Damaging moves with secondary effects (Φουρνίδα 2) ---

    // Burns, Freezes, Paralysis, Poison
    'secrets-ancient': { pp: 10, secondary: { chance: 30, effect: 'Burn' } }, // (π.χ. Searing Shot)
    'searing-shot':    { pp: 5,  secondary: { chance: 30, effect: 'Burn' } },
    'blue-flare':      { pp: 5,  secondary: { chance: 20, effect: 'Burn' } },
    'inferno':         { pp: 5,  secondary: { chance: 100, effect: 'Burn' } },
    'mist-ball':       { pp: 5,  secondary: { chance: 50, effect: 'SpAtk −1' } },
    'luster-purge':    { pp: 5,  secondary: { chance: 50, effect: 'SpDef −1' } },
    'freezing-glare':  { pp: 10, secondary: { chance: 10, effect: 'Confusion' } },
    'fiery-wrath':     { pp: 10, secondary: { chance: 20, effect: 'Flinch' } },
    'eerie-spell':     { pp: 5,  secondary: { chance: 30, effect: 'PP reduction' } },
    'bitter-malice':   { pp: 10, secondary: { chance: 100, effect: 'Frostbite / Atk −1' } },
    'infernal-parade': { pp: 15, secondary: { chance: 30, effect: 'Burn' } },

    // Poison & Status chances
    'poison-sting':    { pp: 35, secondary: { chance: 30, effect: 'Poison' } },
    'poison-tail':     { pp: 25, secondary: { chance: 10, effect: 'Poison' } },
    'poison-fang':     { pp: 15, secondary: { chance: 50, effect: 'Bad Poison' } },
    'dire-claw':       { pp: 15, secondary: { chance: 50, effect: 'Poison / Paralysis / Sleep' } },
    'mortal-spin':     { pp: 15, secondary: { chance: 100, effect: 'Poison (Removes hazards)' } },
    'malignant-chain': { pp: 5,  secondary: { chance: 30, effect: 'Bad Poison' } },
    'apple-acid':      { pp: 10, secondary: { chance: 100, effect: 'SpDef −1' } },
    'grav-apple':      { pp: 10, secondary: { chance: 100, effect: 'Def −1' } },

    // Stat changes on user (Self-buffs / Self-debuffs)
    'fiery-dance':     { pp: 10, secondary: { chance: 50, effect: 'SpAtk +1 (user)' } },
    'diamond-storm':   { pp: 5,  secondary: { chance: 50, effect: 'Def +2 (user)' } },
    'psyshield-bash':  { pp: 15, secondary: { chance: 100, effect: 'Def +1 (user)' } },
    'mystical-power':  { pp: 10, secondary: { chance: 100, effect: 'SpAtk +1 (user)' } },
    'order-up':        { pp: 10, secondary: { chance: 100, effect: 'Stat boost based on Commander' } },
    'flower-trick':    { pp: 10, secondary: { chance: 100, effect: 'Guaranteed Crit' } },
    
    // Flinches & Misc
    'rolling-kick':    { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'needle-arm':      { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'hyper-fang':      { pp: 15, secondary: { chance: 10, effect: 'Flinch' } },
    'bone-club':       { pp: 20, secondary: { chance: 10, effect: 'Flinch' } },
    'snarl':           { pp: 15, secondary: { chance: 100, effect: 'SpAtk −1' } },
    'rock-tomb':       { pp: 15, secondary: { chance: 100, effect: 'Spe −1' } },
    'bulldoze':        { pp: 20, secondary: { chance: 100, effect: 'Spe −1' } },
    'electroweb':      { pp: 15, secondary: { chance: 100, effect: 'Spe −1' } },
    'icy-wind':        { pp: 15, secondary: { chance: 100, effect: 'Spe −1' } },
    'low-sweep':       { pp: 20, secondary: { chance: 100, effect: 'Spe −1' } },
    'mud-shot':        { pp: 15, secondary: { chance: 100, effect: 'Spe −1' } },
    'octazooka':       { pp: 10, secondary: { chance: 50, effect: 'Accuracy −1' } },

    // --- Damaging moves with secondary effects (Φουρνίδα 3 - Ειδικές / Signature / Υπόλοιπες) ---

    // Special effects & Stat drops on opponent
    'shadow-punch':    { pp: 20 }, // (χωρίς secondary, αλλά καλό να υπάρχει)
    'geyser-steam':    { pp: 5 },  // (Hydro Steam / Steam Eruption)
    'steam-eruption':  { pp: 5,  secondary: { chance: 30, effect: 'Burn' } },
    'hydro-steam':     { pp: 15 },
    'glaciate':        { pp: 5,  secondary: { chance: 100, effect: 'Spe −1' } },
    'ice-burn':        { pp: 5,  secondary: { chance: 30, effect: 'Burn' } },
    'freeze-shock':    { pp: 5,  secondary: { chance: 30, effect: 'Paralysis' } },
    'reloc-song':      { pp: 15, secondary: { chance: 10, effect: 'Sleep (Relic Song)' } },
    'relic-song':      { pp: 15, secondary: { chance: 10, effect: 'Sleep' } },
    'secret-sword':    { pp: 10 },
    'psystrike':       { pp: 10 },
    'sacred-sword':    { pp: 15 }, // (Ignores stat changes)
    
    // Status / Chance effects
    'seed-flare':      { pp: 5,  secondary: { chance: 40, effect: 'SpDef −2' } },
    'crunch':          { pp: 15, secondary: { chance: 20, effect: 'Def −1' } },
    'psychic-fangs':   { pp: 15, secondary: { chance: 100, effect: 'Breaks Screens' } },
    'shell-side-arm':  { pp: 10, secondary: { chance: 20, effect: 'Poison (or physical/special switch)' } },
    'corrosive-gas':   { pp: 40 }, 
    'triple-axel':     { pp: 10 }, // Multi-hit with rising power
    'population-bomb': { pp: 10 }, // Multi-hit 1-10
    
    // Additional user self-buffs / lowering
    'meteor-assault':  { pp: 5,  secondary: { chance: 100, effect: 'Recharge turn' } },
    'gigaton-hammer':  { pp: 5,  secondary: { chance: 100, effect: 'Cannot use twice consecutively' } },
    'make-it-rain':    { pp: 5,  secondary: { chance: 100, effect: 'SpAtk −1 (user), gives money' } },
    'armor-cannon':    { pp: 5,  secondary: { chance: 100, effect: 'Def & SpDef −1 (user)' } },
    'bitter-blade':    { pp: 15, secondary: { chance: 100, effect: 'Drain 50%' } },
    'electro-shot':    { pp: 10, secondary: { chance: 100, effect: 'SpAtk +1 (user)' } },
    'meteor-beam':     { pp: 10, secondary: { chance: 100, effect: 'SpAtk +1 (user)' } },
    'esper-wing':      { pp: 10, secondary: { chance: 100, effect: 'Spe +1 (user), High Crit' } },
    'triple-arrows':   { pp: 10, secondary: { chance: 50, effect: 'Def −1 / Flinch / High Crit' } },

    // --- Damaging moves with secondary effects (Φουρνίδα 4) ---

    // Status / Stat drops / Secondary chances
    'heart-stamp':     { pp: 25, secondary: { chance: 30, effect: 'Flinch' } },
    'steamroller':     { pp: 20, secondary: { chance: 30, effect: 'Flinch' } },
    'secret-power':    { pp: 20, secondary: { chance: 30, effect: 'Terrain/Environment effect' } },
    'apple-acid':      { pp: 10, secondary: { chance: 100, effect: 'SpDef −1' } },
    'grav-apple':      { pp: 10, secondary: { chance: 100, effect: 'Def −1' } },
    'lunar-blessing':  { pp: 5 },  // (Status αλλά θεραπεύει/καθαρίζει status)
    'take-heart':      { pp: 10, secondary: { chance: 100, effect: 'Atk & SpAtk +1 (user), cures status' } },
    'matcha-gotcha':   { pp: 15, secondary: { chance: 20, effect: 'Burn' } },
    'syrup-bomb':      { pp: 10, secondary: { chance: 100, effect: 'Spe −1 (after 3 turns)' } },
    'barb-barrage':    { pp: 10, secondary: { chance: 50, effect: 'Poison (Double damage if poisoned)' } },
    'infernal-parade': { pp: 15, secondary: { chance: 30, effect: 'Burn (Double damage if stat-reduced)' } },
    'ceaseless-edge':  { pp: 15, secondary: { chance: 100, effect: 'Sets Spikes' } },
    'stone-axe':       { pp: 15, secondary: { chance: 100, effect: 'Sets Stealth Rock' } },
    'bitter-malice':   { pp: 10, secondary: { chance: 100, effect: 'Atk −1 (Double damage if frostbitten/status)' } },
    'chilling-water':  { pp: 20, secondary: { chance: 100, effect: 'Atk −1' } },
    'upper-hand':      { pp: 15, secondary: { chance: 100, effect: 'Flinches target if using priority move' } },
    'psychic-noise':   { pp: 10, secondary: { chance: 100, effect: 'Prevents healing' } },
    'alluring-voice':  { pp: 10, secondary: { chance: 100, effect: 'Confuses if target boosted stats this turn' } },
    'supercell-slam':  { pp: 15, secondary: { chance: 100, effect: 'Crash damage if missed' } },
    'burning-bulwark': { pp: 10, secondary: { chance: 100, effect: 'Burns attackers on contact (Protect variant)' } },
    'tachyon-cutter':  { pp: 20 }, // Multi-hit guaranteed hit
    'fickle-beam':     { pp: 5 },   // Chance to double power

    // --- Damaging moves with secondary effects (Φουρνίδα 5 - Τελευταία) ---

    // Special Status / Stat Drops / Flinches
    'snore':           { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'astonish':        { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'mud-slap':        { pp: 10, secondary: { chance: 100, effect: 'Accuracy −1' } },
    'constrict':       { pp: 35, secondary: { chance: 10, effect: 'Spe −1' } },
    'bubble':          { pp: 30, secondary: { chance: 10, effect: 'Spe −1' } },
    'bubble-beam':     { pp: 20, secondary: { chance: 10, effect: 'Spe −1' } },
    'aurora-beam':     { pp: 20, secondary: { chance: 10, effect: 'Atk −1' } },
    'silver-wind':     { pp: 5,  secondary: { chance: 10, effect: 'All stats +1 (user)' } },
    'ancient-power':   { pp: 5,  secondary: { chance: 10, effect: 'All stats +1 (user)' } },
    'ominous-wind':    { pp: 5,  secondary: { chance: 10, effect: 'All stats +1 (user)' } },
    'charge-beam':     { pp: 10, secondary: { chance: 70, effect: 'SpAtk +1 (user)' } },
    'meteor-mash':     { pp: 10, secondary: { chance: 20, effect: 'Atk +1 (user)' } },
    'shadow-punch':    { pp: 20 }, // (Bypasses accuracy checks)
    'swift':           { pp: 20 }, // (Bypasses accuracy checks)
    'magical-leaf':    { pp: 20 }, // (Bypasses accuracy checks)
    'shock-wave':      { pp: 20 }, // (Bypasses accuracy checks)
    'aerial-ace':      { pp: 20 }, // (Bypasses accuracy checks)
    'magnet-bomb':     { pp: 20 }, // (Bypasses accuracy checks)
    'smart-strike':    { pp: 20 }, // (Bypasses accuracy checks)
    'aura-sphere':     { pp: 20 }, // (Bypasses accuracy checks)
    'foul-play':       { pp: 15 }, // (Uses target's Attack stat)
    'psyshock':        { pp: 10 }, // (Calculates damage using target's Defense)
    'psyshelf-bash':   { pp: 15, secondary: { chance: 100, effect: 'Def +1 (user)' } },
    'synchronoise':    { pp: 15 }, 
    'trump-card':      { pp: 5 },
    'natural-gift':    { pp: 15 },
    'psywaves':        { pp: 15 },
    
    // Status & Recoil/Drain variations
    'bouncy-bubble':   { pp: 15, secondary: { chance: 100, effect: 'Drain 50%' } },
    'buzzy-buzz':      { pp: 15, secondary: { chance: 100, effect: 'Paralysis' } },
    'sizzly-slide':    { pp: 15, secondary: { chance: 100, effect: 'Burn' } },
    'glitzy-glow':     { pp: 15, secondary: { chance: 100, effect: 'Light Screen effect' } },
    'baddy-bad':       { pp: 15, secondary: { chance: 100, effect: 'Reflect effect' } },
    'freezy-frost':    { pp: 15, secondary: { chance: 100, effect: 'Removes stats changes' } },
    'sparkly-swirl':   { pp: 15, secondary: { chance: 100, effect: 'Cures team status' } },
    'veevve-volley':   { pp: 20 }, // (Veevee Volley - friendship power)
    'zippy-zap':       { pp: 15, secondary: { chance: 100, effect: 'Guaranteed Crit, Priority +2' } },

    // --- Damaging moves with secondary effects (Φουρνίδα 6) ---

    // Status / Stat drops / Flinches / Recoil variations
    'hyper-fang':      { pp: 15, secondary: { chance: 10, effect: 'Flinch' } },
    'rock-climb':      { pp: 20, secondary: { chance: 20, effect: 'Confusion' } },
    'zen-headbutt':    { pp: 15, secondary: { chance: 20, effect: 'Flinch' } },
    'water-pulse':     { pp: 20, secondary: { chance: 20, effect: 'Confusion' } },
    'signal-beam':     { pp: 15, secondary: { chance: 10, effect: 'Confusion' } },
    'snore':           { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'astonish':        { pp: 15, secondary: { chance: 30, effect: 'Flinch' } },
    'twister':         { pp: 20, secondary: { chance: 20, effect: 'Flinch (double damage in fly/bounce)' } },
    'rollout':         { pp: 20 }, // Power doubles each turn
    'ice-ball':        { pp: 20 }, // Power doubles each turn
    'smelling-salts':  { pp: 10 }, // Double damage if target is paralyzed
    'wake-up-slap':    { pp: 10 }, // Double damage if target is asleep
    'punishment':      { pp: 5 },  // Power increases with target's stat boosts
    'Payback':         { pp: 10 }, // Power doubles if user moves after target
    'assurance':       { pp: 10 }, // Power doubles if target took damage this turn
    'avalanche':       { pp: 10 }, // Power doubles if user took damage this turn
    'revenge':         { pp: 10 }, // Power doubles if user took damage this turn
    'smack-down':      { pp: 15, secondary: { chance: 100, effect: 'Removes grounding (Flying types fall)' } },
    'grav-apple':      { pp: 10, secondary: { chance: 100, effect: 'Def −1, sets gravity' } },
    'apple-acid':      { pp: 10, secondary: { chance: 100, effect: 'SpDef −1' } },
    'luminacrash':     { pp: 10, secondary: { chance: 100, effect: 'SpDef −2' } },
    'esper-wing':      { pp: 10, secondary: { chance: 100, effect: 'Spe +1 (user), High Crit' } },
    'triple-arrows':   { pp: 10, secondary: { chance: 50, effect: 'Def −1 / Flinch / High Crit' } },
    'collision-course':{ pp: 5 },  // 1.33x power if super-effective
    'electro-drift':   { pp: 5 },  // 1.33x power if super-effective
    'order-up':        { pp: 10, secondary: { chance: 100, effect: 'Stat boost based on Tatsugiri form' } },

    // --- Damaging moves with secondary effects (Φουρνίδα 7) ---

    // Fixed damage & Special mechanics
    'sonic-boom':      { pp: 20 }, // Deals fixed 20 damage
    'dragon-rage':     { pp: 10 }, // Deals fixed 40 damage
    'psywave':         { pp: 15 }, // Deals random fixed damage based on level
    'night-shade':     { pp: 15 }, // Deals damage equal to user's level
    'seismic-toss':    { pp: 20 }, // Deals damage equal to user's level
    'counter':         { pp: 20 }, // Returns physical damage ×2
    'mirror-coat':     { pp: 20 }, // Returns special damage ×2
    'metal-burst':     { pp: 10 }, // Returns damage taken ×1.5
    'bide':            { pp: 10 }, // Stores damage for 2 turns and returns ×2

    // Status / Stat drops / Weather / Terrain damage moves
    'weather-ball':    { pp: 10 }, // Changes type and power based on weather
    'terrain-pulse':   { pp: 10 }, // Changes type and power based on terrain
    'secret-power':    { pp: 20, secondary: { chance: 30, effect: 'Environment-based status' } },
    'techno-blast':    { pp: 5 },  // Changes type based on Drive item
    'multi-attack':    { pp: 10 }, // Changes type based on Memory item
    'judgment':        { pp: 10 }, // Changes type based on Plate item
    'revelation-dance':{ pp: 15 }, // Matches user's primary type
    'aura-wheel':      { pp: 10, secondary: { chance: 100, effect: 'Speed +1 (user), type depends on form' } },
    'plasma-fists':    { pp: 15, secondary: { chance: 100, effect: 'Turns normal moves into electric for the turn' } },
    
    // Additional secondary effects & Status chances
    'freezy-frost':    { pp: 15, secondary: { chance: 100, effect: 'Removes all stat changes on field' } },
    'bally-hoo':       { pp: 10 }, 
    'core-enforcer':   { pp: 10, secondary: { chance: 100, effect: 'Neutralizes target\'s ability if target moved first' } },
    'burn-up':         { pp: 5,  secondary: { chance: 100, effect: 'Removes user\'s Fire type' } },
    'double-shock':    { pp: 5,  secondary: { chance: 100, effect: 'Removes user\'s Electric type' } },
    'octolock':        { pp: 15, secondary: { chance: 100, effect: 'Prevents switching and lowers Def/SpDef each turn' } },
    'tar-shot':        { pp: 15, secondary: { chance: 100, effect: 'Lowers Speed and makes target weak to Fire' } },
    'No-retreat':      { pp: 5 },  // Raises all stats +1, prevents switching
    'shell-trap':      { pp: 15 }, // Explodes if hit by physical move this turn
    'beak-blast':      { pp: 15, secondary: { chance: 100, effect: 'Burns attackers using contact moves before hit' } },
    'electro-ball':    { pp: 10 }, // Power depends on user's speed vs target's speed
    'gyro-ball':       { pp: 5 },  // Power depends on user's speed vs target's speed
    'heavy-slam':      { pp: 10 }, // Power depends on user's weight vs target's weight
    'heat-crash':      { pp: 10 },  // Power depends on user's weight vs target's weight

    // --- Damaging moves with secondary effects (Φουρνίδα 8) ---

    // Special mechanics, variable power, and status additions
    'present':         { pp: 15 }, // Random damage or healing
    'magnitude':       { pp: 30 }, // Random power earthquake variant (magnitude 4-10)
    'psywaves':        { pp: 15 }, // Random damage variant
    'trump-card':      { pp: 5 },  // Power increases as PP decreases
    'wring-out':       { pp: 5 },  // Power depends on target's remaining HP
    'crush-grip':      { pp: 5 },  // Power depends on target's remaining HP
    'spit-up':         { pp: 10 }, // Power depends on Stockpile count
    'present-box':     { pp: 15 }, 
    'grass-knot':      { pp: 20 }, // Power depends on target's weight
    'low-kick':        { pp: 20 }, // Power depends on target's weight
    'electro-ball':    { pp: 10 }, // Power depends on speed ratio
    'gyro-ball':       { pp: 5 },  // Power depends on speed ratio
    'stored-power':    { pp: 10 }, // Power increases with user's positive stat boosts
    'power-trip':      { pp: 10 }, // Power increases with user's positive stat boosts
    'punishment':      { pp: 5 },  // Power increases with target's positive stat boosts
    'hex':             { pp: 10 }, // Double damage if target has a status condition
    'venoshock':       { pp: 10 }, // Double damage if target is poisoned
    'smelling-salts':  { pp: 10 }, // Double damage if target is paralyzed
    'wake-up-slap':    { pp: 10 }, // Double damage if target is asleep
    'barb-barrage':    { pp: 10, secondary: { chance: 50, effect: 'Poison (Double damage if poisoned)' } },
    'infernal-parade': { pp: 15, secondary: { chance: 30, effect: 'Burn (Double damage if stat-reduced)' } },
    'bitter-malice':   { pp: 10, secondary: { chance: 100, effect: 'Atk −1 (Double damage if stat-reduced)' } },
    'retaliate':       { pp: 5 },  // Double damage if an ally fainted last turn
    'assurance':       { pp: 10 }, // Double damage if target already took damage this turn
    'avalanche':       { pp: 10 }, // Double damage if user took damage from target this turn
    'revenge':         { pp: 10 }, // Double damage if user took damage from target this turn
    'facade':          { pp: 20 }, // Double damage if user is burned, poisoned, or paralyzed
    'brine':           { pp: 10 }, // Double damage if target's HP is below 50%
    'weather-ball':    { pp: 10 }, // Doubles power and changes type during weather
    'terrain-pulse':   { pp: 10 }, // Doubles power and changes type on terrain
    'expanding-force': { pp: 10 },  // Hits all opponents and boosts power in Psychic Terrain

    // --- Damaging moves with secondary effects (Φουρνίδα 9 - Το Τελικό "Ξεκαθάρισμα") ---

    // 9th Gen & DLC Moves (Teal Mask / Indigo Disk)
    'blood-moon':      { pp: 5 },  // Cannot be used twice in a row
    'matcha-gotcha':   { pp: 15, secondary: { chance: 20, effect: 'Burn' } }, // (Drain + Burn chance)
    'syrup-bomb':      { pp: 10, secondary: { chance: 100, effect: 'Spe −1 after 3 turns' } },
    'ivy-cudgel':      { pp: 10, secondary: { chance: 100, effect: 'High Crit (Type changes with Ogerpon mask)' } },
    'electro-shot':    { pp: 10, secondary: { chance: 100, effect: 'SpAtk +1 (charges on turn 1 in rain)' } },
    'tera-starstorm':  { pp: 5 },  // Hits all opponents, changes if user is Terapagos-Stellar
    'fickle-beam':     { pp: 5 },  // 30% chance to double damage
    'malignant-chain': { pp: 5,  secondary: { chance: 30, effect: 'Bad Poison' } },
    'tachyon-cutter':  { pp: 20 }, // Hits twice, never misses
    'hard-press':      { pp: 10 }, // Damage depends on target's remaining HP percentage
    'dragon-cheer':    { pp: 15 }, // Status (raises ally's crit stage)
    'burning-bulwark': { pp: 10, secondary: { chance: 100, effect: 'Protects and burns on contact' } },
    'mighty-cleave':   { pp: 5 },  // Bypasses protection moves (Protect, Detect)

    // Older Niche & Delayed / Conditional Damage Moves
    'future-sight':    { pp: 10 }, // Deals typeless damage 2 turns later
    'doom-desire':     { pp: 5 },  // Deals steel damage 2 turns later
    'psyshock':        { pp: 10 }, // Uses target's Defense instead of SpDef
    'psystrike':       { pp: 10 }, // Uses target's Defense instead of SpDef
    'secret-sword':    { pp: 10 }, // Physical move that deals Special damage (uses user's Atk against target's Def)
    'photon-geyser':   { pp: 5 },  // Uses whichever stat (Atk or SpAtk) is higher
    'light-of-ruin':   { pp: 5,  secondary: { chance: 100, effect: 'Recoil 50%' } },
    'hyperspace-fury': { pp: 5,  secondary: { chance: 100, effect: 'Def −1 (user), bypasses protection' } },
    'hyperspace-hole': { pp: 5 },  // Bypasses protection moves
    'phantom-force':   { pp: 10 }, // Bypasses protection moves (two-turn)
    'shadow-force':    { pp: 5 },  // Bypasses protection moves (two-turn)
    'upper-hand':      { pp: 15, secondary: { chance: 100, effect: 'Flinches target if they are using a priority move' } }

};
