// --- team-ai.js : Εξελιγμένος Αλγόριθμος AI (Custom Roster Optimizer) ---

function autoRecommendTeam() {
    // 1. Παίρνουμε ΜΟΝΟ τα Pokémon που έχεις βάλει εσύ στα Slots
    const pool = team.map((slot, i) => ({ slot, i, p: POKE.find(x => x.id === slot.pokemonId) })).filter(x => x.slot.pokemonId);
    
    if (pool.length === 0) { 
        alert('Πρόσθεσε μερικά Pokémon στο ρόστερ σου πρώτα!'); 
        return; 
    }
    
    // Αν έχεις βάλει 6 ή λιγότερα, δεν έχει νόημα η επιλογή, τα παίρνει όλα.
    if (pool.length <= 6) { 
        pool.forEach(x => x.slot.calc = true); 
        saveTeam(); 
        if (typeof renderTeamSlots === 'function') renderTeamSlots(); 
        return; 
    }

    if (!confirm(`Βρέθηκαν ${pool.length} Pokémon στο ρόστερ. Το AI θα αναλύσει Stats, EVs, IVs, Natures και Types για να διαλέξει την καλύτερη 6άδα και θα τη μετακινήσει στην κορυφή. Προχωράμε;`)) return;

    let bestTeam = [];

    // --- 2. Υπολογισμός Πραγματικών Στατιστικών (Pokémon Math Formula) ---
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

        // Ο αυθεντικός μαθηματικός τύπος των Pokémon games!
        if (isHP) {
            return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
        } else {
            let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
            return Math.floor(stat * natureMult);
        }
    };

    // --- 3. Καθορισμός Ρόλου με βάση τα ΤΕΛΙΚΑ Stats του χρήστη ---
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
        if (bulk > (bstReal * 0.54)) role = 'tank';
        else if (rAtk > rSpa * 1.15) role = 'physical';
        else if (rSpa > rAtk * 1.15) role = 'special';

        return { role, bstReal, rAtk, rSpa, bulk };
    };

    // --- 4. Αλγόριθμος Επιλογής της Καλύτερης 6άδας ---
    while (bestTeam.length < 6 && bestTeam.length < pool.length) {
        let bestScore = -Infinity, bestCandidate = null;

        pool.filter(x => !bestTeam.includes(x)).forEach(candidate => {
            let score = 0;
            let cTypes = candidate.p.types;
            let details = getRoleDetails(candidate.slot, candidate.p);

            // Βαθμολογία με βάση το πόσο δυνατό είναι το build σου (Stats + IVs + EVs)
            score += (details.bstReal / 20); 

            // Μπόνους αν του έχεις δώσει αντικείμενο, ability και κινήσεις
            if (candidate.slot.item) score += 15;
            if (candidate.slot.ability) score += 10;
            let validMoves = candidate.slot.moves.filter(m => m);
            score += validMoves.length * 10; 

            if (bestTeam.length === 0) {
                if (score > bestScore) { bestScore = score; bestCandidate = candidate; }
                return; // Για το πρώτο Pokémon διαλέγουμε απλά το πιο δυνατό
            }

            // --- Αμυντική Κάλυψη (Defensive Synergy) ---
            let teamWeaknesses = {};
            AT.forEach(t => teamWeaknesses[t] = 0);
            bestTeam.forEach(member => {
                AT.forEach(t => {
                    let mult = multAtkVsTypes(t, member.p.types);
                    if (mult > 1) teamWeaknesses[t] += 1; // Η ομάδα πονάει εδώ
                    if (mult < 1) teamWeaknesses[t] -= 1; // Η ομάδα αντέχει εδώ
                });
            });

            AT.forEach(t => {
                let cMult = multAtkVsTypes(t, cTypes);
                if (teamWeaknesses[t] > 0) { 
                    if (cMult < 1) score += 50; // Καλύπτει την αδυναμία της ομάδας!
                    if (cMult === 0) score += 80; // Έχει ανοσία (Immune)! Τέλεια επιλογή.
                    if (cMult > 1) score -= 60; // Κακή επιλογή, προσθέτει στην ίδια αδυναμία.
                }
            });

            // --- Επιθετική Κάλυψη (Offensive Coverage) ---
            let teamMoveTypes = new Set(bestTeam.flatMap(m => m.slot.moves).filter(x => x));
            validMoves.forEach(mt => {
                if (!teamMoveTypes.has(mt)) score += 20; // Φέρνει νέο τύπο επίθεσης στην ομάδα
            });

            // --- Ισορροπία Ρόλων ---
            let teamRoles = bestTeam.map(m => getRoleDetails(m.slot, m.p).role);
            let tanks = teamRoles.filter(r => r === 'tank').length;
            let phys = teamRoles.filter(r => r === 'physical').length;
            let spec = teamRoles.filter(r => r === 'special').length;

            if (details.role === 'tank' && tanks < 2) score += 35; 
            if (details.role === 'physical' && phys < 2) score += 35; 
            if (details.role === 'special' && spec < 2) score += 35; 
            
            if (details.role === 'physical' && phys >= 2) score -= 45; // Όχι πάρα πολλοί ίδιοι
            if (details.role === 'special' && spec >= 2) score -= 45;  
            if (details.role === 'tank' && tanks >= 3) score -= 50; // Max 2-3 tanks

            if (score > bestScore) { bestScore = score; bestCandidate = candidate; }
        });
        
        bestTeam.push(bestCandidate);
    }

    // --- 5. Αναδιάταξη: Βάζουμε τους 6 νικητές στα πρώτα 6 Slots ---
    let newTeamArray = [];
    
    // Προσθέτουμε πρώτα τους 6 εκλεκτούς (και τους βάζουμε calc = true)
    bestTeam.forEach(x => {
        x.slot.calc = true;
        newTeamArray.push(x.slot);
    });

    // Προσθέτουμε τους υπόλοιπους του pool από κάτω (calc = false)
    pool.filter(x => !bestTeam.includes(x)).forEach(x => {
        x.slot.calc = false;
        newTeamArray.push(x.slot);
    });

    // Γεμίζουμε τα υπόλοιπα κενά slots για να μείνει το μέγεθος (π.χ. 50) σταθερό
    while (newTeamArray.length < team.length) {
        newTeamArray.push(EMPTY_SLOT());
    }

    // Αντικαθιστούμε την παλιά ομάδα με τη νέα ταξινομημένη
    team.splice(0, team.length, ...newTeamArray);

    saveTeam(); 
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    
    alert('✨ Ανάλυση ολοκληρώθηκε! Η Τεχνητή Νοημοσύνη (AI) ανέλυσε τα Base Stats, τα EVs, τα IVs, τα Natures και το Synergy του ρόστερ σου. Η Ιδανική 6άδα μετακινήθηκε στην κορυφή!');
}
