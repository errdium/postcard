const envelope = document.querySelector('#envelope');
const photo = document.querySelector('#photo');
const hint = document.querySelector('#hint');
const page = document.querySelector('.postcard-page');
const music = document.querySelector('#music');
let revealTimer;

envelope.addEventListener('click', () => {
  window.clearTimeout(revealTimer);
  const isOpen = envelope.classList.toggle('is-open');
  envelope.classList.remove('photo-revealed');
  envelope.setAttribute('aria-expanded', String(isOpen));
  envelope.setAttribute('aria-label', isOpen ? 'Close the envelope' : 'Open the envelope');
  hint.textContent = isOpen ? 'Click to close' : 'Click to open';

  if (isOpen) {
    music.muted = true;
    music.play().catch(() => {});
    revealTimer = window.setTimeout(() => {
      if (envelope.classList.contains('is-open')) {
        envelope.classList.add('photo-revealed');
        page.classList.add('is-dimmed');
        music.pause();
        music.currentTime = 0;
        music.muted = false;
        music.play().catch(() => {});
      }
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2000);
  } else {
    page.classList.remove('is-dimmed');
    music.pause();
    music.currentTime = 0;
    music.muted = false;
  }
});

photo.addEventListener('error', () => {
  photo.parentElement.classList.add('photo-missing');
});