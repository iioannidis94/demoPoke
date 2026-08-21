// --- team-io.js : Showdown Parser & Import/Export ---

function exportTeam() { 
    const filled = team.filter(s => s.pokemonId); 
    const payload = { version: 1, exportedAt: new Date().toISOString(), team: filled }; 
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); 
    const a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob); 
    a.download = `pokedex-team-${new Date().toISOString().slice(0, 10)}.json`; 
    a.click(); 
    setTimeout(() => URL.revokeObjectURL(a.href), 1000); 
    alert(`Exported ${filled.length} Pokémon to JSON.`); 
}

function exportTeamShowdown() {
    const filled = team.filter(s => s.pokemonId);
    if (!filled.length) { alert('Your team is empty.'); return; }

    const statOut = { HP: 'HP', ATK: 'Atk', DEF: 'Def', SPATK: 'SpA', SPDEF: 'SpD', SPD: 'Spe' };
    const lines = filled.map(slot => {
        const p = POKE.find(x => x.id === slot.pokemonId);
        if (!p) return '';
        const out = [];
        out.push(`${p.name.replace(/-/g, ' ')}${slot.item ? ` @ ${slot.item}` : ''}`);
        if (slot.ability) out.push(`Ability: ${slot.ability.replace(/-/g, ' ')}`);
        if (slot.level) out.push(`Level: ${slot.level}`);
        if (slot.teraType) out.push(`Tera Type: ${slot.teraType}`);

        const evParts = TEAM_STATS
            .filter(st => Number(slot.ev?.[st]) > 0)
            .map(st => `${Number(slot.ev[st])} ${statOut[st]}`);
        if (evParts.length) out.push(`EVs: ${evParts.join(' / ')}`);

        const ivParts = TEAM_STATS
            .map(st => ({ st, val: slot.iv?.[st] === '' || slot.iv?.[st] === undefined ? 31 : Number(slot.iv[st]) }))
            .filter(x => x.val !== 31)
            .map(x => `${x.val} ${statOut[x.st]}`);
        if (ivParts.length) out.push(`IVs: ${ivParts.join(' / ')}`);

        if (slot.nature) out.push(`${slot.nature} Nature`);
        (slot.moveNames || []).filter(Boolean).forEach(m => out.push(`- ${m.replace(/-/g, ' ')}`));
        return out.join('\n');
    }).filter(Boolean);

    if (!lines.length) { alert('No valid Pokémon found to export.'); return; }
    const text = lines.join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
        showToast(`📄 Copied ${lines.length} Pokémon in Showdown format.`);
    }).catch(() => {
        prompt('Copy your Showdown export:', text);
    });
}

function importTeamFile(file) { 
    if (!file) return; 
    const reader = new FileReader(); 
    reader.onload = () => { 
        try { 
            const data = JSON.parse(reader.result); 
            const raw = Array.isArray(data) ? data : data.team; 
            if (!Array.isArray(raw)) throw new Error('No team array found'); 
            team = Array.from({ length: TEAM_SIZE }, (_, i) => normalizeSlot(raw[i])); 
            saveTeam(); 
            if (typeof renderTeamSlots === 'function') renderTeamSlots(); 
            alert('Team imported successfully.') 
        } catch (e) { 
            alert('Could not import this team JSON.') 
        } 
    }; 
    reader.readAsText(file) 
}

const SD_STAT_MAP = {
    hp: 'HP', atk: 'ATK', def: 'DEF',
    spa: 'SPATK', spd: 'SPDEF', spe: 'SPD',
    'special-attack': 'SPATK', 'special-defense': 'SPDEF', speed: 'SPD'
};

// --- Enhanced Showdown Parser ---
function parseShowdownBlock(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length);
    if (!lines.length) return null;

    const slot = EMPTY_SLOT();
    const moveNames = [];

    // 1. Read Name and Item
    const firstLine = lines[0];
    const atIdx = firstLine.indexOf('@'); // More forgiving, does not require spaces around @
    let rawName = atIdx !== -1 ? firstLine.slice(0, atIdx).trim() : firstLine.trim();
    if (atIdx !== -1) {
        slot.item = firstLine.slice(atIdx + 1).trim();
    }

    rawName = rawName.replace(/\s*\((M|F)\)\s*$/, '').trim(); // Remove (M) / (F)

    const nicknameMatch = rawName.match(/^.+\((.+)\)\s*$/);
    if (nicknameMatch) rawName = nicknameMatch[1].trim();

    const normalised = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    let pokemon = POKE.find(p => p.name === normalised)
        || POKE.find(p => p.name.startsWith(normalised))
        || POKE.find(p => normalised.startsWith(p.name))
        || POKE.find(p => p.name.replace(/-/g, '') === normalised.replace(/-/g, ''));

    if (!pokemon) return null;   
    slot.pokemonId = pokemon.id;

    // 2. Read remaining lines
    for (let li = 1; li < lines.length; li++) {
        const line = lines[li];

        // LEVEL: Catches "Level: 50" or "Level:50"
        const lvMatch = line.match(/^Level:\s*(\d+)/i);
        if (lvMatch) { 
            slot.level = parseInt(lvMatch[1], 10); 
            continue; 
        }

        // NATURE: Catches "Timid Nature"
        const natMatch = line.match(/^([a-zA-Z]+)\s+nature/i);
        if (natMatch) {
            const nat = natMatch[1].trim();
            // Convert to the correct format (e.g. "Timid")
            slot.nature = nat.charAt(0).toUpperCase() + nat.slice(1).toLowerCase();
            continue;
        }

        const teraMatch = line.match(/^Tera Type:\s*(.+)/i);
        if (teraMatch) {
            slot.teraType = teraMatch[1].trim().toLowerCase();
            continue;
        }


// ABILITY: Catches "Ability: Swift Swim"
        const abilMatch = line.match(/^Ability:\s*(.+)/i);
        if (abilMatch) { 
            // Convert to lowercase and replace spaces with dashes to match data.js
            slot.ability = abilMatch[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'); 
            continue; 
        }

        // EVs: Catches "EVs: 252 SpA / 4 SpD / 252 Spe"
        const evMatch = line.match(/^EVs:\s*(.+)/i);
        if (evMatch) {
            evMatch[1].split('/').forEach(part => {
                const m = part.trim().match(/^(\d+)\s+(\S+)/);
                if (!m) return;
                const key = SD_STAT_MAP[m[2].toLowerCase()];
                if (key) slot.ev[key] = String(Math.min(252, Math.max(0, parseInt(m[1], 10))));
            });
            continue;
        }

        // IVs: Catches "IVs: 0 Atk"
        const ivMatch = line.match(/^IVs:\s*(.+)/i);
        if (ivMatch) {
            ivMatch[1].split('/').forEach(part => {
                const m = part.trim().match(/^(\d+)\s+(\S+)/);
                if (!m) return;
                const key = SD_STAT_MAP[m[2].toLowerCase()];
                if (key) slot.iv[key] = String(Math.min(31, Math.max(0, parseInt(m[1], 10))));
            });
            continue;
        }

        // MOVES: Catches "- Thunderbolt"
        if (line.startsWith('- ')) {
            moveNames.push(line.slice(2).trim());
            continue;
        }
    }

    // Register moves
    slot.moveNames = Array.from({ length: 4 }, (_, i) => moveNames[i] || '');
    slot.moveNames.forEach((mn, i) => {
        if (!mn) return;
        
        // 1. Convert the name to the format "moonblast" or "shadow-ball"
        const key = mn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        // 2. SAVE it back to the slot with the correct format!
        slot.moveNames[i] = key; 
        
        // 3. Find the type and category (from the new key)
        const info = typeof MOVE_INFO !== 'undefined' ? (MOVE_INFO[key] || {}) : {};
        slot.moves[i]    = info.type || '';
        slot.moveCats[i] = info.cat  || '';
    });

    return slot;
}

function parseShowdownPaste(text) {
    const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b.length);
    return blocks.map(parseShowdownBlock).filter(Boolean);
}

function importFromShowdown(slots) {
    let added = 0;
    for (const parsed of slots) {
        const idx = team.findIndex(s => !s.pokemonId);
        if (idx === -1) break;
        team[idx] = normalizeSlot(parsed);
        added++;
    }
    saveTeam();
    if (typeof renderTeamSlots === 'function') renderTeamSlots();
    return added;
}

// Embed the Modal Popup for Showdown
(function injectShowdownModal() {
    const overlay = document.createElement('div');
    overlay.id = 'sdImportOverlay';
    overlay.style.cssText = [
        'display:none', 'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(0,0,0,.75)', 'backdrop-filter:blur(4px)',
        'align-items:center', 'justify-content:center', 'padding:16px'
    ].join(';');


    overlay.innerHTML = `
      <div style="background:#13132a; border:1.5px solid #252545; border-radius:14px; width:100%; max-width:560px; padding:24px; position:relative; font-family:'Nunito',sans-serif; color:#e8e8ff;">
        <button id="sdClose" style="position:absolute; top:14px; right:14px; background:#1a1a30; border:1px solid #252545; color:#7070aa; border-radius:50%; width:28px; height:28px; cursor:pointer; font-size:15px; display:flex; align-items:center; justify-content:center;" title="Close">✕</button>
        <h3 style="font-family:'Press Start 2P',monospace; font-size:11px; color:#ffcc00; margin-bottom:4px; letter-spacing:1px;">📋 PASTE FROM SHOWDOWN</h3>
        <p style="font-size:11px; color:#7070aa; margin-bottom:14px;">Paste one or more Pokémon in Showdown export format. Multiple Pokémon should be separated by a blank line.</p>
        <textarea id="sdPasteArea" rows="12" spellcheck="false" style="width:100%; background:#1a1a30; border:1.5px solid #252545; border-radius:8px; color:#e8e8ff; font-family:monospace; font-size:12px; padding:10px 12px; outline:none; resize:vertical; line-height:1.5;" placeholder="Pikachu @ Light Ball\nAbility: Static\nLevel: 50\nTimid Nature\nEVs: 252 SpA / 4 SpD / 252 Spe\n- Thunderbolt\n- Volt Switch\n- Surf\n- Grass Knot"></textarea>
        <div style="display:flex; gap:10px; margin-top:12px; align-items:center;">
          <button id="sdImportBtn" style="padding:9px 22px; border-radius:50px; border:none; cursor:pointer; background:#ffcc00; color:#0d0d1a; font-family:'Nunito',sans-serif; font-size:13px; font-weight:900; transition:filter .15s;">⬇️ Import to Team</button>
          <span id="sdMsg" style="font-size:12px; font-weight:800; color:#51cf66; opacity:0; transition:opacity .3s;"></span>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    function openModal() {
        overlay.style.display = 'flex';
        document.getElementById('sdPasteArea').focus();
    }
    function closeModal() {
        overlay.style.display = 'none';
        document.getElementById('sdPasteArea').value = '';
        document.getElementById('sdMsg').style.opacity = '0';
    }

    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.getElementById('sdClose').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.style.display === 'flex') closeModal(); });

    document.getElementById('sdImportBtn').addEventListener('click', () => {
        const text = document.getElementById('sdPasteArea').value.trim();
        if (!text) { alert('Please paste some Pokémon data first.'); return; }
        const parsed = parseShowdownPaste(text);
        if (!parsed.length) { alert('Could not recognise any Pokémon in the pasted text. Check your spelling or formatting.'); return; }
        const added = importFromShowdown(parsed);
        const msg = document.getElementById('sdMsg');
        if (added === 0) { alert('Your team is full! Clear a slot first.'); return; }
        msg.textContent = `✓ Added ${added} Pokémon!`;
        msg.style.opacity = '1';
        setTimeout(() => { msg.style.opacity = '0'; }, 2500);
        setTimeout(closeModal, 1400);
    });

    window._openShowdownModal = openModal;
})();

    // --- NEW: SHAREABLE TEAM LINKS ---

// 1. Create and copy the Share Link
function generateShareLink() {
    const filled = team.filter(s => s.pokemonId);
    if (!filled.length) { alert('Your team is empty! Add some Pokémon before sharing.'); return; }
    
    try {
        const json = JSON.stringify(filled);
        const b64 = btoa(encodeURIComponent(json)); // Convert to Base64, safe for URL
        const url = window.location.origin + window.location.pathname + '#team=' + b64;
        
        navigator.clipboard.writeText(url).then(() => {
            showToast('🔗 Share Link copied to clipboard!');
        }).catch(() => {
            // If the browser blocks the clipboard
            prompt('Copy this link to share your team:', url);
        });
    } catch (e) {
        alert('An error occurred while generating the link.');
    }
}

// 2. Check on page load: If a link exists, load the team
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash.startsWith('#team=')) {
        try {
            const b64 = window.location.hash.slice(6); // Gets everything after "#team="
            const json = decodeURIComponent(atob(b64));
            const parsed = JSON.parse(json);
            
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Create a new "Tab" for the imported team
                const newTeamName = "Shared Team " + Math.floor(Math.random() * 1000);
                allData.teams.push({ name: newTeamName, slots: Array.from({ length: TEAM_SIZE }, () => EMPTY_SLOT()) });
                currentTeamIndex = allData.teams.length - 1;
                team = allData.teams[currentTeamIndex].slots;
                
                // Fill the slots
                parsed.forEach((slotData, i) => {
                    if (i < TEAM_SIZE) team[i] = normalizeSlot(slotData);
                });
                
                saveTeam();
                
                // Clean the URL so it does not reload on next refresh
                window.history.replaceState(null, null, window.location.pathname);
                
                // Open the Team Builder automatically
                setTimeout(() => {
                    if (typeof openTeam === 'function') openTeam();
                    if (typeof updateTeamDropdown === 'function') updateTeamDropdown();
                    if (typeof renderTeamSlots === 'function') renderTeamSlots();
                }, 300);
            }
        } catch (e) {
            console.error('Link Error:', e);
            alert('The shared team link is invalid or corrupted.');
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
});

// 4. One-click Export Report: Showdown paste + Share link in one clipboard copy
function copyTeamReport() {
    const filled = team.filter(s => s.pokemonId);
    if (!filled.length) { alert('Your team is empty! Add some Pokémon before exporting.'); return; }

    // Build Showdown text
    const statOut = { HP: 'HP', ATK: 'Atk', DEF: 'Def', SPATK: 'SpA', SPDEF: 'SpD', SPD: 'Spe' };
    const showdownLines = filled.map(slot => {
        const p = POKE.find(x => x.id === slot.pokemonId);
        if (!p) return '';
        const out = [];
        out.push(`${p.name.replace(/-/g, ' ')}${slot.item ? ` @ ${slot.item}` : ''}`);
        if (slot.ability) out.push(`Ability: ${slot.ability.replace(/-/g, ' ')}`);
        if (slot.level) out.push(`Level: ${slot.level}`);
        if (slot.teraType) out.push(`Tera Type: ${slot.teraType}`);
        const evParts = TEAM_STATS.filter(st => Number(slot.ev?.[st]) > 0).map(st => `${Number(slot.ev[st])} ${statOut[st]}`);
        if (evParts.length) out.push(`EVs: ${evParts.join(' / ')}`);
        const ivParts = TEAM_STATS.map(st => ({ st, val: slot.iv?.[st] === '' || slot.iv?.[st] === undefined ? 31 : Number(slot.iv[st]) })).filter(x => x.val !== 31).map(x => `${x.val} ${statOut[x.st]}`);
        if (ivParts.length) out.push(`IVs: ${ivParts.join(' / ')}`);
        if (slot.nature) out.push(`${slot.nature} Nature`);
        (slot.moveNames || []).filter(Boolean).forEach(m => out.push(`- ${m.replace(/-/g, ' ')}`));
        return out.join('\n');
    }).filter(Boolean);

    // Build share link
    let shareUrl = '';
    try {
        const json = JSON.stringify(filled);
        const b64 = btoa(encodeURIComponent(json));
        shareUrl = window.location.origin + window.location.pathname + '#team=' + b64;
    } catch (e) { /* ignore */ }

    const parts = [
        '=== pokeBuilder Team Export ===',
        '',
        showdownLines.join('\n\n'),
    ];
    if (shareUrl) parts.push('', `Share Link: ${shareUrl}`);
    const report = parts.join('\n').trim();

    navigator.clipboard.writeText(report).then(() => {
        showToast(`📋 Team report copied! (${showdownLines.length} Pokémon + share link)`);
    }).catch(() => {
        prompt('Copy your team report:', report);
    });
}

// 3. Dynamically create the "Share Link" button
(function injectShareButton() {
    window.addEventListener('DOMContentLoaded', () => {
        const exportBtn = document.getElementById('teamExport');
        if (!exportBtn) return;
        
        const shareBtn = document.createElement('button');
        shareBtn.className = 'teamTool';
        shareBtn.type = 'button';
        shareBtn.id = 'shareLinkBtn';
        shareBtn.innerHTML = '🔗 Share Link';
        shareBtn.style.cssText = 'border-color:#b197fc; color:#b197fc; background:rgba(177,151,252,0.1); margin-right: 5px;';
        
        shareBtn.addEventListener('click', generateShareLink);
        
        const showdownBtn = document.createElement('button');
        showdownBtn.className = 'teamTool';
        showdownBtn.type = 'button';
        showdownBtn.id = 'showdownExportBtn';
        showdownBtn.innerHTML = '📄 Export Showdown';
        showdownBtn.style.cssText = 'border-color:#63d471; color:#63d471; background:rgba(99,212,113,0.1); margin-right: 5px;';
        showdownBtn.addEventListener('click', exportTeamShowdown);

        // Place it next to the Export button
        exportBtn.parentNode.insertBefore(showdownBtn, exportBtn);
        exportBtn.parentNode.insertBefore(shareBtn, exportBtn);
    });
})();

function downloadDataBundle() {
    if (typeof window.getDataOverridesBundle !== 'function') return;
    const payload = window.getDataOverridesBundle();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pokebuilder-data-bundle-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function sanitizeDataBundle(bundle) {
    if (!bundle || typeof bundle !== 'object') throw new Error('Invalid data bundle');
    const clean = {
        sourceUrl: bundle.sourceUrl ? String(bundle.sourceUrl) : '',
        heldItems: Array.isArray(bundle.heldItems) ? bundle.heldItems.map(x => String(x).trim()).filter(Boolean) : undefined,
        metaThreats: Array.isArray(bundle.metaThreats) ? bundle.metaThreats.filter(t => t && Number.isFinite(Number(t.id)) && typeof t.name === 'string' && Array.isArray(t.types)).map(t => ({
            id: Number(t.id),
            name: String(t.name),
            types: t.types.map(x => String(x).toLowerCase()).filter(Boolean),
            tier: Number(t.tier) || undefined
        })) : undefined
    };

    if (bundle.moveInfo && typeof bundle.moveInfo === 'object') {
        clean.moveInfo = Object.fromEntries(Object.entries(bundle.moveInfo).filter(([key, value]) =>
            key && value && typeof value === 'object' && typeof value.type === 'string' && typeof value.cat === 'string'
        ).map(([key, value]) => [key, {
            type: String(value.type).toLowerCase(),
            cat: String(value.cat).toLowerCase(),
            power: Number(value.power) || 0,
            acc: value.acc === undefined || value.acc === null ? 0 : Number(value.acc) || 0
        }]));
    }

    if (bundle.movesByPokemon && typeof bundle.movesByPokemon === 'object') {
        clean.movesByPokemon = Object.fromEntries(Object.entries(bundle.movesByPokemon).filter(([, value]) => Array.isArray(value)).map(([key, value]) => [
            key,
            value.map(x => String(x).trim()).filter(Boolean)
        ]));
    }

    if (bundle.abilities && typeof bundle.abilities === 'object') {
        clean.abilities = Object.fromEntries(Object.entries(bundle.abilities).filter(([, value]) => Array.isArray(value)).map(([key, value]) => [
            key,
            value.map(x => String(x).trim()).filter(Boolean)
        ]));
    }

    return clean;
}

function importDataBundleFromText(text, sourceUrl) {
    let bundle;
    try {
        bundle = JSON.parse(text);
    } catch (err) {
        throw new Error('Invalid JSON data bundle');
    }
    if (typeof window.applyDataOverridesBundle !== 'function') throw new Error('Data bundle import unavailable');
    window.applyDataOverridesBundle(sanitizeDataBundle(bundle), sourceUrl);
    showToast('🗂 Data bundle applied.');
}

function isTrustedPublicDataUrl(rawUrl) {
    try {
        const parsed = new URL(rawUrl);
        const host = parsed.hostname.toLowerCase();
        const isBracketedHost = parsed.host.startsWith('[');
        const isPrivateIp = /^(10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.)/.test(host);
        const isLocalName = host === 'localhost' || host.endsWith('.local');
        return parsed.protocol === 'https:' && !isPrivateIp && !isLocalName && !isBracketedHost;
    } catch (err) {
        return false;
    }
}

(function injectDataLab() {
    const modal = document.createElement('div');
    modal.id = 'dataLabModal';
    modal.style.cssText = 'display:none; position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,.82); align-items:center; justify-content:center; padding:18px;';
    modal.innerHTML = `
      <div style="width:min(96vw, 640px); max-height:90vh; overflow:auto; background:var(--surf); border:1px solid #4dabf755; border-radius:14px; padding:20px; position:relative;">
        <button id="dataLabClose" style="position:absolute; top:12px; right:12px; border:none; background:#ff4d4f; color:#fff; border-radius:6px; padding:4px 10px; cursor:pointer;">✕</button>
        <h3 style="margin:0 0 6px; color:#4dabf7; font-size:16px;">Data Refresh Lab</h3>
        <p style="font-size:11px; color:var(--dim); margin:0 0 12px;">Refresh threats, moves, abilities, and item suggestions locally from a JSON bundle, or point the app to a public JSON URL when you have a stable source.</p>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
            <button id="dataLabExport" style="padding:8px 12px; border:none; background:#63d471; color:#08120c; border-radius:8px; cursor:pointer; font-weight:900;">⬇ Export bundle</button>
            <label style="padding:8px 12px; background:#4dabf7; color:#fff; border-radius:8px; cursor:pointer; font-weight:900;">⬆ Import JSON<input id="dataLabFile" type="file" accept="application/json,.json" hidden></label>
            <button id="dataLabReset" style="padding:8px 12px; border:1px solid #ff6b6b; background:rgba(255,107,107,0.12); color:#ff6b6b; border-radius:8px; cursor:pointer; font-weight:900;">Reset overrides</button>
        </div>
        <label style="display:flex; flex-direction:column; gap:6px; font-size:11px; color:var(--txt);">
            <span>Public JSON URL (optional integration path)</span>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <input id="dataLabUrl" type="url" placeholder="https://example.com/pokebuilder-meta.json" style="flex:1; min-width:220px; background:var(--bg); border:1px solid var(--brd); border-radius:8px; color:var(--txt); padding:9px 10px; font:800 12px 'Nunito',sans-serif;">
                <button id="dataLabFetch" style="padding:9px 12px; border:none; background:#b197fc; color:#171015; border-radius:8px; cursor:pointer; font-weight:900;">Fetch & apply</button>
            </div>
        </label>
        <pre id="dataLabPreview" style="margin-top:12px; background:var(--bg); border:1px solid var(--brd); border-radius:10px; padding:12px; color:var(--txt); font:700 11px/1.45 monospace; white-space:pre-wrap;"></pre>
      </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    document.body.appendChild(modal);

    function refreshPreview() {
        if (typeof window.getDataOverridesBundle !== 'function') return;
        const bundle = window.getDataOverridesBundle();
        document.getElementById('dataLabPreview').textContent = JSON.stringify(bundle, null, 2);
        document.getElementById('dataLabUrl').value = bundle.sourceUrl || '';
    }

    window.openDataLab = function() {
        refreshPreview();
        modal.style.display = 'flex';
    };

    document.getElementById('dataLabClose').addEventListener('click', () => { modal.style.display = 'none'; });
    document.getElementById('dataLabExport').addEventListener('click', downloadDataBundle);
    document.getElementById('dataLabReset').addEventListener('click', () => {
        if (typeof window.resetDataOverridesBundle === 'function') window.resetDataOverridesBundle();
        refreshPreview();
        showToast('♻️ Data overrides reset.');
    });
    document.getElementById('dataLabFile').addEventListener('change', e => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                importDataBundleFromText(String(reader.result || ''));
                refreshPreview();
            } catch (err) {
                alert('Could not import this data bundle.');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });
    document.getElementById('dataLabFetch').addEventListener('click', async () => {
        const url = document.getElementById('dataLabUrl').value.trim();
        if (!url) return alert('Paste a JSON URL first.');
        if (!isTrustedPublicDataUrl(url)) return alert('Use a trusted public HTTPS JSON URL only.');
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Fetch failed');
            importDataBundleFromText(await res.text(), url);
            refreshPreview();
        } catch (err) {
            alert('Could not fetch a valid data bundle from that URL.');
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        const exportBtn = document.getElementById('teamExport');
        if (!exportBtn) return;
        const dataBtn = document.createElement('button');
        dataBtn.className = 'teamTool';
        dataBtn.type = 'button';
        dataBtn.id = 'dataLabBtn';
        dataBtn.innerHTML = '🗂 Data';
        dataBtn.style.cssText = 'border-color:#4dabf7; color:#4dabf7; background:rgba(77,171,247,0.1); margin-right: 5px;';
        dataBtn.addEventListener('click', () => window.openDataLab && window.openDataLab());
        exportBtn.parentNode.insertBefore(dataBtn, exportBtn);
    });
})();
