// Chargement des dépendances
document.write('<script src="./dependencies.js"></script>');

// Cache pour les composants
const componentCache = new Map();

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
        
        // Vérifier si le composant est déjà en cache
        if (componentCache.has(componentPath)) {
            const html = componentCache.get(componentPath);
            insertComponent(elementId, html, basePath);
            return;
        }

        const response = await fetch(basePath + componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Mettre en cache le composant
        componentCache.set(componentPath, html);
        
        insertComponent(elementId, html, basePath);
    } catch (error) {
        console.error('Erreur lors du chargement du composant:', error);
    }
}

// Fonction pour insérer le composant dans le DOM
function insertComponent(elementId, html, basePath) {
    const element = document.getElementById(elementId);
    if (element) {
        // Remplacer la variable basePath dans les liens
        const processedHtml = html.replace(/\${basePath}/g, basePath);
        element.innerHTML = processedHtml;

        // Réinitialiser les événements du mode sombre après le chargement du header
        if (elementId === 'header-container') {
            initializeDarkMode();
        }
    }
}

// Fonction pour initialiser le mode sombre
function initializeDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const checkbox = document.getElementById('checkbox');
    
    if (checkbox) {
        checkbox.checked = isDarkMode;
        checkbox.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
        });
    }
}

// Charger les composants en parallèle
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting component loading');
    const basePath = getBasePath();
    
    // Charger le header et le footer en parallèle
    Promise.all([
        loadComponent('header-container', basePath + 'components/header.html'),
        loadComponent('footer-placeholder', basePath + 'components/footer.html')
    ]).catch(error => {
        console.error('Erreur lors du chargement des composants:', error);
    });
}); 