// --- dex.js : Κεντρικό Pokédex & Αναζήτηση ---

function card(p) {
    const { id, name, types } = p;
    const col = TC[types[0]] || '#888';
    const num = String(id).padStart(4, '0');
    const img = spriteImg(p);

    // Υπολογισμός Abilities Notices
    const pokeAbilities = ABILITIES[String(id)] || [];
    let abilityNotices = [];

    pokeAbilities.forEach(a => {
        const cleanA = a.toLowerCase().replace(/-/g, ' ');
        if (ABILITY_TYPE_MODS[cleanA]) {
            // Δημιουργούμε ένα string π.χ. "Levitate: Ground Immunity"
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
let activeT = null;

AT.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tf'; b.textContent = t;
    b.style.color = TC[t]; b.style.borderColor = TC[t];
    b.dataset.t = t;
    b.addEventListener('click', () => {
        if (activeT === t) { activeT = null; b.classList.remove('on') }
        else { tfEl.querySelectorAll('.tf').forEach(x => x.classList.remove('on')); activeT = t; b.classList.add('on') }
        renderDex();
    });
    tfEl.appendChild(b);
});

const grid = document.getElementById('grid');
const cntEl = document.getElementById('cnt');
let qDex = '';

function renderDex() {
    const ql = qDex.toLowerCase().trim();
    let list = POKE;
    if (ql) list = list.filter(p => p.name.replace(/-/g, ' ').includes(ql) || String(p.id).includes(ql) || p.types.some(t => t.includes(ql)));
    if (activeT) list = list.filter(p => p.types.includes(activeT));
    cntEl.innerHTML = `Showing <strong>${list.length}</strong> / ${POKE.length} Pokémon`;
    
    if (!list.length) {
        grid.innerHTML = '<div class="nores"><div class="em">😴</div><p>No Pokémon found for "' + ql + '"</p></div>';
        return;
    }
    grid.innerHTML = list.map(card).join('');
}

document.getElementById('search').addEventListener('input', e => { qDex = e.target.value; renderDex() });
renderDex();
