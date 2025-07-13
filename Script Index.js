
//punya navbar 

document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'grid' : 'none';
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;

  showSlide(0);
});







document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector('.slider-track');
  const sliderContainer = document.querySelector('.slider-container');
  const dots = document.querySelectorAll('.slider-horizontal .dot');
  const prevBtn = document.querySelector('.slider-horizontal .prev-btn');
  const nextBtn = document.querySelector('.slider-horizontal .next-btn');
  const articles = document.querySelectorAll('.slider-horizontal .article');
  let slideIndex = 0;

  function updateSlider() {
    const slideWidth = articles[0].offsetWidth + 15;
    sliderContainer.scrollTo({
      left: slideWidth * slideIndex,
      behavior: 'smooth'
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === slideIndex);
    });
  }

  nextBtn?.addEventListener('click', () => {
    if (slideIndex < articles.length - 1) {
      slideIndex++;
      updateSlider();
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (slideIndex > 0) {
      slideIndex--;
      updateSlider();
    }
  });

  sliderContainer?.addEventListener('scroll', () => {
    const index = Math.round(sliderContainer.scrollLeft / articles[0].offsetWidth);
    slideIndex = index;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });
});







document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById('bulughul-slider');
  const prevBtn = document.querySelector('.bulughul-prev');
  const nextBtn = document.querySelector('.bulughul-next');

  if (slider && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: slider.clientWidth * 0.9, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -slider.clientWidth * 0.9, behavior: 'smooth' });
    });
  }
});

// artikel lima.js


// artikel5.js
(function() { // Ini adalah IIFE (Immediately Invoked Function Expression)
    // Variabel dan konstanta yang spesifik untuk slider ini
    let currentSlide = 0;
    let totalSlides = 0; // Akan dihitung saat render
    let isMobile = false;

    // Data artikel untuk slider Tadabur Ayat
    const artikelData = [
        {
            img: "Gambar/cukur.png",
            date: "June 15, 2025",
            comments: "1",
            views: "1,000",
            title: "Tafsir Surat Ath-Thariq: Yang Datang pada Waktu Malam",
            desc: "Mendalami makna dan hikmah dari surat Ath-Thariq yang turun pada waktu malam..."
        },
        {
            img: "Gambar/Masjid.png",
            date: "June 10, 2025",
            comments: "0",
            views: "1,258",
            title: "Surat Al-Ghashiyah: Peristiwa yang Menyelubungi",
            desc: "Memahami pesan mendalam tentang hari akhir dalam surat Al-Ghashiyah..."
        },
        {
            img: "Gambar/Tidur.png",
            date: "June 5, 2025",
            comments: "3",
            views: "1,870",
            title: "Surat Al-Fajr: Fajar dan Sumpah Allah",
            desc: "Tadabur ayat-ayat Al-Fajr tentang kekuasaan Allah dan sejarah umat terdahulu..."
        },
        {
            img: "Gambar/Kerja.png",
            date: "May 29, 2025",
            comments: "2",
            views: "1,620",
            title: "Surat Al-Balad: Negeri yang Aman",
            desc: "Refleksi tentang kehidupan di dunia dan pilihan jalan yang benar..."
        },
        {
            img: "Gambar/Quran.png",
            date: "May 25, 2025",
            comments: "0",
            views: "1,120",
            title: "Surat Ash-Shams: Matahari dan Jiwa Manusia",
            desc: "Memahami perumpamaan matahari dengan penyucian jiwa manusia..."
        },
        {
            img: "Gambar/Tidur.png",
            date: "May 18, 2025",
            comments: "4",
            views: "2,005",
            title: "Surat Al-Lail: Malam dan Siang",
            desc: "Kontras antara malam dan siang sebagai simbol perbuatan manusia..."
        }
    ];

    // Dapatkan referensi elemen DOM hanya sekali
    const slidesContainer = document.getElementById('slidesContainer');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevBtn = document.querySelector('.section-artikel5 .arrow-btn.prev'); // Lebih spesifik
    const nextBtn = document.querySelector('.section-artikel5 .arrow-btn.next'); // Lebih spesifik

    // Fungsi untuk merender/menggambar ulang seluruh konten slider
    function renderArtikel5Slider() {
        if (!slidesContainer || !prevBtn || !nextBtn || !dotsContainer) {
            console.warn("Salah satu elemen penting untuk slider artikel5 tidak ditemukan. Mungkin ID/class salah atau DOM belum siap.");
            return; // Berhenti jika elemen tidak ditemukan
        }

        slidesContainer.innerHTML = ''; // Bersihkan konten yang ada
        dotsContainer.innerHTML = '';    // Bersihkan dots yang ada

        const screenWidth = window.innerWidth;
        isMobile = screenWidth <= 767;

        if (isMobile) {
            // Mobile: Setiap artikel menjadi slide sendiri
            totalSlides = artikelData.length;
            artikelData.forEach(artikel => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'artikel5-slide';
                slideDiv.innerHTML = `
                    <div class="artikel5-item">
                        <a href="#">
                            <img src="${artikel.img}" alt="${artikel.title}">
                            <div class="artikel5-meta">
                                <span>🕒 ${artikel.date}</span>
                                <span>💬 ${artikel.comments}</span>
                                <span>🔥 ${artikel.views}</span>
                            </div>
                            <h3>${artikel.title}</h3>
                            <p>${artikel.desc}</p>
                            <span class="artikel5-more">Baca Selengkapnya</span>
                        </a>
                    </div>
                `;
                slidesContainer.appendChild(slideDiv);
            });
        } else {
            // Desktop: Kelompokkan 3 artikel per slide
            totalSlides = Math.ceil(artikelData.length / 3);
            for (let i = 0; i < totalSlides; i++) {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'artikel5-slide';
                
                const startIdx = i * 3;
                const endIdx = Math.min(startIdx + 3, artikelData.length);
                const articlesForSlide = artikelData.slice(startIdx, endIdx);

                articlesForSlide.forEach(artikel => {
                    slideDiv.innerHTML += `
                        <div class="artikel5-item">
                            <a href="#">
                                <img src="${artikel.img}" alt="${artikel.title}">
                                <div class="artikel5-meta">
                                    <span>🕒 ${artikel.date}</span>
                                    <span>💬 ${artikel.comments}</span>
                                    <span>🔥 ${artikel.views}</span>
                                </div>
                                <h3>${artikel.title}</h3>
                                <p>${artikel.desc}</p>
                                <span class="artikel5-more">Baca Selengkapnya</span>
                            </a>
                        </div>
                    `;
                });
                slidesContainer.appendChild(slideDiv);
            }
        }
        
        // Pastikan currentSlide tidak melebihi totalSlides baru
        if (currentSlide >= totalSlides) {
            currentSlide = totalSlides > 0 ? totalSlides - 1 : 0;
        }
        if (currentSlide < 0) {
            currentSlide = 0;
        }

        updateSlidePosition();
        renderDots();
        updateNavButtons();
    }

    // Fungsi untuk memperbarui posisi slide
    function updateSlidePosition() {
        // Hanya update jika container sudah ada dan memiliki slides
        if (slidesContainer && slidesContainer.children.length > 0) {
            const translateX = -currentSlide * 100;
            slidesContainer.style.transform = `translateX(${translateX}%)`;
        }
    }

    // Fungsi untuk merender dots navigasi
    function renderDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Fungsi untuk memperbarui status tombol navigasi (disable/enable)
    function updateNavButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }

    // Fungsi untuk memperbarui kelas 'active' pada dots
    function updateDotsActiveState() {
        const dots = document.querySelectorAll('.artikel5-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Fungsi navigasi Next
    function nextArtikel5Slide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlidePosition();
            updateNavButtons();
            updateDotsActiveState();
        }
    }

    // Fungsi navigasi Previous
    function prevArtikel5Slide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
            updateNavButtons();
            updateDotsActiveState();
        }
    }

    // Fungsi navigasi Langsung ke Slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlidePosition();
        updateNavButtons();
        updateDotsActiveState();
    }

    // --- Event Listeners ---
    document.addEventListener('DOMContentLoaded', () => {
        // Tambahkan event listener untuk tombol panah
        if (prevBtn) {
            prevBtn.addEventListener('click', prevArtikel5Slide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextArtikel5Slide);
        }

        // Panggil render awal slider
        renderArtikel5Slider();
    });

    // Panggil renderArtikel5Slider setiap kali ukuran jendela berubah
    window.addEventListener('resize', () => {
        clearTimeout(window.artikel5ResizeTimer);
        window.artikel5ResizeTimer = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 767;
            if (newIsMobile !== isMobile) { // Hanya render ulang jika mode tampilan berubah
                renderArtikel5Slider();
            } else { // Jika hanya ukuran berubah tapi mode sama, hanya update posisi
                updateSlidePosition();
            }
            updateNavButtons();
            updateDotsActiveState();
        }, 250); // Delay 250ms
    });

    // --- Touch Support ---
    let startX = 0;
    let endX = 0;

    // Gunakan event delegation atau pastikan elemen target spesifik
    document.querySelector('.section-artikel5').addEventListener('touchstart', (e) => {
        if (e.target.closest('.artikel5-slider')) { // Hanya tangani jika sentuhan di dalam slider
            startX = e.touches[0].clientX;
        }
    }, { passive: true });

    document.querySelector('.section-artikel5').addEventListener('touchend', (e) => {
        if (e.target.closest('.artikel5-slider')) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }
    });

    function handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = startX - endX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                nextArtikel5Slide();
            } else {
                prevArtikel5Slide();
            }
        }
    }

})(); // Tutup IIFE





// artikel sembilan.js
(function() {
    const artikelData = [
        { // Artikel 1 (akan tampil di halaman 1)
            pageTitle: "Faedah Dari Imam Ibnul Qayyim",
            img: "Gambar/Ilmu.png", // Ganti dengan path gambar Anda
            author: "Muhammad Abduh Tuasikal, MSc",
            date: "October 30, 2024",
            comments: "1",
            views: "5,220",
            title: "Dampak Mengutamakan Dunia: Kehidupan Fana vs Keabadian Akhirat",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum veniam eos possimus culpa, harum ullam autem obcaecati? Officiis illum ducimus enim velit saepe recusandae perferendis ut doloremque aliquid non modi repellat ratione ab laborum quam, cupiditate perspiciatis veniam autem aliquam dicta! Sunt voluptatum nisi at, obcaecati cumque impedit labore natus?",
            readmoreLink: "#artikel9-dampak-dunia"
        },
        { // Artikel 2 (akan tampil di halaman 1, di bawah artikel 1)
            pageTitle: "Faedah Dari Imam Ibnul Qayyim",
            img: "Gambar/Cukur.png", // Ganti dengan path gambar Anda
            author: "Muhammad Abduh Tuasikal, MSc",
            date: "November 6, 2024",
            comments: "0",
            views: "4,633",
            title: "Tiga Syarat Meraih Surga: Cinta, Khawatir, dan Amal",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum veniam eos possimus culpa, harum ullam autem obcaecati? Officiis illum ducimus enim velit saepe recusandae perferendis ut doloremque aliquid non modi repellat ratione ab laborum quam, cupiditate perspiciatis veniam autem aliquam dicta!",
            readmoreLink: "#artikel9-tiga-syarat-surga"
        },
        { // Artikel 3 (akan tampil di halaman 2)
            pageTitle: "Faedah Dari Imam Ibnul Qayyim",
            img: "Gambar/Masjid.png", // Contoh gambar lain
            author: "Penulis A",
            date: "November 10, 2024",
            comments: "5",
            views: "7,000",
            title: "Hikmah Dibalik Ujian: Sabar dan Tawakal dalam Kehidupan Muslim",
            description: "Ujian adalah bagian tak terpisahkan dari kehidupan, pahami hikmah di baliknya dengan sabar dan tawakal kepada Allah SWT.",
            readmoreLink: "#artikel9-ujian-hidup-1"
        },
        { // Artikel 4 (akan tampil di halaman 2, di bawah artikel 3)
            pageTitle: "Faedah Dari Imam Ibnul Qayyim",
            img: "https://via.placeholder.com/800x450/FFC107/FFFFFF?text=Artikel+Selanjutnya+2", // Contoh gambar lain
            author: "Penulis B",
            date: "November 15, 2024",
            comments: "2",
            views: "3,500",
            title: "Pentingnya Menjaga Lisan: Dampak Baik dan Buruknya",
            description: "Lisan adalah pedang bermata dua. Artikel ini membahas mengapa menjaga lisan sangat penting dalam Islam.",
            readmoreLink: "#artikel9-menjaga-lisan-2"
        },
        { // Artikel 5 (akan tampil di halaman 3)
            pageTitle: "Faedah Dari Imam Ibnul Qayyim",
            img: "https://via.placeholder.com/800x450/9C27B0/FFFFFF?text=Artikel+Selanjutnya+3",
            author: "Penulis C",
            date: "November 20, 2024",
            comments: "8",
            views: "9,200",
            title: "Kisah Inspiratif Para Sahabat Nabi dalam Berdakwah",
            description: "Pelajari kisah-kisah luar biasa dari para sahabat Nabi dalam menyebarkan agama Islam di berbagai penjuru dunia.",
            readmoreLink: "#artikel9-kisah-sahabat-3"
        }
        // Tambahkan artikel lain jika Anda memiliki lebih banyak konten
    ];

    // currentArticleIndex akan menjadi indeks artikel PERTAMA dari pasangan yang ditampilkan
    let currentArticleIndex = 0;

    // Dapatkan referensi elemen DOM
    const articleContainer = document.querySelector('.artikel9-article-container');
    const pageTitleElement = document.querySelector('.artikel9-page-title');
    const prevBtn = document.querySelector('.artikel9-pagination-btn.prev-article');
    const nextBtn = document.querySelector('.artikel9-pagination-btn.next-article');

    function createArtikelHtml(article) {
        return `
            <div class="artikel9-item">
                <div class="artikel9-image-wrapper">
                    <img src="${article.img}" alt="${article.title}">
                    <div class="artikel9-overlay-content">
                        <div class="artikel9-meta-overlay">
                            <span class="artikel9-meta-item"><i class="fas fa-user-circle"></i> ${article.author}</span>
                            <span class="artikel9-meta-item"><i class="far fa-clock"></i> ${article.date}</span>
                            <span class="artikel9-meta-item"><i class="far fa-comment"></i> ${article.comments}</span>
                            <span class="artikel9-meta-item"><i class="fas fa-fire"></i> ${article.views}</span>
                        </div>
                        <h3 class="artikel9-title">${article.title}</h3>
                    </div>
                </div>
                <p class="artikel9-description">${article.description}</p>
                <a href="${article.readmoreLink}" class="artikel9-readmore-btn">Baca Selengkapnya »</a>
            </div>
        `;
    }

    // Fungsi untuk merender SATU ATAU DUA artikel
    function renderArticles(startIndex) {
        if (startIndex < 0) startIndex = 0; // Pastikan tidak negatif
        
        // Halaman ini akan menampilkan artikel di startIndex dan startIndex + 1
        const article1 = artikelData[startIndex];
        const article2 = artikelData[startIndex + 1]; // Mungkin undefined

        // Kosongkan container
        articleContainer.innerHTML = '';

        // Update judul utama halaman (jika ada)
        if (pageTitleElement && article1 && article1.pageTitle) {
            pageTitleElement.textContent = article1.pageTitle;
        }

        // Render artikel pertama
        if (article1) {
            articleContainer.innerHTML += createArtikelHtml(article1);
        }

        // Render artikel kedua (jika ada dan ada cukup data)
        if (article2) {
            articleContainer.innerHTML += createArtikelHtml(article2);
        }
        
        currentArticleIndex = startIndex; // Perbarui indeks artikel awal yang sedang ditampilkan
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        // nextBtn akan disabled jika artikel terakhir yang ditampilkan adalah artikelData.length - 1 atau artikelData.length - 2 (jika hanya ada 1 artikel tersisa di akhir)
        // prevBtn akan disabled jika kita menampilkan artikel pertama (indeks 0)
        prevBtn.disabled = currentArticleIndex === 0;
        nextBtn.disabled = currentArticleIndex >= artikelData.length - 2; // Jika hanya 1 artikel tersisa, next sudah disabled
    }

    function nextArticleSet() {
        // Lompat 2 artikel sekaligus
        if (currentArticleIndex < artikelData.length - 2) { // Pastikan ada setidaknya 2 artikel lagi
            renderArticles(currentArticleIndex + 2);
        } else if (currentArticleIndex < artikelData.length -1) { // Jika hanya ada 1 artikel tersisa
             renderArticles(currentArticleIndex + 1);
        }
    }

    function prevArticleSet() {
        // Mundur 2 artikel sekaligus
        if (currentArticleIndex > 0) {
            renderArticles(currentArticleIndex - 2 < 0 ? 0 : currentArticleIndex - 2); // Pastikan tidak mundur ke indeks negatif
        }
    }

    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        if (prevBtn && nextBtn && articleContainer && pageTitleElement) {
            prevBtn.addEventListener('click', prevArticleSet);
            nextBtn.addEventListener('click', nextArticleSet);

            // Render artikel pertama dan kedua saat DOMContentLoaded
            renderArticles(0);
        } else {
            console.warn("Elemen untuk Artikel 9 tidak ditemukan. Pastikan HTML sudah benar.");
        }
    });

})();

// Sticky Ad Script
document.addEventListener('DOMContentLoaded', function() {
    const stickyAdContainer = document.getElementById('stickyAdContainer'); // The parent div with flex:1
    const stickyAd = document.getElementById('stickyAd'); // The actual content to make sticky
    const bulughulSection = document.getElementById('section-bulughul');
    const artikel9Section = document.getElementById('section-artikel9'); // Section 9 is the stop point
    
    // Get the mobile ad section to control its visibility
    const mobileAdSection = document.querySelector('.mobile-ad-section');

    if (!stickyAdContainer || !stickyAd || !bulughulSection || !artikel9Section || !mobileAdSection) {
        console.warn("One or more elements for sticky ad functionality are missing. Check IDs and classes.");
        return;
    }

    let adContainerInitialTop = 0; // Initial top position of the stickyAdContainer (relative to document)
    let adHeight = 0;
    let stopOffset = 0; // Scroll position where the ad should stop being fixed
    const navbarHeight = 100; // Approximate height of your fixed navbar and header images (adjust if your navbar is taller/shorter)

    function calculateAdPositions() {
        // Check screen width for responsiveness
        const isDesktop = window.innerWidth > 1024;

        if (!isDesktop) {
            // Hide desktop ad, show mobile ad
            stickyAdContainer.style.display = 'none';
            mobileAdSection.style.display = 'block';
            stickyAd.classList.remove('sticky-ad', 'bottom-ad'); // Remove sticky classes
            stickyAd.classList.add('static-ad'); // Ensure it's static
            stickyAd.style.top = ''; // Clear inline styles
            stickyAd.style.left = '';
            stickyAd.style.bottom = '';
            stickyAdContainer.style.height = ''; // Clear container height
            return;
        } else {
            // Show desktop ad, hide mobile ad
            stickyAdContainer.style.display = 'block';
            mobileAdSection.style.display = 'none';
        }

        // Only calculate for desktop
        // Get the initial top position of the ad *container* relative to the document
        // This is where the ad *starts* its sticky journey (when its top aligns with navbarHeight)
        adContainerInitialTop = stickyAdContainer.offsetTop; 
        
        // Get the height of the sticky ad content
        adHeight = stickyAd.offsetHeight;

        // Calculate the stop point:
        // The ad should stop when its bottom aligns with the bottom of artikel9Section
        // `artikel9Section.offsetTop + artikel9Section.offsetHeight` gives the absolute bottom of artikel9Section
        // We subtract `adHeight` because we want the *top* of the ad to reach a certain scroll point
        // and `- navbarHeight` because the ad's top is `navbarHeight` when fixed.
        stopOffset = artikel9Section.offsetTop + artikel9Section.offsetHeight - adHeight - navbarHeight;

        // Ensure the stickyAdContainer takes up its space in the layout to prevent content jump
        // This is crucial: the container should always be the height of the ad content
        // This allows the ad to transition to position: absolute without shrinking the right column.
        stickyAdContainer.style.height = `${adHeight}px`;
    }

    function handleStickyAd() {
        // Recalculate positions on every scroll for accuracy (though debounced resize helps too)
        calculateAdPositions(); 

        const isDesktop = window.innerWidth > 1024;

        if (!isDesktop) {
            return; // Exit if not desktop, calculations and display already handled by calculateAdPositions
        }

        const scrollPosition = window.scrollY; // Current scroll position from the top of the document

        // Condition 1: Ad has not reached the sticky start point
        // If the current scroll position + fixed top offset (navbarHeight) is less than the ad's initial top
        if (scrollPosition + navbarHeight < adContainerInitialTop) {
            stickyAd.classList.remove('sticky-ad', 'bottom-ad');
            stickyAd.classList.add('static-ad'); // Ensure it's in its normal flow
            stickyAd.style.top = ''; // Clear inline styles
            stickyAd.style.left = '';
            stickyAd.style.bottom = '';
        } 
        // Condition 2: Ad is in sticky state (between start and stop points)
        // If the current scroll position + fixed top offset (navbarHeight) is less than the stopOffset
        else if (scrollPosition + navbarHeight < stopOffset) {
            stickyAd.classList.add('sticky-ad');
            stickyAd.classList.remove('static-ad', 'bottom-ad');
            stickyAd.style.top = `${navbarHeight}px`; // Stick to this height from the viewport top
            // Set 'left' explicitly based on its container's current position to keep it aligned in its column
            stickyAd.style.left = `${stickyAdContainer.getBoundingClientRect().left}px`;
            stickyAd.style.bottom = ''; // Ensure bottom is not set
        } 
        // Condition 3: Ad has reached or passed the stop point
        else {
            stickyAd.classList.remove('sticky-ad');
            stickyAd.classList.add('bottom-ad'); // Apply absolute positioning at bottom of parent
            stickyAd.classList.remove('static-ad'); // Ensure static is removed
            stickyAd.style.top = 'auto'; // Reset top from fixed
            stickyAd.style.left = '0'; // Align with parent's left (relative to stickyAdContainer)
            stickyAd.style.bottom = '0'; // Stick to the bottom of its parent (stickyAdContainer)
        }
    }

    // Initial calculation and event listeners
    calculateAdPositions();
    window.addEventListener('scroll', handleStickyAd);
    window.addEventListener('resize', () => {
        clearTimeout(window.stickyAdResizeTimer); // Debounce resize
        window.stickyAdResizeTimer = setTimeout(() => {
            calculateAdPositions(); // Recalculate on resize
            handleStickyAd();       // Re-apply sticky state
        }, 100); // Debounce for 100ms
    });

    // Run once on load to set initial state correctly
    handleStickyAd();
});


    // Punya bulugul 
    