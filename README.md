# La Boutique de la Limpieza — Reporte mensual

Sitio estático con el reporte de analítica mensual y el deck de presentación.

## Estructura

- **`index.html`** — Reporte web scrollable (la página principal)
- **`presentacion.html`** — Deck de slides para presentar (10 slides, ←/→ para navegar)
- `report.css`, `charts.js` — estilos y datos del reporte
- `deck.css`, `deck-stage.js` — estilos y motor del deck

## URLs cuando esté en Vercel

- `tu-proyecto.vercel.app/` → reporte
- `tu-proyecto.vercel.app/presentacion` → deck

## Para actualizar cada mes

1. Editar el HTML / CSS / JS con los datos nuevos.
2. Commit & push a `main`.
3. Vercel republica automáticamente — sin pasos manuales.

---

Datos: panel de administración de la tienda · Período actual: Mayo 2026
