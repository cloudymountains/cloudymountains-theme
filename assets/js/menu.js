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
    // Labels come from the page language (data-label-open / data-label-close)
    burger.setAttribute('aria-label', open ? burger.dataset.labelClose : burger.dataset.labelOpen);
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

  // Language switcher: keep the reader's place on the other language's page.
  // A translation has the same structure, so the place is the Nth block at the
  // top of the viewport plus how far it is scrolled into it; when the other page
  // has a different number of blocks, the scroll position in proportion to the
  // page height. The stored place also tells that page (head.html) it was reached
  // from the switcher, so it skips its entrance animations (.lang-switched).
  var SWITCH_KEY = 'lang-switch';
  var BLOCKS = 'main section, main h1, main h2, main h3, main p, main li';
  var line = function () { return nav.getBoundingClientRect().bottom; };
  nav.querySelectorAll('.lang-switch a').forEach(function (a) {
    a.addEventListener('click', function () {
      var blocks = document.querySelectorAll(BLOCKS);
      var place = { ratio: window.scrollY / document.documentElement.scrollHeight, count: blocks.length };
      // The visible block starting closest above the line (works across columns, as on the CV)
      var y = line(), closest = -Infinity;
      for (var i = 0; i < blocks.length; i++) {
        var rect = blocks[i].getBoundingClientRect();
        if (rect.height && rect.top <= y && rect.top >= closest) { closest = rect.top; place.index = i; place.offset = y - rect.top; }
      }
      try { sessionStorage.setItem(SWITCH_KEY, JSON.stringify(place)); } catch (e) {}
    });
  });
  try {
    var place = JSON.parse(sessionStorage.getItem(SWITCH_KEY));
    if (place) {
      sessionStorage.removeItem(SWITCH_KEY);
      var blocks = document.querySelectorAll(BLOCKS);
      var y = place.ratio * document.documentElement.scrollHeight;
      if (place.index != null && blocks.length === place.count) {
        y = blocks[place.index].getBoundingClientRect().top + window.scrollY - line() + place.offset;
      }
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  } catch (e) {}

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
  // The link to this page itself ("/" or a language's home, e.g. "/bg/")
  var homeLink = Array.prototype.find.call(nav.querySelectorAll('.nav-link'), function (a) {
    var url = new URL(a.href, location.href);
    return url.pathname === location.pathname && !url.hash;
  }) || null;
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
