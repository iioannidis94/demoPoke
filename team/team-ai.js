// --- team-ai.js : ENDGAME PvP MASTER AI (Coverage, Synergy, Speed Tiers, 4x Weaknesses) ---

function autoRecommendTeam() {
    const pool = team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.slot.pokemonId && x.p);

    if (pool.length === 0) { alert('Add some Pokémon to your roster first!'); return; }
    if (pool.length <= 6) { pool.forEach(x => x.slot.calc = true); saveTeam(); if (typeof renderTeamSlots === 'function') renderTeamSlots(); return; }

    // Store the pool for async access by the preset modal
    window._pendingPool = pool;

    const PRESETS = [
        { id: 'balance',      label: '⚖️ Balance',      desc: 'Mixed offense and defense',      color: '#4dabf7' },
        { id: 'hyper-offense',label: '⚡ Hyper Offense', desc: 'Fast sweepers, minimal bulk',    color: '#ff6b6b' },
        { id: 'rain',         label: '🌧️ Rain',          desc: 'Drizzle + Swift Swim core',      color: '#74c0fc' },
        { id: 'sun',          label: '☀️ Sun',           desc: 'Drought + Chlorophyll core',     color: '#ff6b35' },
        { id: 'sand',         label: '🌪️ Sand',          desc: 'Sand Stream + Rock/Ground core', color: '#d4a76a' },
        { id: 'trick-room',   label: '🔄 Trick Room',    desc: 'Slow + bulky Pokémon under TR',  color: '#cc5de8' },
    ];

    let existing = document.getElementById('presetPickerModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'presetPickerModal';
    modal.style.cssText = 'position:fixed; inset:0; z-index:10001; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; padding:20px;';
    modal.innerHTML = `
        <div style="background:var(--bg); border:2px solid #38d878; border-radius:12px; max-width:460px; width:100%; padding:24px; position:relative;">
            <button onclick="document.getElementById('presetPickerModal').remove(); window._pendingPool=null;"
                style="position:absolute; top:12px; right:12px; background:#ff4d4f; color:white; border:none; border-radius:6px; padding:4px 10px; cursor:pointer; font-weight:bold;">✕</button>
            <h3 style="color:#38d878; margin:0 0 6px; font-size:16px;">✨ Auto-Build 6 — Team Preset</h3>
            <p style="font-size:12px; color:var(--dim); margin:0 0 16px;">Choose a team style. The AI will favour Pokémon that match the preset.</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                ${PRESETS.map(pr => `
                    <button onclick="document.getElementById('presetPickerModal').remove(); window._runAutoRecommend('${pr.id}')"
                        style="padding:12px; background:${pr.color}18; border:1.5px solid ${pr.color}; border-radius:8px; cursor:pointer; text-align:left; transition:0.2s; color:var(--txt);">
                        <div style="font-weight:900; font-size:13px; color:${pr.color};">${pr.label}</div>
                        <div style="font-size:11px; color:var(--dim); margin-top:3px;">${pr.desc}</div>
                    </button>`).join('')}
            </div>
        </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) { modal.remove(); window._pendingPool = null; } });
    document.body.appendChild(modal);
}

window._runAutoRecommend = function(preset) {
    const pool = window._pendingPool;
    window._pendingPool = null;
    if (!pool) return;

    if (!confirm(`Master Mode (${preset}): The AI will scan Speed Tiers, 4x Weaknesses, Roles and Offensive Coverage. Start?`)) return;

    const getNatureMultiplier = (nature, statName) => {
        if (!nature) return 1;
        const n = nature.toLowerCase();
        const buffs = { adamant: 'ATK', brave: 'ATK', lonely: 'ATK', naughty: 'ATK', bold: 'DEF', impish: 'DEF', lax: 'DEF', relaxed: 'DEF', modest: 'SPATK', mild: 'SPATK', quiet: 'SPATK', rash: 'SPATK', calm: 'SPDEF', gentle: 'SPDEF', sassy: 'SPDEF', careful: 'SPDEF', timid: 'SPD', jolly: 'SPD', hasty: 'SPD', naive: 'SPD' };
        const nerfs = { adamant: 'SPATK', brave: 'SPD', lonely: 'DEF', naughty: 'SPDEF', bold: 'ATK', impish: 'SPATK', lax: 'SPDEF', relaxed: 'SPD', modest: 'ATK', mild: 'DEF', quiet: 'SPD', rash: 'SPDEF', calm: 'ATK', gentle: 'DEF', sassy: 'SPD', careful: 'SPATK', timid: 'ATK', jolly: 'SPATK', hasty: 'DEF', naive: 'SPDEF' };
        if (buffs[n] === statName) return 1.1;
        if (nerfs[n] === statName) return 0.9;
        return 1;
    };

    const getRealStat = (base, iv, ev, level, isHP, natureMult) => {
        base = Number(base) || 80; iv = (iv === '' || iv === undefined) ? 31 : Number(iv); ev = (ev === '' || ev === undefined) ? 0 : Number(ev); level = Number(level) || 100;
        if (isHP) return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
        let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
        return Math.floor(stat * natureMult);
    };

    const getRoleDetails = (slot, p) => {
        let bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[p.id]) ? BASE_STATS[p.id] : null;
        if (!bs && p.baseStats) bs = p.baseStats; 
        if (!bs && p.stats) bs = { hp: p.stats[0], atk: p.stats[1], def: p.stats[2], spa: p.stats[3], spd: p.stats[4], spe: p.stats[5] };
        if (!bs) bs = {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};

        let rHP = getRealStat(bs.hp, slot.iv?.HP, slot.ev?.HP, slot.level, true, 1);
        let rAtk = getRealStat(bs.atk, slot.iv?.ATK, slot.ev?.ATK, slot.level, false, getNatureMultiplier(slot.nature, 'ATK'));
        let rDef = getRealStat(bs.def, slot.iv?.DEF, slot.ev?.DEF, slot.level, false, getNatureMultiplier(slot.nature, 'DEF'));
        let rSpa = getRealStat(bs.spa, slot.iv?.SPATK, slot.ev?.SPATK, slot.level, false, getNatureMultiplier(slot.nature, 'SPATK'));
        let rSpd = getRealStat(bs.spd, slot.iv?.SPDEF, slot.ev?.SPDEF, slot.level, false, getNatureMultiplier(slot.nature, 'SPDEF'));
        let rSpe = getRealStat(bs.spe, slot.iv?.SPD, slot.ev?.SPD, slot.level, false, getNatureMultiplier(slot.nature, 'SPD')); 

        let bstReal = rHP + rAtk + rDef + rSpa + rSpd + rSpe; 
        let bulk = rHP + rDef + rSpd; 
        
        let role = 'mixed';
        if (bulk > (bstReal * 0.51)) role = 'tank';
        else if (rAtk > rSpa * 1.15) role = 'physical';
        else if (rSpa > rAtk * 1.15) role = 'special';

        return { role, bstReal, rAtk, rSpa, bulk, rSpe, rHP };
    };

    // ==========================================
    // PHASE 1: Evaluate Raw Power
    // ==========================================
    pool.forEach(candidate => {
        let baseScore = 0;
        let details = getRoleDetails(candidate.slot, candidate.p);
        candidate.details = details;

        baseScore += (candidate.slot.level * 15); 
        baseScore += (details.bstReal / 1.5); 

        // ⚔️ SPEED TIERS: Speed is vital for Attackers!
        if (details.role !== 'tank') {
            baseScore += (details.rSpe * 1.5); // Huge bonus if it is a fast sweeper
        } else {
            baseScore += (details.bulk / 2); // Tanks get a bonus from their Bulk
        }
        
        let statKeys = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD'];
        let totalEvs = statKeys.reduce((sum, stat) => sum + (Number(candidate.slot.ev?.[stat]) || 0), 0);
        baseScore += (totalEvs / 3); 
        let totalIvs = statKeys.reduce((sum, stat) => sum + (Number(candidate.slot.iv?.[stat]) || 0), 0);
        baseScore += (totalIvs); 

        if (candidate.slot.ability) baseScore += 60;
        // Bonus for competitive abilities — replaces the flat +60 for recognised ones
        const abilityNorm = (candidate.slot.ability || '').toLowerCase().replace(/[^a-z]/g, '');
        const eliteAbilities = {
            // ─── Weather Setters ───────────────────────────────────────────────────
            drought: 150, drizzle: 150, sandstream: 150, snowwarning: 150,
            cloudnine: 70, airlock: 70,
            // ─── Terrain Setters ──────────────────────────────────────────────────
            electricsurge: 140, psychicsurge: 140, grassysurge: 140, mistysurge: 140,
            // ─── Speed & Sweeper ──────────────────────────────────────────────────
            speedboost: 160, contrary: 130, swordofruin: 130, beadsofdruin: 130,
            tabletofruin: 130, vesselofruin: 130,
            trickster: 110, moxie: 120, beastboost: 120, powerspot: 80,
            hustle: 100, ironfist: 110, sheerforce: 120, reckless: 110,
            strongjaw: 100, toughclaws: 130, adaptability: 130, download: 130,
            technician: 120, punkrock: 110, transistor: 120, dragonsmaw: 120,
            // ─── Defensive / Passive ──────────────────────────────────────────────
            intimidate: 150, regenerator: 150, multiscale: 120,
            magicguard: 140, wonderguard: 90, solidrock: 90, filterfr: 90,
            filter: 90, prismarmor: 90,
            naturalcure: 110, poisonheal: 120, guts: 120, marvelscale: 90,
            thickfat: 100, waterabsorb: 100, voltabsorb: 100, flashfire: 100,
            levitate: 120, sapsipper: 100, motordrive: 100, lightningrod: 100,
            stormdrain: 100, eartheater: 100,
            immunity: 80, owntempo: 70, innerfocus: 70, oblivious: 60,
            // ─── Weather / Terrain Beneficiaries ──────────────────────────────────
            swiftswim: 100, chlorophyll: 100, sandrush: 100, slushrush: 100,
            icebody: 70, raindish: 70, sandforce: 90, sandveil: 60, snowcloak: 60,
            solarpanel: 70, leafguard: 60, flowergift: 60,
            electricseed: 70, psychicseed: 70, grassyseed: 70, mistyseed: 70,
            surgesurfer: 100, hadronengine: 130, orichalcumpulse: 130,
            // ─── Hazard / Utility ─────────────────────────────────────────────────
            pressure: 80, roughskin: 90, ironbarbs: 90, aftermath: 80,
            cursedbody: 70, flamebody: 70, poisonpoint: 60, effectspore: 60,
            static: 60, synchronize: 60,
            unaware: 100, shadowtag: 80, arenatrap: 80, magnetpull: 80,
            // ─── Role / Misc ──────────────────────────────────────────────────────
            protosynthesis: 120, quarkdrive: 120, zenmode: 80, powerofalchemy: 70,
            serenegrace: 160, skilllink: 100, sniper: 70, superluck: 60,
            moody: 80, pickpocket: 60, prankster: 110, infiltrator: 90,
            magician: 70, trace: 80, imposter: 90,
        };
        if (eliteAbilities[abilityNorm]) baseScore += eliteAbilities[abilityNorm] - 60; // replace flat +60
        if (candidate.slot.nature) baseScore += 40;
        if (candidate.slot.item) {
            let item = candidate.slot.item.toLowerCase().replace(/[^a-z]/g, '');
            if (item === 'leftovers' || item === 'blacksludge') baseScore += (details.role === 'tank') ? 120 : 30;
            else if (item.includes('choice')) baseScore += 90;
            else if (item === 'lifeorb' || item === 'focussash') baseScore += 80;
            else if (item === 'assaultvest') baseScore += 70;
            else baseScore += 40;
        }

        let nMultAtk = getNatureMultiplier(candidate.slot.nature, 'ATK');
        let nMultSpa = getNatureMultiplier(candidate.slot.nature, 'SPATK');

        (candidate.slot.moveNames || []).forEach(moveId => {
            if (!moveId) return;
            let moveData = null;
            if (typeof MOVE_INFO !== 'undefined') moveData = MOVE_INFO[moveId] || MOVE_INFO[moveId.toLowerCase().replace(/\s+/g, '-')];
            if (!moveData) return;
            
            baseScore += 30; 
            if (candidate.p.types.includes(moveData.type)) baseScore += 60; 

            if (moveData.cat === 'status') {
                baseScore += 35;
            } else {
                if (moveData.cat === 'physical') {
                    baseScore += (nMultAtk > 1) ? 40 : (nMultAtk < 1 ? -40 : 0);
                    baseScore += (details.rAtk >= details.rSpa) ? 40 : -50;
                } else if (moveData.cat === 'special') {
                    baseScore += (nMultSpa > 1) ? 40 : (nMultSpa < 1 ? -40 : 0);
                    baseScore += (details.rSpa >= details.rAtk) ? 40 : -50;
                }
                if (moveData.power >= 90) baseScore += 60;
                else if (moveData.power >= 70) baseScore += 30;
            }
        });

        // Move completeness & glass cannon viability check
        const filledMoves = (candidate.slot.moveNames || []).filter(x => x).length;
        const missingMoves = 4 - filledMoves;
        if (details.role !== 'tank') {
            // Attackers are useless without moves — scale penalty by missing count
            baseScore -= missingMoves * 120;
            // Glass cannon (fast + low bulk): brutal if it has no real moves
            const isGlassCannon = details.bulk < 280 && details.rSpe > 110;
            if (isGlassCannon && filledMoves < 2) baseScore -= 500;
        } else {
            baseScore -= missingMoves * 60;
        }
        if (filledMoves === 4) baseScore += 80;

        // Key-stat IV quality for sweepers (bad IVs in attack/speed = wasted slot)
        if (details.role !== 'tank') {
            const atkIV  = (candidate.slot.iv?.ATK   === '' || candidate.slot.iv?.ATK   === undefined) ? 31 : Number(candidate.slot.iv?.ATK);
            const spaIV  = (candidate.slot.iv?.SPATK === '' || candidate.slot.iv?.SPATK === undefined) ? 31 : Number(candidate.slot.iv?.SPATK);
            const speIV  = (candidate.slot.iv?.SPD   === '' || candidate.slot.iv?.SPD   === undefined) ? 31 : Number(candidate.slot.iv?.SPD);
            const relevantIV = details.rAtk >= details.rSpa ? Math.min(atkIV, speIV) : Math.min(spaIV, speIV);
            if (relevantIV < 20) baseScore -= (20 - relevantIV) * 15;
        }

        candidate.baseScore = baseScore;
    });

    // ==========================================
    // PHASE 1B: Preset Score Modifiers
    // ==========================================
    pool.forEach(candidate => {
        const candAb = (candidate.slot.ability || '').toLowerCase().replace(/[^a-z]/g, '');
        const types  = candidate.p.types || [];
        const details = candidate.details;

        if (preset === 'hyper-offense') {
            if (details.role === 'tank')                            candidate.baseScore -= 300;
            if (details.rSpe >= 110)                               candidate.baseScore += 200;
            if (details.bulk < 280 && details.rSpe >= 100)         candidate.baseScore += 150;
        } else if (preset === 'rain') {
            if (candAb === 'drizzle')                              candidate.baseScore += 500;
            if (candAb === 'swiftswim')                            candidate.baseScore += 300;
            if (types.includes('water'))                           candidate.baseScore += 150;
        } else if (preset === 'sun') {
            if (candAb === 'drought')                              candidate.baseScore += 500;
            if (candAb === 'chlorophyll' || candAb === 'solarpower') candidate.baseScore += 300;
            if (types.includes('fire'))                            candidate.baseScore += 150;
        } else if (preset === 'sand') {
            if (candAb === 'sandstream')                           candidate.baseScore += 500;
            if (candAb === 'sandrush' || candAb === 'sandforce')   candidate.baseScore += 300;
            if (types.includes('rock') || types.includes('ground') || types.includes('steel')) candidate.baseScore += 100;
        } else if (preset === 'trick-room') {
            if (details.rSpe < 60)                                 candidate.baseScore += 250;
            if (details.rSpe >= 90 && details.role !== 'tank')     candidate.baseScore -= 200;
            const hasTR = (candidate.slot.moveNames || []).some(mn => {
                const md = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[mn] || MOVE_INFO[(mn || '').toLowerCase().replace(/\s+/g, '-')]) : null;
                return md && md.name && md.name.toLowerCase().includes('trick room');
            });
            if (hasTR) candidate.baseScore += 400;
        }
        // 'balance' = no modifier (default AI weights)
    });

    // ==========================================
    // PHASE 2: AI Master Drafting (Coverage, Synergy & 4x Weaknesses)
    // ==========================================
    let bestTeam = [];
    console.log("=== START ENDGAME AI DRAFTING ===");

    while (bestTeam.length < 6 && bestTeam.length < pool.length) {
        let bestScore = -Infinity;
        let bestCandidate = null;
        let logDetails = "";

        pool.filter(x => !bestTeam.includes(x)).forEach(candidate => {
            let currentScore = candidate.baseScore;
            let tempLog = [];

            if (bestTeam.length > 0) {
                // 1. DEFENSIVE SYNERGY, IMMUNITIES & 4x WEAKNESSES
                let teamWeaknesses = {};
                if(typeof AT !== 'undefined') AT.forEach(t => teamWeaknesses[t] = 0);
                
                bestTeam.forEach(member => {
                    if(typeof AT !== 'undefined') AT.forEach(t => {
                        let mult = typeof getDynamicMult !== 'undefined' ? getDynamicMult(t, member.p.types, member.slot.ability) : multAtkVsTypes(t, member.p.types);
                        if (mult >= 2) teamWeaknesses[t] += 1; 
                        if (mult <= 0.5) teamWeaknesses[t] -= 1; 
                    });
                });

                if(typeof AT !== 'undefined') AT.forEach(t => {
                    let cMult = typeof getDynamicMult !== 'undefined' ? getDynamicMult(t, candidate.p.types, candidate.slot.ability) : multAtkVsTypes(t, candidate.p.types);
                    
                    // 💀 FATAL 4x WEAKNESS PENALTY 
                    if (cMult >= 4) {
                        currentScore -= 300; 
                        tempLog.push(`💀 Fatal 4x Weak to ${t} (-300)`);
                    }

                    if (teamWeaknesses[t] >= 2) { 
                        if (cMult <= 0.5 && cMult > 0) { currentScore += 180; tempLog.push(`Resists ${t} (+180)`); }
                        if (cMult === 0) { currentScore += 400; tempLog.push(`IMMUNITY to ${t} (+400!)`); } 
                        if (cMult >= 2) { currentScore -= 200; tempLog.push(`Shares ${t} Weakness (-200)`); }
                    } else if (teamWeaknesses[t] === 1) {
                        if (cMult <= 0.5 && cMult > 0) currentScore += 90;
                        if (cMult === 0) currentScore += 200;
                        if (cMult >= 2) currentScore -= 100;
                    }
                });

                // 2. OFFENSIVE COVERAGE ENGINE
                let teamCoverage = new Set();
                bestTeam.forEach(m => {
                    (m.slot.moveNames || []).forEach(moveId => {
                        let md = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[moveId] || MOVE_INFO[moveId.toLowerCase().replace(/\s+/g, '-')]) : null;
                        if (md && md.power > 0) teamCoverage.add(md.type);
                    });
                });

                let addedTypes = new Set();
                (candidate.slot.moveNames || []).forEach(moveId => {
                    let md = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[moveId] || MOVE_INFO[moveId.toLowerCase().replace(/\s+/g, '-')]) : null;
                    if (md && md.power > 0) {
                        if (!teamCoverage.has(md.type) && !addedTypes.has(md.type)) {
                            currentScore += 120; 
                            addedTypes.add(md.type);
                            tempLog.push(`New Coverage: ${md.type.toUpperCase()} (+120)`);
                        } else {
                            currentScore += 10; 
                        }
                    }
                });

                // 3. ROLE BALANCE
                let teamRoles = bestTeam.map(m => m.details.role);
                let tanks = teamRoles.filter(r => r === 'tank').length;
                let phys = teamRoles.filter(r => r === 'physical').length;
                let spec = teamRoles.filter(r => r === 'special').length;

                if (candidate.details.role === 'tank' && tanks === 0) { currentScore += 200; tempLog.push("Needs Tank (+200)"); }
                if (candidate.details.role === 'physical' && phys === 0) { currentScore += 200; tempLog.push("Needs Phys (+200)"); }
                if (candidate.details.role === 'special' && spec === 0) { currentScore += 200; tempLog.push("Needs Spec (+200)"); }
                
                if (candidate.details.role === 'tank' && tanks >= 2) currentScore -= 100; 
                if (candidate.details.role === 'physical' && phys >= 3) currentScore -= 100; 
                if (candidate.details.role === 'special' && spec >= 3) currentScore -= 100; 

                // ============================================================
                // 4. ABILITY SYNERGY ENGINE
                // Detect what the current team already brings (weather, terrain,
                // pivoting, etc.) and reward candidates that synergise with it.
                // Also reward setters more when the team already has beneficiaries.
                // ============================================================
                const teamAbilities = bestTeam.map(m => (m.slot.ability || '').toLowerCase().replace(/[^a-z]/g, ''));
                const candAb = (candidate.slot.ability || '').toLowerCase().replace(/[^a-z]/g, '');

                // Identify conditions the team already sets
                const teamHasSand     = teamAbilities.some(a => a === 'sandstream');
                const teamHasRain     = teamAbilities.some(a => a === 'drizzle');
                const teamHasSun      = teamAbilities.some(a => a === 'drought');
                const teamHasHail     = teamAbilities.some(a => a === 'snowwarning');
                const teamHasElecTer  = teamAbilities.some(a => a === 'electricsurge');
                const teamHasPsyTer   = teamAbilities.some(a => a === 'psychicsurge');
                const teamHasGrsTer   = teamAbilities.some(a => a === 'grassysurge');
                const teamHasMstTer   = teamAbilities.some(a => a === 'mistysurge');
                const teamHasIntim    = teamAbilities.some(a => a === 'intimidate');

                // Rain synergies
                if (teamHasRain) {
                    if (candAb === 'swiftswim') { currentScore += 200; tempLog.push('Swift Swim+Rain (+200)'); }
                    if (candAb === 'dryskin')   { currentScore += 120; tempLog.push('Dry Skin+Rain (+120)'); }
                    if (candAb === 'raindish')  { currentScore += 80;  tempLog.push('Rain Dish+Rain (+80)'); }
                    if (candAb === 'hydration') { currentScore += 80;  tempLog.push('Hydration+Rain (+80)'); }
                    if (candidate.p.types.includes('water')) { currentScore += 60; tempLog.push('Water in Rain (+60)'); }
                }
                // Drizzle setter bonus when team already has Swift Swim / rain abusers
                if (!teamHasRain && candAb === 'drizzle') {
                    const rainAbusers = ['swiftswim', 'dryskin', 'raindish', 'hydration'];
                    const count = teamAbilities.filter(a => rainAbusers.includes(a)).length;
                    if (count > 0) { currentScore += count * 150; tempLog.push(`Drizzle setter+${count} abusers (+${count*150})`); }
                }

                // Sun synergies
                if (teamHasSun) {
                    if (candAb === 'chlorophyll') { currentScore += 200; tempLog.push('Chlorophyll+Sun (+200)'); }
                    if (candAb === 'solarpower')  { currentScore += 140; tempLog.push('Solar Power+Sun (+140)'); }
                    if (candAb === 'dryskin')     { currentScore -= 60;  tempLog.push('Dry Skin hurt by Sun (-60)'); }
                    if (candidate.p.types.includes('fire')) { currentScore += 60; tempLog.push('Fire in Sun (+60)'); }
                    if (candidate.p.types.includes('grass') && candAb !== 'solarpower') { currentScore += 40; tempLog.push('Grass in Sun (+40)'); }
                }
                if (!teamHasSun && candAb === 'drought') {
                    const sunAbusers = ['chlorophyll', 'solarpower'];
                    const count = teamAbilities.filter(a => sunAbusers.includes(a)).length;
                    if (count > 0) { currentScore += count * 150; tempLog.push(`Drought setter+${count} abusers (+${count*150})`); }
                }

                // Sand synergies
                if (teamHasSand) {
                    if (candAb === 'sandrush')   { currentScore += 200; tempLog.push('Sand Rush+Sand (+200)'); }
                    if (candAb === 'sandforce')  { currentScore += 140; tempLog.push('Sand Force+Sand (+140)'); }
                    if (candAb === 'sandveil')   { currentScore += 60;  tempLog.push('Sand Veil+Sand (+60)'); }
                    if (candidate.p.types.includes('rock') || candidate.p.types.includes('ground') || candidate.p.types.includes('steel')) {
                        currentScore += 60; tempLog.push('Sand immunity type (+60)');
                    }
                }
                if (!teamHasSand && candAb === 'sandstream') {
                    const sandAbusers = ['sandrush', 'sandforce', 'sandveil'];
                    const count = teamAbilities.filter(a => sandAbusers.includes(a)).length;
                    if (count > 0) { currentScore += count * 150; tempLog.push(`Sand Stream setter+${count} abusers (+${count*150})`); }
                }

                // Hail/Snow synergies
                if (teamHasHail) {
                    if (candAb === 'slushrush')  { currentScore += 200; tempLog.push('Slush Rush+Snow (+200)'); }
                    if (candAb === 'icebody')    { currentScore += 80;  tempLog.push('Ice Body+Snow (+80)'); }
                    if (candAb === 'snowcloak')  { currentScore += 60;  tempLog.push('Snow Cloak+Snow (+60)'); }
                    if (candidate.p.types.includes('ice')) { currentScore += 50; tempLog.push('Ice in Snow (+50)'); }
                }

                // Electric Terrain synergies
                if (teamHasElecTer) {
                    if (candAb === 'surgesurfer')   { currentScore += 200; tempLog.push('Surge Surfer+E.Terrain (+200)'); }
                    if (candAb === 'hadronengine')  { currentScore += 180; tempLog.push('Hadron Engine+E.Terrain (+180)'); }
                    if (candAb === 'electricseed')  { currentScore += 100; tempLog.push('Electric Seed+E.Terrain (+100)'); }
                    if (candidate.p.types.includes('electric')) { currentScore += 50; tempLog.push('Electric in E.Terrain (+50)'); }
                }

                // Psychic Terrain synergies
                if (teamHasPsyTer) {
                    if (candAb === 'psychicseed')  { currentScore += 100; tempLog.push('Psychic Seed+P.Terrain (+100)'); }
                    if (candidate.p.types.includes('psychic')) { currentScore += 50; tempLog.push('Psychic in P.Terrain (+50)'); }
                }

                // Grassy Terrain synergies
                if (teamHasGrsTer) {
                    if (candAb === 'grassyseed')   { currentScore += 100; tempLog.push('Grassy Seed+G.Terrain (+100)'); }
                    if (candAb === 'grasspelt')    { currentScore += 80;  tempLog.push('Grass Pelt+G.Terrain (+80)'); }
                    if (candidate.p.types.includes('grass')) { currentScore += 40; tempLog.push('Grass in G.Terrain (+40)'); }
                }

                // Misty Terrain synergies
                if (teamHasMstTer) {
                    if (candAb === 'mistyseed')    { currentScore += 100; tempLog.push('Misty Seed+M.Terrain (+100)'); }
                    if (candidate.p.types.includes('fairy')) { currentScore += 40; tempLog.push('Fairy in M.Terrain (+40)'); }
                }

                // Intimidate chain: reward 2nd Intimidate as rotation partner, penalise 3+
                if (teamHasIntim && candAb === 'intimidate') {
                    const intimCount = teamAbilities.filter(a => a === 'intimidate').length;
                    if (intimCount === 1) { currentScore += 120; tempLog.push('Intimidate pair (+120)'); }
                    else { currentScore -= 80; tempLog.push('3rd Intimidate (-80)'); }
                }

                // Regenerator: reward 2nd Regen (rotation core), soft-penalise 3+
                if (teamAbilities.includes('regenerator') && candAb === 'regenerator') {
                    const regenCount = teamAbilities.filter(a => a === 'regenerator').length;
                    if (regenCount === 1) { currentScore += 100; tempLog.push('Regen pair (+100)'); }
                    else { currentScore -= 60; tempLog.push('3rd Regen (-60)'); }
                }

                // Prankster: reward support pairings; penalise too many setters
                if (candAb === 'prankster') {
                    if (candidate.details.role === 'tank') { currentScore += 80; tempLog.push('Prankster support tank (+80)'); }
                }

                // Trick Room synergy: slow tanks become sweepers with a TR setter
                const teamHasTR = bestTeam.some(m => (m.slot.moveNames || []).some(mn => {
                    const md = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[mn] || MOVE_INFO[(mn || '').toLowerCase().replace(/\s+/g, '-')]) : null;
                    return md && md.name && md.name.toLowerCase().includes('trick room');
                }));
                if (teamHasTR && candidate.details.rSpe < 70 && candidate.details.role !== 'tank') {
                    currentScore += 150; tempLog.push('Slow Sweeper+TrickRoom (+150)');
                }
                if (candAb === 'trickroom') {
                    // Not standard — penalise if already have TR
                    if (teamHasTR) { currentScore -= 100; tempLog.push('Dupe TrickRoom (-100)'); }
                }

                // Speed tie / Paralysis support: reward Prankster + Paralysis enablers
                const teamHasParaSupport = bestTeam.some(m => (m.slot.moveNames || []).some(mn => {
                    const md = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[mn] || MOVE_INFO[(mn || '').toLowerCase().replace(/\s+/g, '-')]) : null;
                    return md && md.cat === 'status' && md.type === 'electric';
                }));
                if (teamHasParaSupport && candAb === 'swiftswim') { /* no extra bonus */ }

                // Weather-immune / Overcast: if team has multiple weather setters, Cloud Nine/Air Lock gets bonus
                const weatherSetterCount = teamAbilities.filter(a => ['drought','drizzle','sandstream','snowwarning'].includes(a)).length;
                if (weatherSetterCount >= 2 && (candAb === 'cloudnine' || candAb === 'airlock')) {
                    currentScore += 120; tempLog.push('Weather cancel utility (+120)');
                }
            }

            // Assassin Mode Check
            if (window.oppTeam && window.oppTeam.length > 0 && typeof window.calcAssassinScore === 'function') {
                currentScore += window.calcAssassinScore(candidate);
            }

            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestCandidate = candidate;
                logDetails = tempLog.join(' | ');
            }
        });

        if(bestCandidate) {
            bestCandidate.slot.aiScore = Math.floor(bestScore); // Store score for the UI!
            bestTeam.push(bestCandidate);
            console.log(`✅ SLOT #${bestTeam.length}: ${bestCandidate.p.name} | Total Score: ${Math.floor(bestScore)}`);
            if (logDetails) console.log(`   -> Tactics: ${logDetails}`);
        }
    }

    // ==========================================
    // PHASE 3: Apply (Without Reordering!)
    // ==========================================
    pool.forEach(x => {
        x.slot.calc = bestTeam.includes(x);
    });
    
    saveTeam(); 
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    
    let teamNames = bestTeam.map(x => x.p.name).join(', ');
    alert(`🏆 The Ideal 6 have been selected!\n\n${teamNames}\n\nThe AI scanned 4x Weaknesses, Speed Tiers and Immunities! Their scores are now shown in the Calculator!`);
}
