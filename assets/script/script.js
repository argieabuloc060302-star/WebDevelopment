/* ============================================================
   ARGIE BENEDICT ABULOC — PORTFOLIO JS
   ============================================================ */

'use strict';

// ──────────────────────────────────────────
// DATA
// ──────────────────────────────────────────

const codingSkills = [
  {
    icon: '🌐',
    name: 'HTML5',
    desc: 'Semantic, structured, accessible markup. I treat HTML as the skeleton of every great web experience — clean and meaningful from the ground up.',
    pct: 88,
    color: '#e44d26',
  },
  {
    icon: '🎨',
    name: 'CSS3',
    desc: 'Flexbox, Grid, custom properties, animations. I turn static screens into polished, responsive, and visually memorable experiences.',
    pct: 85,
    color: '#264de4',
  },
  {
    icon: '⚡',
    name: 'JavaScript',
    desc: 'DOM logic, event-driven programming, and async flows. The language that makes the web come alive — and the one I reach for first.',
    pct: 80,
    color: '#f7df1e',
  },
  {
    icon: '🐍',
    name: 'Python',
    desc: 'Scripting, automation, and data handling. Python\'s clean syntax makes complex logic elegant — great for quick tools and backend experiments.',
    pct: 72,
    color: '#3776ab',
  },
  {
    icon: '☕',
    name: 'Java',
    desc: 'Object-oriented architecture, class design, and structured problem solving. A strong foundation in typing and application flow.',
    pct: 68,
    color: '#b07219',
  },
  {
    icon: '🔷',
    name: 'C#',
    desc: 'Comfortable in the .NET ecosystem. Building logic-driven, statically-typed applications with clarity and expressiveness.',
    pct: 64,
    color: '#9b59b6',
  },
];

const nocodeSkills = [
  {
    logo: '🏗️',
    name: 'WordPress',
    tagline: 'CMS & Publishing Platform',
    desc: 'Building content-driven websites and blogs at speed. I work with themes, plugins, and custom post types to deliver powerful, client-ready sites without starting from scratch.',
    tags: ['CMS', 'Themes', 'Plugins', 'WooCommerce', 'SEO'],
    color: '#21759b',
  },
  {
    logo: '⚙️',
    name: 'Bubble.io',
    tagline: 'Visual App Builder',
    desc: 'Prototyping and launching full-stack web apps visually. Bubble lets me build databases, user auth, and complex workflows — no backend code required.',
    tags: ['App Builder', 'Database', 'Workflows', 'APIs', 'MVP'],
    color: '#0066ff',
  },
  {
    logo: '🌊',
    name: 'Webflow',
    tagline: 'Visual Web Design Tool',
    desc: 'Designing and publishing production-grade websites with full creative control. Webflow bridges the gap between design and code — I use it for client sites and landing pages.',
    tags: ['Visual Design', 'CMS', 'Interactions', 'Hosting', 'Responsive'],
    color: '#4353ff',
  },
];

// ──────────────────────────────────────────
// CURSOR
// ──────────────────────────────────────────

const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = -100, mouseY = -100;
let ringX  = -100, ringY  = -100;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

// ──────────────────────────────────────────
// THEME TOGGLE
// ──────────────────────────────────────────

const html      = document.documentElement;
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

let currentTheme = localStorage.getItem('aba-theme') || 'dark';
applyTheme(currentTheme);

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('aba-theme', currentTheme);
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
}

// ──────────────────────────────────────────
// NAVBAR SCROLL
// ──────────────────────────────────────────

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ──────────────────────────────────────────
// SCROLL REVEAL
// ──────────────────────────────────────────

const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.dataset.delay = i * 60;
  revealObserver.observe(el);
});

// ──────────────────────────────────────────
// RENDER CODING SKILLS
// ──────────────────────────────────────────

function renderCodingSkills() {
  const container = document.getElementById('codingSkills');
  if (!container) return;

  container.innerHTML = codingSkills.map((skill, i) => `
    <div class="skill-card" data-reveal style="--delay:${i * 80}ms">
      <div class="skill-card-top">
        <div class="skill-icon-wrap">${skill.icon}</div>
        <span class="skill-pct">${skill.pct}%</span>
      </div>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-desc">${skill.desc}</div>
      <div class="skill-bar-wrap">
        <div class="skill-bar" data-pct="${skill.pct}"
          style="width:0%; background:linear-gradient(90deg, ${skill.color}cc, ${skill.color})">
        </div>
      </div>
    </div>
  `).join('');

  // Animate bars on scroll
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) {
          setTimeout(() => {
            bar.style.width = bar.dataset.pct + '%';
          }, 200);
        }
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  container.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
    revealObserver.observe(card);
    barObserver.observe(card);
  });
}

// ──────────────────────────────────────────
// RENDER NO-CODE SKILLS
// ──────────────────────────────────────────

function renderNocodeSkills() {
  const container = document.getElementById('nocodeSkills');
  if (!container) return;

  container.innerHTML = nocodeSkills.map((tool, i) => `
    <div class="nocode-card" style="--bar-color:${tool.color}">
      <div class="nocode-header">
        <div class="nocode-logo">${tool.logo}</div>
        <div>
          <div class="nocode-name">${tool.name}</div>
          <div class="nocode-tagline">${tool.tagline}</div>
        </div>
      </div>
      <div class="nocode-desc">${tool.desc}</div>
      <div class="nocode-tags">
        ${tool.tags.map(t => `<span class="ntag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.nocode-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
    revealObserver.observe(card);
  });
}

// ──────────────────────────────────────────
// TYPED CODE CARD
// ──────────────────────────────────────────

const CODE_LINES = [
  `<span class="c-muted">{</span>`,
  `  <span class="c-key">"name"</span>: <span class="c-str">"Argie Benedict Abuloc"</span>,`,
  `  <span class="c-key">"role"</span>: <span class="c-str">"Aspiring Full-Stack Developer"</span>,`,
  `  <span class="c-key">"location"</span>: <span class="c-str">"Philippines 🇵🇭"</span>,`,
  `  <span class="c-key">"stack"</span>: [`,
  `    <span class="c-str">"HTML"</span>, <span class="c-str">"CSS"</span>, <span class="c-str">"JavaScript"</span>,`,
  `    <span class="c-str">"Python"</span>, <span class="c-str">"Java"</span>, <span class="c-str">"C#"</span>`,
  `  ],`,
  `  <span class="c-key">"noCode"</span>: [<span class="c-str">"WordPress"</span>, <span class="c-str">"Bubble.io"</span>, <span class="c-str">"Webflow"</span>],`,
  `  <span class="c-key">"openToWork"</span>: <span class="c-bool">true</span>,`,
  `  <span class="c-key">"coffee"</span>: <span class="c-bool">true</span>`,
  `<span class="c-muted">}</span>`,
];

function initCodeCard() {
  const codeBody = document.getElementById('codeBody');
  if (!codeBody) return;

  let revealed = false;

  const codeObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !revealed) {
      revealed = true;
      typeCodeLines(codeBody, CODE_LINES);
      codeObserver.disconnect();
    }
  }, { threshold: 0.3 });

  codeObserver.observe(codeBody);
}

function typeCodeLines(container, lines) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'c-cursor';

  function addLine() {
    if (i >= lines.length) {
      cursor.remove();
      return;
    }

    const div = document.createElement('div');
    div.innerHTML = lines[i];
    container.appendChild(div);
    container.appendChild(cursor);

    i++;
    setTimeout(addLine, 90);
  }

  setTimeout(addLine, 400);
}

// ──────────────────────────────────────────
// ACTIVE NAV LINK ON SCROLL
// ──────────────────────────────────────────

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((section) => navObserver.observe(section));
}

// ──────────────────────────────────────────
// SMOOTH SCROLL FOR NAV
// ──────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderCodingSkills();
  renderNocodeSkills();
  initCodeCard();
  initActiveNav();
});