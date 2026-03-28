(function () {
  var STORAGE_KEY = 'single-post-theme';
  var container = document.getElementById('single-post-container');
  var toggle = document.getElementById('single-post-theme-toggle');
  if (!container || !toggle) return;
  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'dark';
    } catch (e) { return 'dark'; }
  }
  function setTheme(theme) {
    container.setAttribute('data-theme', theme);
    document.body.classList.toggle('single-theme-light', theme === 'light');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }
  toggle.addEventListener('click', function () {
    var next = container.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
  setTheme(getTheme());
})();
