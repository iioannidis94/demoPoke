// --- team-recommender.js : Smart Move Optimizer V2 (Coverage & Equipped Tracking) --- 

window.showMoveRecommendations = function() {
    const selected = typeof calcTeam === 'function' ? calcTeam() : [];
    if (!selected.length) {
        alert('Βάλε πρώτα μερικά Pokémon στο Battle Calculate για να σου προτείνω επιθέσεις!');
        return;
    }

    let modalHtml = `<div id="moveRecModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px; box-sizing:border-box;">
        <div style="background:var(--bg); border:2px solid #4dabf7; border-radius:12px; max-width:850px; width:100%; max-height:90vh; overflow-y:auto; padding:25px; position:relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <button onclick="document.getElementById('moveRecModal').remove()" style="position:absolute; top:15px; right:15px; background:#ff4d4f; color:white; border:none; padding:8px 15px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px; transition:0.2s;">❌ Κλείσιμο</button>
            <h2 style="color:#4dabf7; margin-top:0; font-size:22px;">💡 Master Move Optimizer</h2>
            <p style="font-size:14px; opacity:0.8; margin-bottom:20px;">Το AI αναλύει τώρα την <strong>Επιθετική Ποικιλία (Coverage)</strong>. Δεν θα σου προτείνει ποτέ 2 ίδιους τύπους επιθέσεων, ενώ δίνει προτεραιότητα στα STAB και τα Elite Status Moves!</p>
            <div style="display:flex; flex-direction:column; gap:15px;">`;

    selected.forEach(x => {
        let moveList = [];
        if (typeof MOVES_BY_POKEMON !== 'undefined') {
            moveList = MOVES_BY_POKEMON[x.p.name] 
                    || MOVES_BY_POKEMON[x.p.name.toLowerCase()] 
                    || MOVES_BY_POKEMON[String(x.p.id)] 
                    || MOVES_BY_POKEMON[x.p.id] 
                    || [];
        }

        if (!moveList.length) return;

        let bs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[x.p.id]) ? BASE_STATS[x.p.id] : null;
        if (!bs && x.p.baseStats) bs = x.p.baseStats; 
        if (!bs && x.p.stats) bs = { hp: x.p.stats[0], atk: x.p.stats[1], def: x.p.stats[2], spa: x.p.stats[3], spd: x.p.stats[4], spe: x.p.stats[5] };
        if (!bs) bs = {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};

        let isPhysical = bs.atk > (bs.spa * 1.15); 
        let isSpecial = bs.spa > (bs.atk * 1.15);  

        let scoredMoves = [];

        moveList.forEach(mName => {
            let cleanName = mName.toLowerCase().replace(/\s+/g, '-');
            let mInfo = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[mName] || MOVE_INFO[cleanName]) : null;
            if (!mInfo) return;

            let score = 0;
            let reasons = [];

            if (x.p.types.includes(mInfo.type) && mInfo.cat !== 'status') {
                score += 80;
                reasons.push('💥 STAB');
            }

            if (mInfo.cat === 'physical') {
                if (isPhysical) { score += 50; } 
                else if (isSpecial) { score -= 100; } 
                else { score += 20; }
            } else if (mInfo.cat === 'special') {
                if (isSpecial) { score += 50; } 
                else if (isPhysical) { score -= 100; } 
                else { score += 20; }
            } else if (mInfo.cat === 'status') {
                let eliteStatus = ['toxic', 'recover', 'roost', 'swords-dance', 'nasty-plot', 'dragon-dance', 'stealth-rock', 'spikes', 'will-o-wisp', 'thunder-wave', 'protect', 'leech-seed', 'spore', 'calm-mind', 'defog', 'rapid-spin'];
                if (eliteStatus.includes(cleanName)) {
                    score += 150; // ΤΕΡΑΣΤΙΟ ΜΠΟΝΟΥΣ στα Elite Status!
                    reasons.push('🛡️ Elite Utility');
                } else {
                    score += 20; 
                }
            }

            if (mInfo.cat !== 'status') {
                if (mInfo.power >= 90) { score += 60; reasons.push('High Dmg'); }
                else if (mInfo.power >= 70) { score += 30; }
                else if (mInfo.power > 0 && mInfo.power < 50) { score -= 40; } 

                if (mInfo.acc < 100 && mInfo.acc >= 85) { score -= 15; }
                else if (mInfo.acc < 85 && mInfo.acc > 0) { score -= 40; reasons.push('Low Acc'); }
            }

            if (score > 0) {
                scoredMoves.push({ name: mName, info: mInfo, score, reasons });
            }
        });

        // Σορτάρισμα βάσει σκορ
        scoredMoves.sort((a,b) => b.score - a.score);

        // --- SMART DIVERSITY ENGINE ---
        let topMoves = [];
        let coveredTypes = new Set();
        let statusCount = 0;

        for (let m of scoredMoves) {
            if (topMoves.length >= 6) break;

            if (m.info.cat !== 'status') {
                // Αν έχουμε ήδη βάλει επίθεση που κάνει ζημιά αυτού του τύπου, την προσπερνάμε! (Για τέλειο Coverage)
                if (coveredTypes.has(m.info.type)) continue;
                
                coveredTypes.add(m.info.type);
                topMoves.push(m);
            } else {
                // Θέλουμε μάξιμουμ 2 Status moves στις προτάσεις
                if (statusCount >= 2) continue; 
                statusCount++;
                topMoves.push(m);
            }
        }

        // Αν μετά το φιλτράρισμα δεν φτάσαμε τις 6, γεμίζουμε με τις επόμενες καλύτερες
        if (topMoves.length < 6) {
            let remaining = scoredMoves.filter(m => !topMoves.includes(m));
            topMoves.push(...remaining.slice(0, 6 - topMoves.length));
        }
        // ------------------------------

        let roleText = isPhysical ? 'Physical Attacker' : (isSpecial ? 'Special Attacker' : 'Mixed Attacker');
        let currentMoves = x.slot.moveNames || []; // Παίρνει τις επιθέσεις που του έχεις ήδη βάλει!

        let movesHtml = topMoves.length ? topMoves.map(m => {
            let color = typeof TC !== 'undefined' ? TC[m.info.type] : '#888';
            let isStatus = m.info.cat === 'status';
            let isEquipped = currentMoves.includes(m.name); // Έλεγχος αν την έχεις
            
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
                <span style="font-size:12px; background:rgba(77, 171, 247, 0.2); color:#4dabf7; padding:3px 8px; border-radius:12px;">${roleText}</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
                ${movesHtml}
            </div>
        </div>`;
    });

    modalHtml += `</div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};
