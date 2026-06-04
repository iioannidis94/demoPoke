// --- team-opp.js : Λογική Αντίπαλης Ομάδας (Assassin Mode με Base Stats & Auto-Save) ---

// Φόρτωση από το Local Storage ή αρχικοποίηση
window.oppTeam = JSON.parse(localStorage.getItem('tb_oppTeam')) || [];
window.showOppPanel = JSON.parse(localStorage.getItem('tb_showOppPanel')) || false;

// Βοηθητική συνάρτηση αποθήκευσης
window.saveOpponents = function() {
    localStorage.setItem('tb_oppTeam', JSON.stringify(window.oppTeam));
    localStorage.setItem('tb_showOppPanel', JSON.stringify(window.showOppPanel));
};

window.toggleOppPanel = function() {
    window.showOppPanel = !window.showOppPanel;
    window.saveOpponents();
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

    if(!p) return alert('Το Pokémon δεν βρέθηκε! Δοκίμασε στα Αγγλικά (π.χ. charizard) ή το ID του.');
    if(window.oppTeam.length >= 6) return alert('Η αντίπαλη ομάδα είναι γεμάτη (Max 6)!');
    
    window.oppTeam.push(p.id);
    window.saveOpponents(); // Αποθήκευση
    
    if(document.getElementById('oppSearchInput')) document.getElementById('oppSearchInput').value = '';
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.removeOpponent = function(idx) {
    window.oppTeam.splice(idx, 1);
    window.saveOpponents(); // Αποθήκευση
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.clearOpponents = function() {
    window.oppTeam = [];
    window.saveOpponents(); // Αποθήκευση
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

// Σύγκριση Base Stats & Move Categories
window.getCombatScore = function(myCandidate, oppP) {
    let score = 0;
    
    let opBs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[oppP.id]) ? BASE_STATS[oppP.id] : {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};
    
    let myBs = (typeof BASE_STATS !== 'undefined' && BASE_STATS[myCandidate.p.id]) ? BASE_STATS[myCandidate.p.id] : {hp:80, atk:80, def:80, spa:80, spd:80, spe:80};
    let myAtk = myBs.atk + Math.floor((Number(myCandidate.slot.ev.ATK) || 0) / 4);
    let mySpa = myBs.spa + Math.floor((Number(myCandidate.slot.ev.SPATK) || 0) / 4);

    oppP.types.forEach(ot => {
        let defMult = multAtkVsTypes(ot, myCandidate.p.types);
        if (defMult > 1) score -= 80;  
        if (defMult < 1) score += 40;  
        if (defMult === 0) score += 100; 
    });

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

        if (moveScore > bestMoveScore) bestMoveScore = moveScore;
    });

    return score + bestMoveScore;
};

// UI της αναζήτησης
window.getOpponentUI = function() {
    const optionsHtml = typeof POKE !== 'undefined' ? POKE.map(p => `<option value="${p.name.replace(/-/g, ' ')}">`).join('') : '';

    const toggleBtn = `<button onclick="toggleOppPanel()" style="width:100%; padding:12px; background: ${window.showOppPanel ? '#555' : '#ff4d4f'}; color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; margin-top:20px; font-size:14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.2s;">
        ${window.showOppPanel ? '❌ Κλείσιμο Πάνελ Αντιπάλου' : '🎯 Προσθήκη Αντίπαλης Ομάδας (Assassin Mode)'}
    </button>`;

    if (!window.showOppPanel) return toggleBtn;

    return toggleBtn + `
    <div class="opp-panel" style="margin-top:15px; padding:15px; background:rgba(255, 77, 79, 0.05); border:1px solid #ff4d4f; border-radius:8px;">
        <datalist id="oppPokeList">${optionsHtml}</datalist>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <strong style="color:#ff4d4f; font-size:15px;">Εκτελεστής (Target Mode)</strong>
            <button onclick="clearOpponents()" style="background:#ff4d4f; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:11px;">Καθαρισμός</button>
        </div>
        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <input type="text" id="oppSearchInput" list="oppPokeList" onkeydown="if(event.key === 'Enter') searchAndAddOpponent()" placeholder="Π.χ. garchomp ή 445" style="flex:1; padding:8px; border-radius:4px; border:1px solid var(--brd); background:var(--bg); color:var(--txt);">
            <button onclick="searchAndAddOpponent()" style="padding:8px 15px; cursor:pointer; background:#4dabf7; color:white; border:none; border-radius:4px; font-weight:bold;">Προσθήκη</button>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; min-height:45px;">
            ${window.oppTeam.length === 0 ? '<span style="opacity:0.6; font-size:12px; margin-top:10px;">Πρόσθεσε αντιπάλους για να ενεργοποιήσεις το Assassin Mode στο AI!</span>' : window.oppTeam.map((opId, idx) => {
                let op = POKE.find(p => p.id === opId);
                return `<div style="display:flex; flex-direction:column; align-items:center; background:var(--bg); border:1px solid #ff4d4f; border-radius:8px; padding:8px; position:relative; min-width:65px; box-shadow: 0 2px 4px rgba(255,0,0,0.1);">
                    <button onclick="removeOpponent(${idx})" style="position:absolute; top:-6px; right:-6px; background:#ff4d4f; color:white; border-radius:50%; border:none; width:20px; height:20px; font-size:11px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center;">X</button>
                    ${spriteImg(op)}
                    <span style="font-size:11px; font-weight:bold; margin-top:6px; color:var(--txt);">${op.name.replace(/-/g, ' ')}</span>
                </div>`;
            }).join('')}
        </div>
    </div>`;
};

// Counters UI
window.getMatchupsUI = function(selected) {
    if(!window.showOppPanel || window.oppTeam.length === 0 || !selected || selected.length === 0) return '';
    
    let html = `<div style="margin-top:20px; padding:12px; background:rgba(77, 171, 247, 0.05); border:1px solid #4dabf7; border-radius:8px;">
        <strong style="color:#4dabf7; font-size:14px;">🔥 Τα Καλύτερα Counters (Από την ομάδα σου):</strong>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">`;

    window.oppTeam.forEach(opId => {
        let op = POKE.find(p => p.id === opId);
        let bestCounter = null; let bestScore = -9999;

        selected.forEach(my => {
            let score = window.getCombatScore(my, op); 
            if(score > bestScore) { bestScore = score; bestCounter = my; }
        });

        if(bestCounter) {
            html += `<div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg); padding:8px 12px; border-radius:6px; border-left:4px solid #ff4d4f; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display:flex; align-items:center; gap:8px; width:45%;">
                    ${spriteImg(op)} <span style="font-size:12px; font-weight:bold;">${op.name}</span>
                </div>
                <span style="font-size:16px;">⚔️</span>
                <div style="display:flex; align-items:center; gap:8px; width:45%; justify-content:flex-end;">
                    <span style="font-size:12px; color:#4dabf7; font-weight:bold; text-align:right;">${bestCounter.p.name}</span> ${spriteImg(bestCounter.p)}
                </div>
            </div>`;
        }
    });
    return html + `</div></div>`;
};

// AI Engine
window.calcAssassinScore = function(candidate) {
    let oppScore = 0;
    let oppData = window.oppTeam.map(id => POKE.find(p => p.id === id));

    oppData.forEach(oppP => {
        oppScore += window.getCombatScore(candidate, oppP); 
    });
    
    let validMovesCount = candidate.slot.moves.filter(m => m).length;
    if (validMovesCount < 4) oppScore -= (4 - validMovesCount) * 20;
    return oppScore;
// --- Αναγκαστική εμφάνιση του UI κατά την πρώτη φόρτωση της σελίδας ---
setTimeout(() => {
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
}, 50);


};



