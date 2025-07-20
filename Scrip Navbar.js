document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const modeToggle = document.getElementById('mode-toggle');
  const moonIcon = modeToggle.querySelector('.moon');
  const sunIcon = modeToggle.querySelector('.sun');
  const body = document.body;

  // Mobile nav
  function toggleMobileNav() {
    mobileNav.classList.toggle('is-active');
    body.classList.toggle('no-scroll');
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', toggleMobileNav);
  }

  // Dark mode
  function toggleDarkMode() {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline';
    } else {
      localStorage.setItem('theme', 'light');
      moonIcon.style.display = 'inline';
      sunIcon.style.display = 'none';
    }
  }

  if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode);
  }

  // Atur tema saat load
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'inline';
  } else {
    moonIcon.style.display = 'inline';
    sunIcon.style.display = 'none';
  }
});


//punya mode darl article 

document.addEventListener("DOMContentLoaded", function () {
    const modeToggle = document.getElementById("mode-toggle");
    modeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
