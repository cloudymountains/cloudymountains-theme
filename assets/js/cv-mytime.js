(function () {
  var mytime = document.querySelector('.cv-mytime');
  if (!mytime) return;
  var wrap = mytime.querySelector('.cv-mytime-chart-wrap');
  var letterEl = mytime.querySelector('.cv-mytime-letter');
  var segments = mytime.querySelectorAll('.cv-mytime-segment');
  var legendItems = mytime.querySelectorAll('.cv-mytime-legend-item');
  function clearHighlight() {
    wrap.classList.remove('hover-segment');
    if (letterEl) letterEl.textContent = '';
    legendItems.forEach(function (el) { el.classList.remove('highlight'); });
  }
  segments.forEach(function (seg) {
    seg.addEventListener('mouseenter', function () {
      var label = seg.getAttribute('data-label');
      var index = parseInt(seg.getAttribute('data-index'), 10);
      if (letterEl) letterEl.textContent = label;
      wrap.classList.add('hover-segment');
      if (legendItems[index]) legendItems[index].classList.add('highlight');
    });
    seg.addEventListener('mouseleave', clearHighlight);
  });
})();
