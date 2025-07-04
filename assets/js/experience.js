function toggleExperience(header) {
  const details = header.nextElementSibling;
  const icon = header.querySelector('.expand-icon');
  details.classList.toggle('hidden');
  icon.classList.toggle('expanded');
}