// Test de marked.js
document.addEventListener('DOMContentLoaded', function() {
    // Test de conversion Markdown vers HTML
    const markdownText = `
# Test de Markdown

Ceci est un **test** de *marked.js*.

## Liste
- Item 1
- Item 2
- Item 3

\`\`\`javascript
console.log('Hello World');
\`\`\`
    `;

    // Conversion du Markdown en HTML
    const htmlContent = marked.parse(markdownText);
    
    // Affichage du résultat dans la console
    console.log('Markdown converti en HTML :', htmlContent);
}); 