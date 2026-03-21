const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('serviceSearch');
const serviceCards = Array.from(document.querySelectorAll('.service-card'));
const emptyState = document.getElementById('emptyState');

function setTheme(theme) {
  body.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('guia-theme', theme);
}

const savedTheme = localStorage.getItem('guia-theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  setTheme(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(current);
});

function filterServices() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  serviceCards.forEach((card) => {
    const haystack = (card.dataset.search || '').toLowerCase();
    const match = !query || haystack.includes(query);
    card.hidden = !match;
    if (match) visible += 1;
  });
  emptyState.hidden = visible !== 0;
}

searchInput.addEventListener('input', filterServices);
filterServices();
