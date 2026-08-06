/* ══════════════════════════════════════════════════════════════
   MLX MALILOG EXPO 2027 — SCRIPT PRINCIPAL
   Fichier : assets/js/main.js
   Organisé par GRAPHIC COM · Commissaire Général : Aboubacar BATHILY
   Contact : contact@salonsigma.com · salonsigma.com
   ──────────────────────────────────────────────────────────────
   SOMMAIRE DES MODULES
   01. Nav — comportement au scroll
   02. Menu mobile (burger)
   03. Smooth scroll (ancres)
   04. Helper window.go(id)
   05. Reveal on scroll (IntersectionObserver)
   06. Compteurs animés (data-n)
   07. Countdown timer (désactivé — #cd-* absent)
   08. FAQ accordion (window.tf)
   09. Lazy load images (data-src)
   10. Formulaires newsletter (.comnlbtn / .ft-nl-btn)
   ══════════════════════════════════════════════════════════════ */

/* ── ORIGINAL HEADER — Main JavaScript v4
   Lead Engineer: GRAPHIC COM · Bamako, Mali */
(function () {
  'use strict';

  /* ── NAV SCROLL BEHAVIOUR ── */
  const nav = document.getElementById('nav');
  let rafPending = false;
  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(function () {
        nav.classList.toggle('s', window.scrollY > 60);
        rafPending = false;
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── MOBILE MENU ── */
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mob');
  function closeMob() {
    if (!mob) return;
    mob.classList.remove('open');
    if (hbg) hbg.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  window.cm = closeMob;
  if (hbg && mob) {
    hbg.addEventListener('click', function () {
      const isOpen = mob.classList.toggle('open');
      hbg.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ── SMOOTH SCROLL (anchor links) ── */
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeMob();
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
  });

  /* ── HELPER: scroll to section ── */
  window.go = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── REVEAL ON SCROLL ── */
  if ('IntersectionObserver' in window) {
    const revIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('v');
          revIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
    document.querySelectorAll('.R,.RL,.RR').forEach(function (el) {
      revIO.observe(el);
    });
  } else {
    /* Fallback: show all immediately */
    document.querySelectorAll('.R,.RL,.RR').forEach(function (el) {
      el.classList.add('v');
    });
  }

  /* ── ANIMATED COUNTERS ── */
  function animCount(el, target, suffix) {
    var dur = 1600, t0 = performance.now();
    function run(now) {
      var p = Math.min((now - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + (suffix || '');
      if (p < 1) requestAnimationFrame(run);
    }
    requestAnimationFrame(run);
  }
  if ('IntersectionObserver' in window) {
    var cntIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          animCount(el, Number(el.dataset.n), el.dataset.s || '');
          cntIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-n]').forEach(function (el) {
      cntIO.observe(el);
    });
  }

  /* ── COUNTDOWN TIMER ── */
  (function () {
    var TARGET_DATE = new Date('2027-10-16T08:00:00Z');
    var els = {
      d: document.getElementById('cd-d'),
      h: document.getElementById('cd-h'),
      m: document.getElementById('cd-m'),
      s: document.getElementById('cd-s')
    };
    if (!els.d) return; /* Countdown section may be removed */
    function pad(n) { return String(n).padStart(2, '0'); }
    var prevS = '';
    function tick() {
      var diff = TARGET_DATE - new Date();
      if (diff <= 0) {
        Object.values(els).forEach(function (e) { if (e) e.textContent = '00'; });
        return;
      }
      var d = Math.floor(diff / 864e5);
      var h = Math.floor((diff % 864e5) / 36e5);
      var m = Math.floor((diff % 36e5) / 6e4);
      var s = Math.floor((diff % 6e4) / 1e3);
      els.d.textContent = pad(d);
      els.h.textContent = pad(h);
      els.m.textContent = pad(m);
      var fs = pad(s);
      if (fs !== prevS && els.s) {
        els.s.textContent = fs;
        els.s.classList.remove('tick');
        void els.s.offsetWidth; /* reflow */
        els.s.classList.add('tick');
        prevS = fs;
      }
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ── FAQ ACCORDION ── */
  window.tf = function (btn) {
    var item = btn.parentElement;
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.fi.open').forEach(function (i) {
      i.classList.remove('open');
      var q = i.querySelector('.fq');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ── LAZY LOAD IMAGES ── */
  if ('IntersectionObserver' in window) {
    var lazyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.target.dataset.src) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute('data-src');
          lazyIO.unobserve(e.target);
        }
      });
    }, { rootMargin: '200px 0px' });
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      lazyIO.observe(img);
    });
  }

  /* ── FORM NEWSLETTER ── */
  document.querySelectorAll('.comnlbtn,.ft-nl-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var input = btn.parentElement.querySelector('input[type="email"]');
      if (input && input.value && input.value.includes('@')) {
        var orig = btn.textContent;
        btn.textContent = '✓ Confirmé';
        btn.style.background = '#1B3152';
        setTimeout(function () {
          btn.textContent = orig;
          btn.style.background = '';
          input.value = '';
        }, 3000);
      } else if (input) {
        input.style.borderColor = '#E8651A';
        input.focus();
        setTimeout(function () { input.style.borderColor = ''; }, 2000);
      }
    });
  });

})();
