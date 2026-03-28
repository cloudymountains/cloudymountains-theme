(function () {
  var input = document.getElementById('tagSearch');
  var cards = document.querySelectorAll('.tag-card');
  var countEl = document.getElementById('tagCount');
  var noResults = document.getElementById('tagsNoResults');

  if (!input) return;

  input.addEventListener('input', function () {
    var q = this.value.toLowerCase().trim();
    var visible = 0;
    cards.forEach(function (card) {
      var match = !q || card.dataset.title.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    countEl.textContent = visible;
    noResults.style.display = visible === 0 ? 'block' : 'none';
  });
})();
