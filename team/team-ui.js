// --- team-ui.js : Team Builder UI & Events ---

function updateTeamDropdown() {
    const select = document.getElementById('teamSelect');
    if (select) select.innerHTML = allData.teams.map((t, i) => `<option value="${i}" ${i === currentTeamIndex ? 'selected' : ''}>${t.name}</option>`).join('');
}

function firstEmptySlot() { return team.findIndex(s => !s.pokemonId) }
function addToTeam(id) { const i = firstEmptySlot(); if (i === -1) { alert('Your team is full. Clear a slot before adding another Pokémon.'); return } team[i].pokemonId = id; saveTeam(); renderTeamSlots() }

function setStat(slot, kind, stat, value, el) { 
    if (kind === 'iv') {
        const clean = value === '' ? '' : String(Math.max(0, Math.min(31, Number(value) || 0)));
        team[slot][kind][stat] = clean;
        if (el && el.value !== clean) el.value = clean;
    } else if (kind === 'ev') {
        let otherEvTotal = 0;
        TEAM_STATS.forEach(s => { if (s !== stat) otherEvTotal += Number(team[slot].ev[s]) || 0; });
        const maxAllowed = Math.min(252, 510 - otherEvTotal);
        const clean = value === '' ? '' : String(Math.max(0, Math.min(maxAllowed, Number(value) || 0)));
        team[slot][kind][stat] = clean;
        if (el && el.value !== clean) el.value = clean;
    }
    saveTeam(); 
}

function setMoveType(slot, move, value) { team[slot].moves[move] = value; saveTeam(); if (team[slot].calc) renderTeamSlots() } 
function setMoveCat(slot, move, value) { team[slot].moveCats[move] = value; saveTeam(); if (team[slot].calc) renderTeamSlots() } 
function setMoveName(slot, move, value) { 
    // SAFE CHECK: Do not crash if MOVE_INFO is missing
    const info = (typeof MOVE_INFO !== 'undefined' && MOVE_INFO[value]) ? MOVE_INFO[value] : {}; 
    team[slot].moveNames[move] = value; 
    team[slot].moves[move] = info.type || ''; 
    team[slot].moveCats[move] = info.cat || ''; 
    saveTeam(); 
    renderTeamSlots() 
}
function setMeta(slot, field, value) { team[slot][field] = value; saveTeam(); if (field === 'nature' || field === 'teraType' || field === 'item') renderTeamSlots() }
function natureClass(nature, stat) { const e = TEAM_NATURE_EFFECTS[nature]; if (!e) return ''; return e[0] === stat ? 'boost' : e[1] === stat ? 'drop' : '' }
function clearSlot(i) { team[i] = EMPTY_SLOT(); saveTeam(); renderTeamSlots() }

function getRoleForSlot(slot, p) {
    const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[p.id]) || { hp: 80, atk: 80, def: 80, spa: 80, spd: 80, spe: 80 };
    const atk = (Number(bs.atk) || 80) + (Number(slot.ev?.ATK) || 0) / 4;
    const spa = (Number(bs.spa) || 80) + (Number(slot.ev?.SPATK) || 0) / 4;
    const bulk = (Number(bs.hp) || 80) + (Number(bs.def) || 80) + (Number(bs.spd) || 80);
    const offense = atk + spa + (Number(bs.spe) || 80);
    if (bulk > offense * 1.15) return 'tank';
    if (atk > spa * 1.15) return 'physical';
    if (spa > atk * 1.15) return 'special';
    return 'mixed';
}

function getRecommendedBuild(slot, p) {
    const role = getRoleForSlot(slot, p);
    const ab   = (slot.ability || '').toLowerCase().replace(/[^a-z]/g, '');
    const types = p.types || [];
    const bs   = (typeof BASE_STATS !== 'undefined' && BASE_STATS[p.id]) || {};
    const spe  = Number(bs.spe) || 70;
    const def  = Number(bs.def) || 70;
    const spd  = Number(bs.spd) || 70;
    const atk  = Number(bs.atk) || 70;
    const spa  = Number(bs.spa) || 70;

    // --- Item selection (ability-aware first, then type/role defaults) ---
    let item;
    if      (ab === 'poisonheal')                                      item = 'Toxic Orb';
    else if (ab === 'guts')                                            item = 'Flame Orb';
    else if (ab === 'magicguard')                                      item = role === 'tank' ? 'Leftovers' : 'Life Orb';
    else if (ab === 'regenerator' || ab === 'multiscale' || ab === 'shadowshield') item = 'Leftovers';
    else if (ab === 'sturdy')                                          item = 'Leftovers';
    else if (['swiftswim','chlorophyll','sandrush','slushrush','speedboost','drizzle','drought','sandstream','snowwarning'].includes(ab)) item = 'Life Orb';
    else if (role === 'physical') item = spe >= 100 ? 'Choice Band'  : 'Life Orb';
    else if (role === 'special')  item = spe >= 100 ? 'Choice Specs' : 'Life Orb';
    else if (role === 'tank')     item = types.includes('poison') ? 'Black Sludge' : 'Leftovers';
    else                          item = 'Heavy-Duty Boots'; // mixed

    // --- Nature selection (speed-aware) ---
    let nature;
    if      (role === 'physical') nature = spe >= 100 ? 'Jolly'    : 'Adamant';
    else if (role === 'special')  nature = spe >= 100 ? 'Timid'    : 'Modest';
    else if (role === 'tank')     nature = spa > atk  ? 'Calm'     : 'Careful';
    else                          nature = 'Naive'; // mixed

    // --- EV spread (role + stat-profile aware) ---
    let ev;
    if (role === 'physical') {
        ev = spe >= 100
            ? { HP: '4',   ATK: '252', DEF: '',    SPATK: '',    SPDEF: '',    SPD: '252' }  // fast physical
            : { HP: '252', ATK: '252', DEF: '',    SPATK: '',    SPDEF: '4',   SPD: '' };   // bulky physical
    } else if (role === 'special') {
        ev = spe >= 100
            ? { HP: '4',   ATK: '',    DEF: '',    SPATK: '252', SPDEF: '',    SPD: '252' }  // fast special
            : { HP: '252', ATK: '',    DEF: '4',   SPATK: '252', SPDEF: '',    SPD: '' };   // bulky special
    } else if (role === 'tank') {
        ev = def > spd
            ? { HP: '252', ATK: '',    DEF: '252', SPATK: '',    SPDEF: '4',   SPD: '' }    // physical wall
            : { HP: '252', ATK: '',    DEF: '4',   SPATK: '',    SPDEF: '252', SPD: '' };   // special wall
    } else {
        ev =  { HP: '4',   ATK: '124', DEF: '',    SPATK: '128', SPDEF: '',    SPD: '252' }; // mixed
    }

    return { role, nature, item, ev };
}

function applyRecommendedBuild(slotIndex) {
    const slot = team[slotIndex];
    const p = POKE.find(x => x.id === slot.pokemonId);
    if (!slot || !p) return;
    const rec = getRecommendedBuild(slot, p);
    team[slotIndex].nature = rec.nature;
    team[slotIndex].item = rec.item;
    TEAM_STATS.forEach(st => { team[slotIndex].ev[st] = rec.ev[st] || ''; });
    saveTeam();
    renderTeamSlots();
}
function calcTeam() { 
    return team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) }))
        .filter(x => x.slot.pokemonId && x.slot.calc && x.p)
        // NEW: Sort selected Pokémon by AI Score (Descending order)
        .sort((a, b) => (b.slot.aiScore || 0) - (a.slot.aiScore || 0))
        .slice(0, 6); 
}

function toggleCalc(i) { if (!team[i].pokemonId) return; if (!team[i].calc && calcTeam().length >= 6) { alert('You can calculate up to 6 Pokémon at a time.'); return } team[i].calc = !team[i].calc; saveTeam(); renderTeamSlots() }

window.compareTeamIndex = Number(localStorage.getItem('tb_compareTeamIndex') || -1);
window.setCompareTeamIndex = function(idx) {
    window.compareTeamIndex = Number(idx);
    localStorage.setItem('tb_compareTeamIndex', String(window.compareTeamIndex));
    renderTeamSlots();
};

function ensureCompareTeamIndex() {
    if (!allData?.teams || allData.teams.length < 2) return;
    if (!allData.teams[window.compareTeamIndex] || window.compareTeamIndex === currentTeamIndex) {
        const fallback = allData.teams.findIndex((_, idx) => idx !== currentTeamIndex);
        window.compareTeamIndex = fallback;
        localStorage.setItem('tb_compareTeamIndex', String(fallback));
    }
}

function getTeamSnapshot(slots) {
    const filled = (slots || []).filter(s => s && s.pokemonId);
    const mons = filled.map(slot => ({ slot, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.p);
    const avgSpeed = mons.length ? Math.round(mons.reduce((sum, x) => {
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[x.p.id]) || { spe: 70 };
        return sum + getEffectiveSpeedStat(Number(bs.spe) || 70, x.slot, { side: 'me', types: x.p.types });
    }, 0) / mons.length) : 0;
    const avgBst = mons.length ? Math.round(mons.reduce((sum, x) => {
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[x.p.id]) || {};
        return sum + ['hp','atk','def','spa','spd','spe'].reduce((acc, key) => acc + (Number(bs[key]) || 0), 0);
    }, 0) / mons.length) : 0;
    const moveNames = mons.flatMap(x => x.slot.moveNames || []).filter(Boolean).map(x => String(x).toLowerCase());
    const uniqueTypes = new Set(mons.flatMap(x => x.p.types || []));
    return {
        count: mons.length,
        avgSpeed,
        avgBst,
        uniqueTypes: uniqueTypes.size,
        hazards: moveNames.filter(m => ['stealth-rock','spikes','toxic-spikes','sticky-web'].includes(m)).length,
        pivots: moveNames.filter(m => ['u-turn','volt-switch','flip-turn','parting-shot'].includes(m)).length,
        recovery: moveNames.filter(m => ['recover','roost','slack-off','soft-boiled','wish','moonlight','morning-sun','shore-up'].includes(m)).length,
        status: moveNames.filter(m => ['toxic','will-o-wisp','thunder-wave','spore','sleep-powder','glare','leech-seed'].includes(m)).length
    };
}

function getTeamComparisonHTML() {
    if (!allData?.teams || allData.teams.length < 2) return '';
    const compareIdx = allData.teams[window.compareTeamIndex] && window.compareTeamIndex !== currentTeamIndex ? window.compareTeamIndex : -1;
    if (compareIdx < 0) return '';
    const options = allData.teams.map((entry, idx) => idx === currentTeamIndex ? '' : `<option value="${idx}" ${idx === compareIdx ? 'selected' : ''}>${entry.name}</option>`).join('');
    const activeSnap = getTeamSnapshot(team);
    const other = allData.teams[compareIdx];
    const otherSnap = getTeamSnapshot(other.slots);
    const rows = [
        ['Filled slots', activeSnap.count, otherSnap.count],
        ['Avg speed', activeSnap.avgSpeed, otherSnap.avgSpeed],
        ['Avg BST', activeSnap.avgBst, otherSnap.avgBst],
        ['Unique types', activeSnap.uniqueTypes, otherSnap.uniqueTypes],
        ['Pivot tools', activeSnap.pivots, otherSnap.pivots],
        ['Recovery tools', activeSnap.recovery, otherSnap.recovery],
        ['Status tools', activeSnap.status, otherSnap.status],
        ['Hazard tools', activeSnap.hazards, otherSnap.hazards]
    ];
    return `<div style="margin:10px 0; padding:12px 14px; background:rgba(77,171,247,0.08); border:1px solid rgba(77,171,247,0.35); border-radius:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            <strong style="color:#4dabf7; font-size:13px;">🆚 Saved Team Comparison</strong>
            <select onchange="window.setCompareTeamIndex(this.value)" style="background:var(--bg); border:1px solid var(--brd); border-radius:6px; color:var(--txt); font:800 11px 'Nunito',sans-serif; padding:6px 8px;">
                ${options}
            </select>
        </div>
        <div style="display:grid; grid-template-columns:minmax(110px,1fr) repeat(2,minmax(70px,1fr)); gap:6px; font-size:11px;">
            <span style="color:var(--dim); font-weight:900;">Metric</span>
            <span style="color:#63d471; font-weight:900;">${allData.teams[currentTeamIndex].name}</span>
            <span style="color:#ff6b6b; font-weight:900;">${other.name}</span>
            ${rows.map(([label, mine, theirs]) => `<span style="color:var(--txt);">${label}</span><span style="color:${Number(mine) >= Number(theirs) ? '#63d471' : 'var(--txt)'}; font-weight:800;">${mine}</span><span style="color:${Number(theirs) >= Number(mine) ? '#ff6b6b' : 'var(--txt)'}; font-weight:800;">${theirs}</span>`).join('')}
        </div>
    </div>`;
}

function calcPanel() { 
    const selected = calcTeam(); 

    // Safe call to the Opponent UI
    const oppUI = window.getOpponentUI ? window.getOpponentUI() : '';
    const matchupsUI = window.getMatchupsUI ? window.getMatchupsUI(selected) : '';

    // --- EMPTY STATE (When no Pokémon have been selected for Calculate) ---
    if (!selected.length) { 
        return `<div class="calcPanel" style="height: auto !important; min-height: max-content !important; overflow: visible !important; padding-bottom: 20px;">
            <div class="calcHead"><strong>Battle Calculate</strong><span>0/6 selected</span></div>
            <div class="calcEmpty" style="margin-bottom: 15px;">Use "Add to calculate" on up to 6 Pokémon from your slots.</div>
            <!-- The Red Button at the BOTTOM -->
            ${oppUI}
        </div>`; 
    } 
    
    const moveEntries = selected.flatMap(x => x.slot.moves.map((type, i) => ({ type, cat: x.slot.moveCats[i] || '', name: x.p.name })).filter(m => m.type)); 
    const damaging = moveEntries.filter(m => m.cat !== 'status'); 
    const scored = damaging.filter(m => m.cat === 'physical' || m.cat === 'special'); 
    const coverageMoves = scored.length ? scored : damaging; 
    const moveTypes = [...new Set(coverageMoves.map(m => m.type))]; 
    const typeCoverage = moveTypes.length ? AT.map(t => ({ t, best: Math.max(...moveTypes.map(m => EFF[m][t] ?? 1)) })) : AT.map(t => ({ t, best: 0 })); 
    const strong = typeCoverage.filter(x => x.best > 1); 
    const struggle = moveTypes.length ? typeCoverage.filter(x => x.best <= 1) : []; 
    
    const threats = AT.map(t => { 
        const hits = selected.map(x => ({ name: x.p.name, m: getDynamicMult(t, x.p.types, x.slot.ability) })).filter(x => x.m > 1); 
        return { t, hits, count: hits.length, max: hits.reduce((a, x) => Math.max(a, x.m), 1) } 
    }).filter(x => x.count).sort((a, b) => b.count - a.count || b.max - a.max || a.t.localeCompare(b.t)); 
    
    const defenseSafe = AT.filter(t => selected.some(x => getDynamicMult(t, x.p.types, x.slot.ability) < 1));
    const offenseScore = strong.length, defenseScore = defenseSafe.length; 
    
    const missingCoverage = struggle.map(x => x.t); 
    const sharedWeak = threats.filter(x => x.count >= Math.max(2, Math.ceil(selected.length / 2))).map(x => x.t); 
    const x4Threats = threats.filter(x => x.max >= 4).map(x => x.t); 
    
    const physicalCount = scored.filter(m => m.cat === 'physical').length;
    const specialCount = scored.filter(m => m.cat === 'special').length;
    const statusCount = moveEntries.filter(m => m.cat === 'status').length;
    const uncategorized = moveEntries.filter(m => !m.cat).length; 
    
    const notes = []; 
    if (uncategorized) notes.push(`Set Physical/Special/Status on ${uncategorized} move${uncategorized > 1 ? 's' : ''} for a more accurate score.`); 
    if (scored.length && physicalCount === 0) notes.push('No physical attacking pressure selected.'); 
    if (scored.length && specialCount === 0) notes.push('No special attacking pressure selected.'); 
    if (moveTypes.length && missingCoverage.length) notes.push(`Missing coverage: ${missingCoverage.slice(0, 8).join(', ')}${missingCoverage.length > 8 ? '...' : ''}`); 
    if (sharedWeak.length) notes.push(`Many team members are weak to: ${sharedWeak.slice(0, 6).join(', ')}`); 
    if (x4Threats.length) notes.push(`Watch x4 weaknesses from: ${x4Threats.slice(0, 6).join(', ')}`); 
    if (moveTypes.length && !notes.length) notes.push('Coverage and attack categories look balanced for the selected team.'); 
    
    const chips = list => list.length ? list.map(x => tb(x.t || x, 'calcBadge')).join('') : '<span class="calcNone">none</span>'; 
    const threatHtml = threats.length ? threats.slice(0, 10).map(x => `<span class="calcThreat" style="border-color:${TC[x.t] || '#888'}"><span style="background:${TC[x.t] || '#888'}">${x.t}</span>${x.count} weak${x.max >= 4 ? ` · x${x.max}` : ''}</span>`).join('') : '<span class="calcNone">No obvious type weaknesses.</span>'; 
    
const selectedHtml = `<div class="calcSelected" style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin: 15px 0;">
        ${selected.map(x => `
            <div style="display:flex; flex-direction:column; align-items:center; background:var(--bg); border:1px solid var(--brd); border-radius:8px; padding:8px; min-width:70px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ${spriteImg(x.p)}
                <span style="font-size:11px; font-weight:bold; margin-top:6px; color:var(--txt); text-align:center;">${x.p.name.replace(/-/g, ' ')}</span>
                ${x.slot.aiScore ? `<span style="font-size:10px; color:#ffc107; background:rgba(255,193,7,0.1); padding:3px 6px; border-radius:8px; margin-top:5px; border:1px solid rgba(255,193,7,0.3); font-weight:bold;" title="AI Draft Score">🏆 ${x.slot.aiScore}</span>` : ''}
            </div>
        `).join('')}
    </div>`;

// --- FILLED STATE (When you have selected Pokémon) ---
    // Analytics (Archetype, Speed Control, Meta Threats)
    const archetypeHTML   = (typeof getArchetypeHTML  === 'function') ? getArchetypeHTML(selected)  : '';
    const speedWarnHTML   = (typeof getSpeedWarningHTML === 'function') ? getSpeedWarningHTML(selected) : '';
    const battleContextHTML = (typeof getBattleContextHTML === 'function') ? getBattleContextHTML() : '';
    const metaThreatHTML  = (typeof getMetaThreatHTML  === 'function') ? getMetaThreatHTML(selected)  : '';
    const matchupSummaryHTML = (typeof getMatchupSummaryHTML === 'function') ? getMatchupSummaryHTML(selected) : '';
    const statCompareHTML = (typeof getStatComparisonHTML === 'function') ? getStatComparisonHTML(selected) : '';
    const teraDefenseHTML = (typeof getTeraDefenseHTML === 'function') ? getTeraDefenseHTML(selected) : '';
    const teamCompareHTML = getTeamComparisonHTML();
    // Team-Level Intelligence panels
    const winConditionHTML   = (typeof getWinConditionHTML   === 'function') ? getWinConditionHTML(selected)   : '';
    const defensiveCoreHTML  = (typeof getDefensiveCoreHTML  === 'function') ? getDefensiveCoreHTML(selected)  : '';
    const roleRedundancyHTML = (typeof getRoleRedundancyHTML === 'function') ? getRoleRedundancyHTML(selected) : '';
    const leadPairHTML       = (typeof getLeadPairHTML       === 'function') ? getLeadPairHTML(selected)       : '';
    const scenarioHTML       = (typeof getScenarioSimulatorHTML === 'function') ? getScenarioSimulatorHTML(selected) : '';

    return `<div class="calcPanel" style="height: auto !important; min-height: max-content !important; overflow: visible !important; padding-bottom: 20px;">
        <div class="calcHead"><strong>Battle Calculate</strong><span>${selected.length}/6 selected</span></div>
        
        <!-- Archetype & Speed Control -->
        ${archetypeHTML}
        ${speedWarnHTML}
        ${battleContextHTML}
        ${teamCompareHTML}
        ${matchupSummaryHTML}

        <!-- Team-Level Intelligence -->
        ${winConditionHTML}
        ${defensiveCoreHTML}
        ${roleRedundancyHTML}
        ${leadPairHTML}
        ${scenarioHTML}

        <!-- Stat Comparison (My Team + Opponent Max) -->
        ${statCompareHTML}

        <!-- THE NEW BUTTON FOR MOVES (Move Optimizer) -->
        <div style="display:flex; gap:8px; margin-top:10px; margin-bottom:15px;">
            <button onclick="showMoveRecommendations()" style="flex:1; padding:10px; background:#4dabf7; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:13px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;">
                💡 Optimizer
            </button>
            <button onclick="copyTeamReport()" style="flex:1; padding:10px; background:rgba(177,151,252,0.12); color:#b197fc; border:1px solid #b197fc; border-radius:8px; font-weight:bold; cursor:pointer; font-size:13px; transition: 0.2s;">
                📤 Export Report
            </button>
        </div>

        <div class="calcScores">
            <div><span>Offense</span><strong>${offenseScore}/18</strong></div>
            <div><span>Defense</span><strong>${defenseScore}/18</strong></div>
            <div><span>Physical</span><strong>${physicalCount}</strong></div>
            <div><span>Special</span><strong>${specialCount}</strong></div>
        </div>
        <div class="calcNotes">${notes.length ? notes.map(n => `<p>${n}</p>`).join('') : '<p>Choose move types first to score offense.</p>'}</div>
        ${selectedHtml}
        <div class="calcRows">
            <div><b>Attack advantage</b><div class="calcBadges">${moveTypes.length ? chips(strong) : '<span class="calcNone">Choose damaging move types first.</span>'}</div></div>
            <div><b>Attack struggles</b><div class="calcBadges">${moveTypes.length ? chips(struggle) : '<span class="calcNone">Choose damaging move types first.</span>'}</div></div>
            <div><b>Defensive threats</b><div class="calcBadges">${threatHtml}</div></div>
        </div>

        <!-- Meta Threat Check -->
        ${metaThreatHTML}

        <!-- Tera Defense Impact -->
        ${teraDefenseHTML}
        
        <!-- The Red Button and Counters at the BOTTOM -->
        ${oppUI}
        ${matchupsUI}
    </div>`;
}

function renderCalculatorView() {
    const el = document.getElementById('calcViewContent');
    if (!el) return;
    el.innerHTML = `<div style="border:1px solid var(--brd); background:var(--surf2); border-radius:8px; padding:10px 12px; font-size:12px; color:var(--dim); font-weight:800;">
        Battle Calculator reads your current Team Builder data live. Use <b style="color:var(--yel);">Add to calc</b> in Team Builder, then review all calculator insights here.
        <button type="button" onclick="openTeam()" style="margin-left:10px; border:1px solid var(--yel); background:rgba(255,204,0,.1); color:var(--yel); border-radius:50px; padding:5px 10px; font:900 11px 'Nunito',sans-serif; cursor:pointer;">Open Team Builder</button>
    </div>${calcPanel()}`;
}

function renderTeamList() { 
    const el = document.getElementById('teamList'), q = teamQuery.toLowerCase().trim(); 
    const list = POKE.filter(p => !q || p.name.replace(/-/g, ' ').includes(q) || String(p.id).includes(q) || p.types.some(t => t.includes(q))).slice(0, 160); 
    el.innerHTML = list.map(p => `<button class="pickMon" type="button" data-id="${p.id}">${spriteImg(p)}<span><span class="pickName">#${String(p.id).padStart(4, '0')} ${p.name.replace(/-/g, ' ')}</span><span class="pickTypes">${p.types.map(t => tb(t)).join('')}</span></span></button>`).join('') || '<div class="emptyTeam">No Pokémon found.</div>';
}

function renderTeamSlots() { 
    const el = document.getElementById('teamSlots'), filled = team.map((slot, i) => ({ slot, i })).filter(x => x.slot.pokemonId); 
    if (!filled.length) { 
        el.innerHTML = '<div class="emptyTeam">No Pokémon in your team yet.</div>'; 
        if (document.body.classList.contains('calc-view')) renderCalculatorView();
        return;
    } 
    
    const moveCategories = {
        physical: '<img src="https://play.pokemonshowdown.com/sprites/categories/Physical.png" title="Physical Attack" alt="Physical" style="height:14px; image-rendering:pixelated; box-shadow:0 1px 2px rgba(0,0,0,0.4); border-radius:2px; cursor:help;">',
        special: '<img src="https://play.pokemonshowdown.com/sprites/categories/Special.png" title="Special Attack" alt="Special" style="height:14px; image-rendering:pixelated; box-shadow:0 1px 2px rgba(0,0,0,0.4); border-radius:2px; cursor:help;">',
        status: '<img src="https://play.pokemonshowdown.com/sprites/categories/Status.png" title="Status Move" alt="Status" style="height:14px; image-rendering:pixelated; box-shadow:0 1px 2px rgba(0,0,0,0.4); border-radius:2px; cursor:help;">'
    };

    el.innerHTML = filled.map(({ slot, i }, displayIndex) => { 
        const p = POKE.find(x => x.id === slot.pokemonId); 
        if (!p) return ''; 
        const bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[p.id]) || {};
        const bst = ['hp','atk','def','spa','spd','spe'].reduce((s, k) => s + (Number(bs[k]) || 0), 0);
        const bstColor = bst >= 600 ? '#ffd43b' : bst >= 500 ? '#63d471' : bst >= 400 ? '#4dabf7' : 'var(--dim)';
        const assassinScore = (window.oppTeam && window.oppTeam.length > 0 && typeof window.calcAssassinScore === 'function')
            ? window.calcAssassinScore({ slot, p })
            : null;
        const scoreBadge = assassinScore !== null
            ? `<span title="Counter Score vs Opponent Team" style="font-size:9px; font-weight:900; color:${assassinScore > 100 ? '#63d471' : assassinScore > 0 ? '#ffc107' : '#ff6b6b'}; background:${assassinScore > 100 ? '#63d47122' : assassinScore > 0 ? '#ffc10722' : '#ff6b6b22'}; border:1px solid ${assassinScore > 100 ? '#63d47155' : assassinScore > 0 ? '#ffc10755' : '#ff6b6b55'}; border-radius:8px; padding:2px 5px; flex-shrink:0;">⚔️ ${assassinScore}</span>`
            : '';
        const head = `<div class="slotHead">${spriteImg(p)}<div><div class="slotNum">Team ${displayIndex + 1}/${TEAM_SIZE} · #${String(p.id).padStart(4, '0')}${bst ? ` · <span title="Base Stat Total" style="color:${bstColor}; font-weight:900;">BST ${bst}</span>` : ''}</div><div class="slotName">${p.name.replace(/-/g, ' ')}</div><div class="slotTypes">${p.types.map(t => tb(t)).join('')}</div></div><div class="slotActions" style="margin-left:auto;">${scoreBadge}<button class="calcToggle ${slot.calc ? 'on' : ''}" type="button" data-calc="${i}">${slot.calc ? 'In calculate' : 'Add to calc'}</button><button class="clearSlot" type="button" data-clear="${i}" title="Clear slot">×</button></div></div>`; 
        
        const rec = getRecommendedBuild(slot, p);
        const teraOptions = (typeof AT !== 'undefined' ? AT : []);
        const meta = `<div class="metaGrid" style="margin-bottom: 12px;">
            <label>Level
                <input type="number" min="1" max="100" value="${slot.level}" data-slot="${i}" data-field="level" style="width:100%; box-sizing:border-box; background:var(--bg); border:1px solid var(--brd); border-radius:7px; color:var(--txt); font:800 12px 'Nunito',sans-serif; padding:6px; outline:none; text-align:center;">
            </label>
            <label>Nature<select data-slot="${i}" data-field="nature"><option value="">Select nature</option>${TEAM_NATURES.map(n => `<option value="${n}" ${slot.nature === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
            <label>Ability<select data-slot="${i}" data-field="ability"><option value="">Select ability</option>${(ABILITIES[String(p.id)] || []).map(a => `<option value="${a}" ${slot.ability === a ? 'selected' : ''}>${a.replace(/-/g, ' ')}</option>`).join('')}</select></label>
            <label>Item<select data-slot="${i}" data-field="item"><option value="">No item</option>${HELD_ITEMS.map(item => `<option value="${item}" ${slot.item === item ? 'selected' : ''}>${item}</option>`).join('')}</select></label>
            <label>Tera Type<select data-slot="${i}" data-field="teraType"><option value="">No tera</option>${teraOptions.map(t => `<option value="${t}" ${slot.teraType === t ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
            <label style="justify-content:flex-end;">
                <button class="teamTool" type="button" data-auto-build="${i}" style="padding:7px 10px; font-size:11px; border-color:#63d471; color:#63d471; background:rgba(99,212,113,0.08); width:100%;">⚙️ EV/Nature Optimize</button>
            </label>
        </div>`; 
        const recHint = `<div style="margin:-6px 0 10px; font-size:11px; color:var(--dim); display:flex; flex-wrap:wrap; gap:6px; align-items:center;">
            <span>Role: <b style="color:#4dabf7; text-transform:capitalize;">${rec.role}</b></span>
            <span>·</span>
            <span>Nature: <b style="color:#63d471;">${rec.nature}</b></span>
            <span>·</span>
            <span>Item: <b style="color:#ffc107;">${rec.item}</b></span>
            ${slot.teraType ? `<span>·</span><span>Tera: <b style="color:#cc5de8;">${slot.teraType}</b></span>` : ''}
            ${slot.ability ? `<span>·</span><span>Ability: <b style="color:var(--txt);">${slot.ability.replace(/-/g,' ')}</b></span>` : ''}
        </div>`;
        
        const stats = `<div class="statGrid" style="margin-bottom: 15px;">` + TEAM_STATS.map(st => { const nc = natureClass(slot.nature, st), ivClass = nc ? `iv${nc[0].toUpperCase() + nc.slice(1)}` : ""; return `<div class="statBox ${nc}"><label>${st}</label><div class="statInputs"><span>IV</span><span>EV</span><input class="${ivClass}" type="number" min="0" max="31" value="${slot.iv[st]}" data-slot="${i}" data-kind="iv" data-stat="${st}" placeholder="0"><input type="number" min="0" max="252" value="${slot.ev[st]}" data-slot="${i}" data-kind="ev" data-stat="${st}" placeholder="0"></div></div>` }).join('') + `</div>`; 
        
        const moveList = MOVES_BY_POKEMON[String(p.id)] || [];
        
        const moves = `<div class="movesGrid" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">${[0, 1, 2, 3].map(m => {
            const moveName = slot.moveNames[m] || '';
            const moveType = slot.moves[m] || '';
            const moveCat = slot.moveCats[m] || '';
            
            const typeHtml = moveType ? tb(moveType) : '<span class="cat-badge cat-empty">Type</span>';
            const catHtml = moveCat && moveCategories[moveCat] ? moveCategories[moveCat] : '<span class="cat-badge cat-empty">Cat</span>';

            let statsHtml = '';
            if (moveName && typeof MOVE_INFO !== 'undefined' && MOVE_INFO[moveName]) {
                const power = MOVE_INFO[moveName].power;
                const acc = MOVE_INFO[moveName].acc;
                
                const displayPwr = power === undefined ? '??' : (power === 0 ? '-' : power);
                const displayAcc = acc === undefined ? '??' : ((acc === 0 || acc === null) ? '-' : acc);
                
                statsHtml = `<span style="margin-left:auto; font-size:11px; opacity:0.8; font-family:monospace; color:var(--txt);">Pwr: <b>${displayPwr}</b> | Acc: <b>${displayAcc}</b></span>`;
            }

            return `<div class="movePair" style="display:flex; flex-direction:column; min-width:0;">
                <label style="display:flex; flex-direction:column; width:100%;">Move ${m + 1}
                    <select data-slot="${i}" data-move-name="${m}" title="${moveName ? moveName.replace(/-/g, ' ') : ''}" style="width:100%; box-sizing:border-box; text-overflow:ellipsis; margin-top:4px; padding:4px;">
                        <option value="">Select move...</option>
                        ${moveList.map(name => {
                            if(!name) return '';
                            return `<option value="${name}" ${moveName === name ? 'selected' : ''}>${name.replace(/-/g, ' ')}</option>`;
                        }).join('')}
                    </select>
                </label>
                <div class="moveInfo" style="display:flex; align-items:center; gap:6px; margin-top:6px;">
                    ${typeHtml}
                    ${catHtml}
                    ${statsHtml}
                </div>
            </div>`;
        }).join('')}</div>`; 
        
        // The secret is the `style="height: auto; min-height: max-content; padding-bottom: 20px;"` on the card!
        return `<article class="slot" style="height: auto !important; min-height: max-content !important; overflow: visible; padding-bottom: 20px;">${head}${meta}${recHint}${stats}${moves}</article>` 
    }).join('');
    if (document.body.classList.contains('calc-view')) renderCalculatorView();
}

function setView(view) { 
    const teamView = view === 'team';
    const calcView = view === 'calc';
    const dexView = !teamView && !calcView;
    document.body.classList.toggle('team-view', teamView); 
    document.body.classList.toggle('calc-view', calcView);
    document.body.classList.toggle('dex-view', dexView); 
    document.getElementById('myTeamBtn').classList.toggle('on', teamView); 
    document.getElementById('dexViewBtn').classList.toggle('on', dexView);
    document.getElementById('calcViewBtn').classList.toggle('on', calcView);
    document.getElementById('teamOverlay').setAttribute('aria-hidden', teamView ? 'false' : 'true');
    document.getElementById('calcOverlay').setAttribute('aria-hidden', calcView ? 'false' : 'true');
    
    if (teamView) { 
        ensureCompareTeamIndex();
        renderTeamList(); 
        renderTeamSlots(); 
        updateTeamDropdown(); 
    }
    if (calcView) renderCalculatorView();
}

function openTeam() { setView('team') }
function closeTeam() { setView('dex') }
function openDex() { setView('dex'); if(typeof renderDex === 'function') renderDex() }
function openCalc() { setView('calc') }
function closeCalc() { setView('dex') }

// --- Event Listeners Setup ---
document.getElementById('myTeamBtn').addEventListener('click', openTeam); 
document.getElementById('dexViewBtn').addEventListener('click', openDex); 
document.getElementById('calcViewBtn').addEventListener('click', openCalc);
document.getElementById('teamExport').addEventListener('click', exportTeam); 
document.getElementById('teamImport').addEventListener('change', e => { importTeamFile(e.target.files[0]); e.target.value = '' }); 
document.getElementById('teamClose').addEventListener('click', closeTeam); 
document.getElementById('calcClose')?.addEventListener('click', closeCalc);
document.getElementById('teamOverlay').addEventListener('click', e => { if (e.target.id === 'teamOverlay' && document.body.classList.contains('team-view')) closeTeam() }); 
document.getElementById('calcOverlay')?.addEventListener('click', e => { if (e.target.id === 'calcOverlay' && document.body.classList.contains('calc-view')) closeCalc() });
document.getElementById('teamSearch').addEventListener('input', e => { teamQuery = e.target.value; renderTeamList() }); 
document.getElementById('teamList').addEventListener('click', e => { const btn = e.target.closest('.pickMon'); if (btn) addToTeam(Number(btn.dataset.id)) }); 

document.getElementById('teamSlots').addEventListener('input', e => { 
    if (e.target.matches('input[data-slot][data-kind]')) {
        setStat(Number(e.target.dataset.slot), e.target.dataset.kind, e.target.dataset.stat, e.target.value, e.target);
    } else if (e.target.matches('input[data-field="level"]')) {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 100) val = 100;
        setMeta(Number(e.target.dataset.slot), 'level', val);
    }
});

document.getElementById('teamSlots').addEventListener('change', e => { 
    if (e.target.matches('select[data-field]')) setMeta(Number(e.target.dataset.slot), e.target.dataset.field, e.target.value); 
    if (e.target.matches('select[data-move-name]')) setMoveName(Number(e.target.dataset.slot), Number(e.target.dataset.moveName), e.target.value); 
    if (e.target.matches('select[data-move]')) setMoveType(Number(e.target.dataset.slot), Number(e.target.dataset.move), e.target.value); 
    if (e.target.matches('select[data-move-cat]')) setMoveCat(Number(e.target.dataset.slot), Number(e.target.dataset.moveCat), e.target.value);
}); 

document.getElementById('teamSlots').addEventListener('click', e => { 
    const calc = e.target.closest('[data-calc]'); 
    if (calc) { toggleCalc(Number(calc.dataset.calc)); return } 
    const btn = e.target.closest('[data-clear]'); 
    if (btn) { clearSlot(Number(btn.dataset.clear)); return; }
    const build = e.target.closest('[data-auto-build]');
    if (build) applyRecommendedBuild(Number(build.dataset.autoBuild));
}); 

document.addEventListener('keydown', e => { if (e.key === 'Escape' && !document.body.classList.contains('dex-view')) setView('dex') });

document.getElementById('teamSelect')?.addEventListener('change', e => {
    currentTeamIndex = Number(e.target.value);
    team = allData.teams[currentTeamIndex].slots;
    ensureCompareTeamIndex();
    saveTeam();
    renderTeamSlots();
});

document.getElementById('addTeamBtn')?.addEventListener('click', () => {
    const name = prompt('Name for the new team (e.g. PvP, Catchers, Farm):', 'New Team');
    if (name) {
        allData.teams.push({ name: name, slots: Array.from({ length: TEAM_SIZE }, () => EMPTY_SLOT()) });
        currentTeamIndex = allData.teams.length - 1;
        team = allData.teams[currentTeamIndex].slots;
        ensureCompareTeamIndex();
        saveTeam();
        updateTeamDropdown();
        renderTeamSlots();
    }
});

document.getElementById('renameTeamBtn')?.addEventListener('click', () => {
    const name = prompt('New name for this team:', allData.teams[currentTeamIndex].name);
    if (name) {
        allData.teams[currentTeamIndex].name = name;
        saveTeam();
        updateTeamDropdown();
    }
});

document.getElementById('teamReset').addEventListener('click', () => { 
    if (!confirm('Clear this team?')) return; 
    team = Array.from({ length: TEAM_SIZE }, () => EMPTY_SLOT()); 
    saveTeam(); 
    renderTeamSlots(); 
});

document.getElementById('autoTeamBtn')?.addEventListener('click', autoRecommendTeam);

document.getElementById('bossesBtn')?.addEventListener('click', () => {
    if (typeof window.openBossesModal === 'function') window.openBossesModal();
});

// Inject Showdown Paste Button dynamically
(function injectPasteButton() {
    const autoBtn = document.getElementById('autoTeamBtn');
    if (!autoBtn) return;
    const btn = document.createElement('button');
    btn.className = 'teamTool';
    btn.type = 'button';
    btn.id = 'sdPasteBtn';
    btn.textContent = '📋 Paste Pokemon';
    btn.style.cssText = 'border-color:#4dabf7; color:#4dabf7; background:rgba(77,171,247,0.1); margin-right: 5px;';
    btn.addEventListener('click', () => window._openShowdownModal && window._openShowdownModal());
    autoBtn.parentNode.insertBefore(btn, autoBtn);
})();

// Start initialization
openTeam();

// THE ULTIMATE FIX FOR SHIFT+F5:
// Forces the browser to re-render the UI ONLY AFTER all files have loaded 100%.
window.addEventListener('load', () => {
    if (typeof renderTeamSlots === 'function') {
        renderTeamSlots();
    }
});
