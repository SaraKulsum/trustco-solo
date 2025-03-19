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

document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('next-button');
  const prevButton = document.getElementById('prev-button');
  const dotsContainer = document.getElementById('carousel-dots');

  let slideWidth;
  let slidesToShow = 1; // Default for mobile
  let currentPage = 0;
  let totalPages;

  // Function to update carousel based on screen size
  function updateCarousel() {
    slidesToShow = window.innerWidth >= 768 ? 2 : 1;

    // Calculate slide width
    slideWidth = track.parentElement.clientWidth / slidesToShow;

    // Set width for each slide
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    // Calculate total pages
    totalPages = Math.ceil(slides.length / slidesToShow);

    // Move to current page
    if (currentPage >= totalPages) {
      currentPage = totalPages - 1;
    }
    moveToPage(currentPage);

    // Update dots
    updateDots();
  }

  // Function to move to a specific page
  function moveToPage(pageIndex) {
    currentPage = pageIndex;
    track.style.transform = `translateX(-${
      pageIndex * slidesToShow * slideWidth
    }px)`;
    updateActiveDot();
  }

  // Create dots
  function updateDots() {
    // Clear existing dots
    dotsContainer.innerHTML = '';

    // Create new dots based on total pages
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === currentPage) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => moveToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Update active dot
  function updateActiveDot() {
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Event listeners for buttons
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      moveToPage(currentPage + 1);
    } else {
      moveToPage(0); // Loop back to start
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      moveToPage(currentPage - 1);
    } else {
      moveToPage(totalPages - 1); // Loop to end
    }
  });

  // Initial setup
  updateCarousel();

  // Update on window resize
  window.addEventListener('resize', updateCarousel);
});
