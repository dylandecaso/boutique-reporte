# La Boutique de la Limpieza — Reporte mensual

Sitio estático con el reporte de analítica mensual y el deck de presentación.

## Estructura

- **`index.html`** — Reporte web de **Mayo 2026** (la página principal)
- **`junio.html`** — Reporte web de **Junio 2026** (cambios + próximos pasos; métricas de tráfico en carga)
- **`abril.html`** — Reporte web de **Abril 2026** (mes de lanzamiento)
- **`presentacion.html`** — Deck de slides para presentar (10 slides, ←/→ para navegar)
- `report.css` — estilos del reporte (incluye el selector de meses del header)
- `charts.js` — datos de mayo · `charts-abril.js` — datos de abril
- `deck.css`, `deck-stage.js` — estilos y motor del deck

Cada reporte mensual es su propia página. En el header hay un **selector de meses**
(`.month-switch`) para cambiar entre ellos.

## URLs cuando esté en Vercel

- `tu-proyecto.vercel.app/` → reporte de mayo
- `tu-proyecto.vercel.app/abril` → reporte de abril
- `tu-proyecto.vercel.app/presentacion` → deck

## Para agregar un mes nuevo

1. Duplicar `index.html` → `mes.html` y `charts.js` → `charts-mes.js`, y cargar los
   datos nuevos en el HTML + el JS.
2. Sumar el mes al **selector** de cada página: agregar un `<a class="ms-item" href="mes.html">…</a>`
   dentro de `<nav class="month-switch">` y marcar con `is-active` el mes de esa página.
3. Commit & push a `main`. Vercel republica automáticamente.

---

Datos: panel de administración de la tienda · Período actual: Junio 2026 (métricas en carga) · Histórico: Mayo 2026, Abril 2026
