document.addEventListener('DOMContentLoaded', () => {
  // Element references
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const modeToggle = document.getElementById('mode-toggle');
  const moonIcon = modeToggle ? modeToggle.querySelector('.moon') : null;
  const sunIcon = modeToggle ? modeToggle.querySelector('.sun') : null;
  const body = document.body;
  const backToTopBtn = document.getElementById('scrollToTopBtn'); // ✅ FIXED ID sesuai HTML

  // =======================
  // MOBILE NAVIGATION
  // =======================
  function toggleMobileNav() {
    if (mobileNav) mobileNav.classList.toggle('is-active');
    body.classList.toggle('no-scroll');
  }

  if (hamburger) hamburger.addEventListener('click', toggleMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', toggleMobileNav);

  // =======================
  // DARK MODE TOGGLE
  // =======================
  function updateDarkModeUI(isDark) {
    if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'inline';
    if (sunIcon) sunIcon.style.display = isDark ? 'inline' : 'none';
  }

  function toggleDarkMode() {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateDarkModeUI(isDark);
  }

  if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode);
  }

  // Set dark mode on load
  const savedTheme = localStorage.getItem('theme');
  const shouldUseDark = savedTheme === 'dark';
  if (shouldUseDark) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
  updateDarkModeUI(shouldUseDark);

  // =======================
  // SCROLL TO TOP BUTTON
  // =======================
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =======================
  // HIDE/SHOW NAVBAR ON SCROLL (Mobile only)
  // =======================
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  function isMobileScreen() {
    return window.innerWidth <= 1024;
  }

  window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (isMobileScreen()) {
      if (window.scrollY <= 0) {
        navbar.classList.remove('navbar-fixed-active', 'navbar-hidden');
      } else if (window.scrollY > lastScrollY && window.scrollY > navbarHeight) {
        navbar.classList.add('navbar-hidden');
      } else if (window.scrollY < lastScrollY) {
        navbar.classList.remove('navbar-hidden');
        if (window.scrollY > 0) {
          navbar.classList.add('navbar-fixed-active');
        }
      }
      lastScrollY = window.scrollY;
    } else {
      navbar.classList.remove('navbar-fixed-active', 'navbar-hidden');
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobileScreen() && navbar) {
      navbar.classList.remove('navbar-fixed-active', 'navbar-hidden');
    }
  });
});
