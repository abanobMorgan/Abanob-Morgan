function toggleSkills(element) {
  const subSkills = element.parentElement.querySelector('.sub-skills');
  const titleWrapper = element;
  
  subSkills.classList.toggle('hidden');
  titleWrapper.classList.toggle('expanded');
}

