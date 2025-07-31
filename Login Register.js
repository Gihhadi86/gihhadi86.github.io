// Global variable to track login status (simulasi)
let isLoggedIn = false;
let loggedInUsername = ''; // Akan diisi jika login berhasil

document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen Modal Autentikasi ---
    const authModalOverlay = document.getElementById('authModalOverlay');
    const authModal = document.getElementById('authModal');
    const authModalCloseBtn = document.getElementById('authModalCloseBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    // Tombol demo untuk membuka modal (hanya di file ini)
    const openLoginModalBtn = document.getElementById('openLoginModalBtn');
    if (openLoginModalBtn) {
        openLoginModalBtn.addEventListener('click', () => openAuthModal(false));
    }

    // Fungsi untuk membuka modal autentikasi
    const openAuthModal = (showRegister = false) => {
        authModalOverlay.classList.add('active'); // Aktifkan overlay (mengaktifkan transisi CSS)
        // Tampilkan form yang sesuai
        if (showRegister) {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        } else {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
        // Bersihkan pesan dan error sebelumnya
        document.querySelectorAll('.auth-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        // Reset form
        loginForm.reset();
        registerForm.reset();
    };

    // Fungsi untuk menutup modal autentikasi
    const closeAuthModal = () => {
        authModalOverlay.classList.remove('active'); // Nonaktifkan overlay (mengaktifkan transisi CSS)
    };

    // Event listener untuk tombol tutup modal
    if (authModalCloseBtn) {
        authModalCloseBtn.addEventListener('click', closeAuthModal);
    }

    // Event listener untuk menutup modal jika klik di luar modal (pada overlay)
    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', (event) => {
            if (event.target === authModalOverlay) {
                closeAuthModal();
            }
        });
    }

    // Beralih antara form login dan register
    if (showRegisterFormLink) {
        showRegisterFormLink.addEventListener('click', () => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            document.getElementById('loginMessage').textContent = ''; // Bersihkan pesan login
        });
    }
    if (showLoginFormLink) {
        showLoginFormLink.addEventListener('click', () => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            document.getElementById('registerMessage').textContent = ''; // Bersihkan pesan register
        });
    }

    // --- Fungsionalitas Form (Simulasi Backend) ---

    // Helper untuk menampilkan/menyembunyikan spinner loading
    const toggleLoading = (buttonId, show) => {
        const button = document.getElementById(buttonId);
        const spinner = button ? button.querySelector('.loading-spinner') : null;
        if (spinner) {
            spinner.style.display = show ? 'inline-block' : 'none';
            button.disabled = show; // Nonaktifkan tombol saat loading
        }
    };

    // Helper untuk menampilkan pesan (sukses/error)
    const displayMessage = (elementId, message, isError = false) => {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.color = isError ? 'red' : 'green';
            // Set background color for messages
            el.style.backgroundColor = isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 128, 0, 0.1)';
        }
    };

    // --- Submit Form Login (Simulasi) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Mencegah refresh halaman
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const emailError = document.getElementById('loginEmailError');
            const passwordError = document.getElementById('loginPasswordError');
            const loginMessage = document.getElementById('loginMessage');

            // Bersihkan pesan error/sukses sebelumnya
            emailError.textContent = '';
            passwordError.textContent = '';
            loginMessage.textContent = '';

            let isValid = true;
            if (!email) {
                emailError.textContent = 'Email atau username tidak boleh kosong.';
                isValid = false;
            }
            if (!password) {
                passwordError.textContent = 'Password tidak boleh kosong.';
                isValid = false;
            }

            if (!isValid) return; // Hentikan jika validasi klien gagal

            toggleLoading('loginSubmitBtn', true); // Tampilkan loading
            displayMessage('loginMessage', 'Memproses login...', false);

            // --- SIMULASI PANGGILAN API BACKEND ---
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi penundaan jaringan

            // Logika simulasi:
            if (email === 'user@example.com' && password === 'password123') {
                isLoggedIn = true;
                loggedInUsername = 'user@example.com';
                displayMessage('loginMessage', 'Login berhasil!', false);
                // Di aplikasi nyata, Anda akan menyimpan token JWT di localStorage/sessionStorage di sini

                // Tutup modal setelah penundaan singkat
                setTimeout(closeAuthModal, 1000);
                console.log('Simulasi Login Berhasil!');
            } else {
                displayMessage('loginMessage', 'Email/username atau password salah.', true);
                console.log('Simulasi Login Gagal: Kredensial tidak valid.');
            }
            // --- AKHIR SIMULASI BACKEND ---

            toggleLoading('loginSubmitBtn', false); // Sembunyikan loading
        });
    }

    // --- Submit Form Pendaftaran (Simulasi) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Mencegah refresh halaman
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value.trim();
            const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();

            const nameError = document.getElementById('registerNameError');
            const emailError = document.getElementById('registerEmailError');
            const passwordError = document.getElementById('registerPasswordError');
            const confirmPasswordError = document.getElementById('registerConfirmPasswordError');
            const registerMessage = document.getElementById('registerMessage');

            // Bersihkan pesan error/sukses sebelumnya
            nameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';
            registerMessage.textContent = '';

            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name) {
                nameError.textContent = 'Nama tidak boleh kosong.';
                isValid = false;
            }
            if (!email || !emailRegex.test(email)) {
                emailError.textContent = 'Email tidak valid.';
                isValid = false;
            }
            if (password.length < 6) {
                passwordError.textContent = 'Password minimal 6 karakter.';
                isValid = false;
            }
            if (password !== confirmPassword) {
                confirmPasswordError.textContent = 'Konfirmasi password tidak cocok.';
                isValid = false;
            }

            if (!isValid) return; // Hentikan jika validasi klien gagal

            toggleLoading('registerSubmitBtn', true); // Tampilkan loading
            displayMessage('registerMessage', 'Memproses pendaftaran...', false);

            // --- SIMULASI PANGGILAN API BACKEND ---
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulasi penundaan jaringan

            // Logika simulasi:
            const isEmailTaken = (email === 'user@example.com'); // Simulasi email sudah terdaftar
            if (isEmailTaken) {
                displayMessage('registerMessage', 'Email ini sudah terdaftar. Silakan gunakan email lain.', true);
                console.log('Simulasi Pendaftaran Gagal: Email sudah terdaftar.');
            } else {
                displayMessage('registerMessage', 'Pendaftaran berhasil! Silakan masuk.', false);
                console.log('Simulasi Pendaftaran Berhasil!');
                // Secara otomatis beralih ke form login setelah pendaftaran berhasil
                setTimeout(() => {
                    registerForm.style.display = 'none';
                    loginForm.style.display = 'block';
                    document.getElementById('loginEmail').value = email; // Isi otomatis email
                    document.getElementById('loginPassword').value = ''; // Kosongkan password
                    document.getElementById('loginMessage').textContent = 'Pendaftaran berhasil! Silakan masuk.';
                }, 1500);
            }
            // --- AKHIR SIMULASI BACKEND ---

            toggleLoading('registerSubmitBtn', false); // Sembunyikan loading
        });
    }

    // --- Mode Toggle Logic ---
    const modeToggle = document.getElementById('modeToggle');
    const modeLabel = document.getElementById('modeLabel');
    const blueCrystalLight = document.getElementById('blueCrystalLight');

    if (modeToggle && modeLabel && blueCrystalLight) {
        modeToggle.addEventListener('change', () => {
            if (modeToggle.checked) {
                // Mode ON
                document.body.classList.add('light-mode');
                modeLabel.textContent = 'ON';
            } else {
                // Mode OFF
                document.body.classList.remove('light-mode');
                modeLabel.textContent = 'OFF';
            }
        });
    }
});
