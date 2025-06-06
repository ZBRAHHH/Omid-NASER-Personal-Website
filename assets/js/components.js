// Chargement des dépendances
document.write('<script src="./dependencies.js"></script>');

// Fonction pour déterminer le chemin de base
function getBasePath() {
    const path = window.location.pathname;
    console.log('Current path:', path);
    if (path.includes('/templates/')) {
        console.log('Using template path');
        return '../../';
    } else if (path.includes('/articles/')) {
        console.log('Using articles path');
        return '../';
    }
    console.log('Using root path');
    return '';
}

// Fonction pour charger les composants HTML
async function loadComponent(elementId, componentPath) {
    try {
        const basePath = getBasePath();
        console.log(`Loading component: ${elementId} from ${basePath + componentPath}`);
        
        const response = await fetch(basePath + componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let html = await response.text();
        console.log(`Component ${elementId} loaded successfully`);
        
        // Remplacer la variable basePath dans les liens
        html = html.replace(/\${basePath}/g, basePath);
        
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            console.log(`Component ${elementId} inserted into DOM`);

            // Réinitialiser les événements du mode sombre après le chargement du header
            if (elementId === 'header-container') {
                console.log('Initializing dark mode for header');
                // Vérifier si le mode sombre est déjà activé
                const isDarkMode = document.body.classList.contains('dark-mode');
                const checkbox = document.getElementById('checkbox');
                
                // Si le mode sombre est activé, cocher la case
                if (checkbox) {
                    checkbox.checked = isDarkMode;
                    console.log('Dark mode checkbox initialized:', isDarkMode);
                    
                    // Ajouter l'écouteur d'événement pour le changement de thème
                    checkbox.addEventListener('change', function() {
                        document.body.classList.toggle('dark-mode');
                        console.log('Dark mode toggled:', document.body.classList.contains('dark-mode'));
                    });
                } else {
                    console.warn('Dark mode checkbox not found');
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
    console.log('DOM Content Loaded - Starting component loading');
    const basePath = getBasePath();
    // Charger le header
    loadComponent('header-container', basePath + 'components/header.html');
    // Charger le footer
    loadComponent('footer-placeholder', basePath + 'components/footer.html');
}); 