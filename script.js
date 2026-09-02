document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  // Fixed header gains a solid background + shadow once the page scrolls,
  // so it stays legible over any section it's floating above.
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav: full-screen overlay toggle, closes itself once a link is tapped.
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '&#9776;';
      });
    });
  }

  // Scroll-spy: highlight whichever section is in view in the navbar.
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    navLinks.forEach(function (link) {
      linkFor[link.getAttribute('href').slice(1)] = link;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Class filter chips (Classes section)
  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('.class-card');
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var filter = chip.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = filter === 'all' || card.getAttribute('data-subject') === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
});
