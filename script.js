/* ══════════════════════════════════════
   NAV — DARKEN ON SCROLL
══════════════════════════════════════ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(5, 14, 36, 0.97)';
  } else {
    nav.style.background = 'rgba(5, 14, 36, 0.85)';
  }
});


/* ══════════════════════════════════════
   HAMBURGER MENU (MOBILE)
══════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close menu when any nav link is clicked */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ══════════════════════════════════════
   SCROLL REVEAL ANIMATION
══════════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      /* Stagger siblings slightly */
      entry.target.style.transitionDelay = (index % 3) * 0.07 + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


/* ══════════════════════════════════════
   SKILL BAR ANIMATION
══════════════════════════════════════ */
const skillCardElements = document.querySelectorAll('.about-card-main');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCardElements.forEach(el => skillObserver.observe(el));


/* ══════════════════════════════════════
   CONTACT FORM — WHATSAPP REDIRECT
══════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  /* 1. Grab values from the form inputs */
  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const email   = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  /* 2. Format the message exactly how you want to read it on WhatsApp */
  // The asterisks (*) will make the text bold in WhatsApp
  const rawMessage = `Hey there! I'm in need of your services

Name: ${name}
Phone: ${phone || 'Not provided'}
Email: ${email}
Service Required: ${service || 'Not specified'}

Message:
${message || 'N/A'}`;

  /* 3. Encode the message for the URL and build the WhatsApp link */
  // We use your number from the HTML: 27760915274
  const whatsappNumber = "27760915274"; 
  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsappURL    = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  /* 4. Visual feedback for the user */
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Opening WhatsApp... 💬';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.8';

  /* 5. Open WhatsApp in a new tab */
  window.open(whatsappURL, '_blank');

  /* 6. Reset the form and button after a short delay so they can message again if needed */
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    contactForm.reset();
  }, 2500);
});


/* ══════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
   (highlights the current section)
══════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--white)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));