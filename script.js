/**
 * DANIEL CARDOSO MARTINS — PORTFOLIO JS
 * script.js
 */

'use strict';

/* ==========================================
   CUSTOM CURSOR
   ========================================== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    cursor.classList.add('visible');
    cursorDot.classList.add('visible');
  });


  // Hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, [data-hover]');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
    cursorDot.classList.remove('visible');
  });
})();

/* ==========================================
   NAVIGATION — SCROLL BEHAVIOR
   ========================================== */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ==========================================
   MOBILE MENU
   ========================================== */
(function initMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (!btn || !menu) return;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    menu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    btn.setAttribute('aria-expanded', String(isOpen));
  }

  btn.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu();
    });
  });
})();

/* ==========================================
   SCROLL REVEAL
   ========================================== */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ==========================================
   ACTIVE NAV LINK — HIGHLIGHT ON SCROLL
   ========================================== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  function setActive() {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ==========================================
   CONTACT FORM — WHATSAPP SEND
   ========================================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  const whatsappNumber = '5544920023987';

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFeedback(message, isError = false) {
    feedback.textContent = message;
    feedback.className = `form__feedback${isError ? ' error' : ''}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validation
    if (!name) {
      setFeedback('Por favor, informe seu nome.', true);
      form.name.focus();
      return;
    }

    if (!email || !validateEmail(email)) {
      setFeedback('Por favor, informe um e-mail válido.', true);
      form.email.focus();
      return;
    }

    if (!message || message.length < 10) {
      setFeedback('Sua mensagem precisa ter pelo menos 10 caracteres.', true);
      form.message.focus();
      return;
    }

    const whatsappMessage =
      `Olá Daniel! Meu nome é ${name}.

Email: ${email}

Mensagem:
${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    setFeedback('Abrindo WhatsApp...');

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      '_blank'
    );

    form.reset();
  });

  // Clear feedback on input
  [form.name, form.email, form.message].forEach((field) => {
    field.addEventListener('input', () => {
      if (feedback.textContent) setFeedback('');
    });
  });
})();

/* ==========================================
   SMOOTH ANCHOR SCROLL (custom easing)
   ========================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);

      if (!target) return;

      e.preventDefault();

      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        80;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });
})();