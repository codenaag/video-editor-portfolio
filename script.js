// Core interactive behaviors for premium one-page portfolio.
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader?.classList.add('hidden'), 650);
});

const typingWords = ['YouTube Editor', 'Reels Specialist', 'Content Strategist'];
const typingText = document.getElementById('typingText');
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function runTyping() {
  if (!typingText) return;
  const current = typingWords[wordIndex];
  typingText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(runTyping, 100);
    return;
  }
  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(runTyping, 60);
    return;
  }

  if (!deleting) {
    deleting = true;
    setTimeout(runTyping, 1100);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    setTimeout(runTyping, 300);
  }
}
runTyping();

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);
revealItems.forEach((item) => revealObserver.observe(item));

const progressBar = document.getElementById('scrollProgress');
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  if (toTopBtn) toTopBtn.classList.toggle('show', scrollTop > 500);
});

toTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));

      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = `${target}`;
          return;
        }
        el.textContent = `${current}`;
        requestAnimationFrame(tick);
      };

      tick();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.45 }
);
counters.forEach((counter) => counterObserver.observe(counter));

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const items = entry.target.querySelectorAll('.skill-item');
      items.forEach((item) => {
        const value = item.dataset.skill || '0';
        const fill = item.querySelector('.skill-fill');
        if (fill) fill.style.width = `${value}%`;
      });
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);
const skillsEl = document.querySelector('.skills');
if (skillsEl) skillObserver.observe(skillsEl);

const filterButtons = document.getElementById('filterButtons');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterButtons?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  filterButtons.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
  target.classList.add('active');
  const filter = target.dataset.filter;

  portfolioItems.forEach((item) => {
    const category = item.dataset.category;
    const visible = filter === 'all' || filter === category;
    item.classList.toggle('hidden', !visible);
  });
});

const testimonialCards = document.querySelectorAll('.testimonial-card');
let testimonialIndex = 0;
setInterval(() => {
  testimonialCards.forEach((card) => card.classList.remove('active'));
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  testimonialCards[testimonialIndex].classList.add('active');
}, 3200);

const iframes = document.querySelectorAll('iframe[data-src]');
const lazyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const frame = entry.target;
      const src = frame.dataset.src;
      if (src) frame.src = src;
      lazyObserver.unobserve(frame);
    });
  },
  { rootMargin: '250px' }
);
iframes.forEach((iframe) => lazyObserver.observe(iframe));

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = `${formData.get('name') || ''}`.trim();
  const email = `${formData.get('email') || ''}`.trim();
  const details = `${formData.get('details') || ''}`.trim();

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !validEmail || details.length < 15) {
    if (formStatus) formStatus.textContent = 'Please enter valid details (minimum 15 characters).';
    return;
  }

  contactForm.classList.add('submitting');
  if (formStatus) formStatus.textContent = 'Sending your project brief...';

  setTimeout(() => {
    contactForm.reset();
    contactForm.classList.remove('submitting');
    if (formStatus) formStatus.textContent = 'Thanks! Your message has been sent successfully.';
  }, 800);
});

document.getElementById('year').textContent = new Date().getFullYear();
