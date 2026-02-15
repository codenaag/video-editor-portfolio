// Portfolio interactions:
// 1) Mobile navigation toggle
// 2) Reveal on scroll animations via IntersectionObserver
// 3) Subtle hero parallax movement
// 4) Footer year injection

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked.
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Scroll reveal animation for cards/sections.
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Pointer-driven subtle movement in hero glow layer.
const heroParallax = document.querySelector('.hero-parallax');
window.addEventListener('mousemove', (event) => {
  if (!heroParallax) return;

  const moveX = (event.clientX / window.innerWidth - 0.5) * 14;
  const moveY = (event.clientY / window.innerHeight - 0.5) * 14;

  heroParallax.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Dynamic copyright year.
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
