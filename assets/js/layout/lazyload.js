const sections = ['about', 'blog', 'contact', 'portfolio', 'resume'];
const loadedSections = new Set();

function loadSection(section) {
  const sectionId = `${section}-content-section`;
  const container = document.getElementById(sectionId);

  if (!container) {
    console.warn(`❌ Container not found: #${sectionId}`);
    return;
  }

  // Step 1: Hide all other sections
  sections.forEach(sec => {
    const el = document.getElementById(`${sec}-content-section`);
    if (el) el.style.display = 'none';
  });

  // Step 2: Show current section container
  container.style.display = 'block'; // ✅ Show this section

  // Step 3: Load HTML if not already loaded
  if (!loadedSections.has(section)) {
    fetch(`./webpage/${section}.html`)
      .then(response => {
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;

        // ✅ Inject .active into the loaded <article> element
        const article = container.querySelector('article');
        if (article && article.dataset.page === section) {
          article.classList.add('active');
        }
        loadedSections.add(section);
      })
      .catch(error => {
        console.error(`Error loading section ${section}:`, error);
      });
  } else {
    // ✅ Ensure the article is visible (re-activate if previously hidden)
    const article = container.querySelector('article');
    if (article) article.classList.add('active');
  }
}

// Initial load
loadSection('about');

// Handle navbar clicks
document.querySelectorAll('.navbar-link').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.navbar-link').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const section = this.getAttribute('data-section');
    loadSection(section);
  });
});
