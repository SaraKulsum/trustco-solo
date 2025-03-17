const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active')
    ? 'hidden'
    : '';
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu on window resize (if desktop size)
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});
