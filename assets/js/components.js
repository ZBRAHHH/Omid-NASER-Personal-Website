/**
 * Charge un composant HTML de manière asynchrone
 * @param {string} elementId - L'ID de l'élément où charger le composant
 * @param {string} componentPath - Le chemin vers le fichier du composant
 * @returns {Promise<void>}
 */
async function loadComponent(elementId, componentPath) {
    try {
        // Déterminer le chemin de base pour les composants
        let basePath = '';
        // Si nous sommes dans un sous-dossier (comme articles/), ajuster le chemin
        if (window.location.pathname.includes('/articles/')) {
            basePath = '../';
        }

        const response = await fetch(basePath + componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Réinitialiser les événements du mode sombre après le chargement du header
        if (elementId === 'header-container') {
            initializeThemeSwitch();
            // Charger le script main.js pour le menu mobile
            const mainScript = document.createElement('script');
            mainScript.src = basePath + 'assets/js/main.js';
            document.body.appendChild(mainScript);
        }
    } catch (error) {
        console.error('Erreur lors du chargement du composant:', error);
    }
}

/**
 * Initialise le switch de thème
 * Gère l'état du thème sombre/clair
 */
function initializeThemeSwitch() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const checkbox = document.getElementById('checkbox');
    
    if (checkbox) {
        checkbox.checked = isDarkMode;
        
        checkbox.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
        });
    }
}

// Charger le header quand le document est prêt
document.addEventListener('DOMContentLoaded', () => {
    // Déterminer le chemin correct pour le header
    let headerPath = 'components/header.html';
    loadComponent('header-container', headerPath);
}); 