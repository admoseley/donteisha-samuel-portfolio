/**
 * site.js — Shared JavaScript for D. Samuel Portfolio
 * ─────────────────────────────────────────────────────────────
 * This single file is loaded (with defer) on every page of
 * the site.  It handles three independent behaviours:
 *
 *  1. STICKY NAV BORDER
 *     Adds the .scrolled class to the <header id="nav"> when the
 *     user scrolls down more than 12px.  styles.css turns the
 *     nav's bottom border visible when .scrolled is present,
 *     giving a subtle "lifted" effect once content scrolls behind
 *     the sticky header.
 *
 *  2. MOBILE MENU TOGGLE
 *     The hamburger button (#navToggle) is only visible at ≤900px
 *     (styles.css media query).  Clicking it adds/removes the
 *     .open class on #navLinks, which slides the vertical mobile
 *     nav panel into view (CSS transform transition).
 *     Clicking any link inside the open menu also closes it, so
 *     the user doesn't have to manually dismiss it when navigating.
 *
 *  3. SCROLL REVEAL + ABOVE-FOLD SAFETY NET
 *     Elements with class="reveal" in the HTML start hidden
 *     (opacity: 0, translateY: 28px) via CSS.  An IntersectionObserver
 *     watches them and adds class="in" when they enter the viewport,
 *     triggering the CSS transition to full opacity + no transform.
 *
 *     Safety net: the observer fires on SCROLL.  If a .reveal element
 *     is already visible when the page first loads (e.g., the mission/
 *     vision cards on about.html, or the form on contact.html), the
 *     observer may never fire for it and it stays invisible.
 *     A requestAnimationFrame callback runs once on load and immediately
 *     reveals any .reveal element whose bounding rect is already inside
 *     the viewport — solving the above-fold visibility problem.
 *
 * PATTERN NOTE
 * The entire script is wrapped in an IIFE (Immediately Invoked Function
 * Expression) — the outer (function() { ... })() — so none of the
 * local variables (nav, toggle, els, etc.) pollute the global window
 * scope.  This avoids conflicts if other scripts are ever added later.
 *
 * BROWSER SUPPORT
 * IntersectionObserver is supported in all modern browsers.  A graceful
 * fallback (els.forEach(show)) immediately reveals all elements if the
 * API is unavailable (very old browsers or certain test environments).
 */

(function () {

  /* ── 1. STICKY NAV BORDER ─────────────────────────────────────
   * The <header id="nav"> starts with a transparent bottom border.
   * As soon as the user scrolls past 12px, we add the CSS class
   * .scrolled, which styles.css uses to make the border visible.
   * classList.toggle(name, boolean) is cleaner than if/add/remove.
   */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      // Toggle .scrolled: true (add) when scrollY > 12, false (remove) when at top
      nav.classList.toggle('scrolled', window.scrollY > 12);
    });
  }


  /* ── 2. MOBILE MENU TOGGLE ────────────────────────────────────
   * #navToggle  — the hamburger <button> (three <span> bars)
   * #navLinks   — the <nav> containing all nav links
   *
   * Clicking the button toggles the .open class on the nav links
   * container, which slides it into view via CSS transform in
   * styles.css (@media max-width: 900px).
   *
   * The second event listener (on each <a> inside the nav) closes
   * the menu when a link is tapped — important on mobile because
   * navigating to another .html page would leave the menu open
   * for a brief visible moment before the new page loads.
   */
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');
  if (toggle && links) {
    // Hamburger click: toggle the open panel
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    // Close the menu whenever a nav link is clicked
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }


  /* ── 3. SCROLL REVEAL ─────────────────────────────────────────
   * Collect every element with class="reveal" on the current page.
   * The show() helper just adds class="in", which triggers the CSS
   * transition defined in styles.css (.reveal → .reveal.in).
   */
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  // Helper: mark an element as visible
  function show(el) { el.classList.add('in'); }

  // Graceful fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    els.forEach(show);
    return; // nothing else to set up
  }

  // IntersectionObserver configuration:
  //   threshold: 0.08  — trigger when 8% of the element is visible
  //                       (low enough to fire early, high enough that
  //                        a 1px peek doesn't count)
  //   rootMargin: '0px 0px -32px 0px' — shrink the bottom of the
  //                       observation area by 32px so elements reveal
  //                       slightly before reaching the very bottom edge
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        show(e.target);
        io.unobserve(e.target); // stop watching once revealed — no re-hiding
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  // Start observing every .reveal element
  els.forEach(function (el) { io.observe(el); });


  /* ── ABOVE-FOLD SAFETY NET ────────────────────────────────────
   * Problem: IntersectionObserver only fires when elements ENTER
   * the viewport through scrolling.  On pages where .reveal
   * elements are already visible on page load (e.g., the Mission/
   * Vision cards on about.html, or the contact form on contact.html),
   * the observer's callback never fires for those elements — they
   * stay permanently invisible.
   *
   * Fix: after one animation frame (giving the browser time to
   * paint and calculate layout), we check each .reveal element's
   * bounding rect.  If it overlaps the viewport (top < viewport
   * height AND bottom > 0), we show it immediately.
   *
   * requestAnimationFrame is used instead of setTimeout(0) because
   * rAF fires right before the next paint, guaranteeing that
   * getBoundingClientRect() returns accurate layout values.
   */
  requestAnimationFrame(function () {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      // Element is at least partially within the visible viewport
      if (r.top < vh && r.bottom > 0) {
        show(el);
      }
    });
  });

})(); // end IIFE
