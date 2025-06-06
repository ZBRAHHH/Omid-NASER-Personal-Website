// Chargement des dépendances
document.write('<script src="assets/js/dependencies.js"></script>');

// Fonction pour déterminer le chemin de base
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/templates/')) {
        return '../../';
    } else if (path.includes('/articles/')) {
        return '../';
    }
    return '';
}

// Fonction pour charger les composants HTML
async function loadComponent(elementId, componentPath) {
    try {
        const basePath = getBasePath();
        const response = await fetch(basePath + componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let html = await response.text();
        
        // Remplacer la variable basePath dans les liens
        html = html.replace(/\${basePath}/g, basePath);
        
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;

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
        } else {
            console.error(`Element with ID '${elementId}' not found`);
        }
    } catch (error) {
        console.error('Erreur lors du chargement du composant:', error);
    }
}

// Charger les composants quand le document est prêt
document.addEventListener('DOMContentLoaded', () => {
    const basePath = getBasePath();
    // Charger le header
    loadComponent('header-container', basePath + 'components/header.html');
    // Charger le footer
    loadComponent('footer-placeholder', basePath + 'components/footer.html');
}); 