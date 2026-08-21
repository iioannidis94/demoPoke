// --- team-bosses.js : Boss Modal UI ---
// Boss Trainers modal management: list, difficulty selection, team view, load as opponent.

(function () {
    'use strict';

    // ─── State ────────────────────────────────────────────────────────────
    let selectedBossId   = null;
    let selectedDifficulty = null;

    const DIFFICULTY_ORDER  = ['easy', 'medium', 'hard'];
    const DIFFICULTY_LABELS = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' };
    const DIFFICULTY_COLORS = { easy: '#63d471', medium: '#ffc107', hard: '#ff6b6b' };

    // EVs applied per difficulty when loading as opponent
    const DIFFICULTY_EVS = {
        easy:   0,
        medium: 252,
        hard:   400,
    };

    // Human-readable rules shown in the detail panel per difficulty
    const DIFFICULTY_RULES = {
        easy:   'No EVs · No items · Weakened moves · No win-streak bonus',
        medium: '252 EVs per stat · Items',
        hard:   '400 EVs per stat · Items · Battle items are banned (Revives etc.)',
    };

    // ─── Open / Close ─────────────────────────────────────────────────────
    window.openBossesModal = function () {
        const modal = document.getElementById('bossesOverlay');
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        renderBossesList();
        renderBossDetail();
    };

    window.closeBossesModal = function () {
        const modal = document.getElementById('bossesOverlay');
        if (modal) modal.setAttribute('aria-hidden', 'true');
    };

    // ─── Render Boss List (sidebar) ───────────────────────────────────────
    const REGION_ORDER  = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh'];
    const REGION_COLORS = { Kanto: '#ff6b6b', Johto: '#63d471', Hoenn: '#5bc8f5', Sinnoh: '#c084fc' };

    function renderBossesList() {
        const listEl = document.getElementById('bossListPanel');
        if (!listEl) return;

        if (typeof BOSSES === 'undefined' || !BOSSES.length) {
            listEl.innerHTML = '<div style="padding:16px; color:var(--dim); font-size:13px;">No bosses found.</div>';
            return;
        }

        // Group bosses by region, preserving REGION_ORDER
        const grouped = {};
        for (const boss of BOSSES) {
            const region = boss.region || 'Other';
            if (!grouped[region]) grouped[region] = [];
            grouped[region].push(boss);
        }

        const regionKeys = [...REGION_ORDER.filter(r => grouped[r]), ...Object.keys(grouped).filter(r => !REGION_ORDER.includes(r))];

        listEl.innerHTML = regionKeys.map(region => {
            const color    = REGION_COLORS[region] || '#aaa';
            const bossRows = grouped[region].map(boss => {
                const diffKeys   = DIFFICULTY_ORDER.filter(d => boss.difficulties && boss.difficulties[d]);
                const diffBadges = diffKeys.map(d =>
                    `<span style="font-size:10px; color:${DIFFICULTY_COLORS[d]}; background:${DIFFICULTY_COLORS[d]}22; border:1px solid ${DIFFICULTY_COLORS[d]}; border-radius:10px; padding:2px 7px; font-weight:bold;">${d}</span>`
                ).join('');
                const isActive = selectedBossId === boss.id;
                return `<button class="bossListItem${isActive ? ' active' : ''}" type="button" data-boss-id="${boss.id}" style="
                    width:100%; text-align:left; padding:8px 14px 8px 20px; border:none; border-bottom:1px solid var(--brd);
                    background:${isActive ? 'var(--brd)' : 'transparent'}; cursor:pointer; transition:.15s;
                    display:flex; flex-direction:column; gap:4px;
                ">
                    <span style="font-size:13px; font-weight:800; color:var(--txt);">${boss.name}</span>
                    <span style="font-size:10px; color:var(--dim);">${boss.location || ''}</span>
                    <div style="display:flex; gap:4px; flex-wrap:wrap;">${diffBadges}</div>
                </button>`;
            }).join('');

            return `<div>
                <div style="padding:7px 14px; font-size:11px; font-weight:900; color:${color}; background:${color}18; border-bottom:1px solid var(--brd); letter-spacing:1px; text-transform:uppercase;">
                    ${region}
                </div>
                ${bossRows}
            </div>`;
        }).join('');
    }

    // ─── Render Boss Detail (main area) ──────────────────────────────────
    function renderBossDetail() {
        const detailEl = document.getElementById('bossDetailPanel');
        if (!detailEl) return;

        const boss = (typeof BOSSES !== 'undefined') && selectedBossId
            ? BOSSES.find(b => b.id === selectedBossId)
            : null;

        if (!boss) {
            detailEl.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; min-height:200px; color:var(--dim); gap:12px;">
                    <span style="font-size:40px;">🏆</span>
                    <span style="font-size:14px;">Select a Boss from the list.</span>
                </div>`;
            return;
        }

        const diffKeys = DIFFICULTY_ORDER.filter(d => boss.difficulties && boss.difficulties[d]);
        // Auto-select first available difficulty if none selected or current not available
        if (!selectedDifficulty || !diffKeys.includes(selectedDifficulty)) {
            selectedDifficulty = diffKeys[0] || null;
        }

        const tabsHtml = diffKeys.map(d => {
            const isActive = d === selectedDifficulty;
            const color    = DIFFICULTY_COLORS[d];
            return `<button type="button" data-diff="${d}" style="
                padding:6px 18px; border-radius:20px; border:1px solid ${isActive ? color : '#555'};
                background:${isActive ? color + '28' : 'transparent'}; color:${isActive ? color : 'var(--dim)'};
                cursor:pointer; font-size:12px; font-weight:bold; transition:.15s;
            ">${DIFFICULTY_LABELS[d]}</button>`;
        }).join('');

        const teamData = selectedDifficulty && boss.difficulties[selectedDifficulty]
            ? boss.difficulties[selectedDifficulty].pokemon || []
            : [];

        const pokemonHtml = teamData.map((mon, idx) => {
            // Find the ID from the POKE array if it exists
            const pokeEntry = (typeof POKE !== 'undefined')
                ? POKE.find(p =>
                    p.name.toLowerCase() === (mon.name || '').toLowerCase() ||
                    p.name.toLowerCase().replace(/-/g, ' ') === (mon.name || '').toLowerCase().replace(/-/g, ' ')
                )
                : null;

            const spriteHtml = (pokeEntry && typeof spriteImg === 'function')
                ? spriteImg(pokeEntry)
                : `<span style="font-size:28px;">❓</span>`;

            const moves = (mon.moves || []).filter(m => m && m.trim());
            const movesHtml = moves.length
                ? moves.map(m => `<span style="background:var(--brd); border-radius:6px; padding:2px 8px; font-size:11px; color:var(--txt);">${m.replace(/-/g, ' ')}</span>`).join('')
                : '<span style="font-size:11px; color:var(--dim);">—</span>';

            const effectiveItem = (selectedDifficulty === 'easy') ? '' : (mon.item || '');
            const effectiveNature = (mon.nature && mon.nature !== 'Random') ? mon.nature : '';

            // Base stats
            const bs = (pokeEntry && typeof BASE_STATS !== 'undefined') ? BASE_STATS[String(pokeEntry.id)] : null;
            const STAT_LABELS = [['hp','HP','#a3e4b5'],['atk','ATK','#f28b82'],['def','DEF','#fbb26a'],['spa','SpA','#85c1e9'],['spd','SpD','#82e0aa'],['spe','SPE','#f9e79f']];
            const MAX_STAT = 255;
            const statsHtml = bs ? `<div style="display:flex; flex-direction:column; gap:2px; margin-top:4px;">` +
                STAT_LABELS.map(([key, label, color]) => {
                    const val = bs[key] || 0;
                    const pct = Math.round((val / MAX_STAT) * 100);
                    return `<div style="display:flex; align-items:center; gap:4px; font-size:10px;">
                        <span style="width:26px; text-align:right; color:var(--dim); font-weight:700;">${label}</span>
                        <div style="flex:1; background:var(--brd); border-radius:4px; height:6px; overflow:hidden;">
                            <div style="width:${pct}%; background:${color}; height:100%; border-radius:4px;"></div>
                        </div>
                        <span style="width:24px; color:var(--txt); font-weight:700;">${val}</span>
                    </div>`;
                }).join('') + `</div>` : '';

            return `<div style="background:var(--bg); border:1px solid var(--brd); border-radius:10px; padding:12px; display:flex; gap:10px; align-items:flex-start; min-width:0;">
                <div style="flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:4px;">
                    ${spriteHtml}
                    <span style="font-size:11px; font-weight:800; color:var(--txt); text-align:center;">${mon.name ? mon.name.replace(/-/g, ' ') : '?'}</span>
                </div>
                <div style="flex:1; min-width:0; display:flex; flex-direction:column; gap:5px;">
                    <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:11px;">
                        ${effectiveNature ? `<span style="color:var(--dim);">Nature: <b style="color:var(--txt);">${effectiveNature}</b></span>` : ''}
                        ${mon.ability ? `<span style="color:var(--dim);">Ability: <b style="color:var(--txt);">${mon.ability.replace(/-/g, ' ')}</b></span>` : ''}
                        ${effectiveItem ? `<span style="color:var(--dim);">Item: <b style="color:#ffc107;">${effectiveItem.replace(/-/g, ' ')}</b></span>` : ''}
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:4px;">${movesHtml}</div>
                    ${statsHtml}
                </div>
            </div>`;
        }).join('');

        const loadBtnDisabled = !teamData.length ? 'disabled' : '';
        detailEl.innerHTML = `
            <div style="padding:16px 20px; display:flex; flex-direction:column; gap:14px; height:100%; box-sizing:border-box; overflow-y:auto;">
                <div>
                    <div style="font-size:19px; font-weight:900; color:var(--txt);">${boss.name}</div>
                    ${boss.title ? `<div style="font-size:12px; color:var(--dim); margin-top:2px;">${boss.title}</div>` : ''}
                    ${boss.region ? `<div style="font-size:11px; margin-top:4px;"><span style="color:${REGION_COLORS[boss.region] || '#aaa'}; font-weight:700;">${boss.region}</span>${boss.location ? ` <span style="color:var(--dim);">— ${boss.location}</span>` : ''}</div>` : ''}
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; justify-content:space-between;" id="bossDiffTabs">
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">${tabsHtml}</div>
                    <button type="button" id="bossLoadOppBtn" ${loadBtnDisabled} style="
                        padding:6px 14px; border-radius:20px; border:1px solid #ff6b6b;
                        background:rgba(255,107,107,0.12); color:#ff6b6b; font-size:12px; font-weight:bold;
                        cursor:${loadBtnDisabled ? 'not-allowed' : 'pointer'}; opacity:${loadBtnDisabled ? '0.5' : '1'}; transition:.2s; white-space:nowrap;
                    ">⚔️ Load as Opponent</button>
                </div>
                ${selectedDifficulty && DIFFICULTY_RULES[selectedDifficulty] ? `<div style="font-size:11px; color:var(--dim); background:var(--brd); border-radius:6px; padding:6px 10px; line-height:1.5;">ℹ️ ${DIFFICULTY_RULES[selectedDifficulty]}</div>` : ''}
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${teamData.length ? pokemonHtml : '<div style="color:var(--dim); font-size:13px;">No Pokémon available for this difficulty.</div>'}
                </div>
            </div>`;

        // Difficulty tab events
        const tabsContainer = document.getElementById('bossDiffTabs');
        if (tabsContainer) {
            tabsContainer.addEventListener('click', e => {
                const btn = e.target.closest('[data-diff]');
                if (btn) { selectedDifficulty = btn.dataset.diff; renderBossDetail(); }
            });
        }

        // Load as Opponent
        const loadBtn = document.getElementById('bossLoadOppBtn');
        if (loadBtn && !loadBtnDisabled) {
            loadBtn.addEventListener('click', () => loadBossAsOpponent(boss, selectedDifficulty));
        }
    }

    // ─── Load Boss Team as Opponent ───────────────────────────────────────
    function loadBossAsOpponent(boss, difficulty) {
        if (!boss || !difficulty) return;
        const teamData = boss.difficulties[difficulty] && boss.difficulties[difficulty].pokemon;
        if (!teamData || !teamData.length) return;
        if (typeof window.clearOpponents !== 'function' || typeof window.oppTeam === 'undefined') {
            alert('Opponent feature is not available.');
            return;
        }

        window.clearOpponents();

        const evValue  = DIFFICULTY_EVS[difficulty] ?? 0;
        const isEasy   = difficulty === 'easy';

        const limited = teamData.slice(0, 6);
        for (const mon of limited) {
            const pokeEntry = (typeof POKE !== 'undefined')
                ? POKE.find(p =>
                    p.name.toLowerCase() === (mon.name || '').toLowerCase() ||
                    p.name.toLowerCase().replace(/-/g, ' ') === (mon.name || '').toLowerCase().replace(/-/g, ' ')
                )
                : null;

            if (!pokeEntry) continue;

            const moveNames  = (mon.moves || []).filter(m => m && m.trim());
            const moveTypes  = moveNames.map(n => (typeof MOVE_INFO !== 'undefined' && MOVE_INFO[n] ? MOVE_INFO[n].type || '' : ''));
            const moveCats   = moveNames.map(n => (typeof MOVE_INFO !== 'undefined' && MOVE_INFO[n] ? MOVE_INFO[n].cat  || '' : ''));

            const nature = (mon.nature && mon.nature !== 'Random') ? mon.nature : '';
            const item   = isEasy ? '' : (mon.item || '');

            const ev = { HP: evValue, ATK: evValue, DEF: evValue, SPATK: evValue, SPDEF: evValue, SPD: evValue };

            window.oppTeam.push({
                id:        pokeEntry.id,
                ability:   mon.ability || '',
                item,
                level:     50,
                nature,
                moveNames,
                moves:     moveTypes,
                moveCats,
                iv:  { HP: '', ATK: '', DEF: '', SPATK: '', SPDEF: '', SPD: '' },
                ev,
            });
        }

        window.saveOpponents();

        // Show the opponent panel if hidden and set mode to 'bosses'
        if (!window.showOppPanel) {
            window.showOppPanel = true;
        }
        window.oppMode = 'bosses';
        window.saveOpponents();

        window.closeBossesModal();
        if (typeof renderTeamSlots === 'function') renderTeamSlots();
    }

    // ─── Event delegation for boss list items ─────────────────────────────
    document.addEventListener('click', e => {
        const item = e.target.closest('.bossListItem[data-boss-id]');
        if (!item) return;
        selectedBossId    = item.dataset.bossId;
        selectedDifficulty = null;
        renderBossesList();
        renderBossDetail();
    });

    // Close on overlay backdrop click
    document.addEventListener('click', e => {
        if (e.target && e.target.id === 'bossesOverlay') window.closeBossesModal();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('bossesOverlay');
            if (modal && modal.getAttribute('aria-hidden') === 'false') window.closeBossesModal();
        }
    });
})();
