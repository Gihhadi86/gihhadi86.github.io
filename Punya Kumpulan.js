document.addEventListener('DOMContentLoaded', () => {
  // Element references - Query all elements once at the start
  const hamburger = document.getElementById('hamburger'); //
  const mobileNav = document.getElementById('mobileNav'); //
  const mobileNavClose = document.getElementById('mobileNavClose'); //
  const modeToggle = document.getElementById('mode-toggle'); //
  const moonIcon = modeToggle ? modeToggle.querySelector('.moon') : null; //
  const sunIcon = modeToggle ? modeToggle.querySelector('.sun') : null; //
  const body = document.body; //
  const backToTopBtn = document.getElementById('scrollToTopBtn'); // // Corrected ID from previous file

  // =======================
  // MOBILE NAVIGATION
  // =======================
  function toggleMobileNav() {
    if (mobileNav) mobileNav.classList.toggle('is-active'); //
    body.classList.toggle('no-scroll'); //
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav); //
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', toggleMobileNav); //
  }

  // =======================
  // DARK MODE TOGGLE
  // =======================
  function updateDarkModeUI(isDark) {
    // This function updates the UI (icons) based on the dark mode state
    if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block'; // // Changed to 'block' for better consistency with CSS
    if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none'; // // Changed to 'block'
  }

  function toggleDarkMode() {
    const isDark = body.classList.toggle('dark'); // Toggle 'dark' class on body
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference to localStorage
    updateDarkModeUI(isDark); // Update icons based on new state
  }

  // Attach event listener to the toggle button
  if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode); //
  }

  // Set dark mode on initial load based on localStorage
  const savedTheme = localStorage.getItem('theme'); //
  const shouldUseDark = savedTheme === 'dark'; //
  if (shouldUseDark) {
    body.classList.add('dark'); // Apply dark class if saved theme is dark
  } else {
    body.classList.remove('dark'); // Ensure light class if saved theme is light or nothing
  }
  updateDarkModeUI(shouldUseDark); // Initialize icons based on loaded theme

  // =======================
  // SCROLL TO TOP BUTTON
  // =======================
  // Ensure the button is present before adding listeners
  if (backToTopBtn) { //
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => { //
      if (window.scrollY > 200) { //
        backToTopBtn.classList.add('show'); //
      } else {
        backToTopBtn.classList.remove('show'); //
      }
    });

    // Scroll to top on button click
    backToTopBtn.addEventListener('click', (e) => { //
      e.preventDefault(); // Prevent default link behavior
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll animation
      });
    });
  }

  // =======================
  // HIDE/SHOW NAVBAR ON SCROLL (Mobile only)
  // =======================
  const navbar = document.querySelector('.navbar'); //
  let lastScrollY = 0; // Tracks the last scroll position
  const navbarHeight = navbar ? navbar.offsetHeight : 0; // Get navbar height, default to 0 if not found

  // Helper function to check if screen is mobile
  function isMobileScreen() {
    // Matches your CSS media query breakpoint (max-width: 1024px)
    return window.innerWidth <= 1024; //
  }

  window.addEventListener('scroll', () => { //
    // Only apply this effect on mobile screens
    if (isMobileScreen()) { //
      // If at the very top of the page
      if (window.scrollY <= 0) { //
        navbar.classList.remove('navbar-fixed-active'); // Remove fixed class
        navbar.classList.remove('navbar-hidden'); // Ensure it's visible
      }
      // If scrolling down AND passed navbar height
      else if (window.scrollY > lastScrollY && window.scrollY > navbarHeight) { //
        navbar.classList.add('navbar-hidden'); // Hide navbar
      }
      // If scrolling up
      else if (window.scrollY < lastScrollY) { //
        navbar.classList.remove('navbar-hidden'); // Show navbar
        // If still below the very top, make navbar fixed
        if (window.scrollY > 0) { //
          navbar.classList.add('navbar-fixed-active'); //
        }
      }
      lastScrollY = window.scrollY; // Update last scroll position
    } else {
      // For larger screens, ensure navbar is always visible and not fixed by JS
      if (navbar) { //
        navbar.classList.remove('navbar-hidden'); //
        navbar.classList.remove('navbar-fixed-active'); //
      }
    }
  });

  // Re-evaluate navbar state on window resize
  window.addEventListener('resize', () => { //
    if (!isMobileScreen()) { //
      if (navbar) { //
        navbar.classList.remove('navbar-hidden'); //
        navbar.classList.remove('navbar-fixed-active'); //
      }
    }
  });
});