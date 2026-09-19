document.addEventListener('DOMContentLoaded', function() {
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const postsList = document.getElementById('postsList');
  const posts = document.querySelectorAll('.container-link');
  if (!searchContainer || !searchInput) return;  // only on list pages

  // Toggle search container active state and focus input
  searchContainer.addEventListener('click', function(e) {
    e.stopPropagation();
    searchContainer.classList.add('active');
    searchInput.focus();
  });

  // Close search and clear input when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
      searchInput.value = '';
      // Reset all posts to be visible
      posts.forEach(post => {
        post.style.display = '';
      });
    }
  });

  // Prevent closing when clicking inside the input
  searchInput.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    posts.forEach(post => {
      const title = post.getAttribute('data-title').toLowerCase();
      const description = post.getAttribute('data-description').toLowerCase();
      const content = post.getAttribute('data-content').toLowerCase();
      
      if (title.includes(searchTerm) || 
          description.includes(searchTerm) || 
          content.includes(searchTerm)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  });
}); 