// Fonction pour charger les composants HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Réinitialiser les événements du mode sombre après le chargement du header
        if (elementId === 'header-container') {
            document.getElementById('mode-toggle').onclick = () => {
                document.body.classList.toggle('dark-mode');
            };
        }
    } catch (error) {
        console.error('Erreur lors du chargement du composant:', error);
    }
}

// Charger le header quand le document est prêt
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', '/components/header.html');
}); 