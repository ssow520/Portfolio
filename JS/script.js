// ─── CUSTOM CURSOR ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ─── NAV SCROLL ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── SCROLL REVEAL ───────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── PROJECT MODAL ───────────────────────────────────────────
const projects = {
  friendbook: {
    num: '001',
    title: 'FriendBook',
    tag: 'C# / SQL Server',
    desc: 'Réseau social académique développé en ASP.NET WebForms. Fonctionnalités : inscription de membres, recherche d\'utilisateurs, validation d\'âge, requêtes SQL paramétrées et layout CSS personnalisé.',
    stack: ['C#', 'ASP.NET WebForms', 'SQL Server', 'HTML', 'CSS'],
    github: 'https://github.com/ssow520/FriendBook'
  },
  appmobile: {
    num: '002',
    title: 'Livraison',
    tag: 'Android / Java',
    desc: 'Application Android de gestion de livraison de journaux. Permet de gérer les livreurs, les lieux de livraison et les tournées. Développée avec Android Studio, XML pour les layouts et une architecture modulaire.',
    stack: ['Android', 'Java', 'XML', 'Android Studio', 'Mobile'],
    github: 'https://github.com/ssow520/Livraison_Android_app'
  },
  skillswap: {
    num: '003',
    title: 'SkillSwap',
    tag: 'Angular / REST API',
    desc: 'Marketplace freelance frontend connecté à une API REST hébergée sur DigitalOcean. Développé avec Angular 19, guards, interceptors HTTP et architecture de composants modulaires.',
    stack: ['Angular 19', 'TypeScript', 'REST API', 'DigitalOcean', 'Git'],
    github: 'https://github.com/ssow520/SkillSwap'
  },
  movieexplorer: {
    num: '004',
    title: 'MovieExplorerPro',
    tag: '.NET MAUI / C#',
    desc: 'Application mobile cross-platform de découverte de films utilisant l\'API TMDb. Développée avec le pattern MVVM, injection de dépendances, désérialisation JSON et navigation entre pages.',
    stack: ['.NET MAUI', 'C#', 'TMDb API', 'MVVM', 'XAML'],
    github: 'https://github.com/ssow520/MovieExplorerPro'
  },
  quizapp: {
    num: '005',
    title: 'Quiz App',
    tag: 'PHP / MySQL',
    desc: 'Application web de quiz multi-utilisateurs développée en PHP avec XAMPP. Deux types de comptes : administrateur (CRUD complet sur les quiz) et utilisateur (participation aux jeux, scores, statistiques et export des résultats en fichier téléchargeable).',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'XAMPP'],
    github: 'https://github.com/ssow520/QuizApp'
  },
  portfolio: {
    num: '006',
    title: 'Portfolio',
    tag: 'HTML / CSS / JS',
    desc: 'Ce portfolio — design éditorial dark avec typographie Syne, accent jaune-citron, curseur custom, animations scroll reveal et marquee. Entièrement vanilla, zéro framework.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub Pages'],
    github: 'https://github.com/ssow520/Portfolio',
    demo: 'https://ssow520.github.io/Portfolio'
  }
};

const overlay    = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal(key) {
  const p = projects[key];
  if (!p) return;

  document.getElementById('modalNum').textContent   = p.num;
  document.getElementById('modalTag').textContent   = p.tag;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent  = p.desc;

  const stackEl = document.getElementById('modalStack');
  stackEl.innerHTML = p.stack.map(s => `<span>${s}</span>`).join('');

  const linksEl = document.getElementById('modalLinks');
  linksEl.innerHTML = '';
  if (p.github) {
    linksEl.innerHTML += `<a href="${p.github}" target="_blank" class="link-github">GitHub →</a>`;
  }
  if (p.demo) {
    linksEl.innerHTML += `<a href="${p.demo}" target="_blank" class="link-demo">Démo live ↗</a>`;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('click', e => {
    e.preventDefault();
    openModal(row.dataset.project);
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});