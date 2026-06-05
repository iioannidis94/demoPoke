// --- team-recommender.js : Move Optimizer & AI Recommendations ---

window.showMoveRecommendations = function() {
    const selected = typeof calcTeam === 'function' ? calcTeam() : [];
    if (!selected.length) {
        alert('Βάλε πρώτα μερικά Pokémon στο Battle Calculate για να σου προτείνω επιθέσεις!');
        return;
    }

    // Δημιουργία του UI (Modal/Popup)
    let modalHtml = `<div id="moveRecModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px; box-sizing:border-box;">
        <div style="background:var(--bg); border:2px solid #4dabf7; border-radius:12px; max-width:850px; width:100%; max-height:90vh; overflow-y:auto; padding:25px; position:relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <button onclick="document.getElementById('moveRecModal').remove()" style="position:absolute; top:15px; right:15px; background:#ff4d4f; color:white; border:none; padding:8px 15px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px; transition:0.2s;">❌ Κλείσιμο</button>
            <h2 style="color:#4dabf7; margin-top:0; font-size:22px;">💡 Master Move Optimizer</h2>
            <p style="font-size:14px; opacity:0.8; margin-bottom:20px;">Το AI ανέλυσε τα Base Stats, το Type και τον Ρόλο των Pokémon που έχεις στον Calculator και προτείνει τις 6 κορυφαίες επιθέσεις για το καθένα. Επίλεξε 4 από αυτές για το τέλειο Moveset!</p>
            <div style="display:flex; flex-direction:column; gap:15px;">`;

    selected.forEach(x => {
        // ΑΛΕΞΙΣΦΑΙΡΗ ΑΝΑΖΗΤΗΣΗ ΕΠΙΘΕΣΕΩΝ (Ψάχνει με Όνομα, ID, Μικρά, Κεφαλαία)
        let moveList = [];
        if (typeof MOVES_BY_POKEMON !== 'undefined') {
            moveList = MOVES_BY_POKEMON[x.p.name] 
                    || MOVES_BY_POKEMON[x.p.name.toLowerCase()] 
                    || MOVES_BY_POKEMON[String(x.p.id)] 
                    || MOVES_BY_POKEMON[x.p.id] 
                    || [];
        }

        if (!moveList.length) {
            console.warn("Δεν βρέθηκαν επιθέσεις στη βάση δεδομένων για:", x.p.name);
            return; 
        }

        // ΑΛΕΞΙΣΦΑΙΡΗ ΑΝΑΖΗΤΗΣΗ BASE STATS (Όπως στο team-ai.js)
        let bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[x.p.id]) ? BASE_STATS[x.p.id] : null;
        if (!bs && x.p.baseStats) bs = x.p.baseStats; 
        if (!bs && x.p.stats) bs = { hp: x.p.stats[0], atk: x.p.stats[1], def: x.p.stats[2], spa: x.p.stats[3], spd: x.p.stats[4], spe: x.p.stats[5] };
        if (!bs) bs = {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};

        let isPhysical = bs.atk > (bs.spa * 1.15); // Ξεκάθαρος Physical
        let isSpecial = bs.spa > (bs.atk * 1.15);  // Ξεκάθαρος Special
        let isMixed = !isPhysical && !isSpecial;   // Μπορεί να παίξει και τα δύο

        let scoredMoves = [];

        // Αξιολόγηση κάθε κίνησης
        moveList.forEach(mName => {
            let cleanName = mName.toLowerCase().replace(/\s+/g, '-');
            let mInfo = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[mName] || MOVE_INFO[cleanName]) : null;
            if (!mInfo) return;

            let score = 0;
            let reasons = [];

            // 1. STAB Bonus (Τεράστια σημασία)
            if (x.p.types.includes(mInfo.type) && mInfo.cat !== 'status') {
                score += 80;
                reasons.push('💥 STAB');
            }

            // 2. Physical vs Special Logic
            if (mInfo.cat === 'physical') {
                if (isPhysical) { score += 50; } 
                else if (isSpecial) { score -= 100; } // Απαγόρευση Physical σε Special Attackers
                else { score += 20; }
            } else if (mInfo.cat === 'special') {
                if (isSpecial) { score += 50; } 
                else if (isPhysical) { score -= 100; } // Απαγόρευση Special σε Physical Attackers
                else { score += 20; }
            } else if (mInfo.cat === 'status') {
                // Elite Status Moves (Setup, Healing, Hazards)
                let eliteStatus = ['toxic', 'recover', 'roost', 'swords-dance', 'nasty-plot', 'dragon-dance', 'stealth-rock', 'spikes', 'will-o-wisp', 'thunder-wave', 'protect', 'leech-seed', 'spore', 'calm-mind'];
                if (eliteStatus.includes(cleanName)) {
                    score += 90;
                    reasons.push('🛡️ Elite Utility');
                } else {
                    score += 10; 
                }
            }

            // 3. Power & Accuracy Check
            if (mInfo.cat !== 'status') {
                if (mInfo.power >= 90) { score += 60; reasons.push('High Dmg'); }
                else if (mInfo.power >= 70) { score += 30; }
                else if (mInfo.power > 0 && mInfo.power < 50) { score -= 40; } // Τιμωρία αδύναμων επιθέσεων

                if (mInfo.acc < 100 && mInfo.acc >= 85) { score -= 15; }
                else if (mInfo.acc < 85 && mInfo.acc > 0) { score -= 40; reasons.push('Low Acc'); }
            }

            // Αν η επίθεση έχει θετικό σκορ, την κρατάμε
            if (score > 0) {
                scoredMoves.push({ name: mName, info: mInfo, score, reasons });
            }
        });

        // Σορτάρισμα από την καλύτερη στη χειρότερη και επιλογή των 6 κορυφαίων
        scoredMoves.sort((a,b) => b.score - a.score);
        let topMoves = scoredMoves.slice(0, 6);

        // UI για το κάθε Pokémon
        let roleText = isPhysical ? 'Physical Attacker' : (isSpecial ? 'Special Attacker' : 'Mixed Attacker');
        modalHtml += `
        <div style="border:1px solid var(--brd); padding:15px; border-radius:8px; background:rgba(0,0,0,0.15);">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
                ${typeof spriteImg !== 'undefined' ? spriteImg(x.p) : ''}
                <strong style="font-size:18px; color:var(--txt);">${x.p.name.replace(/-/g, ' ')}</strong> 
                <span style="font-size:12px; background:rgba(77, 171, 247, 0.2); color:#4dabf7; padding:3px 8px; border-radius:12px;">${roleText}</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
                ${topMoves.length ? topMoves.map(m => {
                    let color = typeof TC !== 'undefined' ? TC[m.info.type] : '#888';
                    let isStatus = m.info.cat === 'status';
                    return \`<div style="border-left: 4px solid \${color}; padding:8px 12px; background:var(--bg); border-radius:6px; font-size:13px; display:flex; flex-direction:column; min-width:140px; box-shadow:0 2px 5px rgba(0,0,0,0.2);">
                        <strong style="color:\${color}; font-size:14px; text-transform:capitalize;">\${m.name.replace(/-/g, ' ')}</strong>
                        <span style="opacity:0.8; font-family:monospace; margin-top:5px; font-size:11px;">
                            \${isStatus ? 'Type: Status' : \`Pwr: <b style="color:white">\${m.info.power}</b> | Acc: <b style="color:white">\${m.info.acc}</b>\`}
                        </span>
                        \${m.reasons.length ? \`<span style="font-size:11px; color:#4dabf7; margin-top:4px; font-weight:bold;">\${m.reasons.join(', ')}</span>\` : ''}
                    </div>\`;
                }).join('') : '<span style="color:red; font-size:12px;">Δεν βρέθηκαν προτεινόμενες επιθέσεις.</span>'}
            </div>
        </div>`;
    });

    modalHtml += `</div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};
