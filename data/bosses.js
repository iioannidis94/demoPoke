// --- data/bosses.js : Boss Trainer Data ---
// Structure: each boss has id, name, title, region, location, and difficulties (easy / medium / hard).
// Each difficulty contains a list of Pokémon with name, nature, ability, item, and moves (one or more).
//
// {
//   id: 'trainer-id',
//   name: 'Trainer Name',
//   title: 'Trainer Title / Class',
//   region: 'Kanto' | 'Johto' | 'Hoenn' | 'Sinnoh',
//   location: 'Location Name',
//   difficulties: {
//     easy:   { pokemon: [ { name, nature, ability, item, moves: [] } ] },
//     medium: { pokemon: [ { name, nature, ability, item, moves: [] } ] },
//     hard:   { pokemon: [ { name, nature, ability, item, moves: [] } ] },
//   }
// }
//
// Difficulty rules:
//   Easy  : No EVs, no items, weakened moves.
//   Medium: 252 EVs per stat, items.
//   Hard  : 400 EVs per stat, items. The player cannot use battle items (Revives etc.).

const BOSSES = [


    // ══════════════════════════════════════════════════════════════════════════
    // KANTO
    // ══════════════════════════════════════════════════════════════════════════

    {
        id: 'professor-oak',
        name: 'Professor Oak',
        title: '',
        region: 'Kanto',
        location: 'Cinnabar Island (Lab Room 2)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'rotom-wash',  nature: 'Bold',    ability: 'Levitate',     item: 'Leftovers',    moves: ['Defog', 'Thunderbolt', 'Hydro Pump', 'Reflect'] },
                    { name: 'venusaur',    nature: 'Modest',  ability: 'Overgrow',     item: 'Black Sludge', moves: ['Petal Dance', 'Sleep Powder', 'Sludge Bomb', 'Leech Seed'] },
                    { name: 'charizard',   nature: '',        ability: 'Tough Claws',  item: 'Charizardite X', moves: ['Flare Blitz', 'Dragon Dance', 'Dragon Claw', 'Earthquake'] },
                    { name: 'blastoise',   nature: 'Modest',  ability: 'Torrent',      item: 'Sitrus Berry', moves: ['Hydro Pump', 'Dark Pulse', 'Toxic', 'Ice Beam'] },
                    { name: 'tauros',      nature: 'Jolly',   ability: 'Sheer Force',  item: 'Life Orb',     moves: ['Rock Climb', 'Earthquake', 'Rock Slide', 'Iron Tail'] },
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Lum Berry',    moves: ['Outrage', 'Dragon Dance', 'Fire Punch', 'Extreme Speed'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'rotom-wash',  nature: 'Bold',    ability: 'Levitate',     item: 'Leftovers',    moves: ['Defog', 'Thunderbolt', 'Hydro Pump', 'Reflect'] },
                    { name: 'venusaur',    nature: 'Modest',  ability: 'Overgrow',     item: 'Black Sludge', moves: ['Petal Dance', 'Sleep Powder', 'Sludge Bomb', 'Leech Seed'] },
                    { name: 'charizard',   nature: '',        ability: 'Tough Claws',  item: 'Charizardite X', moves: ['Flare Blitz', 'Dragon Dance', 'Dragon Claw', 'Earthquake'] },
                    { name: 'blastoise',   nature: 'Modest',  ability: 'Torrent',      item: 'Sitrus Berry', moves: ['Hydro Pump', 'Dark Pulse', 'Toxic', 'Ice Beam'] },
                    { name: 'tauros',      nature: 'Jolly',   ability: 'Sheer Force',  item: 'Life Orb',     moves: ['Rock Climb', 'Earthquake', 'Rock Slide', 'Iron Tail'] },
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Lum Berry',    moves: ['Outrage', 'Dragon Dance', 'Fire Punch', 'Extreme Speed'] },
                ]
            }
        }
    },
    {
        id: 'erika',
        name: 'Erika',
        title: '',
        region: 'Kanto',
        location: 'Viridian Maze',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'ferrothorn',  nature: 'Relaxed', ability: 'Iron Barbs',   item: 'Rocky Helmet', moves: ['Power Whip', 'Gyro Ball', 'Bulldoze', 'Explosion'] },
                    { name: 'volcarona',   nature: 'Timid',   ability: 'Swarm',        item: 'Passho Berry', moves: ['Bug Buzz', 'Flamethrower', 'Giga Drain', 'Quiver Dance'] },
                    { name: 'ludicolo',    nature: 'Timid',   ability: 'Swift Swim',   item: 'Life Orb',     moves: ['Focus Blast', 'Hydro Pump', 'Giga Drain', 'Ice Beam'] },
                    { name: 'celebi',      nature: 'Timid',   ability: 'Natural Cure', item: 'Leftovers',    moves: ['Thunder Wave', 'Earth Power', 'Nasty Plot', 'Psychic'] },
                    { name: 'torterra',    nature: 'Adamant', ability: 'Overgrow',     item: 'Focus Sash',   moves: ['Wood Hammer', 'Earthquake', 'Stone Edge', 'Synthesis'] },
                    { name: 'tangrowth',   nature: 'Sassy',   ability: 'Leaf Guard',   item: 'Assault Vest', moves: ['Earthquake', 'Power Whip', 'Sludge Bomb', 'Ancient Power'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'ferrothorn',  nature: 'Relaxed', ability: 'Iron Barbs',   item: 'Rocky Helmet', moves: ['Power Whip', 'Gyro Ball', 'Bulldoze', 'Explosion'] },
                    { name: 'volcarona',   nature: 'Timid',   ability: 'Swarm',        item: 'Passho Berry', moves: ['Bug Buzz', 'Flamethrower', 'Giga Drain', 'Quiver Dance'] },
                    { name: 'ludicolo',    nature: 'Timid',   ability: 'Swift Swim',   item: 'Life Orb',     moves: ['Focus Blast', 'Hydro Pump', 'Giga Drain', 'Ice Beam'] },
                    { name: 'celebi',      nature: 'Timid',   ability: 'Natural Cure', item: 'Leftovers',    moves: ['Thunder Wave', 'Earth Power', 'Nasty Plot', 'Psychic'] },
                    { name: 'torterra',    nature: 'Adamant', ability: 'Overgrow',     item: 'Focus Sash',   moves: ['Wood Hammer', 'Earthquake', 'Stone Edge', 'Synthesis'] },
                    { name: 'tangrowth',   nature: 'Sassy',   ability: 'Leaf Guard',   item: 'Assault Vest', moves: ['Earthquake', 'Power Whip', 'Sludge Bomb', 'Ancient Power'] },
                ]
            }
        }
    },
    {
        id: 'george',
        name: 'George',
        title: '',
        region: 'Kanto',
        location: 'Pewter Jail',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'arcanine',    nature: 'Adamant', ability: 'Intimidate',   item: 'Leftovers',    moves: ['Flare Blitz', 'Will-O-Wisp', 'Close Combat', 'Extreme Speed'] },
                    { name: 'stoutland',   nature: 'Adamant', ability: 'Scrappy',      item: 'Choice Band',  moves: ['Return', 'Crunch', 'Superpower', 'Play Rough'] },
                    { name: 'granbull',    nature: 'Impish',  ability: 'Intimidate',   item: 'Sitrus Berry', moves: ['Play Rough', 'Thunder Wave', 'Earthquake', 'Stone Edge'] },
                    { name: 'houndoom',    nature: 'Timid',   ability: 'Flash Fire',   item: 'Life Orb',     moves: ['Nasty Plot', 'Fire Blast', 'Dark Pulse', 'Sludge Bomb'] },
                    { name: 'manectric',   nature: 'Timid',   ability: 'Minus',        item: 'Life Orb',     moves: ['Thunder', 'Flamethrower', 'Thunder Wave', 'Roar'] },
                    { name: 'lucario',     nature: 'Adamant', ability: 'Adaptability', item: 'Lucarionite',  moves: ['Close Combat', 'Meteor Mash', 'Crunch', 'Ice Punch'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'arcanine',    nature: 'Adamant', ability: 'Intimidate',   item: 'Leftovers',    moves: ['Flare Blitz', 'Will-O-Wisp', 'Close Combat', 'Extreme Speed'] },
                    { name: 'stoutland',   nature: 'Adamant', ability: 'Scrappy',      item: 'Choice Band',  moves: ['Return', 'Crunch', 'Superpower', 'Play Rough'] },
                    { name: 'granbull',    nature: 'Impish',  ability: 'Intimidate',   item: 'Sitrus Berry', moves: ['Play Rough', 'Thunder Wave', 'Earthquake', 'Stone Edge'] },
                    { name: 'houndoom',    nature: 'Timid',   ability: 'Flash Fire',   item: 'Life Orb',     moves: ['Nasty Plot', 'Fire Blast', 'Dark Pulse', 'Sludge Bomb'] },
                    { name: 'manectric',   nature: 'Timid',   ability: 'Minus',        item: 'Life Orb',     moves: ['Thunder', 'Flamethrower', 'Thunder Wave', 'Roar'] },
                    { name: 'lucario',     nature: 'Adamant', ability: 'Adaptability', item: 'Lucarionite',  moves: ['Close Combat', 'Meteor Mash', 'Crunch', 'Ice Punch'] },
                ]
            }
        }
    },
    {
        id: 'officer-shamac',
        name: 'Officer Shamac',
        title: '',
        region: 'Kanto',
        location: 'Pewter City (Jail)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'swampert',    nature: 'Relaxed', ability: 'Swift Swim',   item: 'Swampertite',  moves: ['Stone Edge', 'Earthquake', 'Waterfall', 'Ice Beam', 'Toxic', 'Superpower', 'Ice Punch'] },
                    { name: 'swellow',     nature: 'Timid',   ability: 'Guts',         item: 'Choice Specs', moves: ['Hurricane', 'Boomburst', 'Heat Wave', 'Ominous Wind'] },
                    { name: 'goodra',      nature: 'Modest',  ability: 'Sap Sipper',   item: 'Assault Vest', moves: ['Fire Blast', 'Draco Meteor', 'Thunder', 'Sludge Wave'] },
                    { name: 'lapras',      nature: 'Modest',  ability: 'Water Absorb', item: 'Mystic Water', moves: ['Hydro Pump', 'Blizzard', 'Sheer Cold', 'Sing'] },
                    { name: 'cinccino',    nature: 'Jolly',   ability: 'Skill Link',   item: 'Choice Band',  moves: ['Tail Slap', 'Rock Blast', 'Bullet Seed', 'Knock Off'] },
                    { name: 'latias',      nature: 'Timid',   ability: 'Levitate',     item: 'Life Orb',     moves: ['Draco Meteor', 'Psyshock', 'Thunderbolt', 'Surf'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'swampert',    nature: 'Relaxed', ability: 'Swift Swim',   item: 'Swampertite',  moves: ['Stone Edge', 'Earthquake', 'Waterfall', 'Ice Beam', 'Toxic', 'Superpower', 'Ice Punch'] },
                    { name: 'swellow',     nature: 'Timid',   ability: 'Guts',         item: 'Choice Specs', moves: ['Hurricane', 'Boomburst', 'Heat Wave', 'Ominous Wind'] },
                    { name: 'goodra',      nature: 'Modest',  ability: 'Sap Sipper',   item: 'Assault Vest', moves: ['Fire Blast', 'Draco Meteor', 'Thunder', 'Sludge Wave'] },
                    { name: 'lapras',      nature: 'Modest',  ability: 'Water Absorb', item: 'Mystic Water', moves: ['Hydro Pump', 'Blizzard', 'Sheer Cold', 'Sing'] },
                    { name: 'cinccino',    nature: 'Jolly',   ability: 'Skill Link',   item: 'Choice Band',  moves: ['Tail Slap', 'Rock Blast', 'Bullet Seed', 'Knock Off'] },
                    { name: 'latias',      nature: 'Timid',   ability: 'Levitate',     item: 'Life Orb',     moves: ['Draco Meteor', 'Psyshock', 'Thunderbolt', 'Surf'] },
                ]
            }
        }
    },
    {
        id: 'guardian-entei',
        name: 'Guardian (Entei)',
        title: '',
        region: 'Kanto',
        location: 'Route 25 (Route 25 Cave)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'entei',       nature: 'Adamant', ability: 'Pressure',     item: 'Choice Band',  moves: ['Sacred Fire', 'Extreme Speed', 'Stone Edge', 'Iron Tail', 'Flare Blitz'] },
                    { name: 'infernape',   nature: 'Jolly',   ability: 'Iron Fist',    item: 'Life Orb',     moves: ['Close Combat', 'Flare Blitz', 'Gunk Shot', 'Thunder Punch'] },
                    { name: 'reshiram',    nature: 'Modest',  ability: 'Turboblaze',   item: 'Choice Specs', moves: ['Blue Flare', 'Dragon Pulse', 'Focus Blast', 'Shadow Ball'] },
                    { name: 'gliscor',     nature: 'Jolly',   ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Swords Dance', 'Earthquake', 'Facade', 'Knock Off'] },
                    { name: 'serperior',   nature: 'Timid',   ability: 'Contrary',     item: 'Miracle Seed', moves: ['Leaf Storm', 'Dragon Pulse', 'Leech Seed', 'Giga Drain'] },
                    { name: 'chandelure',  nature: 'Modest',  ability: 'Flame Body',   item: 'Choice Scarf', moves: ['Shadow Ball', 'Fire Blast', 'Energy Ball', 'Psychic'] },
                ]
            }
        }
    },
    {
        id: 'naero',
        name: 'Naero',
        title: '',
        region: 'Kanto',
        location: 'Cerulean Cave B1F',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'togekiss',    nature: 'Timid',   ability: 'Serene Grace', item: 'Sitrus Berry', moves: ['Air Slash', 'Flamethrower', 'Aura Sphere', 'Dazzling Gleam'] },
                    { name: 'snorlax',     nature: 'Adamant', ability: 'Thick Fat',    item: 'Leftovers',    moves: ['Crunch', 'Body Slam', 'Fire Punch', 'Earthquake'] },
                    { name: 'mr-mime',     nature: 'Modest',  ability: 'Filter',       item: 'Focus Sash',   moves: ['Psychic', 'Focus Blast', 'Dazzling Gleam', 'Shadow Ball'] },
                    { name: 'blissey',     nature: 'Bold',    ability: 'Natural Cure', item: 'Leftovers',    moves: ['Toxic', 'Soft-Boiled', 'Seismic Toss', 'Wish'] },
                    { name: 'electivire',  nature: 'Adamant', ability: 'Vital Spirit', item: 'Life Orb',     moves: ['Wild Charge', 'Fire Punch', 'Cross Chop', 'Ice Punch'] },
                    { name: 'magmortar',   nature: 'Rash',    ability: 'Flame Body',   item: 'Life Orb',     moves: ['Fire Blast', 'Earthquake', 'Thunderbolt', 'Focus Blast'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'togekiss',    nature: 'Timid',   ability: 'Serene Grace', item: 'Sitrus Berry', moves: ['Air Slash', 'Flamethrower', 'Aura Sphere', 'Dazzling Gleam'] },
                    { name: 'snorlax',     nature: 'Adamant', ability: 'Thick Fat',    item: 'Leftovers',    moves: ['Crunch', 'Body Slam', 'Fire Punch', 'Earthquake'] },
                    { name: 'mr-mime',     nature: 'Modest',  ability: 'Filter',       item: 'Focus Sash',   moves: ['Psychic', 'Focus Blast', 'Dazzling Gleam', 'Shadow Ball'] },
                    { name: 'blissey',     nature: 'Bold',    ability: 'Natural Cure', item: 'Leftovers',    moves: ['Toxic', 'Soft-Boiled', 'Seismic Toss', 'Wish'] },
                    { name: 'electivire',  nature: 'Adamant', ability: 'Vital Spirit', item: 'Life Orb',     moves: ['Wild Charge', 'Fire Punch', 'Cross Chop', 'Ice Punch'] },
                    { name: 'magmortar',   nature: 'Rash',    ability: 'Flame Body',   item: 'Life Orb',     moves: ['Fire Blast', 'Earthquake', 'Thunderbolt', 'Focus Blast'] },
                ]
            }
        }
    },
    {
        id: 'koichi',
        name: 'Koichi',
        title: '',
        region: 'Kanto',
        location: 'Saffron Dojo',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'lucario',     nature: 'Modest',  ability: 'Steadfast',    item: 'Life Orb',     moves: ['Nasty Plot', 'Focus Blast', 'Dark Pulse', 'Flash Cannon'] },
                    { name: 'hitmonchan',  nature: 'Adamant', ability: 'Iron Fist',    item: 'Focus Sash',   moves: ['Counter', 'Close Combat', 'Fire Punch', 'Ice Punch'] },
                    { name: 'hitmontop',   nature: 'Impish',  ability: 'Technician',   item: 'Leftovers',    moves: ['Close Combat', 'Endeavor', 'Earthquake', 'Stone Edge'] },
                    { name: 'hitmonlee',   nature: 'Jolly',   ability: 'Reckless',     item: 'Focus Sash',   moves: ['Knock Off', 'High Jump Kick', 'Poison Jab', 'Blaze Kick'] },
                    { name: 'gallade',     nature: 'Jolly',   ability: 'Inner Focus',  item: 'Galladite',    moves: ['Close Combat', 'Zen Headbutt', 'Leaf Blade', 'Swords Dance'] },
                    { name: 'pangoro',     nature: 'Adamant', ability: 'Mold Breaker', item: 'Black Glasses',moves: ['Crunch', 'Hammer Arm', 'Gunk Shot', 'Fire Punch'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'lucario',     nature: 'Modest',  ability: 'Steadfast',    item: 'Life Orb',     moves: ['Nasty Plot', 'Focus Blast', 'Dark Pulse', 'Flash Cannon'] },
                    { name: 'hitmonchan',  nature: 'Adamant', ability: 'Iron Fist',    item: 'Focus Sash',   moves: ['Counter', 'Close Combat', 'Fire Punch', 'Ice Punch'] },
                    { name: 'hitmontop',   nature: 'Impish',  ability: 'Technician',   item: 'Leftovers',    moves: ['Close Combat', 'Endeavor', 'Earthquake', 'Stone Edge'] },
                    { name: 'hitmonlee',   nature: 'Jolly',   ability: 'Reckless',     item: 'Focus Sash',   moves: ['Knock Off', 'High Jump Kick', 'Poison Jab', 'Blaze Kick'] },
                    { name: 'gallade',     nature: 'Jolly',   ability: 'Inner Focus',  item: 'Galladite',    moves: ['Close Combat', 'Zen Headbutt', 'Leaf Blade', 'Swords Dance'] },
                    { name: 'pangoro',     nature: 'Adamant', ability: 'Mold Breaker', item: 'Black Glasses',moves: ['Crunch', 'Hammer Arm', 'Gunk Shot', 'Fire Punch'] },
                ]
            }
        }
    },
    {
        id: 'chuck',
        name: 'Chuck',
        title: '',
        region: 'Kanto',
        location: "Saffron City (Gold's Gym)",
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'machamp',     nature: 'Adamant', ability: 'No Guard',     item: '',             moves: ['Cross Chop', 'Submission', 'Revenge', 'Brick Break'] },
                    { name: 'infernape',   nature: 'Timid',   ability: 'Blaze',        item: '',             moves: ['Overheat', 'Heat Wave', 'Vacuum Wave', 'Focus Blast'] },
                    { name: 'mienshao',    nature: 'Jolly',   ability: 'Regenerator',  item: '',             moves: ['Jump Kick', 'Bounce', 'Brick Break', 'Aerial Ace'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Iron Fist',    item: '',             moves: ['Wake-Up Slap', 'Rock Slide', 'Brick Break', 'Bulldoze'] },
                    { name: 'poliwrath',   nature: 'Modest',  ability: 'Water Absorb', item: '',             moves: ['Surf', 'Icy Wind', 'Hyper Beam', 'Psychic'] },
                    { name: 'breloom',     nature: 'Jolly',   ability: 'Poison Heal',  item: '',             moves: ['Force Palm', 'Leech Seed', 'Sky Uppercut', 'Bullet Seed'] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'machamp',     nature: 'Adamant', ability: 'No Guard',     item: 'Assault Vest', moves: ['Dynamic Punch', 'Stone Edge', 'Heavy Slam', 'Fire Punch'] },
                    { name: 'infernape',   nature: 'Timid',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Fire Blast', 'Focus Blast', 'Vacuum Wave', 'Grass Knot'] },
                    { name: 'mienshao',    nature: 'Jolly',   ability: 'Regenerator',  item: 'Focus Sash',   moves: ['Poison Jab', 'Rock Slide', 'Knock Off', 'High Jump Kick'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Iron Fist',    item: 'Leftovers',    moves: ['Drain Punch', 'Ice Punch', 'Thunder Punch', 'Fire Punch'] },
                    { name: 'poliwrath',   nature: 'Modest',  ability: 'Water Absorb', item: 'Mystic Water', moves: ['Hydro Pump', 'Ice Beam', 'Focus Blast', 'Hypnosis'] },
                    { name: 'breloom',     nature: 'Jolly',   ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Seed Bomb', 'Facade', 'Drain Punch', 'Spore'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'machamp',     nature: 'Adamant', ability: 'No Guard',     item: 'Assault Vest', moves: ['Dynamic Punch', 'Stone Edge', 'Heavy Slam', 'Fire Punch'] },
                    { name: 'infernape',   nature: 'Timid',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Fire Blast', 'Focus Blast', 'Vacuum Wave', 'Grass Knot'] },
                    { name: 'mienshao',    nature: 'Jolly',   ability: 'Regenerator',  item: 'Focus Sash',   moves: ['Poison Jab', 'Rock Slide', 'Knock Off', 'High Jump Kick'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Iron Fist',    item: 'Leftovers',    moves: ['Drain Punch', 'Ice Punch', 'Thunder Punch', 'Fire Punch'] },
                    { name: 'poliwrath',   nature: 'Modest',  ability: 'Water Absorb', item: 'Mystic Water', moves: ['Hydro Pump', 'Ice Beam', 'Focus Blast', 'Hypnosis'] },
                    { name: 'breloom',     nature: 'Jolly',   ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Seed Bomb', 'Facade', 'Drain Punch', 'Spore'] },
                ]
            }
        }
    },
    {
        id: 'jessie-james',
        name: 'Jessie & James',
        title: '',
        region: 'Kanto',
        location: 'Celadon City',
        difficulties: {
            medium: {
                pokemon: [
                    // Jessie's team
                    { name: 'porygon-z',   nature: 'Modest',  ability: 'Adaptability', item: 'Choice Specs', moves: ['Tri Attack', 'Ice Beam', 'Thunderbolt', 'Shadow Ball'] },
                    { name: 'arbok',       nature: 'Adamant', ability: 'Intimidate',   item: 'Black Sludge', moves: ['Gunk Shot', 'Coil', 'Earthquake', 'Ice Fang'] },
                    { name: 'gourgeist',   nature: 'Timid',   ability: 'Insomnia',     item: 'Leftovers',    moves: ['Seed Bomb', 'Phantom Force', 'Will-O-Wisp', 'Leech Seed'] },
                    { name: 'yanmega',     nature: 'Modest',  ability: 'Tinted Lens',  item: 'Choice Specs', moves: ['Bug Buzz', 'Air Slash', 'Ancient Power', 'Giga Drain'] },
                    { name: 'jellicent',   nature: 'Bold',    ability: 'Cursed Body',  item: 'Leftovers',    moves: ['Scald', 'Shadow Ball', 'Ice Beam', 'Energy Ball'] },
                    { name: 'seviper',     nature: 'Quiet',   ability: 'Shed Skin',    item: 'Assault Vest', moves: ['Sludge Bomb', 'Flamethrower', 'Giga Drain', 'Sucker Punch'] },
                    // James's team
                    { name: 'malamar',     nature: 'Careful', ability: 'Contrary',     item: 'Leftovers',    moves: ['Superpower', 'Knock Off', 'Psycho Cut'] },
                    { name: 'weezing',     nature: 'Modest',  ability: 'Levitate',     item: 'Black Sludge', moves: ['Sludge Bomb', 'Fire Blast', 'Thunderbolt', 'Shadow Ball'] },
                    { name: 'arcanine',    nature: 'Adamant', ability: 'Intimidate',   item: 'Choice Band',  moves: ['Flare Blitz', 'Wild Charge', 'Close Combat', 'Extreme Speed'] },
                    { name: 'gyarados',    nature: 'Jolly',   ability: 'Moxie',        item: 'Sitrus Berry', moves: ['Dragon Dance', 'Waterfall', 'Earthquake', 'Ice Fang'] },
                    { name: 'amoonguss',   nature: 'Calm',    ability: 'Effect Spore', item: 'Black Sludge', moves: ['Giga Drain', 'Clear Smog', 'Spore', 'Foul Play'] },
                    { name: 'cofagrigus',  nature: 'Quiet',   ability: 'Mummy',        item: 'Leftovers',    moves: ['Nasty Plot', 'Shadow Ball', 'Trick Room', 'Energy Ball'] },
                ]
            },
            hard: {
                pokemon: [
                    // Jessie's team
                    { name: 'porygon-z',   nature: 'Modest',  ability: 'Adaptability', item: 'Choice Specs', moves: ['Tri Attack', 'Ice Beam', 'Thunderbolt', 'Shadow Ball'] },
                    { name: 'arbok',       nature: 'Adamant', ability: 'Intimidate',   item: 'Black Sludge', moves: ['Gunk Shot', 'Coil', 'Earthquake', 'Ice Fang'] },
                    { name: 'gourgeist',   nature: 'Timid',   ability: 'Insomnia',     item: 'Leftovers',    moves: ['Seed Bomb', 'Phantom Force', 'Will-O-Wisp', 'Leech Seed'] },
                    { name: 'yanmega',     nature: 'Modest',  ability: 'Tinted Lens',  item: 'Choice Specs', moves: ['Bug Buzz', 'Air Slash', 'Ancient Power', 'Giga Drain'] },
                    { name: 'jellicent',   nature: 'Bold',    ability: 'Cursed Body',  item: 'Leftovers',    moves: ['Scald', 'Shadow Ball', 'Ice Beam', 'Energy Ball'] },
                    { name: 'seviper',     nature: 'Quiet',   ability: 'Shed Skin',    item: 'Assault Vest', moves: ['Sludge Bomb', 'Flamethrower', 'Giga Drain', 'Sucker Punch'] },
                    // James's team
                    { name: 'malamar',     nature: 'Careful', ability: 'Contrary',     item: 'Leftovers',    moves: ['Superpower', 'Knock Off', 'Psycho Cut'] },
                    { name: 'weezing',     nature: 'Modest',  ability: 'Levitate',     item: 'Black Sludge', moves: ['Sludge Bomb', 'Fire Blast', 'Thunderbolt', 'Shadow Ball'] },
                    { name: 'arcanine',    nature: 'Adamant', ability: 'Intimidate',   item: 'Choice Band',  moves: ['Flare Blitz', 'Wild Charge', 'Close Combat', 'Extreme Speed'] },
                    { name: 'gyarados',    nature: 'Jolly',   ability: 'Moxie',        item: 'Sitrus Berry', moves: ['Dragon Dance', 'Waterfall', 'Earthquake', 'Ice Fang'] },
                    { name: 'amoonguss',   nature: 'Calm',    ability: 'Effect Spore', item: 'Black Sludge', moves: ['Giga Drain', 'Clear Smog', 'Spore', 'Foul Play'] },
                    { name: 'cofagrigus',  nature: 'Quiet',   ability: 'Mummy',        item: 'Leftovers',    moves: ['Nasty Plot', 'Shadow Ball', 'Trick Room', 'Energy Ball'] },
                ]
            }
        }
    },
    {
        id: 'the-pumpkin-king',
        name: 'The Pumpkin King',
        title: '',
        region: 'Kanto',
        location: 'Lavender Town Graveyard',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'bisharp',     nature: 'Adamant', ability: 'Defiant',      item: '',             moves: ['Swords Dance', 'Knock Off', 'Iron Head', 'Low Kick'] },
                    { name: 'shuckle',     nature: 'Impish',  ability: 'Sturdy',       item: '',             moves: ['Stealth Rock', 'Infestation', 'Toxic', 'Encore'] },
                    { name: 'yanmega',     nature: 'Modest',  ability: 'Speed Boost',  item: '',             moves: ['Bug Buzz', 'Air Slash', 'Protect', 'Giga Drain'] },
                    { name: 'roserade',    nature: 'Timid',   ability: 'Poison Point', item: '',             moves: ['Giga Drain', 'Sludge Bomb', 'Spikes', 'Sleep Powder'] },
                    { name: 'gourgeist-average', nature: 'Impish', ability: 'Insomnia', item: '',            moves: ['Seed Bomb', 'Will-O-Wisp', 'Phantom Force', 'Leech Seed'] },
                    { name: 'togekiss',    nature: 'Timid',   ability: 'Serene Grace', item: '',             moves: ['Air Slash', 'Flamethrower', 'Dazzling Gleam', 'Aura Sphere'] },
                ]
            }
        }
    },
    {
        id: 'urahara',
        name: 'Urahara',
        title: '',
        region: 'Kanto',
        location: 'Pokemon Tower 3F',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'lucario',     nature: 'Jolly',   ability: 'Inner Focus',  item: 'Life Orb',     moves: ['Close Combat', 'Extreme Speed', 'Ice Punch', 'Meteor Mash'] },
                    { name: 'ho-oh',       nature: 'Adamant', ability: 'Pressure',     item: 'Choice Scarf', moves: ['Sacred Fire', 'Brave Bird', 'Earthquake', 'Zen Headbutt'] },
                    { name: 'volcarona',   nature: 'Timid',   ability: 'Flame Body',   item: 'Assault Vest', moves: ['Quiver Dance', 'Flamethrower', 'Giga Drain', 'Bug Buzz'] },
                    { name: 'raikou',      nature: 'Modest',  ability: 'Pressure',     item: 'Choice Specs', moves: ['Thunderbolt', 'Shadow Ball', 'Hidden Power', 'Extrasensory'] },
                    { name: 'donphan',     nature: 'Impish',  ability: 'Sturdy',       item: 'Rocky Helmet', moves: ['Earthquake', 'Ice Shard', 'Stealth Rock', 'Toxic'] },
                    { name: 'togekiss',    nature: 'Modest',  ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Fire Blast', 'Aura Sphere', 'Dazzling Gleam'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'lucario',     nature: 'Jolly',   ability: 'Inner Focus',  item: 'Choice Band',  moves: ['Close Combat', 'Extreme Speed', 'Ice Punch', 'Meteor Mash'] },
                    { name: 'ho-oh',       nature: 'Adamant', ability: 'Pressure',     item: 'Choice Band',  moves: ['Sacred Fire', 'Brave Bird', 'Earthquake', 'Zen Headbutt'] },
                    { name: 'volcarona',   nature: 'Timid',   ability: 'Flame Body',   item: 'Focus Sash',   moves: ['Quiver Dance', 'Flamethrower', 'Giga Drain', 'Bug Buzz'] },
                    { name: 'raikou',      nature: 'Modest',  ability: 'Pressure',     item: 'Choice Specs', moves: ['Thunderbolt', 'Shadow Ball', 'Hidden Power', 'Extrasensory'] },
                    { name: 'donphan',     nature: 'Impish',  ability: 'Sturdy',       item: 'Leftovers',    moves: ['Earthquake', 'Ice Shard', 'Stealth Rock', 'Toxic'] },
                    { name: 'togekiss',    nature: 'Modest',  ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Fire Blast', 'Aura Sphere', 'Dazzling Gleam'] },
                ]
            }
        }
    },
    {
        id: 'brock',
        name: 'Brock',
        title: '',
        region: 'Kanto',
        location: "Diglett's Cave",
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'aerodactyl',  nature: 'Naive',   ability: 'Rock Head',    item: '',             moves: ['Rock Slide', 'Taunt', 'Stealth Rock', 'Explosion'] },
                    { name: 'golem',       nature: 'Jolly',   ability: 'Sturdy',       item: '',             moves: ['Rock Slide', 'Bulldoze', 'Heavy Slam', 'Sucker Punch'] },
                    { name: 'steelix',     nature: 'Adamant', ability: 'Sturdy',       item: '',             moves: ['Iron Head', 'Dig', 'Sandstorm', 'Double-Edge'] },
                    { name: 'cradily',     nature: 'Sassy',   ability: 'Storm Drain',  item: '',             moves: ['Toxic', 'Solar Beam', 'Smack Down', 'Sludge Wave'] },
                    { name: 'toxicroak',   nature: 'Timid',   ability: 'Poison Touch', item: '',             moves: ['Vacuum Wave', 'Sludge Bomb', 'Dark Pulse', 'Round'] },
                    { name: 'terrakion',   nature: 'Jolly',   ability: 'Justified',    item: '',             moves: ['Sacred Sword', 'Rock Slide', 'X-Scissor', 'Poison Jab'] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'aerodactyl',  nature: 'Naive',   ability: 'Tough Claws',  item: 'Aerodactylite',moves: ['Stone Edge', 'Taunt', 'Fire Blast', 'Aqua Tail', 'Ice Fang', 'Pursuit', 'Earthquake'] },
                    { name: 'golem',       nature: 'Jolly',   ability: 'Sturdy',       item: 'Weakness Policy', moves: ['Stone Edge', 'Rock Polish', 'Earthquake', 'Fire Punch'] },
                    { name: 'steelix',     nature: 'Adamant', ability: 'Sturdy',       item: 'Leftovers',    moves: ['Earthquake', 'Heavy Slam', 'Stone Edge', 'Ice Fang'] },
                    { name: 'cradily',     nature: 'Sassy',   ability: 'Storm Drain',  item: 'Leftovers',    moves: ['Seed Bomb', 'Rock Slide', 'Toxic', 'Curse'] },
                    { name: 'toxicroak',   nature: 'Timid',   ability: 'Poison Touch', item: 'Choice Specs', moves: ['Focus Blast', 'Sludge Bomb', 'Icy Wind', 'Dark Pulse'] },
                    { name: 'terrakion',   nature: 'Jolly',   ability: 'Justified',    item: 'Expert Belt',  moves: ['Close Combat', 'Stone Edge', 'Swords Dance', 'Earthquake'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'aerodactyl',  nature: 'Naive',   ability: 'Tough Claws',  item: 'Aerodactylite',moves: ['Stone Edge', 'Taunt', 'Fire Blast', 'Aqua Tail', 'Ice Fang', 'Pursuit', 'Earthquake'] },
                    { name: 'golem',       nature: 'Jolly',   ability: 'Sturdy',       item: 'Weakness Policy', moves: ['Stone Edge', 'Rock Polish', 'Earthquake', 'Fire Punch'] },
                    { name: 'steelix',     nature: 'Adamant', ability: 'Sturdy',       item: 'Leftovers',    moves: ['Earthquake', 'Heavy Slam', 'Stone Edge', 'Ice Fang'] },
                    { name: 'cradily',     nature: 'Sassy',   ability: 'Storm Drain',  item: 'Leftovers',    moves: ['Seed Bomb', 'Rock Slide', 'Toxic', 'Curse'] },
                    { name: 'toxicroak',   nature: 'Timid',   ability: 'Poison Touch', item: 'Choice Specs', moves: ['Focus Blast', 'Sludge Bomb', 'Icy Wind', 'Dark Pulse'] },
                    { name: 'terrakion',   nature: 'Jolly',   ability: 'Justified',    item: 'Expert Belt',  moves: ['Close Combat', 'Stone Edge', 'Swords Dance', 'Earthquake'] },
                ]
            }
        }
    },
    {
        id: 'xylos',
        name: 'Xylos',
        title: '',
        region: 'Kanto',
        location: 'Pokemon Club (Vermilion City)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'victini',     nature: 'Naive',   ability: 'Victory Star', item: 'Choice Band',  moves: ['Bolt Strike', 'V-create', 'Brick Break', 'Hidden Power'] },
                    { name: 'druddigon',   nature: 'Adamant', ability: 'Sheer Force',  item: 'Assault Vest', moves: ['Dragon Tail', 'Stealth Rock', 'Glare', 'Iron Head'] },
                    { name: 'skarmory',    nature: 'Impish',  ability: 'Sturdy',       item: 'Leftovers',    moves: ['Iron Head', 'Spikes', 'Roost', 'Whirlwind'] },
                    { name: 'jolteon',     nature: 'Modest',  ability: 'Volt Absorb',  item: 'Choice Specs', moves: ['Hidden Power', 'Shadow Ball', 'Thunder', 'Discharge'] },
                    { name: 'flareon',     nature: 'Naughty', ability: 'Guts',         item: 'Toxic Orb',    moves: ['Superpower', 'Facade', 'Flare Blitz', 'Lava Plume'] },
                    { name: 'mewtwo',      nature: 'Naive',   ability: 'Pressure',     item: 'Mewtwonite Y', moves: ['Flamethrower', 'Drain Punch', 'Psystrike', 'Ice Beam', 'Fire Blast', 'Recover'] },
                ]
            }
        }
    },
    {
        id: 'klohver',
        name: 'Klohver',
        title: '',
        region: 'Kanto',
        location: 'Pinkan Island Meadow',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'xerneas',     nature: 'Mild',    ability: 'Fairy Aura',   item: 'Choice Scarf', moves: ['Thunder', 'Moonblast', 'Close Combat', 'Rock Slide'] },
                    { name: 'shaymin-land',nature: 'Modest',  ability: 'Serene Grace', item: 'Leftovers',    moves: ['Seed Flare', 'Air Slash', 'Earth Power', 'Leech Seed'] },
                    { name: 'meganium',    nature: 'Impish',  ability: 'Overgrow',     item: 'Leftovers',    moves: ['Petal Blizzard', 'Dragon Tail', 'Earthquake', 'Synthesis'] },
                    { name: 'lilligant',   nature: 'Modest',  ability: 'Own Tempo',    item: 'Leftovers',    moves: ['Quiver Dance', 'Petal Dance', 'Sleep Powder', 'Giga Drain'] },
                    { name: 'gogoat',      nature: 'Adamant', ability: 'Sap Sipper',   item: 'Life Orb',     moves: ['Horn Leech', 'Rock Slide', 'Return', 'Earthquake'] },
                    { name: 'vileplume',   nature: 'Modest',  ability: 'Chlorophyll',  item: 'Leftovers',    moves: ['Energy Ball', 'Sludge Bomb', 'Sunny Day', 'Moonblast'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'xerneas',     nature: 'Mild',    ability: 'Fairy Aura',   item: 'Choice Scarf', moves: ['Thunder', 'Moonblast', 'Close Combat', 'Rock Slide'] },
                    { name: 'shaymin-land',nature: 'Modest',  ability: 'Serene Grace', item: 'Leftovers',    moves: ['Seed Flare', 'Air Slash', 'Earth Power', 'Leech Seed'] },
                    { name: 'meganium',    nature: 'Impish',  ability: 'Overgrow',     item: 'Leftovers',    moves: ['Petal Blizzard', 'Dragon Tail', 'Earthquake', 'Synthesis'] },
                    { name: 'lilligant',   nature: 'Modest',  ability: 'Own Tempo',    item: 'Leftovers',    moves: ['Quiver Dance', 'Petal Dance', 'Sleep Powder', 'Giga Drain'] },
                    { name: 'gogoat',      nature: 'Adamant', ability: 'Sap Sipper',   item: 'Life Orb',     moves: ['Horn Leech', 'Rock Slide', 'Return', 'Earthquake'] },
                    { name: 'vileplume',   nature: 'Modest',  ability: 'Chlorophyll',  item: 'Leftovers',    moves: ['Energy Ball', 'Sludge Bomb', 'Sunny Day', 'Moonblast'] },
                ]
            }
        }
    },
    {
        id: 'officer-jenny',
        name: 'Officer Jenny',
        title: '',
        region: 'Kanto',
        location: 'Pinkan City (Pinkan Lighthouse 2F)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'arcanine',    nature: '',        ability: 'Intimidate',   item: '',             moves: ['Wild Charge'] },
                    { name: 'swanna',      nature: '',        ability: '',             item: '',             moves: ['Hurricane'] },
                    { name: 'stoutland',   nature: '',        ability: '',             item: '',             moves: ['Thunder Punch', 'Return', 'Superpower'] },
                    { name: 'manectric',   nature: '',        ability: '',             item: 'Life Orb',     moves: ['Thunderbolt', 'Overheat'] },
                    { name: 'jumpluff',    nature: '',        ability: '',             item: '',             moves: ['Swords Dance', 'Acrobatics', 'Seed Bomb'] },
                    { name: 'pidgeot',     nature: '',        ability: '',             item: '',             moves: ['Brave Bird'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'arcanine',    nature: '',        ability: 'Intimidate',   item: 'Choice Band',  moves: ['Flare Blitz', 'Wild Charge', 'Close Combat', 'Crunch', 'Extreme Speed'] },
                    { name: 'gengar',      nature: '',        ability: 'Cursed Body',  item: 'Choice Specs', moves: ['Shadow Ball', 'Sludge Wave', 'Focus Blast', 'Thunderbolt'] },
                    { name: 'luxray',      nature: '',        ability: 'Guts',         item: 'Flame Orb',    moves: ['Superpower', 'Ice Fang', 'Wild Charge', 'Facade'] },
                    { name: 'manectric',   nature: '',        ability: 'Lightning Rod', item: 'Choice Scarf', moves: ['Overheat', 'Thunderbolt', 'Roar', 'Hidden Power'] },
                    { name: 'stoutland',   nature: '',        ability: 'Scrappy',      item: 'Choice Band',  moves: ['Superpower', 'Ice Fang', 'Thunder Fang', 'Return'] },
                    { name: 'blastoise',   nature: '',        ability: 'Mega Launcher', item: 'Blastoisinite', moves: ['Ice Beam', 'Focus Blast', 'Hydro Pump', 'Aura Sphere', 'Dark Pulse'] },
                ]
            }
        }
    },
    {
        id: 'prehax',
        name: 'Prehax',
        title: '',
        region: 'Kanto',
        location: 'Munchlax Resort (House 1)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Silk Scarf',   moves: ['Tackle', 'Double-Edge', 'Body Slam', 'Rest'] },
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Silk Scarf',   moves: ['Stockpile', 'Counter', 'Rock Slide', 'Zen Headbutt'] },
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Leftovers',    moves: ['Earthquake', 'Body Slam', 'Brick Break', 'Whirlwind'] },
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Leftovers',    moves: ['Flamethrower', 'Ice Beam', 'Thunderbolt', 'Psychic'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Silk Scarf',   moves: ['Tackle', 'Double-Edge', 'Body Slam', 'Rest'] },
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Silk Scarf',   moves: ['Stockpile', 'Counter', 'Rock Slide', 'Zen Headbutt'] },
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Leftovers',    moves: ['Earthquake', 'Body Slam', 'Brick Break', 'Whirlwind'] },
                    { name: 'munchlax',    nature: '',        ability: '',             item: 'Leftovers',    moves: ['Flamethrower', 'Ice Beam', 'Thunderbolt', 'Psychic'] },
                ]
            }
        }
    },
    {
        id: 'cie',
        name: 'Cie',
        title: '',
        region: 'Kanto',
        location: 'Fluffles Wonderland',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'togekiss',    nature: '',        ability: 'Serene Grace', item: '',             moves: ['Air Slash'] },
                    { name: 'azumarill',   nature: '',        ability: 'Huge Power',   item: '',             moves: ['Waterfall', 'Superpower', 'Play Rough', 'Knock Off'] },
                    { name: 'starmie',     nature: '',        ability: 'Analytic',     item: '',             moves: ['Hydro Pump', 'Psychic', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'clefable',    nature: '',        ability: 'Unaware',      item: '',             moves: ['Moonblast', 'Flamethrower', 'Thunderbolt'] },
                    { name: 'scizor',      nature: '',        ability: 'Technician',   item: '',             moves: ['Pursuit', 'Superpower', 'Bug Bite', 'Bullet Punch'] },
                    { name: 'diancie',     nature: '',        ability: 'Magic Bounce', item: 'Diancite',     moves: ['Diamond Storm', 'Moonblast'] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'togekiss',    nature: '',        ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash'] },
                    { name: 'azumarill',   nature: '',        ability: 'Huge Power',   item: 'Choice Band',  moves: ['Waterfall', 'Superpower', 'Play Rough', 'Knock Off'] },
                    { name: 'starmie',     nature: '',        ability: 'Analytic',     item: 'Choice Specs', moves: ['Hydro Pump', 'Psychic', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'clefable',    nature: '',        ability: 'Unaware',      item: 'Leftovers',    moves: ['Moonblast', 'Flamethrower', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'scizor',      nature: '',        ability: 'Technician',   item: 'Choice Band',  moves: ['Pursuit', 'Superpower', 'Bug Bite', 'Bullet Punch'] },
                    { name: 'diancie',     nature: '',        ability: 'Magic Bounce', item: 'Diancite',     moves: ['Diamond Storm', 'Moonblast', 'Earth Power', 'Psychic'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'togekiss',    nature: '',        ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash'] },
                    { name: 'azumarill',   nature: '',        ability: 'Huge Power',   item: 'Choice Band',  moves: ['Waterfall', 'Superpower', 'Play Rough', 'Knock Off'] },
                    { name: 'starmie',     nature: '',        ability: 'Analytic',     item: 'Choice Specs', moves: ['Hydro Pump', 'Psychic', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'clefable',    nature: '',        ability: 'Unaware',      item: 'Leftovers',    moves: ['Moonblast', 'Flamethrower', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'scizor',      nature: '',        ability: 'Technician',   item: 'Choice Band',  moves: ['Pursuit', 'Superpower', 'Bug Bite', 'Bullet Punch'] },
                    { name: 'diancie',     nature: '',        ability: 'Magic Bounce', item: 'Diancite',     moves: ['Diamond Storm', 'Moonblast', 'Earth Power', 'Psychic'] },
                ]
            }
        }
    },
    {
        id: 'shary-shaui',
        name: 'Shary & Shaui',
        title: '',
        region: 'Kanto',
        location: 'Love Island (House 1)',
        difficulties: {
            medium: {
                pokemon: [
                    // Shary
                    { name: 'flareon',         nature: 'Adamant', ability: 'Guts',         item: 'Toxic Orb',    moves: ['Flare Blitz', 'Facade', 'Superpower', 'Iron Tail'] },
                    { name: 'mienshao',        nature: 'Jolly',   ability: 'Reckless',     item: 'Black Belt',   moves: ['Stone Edge', 'Poison Jab', 'Knock Off', 'High Jump Kick'] },
                    { name: 'meloetta-aria',   nature: 'Timid',   ability: 'Serene Grace', item: 'Assault Vest', moves: ['Psychic', 'Hyper Voice', 'Focus Blast', 'Shadow Ball'] },
                    { name: 'latias',          nature: 'Timid',   ability: 'Levitate',     item: 'Latiasite',    moves: ['Draco Meteor', 'Psyshock', 'Thunderbolt', 'Surf'] },
                    { name: 'jolteon',         nature: 'Timid',   ability: 'Volt Absorb',  item: 'Choice Specs', moves: ['Thunder', 'Signal Beam', 'Shadow Ball', 'Thunder Wave'] },
                    { name: 'togekiss',        nature: 'Timid',   ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Aura Sphere', 'Flamethrower', 'Dazzling Gleam'] },
                    // Shaui
                    { name: 'shaymin-sky',     nature: 'Timid',   ability: 'Serene Grace', item: 'Choice Specs', moves: ['Air Slash', 'Seed Flare', 'Earth Power'] },
                    { name: 'conkeldurr',      nature: 'Adamant', ability: 'Guts',         item: 'Flame Orb',    moves: ['Drain Punch', 'Facade', 'Knock Off', 'Ice Punch'] },
                    { name: 'dragonite',       nature: 'Adamant', ability: 'Multiscale',   item: 'Lum Berry',    moves: ['Dragon Dance', 'Outrage', 'Fire Punch', 'Extreme Speed'] },
                    { name: 'alakazam',        nature: 'Timid',   ability: 'Trace',        item: 'Alakazite',    moves: ['Focus Blast', 'Psychic', 'Shadow Ball', 'Dazzling Gleam'] },
                    { name: 'greninja',        nature: 'Naive',   ability: 'Protean',      item: 'Expert Belt',  moves: ['Hydro Pump', 'Gunk Shot', 'Ice Beam', 'Dark Pulse'] },
                    { name: 'azelf',           nature: 'Timid',   ability: 'Levitate',     item: 'Focus Sash',   moves: ['Psychic', 'Thunderbolt', 'Flamethrower', 'Dazzling Gleam'] },
                ]
            },
            hard: {
                pokemon: [
                    // Shary
                    { name: 'flareon',         nature: 'Adamant', ability: 'Guts',         item: 'Toxic Orb',    moves: ['Flare Blitz', 'Facade', 'Superpower', 'Iron Tail'] },
                    { name: 'mienshao',        nature: 'Jolly',   ability: 'Reckless',     item: 'Black Belt',   moves: ['Stone Edge', 'Poison Jab', 'Knock Off', 'High Jump Kick'] },
                    { name: 'meloetta-aria',   nature: 'Timid',   ability: 'Serene Grace', item: 'Assault Vest', moves: ['Psychic', 'Hyper Voice', 'Focus Blast', 'Shadow Ball'] },
                    { name: 'latias',          nature: 'Timid',   ability: 'Levitate',     item: 'Latiasite',    moves: ['Draco Meteor', 'Psyshock', 'Thunderbolt', 'Surf'] },
                    { name: 'jolteon',         nature: 'Timid',   ability: 'Volt Absorb',  item: 'Choice Specs', moves: ['Thunder', 'Signal Beam', 'Shadow Ball', 'Thunder Wave'] },
                    { name: 'togekiss',        nature: 'Timid',   ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Aura Sphere', 'Flamethrower', 'Dazzling Gleam'] },
                    // Shaui
                    { name: 'shaymin-sky',     nature: 'Timid',   ability: 'Serene Grace', item: 'Choice Specs', moves: ['Air Slash', 'Seed Flare', 'Earth Power'] },
                    { name: 'conkeldurr',      nature: 'Adamant', ability: 'Guts',         item: 'Flame Orb',    moves: ['Drain Punch', 'Facade', 'Knock Off', 'Ice Punch'] },
                    { name: 'dragonite',       nature: 'Adamant', ability: 'Multiscale',   item: 'Lum Berry',    moves: ['Dragon Dance', 'Outrage', 'Fire Punch', 'Extreme Speed'] },
                    { name: 'alakazam',        nature: 'Timid',   ability: 'Trace',        item: 'Alakazite',    moves: ['Focus Blast', 'Psychic', 'Shadow Ball', 'Dazzling Gleam'] },
                    { name: 'greninja',        nature: 'Naive',   ability: 'Protean',      item: 'Expert Belt',  moves: ['Hydro Pump', 'Gunk Shot', 'Ice Beam', 'Dark Pulse'] },
                    { name: 'azelf',           nature: 'Timid',   ability: 'Levitate',     item: 'Focus Sash',   moves: ['Psychic', 'Thunderbolt', 'Flamethrower', 'Dazzling Gleam'] },
                ]
            }
        }
    },


    // ══════════════════════════════════════════════════════════════════════════
    // JOHTO
    // ══════════════════════════════════════════════════════════════════════════

    {
        id: 'bruno',
        name: 'Bruno',
        title: '',
        region: 'Johto',
        location: 'Mt. Mortar Lower Cave',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'steelix',     nature: 'Careful', ability: 'Sturdy',       item: '',             moves: ['Iron Head', 'Earthquake', 'Curse', 'Fire Fang'] },
                    { name: 'hariyama',    nature: 'Adamant', ability: 'Thick Fat',    item: '',             moves: ['Heavy Slam', 'Endure', 'Reversal', 'Close Combat'] },
                    { name: 'hitmonlee',   nature: 'Jolly',   ability: 'Reckless',     item: '',             moves: ['Fake Out', 'Jump Kick', 'Blaze Kick', 'Rolling Kick'] },
                    { name: 'throh',       nature: 'Careful', ability: 'Guts',         item: '',             moves: ['Reversal', 'Superpower', 'Wide Guard', 'Endure'] },
                    { name: 'sawk',        nature: 'Jolly',   ability: 'Sturdy',       item: '',             moves: ['Reversal', 'Close Combat', 'Endure', 'Quick Guard'] },
                    { name: 'scrafty',     nature: 'Adamant', ability: 'Intimidate',   item: '',             moves: ['Head Smash', 'Focus Punch', 'Rock Climb', 'Facade'] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'steelix',     nature: 'Careful', ability: 'Sand Force',   item: 'Steelixite',   moves: ['Heavy Slam', 'Earthquake', 'Stone Edge', 'Ice Fang'] },
                    { name: 'hariyama',    nature: 'Adamant', ability: 'Thick Fat',    item: 'Choice Band',  moves: ['Close Combat', 'Heavy Slam', 'Stone Edge', 'Fire Punch'] },
                    { name: 'hitmonlee',   nature: 'Jolly',   ability: 'Reckless',     item: 'Life Orb',     moves: ['High Jump Kick', 'Stone Edge', 'Knock Off', 'Poison Jab'] },
                    { name: 'throh',       nature: 'Careful', ability: 'Guts',         item: 'Flame Orb',    moves: ['Bulk Up', 'Superpower', 'Knock Off', 'Thunder Punch'] },
                    { name: 'sawk',        nature: 'Jolly',   ability: 'Sturdy',       item: 'Weakness Policy', moves: ['Close Combat', 'Knock Off', 'Fire Punch', 'Ice Punch'] },
                    { name: 'scrafty',     nature: 'Adamant', ability: 'Intimidate',   item: 'Leftovers',    moves: ['Knock Off', 'High Jump Kick', 'Dragon Dance', 'Head Smash'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'steelix',     nature: 'Careful', ability: 'Sand Force',   item: 'Steelixite',   moves: ['Heavy Slam', 'Earthquake', 'Stone Edge', 'Ice Fang'] },
                    { name: 'hariyama',    nature: 'Adamant', ability: 'Thick Fat',    item: 'Choice Band',  moves: ['Close Combat', 'Heavy Slam', 'Stone Edge', 'Fire Punch'] },
                    { name: 'hitmonlee',   nature: 'Jolly',   ability: 'Reckless',     item: 'Life Orb',     moves: ['High Jump Kick', 'Stone Edge', 'Knock Off', 'Poison Jab'] },
                    { name: 'throh',       nature: 'Careful', ability: 'Guts',         item: 'Flame Orb',    moves: ['Bulk Up', 'Superpower', 'Knock Off', 'Thunder Punch'] },
                    { name: 'sawk',        nature: 'Jolly',   ability: 'Sturdy',       item: 'Weakness Policy', moves: ['Close Combat', 'Knock Off', 'Fire Punch', 'Ice Punch'] },
                    { name: 'scrafty',     nature: 'Adamant', ability: 'Intimidate',   item: 'Leftovers',    moves: ['Knock Off', 'High Jump Kick', 'Dragon Dance', 'Head Smash'] },
                ]
            }
        }
    },
    {
        id: 'guardian-suicune',
        name: 'Guardian (Suicune)',
        title: '',
        region: 'Johto',
        location: 'Lake Of Rage (Secluded Lake)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'kyurem',      nature: 'Modest',  ability: 'Pressure',     item: 'Choice Specs', moves: ['Blizzard', 'Draco Meteor', 'Focus Blast', 'Flash Cannon'] },
                    { name: 'suicune',     nature: 'Bold',    ability: 'Pressure',     item: 'Leftovers',    moves: ['Calm Mind', 'Scald', 'Ice Beam', 'Air Slash'] },
                    { name: 'avalugg',     nature: 'Quiet',   ability: 'Sturdy',       item: 'Leftovers',    moves: ['Avalanche', 'Toxic', 'Recover', 'Stone Edge'] },
                    { name: 'walrein',     nature: 'Calm',    ability: 'Thick Fat',    item: 'Leftovers',    moves: ['Sheer Cold', 'Blizzard', 'Surf', 'Super Fang'] },
                    { name: 'azumarill',   nature: 'Adamant', ability: 'Huge Power',   item: 'Choice Band',  moves: ['Aqua Jet', 'Play Rough', 'Superpower', 'Knock Off'] },
                    { name: 'mamoswine',   nature: 'Jolly',   ability: 'Thick Fat',    item: 'Life Orb',     moves: ['Earthquake', 'Icicle Crash', 'Stone Edge', 'Ice Shard'] },
                ]
            }
        }
    },
    {
        id: 'lorelei',
        name: 'Lorelei',
        title: '',
        region: 'Johto',
        location: 'Ice Path B2F',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'ninetales-alola',  nature: 'Timid',   ability: 'Snow Warning', item: 'Icy Rock',     moves: ['Blizzard', 'Moonblast', 'Nasty Plot', 'Freeze-Dry'] },
                    { name: 'sandslash-alola',  nature: 'Adamant', ability: 'Slush Rush',   item: 'Focus Sash',   moves: ['Earthquake', 'Icicle Crash', 'Iron Head', 'Aqua Tail'] },
                    { name: 'articuno',         nature: 'Timid',   ability: 'Pressure',     item: 'Leftovers',    moves: ['Freeze-Dry', 'Hurricane', 'Toxic', 'Blizzard'] },
                    { name: 'weavile',          nature: 'Jolly',   ability: 'Pressure',     item: 'Black Glasses', moves: ['Ice Shard', 'Knock Off', 'Icicle Crash', 'Low Kick'] },
                    { name: 'lapras',           nature: 'Calm',    ability: 'Water Absorb', item: 'Leftovers',    moves: ['Hydro Pump', 'Blizzard', 'Thunderbolt', 'Scald'] },
                    { name: 'slowbro',          nature: 'Bold',    ability: 'Shell Armor',  item: 'Slowbronite',  moves: ['Surf', 'Fire Blast', 'Psychic', 'Ice Beam'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'ninetales-alola',  nature: 'Timid',   ability: 'Snow Warning', item: 'Icy Rock',     moves: ['Blizzard', 'Moonblast', 'Nasty Plot', 'Freeze-Dry'] },
                    { name: 'sandslash-alola',  nature: 'Adamant', ability: 'Slush Rush',   item: 'Focus Sash',   moves: ['Earthquake', 'Icicle Crash', 'Iron Head', 'Aqua Tail'] },
                    { name: 'articuno',         nature: 'Timid',   ability: 'Pressure',     item: 'Leftovers',    moves: ['Freeze-Dry', 'Hurricane', 'Toxic', 'Blizzard'] },
                    { name: 'weavile',          nature: 'Jolly',   ability: 'Pressure',     item: 'Black Glasses', moves: ['Ice Shard', 'Knock Off', 'Icicle Crash', 'Low Kick'] },
                    { name: 'lapras',           nature: 'Calm',    ability: 'Water Absorb', item: 'Leftovers',    moves: ['Hydro Pump', 'Blizzard', 'Thunderbolt', 'Scald'] },
                    { name: 'slowbro',          nature: 'Bold',    ability: 'Shell Armor',  item: 'Slowbronite',  moves: ['Surf', 'Fire Blast', 'Psychic', 'Ice Beam'] },
                ]
            }
        }
    },
    {
        id: 'professor-elm',
        name: 'Professor Elm',
        title: '',
        region: 'Johto',
        location: 'Ruins of Alph (Research Center)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'corsola',     nature: 'Bold',    ability: 'Natural Cure', item: 'Focus Sash',   moves: ['Surf', 'Power Gem', 'Mirror Coat', 'Light Screen'] },
                    { name: 'togekiss',    nature: 'Timid',   ability: 'Serene Grace', item: 'Leftovers',    moves: ['Nasty Plot', 'Air Slash', 'Flamethrower', 'Aura Sphere'] },
                    { name: 'meganium',    nature: 'Bold',    ability: 'Overgrow',     item: 'Light Clay',   moves: ['Giga Drain', 'Toxic', 'Reflect', 'Petal Dance'] },
                    { name: 'typhlosion',  nature: 'Modest',  ability: 'Blaze',        item: 'Charcoal',     moves: ['Eruption', 'Fire Blast', 'Focus Blast', 'Roar'] },
                    { name: 'feraligatr',  nature: 'Jolly',   ability: 'Sheer Force',  item: 'Life Orb',     moves: ['Dragon Dance', 'Liquidation', 'Ice Punch', 'Earthquake'] },
                    { name: 'tyranitar',   nature: 'Careful', ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Stone Edge', 'Crunch', 'Fire Punch', 'Thunder Punch'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'corsola',     nature: 'Bold',    ability: 'Natural Cure', item: 'Focus Sash',   moves: ['Surf', 'Power Gem', 'Mirror Coat', 'Light Screen'] },
                    { name: 'togekiss',    nature: 'Timid',   ability: 'Serene Grace', item: 'Leftovers',    moves: ['Nasty Plot', 'Air Slash', 'Flamethrower', 'Aura Sphere'] },
                    { name: 'meganium',    nature: 'Bold',    ability: 'Overgrow',     item: 'Light Clay',   moves: ['Giga Drain', 'Toxic', 'Reflect', 'Petal Dance'] },
                    { name: 'typhlosion',  nature: 'Modest',  ability: 'Blaze',        item: 'Charcoal',     moves: ['Eruption', 'Fire Blast', 'Focus Blast', 'Roar'] },
                    { name: 'feraligatr',  nature: 'Jolly',   ability: 'Sheer Force',  item: 'Life Orb',     moves: ['Dragon Dance', 'Liquidation', 'Ice Punch', 'Earthquake'] },
                    { name: 'tyranitar',   nature: 'Careful', ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Stone Edge', 'Crunch', 'Fire Punch', 'Thunder Punch'] },
                ]
            }
        }
    },
    {
        id: 'sage',
        name: 'Sage',
        title: '',
        region: 'Johto',
        location: 'Violet City (Sprout Tower F)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'glaceon',     nature: 'Modest',  ability: 'Snow Cloak',   item: '',             moves: ['Blizzard', 'Shadow Ball', 'Ice Beam', 'Toxic'] },
                    { name: 'flareon',     nature: 'Adamant', ability: 'Guts',         item: '',             moves: ['Flare Blitz', 'Iron Tail', 'Facade', 'Superpower'] },
                    { name: 'vaporeon',    nature: 'Bold',    ability: 'Water Absorb', item: '',             moves: ['Scald', 'Ice Beam', 'Wish', 'Protect'] },
                    { name: 'jolteon',     nature: 'Timid',   ability: 'Volt Absorb',  item: '',             moves: ['Thunderbolt', 'Shadow Ball', 'Signal Beam', 'Volt Switch'] },
                    { name: 'sylveon',     nature: 'Calm',    ability: 'Pixilate',     item: '',             moves: ['Hyper Voice', 'Shadow Ball', 'Psyshock', 'Wish'] },
                    { name: 'espeon',      nature: 'Timid',   ability: 'Magic Bounce', item: '',             moves: ['Calm Mind', 'Psyshock', 'Dazzling Gleam', 'Morning Sun'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'glaceon',     nature: 'Modest',  ability: 'Snow Cloak',   item: '',             moves: ['Blizzard', 'Shadow Ball', 'Ice Beam', 'Toxic'] },
                    { name: 'flareon',     nature: 'Adamant', ability: 'Guts',         item: '',             moves: ['Flare Blitz', 'Iron Tail', 'Facade', 'Superpower'] },
                    { name: 'vaporeon',    nature: 'Bold',    ability: 'Water Absorb', item: '',             moves: ['Scald', 'Ice Beam', 'Wish', 'Protect'] },
                    { name: 'jolteon',     nature: 'Timid',   ability: 'Volt Absorb',  item: '',             moves: ['Thunderbolt', 'Shadow Ball', 'Signal Beam', 'Volt Switch'] },
                    { name: 'sylveon',     nature: 'Calm',    ability: 'Pixilate',     item: '',             moves: ['Hyper Voice', 'Shadow Ball', 'Psyshock', 'Wish'] },
                    { name: 'espeon',      nature: 'Timid',   ability: 'Magic Bounce', item: '',             moves: ['Calm Mind', 'Psyshock', 'Dazzling Gleam', 'Morning Sun'] },
                ]
            }
        }
    },
    {
        id: 'neroli',
        name: 'Neroli',
        title: '',
        region: 'Johto',
        location: 'Ilex Forest',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'celebi',      nature: 'Timid',   ability: 'Natural Cure', item: 'Leftovers',    moves: ['Earth Power', 'Psyshock', 'Giga Drain', 'Ancient Power'] },
                    { name: 'donphan',     nature: 'Adamant', ability: 'Sturdy',       item: 'Choice Band',  moves: ['Earthquake', 'Knock Off', 'Ice Shard', 'Seed Bomb'] },
                    { name: 'roserade',    nature: 'Timid',   ability: 'Technician',   item: 'Choice Specs', moves: ['Hidden Power', 'Leaf Storm', 'Sludge Bomb', 'Dazzling Gleam'] },
                    { name: 'kingdra',     nature: 'Adamant', ability: 'Sniper',       item: 'Scope Lens',   moves: ['Waterfall', 'Outrage', 'Iron Head', 'Swords Dance'] },
                    { name: 'serperior',   nature: 'Timid',   ability: 'Contrary',     item: 'Choice Specs', moves: ['Leaf Storm', 'Hidden Power', 'Dragon Pulse', 'Synthesis'] },
                    { name: 'gardevoir',   nature: 'Modest',  ability: 'Pixilate',     item: 'Gardevoirite', moves: ['Moonblast', 'Psyshock', 'Shadow Ball', 'Focus Blast'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'celebi',      nature: 'Timid',   ability: 'Natural Cure', item: 'Leftovers',    moves: ['Earth Power', 'Psyshock', 'Giga Drain', 'Ancient Power', 'Dazzling Gleam', 'Recover'] },
                    { name: 'diancie',     nature: 'Naive',   ability: 'Magic Bounce', item: 'Diancite',     moves: ['Diamond Storm', 'Moonblast', 'Hidden Power', 'Earth Power', 'Psyshock', 'Calm Mind'] },
                    { name: 'florges',     nature: 'Timid',   ability: 'Flower Veil',  item: 'Leftovers',    moves: ['Moonblast', 'Hidden Power', 'Psychic', 'Energy Ball', 'Synthesis'] },
                    { name: 'chandelure',  nature: 'Timid',   ability: 'Flash Fire',   item: 'Choice Scarf', moves: ['Shadow Ball', 'Energy Ball', 'Fire Blast', 'Hidden Power', 'Trick'] },
                    { name: 'goodra',      nature: 'Adamant', ability: 'Sap Sipper',   item: 'Choice Band',  moves: ['Outrage', 'Iron Tail', 'Power Whip', 'Earthquake', 'Fire Punch', 'Superpower', 'Aqua Tail'] },
                    { name: 'clefable',    nature: 'Modest',  ability: 'Unaware',      item: 'Choice Specs', moves: ['Moonblast', 'Petal Dance', 'Fire Blast', 'Psychic', 'Thunderbolt', 'Shadow Ball', 'Focus Blast'] },
                ]
            }
        }
    },
    {
        id: 'gamers-pewdie-diepy',
        name: 'Gamers Pewdie and Diepy',
        title: '',
        region: 'Johto',
        location: 'Goldenrod Gaming Corner',
        difficulties: {
            medium: {
                pokemon: [
                    // Gamer Pewdie
                    { name: 'metagross',   nature: 'Adamant', ability: 'Clear Body',   item: 'Choice Band',  moves: ['Meteor Mash', 'Bullet Punch', 'Hammer Arm', 'Zen Headbutt'] },
                    { name: 'medicham',    nature: 'Jolly',   ability: 'Pure Power',   item: 'Life Orb',     moves: ['High Jump Kick', 'Zen Headbutt', 'Thunder Punch', 'Bullet Punch'] },
                    { name: 'mew',         nature: 'Timid',   ability: 'Synchronize',  item: 'Leftovers',    moves: ['Nasty Plot', 'Psychic', 'Fire Blast', 'Aura Sphere'] },
                    { name: 'gardevoir',   nature: 'Timid',   ability: 'Trace',        item: 'Choice Scarf', moves: ['Psyshock', 'Moonblast', 'Trick', 'Hidden Power'] },
                    { name: 'reuniclus',   nature: 'Bold',    ability: 'Magic Guard',  item: 'Leftovers',    moves: ['Calm Mind', 'Psyshock', 'Focus Blast', 'Recover'] },
                    { name: 'starmie',     nature: 'Timid',   ability: 'Analytic',     item: 'Choice Specs', moves: ['Surf', 'Psyshock', 'Trick', 'Ice Beam'] },
                    // Gamer Diepy
                    { name: 'azumarill',   nature: 'Adamant', ability: 'Huge Power',   item: 'Choice Band',  moves: ['Aqua Jet', 'Waterfall', 'Play Rough', 'Superpower'] },
                    { name: 'whimsicott',  nature: 'Timid',   ability: 'Infiltrator',  item: 'Choice Specs', moves: ['Moonblast', 'Psychic', 'Energy Ball', 'Hurricane'] },
                    { name: 'slurpuff',    nature: 'Jolly',   ability: 'Unburden',     item: 'Sitrus Berry', moves: ['Belly Drum', 'Play Rough', 'Return', 'Drain Punch'] },
                    { name: 'mr-mime',     nature: 'Timid',   ability: 'Soundproof',   item: 'Choice Scarf', moves: ['Psyshock', 'Dazzling Gleam', 'Nasty Plot', 'Focus Blast'] },
                    { name: 'carbink',     nature: 'Calm',    ability: 'Sturdy',       item: 'Leftovers',    moves: ['Stealth Rock', 'Moonblast', 'Rock Slide', 'Toxic'] },
                    { name: 'granbull',    nature: 'Impish',  ability: 'Quick Feet',   item: 'Choice Scarf', moves: ['Play Rough', 'Earthquake', 'Heal Bell', 'Thunder Wave'] },
                ]
            },
            hard: {
                pokemon: [
                    // Gamer Pewdie
                    { name: 'starmie',     nature: 'Timid',   ability: 'Analytic',     item: 'Life Orb',     moves: ['Hydro Pump', 'Psyshock', 'Hidden Power', 'Ice Beam', 'Recover'] },
                    { name: 'alakazam',    nature: 'Timid',   ability: 'Magic Guard',  item: 'Focus Sash',   moves: ['Hidden Power', 'Psychic', 'Focus Blast', 'Thunder Wave', 'Psyshock', 'Signal Beam'] },
                    { name: 'slowking',    nature: 'Modest',  ability: 'Own Tempo',    item: 'Assault Vest', moves: ['Scald', 'Future Sight', 'Fire Blast', 'Psyshock', 'Dragon Tail'] },
                    { name: 'jirachi',     nature: 'Jolly',   ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Iron Head', 'Fire Punch', 'Zen Headbutt', 'Ice Punch', 'Thunder Punch'] },
                    { name: 'latios',      nature: 'Modest',  ability: 'Levitate',     item: 'Latiosite',    moves: ['Draco Meteor', 'Hidden Power', 'Trick', 'Psyshock', 'Surf'] },
                    { name: 'mew',         nature: 'Jolly',   ability: 'Synchronize',  item: 'Life Orb',     moves: ['Swords Dance', 'Drain Punch', 'Zen Headbutt', 'Sucker Punch', 'Soft-Boiled'] },
                    // Gamer Diepy
                    { name: 'azumarill',   nature: 'Adamant', ability: 'Huge Power',   item: 'Choice Band',  moves: ['Aqua Jet', 'Waterfall', 'Play Rough', 'Superpower'] },
                    { name: 'clefable',    nature: 'Bold',    ability: 'Unaware',      item: 'Leftovers',    moves: ['Moonblast', 'Thunderbolt', 'Flamethrower', 'Focus Blast'] },
                    { name: 'xerneas',     nature: 'Adamant', ability: 'Fairy Aura',   item: 'Choice Scarf', moves: ['Close Combat', 'Outrage', 'Night Slash', 'Rock Slide', 'Zen Headbutt', 'Horn Leech', 'Megahorn'] },
                    { name: 'sylveon',     nature: 'Timid',   ability: 'Pixilate',     item: 'Choice Scarf', moves: ['Hyper Voice', 'Psyshock', 'Shadow Ball', 'Hidden Power'] },
                    { name: 'togekiss',    nature: 'Timid',   ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Aura Sphere', 'Dazzling Gleam', 'Flamethrower', 'Thunder Wave'] },
                    { name: 'diancie',     nature: 'Sassy',   ability: 'Magic Bounce', item: 'Diancite',     moves: ['Psychic', 'Moonblast', 'Diamond Storm', 'Earth Power', 'Toxic'] },
                ]
            }
        }
    },
    {
        id: 'misty',
        name: 'Misty',
        title: '',
        region: 'Johto',
        location: 'Route 41',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'staryu',     ability: 'Natural Cure', item: '',            moves: ['Water Gun', 'Rapid Spin', 'Swift', 'Minimize'] },
                    { name: 'starmie',    ability: 'Natural Cure', item: '',            moves: ['Water Gun', 'Psychic', 'Swift', 'Recover'] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'milotic',   nature: 'Bold',    ability: 'Competitive',  item: 'Leftovers',    moves: ['Scald', 'Ice Beam', 'Recover', 'Dragon Tail'] },
                    { name: 'gyarados',  nature: 'Jolly',   ability: 'Mold Breaker', item: 'Gyaradosite',  moves: ['Dragon Dance', 'Earthquake', 'Waterfall', 'Ice Fang', 'Crunch'] },
                    { name: 'starmie',   nature: 'Timid',   ability: 'Analytic',     item: 'Choice Specs', moves: ['Surf', 'Psychic', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'cradily',   nature: 'Sassy',   ability: 'Storm Drain',  item: 'Leftovers',    moves: ['Toxic', 'Curse', 'Seed Bomb', 'Ingrain'] },
                    { name: 'blastoise', nature: 'Bold',    ability: 'Torrent',      item: 'Sitrus Berry', moves: ['Hydro Pump', 'Aura Sphere', 'Dark Pulse', 'Flash Cannon'] },
                    { name: 'togekiss',  nature: 'Bold',    ability: 'Serene Grace', item: 'Leftovers',    moves: ['Thunder Wave', 'Roost', 'Nasty Plot', 'Air Slash'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'milotic',   nature: 'Bold',    ability: 'Competitive',  item: 'Leftovers',    moves: ['Scald', 'Ice Beam', 'Recover', 'Dragon Tail'] },
                    { name: 'gyarados',  nature: 'Jolly',   ability: 'Mold Breaker', item: 'Gyaradosite',  moves: ['Dragon Dance', 'Earthquake', 'Waterfall', 'Ice Fang', 'Crunch'] },
                    { name: 'starmie',   nature: 'Timid',   ability: 'Analytic',     item: 'Choice Specs', moves: ['Surf', 'Psychic', 'Thunderbolt', 'Ice Beam'] },
                    { name: 'cradily',   nature: 'Sassy',   ability: 'Storm Drain',  item: 'Leftovers',    moves: ['Toxic', 'Curse', 'Seed Bomb', 'Ingrain'] },
                    { name: 'blastoise', nature: 'Bold',    ability: 'Torrent',      item: 'Sitrus Berry', moves: ['Hydro Pump', 'Aura Sphere', 'Dark Pulse', 'Flash Cannon'] },
                    { name: 'togekiss',  nature: 'Bold',    ability: 'Serene Grace', item: 'Leftovers',    moves: ['Thunder Wave', 'Roost', 'Nasty Plot', 'Air Slash'] },
                ]
            }
        }
    },
    {
        id: 'thor',
        name: 'Thor',
        title: '',
        region: 'Johto',
        location: 'Whirl Islands B4F',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Choice Band',  moves: ['Outrage', 'Earthquake', 'Iron Head', 'Fire Punch'] },
                    { name: 'tyranitar',   nature: 'Adamant', ability: 'Sand Stream',  item: 'Choice Scarf', moves: ['Stone Edge', 'Crunch', 'Ice Punch', 'Fire Punch'] },
                    { name: 'greninja',    nature: 'Naive',   ability: 'Protean',      item: 'Life Orb',     moves: ['Hydro Pump', 'Ice Beam', 'Low Kick', 'Gunk Shot'] },
                    { name: 'clefable',    nature: 'Modest',  ability: 'Unaware',      item: 'Choice Specs', moves: ['Moonblast', 'Flamethrower', 'Thunderbolt', 'Focus Blast'] },
                    { name: 'mamoswine',   nature: 'Jolly',   ability: 'Thick Fat',    item: 'Focus Sash',   moves: ['Earthquake', 'Icicle Crash', 'Knock Off', 'Superpower'] },
                    { name: 'lugia',       nature: 'Modest',  ability: 'Multiscale',   item: 'Choice Specs', moves: ['Aeroblast', 'Thunder', 'Earth Power', 'Calm Mind'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Choice Band',  moves: ['Outrage', 'Earthquake', 'Iron Head', 'Fire Punch'] },
                    { name: 'tyranitar',   nature: 'Adamant', ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Stone Edge', 'Crunch', 'Ice Punch', 'Fire Punch'] },
                    { name: 'greninja',    nature: 'Naive',   ability: 'Protean',      item: 'Choice Specs', moves: ['Hydro Pump', 'Ice Beam', 'Low Kick', 'Gunk Shot', 'Dark Pulse', 'Grass Knot'] },
                    { name: 'zapdos',      nature: 'Modest',  ability: 'Static',       item: 'Rocky Helmet', moves: ['Discharge', 'Heat Wave', 'Hidden Power', 'Toxic'] },
                    { name: 'mamoswine',   nature: 'Jolly',   ability: 'Thick Fat',    item: 'Focus Sash',   moves: ['Earthquake', 'Icicle Crash', 'Knock Off', 'Superpower'] },
                    { name: 'lugia',       nature: 'Modest',  ability: 'Multiscale',   item: 'Choice Specs', moves: ['Aeroblast', 'Thunder', 'Earth Power', 'Calm Mind'] },
                ]
            }
        }
    },
    {
        id: 'lance-dragons-shrine',
        name: 'Lance (Dragons Shrine)',
        title: '',
        region: 'Johto',
        location: 'Dragons Shrine',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'salamence',   nature: 'Naive',   ability: 'Intimidate',   item: 'Life Orb',     moves: ['Outrage', 'Fire Blast', 'Earthquake', 'Iron Tail'] },
                    { name: 'dialga',      nature: 'Modest',  ability: 'Pressure',     item: 'Choice Scarf', moves: ['Aura Sphere', 'Flash Cannon', 'Fire Blast', 'Thunder'] },
                    { name: 'latios',      nature: 'Timid',   ability: 'Levitate',     item: 'Choice Specs', moves: ['Draco Meteor', 'Psychic', 'Thunderbolt', 'Surf'] },
                    { name: 'garchomp',    nature: 'Jolly',   ability: 'Sand Force',   item: 'Garchompite',  moves: ['Swords Dance', 'Earthquake', 'Outrage', 'Stone Edge'] },
                    { name: 'gyarados',    nature: 'Jolly',   ability: 'Intimidate',   item: 'Lum Berry',    moves: ['Dragon Dance', 'Waterfall', 'Earthquake', 'Ice Fang'] },
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Weakness Policy', moves: ['Dragon Dance', 'Outrage', 'Extreme Speed', 'Earthquake'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'salamence',   nature: 'Naive',   ability: 'Intimidate',   item: 'Life Orb',     moves: ['Outrage', 'Fire Blast', 'Earthquake', 'Iron Tail'] },
                    { name: 'dialga',      nature: 'Modest',  ability: 'Pressure',     item: 'Choice Scarf', moves: ['Aura Sphere', 'Flash Cannon', 'Fire Blast', 'Thunder'] },
                    { name: 'latios',      nature: 'Timid',   ability: 'Levitate',     item: 'Choice Specs', moves: ['Draco Meteor', 'Psychic', 'Thunderbolt', 'Surf'] },
                    { name: 'garchomp',    nature: 'Jolly',   ability: 'Sand Force',   item: 'Garchompite',  moves: ['Swords Dance', 'Earthquake', 'Outrage', 'Stone Edge'] },
                    { name: 'gyarados',    nature: 'Jolly',   ability: 'Intimidate',   item: 'Lum Berry',    moves: ['Dragon Dance', 'Waterfall', 'Earthquake', 'Ice Fang'] },
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Weakness Policy', moves: ['Dragon Dance', 'Outrage', 'Extreme Speed', 'Earthquake'] },
                ]
            }
        }
    },
    {
        id: 'terminator',
        name: 'Terminator',
        title: '',
        region: 'Johto',
        location: 'Mt. Silver Moltres Chamber',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'klinklang',   nature: 'Adamant', ability: 'Clear Body',   item: 'Life Orb',     moves: ['Wild Charge', 'Gear Grind', 'Shift Gear', 'Return'] },
                    { name: 'beheeyem',    nature: 'Modest',  ability: 'Analytic',     item: 'Choice Specs', moves: ['Psychic', 'Energy Ball', 'Thunderbolt', 'Shadow Ball'] },
                    { name: 'porygon2',    nature: 'Bold',    ability: 'Analytic',     item: 'Eviolite',     moves: ['Ice Beam', 'Foul Play', 'Recover', 'Thunder Wave'] },
                    { name: 'sharpedo',    nature: 'Adamant', ability: 'Speed Boost',  item: 'Choice Band',  moves: ['Waterfall', 'Ice Fang', 'Crunch', 'Earthquake'] },
                    { name: 'garbodor',    nature: 'Adamant', ability: 'Aftermath',    item: 'Assault Vest', moves: ['Gunk Shot', 'Curse', 'Drain Punch', 'Seed Bomb'] },
                    { name: 'rotom-wash',  nature: 'Modest',  ability: 'Levitate',     item: 'Choice Specs', moves: ['Hydro Pump', 'Hidden Power', 'Thunderbolt', 'Shadow Ball'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'magnezone',   nature: 'Modest',  ability: 'Analytic',     item: 'Choice Specs', moves: ['Signal Beam', 'Thunderbolt', 'Hidden Power', 'Magnet Rise', 'Flash Cannon'] },
                    { name: 'reuniclus',   nature: 'Modest',  ability: 'Magic Guard',  item: 'Choice Specs', moves: ['Thunder', 'Recover', 'Energy Ball', 'Shadow Ball', 'Psyshock', 'Focus Blast'] },
                    { name: 'porygon-z',   nature: 'Timid',   ability: 'Analytic',     item: 'Choice Specs', moves: ['Signal Beam', 'Thunderbolt', 'Toxic', 'Ice Beam', 'Tri Attack'] },
                    { name: 'muk-alola',   nature: 'Adamant', ability: 'Poison Touch', item: 'Choice Band',  moves: ['Fire Punch', 'Ice Punch', 'Gunk Shot', 'Knock Off', 'Thunder Punch', 'Stone Edge'] },
                    { name: 'latios',      nature: 'Timid',   ability: 'Levitate',     item: 'Latiosite',    moves: ['Energy Ball', 'Calm Mind', 'Dragon Pulse', 'Psyshock', 'Thunderbolt', 'Shadow Ball'] },
                    { name: 'genesect',    nature: 'Naughty', ability: 'Download',     item: 'Choice Band',  moves: ['X-Scissor', 'Thunderbolt', 'Zen Headbutt', 'Iron Head', 'Ice Beam', 'Flamethrower'] },
                ]
            }
        }
    },
    {
        id: 'bugsy',
        name: 'Bugsy',
        title: '',
        region: 'Johto',
        location: 'Amazon Forest',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'scizor',      nature: '',        ability: '',             item: '',             moves: ['Bullet Punch'] },
                    { name: 'genesect',    nature: '',        ability: 'Download',     item: '',             moves: ['Bug Buzz', 'Flamethrower', 'Ice Beam'] },
                    { name: 'scolipede',   nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'volcarona',   nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'heracross',   nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'ninjask',     nature: '',        ability: '',             item: '',             moves: [] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'scizor',      nature: '',        ability: 'Technician',   item: 'Choice Band',  moves: ['Feint', 'Fury Cutter', 'Bullet Punch', 'Pursuit'] },
                    { name: 'genesect',    nature: '',        ability: 'Download',     item: 'Choice Specs', moves: ['Bug Buzz', 'Flash Cannon', 'Ice Beam', 'Flamethrower'] },
                    { name: 'scolipede',   nature: '',        ability: 'Speed Boost',  item: 'Life Orb',     moves: ['Megahorn', 'Stone Edge', 'Poison Jab', 'Earthquake'] },
                    { name: 'volcarona',   nature: '',        ability: '',             item: 'Passho Berry', moves: ['Flamethrower', 'Quiver Dance', 'Bug Buzz', 'Roost'] },
                    { name: 'heracross',   nature: '',        ability: 'Skill Link',   item: 'Heracronite',  moves: ['Rock Blast', 'Pin Missile', 'Bullet Seed', 'Close Combat'] },
                    { name: 'ninjask',     nature: '',        ability: 'Speed Boost',  item: 'Focus Sash',   moves: ['Aerial Ace', 'Thief', 'Swords Dance', 'Leech Life'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'scizor',      nature: '',        ability: 'Technician',   item: 'Choice Band',  moves: ['Feint', 'Fury Cutter', 'Bullet Punch', 'Pursuit'] },
                    { name: 'genesect',    nature: '',        ability: 'Download',     item: 'Choice Specs', moves: ['Bug Buzz', 'Flash Cannon', 'Ice Beam', 'Flamethrower'] },
                    { name: 'scolipede',   nature: '',        ability: 'Speed Boost',  item: 'Life Orb',     moves: ['Megahorn', 'Stone Edge', 'Poison Jab', 'Earthquake'] },
                    { name: 'volcarona',   nature: '',        ability: '',             item: 'Passho Berry', moves: ['Flamethrower', 'Quiver Dance', 'Bug Buzz', 'Roost'] },
                    { name: 'heracross',   nature: '',        ability: 'Skill Link',   item: 'Heracronite',  moves: ['Rock Blast', 'Pin Missile', 'Bullet Seed', 'Close Combat'] },
                    { name: 'ninjask',     nature: '',        ability: 'Speed Boost',  item: 'Focus Sash',   moves: ['Aerial Ace', 'Thief', 'Swords Dance', 'Leech Life'] },
                ]
            }
        }
    },
    {
        id: 'battlebot',
        name: 'BattleBot',
        title: '',
        region: 'Johto',
        location: 'Dock Island (House 2)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'shaymin-land',nature: '',        ability: 'Serene Grace', item: 'Choice Specs', moves: ['Air Slash'] },
                    { name: 'landorus-incarnate', nature: '', ability: 'Sheer Force',  item: '',             moves: ['Rock Slide', 'Earth Power', 'Focus Blast', 'Sludge Wave'] },
                    { name: 'darkrai',     nature: '',        ability: 'Bad Dreams',   item: 'Wide Lens',    moves: ['Dark Pulse', 'Sludge Bomb', 'Hypnosis'] },
                    { name: 'jirachi',     nature: '',        ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Iron Head'] },
                    { name: 'lugia',       nature: '',        ability: 'Multiscale',   item: 'Choice Specs', moves: ['Aeroblast', 'Psyshock', 'Hydro Pump', 'Ice Beam', 'Thunderbolt'] },
                    { name: 'rayquaza',    nature: '',        ability: 'Air Lock',     item: 'Choice Band',  moves: ['Dragon Ascent', 'Earthquake', 'Ice Beam', 'Flamethrower'] },
                ]
            }
        }
    },


    // ══════════════════════════════════════════════════════════════════════════
    // HOENN
    // ══════════════════════════════════════════════════════════════════════════

    {
        id: 'morty',
        name: 'Morty',
        title: '',
        region: 'Hoenn',
        location: 'Mt. Pyre 4F',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'gengar',          nature: 'Timid',   ability: 'Shadow Tag',   item: 'Gengarite',    moves: ['Focus Blast', 'Icy Wind', 'Shadow Ball', 'Sludge Wave', 'Hex'] },
                    { name: 'froslass',        nature: 'Timid',   ability: 'Cursed Body',  item: 'Life Orb',     moves: ['Shadow Ball', 'Thunder', 'Ice Beam', 'Signal Beam'] },
                    { name: 'gourgeist-average', nature: 'Relaxed', ability: 'Pickup',     item: 'Leftovers',    moves: ['Will-O-Wisp', 'Leech Seed', 'Seed Bomb', 'Rock Slide'] },
                    { name: 'golurk',          nature: 'Adamant', ability: 'No Guard',     item: 'Black Belt',   moves: ['Dynamic Punch', 'Earthquake', 'Stone Edge', 'Ice Punch'] },
                    { name: 'cofagrigus',      nature: 'Bold',    ability: 'Mummy',        item: 'Leftovers',    moves: ['Will-O-Wisp', 'Pain Split', 'Shadow Ball', 'Protect'] },
                    { name: 'giratina-altered',nature: 'Quiet',   ability: 'Pressure',     item: 'Choice Specs', moves: ['Shadow Ball', 'Earth Power', 'Aura Sphere', 'Draco Meteor'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'gengar',          nature: 'Timid',   ability: 'Shadow Tag',   item: 'Gengarite',    moves: ['Focus Blast', 'Icy Wind', 'Shadow Ball', 'Sludge Wave', 'Hex'] },
                    { name: 'froslass',        nature: 'Timid',   ability: 'Cursed Body',  item: 'Life Orb',     moves: ['Shadow Ball', 'Thunder', 'Ice Beam', 'Signal Beam'] },
                    { name: 'gourgeist-average', nature: 'Relaxed', ability: 'Pickup',     item: 'Leftovers',    moves: ['Will-O-Wisp', 'Leech Seed', 'Seed Bomb', 'Rock Slide'] },
                    { name: 'golurk',          nature: 'Adamant', ability: 'No Guard',     item: 'Black Belt',   moves: ['Dynamic Punch', 'Earthquake', 'Stone Edge', 'Ice Punch'] },
                    { name: 'cofagrigus',      nature: 'Bold',    ability: 'Mummy',        item: 'Leftovers',    moves: ['Will-O-Wisp', 'Pain Split', 'Shadow Ball', 'Protect'] },
                    { name: 'giratina-altered',nature: 'Quiet',   ability: 'Pressure',     item: 'Choice Specs', moves: ['Shadow Ball', 'Earth Power', 'Aura Sphere', 'Draco Meteor'] },
                ]
            }
        }
    },
    {
        id: 'lt-surge',
        name: 'Lt. Surge',
        title: '',
        region: 'Hoenn',
        location: 'New Mauville',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'voltorb',    ability: 'Static',       item: '',            moves: ['Thundershock', 'Sonicboom', 'Rollout', 'Screech'] },
                    { name: 'raichu',     ability: 'Static',       item: '',            moves: ['Thunderbolt', 'Quick Attack', 'Mega Kick', 'Body Slam'] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'raichu',     nature: 'Timid',   ability: 'Lightning Rod', item: 'Life Orb',     moves: ['Thunderbolt', 'Hidden Power', 'Grass Knot', 'Focus Blast'] },
                    { name: 'manectric',  nature: 'Jolly',   ability: 'Lightning Rod', item: 'Choice Band',  moves: ['Wild Charge', 'Fire Fang', 'Ice Fang', 'Crunch'] },
                    { name: 'heliolisk',  nature: 'Timid',   ability: 'Dry Skin',      item: 'Choice Scarf', moves: ['Thunderbolt', 'Surf', 'Hyper Voice', 'Dragon Pulse'] },
                    { name: 'luxray',     nature: 'Adamant', ability: 'Guts',          item: 'Flame Orb',    moves: ['Wild Charge', 'Fire Fang', 'Ice Fang', 'Facade'] },
                    { name: 'magnezone',  nature: 'Timid',   ability: 'Magnet Pull',   item: 'Life Orb',     moves: ['Thunderbolt', 'Flash Cannon', 'Signal Beam', 'Magnet Rise'] },
                    { name: 'jolteon',    nature: 'Timid',   ability: 'Volt Absorb',   item: 'Choice Scarf', moves: ['Thunderbolt', 'Hidden Power', 'Shadow Ball', 'Signal Beam'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'rotom-wash', nature: 'Timid',   ability: 'Levitate',      item: 'Choice Specs', moves: ['Signal Beam', 'Dark Pulse', 'Thunderbolt', 'Hidden Power', 'Hydro Pump', 'Shadow Ball'] },
                    { name: 'electivire', nature: 'Adamant', ability: 'Vital Spirit',  item: 'Choice Band',  moves: ['Iron Tail', 'Rock Slide', 'Wild Charge', 'Ice Punch', 'Low Kick', 'Fire Punch'] },
                    { name: 'raichu',     nature: 'Timid',   ability: '',              item: 'Choice Specs', moves: ['Grass Knot', 'Signal Beam', 'Iron Tail', 'Thunderbolt', 'Hidden Power', 'Surf', 'Focus Blast'] },
                    { name: 'zapdos',     nature: 'Timid',   ability: 'Pressure',      item: 'Choice Specs', moves: ['Ancient Power', 'Signal Beam', 'Thunderbolt', 'Heat Wave', 'Hidden Power', 'Drill Peck'] },
                    { name: 'golem-alola',nature: 'Adamant', ability: 'Sturdy',        item: 'Choice Band',  moves: ['Stone Edge', 'Iron Head', 'Rock Polish', 'Wild Charge', 'Earthquake', 'Fire Punch', 'Close Combat'] },
                    { name: 'zekrom',     nature: 'Adamant', ability: 'Teravolt',      item: 'Choice Band',  moves: ['Bolt Strike', 'Outrage', 'Steel Wing', 'Rock Slide'] },
                ]
            }
        }
    },
    {
        id: 'guardian-raikou',
        name: 'Guardian (Raikou)',
        title: '',
        region: 'Hoenn',
        location: 'Route 110 (Secret Base Alpha)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'zekrom',      nature: 'Naughty', ability: 'Teravolt',     item: 'Life Orb',     moves: ['Bolt Strike', 'Dragon Claw', 'Steel Wing', 'Focus Blast'] },
                    { name: 'excadrill',   nature: 'Adamant', ability: 'Mold Breaker', item: 'Choice Scarf', moves: ['Earthquake', 'Iron Head', 'Rock Slide', 'X-Scissor'] },
                    { name: 'raikou',      nature: 'Timid',   ability: 'Pressure',     item: 'Life Orb',     moves: ['Thunder', 'Aura Sphere', 'Extrasensory', 'Calm Mind'] },
                    { name: 'quagsire',    nature: 'Bold',    ability: 'Unaware',      item: 'Leftovers',    moves: ['Scald', 'Ice Beam', 'Recover', 'Toxic'] },
                    { name: 'eelektross',  nature: 'Modest',  ability: 'Levitate',     item: 'Assault Vest', moves: ['Thunderbolt', 'Flamethrower', 'Giga Drain', 'Knock Off'] },
                    { name: 'magnezone',   nature: 'Timid',   ability: 'Sturdy',       item: 'Choice Scarf', moves: ['Thunderbolt', 'Discharge', 'Flash Cannon', 'Tri Attack'] },
                ]
            }
        }
    },
    {
        id: 'professor-birch',
        name: 'Professor Birch',
        title: '',
        region: 'Hoenn',
        location: 'Verdanturf Town (House 2)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'medicham',    nature: '',        ability: '',             item: '',             moves: ['High Jump Kick'] },
                    { name: 'slaking',     nature: '',        ability: 'Truant',       item: 'Leftovers',    moves: ['Rock Slide', 'Giga Impact'] },
                    { name: 'swellow',     nature: '',        ability: 'Guts',         item: 'Flame Orb',    moves: ['Thief', 'Brave Bird'] },
                    { name: 'pelipper',    nature: '',        ability: 'Drizzle',      item: '',             moves: ['Knock Off'] },
                    { name: 'flygon',      nature: '',        ability: 'Levitate',     item: 'Life Orb',     moves: ['Outrage'] },
                    { name: 'swampert',    nature: '',        ability: 'Swift Swim',   item: 'Swampertite',  moves: ['Earthquake', 'Waterfall'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'medicham',    nature: '',        ability: 'Pure Power',   item: 'Choice Band',  moves: ['Zen Headbutt', 'Fire Punch', 'High Jump Kick', 'Ice Punch', 'Poison Jab'] },
                    { name: 'slaking',     nature: '',        ability: 'Truant',       item: 'Choice Band',  moves: ['Rock Slide', 'Fire Punch', 'Hammer Arm', 'Giga Impact'] },
                    { name: 'swellow',     nature: '',        ability: 'Guts',         item: 'Flame Orb',    moves: ['Thief', 'Brave Bird', 'Return', 'U-turn'] },
                    { name: 'torkoal',     nature: '',        ability: 'Drought',      item: 'Heat Rock',    moves: ['Lava Plume', 'Solar Beam', 'Earthquake', 'Explosion'] },
                    { name: 'flygon',      nature: '',        ability: 'Levitate',     item: 'Life Orb',     moves: ['Outrage', 'Fire Blast', 'Earthquake', 'Stone Edge', 'Superpower'] },
                    { name: 'blaziken',    nature: '',        ability: 'Speed Boost',  item: 'Blazikenite',  moves: ['Brave Bird', 'Flare Blitz', 'High Jump Kick', 'Earthquake'] },
                ]
            }
        }
    },
    {
        id: 'gingery-jones',
        name: 'Gingery Jones',
        title: '',
        region: 'Hoenn',
        location: 'Feral Site (Fiery Path)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'conkeldurr',  nature: '',        ability: '',             item: 'Choice Band',  moves: ['Drain Punch', 'Knock Off', 'Ice Punch', 'Thunder Punch'] },
                    { name: 'klinklang',   nature: '',        ability: 'Clear Body',   item: 'Choice Band',  moves: ['Wild Charge', 'Gear Grind', 'Return', 'Shift Gear'] },
                    { name: 'golurk',      nature: '',        ability: '',             item: 'Choice Band',  moves: ['Ice Punch', 'Drain Punch', 'Earthquake', 'Shadow Punch'] },
                    { name: 'mandibuzz',   nature: '',        ability: '',             item: 'Rocky Helmet', moves: ['Brave Bird', 'Knock Off', 'Whirlwind'] },
                    { name: 'clawitzer',   nature: '',        ability: 'Mega Launcher',item: 'Choice Specs', moves: ['Ice Beam', 'Scald', 'Dark Pulse', 'Aura Sphere'] },
                    { name: 'pangoro',     nature: '',        ability: '',             item: 'Choice Band',  moves: ['Drain Punch', 'Swords Dance', 'Zen Headbutt', 'Knock Off'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'conkeldurr',  nature: '',        ability: '',             item: 'Choice Band',  moves: ['Drain Punch', 'Knock Off', 'Ice Punch', 'Thunder Punch'] },
                    { name: 'klinklang',   nature: '',        ability: 'Clear Body',   item: 'Choice Band',  moves: ['Wild Charge', 'Gear Grind', 'Return', 'Shift Gear'] },
                    { name: 'golurk',      nature: '',        ability: '',             item: 'Choice Band',  moves: ['Ice Punch', 'Drain Punch', 'Earthquake', 'Shadow Punch'] },
                    { name: 'mandibuzz',   nature: '',        ability: '',             item: 'Rocky Helmet', moves: ['Brave Bird', 'Knock Off', 'Whirlwind'] },
                    { name: 'clawitzer',   nature: '',        ability: 'Mega Launcher',item: 'Choice Specs', moves: ['Ice Beam', 'Scald', 'Dark Pulse', 'Aura Sphere'] },
                    { name: 'pangoro',     nature: '',        ability: '',             item: 'Choice Band',  moves: ['Drain Punch', 'Swords Dance', 'Zen Headbutt', 'Knock Off'] },
                ]
            }
        }
    },
    {
        id: 'naruto-fanboy',
        name: 'Naruto Fanboy',
        title: '',
        region: 'Hoenn',
        location: 'Desert Ruins',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'exploud',     nature: '',        ability: 'Scrappy',      item: 'Choice Specs', moves: ['Focus Blast', 'Fire Blast', 'Boomburst', 'Surf'] },
                    { name: 'sigilyph',    nature: '',        ability: 'Tinted Lens',  item: 'Life Orb',     moves: ['Psyshock', 'Air Slash', 'Energy Ball', 'Heat Wave'] },
                    { name: 'chansey',     nature: '',        ability: 'Serene Grace', item: 'Eviolite',     moves: ['Ice Beam', 'Thunderbolt'] },
                    { name: 'solrock',     nature: '',        ability: 'Levitate',     item: 'Choice Band',  moves: ['Flare Blitz', 'Stone Edge', 'Explosion'] },
                    { name: 'togekiss',    nature: '',        ability: 'Serene Grace', item: 'Life Orb',     moves: ['Thunder Wave', 'Air Slash', 'Flamethrower', 'Ancient Power'] },
                    { name: 'regigigas',   nature: '',        ability: 'Slow Start',   item: 'Choice Scarf', moves: ['Giga Impact', 'Fire Punch', 'Zen Headbutt', 'Heavy Slam'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'claydol',     nature: '',        ability: 'Levitate',     item: 'Choice Band',  moves: ['Earthquake', 'Zen Headbutt', 'Stealth Rock', 'Explosion', 'Stone Edge'] },
                    { name: 'staraptor',   nature: '',        ability: 'Reckless',     item: 'Choice Band',  moves: ['Brave Bird', 'Close Combat', 'Steel Wing', 'Double-Edge'] },
                    { name: 'porygon-z',   nature: '',        ability: '',             item: 'Choice Specs', moves: ['Thunderbolt', 'Tri Attack', 'Shadow Ball', 'Nasty Plot'] },
                    { name: 'flygon',      nature: '',        ability: 'Levitate',     item: 'Life Orb',     moves: ['Superpower', 'Outrage', 'Earthquake', 'Fire Blast'] },
                    { name: 'bronzong',    nature: '',        ability: '',             item: 'Choice Band',  moves: ['Earthquake', 'Explosion', 'Toxic', 'Iron Head'] },
                    { name: 'lugia',       nature: '',        ability: 'Multiscale',   item: 'Choice Specs', moves: ['Aeroblast', 'Psyshock', 'Hydro Pump', 'Earth Power', 'Giga Drain'] },
                ]
            }
        }
    },
    {
        id: 'steven',
        name: 'Steven',
        title: '',
        region: 'Hoenn',
        location: 'Valley Of Steel (Underground)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'metagross',   nature: 'Adamant', ability: 'Tough Claws',  item: 'Metagrossite', moves: ['Thunder Punch', 'Meteor Mash', 'Ice Punch', 'Zen Headbutt'] },
                    { name: 'excadrill',   nature: 'Adamant', ability: 'Mold Breaker', item: 'Focus Sash',   moves: ['Earthquake', 'Iron Head', 'Rock Slide', 'Swords Dance'] },
                    { name: 'magnezone',   nature: 'Modest',  ability: 'Magnet Pull',  item: 'Choice Specs', moves: ['Hidden Power', 'Thunderbolt', 'Flash Cannon', 'Sunny Day'] },
                    { name: 'lucario',     nature: 'Adamant', ability: 'Justified',    item: 'Choice Band',  moves: ['Meteor Mash', 'Close Combat', 'Extreme Speed', 'Swords Dance'] },
                    { name: 'ferrothorn',  nature: 'Sassy',   ability: 'Iron Barbs',   item: 'Leftovers',    moves: ['Leech Seed', 'Power Whip', 'Knock Off', 'Gyro Ball'] },
                    { name: 'heatran',     nature: 'Modest',  ability: 'Flash Fire',   item: 'Choice Scarf', moves: ['Magma Storm', 'Earth Power', 'Solar Beam', 'Ancient Power'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'metagross',   nature: 'Adamant', ability: 'Tough Claws',  item: 'Metagrossite', moves: ['Thunder Punch', 'Meteor Mash', 'Ice Punch', 'Zen Headbutt'] },
                    { name: 'excadrill',   nature: 'Adamant', ability: 'Mold Breaker', item: 'Choice Scarf', moves: ['Earthquake', 'Iron Head', 'Rock Slide', 'Swords Dance'] },
                    { name: 'magnezone',   nature: 'Modest',  ability: 'Magnet Pull',  item: 'Choice Specs', moves: ['Hidden Power', 'Thunderbolt', 'Flash Cannon', 'Sunny Day'] },
                    { name: 'jirachi',     nature: 'Adamant', ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Iron Head', 'Ice Punch', 'Fire Punch', 'Zen Headbutt'] },
                    { name: 'ferrothorn',  nature: 'Sassy',   ability: 'Iron Barbs',   item: 'Rocky Helmet', moves: ['Leech Seed', 'Power Whip', 'Knock Off', 'Gyro Ball'] },
                    { name: 'heatran',     nature: 'Modest',  ability: 'Flash Fire',   item: 'Choice Specs', moves: ['Magma Storm', 'Earth Power', 'Solar Beam', 'Ancient Power'] },
                ]
            }
        }
    },
    {
        id: 'toothless',
        name: 'Toothless',
        title: '',
        region: 'Hoenn',
        location: 'Abandoned Ship B1F Room 1 (Route 108)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'garchomp',    nature: 'Random',  ability: 'Rough Skin',   item: 'Choice Band',  moves: ['Outrage', 'Earthquake', 'Swords Dance', 'Fire Fang'] },
                    { name: 'miltank',     nature: 'Random',  ability: 'Thick Fat',    item: 'Rocky Helmet', moves: ['Seismic Toss', 'Toxic', 'Earthquake', 'Double-Edge'] },
                    { name: 'quagsire',    nature: 'Random',  ability: 'Unaware',      item: 'Leftovers',    moves: ['Scald', 'Earthquake', 'Toxic', 'Stockpile'] },
                    { name: 'metagross',   nature: 'Random',  ability: 'Tough Claws',  item: 'Metagrossite', moves: ['Ice Punch', 'Meteor Mash', 'Thunder Punch', 'Earthquake'] },
                    { name: 'starmie',     nature: 'Random',  ability: 'Analytic',     item: 'Focus Sash',   moves: ['Thunderbolt', 'Hydro Pump', 'Ice Beam', 'Psyshock'] },
                    { name: 'diancie',     nature: 'Random',  ability: 'Clear Body',   item: 'Life Orb',     moves: ['Moonblast', 'Earth Power', 'Diamond Storm', 'Calm Mind'] },
                ]
            }
        }
    },
    {
        id: 'tigerous',
        name: 'Tigerous',
        title: '',
        region: 'Hoenn',
        location: 'Eumi Island Theme Park 2',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'salamence',   nature: 'Naive',   ability: 'Aerilate',     item: 'Salamencite',  moves: ['Dragon Dance', 'Outrage', 'Fire Blast', 'Iron Tail', 'Double-Edge'] },
                    { name: 'keldeo',      nature: 'Timid',   ability: 'Justified',    item: 'Choice Specs', moves: ['Hydro Pump', 'Icy Wind', 'Secret Sword'] },
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Focus Sash',   moves: ['Dragon Dance', 'Dragon Claw', 'Extreme Speed', 'Waterfall'] },
                    { name: 'jirachi',     nature: 'Jolly',   ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Iron Head', 'Zen Headbutt', 'Ice Punch', 'Fire Punch'] },
                    { name: 'tyranitar',   nature: 'Adamant', ability: 'Unnerve',      item: 'Leftovers',    moves: ['Stone Edge', 'Crunch', 'Superpower', 'Fire Punch'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Guts',         item: 'Flame Orb',    moves: ['Drain Punch', 'Facade', 'Knock Off', 'Ice Punch'] },
                ]
            }
        }
    },


    // ══════════════════════════════════════════════════════════════════════════
    // SINNOH
    // ══════════════════════════════════════════════════════════════════════════

    {
        id: 'professor-rowan',
        name: 'Professor Rowan',
        title: '',
        region: 'Sinnoh',
        location: 'Jubilife City School',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'torterra',    nature: 'Adamant', ability: 'Overgrow',     item: 'Choice Band',  moves: ['Wood Hammer', 'Earthquake', 'Stone Edge', 'Seed Bomb'] },
                    { name: 'empoleon',    nature: 'Modest',  ability: 'Torrent',      item: 'Focus Sash',   moves: ['Ice Beam', 'Hydro Pump', 'Grass Knot', 'Toxic'] },
                    { name: 'infernape',   nature: 'Naive',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Close Combat', 'Flare Blitz', 'Gunk Shot', 'Grass Knot'] },
                    { name: 'staraptor',   nature: 'Adamant', ability: 'Reckless',     item: 'Choice Band',  moves: ['Brave Bird', 'Double-Edge', 'Close Combat', 'Quick Attack'] },
                    { name: 'gliscor',     nature: 'Adamant', ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Earthquake', 'Ice Fang', 'Facade', 'Knock Off'] },
                    { name: 'rotom',       nature: 'Modest',  ability: 'Levitate',     item: 'Choice Specs', moves: ['Thunderbolt', 'Shadow Ball', 'Will-O-Wisp', 'Defog'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'torterra',    nature: 'Adamant', ability: 'Overgrow',     item: 'Choice Band',  moves: ['Wood Hammer', 'Earthquake', 'Stone Edge', 'Seed Bomb'] },
                    { name: 'empoleon',    nature: 'Modest',  ability: 'Torrent',      item: 'Choice Scarf', moves: ['Ice Beam', 'Hydro Pump', 'Grass Knot', 'Toxic'] },
                    { name: 'infernape',   nature: 'Naive',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Close Combat', 'Flare Blitz', 'Gunk Shot', 'Grass Knot'] },
                    { name: 'staraptor',   nature: 'Adamant', ability: 'Reckless',     item: 'Choice Band',  moves: ['Brave Bird', 'Double-Edge', 'Close Combat', 'Quick Attack'] },
                    { name: 'gliscor',     nature: 'Adamant', ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Earthquake', 'Ice Fang', 'Facade', 'Knock Off'] },
                    { name: 'manaphy',     nature: 'Modest',  ability: 'Hydration',    item: 'Choice Specs', moves: ['Surf', 'Ice Beam', 'Energy Ball', 'Tail Glow'] },
                ]
            }
        }
    },
    {
        id: 'spectify',
        name: 'Spectify',
        title: '',
        region: 'Sinnoh',
        location: 'Sandgem Town House',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'salamence',   nature: 'Random',  ability: 'Moxie',        item: '',             moves: [] },
                    { name: 'meganium',    nature: 'Random',  ability: 'Overgrow',     item: '',             moves: [] },
                    { name: 'feraligatr',  nature: 'Random',  ability: 'Sheer Force',  item: '',             moves: [] },
                    { name: 'typhlosion',  nature: 'Random',  ability: 'Blaze',        item: '',             moves: [] },
                    { name: 'umbreon',     nature: 'Random',  ability: 'Synchronize',  item: '',             moves: [] },
                    { name: 'espeon',      nature: 'Random',  ability: 'Magic Bounce', item: '',             moves: [] },
                ]
            },
            medium: {
                pokemon: [
                    { name: 'salamence',   nature: 'Random',  ability: 'Aerilate',     item: 'Salamencite',  moves: ['Outrage', 'Fire Blast', 'Dragon Dance', 'Earthquake', 'Double-Edge'] },
                    { name: 'meganium',    nature: 'Random',  ability: 'Overgrow',     item: 'Choice Band',  moves: ['Seed Bomb', 'Dragon Tail', 'Earthquake', 'Swords Dance'] },
                    { name: 'feraligatr',  nature: 'Random',  ability: 'Torrent',      item: 'Choice Band',  moves: ['Waterfall', 'Ice Punch', 'Low Kick', 'Swords Dance'] },
                    { name: 'typhlosion',  nature: 'Random',  ability: 'Blaze',        item: 'Choice Specs', moves: ['Solar Beam', 'Fire Blast', 'Focus Blast', 'Thunder Punch'] },
                    { name: 'umbreon',     nature: 'Random',  ability: 'Synchronize',  item: 'Leftovers',    moves: ['Foul Play', 'Toxic', 'Mean Look', 'Heal Bell'] },
                    { name: 'espeon',      nature: 'Random',  ability: 'Magic Bounce', item: 'Choice Specs', moves: ['Shadow Ball', 'Calm Mind', 'Psychic', 'Dazzling Gleam'] },
                ]
            }
        }
    },
    {
        id: 'link',
        name: 'Link',
        title: '',
        region: 'Sinnoh',
        location: 'Twinleaf Town (House 2)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'electrode',   nature: 'Timid',   ability: 'Static',       item: 'Life Orb',     moves: ['Explosion', 'Protect', 'Signal Beam', 'Taunt'] },
                    { name: 'rapidash',    nature: 'Jolly',   ability: 'Run Away',     item: 'Choice Band',  moves: ['Megahorn', 'Flamethrower', 'Poison Jab', 'Bounce'] },
                    { name: 'aegislash-shield', nature: 'Adamant', ability: 'Stance Change', item: 'Assault Vest', moves: ['Shadow Sneak', 'Brick Break', 'Iron Head', 'Swords Dance'] },
                    { name: 'bronzong',    nature: 'Impish',  ability: 'Levitate',     item: 'Leftovers',    moves: ['Payback', 'Earthquake', 'Flash Cannon', 'Psychic'] },
                    { name: 'hitmontop',   nature: 'Adamant', ability: 'Intimidate',   item: 'Choice Scarf', moves: ['Close Combat', 'Rock Slide', 'Aerial Ace', 'Bulk Up'] },
                    { name: 'absol',       nature: 'Adamant', ability: 'Super Luck',   item: 'Life Orb',     moves: ['Shadow Ball', 'Ice Beam', 'Psycho Cut', 'Night Slash'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'hippowdon',   nature: 'Impish',  ability: 'Sand Stream',  item: 'Leftovers',    moves: ['Iron Head', 'Ice Fang', 'Earthquake', 'Stone Edge', 'Fire Fang', 'Slack Off'] },
                    { name: 'aegislash-shield', nature: 'Adamant', ability: 'Stance Change', item: 'Choice Band', moves: ['Pursuit', 'Swords Dance', 'Iron Head', 'Sacred Sword', "King's Shield", 'Flash Cannon', 'Shadow Ball'] },
                    { name: 'heatran',     nature: 'Timid',   ability: 'Flash Fire',   item: 'Choice Scarf', moves: ['Dragon Pulse', 'Earth Power', 'Lava Plume', 'Flash Cannon', 'Stone Edge', 'Hidden Power'] },
                    { name: 'donphan',     nature: 'Adamant', ability: 'Sturdy',       item: 'Choice Band',  moves: ['Fire Fang', 'Thunder Fang', 'Heavy Slam', 'Earthquake', 'Seed Bomb', 'Gunk Shot', 'Knock Off'] },
                    { name: 'skarmory',    nature: 'Careful', ability: 'Sturdy',       item: 'Leftovers',    moves: ['Roost', 'Brave Bird', 'Iron Head', 'Whirlwind'] },
                    { name: 'emboar',      nature: 'Adamant', ability: 'Reckless',     item: 'Choice Scarf', moves: ['Earthquake', 'Stone Edge', 'Sucker Punch', 'Zen Headbutt', 'Flare Blitz'] },
                ]
            }
        }
    },
    {
        id: 'medusa-eldir',
        name: 'Medusa & Eldir',
        title: '',
        region: 'Sinnoh',
        location: 'Oreburgh Gate (Legends Cave)',
        difficulties: {
            medium: {
                pokemon: [
                    // Medusa
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Choice Band',  moves: ['Dragon Claw', 'Earthquake', 'Iron Head', 'Fire Punch'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Iron Fist',    item: 'Assault Vest', moves: ['Drain Punch', 'Knock Off', 'Poison Jab', 'Ice Punch'] },
                    { name: 'lucario',     nature: 'Jolly',   ability: 'Inner Focus',  item: 'Choice Scarf', moves: ['Close Combat', 'Meteor Mash', 'Crunch', 'Ice Punch'] },
                    { name: 'jolteon',     nature: 'Timid',   ability: 'Volt Absorb',  item: 'Life Orb',     moves: ['Discharge', 'Thunder', 'Signal Beam', 'Shadow Ball'] },
                    { name: 'garchomp',    nature: 'Relaxed', ability: 'Sand Force',   item: 'Garchompite',  moves: ['Dragon Tail', 'Earthquake', 'Iron Head', 'Fire Fang', 'Fire Blast', 'Stone Edge'] },
                    { name: 'reshiram',    nature: 'Modest',  ability: 'Turboblaze',   item: 'Life Orb',     moves: ['Blue Flare', 'Roost', 'Outrage', 'Earth Power'] },
                    // Eldir
                    { name: 'gyarados',    nature: 'Jolly',   ability: 'Intimidate',   item: 'Choice Band',  moves: ['Dragon Dance', 'Waterfall', 'Crunch', 'Earthquake'] },
                    { name: 'muk-alola',   nature: 'Adamant', ability: 'Poison Touch', item: 'Assault Vest', moves: ['Knock Off', 'Pursuit', 'Gunk Shot', 'Fire Punch'] },
                    { name: 'alakazam',    nature: 'Modest',  ability: 'Magic Guard',  item: 'Focus Sash',   moves: ['Hidden Power', 'Psyshock', 'Energy Ball', 'Dazzling Gleam'] },
                    { name: 'infernape',   nature: 'Naive',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Close Combat', 'Poison Jab', 'Earthquake', 'Fire Blast'] },
                    { name: 'slowbro',     nature: 'Bold',    ability: 'Shell Armor',  item: 'Slowbronite',  moves: ['Calm Mind', 'Psyshock', 'Slack Off', 'Scald'] },
                    { name: 'zekrom',      nature: 'Adamant', ability: 'Teravolt',     item: 'Life Orb',     moves: ['Bolt Strike', 'Dragon Claw', 'Outrage', 'Roost'] },
                ]
            },
            hard: {
                pokemon: [
                    // Medusa
                    { name: 'dragonite',   nature: 'Adamant', ability: 'Multiscale',   item: 'Choice Band',  moves: ['Dragon Claw', 'Earthquake', 'Iron Head', 'Fire Punch'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Iron Fist',    item: 'Assault Vest', moves: ['Drain Punch', 'Knock Off', 'Poison Jab', 'Ice Punch'] },
                    { name: 'lucario',     nature: 'Jolly',   ability: 'Inner Focus',  item: 'Choice Scarf', moves: ['Close Combat', 'Meteor Mash', 'Crunch', 'Ice Punch'] },
                    { name: 'jolteon',     nature: 'Timid',   ability: 'Volt Absorb',  item: 'Life Orb',     moves: ['Discharge', 'Thunder', 'Signal Beam', 'Shadow Ball'] },
                    { name: 'garchomp',    nature: 'Relaxed', ability: 'Sand Force',   item: 'Garchompite',  moves: ['Dragon Tail', 'Earthquake', 'Iron Head', 'Fire Fang', 'Fire Blast', 'Stone Edge'] },
                    { name: 'reshiram',    nature: 'Modest',  ability: 'Turboblaze',   item: 'Life Orb',     moves: ['Blue Flare', 'Roost', 'Outrage', 'Earth Power'] },
                    // Eldir
                    { name: 'gyarados',    nature: 'Jolly',   ability: 'Intimidate',   item: 'Choice Band',  moves: ['Dragon Dance', 'Waterfall', 'Crunch', 'Earthquake'] },
                    { name: 'muk-alola',   nature: 'Adamant', ability: 'Poison Touch', item: 'Assault Vest', moves: ['Knock Off', 'Pursuit', 'Gunk Shot', 'Fire Punch'] },
                    { name: 'alakazam',    nature: 'Modest',  ability: 'Magic Guard',  item: 'Focus Sash',   moves: ['Hidden Power', 'Psyshock', 'Energy Ball', 'Dazzling Gleam'] },
                    { name: 'infernape',   nature: 'Naive',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Close Combat', 'Poison Jab', 'Earthquake', 'Fire Blast'] },
                    { name: 'slowbro',     nature: 'Bold',    ability: 'Shell Armor',  item: 'Slowbronite',  moves: ['Calm Mind', 'Psyshock', 'Slack Off', 'Scald'] },
                    { name: 'zekrom',      nature: 'Adamant', ability: 'Teravolt',     item: 'Life Orb',     moves: ['Bolt Strike', 'Dragon Claw', 'Outrage', 'Roost'] },
                ]
            }
        }
    },
    {
        id: 'maribela',
        name: 'Maribela',
        title: '',
        region: 'Sinnoh',
        location: 'Floaroma Meadow',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'sylveon',         nature: '',        ability: '',             item: '',             moves: ['Hyper Voice'] },
                    { name: 'absol',           nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'jellicent-male',  nature: '',        ability: '',             item: 'Leftovers',    moves: ['Shadow Ball', 'Scald'] },
                    { name: 'delphox',         nature: '',        ability: '',             item: '',             moves: ['Psychic'] },
                    { name: 'roserade',        nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'keldeo-ordinary', nature: '',        ability: 'Justified',    item: '',             moves: [] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'sylveon',         nature: '',        ability: 'Pixilate',     item: 'Choice Specs', moves: ['Wish', 'Shadow Ball', 'Hyper Voice', 'Psyshock'] },
                    { name: 'gallade',         nature: '',        ability: 'Inner Focus',  item: 'Galladite',    moves: ['Psycho Cut', 'Swords Dance', 'Close Combat', 'Knock Off'] },
                    { name: 'volcarona',       nature: '',        ability: 'Flame Body',   item: 'Choice Specs', moves: ['Flamethrower', 'Giga Drain', 'Bug Buzz', 'Quiver Dance', 'Hidden Power'] },
                    { name: 'keldeo-ordinary', nature: '',        ability: 'Justified',    item: 'Choice Specs', moves: ['Hydro Pump', 'Focus Blast', 'Calm Mind'] },
                    { name: 'arcanine',        nature: '',        ability: 'Intimidate',   item: 'Choice Band',  moves: ['Flare Blitz', 'Wild Charge', 'Close Combat', 'Crunch'] },
                    { name: 'xerneas',         nature: '',        ability: 'Fairy Aura',   item: 'Choice Scarf', moves: ['Moonblast', 'Thunder', 'Focus Blast', 'Grass Knot'] },
                ]
            }
        }
    },
    {
        id: 'letrix',
        name: 'Letrix',
        title: '',
        region: 'Sinnoh',
        location: 'Valley Windworks',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'togekiss',    nature: 'Modest',  ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Flamethrower', 'Aura Sphere', 'Dazzling Gleam'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Guts',         item: 'Flame Orb',    moves: ['Drain Punch', 'Knock Off', 'Ice Punch', 'Facade'] },
                    { name: 'tyranitar',   nature: 'Naive',   ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Pursuit', 'Stone Edge', 'Fire Blast', 'Ice Beam'] },
                    { name: 'excadrill',   nature: 'Adamant', ability: 'Mold Breaker', item: 'Focus Sash',   moves: ['Earthquake', 'Iron Head', 'Rock Slide', 'Rapid Spin'] },
                    { name: 'hydreigon',   nature: 'Naive',   ability: 'Levitate',     item: 'Life Orb',     moves: ['Dark Pulse', 'Flash Cannon', 'Draco Meteor', 'Superpower'] },
                    { name: 'kyogre',      nature: 'Modest',  ability: 'Drizzle',      item: 'Choice Specs', moves: ['Hydro Pump', 'Ice Beam', 'Thunder', 'Calm Mind'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'togekiss',    nature: 'Modest',  ability: 'Serene Grace', item: 'Choice Scarf', moves: ['Air Slash', 'Flamethrower', 'Aura Sphere', 'Dazzling Gleam'] },
                    { name: 'conkeldurr',  nature: 'Adamant', ability: 'Guts',         item: 'Flame Orb',    moves: ['Drain Punch', 'Knock Off', 'Ice Punch', 'Facade'] },
                    { name: 'tyranitar',   nature: 'Naive',   ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Pursuit', 'Stone Edge', 'Fire Punch', 'Fire Blast', 'Ice Beam', 'Earthquake'] },
                    { name: 'excadrill',   nature: 'Adamant', ability: 'Mold Breaker', item: 'Focus Sash',   moves: ['Earthquake', 'Iron Head', 'Rock Slide', 'Rapid Spin'] },
                    { name: 'hydreigon',   nature: 'Naive',   ability: 'Levitate',     item: 'Life Orb',     moves: ['Dark Pulse', 'Flash Cannon', 'Draco Meteor', 'Superpower'] },
                    { name: 'kyogre',      nature: 'Modest',  ability: 'Drizzle',      item: 'Choice Specs', moves: ['Hydro Pump', 'Ice Beam', 'Thunder', 'Calm Mind'] },
                ]
            }
        }
    },
    {
        id: 'logan',
        name: 'Logan',
        title: '',
        region: 'Sinnoh',
        location: 'Cave Of Justice (Route 210 North)',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'infernape',   nature: '',        ability: 'Iron Fist',    item: 'Choice Scarf', moves: ['Flare Blitz', 'Thunder Punch', 'Close Combat', 'Gunk Shot'] },
                    { name: 'gliscor',     nature: '',        ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Facade', 'Earthquake', 'Roost', 'Swords Dance'] },
                    { name: 'serperior',   nature: '',        ability: 'Contrary',     item: 'Choice Specs', moves: ['Leech Seed', 'Hidden Power', 'Leaf Storm', 'Dragon Pulse'] },
                    { name: 'rotom-wash',  nature: '',        ability: 'Levitate',     item: 'Leftovers',    moves: ['Hydro Pump', 'Discharge', 'Will-O-Wisp', 'Pain Split'] },
                    { name: 'tyranitar',   nature: '',        ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Superpower', 'Stone Edge', 'Crunch', 'Earthquake'] },
                    { name: 'dialga',      nature: '',        ability: 'Pressure',     item: 'Shuca Berry',  moves: ['Thunder', 'Dragon Pulse', 'Fire Blast', 'Earth Power'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'infernape',   nature: '',        ability: 'Iron Fist',    item: 'Choice Band',  moves: ['Flare Blitz', 'Thunder Punch', 'Close Combat', 'Earthquake', 'Gunk Shot'] },
                    { name: 'gliscor',     nature: '',        ability: 'Poison Heal',  item: 'Toxic Orb',    moves: ['Facade', 'Earthquake', 'Roost', 'Swords Dance', 'Rock Slide'] },
                    { name: 'serperior',   nature: '',        ability: 'Contrary',     item: 'Choice Specs', moves: ['Leech Seed', 'Hidden Power', 'Leaf Storm', 'Dragon Pulse'] },
                    { name: 'rotom-wash',  nature: '',        ability: 'Levitate',     item: 'Leftovers',    moves: ['Hydro Pump', 'Discharge', 'Will-O-Wisp', 'Pain Split'] },
                    { name: 'tyranitar',   nature: '',        ability: 'Sand Stream',  item: 'Tyranitarite', moves: ['Superpower', 'Stone Edge', 'Crunch', 'Earthquake'] },
                    { name: 'dialga',      nature: '',        ability: 'Pressure',     item: 'Shuca Berry',  moves: [] },
                ]
            }
        }
    },
    {
        id: 'ash-westbrook',
        name: 'Ash Westbrook',
        title: '',
        region: 'Sinnoh',
        location: 'Spear Pillar',
        difficulties: {
            easy: {
                pokemon: [
                    { name: 'dialga',    ability: 'Pressure',   item: '',           moves: ['Draco Meteor', '', '', ''] },
                    { name: 'reshiram',  ability: 'Turboblaze', item: '',           moves: ['Draco Meteor', '', '', ''] },
                    { name: 'arceus',    ability: 'Multitype',  item: '',           moves: [] },
                    { name: 'infernape', ability: '',           item: '',           moves: [] },
                    { name: 'kyogre',    ability: 'Drizzle',    item: '',           moves: ['', '', 'Thunder', ''] },
                    { name: 'lugia',     ability: 'Multiscale', item: '',           moves: ['Dragon Pulse', '', '', ''] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'dialga',    ability: 'Pressure',   item: 'Leftovers',    moves: ['Draco Meteor', 'Roar', 'Fire Blast', 'Flash Cannon'] },
                    { name: 'reshiram',  ability: 'Turboblaze', item: 'Life Orb',     moves: ['Draco Meteor', 'Roar', 'Blue Flare', 'Stone Edge'] },
                    { name: 'arceus',    ability: 'Multitype',  item: 'Life Orb',     moves: ['Extreme Speed', 'Shadow Claw', 'Earthquake', 'Stone Edge'] },
                    { name: 'infernape', ability: 'Blaze',      item: 'Expert Belt',  moves: ['Close Combat', 'Fire Blast', 'Grass Knot', 'Thunder Punch'] },
                    { name: 'kyogre',    ability: 'Drizzle',    item: 'Choice Specs', moves: ['Surf', 'Earthquake', 'Thunder', 'Ice Beam'] },
                    { name: 'lugia',     ability: 'Multiscale', item: 'Leftovers',    moves: ['Dragon Pulse', 'Psyshock', 'Ice Beam', 'Aeroblast'] },
                ]
            }
        }
    },
    {
        id: 'saphirr',
        name: 'Saphirr',
        title: '',
        region: 'Sinnoh',
        location: 'Route 227',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'charizard',   nature: 'Modest',  ability: 'Blaze',        item: 'Focus Sash',   moves: ['Fire Blast', 'Air Slash', 'Focus Blast', 'Roost'] },
                    { name: 'garchomp',    nature: 'Adamant', ability: 'Rough Skin',   item: 'Focus Sash',   moves: ['Earthquake', 'Outrage', 'Fire Blast', 'Stone Edge'] },
                    { name: 'tangrowth',   nature: 'Modest',  ability: 'Chlorophyll',  item: 'Choice Specs', moves: ['Solar Beam', 'Ancient Power', 'Sludge Bomb', 'Focus Blast'] },
                    { name: 'torkoal',     nature: 'Bold',    ability: 'Drought',      item: 'Leftovers',    moves: ['Shell Smash', 'Fire Blast', 'Earth Power', 'Yawn'] },
                    { name: 'volcarona',   nature: 'Modest',  ability: 'Flame Body',   item: 'Life Orb',     moves: ['Fire Blast', 'Giga Drain', 'Bug Buzz', 'Roost'] },
                    { name: 'infernape',   nature: 'Naive',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Close Combat', 'Grass Knot', 'Fire Blast', 'Earthquake'] },
                ]
            },
            hard: {
                pokemon: [
                    { name: 'groudon',     nature: 'Adamant', ability: 'Drought',      item: 'Choice Band',  moves: ['Earthquake', 'Stone Edge', 'Fire Blast', 'Dragon Tail'] },
                    { name: 'garchomp',    nature: 'Adamant', ability: 'Sand Force',   item: 'Garchompite',  moves: ['Earthquake', 'Outrage', 'Fire Blast', 'Stone Edge'] },
                    { name: 'tangrowth',   nature: 'Modest',  ability: 'Chlorophyll',  item: 'Choice Specs', moves: ['Solar Beam', 'Ancient Power', 'Sludge Bomb', 'Focus Blast'] },
                    { name: 'torkoal',     nature: 'Bold',    ability: 'Drought',      item: 'Leftovers',    moves: ['Shell Smash', 'Fire Blast', 'Earth Power', 'Yawn'] },
                    { name: 'volcarona',   nature: 'Modest',  ability: 'Flame Body',   item: 'Choice Specs', moves: ['Fire Blast', 'Giga Drain', 'Bug Buzz', 'Roost'] },
                    { name: 'infernape',   nature: 'Naive',   ability: 'Blaze',        item: 'Life Orb',     moves: ['Close Combat', 'Grass Knot', 'Fire Blast', 'Earthquake'] },
                ]
            }
        }
    },


    // ══════════════════════════════════════════════════════════════════════════
    // OTHER
    // ══════════════════════════════════════════════════════════════════════════

    {
        id: 'nikola',
        name: 'Nikola',
        title: '',
        region: 'Sinnoh',
        location: '',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'mewtwo',      nature: 'Timid',   ability: 'Pressure',     item: 'Life Orb',     moves: ['Psystrike', 'Aura Sphere', 'Fire Blast', 'Ice Beam'] },
                    { name: 'rayquaza',    nature: 'Adamant', ability: 'Air Lock',     item: 'Lum Berry',    moves: ['Dragon Dance', 'Outrage', 'Extreme Speed', 'Earthquake'] },
                    { name: 'kyogre',      nature: 'Modest',  ability: 'Drizzle',      item: 'Choice Specs', moves: ['Water Spout', 'Thunder', 'Ice Beam', 'Hydro Pump'] },
                    { name: 'arceus',      nature: 'Adamant', ability: 'Multitype',    item: 'Silk Scarf',   moves: ['Swords Dance', 'Extreme Speed', 'Shadow Claw', 'Brick Break'] },
                    { name: 'deoxys',      nature: 'Hasty',   ability: 'Pressure',     item: 'Life Orb',     moves: ['Psycho Boost', 'Superpower', 'Ice Beam', 'Knock Off'] },
                    { name: 'groudon',     nature: 'Naughty', ability: 'Drought',      item: 'Leftovers',    moves: ['Earthquake', 'Stone Edge', 'Fire Blast', 'Dragon Tail'] },
                ]
            }
        }
    },
    {
        id: 'kagawa',
        name: 'Kagawa',
        title: '',
        region: 'Sinnoh',
        location: '',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'snorlax',     nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'regigigas',   nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'chesnaught',  nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'porygon-z',   nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'gallade',     nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'noivern',     nature: '',        ability: '',             item: '',             moves: [] },
                ]
            }
        }
    },
    {
        id: 'officer-wargreymon',
        name: 'Officer Wargreymon',
        title: '',
        region: 'Sinnoh',
        location: '',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'luxray',      nature: 'Random',  ability: 'Random',       item: '',             moves: ['Wild Charge', 'Crunch', 'Superpower', 'Howl'] },
                    { name: 'lucario',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Bulk Up', 'Extreme Speed', 'Bullet Punch', 'Vacuum Wave'] },
                    { name: 'altaria',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Flamethrower', 'Dragon Claw', 'Dragon Dance', 'Earthquake'] },
                    { name: 'aggron',      nature: 'Random',  ability: 'Random',       item: '',             moves: ['Autotomize', 'Heavy Slam', 'Double-Edge', 'Metal Burst'] },
                    { name: 'ninetales',   nature: 'Random',  ability: 'Random',       item: '',             moves: ['Flamethrower', 'Energy Ball', 'Dark Pulse', 'Nasty Plot'] },
                    { name: 'sceptile',    nature: 'Random',  ability: 'Random',       item: '',             moves: ['Giga Drain', 'Dragon Pulse', 'Detect', 'Safeguard'] },
                ]
            }
        }
    },
    {
        id: 'ravine',
        name: 'Ravine',
        title: '',
        region: 'Sinnoh',
        location: '',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'palkia',      nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'lucario',     nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'goodra',      nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'togekiss',    nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'doublade',    nature: '',        ability: '',             item: '',             moves: [] },
                    { name: 'honchkrow',   nature: '',        ability: '',             item: '',             moves: [] },
                ]
            }
        }
    },
    {
        id: 'youngster-joey',
        name: 'Youngster Joey',
        title: '',
        region: 'Sinnoh',
        location: '',
        difficulties: {
            medium: {
                pokemon: [
                    { name: 'rattata',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Sucker Punch', 'Thunder Wave', 'Taunt', 'Double-Edge'] },
                    { name: 'rattata',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Thunderbolt', 'Ice Beam', 'Thunder Wave', 'Shadow Ball'] },
                    { name: 'rattata',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Endeavor', 'Sucker Punch', 'Quick Attack', 'Swagger'] },
                    { name: 'rattata',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Blizzard', 'Grass Knot', 'Thunder', 'Rain Dance'] },
                    { name: 'rattata',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Pluck', 'Shadow Ball', 'Charge Beam', 'Work Up'] },
                    { name: 'rattata',     nature: 'Random',  ability: 'Random',       item: '',             moves: ['Zen Headbutt', 'Body Slam', 'Assurance', 'Revenge'] },
                ]
            }
        }
    },

];
