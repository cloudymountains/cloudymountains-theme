// Spotlight: feeds the pointer position to .card-spotlight elements as --x / --y
// (styles in assets/css/cards.scss). One delegated listener; fine pointers only.
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var frame = null;
  var pending = null;

  document.addEventListener('pointermove', function (e) {
    var card = e.target.closest && e.target.closest('.card-spotlight');
    if (!card) return;
    pending = { card: card, x: e.clientX, y: e.clientY };
    if (frame) return;
    frame = requestAnimationFrame(function () {
      var r = pending.card.getBoundingClientRect();
      pending.card.style.setProperty('--x', (pending.x - r.left) + 'px');
      pending.card.style.setProperty('--y', (pending.y - r.top) + 'px');
      frame = null;
    });
  }, { passive: true });
})();
