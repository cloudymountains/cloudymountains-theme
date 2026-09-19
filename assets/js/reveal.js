// Reveal on scroll: adds .is-revealed to [data-reveal] elements as they enter
// the viewport (styles in assets/css/motion.scss). Reveals everything at once
// when IntersectionObserver is missing or the user prefers reduced motion.
(function () {
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  function reveal(el) { el.classList.add('is-revealed'); }

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(reveal);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  items.forEach(function (el) { observer.observe(el); });
})();
