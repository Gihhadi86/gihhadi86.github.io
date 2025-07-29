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
    body.classList.toggle('dark'); // Menggunakan kelas 'dark'
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
    body.classList.add('dark'); // Menggunakan kelas 'dark'
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'inline';
  } else {
    moonIcon.style.display = 'inline';
    sunIcon.style.display = 'none';
  }

  // Bagian kode duplikat untuk mode gelap yang dihapus
  // document.addEventListener("DOMContentLoaded", function () {
  //     const modeToggle = document.getElementById("mode-toggle");
  //     modeToggle?.addEventListener("click", () => {
  //         document.body.classList.toggle("dark-mode");
  //     });
  // });


  // Punya hamburger dan teman-temannya
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

  // Punya hamburger
  // JavaScript untuk efek sembunyikan/tampilkan navbar saat scroll (khusus mobile)

  document.addEventListener('DOMContentLoaded', function() {
      const navbar = document.querySelector('.navbar');
      let lastScrollY = 0; // Menyimpan posisi scroll terakhir, mulai dari 0
      // Dapatkan tinggi navbar. Ini penting untuk mengetahui kapan navbar sudah melewati posisi awalnya.
      const navbarHeight = navbar.offsetHeight; 

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
                  navbar.classList.remove('navbar-fixed-active'); // Hapus kelas fixed
                  navbar.classList.remove('navbar-hidden'); // Pastikan terlihat
              } 
              // Jika menggulir ke bawah DAN sudah melewati tinggi navbar
              else if (window.scrollY > lastScrollY && window.scrollY > navbarHeight) {
                  navbar.classList.add('navbar-hidden'); // Sembunyikan navbar
              } 
              // Jika menggulir ke atas
              else if (window.scrollY < lastScrollY) {
                  navbar.classList.remove('navbar-hidden'); // Tampilkan navbar
                  // Jika masih di bawah posisi paling atas, buat navbar fixed
                  if (window.scrollY > 0) {
                      navbar.classList.add('navbar-fixed-active'); 
                  }
              }
              lastScrollY = window.scrollY; // Perbarui posisi scroll terakhir
          } else {
              // Pastikan navbar terlihat dan tidak dalam mode fixed yang dikontrol JS di layar besar
              navbar.classList.remove('navbar-hidden');
              navbar.classList.remove('navbar-fixed-active');
          }
      });

      // Tambahkan event listener untuk resize agar perilaku responsif tetap benar
      window.addEventListener('resize', function() {
          if (!isMobileScreen()) {
              navbar.classList.remove('navbar-hidden');
              navbar.classList.remove('navbar-fixed-active');
          }
      });
  });
});
