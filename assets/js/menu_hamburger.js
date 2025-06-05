// Gestion du menu hamburger
document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour initialiser le menu une fois que les éléments sont présents
  function initializeMenu() {
    // Sélection des éléments
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.menu-overlay');
    const closeButton = document.querySelector('.close-menu-button'); // Sélection du bouton de fermeture

    // Vérification que tous les éléments sont présents. Si non, on sort.
    if (!menuToggle || !nav || !overlay || !closeButton) { // Ajouter le bouton de fermeture à la vérification
      console.error('Éléments du menu non trouvés. Réessaie dans un instant...', { menuToggle: menuToggle, nav: nav, overlay: overlay, closeButton: closeButton });
      // Optionnellement, on peut réessayer après un court délai si on pense qu'ils seront ajoutés dynamiquement
      setTimeout(initializeMenu, 200); // Augmenter légèrement le délai
      return;
    }

    console.log('Éléments du menu trouvés : ', { menuToggle: menuToggle, nav: nav, overlay: overlay, closeButton: closeButton });

    // Fonction pour ouvrir/fermer le menu
    function toggleMenu() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      console.log('Classe active basculée. Nav active:', nav.classList.contains('active'));
      // Optionnel: gérer le scroll du body pour empêcher le défilement lorsque le menu est ouvert
      // document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    // Événements
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Clic sur menuToggle');
      toggleMenu();
    });

    overlay.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Clic sur overlay');
      if (nav.classList.contains('active')) {
        toggleMenu();
      }
    });

    // Ajouter un écouteur d'événement pour le bouton de fermeture
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Clic sur le bouton de fermeture');
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Fermer le menu au clic sur un lien
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Clic sur lien de navigation');
        if (nav.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        console.log('Touche Escape pressée');
        toggleMenu();
      }
    });

    console.log('Menu hamburger initialisé avec succès.');
  }

  // Appeler la fonction d'initialisation lorsque le DOM est complètement chargé
  // Un petit délai est ajouté au cas où les éléments sont injectés dynamiquement après DOMContentLoaded
  setTimeout(initializeMenu, 100); // Délai pour les éléments chargés dynamiquement
}); 