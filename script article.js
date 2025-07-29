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

  // Consolidated Dark Mode
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline';
    } else {
      body.classList.remove('dark');
      moonIcon.style.display = 'inline';
      sunIcon.style.display = 'none';
    }
  }

  function toggleDarkMode() {
    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'light');
      applyTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      applyTheme('dark');
    }
  }

  if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode);
  }

  // Set theme on initial load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Default to light if no theme is saved
    applyTheme('light');
  }


  // Tambahkan ini di Script Index.js atau di tag <script> di HTML Anda
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling Down
      navbar.classList.remove('show');
      navbar.classList.remove('top'); // Hapus kelas top jika ada
    } else {
      // Scrolling Up
      navbar.classList.add('show');
      if (window.scrollY === 0) {
        // At the very top of the page
        navbar.classList.add('top'); // Tambahkan kelas top
        navbar.classList.remove('show'); // Pastikan show dihapus jika di paling atas
      } else {
        navbar.classList.remove('top'); // Hapus kelas top jika tidak di paling atas
      }
    }
    lastScrollY = window.scrollY;
  });

  // Handle initial state on page load
  if (window.scrollY === 0) {
    navbar.classList.add('top');
    navbar.classList.remove('show'); // Pastikan navbar terlihat saat di paling atas
  } else {
    navbar.classList.remove('top');
    navbar.classList.add('show'); // Jika tidak di paling atas, biarkan muncul default
  }


  // KODE JAVASCRIPT UNTUK TOMBOL BACK TO TOP (TAMBAHKAN INI KE script article.js)
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Fungsi untuk menampilkan/menyembunyikan tombol
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) { // Tampilkan tombol setelah scrolling 200px ke bawah
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Fungsi untuk menggulirkan halaman ke atas saat tombol diklik
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Gulirkan dengan efek halus
    });
  });

  // Catatan: CSS Anda sudah menangani display: none untuk .back-to-top di mobile
  // melalui media query, jadi tidak perlu JS tambahan untuk itu kecuali ada kebutuhan spesifik.


  // punya humberger
  // JavaScript untuk efek sembunyikan/tampilkan navbar saat scroll (khusus mobile)
  const navbarMobile = document.querySelector('.navbar'); // Using a different variable name for clarity, though it's the same element
  let lastScrollYMobile = 0; // Menyimpan posisi scroll terakhir, mulai dari 0
  // Dapatkan tinggi navbar. Ini penting untuk mengetahui kapan navbar sudah melewati posisi awalnya.
  const navbarHeight = navbarMobile.offsetHeight;

  // Fungsi untuk memeriksa apakah layar adalah layar kecil (mobile)
  function isMobileScreen() {
    // Sesuaikan breakpoint ini dengan media query CSS Anda (max-width: 768px)
    return window.innerWidth <= 768;
  }

  window.addEventListener('scroll', function() {
    // Hanya terapkan efek ini jika di layar mobile
    if (isMobileScreen()) {
      // Jika posisi scroll di paling atas halaman
      if (window.scrollY <= 0) {
        navbarMobile.classList.remove('navbar-fixed-active'); // Hapus kelas fixed
        navbarMobile.classList.remove('navbar-hidden'); // Pastikan terlihat
      }
      // Jika menggulir ke bawah DAN sudah melewati tinggi navbar
      else if (window.scrollY > lastScrollYMobile && window.scrollY > navbarHeight) {
        navbarMobile.classList.add('navbar-hidden'); // Sembunyikan navbar
      }
      // Jika menggulir ke atas
      else if (window.scrollY < lastScrollYMobile) {
        navbarMobile.classList.remove('navbar-hidden'); // Tampilkan navbar
        // Jika masih di bawah posisi paling atas, buat navbar fixed
        if (window.scrollY > 0) {
          navbarMobile.classList.add('navbar-fixed-active');
        }
      }
      lastScrollYMobile = window.scrollY; // Perbarui posisi scroll terakhir
    } else {
      // Pastikan navbar terlihat dan tidak dalam mode fixed yang dikontrol JS di layar besar
      navbarMobile.classList.remove('navbar-hidden');
      navbarMobile.classList.remove('navbar-fixed-active');
    }
  });

  // Tambahkan event listener untuk resize agar perilaku responsif tetap benar
  window.addEventListener('resize', function() {
    if (!isMobileScreen()) {
      navbarMobile.classList.remove('navbar-hidden');
      navbarMobile.classList.remove('navbar-fixed-active');
    }
  });
});