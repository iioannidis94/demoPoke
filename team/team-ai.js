// --- team-ai.js : ENDGAME PvP MASTER AI (Coverage, Synergy, Speed Tiers, 4x Weaknesses) ---

function autoRecommendTeam() {
    const pool = team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.slot.pokemonId && x.p);
    
    if (pool.length === 0) { alert('Πρόσθεσε μερικά Pokémon στο ρόστερ σου πρώτα!'); return; }
    if (pool.length <= 6) { pool.forEach(x => x.slot.calc = true); saveTeam(); if (typeof renderTeamSlots === 'function') renderTeamSlots(); return; }

    if (!confirm(`Master Mode: Το AI θα σαρώσει Speed Tiers, 4x Weaknesses, Roles και Offensive Coverage. Ξεκινάμε;`)) return;

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
    // PHASE 1: Αξιολόγηση Ωμής Δύναμης (Raw Power)
    // ==========================================
    pool.forEach(candidate => {
        let baseScore = 0;
        let details = getRoleDetails(candidate.slot, candidate.p);
        candidate.details = details;

        baseScore += (candidate.slot.level * 15); 
        baseScore += (details.bstReal / 1.5); 

        // ⚔️ SPEED TIERS: Η ταχύτητα είναι ζωτική για τους Attackers!
        if (details.role !== 'tank') {
            baseScore += (details.rSpe * 1.5); // Τεράστιο μπόνους αν είναι γρήγορος sweeper
        } else {
            baseScore += (details.bulk / 2); // Τα Tanks παίρνουν μπόνους από το Bulk τους
        }
        
        let statKeys = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD'];
        let totalEvs = statKeys.reduce((sum, stat) => sum + (Number(candidate.slot.ev?.[stat]) || 0), 0);
        baseScore += (totalEvs / 3); 
        let totalIvs = statKeys.reduce((sum, stat) => sum + (Number(candidate.slot.iv?.[stat]) || 0), 0);
        baseScore += (totalIvs); 

        if (candidate.slot.ability) baseScore += 60;
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
        candidate.baseScore = baseScore;
    });

    // ==========================================
    // PHASE 2: AI Master Drafting (Coverage, Synergy & 4x Weaknesses)
    // ==========================================
    let bestTeam = [];
    console.log("=== ΕΝΑΡΞΗ ENDGAME AI DRAFTING ===");

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
            bestCandidate.slot.aiScore = Math.floor(bestScore); // Αποθήκευση σκορ για το UI!
            bestTeam.push(bestCandidate);
            console.log(`✅ SLOT #${bestTeam.length}: ${bestCandidate.p.name} | Total Score: ${Math.floor(bestScore)}`);
            if (logDetails) console.log(`   -> Tactics: ${logDetails}`);
        }
    }

    // ==========================================
    // PHASE 3: Εφαρμογή (Χωρίς Αναδιάταξη!)
    // ==========================================
    pool.forEach(x => {
        x.slot.calc = bestTeam.includes(x);
    });
    
    saveTeam(); 
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    
    let teamNames = bestTeam.map(x => x.p.name).join(', ');
    alert(`🏆 Η Ιδανική 6άδα επιλέχθηκε!\n\n${teamNames}\n\nΤο AI σκάναρε 4x Weaknesses, Speed Tiers και Immunities! Το σκορ τους φαίνεται πλέον στον Calculator!`);
}
