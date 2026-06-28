// Shared site behaviour: sticky-nav border, mobile menu, scroll reveal
(function () {
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    });
  }

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function show(el) { el.classList.add('in'); }

  if (!('IntersectionObserver' in window)) { els.forEach(show); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  els.forEach(function (el) { io.observe(el); });

  // Safety net: reveal anything already on screen immediately, so above-the-fold
  // content is never left hidden if the observer is slow to fire on load.
  requestAnimationFrame(function () {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) show(el);
    });
  });
})();
