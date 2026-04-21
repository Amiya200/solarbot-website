// ========================================
// EASY BUDDIES — SOLARBOT PRO
// Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  const backToTop = document.getElementById('back-to-top');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / total) * 100;

        if (progressBar) progressBar.style.width = progress + '%';
        if (navbar) {
          if (scrolled > 60) navbar.classList.add('scrolled');
          else navbar.classList.remove('scrolled');
        }
        if (backToTop) {
          if (scrolled > 500) backToTop.classList.add('visible');
          else backToTop.classList.remove('visible');
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== MOBILE NAV =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobileNav = () => {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ===== FEATURE CARDS INTERACTION =====
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.feature-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.feature-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // ===== COUNTER ANIMATION =====
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ===== TYPEWRITER EFFECT =====
  const typewriterEl = document.querySelector('.hero-typewriter');
  if (typewriterEl) {
    const words = [
      'Solar Farms', 'Rooftop Panels', 'Industrial Arrays',
      'Agrivoltaic Systems', 'Remote Installations', 'All Solar Setups'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseTimer = null;

    function type() {
      const currentWord = words[wordIndex];

      if (deleting) {
        charIndex--;
        typewriterEl.textContent = currentWord.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          pauseTimer = setTimeout(type, 400);
          return;
        }
        pauseTimer = setTimeout(type, 50);
      } else {
        charIndex++;
        typewriterEl.textContent = currentWord.slice(0, charIndex);
        if (charIndex === currentWord.length) {
          deleting = true;
          pauseTimer = setTimeout(type, 2000);
          return;
        }
        pauseTimer = setTimeout(type, 80);
      }
    }

    setTimeout(type, 800);
  }

  // ===== PRICING TOGGLE =====
  const toggleBtns = document.querySelectorAll('.pricing-toggle-btn');
  const pricingPrices = document.querySelectorAll('[data-monthly][data-annual]');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isAnnual = btn.dataset.plan === 'annual';
      pricingPrices.forEach(el => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const successEl = document.getElementById('formSuccess');

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = 'Send Message ☀';
        submitBtn.disabled = false;
        if (successEl) {
          successEl.style.display = 'block';
          setTimeout(() => { successEl.style.display = 'none'; }, 6000);
        }
      }, 1000);
    });
  }

  // ===== MARQUEE PAUSE ON HOVER =====
  const marqueeInner = document.querySelector('.marquee-inner');
  const marqueeStrip = document.querySelector('.marquee-strip');
  if (marqueeStrip && marqueeInner) {
    marqueeStrip.addEventListener('mouseenter', () => {
      marqueeInner.style.animationPlayState = 'paused';
    });
    marqueeStrip.addEventListener('mouseleave', () => {
      marqueeInner.style.animationPlayState = 'running';
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--clean-white)';
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ===== CARD TILT EFFECT =====
  document.querySelectorAll('.testimonial-card, .case-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== SPECS TAB INTERACTION =====
  document.querySelectorAll('.spec-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.borderColor = 'rgba(245,166,35,0.25)';
    });
    block.addEventListener('mouseleave', () => {
      block.style.borderColor = '';
    });
  });

});


// Theme toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "Toggle Theme";
toggleBtn.style.position = "fixed";
toggleBtn.style.bottom = "20px";
toggleBtn.style.right = "20px";
document.body.appendChild(toggleBtn);

toggleBtn.onclick = () => {
  const current = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute(
    "data-theme",
    current === "dark" ? "light" : "dark"
  );
};
// ===== QUOTE FORM WHATSAPP + EMAIL =====
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('textarea[name="message"]').value;

      const phone = "919876543210"; // 👈 CHANGE THIS
      const yourEmail = "your@email.com"; // 👈 CHANGE THIS

      const text = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      );

      // WhatsApp
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

      // Email
      window.location.href =
        `mailto:${yourEmail}?subject=Quote Request&body=${text}`;
    });
  }
});
