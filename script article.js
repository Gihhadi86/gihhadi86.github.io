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

// Tambahkan ini di Script Index.js atau di tag <script> di HTML Anda
document.addEventListener('DOMContentLoaded', () => {
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
});

        // KODE JAVASCRIPT UNTUK TOMBOL BACK TO TOP (TAMBAHKAN INI KE script article.js)
        document.addEventListener('DOMContentLoaded', function() {
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
        });
  