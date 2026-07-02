/* =====================================================================
   Resumen de Analítica · Junio 2026 — chart rendering
   Todos los valores transcritos directamente del panel de analítica
   del administrador (rango 1–30 jun 2026). Sin datos inventados.
   ===================================================================== */

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
  { name: 'Móvil', v: 154, pct: 71 },
  { name: 'Escritorio', v: 63, pct: 29 },
], 217);
donut('donutBrowser', 'legendBrowser', [
  { name: 'Chrome', v: 173, pct: 80 },
  { name: 'Safari', v: 33, pct: 15 },
  { name: 'Edge', v: 9, pct: 4 },
  { name: 'Firefox', v: 2, pct: 1 },
], 217);
donut('donutOs', 'legendOs', [
  { name: 'Android', v: 121, pct: 56 },
  { name: 'Windows', v: 60, pct: 28 },
  { name: 'iOS', v: 33, pct: 15 },
  { name: 'Linux', v: 2, pct: 1 },
  { name: 'macOS', v: 1, pct: 0 },
], 217);

/* -------------------------------------------------- GEOGRAPHY / SOURCES */
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
barList('cities', [
  { code: 'AR', name: 'Buenos Aires', sub: 'CABA · 41,7%',        v: 55 },
  { code: 'AR', name: 'Rosario',      sub: 'Santa Fe · 10,6%',    v: 14 },
  { code: 'AR', name: 'El Talar',     sub: 'Buenos Aires · 9,1%', v: 12 },
  { code: 'AR', name: 'Caseros',      sub: 'Buenos Aires · 4,5%', v: 6 },
]);
barList('sources', [
  { code: 'D', name: 'Directa',  tag: '↑ 35%', v: 104 },
  { code: 'O', name: 'Orgánica', tag: '↑ 93%', v: 106 },
], { alt: true });
