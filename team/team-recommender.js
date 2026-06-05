// --- team-recommender.js : Pro-Tier Move Optimizer V3 (Roles & Strategy) ---

window.showMoveRecommendations = function() {
    const selected = typeof calcTeam === 'function' ? calcTeam() : [];
    if (!selected.length) {
        alert('Βάλε πρώτα μερικά Pokémon στο Battle Calculate για να σου προτείνω επιθέσεις!');
        return;
    }

    // Pro-Tier Move Dictionaries
    const PRO_MOVES = {
        HEAL: ['recover', 'roost', 'soft-boiled', 'slack-off', 'wish', 'moonlight', 'morning-sun', 'milk-drink', 'synthesis', 'shore-up'],
        HAZARD: ['stealth-rock', 'spikes', 'toxic-spikes', 'sticky-web', 'defog', 'rapid-spin', 'court-change'],
        CRIPPLE: ['toxic', 'will-o-wisp', 'thunder-wave', 'spore', 'sleep-powder', 'yawn', 'glare', 'nuzzle', 'leech-seed'],
        SETUP_PHYS: ['swords-dance', 'dragon-dance', 'bulk-up', 'curse', 'belly-drum', 'coil'],
        SETUP_SPEC: ['nasty-plot', 'calm-mind', 'quiver-dance', 'tail-glow', 'geomancy'],
        UTILITY: ['protect', 'taunt', 'substitute', 'trick-room', 'tailwind', 'parting-shot', 'u-turn', 'volt-switch', 'knock-off', 'scald', 'foul-play', 'fake-out']
    };

    const getRealStat = (base, iv, ev, level, isHP) => {
        base = Number(base) || 80; iv = Number(iv) || 31; ev = Number(ev) || 0; level = Number(level) || 100;
        if (isHP) return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
        return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    };

    let modalHtml = `<div id="moveRecModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px; box-sizing:border-box;">
        <div style="background:var(--bg); border:2px solid #4dabf7; border-radius:12px; max-width:850px; width:100%; max-height:90vh; overflow-y:auto; padding:25px; position:relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <button onclick="document.getElementById('moveRecModal').remove()" style="position:absolute; top:15px; right:15px; background:#ff4d4f; color:white; border:none; padding:8px 15px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px; transition:0.2s;">❌ Κλείσιμο</button>
            <h2 style="color:#4dabf7; margin-top:0; font-size:22px;">💡 Pro-Tier Move Optimizer</h2>
            <p style="font-size:14px; opacity:0.8; margin-bottom:20px;">Το AI αναλύει πλέον <strong>Στρατηγικούς Ρόλους (Tanks, Setup Sweepers, Utility)</strong>. Θα δεις Core Healing & Toxic σε αμυντικά Pokémon, και Setup Moves σε επιθετικά!</p>
            <div style="display:flex; flex-direction:column; gap:15px;">`;

    selected.forEach(x => {
        let moveList = [];
        if (typeof MOVES_BY_POKEMON !== 'undefined') {
            moveList = MOVES_BY_POKEMON[x.p.name] || MOVES_BY_POKEMON[x.p.name.toLowerCase()] || MOVES_BY_POKEMON[String(x.p.id)] || MOVES_BY_POKEMON[x.p.id] || [];
        }
        if (!moveList.length) return;

        // Υπολογισμός Ρόλου (Tank vs Sweeper)
        let bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[x.p.id]) ? BASE_STATS[x.p.id] : {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};
        let rHP = getRealStat(bs.hp, x.slot.iv?.HP, x.slot.ev?.HP, x.slot.level, true);
        let rAtk = getRealStat(bs.atk, x.slot.iv?.ATK, x.slot.ev?.ATK, x.slot.level, false);
        let rDef = getRealStat(bs.def, x.slot.iv?.DEF, x.slot.ev?.DEF, x.slot.level, false);
        let rSpa = getRealStat(bs.spa, x.slot.iv?.SPATK, x.slot.ev?.SPATK, x.slot.level, false);
        let rSpd = getRealStat(bs.spd, x.slot.iv?.SPDEF, x.slot.ev?.SPDEF, x.slot.level, false);
        let rSpe = getRealStat(bs.spe, x.slot.iv?.SPD, x.slot.ev?.SPD, x.slot.level, false);

        let bstReal = rHP + rAtk + rDef + rSpa + rSpd + rSpe; 
        let bulk = rHP + rDef + rSpd; 
        
        let isTank = bulk > (bstReal * 0.51); // Αν το μισό του σώμα είναι HP/DEF/SPDEF, είναι Tank!
        let isPhysical = rAtk > rSpa * 1.15; 
        let isSpecial = rSpa > rAtk * 1.15;  

        let scoredMoves = [];

        // Αξιολόγηση με το νέο "Pro" Σύστημα
        moveList.forEach(mName => {
            let cleanName = mName.toLowerCase().replace(/\s+/g, '-');
            let mInfo = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[mName] || MOVE_INFO[cleanName]) : null;
            if (!mInfo) return;

            let score = 0;
            let reasons = [];

            if (mInfo.cat === 'status') {
                if (PRO_MOVES.HEAL.includes(cleanName)) { score += isTank ? 300 : 150; reasons.push(isTank ? '🏥 Core Healing' : '🏥 Self-Heal'); }
                if (PRO_MOVES.CRIPPLE.includes(cleanName)) { score += isTank ? 250 : 120; reasons.push('☠️ Cripple'); }
                if (PRO_MOVES.HAZARD.includes(cleanName)) { score += 200; reasons.push('🪤 Field Control'); }
                if (PRO_MOVES.SETUP_PHYS.includes(cleanName) && isPhysical) { score += 250; reasons.push('⚔️ Sweeper Setup'); }
                if (PRO_MOVES.SETUP_SPEC.includes(cleanName) && isSpecial) { score += 250; reasons.push('🔮 Sweeper Setup'); }
                if (PRO_MOVES.UTILITY.includes(cleanName)) { score += 180; reasons.push('🛡️ Pro Utility'); }
                if (isTank && score === 0) score += 30; // Μικρό bonus σε τυχαία status για τα Tanks
            } else {
                // Damaging Moves
                if (x.p.types.includes(mInfo.type)) { score += 100; reasons.push('💥 STAB'); }
                if (PRO_MOVES.UTILITY.includes(cleanName)) { score += 180; reasons.push('🔄 Pro Utility'); } // U-Turn, Knock Off etc

                if (mInfo.cat === 'physical') {
                    if (isSpecial && !PRO_MOVES.UTILITY.includes(cleanName)) score -= 200;
                    else if (isPhysical) score += 60;
                } else if (mInfo.cat === 'special') {
                    if (isPhysical && !PRO_MOVES.UTILITY.includes(cleanName)) score -= 200;
                    else if (isSpecial) score += 60;
                }

                if (mInfo.power >= 90) { 
                    score += isTank ? 30 : 80; // Τα Tanks δεν καίγονται για Power
                    if(!isTank) reasons.push('High Dmg'); 
                } else if (mInfo.power >= 70) { 
                    score += 40; 
                } else if (mInfo.power > 0 && mInfo.power < 60 && !PRO_MOVES.UTILITY.includes(cleanName)) { 
                    score -= 50; 
                }

                if (mInfo.acc < 100 && mInfo.acc >= 85) score -= 20;
                else if (mInfo.acc < 85 && mInfo.acc > 0) { score -= 50; reasons.push('Low Acc'); }
            }

            if (score > 0) scoredMoves.push({ name: mName, info: mInfo, score, reasons });
        });

        // Σορτάρισμα και Diversification (Ποικιλία)
        scoredMoves.sort((a,b) => b.score - a.score);
        let topMoves = [];
        let coveredTypes = new Set();
        let maxStatus = isTank ? 3 : 2; // Τα Tanks μπορούν να προταθούν με 3 Status!
        let statusCount = 0;

        for (let m of scoredMoves) {
            if (topMoves.length >= 6) break;
            if (m.info.cat !== 'status') {
                if (coveredTypes.has(m.info.type) && !PRO_MOVES.UTILITY.includes(m.name.toLowerCase().replace(/\s+/g, '-'))) continue;
                coveredTypes.add(m.info.type);
                topMoves.push(m);
            } else {
                if (statusCount >= maxStatus) continue; 
                statusCount++;
                topMoves.push(m);
            }
        }

        if (topMoves.length < 6) {
            let remaining = scoredMoves.filter(m => !topMoves.includes(m));
            topMoves.push(...remaining.slice(0, 6 - topMoves.length));
        }

        let roleText = isTank ? 'Tank / Support 🛡️' : (isPhysical ? 'Physical Sweeper ⚔️' : (isSpecial ? 'Special Sweeper 🔮' : 'Mixed Attacker ⚖️'));
        let currentMoves = x.slot.moveNames || []; 

        let movesHtml = topMoves.length ? topMoves.map(m => {
            let color = typeof TC !== 'undefined' ? TC[m.info.type] : '#888';
            let isStatus = m.info.cat === 'status';
            let isEquipped = currentMoves.includes(m.name); 
            
            let statsHtml = isStatus ? 'Type: Status' : `Pwr: <b style="color:white">${m.info.power}</b> | Acc: <b style="color:white">${m.info.acc}</b>`;
            let reasonsHtml = m.reasons.length ? `<span style="font-size:11px; color:#4dabf7; margin-top:4px; font-weight:bold;">${m.reasons.join(', ')}</span>` : '';
            let equippedHtml = isEquipped ? `<span style="background:#2b8a3e; color:white; font-size:10px; padding:2px 5px; border-radius:4px; margin-bottom:6px; display:inline-block; align-self:flex-start; font-weight:bold;">✔️ Equipped</span>` : '';

            return `<div style="border-left: 4px solid ${color}; padding:10px 12px; background:var(--bg); border-radius:6px; font-size:13px; display:flex; flex-direction:column; min-width:140px; box-shadow:0 2px 5px rgba(0,0,0,0.2);">
                ${equippedHtml}
                <strong style="color:${color}; font-size:14px; text-transform:capitalize;">${m.name.replace(/-/g, ' ')}</strong>
                <span style="opacity:0.8; font-family:monospace; margin-top:5px; font-size:11px;">
                    ${statsHtml}
                </span>
                ${reasonsHtml}
            </div>`;
        }).join('') : '<span style="color:red; font-size:12px;">Δεν βρέθηκαν προτεινόμενες επιθέσεις.</span>';

        let spriteHtml = typeof spriteImg !== 'undefined' ? spriteImg(x.p) : '';

        modalHtml += `
        <div style="border:1px solid var(--brd); padding:15px; border-radius:8px; background:rgba(0,0,0,0.15);">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
                ${spriteHtml}
                <strong style="font-size:18px; color:var(--txt);">${x.p.name.replace(/-/g, ' ')}</strong> 
                <span style="font-size:12px; background:rgba(77, 171, 247, 0.2); color:#4dabf7; padding:3px 8px; border-radius:12px; border:1px solid #4dabf7;">${roleText}</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
                ${movesHtml}
            </div>
        </div>`;
    });

    modalHtml += `</div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};
