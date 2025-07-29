// Mendapatkan elemen loading screen dan semua layar
const loadingScreen = document.getElementById('loading-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const homeScreen = document.getElementById('home-screen');
const body = document.body;

// Mendapatkan elemen judul dari Welcome Screen
const welcomeTitle = document.querySelector('#welcome-screen .welcome-title');

// Mendapatkan elemen teks yang akan dianimasikan di Home Screen
const roleTitle = document.querySelector('#home-screen .role-title');
const descriptionText = document.querySelector('#home-screen .description');
const taglineText = document.querySelector('#home-screen .tagline');
const companyInfoText = document.querySelector('#home-screen .company-info');
const techItems = document.querySelectorAll('#home-screen .tech-item');
const actionButtons = document.querySelectorAll('#home-screen .action-buttons .btn');
const socialLinks = document.querySelectorAll('#home-screen .social-icons .social-link');
const heroIllustration = document.querySelector('#home-screen .hero-illustration');
const navbar = document.querySelector('.navbar');


// Durasi loading screen dalam milidetik (misalnya 3 detik)
const loadingDuration = 3000;
// Durasi animasi keluar layar (harus sesuai dengan transisi CSS .screen.fade-out-up)
const screenOutroDuration = 800; // 0.8s

// Fungsi untuk memecah teks menjadi karakter-karakter dan membungkusnya dalam span
// Fungsi ini sekarang lebih generik dan bisa digunakan untuk berbagai elemen teks
function animateTextCharacters(element, delayOffset = 0, charDelay = 0.04) {
    if (!element) return; // Pastikan elemen ada

    const originalContentNodes = Array.from(element.childNodes);
    element.innerHTML = ''; // Kosongkan elemen

    let currentDelay = delayOffset; // Delay awal untuk elemen ini

    originalContentNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent.split('').forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('char');
                if (char === ' ') {
                    span.classList.add('space');
                }
                span.style.animationDelay = `${currentDelay}s`;
                element.appendChild(span);
                currentDelay += charDelay;
            });
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
            const wrapperSpan = document.createElement('span');
            Array.from(node.classList).forEach(cls => wrapperSpan.classList.add(cls));

            node.textContent.split('').forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.classList.add('char');
                if (char === ' ') {
                    charSpan.classList.add('space');
                }
                charSpan.style.animationDelay = `${currentDelay}s`;
                wrapperSpan.appendChild(charSpan);
                currentDelay += charDelay;
            });
            element.appendChild(wrapperSpan);
        }
    });
}

// Fungsi untuk transisi dari loading screen ke welcome screen
function transitionToWelcomeScreen() {
    loadingScreen.classList.add('hidden'); // Memulai fade-out loading screen

    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Sembunyikan loading screen sepenuhnya
        welcomeScreen.classList.remove('hidden'); // Tampilkan welcome screen
        welcomeScreen.classList.add('active'); // Aktifkan welcome screen
        body.classList.add('content-active'); // Memicu parallax latar belakang

        // Panggil animasi teks untuk Welcome Title
        animateTextCharacters(welcomeTitle, 0.5); // Delay awal 0.5s untuk judul
    }, 1500); // Sesuai dengan transisi opacity loading-screen
}

// Fungsi untuk transisi dari welcome screen ke home screen
function transitionToHomeScreen() {
    welcomeScreen.classList.add('fade-out-up'); // Memicu animasi keluar "Fade Out Up"

    setTimeout(() => {
        welcomeScreen.classList.remove('active', 'fade-out-up');
        welcomeScreen.classList.add('hidden'); // Sembunyikan welcome screen sepenuhnya

        homeScreen.classList.remove('hidden'); // Tampilkan home screen
        homeScreen.classList.add('active'); // Aktifkan home screen

        // Memicu animasi masuk untuk elemen-elemen Home Screen
        // Animasi huruf demi huruf untuk Role Title
        // Delay 4.0s di CSS untuk role-title, jadi panggil animateTextCharacters dengan offset yang sesuai
        animateTextCharacters(roleTitle, 4.0);
        // Tidak perlu memanggil animateTextCharacters untuk descriptionText, taglineText, companyInfoText
        // karena animasinya sudah diatur di CSS dengan fade-in-up-new
        // Begitu juga untuk techItems, actionButtons, socialLinks, heroIllustration, dan navbar
        // karena animasinya sudah diatur di CSS dengan delay masing-masing.

    }, screenOutroDuration); // Sesuai dengan durasi animasi keluar layar
}


// Panggil fungsi transitionToWelcomeScreen setelah durasi loading yang ditentukan
window.addEventListener('load', () => {
    setTimeout(transitionToWelcomeScreen, loadingDuration);
});

// Tambahkan event listener untuk memicu transisi ke Home Screen
// Misalnya, setelah animasi welcome screen selesai, atau setelah beberapa detik
// Kita bisa menggunakan setTimeout lagi setelah animasi welcome screen selesai
welcomeTitle.addEventListener('animationend', (event) => {
    // Pastikan ini adalah animasi terakhir dari welcomeTitle (karakter terakhir)
    if (event.animationName === 'char-fade-in-up-scale' && event.target.classList.contains('char') &&
        Array.from(welcomeTitle.querySelectorAll('.char')).indexOf(event.target) === welcomeTitle.querySelectorAll('.char').length - 1) {
        
        // Beri sedikit jeda sebelum transisi ke home screen
        setTimeout(transitionToHomeScreen, 1000); // Jeda 1 detik setelah welcome title selesai animasi
    }
});
