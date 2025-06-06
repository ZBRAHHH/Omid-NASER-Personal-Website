/**
 * Extrait le frontmatter d'un contenu Markdown
 * @param {string} content - Le contenu Markdown complet
 * @returns {Object} Un objet contenant le frontmatter et le contenu
 */
function extractFrontmatter(content) {
    // Vérifier si le contenu commence par ---
    if (!content.trim().startsWith('---')) {
        return { frontmatter: {}, content };
    }

    // Trouver la fin du frontmatter
    const endIndex = content.indexOf('---', 3);
    if (endIndex === -1) {
        return { frontmatter: {}, content };
    }

    // Extraire le frontmatter et le contenu
    const frontmatterText = content.substring(3, endIndex).trim();
    const markdownContent = content.substring(endIndex + 3).trim();

    // Parser le frontmatter
    const frontmatter = {};
    let currentKey = null;
    let currentList = [];

    frontmatterText.split('\n').forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.startsWith('-')) {
            // C'est un élément de liste
            if (currentKey) {
                currentList.push(line.substring(1).trim());
            }
        } else if (line.includes(':')) {
            // C'est une nouvelle clé
            if (currentKey && currentList.length > 0) {
                frontmatter[currentKey] = currentList;
                currentList = [];
            }
            const [key, ...values] = line.split(':');
            currentKey = key.trim();
            const value = values.join(':').trim();
            if (value) {
                frontmatter[currentKey] = value;
            }
        }
    });

    // Gérer la dernière liste si nécessaire
    if (currentKey && currentList.length > 0) {
        frontmatter[currentKey] = currentList;
    }

    return { frontmatter, content: markdownContent };
}

/**
 * Fetches a Markdown file and converts it to HTML using marked.js
 */
async function renderMarkdownArticle(markdownFilePath, targetElementId) {
    console.log('Début de renderMarkdownArticle');
    console.log('Chemin du fichier:', markdownFilePath);
    console.log('ID de l\'élément cible:', targetElementId);

    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        console.error(`Target element with ID '${targetElementId}' not found.`);
        return;
    }
    console.log('Élément cible trouvé:', targetElement);

    try {
        // 1. Fetch the Markdown file content
        console.log('Tentative de chargement du fichier Markdown...');
        const response = await fetch(markdownFilePath);
        console.log('Réponse du fetch:', response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdownContent = await response.text();
        console.log('Contenu Markdown chargé:', markdownContent.substring(0, 100) + '...');

        // 2. Extraire le frontmatter
        const { frontmatter, content } = extractFrontmatter(markdownContent);
        console.log('Frontmatter extrait:', frontmatter);
        console.log('Contenu Markdown:', content.substring(0, 100) + '...');

        // 3. Convert Markdown to HTML using marked.js
        console.log('Vérification de marked...');
        if (typeof marked === 'undefined') {
            console.error('marked.js is not loaded. Please include the script in your HTML.');
            return;
        }
        console.log('marked est disponible');

        // Configurer marked pour le rendu
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false,
            sanitize: false
        });

        const renderedHTML = marked.parse(content);
        console.log('HTML généré:', renderedHTML.substring(0, 100) + '...');

        // 4. Inject the rendered HTML into the target element
        targetElement.innerHTML = renderedHTML;
        console.log('HTML injecté dans l\'élément cible');

        // 5. Mettre à jour les métadonnées
        // Trouver le conteneur parent de l'article
        const articleContainer = targetElement.closest('.article-content');
        if (!articleContainer) {
            console.error('Conteneur article non trouvé');
            return;
        }

        // Trouver les éléments de métadonnées dans le footer
        const metadataDateElement = articleContainer.querySelector('.article-metadata-footer p:nth-child(1)');
        if (metadataDateElement && frontmatter.date) {
            metadataDateElement.innerHTML = `<strong>Date :</strong> ${frontmatter.date}`;
            console.log('Date mise à jour:', frontmatter.date);
        }

        const metadataTagsElement = articleContainer.querySelector('.article-metadata-footer p:nth-child(2)');
        if (metadataTagsElement && (frontmatter.tags || frontmatter.categorie)) {
            let tagsText = '';
            if (frontmatter.categorie) tagsText += frontmatter.categorie;

            if (frontmatter.tags) {
                if (tagsText) tagsText += ' - ';
                tagsText += Array.isArray(frontmatter.tags) ? frontmatter.tags.join(', ') : frontmatter.tags;
            }
            metadataTagsElement.innerHTML = `<strong>Catégorie/Tags :</strong> ${tagsText}`;
            console.log('Tags mis à jour:', tagsText);
        }

    } catch (error) {
        console.error('Erreur détaillée:', error);
        console.error('Stack trace:', error.stack);
        targetElement.innerHTML = `<p>Error loading article: ${error.message}</p>`;
    }
} 