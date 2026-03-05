/* ========================================
   Achievement Autism Academy – JavaScript
   ======================================== */

/* ---------- Navbar: scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- Smooth active link highlight ---------- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '#ffffff';
        link.style.fontWeight = '800';
      } else {
        link.style.color = '';
        link.style.fontWeight = '';
      }
    }
  });
});

/* ---------- Scroll-in animation ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add fade-in class to cards and sections
document.querySelectorAll(
  '.service-card, .fee-card, .about-item, .contact-item, .belief-item, .approach-box, .sdp-note'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ---------- Contact form ---------- */
const form  = document.getElementById('contactForm');
const toast = createToast();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('⚠️ Please fill in all required fields.', '#c0392b');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  try {
    const formData = new FormData(form);
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

    if (response.ok) {
      form.reset();
      showToast('✅ Message sent! We\'ll be in touch within 24 hours.', '#0a2a6e');
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (err) {
    showToast('⚠️ Something went wrong. Please email us directly.', '#c0392b');
  } finally {
    submitBtn.textContent = 'Send Message 📩';
    submitBtn.disabled = false;
  }
});

/* ---------- Toast helpers ---------- */
function createToast() {
  const t = document.createElement('div');
  t.className = 'toast';
  document.body.appendChild(t);
  return t;
}

function showToast(msg, bg = '#0a2a6e') {
  toast.textContent = msg;
  toast.style.background = bg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ---------- CSS fade-in keyframes (injected) ---------- */
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
