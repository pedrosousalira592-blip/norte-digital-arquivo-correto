/* =============================================
   NORTE DIGITAL — JavaScript Principal
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load


  /* ---- 2. HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }


  /* ---- 3. SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-sub, .hero-actions, .hero-trust, ' +
    '.sobre-visual, .sobre-text, ' +
    '.card-servico, ' +
    '.beneficio-item, ' +
    '.cta-icon, .cta-content h2, .cta-content p, .cta-content .btn, .cta-disclaimer, ' +
    '.contato-text, .contato-cta-card, ' +
    '.section-header'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Slight stagger for grid children
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Add stagger delays for grid items
  document.querySelectorAll('.card-servico').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });

  document.querySelectorAll('.beneficio-item').forEach((el, i) => {
    el.dataset.delay = i * 60;
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ---- 4. ACTIVE NAV LINK (highlight on scroll) ---- */
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (navLink) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
          navLink.style.color = '#ffffff';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ---- 5. SMOOTH ANCHOR SCROLL (offset for fixed navbar) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ---- 6. WHATSAPP FLOAT — show after 2s ---- */
  const wppFloat = document.querySelector('.whatsapp-float');
  if (wppFloat) {
    wppFloat.style.opacity = '0';
    wppFloat.style.transform = 'scale(0.7)';
    wppFloat.style.transition = 'opacity 0.45s ease, transform 0.45s ease';

    setTimeout(() => {
      wppFloat.style.opacity = '1';
      wppFloat.style.transform = 'scale(1)';
    }, 2000);
  }


  /* ---- 7. COUNTER ANIMATION (stats) ---- */
  const counters = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const text = el.textContent.trim();
    const numMatch = text.match(/(\d+)/);
    if (!numMatch) return;

    const target = parseInt(numMatch[1]);
    const suffix = text.replace(numMatch[1], '');
    let current = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  /* ---- 8. TRACKING: WhatsApp Click Events (console log) ---- */
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      const label = link.textContent.trim().substring(0, 40) || 'WhatsApp Link';
      console.log(`[Norte Digital] WhatsApp click: "${label}"`);
    });
  });

  console.log('%c Norte Digital 🌿 ', 'background:#0a0a0a;color:#25D366;font-size:14px;font-weight:bold;padding:6px 10px;border-radius:4px;');
  console.log('%c Site carregado com sucesso!', 'color:#888;font-size:12px;');

});
