/* =====================================================================
   Resumen de Analítica · Mayo 2026 — chart rendering
   All values transcribed directly from the admin analytics screenshots.
   No invented data.
   ===================================================================== */

const fmt = n => n.toLocaleString('es-AR');

/* -------------------------------------------------- FUNNEL */
const funnel = [
  { label: 'Vistas de producto', sub: '/producto', v: 80 },
  { label: 'Al carrito',          sub: '/carrito',  v: 31 },
  { label: 'Checkout',            sub: '/checkout', v: 11 },
  { label: 'Pedidos',             sub: 'confirmados', v: 4 },
];
(() => {
  const host = document.getElementById('funnel');
  if (!host) return;
  const max = funnel[0].v;
  host.innerHTML = funnel.map((s, i) => {
    const pct = Math.round((s.v / max) * 100);
    const fromPrev = i === 0 ? '' :
      `<span class="funnel-rate">${Math.round((s.v / funnel[i-1].v) * 100)}% de la etapa anterior</span>`;
    return `<div class="funnel-row">
      <div class="funnel-label">${s.label}<small>${s.sub}</small></div>
      <div class="funnel-bar-track"><div class="funnel-bar ${i === funnel.length-1 ? 'tail' : ''}" style="width:${Math.max(pct,4)}%"></div></div>
      <div><div class="funnel-val tnum">${s.v}</div>${fromPrev}</div>
    </div>`;
  }).join('');
})();

/* -------------------------------------------------- DAILY SESSIONS */
const daily = [
  ['30','abr',14],['3','may',3],['4','may',32],['5','may',4],['6','may',55],
  ['7','may',6],['8','may',3],['9','may',2],['10','may',3],['11','may',20],
  ['12','may',39],['13','may',35],['14','may',20],['15','may',8],['16','may',1],
  ['17','may',12],['18','may',13],['19','may',2],['20','may',22],['21','may',66],
  ['22','may',59],['23','may',20],['24','may',5],['25','may',3],['26','may',6],
  ['27','may',4],['28','may',3],['29','may',4],['31','may',2],
];
(() => {
  const bars = document.getElementById('dailyBars');
  const axis = document.getElementById('dailyAxis');
  if (!bars || !axis) return;
  const max = Math.max(...daily.map(d => d[2]));
  bars.innerHTML = daily.map(([d, m, v]) => {
    const h = Math.max((v / max) * 100, 1.5);
    const peak = v >= 50;
    const cap = v >= 39 ? `<span class="bar-cap">${v}</span>` : '';
    return `<div class="bar-col"><div class="bar ${peak ? 'peak' : ''}" style="height:${h}%">${cap}</div></div>`;
  }).join('');
  axis.innerHTML = daily.map(([d, m]) =>
    `<div class="bar-col"><span class="bar-x">${d}</span></div>`).join('');
})();

/* -------------------------------------------------- TIME OF DAY */
const tod = [
  { name: 'Madrugada', hours: '0–6 h',  total: 107, color: '#7C3AED', dot: '#7C3AED',
    bars: [32,28,17,12,15,3] },
  { name: 'Mañana',    hours: '6–12 h', total: 39,  color: '#F59E0B', dot: '#F59E0B',
    bars: [0,0,1,23,4,11] },
  { name: 'Tarde',     hours: '12–18 h',total: 229, color: '#2F6BFF', dot: '#6390FF', peak: true,
    bars: [53,87,36,49,3,1] },
  { name: 'Noche',     hours: '18–24 h',total: 91,  color: '#3B4F8A', dot: '#3B4F8A',
    bars: [7,14,11,11,32,16] },
];
(() => {
  const host = document.getElementById('todGrid');
  if (!host) return;
  const totalPV = 466;
  host.innerHTML = tod.map(t => {
    const bmax = Math.max(...t.bars);
    const spark = t.bars.map(v =>
      `<i style="height:${Math.max((v / bmax) * 100, 6)}%;background:${t.color}"></i>`).join('');
    const share = Math.round((t.total / totalPV) * 100);
    return `<div class="tod ${t.peak ? 'is-peak' : ''}">
      ${t.peak ? '<span class="peak-tag">PICO DEL RANGO</span>' : ''}
      <div class="tod-top">
        <div class="tod-name"><span class="tod-dot" style="background:${t.dot}"></span>${t.name}</div>
      </div>
      <span class="tod-hours">${t.hours}</span>
      <div class="tod-num tnum">${t.total}</div>
      <div class="tod-share">${share}% de las páginas vistas</div>
      <div class="tod-spark">${spark}</div>
    </div>`;
  }).join('');
})();

/* -------------------------------------------------- DONUTS */
const PAL = ['#1A2332', '#2F6BFF', '#16A34A', '#F59E0B', '#7C3AED'];
function donut(elId, legendId, data, total) {
  const el = document.getElementById(elId);
  const leg = document.getElementById(legendId);
  if (!el || !leg) return;
  let acc = 0;
  const stops = data.map((d, i) => {
    const start = (acc / total) * 100;
    acc += d.v;
    const end = (acc / total) * 100;
    return `${PAL[i % PAL.length]} ${start}% ${end}%`;
  }).join(', ');
  el.style.background = `conic-gradient(${stops})`;
  leg.innerHTML = data.map((d, i) =>
    `<div class="legend-row">
       <span class="legend-dot" style="background:${PAL[i % PAL.length]}"></span>
       <span class="legend-name">${d.name}</span>
       <span class="legend-pct">${d.pct}%</span>
       <span class="legend-cnt tnum">${d.v}</span>
     </div>`).join('');
}
donut('donutDevice', 'legendDevice', [
  { name: 'Móvil', v: 86, pct: 65 },
  { name: 'Escritorio', v: 47, pct: 35 },
], 133);
donut('donutBrowser', 'legendBrowser', [
  { name: 'Chrome', v: 92, pct: 69 },
  { name: 'Safari', v: 38, pct: 29 },
  { name: 'Firefox', v: 2, pct: 2 },
  { name: 'Edge', v: 1, pct: 1 },
], 133);
donut('donutOs', 'legendOs', [
  { name: 'Android', v: 49, pct: 37 },
  { name: 'Windows', v: 45, pct: 34 },
  { name: 'iOS', v: 37, pct: 28 },
  { name: 'Linux', v: 1, pct: 1 },
  { name: 'macOS', v: 1, pct: 1 },
], 133);

/* -------------------------------------------------- GEOGRAPHY */
function barList(elId, data, opts = {}) {
  const host = document.getElementById(elId);
  if (!host) return;
  const max = Math.max(...data.map(d => d.v));
  host.innerHTML = data.map(d => `
    <div class="bl-row">
      <span class="flag">${d.code}</span>
      <div class="bl-main">
        <div class="bl-name">${d.name}${d.tag ? ` <span class="bl-sub">${d.tag}</span>` : ''}</div>
        ${d.sub ? `<div class="bl-sub">${d.sub}</div>` : ''}
        <div class="bl-track"><div class="bl-fill ${opts.alt ? 'alt' : ''}" style="width:${(d.v/max)*100}%"></div></div>
      </div>
      <span class="bl-val tnum">${d.v}</span>
    </div>`).join('');
}
barList('countries', [
  { code: 'AR', name: 'Argentina',      sub: '74,4% de las sesiones', v: 99 },
  { code: 'US', name: 'Estados Unidos', sub: '24,8% de las sesiones', v: 33 },
  { code: 'BR', name: 'Brasil',         sub: '0,8% de las sesiones',  v: 1 },
]);
barList('cities', [
  { code: 'AR', name: 'Buenos Aires', sub: 'CABA · 41,6%', v: 32 },
  { code: 'US', name: 'Miami Beach',  sub: 'FL, EE. UU. · 36,4%', v: 28 },
  { code: 'AR', name: 'Bahía Blanca', sub: 'Buenos Aires · 3,9%', v: 3 },
  { code: 'AR', name: 'Rosario',      sub: 'Santa Fe · 3,9%', v: 3 },
  { code: 'AR', name: 'San Juan',     sub: 'San Juan · 2,6%', v: 2 },
]);

/* -------------------------------------------------- SOURCES / CHANNELS */
barList('sources', [
  { code: 'D',  name: 'Directo',            v: 77 },
  { code: 'G',  name: 'google.com',         v: 52 },
  { code: 'Y',  name: 'ar.search.yahoo.com',v: 2 },
  { code: 'G',  name: 'search.google.com',  v: 1 },
  { code: 'lb', name: 'laboutiquedelalimpieza',  v: 1 },
]);
barList('channels', [
  { code: 'D', name: 'Directa',   tag: '↑ 3%',  v: 77 },
  { code: 'O', name: 'Orgánica',  tag: '↑ 56%', v: 55 },
], { alt: true });

/* -------------------------------------------------- TOP PAGES */
const pages = [
  ['/', 326], ['/producto', 80], ['/carrito', 31], ['/checkout', 11],
  ['/nosotros', 7], ['/promociones', 5], ['/mi-cuenta', 4], ['/favoritos', 2],
];
document.getElementById('pages') && (document.getElementById('pages').innerHTML = pages.map(([p, v]) =>
  `<div class="rl"><span class="rl-name"><code>${p}</code></span><span class="count-pill tnum">${v}</span></div>`).join(''));

/* -------------------------------------------------- CATEGORIES */
const cats = [
  ['Todos los artículos', 6], ['Accesorios', 4], ['Pisos y Superficies', 4],
  ['Saphirus', 4], ['Cuidado de Ropa', 3], ['Más vendidos', 3], ['Aerosoles', 2],
  ['Aparatos', 2], ['Baño', 2], ['Bolsas de Residuo', 2], ['Cocina', 2], ['Difusores', 2],
];
document.getElementById('categories') && (document.getElementById('categories').innerHTML = cats.map(([c, v]) =>
  `<span class="chip">${c} <b>${v}</b></span>`).join(''));

/* -------------------------------------------------- SEARCHES */
const searches = [
  ['bol', 8], ['iduo', 4], ['50x70', 3], ['re', 3], ['horno', 2], ['mingitorio', 2],
  ['papel higiénico', 2], ['pátula', 2], ['biokitol', 1], ['blem', 1],
];
document.getElementById('searches') && (document.getElementById('searches').innerHTML = searches.map(([s, v]) =>
  `<span class="chip">${s} <b>${v}</b></span>`).join(''));

/* -------------------------------------------------- MAYO VS ABRIL TABLE */
const compare = [
  { k: 'Facturación',        abr: '$ 95.400',  may: '$ 190.040', d: '+99%',  dir: 'up' },
  { k: 'Pedidos',            abr: '2',         may: '4',         d: '×2',    dir: 'up' },
  { k: 'Tasa de conversión', abr: '0,75%',     may: '3,0%',      d: '×4',    dir: 'up' },
  { k: 'Ticket promedio',    abr: '$ 47.700',  may: '$ 47.510',  d: '−0,4%', dir: 'flat', note: 'se mantuvo estable' },
  { k: 'Visitantes únicos',  abr: '73',        may: '53',        d: '−27%',  dir: 'down' },
  { k: 'Sesiones',           abr: '268',       may: '133',       d: '−50%',  dir: 'down', note: 'abril incluye el pico de lanzamiento' },
  { k: 'Sesiones por día',   abr: '14,9',      may: '4,3',       d: '−71%',  dir: 'down', note: 'normalizado por día (18 vs 31 d)' },
];
const arrowFor = dir => dir === 'up' ? '▲' : dir === 'down' ? '▼' : '≈';
document.getElementById('cmpTable') && (document.getElementById('cmpTable').innerHTML = compare.map(r => `
  <div class="cmp-row">
    <div class="cmp-k">${r.k}${r.note ? `<small>${r.note}</small>` : ''}</div>
    <div class="cmp-v abr tnum">${r.abr}</div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-v may tnum">${r.may}</div>
    <div class="cmp-badge-cell"><span class="delta ${r.dir}">${arrowFor(r.dir)} ${r.d}</span></div>
  </div>`).join(''));
