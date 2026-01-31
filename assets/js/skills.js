(function () {
  'use strict';

  var aboutSection = document.getElementById('about');
  var skillsSection = document.getElementById('skills');

  var countersAnimated = false;
  var skillBarsAnimated = false;

  function animateCounters() {
    if (!aboutSection) return;
    var counters = aboutSection.querySelectorAll('.skills-counter-value[data-target]');
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      var duration = 1500;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 2);
        var current = Math.floor(easeOut * target);
        el.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
  }

  function animateSkillBars() {
    if (!skillsSection) return;
    var fills = skillsSection.querySelectorAll('.skills-skill-fill[data-percent]');
    fills.forEach(function (el) {
      var percent = el.getAttribute('data-percent');
      if (percent != null) el.style.width = percent + '%';
    });
  }

  var aboutObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px' }
  );

  var skillsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !skillBarsAnimated) {
          skillBarsAnimated = true;
          skillsSection.classList.add('skills-visible');
          animateSkillBars();
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px' }
  );

  if (aboutSection) aboutObserver.observe(aboutSection);
  if (skillsSection) skillsObserver.observe(skillsSection);
})();
