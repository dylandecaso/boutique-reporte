/* =====================================================================
   Resumen de Analítica · Abril 2026 — chart rendering
   All values transcribed directly from the April 2026 admin report PDF
   (DE CASO · La Boutique de la Limpieza). No invented data.
   ===================================================================== */

const fmt = n => n.toLocaleString('es-AR');

/* -------------------------------------------------- DAILY SESSIONS (13–30 abr) */
const daily = [
  ['13','abr',62],['14','abr',16],['15','abr',25],['16','abr',18],['17','abr',4],
  ['18','abr',8],['19','abr',6],['20','abr',1],['21','abr',30],['22','abr',9],
  ['23','abr',8],['24','abr',0],['25','abr',5],['26','abr',5],['27','abr',18],
  ['28','abr',10],['29','abr',24],['30','abr',19],
];
(() => {
  const bars = document.getElementById('dailyBars');
  const axis = document.getElementById('dailyAxis');
  if (!bars || !axis) return;
  const max = Math.max(...daily.map(d => d[2]));
  bars.innerHTML = daily.map(([d, m, v]) => {
    const h = Math.max((v / max) * 100, 1.5);
    const peak = v >= 50;                 // only launch day (62) is the month peak
    const cap = v >= 24 ? `<span class="bar-cap">${v}</span>` : '';
    return `<div class="bar-col"><div class="bar ${peak ? 'peak' : ''}" style="height:${h}%">${cap}</div></div>`;
  }).join('');
  axis.innerHTML = daily.map(([d, m]) =>
    `<div class="bar-col"><span class="bar-x">${d}</span></div>`).join('');
})();

/* -------------------------------------------------- TIME OF DAY (hora AR) */
const tod = [
  { name: 'Madrugada', hours: '0–6 h',  total: 26,  color: '#7C3AED', dot: '#7C3AED',
    bars: [1,2,10,1,6,6] },
  { name: 'Mañana',    hours: '6–12 h', total: 67,  color: '#F59E0B', dot: '#F59E0B',
    bars: [0,1,0,4,25,37] },
  { name: 'Tarde',     hours: '12–18 h',total: 68,  color: '#2F6BFF', dot: '#6390FF',
    bars: [8,14,6,20,9,11] },
  { name: 'Noche',     hours: '18–24 h',total: 107, color: '#6390FF', dot: '#6390FF', peak: true,
    bars: [3,43,23,12,21,5] },
];
(() => {
  const host = document.getElementById('todGrid');
  if (!host) return;
  const totalSessions = 268;
  host.innerHTML = tod.map(t => {
    const bmax = Math.max(...t.bars);
    const spark = t.bars.map(v =>
      `<i style="height:${Math.max((v / bmax) * 100, 6)}%;background:${t.color}"></i>`).join('');
    const share = Math.round((t.total / totalSessions) * 100);
    return `<div class="tod ${t.peak ? 'is-peak' : ''}">
      ${t.peak ? '<span class="peak-tag">PICO DEL MES</span>' : ''}
      <div class="tod-top">
        <div class="tod-name"><span class="tod-dot" style="background:${t.dot}"></span>${t.name}</div>
      </div>
      <span class="tod-hours">${t.hours}</span>
      <div class="tod-num tnum">${t.total}</div>
      <div class="tod-share">${share}% de las sesiones</div>
      <div class="tod-spark">${spark}</div>
    </div>`;
  }).join('');
})();

/* -------------------------------------------------- DONUT (devices) */
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
  { name: 'Móvil', v: 174, pct: 65 },
  { name: 'Escritorio', v: 86, pct: 32 },
  { name: 'Tablet', v: 8, pct: 3 },
], 268);

/* -------------------------------------------------- TRAFFIC SOURCES */
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
barList('sources', [
  { code: 'D',  name: 'Directa',         sub: 'Link compartido · WhatsApp · historias · 46%', v: 124 },
  { code: 'IG', name: 'Instagram',       sub: 'l.instagram.com · 32%', v: 87 },
  { code: 'G',  name: 'Google Orgánica', sub: 'Búsquedas en Google · 14%', v: 38 },
  { code: '+',  name: 'Otros',           sub: 'Bing · email · referencias · 7%', v: 19 },
]);
