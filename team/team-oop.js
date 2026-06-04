// --- team-opp.js : Λογική Αντίπαλης Ομάδας (Assassin/Target Mode) ---

window.oppTeam = window.oppTeam || [];

window.searchAndAddOpponent = function() {
    const input = document.getElementById('oppSearchInput').value.toLowerCase().trim();
    if(!input) return;

    // Καθαρίζουμε το input για να βρίσκει τα Pokémon ακόμα κι αν έχουν κενά αντί για παύλες (π.χ. "mr mime")
    const normalizedInput = input.replace(/\s+/g, '-');

    // Ψάχνει το Pokémon. Πρώτα ελέγχει για ακριβές όνομα (π.χ. από το datalist), μετά για ID, και μετά για partial match
    const p = POKE.find(x => 
        x.name.toLowerCase() === normalizedInput || 
        x.name.toLowerCase().replace(/-/g, ' ') === input ||
        x.id.toString() === input ||
        x.name.toLowerCase().includes(normalizedInput)
    );

    if(!p) return alert('Το Pokémon δεν βρέθηκε! Δοκίμασε στα Αγγλικά (π.χ. charizard) ή το ID του.');
    if(window.oppTeam.length >= 6) return alert('Η αντίπαλη ομάδα είναι γεμάτη (Max 6)!');
    
    window.oppTeam.push(p.id);
    
    // Καθαρίζουμε το πεδίο μόλις προστεθεί για να είναι έτοιμο για το επόμενο!
    if(document.getElementById('oppSearchInput')) document.getElementById('oppSearchInput').value = '';

    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.removeOpponent = function(idx) {
    window.oppTeam.splice(idx, 1);
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

window.clearOpponents = function() {
    window.oppTeam = [];
    if(typeof renderTeamSlots === 'function') renderTeamSlots();
};

// Φτιάχνει το UI της αναζήτησης
window.getOpponentUI = function() {
    // Δημιουργούμε το HTML για το Datalist (τα recommendations)
    const optionsHtml = typeof POKE !== 'undefined' ? POKE.map(p => `<option value="${p.name.replace(/-/g, ' ')}">`).join('') : '';

    return `
    <div class="opp-panel" style="margin-top:25px; padding:15px; background:rgba(255, 77, 79, 0.05); border:1px solid #ff4d4f; border-radius:8px;">
        <!-- Το Datalist κρύβεται στο παρασκήνιο και "ταΐζει" το input -->
        <datalist id="oppPokeList">
            ${optionsHtml}
        </datalist>
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <strong style="color:#ff4d4f; font-size:15px;">🎯 VS Αντίπαλη Ομάδα (Target Mode)</strong>
            <button onclick="clearOpponents()" style="background:#ff4d4f; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:11px;">Καθαρισμός</button>
        </div>
        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <!-- Προστέθηκε το list="oppPokeList" και το onkeydown για το Enter -->
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

// Υπολογίζει τα Counters για το UI
window.getMatchupsUI = function(selected) {
    if(window.oppTeam.length === 0 || !selected || selected.length === 0) return '';
    
    let html = `<div style="margin-top:20px; padding:12px; background:rgba(77, 171, 247, 0.05); border:1px solid #4dabf7; border-radius:8px;">
        <strong style="color:#4dabf7; font-size:14px;">🔥 Τα Καλύτερα Counters (Από την ομάδα σου):</strong>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">`;

    window.oppTeam.forEach(opId => {
        let op = POKE.find(p => p.id === opId);
        let bestCounter = null; let bestScore = -9999;

        selected.forEach(my => {
            let score = 0;
            op.types.forEach(ot => {
                let mult = multAtkVsTypes(ot, my.p.types);
                if(mult < 1) score += 20; 
                if(mult === 0) score += 50; 
                if(mult > 1) score -= 40; 
            });
            my.slot.moves.forEach(mt => {
                if(!mt) return;
                let mult = multAtkVsTypes(mt, op.types);
                if(mult > 1) score += 40;
                if(mult > 2) score += 90; 
            });
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

// Υπολογίζει το Score για τον αλγόριθμο AI (Assassin Mode)
window.calcAssassinScore = function(candidate) {
    let oppScore = 0;
    let oppData = window.oppTeam.map(id => POKE.find(p => p.id === id));

    oppData.forEach(oppP => {
        oppP.types.forEach(ot => {
            let defMult = multAtkVsTypes(ot, candidate.p.types);
            if (defMult > 1) oppScore -= 80;  
            if (defMult < 1) oppScore += 40;  
            if (defMult === 0) oppScore += 100; 
        });
        candidate.slot.moves.forEach(mt => {
            if(!mt) return;
            let offMult = multAtkVsTypes(mt, oppP.types);
            if (offMult > 1) oppScore += 60; 
            if (offMult > 2) oppScore += 130; 
        });
    });
    
    let validMovesCount = candidate.slot.moves.filter(m => m).length;
    if (validMovesCount < 4) oppScore -= (4 - validMovesCount) * 20;
    return oppScore;
};
