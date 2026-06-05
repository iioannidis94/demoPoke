// --- team-ai.js : Εξελιγμένος Αλγόριθμος AI (Competitive VGC/Singles Optimizer με Move, Item & Ability Intelligence) ---

function autoRecommendTeam() {
    const pool = team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.slot.pokemonId && x.p);
    
    if (pool.length === 0) { alert('Πρόσθεσε μερικά Pokémon στο ρόστερ σου πρώτα!'); return; }
    if (pool.length <= 6) { pool.forEach(x => x.slot.calc = true); saveTeam(); if (typeof renderTeamSlots === 'function') renderTeamSlots(); return; }

    if (!confirm(`Βρέθηκαν ${pool.length} Pokémon. Το AI θα αναλύσει Abilities, Items, Stats και Συνέργειες για να χτίσει την ιδανική 6άδα. Ξεκινάμε;`)) return;

    let bestTeam = [];

    // Διορθωμένο Λεξικό Natures (Καλύπτει πλέον και τα 20 Natures)
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
        let bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[p.id]) ? BASE_STATS[p.id] : {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};
        
        let rHP = getRealStat(bs.hp, slot.iv.HP, slot.ev.HP, slot.level, true, 1);
        let rAtk = getRealStat(bs.atk, slot.iv.ATK, slot.ev.ATK, slot.level, false, getNatureMultiplier(slot.nature, 'ATK'));
        let rDef = getRealStat(bs.def, slot.iv.DEF, slot.ev.DEF, slot.level, false, getNatureMultiplier(slot.nature, 'DEF'));
        let rSpa = getRealStat(bs.spa, slot.iv.SPATK, slot.ev.SPATK, slot.level, false, getNatureMultiplier(slot.nature, 'SPATK'));
        let rSpd = getRealStat(bs.spd, slot.iv.SPDEF, slot.ev.SPDEF, slot.level, false, getNatureMultiplier(slot.nature, 'SPDEF'));
        let rSpe = getRealStat(bs.spe, slot.iv.SPD, slot.ev.SPD, slot.level, false, getNatureMultiplier(slot.nature, 'SPD')); 

        let bstReal = rHP + rAtk + rDef + rSpa + rSpd + rSpe; 
        let bulk = rHP + rDef + rSpd; 
        
        let role = 'mixed';
        if (bulk > (bstReal * 0.52)) role = 'tank';
        else if (rAtk > rSpa * 1.15) role = 'physical';
        else if (rSpa > rAtk * 1.15) role = 'special';

        return { role, bstReal, rAtk, rSpa, bulk, rSpe };
    };

    while (bestTeam.length < 6 && bestTeam.length < pool.length) {
        let bestScore = -Infinity, bestCandidate = null;

        pool.filter(x => !bestTeam.includes(x)).forEach(candidate => {
            let score = 0;
            let cTypes = candidate.p.types;
            let details = getRoleDetails(candidate.slot, candidate.p);

            // 1. ΕΤΟΙΜΟΤΗΤΑ PvP & ITEM INTELLIGENCE
            if (candidate.slot.ability) score += 40;
            if (candidate.slot.nature) score += 30;
            
            if (candidate.slot.item) {
                let item = candidate.slot.item.toLowerCase().replace(/[^a-z]/g, '');
                if (item === 'leftovers' || item === 'blacksludge') {
                    score += (details.role === 'tank') ? 90 : 20; // Τα Tanks κερδίζουν τεράστιο μπόνους!
                } else if (item.includes('choice')) {
                    if (item === 'choiceband' && details.role === 'physical') score += 90;
                    else if (item === 'choicespecs' && details.role === 'special') score += 90;
                    else if (item === 'choicescarf' && details.rSpe > 80) score += 90;
                } else if (item === 'focussash' || item === 'lifeorb') {
                    score += (details.role !== 'tank') ? 80 : 10;
                } else if (item === 'assaultvest') {
                    score += (details.role === 'tank' || details.rAtk > 100 || details.rSpa > 100) ? 70 : 10;
                } else {
                    score += 50;
                }
            }
            
            let totalEvs = TEAM_STATS.reduce((sum, stat) => sum + (Number(candidate.slot.ev[stat]) || 0), 0);
            if (totalEvs >= 500) score += 80; else if (totalEvs > 0) score += (totalEvs / 10); 

            // 2. MOVE INTELLIGENCE (Με Ασφάλεια Ονομάτων)
            let nMultAtk = getNatureMultiplier(candidate.slot.nature, 'ATK');
            let nMultSpa = getNatureMultiplier(candidate.slot.nature, 'SPATK');

            (candidate.slot.moveNames || []).forEach(moveId => {
                if (!moveId) return;
                
                // Διορθωμένο: Ψάχνει το κανονικό ΚΑΙ το "καθαρό" όνομα (με παύλες)
                let moveData = null;
                if (typeof MOVE_INFO !== 'undefined') {
                    moveData = MOVE_INFO[moveId] || MOVE_INFO[moveId.toLowerCase().replace(/\s+/g, '-')];
                }
                if (!moveData) return;

                score += 15; 
                if (cTypes.includes(moveData.type)) score += 35; 

                if (moveData.cat === 'status') {
                    score += 25; 
                } else {
                    if (moveData.cat === 'physical') {
                        if (nMultAtk > 1) score += 25; else if (nMultAtk < 1) score -= 40; 
                        score += (details.rAtk >= details.rSpa) ? 20 : -30; 
                    } else if (moveData.cat === 'special') {
                        if (nMultSpa > 1) score += 25; else if (nMultSpa < 1) score -= 40; 
                        score += (details.rSpa >= details.rAtk) ? 20 : -30; 
                    }
                    if (moveData.power >= 90) score += 25; 
                    else if (moveData.power >= 70) score += 10; 
                    else if (moveData.power > 0 && moveData.power < 50) score -= 20; 

                    if (moveData.acc < 100 && moveData.acc >= 85) score -= 10; 
                    else if (moveData.acc < 85) score -= 25; 
                }
            });

            // 3. ΩΜΑ ΣΤΑΤΙΣΤΙΚΑ
            score += (details.bstReal / 10);

            // 4. ΑΜΥΝΤΙΚΗ ΣΥΝΟΧΗ & ABILITY INTELLIGENCE (Levitate, κλπ)
            if (window.oppTeam && window.oppTeam.length > 0 && typeof window.calcAssassinScore === 'function') {
                score += window.calcAssassinScore(candidate);
            } else if (bestTeam.length > 0) {
                let teamWeaknesses = {};
                AT.forEach(t => teamWeaknesses[t] = 0);
                
                // Χρησιμοποιεί το getDynamicMult για να διαβάσει τα Abilities της ομάδας!
                bestTeam.forEach(member => {
                    AT.forEach(t => {
                        let mult = typeof getDynamicMult !== 'undefined' ? getDynamicMult(t, member.p.types, member.slot.ability) : multAtkVsTypes(t, member.p.types);
                        if (mult >= 2) teamWeaknesses[t] += 1; 
                        if (mult <= 0.5) teamWeaknesses[t] -= 1; 
                    });
                });

                AT.forEach(t => {
                    let cMult = typeof getDynamicMult !== 'undefined' ? getDynamicMult(t, cTypes, candidate.slot.ability) : multAtkVsTypes(t, cTypes);
                    if (teamWeaknesses[t] >= 2) { 
                        if (cMult <= 0.5 && cMult > 0) score += 120; 
                        if (cMult === 0) score += 250; // ΜΑΖΙΚΟ ΜΠΟΝΟΥΣ ΓΙΑ ΑΝΟΣΙΑ (π.χ. Levitate)!
                        if (cMult >= 2) score -= 150; 
                    } else if (teamWeaknesses[t] === 1) {
                        if (cMult <= 0.5 && cMult > 0) score += 60; 
                        if (cMult === 0) score += 120; 
                        if (cMult >= 2) score -= 60; 
                    }
                });
            }

            // 5. ΕΠΙΘΕΤΙΚΗ ΚΑΛΥΨΗ
            let teamMoveTypes = new Set(bestTeam.flatMap(m => m.slot.moves).filter(x => x));
            candidate.slot.moves.filter(m => m).forEach(mt => {
                if (!teamMoveTypes.has(mt)) score += 30; 
            });

            // 6. ΙΣΟΡΡΟΠΙΑ ΡΟΛΩΝ
            let teamRoles = bestTeam.map(m => getRoleDetails(m.slot, m.p).role);
            let tanks = teamRoles.filter(r => r === 'tank').length;
            let phys = teamRoles.filter(r => r === 'physical').length;
            let spec = teamRoles.filter(r => r === 'special').length;

            if (details.role === 'tank' && tanks < 2) score += 50; 
            if (details.role === 'physical' && phys < 2) score += 50; 
            if (details.role === 'special' && spec < 2) score += 50; 
            
            if (details.role === 'physical' && phys >= 2) score -= 60; 
            if (details.role === 'special' && spec >= 2) score -= 60;  
            if (details.role === 'tank' && tanks >= 3) score -= 80; 

            if (score > bestScore) { bestScore = score; bestCandidate = candidate; }
        });
        
        if(bestCandidate) bestTeam.push(bestCandidate);
    }

    // --- Ολοκλήρωση & Αναδιάταξη ---
    let newTeamArray = [];
    bestTeam.forEach(x => { x.slot.calc = true; newTeamArray.push(x.slot); });
    pool.filter(x => !bestTeam.includes(x)).forEach(x => { x.slot.calc = false; newTeamArray.push(x.slot); });
    while (newTeamArray.length < team.length) newTeamArray.push(EMPTY_SLOT());
    
    team.splice(0, team.length, ...newTeamArray);
    saveTeam(); 
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    
    let teamNames = bestTeam.map(x => x.p.name).join(', ');
    alert(`🏆 Ομάδα έτοιμη!\n\nΤο AI υπολόγισε τα Abilities (π.χ. Levitate), τα Held Items, τα Natures και το Synergy.\n\nΕπιλέχθηκαν: ${teamNames}`);
}
