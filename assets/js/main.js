/**
 * Gestionnaire d'erreurs global
 * Capture et log les erreurs non gérées
 */
window.addEventListener('error', function(event) {
  console.error('Erreur globale:', event.error);
  // Ici tu pourrais ajouter un système de reporting d'erreurs
});

/**
 * Initialise le menu mobile
 * Gère l'ouverture/fermeture du menu et les interactions
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initialisation du menu mobile...');
  
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (!menuToggle || !nav) {
    console.error('Éléments du menu mobile non trouvés:', { menuToggle, nav });
    return;
  }

  console.log('Éléments du menu trouvés, ajout des écouteurs...');

  /**
   * Bascule l'état du menu mobile
   */
  menuToggle.addEventListener('click', function() {
    console.log('Clic sur le menu toggle');
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  /**
   * Ferme le menu mobile lors du clic sur un lien
   */
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('Clic sur un lien du menu');
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  console.log('Menu mobile initialisé avec succès');
});
