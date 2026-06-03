/* =====================================================================
   Scroll-driven entrance animations + number count-up
   Adds .in to each section when it crosses the viewport,
   animates numbers from 0 → target with es-AR formatting.
   ===================================================================== */
(function () {
  'use strict';

  // Bail in the deck — its slide-stage handles its own choreography.
  if (document.querySelector('deck-stage')) return;

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NUM_SEL = '.kpi-num.tnum, .biz-num.tnum, .tod-num.tnum, .bl-val.tnum, .funnel-val.tnum, .dc-num, .cmp-delta, .count-pill.tnum';

  // Parse "$ 190.040" / "133" / "+99%" / "×4" into prefix + integer + suffix.
  // Skips values with es-AR decimals (',') or with digits in the suffix
  // (e.g. "4m 13s") — those stay static so we don't get "0m 13s" mid-tween.
  function parseNumber(txt) {
    const m = txt.match(/^([^\d-]*)(-?[\d.]+)(.*)$/);
    if (!m) return null;
    if (m[2].indexOf(',') >= 0) return null;
    if (/\d/.test(m[3])) return null;
    const n = parseInt(m[2].replace(/\./g, ''), 10);
    if (!Number.isFinite(n)) return null;
    return { prefix: m[1], n, suffix: m[3] };
  }

  function countUp(el, target, dur) {
    const p = parseNumber(target);
    if (!p) { el.textContent = target; return; }
    el.textContent = p.prefix + '0' + p.suffix;
    const t0 = performance.now();
    function frame(t) {
      const k = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - k, 3); // ease-out-cubic
      const v = Math.round(p.n * e);
      el.textContent = p.prefix + v.toLocaleString('es-AR') + p.suffix;
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function init() {
    document.documentElement.classList.add('js-anim');

    const sections = document.querySelectorAll('.section');
    sections.forEach((s) => s.setAttribute('data-anim', ''));

    // Snapshot every number's final text and reset to 0 so they count up.
    const nums = document.querySelectorAll(NUM_SEL);
    nums.forEach((el) => {
      const txt = el.textContent.trim();
      el.dataset.target = txt;
      if (REDUCED) return;
      const p = parseNumber(txt);
      if (p) el.textContent = p.prefix + '0' + p.suffix;
    });

    if (REDUCED) {
      sections.forEach((s) => s.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const section = e.target;
        section.classList.add('in');
        // Kick off count-ups slightly after the section starts fading in
        // so the numbers settle visually with the card entrance.
        const inside = section.querySelectorAll(NUM_SEL);
        inside.forEach((el, i) => {
          const target = el.dataset.target;
          if (!target) return;
          setTimeout(() => countUp(el, target, 1100), 240 + i * 50);
        });
        io.unobserve(section);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    sections.forEach((s) => io.observe(s));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
