/* ============================
   script.js - Hauptlogik (ohne Feedback)
   ============================ */

// -------- Elemente --------
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');
const cursorGlow = document.querySelector('.cursor-glow');
const introOverlay = document.getElementById('intro-overlay');

// -------- Cookies --------
let cookiesAccepted = localStorage.getItem('cookies') === 'accepted';

// Cookie Popup anzeigen
window.addEventListener('load', () => {
  // Intro Animation: 1.6s + kleine Pause, dann ausblenden
  setTimeout(() => {
    if (introOverlay) {
      introOverlay.classList.add('hidden');
      setTimeout(() => introOverlay.style.display = 'none', 650);
    }
  }, 1600);

  if (!cookiesAccepted) cookiePopup.style.display = 'flex';
});

// Cookie Buttons
cookieAccept?.addEventListener('click', () => {
  localStorage.setItem('cookies', 'accepted');
  cookiePopup.style.display = 'none';
});
cookieDecline?.addEventListener('click', () => {
  localStorage.setItem('cookies', 'declined');
  cookiePopup.style.display = 'none';
});

// -------- Karten Hover 3D + Glow --------
document.querySelectorAll('.card, .project-card, .info-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x - rect.width / 2) / 18;
    const dy = (y - rect.height / 2) / 18;
    card.style.transform = `rotateY(${dx}deg) rotateX(${-dy}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
  });
});

// -------- Maus Glow Effekt --------
document.addEventListener('mousemove', e => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});


// -------- Hintergrundmusik --------
const bgMusic = new Audio('audio/NOON_Martin_Bravi_NEEDED_YOU_Speed_Garage_NCS.m4a'); // <-- neue Musikdatei
bgMusic.loop = true;
bgMusic.volume = 0.4;

// Musik nach Intro-Animation starten (wird evtl. blockiert)
window.addEventListener('load', () => {
  setTimeout(() => {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log('Autoplay blockiert. Musik wird nach Klick gestartet.');
      });
    }
  }, 2200); // startet nach Intro-Overlay
});

// Falls Autoplay blockiert -> Musik nach erstem Klick starten
document.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });
