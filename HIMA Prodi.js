document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Ikon Lucide
    lucide.createIcons();

    // 2. Efek Scroll Navbar
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Kontrol Video
    const video = document.getElementById('hima-video');
    const videoUI = document.getElementById('video-ui');
    const videoWrapper = document.getElementById('video-wrapper');

    if (videoWrapper && video) {
        videoWrapper.addEventListener('click', () => {
            if (video.paused) {
                video.play().then(() => {
                    video.muted = false;
                    videoUI.classList.add('hidden');
                }).catch(err => console.log("Gagal memutar:", err));
            } else {
                video.pause();
                videoUI.classList.remove('hidden');
            }
        });
    }

    // 4. Animasi Reveal (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Beri delay staggered untuk kartu proker atau pengurus
                if (entry.target.classList.contains('reveal-stagger')) {
                    const cards = Array.from(document.querySelectorAll('.reveal-stagger'));
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${(index % 3) * 0.15}s`;
                }
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Daftarkan semua elemen animasi
    const revealItems = document.querySelectorAll('.reveal, .reveal-3d, .reveal-scale, .reveal-stagger');
    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // 5. Parallax Halus di Hero
    window.addEventListener('mousemove', (e) => {
        const collage = document.querySelector('.hero-collage');
        if (collage) {
            const moveX = (e.clientX - window.innerWidth / 2) / 60;
            const moveY = (e.clientY - window.innerHeight / 2) / 60;
            collage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});