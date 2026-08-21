// --- dex.js : Central Pokédex & Search ---

function card(p) {
    const { id, name, types } = p;
    const col = TC[types[0]] || '#888';
    const num = String(id).padStart(4, '0');
    const img = spriteImg(p);

    // Calculate Ability Notices
    const pokeAbilities = ABILITIES[String(id)] || [];
    let abilityNotices = [];

    pokeAbilities.forEach(a => {
        const cleanA = a.toLowerCase().replace(/-/g, ' ');
        if (ABILITY_TYPE_MODS && ABILITY_TYPE_MODS[cleanA]) {
            const effects = Object.keys(ABILITY_TYPE_MODS[cleanA]).map(t => {
                const mod = ABILITY_TYPE_MODS[cleanA][t];
                return `${t.charAt(0).toUpperCase() + t.slice(1)} ${mod === 0 ? 'Immunity' : (mod < 1 ? 'Resist' : 'Weak')}`;
            }).join(', ');
            abilityNotices.push(`<span style="font-size:10px; display:block; color:#4dabf7; margin-top:2px;">💡 ${a}: ${effects}</span>`);
        }
    });

    return `<div class="card">
    <div class="ab" style="background:${col}"></div>
    <div class="sw2">${img}</div>
    <div class="info">
      <div class="ph"><span class="num">#${num}</span><span class="pn">${name.replace(/-/g, ' ')}</span></div>
      <div class="tr">${types.map(t => tb(t)).join('')}</div>
      <div class="db">${dmgH(types)}</div>
      <div class="ability-notices" style="margin-top:8px;">${abilityNotices.join('')}</div>
    </div>
  </div>`;
}

const tfEl = document.getElementById('tf');
let activeTypes = []; // Now an array for 2 types

AT.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tf'; b.textContent = t;
    b.style.color = TC[t]; b.style.borderColor = TC[t];
    b.dataset.t = t;
    b.addEventListener('click', () => {
        if (activeTypes.includes(t)) {
            activeTypes = activeTypes.filter(x => x !== t);
            b.classList.remove('on');
        } else {
            if (activeTypes.length >= 2) {
                // Reset if trying to add a 3rd type
                tfEl.querySelectorAll('.tf').forEach(x => x.classList.remove('on'));
                activeTypes = [t];
                b.classList.add('on');
            } else {
                activeTypes.push(t);
                b.classList.add('on');
            }
        }
        renderDex();
    });
    tfEl.appendChild(b);
});

const grid = document.getElementById('grid');
const cntEl = document.getElementById('cnt');
let qDex = '';

const THEME_KEY = 'pokedex_theme_v1';
function applyTheme(theme) {
    const light = theme === 'light';
    document.body.classList.toggle('light-mode', light);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = light ? '☀️' : '🌙';
}
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(savedTheme);
document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
});

function renderDex() {
    const ql = qDex.toLowerCase().trim();
    let list = POKE;
    
    // Filter by name/ID
    if (ql) list = list.filter(p => p.name.replace(/-/g, ' ').includes(ql) || String(p.id).includes(ql) || p.types.some(t => t.includes(ql)));
    
    // Filter by 1 or 2 types
    if (activeTypes.length > 0) {
        list = list.filter(p => activeTypes.every(t => p.types.includes(t)));
    }
    
    cntEl.innerHTML = `Showing <strong>${list.length}</strong> / ${POKE.length} Pokémon`;
    
    if (!list.length) {
        grid.innerHTML = '<div class="nores"><div class="em">😴</div><p>No Pokémon found for "' + ql + '"</p></div>';
        return;
    }
    grid.innerHTML = list.map(card).join('');
}

document.getElementById('search').addEventListener('input', e => { qDex = e.target.value; renderDex() });
renderDex();
