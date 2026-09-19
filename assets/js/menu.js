// Site navigation (layouts/partials/menu.html):
// - hamburger toggles the slide-out panel on small screens
// - over a hero, the bar turns frosted once the hero scrolls out of view
// - on the home page, the link for the section in view is highlighted
(function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  var panel = document.getElementById('main-nav');
  var burger = nav.querySelector('.hamburger');

  function setOpen(open) {
    panel.classList.toggle('active', open);
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', function () {
    setOpen(!panel.classList.contains('active'));
  });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('active') && !nav.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      setOpen(false);
      burger.focus();
    }
  });

  if (!('IntersectionObserver' in window)) {
    nav.classList.add('is-scrolled');
    return;
  }

  // Frosted once the hero has scrolled under the bar
  var hero = document.querySelector('.hero');
  if (hero && nav.classList.contains('is-overlay')) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { rootMargin: '-' + nav.offsetHeight + 'px 0px 0px 0px' }).observe(hero);
  }

  // Home page: highlight the link whose section is in view
  var links = Array.prototype.filter.call(nav.querySelectorAll('.nav-link'), function (a) {
    var url = new URL(a.href, location.href);
    return url.pathname === location.pathname && url.hash;
  });
  if (!links.length) return;
  var homeLink = nav.querySelector('.nav-link[href="/"]');
  var byId = {};
  links.forEach(function (a) { byId[new URL(a.href).hash.slice(1)] = a; });

  function activate(link) {
    nav.querySelectorAll('.nav-link').forEach(function (a) {
      var on = a === link;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
    // The first section (in page order) that is in the middle band wins
    var current = null;
    Object.keys(byId).forEach(function (id) {
      if (!current && visible[id]) current = byId[id];
    });
    activate(current || homeLink);
  }, { rootMargin: '-45% 0px -45% 0px' });

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
