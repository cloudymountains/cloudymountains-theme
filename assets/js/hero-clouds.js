// Hero clouds: mouse parallax and a cursor glow for the drifting cloud layers.
// Writes --mx / --my (-1..1, eased) and --px / --py (glow position) on .hero;
// the CSS turns them into transforms. Idles when the pointer stops, pauses the
// drift while the hero is off screen, and does nothing for reduced motion.
(function () {
  var hero = document.querySelector('.hero');
  var clouds = hero && hero.querySelector('.hero-clouds');
  if (!clouds) return;

  // Pause the drift animation while the hero is scrolled out of view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle('clouds-paused', !entries[0].isIntersecting);
    }).observe(hero);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var target = { x: 0, y: 0, px: 0, py: 0 };
  var current = { x: 0, y: 0, px: 0, py: 0 };
  var running = false;
  var started = false;

  function tick() {
    var ease = 0.06;
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    current.px += (target.px - current.px) * 0.12;
    current.py += (target.py - current.py) * 0.12;

    hero.style.setProperty('--mx', current.x.toFixed(4));
    hero.style.setProperty('--my', current.y.toFixed(4));
    hero.style.setProperty('--px', current.px.toFixed(1) + 'px');
    hero.style.setProperty('--py', current.py.toFixed(1) + 'px');

    var settled =
      Math.abs(target.x - current.x) < 0.001 &&
      Math.abs(target.y - current.y) < 0.001 &&
      Math.abs(target.px - current.px) < 0.5 &&
      Math.abs(target.py - current.py) < 0.5;
    if (settled) {
      running = false;
      return;
    }
    requestAnimationFrame(tick);
  }

  function wake() {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    target.px = e.clientX - r.left;
    target.py = e.clientY - r.top;
    if (!started) {
      // Start the glow at the pointer instead of sliding in from a corner
      started = true;
      current.px = target.px;
      current.py = target.py;
    }
    clouds.classList.add('is-pointer');
    wake();
  });

  hero.addEventListener('pointerleave', function () {
    target.x = 0;
    target.y = 0;
    clouds.classList.remove('is-pointer');
    wake();
  });
})();
