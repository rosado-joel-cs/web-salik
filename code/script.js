document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Class filter chips (classes.html)
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

// 3D tilt effect for class cards
var tiltCards = document.querySelectorAll('.class-card');
tiltCards.forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var rotateX = (y - centerY) / 10;
    var rotateY = (centerX - x) / 10;
    card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
  });
  card.addEventListener('mouseleave', function () {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});