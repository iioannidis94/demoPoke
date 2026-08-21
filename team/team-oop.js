// --- team-opp.js : Opponent Team Logic (Assassin Mode with Base Stats, Moves & Auto-Save) ---

// Load from Local Storage or initialize
// Backwards compatibility: migrate old format (array of IDs) to new format (array of objects)
(function() {
    const raw = JSON.parse(localStorage.getItem('tb_oppTeam')) || [];
    window.oppTeam = raw.map(entry => {
        if (typeof entry === 'number') return { id: entry, ability: '', item: '', level: 50, nature: '', iv: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' }, ev: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' }, moveNames: [], moves: [], moveCats: [] };
        return Object.assign({ ability: '', item: '', level: 50, nature: '', iv: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' }, ev: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' } }, entry);
    });
})();
window.showOppPanel = JSON.parse(localStorage.getItem('tb_showOppPanel')) || false;
window.oppMode = localStorage.getItem('tb_oppMode') || 'custom'; // 'custom' or 'bosses'

// Helper save function
window.saveOpponents = function() {
    localStorage.setItem('tb_oppTeam', JSON.stringify(window.oppTeam));
    localStorage.setItem('tb_showOppPanel', JSON.stringify(window.showOppPanel));
    localStorage.setItem('tb_oppMode', window.oppMode || 'custom');
};

window.toggleOppPanel = function() {
    window.showOppPanel = !window.showOppPanel;
    window.saveOpponents();
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.setOppMode = function(mode) {
    window.oppMode = mode;
    window.saveOpponents();
    if (mode === 'bosses') {
        if (typeof window.openBossesModal === 'function') window.openBossesModal();
        // renderTeamSlots will be called after the boss is loaded via loadBossAsOpponent
        return;
    }
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.searchAndAddOpponent = function() {
    const input = document.getElementById('oppSearchInput').value.toLowerCase().trim();
    if(!input) return;

    const normalizedInput = input.replace(/\s+/g, '-');
    const p = POKE.find(x => 
        x.name.toLowerCase() === normalizedInput || 
        x.name.toLowerCase().replace(/-/g, ' ') === input ||
        x.id.toString() === input ||
        x.name.toLowerCase().includes(normalizedInput)
    );

    if(!p) return alert('Pokémon not found! Try in English (e.g. charizard) or use its ID.');
    if(window.oppTeam.length >= 6) return alert('Opponent team is full (Max 6)!');

    window.oppTeam.push({ id: p.id, ability: '', item: '', level: 50, nature: '', iv: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' }, ev: { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' }, moveNames: [], moves: [], moveCats: [] });
    window.saveOpponents();

    if(document.getElementById('oppSearchInput')) document.getElementById('oppSearchInput').value = '';
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.removeOpponent = function(idx) {
    window.oppTeam.splice(idx, 1);
    window.saveOpponents();
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.clearOpponents = function() {
    window.oppTeam = [];
    window.saveOpponents();
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.setOppMove = function(idx, moveSlot, moveName) {
    const opp = window.oppTeam[idx];
    if (!opp) return;
    opp.moveNames[moveSlot] = moveName;
    const info = (typeof MOVE_INFO !== 'undefined' && moveName) ? (MOVE_INFO[moveName] || {}) : {};
    opp.moves[moveSlot]    = info.type || '';
    opp.moveCats[moveSlot] = info.cat  || '';
    window.saveOpponents();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.setOppAbility = function(idx, ability) {
    const opp = window.oppTeam[idx];
    if (!opp) return;
    opp.ability = ability;
    window.saveOpponents();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.setOppItem = function(idx, item) {
    const opp = window.oppTeam[idx];
    if (!opp) return;
    opp.item = item;
    window.saveOpponents();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.openOpponentSetup = function(idx) {
    const opp = window.oppTeam[idx];
    if (!opp) return;
    const modal = document.getElementById('oppSetupModal');
    const body = document.getElementById('oppSetupBody');
    if (!modal || !body) return;
    const target = POKE.find(p => p.id === opp.id);
    if (!target) return;
    const statInputs = TEAM_STATS.map(stat => `<div style="display:grid; grid-template-columns:52px 1fr 1fr; gap:6px; align-items:center;">
        <span style="font-size:10px; font-weight:900; color:var(--txt);">${stat}</span>
        <input id="opp-iv-${stat}" type="number" min="0" max="31" value="${opp.iv?.[stat] ?? ''}" placeholder="IV" style="background:var(--bg); border:1px solid var(--brd); border-radius:6px; color:var(--txt); padding:6px; font:800 11px 'Nunito',sans-serif;">
        <input id="opp-ev-${stat}" type="number" min="0" max="252" value="${opp.ev?.[stat] ?? ''}" placeholder="EV" style="background:var(--bg); border:1px solid var(--brd); border-radius:6px; color:var(--txt); padding:6px; font:800 11px 'Nunito',sans-serif;">
    </div>`).join('');
    body.innerHTML = `
        <input id="oppSetupIndex" type="hidden" value="${idx}">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            ${spriteImg(target)}
            <strong style="color:#ff6b6b; font-size:15px; text-transform:capitalize;">${target.name.replace(/-/g, ' ')}</strong>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
            <label style="display:flex; flex-direction:column; gap:5px; font-size:11px; color:var(--txt);">Level
                <input id="opp-level" type="number" min="1" max="100" value="${opp.level || 50}" style="background:var(--bg); border:1px solid var(--brd); border-radius:6px; color:var(--txt); padding:6px; font:800 11px 'Nunito',sans-serif;">
            </label>
            <label style="display:flex; flex-direction:column; gap:5px; font-size:11px; color:var(--txt);">Nature
                <select id="opp-nature" style="background:var(--bg); border:1px solid var(--brd); border-radius:6px; color:var(--txt); padding:6px; font:800 11px 'Nunito',sans-serif;">
                    <option value="">Neutral / Unknown</option>
                    ${TEAM_NATURES.map(n => `<option value="${n}" ${opp.nature === n ? 'selected' : ''}>${n}</option>`).join('')}
                </select>
            </label>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">${statInputs}</div>
    `;
    modal.style.display = 'flex';
};

window.saveOpponentSetup = function() {
    const idx = Number(document.getElementById('oppSetupIndex')?.value);
    const opp = window.oppTeam[idx];
    if (!opp) return;
    opp.level = Math.max(1, Math.min(100, Number(document.getElementById('opp-level')?.value) || 50));
    opp.nature = document.getElementById('opp-nature')?.value || '';
    opp.iv = opp.iv || {};
    opp.ev = opp.ev || {};
    TEAM_STATS.forEach(stat => {
        const ivVal = document.getElementById(`opp-iv-${stat}`)?.value ?? '';
        const evVal = document.getElementById(`opp-ev-${stat}`)?.value ?? '';
        opp.iv[stat] = ivVal === '' ? '' : String(Math.max(0, Math.min(31, Number(ivVal) || 0)));
        opp.ev[stat] = evVal === '' ? '' : String(Math.max(0, Math.min(252, Number(evVal) || 0)));
    });
    window.saveOpponents();
    document.getElementById('oppSetupModal').style.display = 'none';
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
};

// Import opponents from Showdown paste (reuses the existing parser from team-io.js)
window.importOpponentsFromShowdown = function(text) {
    if (!text || !text.trim()) return 0;
    if (typeof parseShowdownPaste !== 'function') return 0;
    const slots = parseShowdownPaste(text);
    if (!slots.length) return 0;
    let added = 0;
    for (const slot of slots) {
        if (window.oppTeam.length >= 6) break;
        window.oppTeam.push({
            id: slot.pokemonId,
            ability: slot.ability || '',
            item: slot.item || '',
            level: slot.level || 50,
            nature: slot.nature || '',
            iv: slot.iv || { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' },
            ev: slot.ev || { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' },
            moveNames: slot.moveNames || [],
            moves: slot.moves || [],
            moveCats: slot.moveCats || []
        });
        added++;
    }
    window.saveOpponents();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    return added;
};

// Compare Base Stats & Move Categories
// oppSlotData: { moveNames, moves, moveCats } – optional, enables move-aware scoring
const PIVOT_MOVES = new Set(['u-turn', 'volt-switch', 'flip-turn', 'parting-shot', 'teleport', 'baton-pass']);
const RECOVERY_MOVES = new Set(['recover', 'roost', 'soft-boiled', 'slack-off', 'wish', 'moonlight', 'morning-sun', 'milk-drink', 'synthesis', 'shore-up']);
const STATUS_PRESSURE_MOVES = new Set(['toxic', 'will-o-wisp', 'thunder-wave', 'spore', 'sleep-powder', 'glare', 'leech-seed', 'yawn']);
const HAZARD_MOVES = new Set(['stealth-rock', 'spikes', 'toxic-spikes', 'sticky-web']);
const HAZARD_CONTROL_MOVES = new Set(['rapid-spin', 'defog', 'mortal-spin', 'court-change']);

window.getCombatScore = function(myCandidate, oppP, oppSlotData) {
    let score = 0;
    const PRIORITY_MOVES = new Set(['fake-out', 'sucker-punch', 'bullet-punch', 'ice-shard', 'extreme-speed', 'mach-punch', 'aqua-jet', 'shadow-sneak']);
    const myMoves = (myCandidate.slot.moveNames || []).map(m => String(m || '').toLowerCase()).filter(Boolean);
    const oppMoves = (oppSlotData && oppSlotData.moveNames ? oppSlotData.moveNames : []).map(m => String(m || '').toLowerCase()).filter(Boolean);
    const myRecovery = myMoves.filter(m => RECOVERY_MOVES.has(m)).length;
    const myPivots = myMoves.filter(m => PIVOT_MOVES.has(m)).length;
    const myStatus = myMoves.filter(m => STATUS_PRESSURE_MOVES.has(m)).length;
    const myHazards = myMoves.filter(m => HAZARD_MOVES.has(m)).length;
    const myHazardControl = myMoves.filter(m => HAZARD_CONTROL_MOVES.has(m)).length;

    let opBs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[oppP.id]) ? BASE_STATS[oppP.id] : {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};

    let myBs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[myCandidate.p.id]) ? BASE_STATS[myCandidate.p.id] : {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};
    let myAtk = myBs.atk + Math.floor((Number(myCandidate.slot.ev.ATK) || 0) / 4);
    let mySpa = myBs.spa + Math.floor((Number(myCandidate.slot.ev.SPATK) || 0) / 4);

    // Defensive: how well does my Pokémon resist opponent's STAB types
    oppP.types.forEach(ot => {
        let defMult = multAtkVsTypes(ot, myCandidate.p.types);
        if (defMult > 1) score -= 80;
        if (defMult < 1) score += 40;
        if (defMult === 0) score += 100;
    });

    // Defensive (move-aware): if the opponent's actual moves are known, factor in incoming damage
    if (oppSlotData && Array.isArray(oppSlotData.moves)) {
        oppSlotData.moves.forEach((mType, idx) => {
            if (!mType) return;
            const mCat = oppSlotData.moveCats && oppSlotData.moveCats[idx];
            if (mCat === 'status') return;
            const oppMoveName = ((oppSlotData.moveNames && oppSlotData.moveNames[idx]) || '').toLowerCase();
            const incomingMult = (typeof getDynamicMult === 'function')
                ? getDynamicMult(mType, myCandidate.p.types, myCandidate.slot.ability)
                : multAtkVsTypes(mType, myCandidate.p.types);
            if (incomingMult > 1) score -= 60 * incomingMult;
            if (incomingMult < 1) score += 30;
            if (incomingMult === 0) score += 80;
            if (PRIORITY_MOVES.has(oppMoveName) && incomingMult >= 1) score -= 55;
        });
    }

    // Offensive: score my moves against the opponent
    let bestMoveScore = 0;

    (myCandidate.slot.moveNames || []).forEach(mName => {
        if (!mName) return;
        let mInfo = typeof MOVE_INFO !== 'undefined' ? MOVE_INFO[mName] : null;
        if (!mInfo || mInfo.power === 0) return;

        let offMult = multAtkVsTypes(mInfo.type, oppP.types);
        let moveScore = 0;

        if (offMult > 1) moveScore += 60;
        if (offMult > 2) moveScore += 130;
        if (offMult < 1) moveScore -= 40;

        if (mInfo.cat === 'physical') {
            if (opBs.def > 105) moveScore -= 35;
            if (opBs.def < 70) moveScore += 45;
            if (myAtk > mySpa) moveScore += 20;
        } else if (mInfo.cat === 'special') {
            if (opBs.spd > 105) moveScore -= 35;
            if (opBs.spd < 70) moveScore += 45;
            if (mySpa > myAtk) moveScore += 20;
        }
        if (PRIORITY_MOVES.has(String(mName).toLowerCase())) moveScore += 45;

        if (moveScore > bestMoveScore) bestMoveScore = moveScore;
    });

    const oppAttackBias = opBs.atk >= opBs.spa ? 'physical' : 'special';
    if (myRecovery) score += (oppAttackBias === 'physical' ? 30 : 24) * myRecovery;
    if (myPivots) score += 22 * myPivots;
    if (myStatus) {
        if (opBs.spe >= 100) score += 18 * myStatus;
        if (opBs.hp + opBs.def + opBs.spd >= 280) score += 18 * myStatus;
        if (opBs.atk >= opBs.spa) score += 10 * myStatus;
    }
    if (myHazards) {
        if (multAtkVsTypes('rock', oppP.types) > 1) score += 24 * myHazards;
        if (!(oppP.types || []).includes('flying')) score += 16 * myHazards;
    }
    if (myHazardControl && oppMoves.some(m => HAZARD_MOVES.has(m))) score += 24 * myHazardControl;
    if (getRecoveryNote && getRecoveryNote(myCandidate.slot)) score += 18;
    if (getSafeItemName(myCandidate.slot.item) === 'heavy-duty boots' && oppMoves.some(m => HAZARD_MOVES.has(m))) score += 20;
    if (getSafeAbilityName(myCandidate.slot.ability) === 'regenerator') score += 28;

    return score + bestMoveScore;
};

// Search UI
window.getOpponentUI = function() {
    const optionsHtml = typeof POKE !== 'undefined' ? POKE.map(p => `<option value="${p.name.replace(/-/g, ' ')}">`).join('') : '';

    const toggleBtn = `<button onclick="toggleOppPanel()" style="width:100%; padding:12px; background: ${window.showOppPanel ? '#555' : '#ff4d4f'}; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; margin-top:20px; font-size:14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;">
        ${window.showOppPanel ? '❌ Close Opponent Panel' : '🎯 Add Opponent Team (Assassin Mode)'}
    </button>`;

    if (!window.showOppPanel) return toggleBtn;

    const oppCards = window.oppTeam.length === 0
        ? '<span style="opacity:0.6; font-size:12px; margin-top:10px;">Add opponents or use "📋 Paste Showdown" for quick import with their moves!</span>'
        : window.oppTeam.map((opp, idx) => {
            const opId = typeof opp === 'number' ? opp : opp.id;
            const oppMoveNames = (typeof opp === 'object' && opp.moveNames) ? opp.moveNames : [];
            const oppAbility   = (typeof opp === 'object' && opp.ability)   ? opp.ability   : '';
            const oppItem      = (typeof opp === 'object' && opp.item)      ? opp.item      : '';
            const op = POKE.find(p => p.id === opId);
            if (!op) return '';

            const moveList     = (typeof MOVES_BY_POKEMON !== 'undefined' && MOVES_BY_POKEMON[String(op.id)]) || [];
            const abilityList  = (typeof ABILITIES        !== 'undefined' && ABILITIES[String(op.id)])        || [];

            const moveSelects = [0, 1, 2, 3].map(mi => {
                const cur = oppMoveNames[mi] || '';
                return `<select onchange="setOppMove(${idx},${mi},this.value)" title="Move ${mi+1}" style="width:100%; font-size:10px; padding:2px 4px; border-radius:4px; border:1px solid var(--brd); background:var(--bg); color:var(--txt); cursor:pointer;">
                    <option value="">Move ${mi+1}…</option>
                    ${moveList.map(mn => `<option value="${mn}" ${cur===mn?'selected':''}>${mn.replace(/-/g,' ')}</option>`).join('')}
                </select>`;
            }).join('');

            const abilitySelect = `<select onchange="setOppAbility(${idx},this.value)" title="Ability" style="width:100%; font-size:10px; padding:2px 4px; border-radius:4px; border:1px solid var(--brd); background:var(--bg); color:var(--txt); cursor:pointer;">
                <option value="">Ability…</option>
                ${abilityList.map(a => `<option value="${a}" ${oppAbility===a?'selected':''}>${a.replace(/-/g,' ')}</option>`).join('')}
            </select>`;

            const itemSelect = `<select onchange="setOppItem(${idx},this.value)" title="Item" style="width:100%; font-size:10px; padding:2px 4px; border-radius:4px; border:1px solid var(--brd); background:var(--bg); color:var(--txt); cursor:pointer;">
                <option value="">Item…</option>
                ${(typeof HELD_ITEMS !== 'undefined' ? HELD_ITEMS : []).map(it => `<option value="${it}" ${oppItem===it?'selected':''}>${it}</option>`).join('')}
            </select>`;

            return `<div style="display:flex; flex-direction:column; background:var(--bg); border:1px solid #ff4d4f; border-radius:8px; padding:8px; position:relative; min-width:160px; max-width:200px; box-shadow:0 2px 4px rgba(255,0,0,0.1); gap:5px;">
                <button onclick="removeOpponent(${idx})" style="position:absolute; top:-6px; right:-6px; background:#ff4d4f; color:white; border-radius:50%; border:none; width:20px; height:20px; font-size:11px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center;">X</button>
                <div style="display:flex; align-items:center; gap:6px;">
                    ${spriteImg(op)}
                    <span style="font-size:11px; font-weight:bold; color:var(--txt);">${op.name.replace(/-/g,' ')}</span>
                </div>
                <button onclick="openOpponentSetup(${idx})" style="background:rgba(77,171,247,0.12); color:#4dabf7; border:1px solid #4dabf7; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:10px; font-weight:900;">⚙ Exact Setup</button>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                    ${abilitySelect}
                    ${itemSelect}
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                    ${moveSelects}
                </div>
            </div>`;
        }).join('');

    return toggleBtn + `
    <div class="opp-panel" style="margin-top:15px; padding:15px; background:rgba(255, 77, 79, 0.05); border:1px solid #ff4d4f; border-radius:8px;">
        <datalist id="oppPokeList">${optionsHtml}</datalist>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:6px;">
            <strong style="color:#ff4d4f; font-size:15px;">Assassin (Target Mode)</strong>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <button onclick="window._openOppShowdownModal && window._openOppShowdownModal()" style="background:#4dabf7; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">📋 Paste Showdown</button>
                <button onclick="clearOpponents()" style="background:#ff4d4f; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">Clear</button>
            </div>
        </div>
        <div style="display:flex; gap:8px; margin-bottom:14px;">
            <button onclick="setOppMode('custom')" style="flex:1; padding:8px 10px; border-radius:6px; border:2px solid ${window.oppMode !== 'bosses' ? '#4dabf7' : '#555'}; background:${window.oppMode !== 'bosses' ? 'rgba(77,171,247,0.15)' : 'transparent'}; color:${window.oppMode !== 'bosses' ? '#4dabf7' : 'var(--dim)'}; font-size:12px; font-weight:bold; cursor:pointer; transition:.15s;">🎯 Custom Team</button>
            <button onclick="setOppMode('bosses')" style="flex:1; padding:8px 10px; border-radius:6px; border:2px solid ${window.oppMode === 'bosses' ? '#ff6b6b' : '#555'}; background:${window.oppMode === 'bosses' ? 'rgba(255,107,107,0.15)' : 'transparent'}; color:${window.oppMode === 'bosses' ? '#ff6b6b' : 'var(--dim)'}; font-size:12px; font-weight:bold; cursor:pointer; transition:.15s;">⚔️ Bosses</button>
        </div>
        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <input type="text" id="oppSearchInput" list="oppPokeList" onkeydown="if(event.key === 'Enter') searchAndAddOpponent()" placeholder="E.g. garchomp or 445" style="flex:1; padding:8px; border-radius:4px; border:1px solid var(--brd); background:var(--bg); color:var(--txt);">
            <button onclick="searchAndAddOpponent()" style="padding:8px 15px; cursor:pointer; background:#4dabf7; color:white; border:none; border-radius:4px; font-weight:bold;">Add</button>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; min-height:45px;">${oppCards}</div>
    </div>`;
};

// Counters UI
window.getMatchupsUI = function(selected) {
    if(!window.showOppPanel || window.oppTeam.length === 0 || !selected || selected.length === 0) return '';

    const MEDALS = ['🥇', '🥈', '🥉'];
    const PRIORITY_MOVES = new Set(['fake-out', 'sucker-punch', 'bullet-punch', 'ice-shard', 'extreme-speed', 'mach-punch', 'aqua-jet', 'shadow-sneak']);

    let html = `<div style="margin-top:20px; padding:12px; background:rgba(77,171,247,0.05); border:1px solid #4dabf7; border-radius:8px;">
        <strong style="color:#4dabf7; font-size:14px;">🔥 Counter Intelligence</strong>
        <p style="font-size:11px; color:var(--dim); margin:4px 0 12px;">Top counters from your team vs each opponent. Outgoing ⚔️ and incoming 🛡️ damage estimates included.</p>
        <div style="display:flex; flex-direction:column; gap:14px;">`;

    const aggregate = selected.map(my => {
        let totalScore = 0;
        let totalIncoming = 0;
        let incomingChecks = 0;
        window.oppTeam.forEach(opp => {
            const opId = typeof opp === 'number' ? opp : opp.id;
            const oppSlotData = typeof opp === 'object' ? opp : null;
            const op = POKE.find(p => p.id === opId);
            if (!op) return;
            totalScore += window.getCombatScore(my, op, oppSlotData);
            if (typeof getBestDamageEstimate === 'function' && oppSlotData) {
                const incoming = getBestDamageEstimate({ p: op, slot: oppSlotData }, my.p, Object.assign({}, my.slot, { __side: 'me' }));
                if (incoming) {
                    totalIncoming += incoming.maxPct;
                    incomingChecks++;
                }
            }
        });
        return { my, totalScore, avgIncoming: incomingChecks ? (totalIncoming / incomingChecks) : 999 };
    }).sort((a, b) => b.totalScore - a.totalScore);
    const recommendedLead = aggregate[0];
    const safestSwitch = [...aggregate].sort((a, b) => a.avgIncoming - b.avgIncoming)[0];
    if (recommendedLead && safestSwitch) {
        html += `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px;">
            <div style="padding:10px; border-radius:8px; background:rgba(99,212,113,0.08); border:1px solid rgba(99,212,113,0.35);">
                <span style="display:block; color:#63d471; font-size:10px; font-weight:900; text-transform:uppercase;">Recommended lead</span>
                <span style="display:block; color:var(--txt); font-size:13px; font-weight:900; margin-top:4px; text-transform:capitalize;">${recommendedLead.my.p.name.replace(/-/g, ' ')}</span>
                <span style="display:block; color:var(--dim); font-size:10px; margin-top:3px;">Best all-around pressure into the selected threats.</span>
            </div>
            <div style="padding:10px; border-radius:8px; background:rgba(77,171,247,0.08); border:1px solid rgba(77,171,247,0.35);">
                <span style="display:block; color:#4dabf7; font-size:10px; font-weight:900; text-transform:uppercase;">Safest switch-in</span>
                <span style="display:block; color:var(--txt); font-size:13px; font-weight:900; margin-top:4px; text-transform:capitalize;">${safestSwitch.my.p.name.replace(/-/g, ' ')}</span>
                <span style="display:block; color:var(--dim); font-size:10px; margin-top:3px;">Lowest average incoming damage across imported threats.</span>
            </div>
        </div>`;
    }

    window.oppTeam.forEach(opp => {
        const opId = typeof opp === 'number' ? opp : opp.id;
        const oppSlotData = typeof opp === 'object' ? opp : null;
        const op = POKE.find(p => p.id === opId);
        if (!op) return;

        // Rank ALL team members by combat score (descending)
        const ranked = selected
            .map(my => ({ my, score: window.getCombatScore(my, op, oppSlotData) }))
            .sort((a, b) => b.score - a.score);

        const top3 = ranked.slice(0, 3);

        // Opponent info badges
        const oppMoveNames = oppSlotData && oppSlotData.moveNames ? oppSlotData.moveNames : [];
        const oppMoveTypes = oppSlotData && oppSlotData.moves ? oppSlotData.moves : [];
        const oppAbility   = oppSlotData && oppSlotData.ability ? oppSlotData.ability : '';
        const oppItem      = oppSlotData && oppSlotData.item    ? oppSlotData.item    : '';
        const oppLevel     = oppSlotData && oppSlotData.level   ? oppSlotData.level   : '';
        const oppNature    = oppSlotData && oppSlotData.nature  ? oppSlotData.nature  : '';

        const abilityBadge = oppAbility ? `<span style="font-size:10px; background:rgba(99,212,113,0.15); border:1px solid #63d471; color:#63d471; border-radius:3px; padding:1px 6px; font-weight:bold;">⚙ ${oppAbility.replace(/-/g,' ')}</span>` : '';
        const itemBadge    = oppItem    ? `<span style="font-size:10px; background:rgba(255,193,7,0.15); border:1px solid #ffc107; color:#ffc107; border-radius:3px; padding:1px 6px; font-weight:bold;">🎒 ${oppItem}</span>` : '';
        const setupBadge   = (oppLevel || oppNature) ? `<span style="font-size:10px; background:rgba(177,151,252,0.15); border:1px solid #b197fc; color:#b197fc; border-radius:3px; padding:1px 6px; font-weight:bold;">📐 Lv${oppLevel || 50}${oppNature ? ` · ${oppNature}` : ''}</span>` : '';

        const movesHtml = oppMoveNames.some(Boolean)
            ? oppMoveNames.map((mn, i) => {
                if (!mn) return '';
                const mType = oppMoveTypes[i] || '';
                const color = (typeof TC !== 'undefined' && TC[mType]) ? TC[mType] : '#555';
                const prio  = PRIORITY_MOVES.has(String(mn).toLowerCase())
                    ? `<span style="font-size:9px; background:rgba(255,193,7,0.18); border:1px solid #ffc107; color:#ffc107; border-radius:3px; padding:0 3px;">⚡</span>`
                    : '';
                return `<span style="font-size:10px; background:${color}; color:white; border-radius:3px; padding:1px 5px; font-weight:bold;">${mn.replace(/-/g,' ')}</span>${prio}`;
            }).join('')
            : '';

        const oppInfoBar = `<div style="display:flex; flex-wrap:wrap; gap:4px; margin:4px 0 10px; align-items:center;">
            ${abilityBadge}${itemBadge}${setupBadge}${movesHtml}
        </div>`;

        // Counter rows
        const counterRows = top3.map(({ my, score }, rank) => {
            const medal = MEDALS[rank] || `#${rank + 1}`;
            const scoreColor = score > 150 ? '#63d471' : score > 0 ? '#ffc107' : '#ff6b6b';

            // Outgoing damage: my best move vs opponent
            let outHtml = '';
            if (typeof getBestDamageEstimate === 'function') {
                const est = getBestDamageEstimate(my, op, Object.assign({}, oppSlotData || {}, { __side: 'opponent' }));
                if (est) {
                    const c = est.minPct >= 100 ? '#ff4d4f' : est.minPct >= 50 ? '#ffc107' : '#4dabf7';
                    const sashWarn = est.hasSashOrSturdy && (est.label === 'OHKO' || est.label === 'OHKO*')
                        ? ` <span style="font-size:9px; color:#ffa94d;" title="Focus Sash / Sturdy">*Sash</span>` : '';
                    outHtml = `<span style="font-size:10px; font-weight:bold; color:${c}; background:${c}18; padding:2px 6px; border-radius:3px;">
                        ⚔️ ${est.label} ${est.minPct}%–${est.maxPct}%${est.hazardChip ? ` · ${est.minAfterHazards}%–${est.maxAfterHazards}% after hazards` : ''} (<i>${est.moveName ? est.moveName.replace(/-/g,' ') : '?'}</i>)${sashWarn}
                    </span>`;
                }
            }

            // Incoming damage: opponent's best move vs my counter
            let inHtml = '';
            if (typeof getBestDamageEstimate === 'function' && oppSlotData) {
                const oppAtkMon = { p: op, slot: oppSlotData };
                const est = getBestDamageEstimate(oppAtkMon, my.p, Object.assign({}, my.slot, { __side: 'me' }));
                if (est) {
                    const c = est.minPct >= 100 ? '#ff4d4f' : est.minPct >= 50 ? '#ffc107' : '#63d471';
                    inHtml = `<span style="font-size:10px; font-weight:bold; color:${c}; background:${c}18; padding:2px 6px; border-radius:3px;">
                        🛡️ Takes ${est.label} ${est.minPct}%–${est.maxPct}%${est.hazardChip ? ` · ${est.minAfterHazards}%–${est.maxAfterHazards}% after hazards` : ''} (<i>${est.moveName ? est.moveName.replace(/-/g,' ') : '?'}</i>)
                    </span>`;
                }
            }

            const dmgRow = (outHtml || inHtml)
                ? `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">${outHtml}${inHtml}</div>`
                : '';

            // --- Move Suggestions: all moves ranked by damage output vs this opponent ---
            let moveSuggestionsHtml = '';
            if (typeof estimateDamagePct === 'function' && typeof MOVE_INFO !== 'undefined') {
                const moveRanks = [];
                (my.slot.moveNames || []).forEach(mName => {
                    if (!mName) return;
                    const mKey = (mName || '').toLowerCase().replace(/\s+/g, '-');
                    const mInfo = MOVE_INFO[mName] || MOVE_INFO[mKey];
                    const mFlags = (typeof MOVE_FLAGS !== 'undefined' && MOVE_FLAGS[mKey]) || {};
                    if (!mInfo) return;
                    if (mInfo.cat === 'status') {
                        moveRanks.push({ name: mName, label: 'Status', minPct: -1, maxPct: 0, typeMult: 0, isStatus: true, flags: mFlags });
                        return;
                    }
                    if (!mInfo.power) return;
                    const est = estimateDamagePct(my, Object.assign({ name: mKey }, mInfo), op, Number((oppSlotData && oppSlotData.level) || 50), Object.assign({}, oppSlotData || {}, { __side: 'opponent' }));
                    if (est) {
                        moveRanks.push({ name: mName, ...est, isStatus: false, flags: mFlags });
                    } else {
                        moveRanks.push({ name: mName, label: 'No effect', minPct: 0, maxPct: 0, typeMult: 0, isStatus: false, immune: true, flags: mFlags });
                    }
                });
                // Sort: best damage first, then immune moves, then status moves last
                const moveOrder = m => m.isStatus ? 2 : m.immune ? 1 : 0;
                moveRanks.sort((a, b) => moveOrder(a) - moveOrder(b) || b.maxPct - a.maxPct);

                if (moveRanks.length) {
                    const moveItems = moveRanks.map((m, idx) => {
                        const flags = m.flags || {};
                        // Build flag chips
                        const flagChips = [];
                        if (flags.priority && flags.priority > 0) flagChips.push(`<span style="font-size:9px; background:#ff6b6b22; border:1px solid #ff6b6b; color:#ff6b6b; border-radius:3px; padding:0 4px;" title="Priority +${flags.priority}">+${flags.priority} Prio</span>`);
                        if (flags.priority && flags.priority < 0) flagChips.push(`<span style="font-size:9px; background:#55555533; border:1px solid #888; color:#aaa; border-radius:3px; padding:0 4px;" title="Priority ${flags.priority}">Prio ${flags.priority}</span>`);
                        if (flags.twoTurn) flagChips.push(`<span style="font-size:9px; background:#ffa94d22; border:1px solid #ffa94d; color:#ffa94d; border-radius:3px; padding:0 4px;" title="Charges 1 turn">2-Turn</span>`);
                        if (flags.contact) flagChips.push(`<span style="font-size:9px; background:#74c0fc22; border:1px solid #74c0fc; color:#74c0fc; border-radius:3px; padding:0 4px;" title="Makes contact — triggers Rocky Helmet, Rough Skin, etc.">Contact</span>`);
                        if (flags.highCrit) flagChips.push(`<span style="font-size:9px; background:#ffe06633; border:1px solid #ffe066; color:#ffe066; border-radius:3px; padding:0 4px;" title="High crit ratio">Hi-Crit</span>`);
                        if (flags.multiHit) flagChips.push(`<span style="font-size:9px; background:#da77f222; border:1px solid #da77f2; color:#da77f2; border-radius:3px; padding:0 4px;" title="${flags.multiHit.min}–${flags.multiHit.max} hits">${flags.multiHit.min}–${flags.multiHit.max} hits</span>`);
                        if (flags.drain) flagChips.push(`<span style="font-size:9px; background:#63d47122; border:1px solid #63d471; color:#63d471; border-radius:3px; padding:0 4px;" title="Drains ${Math.round(flags.drain*100)}% of damage dealt">Drain</span>`);
                        if (flags.recoil) flagChips.push(`<span style="font-size:9px; background:#ff4d4f22; border:1px solid #ff4d4f; color:#ff4d4f; border-radius:3px; padding:0 4px;" title="${Math.round(flags.recoil*100)}% recoil of damage dealt">Recoil</span>`);

                        if (m.isStatus) {
                            return `<div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:3px 6px; background:rgba(255,255,255,0.04); border-radius:4px;">
                                <span style="font-size:9px; font-weight:900; color:#888; min-width:14px; text-align:center;">${idx + 1}</span>
                                <span style="font-size:10px; font-weight:bold; color:var(--dim);">${m.name.replace(/-/g,' ')}</span>
                                <span style="font-size:9px; background:#55555533; border:1px solid #555; color:#aaa; border-radius:3px; padding:1px 5px;">Status</span>
                                ${flagChips.join('')}
                            </div>`;
                        }
                        if (m.immune) {
                            return `<div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:3px 6px; background:rgba(255,255,255,0.04); border-radius:4px;">
                                <span style="font-size:9px; font-weight:900; color:#888; min-width:14px; text-align:center;">${idx + 1}</span>
                                <span style="font-size:10px; font-weight:bold; color:var(--dim);">${m.name.replace(/-/g,' ')}</span>
                                <span style="font-size:9px; background:#88222233; border:1px solid #882222; color:#ff8080; border-radius:3px; padding:1px 5px;">x0 Immune</span>
                                ${flagChips.join('')}
                            </div>`;
                        }
                        const effLabel = m.typeMult >= 4 ? 'x4 ⚡⚡' : m.typeMult >= 2 ? 'x2 ⚡' : m.typeMult <= 0.25 ? 'x0.25' : m.typeMult <= 0.5 ? 'x0.5' : 'x1';
                        const effColor = m.typeMult >= 2 ? '#ff6b6b' : m.typeMult < 1 ? '#74c0fc' : '#aaa';
                        const dmgColor = m.minPct >= 100 ? '#ff4d4f' : m.minPct >= 50 ? '#ffc107' : m.maxPct >= 30 ? '#4dabf7' : '#888';
                        const bestLabel = idx === 0 ? `<span style="font-size:9px; background:#ff6b6b22; border:1px solid #ff6b6b; color:#ff6b6b; border-radius:3px; padding:0 4px; margin-left:2px;">USE FIRST</span>` : '';
                        // Sash/Sturdy asterisk note
                        const sashNote = m.hasSashOrSturdy && m.label === 'OHKO*'
                            ? `<span style="font-size:9px; color:#ffa94d;" title="Opponent may have Focus Sash / Sturdy — survives at 1 HP">*Sash/Sturdy</span>`
                            : '';
                        // Crit range note
                        const critNote = (m.critMinPct && m.critMinPct !== m.minPct)
                            ? `<span style="font-size:9px; color:#ffe066;" title="Crit damage range (×1.5, ignores screens)">${m.isHighCrit ? '⭐Crit:' : 'Crit:'} ${m.critMinPct}%–${m.critMaxPct}%</span>`
                            : '';
                        // Multi-hit total note
                        const multiNote = m.multiHitMin > 1
                            ? `<span style="font-size:9px; color:#da77f2;" title="Total damage across all hits (avg ${m.multiHitAvg.toFixed(1)} hits)">Total: ~${Math.round(m.minPct * m.multiHitAvg)}%</span>`
                            : '';
                        // Recovery accounting
                        const recovNote = m.recoveryPerTurn > 0
                            ? (m.hitsToKO ? `<span style="font-size:9px; color:#aaa;" title="Accounting for passive HP recovery per turn">~${m.hitsToKO} hits w/Recovery</span>` : `<span style="font-size:9px; color:#63d471;" title="Cannot KO through recovery">Heals through</span>`)
                            : '';
                        return `<div style="display:flex; flex-direction:column; gap:2px; padding:3px 6px; background:rgba(255,255,255,0.04); border-radius:4px;">
                            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                <span style="font-size:9px; font-weight:900; color:#888; min-width:14px; text-align:center;">${idx + 1}</span>
                                <span style="font-size:10px; font-weight:bold; color:var(--txt);">${m.name.replace(/-/g,' ')}</span>${bestLabel}
                                ${flagChips.join('')}
                                <span style="margin-left:auto; display:flex; gap:4px; align-items:center; flex-shrink:0;">
                                    <span style="font-size:9px; color:${effColor}; font-weight:bold;">${effLabel}</span>
                                    <span style="font-size:10px; font-weight:900; color:${dmgColor};">${m.label} ${m.minPct}%–${m.maxPct}%</span>
                                </span>
                            </div>
                            ${(critNote || multiNote || sashNote || recovNote) ? `<div style="display:flex; flex-wrap:wrap; gap:6px; padding-left:26px;">${critNote}${multiNote}${sashNote}${recovNote}</div>` : ''}
                        </div>`;
                    }).join('');

                    moveSuggestionsHtml = `<div style="margin-top:8px; padding:7px 8px; background:rgba(77,171,247,0.06); border:1px solid rgba(77,171,247,0.25); border-radius:6px;">
                        <span style="font-size:10px; font-weight:900; color:#4dabf7; display:block; margin-bottom:5px;">💡 Move Suggestions vs ${op.name.replace(/-/g,' ')}</span>
                        <div style="display:flex; flex-direction:column; gap:3px;">${moveItems}</div>
                    </div>`;
                }
            }

            // --- Battle Prep Tip ---
            let battlePrepHtml = '';
            if (typeof calcFinalStats === 'function' && typeof BASE_STATS !== 'undefined' && typeof getNatureMultiplier === 'function') {
                const myBs  = BASE_STATS[my.p.id]  || { spe: 70 };
                const opBs  = BASE_STATS[op.id]     || { spe: 70 };
                const mySpeed = getEffectiveSpeedStat(Number(myBs.spe) || 70, my.slot, { side: 'me', types: my.p.types });
                const opSpeed = getEffectiveSpeedStat(Number(opBs.spe) || 70, oppSlotData || { level: 50 }, { side: 'opponent', types: op.types, defaultLevel: 50 });
                const trickRoomActive = typeof getBattleContext === 'function' ? getBattleContext().trickRoom : false;

                const tips = [];

                // Speed comparison
                if ((!trickRoomActive && mySpeed > opSpeed) || (trickRoomActive && mySpeed < opSpeed)) {
                    tips.push(`<span style="color:#63d471;">⚡ You move first (${mySpeed} vs ${opSpeed})</span>${trickRoomActive ? ' under Trick Room' : ''} — attack immediately.`);
                } else if ((!trickRoomActive && mySpeed < opSpeed) || (trickRoomActive && mySpeed > opSpeed)) {
                    tips.push(`<span style="color:#ffc107;">🐢 Opponent is faster (${opSpeed} vs ${mySpeed})</span>${trickRoomActive ? ' outside Trick Room order' : ''} — prepare to take a hit first.`);
                } else {
                    tips.push(`<span style="color:#ffa94d;">🎲 Speed tie (${mySpeed})</span> — 50/50 who moves first.`);
                }

                // OHKO warning
                if (typeof getBestDamageEstimate === 'function') {
                    const myBest = getBestDamageEstimate(my, op, Object.assign({}, oppSlotData || {}, { __side: 'opponent' }));
                    if (myBest && myBest.minPct >= 100) {
                        tips.push(`<span style="color:#ff4d4f;">💥 OHKO guaranteed</span> with <b>${myBest.moveName ? myBest.moveName.replace(/-/g,' ') : '?'}</b> — go for the KO immediately.`);
                    } else if (myBest && myBest.ohkoChance > 0) {
                        tips.push(`<span style="color:#ffc107;">💥 ${myBest.ohkoChance}% OHKO chance</span> with <b>${myBest.moveName ? myBest.moveName.replace(/-/g,' ') : '?'}</b>.`);
                    }

                    if (oppSlotData) {
                        const oppAtkMon = { p: op, slot: oppSlotData };
                        const opBest = getBestDamageEstimate(oppAtkMon, my.p, Object.assign({}, my.slot, { __side: 'me' }));
                        if (opBest && opBest.minPct >= 100) {
                            tips.push(`<span style="color:#ff6b6b;">⚠️ Watch out!</span> Opponent can OHKO you with <b>${opBest.moveName ? opBest.moveName.replace(/-/g,' ') : '?'}</b>.`);
                        } else if (opBest && opBest.minPct >= 50) {
                            tips.push(`<span style="color:#ffa94d;">🛡️ Take care</span> — opponent deals ${opBest.minPct}%–${opBest.maxPct}% with <b>${opBest.moveName ? opBest.moveName.replace(/-/g,' ') : '?'}</b>. May need 2 hits to KO.`);
                        }
                    }
                }

                if (tips.length) {
                    const utilityNotes = [];
                    if (my.slot.moveNames?.some(m => PIVOT_MOVES.has(String(m).toLowerCase()))) utilityNotes.push('Pivot option lets you scout without fully committing.');
                    if (my.slot.moveNames?.some(m => RECOVERY_MOVES.has(String(m).toLowerCase()))) utilityNotes.push('Recovery improves repeat switch-ins if the first trade is neutral.');
                    if (my.slot.moveNames?.some(m => STATUS_PRESSURE_MOVES.has(String(m).toLowerCase()))) utilityNotes.push('Status pressure can punish bulky answers even without an immediate KO.');
                    // Contact proc chance from opponent's ability (Rocky Helmet, Rough Skin, Static, Flame Body…)
                    if (typeof CONTACT_PROC_ABILITIES !== 'undefined' && oppSlotData) {
                        const opAbility = String(oppSlotData.ability || '').toLowerCase().trim();
                        const procInfo = CONTACT_PROC_ABILITIES[opAbility];
                        const myContactMove = (my.slot.moveNames || []).some(mName => {
                            const flags = (typeof MOVE_FLAGS !== 'undefined' && MOVE_FLAGS[(mName||'').toLowerCase().replace(/\s+/g,'-')]) || {};
                            return flags.contact;
                        });
                        if (procInfo && myContactMove) {
                            const procLabel = procInfo.chance === 100
                                ? `<span style="color:#ffa94d;">⚡ ${opAbility.replace(/-/g,' ')} always triggers on contact (${procInfo.effect})</span>`
                                : `<span style="color:#ffa94d;">⚡ ${opAbility.replace(/-/g,' ')} has ${procInfo.chance}% chance of ${procInfo.effect} on contact moves</span>`;
                            utilityNotes.push(procLabel);
                        }
                        // Rocky Helmet / Iron Barbs — check opponent's item
                        const opItem = getSafeItemName(oppSlotData.item);
                        if ((opItem === 'rocky helmet' || opItem === 'binding band') && myContactMove) {
                            utilityNotes.push(`<span style="color:#ffa94d;">🪨 Opponent holds ${opItem.replace(/-/g,' ')} — contact moves deal ${opItem === 'rocky helmet' ? '⅙ HP recoil to you' : 'bonus trap damage'}</span>`);
                        }
                    }
                    if (utilityNotes.length) tips.push(...utilityNotes.map(t => `<span style="color:#4dabf7;">🧩 ${t}</span>`));
                    battlePrepHtml = `<div style="margin-top:8px; padding:7px 8px; background:rgba(99,212,113,0.05); border:1px solid rgba(99,212,113,0.2); border-radius:6px;">
                        <span style="font-size:10px; font-weight:900; color:#63d471; display:block; margin-bottom:5px;">⚔️ Battle Prep</span>
                        <ul style="margin:0; padding:0 0 0 14px; display:flex; flex-direction:column; gap:3px;">
                            ${tips.map(t => `<li style="font-size:10px; color:var(--dim); line-height:1.5;">${t}</li>`).join('')}
                        </ul>
                    </div>`;
                }
            }

            return `<div style="display:flex; align-items:center; gap:8px; padding:7px 10px; background:var(--surf2); border-radius:6px; flex-wrap:wrap;">
                <span style="font-size:14px; flex-shrink:0;">${medal}</span>
                ${spriteImg(my.p)}
                <span style="font-size:12px; font-weight:900; text-transform:capitalize; color:var(--txt); flex:1; min-width:80px;">${my.p.name.replace(/-/g,' ')}</span>
                <span style="font-size:10px; font-weight:900; color:${scoreColor}; background:${scoreColor}18; border:1px solid ${scoreColor}44; border-radius:12px; padding:2px 8px; flex-shrink:0;">Score: ${score}</span>
                ${dmgRow ? `<div style="width:100%;">${dmgRow}</div>` : ''}
                ${moveSuggestionsHtml ? `<div style="width:100%;">${moveSuggestionsHtml}</div>` : ''}
                ${battlePrepHtml ? `<div style="width:100%;">${battlePrepHtml}</div>` : ''}
            </div>`;
        }).join('');

        html += `<div style="background:var(--bg); border:1px solid #ff4d4f44; border-radius:8px; padding:10px 12px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                ${spriteImg(op)}
                <span style="font-size:13px; font-weight:900; text-transform:capitalize; color:#ff6b6b;">${op.name.replace(/-/g,' ')}</span>
                <div style="display:flex; gap:3px; flex-wrap:wrap;">${op.types.map(t => `<span style="font-size:10px; background:${(typeof TC!=='undefined'&&TC[t])||'#888'}; color:#fff; border-radius:3px; padding:1px 6px; font-weight:bold;">${t}</span>`).join('')}</div>
            </div>
            ${oppInfoBar}
            <div style="display:flex; flex-direction:column; gap:6px;">${counterRows}</div>
        </div>`;
    });

    return html + `</div></div>`;
};

// AI Engine
window.calcAssassinScore = function(candidate) {
    let oppScore = 0;

    window.oppTeam.forEach(opp => {
        const opId = typeof opp === 'number' ? opp : opp.id;
        const oppSlotData = typeof opp === 'object' ? opp : null;
        const oppP = POKE.find(p => p.id === opId);
        if (oppP) oppScore += window.getCombatScore(candidate, oppP, oppSlotData);
    });

    let validMovesCount = candidate.slot.moves.filter(m => m).length;
    if (validMovesCount < 4) oppScore -= (4 - validMovesCount) * 20;
    return oppScore;
};

// --- Opponent Advanced Setup Modal ---
(function injectOpponentSetupModal() {
    const modal = document.createElement('div');
    modal.id = 'oppSetupModal';
    modal.style.cssText = 'display:none; position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,.82); align-items:center; justify-content:center; padding:16px;';
    modal.innerHTML = `
      <div style="width:min(96vw, 560px); max-height:90vh; overflow:auto; background:var(--surf); border:1px solid #ff6b6b55; border-radius:14px; padding:18px; position:relative;">
        <button onclick="document.getElementById('oppSetupModal').style.display='none'" style="position:absolute; top:12px; right:12px; border:none; background:#ff4d4f; color:#fff; border-radius:6px; padding:4px 10px; cursor:pointer;">✕</button>
        <h3 style="margin:0 0 10px; color:#ff6b6b; font-size:15px;">Exact Defender Setup</h3>
        <div id="oppSetupBody"></div>
        <div style="display:flex; justify-content:flex-end; margin-top:12px;">
            <button onclick="window.saveOpponentSetup()" style="padding:9px 14px; border:none; background:#4dabf7; color:#fff; border-radius:8px; cursor:pointer; font-weight:900;">Save setup</button>
        </div>
      </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    document.body.appendChild(modal);
})();

// --- Opponent Showdown Paste Modal ---
(function injectOppShowdownModal() {
    const overlay = document.createElement('div');
    overlay.id = 'oppSdImportOverlay';
    overlay.style.cssText = [
        'display:none', 'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(0,0,0,.75)', 'backdrop-filter:blur(4px)',
        'align-items:center', 'justify-content:center', 'padding:16px'
    ].join(';');

    overlay.innerHTML = `
      <div style="background:#13132a; border:1.5px solid #ff4d4f; border-radius:14px; width:100%; max-width:560px; padding:24px; position:relative; font-family:'Nunito',sans-serif; color:#e8e8ff;">
        <button id="oppSdClose" style="position:absolute; top:14px; right:14px; background:#1a1a30; border:1px solid #252545; color:#7070aa; border-radius:50%; width:28px; height:28px; cursor:pointer; font-size:15px; display:flex; align-items:center; justify-content:center;" title="Close">✕</button>
        <h3 style="font-family:'Press Start 2P',monospace; font-size:11px; color:#ff4d4f; margin-bottom:4px; letter-spacing:1px;">🎯 PASTE OPPONENT TEAM</h3>
        <p style="font-size:11px; color:#7070aa; margin-bottom:14px;">Paste the opponent's Pokémon in Showdown export format. Moves will be imported for more accurate counter recommendations. Multiple Pokémon should be separated by a blank line.</p>
        <textarea id="oppSdPasteArea" rows="12" spellcheck="false" style="width:100%; background:#1a1a30; border:1.5px solid #ff4d4f; border-radius:8px; color:#e8e8ff; font-family:monospace; font-size:12px; padding:10px 12px; outline:none; resize:vertical; line-height:1.5;" placeholder="Gengar\nLevel: 50\nTimid Nature\nAbility: Levitate\nEVs: 4 HP / 252 SpA / 252 Spe\nIVs: 20 HP / 10 Atk / 25 Def / 31 SpA / 28 SpD / 31 Spe\n- Shadow Ball\n- Sludge Bomb\n- Hypnosis\n- Focus Blast"></textarea>
        <div style="display:flex; gap:10px; margin-top:12px; align-items:center; flex-wrap:wrap;">
          <button id="oppSdImportBtn" style="padding:9px 22px; border-radius:50px; border:none; cursor:pointer; background:#ff4d4f; color:white; font-family:'Nunito',sans-serif; font-size:13px; font-weight:900; transition:filter .15s;">🎯 Add to Opponents</button>
          <button id="oppSdReplaceBtn" style="padding:9px 22px; border-radius:50px; border:none; cursor:pointer; background:#555; color:white; font-family:'Nunito',sans-serif; font-size:13px; font-weight:900; transition:filter .15s;">🔄 Clear & Replace</button>
          <span id="oppSdMsg" style="font-size:12px; font-weight:800; color:#51cf66; opacity:0; transition:opacity .3s;"></span>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    function openOppModal() {
        overlay.style.display = 'flex';
        document.getElementById('oppSdPasteArea').focus();
    }
    function closeOppModal() {
        overlay.style.display = 'none';
        document.getElementById('oppSdPasteArea').value = '';
        document.getElementById('oppSdMsg').style.opacity = '0';
    }
    function showMsg(text) {
        const msg = document.getElementById('oppSdMsg');
        msg.textContent = text;
        msg.style.opacity = '1';
        setTimeout(() => { msg.style.opacity = '0'; }, 2500);
    }

    overlay.addEventListener('click', e => { if (e.target === overlay) closeOppModal(); });
    document.getElementById('oppSdClose').addEventListener('click', closeOppModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.style.display === 'flex') closeOppModal(); });

    document.getElementById('oppSdImportBtn').addEventListener('click', () => {
        const text = document.getElementById('oppSdPasteArea').value.trim();
        if (!text) { alert('Please paste some Pokémon data first.'); return; }
        if (window.oppTeam.length >= 6) { alert('Opponent team is full! Click "Clear & Replace" or remove a Pokémon.'); return; }
        const added = window.importOpponentsFromShowdown(text);
        if (!added) { alert('Could not recognise any Pokémon in the pasted text. Check spelling or formatting.'); return; }
        showMsg(`✓ Added ${added} opponent(s)!`);
        setTimeout(closeOppModal, 1400);
    });

    document.getElementById('oppSdReplaceBtn').addEventListener('click', () => {
        const text = document.getElementById('oppSdPasteArea').value.trim();
        if (!text) { alert('Please paste some Pokémon data first.'); return; }
        window.oppTeam = [];
        const added = window.importOpponentsFromShowdown(text);
        if (!added) { alert('Could not recognise any Pokémon in the pasted text.'); return; }
        showMsg(`✓ Replaced with ${added} opponent(s)!`);
        setTimeout(closeOppModal, 1400);
    });

    window._openOppShowdownModal = openOppModal;
})();

// --- Force UI display on first page load ---
setTimeout(() => {
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
}, 50);
