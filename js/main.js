/* Claui & Co — interactions: scroll reveal, sticky nav, parallax, menu */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll reveal via IntersectionObserver ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- sticky nav condensed state ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var burger = document.querySelector('.nav__burger');
  var links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- lightweight parallax on banner image ---- */
  if (!reduce) {
    var parallax = document.querySelectorAll('[data-parallax]');
    var ticking = false;
    var run = function () {
      parallax.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var vh = window.innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5
        el.style.transform = 'translateY(' + (progress * 40) + 'px)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    run();

    /* subtle pointer tilt on hero media */
    var tilt = document.querySelector('[data-tilt] .hero__img');
    var wrap = document.querySelector('[data-tilt]');
    if (tilt && wrap && window.matchMedia('(pointer:fine)').matches) {
      wrap.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = 'scale(1.05) translate(' + (x * -12) + 'px,' + (y * -12) + 'px)';
      });
      wrap.addEventListener('mouseleave', function () { tilt.style.transform = ''; });
    }
  }
})();
