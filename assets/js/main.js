// Utility to load HTML into a container by ID
function loadSection(section, containerId) {
  fetch(`./webpage/${section}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
    });
}

// Example: Load 'about' section into #main-content on page load
document.addEventListener('DOMContentLoaded', function() {
  // Default load 'about' or 'home' section
  loadSection('about', 'main-content');

  // Navigation event listeners
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      loadSection(section, 'main-content');
      // Optionally, update active class
      document.querySelectorAll('.navbar-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});