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
