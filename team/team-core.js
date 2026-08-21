
// --- team-core.js : Team State & Memory Management ---

const TEAM_KEY = 'pokedex_my_team_v1';
const MULTI_TEAM_KEY = 'pokedex_multiteam_v1';
const BATTLE_CONTEXT_KEY = 'tb_battle_context_v1';
const DATA_OVERRIDE_KEY = 'tb_data_overrides_v1';
const TEAM_SIZE = 50;
const TEAM_STATS = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD'];
const TEAM_NATURES = ['Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty', 'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax', 'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash', 'Calm', 'Gentle', 'Sassy', 'Careful', 'Quirky'];
const HELD_ITEMS = ['Leftovers', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Life Orb', 'Focus Sash', 'Assault Vest', 'Heavy-Duty Boots', 'Eviolite', 'Rocky Helmet', 'Black Sludge', 'Sitrus Berry', 'Lum Berry', 'Weakness Policy', 'Expert Belt', 'Air Balloon', 'Throat Spray', 'Loaded Dice', 'Covert Cloak', 'Clear Amulet', 'Booster Energy', 'Terrain Extender', 'Light Clay', 'Damp Rock', 'Heat Rock', 'Icy Rock', 'Smooth Rock', 'Safety Goggles', 'Power Herb', 'Mental Herb', 'White Herb', 'Red Card', 'Eject Button', 'Eject Pack', 'Mirror Herb', 'Punching Glove', 'Muscle Band', 'Wise Glasses', 'Shell Bell', 'Metronome', 'Flame Orb', 'Toxic Orb', 'Exp. Share', 'Lucky Egg', 'Soothe Bell', 'Amulet Coin', 'Light Ball'];
const TEAM_NATURE_EFFECTS = { Lonely: ['ATK', 'DEF'], Brave: ['ATK', 'SPD'], Adamant: ['ATK', 'SPATK'], Naughty: ['ATK', 'SPDEF'], Bold: ['DEF', 'ATK'], Relaxed: ['DEF', 'SPD'], Impish: ['DEF', 'SPATK'], Lax: ['DEF', 'SPDEF'], Timid: ['SPD', 'ATK'], Hasty: ['SPD', 'DEF'], Jolly: ['SPD', 'SPATK'], Naive: ['SPD', 'SPDEF'], Modest: ['SPATK', 'ATK'], Mild: ['SPATK', 'DEF'], Quiet: ['SPATK', 'SPD'], Rash: ['SPATK', 'SPDEF'], Calm: ['SPDEF', 'ATK'], Gentle: ['SPDEF', 'DEF'], Sassy: ['SPDEF', 'SPD'], Careful: ['SPDEF', 'SPATK'] };
const DEFAULT_HELD_ITEMS = [...HELD_ITEMS];
const DEFAULT_BATTLE_CONTEXT = {
    weather: 'none',
    terrain: 'none',
    doubles: false,
    trickRoom: false,
    reflect: false,
    lightScreen: false,
    tailwindOnMe: false,
    tailwindOnOpponent: false,
    burnOnAttacker: false,
    paralysisOnMe: false,
    hazardsOnOpponent: { stealthRock: false, spikes: 0 },
    hazardsOnMe: { stealthRock: false, spikes: 0, stickyWeb: false }
};

// Structure of an empty Slot (Now includes Level!)
const EMPTY_SLOT = () => ({ pokemonId: null, level: 100, nature: '', ability: '', item: '', teraType: '', calc: false, moveNames: ['', '', '', ''], moves: ['', '', '', ''], moveCats: ['', '', '', ''], iv: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' }, ev: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' } });

// Normalize slot data (in case fields are missing from old saves)
function normalizeSlot(slot) { 
    const base = EMPTY_SLOT(); 
    if (!slot || typeof slot !== 'object') return base; 
    base.pokemonId = slot.pokemonId ? Number(slot.pokemonId) : null; 
    base.level = slot.level !== undefined ? Number(slot.level) : 100; 
    base.nature = slot.nature ? String(slot.nature) : ''; 
    base.ability = slot.ability ? String(slot.ability) : ''; 
    base.item = slot.item ? String(slot.item) : ''; 
    base.teraType = slot.teraType ? String(slot.teraType) : '';
    base.calc = !!slot.calc; 
    base.moveNames = Array.from({ length: 4 }, (_, i) => slot.moveNames && slot.moveNames[i] ? String(slot.moveNames[i]) : ''); 
    base.moves = Array.from({ length: 4 }, (_, i) => slot.moves && slot.moves[i] ? String(slot.moves[i]) : ''); 
    base.moveCats = Array.from({ length: 4 }, (_, i) => slot.moveCats && slot.moveCats[i] ? String(slot.moveCats[i]) : ''); 
    TEAM_STATS.forEach(st => { base.iv[st] = slot.iv && slot.iv[st] !== undefined ? String(slot.iv[st]) : ''; base.ev[st] = slot.ev && slot.ev[st] !== undefined ? String(slot.ev[st]) : '' }); 
    return base; 
}

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

let DEFAULT_MOVE_INFO = null;
let DEFAULT_MOVES_BY_POKEMON = null;
let DEFAULT_ABILITIES = null;

function mutateObject(target, source) {
    if (!target) return;
    Object.keys(target).forEach(k => delete target[k]);
    Object.assign(target, deepClone(source || {}));
}

function normalizeBattleContext(raw) {
    const ctx = Object.assign({}, DEFAULT_BATTLE_CONTEXT, raw || {});
    ctx.hazardsOnOpponent = Object.assign({}, DEFAULT_BATTLE_CONTEXT.hazardsOnOpponent, raw && raw.hazardsOnOpponent ? raw.hazardsOnOpponent : {});
    ctx.hazardsOnMe = Object.assign({}, DEFAULT_BATTLE_CONTEXT.hazardsOnMe, raw && raw.hazardsOnMe ? raw.hazardsOnMe : {});
    ctx.hazardsOnOpponent.spikes = Math.max(0, Math.min(3, Number(ctx.hazardsOnOpponent.spikes) || 0));
    ctx.hazardsOnMe.spikes = Math.max(0, Math.min(3, Number(ctx.hazardsOnMe.spikes) || 0));
    ctx.weather = String(ctx.weather || 'none');
    ctx.terrain = String(ctx.terrain || 'none');
    ctx.doubles = !!ctx.doubles;
    ctx.trickRoom = !!ctx.trickRoom;
    ctx.reflect = !!ctx.reflect;
    ctx.lightScreen = !!ctx.lightScreen;
    ctx.hazardsOnOpponent.stealthRock = !!ctx.hazardsOnOpponent.stealthRock;
    ctx.hazardsOnMe.stealthRock = !!ctx.hazardsOnMe.stealthRock;
    ctx.hazardsOnMe.stickyWeb = !!ctx.hazardsOnMe.stickyWeb;
    return ctx;
}

function loadBattleContext() {
    try {
        return normalizeBattleContext(JSON.parse(localStorage.getItem(BATTLE_CONTEXT_KEY) || 'null'));
    } catch (e) {
        return normalizeBattleContext();
    }
}

function saveBattleContext() {
    localStorage.setItem(BATTLE_CONTEXT_KEY, JSON.stringify(window.battleContext));
}

function loadDataOverrides() {
    try {
        return JSON.parse(localStorage.getItem(DATA_OVERRIDE_KEY) || 'null') || {};
    } catch (e) {
        return {};
    }
}

function applyDataOverrides(overrides) {
    overrides = overrides || {};
    if (DEFAULT_MOVE_INFO === null && typeof MOVE_INFO !== 'undefined') DEFAULT_MOVE_INFO = deepClone(MOVE_INFO);
    if (DEFAULT_MOVES_BY_POKEMON === null && typeof MOVES_BY_POKEMON !== 'undefined') DEFAULT_MOVES_BY_POKEMON = deepClone(MOVES_BY_POKEMON);
    if (DEFAULT_ABILITIES === null && typeof ABILITIES !== 'undefined') DEFAULT_ABILITIES = deepClone(ABILITIES);
    HELD_ITEMS.splice(0, HELD_ITEMS.length, ...DEFAULT_HELD_ITEMS);
    mutateObject(typeof MOVE_INFO !== 'undefined' ? MOVE_INFO : null, DEFAULT_MOVE_INFO || {});
    mutateObject(typeof MOVES_BY_POKEMON !== 'undefined' ? MOVES_BY_POKEMON : null, DEFAULT_MOVES_BY_POKEMON || {});
    mutateObject(typeof ABILITIES !== 'undefined' ? ABILITIES : null, DEFAULT_ABILITIES || {});

    if (Array.isArray(overrides.heldItems) && overrides.heldItems.length) {
        const cleanItems = [...new Set(overrides.heldItems.map(x => String(x).trim()).filter(Boolean))];
        HELD_ITEMS.splice(0, HELD_ITEMS.length, ...cleanItems);
    }
    if (typeof MOVE_INFO !== 'undefined' && overrides.moveInfo && typeof overrides.moveInfo === 'object') {
        Object.assign(MOVE_INFO, deepClone(overrides.moveInfo));
    }
    if (typeof MOVES_BY_POKEMON !== 'undefined' && overrides.movesByPokemon && typeof overrides.movesByPokemon === 'object') {
        Object.assign(MOVES_BY_POKEMON, deepClone(overrides.movesByPokemon));
    }
    if (typeof ABILITIES !== 'undefined' && overrides.abilities && typeof overrides.abilities === 'object') {
        Object.assign(ABILITIES, deepClone(overrides.abilities));
    }

    window.currentDataOverrides = {
        heldItems: Array.isArray(overrides.heldItems) ? [...overrides.heldItems] : null,
        moveInfo: overrides.moveInfo && typeof overrides.moveInfo === 'object' ? deepClone(overrides.moveInfo) : {},
        movesByPokemon: overrides.movesByPokemon && typeof overrides.movesByPokemon === 'object' ? deepClone(overrides.movesByPokemon) : {},
        abilities: overrides.abilities && typeof overrides.abilities === 'object' ? deepClone(overrides.abilities) : {},
        sourceUrl: overrides.sourceUrl ? String(overrides.sourceUrl) : ''
    };
}

window.battleContext = loadBattleContext();
window.currentDataOverrides = {};
applyDataOverrides(loadDataOverrides());

window.updateBattleContext = function(path, value) {
    const next = deepClone(window.battleContext || DEFAULT_BATTLE_CONTEXT);
    const parts = String(path).split('.');
    let cur = next;
    while (parts.length > 1) {
        const key = parts.shift();
        if (!cur[key] || typeof cur[key] !== 'object') cur[key] = {};
        cur = cur[key];
    }
    cur[parts[0]] = value;
    window.battleContext = normalizeBattleContext(next);
    saveBattleContext();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.resetBattleContext = function() {
    window.battleContext = normalizeBattleContext();
    saveBattleContext();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.getDataOverridesBundle = function() {
    let metaThreats = null;
    try { metaThreats = JSON.parse(localStorage.getItem('tb_customMeta') || 'null'); } catch (e) {}
    return {
        exportedAt: new Date().toISOString(),
        sourceUrl: window.currentDataOverrides.sourceUrl || '',
        metaThreats,
        heldItems: [...HELD_ITEMS],
        moveInfo: deepClone(window.currentDataOverrides.moveInfo || {}),
        movesByPokemon: deepClone(window.currentDataOverrides.movesByPokemon || {}),
        abilities: deepClone(window.currentDataOverrides.abilities || {})
    };
};

window.applyDataOverridesBundle = function(bundle, sourceUrl) {
    if (!bundle || typeof bundle !== 'object') throw new Error('Invalid bundle');
    const next = {
        heldItems: Array.isArray(bundle.heldItems) ? bundle.heldItems : [...HELD_ITEMS],
        moveInfo: bundle.moveInfo && typeof bundle.moveInfo === 'object' ? bundle.moveInfo : {},
        movesByPokemon: bundle.movesByPokemon && typeof bundle.movesByPokemon === 'object' ? bundle.movesByPokemon : {},
        abilities: bundle.abilities && typeof bundle.abilities === 'object' ? bundle.abilities : {},
        sourceUrl: sourceUrl || bundle.sourceUrl || ''
    };
    localStorage.setItem(DATA_OVERRIDE_KEY, JSON.stringify(next));
    applyDataOverrides(next);

    if (Array.isArray(bundle.metaThreats) && bundle.metaThreats.length) {
        localStorage.setItem('tb_customMeta', JSON.stringify(bundle.metaThreats));
        localStorage.setItem('tb_metaFormat', 'custom');
        window.metaThreatFormat = 'custom';
    }
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.resetDataOverridesBundle = function() {
    localStorage.removeItem(DATA_OVERRIDE_KEY);
    applyDataOverrides({});
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

// --- Global State Variables ---
let allData, teamQuery = '';
let currentTeamIndex, team;

// Load data from LocalStorage
function loadAllTeams() {
    try {
        const raw = JSON.parse(localStorage.getItem(MULTI_TEAM_KEY));
        if (raw && raw.teams && raw.teams.length > 0) return raw;
    } catch (e) {}
    
    let oldTeam = Array.from({ length: TEAM_SIZE }, () => EMPTY_SLOT());
    try {
        const oldRaw = JSON.parse(localStorage.getItem(TEAM_KEY));
        if (Array.isArray(oldRaw)) oldTeam = Array.from({ length: TEAM_SIZE }, (_, i) => normalizeSlot(oldRaw[i]));
    } catch (e) {}
    
    return { activeIndex: 0, teams: [{ name: 'Main Team', slots: oldTeam }] };
}

// Initialize State
function initTeamState() {
    allData = loadAllTeams();
    currentTeamIndex = allData.activeIndex;
    team = allData.teams[currentTeamIndex].slots;
}

// Save to LocalStorage
function saveTeam() {
    allData.teams[currentTeamIndex].slots = team;
    allData.activeIndex = currentTeamIndex;
    localStorage.setItem(MULTI_TEAM_KEY, JSON.stringify(allData));
}

initTeamState();
