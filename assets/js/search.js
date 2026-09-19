// Live filter for post listings (layouts/partials/post-listing.html):
// matches the query against each card's data-search text.
(function () {
  var input = document.getElementById('postSearch');
  if (!input) return;
  var cards = document.querySelectorAll('#postsList .post-card');
  var countEl = document.getElementById('postCount');
  var noResults = document.getElementById('postsNoResults');

  input.addEventListener('input', function () {
    var q = this.value.toLowerCase().trim();
    var visible = 0;
    cards.forEach(function (card) {
      var match = !q || card.dataset.search.indexOf(q) !== -1;
      card.hidden = !match;
      if (match) visible++;
    });
    countEl.textContent = visible;
    noResults.hidden = visible !== 0;
  });
})();
