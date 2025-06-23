document.addEventListener('DOMContentLoaded', function() {
  const containers = document.querySelectorAll('.container-link');
  
  containers.forEach(container => {
    container.addEventListener('click', function(e) {
      // Don't navigate if clicking on a link inside the content preview
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        e.stopPropagation();
        return;
      }
      
      const href = this.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });
}); 