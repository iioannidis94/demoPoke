// --- team-ai.js : The Ultimate AI Algorithm (No Reordering Fix & Smart Draft) ---

function autoRecommendTeam() {
    // 1. Παίρνουμε όλα τα γεμάτα slots από το ρόστερ
    const pool = team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.slot.pokemonId && x.p);
    
    if (pool.length === 0) { alert('Πρόσθεσε μερικά Pokémon στο ρόστερ σου πρώτα!'); return; }
    if (pool.length <= 6) { pool.forEach(x => x.slot.calc = true); saveTeam(); if (typeof renderTeamSlots === 'function') renderTeamSlots(); return; }

    if (!confirm(`Βρέθηκαν ${pool.length} Pokémon. Το AI θα τα σαρώσει ΟΛΑ και θα βρει την απόλυτη 6άδα... Ξεκινάμε;`)) return;

    // --- Βοηθητικές Συναρτήσεις ---
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
        base = Number(base) || 80; 
        iv = (iv === '' || iv === undefined) ? 31 : Number(iv); 
        ev = (ev === '' || ev === undefined) ? 0 : Number(ev);
        level = Number(level) || 100;
        if (isHP) return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
        let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
        return Math.floor(stat * natureMult);
    };

    const getRoleDetails = (slot, p) => {
        // Fallbacks για να είμαστε 100% σίγουροι ότι βρίσκει τα Base Stats
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
        if (bulk > (bstReal * 0.50)) role = 'tank';
        else if (rAtk > rSpa * 1.15) role = 'physical';
        else if (rSpa > rAtk * 1.15) role = 'special';

        return { role, bstReal, rAtk, rSpa, bulk, rSpe };
    };

    // ==========================================
    // PHASE 1: Αξιολόγηση Ωμής Δύναμης (Raw Power)
    // ==========================================
    pool.forEach(candidate => {
        let baseScore = 0;
        let details = getRoleDetails(candidate.slot, candidate.p);
        candidate.details = details;

        // 🔥 ΤΕΡΑΣΤΙΟ ΜΠΟΝΟΥΣ ΣΤΟ LEVEL ΚΑΙ ΤΑ ΣΤΑΤΙΣΤΙΚΑ!
        // Ένα Lvl 100 παίρνει 1500 πόντους, ένα Lvl 75 παίρνει 1125! (Τεράστια διαφορά 375 πόντων)
        baseScore += (candidate.slot.level * 15); 
        
        let statKeys = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD'];
        let totalEvs = statKeys.reduce((sum, stat) => sum + (Number(candidate.slot.ev?.[stat]) || 0), 0);
        baseScore += (totalEvs / 3); 
        
        let totalIvs = statKeys.reduce((sum, stat) => sum + (Number(candidate.slot.iv?.[stat]) || 0), 0);
        baseScore += (totalIvs); 
        
        // Τα πραγματικά στατιστικά δίνουν πλέον διπλάσιους πόντους
        baseScore += (details.bstReal / 1.5); 

        // Ετοιμότητα (Αντικείμενα / Abilities)
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
            if (typeof MOVE_INFO !== 'undefined') {
                moveData = MOVE_INFO[moveId] || MOVE_INFO[moveId.toLowerCase().replace(/\s+/g, '-')];
            }
            if (!moveData) return;
            
            baseScore += 30; 
            if (candidate.p.types.includes(moveData.type)) baseScore += 50; 

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
                if (moveData.power >= 90) baseScore += 50;
                else if (moveData.power >= 70) baseScore += 25;
            }
        });
        candidate.baseScore = baseScore;
    });

    // ==========================================
    // PHASE 2: AI Drafting Phase (Επιλογή με βάση τις ανάγκες)
    // ==========================================
    let bestTeam = [];
    console.log("=== ΕΝΑΡΞΗ AI DRAFTING ===");

    while (bestTeam.length < 6 && bestTeam.length < pool.length) {
        let bestScore = -Infinity;
        let bestCandidate = null;

        pool.filter(x => !bestTeam.includes(x)).forEach(candidate => {
            let currentScore = candidate.baseScore;

            if (bestTeam.length > 0) {
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
                    if (teamWeaknesses[t] >= 2) { 
                        if (cMult <= 0.5 && cMult > 0) currentScore += 180;
                        if (cMult === 0) currentScore += 350; // ΜΑΖΙΚΟ ΜΠΟΝΟΥΣ ΑΝΟΣΙΑΣ (π.χ. Levitate)
                        if (cMult >= 2) currentScore -= 200;
                    } else if (teamWeaknesses[t] === 1) {
                        if (cMult <= 0.5 && cMult > 0) currentScore += 90;
                        if (cMult === 0) currentScore += 180;
                        if (cMult >= 2) currentScore -= 100;
                    }
                });

                let teamMoveTypes = new Set(bestTeam.flatMap(m => m.slot.moves).filter(x => x));
                candidate.slot.moves.filter(m => m).forEach(mt => {
                    if (!teamMoveTypes.has(mt)) currentScore += 50; 
                });

                let teamRoles = bestTeam.map(m => m.details.role);
                let tanks = teamRoles.filter(r => r === 'tank').length;
                let phys = teamRoles.filter(r => r === 'physical').length;
                let spec = teamRoles.filter(r => r === 'special').length;

                if (candidate.details.role === 'tank' && tanks === 0) currentScore += 150; 
                if (candidate.details.role === 'physical' && phys === 0) currentScore += 150; 
                if (candidate.details.role === 'special' && spec === 0) currentScore += 150; 
                
                if (candidate.details.role === 'tank' && tanks >= 2) currentScore -= 50; 
                if (candidate.details.role === 'physical' && phys >= 3) currentScore -= 50; 
                if (candidate.details.role === 'special' && spec >= 3) currentScore -= 50; 
            }

            // Assassin Mode Check
            if (window.oppTeam && window.oppTeam.length > 0 && typeof window.calcAssassinScore === 'function') {
                currentScore += window.calcAssassinScore(candidate);
            }

            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestCandidate = candidate;
            }
        });

        if(bestCandidate) {
            bestTeam.push(bestCandidate);
            console.log(`Επιλέχθηκε: ${bestCandidate.p.name} (Σκορ: ${Math.floor(bestScore)})`);
        }
    }

    // ==========================================
    // PHASE 3: THE FIX - Καμία αναδιάταξη της λίστας!
    // Απλά ανάβουμε τον διακόπτη (calc = true) για τους νικητές
    // ==========================================
    pool.forEach(x => {
        x.slot.calc = bestTeam.includes(x);
    });
    
    saveTeam(); 
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    
    let teamNames = bestTeam.map(x => x.p.name).join(', ');
    alert(`🏆 Η Ιδανική 6άδα επιλέχθηκε!\n\n${teamNames}\n\nΤο AI σκάναρε ΟΛΑ τα Pokémon σου και άναψε το "In calculate" στους νικητές, όπου κι αν βρίσκονται στη λίστα!`);
}
