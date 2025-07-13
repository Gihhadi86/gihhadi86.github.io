const slides = document.querySelectorAll('.slide');
const progressBar = document.querySelector('.progress-bar span');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const startBtn = document.querySelector('.start-btn');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  prevBtn.style.display = index === 0 ? 'none' : 'block';
  nextBtn.style.display = index === slides.length - 1 ? 'none' : 'block';
}

startBtn.addEventListener('click', () => {
  document.querySelector('.cover').style.display = 'none';
  document.querySelector('.book-container').style.display = 'flex';
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) currentSlide++;
  showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) currentSlide--;
  showSlide(currentSlide);
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

showSlide(currentSlide);
