// Chargement des dépendances
document.write('<script src="assets/js/dependencies.js"></script>');

// Fonction pour charger les composants HTML
async function loadComponent(elementId, componentPath) {
    try {
        // Déterminer le chemin de base pour les composants
        let basePath = '';
        // Si nous sommes dans un sous-dossier (comme articles/), ajuster le chemin
        if (window.location.pathname.includes('/articles/')) {
            basePath = '../';
        }

        const response = await fetch(basePath + componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Réinitialiser les événements du mode sombre après le chargement du header
        if (elementId === 'header-container') {
            // Vérifier si le mode sombre est déjà activé
            const isDarkMode = document.body.classList.contains('dark-mode');
            const checkbox = document.getElementById('checkbox');
            
            // Si le mode sombre est activé, cocher la case
            if (checkbox) {
                checkbox.checked = isDarkMode;
                
                // Ajouter l'écouteur d'événement pour le changement de thème
                checkbox.addEventListener('change', function() {
                    document.body.classList.toggle('dark-mode');
                });
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement du composant:', error);
    }
}

// Charger le header quand le document est prêt
document.addEventListener('DOMContentLoaded', () => {
    // Déterminer le chemin correct pour le header
    let headerPath = 'components/header.html';
    loadComponent('header-container', headerPath);

    // Charger le footer quand le document est prêt
    let footerPath = 'components/footer.html';
    loadComponent('footer-placeholder', footerPath);
}); 