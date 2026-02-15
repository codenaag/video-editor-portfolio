// Main interactions for the portfolio page:
// - Mobile menu toggle
// - IntersectionObserver reveal animations
// - Subtle pointer parallax in hero background
// - Dynamic footer year

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  // Close mobile menu after selecting any nav link.
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal on scroll using IntersectionObserver.
const revealTargets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealTargets.forEach((element) => revealObserver.observe(element));

// Subtle neon movement in hero section.
const heroGlow = document.getElementById('heroGlow');
window.addEventListener('mousemove', (event) => {
  if (!heroGlow) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 12;
  const y = (event.clientY / window.innerHeight - 0.5) * 12;

  heroGlow.style.transform = `translate(${x}px, ${y}px)`;
});

// Footer copyright year.
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
