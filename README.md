# DEBOUT PATRIOTES — site Web

Site officiel du groupement politique DEBOUT PATRIOTES, réunissant onze partis
politiques émergents haïtiens.

Angular 22 (SSR + prerendering), Tailwind CSS 4, PrimeIcons.

## Démarrer

```bash
npm install
npm start                 # http://localhost:4200
npm run build             # build de production (prerender des 12 routes)
npm run serve:ssr:debout-patriotes   # sert le build SSR
```

## Où se trouve le contenu

**Tout le texte du site est dans un seul fichier :**
[`src/app/config/content/fr.ts`](src/app/config/content/fr.ts).

Les composants ne contiennent aucun texte en dur : ils lisent ce fichier via
`LanguageService`. Pour corriger une formulation, changer un intitulé de menu ou
ajouter un axe au programme, c'est le seul fichier à modifier — la structure
attendue est décrite dans [`src/app/models/content.model.ts`](src/app/models/content.model.ts).

### Ajouter une langue (créole, anglais)

1. Copier `fr.ts` en `ht.ts` (ou `en.ts`) et traduire les valeurs.
2. L'ajouter au catalogue dans [`src/app/services/language.service.ts`](src/app/services/language.service.ts)
   et étendre le type `Locale`.
3. Brancher un sélecteur de langue sur `LanguageService.setLanguage()`.

### Identité visuelle

- Couleurs, polices, rayons : [`src/app/config/brand/theme.ts`](src/app/config/brand/theme.ts)
  (les mêmes valeurs sont reprises comme défauts CSS dans `src/styles.css`, pour que
  le rendu serveur soit déjà aux bonnes couleurs avant l'hydratation — garder les deux alignés).
- Coordonnées et logo : [`src/app/config/brand/company.ts`](src/app/config/brand/company.ts)
- Réseaux sociaux : [`src/app/config/brand/social.ts`](src/app/config/brand/social.ts)

## Pages

| Route             | Page                    |
| ----------------- | ----------------------- |
| `/`               | Accueil                 |
| `/a-propos`       | À propos                |
| `/vision`         | Notre vision            |
| `/programme`      | Notre programme         |
| `/organigramme`   | Organigramme            |
| `/actualites`     | Actualités              |
| `/evenements`     | Événements              |
| `/presse`         | Espace presse           |
| `/galerie`        | Galerie                 |
| `/devenir-membre` | Devenir membre          |
| `/faire-un-don`   | Soutenir le groupement  |
| `/contact`        | Nous contacter          |

Titre et description SEO de chaque page : [`src/app/app.routes.ts`](src/app/app.routes.ts).

## À compléter par le groupement

Le contenu éditorial est rédigé à partir du texte de présentation fourni. Les
informations que seul DEBOUT PATRIOTES peut fournir ont été laissées en
placeholders explicites plutôt qu'inventées. Chercher `À COMPLÉTER` dans
`src/app/config/content/fr.ts` et `src/app/config/brand/`.

- [ ] **Date exacte** de la constitution formelle (« le … août 2026 ») — `meta.foundedOn`
- [ ] **Les onze partis membres** : dénominations officielles, sigles, responsables — `about.parties.list`
- [ ] **Responsables des instances** : Coordination générale, porte-parole, secrétariats — `org.levels`
- [ ] **Coordonnées** : e-mail, téléphone, adresse du siège — `company.ts`, `contact.channels`, `contact.office`
- [ ] **Contact presse** : e-mail et téléphone dédiés — `press.contact`
- [ ] **Comptes officiels** des réseaux sociaux — `social.ts`
- [ ] **Modalités de contribution** : coordonnées bancaires, transfert mobile — `donate.methods`
- [ ] **Actualités, événements, communiqués, photos** — `news.items`, `events.items`, `press.items`, `gallery.albums`
      (les listes sont vides : chaque page affiche un état vide propre en attendant)

## À brancher côté technique

Les deux formulaires valident les saisies puis affichent un message de succès,
sans envoyer quoi que ce soit. Chercher les `TODO` :

- [`src/app/pages/devenir-membre/devenir-membre.ts`](src/app/pages/devenir-membre/devenir-membre.ts) — adhésions
- [`src/app/pages/contact/contact.ts`](src/app/pages/contact/contact.ts) — messages
- Le champ « lettre d'information » du pied de page n'est pas encore branché non plus.

Images : `public/img/` contient des visuels de démonstration (`hero-img.png`,
`vision.png`) à remplacer par des photos du groupement.
