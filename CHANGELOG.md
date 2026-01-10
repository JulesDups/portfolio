# CHANGELOG

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [0.2.0] - 2026-01-10

### Rebranding (Client First)

- **Positionnement** : Passage de "Architecte Numérique" à "**Partenaire Numérique**"
- **Réécriture Complète** : Adoption d'un ton simple, accessible et orienté bénéfices clients (fin du jargon technique en façade)
- **Nouvelles Offres** :
  - **L'ESSENTIEL** (850€) : Site vitrine simple
  - **L'ARTISAN** (1 600€) : Site optimisé SEO & Conversion (Recommandé)
  - **L'ATELIER** (Sur Devis) : Outils de gestion sur-mesure
  - **RENFORT TECH** (450€/j) : Maintien de l'offre freelance pour les agences
- **UX/UI** :
  - Modification du Hero pour porter le nouveau message ("Je gère la technique")
  - Mise à jour des prompts IA (`api/gemini`) pour s'aligner sur les nouvelles offres
  - Bouton "ENGAGER" redirige maintenant vers le formulaire de contact (scroll smooth)
  - Logo cliquable pour retour en haut de page (scroll smooth)
  - Ajustement typographique (taille des textes en gras augmentée dans "À propos")
  - **Navigation** :
    - Ajout du menu Desktop (Réalisations, Prestations, Contact)
    - Correction du bug d'affichage du menu Mobile (React Portal)
    - Amélioration de l'ergonomie mobile (espacement agrandi)

## [0.1.2] - 2026-01-09

### Added

- Configuration `robots.txt` via `app/robots.ts` pour le référencement
- Génération dynamique `sitemap.xml` via `app/sitemap.ts`
- Métadonnées Twitter Card pour le partage social
- Keywords et robots directives pour un SEO optimisé

### Changed

- Optimisation typographique française sur l'ensemble du portfolio :
  - Ajout d'espaces insécables avant les signes de ponctuation doubles (`:`, `?`, `!`)
  - Utilisation d'apostrophes simples (`'`) au lieu des entités HTML (`'`) pour un affichage correct
  - Utilisation des guillemets français (`« ... »`) pour les citations
  - Fichiers concernés : `app/page.tsx`, `components/Pricing.tsx`, `app/layout.tsx`, `app/mentions-legales/page.tsx`
- Amélioration de l'accessibilité avec correction des ratios de contraste de couleurs dans `app/globals.css` :
  - **Mode Light** : assombrissement de `--foreground` (#1f4045 → #1a3338) pour ratio 4.7:1
  - **Mode Light** : assombrissement de `--secondary` (#d4a373 → #a67c47) pour ratio 4.5:1
  - **Mode Dark** : éclaircissement de `--primary` (#bf2c23 → #e84a3f) pour ratio 4.6:1
  - Conformité WCAG AA atteinte (minimum 4.5:1 pour texte normal)

## [0.1.1] - 2026-01-07

### Changed

- Mise à jour majeure de la section "À propos" ("Le Manifeste")
- Refonte complète de la section Tarifs avec les nouvelles offres :
  - **LE PILOTAGE** (Sécurisation Technique / TJM)
  - **L'ESQUISSE** (Site Vitrine)
  - **LA RÉSIDENCE** (Productivité Métier)
  - **LA CITADELLE** (SaaS / Sur Mesure)
- Mise à jour de la liste des projets avec "Pelote Manager" et "AMO'R"
- Amélioration de la section Projets avec des détails supplémentaires sur les défis techniques
- Refactoring des données de projet pour une meilleure maintenabilité

## [0.1.0] - 2026-01-04

### Added

- Conformité avec les exigences Google pour les icônes (dimensions multiples de 48px)
- Icône d'application dynamique générée en 192x192px
- Optimisation SEO avec métadonnées appropriées

### Changed

- Migration de `app/icon.tsx` vers des dimensions conformes (192x192)
- Suppression des balises `<link rel="icon">` manuelles dans `layout.tsx`
- Ajustement des propriétés CSS de l'icône (taille de police, border-radius, border)

### Fixed

- Correction de l'affichage des icônes dans les résultats de recherche Google

## [0.0.3] - 2026-01-03

### Added

- Section "Outils IA" avec générateur de cahier des charges
- Générateur de budget de projet avec estimation de délais
- Interface utilisateur pour l'assistant IA d'architecture
- Composant `AIArchitect` avec streaming de réponses
- Intégration de l'API Gemini pour la génération de contenu

### Changed

- Remplacement du modèle IA par `gemini-3-flash-preview`

### Fixed

- Correction de l'affichage des badges techniques en mode sombre

## [0.0.2] - 2025-12-31

### Added

- Section Projets avec mockups
- Composant `Projects` avec prévisualisations cliquables
- Support du thème sombre/clair pour les cartes de projet
- Badges techniques avec contraste amélioré (fond rouge, texte blanc en mode sombre)

### Changed

- Refactoring des classes CSS pour réactivité au thème global
- Suppression des définitions de thème statiques par projet
- Amélioration de l'accessibilité et du contraste

### Fixed

- Problèmes de couleur et contraste dans la section Projets
- Affichage correct des mockups en mode clair et sombre

## [0.0.1] - 2025-12-28

### Added

- Initialisation du projet avec Next.js 16
- Configuration TypeScript stricte
- Configuration Tailwind CSS 4
- Configuration ESLint et Prettier
- Composants de base :
  - `Hero` : Section d'accueil avec effet parallaxe
  - `About` : Section à propos
  - `Workshop` : Présentation de l'atelier technique
  - `Philosophy` : Philosophie de travail
  - `Contact` : Formulaire de contact
  - `MobileMenu` : Menu mobile responsive
  - `ThemeProvider` & `ThemeToggle` : Gestion du thème clair/sombre
  - `ReadingProgress` : Barre de progression de lecture
  - `PixelSeparator` : Séparateur visuel pixelisé
  - `Pricing` : Composant de tarification
- SVG personnalisés en pixel art (Pala, Etxe, Cathedral, Lauburu)
- Animation grain overlay
- Effets de parallaxe et interactions souris
- Intégration Vercel Analytics
- Optimisation des polices avec `next/font`
- Configuration responsive complète

### Dependencies

- React 19.2.1
- Next.js 16.1.1
- TypeScript 5.9.3
- Tailwind CSS 4.1.17
- Framer Motion 12.23.24
- Lucide React 0.555.0
- Vercel Analytics 1.6.1

### Configuration

- Support dark mode natif
- Optimisation SEO
- Configuration PostCSS
- EditorConfig pour cohérence de code

---

<!-- Format: YYYY-MM-DD -->
<!-- Dernière mise à jour: 2026-01-07 -->
