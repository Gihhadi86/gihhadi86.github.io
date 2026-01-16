// Mendapatkan elemen loading screen dan semua layar
const loadingScreen = document.getElementById('loading-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const homeScreen = document.getElementById('home-screen');
const aboutScreen = document.getElementById('about-screen');
const portfolioScreen = document.getElementById('portfolio-screen');
const contactScreen = document.getElementById('contact-screen');
const body = document.body;

// Mendapatkan elemen judul dari Welcome Screen
const welcomeTitle = document.querySelector('#welcome-screen .welcome-title');

const roleTitle = document.querySelector('#home-screen .role-title');
const homeTagline = document.querySelector('#home-screen .tagline');
const homeCompanyInfo = document.querySelector('#home-screen .company-info');
const homeDescription = document.querySelector('#home-screen .description');
const homeTechItems = document.querySelectorAll('#home-screen .tech-item');
const homeActionButtons = document.querySelectorAll('#home-screen .action-buttons .btn');
const homeSocialLinks = document.querySelectorAll('#home-screen .social-icons .social-link');
const homeHeroCanvas = document.getElementById('hero-canvas');
const navbar = document.querySelector('.navbar');

// Elemen-elemen About Screen untuk animasi
const aboutHeader = document.querySelector('#about-screen .about-header');
const aboutLeftH3 = document.querySelector('#about-screen .about-left h3');
const aboutLeftP = document.querySelector('#about-screen .about-left p');
const aboutButtons = document.querySelector('#about-screen .about-buttons');
const profilePicContainer = document.querySelector('#about-screen .profile-pic-container');
const statItems = document.querySelectorAll('#about-screen .stat-item');


// Durasi loading screen dalam milidetik (misalnya 3 detik)
const loadingDuration = 3000;
// Durasi animasi keluar layar (harus sesuai dengan transisi CSS .screen.fade-out-up)
const screenTransitionDuration = 800; // 0.8s, for slide transitions

// --- Three.js for 3D Scene ---
let scene, camera, renderer, objects = [];
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let windowHalfX = window.innerWidth / 2; // Make these dynamic
let windowHalfY = window.innerHeight / 2; // Make these dynamic
let animationFrameId; // To store the requestAnimationFrame ID

const materialSettings = {
    color: 0x8a2be2, // Ungu
    emissive: 0x4b0082, // Emissive ungu gelap untuk glow
    specular: 0xffffff,
    shininess: 100,
    flatShading: false,
    transparent: true,
    opacity: 0.9 // Sedikit transparan
};

function init3DScene() {
    // Only initialize if not already initialized
    if (scene && camera && renderer) {
        // If scene exists, just ensure it's rendering
        if (!animationFrameId) {
            animate();
        }
        return;
    }

    // Scene
    scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera
    // Use clientWidth/clientHeight of the canvas for aspect ratio
    camera = new THREE.PerspectiveCamera(75, homeHeroCanvas.clientWidth / homeHeroCanvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: homeHeroCanvas, alpha: true, antialias: true });
    renderer.setSize(homeHeroCanvas.clientWidth, homeHeroCanvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x8a2be2, 1.5, 100); // Ungu terang
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6a0dad, 1.2, 100); // Ungu gelap
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    const spotLight = new THREE.SpotLight(0x00ffff, 0.7, 50, Math.PI / 4, 0.5, 2); // Cyan spotlight
    spotLight.position.set(0, 10, 0);
    scene.add(spotLight);

    // Create Abstract IT-like Objects
    const baseMaterial = new THREE.MeshPhongMaterial(materialSettings);

    // Large central object (e.g., complex torus knot)
    const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16), baseMaterial);
    torusKnot.position.set(0, 0, 0);
    objects.push({ mesh: torusKnot, rotationSpeed: { x: 0.005, y: 0.008, z: 0.003 } });
    scene.add(torusKnot);

    // Smaller orbiting cubes/octahedrons
    const cube1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), baseMaterial);
    cube1.position.set(2.5, 1.0, -1.0);
    objects.push({ mesh: cube1, rotationSpeed: { x: 0.01, y: 0.01, z: 0.01 }, orbitSpeed: 0.015, orbitRadius: 3 });
    scene.add(cube1);

    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(0.7), baseMaterial);
    octahedron.position.set(-2.0, -1.5, 1.0);
    objects.push({ mesh: octahedron, rotationSpeed: { x: 0.008, y: 0.005, z: 0.01 }, orbitSpeed: 0.01, orbitRadius: 2.5 });
    scene.add(octahedron);

    // Add a "grid" of small spheres or dots to represent data flow/network
    const dotGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.7 });
    for (let i = 0; i < 50; i++) {
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        objects.push({ mesh: dot, pulseSpeed: Math.random() * 0.05 + 0.01 }); // For pulsating effect
        scene.add(dot);
    }

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    // Mouse interaction for camera
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Camera subtle movement based on mouse
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    objects.forEach(obj => {
        // Rotate objects
        if (obj.rotationSpeed) {
            obj.mesh.rotation.x += obj.rotationSpeed.x;
            obj.mesh.rotation.y += obj.rotationSpeed.y;
            obj.mesh.rotation.z += obj.rotationSpeed.z;
        }

        // Orbiting objects
        if (obj.orbitSpeed && obj.orbitRadius) {
            const time = Date.now() * 0.001;
            obj.mesh.position.x = Math.cos(time * obj.orbitSpeed) * obj.orbitRadius;
            obj.mesh.position.y = Math.sin(time * obj.orbitSpeed) * obj.orbitRadius * 0.5; // Elliptical orbit
            obj.mesh.position.z = Math.sin(time * obj.orbitSpeed) * obj.orbitRadius;
        }

        // Pulsating dots
        if (obj.pulseSpeed) {
            obj.mesh.scale.setScalar(1 + Math.sin(Date.now() * 0.001 * obj.pulseSpeed) * 0.5);
        }
    });

    renderer.render(scene, camera);
}

function stop3DAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
    }
}

function onWindowResize() {
    // Update windowHalfX and windowHalfY on resize
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    // Ensure canvas dimensions are not zero before updating camera aspect and renderer size
    if (homeHeroCanvas && homeHeroCanvas.clientWidth > 0 && homeHeroCanvas.clientHeight > 0) {
        camera.aspect = homeHeroCanvas.clientWidth / homeHeroCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(homeHeroCanvas.clientWidth, homeHeroCanvas.clientHeight);
    }
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100; // Adjust sensitivity
    mouseY = (event.clientY - windowHalfY) / 100; // Adjust sensitivity
    targetX = mouseX;
    targetY = -mouseY; // Invert Y for more natural feel
}
// --- End Three.js ---

// Fungsi untuk memecah teks menjadi karakter-karakter dan membungkusnya dalam span
function animateTextCharacters(element, delayOffset = 0, charDelay = 0.04) {
    if (!element) return;

    const originalContentNodes = Array.from(element.childNodes);
    element.innerHTML = '';

    let currentDelay = delayOffset;

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

            // Check if the span contains only text or further nested elements
            if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
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
            } else {
                // If it contains other elements, clone and process them
                wrapperSpan.innerHTML = node.innerHTML;
                Array.from(wrapperSpan.querySelectorAll('.char')).forEach(charSpan => {
                    charSpan.style.animationDelay = `${currentDelay}s`;
                    currentDelay += charDelay;
                });
            }
            element.appendChild(wrapperSpan);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
            element.appendChild(document.createElement('br'));
        }
    });
}

// Fungsi untuk transisi dari loading screen ke welcome screen
function transitionToWelcomeScreen() {
    loadingScreen.classList.add('hidden');

    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Completely remove from flow
        welcomeScreen.classList.remove('hidden');
        welcomeScreen.classList.add('active');
        body.classList.add('content-active'); // For star parallax effect

        animateTextCharacters(welcomeTitle, 0.5);
    }, 1500); // Allow some time for opacity transition before display: none
}

// Fungsi untuk transisi dari welcome screen ke home screen
function transitionToHomeScreen() {
    welcomeScreen.classList.add('slide-out-up'); // Welcome screen slides out up

    setTimeout(() => {
        welcomeScreen.classList.remove('active', 'slide-out-up');
        welcomeScreen.classList.add('hidden');

        homeScreen.classList.remove('hidden');
        homeScreen.classList.add('active');

        // Prepare home screen for slide-in from bottom
        homeScreen.style.transform = 'translateY(100vh)'; // Start off-screen below
        homeScreen.style.opacity = '0';
        void homeScreen.offsetWidth; // Force reflow

        homeScreen.style.transition = `transform ${screenTransitionDuration / 1000}s ease-in-out, opacity ${screenTransitionDuration / 1000}s ease-in-out`;
        homeScreen.style.transform = 'translateY(0)'; // Slide to on-screen
        homeScreen.style.opacity = '1';

        // Inisialisasi dan mulai animasi 3D scene
        init3DScene();

        // Memicu animasi masuk untuk elemen-elemen Home Screen
        triggerScreenContentAnimations('home-screen');

        // Update current screen index
        currentScreenIndex = screenOrder.indexOf('home-screen');

    }, screenTransitionDuration);
}

// Global array to manage screen order for "Next" button and navigation
const screenOrder = ['home-screen', 'about-screen', 'portfolio-screen', 'contact-screen'];
let currentScreenIndex = -1; // -1 initially, will be 0 after home screen loads

function showScreen(targetScreenId) {
    const currentActiveScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(targetScreenId);

    if (!targetScreen || targetScreen === currentActiveScreen) {
        return; // Do nothing if target is invalid or already active
    }

    const currentIndex = screenOrder.indexOf(currentActiveScreen ? currentActiveScreen.id : '');
    const targetIndex = screenOrder.indexOf(targetScreenId);
    const isForward = targetIndex > currentIndex;

    // Apply slide-out animation to the current active screen
    if (currentActiveScreen) {
        currentActiveScreen.classList.add(isForward ? 'slide-out-up' : 'slide-out-down');
        currentActiveScreen.classList.remove('active');
        currentActiveScreen.style.pointerEvents = 'none';
        currentActiveScreen.style.transition = `transform ${screenTransitionDuration / 1000}s ease-in-out, opacity ${screenTransitionDuration / 1000}s ease-in-out`;
    }

    // Prepare the target screen for slide-in
    targetScreen.classList.remove('hidden', 'slide-out-up', 'slide-out-down'); // Clean up any previous states
    targetScreen.classList.add('active');
    targetScreen.style.pointerEvents = 'auto';

    // Set initial position for the target screen to come from below (or above if backward)
    targetScreen.style.transform = isForward ? 'translateY(100vh)' : 'translateY(-100vh)';
    targetScreen.style.opacity = '0';

    // Force reflow to ensure initial transform is applied before transition
    void targetScreen.offsetWidth;

    // Apply the slide-in animation
    targetScreen.style.transition = `transform ${screenTransitionDuration / 1000}s ease-in-out, opacity ${screenTransitionDuration / 1000}s ease-in-out`;
    targetScreen.style.transform = 'translateY(0)'; // Slide to on-screen
    targetScreen.style.opacity = '1';

    // After the transition, clean up the old screen and reset transition for new screen
    setTimeout(() => {
        if (currentActiveScreen) {
            currentActiveScreen.classList.add('hidden');
            currentActiveScreen.classList.remove('slide-out-up', 'slide-out-down');
            // Reset its position and opacity for next use, and remove transition
            currentActiveScreen.style.transform = 'translateY(100vh)';
            currentActiveScreen.style.opacity = '0';
            currentActiveScreen.style.transition = '';
        }
        targetScreen.style.transition = ''; // Remove transition property after animation

        // Re-apply animations for content within the new screen
        triggerScreenContentAnimations(targetScreenId);

        // Update currentScreenIndex
        currentScreenIndex = screenOrder.indexOf(targetScreenId);

        // Manage 3D scene based on active screen
        if (targetScreenId === 'home-screen' && targetScreen.classList.contains('active')) {
            init3DScene();
        } else {
            stop3DAnimation(); // Stop 3D animation if not on home screen
        }

    }, screenTransitionDuration); // Match CSS transition duration
}

function triggerScreenContentAnimations(screenId) {
    // Reset all animations on elements that will be animated to allow re-triggering
    document.querySelectorAll(`#${screenId} [style*="animation-delay"]`).forEach(el => {
        const originalAnimation = el.style.animation;
        el.style.animation = 'none'; // Temporarily remove animation
        void el.offsetWidth; // Trigger reflow
        el.style.animation = originalAnimation; // Re-apply animation
    });

    // Specific animations for each screen's content
    if (screenId === 'home-screen') {
        // Ensure initial opacity is set to 0 before animation runs for all animated elements
        document.querySelectorAll('#home-screen .home-left > *, #home-screen .tech-item, #home-screen #hero-canvas').forEach(el => {
            el.style.opacity = '0';
        });

        homeTagline.style.animation = 'slide-in-up-home 0.8s ease-out forwards 1.0s';
        homeCompanyInfo.style.animation = 'slide-in-left-home 0.8s ease-out forwards 1.8s';
        homeDescription.style.animation = 'slide-in-up-home 0.8s ease-out forwards 2.1s';
        homeActionButtons.forEach((button, index) => {
            button.style.animation = `slide-in-up-home 0.8s ease-out forwards ${2.7 + (index * 0.1)}s`;
        });
        homeSocialLinks.forEach((link, index) => {
            link.style.animation = `slide-in-right-home 0.8s ease-out forwards ${3.0 + (index * 0.1)}s`;
        });
        animateTextCharacters(roleTitle, 1.2); // This handles char animations internally
        homeTechItems.forEach((item, index) => {
            item.style.animation = `fade-in-scale-new 0.8s ease-out forwards ${2.4 + (index * 0.1)}s`;
        });
        homeHeroCanvas.style.animation = 'canvas-fade-in 1.5s ease-out forwards 1.0s';
    } else if (screenId === 'about-screen') {
         // Ensure initial opacity is set to 0 before animation runs for all animated elements
        document.querySelectorAll('#about-screen .about-header, #about-screen .about-left h3, #about-screen .about-left p, #about-screen .about-buttons, #about-screen .profile-pic-container, #about-screen .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = ''; // Reset transform to initial state for animation
        });

        aboutHeader.style.animation = 'slide-in-up-about 1s ease-out forwards 0.5s';
        aboutLeftH3.style.animation = 'slide-in-left-about 1s ease-out forwards 1.0s';
        aboutLeftP.style.animation = 'slide-in-up-about 1s ease-out forwards 1.3s';
        aboutButtons.style.animation = 'slide-in-up-about 1s ease-out forwards 1.6s';
        profilePicContainer.style.animation = 'fade-in-scale-about 1s ease-out forwards 1.0s';
        statItems.forEach((item, index) => {
            item.style.animation = `slide-in-up-about 1s ease-out forwards ${2.0 + (index * 0.2)}s`;
        });
    }
    // Add similar blocks for portfolio-screen and contact-screen if they have specific animations
}


// Next button handler
function goToNextScreen() {
    const nextIndex = currentScreenIndex + 1;
    if (nextIndex < screenOrder.length) {
        showScreen(screenOrder[nextIndex]);
    } else {
        // Loop back to the first screen or show a message
        showScreen(screenOrder[0]); // Loop back to home
    }
}

// Event listener untuk navigasi navbar
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        showScreen(targetId + '-screen');
    });
});

// Panggil fungsi transitionToWelcomeScreen setelah durasi loading yang ditentukan
window.addEventListener('load', () => {
    setTimeout(transitionToWelcomeScreen, loadingDuration);
});

// Tambahkan event listener untuk memicu transisi ke Home Screen
// Listen to the animation end of the *last* character in welcomeTitle
welcomeTitle.addEventListener('animationend', (event) => {
    const allChars = welcomeTitle.querySelectorAll('.char');
    if (allChars.length > 0 && event.target === allChars[allChars.length - 1] && event.animationName === 'char-fade-in-up-scale') {
        setTimeout(transitionToHomeScreen, 1000); // Delay before sliding to home screen
    }
});
