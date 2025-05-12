# Site Personnel Omid NASER

## Structure du site

Ce site web personnel utilise une architecture simple et modulaire :

- Système de grille responsive à 12 colonnes
- Composants réutilisables (header)
- Structure d'articles flexible
- Thème clair/sombre

## Comment ajouter un nouvel article

Pour publier un nouvel article sur le site, suivez ces étapes :

### 1. Créer un nouveau fichier HTML

Créez un nouveau fichier HTML dans le dossier `articles/` avec un nom descriptif, par exemple `mon-nouvel-article.html`.

### 2. Utiliser le modèle d'article

Copiez la structure de base d'un article existant comme modèle. Les articles utilisent la structure suivante :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Titre de l'article | Omid NASER</title>
  <link rel="icon" href="../assets/img/favicon.ico" type="image/x-icon"/>
  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body>
  <!-- Container pour le header -->
  <div id="header-container"></div>

  <main>
    <div class="container">
      <article class="article-page">
        <header class="article-header">
          <h1 class="article-page-title">Titre de l'article</h1>
          <div class="article-page-meta">Publié le [DATE] | Par Omid NASER | Catégorie: [CATÉGORIE]</div>
          <img src="[LIEN_IMAGE]" alt="Description de l'image" class="article-page-image">
        </header>
        
        <div class="article-page-content">
          <!-- Contenu de l'article -->
        </div>
      </article>
    </div>
  </main>

  <!-- Scripts locaux -->
  <script src="../assets/js/components.js"></script>

  <!-- Protection -->
  <script>
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
  </script>
</body>
</html>
```

### 3. Ajouter du contenu avec les composants

Utilisez les composants modulaires pour structurer votre contenu :

#### Grille responsive
```html
<div class="grid">
  <div class="col-6 col-md-12">
    <!-- Contenu première colonne -->
  </div>
  <div class="col-6 col-md-12">
    <!-- Contenu deuxième colonne -->
  </div>
</div>
```

#### Cartes
```html
<div class="card">
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte...</p>
</div>
```

#### Modules
```html
<div class="module">
  <div class="module-header">
    <h2>Titre du module</h2>
  </div>
  <!-- Contenu du module -->
</div>
```

### 4. Ajouter l'article à la page d'accueil

Pour que l'article apparaisse sur la page d'accueil, ajoutez une carte d'article dans la section "Articles Récents" de `index.html` :

```html
<div class="article-card">
  <img src="[LIEN_IMAGE]" alt="Image d'article" class="article-image">
  <div class="article-content">
    <h3 class="article-title">Titre de l'article</h3>
    <div class="article-meta">Publié le [DATE]</div>
    <p class="article-excerpt">Résumé de l'article...</p>
    <a href="articles/mon-nouvel-article.html" class="article-link">Lire l'article</a>
  </div>
</div>
```

## Personnalisation

### Images d'articles

Pour les images, vous pouvez :
- Utiliser vos propres images (placées dans `assets/img/`)
- Utiliser un service comme Picsum Photos (https://picsum.photos/) pour des images temporaires

### Système de thème

Le site inclut un switch pour passer du mode clair au mode sombre. Les styles sont automatiquement adaptés.

## Notes techniques

- Le header est chargé dynamiquement via JavaScript
- Le système de grille s'adapte à différentes tailles d'écran
- Les chemins sont ajustés automatiquement selon qu'on est à la racine ou dans le dossier `articles/` 