function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('main-nav').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const nav = document.getElementById('main-nav');
        const hamburger = document.querySelector('.hamburger');
        const isClickInsideMenu = nav.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (nav.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}); 