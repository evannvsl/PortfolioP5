/* ============================================================
   0. HELPERS
   ============================================================ */
const SCRAMBLE_CHARS = '!<>-_\/[]{}—=+*^?#$%01';
const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrambleText(el, opts = {}) {
  if (!el) return;
  const speedMul = opts.speed || 1;
  const original = el.dataset.original || (el.dataset.original = el.textContent);
  let frame = 0;
  const length = original.length;
  const queue = [];
  for (let i = 0; i < length; i++) {
    const start = Math.floor(Math.random() * 8 * speedMul);
    const end = start + Math.floor(Math.random() * 10 * speedMul) + 5;
    queue.push({ to: original[i], start, end, char: '' });
  }
  cancelAnimationFrame(el._scrambleRAF);

  function update() {
    let out = ''; let done = 0;
    for (const q of queue) {
      if (frame >= q.end) { out += q.to; done++; }
      else if (frame >= q.start) {
        if (!q.char || Math.random() < 0.35) q.char = q.to === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        out += q.char;
      } else { out += q.to === ' ' ? ' ' : '\u00A0'; }
    }
    el.textContent = out; frame++;
    if (done < queue.length) el._scrambleRAF = requestAnimationFrame(update);
    else el.textContent = original;
  }
  update();
}

function wrapLeadingText(el) {
  if (!el) return null;
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      const span = document.createElement('span');
      span.className = 'scramble-target';
      span.textContent = node.textContent;
      el.replaceChild(span, node);
      return span;
    }
  }
  return null;
}

// /* ============================================================
//    1. PRELOADER
//    ============================================================ */
// (function preloader() {
//   const pre = document.getElementById('preloader');
//   const num = document.getElementById('preNum');
//   const barFill = document.getElementById('preBarFill');
//   const label = document.querySelector('.pre-label');
//   if (!pre || !num) return;

//   const statuses = ['INITIALIZING', 'LOADING SYSTEM', 'SECURITY CHECK', 'DECRYPTING'];
//   let statusIndex = 0;
//   if (label) label.textContent = statuses[0];
//   const statusIv = setInterval(() => {
//     statusIndex = (statusIndex + 1) % statuses.length;
//     if (label) label.textContent = statuses[statusIndex];
//   }, 600);

//   const totalDuration = 2500;
//   const stepTime = 45;
//   const steps = totalDuration / stepTime;
//   let step = 0;

//   const iv = setInterval(() => {
//     step++;
//     const progress = Math.min(1, step / steps);
//     const eased = 1 - Math.pow(1 - progress, 3);
//     const count = Math.floor(eased * 100);
//     num.textContent = String(count).padStart(2, '0');
//     if (barFill) barFill.style.width = count + '%';
//     if (progress >= 1) {
//       clearInterval(iv); clearInterval(statusIv);
//       if (label) label.textContent = 'READY';
//     }
//   }, stepTime);

//   window.addEventListener('load', () => {
//     setTimeout(() => pre.classList.add('done'), totalDuration + 300);
//   });
// })();

/* ============================================================
   2. CURSOR
   ============================================================ */
(function cursor() {
  if (IS_MOBILE) return;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (isTouch) return;
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });
  function loop() {
    ringX += (mouseX - ringX) * 0.18; ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .work-card, .magnetic, .input-send').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });
})();

/* ============================================================
   3. MAGNETIC
   ============================================================ */
(function magnetic() {
  if (IS_MOBILE) return;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (isTouch) return;
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });
})();

/* ============================================================
   4. WORK CARD TILT
   ============================================================ */
(function tilt() {
  if (IS_MOBILE) return;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (isTouch) return;
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ============================================================
   5. MOBILE MENU — FIXED
   ============================================================ */
(function mobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;
  let scrollY = 0;

  function openMenu() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0'; document.body.style.right = '0';
    toggle.classList.add('open'); menu.classList.add('open');
  }
  function closeMenu() {
    document.body.style.position = ''; document.body.style.top = '';
    document.body.style.left = ''; document.body.style.right = '';
    window.scrollTo(0, scrollY);
    toggle.classList.remove('open'); menu.classList.remove('open');
  }
  toggle.addEventListener('click', () => { menu.classList.contains('open') ? closeMenu() : openMenu(); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 800 && menu.classList.contains('open')) closeMenu(); });
})();

/* ============================================================
   6. HEADER SCROLL
   ============================================================ */
(function headerScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { header.classList.toggle('scrolled', window.scrollY > 40); ticking = false; });
  }, { passive: true });
})();

/* ============================================================
   7. REVEAL + HERO
   ============================================================ */
(function revealVariety() {
  function addVariant(selector, variant) {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal', `reveal-${variant}`));
  }
  function staggerVariant(selector, variant, stepMs) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal', `reveal-${variant}`);
      el.style.transitionDelay = `${i * stepMs}ms`;
    });
  }
  addVariant('.about-copy', 'right');
  addVariant('.about-visual', 'left');
  staggerVariant('.hero-cta .btn', 'scale', 110);
  staggerVariant('.contact-socials a', 'up', 90);

  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    const outer = document.createElement('span');
    outer.className = 'line-inner';
    while (line.firstChild) outer.appendChild(line.firstChild);
    line.appendChild(outer);
    const target = wrapLeadingText(outer);
    if (target) setTimeout(() => scrambleText(target, { speed: 1.4 }), i * 220 + 400);
  });
})();

/* ============================================================
   8. SPLIT WORDS
   ============================================================ */
(function splitHeadings() {
  function prepareManualWords(el) {
    const words = el.querySelectorAll(':scope > .word');
    words.forEach((w, i) => {
      if (!w.querySelector(':scope > .word-inner')) {
        const inner = document.createElement('span');
        inner.className = 'word-inner';
        while (w.firstChild) inner.appendChild(w.firstChild);
        w.appendChild(inner);
      }
      w.querySelector(':scope > .word-inner').style.transitionDelay = `${i * 50}ms`;
    });
    el.classList.add('split');
  }
  function splitWords(el) {
    if (el.querySelector(':scope > .word')) { prepareManualWords(el); return; }
    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach(part => {
          if (part.trim() === '') el.appendChild(document.createTextNode(part));
          else {
            const wrap = document.createElement('span'); wrap.className = 'word';
            const inner = document.createElement('span'); inner.className = 'word-inner'; inner.textContent = part;
            wrap.appendChild(inner); el.appendChild(wrap);
          }
        });
      } else if (node.nodeName === 'BR') el.appendChild(node.cloneNode());
      else {
        const wrap = document.createElement('span'); wrap.className = 'word';
        const inner = document.createElement('span'); inner.className = 'word-inner';
        inner.appendChild(node.cloneNode(true)); wrap.appendChild(inner); el.appendChild(wrap);
      }
    });
    el.querySelectorAll('.word-inner').forEach((w, i) => w.style.transitionDelay = `${i * 50}ms`);
    el.classList.add('split');
  }
  document.querySelectorAll('.section-heading, .contact-heading, .about-statement').forEach(splitWords);
})();

/* ============================================================
   9. SCRAMBLE HOVER
   ============================================================ */
(function textScrambleHover() {
  const wrapped = [];
  document.querySelectorAll('.logo').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('nav.menu a').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.btn').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.work-link').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.contact-email').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.contact-socials a').forEach(el => wrapped.push(wrapLeadingText(el)));
  const toTop = document.querySelector('footer .to-top');
  if (toTop) wrapped.push(wrapLeadingText(toTop));

  wrapped.filter(Boolean).forEach(span => {
    const trigger = span.closest('a, button') || span;
    trigger.addEventListener('mouseenter', () => scrambleText(span));
  });
  document.querySelectorAll('.work-card').forEach(card => {
    const h3 = card.querySelector('h3');
    const span = wrapLeadingText(h3);
    if (span) card.addEventListener('mouseenter', () => scrambleText(span));
  });
})();

/* ============================================================
   10. SCROLL REVEAL
   ============================================================ */
(function scrollReveal() {
  const els = document.querySelectorAll('.reveal, .spec-row, .contact-socials a, .work-card, .split');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in');
        if (el.classList.contains('split')) {
          el.querySelectorAll('.word-inner').forEach((w, i) => {
            if (w.children.length === 0) setTimeout(() => scrambleText(w), i * 55);
          });
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* ============================================================
   11. BG GLOW
   ============================================================ */
(function bgGlow() {
  const glow = document.getElementById('bg-glow');
  if (!glow || IS_MOBILE || PREFERS_REDUCED) return;
  let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, running = true;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth; mouseY = e.clientY / window.innerHeight;
  });
  document.addEventListener('visibilitychange', () => {
    running = document.visibilityState === 'visible';
    if (running) animateGlow();
  });
  function animateGlow() {
    if (!running) return;
    currentX += (mouseX * 80 - currentX) * 0.03;
    currentY += (mouseY * 80 - currentY) * 0.03;
    glow.style.transform = `translate(${currentX}%, ${currentY}%)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

/* ============================================================
   12. MATRIX
   ============================================================ */
(function matrixCode() {
  const el = document.getElementById('matrixCode');
  if (!el || IS_MOBILE) return;
  const chars = '0123456789ABCDEF';
  const lines = 12;
  function generate() {
    let code = '';
    for (let i = 0; i < lines; i++) {
      let line = '';
      for (let j = 0; j < 16; j++) line += chars[Math.floor(Math.random() * chars.length)];
      code += line + '<br>';
    }
    el.innerHTML = code;
  }
  generate(); setInterval(generate, 1800);
})();

/* ============================================================
   13. PARTICLES
   ============================================================ */
(function particles() {
  const bgLayer = document.getElementById('bg-layer');
  if (!bgLayer || PREFERS_REDUCED) return;
  const container = document.createElement('div');
  container.className = 'particle-container';
  bgLayer.appendChild(container);
  const count = IS_MOBILE ? 15 : 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    const size = 2 + Math.random() * 4;
    p.style.width = size + 'px'; p.style.height = size + 'px';
    container.appendChild(p);
  }
})();

/* ============================================================
   14. CHAT ANIMATION
   ============================================================ */
(function chatAnimation() {
  const bubbles = document.querySelectorAll('.chat-bubble');
  if (!bubbles.length) return;
  bubbles.forEach((b, i) => b.style.animationDelay = `${i * 0.12}s`);
})();

/* ============================================================
   15. THRILL EFFECTS
   ============================================================ */
(function thrillEffects() {
  if (PREFERS_REDUCED) return;
  const breach = document.getElementById('breach-overlay');
  const chromatic = document.getElementById('chromatic-layer');

  function triggerBreach() {
    if (breach) { breach.classList.remove('active'); void breach.offsetWidth; breach.classList.add('active'); }
    setTimeout(triggerBreach, 6000 + Math.random() * 8000);
  }
  function triggerChromatic() {
    if (chromatic) { chromatic.classList.remove('active'); void chromatic.offsetWidth; chromatic.classList.add('active'); }
    setTimeout(triggerChromatic, 9000 + Math.random() * 10000);
  }
  setTimeout(triggerBreach, 4000);
  setTimeout(triggerChromatic, 7000);
})();

/* ============================================================
   16. SCREEN SHAKE
   ============================================================ */
(function screenShake() {
  if (PREFERS_REDUCED || IS_MOBILE) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.addEventListener('click', (e) => {
    if (e.target.closest('a, button')) return;
    document.body.style.animation = 'none'; void document.body.offsetWidth;
    document.body.style.animation = 'screenShake 0.3s cubic-bezier(.36,.07,.19,.97) both';
    setTimeout(() => document.body.style.animation = '', 300);
  });
  const style = document.createElement('style');
  style.textContent = `
    @keyframes screenShake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
      40%, 60% { transform: translate3d(3px, 0, 0); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   17. CUT-IN PARALLAX
   ============================================================ */
(function cutinParallax() {
  if (IS_MOBILE || PREFERS_REDUCED) return;
  const cutin = document.getElementById('cutinImg');
  if (!cutin) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    cutin.style.transform = `translateY(${scrolled * 0.15}px)`;
  }, { passive: true });
})();

/* ============================================================
   18. FLOATING POKER CARDS
   ============================================================ */
(function floatingPokerCards() {
  if (IS_MOBILE || PREFERS_REDUCED) return;
  const container = document.getElementById('pokerCardsContainer');
  if (!container) return;

  const pokerCards = ['🂡','🂢','🂣','🂤','🂥','🂦','🂧','🂨','🂩','🂪','🂫','🂬','🂮','🂱','🂲','🂳','🂴','🂵','🂶','🂷','🂸','🂺','🂻','🂼','🂽','🂾','🃁','🃂','🃃','🃄','🃅','🃆','🃇','🃈','🃉','🃊','🃋','🃌','🃍','🃎','🃑','🃒','🃓','🃔','🃕','🃖','🃗','🃘','🃙','🃚','🃛','🃜','🃝','🃞'];

  const count = 25;

  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'poker-card-float';
    card.textContent = pokerCards[Math.floor(Math.random() * pokerCards.length)];

    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 8 + Math.random() * 12;
    const size = 30 + Math.random() * 40;

    card.style.left = `${left}%`;
    card.style.animationDelay = `${delay}s`;
    card.style.animationDuration = `${duration}s`;
    card.style.fontSize = `${size}px`;

    container.appendChild(card);
  }
})();