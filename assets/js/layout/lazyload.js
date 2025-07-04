const sections = ['about', 'blog', 'contact', 'portfolio', 'resume'];
const loadedSections = new Set();
function loadSection(section) {
  const sectionId = `${section}-content-section`;
  const container = document.getElementById(sectionId);

  // Step 1: Hide all other sections
  const allSections = ['about', 'resume', 'portfolio', 'blog', 'contact'];
  allSections.forEach(sec => {
    const el = document.getElementById(`${sec}-content-section`);
    if (el) el.style.display = 'none';
  });

  // Step 2: Show current section container
  if (container) {
    container.style.display = 'block';  // 👈 Show the section
  }

  // Step 3: Load only if not already loaded
  if (!loadedSections.has(section)) {
    console.log(`Loading section: ${section}`);
    fetch(`./webpage/${section}.html`)
      .then(response => {
        console.log(`Fetched ./webpage/${section}.html, status: ${response.status}`);
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
        loadedSections.add(section);
        console.log(`Loaded content into #${sectionId}`);
      })
      .catch(error => {
        console.error(`Error loading section ${section}:`, error);
      });
  }
}


document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');
  loadSection('about'); // Load default section
});

document.querySelectorAll('.navbar-link').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.navbar-link').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const section = this.getAttribute('data-section');
    console.log(`Navbar clicked: ${section}`);
    loadSection(section);
  });
});
