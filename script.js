/* =========================================================
   KENN.DEV — Portfolio interactions
   ========================================================= */

(() => {
  'use strict';

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPct = document.getElementById('loaderPct');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('is-done');
        document.body.style.overflow = '';
        initRevealAnimations();
        initHeroReveal();
      }, 400);
    }
    loaderBar.style.width = progress + '%';
    loaderPct.textContent = Math.floor(progress) + '%';
  }, 120);

  document.body.style.overflow = 'hidden';

  /* ---------- CUSTOM CURSOR + AMBIENT LIGHT ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const ambient = document.getElementById('ambientLight');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;
  let ambientX = mouseX, ambientY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ambientX += (mouseX - ambientX) * 0.06;
    ambientY += (mouseY - ambientY) * 0.06;

    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    ambient.style.transform = `translate(${ambientX}px, ${ambientY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => {
    cursorRing.classList.add('is-down');
    cursorDot.classList.add('is-down');
  });
  document.addEventListener('mouseup', () => {
    cursorRing.classList.remove('is-down');
    cursorDot.classList.remove('is-down');
  });

  document.querySelectorAll('[data-hover], a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('is-hover');
      cursorDot.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('is-hover');
      cursorDot.classList.remove('is-hover');
    });
  });

  /* ---------- PARTICLE CANVAS ---------- */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
  }
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.4,
        hue: Math.random() < 0.5 ? 245 : 280,
        alpha: Math.random() * 0.4 + 0.2
      });
    }
  }
  createParticles();

  function drawParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(260, 70%, 70%, ${(1 - dist / 140) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // mouse interaction
      const mdx = particles[i].x - mouseX;
      const mdy = particles[i].y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 160) {
        ctx.beginPath();
        ctx.strokeStyle = `hsla(190, 90%, 70%, ${(1 - mdist / 160) * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ---------- TYPEWRITER ---------- */
  const phrases = [
    'Software Engineer',
    'Frontend Architect',
    'Motion Designer',
    'AI Tinkerer',
    'Open-source Contributor'
  ];
  const tw = document.getElementById('typewriter');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      tw.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      tw.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  setTimeout(typeLoop, 1200);

  /* ---------- HERO LINE REVEAL ---------- */
  function initHeroReveal() {
    document.querySelectorAll('.reveal-line').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 100 + 200);
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');

          // animate skill bars
          if (entry.target.querySelector('.bar')) {
            entry.target.querySelectorAll('.bar').forEach((bar, i) => {
              const value = bar.getAttribute('data-value');
              setTimeout(() => {
                bar.querySelector('.bar__fill').style.width = value + '%';
              }, i * 120);
            });
          }

          // animate circles
          if (entry.target.querySelector('.circle-skill')) {
            entry.target.querySelectorAll('.circle-skill').forEach((c, i) => {
              const value = +c.getAttribute('data-value');
              const fg = c.querySelector('.circle-skill__fg');
              const num = c.querySelector('.circle-skill__num');
              const offset = 264 - (264 * value) / 100;
              setTimeout(() => {
                fg.style.strokeDashoffset = offset;
                animateNumber(num, 0, value, 1600);
              }, i * 150);
            });
          }

          // metrics counters
          entry.target.querySelectorAll('[data-count]').forEach(m => {
            const target = +m.getAttribute('data-count');
            animateNumber(m, 0, target, 1800);
          });
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function animateNumber(el, from, to, duration) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- SCROLL PROGRESS + NAV STATE ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const nav = document.getElementById('nav');
  const timelineFill = document.getElementById('timelineFill');
  const timelineEl = document.querySelector('.timeline');

  function onScroll() {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / docHeight) * 100;
    scrollProgress.style.width = pct + '%';

    if (scrolled > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    // timeline fill — based on its position
    if (timelineEl && timelineFill) {
      const rect = timelineEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH * 0.5;
      const passed = viewportH * 0.5 - rect.top;
      const pct2 = Math.max(0, Math.min(100, (passed / total) * 100));
      timelineFill.style.height = pct2 + '%';
    }

    // hero parallax
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
      const visual = hero.querySelector('.hero__visual');
      const headline = hero.querySelector('.hero__headline');
      if (visual) visual.style.transform = `translateY(${scrolled * 0.15}px)`;
      if (headline) headline.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- 3D TILT on portrait ---------- */
  const tiltEl = document.querySelector('[data-tilt]');
  if (tiltEl) {
    tiltEl.addEventListener('mousemove', (e) => {
      const rect = tiltEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltEl.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });
    tiltEl.addEventListener('mouseleave', () => {
      tiltEl.style.transform = '';
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.style.opacity = '0.7';
    btn.querySelector('span').textContent = 'Sending…';
    setTimeout(() => {
      btn.style.opacity = '1';
      btn.querySelector('span').textContent = 'Send Message';
      formSuccess.classList.add('is-visible');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('is-visible'), 4500);
    }, 900);
  });

  /* ---------- BURGER (mobile) ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav__links');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    if (navLinks) {
      navLinks.style.display = navLinks.style.display === 'flex' ? '' : 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.right = '24px';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '16px';
      navLinks.style.background = 'rgba(7,7,11,0.92)';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.borderRadius = '18px';
      navLinks.style.border = '1px solid rgba(255,255,255,0.08)';
    }
  });

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth anchor scrolling (with offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
