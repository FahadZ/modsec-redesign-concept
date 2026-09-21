(function () {
  'use strict';
  var doc = document;
  doc.documentElement.classList.remove('no-js');

  // Year
  doc.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Camera tiles: live-ticking timestamp overlay
  var clocks = doc.querySelectorAll('[data-clock]');
  if (clocks.length) {
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var d = new Date();
      var s = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
      clocks.forEach(function (c) { c.textContent = s; });
    };
    tick();
    setInterval(tick, 1000);
  }

  // Mobile menu
  var toggle = doc.querySelector('.nav-toggle');
  var menu = doc.getElementById('menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    };
    toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('is-open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  // Sticky header shadow
  var header = doc.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal on scroll
  var reveals = doc.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Segmented tabs (residential / business)
  doc.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('[role="tab"]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          var on = b === btn;
          b.setAttribute('aria-selected', String(on));
          var panel = doc.getElementById(b.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
      });
    });
  });

  // Billing toggle (monthly / annual placeholder prices)
  doc.querySelectorAll('[data-billing]').forEach(function (group) {
    var buttons = group.querySelectorAll('button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        var mode = btn.getAttribute('data-mode');
        doc.querySelectorAll('[data-price-monthly]').forEach(function (el) {
          el.textContent = el.getAttribute(mode === 'annual' ? 'data-price-annual' : 'data-price-monthly');
        });
        doc.querySelectorAll('[data-billing-note]').forEach(function (el) {
          el.textContent = mode === 'annual' ? 'billed annually (placeholder)' : 'billed monthly (placeholder)';
        });
      });
    });
  });

  // Product filter
  var chips = doc.querySelectorAll('[data-filter]');
  var products = doc.querySelectorAll('[data-cat]');
  var count = doc.querySelector('[data-count]');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        var shown = 0;
        products.forEach(function (p) {
          var match = f === 'all' || p.getAttribute('data-cat').split(' ').indexOf(f) > -1;
          p.hidden = !match;
          if (match) shown++;
        });
        if (count) count.textContent = shown + (shown === 1 ? ' product' : ' products');
      });
    });

    // Deep links such as products.html#cameras pre-select a category
    var applyHash = function () {
      var h = location.hash.replace('#', '');
      var chip = h && doc.querySelector('[data-filter="' + h + '"]');
      if (chip) {
        chip.click();
        var target = doc.getElementById('catalog');
        if (target) target.scrollIntoView();
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
  }

  // Forms (front-end demo only: no data is sent anywhere)
  doc.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var err = field && field.querySelector('.err');
        var bad = !input.value.trim() || (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value));
        input.setAttribute('aria-invalid', String(bad));
        if (err) err.textContent = bad ? (input.type === 'email' ? 'Please enter a valid email address.' : 'This field is required.') : '';
        if (bad && ok) { input.focus(); }
        if (bad) ok = false;
      });
      var msg = form.querySelector('.form__ok');
      if (ok && msg) {
        msg.classList.add('is-on');
        msg.focus();
        form.reset();
      }
    });
  });
})();
