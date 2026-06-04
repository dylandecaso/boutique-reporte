/* =====================================================================
   Lightbox — abre cualquier [data-lightbox-src] en un modal a pantalla
   completa con fondo oscuro. Sin dependencias.
   - Cerrar: botón ×, clic en el fondo, o tecla Esc.
   - Bloquea el scroll del body mientras está abierto y restaura el foco.
   - Respeta prefers-reduced-motion (lo maneja el CSS).
   ===================================================================== */
(function () {
  'use strict';

  let overlay, imgEl, capEl, closeBtn, lastFocus;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Imagen ampliada');
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Cerrar imagen">&times;</button>' +
      '<figure class="lightbox-fig">' +
        '<img alt="">' +
        '<figcaption class="lightbox-cap"></figcaption>' +
      '</figure>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector('img');
    capEl = overlay.querySelector('.lightbox-cap');
    closeBtn = overlay.querySelector('.lightbox-close');

    // Cerrar al tocar el fondo o el botón (no al tocar la imagen).
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn) close();
    });
  }

  function open(src, alt, cap) {
    if (!overlay) build();
    imgEl.src = src;
    imgEl.alt = alt || '';
    if (cap) { capEl.textContent = cap; capEl.hidden = false; }
    else { capEl.textContent = ''; capEl.hidden = true; }
    lastFocus = document.activeElement;
    document.body.classList.add('lightbox-open');
    // force reflow so the open transition runs
    overlay.offsetHeight; // eslint-disable-line no-unused-expressions
    overlay.classList.add('open');
    closeBtn.focus();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    // limpia el src una vez terminada la transición
    setTimeout(function () { if (!overlay.classList.contains('open')) imgEl.src = ''; }, 220);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-lightbox-src]');
    if (!trigger) return;
    e.preventDefault();
    const innerImg = trigger.querySelector('img');
    open(
      trigger.getAttribute('data-lightbox-src'),
      innerImg ? innerImg.alt : '',
      trigger.getAttribute('data-lightbox-cap') || ''
    );
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) close();
  });
})();
