// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Fermer le menu quand on clique sur un lien
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
});
