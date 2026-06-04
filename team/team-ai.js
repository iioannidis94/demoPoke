// --- team-ai.js : Εξελιγμένος Αλγόριθμος AI (Competitive VGC/Singles Optimizer με Move Intelligence & Assassin Mode) ---

function autoRecommendTeam() {
    const pool = team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.slot.pokemonId);
    
    if (pool.length === 0) { alert('Πρόσθεσε μερικά Pokémon στο ρόστερ σου πρώτα!'); return; }
    if (pool.length <= 6) { pool.forEach(x => x.slot.calc = true); saveTeam(); if (typeof renderTeamSlots === 'function') renderTeamSlots(); return; }

    if (!confirm(`Βρέθηκαν ${pool.length} Pokémon στο ρόστερ. Το AI θα αναλύσει Stats, EVs, Επιθέσεις και θα προσαρμοστεί στους αντιπάλους (αν υπάρχουν). Ξεκινάμε;`)) return;

    let bestTeam = [];

    const getNatureMultiplier = (nature, statName) => {
        if (!nature) return 1;
        const n = nature.toLowerCase();
        const buffs = { adamant: 'ATK', bold: 'DEF', impish: 'DEF', timid: 'SPD', jolly: 'SPD', modest: 'SPATK', mild: 'SPATK', quiet: 'SPATK', calm: 'SPDEF', careful: 'SPDEF', sassy: 'SPDEF', brave: 'ATK', naughty: 'ATK', rash: 'SPATK', lax: 'DEF', naive: 'SPD', hasty: 'SPD' };
        const nerfs = { adamant: 'SPATK', bold: 'ATK', impish: 'SPATK', timid: 'ATK', jolly: 'SPATK', modest: 'ATK', mild: 'DEF', quiet: 'SPD', calm: 'ATK', careful: 'SPATK', sassy: 'SPD', brave: 'SPD', naughty: 'SPDEF', rash: 'SPDEF', lax: 'SPDEF', naive: 'SPDEF', hasty: 'DEF' };
        
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

        return { role, bstReal, rAtk, rSpa, bulk };
    };

    while (bestTeam.length < 6 && bestTeam.length < pool.length) {
        let bestScore = -Infinity, bestCandidate = null;
        console.log(`\n--- ΑΞΙΟΛΟΓΗΣΗ ΓΙΑ ΤΟ SLOT #${bestTeam.length + 1} ---`);

        pool.filter(x => !bestTeam.includes(x)).forEach(candidate => {
            let score = 0;
            let cTypes = candidate.p.types;
            let details = getRoleDetails(candidate.slot, candidate.p);

            // 1. ΕΤΟΙΜΟΤΗΤΑ PvP
            if (candidate.slot.item) score += 60; 
            if (candidate.slot.ability) score += 40;
            if (candidate.slot.nature) score += 30;
            
            let totalEvs = TEAM_STATS.reduce((sum, stat) => sum + (Number(candidate.slot.ev[stat]) || 0), 0);
            if (totalEvs >= 500) score += 80; 
            else if (totalEvs > 0) score += (totalEvs / 10); 

            // 2. MOVE INTELLIGENCE
            let validMovesCount = 0;
            let nMultAtk = getNatureMultiplier(candidate.slot.nature, 'ATK');
            let nMultSpa = getNatureMultiplier(candidate.slot.nature, 'SPATK');

            (candidate.slot.moveNames || []).forEach(moveId => {
                if (!moveId) return;
                let moveData = (typeof MOVE_INFO !== 'undefined') ? MOVE_INFO[moveId] : null;
                if (!moveData) return;

                validMovesCount++;
                score += 15; 

                if (cTypes.includes(moveData.type)) score += 35; 

                if (moveData.cat === 'status') {
                    score += 25; 
                } else {
                    if (moveData.cat === 'physical') {
                        if (nMultAtk > 1) score += 25; 
                        else if (nMultAtk < 1) score -= 40; 
                        if (details.rAtk >= details.rSpa) score += 20; else score -= 30; 
                    } else if (moveData.cat === 'special') {
                        if (nMultSpa > 1) score += 25; 
                        else if (nMultSpa < 1) score -= 40; 
                        if (details.rSpa >= details.rAtk) score += 20; else score -= 30; 
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

            if (bestTeam.length === 0) {
                if (score > bestScore) { bestScore = score; bestCandidate = candidate; }
                return; 
            }

            // 4. ΑΜΥΝΤΙΚΗ ΣΥΝΟΧΗ & ASSASSIN MODE
            if (window.oppTeam && window.oppTeam.length > 0 && window.calcAssassinScore) {
                // ASSASSIN MODE: Το AI καλεί τη συνάρτηση από το team-opp.js
                score += window.calcAssassinScore(candidate);
            } else {
                // NORMAL MODE: Το κλασικό Synergy που είχαμε ήδη
                let teamWeaknesses = {};
                AT.forEach(t => teamWeaknesses[t] = 0);
                bestTeam.forEach(member => {
                    AT.forEach(t => {
                        let mult = multAtkVsTypes(t, member.p.types);
                        if (mult >= 2) teamWeaknesses[t] += 1; 
                        if (mult <= 0.5) teamWeaknesses[t] -= 1; 
                    });
                });

                AT.forEach(t => {
                    let cMult = multAtkVsTypes(t, cTypes);
                    if (teamWeaknesses[t] >= 2) { 
                        if (cMult <= 0.5 && cMult > 0) score += 120; 
                        if (cMult === 0) score += 200; 
                        if (cMult >= 2) score -= 150; 
                    } else if (teamWeaknesses[t] === 1) {
                        if (cMult <= 0.5 && cMult > 0) score += 60; 
                        if (cMult === 0) score += 100; 
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

            console.log(`[Score: ${Math.floor(score)}] ${candidate.p.name} | Role: ${details.role}`);

            if (score > bestScore) { bestScore = score; bestCandidate = candidate; }
        });
        
        console.log(`>>> ΕΠΙΛΟΓΗ SLOT #${bestTeam.length + 1}: ${bestCandidate.p.name} <<<`);
        bestTeam.push(bestCandidate);
    }

    // --- Ολοκλήρωση & Αναδιάταξη ---
    let newTeamArray = [];
    bestTeam.forEach(x => { x.slot.calc = true; newTeamArray.push(x.slot); });
    pool.filter(x => !bestTeam.includes(x)).forEach(x => { x.slot.calc = false; newTeamArray.push(x.slot); });
    while (newTeamArray.length < team.length) newTeamArray.push(EMPTY_SLOT());
    
    team.splice(0, team.length, ...newTeamArray);
    saveTeam(); 
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    
    alert('🏆 Ομάδα έτοιμη! Ο αλγόριθμος ανέλυσε τα δεδομένα (Target Mode ή Normal Mode) και έχτισε την ιδανική 6άδα.');
}
