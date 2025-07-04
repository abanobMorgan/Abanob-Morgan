const section = "about";
function loadSection(section, section_id) {
  console.log(`Loading section: ${section}`);
  fetch(`./webpage/${section}.html`)
    .then(response => {
      console.log(`Fetched ./webpage/${section}.html, status: ${response.status}`);
      return response.text();
    })
    .then(html => {
      const container = document.getElementById(section_id);
      if (container) {
        container.innerHTML = html;
        console.log(`Loaded content into #${section_id}`);
      } else {
        console.warn(f`Container #${section_id} not found!`);
      }
    })
    .catch(error => {
      console.error(`Error loading section ${section}:`, error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  loadSection(section, `${section}-content-section`);


});

document.querySelectorAll('.navbar-link').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.navbar-link').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const section = this.getAttribute('data-section');
    console.log(`Navbar clicked: ${section}`);
  })});
  

  