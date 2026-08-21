// --- move-evolutions.js ---
const EVOLUTION_EXTENSIONS = {

  "2": { base: "1", extra: ["roar"] },

  "3": { 
    base: "2", 
    extra: [
      "block", "bulldoze", "earth-power", "earthquake", "frenzy-plant", 
      "giga-impact", "hyper-beam", "petal-blizzard", "poison-jab", 
      "rock-climb", "stomping-tantrum", "terrain-pulse"
    ] 
  },


  // --- Charmander Line ---
  "5": { 
    base: "4", 
    extra: [] // Το Charmeleon έχει ακριβώς τις ίδιες ή υποσύνολο, άρα μηδέν extra
  },

  "6": { 
    base: "5", 
    extra: [
      "air-slash", "blast-burn", "blaze-kick", "brutal-swing", "bulldoze", 
      "defog", "dragon-cheer", "dragon-claw", "dual-wingbeat", "earthquake", 
      "fissure", "fly", "giga-impact", "heat-crash", "hurricane", "hyper-beam", 
      "mystical-fire", "ominous-wind", "roost", "sandstorm", "scale-shot", 
      "scorching-sands", "sky-drop", "steel-wing"
    ] 
  },


  // --- Squirtle Line ---
  "8": { 
    base: "7", 
    extra: [] // Το Wartortle δεν προσθέτει κάτι ξεχωριστό σε σχέση με το Squirtle στη λίστα σου
  },

  "9": { 
    base: "8", 
    extra: [
      "avalanche", "body-press", "bulldoze", "dark-pulse", "earthquake", 
      "fissure", "flash-cannon", "giga-impact", "hydro-cannon", "hyper-beam", 
      "roar", "rock-climb", "smack-down"
    ] 
  },


  // --- Caterpie / Weedle Lines (Metapod, Kakuna) ---
  "11": { 
    base: "10", 
    extra: ["harden", "iron-defense"] 
  },

  "14": { 
    base: "13", 
    extra: ["harden", "iron-defense"] 
  },


  // --- Pidgey Line ---
  "17": { 
    base: "16", 
    extra: ["refresh"] 
  },

  "18": { 
    base: "17", 
    extra: ["giga-impact", "hyper-beam", "laser-focus"] 
  },


  // --- Rattata Line ---
  "20": { 
    base: "19", 
    extra: [
      "giga-impact", "hyper-beam", "refresh", "roar", "scary-face", 
      "stomping-tantrum", "strength", "swords-dance", "throat-chop"
    ] 
  },


// --- Spearow Line ---
"22": { 
  base: "21", 
  extra: ["giga-impact", "hyper-beam", "laser-focus", "throat-chop"] 
},


  // --- Ekans Line ---
  "24": { 
    base: "23", 
    extra: ["breaking-swipe", "dragon-tail", "giga-impact", "hyper-beam", "ice-fang", "pain-split", "refresh", "stomping-tantrum", "thunder-fang"] 
  },


  // --- Pikachu Line ---
  "26": { 
    base: "25", 
    extra: ["brutal-swing", "fake-out", "focus-blast", "giga-impact", "hyper-beam", "safeguard", "speed-swap"] 
  },


  // --- Sandshrew Line ---
  "28": { 
    base: "27", 
    extra: ["drill-run", "focus-blast", "giga-impact", "gunk-shot", "pin-missile"] 
  },


  // --- Nidoran♀ Line ---
  "30": { 
    base: "29", 
    extra: ["bubble-beam", "horn-drill", "stomping-tantrum", "water-gun"] 
  },

  "31": { 
    base: "30", 
    extra: ["aqua-tail", "avalanche", "body-press", "brick-break", "bubble-beam", "bulldoze", "dragon-pulse", "dragon-tail", "drill-run", "dynamic-punch", "earthquake", "fire-blast", "fire-punch", "fissure", "flamethrower", "fling", "focus-blast", "focus-punch", "fury-cutter", "giga-impact", "hex", "high-horsepower", "ice-beam", "ice-punch", "icy-wind", "incinerate", "mega-kick", "mega-punch", "mud-shot", "outrage", "pay-day", "power-up-punch", "quash", "rock-blast", "rock-climb", "rock-slide", "rock-tomb", "sandstorm", "sand-tomb", "scorching-sands", "shadow-ball", "shadow-claw", "shock-wave", "sludge-wave", "smack-down", "stealth-rock", "stone-edge", "submission", "superpower", "surf", "taunt", "throat-chop", "thunder", "thunderbolt", "thunder-punch", "torment", "waterfall", "water-pulse", "whirlpool"] 
  },


  // --- Nidoran♂ Line ---
  "33": { 
    base: "32", 
    extra: ["bubble-beam", "stomping-tantrum", "water-gun"] 
  },

  "34": { 
    base: "33", 
    extra: ["aqua-tail", "avalanche", "body-press", "brick-break", "bubble-beam", "bulldoze", "chip-away", "dragon-pulse", "dragon-tail", "drill-run", "dynamic-punch", "earth-power", "earthquake", "fire-blast", "fire-punch", "fissure", "flamethrower", "fling", "focus-blast", "focus-energy", "focus-punch", "fury-cutter", "giga-impact", "hex", "high-horsepower", "horn-attack", "megahorn", "mega-kick", "mega-punch", "mud-shot", "outrage", "pay-day", "peck", "power-up-punch", "quash", "rock-blast", "rock-climb", "rock-slide", "rock-tomb", "sandstorm", "sand-tomb", "scorching-sands", "seismic-toss", "shadow-ball", "shadow-claw", "shock-wave", "sludge-wave", "smack-down", "smart-strike", "stealth-rock", "stone-edge", "submission", "superpower", "surf", "taunt", "thrash", "throat-chop", "thunder", "thunderbolt", "thunder-punch", "torment", "waterfall", "water-pulse", "whirlpool"] 
  },


  // --- Clefairy Line ---
  "36": { 
    base: "35", 
    extra: ["focus-blast", "future-sight", "giga-impact", "hyper-beam", "laser-focus", "minimize"] 
  },


  // --- Vulpix Line ---
  "38": { 
    base: "37", 
    extra: ["calm-mind", "dream-eater", "fake-tears", "giga-impact", "hyper-beam", "laser-focus", "night-shade", "psyshock", "scorching-sands", "solar-beam"] 
  },


  // --- Jigglypuff Line ---
  "40": { 
    base: "39", 
    extra: ["expanding-force", "focus-blast", "giga-impact", "hyper-beam", "laser-focus", "magic-room", "minimize"] 
  },


  // --- Zubat Line ---
  "42": { 
    base: "41", 
    extra: ["giga-impact", "hyper-beam", "screech"] 
  },


  // --- Oddish Line ---
  "44": { 
    base: "43", 
    extra: ["drain-punch", "fling", "petal-blizzard", "pollen-puff"] 
  },

  "45": { 
    base: "44", 
    extra: ["aromatherapy", "body-slam", "corrosive-gas", "giga-impact", "hyper-beam", "safeguard", "sludge-wave", "solar-blade", "weather-ball"] 
  },


  // --- Paras Line ---
  "47": { 
    base: "46", 
    extra: ["giga-impact", "hyper-beam", "throat-chop"] 
  },


  // --- Venonat Line ---
  "49": { 
    base: "48", 
    extra: ["acrobatics", "air-cutter", "air-slash", "defog", "dream-eater", "giga-impact", "gust", "hyper-beam", "ominous-wind", "refresh", "roost", "silver-wind", "sludge-wave", "tailwind", "teleport", "twister", "u-turn"] 
  },


// --- Diglett Line ---
  "51": { 
    base: "50", 
    extra: ["giga-impact", "high-horsepower", "hyper-beam", "night-slash", "rototiller", "sludge-wave", "tri-attack"] 
  },


  // --- Meowth Line ---
  "53": { 
    base: "52", 
    extra: ["giga-impact", "giga-quick", "hyper-beam", "roar", "skitter-smack", "switcheroo"] 
  },


  // --- Psyduck Line ---
  "55": { 
    base: "54", 
    extra: ["aqua-jet", "charm", "focus-blast", "giga-impact", "hyper-beam", "laser-focus", "me-first", "power-gem", "rock-climb"] 
  },


  // --- Mankey Line ---
  "57": { 
    base: "56", 
    extra: ["giga-impact", "hyper-beam", "rage-fist", "stealth-rock"] 
  },


  // --- Growlithe Line ---
  "59": { 
    base: "58", 
    extra: ["dragon-pulse", "extreme-speed", "giga-impact", "heat-crash", "hyper-beam", "hyper-voice", "iron-head", "rock-climb", "solar-beam", "superpower", "teleport"] 
  },


  // --- Poliwag Line ---
  "61": { 
    base: "60", 
    extra: ["brick-break", "counter", "earthquake", "fissure", "fling", "low-sweep", "mega-kick", "mega-punch", "metronome", "power-up-punch", "rock-smash", "seismic-toss", "strength", "submission"] 
  },

  "62": { 
    base: "61", 
    extra: ["baton-pass", "bulk-up", "circle-throw", "close-combat", "coaching", "darkest-lariat", "drain-punch", "dual-chop", "giga-impact", "high-horsepower", "hyper-beam", "knock-off", "payback", "poison-jab", "reversal", "rock-climb", "rock-slide", "rock-tomb", "scary-face", "superpower", "throat-chop", "upper-hand"] 
  },


  // --- Abra Line ---
  "64": { 
    base: "63", 
    extra: ["dig", "disable", "expanding-force", "future-sight", "hypnosis", "kinesis", "miracle-eye", "psybeam", "psycho-cut", "recover"] 
  },

  "65": { 
    base: "64", 
    extra: ["focus-blast", "giga-impact", "hyper-beam", "imprison", "laser-focus", "nasty-plot", "stored-power"] 
  },


  // --- Machop Line ---
  "67": { 
    base: "66", 
    extra: ["stomping-tantrum"] 
  },

  "68": { 
    base: "67", 
    extra: ["assurance", "cross-poison", "darkest-lariat", "giga-impact", "high-horsepower", "hyper-beam", "throat-chop", "wide-guard"] 
  },


  // --- Bellsprout Line ---
  "70": { 
    base: "69", 
    extra: ["body-slam", "bug-bite", "morning-sun", "swift"] 
  },

  "71": { 
    base: "70", 
    extra: ["giga-impact", "hyper-beam", "leaf-blade", "leaf-tornado", "scary-face", "spit-up", "stockpile", "swallow"] 
  },


  // --- Tentacool Line ---
  "73": { 
    base: "72", 
    extra: ["corrosive-gas", "giga-impact", "hyper-beam", "reflect-type", "scary-face", "skitter-smack", "venom-drench"] 
  },


  // --- Geodude Line ---
  "75": { 
    base: "74", 
    extra: ["body-press", "focus-blast", "hard-press", "heavy-slam", "iron-head"] 
  },

  "76": { 
    base: "75", 
    extra: ["fury-cutter", "giga-impact", "hyper-beam", "roar", "steamroller"] 
  },


  // --- Ponyta Line ---
  "78": { 
    base: "77", 
    extra: ["drill-run", "fury-attack", "giga-impact", "hyper-beam", "megahorn", "pay-day", "poison-jab", "scorching-sands", "smart-strike", "swords-dance", "throat-chop"] 
  },



// --- Magnemite Line ---
  "82": { 
    base: "81", 
    extra: ["giga-impact", "hyper-beam", "refresh", "tri-attack"] 
  },


  // --- Doduo Line ---
  "85": { 
    base: "84", 
    extra: ["drill-run", "giga-impact", "hyper-beam", "payback", "pounce", "scary-face", "stomping-tantrum", "taunt", "torment", "trailblaze"] 
  },


  // --- Seel Line ---
  "87": { 
    base: "86", 
    extra: ["alluring-voice", "endeavor", "frost-breath", "giga-impact", "hyper-beam", "knock-off", "liquidation", "play-rough", "sheer-cold"] 
  },


  // --- Grimer Line ---
  "89": { 
    base: "88", 
    extra: ["block", "brick-break", "dark-pulse", "focus-blast", "focus-punch", "giga-drain", "giga-impact", "hyper-beam", "knock-off", "lash-out", "lunge", "moonblast", "spite", "swift", "toxic-spikes", "venom-drench"] 
  },


  // --- Shellder Line ---
  "91": { 
    base: "90", 
    extra: ["body-slam", "drill-run", "frost-breath", "giga-impact", "hyper-beam", "icicle-crash", "light-screen", "pin-missile", "poison-jab", "scary-face", "signal-beam", "smart-strike", "spike-cannon", "steel-roller", "torment"] 
  },


  // --- Gastly Line ---
  "93": { 
    base: "92", 
    extra: ["encore", "fling", "focus-blast", "metronome", "phantom-force", "shadow-claw", "shadow-punch", "toxic-spikes"] 
  },

  "94": { 
    base: "93", 
    extra: ["body-slam", "brick-break", "counter", "disable", "double-edge", "drain-punch", "dynamic-punch", "giga-impact", "hyper-beam", "laser-focus", "mega-kick", "mega-punch", "power-up-punch", "psychic-noise", "rock-smash", "role-play", "seismic-toss", "skull-bash", "strength", "submission", "take-down", "thunder-wave"] 
  },


  // --- Onix Line ---
  "95": { 
    base: "80", // Προσοχή: Το Onix (95) παίρνει από το Slowbro (80) ή βάλε το σωστό base ID σου αν είναι διαφορετικό
    extra: ["body-press", "breaking-swipe", "brutal-swing", "dragon-breath", "dragon-dance", "dragon-pulse", "dragon-tail", "drill-run", "earth-power", "flash-cannon", "head-smash", "heavy-slam", "iron-head", "meteor-beam", "rock-polish", "rock-throw", "rototiller", "slam", "stealth-rock", "taunt", "twister", "wide-guard"] 
  },


  // --- Drowzee Line ---
  "97": { 
    base: "96", 
    extra: ["giga-impact", "hex", "hyper-beam", "scary-face", "switcheroo"] 
  },


  // --- Krabby Line ---
  "99": { 
    base: "98", 
    extra: ["brutal-swing", "giga-impact", "high-horsepower", "hydro-pump", "hyper-beam", "quash", "stomping-tantrum", "wide-guard"] 
  },


  // --- Voltorb Line ---
  "101": { 
    base: "100", 
    extra: ["giga-impact", "hyper-beam", "magnetic-flux", "scary-face", "skull-bash", "supercell-slam", "telekinesis"] 
  },


  // --- Exeggcute Line ---
  "103": { 
    base: "102", 
    extra: ["body-slam", "bulldoze", "calm-mind", "earthquake", "expanding-force", "future-sight", "giga-impact", "hyper-beam", "low-kick", "magical-leaf", "power-whip", "refresh", "stomp", "stomping-tantrum", "terrain-pulse", "wood-hammer"] 
  },


  // --- Cubone Line ---
  "105": { 
    base: "104", 
    extra: ["focus-blast", "giga-impact", "hyper-beam", "laser-focus", "sing", "throat-chop"] 
  },


 

  // --- Koffing Line ---
  "110": { 
    base: "109", 
    extra: ["double-hit", "giga-impact", "heat-wave", "hyper-beam"] 
  },


// --- Rhyhorn Line ---
  "112": { 
    base: "111", 
    extra: ["avalanche", "block", "breaking-swipe", "brick-break", "brutal-swing", "bubble-beam", "cut", "dragon-tail", "dynamic-punch", "fire-punch", "fling", "focus-blast", "focus-punch", "fury-cutter", "hammer-arm", "heat-crash", "helping-hand", "hydro-pump", "hyper-beam", "ice-punch", "iron-defense", "mega-kick", "mega-punch", "meteor-beam", "outrage", "pay-day", "power-up-punch", "seismic-toss", "shadow-claw", "submission", "surf", "thunder-punch", "water-gun", "whirlpool"] 
  },


  // --- Horsea Line ---
  "117": { 
    base: "116", 
    extra: ["giga-impact", "hyper-beam", "scary-face", "snowscape"] 
  },


  // --- Goldeen Line ---
  "119": { 
    base: "118", 
    extra: ["giga-impact", "hyper-beam"] 
  },


  // --- Staryu Line ---
  "121": { 
    base: "120", 
    extra: ["agility", "ally-switch", "avalanche", "dream-eater", "expanding-force", "giga-impact", "grass-knot", "hyper-beam", "meteor-beam", "nightmare", "psycho-cut", "psyshock", "refresh", "skill-swap", "spotlight", "telekinesis", "trick", "trick-room", "wonder-room"] 
  },


  // --- Magikarp Line ---
  "130": { 
    base: "129", 
    extra: ["aqua-tail", "attract", "avalanche", "bide", "bind", "bite", "blizzard", "body-slam", "brine", "brutal-swing", "bubble-beam", "bulldoze", "captivate", "chilling-water", "confide", "crunch", "curse", "dark-pulse", "dive", "double-edge", "double-team", "dragon-breath", "dragon-cheer", "dragon-dance", "dragon-pulse", "dragon-rage", "dragon-tail", "earthquake", "endeavor", "endure", "facade", "fire-blast", "flamethrower", "focus-energy", "frustration", "giga-impact", "hail", "headbutt", "helping-hand", "hidden-power", "hurricane", "hydro-pump", "hyper-beam", "ice-beam", "ice-fang", "icy-wind", "incinerate", "iron-head", "iron-tail", "lash-out", "leer", "mimic", "muddy-water", "natural-gift", "outrage", "payback", "power-whip", "protect", "rage", "rain-dance", "reflect", "rest", "return", "roar", "rock-smash", "round", "sandstorm", "scald", "scale-shot", "scary-face", "secret-power", "skull-bash", "sleep-talk", "snore", "spite", "stone-edge", "strength", "substitute", "sunny-day", "surf", "swagger", "take-down", "taunt", "temper-flare", "tera-blast", "thrash", "thunder", "thunderbolt", "thunder-wave", "torment", "toxic", "twister", "uproar", "waterfall", "water-gun", "water-pulse", "whirlpool", "zap-cannon"] 
  },


  // --- Eevee Line ---
  "134": { 
    base: "133", 
    extra: ["acid-armor", "aqua-ring", "aqua-tail", "aurora-beam", "blizzard", "brine", "bubble", "bubble-beam", "chilling-water", "dive", "flip-turn", "giga-impact", "hail", "haze", "hydro-pump", "hyper-beam", "ice-beam", "icy-wind", "liquidation", "mist", "muddy-water", "rock-smash", "scald", "signal-beam", "strength", "surf", "waterfall", "water-gun", "water-pulse", "whirlpool"] 
  },

  "135": { 
    base: "133", 
    extra: ["agility", "charge", "charge-beam", "discharge", "eerie-impulse", "electric-terrain", "electro-ball", "electroweb", "false-swipe", "flash", "giga-impact", "hyper-beam", "light-screen", "magnet-rise", "metal-sound", "pin-missile", "rising-voltage", "rock-smash", "shock-wave", "signal-beam", "strength", "thunder", "thunderbolt", "thunder-fang", "thunder-shock", "thunder-wave", "volt-switch", "wild-charge", "zap-cannon"] 
  },

  "136": { 
    base: "133", 
    extra: ["burning-jealousy", "ember", "endeavor", "fire-blast", "fire-fang", "fire-spin", "flame-charge", "flamethrower", "flare-blitz", "giga-impact", "heat-wave", "hyper-beam", "incinerate", "lava-plume", "leer", "mystical-fire", "overheat", "scary-face", "scorching-sands", "smog", "strength", "superpower", "temper-flare", "will-o-wisp"] 
  },


  // --- Omanyte Line ---
  "139": { 
    base: "138", 
    extra: ["crunch", "giga-impact", "horn-drill", "hyper-beam", "liquidation", "pin-missile", "rock-climb", "seismic-toss", "skull-bash", "stone-edge", "submission"] 
  },


// --- Kabuto Line ---
  "141": { 
    base: "140", 
    extra: ["aqua-tail", "brick-break", "cross-poison", "cut", "dive", "feint", "flip-turn", "fury-cutter", "giga-impact", "hyper-beam", "low-kick", "mega-kick", "nature-power", "night-slash", "psycho-cut", "razor-shell", "razor-wind", "rock-climb", "seismic-toss", "skull-bash", "submission", "superpower", "swords-dance", "x-scissor"] 
  },


  // --- Dratini Line ---
  "148": { 
    base: "147", 
    extra: ["horn-drill", "weather-ball"] 
  },

  "149": { 
    base: "148", 
    extra: ["acrobatics", "aerial-ace", "air-cutter", "air-slash", "body-press", "brick-break", "bulldoze", "cut", "defog", "dive", "dragon-claw", "dual-wingbeat", "dynamic-punch", "encore", "fire-punch", "fling", "fly", "focus-blast", "focus-punch", "fury-cutter", "heal-bell", "heat-wave", "hone-claws", "hurricane", "ice-punch", "ice-spinner", "low-kick", "mega-kick", "mega-punch", "metronome", "mud-slap", "ominous-wind", "power-up-punch", "razor-wind", "roar", "rock-slide", "rock-smash", "rock-tomb", "roost", "sandstorm", "scary-face", "sky-drop", "snowscape", "steel-wing", "stomping-tantrum", "stone-edge", "strength", "superpower", "tailwind", "thunder-punch", "wing-attack"] 
  },


  // --- Chikorita Line ---
  "153": { 
    base: "152", 
    extra: ["knock-off", "laser-focus", "rock-smash", "stomping-tantrum", "strength"] 
  },

  "154": { 
    base: "153", 
    extra: ["body-press", "bulldoze", "dragon-tail", "earthquake", "endeavor", "frenzy-plant", "giga-impact", "hyper-beam", "outrage", "petal-blizzard", "petal-dance", "rock-climb", "weather-ball", "zen-headbutt"] 
  },


  // --- Cyndaquil Line ---
  "156": { 
    base: "155", 
    extra: ["brick-break", "endeavor", "focus-punch", "fury-cutter", "rock-smash", "strength"] 
  },

  "157": { 
    base: "156", 
    extra: ["blast-burn", "bulldoze", "calm-mind", "counter", "dynamic-punch", "fire-punch", "fling", "focus-blast", "giga-impact", "gyro-ball", "hex", "hyper-beam", "laser-focus", "low-kick", "mega-kick", "mega-punch", "night-shade", "poltergeist", "power-up-punch", "rock-climb", "rock-slide", "rock-tomb", "scorching-sands", "seismic-toss", "shadow-ball", "shadow-claw", "solar-beam", "spite", "stomping-tantrum", "throat-chop", "thunder-punch"] 
  },


  // --- Totodile Line ---
  "159": { 
    base: "158", 
    extra: ["fury-cutter", "roar", "rock-smash", "strength"] 
  },

  "160": { 
    base: "159", 
    extra: ["agility", "avalanche", "bulldoze", "dragon-pulse", "dragon-tail", "earthquake", "focus-blast", "giga-impact", "hydro-cannon", "hyper-beam", "lash-out", "outrage", "rock-climb", "scale-shot", "snarl", "stomping-tantrum"] 
  },


  // --- Sentret Line ---
  "162": { 
    base: "161", 
    extra: ["agility", "coil", "focus-blast", "giga-impact", "hyper-beam", "rock-smash", "strength", "zen-headbutt"] 
  },


  // --- Hoothoot Line ---
  "164": { 
    base: "163", 
    extra: ["body-slam", "future-sight", "giga-impact", "hyper-beam", "laser-focus", "psychic-noise"] 
  },


  // --- Ledyba Line ---
  "166": { 
    base: "165", 
    extra: ["defog", "focus-blast", "giga-impact", "hyper-beam", "rock-smash", "strength"] 
  },


  // --- Spinarak Line ---
  "168": { 
    base: "167", 
    extra: ["fell-stinger", "focus-energy", "giga-impact", "hyper-beam", "smart-strike", "stomping-tantrum", "swords-dance", "throat-chop", "venom-drench"] 
  },


// --- Chinchou Line ---
  "171": { 
    base: "170", 
    extra: ["giga-impact", "hyper-beam", "spit-up", "spotlight", "stockpile", "swallow"] 
  },


  // --- Togepi Line ---
  "176": { 
    base: "175", 
    extra: ["air-cutter", "air-slash", "brick-break", "defog", "drain-punch", "dual-wingbeat", "fly", "focus-punch", "giga-impact", "heat-wave", "hyper-beam", "imprison", "magical-leaf", "ominous-wind", "retaliate", "roost", "silver-wind", "sky-attack", "smart-strike", "steel-wing", "tailwind", "twister"] 
  },


  // --- Natu Line ---
  "178": { 
    base: "177", 
    extra: ["defog", "fly", "giga-impact", "hyper-beam"] 
  },


  // --- Mareep Line ---
  "180": { 
    base: "179", 
    extra: ["brick-break", "counter", "dynamic-punch", "fire-punch", "fling", "focus-punch", "ice-punch", "low-kick", "mega-kick", "mega-punch", "power-up-punch", "roar", "rock-smash", "seismic-toss", "strength"] 
  },

  "181": { 
    base: "180", 
    extra: ["breaking-swipe", "brutal-swing", "bulldoze", "dragon-cheer", "dragon-pulse", "dragon-tail", "giga-impact", "hyper-beam", "ion-deluge", "laser-focus", "magnetic-flux", "meteor-beam", "outrage", "rock-climb", "stomping-tantrum", "supercell-slam"] 
  },


  // --- Marill Line ---
  "184": { 
    base: "183", 
    extra: ["giga-impact", "hyper-beam"] 
  },


  // --- Hoppip Line ---
  "188": { 
    base: "187", 
    extra: ["endeavor"] 
  },

  "189": { 
    base: "188", 
    extra: ["giga-impact", "hyper-beam"] 
  },


  // --- Sunkern Line ---
  "192": { 
    base: "191", 
    extra: ["dazzling-gleam", "giga-impact", "hyper-beam", "petal-blizzard", "petal-dance", "pound"] 
  },


  // --- Wooper Line ---
  "195": { 
    base: "194", 
    extra: ["body-press", "brick-break", "drain-punch", "focus-blast", "focus-punch", "giga-impact", "high-horsepower", "hyper-beam", "mega-kick", "mega-punch", "thief", "toxic-spikes"] 
  },

  
// --- Pineco Line ---
  "205": { 
    base: "204", 
    extra: ["ally-switch", "block", "body-press", "earth-power", "flash-cannon", "giga-impact", "hard-press", "heavy-slam", "hyper-beam", "iron-head", "laser-focus", "magnet-rise", "metal-sound", "mirror-shot", "rock-polish", "smart-strike", "steel-beam", "stone-edge", "telekinesis", "thunder-wave", "volt-switch", "zap-cannon"] 
  },


  // --- Snubbull Line ---
  "210": { 
    base: "209", 
    extra: ["focus-blast", "giga-impact", "hyper-beam", "iron-tail", "low-sweep", "outrage", "rock-climb", "rock-slide", "rock-tomb", "stone-edge"] 
  },


  // --- Slugma Line ---
  "219": { 
    base: "218", 
    extra: ["burning-jealousy", "explosion", "flare-blitz", "giga-impact", "gyro-ball", "hyper-beam", "refresh", "rock-polish", "sand-tomb", "scorching-sands", "shell-smash", "solar-beam", "stomping-tantrum", "strength"] 
  },


  // --- Remoraid Line ---
  "224": { 
    base: "223", 
    extra: ["bind", "constrict", "energy-ball", "flash-cannon", "giga-impact", "liquidation", "payback", "seismic-toss", "skitter-smack", "sludge-bomb", "sludge-wave", "wrap", "wring-out"] 
  },


  // --- Houndour Line ---
  "229": { 
    base: "228", 
    extra: ["endeavor", "giga-impact", "hyper-beam", "laser-focus", "strength", "throat-chop"] 
  },


  // --- Tyrogue Line (Hitmonlee, Hitmonchan, Hitmontop) ---
  "106": { 
    base: "236", 
    extra: ["aura-sphere", "axe-kick", "blaze-kick", "bounce", "close-combat", "coaching", "double-kick", "dynamic-punch", "focus-blast", "focus-punch", "giga-impact", "high-jump-kick", "jump-kick", "knock-off", "laser-focus", "mach-punch", "mega-kick", "mega-punch", "mind-reader", "poison-jab", "power-up-punch", "rapid-spin", "revenge", "reversal", "rock-climb", "rock-slide", "rock-smash", "rock-tomb", "role-play", "rolling-kick", "scary-face", "seismic-toss", "skull-bash", "stomping-tantrum", "stone-edge", "strength", "submission", "sucker-punch", "superpower", "swords-dance", "taunt", "throat-chop", "upper-hand", "uproar", "vacuum-wave", "wide-guard"] 
  },

  "107": { 
    base: "236", 
    extra: ["agility", "aura-sphere", "baton-pass", "close-combat", "coaching", "comet-punch", "dizzy-punch", "drain-punch", "dynamic-punch", "encore", "fire-punch", "fling", "focus-blast", "focus-punch", "giga-impact", "ice-punch", "knock-off", "laser-focus", "mach-punch", "mega-kick", "mega-punch", "mind-reader", "poison-jab", "power-up-punch", "pursuit", "quick-guard", "rapid-spin", "revenge", "reversal", "rock-climb", "rock-slide", "rock-smash", "rock-tomb", "role-play", "scary-face", "seismic-toss", "skull-bash", "sky-uppercut", "stone-edge", "strength", "submission", "swords-dance", "taunt", "throat-chop", "thunder-punch", "trailblaze", "upper-hand", "uproar", "vacuum-wave"] 
  },

  "237": { 
    base: "236", 
    extra: ["aerial-ace", "agility", "baton-pass", "brutal-swing", "close-combat", "coaching", "dig", "drill-run", "endeavor", "focus-blast", "giga-impact", "gyro-ball", "ice-spinner", "laser-focus", "mach-punch", "mega-kick", "mega-punch", "pursuit", "quick-attack", "quick-guard", "rapid-spin", "revenge", "reversal", "rock-slide", "rock-smash", "role-play", "rolling-kick", "rollout", "sandstorm", "seismic-toss", "stone-edge", "strength", "sucker-punch", "triple-axel", "triple-kick", "twister", "upper-hand", "uproar", "vacuum-wave", "wide-guard"] 
  },


  // --- Phanpy Line ---
  "232": { 
    base: "231", 
    extra: ["assurance", "block", "body-press", "bounce", "brutal-swing", "fire-fang", "fury-attack", "giga-impact", "gyro-ball", "horn-attack", "hyper-beam", "ice-fang", "ice-spinner", "iron-defense", "magnitude", "poison-jab", "rapid-spin", "rock-polish", "smart-strike", "throat-chop", "thunder-fang"] 
  },


  // --- Larvitar Line ---
  "247": { 
    base: "246", 
    extra: ["high-horsepower", "lash-out"] 
  },

  "248": { 
    base: "247", 
    extra: ["aerial-ace", "aqua-tail", "avalanche", "blizzard", "block", "body-press", "breaking-swipe", "brutal-swing", "counter", "cut", "dragon-breath", "dragon-claw", "dragon-pulse", "dragon-tail", "dynamic-punch", "fire-blast", "fire-fang", "fire-punch", "flamethrower", "fling", "focus-blast", "focus-punch", "foul-play", "fury-cutter", "hard-press", "heavy-slam", "hone-claws", "hydro-pump", "ice-beam", "ice-fang", "ice-punch", "icy-wind", "incinerate", "knock-off", "low-kick", "mega-kick", "mega-punch", "nightmare", "power-gem", "revenge", "roar", "rock-climb", "seismic-toss", "shadow-claw", "shock-wave", "strength", "surf", "thunder", "thunderbolt", "thunder-fang", "thunder-punch", "thunder-wave", "water-pulse", "whirlpool"] 
  },


  // --- Treecko Line ---
  "253": { 
    base: "252", 
    extra: ["false-swipe", "leaf-blade", "low-sweep", "vacuum-wave", "x-scissor"] 
  },

  "254": { 
    base: "253", 
    extra: ["brutal-swing", "bulldoze", "cross-poison", "dragon-cheer", "dragon-claw", "dragon-dance", "dragon-pulse", "dual-chop", "earthquake", "focus-blast", "frenzy-plant", "giga-impact", "hone-claws", "hyper-beam", "laser-focus", "outrage", "roar", "rock-climb", "scale-shot", "shed-tail", "throat-chop"] 
  },


  // --- Torchic Line ---
  "256": { 
    base: "255", 
    extra: ["blaze-kick", "brick-break", "bulk-up", "close-combat", "coaching", "dual-chop", "dynamic-punch", "fire-punch", "fling", "focus-blast", "focus-punch", "fury-cutter", "poison-jab", "power-up-punch", "revenge", "sky-uppercut", "thunder-punch", "vacuum-wave"] 
  },

  "257": { 
    base: "256", 
    extra: ["acrobatics", "aura-sphere", "blast-burn", "brave-bird", "bulldoze", "earthquake", "giga-impact", "heat-crash", "high-jump-kick", "hyper-beam", "knock-off", "laser-focus", "roar", "rock-climb", "role-play", "scorching-sands", "solar-beam", "stone-edge", "superpower", "u-turn"] 
  },


  // --- Mudkip Line ---
  "259": { 
    base: "258", 
    extra: ["brick-break", "bulldoze", "dynamic-punch", "earthquake", "fling", "focus-punch", "ice-punch", "mega-kick", "mega-punch", "power-up-punch", "sand-tomb", "seismic-toss", "stealth-rock"] 
  },

  "260": { 
    base: "259", 
    extra: ["body-press", "bulk-up", "darkest-lariat", "flip-turn", "focus-blast", "giga-impact", "hammer-arm", "hard-press", "high-horsepower", "hydro-cannon", "hyper-beam", "knock-off", "outrage", "poison-jab", "rock-climb", "scary-face", "smack-down", "stomping-tantrum", "stone-edge", "weather-ball"] 
  },


  // --- Poochyena Line ---
  "262": { 
    base: "261", 
    extra: ["giga-impact", "hyper-beam", "laser-focus", "strength", "throat-chop"] 
  },


  // --- Zigzagoon Line ---
  "264": { 
    base: "263", 
    extra: ["fury-swipes", "giga-impact", "hyper-beam", "play-rough", "roar", "rototiller", "shadow-claw", "slash", "stomping-tantrum", "strength", "switcheroo", "throat-chop"] 
  },


  // --- Wurmple Lines ---
  "266": { 
    base: "265", 
    extra: ["harden", "iron-defense"] 
  },

  "267": { 
    base: "266", 
    extra: ["absorb", "acrobatics", "aerial-ace", "air-cutter", "air-slash", "attract", "bug-buzz", "captivate", "confide", "defog", "double-edge", "double-team", "endure", "energy-ball", "facade", "flash", "frustration", "giga-drain", "giga-impact", "gust", "hidden-power", "hyper-beam", "infestation", "laser-focus", "leech-life", "mega-drain", "mimic", "morning-sun", "natural-gift", "ominous-wind", "protect", "psychic", "quiver-dance", "rage", "rest", "return", "roost", "round", "safeguard", "secret-power", "shadow-ball", "signal-beam", "silver-wind", "sleep-talk", "solar-beam", "struggle-bug", "stun-spore", "substitute", "sunny-day", "swagger", "swift", "tailwind", "thief", "toxic", "twister", "u-turn", "venoshock", "whirlwind"] 
  },

  "268": { 
    base: "265", 
    extra: ["harden", "iron-defense"] 
  },

  "269": { 
    base: "268", 
    extra: ["acrobatics", "aerial-ace", "air-cutter", "attract", "bug-buzz", "captivate", "confide", "confusion", "defog", "double-edge", "double-team", "endure", "energy-ball", "extrasensory", "facade", "flash", "frustration", "giga-drain", "giga-impact", "gust", "hidden-power", "hyper-beam", "infestation", "laser-focus", "leech-life", "light-screen", "mimic", "moonlight", "natural-gift", "ominous-wind", "poison-powder", "protect", "psybeam", "psychic", "quiver-dance", "rest", "return", "roost", "round", "secret-power", "shadow-ball", "signal-beam", "silver-wind", "sleep-talk", "sludge-bomb", "solar-beam", "struggle-bug", "substitute", "sunny-day", "swagger", "swift", "tailwind", "thief", "toxic", "twister", "u-turn", "venoshock", "whirlwind"] 
  },


  // --- Lotad Line ---
  "271": { 
    base: "270", 
    extra: ["brick-break", "dive", "drain-punch", "dynamic-punch", "encore", "fake-out", "fire-punch", "fling", "fury-swipes", "hone-claws", "hydro-pump", "hyper-voice", "ice-punch", "knock-off", "mega-kick", "mega-punch", "metronome", "mud-shot", "mud-slap", "power-up-punch", "rock-smash", "strength", "thunder-punch", "waterfall", "water-sport"] 
  },

  "272": { 
    base: "271", 
    extra: ["amnesia", "focus-blast", "focus-punch", "giga-impact", "hyper-beam", "ice-spinner", "leaf-storm", "rock-climb", "seismic-toss", "swift"] 
  },


  // --- Seedot Line ---
  "274": { 
    base: "273", 
    extra: ["air-cutter", "assurance", "brick-break", "cut", "dark-pulse", "embargo", "extrasensory", "fake-out", "feint-attack", "fling", "fury-cutter", "knock-off", "lash-out", "leaf-blade", "low-kick", "low-sweep", "mega-kick", "pound", "rock-slide", "rock-tomb", "scary-face", "snarl", "solar-blade", "strength", "swift", "thief", "torment", "uproar", "weather-ball"] 
  },

  "275": { 
    base: "274", 
    extra: ["aerial-ace", "air-slash", "bounce", "brutal-swing", "confuse-ray", "focus-blast", "giga-impact", "heat-wave", "hex", "hurricane", "hyper-beam", "icy-wind", "imprison", "leaf-tornado", "ominous-wind", "petal-blizzard", "revenge", "reversal", "screech", "taunt", "throat-chop", "toxic-spikes", "twister", "upper-hand", "vacuum-wave", "whirlwind", "will-o-wisp", "x-scissor"] 
  },


  // --- Taillow Line ---
  "277": { 
    base: "276", 
    extra: ["baton-pass", "giga-impact", "hyper-beam", "laser-focus"] 
  },


  // --- Wingull Line ---
  "279": { 
    base: "278", 
    extra: ["body-slam", "fling", "giga-impact", "gunk-shot", "hyper-beam", "payback", "seed-bomb", "sky-drop", "spit-up", "stockpile", "swallow", "weather-ball"] 
  },


  // --- Surskit Line ---
  "284": { 
    base: "283", 
    extra: ["aerial-ace", "air-cutter", "air-slash", "defog", "dual-wingbeat", "energy-ball", "foul-play", "giga-impact", "gust", "hurricane", "hyper-beam", "nightmare", "ominous-wind", "quiver-dance", "roost", "scary-face", "silver-wind", "stun-spore", "twister", "u-turn", "weather-ball", "whirlwind"] 
  },


  // --- Shroomish Line ---
  "286": { 
    base: "285", 
    extra: ["aerial-ace", "brick-break", "bulk-up", "bulldoze", "close-combat", "counter", "cut", "dig", "dynamic-punch", "feint", "fling", "focus-blast", "force-palm", "fury-cutter", "giga-impact", "hyper-beam", "iron-tail", "laser-focus", "leaf-storm", "low-kick", "low-sweep", "mach-punch", "mega-kick", "mega-punch", "mind-reader", "mud-shot", "mud-slap", "poison-jab", "power-up-punch", "retaliate", "reversal", "rock-slide", "rock-smash", "rock-tomb", "seismic-toss", "sky-uppercut", "stone-edge", "strength", "superpower", "thunder-punch", "vacuum-wave", "work-up"] 
  },


  // --- Slakoth Line ---
  "288": { 
    base: "287", 
    extra: ["bulldoze", "dig", "drain-punch", "earthquake", "endeavor", "focus-blast", "focus-energy", "fury-swipes", "hyper-voice", "knock-off", "lash-out", "low-kick", "low-sweep", "outrage", "roar", "rock-climb", "scary-face", "stomping-tantrum", "taunt", "trailblaze", "uproar"] 
  },

  "289": { 
    base: "288", 
    extra: ["block", "body-press", "giga-impact", "hard-press", "heavy-slam", "hyper-beam", "pounce", "punishment", "quash", "wild-charge"] 
  },


  // --- Nincada Line ---
  "291": { 
    base: "290", 
    extra: ["acrobatics", "agility", "air-cutter", "air-slash", "baton-pass", "defog", "dual-wingbeat", "giga-impact", "hyper-beam", "laser-focus", "ominous-wind", "roost", "screech", "slash", "swift", "swords-dance", "thief", "uproar", "u-turn"] 
  },

  "292": { 
    base: "290", 
    extra: ["agility", "ally-switch", "confuse-ray", "dream-eater", "giga-impact", "grudge", "heal-block", "hex", "hyper-beam", "nightmare", "phantom-force", "poltergeist", "shadow-claw", "shadow-sneak", "sucker-punch", "telekinesis", "thief", "trick", "will-o-wisp"] 
  },


  // --- Whismur Line ---
  "294": { 
    base: "293", 
    extra: ["bite", "brick-break", "bulldoze", "earthquake", "low-kick", "overheat", "power-up-punch", "rock-slide", "rock-smash", "rock-tomb", "smack-down", "stomping-tantrum", "strength", "taunt", "torment"] 
  },

  "295": { 
    base: "294", 
    extra: ["avalanche", "boomburst", "crunch", "fire-fang", "focus-blast", "giga-impact", "hydro-pump", "hyper-beam", "ice-fang", "outrage", "rock-climb", "surf", "terrain-pulse", "thunder-fang", "whirlpool"] 
  },


  // --- Makuhita Line ---
  "297": { 
    base: "296", 
    extra: ["brine", "giga-impact", "headlong-rush", "hyper-beam", "iron-head", "lash-out", "payback", "scary-face", "throat-chop"] 
  },


  // --- Skitty Line ---
  "301": { 
    base: "300", 
    extra: ["giga-impact", "hyper-beam", "laser-focus", "rock-smash", "stomping-tantrum", "strength", "sweet-kiss"] 
  },


  // --- Aron Line ---
  "305": { 
    base: "304", 
    extra: ["rock-blast", "sand-tomb", "stomping-tantrum"] 
  },

  "306": { 
    base: "305", 
    extra: ["aqua-tail", "avalanche", "blizzard", "block", "brick-break", "brutal-swing", "counter", "crunch", "dark-pulse", "dragon-claw", "dragon-pulse", "dragon-tail", "dynamic-punch", "fire-blast", "fire-punch", "flamethrower", "fling", "focus-blast", "focus-punch", "giga-impact", "high-horsepower", "hydro-pump", "hyper-beam", "ice-beam", "ice-punch", "icy-wind", "incinerate", "low-kick", "mega-kick", "mega-punch", "meteor-beam", "outrage", "payback", "power-up-punch", "rock-climb", "scary-face", "seismic-toss", "shadow-claw", "smack-down", "smart-strike", "solar-beam", "surf", "taunt", "thunder", "thunderbolt", "thunder-punch", "thunder-wave", "whirlpool"] 
  },


  // --- Meditite Line ---
  "308": { 
    base: "307", 
    extra: ["aura-sphere", "axe-kick", "energy-ball", "giga-impact", "hyper-beam", "laser-focus"] 
  },


  // --- Electrike Line ---
  "310": { 
    base: "309", 
    extra: ["electric-terrain", "giga-impact", "hyper-beam", "hyper-voice", "laser-focus", "overheat", "refresh", "scary-face"] 
  },


  // --- Gulpin Line ---
  "317": { 
    base: "316", 
    extra: ["block", "body-press", "brick-break", "bulldoze", "earthquake", "giga-impact", "hyper-beam", "knock-off"] 
  },


  // --- Carvanha Line ---
  "319": { 
    base: "318", 
    extra: ["bulldoze", "close-combat", "earthquake", "feint", "giga-impact", "hyper-beam", "night-slash", "poison-jab", "roar", "rock-smash", "rock-tomb", "skull-bash", "slash", "strength", "taunt"] 
  },


  // --- Wailmer Line ---
  "321": { 
    base: "320", 
    extra: ["block", "giga-impact", "hyper-beam", "iron-head", "liquidation", "noble-roar"] 
  },


  // --- Numel Line ---
  "323": { 
    base: "322", 
    extra: ["eruption", "explosion", "fissure", "giga-impact", "hyper-beam", "rock-polish", "self-destruct", "smack-down", "solar-beam"] 
  },


  // --- Spoink Line ---
  "326": { 
    base: "325", 
    extra: ["belch", "body-press", "brick-break", "bulldoze", "counter", "dig", "drain-punch", "dynamic-punch", "earth-power", "fire-punch", "fling", "focus-blast", "focus-punch", "giga-impact", "hyper-beam", "hyper-voice", "ice-punch", "laser-focus", "low-kick", "low-sweep", "mega-kick", "mega-punch", "metronome", "mud-shot", "nasty-plot", "power-up-punch", "seed-bomb", "seismic-toss", "stomping-tantrum", "teeter-dance", "thunder-punch"] 
  },


  // --- Trapinch Line ---
  "329": { 
    base: "328", 
    extra: ["aerial-ace", "air-cutter", "air-slash", "boomburst", "bug-buzz", "defog", "draco-meteor", "dragon-breath", "dragon-claw", "dragon-pulse", "dragon-rush", "dragon-tail", "dual-wingbeat", "fly", "giga-impact", "heat-wave", "outrage", "roost", "sand-attack", "screech", "silver-wind", "sonic-boom", "steel-wing", "supersonic", "swift", "tailwind", "throat-chop", "twister", "uproar", "u-turn"] 
  },

  "330": { 
    base: "329", 
    extra: ["alluring-voice", "breaking-swipe", "brutal-swing", "dragon-cheer", "dragon-dance", "fire-blast", "fire-punch", "fire-spin", "flamethrower", "helping-hand", "hone-claws", "iron-tail", "mega-kick", "mega-punch", "power-up-punch", "psychic-noise", "scale-shot", "thunder-punch", "vacuum-wave"] 
  },


  // --- Cacnea Line ---
  "332": { 
    base: "331", 
    extra: ["embargo", "focus-blast", "giga-impact", "hyper-beam", "knock-off", "lash-out", "lunge", "mega-kick", "retaliate", "revenge", "shadow-ball", "spiky-shield", "stomping-tantrum", "strength", "superpower", "taunt", "zen-headbutt"] 
  },


  // --- Swablu Line ---
  "334": { 
    base: "333", 
    extra: ["alluring-voice", "breaking-swipe", "bulldoze", "draco-meteor", "dragon-claw", "dragon-dance", "earthquake", "fire-blast", "fire-spin", "flamethrower", "giga-impact", "hone-claws", "hyper-beam", "incinerate", "iron-tail", "roar", "rock-smash", "snowscape", "weather-ball", "will-o-wisp", "wonder-room"] 
  },


  // --- Barboach Line ---
  "340": { 
    base: "339", 
    extra: ["belch", "body-slam", "curse", "giga-impact", "hyper-beam", "rock-smash", "sand-tomb", "scary-face", "spikes", "strength", "tickle", "uproar", "weather-ball"] 
  },


  // --- Corphish Line ---
  "342": { 
    base: "341", 
    extra: ["avalanche", "close-combat", "dark-pulse", "dive", "giga-impact", "hard-press", "hyper-beam", "lash-out", "nasty-plot", "nature-power", "retaliate", "revenge", "scary-face", "sludge-wave", "snarl", "swift"] 
  },


  // --- Baltoy Line ---
  "344": { 
    base: "343", 
    extra: ["body-press", "future-sight", "giga-impact", "hyper-beam", "iron-defense", "nasty-plot", "rock-smash", "stone-edge", "stored-power", "strength", "teleport"] 
  },


  // --- Lileep Line ---
  "346": { 
    base: "345", 
    extra: ["block", "bulldoze", "dig", "earthquake", "giga-impact", "grassy-terrain", "headbutt", "hyper-beam", "leech-seed", "power-whip", "rock-smash", "sludge-wave", "stone-edge", "strength"] 
  },


  // --- Anorith Line ---
  "348": { 
    base: "347", 
    extra: ["aqua-tail", "block", "brutal-swing", "bulldoze", "earthquake", "flash-cannon", "giga-impact", "hyper-beam", "iron-tail", "liquidation", "low-kick", "seismic-toss", "shadow-claw", "stomping-tantrum", "stone-edge", "strength", "superpower"] 
  },


  // --- Feebas Line ---
  "350": { 
    base: "349", 
    extra: ["alluring-voice", "aqua-ring", "aqua-tail", "avalanche", "bind", "body-slam", "breaking-swipe", "brutal-swing", "bulldoze", "coil", "disarming-voice", "dragon-cheer", "dragon-dance", "dragon-tail", "draining-kiss", "flip-turn", "giga-impact", "helping-hand", "hydro-pump", "hyper-beam", "imprison", "iron-head", "laser-focus", "life-dew", "magic-coat", "mud-slap", "psych-up", "recover", "refresh", "safeguard", "skitter-smack", "take-down", "triple-axel", "twister", "water-gun", "water-sport", "weather-ball", "wrap"] 
  },


  // --- Shuppet Line ---
  "354": { 
    base: "353", 
    extra: ["burning-jealousy", "fling", "giga-impact", "hyper-beam", "infestation", "shadow-claw", "swords-dance", "throat-chop", "trailblaze"] 
  },


  // --- Duskull Line ---
  "356": { 
    base: "355", 
    extra: ["bind", "brick-break", "bulldoze", "counter", "dynamic-punch", "earthquake", "fire-punch", "focus-punch", "giga-impact", "hyper-beam", "ice-punch", "mega-kick", "mega-punch", "metronome", "mud-slap", "power-up-punch", "rock-slide", "rock-smash", "rock-tomb", "seismic-toss", "shadow-punch", "strength", "thunder-punch"] 
  },


  // --- Snorunt Line ---
  "362": { 
    base: "361", 
    extra: ["bulldoze", "dark-pulse", "defense-curl", "earthquake", "explosion", "foul-play", "freeze-dry", "giga-impact", "gyro-ball", "hyper-beam", "ice-ball", "iron-head", "laser-focus", "payback", "scary-face", "self-destruct", "sheer-cold", "signal-beam", "steel-roller", "super-fang", "taunt", "torment"] 
  },


  // --- Spheal Line ---
  "364": { 
    base: "363", 
    extra: ["icicle-spear", "roar"] 
  },

  "365": { 
    base: "364", 
    extra: ["avalanche", "block", "body-press", "crunch", "fury-cutter", "giga-impact", "heavy-slam", "hydro-pump", "hyper-beam", "ice-fang", "iron-head", "stomping-tantrum", "swords-dance"] 
  },


  // --- Clamperl Split Evolutions (Huntail & Gorebyss) ---
  "367": { 
    base: "366", 
    extra: ["aqua-tail", "baton-pass", "bind", "bite", "bounce", "coil", "crunch", "feint-attack", "giga-impact", "hydro-pump", "hyper-beam", "ice-fang", "infestation", "mud-slap", "rock-tomb", "scary-face", "screech", "snatch", "sucker-punch", "super-fang", "swift"] 
  },

  "368": { 
    base: "366", 
    extra: ["agility", "amnesia", "aqua-tail", "baton-pass", "bind", "bounce", "coil", "confusion", "draining-kiss", "giga-impact", "hydro-pump", "hyper-beam", "infestation", "mud-slap", "psychic", "psych-up", "safeguard", "shadow-ball", "signal-beam", "swift", "water-sport"] 
  },


// --- Bagon Line ---
  "372": { 
    base: "371", 
    extra: ["rollout", "temper-flare"] 
  },

  "373": { 
    base: "372", 
    extra: ["air-cutter", "air-slash", "aqua-tail", "breaking-swipe", "brutal-swing", "bulldoze", "defog", "dual-wingbeat", "earthquake", "fly", "giga-impact", "heat-wave", "hurricane", "hyper-beam", "iron-tail", "laser-focus", "ominous-wind", "psychic-fangs", "refresh", "roost", "steel-wing", "stone-edge", "swift", "tailwind"] 
  },


  // --- Beldum Line ---
  "375": { 
    base: "374", 
    extra: ["aerial-ace", "agility", "ally-switch", "body-slam", "brick-break", "bulldoze", "bullet-punch", "confide", "confusion", "cosmic-power", "cut", "defense-curl", "double-edge", "double-team", "dynamic-punch", "earthquake", "endure", "expanding-force", "explosion", "facade", "flash", "flash-cannon", "focus-punch", "frustration", "fury-cutter", "future-sight", "giga-impact", "grass-knot", "gravity", "gyro-ball", "hard-press", "heavy-slam", "hidden-power", "hone-claws", "hyper-beam", "ice-punch", "icy-wind", "light-screen", "magnet-rise", "metal-claw", "meteor-beam", "meteor-mash", "mimic", "miracle-eye", "mud-slap", "natural-gift", "power-up-punch", "protect", "psychic", "psychic-noise", "psycho-cut", "psych-up", "psyshock", "pursuit", "rain-dance", "reflect", "rest", "return", "rock-polish", "rock-slide", "rock-smash", "rock-tomb", "rollout", "round", "sandstorm", "scary-face", "secret-power", "self-destruct", "shadow-ball", "signal-beam", "sleep-talk", "sludge-bomb", "snore", "stealth-rock", "steel-roller", "strength", "substitute", "sunny-day", "swagger", "swift", "telekinesis", "thunder-punch", "toxic", "trailblaze", "trick"] 
  },

  "376": { 
    base: "375", 
    extra: ["block", "body-press", "brutal-swing", "hammer-arm", "knock-off", "laser-focus", "psychic-fangs", "shadow-claw", "stomping-tantrum", "stone-edge"] 
  },


  // --- Turtwig Line ---
  "388": { 
    base: "387", 
    extra: [] // Ίδια set ή υποσύνολο με το Turtwig βάσει του πίνακα
  },

  "389": { 
    base: "388", 
    extra: ["block", "body-press", "earthquake", "frenzy-plant", "giga-impact", "headlong-rush", "high-horsepower", "hyper-beam", "hyper-voice", "iron-defense", "outrage", "rock-blast", "rock-polish", "sandstorm", "scary-face", "scorching-sands", "stone-edge", "wood-hammer"] 
  },


  // --- Chimchar Line ---
  "391": { 
    base: "390", 
    extra: ["close-combat", "drain-punch", "dual-chop", "feint", "lash-out", "mach-punch", "retaliate", "reversal", "smack-down", "upper-hand"] 
  },

  "392": { 
    base: "391", 
    extra: ["aura-sphere", "blast-burn", "bulldoze", "calm-mind", "coaching", "earthquake", "giga-impact", "hyper-beam", "laser-focus", "punishment", "raging-fury", "roar", "scary-face", "scorching-sands", "solar-beam", "stone-edge", "throat-chop"] 
  },


  // --- Piplup Line ---
  "394": { 
    base: "393", 
    extra: ["hone-claws", "metal-claw", "rock-smash", "shadow-claw", "strength"] 
  },

  "395": { 
    base: "394", 
    extra: ["air-cutter", "air-slash", "aqua-jet", "avalanche", "bulldoze", "cut", "dual-wingbeat", "earthquake", "false-swipe", "flash-cannon", "fury-cutter", "giga-impact", "hydro-cannon", "hyper-beam", "iron-defense", "laser-focus", "lash-out", "metal-sound", "roar", "rock-climb", "rock-slide", "scary-face", "steel-beam", "steel-wing", "throat-chop", "uproar", "vacuum-wave", "wave-crash"] 
  },


  // --- Starly Line ---
  "397": { 
    base: "396", 
    extra: ["retaliate"] 
  },

  "398": { 
    base: "397", 
    extra: ["close-combat", "hyper-beam", "laser-focus", "sky-attack", "struggle-bug"] 
  },


  // --- Bidoof Line ---
  "400": { 
    base: "399", 
    extra: ["aqua-jet", "bulldoze", "dive", "fling", "focus-punch", "giga-impact", "hyper-beam", "liquidation", "rototiller", "scald", "stomping-tantrum", "strength", "surf", "waterfall", "water-gun"] 
  },


  // --- Kricketot Line ---
  "402": { 
    base: "401", 
    extra: ["aerial-ace", "attract", "baton-pass", "brick-break", "bug-buzz", "captivate", "confide", "cut", "double-team", "echoed-voice", "endure", "facade", "false-swipe", "fell-stinger", "flash", "focus-energy", "frustration", "fury-cutter", "giga-drain", "giga-impact", "heal-bell", "helping-hand", "hidden-power", "hone-claws", "hyper-beam", "hyper-voice", "infestation", "knock-off", "laser-focus", "leech-life", "natural-gift", "night-slash", "perish-song", "pounce", "power-up-punch", "protect", "rain-dance", "rest", "return", "rock-smash", "round", "screech", "secret-power", "silver-wind", "sing", "slash", "sleep-talk", "sticky-web", "strength", "substitute", "sunny-day", "swagger", "swords-dance", "take-down", "taunt", "throat-chop", "toxic", "trailblaze", "x-scissor"] 
  },


  // --- Shinx Line ---
  "404": { 
    base: "403", 
    extra: [] // Ίδιο ακριβώς moveset με βάση τη λίστα
  },

  "405": { 
    base: "404", 
    extra: ["agility", "giga-impact", "hyper-beam", "laser-focus", "supercell-slam", "superpower", "throat-chop"] 
  },


  // --- Cranidos Line ---
  "409": { 
    base: "408", 
    extra: ["avalanche", "body-press", "breaking-swipe", "brick-break", "cut", "dragon-claw", "dragon-tail", "focus-blast", "giga-impact", "heavy-slam", "hyper-beam", "laser-focus", "outrage", "pain-split", "surf", "supercell-slam", "whirlpool"] 
  },


  // --- Shieldon Line ---
  "411": { 
    base: "410", 
    extra: ["avalanche", "block", "body-press", "foul-play", "giga-impact", "hyper-beam", "magic-coat", "meteor-beam", "outrage", "reflect", "reversal"] 
  },


  // --- Burmy Lines ---
  "413": { 
    base: "412", 
    extra: ["ally-switch", "attract", "bug-buzz", "bullet-seed", "captivate", "confide", "confusion", "dig", "double-team", "dream-eater", "endeavor", "endure", "energy-ball", "facade", "flail", "flash", "frustration", "giga-drain", "giga-impact", "grass-knot", "growth", "gust", "hyper-beam", "infestation", "leaf-storm", "magical-leaf", "natural-gift", "psybeam", "psychic", "psych-up", "quiver-dance", "rain-dance", "razor-leaf", "rest", "return", "round", "safeguard", "secret-power", "seed-bomb", "shadow-ball", "signal-beam", "silver-wind", "skill-swap", "sleep-talk", "solar-beam", "substitute", "sucker-punch", "sunny-day", "swagger", "synthesis", "telekinesis", "thief", "toxic", "uproar", "venoshock", "worry-seed"] 
  },

  "414": { 
    base: "412", 
    extra: ["acrobatics", "aerial-ace", "air-cutter", "air-slash", "attract", "bug-buzz", "camouflage", "captivate", "confide", "confusion", "defog", "double-team", "dream-eater", "endure", "energy-ball", "facade", "flash", "frustration", "giga-drain", "giga-impact", "gust", "hyper-beam", "infestation", "lunge", "mud-slap", "natural-gift", "ominous-wind", "poison-powder", "psybeam", "psychic", "psych-up", "quiver-dance", "rain-dance", "rest", "return", "roost", "round", "safeguard", "secret-power", "shadow-ball", "signal-beam", "silver-wind", "skill-swap", "sleep-talk", "solar-beam", "substitute", "sunny-day", "swagger", "swift", "tailwind", "thief", "toxic", "twister", "u-turn", "venoshock"] 
  },


  // --- Combee Line ---
  "416": { 
    base: "415", 
    extra: ["acrobatics", "aerial-ace", "agility", "air-slash", "aromatherapy", "aromatic-mist", "assurance", "attack-order", "attract", "beat-up", "bug-bite", "captivate", "confide", "confuse-ray", "cross-poison", "cut", "defend-order", "defog", "destiny-bond", "double-team", "endeavor", "endure", "facade", "fell-stinger", "flash", "fling", "frustration", "fury-cutter", "fury-swipes", "giga-impact", "heal-order", "helping-hand", "hex", "hone-claws", "hurricane", "hyper-beam", "infestation", "laser-focus", "mud-slap", "natural-gift", "pin-missile", "poison-sting", "pollen-puff", "pounce", "power-gem", "protect", "psychic-noise", "pursuit", "quash", "rain-dance", "recover", "rest", "return", "revenge", "reversal", "roost", "round", "scary-face", "screech", "secret-power", "signal-beam", "silver-wind", "slash", "sludge-bomb", "spikes", "spite", "substitute", "sunny-day", "swagger", "take-down", "taunt", "thief", "toxic", "toxic-spikes", "uproar", "u-turn", "venoshock", "x-scissor"] 
  },


  // --- Buizel Line ---
  "419": { 
    base: "418", 
    extra: ["body-slam", "focus-blast", "giga-impact", "hyper-beam", "metronome", "muddy-water", "payback", "scary-face", "snarl", "torment"] 
  },


  // --- Cherubi Line ---
  "421": { 
    base: "420", 
    extra: ["giga-impact", "hyper-beam", "laser-focus", "play-rough", "solar-blade"] 
  },


  // --- Shellos Line ---
  "423": { 
    base: "422", 
    extra: ["block", "dig", "earthquake", "flash", "giga-impact", "hyper-beam", "rock-blast", "rock-smash", "sand-tomb", "sludge-bomb", "sludge-wave", "spikes", "stomping-tantrum", "strength", "weather-ball"] 
  },


  // --- Drifloon Line ---
  "426": { 
    base: "425", 
    extra: ["air-slash", "fling", "giga-impact", "hyper-beam", "strength-sap"] 
  },


  // --- Buneary Line ---
  "428": { 
    base: "427", 
    extra: ["acrobatics", "aura-sphere", "blizzard", "brutal-swing", "close-combat", "focus-blast", "fury-cutter", "giga-impact", "high-jump-kick", "hyper-beam", "laser-focus", "mach-punch", "mirror-coat", "rototiller", "strength", "thunder"] 
  },


  // --- Glameow Line ---
  "432": { 
    base: "431", 
    extra: ["body-slam", "bulldoze", "giga-impact", "hyper-beam", "roar", "rollout", "stomping-tantrum", "throat-chop"] 
  },


  // --- Stunky Line ---
  "435": { 
    base: "434", 
    extra: ["burning-jealousy", "endeavor", "fire-spin", "giga-impact", "hyper-beam", "strength", "super-fang"] 
  },


  // --- Bronzor Line ---
  "437": { 
    base: "436", 
    extra: ["block", "body-press", "explosion", "giga-impact", "hard-press", "hyper-beam", "meteor-beam", "night-shade", "strength", "weather-ball"] 
  },


// --- Gible Line ---
  "444": { 
    base: "443", 
    extra: ["breaking-swipe", "crunch", "dual-chop", "power-gem"] 
  },

  "445": { 
    base: "444", 
    extra: ["aqua-tail", "brick-break", "brutal-swing", "fling", "giga-impact", "hyper-beam", "liquidation", "poison-jab", "spikes", "stomping-tantrum", "surf", "whirlpool"] 
  },


  // --- Riolu Line ---
  "448": { 
    base: "447", 
    extra: ["bone-rush", "calm-mind", "dark-pulse", "dragon-pulse", "extreme-speed", "flash-cannon", "focus-energy", "giga-impact", "heal-pulse", "hyper-beam", "life-dew", "mach-punch", "me-first", "metal-sound", "meteor-mash", "metronome", "psychic", "rock-climb", "scary-face", "shadow-ball", "steel-beam", "stone-edge", "terrain-pulse", "water-pulse"] 
  },


  // --- Hippopotas Line ---
  "450": { 
    base: "449", 
    extra: ["giga-impact", "hard-press", "heavy-slam", "hyper-beam", "hyper-voice", "iron-head"] 
  },


  // --- Skorupi Line ---
  "452": { 
    base: "451", 
    extra: ["brutal-swing", "bulldoze", "earthquake", "fire-fang", "giga-impact", "hyper-beam", "ice-fang", "iron-defense", "lash-out", "leech-life", "retaliate", "roar", "rock-climb", "rock-slide", "sand-tomb", "snarl", "stomping-tantrum", "thunder-fang", "venom-drench"] 
  },


  // --- Croagunk Line ---
  "454": { 
    base: "453", 
    extra: ["aerial-ace", "corrosive-gas", "cross-poison", "cut", "giga-impact", "hyper-beam", "stone-edge", "swords-dance", "throat-chop"] 
  },


  // --- Finneon Line ---
  "457": { 
    base: "456", 
    extra: ["encore", "giga-impact", "hyper-beam"] 
  },


  // --- Snover Line ---
  "460": { 
    base: "459", 
    extra: ["aurora-veil", "block", "body-press", "brick-break", "bulldoze", "earth-power", "earthquake", "fling", "focus-blast", "focus-punch", "giga-impact", "hard-press", "hyper-beam", "low-kick", "mega-kick", "outrage", "rock-climb", "rock-slide", "rock-smash", "rock-tomb", "scary-face", "stomping-tantrum", "strength"] 
  },


// --- Zubat/Golbat -> Crobat ---
  "169": { 
    base: "42", // Golbat
    extra: ["cross-poison", "dark-pulse", "defog", "dual-wingbeat", "fly", "heat-wave", "hurricane", "hypnosis", "sky-attack", "snatch", "tailwind", "taunt", "torment", "twister", "u-turn", "venom-drench", "x-scissor", "zen-headbutt"] 
  },


  // --- Oddish/Gloom -> Bellossom ---
  "182": { 
    base: "44", // Gloom
    extra: ["baton-pass", "dazzling-gleam", "energy-ball", "leaf-blade", "leaf-storm", "magical-leaf", "nature-power", "petal-blizzard", "petal-dance", "play-rough", "quiver-dance", "safeguard", "tickle", "triple-axel"] 
  },


  // --- Poliwag/Poliwhirl -> Politoed ---
  "186": { 
    base: "61", // Poliwhirl
    extra: ["bounce", "bulldoze", "dynamic-punch", "earth-power", "echoed-voice", "hyper-beam", "hyper-voice", "payback", "perish-song"] 
  },


  // --- Slowpoke -> Slowking ---
  "199": { 
    base: "79", // Slowpoke
    extra: ["brick-break", "chilly-reception", "dragon-tail", "drain-punch", "dynamic-punch", "fire-punch", "focus-blast", "giga-impact", "ice-punch", "nasty-plot", "power-gem", "quash", "thunder-punch", "trump-card"] 
  },


  // --- Onix -> Steelix ---
  "208": { 
    base: "95", // Onix
    extra: ["aqua-tail", "autotomize", "bite", "block", "brutal-swing", "crunch", "cut", "dark-pulse", "fire-fang", "giga-impact", "heavy-slam", "hyper-beam", "ice-fang", "iron-defense", "magnet-rise", "nature-power", "psychic-fangs", "thunder-fang"] 
  },


  // --- Scyther -> Scizor ---
  "212": { 
    base: "123", // Scyther
    extra: ["bullet-punch", "flash-cannon", "hard-press", "iron-defense", "iron-head", "metal-claw", "sandstorm", "sand-tomb", "steel-beam", "superpower", "venoshock"] 
  },


  // --- Porygon -> Porygon2 ---
  "233": { 
    base: "137", // Porygon
    extra: ["defense-curl"] // Σχεδόν ίδιο moveset, η ουσιαστική διαφορά στο learnset είναι αυτή!
  },


  // --- Eevee -> Espeon ---
  "196": { 
    base: "133", // Eevee
    extra: ["ally-switch", "calm-mind", "confusion", "dazzling-gleam", "dream-eater", "expanding-force", "flash", "future-sight", "giga-impact", "grass-knot", "gravity", "hyper-beam", "imprison", "light-screen", "magic-coat", "magic-room", "morning-sun", "nightmare", "power-gem", "power-swap", "psybeam", "psychic", "psychic-fangs", "psychic-noise", "psychic-terrain", "psycho-cut", "psych-up", "psyshock", "psywave", "reflect", "role-play", "signal-beam", "skill-swap", "telekinesis", "trick", "trick-room", "zap-cannon", "zen-headbutt"] 
  },


  // --- Eevee -> Umbreon ---
  "197": { 
    base: "133", // Eevee
    extra: ["assurance", "calm-mind", "confuse-ray", "crunch", "dark-pulse", "dream-eater", "feint-attack", "flash", "foul-play", "giga-impact", "guard-swap", "hyper-beam", "lash-out", "mean-look", "moonlight", "nightmare", "payback", "psychic", "psych-up", "pursuit", "scary-face", "screech", "snarl", "snatch", "spite", "sucker-punch", "taunt", "throat-chop", "torment", "wonder-room", "zap-cannon"] 
  },


  // --- Eevee -> Leafeon ---
  "470": { 
    base: "133", // Eevee
    extra: ["aerial-ace", "bullet-seed", "energy-ball", "focus-energy", "giga-drain", "giga-impact", "grass-knot", "grass-whistle", "grassy-glide", "hyper-beam", "knock-off", "leafage", "leaf-blade", "leaf-storm", "leech-seed", "magical-leaf", "nature-power", "razor-leaf", "roar", "rock-smash", "seed-bomb", "solar-beam", "solar-blade", "swords-dance", "synthesis", "x-scissor"] 
  },


  // --- Eevee -> Glaceon ---
  "471": { 
    base: "133", // Eevee
    extra: ["aqua-tail", "aurora-veil", "avalanche", "barrier", "blizzard", "calm-mind", "chilling-water", "freeze-dry", "frost-breath", "giga-impact", "gravity", "hail", "haze", "hyper-beam", "ice-beam", "ice-fang", "ice-shard", "icicle-spear", "icy-wind", "mirror-coat", "powder-snow", "roar", "rock-smash", "signal-beam", "snowscape", "triple-axel"] 
  },


// --- Pichu -> Pikachu ---
  "25": { 
    base: "172", // Pichu
    extra: ["brick-break", "calm-mind", "dig", "discharge", "double-kick", "dynamic-punch", "extreme-speed", "feint", "focus-punch", "fly", "giga-impact", "hyper-beam", "iron-tail", "knock-off", "laser-focus", "mega-kick", "mega-punch", "pay-day", "play-rough", "power-up-punch", "rock-smash", "seismic-toss", "slam", "strength", "submission", "surf", "thief", "trailblaze", "upper-hand", "wild-charge"] 
  },


  // --- Cleffa -> Clefairy ---
  "35": { 
    base: "173", // Cleffa
    extra: ["amnesia", "belly-drum", "blizzard", "body-slam", "bounce", "brick-break", "calm-mind", "charge-beam", "cosmic-power", "dazzling-gleam", "double-edge", "drain-punch", "dynamic-punch", "energy-ball", "fire-blast", "fire-punch", "flamethrower", "focus-punch", "grass-knot", "heal-bell", "ice-beam", "ice-punch", "iron-tail", "knock-off", "laser-focus", "magic-coat", "mega-kick", "mega-punch", "meteor-mash", "moonblast", "play-rough", "power-up-punch", "psybeam", "psychic", "reflect", "rollout", "seismic-toss", "shadow-ball", "stealth-rock", "strength", "submission", "teleport", "thunder", "thunderbolt", "thunder-punch", "thunder-wave", "tri-attack", "water-pulse", "zen-headbutt"] 
  },


  // --- Igglybuff -> Jigglypuff ---
  "39": { 
    base: "174", // Igglybuff
    extra: ["ally-switch", "bide", "blizzard", "body-slam", "bounce", "brick-break", "calm-mind", "charge-beam", "dazzling-gleam", "double-edge", "drain-punch", "dynamic-punch", "energy-ball", "fire-blast", "fire-punch", "flamethrower", "focus-punch", "grass-knot", "gyro-ball", "heal-bell", "ice-beam", "ice-punch", "iron-tail", "knock-off", "laser-focus", "magic-coat", "mega-kick", "mega-punch", "moonblast", "play-rough", "power-up-punch", "psybeam", "psychic", "reflect", "rollout", "seismic-toss", "shadow-ball", "stealth-rock", "strength", "submission", "teleport", "thunder", "thunderbolt", "thunder-punch", "thunder-wave", "tri-attack", "water-pulse", "zen-headbutt"] 
  },


  // --- Happiny -> Chansey ---
  "113": { 
    base: "440", // Happiny
    extra: ["ally-switch", "bestow", "bide", "blizzard", "brick-break", "bubble-beam", "bulldoze", "charge-beam", "chilling-water", "counter", "curse", "double-slap", "drain-punch", "dynamic-punch", "earthquake", "egg-bomb", "electric-terrain", "focus-blast", "focus-punch", "giga-impact", "growl", "heal-pulse", "healing-wish", "hyper-beam", "ice-beam", "ice-punch", "iron-tail", "laser-focus", "life-dew", "mega-kick", "mega-punch", "mimic", "mud-bomb", "pound", "power-up-punch", "psychic", "psywave", "rage", "reflect", "retaliate", "rock-climb", "rock-slide", "rock-smash", "rock-tomb", "sandstorm", "seismic-toss", "shock-wave", "sing", "skill-swap", "skull-bash", "snatch", "stealth-rock", "stomping-tantrum", "strength", "submission", "tail-whip", "telekinesis", "teleport", "thunder", "thunderbolt", "thunder-punch", "trailblaze", "tri-attack", "water-gun", "wild-charge", "zap-cannon", "zen-headbutt"] 
  },


  // --- Mime Jr. -> Mr. Mime ---
  "122": { 
    base: "439", // Mime Jr.
    extra: ["aerial-ace", "ally-switch", "barrier", "body-slam", "brick-break", "charge-beam", "confusion", "double-edge", "dynamic-punch", "energy-ball", "expanding-force", "fire-punch", "focus-blast", "focus-punch", "foul-play", "giga-impact", "guard-swap", "hyper-beam", "ice-punch", "magical-leaf", "mega-kick", "mega-punch", "metronome", "mystical-fire", "payback", "power-swap", "power-up-punch", "psybeam", "psychic-terrain", "psycho-cut", "reflect", "seismic-toss", "skill-swap", "submission", "taunt", "telekinesis", "teleport", "thunder-punch", "wide-guard", "zap-cannon"] 
  },


  // --- Smoochum -> Jynx ---
  "124": { 
    base: "238", // Smoochum
    extra: ["ally-switch", "aurora-veil", "body-slam", "brick-break", "bubble-beam", "energy-ball", "expanding-force", "focus-blast", "focus-punch", "hyper-beam", "hyper-voice", "ice-punch", "icicle-spear", "magic-coat", "mega-kick", "mega-punch", "submission", "taunt", "telekinesis", "triple-axel", "wonder-room"] 
  },


  // --- Elekid -> Electabuzz ---
  "125": { 
    base: "239", // Elekid
    extra: ["body-slam", "bulk-up", "cross-chop", "double-edge", "dual-chop", "dynamic-punch", "focus-blast", "giga-impact", "hyper-beam", "iron-tail", "mega-kick", "mega-punch", "metronome", "power-up-punch", "rock-climb", "seismic-toss", "strength", "submission", "supercell-slam", "teleport", "thunder-punch", "trailblaze"] 
  },


  // --- Magby -> Magmar ---
  "126": { 
    base: "240", // Magby
    extra: ["body-slam", "burning-jealousy", "cross-chop", "double-edge", "dual-chop", "dynamic-punch", "focus-blast", "giga-impact", "hyper-beam", "iron-tail", "mega-kick", "mega-punch", "metronome", "power-up-punch", "rock-climb", "seismic-toss", "strength", "submission", "teleport", "temper-flare", "thunder-punch"] 
  },


  // --- Munchlax -> Snorlax ---
  "143": { 
    base: "446", // Munchlax
    extra: ["amnesia", "belch", "block", "body-press", "darkest-lariat", "defense-curl", "dynamic-punch", "heavy-slam", "hyper-beam", "iron-head", "mega-kick", "mega-punch", "outrage", "pay-day", "power-up-punch", "seismic-toss", "steel-roller", "supercell-slam", "wild-charge"] 
  },


  // --- Azurill -> Marill ---
  "183": { 
    base: "298", // Azurill
    extra: ["amnesia", "aqua-ring", "aqua-tail", "brick-break", "bulldoze", "dig", "disarming-voice", "dive", "dynamic-punch", "fling", "focus-punch", "foresight", "future-sight", "grass-knot", "hydro-pump", "ice-punch", "ice-spinner", "liquidation", "mega-kick", "mega-punch", "metronome", "misty-explosion", "misty-terrain", "play-rough", "power-up-punch", "rock-smash", "seismic-toss", "snowscape", "steel-roller", "strength", "superpower"] 
  },


  // --- Bonsly -> Sudowoodo ---
  "185": { 
    base: "438", // Bonsly
    extra: ["block", "body-press", "brick-break", "dynamic-punch", "earth-power", "fire-punch", "fling", "focus-punch", "giga-impact", "hammer-arm", "head-smash", "high-horsepower", "hyper-beam", "ice-punch", "iron-defense", "mega-kick", "mega-punch", "meteor-beam", "power-up-punch", "seismic-toss", "stealth-rock", "stone-edge", "strength", "taunt", "thunder-punch", "wood-hammer"] 
  },


  // --- Wynaut -> Wobbuffet ---
  "202": { 
    base: "360", // Wynaut
    extra: [] // Ακριβώς ίδιο moveset
  },


  // --- Budew -> Roselia ---
  "315": { 
    base: "406", // Budew
    extra: ["aromatherapy", "body-slam", "double-edge", "fury-cutter", "grassy-terrain", "ingrain", "leech-seed", "magical-leaf", "mimic", "nightmare", "petal-blizzard", "power-whip", "sweet-kiss", "sweet-scent", "toxic-spikes"] 
  },


  // --- Chingling -> Chimecho ---
  "358": { 
    base: "433", // Chingling
    extra: ["baton-pass", "bind", "charm", "crafty-shield", "defense-curl", "defog", "disarming-voice", "double-edge", "draining-kiss", "energy-ball", "expanding-force", "fake-tears", "heal-bell", "healing-wish", "heal-pulse", "hyper-voice", "laser-focus", "light-screen", "nightmare", "perish-song", "psywave", "recover", "recycle", "reflect", "rollout", "safeguard", "shock-wave", "stored-power", "swift", "tackle", "take-down", "wrap", "yawn"] 
  },


// --- Snivy Line ---
  "496": { 
    base: "495", 
    extra: [] // Ακριβώς ίδιο moveset
  },

  "497": { 
    base: "496", 
    extra: ["body-slam", "breaking-swipe", "brutal-swing", "dragon-pulse", "dragon-tail", "frenzy-plant", "giga-impact", "hyper-beam", "outrage", "rock-smash", "scale-shot", "scary-face", "strength"] 
  },


  // --- Tepig Line ---
  "499": { 
    base: "498", 
    extra: ["arm-thrust", "brick-break", "bulk-up", "bulldoze", "close-combat", "coaching", "drain-punch", "focus-blast", "focus-punch", "high-horsepower", "knock-off", "low-kick", "low-sweep", "poison-jab", "power-up-punch", "reversal", "rock-slide", "stone-edge", "thunder-punch"] 
  },

  "500": { 
    base: "499", 
    extra: ["blast-burn", "block", "body-press", "earthquake", "giga-impact", "hammer-arm", "hard-press", "head-smash", "hyper-beam", "iron-head", "scald", "smack-down"] 
  },


  // --- Oshawott Line ---
  "502": { 
    base: "501", 
    extra: ["brick-break", "vacuum-wave"] 
  },

  "503": { 
    base: "502", 
    extra: ["block", "body-slam", "bulldoze", "dark-pulse", "dragon-tail", "drill-run", "giga-impact", "hydro-cannon", "hyper-beam", "lash-out", "megahorn", "scary-face", "smart-strike", "snarl", "strength", "superpower", "throat-chop", "upper-hand"] 
  },


  // --- Patrat Line ---
  "505": { 
    base: "504", 
    extra: ["confuse-ray", "dream-eater", "fire-punch", "flamethrower", "flash", "focus-blast", "focus-punch", "giga-impact", "hyper-beam", "ice-punch", "knock-off", "light-screen", "power-up-punch", "rock-smash", "rototiller", "signal-beam", "stomping-tantrum", "strength", "thunder", "thunder-punch", "thunder-wave"] 
  },


  // --- Lillipup Line ---
  "507": { 
    base: "506", 
    extra: ["roar", "surf"] 
  },

  "508": { 
    base: "507", 
    extra: ["hyper-beam", "iron-head", "stomping-tantrum", "superpower", "thunder"] 
  },


  // --- Purrloin Line ---
  "510": { 
    base: "509", 
    extra: ["burning-jealousy", "giga-impact", "hyper-beam", "laser-focus", "psycho-cut", "rock-smash", "skitter-smack", "throat-chop"] 
  },


  // --- Pansage Line ---
  "512": { 
    base: "511", 
    extra: ["brick-break", "focus-blast", "giga-impact", "hyper-beam", "power-up-punch", "rock-slide", "superpower", "throat-chop"] 
  },


  // --- Pansear Line ---
  "514": { 
    base: "513", 
    extra: ["brick-break", "focus-blast", "giga-impact", "hyper-beam", "power-up-punch", "rock-slide", "superpower", "throat-chop"] 
  },


  // --- Panpour Line ---
  "516": { 
    base: "515", 
    extra: ["brick-break", "focus-blast", "giga-impact", "hyper-beam", "power-up-punch", "rock-slide", "superpower", "throat-chop"] 
  },


  // --- Munna Line ---
  "518": { 
    base: "517", 
    extra: ["giga-impact", "hyper-beam", "misty-explosion", "psychic-terrain"] 
  },


  // --- Pidove Line ---
  "520": { 
    base: "519", 
    extra: [] // Ίδιο moveset (το Unfezant παίρνει λίγα παραπάνω)
  },

  "521": { 
    base: "520", 
    extra: ["brave-bird", "giga-impact", "hurricane", "hyper-beam", "psych-up"] 
  },


// --- Teddiursa -> Ursaring ---
  "217": { 
    base: "216", 
    extra: ["focus-blast", "giga-impact", "hammer-arm", "hyper-beam", "laser-focus", "stomping-tantrum", "stone-edge", "throat-chop"] 
  },


  // --- Swinub -> Piloswine -> Mamoswine ---
  "221": { 
    base: "220", 
    extra: ["fury-attack", "giga-impact", "horn-attack", "hyper-beam", "peck", "thrash", "throat-chop"] 
  },

  "473": { 
    base: "221", 
    extra: ["block", "body-press", "double-hit", "fury-cutter", "hard-press", "heavy-slam", "iron-head", "knock-off", "rock-blast", "rock-climb"] 
  },


  // --- Mantyke -> Mantine ---
  "226": { 
    base: "458", 
    extra: ["aqua-tail", "assurance", "body-press", "body-slam", "brine", "bullet-seed", "defog", "dual-wingbeat", "giga-impact", "gunk-shot", "hurricane", "hyper-beam", "iron-head", "liquidation", "seed-bomb", "string-shot"] 
  },


  // --- Roselia -> Roserade ---
  "407": { 
    base: "315", 
    extra: ["giga-impact", "grassy-terrain", "hyper-beam", "laser-focus", "venom-drench"] 
  },


  // --- Aipom -> Ambipom ---
  "424": { 
    base: "190", 
    extra: ["dual-chop", "giga-impact", "hyper-beam", "laser-focus", "triple-axel"] 
  },


  // --- Misdreavus -> Mismagius ---
  "429": { 
    base: "200", 
    extra: ["laser-focus", "lash-out"] 
  },


  // --- Murkrow -> Honchkrow ---
  "430": { 
    base: "198", 
    extra: ["chilling-water", "comeuppance", "incinerate", "superpower"] 
  },


  // --- Sneasel -> Weavile ---
  "461": { 
    base: "215", 
    extra: ["assurance", "baton-pass", "focus-blast", "hyper-beam", "night-slash"] 
  },


  // --- Magneton -> Magnezone ---
  "462": { 
    base: "82", 
    extra: ["ally-switch", "barrier", "body-press", "body-slam", "hard-press", "magnetic-flux", "mirror-coat", "steel-roller", "supercell-slam"] 
  },


  // --- Lickitung -> Lickilicky ---
  "463": { 
    base: "108", 
    extra: ["block", "focus-blast", "gyro-ball", "self-destruct"] 
  },


  // --- Rhydon -> Rhyperior ---
  "464": { 
    base: "112", 
    extra: ["metal-claw", "rock-wrecker"] 
  },


  // --- Tangela -> Tangrowth ---
  "465": { 
    base: "114", 
    extra: ["aerial-ace", "block", "brutal-swing", "bulldoze", "earthquake", "focus-blast", "leaf-blade", "payback", "poison-jab", "rock-slide", "rock-tomb", "solar-blade", "stomping-tantrum", "strength"] 
  },


  // --- Electabuzz -> Electivire ---
  "466": { 
    base: "125", 
    extra: ["darkest-lariat", "dig", "earthquake", "flamethrower", "ion-deluge", "rock-slide", "rock-tomb", "stomping-tantrum", "torment", "weather-ball"] 
  },


  // --- Magmar -> Magmortar ---
  "467": { 
    base: "126", 
    extra: ["bulldoze", "earthquake", "hyper-voice", "rock-slide", "rock-tomb", "solar-beam", "stomping-tantrum", "thunderbolt", "torment", "weather-ball"] 
  },


  // --- Togetic -> Togekiss ---
  "468": { 
    base: "176", 
    extra: ["aura-sphere", "extreme-speed"] 
  },


  // --- Yanma -> Yanmega ---
  "469": { 
    base: "193", 
    extra: ["crunch", "giga-impact", "hyper-beam", "laser-focus", "night-slash"] 
  },


  // --- Gligar -> Gliscor ---
  "472": { 
    base: "207", 
    extra: ["giga-impact", "hyper-beam", "pin-missile", "sky-attack"] 
  },


  // --- Porygon2 -> Porygon-Z ---
  "474": { 
    base: "233", 
    extra: ["dark-pulse", "embargo", "nasty-plot", "uproar"] 
  },


  // --- Kirlia -> Gallade ---
  "475": { 
    base: "281", 
    extra: ["aerial-ace", "air-slash", "aqua-cutter", "aura-sphere", "brick-break", "bulk-up", "bulldoze", "close-combat", "coaching", "cut", "drain-punch", "dual-chop", "earthquake", "energy-ball", "false-swipe", "feint", "focus-blast", "focus-punch", "fury-cutter", "giga-impact", "hex", "laser-focus", "leaf-blade", "leer", "low-kick", "low-sweep", "night-shade", "night-slash", "poison-jab", "power-up-punch", "psycho-cut", "quick-guard", "retaliate", "revenge", "reversal", "rock-slide", "rock-smash", "rock-tomb", "sacred-sword", "shadow-claw", "slash", "solar-blade", "stone-edge", "strength", "swords-dance", "take-down", "throat-chop", "upper-hand", "vacuum-wave", "wide-guard", "work-up", "x-scissor"] 
  },


  // --- Nosepass -> Probopass ---
  "476": { 
    base: "299", 
    extra: ["ally-switch", "giga-impact", "hard-press", "hyper-beam", "iron-head", "magnet-bomb", "magnetic-flux", "metal-sound", "telekinesis", "tri-attack"] 
  },


  // --- Dusclops -> Dusknoir ---
  "477": { 
    base: "356", 
    extra: ["darkest-lariat", "focus-blast", "hard-press", "laser-focus"] 
  },


  // --- Snorunt -> Froslass ---
  "478": { 
    base: "361", 
    extra: ["ally-switch", "aurora-veil", "charm", "confuse-ray", "curse", "destiny-bond", "draining-kiss", "dream-eater", "embargo", "fling", "giga-impact", "haze", "hyper-beam", "ice-punch", "imprison", "laser-focus", "mud-slap", "night-shade", "ominous-wind", "pain-split", "payback", "poltergeist", "psychic", "psych-up", "reflect", "scary-face", "shock-wave", "signal-beam", "snatch", "sucker-punch", "taunt", "telekinesis", "thunder", "thunderbolt", "thunder-wave", "torment", "trick", "triple-axel", "wake-up-slap", "will-o-wisp"] 
  },



  // --- Blitzle Line ---
  "523": { 
    base: "522", 
    extra: ["ally-switch", "bulldoze", "giga-impact", "high-horsepower", "hyper-beam", "ion-deluge", "laser-focus", "overheat", "roar", "rock-smash", "taunt"] 
  },


  // --- Roggenrola Line ---
  "525": { 
    base: "524", 
    extra: ["power-gem", "stomping-tantrum"] 
  },

  "526": { 
    base: "525", 
    extra: ["giga-impact", "hyper-beam", "iron-head", "laser-focus", "self-destruct", "solar-beam", "superpower", "throat-chop", "weather-ball"] 
  },


  // --- Woobat Line ---
  "528": { 
    base: "527", 
    extra: ["giga-impact", "hyper-beam", "laser-focus", "psychic-fangs", "sky-attack"] 
  },


  // --- Drilbur Line ---
  "530": { 
    base: "529", 
    extra: ["body-slam", "brutal-swing", "focus-blast", "giga-impact", "horn-drill", "hyper-beam", "iron-head", "magnet-rise", "rock-blast", "rototiller", "scary-face", "smart-strike", "steel-beam", "throat-chop"] 
  },


  // --- Timburr Line ---
  "533": { 
    base: "532", 
    extra: ["high-horsepower"] 
  },

  "534": { 
    base: "533", 
    extra: ["body-slam", "bulldoze", "earthquake", "giga-impact", "hard-press", "hyper-beam", "rock-blast", "stomping-tantrum", "upper-hand"] 
  },


  // --- Tympole Line ---
  "536": { 
    base: "535", 
    extra: ["bulldoze", "focus-punch", "gastro-acid", "power-whip", "rock-smash", "stealth-rock"] 
  },

  "537": { 
    base: "536", 
    extra: ["brick-break", "dig", "dive", "drain-punch", "earthquake", "fling", "focus-blast", "giga-impact", "grass-knot", "hyper-beam", "ice-punch", "knock-off", "liquidation", "low-kick", "mega-kick", "mega-punch", "payback", "poison-jab", "power-up-punch", "rock-slide", "rock-tomb", "stomping-tantrum", "strength", "venoshock"] 
  },


  // --- Sewaddle Line ---
  "541": { 
    base: "540", 
    extra: ["grass-whistle"] 
  },

  "542": { 
    base: "541", 
    extra: ["aerial-ace", "agility", "air-slash", "bullet-seed", "entrainment", "false-swipe", "fell-stinger", "giga-impact", "heal-bell", "helping-hand", "hone-claws", "hyper-beam", "knock-off", "laser-focus", "leaf-blade", "leaf-storm", "low-kick", "pollen-puff", "reflect", "retaliate", "shadow-claw", "slash", "steel-wing", "swords-dance", "throat-chop", "triple-axel", "x-scissor"] 
  },


  // --- Venipede Line ---
  "544": { 
    base: "543", 
    extra: [] // Ακριβώς ίδιο moveset
  },

  "545": { 
    base: "544", 
    extra: ["aqua-tail", "assurance", "baton-pass", "bulldoze", "cross-poison", "cut", "dig", "earthquake", "giga-impact", "hyper-beam", "iron-tail", "megahorn", "rock-slide", "smart-strike", "snatch", "stomping-tantrum", "strength", "superpower", "swords-dance", "throat-chop", "x-scissor"] 
  },


  // --- Cottonee Line ---
  "547": { 
    base: "546", 
    extra: ["fling", "giga-impact", "gust", "hurricane", "hyper-beam", "light-screen", "moonblast", "play-rough", "psychic", "shadow-ball", "thief", "trick-room", "u-turn"] 
  },


  // --- Petilil Line ---
  "549": { 
    base: "548", 
    extra: ["alluring-voice", "giga-impact", "hyper-beam", "leaf-blade", "light-screen", "petal-blizzard", "petal-dance", "psych-up", "quiver-dance", "role-play", "solar-blade", "swords-dance", "teeter-dance", "weather-ball"] 
  },


  // --- Sandile Line ---
  "552": { 
    base: "551", 
    extra: ["aerial-ace", "breaking-swipe", "brutal-swing", "dragon-claw", "dragon-tail", "focus-punch", "giga-impact", "hyper-beam", "ice-fang", "infestation", "iron-defense", "knock-off", "leech-life", "low-kick", "low-sweep", "mega-kick", "mega-punch", "power-up-punch", "retaliate", "roar", "rock-climb", "scale-shot", "strength", "throat-chop"] 
  },

  "553": { 
    base: "552", 
    extra: ["block", "bulk-up", "close-combat", "darkest-lariat", "dragon-pulse", "focus-blast", "gunk-shot", "high-horsepower", "outrage", "smack-down", "superpower"] 
  },


  // --- Darumaka Line ---
  "555": { 
    base: "554", 
    extra: ["body-press", "body-slam", "bulk-up", "bulldoze", "burning-jealousy", "earthquake", "expanding-force", "focus-blast", "future-sight", "giga-impact", "guard-swap", "hyper-beam", "iron-defense", "iron-head", "laser-focus", "lash-out", "mystical-fire", "payback", "power-swap", "psychic", "reversal", "stone-edge", "trick"] 
  },


  // --- Dwebble Line ---
  "558": { 
    base: "557", 
    extra: ["body-press", "giga-impact", "heavy-slam", "hyper-beam", "meteor-beam", "solar-blade", "stomping-tantrum"] 
  },


  // --- Scraggy Line ---
  "560": { 
    base: "559", 
    extra: ["body-slam", "giga-impact", "head-smash", "hyper-beam", "metronome", "outrage", "reversal", "swords-dance"] 
  },


  // --- Yamask Line ---
  "563": { 
    base: "562", 
    extra: ["body-press", "giga-impact", "grass-knot", "guard-swap", "hyper-beam", "phantom-force", "revenge", "scary-face", "shadow-claw"] 
  },


  // --- Tirtouga Line ---
  "565": { 
    base: "564", 
    extra: ["focus-blast", "giga-impact", "hyper-beam", "iron-head", "low-kick", "razor-shell", "superpower"] 
  },


  // --- Archen Line ---
  "567": { 
    base: "566", 
    extra: ["dragon-tail", "fly", "focus-blast", "giga-impact", "hyper-beam", "outrage", "sky-attack"] 
  },


  // --- Trubbish Line ---
  "569": { 
    base: "568", 
    extra: ["body-press", "body-slam", "cross-poison", "fling", "focus-blast", "giga-impact", "hyper-beam", "metal-claw", "psychic", "rock-polish", "screech", "smack-down", "solar-beam", "stomping-tantrum", "thunderbolt"] 
  },


  // --- Zorua Line ---
  "571": { 
    base: "570", 
    extra: ["body-slam", "brick-break", "crunch", "flamethrower", "focus-blast", "giga-impact", "hyper-beam", "laser-focus", "low-kick", "low-sweep", "mega-kick", "mega-punch", "night-slash", "rock-smash", "throat-chop"] 
  },


  // --- Minccino Line ---
  "573": { 
    base: "572", 
    extra: ["double-edge", "focus-blast", "giga-impact", "hyper-beam", "ice-spinner", "laser-focus", "light-screen", "rock-blast", "thunder"] 
  },


  // --- Gothita Line ---
  "575": { 
    base: "574", 
    extra: [] // Ακριβώς ίδιο moveset
  },

  "576": { 
    base: "575", 
    extra: ["body-slam", "brick-break", "focus-blast", "giga-impact", "hyper-beam", "laser-focus", "low-sweep", "power-up-punch"] 
  },


  // --- Solosis Line ---
  "578": { 
    base: "577", 
    extra: [] // Ακριβώς ίδιο moveset
  },

  "579": { 
    base: "578", 
    extra: ["body-slam", "dizzy-punch", "drain-punch", "fire-punch", "fling", "focus-blast", "focus-punch", "giga-impact", "hammer-arm", "hyper-beam", "ice-punch", "knock-off", "laser-focus", "mega-punch", "power-up-punch", "rock-smash", "strength", "superpower", "thunder-punch"] 
  },


  // --- Ducklett Line ---
  "581": { 
    base: "580", 
    extra: ["flip-turn", "giga-impact", "hydro-pump", "hyper-beam", "knock-off", "sky-attack", "weather-ball"] 
  },


  // --- Vanillite Line ---
  "583": { 
    base: "582", 
    extra: [] // Ακριβώς ίδιο moveset
  },

  "584": { 
    base: "583", 
    extra: ["beat-up", "freeze-dry", "giga-impact", "hyper-beam", "icicle-crash", "weather-ball"] 
  },


  // --- Deerling Line ---
  "586": { 
    base: "585", 
    extra: ["cut", "giga-impact", "high-horsepower", "horn-leech", "hyper-beam", "megahorn", "petal-blizzard", "rock-smash", "smart-strike", "stomping-tantrum", "swords-dance", "throat-chop"] 
  },


  // --- Karrablast Line ---
  "589": { 
    base: "588", 
    extra: ["brutal-swing", "close-combat", "fell-stinger", "focus-blast", "giga-impact", "hyper-beam", "iron-head", "laser-focus", "metal-burst", "quick-guard", "razor-shell", "revenge", "reversal", "rock-smash", "smart-strike", "steel-beam", "taunt", "twineedle"] 
  },


  // --- Foongus Line ---
  "591": { 
    base: "590", 
    extra: ["giga-impact", "hex", "hyper-beam", "scary-face", "stomping-tantrum"] 
  },


  // --- Frillish Line ---
  "593": { 
    base: "592", 
    extra: ["giga-impact", "hyper-beam", "muddy-water"] 
  },


  // --- Joltik Line ---
  "596": { 
    base: "595", 
    extra: ["charge", "giga-impact", "hyper-beam", "sticky-web", "throat-chop"] 
  },


  // --- Ferroseed Line ---
  "598": { 
    base: "597", 
    extra: ["aerial-ace", "block", "body-press", "brutal-swing", "bulldoze", "cut", "giga-impact", "grass-knot", "heavy-slam", "hyper-beam", "power-whip", "sandstorm", "shadow-claw", "strength", "swords-dance"] 
  },


  // --- Klink Line ---
  "600": { 
    base: "599", 
    extra: ["ally-switch"] 
  },

  "601": { 
    base: "600", 
    extra: ["electric-terrain", "gear-up", "giga-impact", "magnetic-flux", "thunder", "trick-room"] 
  },


// --- Tynamo Line ---
  "603": { 
    base: "602", 
    extra: ["acid", "acid-spray", "acrobatics", "aqua-tail", "attract", "bind", "body-slam", "bounce", "coil", "confide", "crunch", "discharge", "double-team", "eerie-impulse", "electric-terrain", "electro-ball", "electroweb", "endure", "facade", "flash", "flash-cannon", "frustration", "gastro-acid", "giga-drain", "headbutt", "hidden-power", "iron-tail", "light-screen", "lunge", "protect", "rain-dance", "rest", "return", "round", "scary-face", "secret-power", "shock-wave", "signal-beam", "sleep-talk", "snore", "substitute", "super-fang", "swagger", "take-down", "thrash", "throat-chop", "thunder", "thunderbolt", "thunder-fang", "toxic", "u-turn", "volt-switch", "wild-charge", "zap-cannon"] 
  },

  "604": { 
    base: "603", 
    extra: ["body-press", "brick-break", "bulk-up", "bulldoze", "close-combat", "confuse-ray", "crush-claw", "cut", "dragon-claw", "dragon-pulse", "dragon-tail", "drain-punch", "fire-punch", "flamethrower", "focus-punch", "giga-impact", "grass-knot", "heavy-slam", "hex", "hone-claws", "hyper-beam", "ion-deluge", "liquidation", "outrage", "power-up-punch", "roar", "rock-slide", "rock-smash", "rock-tomb", "stomping-tantrum", "strength", "sunny-day", "supercell-slam", "superpower", "swift", "thunder-punch", "zen-headbutt"] 
  },


  // --- Elgyem Line ---
  "606": { 
    base: "605", 
    extra: ["flash-cannon", "future-sight", "giga-impact", "hyper-beam", "psychic-terrain", "tri-attack"] 
  },


  // --- Litwick Line ---
  "608": { 
    base: "607", 
    extra: ["lash-out"] 
  },

  "609": { 
    base: "608", 
    extra: ["giga-impact", "hyper-beam", "laser-focus", "trailblaze"] 
  },


  // --- Axew Line ---
  "611": { 
    base: "610", 
    extra: ["low-kick"] 
  },

  "612": { 
    base: "611", 
    extra: ["body-slam", "brutal-swing", "close-combat", "earthquake", "focus-blast", "grass-knot", "hyper-beam", "low-sweep", "psycho-cut", "rock-slide"] 
  },


  // --- Cubchoo Line ---
  "614": { 
    base: "613", 
    extra: ["aqua-jet", "brick-break", "bulk-up", "close-combat", "dive", "earthquake", "focus-blast", "giga-impact", "hard-press", "hyper-beam", "icicle-crash", "roar", "stone-edge", "swords-dance"] 
  },


  // --- Shelmet Line ---
  "617": { 
    base: "616", 
    extra: ["acid-spray", "agility", "drain-punch", "focus-blast", "giga-impact", "hyper-beam", "knock-off", "laser-focus", "me-first", "power-swap", "quick-attack", "reversal", "sandstorm", "swift", "u-turn", "venom-drench", "water-shuriken"] 
  },


  // --- Mienfoo Line ---
  "620": { 
    base: "619", 
    extra: ["assurance", "blaze-kick", "giga-impact", "hyper-beam", "ice-spinner", "laser-focus", "triple-axel", "wide-guard"] 
  },


  // --- Golett Line ---
  "623": { 
    base: "622", 
    extra: ["body-press", "close-combat", "darkest-lariat", "flash-cannon", "fly", "giga-impact", "hard-press", "heat-crash", "high-horsepower", "hyper-beam", "solar-beam", "stone-edge", "thunderbolt", "trick", "zen-headbutt"] 
  },


  // --- Pawniard Line ---
  "625": { 
    base: "624", 
    extra: ["focus-blast", "giga-impact", "hyper-beam", "metal-burst", "reversal", "throat-chop"] 
  },


  // --- Rufflet Line ---
  "628": { 
    base: "627", 
    extra: ["giga-impact", "hyper-beam", "iron-head", "laser-focus", "metal-claw", "reversal", "sky-attack"] 
  },


  // --- Vullaby Line ---
  "630": { 
    base: "629", 
    extra: ["bone-rush", "giga-impact", "hyper-beam", "sandstorm"] 
  },


  // --- Deino Line ---
  "634": { 
    base: "633", 
    extra: ["helping-hand", "lash-out", "stomping-tantrum"] 
  },

  "635": { 
    base: "634", 
    extra: ["acrobatics", "breaking-swipe", "brutal-swing", "bulldoze", "charge-beam", "defog", "dragon-dance", "dual-wingbeat", "earthquake", "echoed-voice", "fire-blast", "fire-spin", "flamethrower", "flash-cannon", "fly", "focus-blast", "giga-impact", "heat-wave", "hydro-pump", "hyper-beam", "iron-tail", "payback", "reflect", "rock-slide", "rock-tomb", "roost", "scale-shot", "signal-beam", "stealth-rock", "steel-wing", "stone-edge", "surf", "tailwind", "throat-chop", "tri-attack", "u-turn"] 
  },


  // --- Larvesta Line ---
  "637": { 
    base: "636", 
    extra: ["aerial-ace", "air-cutter", "air-slash", "defog", "dual-wingbeat", "fiery-dance", "fly", "giga-impact", "gust", "hurricane", "hyper-beam", "mystical-fire", "poison-jab", "quiver-dance", "rage-powder", "rain-dance", "roost", "silver-wind", "tailwind", "whirlwind", "will-o-wisp"] 
  },


// --- Chespin Line ---
  "651": { 
    base: "650", 
    extra: ["hone-claws"] 
  },

  "652": { 
    base: "651", 
    extra: ["block", "body-press", "close-combat", "coaching", "dragon-claw", "frenzy-plant", "giga-impact", "high-horsepower", "hyper-beam", "needle-arm", "reversal", "scary-face", "spiky-shield"] 
  },


  // --- Fennekin Line ---
  "654": { 
    base: "653", 
    extra: ["fire-punch", "laser-focus", "low-kick", "recycle", "shock-wave", "snatch", "telekinesis", "thunder-punch", "wonder-room"] 
  },

  "655": { 
    base: "654", 
    extra: ["blast-burn", "confuse-ray", "dazzling-gleam", "focus-blast", "future-sight", "giga-impact", "hex", "hyper-beam", "mystical-fire", "night-shade", "psychic-noise", "role-play", "scorching-sands", "shadow-ball", "signal-beam", "switcheroo"] 
  },


  // --- Froakie Line ---
  "657": { 
    base: "656", 
    extra: ["dark-pulse", "gunk-shot", "ice-punch", "low-kick", "swords-dance"] 
  },

  "658": { 
    base: "657", 
    extra: ["brick-break", "brutal-swing", "extrasensory", "feint-attack", "giga-impact", "haze", "hydro-cannon", "hyper-beam", "low-sweep", "mat-block", "night-slash", "shadow-sneak", "sludge-wave", "upper-hand", "water-shuriken", "weather-ball"] 
  },


  // --- Bunnelby Line ---
  "660": { 
    base: "659", 
    extra: ["brutal-swing", "earth-power", "fire-punch", "focus-punch", "foul-play", "gastro-acid", "giga-impact", "gunk-shot", "hammer-arm", "high-horsepower", "hyper-beam", "ice-punch", "knock-off", "mega-kick", "mega-punch", "snatch", "stomping-tantrum", "superpower", "thunder-punch", "uproar"] 
  },


  // --- Fletchling Line ---
  "662": { 
    base: "661", 
    extra: ["feint", "fire-blast", "fire-spin", "flamethrower", "incinerate", "temper-flare"] 
  },

  "663": { 
    base: "662", 
    extra: ["bulk-up", "giga-impact", "hone-claws", "hyper-beam", "solar-beam", "upper-hand"] 
  },


  // --- Scatterbug Line ---
  "665": { 
    base: "664", 
    extra: ["electroweb", "harden", "iron-defense", "protect"] 
  },

  "666": { 
    base: "665", 
    extra: ["acrobatics", "aerial-ace", "air-cutter", "air-slash", "aromatherapy", "attract", "bug-buzz", "calm-mind", "confide", "confuse-ray", "defog", "double-team", "draining-kiss", "dream-eater", "endeavor", "endure", "energy-ball", "facade", "flash", "frustration", "giga-drain", "giga-impact", "gust", "hidden-power", "hurricane", "hyper-beam", "infestation", "laser-focus", "light-screen", "pollen-puff", "powder", "psybeam", "psychic", "psych-up", "quiver-dance", "rain-dance", "rest", "return", "roost", "round", "safeguard", "secret-power", "signal-beam", "skitter-smack", "sleep-powder", "sleep-talk", "snore", "solar-beam", "substitute", "sunny-day", "supersonic", "swagger", "swift", "tailwind", "thief", "toxic", "u-turn", "weather-ball"] 
  },


  // --- Litleo Line ---
  "668": { 
    base: "667", 
    extra: ["bounce", "burning-jealousy", "giga-impact", "hyper-beam", "temper-flare"] 
  },


  // --- Flabébé Line ---
  "670": { 
    base: "669", 
    extra: ["metronome", "skill-swap", "trick"] 
  },

  "671": { 
    base: "670", 
    extra: ["defog", "flower-shield", "giga-impact", "hyper-beam", "misty-explosion", "psychic-noise"] 
  },


  // --- Skiddo Line ---
  "673": { 
    base: "672", 
    extra: ["aerial-ace", "bounce", "earthquake", "giga-impact", "high-horsepower", "hyper-beam", "superpower", "throat-chop"] 
  },


  // --- Pancham Line ---
  "675": { 
    base: "674", 
    extra: ["beat-up", "bullet-punch", "close-combat", "darkest-lariat", "dragon-claw", "earthquake", "embargo", "focus-blast", "focus-energy", "giga-impact", "hammer-arm", "hone-claws", "hyper-beam", "infestation", "laser-focus", "night-slash", "outrage", "poison-jab", "revenge", "reversal", "scary-face", "snarl", "stomping-tantrum", "thief", "throat-chop", "x-scissor"] 
  },


  // --- Espurr Line ---
  "678": { 
    base: "677", 
    extra: ["alluring-voice", "dig", "giga-impact", "hyper-beam", "imprison", "mean-look", "miracle-eye", "misty-terrain", "power-up-punch", "psychic-terrain", "quick-guard", "tail-slap", "trailblaze"] 
  },


  // --- Honedge Line ---
  "680": { 
    base: "679", 
    extra: [] // Ίδιο moveset (το Doublade δεν έχει κάτι extra από Honedge βάσει λίστας)
  },

  "681": { 
    base: "680", 
    extra: ["air-slash", "giga-impact", "head-smash", "hyper-beam", "kings-shield", "shadow-ball", "sunny-day"] 
  },


  // --- Spritzee Line ---
  "683": { 
    base: "682", 
    extra: ["aromatic-mist", "drain-punch", "giga-impact", "heal-pulse", "hyper-beam", "metronome", "psyshock", "thunder"] 
  },


  // --- Swirlix Line ---
  "685": { 
    base: "684", 
    extra: ["drain-punch", "giga-impact", "hyper-beam", "metronome", "thunder"] 
  },


  // --- Inkay Line ---
  "687": { 
    base: "686", 
    extra: ["block", "brutal-swing", "giga-impact", "hyper-beam", "psychic-noise", "reversal", "scary-face", "signal-beam", "throat-chop", "trailblaze"] 
  },


  // --- Binacle Line ---
  "689": { 
    base: "688", 
    extra: ["brutal-swing", "bulk-up", "dive", "dragon-claw", "earth-power", "focus-blast", "giga-impact", "hyper-beam", "laser-focus", "low-kick", "meteor-beam", "muddy-water", "skull-bash", "superpower"] 
  },


  // --- Skrelp Line ---
  "691": { 
    base: "690", 
    extra: ["draco-meteor", "focus-blast", "giga-impact", "hyper-beam", "thunder"] 
  },


  // --- Clauncher Line ---
  "693": { 
    base: "692", 
    extra: ["body-slam", "focus-blast", "giga-impact", "heal-pulse", "hyper-beam", "laser-focus", "scary-face", "shadow-ball"] 
  },


  // --- Helioptile Line ---
  "695": { 
    base: "694", 
    extra: ["breaking-swipe", "brutal-swing", "discharge", "fire-punch", "focus-blast", "giga-impact", "hyper-beam", "hyper-voice", "low-kick", "mega-kick", "mega-punch", "solar-beam", "sunny-day", "thunder-punch", "weather-ball"] 
  },


  // --- Tyrunt Line ---
  "697": { 
    base: "696", 
    extra: ["brutal-swing", "giga-impact", "head-smash", "high-horsepower", "hyper-beam"] 
  },


  // --- Amaura Line ---
  "699": { 
    base: "698", 
    extra: ["earthquake", "giga-impact", "icicle-spear", "psychic", "thunder"] 
  },


  // --- Goomy Line ---
  "705": { 
    base: "704", 
    extra: ["blizzard", "ice-beam", "thunder"] 
  },

  "706": { 
    base: "705", 
    extra: ["aqua-tail", "assurance", "body-press", "breaking-swipe", "brutal-swing", "bulldoze", "dragon-cheer", "dragon-claw", "dragon-tail", "earthquake", "feint", "fire-blast", "fire-punch", "flamethrower", "focus-blast", "focus-punch", "giga-impact", "hyper-beam", "incinerate", "knock-off", "laser-focus", "mega-kick", "mega-punch", "power-whip", "rock-smash", "scald", "stomping-tantrum", "strength", "superpower", "surf", "tearful-look", "thunder-punch", "weather-ball"] 
  },


  // --- Phantump Line ---
  "709": { 
    base: "708", 
    extra: ["block", "brutal-swing", "burning-jealousy", "calm-mind", "drain-punch", "earthquake", "focus-blast", "giga-impact", "haze", "hone-claws", "hyper-beam", "knock-off", "leaf-storm", "psychic-noise", "scary-face", "take-down", "x-scissor"] 
  },


  // --- Pumpkaboo Line ---
  "711": { 
    base: "710", 
    extra: ["brutal-swing", "focus-blast", "giga-impact", "hyper-beam", "moonblast", "nasty-plot", "power-whip"] 
  },


  // --- Bergmite Line ---
  "713": { 
    base: "712", 
    extra: ["block", "body-press", "earthquake", "giga-impact", "heavy-slam", "high-horsepower", "hydro-pump", "hyper-beam", "icicle-crash", "iron-head", "roar", "scary-face", "skull-bash", "stomping-tantrum", "superpower", "wide-guard"] 
  },


  // --- Noibat Line ---
  "715": { 
    base: "714", 
    extra: ["body-slam", "boomburst", "breaking-swipe", "dragon-cheer", "dragon-dance", "flamethrower", "focus-blast", "giga-impact", "hone-claws", "hyper-beam", "laser-focus", "moonlight", "psychic-noise", "scary-face"] 
  },


  // --- Rowlet Line ---
  "723": { 
    base: "722", 
    extra: [] // Ίδιο moveset
  },

  "724": { 
    base: "723", 
    extra: ["bulk-up", "focus-blast", "focus-punch", "frenzy-plant", "giga-impact", "hex", "hyper-beam", "imprison", "low-kick", "low-sweep", "phantom-force", "poltergeist", "psycho-cut", "reversal", "shadow-ball", "shadow-claw", "shadow-sneak", "skitter-smack", "smack-down", "solar-blade", "spirit-shackle", "spite", "upper-hand"] 
  },


  // --- Litten Line ---
  "726": { 
    base: "725", 
    extra: ["dual-chop"] 
  },

  "727": { 
    base: "726", 
    extra: ["blast-burn", "blaze-kick", "brutal-swing", "burning-jealousy", "close-combat", "cross-chop", "darkest-lariat", "dark-pulse", "drain-punch", "fling", "focus-blast", "focus-punch", "giga-impact", "heat-crash", "hyper-beam", "iron-head", "lash-out", "low-kick", "low-sweep", "mega-kick", "mega-punch", "nasty-plot", "outrage", "parting-shot", "power-trip", "quash", "reversal", "scorching-sands", "shadow-claw", "snarl", "snatch", "stomping-tantrum", "superpower", "swords-dance", "thief", "throat-chop", "thunder-punch", "torment", "trailblaze", "u-turn"] 
  },


  // --- Popplio Line ---
  "729": { 
    base: "728", 
    extra: [] // Ίδιο moveset
  },

  "730": { 
    base: "729", 
    extra: ["dazzling-gleam", "energy-ball", "giga-impact", "hydro-cannon", "hyper-beam", "haze", "light-screen", "liquidation", "magic-coat", "misty-explosion", "psychic", "psychic-noise", "reflect", "shadow-ball", "sparkling-aria", "stored-power", "surf", "waterfall", "weather-ball"] 
  },


  // --- Pikipek Line ---
  "732": { 
    base: "731", 
    extra: ["rock-blast"] 
  },

  "733": { 
    base: "732", 
    extra: ["beak-blast", "encore", "flash-cannon", "giga-impact", "hyper-beam", "overheat", "scary-face", "seed-bomb", "temper-flare", "throat-chop"] 
  },


  // --- Yungoos Line ---
  "735": { 
    base: "734", 
    extra: ["block", "body-slam", "curse", "dual-chop", "fire-punch", "fling", "focus-punch", "giga-impact", "hyper-beam", "hyper-fang", "ice-punch", "iron-head", "iron-tail", "knock-off", "low-sweep", "reversal", "stealth-rock", "stomping-tantrum", "thunder-punch"] 
  },


  // --- Grubbin Line ---
  "737": { 
    base: "736", 
    extra: ["iron-defense"] 
  },

  "738": { 
    base: "737", 
    extra: ["agility", "air-slash", "bug-buzz", "bulldoze", "dual-wingbeat", "energy-ball", "flash-cannon", "fly", "giga-impact", "guillotine", "hyper-beam", "laser-focus", "signal-beam", "solar-beam", "supercell-slam", "swift", "tailwind", "zap-cannon"] 
  },


  // --- Crabrawler Line ---
  "740": { 
    base: "739", 
    extra: ["avalanche", "giga-impact", "hard-press", "heavy-slam", "hyper-beam", "ice-hammer", "ice-spinner", "scary-face"] 
  },


  // --- Cutiefly Line ---
  "743": { 
    base: "742", 
    extra: ["giga-impact", "hyper-beam", "lunge", "nature-power", "stored-power"] 
  },


  // --- Rockruff Line ---
  "745": { 
    base: "744", 
    extra: ["accelerock", "brick-break", "bulk-up", "close-combat", "drill-run", "giga-impact", "hyper-voice", "quick-attack", "quick-guard", "rock-blast", "stone-edge", "swords-dance", "tail-slap"] 
  },


  // --- Mareanie Line ---
  "748": { 
    base: "747", 
    extra: ["baneful-bunker", "block", "body-slam", "cross-poison", "giga-impact", "hyper-beam", "light-screen", "recover", "scary-face", "smack-down"] 
  },


  // --- Mudbray Line ---
  "750": { 
    base: "749", 
    extra: ["focus-blast", "giga-impact", "heavy-slam", "hyper-beam", "lash-out", "mud-shot", "revenge", "scary-face"] 
  },


  // --- Dewpider Line ---
  "752": { 
    base: "751", 
    extra: ["dive", "giga-impact", "hyper-beam", "laser-focus", "reflect", "safeguard", "scary-face", "wide-guard"] 
  },


  // --- Fomantis Line ---
  "754": { 
    base: "753", 
    extra: ["aerial-ace", "brick-break", "cross-poison", "giga-impact", "hyper-beam", "knock-off", "laser-focus", "low-sweep", "night-slash", "pollen-puff", "psycho-cut", "rain-dance", "scary-face", "solar-blade", "superpower"] 
  },


  // --- Morelull Line ---
  "756": { 
    base: "755", 
    extra: ["charge-beam", "drain-punch", "giga-impact", "hyper-beam", "rain-dance", "weather-ball"] 
  },


  // --- Salandit Line ---
  "758": { 
    base: "757", 
    extra: ["acrobatics", "body-slam", "breaking-swipe", "captivate", "corrosive-gas", "cross-poison", "disable", "dragon-cheer", "dragon-dance", "dragon-pulse", "dragon-tail", "encore", "fake-tears", "fire-lash", "giga-impact", "hyper-beam", "hyper-voice", "laser-focus", "pound"] 
  },


  // --- Stufful Line ---
  "760": { 
    base: "759", 
    extra: ["body-press", "body-slam", "close-combat", "darkest-lariat", "dragon-claw", "drain-punch", "giga-impact", "high-horsepower", "hyper-beam", "low-kick", "revenge", "reversal", "shadow-claw"] 
  },


  // --- Bounsweet Line ---
  "762": { 
    base: "761", 
    extra: ["captivate", "double-slap", "fling", "knock-off", "low-sweep", "payback", "petal-blizzard", "stomp", "triple-axel"] 
  },

  "763": { 
    base: "762", 
    extra: ["acrobatics", "giga-impact", "high-jump-kick", "hyper-beam", "low-kick", "power-whip", "punishment", "taunt", "trop-kick", "u-turn"] 
  },


  // --- Wimpod Line ---
  "768": { 
    base: "767", 
    extra: ["blizzard", "brick-break", "bug-bite", "bug-buzz", "bulk-up", "close-combat", "dark-pulse", "dive", "drill-run", "dual-chop", "endeavor", "false-swipe", "first-impression", "fling", "focus-blast", "frost-breath", "giga-impact", "hail", "hyper-beam", "ice-beam", "icy-wind", "iron-defense", "iron-head", "knock-off", "laser-focus", "leech-life", "liquidation", "muddy-water", "mud-shot", "pain-split", "payback", "pin-missile", "poison-jab", "psych-up", "razor-shell", "rock-slide", "rock-smash", "rock-tomb", "sand-attack", "scald", "screech", "shadow-claw", "slash", "sludge-bomb", "sludge-wave", "snarl", "spikes", "spite", "sucker-punch", "surf", "swords-dance", "taunt", "throat-chop", "venoshock", "waterfall", "water-pulse", "x-scissor"] 
  },


  // --- Sandygast Line ---
  "770": { 
    base: "769", 
    extra: ["body-slam", "embargo", "giga-impact", "hyper-beam", "quash", "tera-blast", "terrain-pulse"] 
  },


  // --- Type: Null Line ---
  "773": { 
    base: "772", 
    extra: ["draco-meteor", "explosion", "fire-fang", "fire-pledge", "flamethrower", "flash-cannon", "grass-pledge", "heat-wave", "hyper-voice", "ice-beam", "ice-fang", "laser-focus", "multi-attack", "outrage", "parting-shot", "poison-fang", "psychic-fangs", "self-destruct", "shadow-ball", "steel-beam", "steel-wing", "surf", "tailwind", "thunderbolt", "thunder-fang", "water-pledge", "zen-headbutt"] 
  },


  // --- Jangmo-o Line ---
  "783": { 
    base: "782", 
    extra: ["drain-punch", "mega-kick", "mega-punch", "metal-claw", "sky-uppercut", "vacuum-wave"] 
  },

  "784": { 
    base: "783", 
    extra: ["aura-sphere", "belly-press", "boomburst", "clanging-scales", "clangorous-soul", "fire-punch", "flamethrower", "flash-cannon", "giga-impact", "helping-hand", "hyper-beam", "hyper-voice", "ice-punch", "poison-jab", "rock-polish", "shock-wave", "stealth-rock", "stomping-tantrum", "thunder-punch", "water-pulse"] 
  },


  // --- Cosmog Line ---
  "790": { 
    base: "789", 
    extra: ["cosmic-power"] 
  },

  "791": { 
    base: "790", 
    extra: ["agility", "body-slam", "bulldoze", "calm-mind", "close-combat", "crunch", "double-edge", "earthquake", "endeavor", "expanding-force", "fire-blast", "fire-spin", "flame-charge", "flamethrower", "flare-blitz", "flash-cannon", "focus-blast", "future-sight", "giga-impact", "gyro-ball", "heat-crash", "heavy-slam", "helping-hand", "hyper-beam", "hyper-voice", "iron-defense", "iron-head", "iron-tail", "knock-off", "last-resort", "light-screen", "metal-burst", "metal-claw", "metal-sound", "meteor-beam", "morning-sun", "mystical-fire", "noble-roar", "outrage", "psychic", "psychic-fangs", "psyshock", "reflect", "roar", "rock-slide", "rock-tomb", "safeguard", "scary-face", "shock-wave", "snarl", "solar-beam", "steel-beam", "steel-roller", "stone-edge", "sunny-day", "sunsteel-strike", "superpower", "swift", "take-down", "teleport", "thunder", "thunderbolt", "thunder-wave", "trick-room", "wake-up-slap", "wide-guard", "wild-charge", "work-up", "zen-headbutt"] 
  },

  "792": { 
    base: "790", 
    extra: ["acrobatics", "aerial-ace", "agility", "air-slash", "blizzard", "calm-mind", "charge-beam", "confuse-ray", "confusion", "cosmic-power", "dazzling-gleam", "defog", "dream-eater", "dual-wingbeat", "expanding-force", "fly", "focus-blast", "future-sight", "giga-impact", "heat-wave", "helping-hand", "hex", "hyper-beam", "hypnosis", "ice-beam", "icy-wind", "light-screen", "magic-coat", "magic-room", "meteor-beam", "moonblast", "moongeist-beam", "moonlight", "night-daze", "night-shade", "phantom-force", "poltergeist", "psychic", "psycho-cut", "psych-up", "psyshock", "rain-dance", "reflect", "roar", "roost", "safeguard", "scary-face", "shadow-ball", "shadow-claw", "shock-wave", "signal-beam", "sky-attack", "sky-drop", "spite", "sunny-day", "swift", "tailwind", "telekinesis", "teleport", "thunder", "thunderbolt", "thunder-wave", "trick", "trick-room", "wide-guard", "will-o-wisp", "wonder-room", "work-up"] 
  },


// --- Poipole Line ---
  "804": { 
    base: "803", 
    extra: ["acrobatics", "aerial-ace", "air-cutter", "air-slash", "ally-switch", "assurance", "breaking-swipe", "cross-poison", "dark-pulse", "draco-meteor", "dragon-claw", "dragon-dance", "dragon-pulse", "dragon-rush", "dragon-tail", "dual-wingbeat", "fire-blast", "flamethrower", "fly", "focus-energy", "giga-impact", "heat-wave", "hyper-beam", "laser-focus", "leech-life", "outrage", "scale-shot", "shadow-claw", "shock-wave", "sky-attack", "sky-drop", "smart-strike", "snarl", "spikes", "swift", "tailwind", "thief", "throat-chop", "thunderbolt", "u-turn", "x-scissor"] 
  },


  // --- Meltan Line ---
  "809": { 
    base: "808", 
    extra: ["body-press", "body-slam", "brick-break", "brutal-swing", "darkest-lariat", "discharge", "double-iron-bash", "dynamic-punch", "earthquake", "electric-terrain", "giga-impact", "gyro-ball", "heavy-slam", "high-horsepower", "hyper-beam", "ice-beam", "ice-punch", "iron-head", "mega-kick", "mega-punch", "rock-slide", "rock-tomb", "self-destruct", "solar-beam", "steel-beam", "steel-roller", "superpower", "thunder", "thunderbolt", "thunder-punch", "thunder-shock", "thunder-wave"] 
  },


  // --- Grookey Line ---
  "811": { 
    base: "810", 
    extra: ["double-edge", "double-hit", "scary-face"] 
  },

  "812": { 
    base: "811", 
    extra: ["body-press", "boomburst", "brutal-swing", "bulk-up", "bulldoze", "darkest-lariat", "drum-beating", "earth-power", "earthquake", "focus-blast", "focus-punch", "frenzy-plant", "giga-impact", "high-horsepower", "hyper-beam", "hyper-voice", "low-sweep", "mud-shot", "noble-roar", "stomping-tantrum", "superpower"] 
  },


  // --- Scorbunny Line ---
  "814": { 
    base: "813", 
    extra: ["bulk-up"] 
  },

  "815": { 
    base: "814", 
    extra: ["blast-burn", "court-change", "feint", "focus-blast", "giga-impact", "hyper-beam", "iron-head", "pyro-ball", "revenge", "shadow-ball", "smack-down", "snarl", "will-o-wisp", "zen-headbutt"] 
  },


  // --- Sobble Line ---
  "817": { 
    base: "816", 
    extra: ["fling"] 
  },

  "818": { 
    base: "817", 
    extra: ["acrobatics", "dark-pulse", "focus-energy", "giga-impact", "hydro-cannon", "hyper-beam", "ice-beam", "snipe-shot", "taunt", "vacuum-wave"] 
  },


  // --- Skwovet Line ---
  "820": { 
    base: "819", 
    extra: ["body-press", "bulldoze", "covet", "earthquake", "giga-impact", "high-horsepower", "hyper-beam", "ice-fang", "knock-off", "psychic-fangs", "rain-dance", "stomping-tantrum", "sunny-day", "superpower", "thunder-fang"] 
  },


  // --- Rookidee Line ---
  "822": { 
    base: "821", 
    extra: [] // Ίδιο moveset
  },

  "823": { 
    base: "822", 
    extra: ["body-press", "body-slam", "bulk-up", "curse", "double-edge", "flash-cannon", "giga-impact", "heavy-slam", "hyper-beam", "iron-defense", "iron-head", "light-screen", "metal-claw", "metal-sound", "rain-dance", "reflect", "rock-smash", "screech", "steel-beam", "steel-wing"] 
  },


  // --- Blipbug Line ---
  "825": { 
    base: "824", 
    extra: ["ally-switch", "attract", "body-press", "bug-buzz", "calm-mind", "confusion", "endure", "energy-ball", "expanding-force", "facade", "future-sight", "guard-swap", "helping-hand", "imprison", "iron-defense", "leech-life", "light-screen", "magic-room", "payback", "power-swap", "protect", "psychic", "psychic-terrain", "psyshock", "reflect", "rest", "round", "safeguard", "shadow-ball", "skill-swap", "sleep-talk", "snore", "solar-beam", "stored-power", "substitute", "trick", "trick-room", "wonder-room", "zen-headbutt"] 
  },

  "826": { 
    base: "825", 
    extra: ["after-you", "baton-pass", "confuse-ray", "giga-drain", "giga-impact", "hyper-beam", "hypnosis", "magic-coat", "mirror-coat", "psybeam", "psycho-cut", "u-turn"] 
  },


  // --- Nickit Line ---
  "828": { 
    base: "827", 
    extra: ["burning-jealousy", "crunch", "dark-pulse", "giga-impact", "grass-knot", "hyper-beam", "ice-fang", "lash-out", "parting-shot", "play-rough", "psychic", "shadow-ball", "shadow-claw", "thunder-fang", "u-turn"] 
  },


  // --- Gossifleur Line ---
  "830": { 
    base: "829", 
    extra: ["cotton-guard", "cotton-spore", "giga-impact", "hyper-beam", "hyper-voice", "seed-bomb", "weather-ball"] 
  },


  // --- Wooloo Line ---
  "832": { 
    base: "831", 
    extra: ["baton-pass", "body-press", "body-slam", "bounce", "giga-impact", "hyper-beam", "last-resort", "mega-kick", "retaliate", "swords-dance", "zen-headbutt"] 
  },


  // --- Chewtle Line ---
  "834": { 
    base: "833", 
    extra: ["blizzard", "body-press", "body-slam", "bulldoze", "earth-power", "earthquake", "giga-impact", "head-smash", "high-horsepower", "hyper-beam", "ice-beam", "ice-spinner", "iron-defense", "iron-tail", "megahorn", "meteor-beam", "muddy-water", "razor-shell", "rock-polish", "scary-face", "smart-strike", "stealth-rock", "stomping-tantrum", "stone-edge", "super-fang", "superpower", "swords-dance", "throat-chop"] 
  },


  // --- Yamper Line ---
  "836": { 
    base: "835", 
    extra: ["bulk-up", "eerie-impulse", "electric-terrain", "electrify", "focus-energy", "giga-impact", "hyper-beam", "hyper-voice", "psychic-fangs"] 
  },


  // --- Rolycoly Line ---
  "838": { 
    base: "837", 
    extra: ["burn-up", "fire-blast", "fire-spin", "flame-charge", "flamethrower", "flare-blitz", "heat-wave", "heavy-slam", "high-horsepower", "overheat", "scald", "scorching-sands", "temper-flare"] 
  },

  "839": { 
    base: "838", 
    extra: ["earth-power", "earthquake", "giga-impact", "hyper-beam", "mega-kick", "mega-punch", "solar-beam", "tar-shot"] 
  },


  // --- Applin Line (Flapple & Appletun) ---
  "841": { 
    base: "840", 
    extra: ["acid-spray", "acrobatics", "aerial-ace", "air-slash", "bullet-seed", "draco-meteor", "dragon-breath", "dragon-dance", "dragon-pulse", "dragon-rush", "dual-wingbeat", "endeavor", "energy-ball", "fly", "focus-energy", "giga-drain", "giga-impact", "grass-knot", "grassy-glide", "grassy-terrain", "grav-apple", "growth", "heavy-slam", "hyper-beam", "iron-defense", "leaf-storm", "leech-seed", "magical-leaf", "outrage", "pounce", "recycle", "scary-face", "seed-bomb", "solar-beam", "trailblaze", "twister", "u-turn", "wing-attack"] 
  },

  "842": { 
    base: "840", 
    extra: ["amnesia", "apple-acid", "body-press", "body-slam", "bulldoze", "bullet-seed", "curse", "draco-meteor", "dragon-pulse", "dragon-tail", "earthquake", "energy-ball", "giga-drain", "giga-impact", "grass-knot", "grassy-glide", "grassy-terrain", "growth", "gyro-ball", "headbutt", "heavy-slam", "helping-hand", "high-horsepower", "hyper-beam", "iron-defense", "iron-head", "leaf-storm", "leech-seed", "light-screen", "magical-leaf", "outrage", "payback", "pounce", "recover", "recycle", "reflect", "safeguard", "seed-bomb", "solar-beam", "stomp", "stomping-tantrum", "superpower", "sweet-scent", "trailblaze", "zen-headbutt"] 
  },


  // --- Silicobra Line ---
  "844": { 
    base: "843", 
    extra: ["body-press", "fire-fang", "giga-impact", "high-horsepower", "hurricane", "hyper-beam", "iron-defense", "iron-head", "skull-bash", "thunder-fang", "zen-headbutt"] 
  },


  // --- Arrokuda Line ---
  "847": { 
    base: "846", 
    extra: ["giga-impact", "hyper-beam", "ice-beam", "scary-face"] 
  },


  // --- Toxel Line ---
  "849": { 
    base: "848", 
    extra: ["acid-spray", "boomburst", "brick-break", "charge", "charge-beam", "discharge", "drain-punch", "eerie-impulse", "electric-terrain", "electro-ball", "electroweb", "encore", "fire-punch", "fling", "giga-impact", "gunk-shot", "helping-hand", "hex", "hyper-beam", "hyper-voice", "mega-kick", "mega-punch", "metronome", "noble-roar", "nuzzle", "overdrive", "payback", "poison-jab", "poison-tail", "psychic-noise", "rising-voltage", "scary-face", "screech", "shift-gear", "shock-wave", "sludge-bomb", "sludge-wave", "snarl", "spark", "stored-power", "swagger", "swift", "taunt", "tearful-look", "thief", "throat-chop", "thunder", "thunderbolt", "thunder-fang", "thunder-punch", "thunder-shock", "thunder-wave", "toxic-spikes", "trailblaze", "uproar", "venoshock", "volt-switch", "wild-charge"] 
  },


  // --- Sizzlipede Line ---
  "851": { 
    base: "850", 
    extra: ["fire-blast", "fire-fang", "flamethrower", "flare-blitz", "giga-impact", "hyper-beam", "inferno", "mystical-fire", "overheat", "solar-beam", "thunder-fang", "will-o-wisp", "x-scissor"] 
  },


  // --- Clobbopus Line ---
  "853": { 
    base: "852", 
    extra: ["brutal-swing", "dig", "drain-punch", "giga-impact", "hydro-pump", "hyper-beam", "octazooka", "octolock", "scary-face", "skitter-smack", "stomping-tantrum", "surf", "topsy-turvy", "whirlpool"] 
  },


  // --- Sinistea Line ---
  "855": { 
    base: "854", 
    extra: ["giga-impact", "hyper-beam", "light-screen", "pain-split", "reflect", "self-destruct", "strength-sap", "teatime"] 
  },


  // --- Hatenna Line ---
  "857": { 
    base: "856", 
    extra: ["brutal-swing"] 
  },

  "858": { 
    base: "857", 
    extra: ["agility", "giga-impact", "gravity", "guard-swap", "hyper-beam", "magic-powder", "magic-room", "misty-explosion", "pain-split", "power-swap", "psychic-noise", "psychic-terrain", "psycho-cut"] 
  },


  // --- Impidimp Line ---
  "860": { 
    base: "859", 
    extra: ["false-surrender", "imprison", "shadow-claw"] 
  },

  "861": { 
    base: "860", 
    extra: ["body-press", "body-slam", "brick-break", "bulk-up", "crunch", "darkest-lariat", "focus-blast", "focus-energy", "focus-punch", "giga-impact", "hammer-arm", "hyper-beam", "ice-punch", "low-sweep", "power-swap", "power-up-punch", "power-whip", "spirit-break", "stomping-tantrum", "superpower", "thunder-punch", "thunder-wave"] 
  },


  // --- Milcery Line ---
  "869": { 
    base: "868", 
    extra: ["calm-mind", "decorate", "disarming-voice", "drain-punch", "encore", "endeavor", "energy-ball", "fake-tears", "giga-drain", "giga-impact", "hyper-beam", "imprison", "light-screen", "magical-leaf", "magic-room", "metronome", "misty-explosion", "mystical-fire", "pain-split", "play-rough", "psybeam", "psychic", "psych-up", "psyshock", "recover", "safeguard", "solar-beam", "stored-power", "substitute", "tera-blast", "tri-attack", "wonder-room"] 
  },


  // --- Snom Line ---
  "873": { 
    base: "872", 
    extra: ["acrobatics", "air-slash", "aurora-beam", "aurora-veil", "avalanche", "blizzard", "bug-buzz", "calm-mind", "dazzling-gleam", "defog", "dual-wingbeat", "feather-dance", "giga-drain", "giga-impact", "hail", "helping-hand", "hurricane", "hyper-beam", "ice-beam", "ice-spinner", "icicle-spear", "icy-wind", "imprison", "infestation", "leech-life", "light-screen", "lunge", "mist", "play-rough", "powder-snow", "quiver-dance", "reflect", "safeguard", "skitter-smack", "snowscape", "struggle-bug", "stun-spore", "swift", "tailwind", "triple-axel", "weather-ball", "wide-guard"] 
  },


  // --- Cufant Line ---
  "879": { 
    base: "878", 
    extra: ["giga-impact", "hard-press", "heat-crash", "heavy-slam", "hyper-beam", "knock-off", "outrage", "payback", "revenge", "scary-face", "smack-down", "snarl", "supercell-slam", "taunt"] 
  },


  // --- Dreepy Line ---
  "886": { 
    base: "885", 
    extra: ["acrobatics", "agility", "ally-switch", "assurance", "astonish", "attract", "baton-pass", "beat-up", "bite", "breaking-swipe", "brine", "curse", "dive", "double-edge", "double-hit", "draco-meteor", "dragon-cheer", "dragon-dance", "dragon-pulse", "dragon-rush", "dragon-tail", "endure", "facade", "fire-blast", "flamethrower", "helping-hand", "hex", "hydro-pump", "infestation", "last-resort", "light-screen", "lock-on", "night-shade", "outrage", "phantom-force", "pounce", "protect", "psychic-fangs", "quick-attack", "reflect", "rest", "round", "scald", "shadow-ball", "sleep-talk", "snore", "steel-wing", "substitute", "sunny-day", "surf", "swift", "take-down", "tera-blast", "thief", "thunder", "thunderbolt", "thunder-wave", "u-turn", "will-o-wisp"] 
  },

  "887": { 
    base: "886", 
    extra: ["dragon-breath", "dragon-claw", "dragon-darts", "giga-impact", "hyper-beam", "solar-beam", "sucker-punch", "tri-attack"] 
  },


  // --- Kubfu Line ---
  "892": { 
    base: "891", 
    extra: ["assurance", "attract", "aura-sphere", "beat-up", "body-press", "body-slam", "brick-break", "bulk-up", "close-combat", "coaching", "counter", "crunch", "darkest-lariat", "dark-pulse", "detect", "dig", "double-edge", "drain-punch", "dynamic-punch", "endure", "facade", "false-swipe", "fire-punch", "fling", "focus-blast", "focus-energy", "focus-punch", "foul-play", "giga-impact", "headbutt", "helping-hand", "ice-punch", "iron-defense", "iron-head", "lash-out", "leer", "low-kick", "low-sweep", "mega-kick", "mega-punch", "metal-claw", "payback", "poison-jab", "protect", "rest", "retaliate", "revenge", "reversal", "roar", "rock-slide", "rock-smash", "rock-tomb", "round", "scary-face", "sleep-talk", "snarl", "snore", "stone-edge", "substitute", "sucker-punch", "superpower", "swift", "swords-dance", "take-down", "taunt", "tera-blast", "throat-chop", "thunder-punch", "trailblaze", "u-turn", "wicked-blow", "work-up", "zen-headbutt"] 
  },


  // --- Sprigatito Line ---
  "907": { 
    base: "906", 
    extra: ["aerial-ace", "low-kick", "low-sweep", "thunder-punch"] 
  },

  "908": { 
    base: "907", 
    extra: ["aura-sphere", "dark-pulse", "double-team", "flower-trick", "foul-play", "frenzy-plant", "giga-impact", "hyper-beam", "knock-off", "lash-out", "night-slash", "pollen-puff", "power-gem", "psych-up", "skill-swap", "spikes", "thief", "throat-chop", "toxic-spikes", "trick", "trick-room", "triple-axel"] 
  },


  // --- Fuecoco Line ---
  "910": { 
    base: "909", 
    extra: ["lick"] 
  },

  "911": { 
    base: "910", 
    extra: ["blast-burn", "earth-power", "earthquake", "giga-impact", "heat-crash", "hex", "hyper-beam", "hyper-voice", "imprison", "night-shade", "poltergeist", "scary-face", "scorching-sands", "shadow-ball", "shadow-claw", "sing", "torch-song"] 
  },


  // --- Quaxly Line ---
  "913": { 
    base: "912", 
    extra: ["feather-dance", "flip-turn", "low-sweep", "triple-axel", "water-pulse"] 
  },

  "914": { 
    base: "913", 
    extra: ["aqua-step", "brick-break", "bulk-up", "close-combat", "coaching", "counter", "fling", "giga-impact", "hydro-cannon", "hyper-beam", "ice-spinner", "knock-off", "low-kick", "mega-kick", "reversal", "swords-dance", "taunt", "upper-hand", "wave-crash"] 
  },


  // --- Lechonk Line ---
  "916": { 
    base: "915", 
    extra: ["belch", "body-press", "earth-power", "energy-ball", "giga-impact", "high-horsepower", "hyper-beam", "hyper-voice", "lash-out", "stomping-tantrum", "superpower"] 
  },


  // --- Tarountula Line ---
  "918": { 
    base: "917", 
    extra: ["brick-break", "electroweb", "fling", "giga-drain", "giga-impact", "low-kick", "pain-split", "reversal", "rock-tomb", "scary-face", "silk-trap", "taunt", "upper-hand", "u-turn"] 
  },


  // --- Nymble Line ---
  "920": { 
    base: "919", 
    extra: ["aerial-ace", "axe-kick", "bounce", "brick-break", "dark-pulse", "detect", "double-edge", "fling", "giga-impact", "knock-off", "lash-out", "low-kick", "low-sweep", "spite", "swords-dance", "taunt", "throat-chop"] 
  },


  // --- Pawmi Line ---
  "922": { 
    base: "921", 
    extra: ["coaching", "focus-punch", "knock-off", "low-kick", "low-sweep", "thunder-punch", "upper-hand"] 
  },

  "923": { 
    base: "922", 
    extra: ["double-edge", "double-shock", "fire-punch", "focus-blast", "giga-impact", "grass-knot", "hyper-beam", "ice-punch", "metronome", "revival-blessing", "rock-tomb", "seed-bomb", "supercell-slam", "throat-chop"] 
  },


  // --- Tandemaus Line ---
  "925": { 
    base: "924", 
    extra: ["chilling-water", "follow-me", "giga-impact", "hyper-beam", "tidy-up", "trailblaze"] 
  },


  // --- Fidough Line ---
  "927": { 
    base: "926", 
    extra: ["body-press", "draining-kiss", "giga-impact", "hyper-beam", "scary-face"] 
  },


  // --- Smoliv Line ---
  "929": { 
    base: "928", 
    extra: [] // Ίδιο moveset
  },

  "930": { 
    base: "929", 
    extra: ["dazzling-gleam", "encore", "fling", "giga-impact", "hyper-beam", "hyper-voice", "light-screen", "metronome", "mirror-coat", "petal-blizzard", "petal-dance", "pollen-puff", "psych-up", "reflect", "safeguard"] 
  },


  // --- Nacli Line ---
  "933": { 
    base: "932", 
    extra: [] // Ίδιο moveset
  },

  "934": { 
    base: "933", 
    extra: ["avalanche", "block", "brick-break", "explosion", "fire-punch", "focus-punch", "giga-impact", "gravity", "hammer-arm", "hard-press", "hyper-beam", "ice-punch", "salt-cure", "rock-blast", "rock-tomb", "thunder-punch", "wide-guard"] 
  },


  // --- Charcadet Line (Armarouge & Ceruledge) ---
  "936": { 
    base: "935", 
    extra: ["acid-spray", "ally-switch", "armor-cannon", "aura-sphere", "calm-mind", "dark-pulse", "dragon-pulse", "energy-ball", "expanding-force", "fire-blast", "fire-spin", "flame-charge", "flamethrower", "flare-blitz", "flash-cannon", "fling", "focus-blast", "heat-wave", "helping-hand", "incinerate", "iron-defense", "lava-plume", "light-screen", "meteor-beam", "mystical-fire", "night-shade", "overheat", "psybeam", "psychic", "psychic-terrain", "psych-up", "psyshock", "reflect", "rest", "scorching-sands", "shadow-ball", "solar-beam", "spite", "stored-power", "sunny-day", "taunt", "trick", "trick-room", "weather-ball", "wide-guard", "will-o-wisp"] 
  },

  "937": { 
    base: "935", 
    extra: ["ally-switch", "bitter-blade", "brick-break", "bulk-up", "close-combat", "curse", "dragon-claw", "endure", "false-swipe", "fire-blast", "fire-spin", "flame-charge", "flamethrower", "flare-blitz", "fling", "heat-wave", "helping-hand", "hex", "incinerate", "iron-defense", "iron-head", "lava-plume", "light-screen", "night-shade", "night-slash", "overheat", "phantom-force", "poison-jab", "poltergeist", "protect", "psycho-cut", "psych-up", "quick-guard", "reflect", "rest", "shadow-ball", "shadow-claw", "shadow-sneak", "solar-blade", "spite", "stored-power", "sunny-day", "swords-dance", "taunt", "throat-chop", "vacuum-wave", "will-o-wisp", "x-scissor"] 
  },


  // --- Tadbulb Line ---
  "939": { 
    base: "938", 
    extra: ["giga-impact", "hyper-beam", "slack-off", "supercell-slam", "toxic"] 
  },


  // --- Wattrel Line ---
  "941": { 
    base: "940", 
    extra: ["giga-impact", "hyper-beam", "scary-face", "supercell-slam"] 
  },


  // --- Maschiff Line ---
  "943": { 
    base: "942", 
    extra: ["comeuppance", "curse", "giga-impact", "hyper-beam", "hyper-voice", "outrage", "pain-split", "spite", "wild-charge"] 
  },


  // --- Shroodle Line ---
  "945": { 
    base: "944", 
    extra: ["doodle", "giga-impact", "low-kick", "low-sweep", "poison-tail", "scary-face", "shadow-claw", "x-scissor"] 
  },


  // --- Bramblin Line ---
  "947": { 
    base: "946", 
    extra: ["giga-impact", "hyper-beam", "skitter-smack"] 
  },


  // --- Toedscool Line ---
  "949": { 
    base: "948", 
    extra: ["giga-impact", "hyper-beam", "reflect-type", "skitter-smack"] 
  },



  // --- Tinkatink Line ---
  "958": { 
    base: "957", 
    extra: ["rock-slide", "rock-smash", "rock-tomb"] 
  },

  "959": { 
    base: "958", 
    extra: ["bulldoze", "gigaton-hammer", "hard-press", "heavy-slam", "smack-down"] 
  },


  // --- Wigglet Line ---
  "961": { 
    base: "960", 
    extra: ["giga-impact", "hyper-beam", "pain-split", "triple-dive"] 
  },


  // --- Finizen Line ---
  "964": { 
    base: "963", 
    extra: ["bulk-up", "close-combat", "drain-punch", "flip-turn", "focus-blast", "focus-punch", "giga-impact", "grass-knot", "hard-press", "hyper-beam", "hyper-voice", "ice-punch", "iron-head", "jet-punch", "outrage", "reversal", "taunt", "throat-chop", "wave-crash"] 
  },


  // --- Varoom Line ---
  "966": { 
    base: "965", 
    extra: ["endeavor", "giga-impact", "hard-press", "heavy-slam", "high-horsepower", "hyper-beam", "lash-out", "magnet-rise", "overheat", "shift-gear", "temper-flare"] 
  },


  // --- Glimmet Line ---
  "970": { 
    base: "969", 
    extra: ["energy-ball", "flash-cannon", "giga-impact", "hyper-beam", "mortal-spin", "solar-beam", "spiky-shield"] 
  },


  // --- Greavard Line ---
  "972": { 
    base: "971", 
    extra: ["giga-impact", "hyper-beam", "last-respects", "will-o-wisp"] 
  },


  // --- Cetoddle Line ---
  "975": { 
    base: "974", 
    extra: ["giga-impact", "hard-press", "hyper-beam", "ice-punch"] 
  },


  // --- Dunsparce -> Dudunsparce ---
  "982": { 
    base: "206", // Dunsparce (Gen 2)
    extra: ["agility", "air-slash", "amnesia", "ancient-power", "boomburst", "breaking-swipe", "chilling-water", "coil", "defense-curl", "drill-run", "dual-wingbeat", "flail", "glare", "hyper-drill", "lunge", "pounce", "skitter-smack", "smart-strike", "stash", "tailwind", "throat-chop"] 
  },


  // --- Bisharp -> Kingambit ---
  "983": { 
    base: "624", // Pawniard
    extra: ["aerial-ace", "air-slash", "brick-break", "dark-pulse", "fury-cutter", "giga-impact", "guillotine", "hyper-beam", "iron-defense", "iron-head", "kowtow-cleave", "metal-burst", "metal-claw", "night-slash", "psycho-cut", "retaliate", "reversal", "shadow-claw", "slash", "snarl", "steel-beam", "stone-edge", "swords-dance", "taunt", "thunder-wave", "torment", "zen-headbutt"] 
  },


  // --- Frigibax Line ---
  "997": { 
    base: "996", 
    extra: ["iron-head", "scary-face"] 
  },

  "998": { 
    base: "997", 
    extra: ["body-press", "breaking-swipe", "bulldoze", "dragon-cheer", "earthquake", "false-swipe", "giga-impact", "glaive-rush", "helping-hand", "high-horsepower", "hyper-beam", "ice-shard", "scale-shot", "stomp", "stomping-tantrum", "thunder-fang"] 
  },


  // --- Gimmighoul -> Gholdengo ---
  "1000": { 
    base: "999", 
    extra: ["charge-beam", "confuse-ray", "dazzling-gleam", "electro-ball", "flash-cannon", "fling", "focus-blast", "focus-punch", "giga-impact", "heavy-slam", "hex", "hyper-beam", "iron-head", "light-screen", "low-kick", "low-sweep", "make-it-rain", "memento", "metal-sound", "nasty-plot", "night-shade", "poltergeist", "power-gem", "psychic", "psyshock", "recover", "reflect", "sandstorm", "shadow-ball", "steel-beam", "thunder", "thunderbolt", "thunder-punch", "thunder-wave", "trick"] 
  },


  // --- Applin -> Dipplin ---
  "1011": { 
    base: "840", // Applin
    extra: ["bullet-seed", "double-hit", "draco-meteor", "dragon-breath", "dragon-cheer", "dragon-pulse", "dragon-tail", "endure", "energy-ball", "giga-drain", "giga-impact", "grass-knot", "grassy-glide", "grassy-terrain", "growth", "gyro-ball", "hyper-beam", "infestation", "leaf-storm", "outrage", "pollen-puff", "pounce", "power-whip", "protect", "recover", "recycle", "reflect", "seed-bomb", "solar-beam", "substitute", "sucker-punch", "sunny-day", "sweet-scent", "syrup-bomb", "take-down", "tera-blast", "withdraw"] 
  },


  // --- Poltchageist -> Sinistcha ---
  "1013": { 
    base: "1012", 
    extra: ["giga-impact", "hyper-beam", "matcha-gotcha", "strength-sap"] 
  },


  // --- Dipplin -> Hydrapple ---
  "1019": { 
    base: "1011", // Dipplin
    extra: ["astonish", "body-press", "body-slam", "bulldoze", "curse", "defense-curl", "double-edge", "double-hit", "draco-meteor", "dragon-breath", "dragon-cheer", "dragon-pulse", "dragon-tail", "earth-power", "earthquake", "endure", "energy-ball", "facade", "fickle-beam", "giga-drain", "giga-impact", "grass-knot", "grassy-glide", "grassy-terrain", "growth", "gyro-ball", "heavy-slam", "hydro-pump", "hyper-beam", "infestation", "leaf-storm", "magical-leaf", "nasty-plot", "outrage", "pollen-puff", "pounce", "power-whip", "protect", "rain-dance", "recover", "recycle", "reflect", "rest", "rollout", "seed-bomb", "sleep-talk", "solar-beam", "substitute", "sucker-punch", "sunny-day", "sweet-scent", "syrup-bomb", "take-down", "tera-blast", "uproar", "withdraw", "yawn"] 
  },


// --- Rotom Forms (Base: Rotom 479) ---
  "10008": { 
    base: "479", 
    extra: ["Overheat"] // Το Overheat το έχει ήδη ή το μαθαίνει στη φόρμα του
  },

  "10009": { 
    base: "479", 
    extra: ["hydro-pump"] 
  },

  "10010": { 
    base: "479", 
    extra: ["blizzard"] 
  },

  "10011": { 
    base: "479", 
    extra: ["air-slash"] 
  },

  "10012": { 
    base: "479", 
    extra: ["leaf-storm"] 
  },


  // --- Alolan Raticate ---
  "10092": { 
    base: "10091", 
    extra: ["giga-impact", "hyper-beam", "roar", "stomping-tantrum", "throat-chop"] 
  },


  // --- Alolan Sandslash ---
  "10095": { 
    base: "10094", 
    extra: ["giga-impact", "hyper-beam", "steel-beam", "steel-roller"] 
  },


  // --- Alolan Ninetales ---
  "10097": { 
    base: "10096", 
    extra: ["dream-eater", "giga-impact", "hyper-beam", "nasty-plot", "psyshock", "wonder-room"] 
  },


  // --- Alolan Diglett -> Alolan Dugtrio ---
  "10099": { 
    base: "10098", 
    extra: ["giga-impact", "hyper-beam", "night-slash", "tri-attack"] 
  },


  // --- Alolan Meowth -> Alolan Persian ---
  "10101": { 
    base: "10100", 
    extra: ["giga-impact", "hyper-beam", "hyper-voice", "quash", "roar", "switcheroo"] 
  },


  // --- Alolan Geodude -> Alolan Graveler -> Alolan Golem ---
  "10103": { 
    base: "10102", 
    extra: [] 
  },

  "10104": { 
    base: "10103", 
    extra: ["giga-impact", "heavy-slam", "hyper-beam", "roar"] 
  },


  // --- Alolan Marowak ---
  "10106": { 
    base: "10105", 
    extra: ["focus-blast", "giga-impact", "giga-drain", "hyper-beam", "rock-climb", "stone-edge", "strength"] 
  },


  // --- Totem Marowak ---
  "10108": { 
    base: "10105", 
    extra: ["aerial-ace", "avalanche", "blizzard", "body-slam", "bone-club", "bonemerang", "bone-rush", "brick-break", "brutal-swing", "bulldoze", "dark-pulse", "double-edge", "double-team", "earth-power", "earthquake", "endeavor", "endure", "facade", "false-swipe", "fire-blast", "fire-spin", "flame-charge", "flamethrower", "flare-blitz", "fling", "focus-blast", "focus-energy", "frustration", "giga-impact", "growl", "hex", "hidden-power", "hyper-beam", "ice-beam", "icy-wind", "imprison", "incinerate", "iron-head", "iron-tail", "knock-off", "laser-focus", "outrage", "pain-split", "perish-song", "poltergeist", "protect", "rest", "retaliate", "return", "rock-slide", "rock-smash", "rock-tomb", "round", "sandstorm", "screech", "secret-power", "shadow-ball", "shadow-bone", "shadow-claw", "skitter-smack", "skull-bash", "sleep-talk", "smack-down", "snore", "stealth-rock", "stomping-tantrum", "stone-edge", "substitute", "sunny-day", "swagger", "swords-dance", "tail-whip", "thief", "thrash", "toxic", "will-o-wisp"] 
  },


// --- Galarian Rapidash ---
  "10163": { 
    base: "10162", // Galarian Ponyta
    extra: ["giga-impact", "hyper-beam", "megahorn", "psycho-cut", "smart-strike", "swords-dance"] 
  },


  // --- Galarian Slowbro ---
  "10165": { 
    base: "10164", // Galarian Slowpoke
    extra: ["body-press", "brick-break", "drain-punch", "giga-impact", "hyper-beam", "iron-defense", "mega-kick", "mega-punch", "nasty-plot", "poison-jab", "shell-side-arm", "sludge-bomb", "sludge-wave", "venoshock", "withdraw"] 
  },


  // --- Galarian Weezing ---
  "10167": { 
    base: "110", // Weezing (Base Kanto)
    extra: ["aromatic-mist", "building-smash", "corrosive-gas", "defog", "fairy-wind", "gyro-ball", "play-rough", "strange-steam"] 
  },


  // --- Galarian Zapdos ---
  "10170": { 
    base: "145", // Zapdos (Base Kanto)
    extra: ["assurance", "brave-bird", "brick-break", "bulk-up", "close-combat", "counter", "detect", "drill-peck", "dual-wingbeat", "focus-energy", "giga-impact", "hurricane", "hyper-beam", "low-kick", "peck", "pluck", "quick-guard", "retaliate", "reversal", "rock-smash", "stomp", "taunt", "thunderous-kick", "u-turn"] 
  },


  // --- Galarian Slowking ---
  "10172": { 
    base: "10164", // Galarian Slowpoke
    extra: ["block", "eerie-spell", "giga-impact", "hyper-beam", "power-gem", "psychic-terrain", "sludge-bomb"] 
  },


  // --- Hisuian Growlithe -> Hisuian Arcanine ---
  "10175": { 
    base: "10174", // Hisuian Growlithe
    extra: ["giga-impact", "hyper-beam"] 
  },

  "10177": { 
    base: "10176", // Hisuian Sneasel / or placeholder, here based on Hisuian Arcanine relative to Growlithe
    extra: ["giga-impact", "hyper-beam", "stone-edge"] 
  },


  // --- Hisuian Qwilfish ---
  "10179": { 
    base: "211", // Qwilfish (Base Johto)
    extra: ["bide", "bounce", "bulldoze", "curse", "dig", "earth-power", "earthquake", "eerie-impulse", "fissure", "flail", "flash-cannon", "foul-play", "ice-fang", "infestation", "metal-claw", "mud-shot", "mud-slap", "muddy-water", "pain-split", "payback", "reflect-type", "revenge", "rock-slide", "rock-tomb", "scald", "screech", "shock-wave", "sludge-bomb", "sludge-wave", "snap-trap", "spite", "stealth-rock", "stomping-tantrum", "stone-edge", "sucker-punch", "surf", "tackle", "thunder-fang", "thunder-wave", "water-gun", "yawn"] 
  },


  // --- Hisuian Arcanine ---
  "10230": { 
    base: "10229", // Hisuian Growlithe
    extra: ["extreme-speed", "giga-impact", "hyper-beam", "stone-edge"] 
  },


  // --- Hisuian Electrode ---
  "10232": { 
    base: "10231", // Hisuian Voltorb
    extra: ["giga-impact", "hyper-beam"] 
  },


  // --- Hisuian Zoroark ---
  "10239": { 
    base: "10238", // Hisuian Zorua
    extra: ["focus-blast", "giga-impact", "hyper-beam", "trick"] 
  },


  // --- Bloodmoon Ursaluna ---
  "10242": { 
    base: "901", // Ursaluna (Base Hisui)
    extra: ["fire-blast", "flamethrower", "giga-impact", "hyper-beam", "shelter"] 
  },


  // --- Hisuian Avalugg ---
  "10243": { 
    base: "713", // Avalugg (Base Kalos)
    extra: ["avalanche", "crunch", "earth-power", "earthquake", "flash-cannon", "high-horsepower", "iron-defense", "rock-smash", "stealth-rock", "stone-edge"] 
  },


  // --- Paldean Tauros (Blaze Breed & Aqua Breed) ---
  "10251": { 
    base: "10250", // Paldean Tauros (Combat Breed)
    extra: ["flare-blitz", "will-o-wisp"] 
  },

  "10252": { 
    base: "10250", // Paldean Tauros (Combat Breed)
    extra: ["wave-crash"] 
  },


  // --- Therian Forms ---
  "10019": { base: "641", extra: [] },

  "10020": { base: "642", extra: [] },

  "10026": { base: "645", extra: [] },


  // --- Mega Evolutions ---
  "10033": { base: "3", extra: [] },

  "10034": { base: "6", extra: [] },

  "10035": { base: "6", extra: [] },

  "10036": { base: "9", extra: [] },

  "10037": { base: "65", extra: [] },

  "10038": { base: "94", extra: [] },

  "10039": { base: "115", extra: [] },

  "10040": { base: "127", extra: [] },

  "10041": { base: "130", extra: [] },

  "10042": { base: "142", extra: [] },

  "10043": { base: "150", extra: [] },

  "10044": { base: "150", extra: [] },

  "10045": { base: "181", extra: [] },

  "10046": { base: "212", extra: [] },

  "10047": { base: "214", extra: [] },

  "10048": { base: "229", extra: [] },

  "10049": { base: "248", extra: [] },

  "10050": { base: "257", extra: [] },

  "10051": { base: "282", extra: [] },

  "10052": { base: "303", extra: [] },

  "10053": { base: "306", extra: [] },

  "10054": { base: "308", extra: [] },

  "10055": { base: "310", extra: [] },

  "10056": { base: "354", extra: [] },

  "10057": { base: "359", extra: [] },

  "10058": { base: "445", extra: [] },

  "10059": { base: "448", extra: [] },

  "10060": { base: "460", extra: [] },

  "10061": { base: "15", extra: [] },

  "10062": { base: "18", extra: [] },

  "10063": { base: "80", extra: [] },

  "10064": { base: "208", extra: [] },

  "10065": { base: "254", extra: [] },

  "10066": { base: "260", extra: [] },

  "10067": { base: "302", extra: [] },

  "10068": { base: "319", extra: [] },

  "10069": { base: "323", extra: [] },

  "10070": { base: "334", extra: [] },

  "10071": { base: "362", extra: [] },

  "10072": { base: "373", extra: [] },

  "10073": { base: "376", extra: [] },

  "10074": { base: "380", extra: [] },

  "10075": { base: "381", extra: [] },

  "10076": { base: "384", extra: [] },

  "10077": { base: "428", extra: [] },

  "10078": { base: "475", extra: [] },

  "10079": { base: "531", extra: [] },

  "10080": { base: "719", extra: [] }

};


// --- move-evolutions.js : Κληρονομικότητα & Αλφαβητική Ταξινόμηση ---
if (typeof MOVES_BY_POKEMON !== 'undefined') {
  for (let evoId in EVOLUTION_EXTENSIONS) {
    let config = EVOLUTION_EXTENSIONS[evoId];
    let baseMoves = MOVES_BY_POKEMON[config.base] || [];
    
    if (baseMoves.length > 0) {
      // 1. Ενώνουμε τα βασικά moves με τα extra
      let combinedMoves = new Set([...baseMoves, ...(config.extra || [])]);
      
      // 2. Τα μετατρέπουμε σε Array και τα ταξινομούμε αλφαβητικά (A-Z)
      let sortedMoves = Array.from(combinedMoves).sort();
      
      // 3. Τα αποθηκεύουμε
      MOVES_BY_POKEMON[evoId] = sortedMoves;
    }
  }
}
