/* ==========================================================================
   site.js — all interactive behavior for the dealer site.
   No dependencies, no build step. Every behavior is opt-in through a
   data-attribute, so markup can be moved into any template language.

   Behaviors
     [data-nav-toggle]        mobile menu open/close (aria-controls -> panel)
     [data-dropdown]          header dropdown (hover, focus, click, Escape)
     [data-quote-carousel]    testimonial rotator (arrows + dots)
     [data-carousel3d]        brand/model coverflow (arrows + drag/swipe)
     [data-location-filter]   chip filtering with dead-option disabling
     [data-demo-form]         front-end-only form confirmation
     [data-back-to-top]       reveal after 600px of scroll
     [data-save]              favorite toggle on a listing card
     [data-year]              current year
   ========================================================================== */
(function () {
  'use strict';

  var on = function (el, ev, fn) { el.addEventListener(ev, fn); };
  var all = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- nav */
  function initMobileNav() {
    all('[data-nav-toggle]').forEach(function (toggle) {
      var panel = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!panel) return;
      on(toggle, 'click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
      });
      all('a', panel).forEach(function (link) {
        on(link, 'click', function () {
          toggle.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        });
      });
    });
  }

  function initDropdowns() {
    var items = all('[data-dropdown]');
    function close(item) {
      var menu = item.querySelector('.nav__menu');
      var link = item.querySelector('.nav__link');
      if (menu) menu.hidden = true;
      if (link) link.setAttribute('aria-expanded', 'false');
    }
    function open(item) {
      items.forEach(function (other) { if (other !== item) close(other); });
      var menu = item.querySelector('.nav__menu');
      var link = item.querySelector('.nav__link');
      if (menu) menu.hidden = false;
      if (link) link.setAttribute('aria-expanded', 'true');
    }
    items.forEach(function (item) {
      close(item);
      on(item, 'mouseenter', function () { open(item); });
      on(item, 'mouseleave', function () { close(item); });
      on(item, 'focusin', function () { open(item); });
      on(item, 'focusout', function (e) {
        if (!item.contains(e.relatedTarget)) close(item);
      });
      var link = item.querySelector('.nav__link');
      if (link) {
        on(link, 'click', function (e) {
          // Touch: first tap opens the menu rather than following the link.
          if (item.querySelector('.nav__menu').hidden) { e.preventDefault(); open(item); }
        });
      }
    });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') items.forEach(close);
    });
  }

  /* --------------------------------------------------- quote carousel */
  function initQuoteCarousels() {
    all('[data-quote-carousel]').forEach(function (root) {
      var slides = all('[data-quote]', root);
      var dots = all('[data-quote-dot]', root);
      var i = 0;
      function show(next) {
        i = (next + slides.length) % slides.length;
        slides.forEach(function (s, n) { s.hidden = n !== i; });
        dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === i)); });
      }
      var prev = root.querySelector('[data-quote-prev]');
      var nextBtn = root.querySelector('[data-quote-next]');
      if (prev) on(prev, 'click', function () { show(i - 1); });
      if (nextBtn) on(nextBtn, 'click', function () { show(i + 1); });
      dots.forEach(function (d, n) { on(d, 'click', function () { show(n); }); });
      show(0);
    });
  }

  /* ------------------------------------------------------- coverflow */
  function initCarousel3d() {
    all('[data-carousel3d]').forEach(function (stage) {
      var cards = all('[data-carousel3d-item]', stage);
      var count = cards.length;
      if (!count) return;
      var active = 0;
      var spread = Math.min(2, Math.floor((count - 1) / 2));

      function layout() {
        cards.forEach(function (card, idx) {
          // signed distance from the active index, wrapped
          var off = idx - active;
          if (off > count / 2) off -= count;
          if (off < -count / 2) off += count;
          var dist = Math.abs(off);
          var dir = off < 0 ? -1 : 1;
          var isActive = off === 0;
          var scale = isActive ? 1.25 : dist === 1 ? 0.82 : 0.62;
          var rotateY = isActive ? 0 : dir * (dist === 1 ? 35 : 45);
          var x = dist === 0 ? 0 : dist === 1 ? dir * 400 : dir * 610;
          var z = isActive ? 0 : dist === 1 ? -160 : -320;

          card.style.transform = 'translateX(' + x + 'px) translateZ(' + z + 'px) rotateY(' + rotateY + 'deg) scale(' + scale + ')';
          card.style.opacity = dist > spread ? '0' : isActive ? '1' : dist === 1 ? '0.7' : '0.4';
          card.style.zIndex = String(10 - dist);
          var face = card.querySelector('.carousel3d__face');
          if (face) face.style.boxShadow = isActive ? 'var(--shadow-card-lift)' : '0 8px 18px rgba(0,0,0,.1)';
          card.style.pointerEvents = dist > spread ? 'none' : 'auto';
          card.setAttribute('data-active', String(isActive));
          card.setAttribute('aria-hidden', String(dist > spread));
        });
      }
      function go(n) { active = (n + count) % count; layout(); }

      cards.forEach(function (card, idx) {
        on(card, 'click', function () { if (idx !== active) go(idx); });
      });
      var wrap = stage.closest('[data-carousel3d-scope]') || stage.parentNode;
      var prev = wrap.querySelector('[data-carousel3d-prev]');
      var next = wrap.querySelector('[data-carousel3d-next]');
      if (prev) on(prev, 'click', function () { go(active - 1); });
      if (next) on(next, 'click', function () { go(active + 1); });

      // Drag / swipe — 40px threshold, same as the design prototype
      var startX = null;
      function down(e) { startX = e.touches ? e.touches[0].clientX : e.clientX; }
      function up(e) {
        if (startX === null) return;
        var endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        var delta = endX - startX;
        startX = null;
        if (delta > 40) go(active - 1);
        else if (delta < -40) go(active + 1);
      }
      on(stage, 'mousedown', down);
      on(stage, 'mouseup', up);
      on(stage, 'mouseleave', function () { startX = null; });
      on(stage, 'touchstart', down);
      on(stage, 'touchend', up);

      layout();
    });
  }

  /* -------------------------------------------------- location filter */
  function initLocationFilters() {
    all('[data-location-filter]').forEach(function (root) {
      var chips = all('[data-filter-group]', root);
      var cards = all('[data-location]', root);
      var empty = root.querySelector('[data-location-empty]');
      var selected = {};

      chips.forEach(function (chip) {
        var g = chip.getAttribute('data-filter-group');
        if (!(g in selected)) selected[g] = 'All';
      });

      function cardMatches(card, sel) {
        return Object.keys(sel).every(function (g) {
          if (sel[g] === 'All') return true;
          var values = (card.getAttribute('data-' + g) || '').split('|');
          return values.indexOf(sel[g]) !== -1;
        });
      }
      function countWith(overrideGroup, overrideValue) {
        var probe = {};
        Object.keys(selected).forEach(function (g) { probe[g] = selected[g]; });
        probe[overrideGroup] = overrideValue;
        return cards.filter(function (c) { return cardMatches(c, probe); }).length;
      }
      function render() {
        var shown = 0;
        cards.forEach(function (card) {
          var ok = cardMatches(card, selected);
          card.hidden = !ok;
          if (ok) shown++;
        });
        if (empty) empty.hidden = shown !== 0;

        chips.forEach(function (chip) {
          var g = chip.getAttribute('data-filter-group');
          var v = chip.getAttribute('data-filter-value');
          var active = selected[g] === v;
          chip.setAttribute('aria-pressed', String(active));
          var dead = !active && v !== 'All' && countWith(g, v) === 0;
          if (dead) { chip.setAttribute('aria-disabled', 'true'); }
          else { chip.removeAttribute('aria-disabled'); }
        });
      }
      chips.forEach(function (chip) {
        on(chip, 'click', function () {
          if (chip.getAttribute('aria-disabled') === 'true') return;
          selected[chip.getAttribute('data-filter-group')] = chip.getAttribute('data-filter-value');
          render();
        });
      });
      render();
    });
  }

  /* ------------------------------------------------------------ forms */
  function initForms() {
    all('[data-demo-form]').forEach(function (form) {
      var status = form.querySelector('[data-form-status]');
      on(form, 'submit', function (e) {
        e.preventDefault();
        var required = all('[required]', form);
        var missing = required.some(function (f) { return !f.value.trim(); });
        if (status) {
          status.hidden = false;
          if (missing) {
            status.textContent = 'Please fill out all fields.';
            status.classList.add('form__status--error');
            return;
          }
          status.classList.remove('form__status--error');
          status.textContent = form.getAttribute('data-success') || 'Thanks — we will be in touch shortly.';
        }
        if (!missing) form.reset();
      });
    });
  }

  /* ------------------------------------------------------ misc chrome */
  function initBackToTop() {
    var btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    function sync() { btn.setAttribute('data-visible', String(window.scrollY > 600)); }
    on(window, 'scroll', sync, { passive: true });
    sync();
  }

  function initSaveButtons() {
    all('[data-save]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', 'false');
      on(btn, 'click', function () {
        var on_ = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', String(!on_));
        btn.textContent = on_ ? '\u2661' : '\u2665';
      });
    });
  }

  function initYear() {
    var y = String(new Date().getFullYear());
    all('[data-year]').forEach(function (el) { el.textContent = y; });
  }

  function init() {
    initMobileNav();
    initDropdowns();
    initQuoteCarousels();
    initCarousel3d();
    initLocationFilters();
    initForms();
    initBackToTop();
    initSaveButtons();
    initYear();
  }

  if (document.readyState === 'loading') on(document, 'DOMContentLoaded', init);
  else init();
})();
