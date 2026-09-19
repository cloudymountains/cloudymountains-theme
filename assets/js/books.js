// Books page: books stand spine-out and turn to show their cover.
// - Nudges an opening book sideways so its cover stays inside the shelf.
// - On touch screens (no hover), the first tap opens a book, the second tap
//   follows the Amazon link.
// - Once a link is followed, the book closes again, so it isn't left open
//   when the visitor comes back to the page.
(function () {
  var books = document.querySelectorAll('.bookshelf .book');
  if (!books.length) return;

  var touch = window.matchMedia('(hover: none)').matches;

  function fit(book) {
    var shelf = book.closest('.bookshelf').getBoundingClientRect();
    var r = book.getBoundingClientRect();
    // Cover width, plus a little for the perspective pop-out
    var w = book.querySelector('.book-3d').offsetWidth * 1.1;
    var center = r.left + r.width / 2;
    var pad = 8;
    var shift = 0;
    if (center - w / 2 < shelf.left + pad) {
      shift = shelf.left + pad - (center - w / 2);
    } else if (center + w / 2 > shelf.right - pad) {
      shift = shelf.right - pad - (center + w / 2);
    }
    book.style.setProperty('--shift', shift + 'px');
  }

  function closeAll(except) {
    books.forEach(function (b) {
      if (b !== except) b.classList.remove('is-open');
    });
  }

  function reset() {
    closeAll(null);
    var active = document.activeElement;
    if (active && active.closest && active.closest('.bookshelf')) active.blur();
  }

  books.forEach(function (book) {
    var link = book.querySelector('.book-3d');

    book.addEventListener('mouseenter', function () { fit(book); });
    book.addEventListener('focusin', function () { fit(book); });

    link.addEventListener('click', function (e) {
      if (touch && !book.classList.contains('is-open')) {
        e.preventDefault();
        closeAll(book);
        fit(book);
        book.classList.add('is-open');
        return;
      }
      // Link is being followed (new tab): close the book behind it
      setTimeout(reset, 0);
    });
  });

  if (touch) {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.bookshelf .book')) closeAll(null);
    });
  }

  // Coming back to the tab, or via the back button (bfcache)
  window.addEventListener('pageshow', reset);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') reset();
  });
})();
