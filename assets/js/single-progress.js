(function () {
  var bar = document.querySelector('.single-post-progress-bar');
  if (!bar) return;
  var container = document.querySelector('.single-post-container');
  function update() {
    if (!container) return;
    var top = container.getBoundingClientRect().top;
    var height = container.offsetHeight;
    var winHeight = window.innerHeight;
    if (height <= winHeight) {
      bar.style.setProperty('--scroll-progress', '100%');
      return;
    }
    var scrolled = -top;
    var progress = Math.min(100, Math.max(0, (scrolled / (height - winHeight)) * 100));
    bar.style.setProperty('--scroll-progress', progress + '%');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Table of contents: highlight the section currently being read — the last
// heading that has scrolled past the bottom of the sticky navigation.
(function () {
  var toc = document.querySelector('.post-toc');
  if (!toc) return;
  var links = {};
  toc.querySelectorAll('a[href^="#"]').forEach(function (a) {
    links[decodeURIComponent(a.getAttribute('href').slice(1))] = a;
  });
  var headings = Array.prototype.filter.call(
    document.querySelectorAll('.single-post-content h2[id], .single-post-content h3[id]'),
    function (h) { return links[h.id]; }
  );
  if (!headings.length) return;
  var nav = document.querySelector('.site-nav');

  var current = null;
  var ticking = false;
  function update() {
    ticking = false;
    var line = (nav ? nav.offsetHeight : 0) + 32;
    var active = headings[0].id;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top <= line) active = headings[i].id;
      else break;
    }
    if (active === current) return;
    if (current) links[current].classList.remove('is-active');
    links[active].classList.add('is-active');
    current = active;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
