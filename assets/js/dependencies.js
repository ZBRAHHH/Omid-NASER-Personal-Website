// Gestion des dépendances externes
function loadExternalScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Chargement de marked.js
async function loadMarkedJS() {
    try {
        await loadExternalScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
        console.log('marked.js chargé avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement de marked.js:', error);
    }
}

// Chargement de toutes les dépendances
async function loadDependencies() {
    await loadMarkedJS();
    // Ajouter ici d'autres dépendances si nécessaire
}

// Chargement au démarrage
document.addEventListener('DOMContentLoaded', loadDependencies); 