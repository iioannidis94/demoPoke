// --- team-analytics.js : Archetype Recognition, Speed Control, Meta Threats, Damage Calc ---

// ==========================================
// 1. ARCHETYPE RECOGNITION
// ==========================================

const WEATHER_SETTERS = {
    'drizzle':      { name: 'Rain Team 🌧️',   color: '#4dabf7', desc: 'Recommend Swift Swim attackers & Water / Thunder coverage.' },
    'drought':      { name: 'Sun Team ☀️',     color: '#ff6b35', desc: 'Recommend Chlorophyll sweepers & Fire / Solar Beam coverage.' },
    'sand-stream':  { name: 'Sand Team 🌪️',   color: '#d4a76a', desc: 'Prefer Rock / Ground / Steel types — immune to Sand chip damage.' },
    'snow-warning': { name: 'Snow Team ❄️',    color: '#74c0fc', desc: 'Recommend Slush Rush users or Blizzard spam under Snow.' },
};

function detectArchetype(selected) {
    if (!selected || !selected.length) return null;

    // Weather setters (ability-based)
    for (const mon of selected) {
        if (!mon.slot.ability) continue;
        const key = mon.slot.ability.toLowerCase().replace(/\s+/g, '-');
        if (WEATHER_SETTERS[key]) {
            return { ...WEATHER_SETTERS[key], setter: mon.p.name };
        }
    }

    // Trick Room (move-based)
    for (const mon of selected) {
        if (!mon.slot.moveNames) continue;
        if (mon.slot.moveNames.some(m => m && m.toLowerCase().replace(/\s+/g, '-') === 'trick-room')) {
            return {
                name: 'Trick Room 🔄', color: '#cc5de8',
                desc: 'Recommend slow, high-Attack Pokémon that outspeed everything under reversed Speed order.',
                setter: mon.p.name
            };
        }
    }

    // Tailwind (move-based)
    for (const mon of selected) {
        if (!mon.slot.moveNames) continue;
        if (mon.slot.moveNames.some(m => m && m.toLowerCase().replace(/\s+/g, '-') === 'tailwind')) {
            return {
                name: 'Tailwind Team 💨', color: '#63d471',
                desc: 'Team has Speed control via Tailwind — consider pairing fast sweepers.',
                setter: mon.p.name
            };
        }
    }

    return null;
}

// ==========================================
// 2. SPEED CONTROL WARNING
// ==========================================

function getSpeedControlAnalysis(selected) {
    if (!selected || !selected.length) return null;

    const speedData = selected.map(x => {
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[x.p.id]) || { spe: 70 };
        return { name: x.p.name, spe: Number(bs.spe) || 70 };
    });

    const avgSpeed = Math.round(speedData.reduce((s, x) => s + x.spe, 0) / speedData.length);
    const slowMons  = speedData.filter(x => x.spe < 60);
    const fastMons  = speedData.filter(x => x.spe >= 100);

    const hasTailwind   = selected.some(x => x.slot.moveNames && x.slot.moveNames.some(m => m && m.toLowerCase().replace(/\s+/g, '-') === 'tailwind'));
    const hasTrickRoom  = selected.some(x => x.slot.moveNames && x.slot.moveNames.some(m => m && m.toLowerCase().replace(/\s+/g, '-') === 'trick-room'));
    const hasIcyWind    = selected.some(x => x.slot.moveNames && x.slot.moveNames.some(m => m && m.toLowerCase().replace(/\s+/g, '-') === 'icy-wind'));
    const hasSpeedControl = hasTailwind || hasTrickRoom || hasIcyWind;

    return {
        avgSpeed,
        slowMons,
        fastMons,
        hasSpeedControl,
        hasTailwind,
        hasTrickRoom,
        needsWarning: !hasSpeedControl && avgSpeed < 80 && slowMons.length >= 2
    };
}

// ==========================================
// 3. META THREAT INTEGRATION (VGC 2024 Reg G / PRO PvP Top 10)
// ==========================================

const META_THREATS = [
    { id: 987,  name: 'Flutter Mane',    types: ['ghost',    'fairy']    },
    { id: 992,  name: 'Iron Hands',      types: ['fighting', 'electric'] },
    { id: 892,  name: 'Urshifu',         types: ['fighting', 'dark']     },
    { id: 1017, name: 'Ogerpon',         types: ['grass']                },
    { id: 1021, name: 'Raging Bolt',     types: ['electric', 'dragon']   },
    { id: 727,  name: 'Incineroar',      types: ['fire',     'dark']     },
    { id: 812,  name: 'Rillaboom',       types: ['grass']                },
    { id: 591,  name: 'Amoonguss',       types: ['grass',    'poison']   },
    { id: 898,  name: 'Calyrex-Shadow',  types: ['psychic',  'ghost']    },
    { id: 279,  name: 'Pelipper',        types: ['water',    'flying']   },
];

// VGC 2025 Regulation H (Restricted Legends)
const META_THREATS_VGC_H = [
    // Tier 1 — Top Restricted
    { id: 1008, name: 'Miraidon',       types: ['electric', 'dragon'], tier: 1 },
    { id: 1007, name: 'Koraidon',       types: ['fighting', 'dragon'], tier: 1 },
    { id: 987,  name: 'Flutter Mane',   types: ['ghost',    'fairy'],  tier: 1 },
    { id: 992,  name: 'Iron Hands',     types: ['fighting', 'electric'],tier:1 },
    // Tier 2 — Core Picks
    { id: 1024, name: 'Terapagos',      types: ['normal'],             tier: 2 },
    { id: 892,  name: 'Urshifu',        types: ['fighting', 'dark'],   tier: 2 },
    { id: 1017, name: 'Ogerpon',        types: ['grass'],              tier: 2 },
    { id: 727,  name: 'Incineroar',     types: ['fire',     'dark'],   tier: 2 },
    // Tier 3 — Support
    { id: 812,  name: 'Rillaboom',      types: ['grass'],              tier: 3 },
    { id: 591,  name: 'Amoonguss',      types: ['grass',    'poison'], tier: 3 },
    { id: 279,  name: 'Pelipper',       types: ['water',    'flying'], tier: 3 },
    { id: 898,  name: 'Calyrex-Shadow', types: ['psychic',  'ghost'],  tier: 3 },
];

// PRO PvP Meta — Pokemon Revolution Online (Gen 7 USUM mechanics) — 18 threats in 3 tiers
const META_THREATS_PRO = [
    // Tier 1 — Sweepers (heavy offensive threats)
    { id: 497,  name: 'Serperior',   types: ['grass'],              tier: 1 },
    { id: 445,  name: 'Garchomp',    types: ['dragon',  'ground'],  tier: 1 },
    { id: 461,  name: 'Weavile',     types: ['dark',    'ice'],     tier: 1 },
    { id: 392,  name: 'Infernape',   types: ['fire',    'fighting'],tier: 1 },
    { id: 149,  name: 'Dragonite',   types: ['dragon',  'flying'],  tier: 1 },
    { id: 308,  name: 'Medicham',    types: ['fighting','psychic'], tier: 1 },
    // Tier 2 — Pivots (bulky attackers & utility)
    { id: 376,  name: 'Metagross',   types: ['steel',   'psychic'], tier: 2 },
    { id: 130,  name: 'Gyarados',    types: ['water',   'flying'],  tier: 2 },
    { id: 468,  name: 'Togekiss',    types: ['fairy',   'flying'],  tier: 2 },
    { id: 385,  name: 'Jirachi',     types: ['steel',   'psychic'], tier: 2 },
    { id: 212,  name: 'Scizor',      types: ['bug',     'steel'],   tier: 2 },
    { id: 36,   name: 'Clefable',    types: ['fairy'],              tier: 2 },
    // Tier 3 — Walls (defensive / support anchors)
    { id: 598,  name: 'Ferrothorn',  types: ['grass',   'steel'],   tier: 3 },
    { id: 748,  name: 'Toxapex',     types: ['poison',  'water'],   tier: 3 },
    { id: 801,  name: 'Magearna',    types: ['steel',   'fairy'],   tier: 3 },
    { id: 645,  name: 'Landorus-T',  types: ['ground',  'flying'],  tier: 3 },
    { id: 248,  name: 'Tyranitar',   types: ['rock',    'dark'],    tier: 3 },
    { id: 80,   name: 'Slowbro',     types: ['water',   'psychic'], tier: 3 },
];

// Persist chosen format across page reloads
function _loadCustomMeta() {
    try { return JSON.parse(localStorage.getItem('tb_customMeta') || 'null'); } catch(e) { return null; }
}
window._saveCustomMeta = function(threats) {
    localStorage.setItem('tb_customMeta', JSON.stringify(threats));
};

const META_FORMAT_REGISTRY = {
    'pro':    { label: 'PRO PvP',        threats: META_THREATS_PRO,   tiers: [{ tier:1, label:'⚔️ Sweepers' },{ tier:2, label:'🔄 Pivots' },{ tier:3, label:'🛡️ Walls' }] },
    'vgc-g':  { label: 'VGC 2024 Reg G', threats: META_THREATS,       tiers: null },
    'vgc-h':  { label: 'VGC 2025 Reg H', threats: META_THREATS_VGC_H, tiers: [{ tier:1, label:'⚔️ Restricted' },{ tier:2, label:'🔄 Core' },{ tier:3, label:'🛡️ Support' }] },
    'custom': { label: '⚙️ Custom',       threats: null,               tiers: null },
};

function getActiveThreats() {
    if (window.metaThreatFormat === 'custom') {
        const c = _loadCustomMeta();
        return (c && c.length) ? c : META_THREATS_PRO;
    }
    const fmt = META_FORMAT_REGISTRY[window.metaThreatFormat];
    return (fmt && fmt.threats) ? fmt.threats : META_THREATS_PRO;
}

window.metaThreatFormat = localStorage.getItem('tb_metaFormat') || 'pro';
window.setMetaFormat = function(fmt) {
    window.metaThreatFormat = fmt;
    localStorage.setItem('tb_metaFormat', fmt);
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

// Meta-data refresh workflow — edit the custom threat list
window.openMetaEditorModal = function() {
    const activeThreats = getActiveThreats();
    let customThreats = _loadCustomMeta() || JSON.parse(JSON.stringify(activeThreats));

    let existing = document.getElementById('metaEditorModal');
    if (existing) existing.remove();

    const renderThreatList = () => {
        const el = document.getElementById('metaEditorList');
        if (!el) return;
        el.innerHTML = customThreats.map((t, i) => `
            <div style="display:flex; align-items:center; gap:8px; padding:6px; border:1px solid var(--brd); border-radius:6px; background:var(--bg);">
                <span style="flex:1; font-size:13px; font-weight:bold; text-transform:capitalize;">${t.name.replace(/-/g,' ')}</span>
                <span style="font-size:11px; color:var(--dim);">${t.types.join(' / ')}</span>
                <button onclick="window._removeCustomThreat(${i})" style="background:#ff4d4f; color:white; border:none; border-radius:4px; padding:2px 8px; cursor:pointer; font-size:11px;">✕</button>
            </div>`).join('') || '<div style="color:var(--dim); font-size:12px; text-align:center; padding:10px;">No threats. Add Pokémon below.</div>';
    };

    window._removeCustomThreat = function(i) { customThreats.splice(i, 1); renderThreatList(); };
    window._addCustomThreat = function() {
        const input = document.getElementById('metaEditorInput').value.trim();
        if (!input) return;
        const q = input.toLowerCase().replace(/\s+/g, '-');
        const p = typeof POKE !== 'undefined' ? POKE.find(x => x.name.toLowerCase() === q || x.name.toLowerCase().replace(/-/g,' ') === input.toLowerCase() || String(x.id) === input) : null;
        if (!p) { alert('Pokémon not found! Try English name or ID.'); return; }
        if (customThreats.find(t => t.id === p.id)) { alert('Already in list!'); return; }
        const tier = customThreats.length < 4 ? 1 : customThreats.length < 8 ? 2 : 3;
        customThreats.push({ id: p.id, name: p.name, types: p.types, tier });
        document.getElementById('metaEditorInput').value = '';
        renderThreatList();
    };
    window._saveCustomMetaAndClose = function() {
        window._saveCustomMeta(customThreats);
        window.metaThreatFormat = 'custom';
        localStorage.setItem('tb_metaFormat', 'custom');
        document.getElementById('metaEditorModal').remove();
        if (typeof renderTeamSlots === 'function') renderTeamSlots();
    };

    const modal = document.createElement('div');
    modal.id = 'metaEditorModal';
    modal.style.cssText = 'position:fixed; inset:0; z-index:10001; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; padding:20px;';
    modal.innerHTML = `
        <div style="background:var(--bg); border:2px solid #f5a623; border-radius:12px; max-width:480px; width:100%; max-height:80vh; overflow-y:auto; padding:24px; position:relative;">
            <button onclick="document.getElementById('metaEditorModal').remove()" style="position:absolute; top:12px; right:12px; background:#ff4d4f; color:white; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-weight:bold;">✕</button>
            <h3 style="color:#f5a623; margin:0 0 6px; font-size:16px;">⚙️ Edit Custom Meta Threats</h3>
            <p style="font-size:12px; color:var(--dim); margin:0 0 14px;">Build your own threat list. Click Save to switch to Custom format.</p>
            <div id="metaEditorList" style="display:flex; flex-direction:column; gap:6px; margin-bottom:14px;"></div>
            <div style="display:flex; gap:8px; margin-bottom:14px;">
                <input id="metaEditorInput" placeholder="Pokémon name or ID..." style="flex:1; padding:8px; border-radius:6px; border:1px solid var(--brd); background:var(--bg); color:var(--txt); font-size:13px;">
                <button onclick="window._addCustomThreat()" style="padding:8px 14px; background:#4dabf7; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Add</button>
            </div>
            <button onclick="window._saveCustomMetaAndClose()" style="width:100%; padding:10px; background:#f5a623; color:black; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">💾 Save as Custom Format</button>
        </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    renderThreatList();
};

function getMetaThreatAnalysis(selected, threats) {
    if (!selected || !selected.length) return null;
    threats = threats || META_THREATS;

    const results = threats.map(threat => {
        let bestMult   = 0;
        let bestSource = null;

        selected.forEach(mon => {
            const teraType = mon.slot && mon.slot.teraType ? String(mon.slot.teraType).toLowerCase() : '';
            // Check STAB types
            mon.p.types.forEach(atkType => {
                const mult = multAtkVsTypes(atkType, threat.types);
                if (mult > bestMult) { bestMult = mult; bestSource = mon.p.name; }
            });
            if (teraType) {
                const mult = multAtkVsTypes(teraType, threat.types);
                if (mult > bestMult) { bestMult = mult; bestSource = `${mon.p.name} (Tera)`; }
            }

            // Check equipped moves
            (mon.slot.moves || []).forEach((moveType, i) => {
                if (!moveType || (mon.slot.moveCats || [])[i] === 'status') return;
                const mult = multAtkVsTypes(moveType, threat.types);
                if (mult > bestMult) { bestMult = mult; bestSource = mon.p.name; }
            });
        });

        return { ...threat, coverage: bestMult, source: bestSource };
    });

    const covered = results.filter(r => r.coverage >= 2).length;
    const score   = Math.round((covered / threats.length) * 100);

    return { results, covered, total: threats.length, score };
}

function getNatureMultiplier(nature, statName) {
    if (!nature) return 1;
    const n = String(nature).toLowerCase();
    const buffs = { adamant: 'ATK', brave: 'ATK', lonely: 'ATK', naughty: 'ATK', bold: 'DEF', impish: 'DEF', lax: 'DEF', relaxed: 'DEF', modest: 'SPATK', mild: 'SPATK', quiet: 'SPATK', rash: 'SPATK', calm: 'SPDEF', gentle: 'SPDEF', sassy: 'SPDEF', careful: 'SPDEF', timid: 'SPD', jolly: 'SPD', hasty: 'SPD', naive: 'SPD' };
    const nerfs = { adamant: 'SPATK', brave: 'SPD', lonely: 'DEF', naughty: 'SPDEF', bold: 'ATK', impish: 'SPATK', lax: 'SPDEF', relaxed: 'SPD', modest: 'ATK', mild: 'DEF', quiet: 'SPD', rash: 'SPDEF', calm: 'ATK', gentle: 'DEF', sassy: 'SPD', careful: 'SPATK', timid: 'ATK', jolly: 'SPATK', hasty: 'DEF', naive: 'SPDEF' };
    if (buffs[n] === statName) return 1.1;
    if (nerfs[n] === statName) return 0.9;
    return 1;
}

function getEffectiveSpeedStat(baseSpeed, slot, options) {
    options = options || {};
    const iv = slot?.iv?.SPD === '' || slot?.iv?.SPD === undefined ? 31 : Number(slot?.iv?.SPD) || 31;
    const ev = slot?.ev?.SPD === '' || slot?.ev?.SPD === undefined ? (options.defaultEv || 0) : Number(slot?.ev?.SPD) || 0;
    const lv = Number(slot?.level) || options.defaultLevel || 100;
    const raw = Math.floor(((2 * (Number(baseSpeed) || 70) + iv + Math.floor(ev / 4)) * lv) / 100) + 5;
    let stat = Math.floor(raw * getNatureMultiplier(slot?.nature, 'SPD'));
    const item = getSafeItemName(slot?.item);
    const ability = getSafeAbilityName(slot?.ability);
    const ctx = getBattleContext();
    if (ability === 'swift-swim' && ctx.weather === 'rain') stat = Math.floor(stat * 2);
    if (ability === 'chlorophyll' && ctx.weather === 'sun') stat = Math.floor(stat * 2);
    if (ability === 'sand-rush' && ctx.weather === 'sand') stat = Math.floor(stat * 2);
    if (ability === 'slush-rush' && ctx.weather === 'snow') stat = Math.floor(stat * 2);
    if (item === 'choice scarf') stat = Math.floor(stat * 1.5);
    const side = options && options.side;
    if (side === 'opponent') {
        if (ctx.tailwindOnOpponent) stat = Math.floor(stat * 2);
    } else {
        if (ctx.tailwindOnMe) stat = Math.floor(stat * 2);
        if (ctx.paralysisOnMe) stat = Math.floor(stat * 0.5);
    }
    return Math.floor(stat);
}

function getSpeedTierComparisonHTML(selected) {
    if (!selected || !selected.length) return '';
    const threats = (typeof getActiveThreats === 'function') ? getActiveThreats() : META_THREATS_PRO;
    const ctx = getBattleContext();

    const myRows = selected.map(mon => {
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[mon.p.id]) || { spe: 70 };
        const real = getEffectiveSpeedStat(Number(bs.spe) || 70, mon.slot, { side: 'me', types: mon.p.types, forDisplay: true });
        return { name: mon.p.name, speed: real };
    });

    const threatRows = threats.map(threat => {
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[threat.id]) || { spe: 70 };
        const speed = getEffectiveSpeedStat(Number(bs.spe) || 70, { level: 100, ev: { SPD: 252 } }, { defaultEv: 252, defaultLevel: 100, forDisplay: true });
        return { name: threat.name, speed };
    });

    const maxSpeed = Math.max(...myRows.map(r => r.speed), ...threatRows.map(r => r.speed), 1);
    const renderRow = (row, mine) => {
        const pct = Math.max(8, Math.round((row.speed / maxSpeed) * 100));
        const color = mine ? '#4dabf7' : '#ff6b6b';
        return `<div class="speedBar">
            <span style="color:${mine ? 'var(--txt)' : '#ffb3b3'}; font-weight:700; text-transform:capitalize; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${row.name.replace(/-/g, ' ')}</span>
            <div style="background:rgba(255,255,255,0.08); border-radius:999px; overflow:hidden; height:8px;"><div style="width:${pct}%; height:100%; background:${color};"></div></div>
            <span style="font-weight:900; color:${color}; text-align:right;">${row.speed}</span>
        </div>`;
    };

    return `<div style="margin:10px 0; padding:12px 14px; background:rgba(77,171,247,0.08); border:1px solid #4dabf7; border-radius:8px;">
        <strong style="color:#4dabf7; font-size:13px;">🏁 Speed Tier Comparison</strong>
        <div style="margin-top:8px; display:flex; flex-direction:column; gap:6px;">
            ${myRows.sort((a,b)=>ctx.trickRoom ? a.speed-b.speed : b.speed-a.speed).slice(0, 6).map(r => renderRow(r, true)).join('')}
            ${threatRows.sort((a,b)=>ctx.trickRoom ? a.speed-b.speed : b.speed-a.speed).slice(0, 5).map(r => renderRow(r, false)).join('')}
        </div>
        ${ctx.trickRoom ? `<p style="margin:8px 0 0; font-size:10px; color:#b197fc;">Trick Room is active, so slower Pokémon are shown first.</p>` : ''}
    </div>`;
}

// ==========================================
// 4. DAMAGE CALCULATION (Simplified Gen 9 formula)
// ==========================================

const OFFENSIVE_ITEM_MODS = {
    // Choice / power items
    'choice band':   { mult: 1.5, cat: 'physical' },
    'choice specs':  { mult: 1.5, cat: 'special' },
    'life orb':      { mult: 1.3 },
    'expert belt':   { mult: 1.2, onlySuperEffective: true },
    'muscle band':   { mult: 1.1, cat: 'physical' },
    'wise glasses':  { mult: 1.1, cat: 'special' },
    // Species-specific power items
    'light ball':    { mult: 2, species: 'pikachu' },
    'thick club':    { mult: 2, cat: 'physical', species: 'marowak' },
    // Type-boosting hold items (×1.2 for matching type)
    'charcoal':       { mult: 1.2, type: 'fire' },
    'mystic water':   { mult: 1.2, type: 'water' },
    'magnet':         { mult: 1.2, type: 'electric' },
    'miracle seed':   { mult: 1.2, type: 'grass' },
    'soft sand':      { mult: 1.2, type: 'ground' },
    'sharp beak':     { mult: 1.2, type: 'flying' },
    'black belt':     { mult: 1.2, type: 'fighting' },
    'poison barb':    { mult: 1.2, type: 'poison' },
    'never-melt ice': { mult: 1.2, type: 'ice' },
    'spell tag':      { mult: 1.2, type: 'ghost' },
    'twisted spoon':  { mult: 1.2, type: 'psychic' },
    'silk scarf':     { mult: 1.2, type: 'normal' },
    'hard stone':     { mult: 1.2, type: 'rock' },
    'silver powder':  { mult: 1.2, type: 'bug' },
    'dragon fang':    { mult: 1.2, type: 'dragon' },
    'black glasses':  { mult: 1.2, type: 'dark' },
    'metal coat':     { mult: 1.2, type: 'steel' },
    'fairy feather':  { mult: 1.2, type: 'fairy' },
    // Type-boosting Plates (same ×1.2 rate)
    'flame plate':    { mult: 1.2, type: 'fire' },
    'splash plate':   { mult: 1.2, type: 'water' },
    'zap plate':      { mult: 1.2, type: 'electric' },
    'meadow plate':   { mult: 1.2, type: 'grass' },
    'earth plate':    { mult: 1.2, type: 'ground' },
    'sky plate':      { mult: 1.2, type: 'flying' },
    'fist plate':     { mult: 1.2, type: 'fighting' },
    'toxic plate':    { mult: 1.2, type: 'poison' },
    'icicle plate':   { mult: 1.2, type: 'ice' },
    'spooky plate':   { mult: 1.2, type: 'ghost' },
    'mind plate':     { mult: 1.2, type: 'psychic' },
    'stone plate':    { mult: 1.2, type: 'rock' },
    'insect plate':   { mult: 1.2, type: 'bug' },
    'draco plate':    { mult: 1.2, type: 'dragon' },
    'dread plate':    { mult: 1.2, type: 'dark' },
    'iron plate':     { mult: 1.2, type: 'steel' },
    'pixie plate':    { mult: 1.2, type: 'fairy' },
    'blank plate':    { mult: 1.2, type: 'normal' },
};

const DEFENSIVE_ITEM_MODS = {
    'assault vest': { mult: 1.5, cat: 'special' },
    'eviolite':     { mult: 1.5 }
};

const OFFENSIVE_ABILITY_MODS = {
    'adaptability': { stab: 2 },
    'huge-power':   { mult: 2, cat: 'physical' },
    'pure-power':   { mult: 2, cat: 'physical' },
    'sheer-force':  { mult: 1.3 },
    'technician':   { mult: 1.5, powerAtMost: 60 },
    'transistor':   { mult: 1.3, type: 'electric' },
    'dragons-maw':  { mult: 1.5, type: 'dragon' },
    'water-bubble': { mult: 2, type: 'water' },
    'gorilla-tactics': { mult: 1.5, cat: 'physical' },
    'hustle':       { mult: 1.5, cat: 'physical' },
    'guts':         { mult: 1.5, cat: 'physical', requiresStatus: true },
    'solar-power':  { mult: 1.5, cat: 'special', weather: 'sun' },
    'defeatist':    { mult: 0.5 },  // halves ATK/SpA at ≤50% HP — applied as note only
};

const RECOVERY_ITEMS = new Set(['leftovers', 'black sludge', 'shell bell', 'sitrus berry']);
const WEATHER_BONUS_TYPES = {
    rain: { boost: 'water', weaken: 'fire' },
    sun:  { boost: 'fire', weaken: 'water' }
};
const TERRAIN_BONUS_TYPES = { electric: 'electric', grassy: 'grass', psychic: 'psychic' };

function getBattleContext() {
    return (typeof window !== 'undefined' && window.battleContext) ? window.battleContext : {
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
}

function getSafeAbilityName(ability) {
    return String(ability || '').toLowerCase().trim();
}

function getSafeItemName(item) {
    return String(item || '').toLowerCase().trim();
}

function applyAttackItemAndAbilityMods(baseDamage, atkMon, moveInfo, typeMult) {
    let damage = baseDamage;
    const item = getSafeItemName(atkMon?.slot?.item);
    const ability = getSafeAbilityName(atkMon?.slot?.ability);
    const cleanMoveType = String(moveInfo.type || '').toLowerCase();

    const itemMod = OFFENSIVE_ITEM_MODS[item];
    if (itemMod && (!itemMod.cat || itemMod.cat === moveInfo.cat) && (!itemMod.species || itemMod.species === String(atkMon.p.name || '').toLowerCase()) && (!itemMod.onlySuperEffective || typeMult > 1) && (!itemMod.type || itemMod.type === cleanMoveType)) {
        damage *= itemMod.mult;
    }

    const abilityMod = OFFENSIVE_ABILITY_MODS[ability];
    if (abilityMod && abilityMod.mult && (!abilityMod.cat || abilityMod.cat === moveInfo.cat) && (!abilityMod.type || abilityMod.type === cleanMoveType) && (!abilityMod.powerAtMost || Number(moveInfo.power) <= abilityMod.powerAtMost)) {
        const ctx = getBattleContext();
        const statusActive = !abilityMod.requiresStatus || ctx.burnOnAttacker || ctx.paralysisOnMe;
        const weatherOk   = !abilityMod.weather || ctx.weather === abilityMod.weather;
        if (statusActive && weatherOk) damage *= abilityMod.mult;
    }

    return damage;
}

function getStabMultiplier(atkMon, moveInfo) {
    const ability = getSafeAbilityName(atkMon?.slot?.ability);
    const baseStab = (atkMon?.p?.types || []).includes(moveInfo.type) ? 1.5 : 1;
    if (baseStab === 1) return 1;
    const abilityMod = OFFENSIVE_ABILITY_MODS[ability];
    return abilityMod && abilityMod.stab ? abilityMod.stab : baseStab;
}

// Resolve effective base power for variable-power moves.
// Returns { power, note } where power replaces moveInfo.power in the damage formula.
function resolveVariablePower(moveInfo, atkMon, defPoke, atkBs, defBs, battleContext) {
    const name = String(moveInfo.name || '').toLowerCase().replace(/\s+/g, '-');
    const basePower = Number(moveInfo.power) || 0;
    if (!basePower && name !== 'gyro-ball' && name !== 'grass-knot' && name !== 'low-kick') return { power: basePower, note: '' };

    // Gyro Ball: power = min(150, floor(25 × defSpeed / atkSpeed))
    if (name === 'gyro-ball') {
        const atkSpe = Number(atkBs.spe || atkBs.spd || 50);
        const defSpe = Number(defBs.spe || defBs.spd || 50);
        const power  = Math.min(150, Math.max(1, Math.floor(25 * defSpe / Math.max(1, atkSpe))));
        return { power, note: `Gyro Ball: ~${power} BP (speed-based)` };
    }

    // Grass Knot / Low Kick: weight-based — use 80 BP as average estimate
    if (name === 'grass-knot' || name === 'low-kick') {
        return { power: 80, note: `${moveInfo.name || name}: ~80 BP est. (weight-based)` };
    }

    // Facade: 70 → 140 when attacker is burned, paralysed, or poisoned
    if (name === 'facade') {
        const statused = battleContext.burnOnAttacker || battleContext.paralysisOnMe;
        return { power: statused ? 140 : 70, note: statused ? 'Facade: 140 BP (status active)' : 'Facade: 70 BP (no status)' };
    }

    // Hex: 65 → 130 when target has status
    if (name === 'hex') {
        const statusedTarget = !!(battleContext.opponentStatused);
        return { power: statusedTarget ? 130 : 65, note: statusedTarget ? 'Hex: 130 BP (target statused)' : 'Hex: 65 BP' };
    }

    // Eruption / Water Spout: 150 × atkHP/maxHP — assume full HP → 150
    if (name === 'eruption' || name === 'water-spout') {
        return { power: 150, note: `${moveInfo.name || name}: 150 BP at full HP (decreases with damage)` };
    }

    // Acrobatics: 55 base, 110 if user has no item
    if (name === 'acrobatics') {
        const hasItem = !!(atkMon?.slot?.item && String(atkMon.slot.item).trim() !== '');
        return { power: hasItem ? 55 : 110, note: hasItem ? 'Acrobatics: 55 BP (has item)' : 'Acrobatics: 110 BP (no item)' };
    }

    // Wring Out / Crush Grip: ~100 BP at full target HP
    if (name === 'wring-out' || name === 'crush-grip') {
        return { power: 100, note: `${moveInfo.name || name}: ~100 BP est. (full HP target)` };
    }

    // Body Press: uses user DEF as attack — flag as note, power stays as-is
    if (name === 'body-press') {
        return { power: basePower || 80, note: 'Body Press: uses user DEF as attack stat' };
    }

    return { power: basePower, note: '' };
}

function getWeatherMultiplier(moveType) {
    const weather = String(getBattleContext().weather || 'none');
    const cfg = WEATHER_BONUS_TYPES[weather];
    if (!cfg) return 1;
    if (cfg.boost === moveType) return 1.5;
    if (cfg.weaken === moveType) return 0.5;
    return 1;
}

function getTerrainMultiplier(moveType) {
    const terrain = String(getBattleContext().terrain || 'none');
    return TERRAIN_BONUS_TYPES[terrain] === moveType ? 1.3 : 1;
}

function getHazardChipPct(poke, side) {
    const ctx = getBattleContext();
    const hazards = side === 'opponent' ? ctx.hazardsOnOpponent : ctx.hazardsOnMe;
    let pct = 0;
    if (hazards.stealthRock) pct += Math.round((12.5 * multAtkVsTypes('rock', poke.types)) * 10) / 10;
    const grounded = !(poke.types || []).includes('flying');
    if (grounded && hazards.spikes) {
        const spikesMap = { 1: 12.5, 2: 16.7, 3: 25 };
        pct += spikesMap[hazards.spikes] || 0;
    }
    return Math.min(99, Math.round(pct * 10) / 10);
}

function getRecoveryNote(slot) {
    const item = getSafeItemName(slot?.item);
    if (!RECOVERY_ITEMS.has(item)) return '';
    if (item === 'shell bell') return 'Shell Bell recovery can soften recoil trades.';
    return `${String(slot.item)} recovery improves longer exchanges.`;
}

/**
 * Returns estimated damage percentage dealt by atkMon using moveInfo against defPoke.
 * defLevel defaults to 50 (standard VGC).
 */
function estimateDamagePct(atkMon, moveInfo, defPoke, defLevel, defSlotData) {
    const moveName = String(moveInfo.name || '').toLowerCase().replace(/\s+/g, '-');
    const VARIABLE_POWER_MOVES = new Set(['gyro-ball','grass-knot','low-kick','wring-out','crush-grip','body-press']);
    if (!atkMon || !moveInfo || !defPoke || (!moveInfo.power && !VARIABLE_POWER_MOVES.has(moveName))) return null;
    defLevel = defLevel || 50;
    const battleContext = getBattleContext();

    // Attacker stats
    const atkBs  = (typeof BASE_STATS !== 'undefined' && BASE_STATS[atkMon.p.id]) || { atk: 80, spa: 80 };
    const atkLv  = Number(atkMon.slot.level) || 100;
    const isPhys = moveInfo.cat === 'physical';
    const atkBase= isPhys ? (Number(atkBs.atk) || 80) : (Number(atkBs.spa) || 80);
    const atkEv  = isPhys ? (Number((atkMon.slot.ev || {}).ATK) || 0) : (Number((atkMon.slot.ev || {}).SPATK) || 0);
    const atkIv  = isPhys ? (atkMon.slot.iv?.ATK === '' || atkMon.slot.iv?.ATK === undefined ? 31 : Number(atkMon.slot.iv?.ATK) || 31)
                          : (atkMon.slot.iv?.SPATK === '' || atkMon.slot.iv?.SPATK === undefined ? 31 : Number(atkMon.slot.iv?.SPATK) || 31);
    const atkNature = getNatureMultiplier(atkMon.slot.nature, isPhys ? 'ATK' : 'SPATK');
    const atkRaw = Math.floor(((2 * atkBase + atkIv + Math.floor(atkEv / 4)) * atkLv) / 100) + 5;
    let atkStat= Math.floor(atkRaw * atkNature);

    // Defender stats
    const defBs  = (typeof BASE_STATS !== 'undefined' && BASE_STATS[defPoke.id]) || { hp: 80, def: 80, spd: 80 };
    const hpIv = (defSlotData && defSlotData.iv && defSlotData.iv.HP !== '' && defSlotData.iv.HP !== undefined) ? Number(defSlotData.iv.HP) : 31;
    const hpEv = (defSlotData && defSlotData.ev && defSlotData.ev.HP !== '' && defSlotData.ev.HP !== undefined) ? Number(defSlotData.ev.HP) : 0;
    const defHP  = Math.floor(((2 * (Number(defBs.hp) || 80) + hpIv + Math.floor(hpEv / 4)) * defLevel) / 100) + defLevel + 10;
    const defBase= isPhys ? (Number(defBs.def) || 80) : (Number(defBs.spd) || 80);
    const defIvRaw = (defSlotData && defSlotData.iv)
        ? (isPhys ? defSlotData.iv.DEF : defSlotData.iv.SPDEF)
        : undefined;
    const defEvRaw = (defSlotData && defSlotData.ev)
        ? (isPhys ? defSlotData.ev.DEF : defSlotData.ev.SPDEF)
        : undefined;
    const defIv = defIvRaw === '' || defIvRaw === undefined ? 31 : Number(defIvRaw) || 31;
    const defEv = defEvRaw === '' || defEvRaw === undefined ? 0 : Number(defEvRaw) || 0;
    const defNature = getNatureMultiplier(defSlotData && defSlotData.nature, isPhys ? 'DEF' : 'SPDEF');
    const defRaw = Math.floor(((2 * defBase + defIv + Math.floor(defEv / 4)) * defLevel) / 100) + 5;
    let defStat= Math.floor(defRaw * defNature);

    // Type effectiveness — check extended ability immunities first
    const defAbility = getSafeAbilityName(defSlotData && defSlotData.ability);
    let typeMult = getDynamicMult(moveInfo.type, defPoke.types, defAbility);
    if (typeMult === 0) return null; // Immune

    // Wonder Guard: only super-effective moves deal damage
    if (defAbility === 'wonder-guard' && typeMult <= 1) return null;

    // Extended defensive ability modifiers
    const moveFlags = (typeof MOVE_FLAGS !== 'undefined' && MOVE_FLAGS[moveInfo.name || '']) || {};
    const isContact = !!moveFlags.contact;
    if (defAbility === 'fluffy') {
        if (isContact) typeMult *= 2;
        if (moveInfo.type === 'fire') typeMult *= 2;
    }
    if (defAbility === 'dry-skin' && moveInfo.type === 'water') return null;
    if (defAbility === 'dry-skin' && moveInfo.type === 'fire') typeMult *= 1.25;
    if (defAbility === 'sap-sipper' && moveInfo.type === 'grass') return null;
    if (defAbility === 'earth-eater' && moveInfo.type === 'ground') return null;
    if (defAbility === 'well-baked-body' && moveInfo.type === 'fire') return null;
    if (defAbility === 'wind-rider' && moveInfo.type === 'flying') return null;
    if (defAbility === 'purifying-salt' && moveInfo.type === 'ghost') typeMult *= 0.5;
    if (defAbility === 'heatproof' && moveInfo.type === 'fire') typeMult *= 0.5;
    if (defAbility === 'ice-scales' && !isPhys) defStat = Math.floor(defStat * 2);
    if (typeMult === 0) return null;

    // STAB
    const stab = getStabMultiplier(atkMon, moveInfo);

    const offensiveAbility = getSafeAbilityName(atkMon.slot.ability);
    if ((offensiveAbility === 'orichalcum-pulse' && battleContext.weather === 'sun') || (offensiveAbility === 'hadron-engine' && battleContext.terrain === 'electric')) {
        atkStat = Math.floor(atkStat * 1.33);
    }

    // Burn: halves physical attack
    if (isPhys && battleContext.burnOnAttacker && offensiveAbility !== 'guts') {
        atkStat = Math.floor(atkStat * 0.5);
    }

    const defensiveItem = DEFENSIVE_ITEM_MODS[getSafeItemName(defSlotData && defSlotData.item)];
    if (defensiveItem && (!defensiveItem.cat || defensiveItem.cat === moveInfo.cat)) {
        defStat = Math.floor(defStat * defensiveItem.mult);
    }

    // Damage formula (Gen 5+)
    const varPower = resolveVariablePower(moveInfo, atkMon, defPoke, atkBs, defBs, battleContext);
    const effectivePower = varPower.power || moveInfo.power;
    const variablePowerNote = varPower.note;
    const base = Math.floor((Math.floor(2 * atkLv / 5 + 2) * effectivePower * atkStat / Math.max(defStat, 1)) / 50) + 2;
    let preRoll = applyAttackItemAndAbilityMods(base, atkMon, moveInfo, typeMult) * stab * typeMult * getWeatherMultiplier(moveInfo.type) * getTerrainMultiplier(moveInfo.type);
    if (defSlotData && defSlotData.__side === 'opponent' && ((battleContext.reflect && isPhys) || (battleContext.lightScreen && !isPhys))) {
        preRoll *= battleContext.doubles ? (2 / 3) : 0.5;
    }
    // Spread move penalty in Doubles (×0.75)
    if (battleContext.doubles && typeof SPREAD_MOVES !== 'undefined' && SPREAD_MOVES.has(moveInfo.name || '')) {
        preRoll *= 0.75;
    }

    const rolls = [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
        .map(r => Math.floor(preRoll * (r / 100)));
    const dmgMin = Math.min(...rolls);
    const dmgMax = Math.max(...rolls);

    // Critical hit roll (crits ignore defensive boosts; ×1.5 damage, ignore screens)
    const critRolls = rolls.map(d => Math.floor(d * 1.5));
    const critMin = Math.min(...critRolls);
    const critMax = Math.max(...critRolls);
    const isHighCrit = !!(moveFlags.highCrit);

    // Multi-hit move scaling
    const multiHit = moveFlags.multiHit;
    const multiHitMin = multiHit ? multiHit.min : 1;
    const multiHitMax = multiHit ? multiHit.max : 1;
    const multiHitAvg = multiHit ? ((multiHit.min + multiHit.max) / 2) : 1;

    const minPct = Math.min(Math.round(dmgMin / defHP * 100), 999);
    const maxPct = Math.min(Math.round(dmgMax / defHP * 100), 999);
    const critMinPct = Math.min(Math.round(critMin / defHP * 100), 999);
    const critMaxPct = Math.min(Math.round(critMax / defHP * 100), 999);

    const hazardChip = defSlotData && defSlotData.__side ? getHazardChipPct(defPoke, defSlotData.__side) : 0;
    const minAfterHazards = Math.min(999, Math.round((dmgMin / defHP * 100) + hazardChip));
    const maxAfterHazards = Math.min(999, Math.round((dmgMax / defHP * 100) + hazardChip));

    const ohkoChance = Math.round((rolls.filter(d => d >= defHP).length / rolls.length) * 100);

    // OHKO blocker check (Sturdy / Focus Sash)
    const defItem = getSafeItemName(defSlotData && defSlotData.item);
    const hasSashOrSturdy = (typeof OHKO_BLOCKERS !== 'undefined' && OHKO_BLOCKERS.has(defAbility)) ||
                            (typeof OHKO_BLOCKER_ITEMS !== 'undefined' && OHKO_BLOCKER_ITEMS.has(defItem));

    // Leftovers / Black Sludge: heals 1/16 HP per turn
    let recoveryPerTurn = 0;
    if (defItem === 'leftovers' || defItem === 'black sludge') recoveryPerTurn = Math.floor(defHP / 16);
    // Express recovery-adjusted number of hits to KO
    let hitsToKO = minPct > 0 ? Math.ceil(100 / minPct) : null;
    if (recoveryPerTurn > 0 && hitsToKO && hitsToKO > 1) {
        // Each turn the defender regains recoveryPerTurn HP, attacker needs extra hits
        const netDmgPerTurn = dmgMin - recoveryPerTurn;
        if (netDmgPerTurn > 0) hitsToKO = Math.ceil(defHP / netDmgPerTurn);
        else hitsToKO = null; // cannot KO through recovery
    }

    let label = '';
    if (minPct >= 100)       label = 'OHKO';
    else if (minPct >= 50)   label = '2HKO';
    else if (minPct >= 34)   label = '3HKO';
    else                     label = `~${minPct}%`;

    if (hasSashOrSturdy && label === 'OHKO') label = 'OHKO*';

    // Recoil / drain
    const recoilFrac = moveFlags.recoil || 0;
    const drainFrac  = moveFlags.drain  || 0;

    return {
        minPct, maxPct, label, typeMult, ohkoChance,
        minAfterHazards, maxAfterHazards, hazardChip,
        critMinPct, critMaxPct, isHighCrit,
        multiHitMin, multiHitMax, multiHitAvg,
        recoilFrac, drainFrac,
        hasSashOrSturdy, recoveryPerTurn, hitsToKO,
        variablePowerNote,
    };
}

/**
 * Returns the best damage estimate for atkMon against defPoke across all equipped moves.
 * Returns { label, minPct, maxPct, moveName } or null.
 */
function getBestDamageEstimate(atkMon, defPoke, defSlotData) {
    if (!atkMon || !defPoke || !atkMon.slot.moveNames) return null;

    let best = null;

    atkMon.slot.moveNames.forEach(mName => {
        if (!mName) return;
        const mKey = mName.toLowerCase().replace(/\s+/g, '-');
        const mInfo = (typeof MOVE_INFO !== 'undefined') ? (MOVE_INFO[mName] || MOVE_INFO[mKey]) : null;
        if (!mInfo || mInfo.cat === 'status' || !mInfo.power) return;

        const est = estimateDamagePct(atkMon, Object.assign({ name: mKey }, mInfo), defPoke, Number(defSlotData?.level) || 50, defSlotData);
        if (!est) return;

        if (!best || est.maxPct > best.maxPct) {
            best = { ...est, moveName: mName };
        }
    });

    return best;
}

// ==========================================
// 5. STAT COMPARISON
// ==========================================

/**
 * Calculates final battle stats for a Pokémon given base stats, IV, EV, level, nature.
 * For opponents pass iv=31, ev=252, level=100, nature=null.
 */
function calcFinalStats(bs, iv, ev, level, nature) {
    const lv = Number(level) || 100;
    const statKeys = [
        { key: 'hp',  label: 'HP',   mapKey: 'HP'    },
        { key: 'atk', label: 'ATK',  mapKey: 'ATK'   },
        { key: 'def', label: 'DEF',  mapKey: 'DEF'   },
        { key: 'spa', label: 'SpA',  mapKey: 'SPATK' },
        { key: 'spd', label: 'SpD',  mapKey: 'SPDEF' },
        { key: 'spe', label: 'SPE',  mapKey: 'SPD'   },
    ];
    const result = {};
    statKeys.forEach(({ key, label, mapKey }) => {
        const base = Number(bs[key]) || 50;
        const ivVal  = iv  !== null ? (typeof iv  === 'object' ? (iv [mapKey]  === '' || iv [mapKey]  === undefined ? 31 : Number(iv [mapKey])  || 0) : iv)  : 31;
        const evVal  = ev  !== null ? (typeof ev  === 'object' ? (ev [mapKey]  === '' || ev [mapKey]  === undefined ?  0 : Number(ev [mapKey])  || 0) : ev)  :  0;
        const rawBase = Math.floor(((2 * base + ivVal + Math.floor(evVal / 4)) * lv) / 100);
        let final;
        if (key === 'hp') {
            final = rawBase + lv + 10;
        } else {
            const nat = getNatureMultiplier(nature, mapKey);
            final = Math.floor((rawBase + 5) * nat);
        }
        result[label] = final;
    });
    return result;
}

const STAT_LABELS   = ['HP', 'ATK', 'DEF', 'SpA', 'SpD', 'SPE'];
const STAT_COLORS   = { HP: '#63d471', ATK: '#ff6b6b', DEF: '#4dabf7', SpA: '#cc5de8', SpD: '#74c0fc', SPE: '#ffd43b' };

window.calcStatView = window.calcStatView || 'ATK';
window.setCalcStatView = function(stat) { window.calcStatView = stat; renderTeamSlots(); };

function getStatComparisonHTML(selected) {
    if (!selected || !selected.length) return '';

    const activeStat = window.calcStatView || 'ATK';

    // Compute my team final stats
    const myRows = selected.map(mon => {
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[mon.p.id]) || {};
        const stats = calcFinalStats(bs, mon.slot.iv || {}, mon.slot.ev || {}, mon.slot.level, mon.slot.nature);
        return { name: mon.p.name.replace(/-/g, ' '), stats, isOpp: false };
    });

    // Compute opponent team at max (31 IV, 252 EV, Lv 100)
    const oppRows = [];
    if (typeof window !== 'undefined' && window.oppTeam && window.oppTeam.length) {
        window.oppTeam.forEach(opp => {
            const opId = typeof opp === 'number' ? opp : opp.id;
            const op   = (typeof POKE !== 'undefined') ? POKE.find(p => p.id === opId) : null;
            if (!op) return;
            const bs   = (typeof BASE_STATS !== 'undefined' && BASE_STATS[op.id]) || {};
            const stats = calcFinalStats(bs, 31, 252, 100, null);
            oppRows.push({ name: op.name.replace(/-/g, ' '), stats, isOpp: true });
        });
    }

    const allRows = [...myRows, ...oppRows];
    const maxVal  = Math.max(...allRows.map(r => r.stats[activeStat] || 0), 1);
    const myMax   = Math.max(...myRows.map(r => r.stats[activeStat] || 0), 1);

    const color   = STAT_COLORS[activeStat] || '#4dabf7';

    const buttons = STAT_LABELS.map(s => {
        const active = s === activeStat;
        const c      = STAT_COLORS[s];
        return `<button onclick="window.setCalcStatView('${s}')" style="padding:4px 10px; border-radius:20px; border:1px solid ${active ? c : '#555'}; background:${active ? c + '28' : 'transparent'}; color:${active ? c : 'var(--dim)'}; cursor:pointer; font-size:11px; font-weight:bold; transition:.15s;">${s}</button>`;
    }).join('');

    const renderRow = (row) => {
        const val  = row.stats[activeStat] || 0;
        const pct  = Math.max(8, Math.round((val / maxVal) * 100));
        const isBest = !row.isOpp && val === myMax && myMax > 0;
        const rowColor = row.isOpp ? '#ff6b6b' : '#63d471';
        const label = row.isOpp
            ? `<span title="Max stats (31 IV / 252 EV / Lv 100)" style="font-size:9px; background:rgba(255,107,107,0.15); border:1px solid #ff6b6b; color:#ff6b6b; border-radius:2px; padding:0 4px; margin-left:3px;">MAX</span>`
            : (isBest ? `<span style="font-size:9px; background:#63d47122; border:1px solid #63d471; color:#63d471; border-radius:2px; padding:0 4px; margin-left:3px;">BEST</span>` : '');
        return `<div class="statBar">
            <span style="color:${rowColor}; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-transform:capitalize;">${row.name}${label}</span>
            <div style="background:rgba(255,255,255,0.08); border-radius:999px; overflow:hidden; height:8px;"><div style="width:${pct}%; height:100%; background:${rowColor};"></div></div>
            <span style="font-weight:900; color:${rowColor}; text-align:right;">${val}</span>
        </div>`;
    };

    const mySection  = myRows.sort((a,b)  => (b.stats[activeStat]||0) - (a.stats[activeStat]||0)).map(r => renderRow(r)).join('');
    const oppSection = oppRows.length
        ? `<div style="margin-top:6px; border-top:1px dashed rgba(255,107,107,0.3); padding-top:6px; display:flex; flex-direction:column; gap:6px;">${oppRows.sort((a,b) => (b.stats[activeStat]||0) - (a.stats[activeStat]||0)).map(r => renderRow(r)).join('')}</div>`
        : '';

    return `<div style="margin:10px 0; padding:12px 14px; background:${color}0d; border:1px solid ${color}55; border-radius:8px;">
        <strong style="color:${color}; font-size:13px;">📊 Stat Comparison — ${activeStat}</strong>
        <div style="display:flex; flex-wrap:wrap; gap:4px; margin:8px 0 10px;">${buttons}</div>
        <div style="display:flex; flex-direction:column; gap:6px;">${mySection}</div>
        ${oppSection}
        ${oppRows.length ? `<p style="margin:8px 0 0; font-size:10px; color:var(--dim);">🔴 Opponent stats shown at maximum (31 IV · 252 EV · Lv 100) for reference.</p>` : ''}
    </div>`;
}

// ==========================================
// 6. UI HELPERS
// ==========================================

function getBattleContextHTML() {
    const ctx = getBattleContext();
    const hazards = [
        { key: 'hazardsOnOpponent.stealthRock', label: 'SR on Opp', type: 'checkbox', value: ctx.hazardsOnOpponent.stealthRock },
        { key: 'hazardsOnOpponent.spikes', label: 'Spikes on Opp', type: 'select', value: String(ctx.hazardsOnOpponent.spikes), options: ['0', '1', '2', '3'] },
        { key: 'hazardsOnMe.stealthRock', label: 'SR on Me', type: 'checkbox', value: ctx.hazardsOnMe.stealthRock },
        { key: 'hazardsOnMe.spikes', label: 'Spikes on Me', type: 'select', value: String(ctx.hazardsOnMe.spikes), options: ['0', '1', '2', '3'] }
    ];
    const weatherOptions = [['none', 'No Weather'], ['rain', 'Rain'], ['sun', 'Sun'], ['sand', 'Sand'], ['snow', 'Snow']];
    const terrainOptions = [['none', 'No Terrain'], ['electric', 'Electric'], ['grassy', 'Grassy'], ['psychic', 'Psychic'], ['misty', 'Misty']];

    const selectHtml = (path, value, options) => `<select onchange="window.updateBattleContext('${path}', this.value)" style="width:100%; background:var(--bg); border:1px solid var(--brd); border-radius:6px; color:var(--txt); font:800 11px 'Nunito',sans-serif; padding:6px;">
        ${options.map(([id, label]) => `<option value="${id}" ${String(value) === String(id) ? 'selected' : ''}>${label}</option>`).join('')}
    </select>`;
    const toggleHtml = cfg => cfg.type === 'checkbox'
        ? `<label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
            <span>${cfg.label}</span>
            <input type="checkbox" ${cfg.value ? 'checked' : ''} onchange="window.updateBattleContext('${cfg.key}', this.checked)">
        </label>`
        : `<label style="display:flex; flex-direction:column; gap:5px; font-size:11px; color:var(--txt);">
            <span>${cfg.label}</span>
            ${selectHtml(cfg.key, cfg.value, cfg.options.map(v => [v, v]))}
        </label>`;

    return `<div style="margin:10px 0; padding:12px 14px; background:rgba(177,151,252,0.08); border:1px solid #b197fc55; border-radius:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
            <strong style="color:#b197fc; font-size:13px;">🌦 Battle Context</strong>
            <button onclick="window.resetBattleContext && window.resetBattleContext()" style="padding:4px 10px; border-radius:14px; border:1px solid #555; background:transparent; color:var(--dim); cursor:pointer; font-size:10px; font-weight:900;">Reset</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:8px;">
            <label style="display:flex; flex-direction:column; gap:5px; font-size:11px; color:var(--txt);">
                <span>Weather</span>
                ${selectHtml('weather', ctx.weather, weatherOptions)}
            </label>
            <label style="display:flex; flex-direction:column; gap:5px; font-size:11px; color:var(--txt);">
                <span>Terrain</span>
                ${selectHtml('terrain', ctx.terrain, terrainOptions)}
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Reflect on Opponent</span>
                <input type="checkbox" ${ctx.reflect ? 'checked' : ''} onchange="window.updateBattleContext('reflect', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Light Screen on Opponent</span>
                <input type="checkbox" ${ctx.lightScreen ? 'checked' : ''} onchange="window.updateBattleContext('lightScreen', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Trick Room active</span>
                <input type="checkbox" ${ctx.trickRoom ? 'checked' : ''} onchange="window.updateBattleContext('trickRoom', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Doubles screen rules</span>
                <input type="checkbox" ${ctx.doubles ? 'checked' : ''} onchange="window.updateBattleContext('doubles', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Tailwind on my side</span>
                <input type="checkbox" ${ctx.tailwindOnMe ? 'checked' : ''} onchange="window.updateBattleContext('tailwindOnMe', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Tailwind on opponent</span>
                <input type="checkbox" ${ctx.tailwindOnOpponent ? 'checked' : ''} onchange="window.updateBattleContext('tailwindOnOpponent', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>Attacker is Burned (−50% ATK)</span>
                <input type="checkbox" ${ctx.burnOnAttacker ? 'checked' : ''} onchange="window.updateBattleContext('burnOnAttacker', this.checked)">
            </label>
            <label style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:11px; color:var(--txt);">
                <span>My Pokémon Paralysed (−50% Spd)</span>
                <input type="checkbox" ${ctx.paralysisOnMe ? 'checked' : ''} onchange="window.updateBattleContext('paralysisOnMe', this.checked)">
            </label>
            ${hazards.map(toggleHtml).join('')}
        </div>
    </div>`;
}

function getMatchupSummaryHTML(selected) {
    if (!selected || !selected.length) return '';
    const threats = getActiveThreats();
    const meta = getMetaThreatAnalysis(selected, threats);
    const teamWeaknesses = AT.map(t => ({
        type: t,
        count: selected.filter(x => getDynamicMult(t, x.p.types, x.slot.ability) > 1).length
    })).filter(x => x.count >= Math.max(2, Math.ceil(selected.length / 2))).sort((a, b) => b.count - a.count);
    const notes = [];
    const uncovered = meta ? meta.results.filter(r => r.coverage < 2).slice(0, 3) : [];
    if (uncovered.length) notes.push(`Coverage is thin into ${uncovered.map(x => x.name.replace(/-/g, ' ')).join(', ')}.`);
    if (teamWeaknesses.length) notes.push(`Multiple selected Pokémon still fold to ${teamWeaknesses.slice(0, 3).map(x => x.type).join(', ')} attacks.`);
    if (selected.filter(x => (x.slot.moveNames || []).some(m => ['recover','roost','slack-off','soft-boiled','moonlight','wish'].includes(String(m).toLowerCase()))).length < 2) {
        notes.push('Long-game recovery is limited, so bulky pivots can outlast repeated trades.');
    }
    if (selected.filter(x => (x.slot.moveNames || []).some(m => ['u-turn','volt-switch','flip-turn','parting-shot'].includes(String(m).toLowerCase()))).length === 0) {
        notes.push('The team lacks clean pivoting, which makes momentum versus pressure-heavy threats harder to keep.');
    }
    if (selected.filter(x => (x.slot.moveNames || []).some(m => ['stealth-rock','spikes','toxic-spikes','sticky-web'].includes(String(m).toLowerCase()))).length === 0) {
        notes.push('Hazard pressure is light, so forced switches are not punished enough yet.');
    }
    if (!notes.length) notes.push('The selected core looks balanced for the current meta snapshot.');

    return `<div style="margin:10px 0; padding:12px 14px; background:rgba(255,107,107,0.08); border:1px solid rgba(255,107,107,0.35); border-radius:8px;">
        <strong style="color:#ff8080; font-size:13px;">🧠 Matchup Summary</strong>
        <ul style="margin:8px 0 0 16px; padding:0; display:flex; flex-direction:column; gap:4px;">
            ${notes.map(note => `<li style="font-size:11px; color:var(--txt); line-height:1.45;">${note}</li>`).join('')}
        </ul>
    </div>`;
}

function getArchetypeHTML(selected) {
    const arch = detectArchetype(selected);
    if (!arch) return '';
    return `<div style="margin:10px 0 8px; padding:10px 14px; background:${arch.color}18; border:1px solid ${arch.color}; border-radius:8px; display:flex; align-items:flex-start; gap:10px;">
        <div>
            <strong style="color:${arch.color}; font-size:13px;">${arch.name}</strong>
            <span style="font-size:11px; color:var(--dim); display:block; margin-top:2px;">Set by <b style="color:var(--txt)">${arch.setter}</b> · ${arch.desc}</span>
        </div>
    </div>`;
}

function getSpeedWarningHTML(selected) {
    const info = getSpeedControlAnalysis(selected);
    if (!info) return '';

    let html = '';

    if (info.needsWarning) {
        const suggestions = info.hasTrickRoom ? '' : ' Consider adding a <b>Tailwind</b>, <b>Trick Room</b>, or <b>Icy Wind</b> user.';
        html += `<div style="margin:8px 0; padding:10px 14px; background:rgba(255,193,7,0.08); border:1px solid #ffc107; border-radius:8px; font-size:12px; color:#ffc107;">
            ⚡ <b>No Speed Control!</b> Avg. team speed: <b>${info.avgSpeed}</b>${suggestions}
        </div>`;
    } else if (info.hasSpeedControl) {
        const ctrl = info.hasTrickRoom ? 'Trick Room' : info.hasTailwind ? 'Tailwind' : 'Icy Wind';
        html += `<div style="margin:8px 0; padding:8px 14px; background:rgba(99,212,113,0.08); border:1px solid #63d471; border-radius:8px; font-size:12px; color:#63d471;">
            ✅ Speed Control detected: <b>${ctrl}</b> (avg speed: ${info.avgSpeed})
        </div>`;
    }

    return html;
}

function getMetaThreatHTML(selected) {
    const fmt = window.metaThreatFormat || 'pro';
    const fmtInfo = META_FORMAT_REGISTRY[fmt] || META_FORMAT_REGISTRY['pro'];
    const threats = (fmt === 'custom') ? (_loadCustomMeta() || META_THREATS_PRO) : (fmtInfo.threats || META_THREATS_PRO);
    const tiers = fmtInfo.tiers;

    const analysis = getMetaThreatAnalysis(selected, threats);
    if (!analysis) return '';

    const accentColor = '#f5a623';
    const scoreColor  = analysis.score >= 70 ? '#63d471' : analysis.score >= 50 ? '#ffc107' : '#ff6b6b';
    const uncovered   = analysis.results.filter(r => r.coverage < 2);

    const makeBadge = r => {
        const p = (typeof POKE !== 'undefined') ? POKE.find(x => x.id === r.id) : null;
        const sprite = (p && typeof spriteImg !== 'undefined') ? spriteImg(p, '') : '';
        const bgColor = r.coverage >= 4 ? '#2b8a3e' : r.coverage >= 2 ? '#1864ab' : '#7b2929';
        const label   = r.coverage >= 4 ? `x${r.coverage}` : r.coverage >= 2 ? 'SE' : '✗';
        const tooltip = r.source ? `${r.source} covers with x${r.coverage}` : 'No coverage';
        return `<div title="${tooltip}" style="display:flex; flex-direction:column; align-items:center; background:${bgColor}33; border:1px solid ${bgColor}; border-radius:6px; padding:5px 7px; min-width:58px; cursor:default;">
            ${sprite}
            <span style="font-size:10px; font-weight:bold; color:var(--txt); text-align:center; margin-top:3px;">${r.name.replace(/-/g, ' ')}</span>
            <span style="font-size:10px; font-weight:900; color:${r.coverage >= 2 ? '#63d471' : '#ff6b6b'};">${label}</span>
        </div>`;
    };

    let threatBadgesHTML = '';
    if (tiers) {
        tiers.forEach(({ tier, label: tLabel }) => {
            const group = analysis.results.filter(r => r.tier === tier);
            if (!group.length) return;
            threatBadgesHTML += `<div style="width:100%; margin-bottom:2px;"><span style="font-size:10px; font-weight:900; color:${accentColor}; letter-spacing:.5px;">${tLabel}</span></div>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px;">${group.map(makeBadge).join('')}</div>`;
        });
    } else {
        threatBadgesHTML = `<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px;">${analysis.results.map(makeBadge).join('')}</div>`;
    }

    // Format selector pills
    const formatPills = Object.entries(META_FORMAT_REGISTRY).map(([id, info]) => {
        const active = id === fmt;
        if (id === 'custom' && !_loadCustomMeta()) return '';
        return `<button onclick="window.setMetaFormat('${id}')" style="padding:3px 9px; border-radius:12px; border:1px solid ${active ? accentColor : '#555'}; background:${active ? accentColor + '28' : 'transparent'}; color:${active ? accentColor : 'var(--dim)'}; cursor:pointer; font-size:10px; font-weight:bold; transition:.15s;">${info.label}</button>`;
    }).join('');

    return `<div style="margin:10px 0; padding:12px 14px; background:${accentColor}0d; border:1px solid ${accentColor}; border-radius:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <strong style="color:${accentColor}; font-size:13px;">🏆 Meta Threat Check</strong>
            <span style="font-size:13px; font-weight:900; color:${scoreColor}; background:${scoreColor}18; padding:4px 10px; border-radius:20px; border:1px solid ${scoreColor};">${analysis.score}% Coverage</span>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px; align-items:center;">
            ${formatPills}
            <button onclick="window.openMetaEditorModal()" style="padding:3px 9px; border-radius:12px; border:1px solid #555; background:transparent; color:var(--dim); cursor:pointer; font-size:10px; font-weight:bold; margin-left:auto;">✏️ Edit</button>
        </div>
        ${threatBadgesHTML}
        ${uncovered.length ? `<p style="margin:6px 0 0; font-size:11px; color:#ff6b6b;">⚠️ No super-effective coverage vs: <b>${uncovered.map(r => r.name).join(', ')}</b></p>` : ''}
    </div>`;
}

// ==========================================
// 7. TERA DEFENSE IMPACT
// ==========================================

function getTeraDefenseHTML(selected) {
    if (!selected || !selected.length) return '';
    const teraMons = selected.filter(x => x.slot.teraType);
    if (!teraMons.length) return '';

    const tips = teraMons.map(x => {
        const teraType = x.slot.teraType.toLowerCase();
        // Normal weaknesses (any type hitting any of the Pokémon's types for ≥2×)
        const normalWeaks = [...new Set(x.p.types.flatMap(t => AT.filter(a => (EFF[a][t] ?? 1) >= 2)))];
        // Weaknesses under Tera (single teraType)
        const teraWeaks   = AT.filter(a => (EFF[a][teraType] ?? 1) >= 2);

        const improved = normalWeaks.filter(w => (EFF[w][teraType] ?? 1) < 2);
        const newWeaks  = teraWeaks.filter(w => !normalWeaks.includes(w));

        if (!improved.length && !newWeaks.length) return '';

        const improvedHtml = improved.length ? `<span style="color:#63d471; font-size:11px;">✓ Removes weakness to: <b>${improved.join(', ')}</b></span>` : '';
        const newWeaksHtml  = newWeaks.length  ? `<span style="color:#ffc107; font-size:11px;">⚠ New weakness: <b>${newWeaks.join(', ')}</b></span>` : '';

        return `<div style="display:flex; flex-direction:column; gap:2px; padding:6px 8px; background:var(--bg); border:1px solid #cc5de855; border-radius:6px;">
            <span style="font-size:12px; font-weight:bold; color:var(--txt); text-transform:capitalize;">${x.p.name.replace(/-/g,' ')} → <span style="color:#cc5de8;">Tera ${x.slot.teraType}</span></span>
            ${improvedHtml}
            ${newWeaksHtml}
        </div>`;
    }).filter(Boolean);

    if (!tips.length) return '';

    return `<div style="margin:10px 0; padding:12px 14px; background:#cc5de80d; border:1px solid #cc5de855; border-radius:8px;">
        <strong style="color:#cc5de8; font-size:13px;">⬡ Tera Defense Impact</strong>
        <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">${tips.join('')}</div>
    </div>`;
}

// ==========================================
// 8. TEAM-LEVEL INTELLIGENCE
// ==========================================

// Setup moves that identify a win-condition sweeper
const SETUP_MOVES = {
    'swords-dance':   { label: 'Swords Dance', role: 'Physical Sweeper', icon: '⚔️' },
    'nasty-plot':     { label: 'Nasty Plot',   role: 'Special Sweeper',  icon: '🎭' },
    'calm-mind':      { label: 'Calm Mind',    role: 'Special Sweeper',  icon: '🔵' },
    'quiver-dance':   { label: 'Quiver Dance', role: 'Special Sweeper',  icon: '🦋' },
    'dragon-dance':   { label: 'Dragon Dance', role: 'Mixed Sweeper',    icon: '🐉' },
    'shell-smash':    { label: 'Shell Smash',  role: 'Shell Smasher',    icon: '🐚' },
    'bulk-up':        { label: 'Bulk Up',      role: 'Bulky Attacker',   icon: '💪' },
    'coil':           { label: 'Coil',         role: 'Physical Sweeper', icon: '🐍' },
    'hone-claws':     { label: 'Hone Claws',   role: 'Physical Sweeper', icon: '🗡️' },
    'charge-beam':    { label: 'Charge Beam',  role: 'Special Sweeper',  icon: '⚡' },
    'growth':         { label: 'Growth',       role: 'Special Sweeper',  icon: '🌱' },
    'agility':        { label: 'Agility',      role: 'Speed Sweeper',    icon: '💨' },
    'rock-polish':    { label: 'Rock Polish',  role: 'Speed Sweeper',    icon: '🪨' },
};

// Abilities that abuse weather conditions
const WEATHER_ABUSER_ABILITIES = {
    'swift-swim':    { weather: 'rain',  label: 'Swift Swim (Rain)' },
    'chlorophyll':   { weather: 'sun',   label: 'Chlorophyll (Sun)' },
    'sand-rush':     { weather: 'sand',  label: 'Sand Rush (Sand)' },
    'slush-rush':    { weather: 'snow',  label: 'Slush Rush (Snow)' },
    'sand-force':    { weather: 'sand',  label: 'Sand Force (Sand)' },
    'solar-power':   { weather: 'sun',   label: 'Solar Power (Sun)' },
    'rain-dish':     { weather: 'rain',  label: 'Rain Dish (Rain)' },
    'dry-skin':      { weather: 'rain',  label: 'Dry Skin (Rain)' },
};

/**
 * Detect win-conditions on the team: setup sweepers, weather abusers, TR abusers.
 * Returns an array of { pokemon, condition, icon, desc }.
 */
function detectWinConditions(selected) {
    if (!selected || !selected.length) return [];
    const results = [];

    // Detect weather setters for context
    const weatherSetterAbilities = new Set(['drizzle','drought','sand-stream','snow-warning']);
    const activeWeather = (() => {
        for (const mon of selected) {
            const ab = String(mon.slot.ability || '').toLowerCase().replace(/\s+/g, '-');
            if (ab === 'drizzle') return 'rain';
            if (ab === 'drought') return 'sun';
            if (ab === 'sand-stream') return 'sand';
            if (ab === 'snow-warning') return 'snow';
        }
        return null;
    })();

    for (const mon of selected) {
        const moveNames = (mon.slot.moveNames || []).map(m => String(m || '').toLowerCase().replace(/\s+/g, '-'));
        const ability   = String(mon.slot.ability || '').toLowerCase().replace(/\s+/g, '-');
        const name      = mon.p.name.replace(/-/g, ' ');

        // Setup sweeper
        for (const [moveName, info] of Object.entries(SETUP_MOVES)) {
            if (moveNames.includes(moveName)) {
                results.push({ pokemon: name, condition: `${info.label} → ${info.role}`, icon: info.icon, type: 'setup' });
                break;
            }
        }

        // Weather abuser
        const abuserInfo = WEATHER_ABUSER_ABILITIES[ability];
        if (abuserInfo) {
            const synergy = (activeWeather === abuserInfo.weather) ? ' ✅ Setter on team!' : ' ⚠ No setter found';
            results.push({ pokemon: name, condition: `${abuserInfo.label}${synergy}`, icon: '🌦️', type: 'weather' });
        }

        // Trick Room abuser (slow mon with offensive moves, no TR move itself)
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[mon.p.id]) || {};
        const speed = Number(bs.spe || bs.spd || 999);
        const hasTR = moveNames.includes('trick-room');
        if (speed <= 55 && !hasTR && moveNames.some(m => (typeof MOVE_INFO !== 'undefined' && MOVE_INFO[m] && MOVE_INFO[m].power >= 80))) {
            results.push({ pokemon: name, condition: 'Trick Room abuser (slow + offensive)', icon: '🔄', type: 'trickroom' });
        }
    }

    return results;
}

function getWinConditionHTML(selected) {
    const conditions = detectWinConditions(selected);
    if (!conditions.length) return '';

    const color = '#63d471';
    const rows = conditions.map(c =>
        `<div style="display:flex; align-items:center; gap:8px; padding:5px 0; border-bottom:1px solid ${color}18;">
            <span style="font-size:14px;">${c.icon}</span>
            <div>
                <span style="font-size:12px; font-weight:bold; color:var(--txt); text-transform:capitalize;">${c.pokemon}</span>
                <span style="font-size:11px; color:var(--dim); display:block;">${c.condition}</span>
            </div>
        </div>`
    ).join('');

    return `<div style="margin:10px 0; padding:12px 14px; background:${color}0d; border:1px solid ${color}44; border-radius:8px;">
        <strong style="color:${color}; font-size:13px;">🎯 Win-Condition Detection</strong>
        <div style="margin-top:8px;">${rows}</div>
    </div>`;
}

/**
 * Defensive core: find the pair of Pokémon whose type combination gives the fewest shared weaknesses
 * and best overall resistance profile.
 */
function getDefensiveCoreHTML(selected) {
    if (!selected || selected.length < 2) return '';

    const color = '#4dabf7';

    // For each Pokémon, compute weakness set using the combined type multiplier
    const monData = selected.map(mon => {
        const types = mon.p.types || [];
        const combinedMult = a => types.reduce((acc, t) => acc * (EFF[a]?.[t] ?? 1), 1);
        const weakTo   = AT.filter(a => combinedMult(a) >= 2);
        const resistTo = AT.filter(a => { const m = combinedMult(a); return m > 0 && m <= 0.5; });
        const immuneTo = AT.filter(a => combinedMult(a) === 0);
        return { name: mon.p.name.replace(/-/g, ' '), types, weakTo: new Set(weakTo), resistTo: new Set(resistTo), immuneTo: new Set(immuneTo) };
    });

    // Score pairs: fewer shared weaknesses + more complementary resistances = better
    let bestPair = null, bestScore = -Infinity;
    for (let i = 0; i < monData.length; i++) {
        for (let j = i + 1; j < monData.length; j++) {
            const a = monData[i], b = monData[j];
            const sharedWeaks = [...a.weakTo].filter(t => b.weakTo.has(t)).length;
            const coveredA    = [...a.weakTo].filter(t => b.resistTo.has(t) || b.immuneTo.has(t)).length;
            const coveredB    = [...b.weakTo].filter(t => a.resistTo.has(t) || a.immuneTo.has(t)).length;
            const score = (coveredA + coveredB) * 2 - sharedWeaks * 3;
            if (score > bestScore) { bestScore = score; bestPair = [a, b]; }
        }
    }

    if (!bestPair) return '';

    const [a, b] = bestPair;
    const sharedWeaks    = [...a.weakTo].filter(t => b.weakTo.has(t));
    const coveredByB     = [...a.weakTo].filter(t => b.resistTo.has(t) || b.immuneTo.has(t));
    const coveredByA     = [...b.weakTo].filter(t => a.resistTo.has(t) || a.immuneTo.has(t));
    const remainingGaps  = [...new Set([...a.weakTo, ...b.weakTo])].filter(t => !b.resistTo.has(t) && !b.immuneTo.has(t) && !a.resistTo.has(t) && !a.immuneTo.has(t));

    const typeChip = t => `<span style="background:${TC[t] || '#888'}33; border:1px solid ${TC[t] || '#888'}; color:${TC[t] || '#aaa'}; border-radius:10px; padding:1px 7px; font-size:10px; font-weight:bold; text-transform:capitalize;">${t}</span>`;

    return `<div style="margin:10px 0; padding:12px 14px; background:${color}0d; border:1px solid ${color}44; border-radius:8px;">
        <strong style="color:${color}; font-size:13px;">🛡️ Defensive Core</strong>
        <div style="font-size:11px; color:var(--dim); margin-top:4px;">Best pair: <b style="color:var(--txt); text-transform:capitalize;">${a.name} + ${b.name}</b></div>
        ${coveredByB.length ? `<div style="margin-top:6px; font-size:11px;"><span style="color:#63d471;">✓ ${b.name} covers ${a.name}'s weaknesses to:</span> <span style="display:inline-flex;gap:3px;flex-wrap:wrap;">${coveredByB.map(typeChip).join('')}</span></div>` : ''}
        ${coveredByA.length ? `<div style="margin-top:4px; font-size:11px;"><span style="color:#63d471;">✓ ${a.name} covers ${b.name}'s weaknesses to:</span> <span style="display:inline-flex;gap:3px;flex-wrap:wrap;">${coveredByA.map(typeChip).join('')}</span></div>` : ''}
        ${sharedWeaks.length ? `<div style="margin-top:4px; font-size:11px;"><span style="color:#ffc107;">⚠ Shared weakness:</span> <span style="display:inline-flex;gap:3px;flex-wrap:wrap;">${sharedWeaks.map(typeChip).join('')}</span></div>` : ''}
        ${remainingGaps.length ? `<div style="margin-top:4px; font-size:11px;"><span style="color:#ff6b6b;">✗ Coverage gaps:</span> <span style="display:inline-flex;gap:3px;flex-wrap:wrap;">${remainingGaps.map(typeChip).join('')}</span></div>` : ''}
    </div>`;
}

/**
 * Detect role redundancy: flag pairs of Pokémon sharing the same offensive role AND overlapping types.
 */
function getRoleRedundancyHTML(selected) {
    if (!selected || selected.length < 2) return '';

    const color = '#ffa94d';

    // Classify role from moveset/items
    const classifyRole = mon => {
        const moves = (mon.slot.moveNames || []).map(m => String(m || '').toLowerCase().replace(/\s+/g, '-'));
        const item  = String(mon.slot.item  || '').toLowerCase();
        const ability = String(mon.slot.ability || '').toLowerCase().replace(/\s+/g, '-');
        const bs    = (typeof BASE_STATS !== 'undefined' && BASE_STATS[mon.p.id]) || {};
        const hasPhys = moves.some(m => (typeof MOVE_INFO !== 'undefined' && MOVE_INFO[m] && MOVE_INFO[m].cat === 'physical' && MOVE_INFO[m].power >= 80));
        const hasSpec = moves.some(m => (typeof MOVE_INFO !== 'undefined' && MOVE_INFO[m] && MOVE_INFO[m].cat === 'special' && MOVE_INFO[m].power >= 80));
        const isPhysCB = hasPhys && (item === 'choice band' || item === 'life orb');
        const isSpecCS = hasSpec && (item === 'choice specs' || item === 'life orb');
        const isSetup  = moves.some(m => SETUP_MOVES[m]);
        const isTank   = (Number(bs.hp||0) + Number(bs.def||0) + Number(bs.spd||0)) > 280;
        const isSupport = moves.some(m => ['trick-room','tailwind','follow-me','rage-powder','helping-hand','stealth-rock'].includes(m));
        if (isSupport) return 'Support';
        if (isSetup && isPhysCB) return 'Physical Setup Sweeper';
        if (isSetup && isSpecCS) return 'Special Setup Sweeper';
        if (isSetup) return 'Setup Sweeper';
        if (isPhysCB) return 'Physical Attacker';
        if (isSpecCS) return 'Special Attacker';
        if (isTank) return 'Tank / Wall';
        if (hasPhys) return 'Physical Attacker';
        if (hasSpec) return 'Special Attacker';
        return 'Unknown';
    };

    const monRoles = selected.map(mon => ({
        name: mon.p.name.replace(/-/g, ' '),
        role: classifyRole(mon),
        types: new Set(mon.p.types || []),
    }));

    const warnings = [];
    for (let i = 0; i < monRoles.length; i++) {
        for (let j = i + 1; j < monRoles.length; j++) {
            const a = monRoles[i], b = monRoles[j];
            if (a.role === b.role && a.role !== 'Unknown') {
                const overlap = [...a.types].filter(t => b.types.has(t));
                if (overlap.length) {
                    warnings.push(`<b style="color:var(--txt); text-transform:capitalize;">${a.name}</b> & <b style="color:var(--txt); text-transform:capitalize;">${b.name}</b> — both <i>${a.role}</i> with overlapping type <b>${overlap.join(', ')}</b>`);
                } else {
                    warnings.push(`<b style="color:var(--txt); text-transform:capitalize;">${a.name}</b> & <b style="color:var(--txt); text-transform:capitalize;">${b.name}</b> — both <i>${a.role}</i> (no type overlap, ok if coverage differs)`);
                }
            }
        }
    }

    if (!warnings.length) return '';

    return `<div style="margin:10px 0; padding:12px 14px; background:${color}0d; border:1px solid ${color}55; border-radius:8px;">
        <strong style="color:${color}; font-size:13px;">⚠️ Role Redundancy</strong>
        <div style="margin-top:8px; display:flex; flex-direction:column; gap:5px;">
            ${warnings.map(w => `<div style="font-size:11px; color:var(--dim);">${w}</div>`).join('')}
        </div>
        <p style="font-size:10px; color:var(--dim); margin:8px 0 0;">Consider diversifying roles or coverage moves to reduce overlap.</p>
    </div>`;
}

/**
 * Lead pair optimiser for VGC / Doubles.
 * Returns HTML with the recommended lead pair.
 */
function getLeadPairHTML(selected) {
    const ctx = getBattleContext();
    if (!ctx.doubles || !selected || selected.length < 2) return '';

    const color = '#cc5de8';

    // Score each Pokémon as a lead candidate
    const scoreAsLead = mon => {
        let score = 0;
        const moves = (mon.slot.moveNames || []).map(m => String(m || '').toLowerCase().replace(/\s+/g, '-'));
        const ability = String(mon.slot.ability || '').toLowerCase().replace(/\s+/g, '-');
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[mon.p.id]) || {};
        const spe  = Number(bs.spe || bs.spd || 50);

        if (moves.includes('fake-out'))    score += 4;  // Fake Out is top-tier lead
        if (moves.includes('tailwind'))    score += 3;
        if (moves.includes('trick-room'))  score += 3;
        if (moves.includes('follow-me'))   score += 2;
        if (moves.includes('rage-powder')) score += 2;
        if (moves.includes('helping-hand')) score += 1;
        if (moves.includes('protect'))     score += 1;
        if (ability === 'intimidate')      score += 3;  // Intimidate is always value
        if (ability === 'prankster')       score += 2;
        if (spe >= 100)                    score += 1;  // Speed advantage

        // Spread move user is a strong lead
        if (moves.some(m => typeof SPREAD_MOVES !== 'undefined' && SPREAD_MOVES.has(m))) score += 1;

        return score;
    };

    // Score pairs: prefer complementary leads (Fake Out + Setup, Intimidate + Sweeper, etc.)
    const leadScores = selected.map(mon => ({ mon, score: scoreAsLead(mon) }));
    leadScores.sort((a, b) => b.score - a.score);

    if (leadScores.length < 2) return '';

    const top    = leadScores[0];
    const second = leadScores[1];

    const movesA = (top.mon.slot.moveNames    || []).map(m => String(m || '').toLowerCase().replace(/\s+/g, '-'));
    const movesB = (second.mon.slot.moveNames || []).map(m => String(m || '').toLowerCase().replace(/\s+/g, '-'));

    const synergies = [];
    if (movesA.includes('fake-out') || movesB.includes('fake-out')) synergies.push('Fake Out → free setup turn');
    if (movesA.includes('trick-room') || movesB.includes('trick-room')) synergies.push('Trick Room setter present');
    if (movesA.includes('tailwind')  || movesB.includes('tailwind'))  synergies.push('Tailwind speed control');
    if ([top.mon, second.mon].some(m => String(m.slot.ability||'').toLowerCase().replace(/\s+/g,'-') === 'intimidate')) synergies.push('Intimidate on lead');
    if (movesA.some(m => SPREAD_MOVES && SPREAD_MOVES.has(m)) || movesB.some(m => SPREAD_MOVES && SPREAD_MOVES.has(m))) synergies.push('Spread move pressure');

    const nameA = top.mon.p.name.replace(/-/g, ' ');
    const nameB = second.mon.p.name.replace(/-/g, ' ');

    return `<div style="margin:10px 0; padding:12px 14px; background:${color}0d; border:1px solid ${color}44; border-radius:8px;">
        <strong style="color:${color}; font-size:13px;">🎮 Lead Pair Optimiser <span style="font-size:10px; font-weight:400; color:var(--dim);">(Doubles)</span></strong>
        <div style="margin-top:8px; font-size:12px;">
            Recommended lead: <b style="color:var(--txt); text-transform:capitalize;">${nameA}</b> + <b style="color:var(--txt); text-transform:capitalize;">${nameB}</b>
        </div>
        ${synergies.length ? `<div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:4px;">
            ${synergies.map(s => `<span style="background:${color}22; border:1px solid ${color}55; border-radius:10px; padding:2px 8px; font-size:10px; color:${color};">${s}</span>`).join('')}
        </div>` : ''}
    </div>`;
}

/**
 * 3-turn scenario simulator.
 * Shows a simple preview of HP remaining after 3 turns for the selected Pokémon vs. their best opponent threat.
 * Interactive: the user can pick which two Pokémon to compare.
 */
function getScenarioSimulatorHTML(selected) {
    if (!selected || selected.length < 2) return '';

    const color = '#ff6b6b';

    // Build a simplified 3-turn simulation for the first two selected Pokémon
    const attacker = selected[0];
    const defender = selected[1];

    const ctx = getBattleContext();
    const atkBs  = (typeof BASE_STATS !== 'undefined' && BASE_STATS[attacker.p.id]) || { hp: 80, atk: 80, spa: 80, spe: 50 };
    const defBs  = (typeof BASE_STATS !== 'undefined' && BASE_STATS[defender.p.id]) || { hp: 80, atk: 80, spa: 80, spe: 50 };
    const atkLv  = Number(attacker.slot.level) || 50;
    const defLv  = Number(defender.slot.level) || 50;

    const calcHP = (bs, iv, ev, lv) => Math.floor(((2 * (Number(bs.hp)||80) + (Number(iv)||31) + Math.floor((Number(ev)||0)/4)) * lv) / 100) + lv + 10;
    const atkMaxHP = calcHP(atkBs, attacker.slot.iv?.HP, attacker.slot.ev?.HP, atkLv);
    const defMaxHP = calcHP(defBs, defender.slot.iv?.HP, defender.slot.ev?.HP, defLv);

    // Best damage estimate in each direction
    const atkBest = getBestDamageEstimate(attacker, defender.p, { ...defender.slot, __side: 'opponent' });
    const defBest = getBestDamageEstimate(defender, attacker.p, { ...attacker.slot, __side: 'me' });

    const atkDmgPct  = atkBest ? (atkBest.minPct + atkBest.maxPct) / 2 : 0;
    const defDmgPct  = defBest ? (defBest.minPct + defBest.maxPct) / 2 : 0;
    const atkDmg     = Math.round(defMaxHP * atkDmgPct / 100);
    const defDmg     = Math.round(atkMaxHP * defDmgPct / 100);

    // Per-turn recovery (Leftovers / Black Sludge only — Sitrus Berry is one-time, handled as 0 here)
    const atkItem = String(attacker.slot.item || '').toLowerCase();
    const defItem = String(defender.slot.item || '').toLowerCase();
    const atkRec  = (atkItem === 'leftovers' || atkItem === 'black sludge') ? Math.floor(atkMaxHP / 16) : 0;
    const defRec  = (defItem === 'leftovers' || defItem === 'black sludge') ? Math.floor(defMaxHP / 16) : 0;
    // Life Orb recoil on each hit (10% of user's max HP)
    const atkRecoil = (atkItem === 'life orb') ? Math.round(atkMaxHP * 0.1) : 0;
    const defRecoil = (defItem === 'life orb') ? Math.round(defMaxHP * 0.1) : 0;

    // Speed: who goes first?
    const atkSpe = Number(atkBs.spe || atkBs.spd || 50);
    const defSpe = Number(defBs.spe || defBs.spd || 50);
    const atkGoesFirst = ctx.trickRoom ? atkSpe < defSpe : atkSpe >= defSpe;

    let atkHP = atkMaxHP, defHP = defMaxHP;
    const turns = [];

    for (let t = 1; t <= 3; t++) {
        let turn = { turn: t };
        if (atkGoesFirst) {
            // Attacker moves first: deal damage + recoil, then end-of-turn recovery
            defHP = Math.max(0, defHP - atkDmg);
            atkHP = Math.max(0, atkHP - atkRecoil);
            atkHP = Math.min(atkMaxHP, atkHP + atkRec);
            turn.afterAtk = { atkHP, defHP };
            if (defHP > 0) {
                // Defender's counter-attack
                atkHP = Math.max(0, atkHP - defDmg);
                defHP = Math.max(0, defHP - defRecoil);
                defHP = Math.min(defMaxHP, defHP + defRec);
            }
        } else {
            // Defender moves first: apply recovery, deal damage + recoil
            atkHP = Math.min(atkMaxHP, atkHP + atkRec);
            defHP = Math.min(defMaxHP, defHP + defRec);
            atkHP = Math.max(0, atkHP - defDmg);
            defHP = Math.max(0, defHP - defRecoil);
            turn.afterDef = { atkHP, defHP };
            if (atkHP > 0) {
                // Attacker's counter-attack
                defHP = Math.max(0, defHP - atkDmg);
                atkHP = Math.max(0, atkHP - atkRecoil);
            }
        }
        turn.atkHP = Math.max(0, atkHP);
        turn.defHP = Math.max(0, defHP);
        turn.atkPct = Math.round(turn.atkHP / atkMaxHP * 100);
        turn.defPct = Math.round(turn.defHP / defMaxHP * 100);
        turns.push(turn);
        if (atkHP <= 0 || defHP <= 0) break;
    }

    const outcome = turns[turns.length - 1];
    let resultLabel = '';
    if (outcome.atkPct === 0 && outcome.defPct === 0) resultLabel = '⚡ Speed tie / double KO likely';
    else if (outcome.atkPct === 0) resultLabel = `💀 <b style="color:var(--txt); text-transform:capitalize;">${attacker.p.name.replace(/-/g,' ')}</b> KO'd`;
    else if (outcome.defPct === 0) resultLabel = `💀 <b style="color:var(--txt); text-transform:capitalize;">${defender.p.name.replace(/-/g,' ')}</b> KO'd`;
    else if (outcome.atkPct < outcome.defPct) resultLabel = `📉 <b style="color:var(--txt); text-transform:capitalize;">${attacker.p.name.replace(/-/g,' ')}</b> trading worse`;
    else if (outcome.defPct < outcome.atkPct) resultLabel = `📈 <b style="color:var(--txt); text-transform:capitalize;">${attacker.p.name.replace(/-/g,' ')}</b> winning the trade`;
    else resultLabel = '↔ Even trade';

    const hpBar = (pct) => {
        const c = pct > 50 ? '#63d471' : pct > 25 ? '#ffc107' : '#ff6b6b';
        return `<div style="flex:1; height:6px; background:#333; border-radius:3px; overflow:hidden;"><div style="width:${pct}%; height:100%; background:${c}; transition:.2s;"></div></div>`;
    };

    const turnRows = turns.map(t => `
        <div style="display:grid; grid-template-columns:40px 1fr 40px 1fr 30px; gap:4px; align-items:center; font-size:10px;">
            <span style="color:var(--dim);">T${t.turn}</span>
            ${hpBar(t.atkPct)} <span style="color:var(--txt); font-weight:bold;">${t.atkPct}%</span>
            ${hpBar(t.defPct)} <span style="color:var(--txt); font-weight:bold;">${t.defPct}%</span>
        </div>`).join('');

    const atkName = attacker.p.name.replace(/-/g, ' ');
    const defName = defender.p.name.replace(/-/g, ' ');

    return `<div style="margin:10px 0; padding:12px 14px; background:${color}0d; border:1px solid ${color}44; border-radius:8px;">
        <strong style="color:${color}; font-size:13px;">🔮 3-Turn Scenario Preview</strong>
        <div style="font-size:10px; color:var(--dim); margin:4px 0 8px;">${atkName} (${atkGoesFirst ? '⚡ faster' : '🐢 slower'}) vs ${defName} · Best moves each side</div>
        <div style="display:grid; grid-template-columns:40px 1fr 40px 1fr 30px; gap:4px; margin-bottom:4px; font-size:10px; color:var(--dim);">
            <span></span><span style="text-transform:capitalize;">${atkName}</span><span></span><span style="text-transform:capitalize;">${defName}</span><span></span>
        </div>
        ${turnRows}
        <div style="margin-top:8px; font-size:11px; color:var(--dim);">${resultLabel}</div>
        <p style="font-size:10px; color:var(--dim); margin:4px 0 0;">Based on best equipped moves vs slot 1 & 2. Select different Pokémon to change preview.</p>
    </div>`;
}
