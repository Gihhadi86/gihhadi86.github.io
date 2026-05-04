/* ============================================================
   MAHRAMLEARN – script.js
   Interaktivitas lengkap: Loader, Navbar, Counter, Peta Mahram,
   Simulasi, Quiz, Dark Mode, Scroll, AOS
   ============================================================ */

/* ══════════════════════════════════════════════
   1. DATA – Mahram Categories & Quiz Questions
   ══════════════════════════════════════════════ */

const mahramData = {
  nasab: {
    title: '🧬 Mahram karena Nasab (Hubungan Darah)',
    color: '#10b981',
    items: [
      { icon: '👩', name: 'Ibu', desc: 'Ibu kandung, nenek, dan seluruh leluhur perempuan ke atas.' },
      { icon: '👧', name: 'Anak Perempuan', desc: 'Anak perempuan kandung dan cucunya ke bawah.' },
      { icon: '👭', name: 'Saudari Kandung', desc: 'Saudari seayah dan seibu, atau hanya seayah/seibu.' },
      { icon: '👩‍🦳', name: 'Bibi dari Ayah', desc: "Saudari kandung ayah (عَمَّة / 'Ammah)." },
      { icon: '👩‍🦱', name: 'Bibi dari Ibu', desc: 'Saudari kandung ibu (خَالَة / Khalah).' },
      { icon: '👶', name: 'Keponakan (Saudara)', desc: 'Anak perempuan dari saudara laki-laki.' },
      { icon: '👶', name: 'Keponakan (Saudari)', desc: 'Anak perempuan dari saudari kandung.' },
    ]
  },
  radha: {
    title: '🤱 Mahram karena Radha\'ah (Persusuan)',
    color: '#f0c040',
    items: [
      { icon: '🤱', name: 'Ibu Susu', desc: 'Wanita yang pernah menyusuinya minimal 5 kali susuan penuh.' },
      { icon: '👭', name: 'Saudari Sesusuan', desc: 'Perempuan yang disusui oleh ibu susu yang sama.' },
      { icon: '👩‍🦳', name: 'Bibi Sesusuan', desc: 'Saudari dari ibu susu atau saudara susu (ayah susuan).' },
    ]
  },
  musha: {
    title: '💍 Mahram karena Mushaharah (Pernikahan)',
    color: '#a5b4fc',
    items: [
      { icon: '👩‍👩‍👧', name: 'Ibu Mertua', desc: 'Ibu dari istri. Haram setelah akad nikah, meski belum dicampuri.' },
      { icon: '👧‍🦰', name: 'Anak Tiri', desc: 'Anak perempuan dari istri yang sudah dicampuri (rabibah).' },
      { icon: '👰', name: 'Menantu Perempuan', desc: 'Istri dari anak kandung (bukan anak angkat).' },
      { icon: '👩‍❤️‍👨', name: 'Ibu Tiri', desc: 'Istri dari ayah kandung. Haram setelah akad, meski belum dicampuri.' },
    ]
  }
};

const simulasiData = [
  { icon: '👩', label: 'Ibu Kandung', isMahram: true, kategori: 'Nasab', alasan: 'Ibu kandung adalah mahram yang paling utama berdasarkan QS. An-Nisa: 23.' },
  { icon: '👧', label: 'Anak Perempuan', isMahram: true, kategori: 'Nasab', alasan: 'Anak perempuan kandung termasuk mahram sebab nasab.' },
  { icon: '👭', label: 'Saudari Kandung', isMahram: true, kategori: 'Nasab', alasan: 'Saudari kandung, seayah, atau seibu termasuk mahram nasab.' },
  { icon: '👩‍🦳', label: 'Bibi (dari Ayah)', isMahram: true, kategori: 'Nasab', alasan: "Bibi dari pihak ayah (عمة / 'ammah) adalah mahram nasab." },
  { icon: '🤱', label: 'Ibu Susu', isMahram: true, kategori: 'Radha\'ah', alasan: 'Ibu yang menyusui menjadi mahram layaknya ibu kandung.' },
  { icon: '👩‍❤️‍👨', label: 'Ibu Mertua', isMahram: true, kategori: 'Mushaharah', alasan: 'Ibu dari istri menjadi mahram sejak akad nikah.' },
  { icon: '👰', label: 'Menantu', isMahram: true, kategori: 'Mushaharah', alasan: 'Istri anak kandung menjadi mahram sebab pernikahan.' },
  { icon: '👧‍🦰', label: 'Anak Tiri', isMahram: true, kategori: 'Mushaharah', alasan: 'Anak perempuan istri (yang sudah dicampuri) menjadi mahram.' },
  { icon: '👩‍🦱', label: 'Sepupu Perempuan', isMahram: false, alasan: 'Sepupu (anak paman/bibi) bukan mahram dan boleh dinikahi.' },
  { icon: '👩', label: 'Teman / Sahabat', isMahram: false, alasan: 'Teman perempuan tidak memiliki hubungan mahram sama sekali.' },
  { icon: '💑', label: 'Mantan Istri Paman', isMahram: false, alasan: 'Istri paman setelah diceraikan bukan mahram.' },
  { icon: '👩‍🎓', label: 'Guru Perempuan', isMahram: false, alasan: 'Hubungan guru-murid tidak menjadikan seseorang mahram.' },
];

const quizData = [
  {
    q: 'Apa yang dimaksud dengan "Mahram" dalam Islam?',
    options: [
      'Wanita yang boleh dinikahi kapan saja',
      'Wanita yang haram untuk dinikahi karena nasab, persusuan, atau pernikahan',
      'Wanita yang menjadi teman dekat',
      'Wanita yang beragama Islam'
    ],
    correct: 1,
    explanation: 'Mahram adalah wanita yang haram dinikahi secara permanen karena tiga sebab: nasab (keturunan), radha\'ah (persusuan), atau mushaharah (pernikahan).'
  },
  {
    q: 'Manakah yang termasuk mahram karena NASAB (keturunan)?',
    options: ['Ibu susu', 'Ibu mertua', 'Saudari kandung', 'Anak tiri'],
    correct: 2,
    explanation: 'Saudari kandung termasuk mahram nasab. Ibu susu = radha\'ah, Ibu mertua = mushaharah, Anak tiri = mushaharah.'
  },
  {
    q: 'Berapa kali minimal susuan agar terbentuk hubungan mahram radha\'ah menurut pendapat yang kuat?',
    options: ['1 kali', '3 kali', '5 kali penuh', '10 kali'],
    correct: 2,
    explanation: 'Menurut hadis sahih riwayat Muslim, hubungan mahram persusuan terbentuk dengan 5 kali susuan yang mengenyangkan (penuh).'
  },
  {
    q: 'Apakah sepupu perempuan (anak paman) termasuk mahram?',
    options: [
      'Ya, karena masih keluarga dekat',
      'Tidak, sepupu bukan mahram dan boleh dinikahi',
      'Ya, jika menyusu bersama',
      'Tergantung persetujuan keluarga'
    ],
    correct: 1,
    explanation: 'Sepupu (anak paman atau bibi) bukan mahram dan halal untuk dinikahi dalam Islam.'
  },
  {
    q: 'Ibu mertua menjadi mahram mushaharah sejak kapan?',
    options: [
      'Setelah pernikahan dicampuri',
      'Setelah punya anak',
      'Sejak akad nikah, meski belum dicampuri',
      'Setelah 1 tahun pernikahan'
    ],
    correct: 2,
    explanation: 'Ibu mertua menjadi mahram sejak akad nikah. Berbeda dengan anak tiri yang baru haram setelah ibunya dicampuri.'
  },
  {
    q: 'Surah dan ayat manakah yang menjadi dalil utama tentang wanita yang haram dinikahi?',
    options: ['QS. Al-Baqarah: 187', 'QS. An-Nisa: 23', 'QS. Al-Ahzab: 50', 'QS. An-Nur: 31'],
    correct: 1,
    explanation: 'QS. An-Nisa ayat 23 adalah ayat utama yang secara rinci menyebut 14 golongan wanita yang haram dinikahi.'
  },
  {
    q: 'Manakah yang merupakan mahram karena MUSHAHARAH (pernikahan)?',
    options: ['Bibi dari ibu', 'Keponakan perempuan', 'Saudari sesusuan', 'Anak tiri yang ibunya sudah dicampuri'],
    correct: 3,
    explanation: 'Anak tiri (rabibah) yang ibunya sudah dicampuri adalah mahram mushaharah. Bibi dan keponakan = nasab, saudari sesusuan = radha\'ah.'
  },
  {
    q: 'Siapakah yang disebut "Rabibah" dalam fikih?',
    options: [
      'Ibu mertua',
      'Saudari sesusuan',
      'Anak perempuan dari istri (anak tiri)',
      'Bibi dari pihak ibu'
    ],
    correct: 2,
    explanation: 'Rabibah (رَبِيبَة) adalah anak perempuan dari istri (anak tiri). Ia menjadi mahram jika ibunya telah dicampuri.'
  },
  {
    q: 'Apakah menantu perempuan (istri anak kandung) termasuk mahram?',
    options: [
      'Tidak, karena bukan keluarga kandung',
      'Ya, karena termasuk mahram mushaharah',
      'Hanya jika menikah di usia muda',
      'Tergantung pendapat ulama'
    ],
    correct: 1,
    explanation: 'Menantu perempuan (istri anak kandung) adalah mahram mushaharah berdasarkan QS. An-Nisa: 23 — "halaa\'il abna\'ikumulladzina min ashlabikum".'
  },
  {
    q: 'Selain sebagai orang yang haram dinikahi, mahram juga berfungsi sebagai...',
    options: [
      'Teman bermain',
      'Wali dan pendamping perjalanan wanita muslimah',
      'Saksi dalam akad nikah saja',
      'Orang yang berhak mewarisi semua harta'
    ],
    correct: 1,
    explanation: 'Mahram juga berfungsi sebagai wali dalam pernikahan dan pendamping (muhrim) saat wanita muslimah melakukan perjalanan jauh.'
  }
];

/* ══════════════════════════════════════════════
   2. LOADER
   ══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // Trigger hero animations
    document.querySelectorAll('.animate-in').forEach(el => {
      el.classList.add('loaded');
    });
    // Start counters
    startCounters();
  }, 1800);
});

/* ══════════════════════════════════════════════
   3. NAVBAR
   ══════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateScrollProgress();
  updateScrollTopBtn();
  highlightNavLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ══════════════════════════════════════════════
   4. SCROLL PROGRESS BAR
   ══════════════════════════════════════════════ */
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-bar').style.width = progress + '%';
}

/* ══════════════════════════════════════════════
   5. NAV ACTIVE LINK
   ══════════════════════════════════════════════ */
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

/* ══════════════════════════════════════════════
   6. SCROLL TO TOP BUTTON
   ══════════════════════════════════════════════ */
function updateScrollTopBtn() {
  const btn = document.getElementById('scrollTop');
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════════════════════
   7. DARK MODE TOGGLE
   ══════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDark = false;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
});

/* ══════════════════════════════════════════════
   8. HERO COUNTER ANIMATION
   ══════════════════════════════════════════════ */
function startCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

/* ══════════════════════════════════════════════
   9. AYAT ACTIONS – Tafsir & Audio
   ══════════════════════════════════════════════ */
document.getElementById('showTafsir').addEventListener('click', () => {
  document.getElementById('tafsirBox').classList.remove('hidden');
  document.getElementById('tafsirBox').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('closeTafsir').addEventListener('click', () => {
  document.getElementById('tafsirBox').classList.add('hidden');
});

document.getElementById('playAyat').addEventListener('click', () => {
  // Show a friendly notification since we can't play real audio
  const btn = document.getElementById('playAyat');
  const orig = btn.textContent;
  btn.textContent = '🎵 Membuka audio...';
  setTimeout(() => {
    btn.textContent = orig;
    alert('Untuk mendengarkan tilawah QS. An-Nisa: 23, silakan kunjungi:\n• quran.com/4/23\n• aplikasi Al-Qur\'an di perangkat Anda');
  }, 500);
});

/* ══════════════════════════════════════════════
   10. PETA MAHRAM – Mind Map Interaktif
   ══════════════════════════════════════════════ */
const mmCards = document.getElementById('mmCards');
const mmCardsWrap = document.getElementById('mmCardsWrap');
const mmCardsHeader = document.getElementById('mmCardsHeader');

let activeCategory = null;

document.querySelectorAll('.mm-branch').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;

    // Toggle off if same
    if (activeCategory === cat) {
      activeCategory = null;
      document.querySelectorAll('.mm-branch').forEach(b => b.classList.remove('active'));
      mmCards.innerHTML = '';
      mmCardsHeader.innerHTML = '';
      mmCardsWrap.style.display = 'none';
      return;
    }

    activeCategory = cat;
    document.querySelectorAll('.mm-branch').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderMahramCards(cat);
  });
});

function renderMahramCards(cat) {
  const data = mahramData[cat];
  mmCardsHeader.innerHTML = `<h3 style="color:${data.color}">${data.title}</h3>`;
  mmCards.innerHTML = '';
  mmCardsWrap.style.display = 'block';

  data.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'mm-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.style.borderColor = `${data.color}30`;
    card.innerHTML = `
      <div class="mm-card-icon">${item.icon}</div>
      <div class="mm-card-name">${item.name}</div>
      <div class="mm-card-desc">${item.desc}</div>
    `;
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = data.color;
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = `${data.color}30`;
    });
    mmCards.appendChild(card);
  });

  mmCardsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ══════════════════════════════════════════════
   11. SIMULASI INTERAKTIF
   ══════════════════════════════════════════════ */
const simGrid = document.getElementById('simGrid');
const simResult = document.getElementById('simResult');

simulasiData.forEach((item, i) => {
  const el = document.createElement('button');
  el.className = 'sim-item';
  el.innerHTML = `<span>${item.icon}</span> ${item.label}`;
  el.addEventListener('click', () => {
    // Remove selected from all
    document.querySelectorAll('.sim-item').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
    showSimResult(item);
  });
  simGrid.appendChild(el);
});

function showSimResult(item) {
  const verdict = item.isMahram ? '✅' : '❌';
  const verdictText = item.isMahram ? 'MAHRAM' : 'BUKAN MAHRAM';
  const verdictClass = item.isMahram ? 'mahram' : 'bukan';
  const kategoriBadge = item.isMahram ? `<div style="font-size:0.8rem;color:var(--emerald);font-weight:600;margin-bottom:8px">Kategori: ${item.kategori}</div>` : '';
  const borderColor = item.isMahram ? 'var(--emerald)' : '#ef4444';

  simResult.style.borderColor = borderColor;
  simResult.innerHTML = `
    <div class="sim-answer">
      <div class="sim-verdict">${verdict}</div>
      <div class="sim-verdict-text ${verdictClass}">${verdictText}</div>
      ${kategoriBadge}
      <div class="sim-reason">${item.alasan}</div>
    </div>
  `;
}

/* ══════════════════════════════════════════════
   12. QUIZ INTERAKTIF
   ══════════════════════════════════════════════ */
let currentQ = 0;
let score = 0;
let answered = false;

document.getElementById('startQuiz').addEventListener('click', () => {
  document.getElementById('quizStart').classList.add('hidden');
  document.getElementById('quizScreen').classList.remove('hidden');
  currentQ = 0;
  score = 0;
  loadQuestion();
});

function loadQuestion() {
  answered = false;
  const q = quizData[currentQ];
  const progress = ((currentQ) / quizData.length) * 100;

  document.getElementById('qNum').textContent = `Soal ${currentQ + 1}`;
  document.getElementById('qProgress').style.width = progress + '%';
  document.getElementById('liveScore').textContent = score;
  document.getElementById('quizQ').textContent = q.q;
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('quizNext').classList.add('hidden');

  const optsEl = document.getElementById('quizOptions');
  optsEl.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span> ${opt}`;
    btn.addEventListener('click', () => answerQuestion(i, btn));
    optsEl.appendChild(btn);
  });
}

function answerQuestion(index, btn) {
  if (answered) return;
  answered = true;

  const q = quizData[currentQ];
  const opts = document.querySelectorAll('.quiz-opt');
  const feedback = document.getElementById('quizFeedback');

  opts.forEach(o => o.classList.add('disabled'));
  opts[q.correct].classList.add('correct');

  if (index === q.correct) {
    score++;
    document.getElementById('liveScore').textContent = score;
    feedback.className = 'quiz-feedback correct-fb';
    feedback.innerHTML = `✅ <strong>Benar!</strong> ${q.explanation}`;
  } else {
    btn.classList.add('wrong');
    feedback.className = 'quiz-feedback wrong-fb';
    feedback.innerHTML = `❌ <strong>Kurang tepat.</strong> ${q.explanation}`;
  }

  feedback.classList.remove('hidden');
  document.getElementById('quizNext').classList.remove('hidden');
}

document.getElementById('quizNext').addEventListener('click', () => {
  currentQ++;
  if (currentQ >= quizData.length) {
    showQuizResult();
  } else {
    loadQuestion();
  }
});

function showQuizResult() {
  document.getElementById('quizScreen').classList.add('hidden');
  const resultEl = document.getElementById('quizResult');
  resultEl.classList.remove('hidden');

  document.getElementById('finalScore').textContent = score;
  document.getElementById('qProgress').style.width = '100%';

  let badge, title, msg;

  if (score === 10) {
    badge = '🏆';
    title = 'Ahli Mahram!';
    msg = 'Luar biasa! Kamu telah menguasai materi mahram dengan sempurna. Terus jadikan ilmu ini pedoman hidup!';
    launchConfetti();
  } else if (score >= 7) {
    badge = '🥇';
    title = 'Paham Materi!';
    msg = `Bagus sekali! Kamu sudah memahami sebagian besar materi. Pelajari lagi soal yang masih keliru.`;
  } else if (score >= 5) {
    badge = '📚';
    title = 'Cukup Baik!';
    msg = 'Pemahaman kamu cukup baik. Ayo ulangi materi sekali lagi untuk hasil yang lebih maksimal.';
  } else {
    badge = '💪';
    title = 'Perlu Belajar Lagi!';
    msg = 'Jangan menyerah! Baca kembali materi di atas lalu coba quiz ini lagi. Semangat!';
  }

  document.getElementById('resultBadge').textContent = badge;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMsg').textContent = msg;
  document.getElementById('resultDetail').textContent = `${score} jawaban benar dari ${quizData.length} soal (${Math.round(score/quizData.length*100)}%)`;
}

document.getElementById('restartQuiz').addEventListener('click', () => {
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizStart').classList.remove('hidden');
  document.getElementById('confetti').innerHTML = '';
  currentQ = 0;
  score = 0;
});

/* ══════════════════════════════════════════════
   13. CONFETTI ANIMATION
   ══════════════════════════════════════════════ */
function launchConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#059669', '#10b981', '#f0c040', '#d4a017', '#a5b4fc', '#fb7185'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 1}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(piece);
  }
}

/* ══════════════════════════════════════════════
   14. SCROLL ANIMATION (AOS custom)
   ══════════════════════════════════════════════ */
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-aos], .info-card, .hikmah-card').forEach(el => {
    observer.observe(el);
  });
}

setupScrollAnimations();

/* ══════════════════════════════════════════════
   15. SMOOTH SCROLL for Anchor Links
   ══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - navH,
        behavior: 'smooth'
      });
    }
  });
});