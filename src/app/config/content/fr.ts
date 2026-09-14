import { SiteContent } from '../../models/content.model';

/**
 * Contenu éditorial du site — version française.
 *
 * Rédigé à partir du texte de présentation fourni par le groupement.
 * Les valeurs marquées « À COMPLÉTER » attendent une information que seul
 * DEBOUT PATRIOTES peut fournir (date exacte, noms des partis, coordonnées,
 * responsables). Elles sont volontairement laissées visibles plutôt
 * qu'inventées.
 */
export const fr: SiteContent = {
  meta: {
    name: 'DEBOUT PATRIOTES',
    tagline: 'Debout pour Haïti, patriotes pour la Nation.',
    description:
      "Groupement politique haïtien réunissant onze partis émergents autour d'une même vision de la gouvernance : refonder l'État, reconstruire le pays, garantir de meilleures conditions de vie à la population.",
    // À COMPLÉTER : jour exact de la constitution formelle
    foundedOn: 'août 2026',
    partyCount: 'onze (11)',
  },

  nav: [
    { label: 'Accueil', url: '/' },
    {
      label: 'Le Groupement',
      children: [
        { label: 'À propos', url: '/a-propos' },
        { label: 'Notre vision', url: '/vision' },
        { label: 'Notre programme', url: '/programme' },
        { label: 'Organigramme', url: '/organigramme' },
      ],
    },
    {
      label: 'Actualités',
      children: [
        { label: 'Actualités', url: '/actualites' },
        { label: 'Événements', url: '/evenements' },
        { label: 'Espace presse', url: '/presse' },
        { label: 'Galerie', url: '/galerie' },
      ],
    },
    {
      label: 'Participer',
      children: [
        { label: 'Devenir membre', url: '/devenir-membre' },
        { label: 'Soutenir le groupement', url: '/faire-un-don' },
        { label: 'Nous contacter', url: '/contact' },
      ],
    },
    { label: 'Candidats', url: '/' }
  ],

  /* ------------------------------------------------------------------ */
  /* ACCUEIL                                                             */
  /* ------------------------------------------------------------------ */

  home: {
    hero: {
      eyebrow: 'Groupement politique · Haïti',
      title: 'Onze partis, une seule',
      highlight: 'exigence pour Haïti',
      subtitle:
        "À un carrefour décisif de notre histoire, onze partis politiques émergents mettent ensemble leurs potentialités et leur énergie dans une même vision de la gouvernance et de la défense des intérêts supérieurs de la Nation.",
      primaryCta: { label: 'Devenir membre', url: '/devenir-membre' },
      secondaryCta: { label: 'Découvrir notre vision', url: '/vision' },
    },

    stats: [
      { value: '11', label: 'partis politiques émergents rassemblés' },
      { value: '1', label: 'vision commune de la gouvernance' },
      { value: '10 ans', label: 'sans élections générales en Haïti' },
      { value: '2026', label: 'constitution formelle du groupement' },
    ],

    welcome: {
      title: 'Bienvenue chez DEBOUT PATRIOTES',
      paragraphs: [
        "Le groupement politique DEBOUT PATRIOTES est heureux de vous souhaiter la bienvenue sur son site Web.",
        "Constitué formellement en août 2026 à l'occasion de l'inscription au Conseil Électoral Provisoire (CEP) des partis et groupements politiques pour leur participation aux prochaines élections générales — les premières depuis tantôt dix ans —, DEBOUT PATRIOTES rassemble onze partis politiques émergents qui choisissent de marcher ensemble.",
        "Devant la faillite de l'État, la déchéance des élites nationales et la dégradation accélérée et inquiétante de la situation générale du pays, nos dirigeant.e.s, membres et sympathisant.e.s se tiennent debout, en ordre de marche, pour avancer délibérément vers la conquête du pouvoir politique.",
      ],
      cta: { label: 'Lire notre présentation complète', url: '/a-propos' },
    },

    identity: {
      title: 'Pourquoi DEBOUT ? Pourquoi PATRIOTES ?',
      lead: "Notre nom n'est pas un slogan. C'est un engagement en deux mots, et chacun d'eux dit une part de ce que nous sommes.",
      cards: [
        {
          title: 'DEBOUT',
          desc: "Parce que la résignation, nous le savons, ne reconstruira pas le pays. Se tenir debout, c'est refuser l'abandon, refuser l'attentisme, et se mettre en ordre de marche là où d'autres se détournent.",
          icon: 'pi-flag',
        },
        {
          title: 'PATRIOTES',
          desc: "Parce que nous sommes convaincus que la politique doit d'abord servir Haïti avant de servir les ambitions particulières. Le pays passe avant le parti ; la Nation passe avant la carrière.",
          icon: 'pi-heart',
        },
      ],
    },

    pillars: {
      title: 'Quatre exigences pour remettre Haïti en marche',
      lead: "À la veille des élections générales, DEBOUT PATRIOTES veut porter une exigence claire : remettre Haïti sur le chemin de la sécurité, de la souveraineté, de la légitimité démocratique et du progrès.",
    },

    heritage: {
      eyebrow: 'Notre héritage',
      title: "La leçon de l'Indépendance",
      paragraphs: [
        "Sans vouloir transformer l'histoire en slogan, DEBOUT PATRIOTES retient du fondateur de la patrie, le Grand Jean-Jacques Dessalines, et de la lutte pour l'Indépendance nationale une leçon essentielle :",
        "lorsque la Nation affronte une épreuve historique, la capacité de se rassembler autour d'une cause supérieure devient une force.",
        "C'est cette leçon que nous appliquons aujourd'hui : se mettre ensemble sans perdre les identités de chaque composante, se tenir debout face aux difficultés sans nombre, et agir en patriotes conséquents.",
      ],
      attribution: "L'héritage de 1804, appliqué au présent",
    },

    news: {
      title: 'Actualités du groupement',
      lead: 'Prises de position, activités de terrain et vie des onze partis membres.',
      cta: { label: 'Toutes les actualités', url: '/actualites' },
    },

    cta: {
      title: 'Le pays a besoin de vous debout',
      desc: "Militant, sympathisant, membre de la diaspora ou simple citoyen préoccupé par l'avenir d'Haïti : il y a une place pour vous dans ce rassemblement.",
      primary: { label: 'Rejoindre DEBOUT PATRIOTES', url: '/devenir-membre' },
      secondary: { label: 'Nous contacter', url: '/contact' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* À PROPOS                                                            */
  /* ------------------------------------------------------------------ */

  about: {
    intro: {
      eyebrow: 'Le Groupement',
      title: 'À propos de DEBOUT PATRIOTES',
      lead: "Un rassemblement de onze partis politiques émergents, constitué à un carrefour décisif et déterminant de l'histoire d'Haïti.",
    },

    story: {
      title: 'Notre acte de naissance',
      paragraphs: [
        "DEBOUT PATRIOTES a été constitué formellement en août 2026, à l'occasion de l'inscription au Conseil Électoral Provisoire (CEP) des partis et groupements politiques appelés à participer aux prochaines élections générales.",
        "Ces élections sont attendues depuis tantôt dix ans. Une décennie pendant laquelle le pays a vu se creuser le déficit de légitimité de ses institutions, s'effondrer la sécurité de ses citoyens et se déliter la confiance entre gouvernants et gouvernés.",
        "C'est dans ce contexte que onze partis politiques émergents ont fait un choix : plutôt que de se disperser, mettre ensemble leurs potentialités et leur énergie dans une même vision de la gouvernance politique du pays et de la défense des intérêts supérieurs de la Nation.",
      ],
    },

    diagnosis: {
      title: 'Le constat qui nous oblige',
      lead: "Nous ne partons pas d'une abstraction. Nous partons de ce que vit la population haïtienne chaque jour.",
      items: [
        {
          title: "La faillite de l'État",
          desc: "Des institutions incapables d'assurer leurs missions les plus élémentaires : protéger, rendre la justice, éduquer, soigner, encadrer l'économie. L'État ne s'est pas seulement affaibli, il a cessé d'être présent là où le citoyen l'attend.",
          icon: 'pi-building-columns',
        },
        {
          title: 'La déchéance des élites nationales',
          desc: "Des élites politiques, économiques et intellectuelles qui ont trop souvent préféré la préservation de leurs positions à la responsabilité qu'impose leur place dans la Nation.",
          icon: 'pi-users',
        },
        {
          title: 'Une dégradation accélérée et inquiétante',
          desc: "Insécurité, déplacements forcés, effondrement des services publics, appauvrissement, exil des compétences : la situation générale du pays se détériore à une vitesse qui n'autorise plus l'attentisme.",
          icon: 'pi-chart-line',
        },
      ],
    },

    answer: {
      title: 'Notre réponse',
      paragraphs: [
        "En patriotes engagés, les dirigeant.e.s, membres et sympathisant.e.s de nos onze partis se tiennent debout, en ordre de marche, pour avancer délibérément vers la conquête du pouvoir politique.",
        "Cette conquête n'est pas une fin. Elle est le moyen d'atteindre trois objectifs indissociables : refonder l'État, jeter les bases de la reconstruction du pays et garantir de meilleures conditions de vie à la population.",
        "Nous ne demandons pas la confiance au nom d'un passé. Nous la demandons au nom d'un travail à faire, et nous acceptons d'en être comptables devant les citoyens.",
      ],
    },

    charter: {
      title: 'Ce qui nous tient ensemble',
      lead: "Un groupement n'est pas une fusion. Voici les principes qui organisent notre marche commune.",
      principles: [
        {
          title: 'Ensemble, sans perdre nos identités',
          desc: "Chaque parti membre conserve son nom, ses structures, sa doctrine et sa liberté de parole. Le groupement coordonne une vision commune, il n'absorbe personne.",
          icon: 'pi-share-alt',
        },
        {
          title: 'La Nation avant le parti',
          desc: "Les intérêts supérieurs de la Nation priment sur les calculs d'appareil. Toute décision du groupement se juge à cette aune.",
          icon: 'pi-flag',
        },
        {
          title: 'La décision par le consensus',
          desc: "Les orientations communes sont arrêtées collégialement par l'Assemblée des partis membres, où chaque composante dispose d'une voix.",
          icon: 'pi-comments',
        },
        {
          title: 'La responsabilité devant les citoyens',
          desc: "Ce que nous annonçons, nous devons pouvoir l'expliquer, le chiffrer et en rendre compte. Le patriotisme sans reddition de comptes reste un discours.",
          icon: 'pi-verified',
        },
      ],
    },

    parties: {
      title: 'Les onze partis membres',
      lead: "Onze formations politiques émergentes, onze parcours, une même vision de la gouvernance du pays.",
      // À COMPLÉTER : remplacer par les dénominations officielles, sigles et
      // responsables communiqués par chaque parti membre.
      note: "La liste officielle des onze partis membres, avec leurs sigles et leurs responsables, sera publiée ici dès la finalisation des formalités auprès du CEP.",
      list: [
        { name: 'Parti membre 1', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 2', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 3', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 4', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 5', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 6', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 7', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 8', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 9', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 10', acronym: '—', note: 'Dénomination à confirmer' },
        { name: 'Parti membre 11', acronym: '—', note: 'Dénomination à confirmer' },
      ],
    },

    cta: {
      title: 'Vous partagez ce constat ?',
      desc: "Alors vous avez déjà fait la moitié du chemin. Rejoignez celles et ceux qui ont décidé de ne pas se résigner.",
      primary: { label: 'Devenir membre', url: '/devenir-membre' },
      secondary: { label: 'Lire notre vision', url: '/vision' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* VISION                                                              */
  /* ------------------------------------------------------------------ */

  vision: {
    intro: {
      eyebrow: 'Le Groupement',
      title: 'Notre vision',
      lead: "Remettre Haïti sur le chemin de la sécurité, de la souveraineté, de la légitimité démocratique et du progrès.",
    },

    statement: {
      title: 'Ce que nous voulons pour le pays',
      paragraphs: [
        "Notre vision tient en une phrase : refonder l'État, jeter les bases de la reconstruction du pays et garantir de meilleures conditions de vie à la population.",
        "Refonder l'État, parce qu'on ne répare pas une institution qui ne remplit plus aucune de ses fonctions : on la reconstruit sur des bases saines, avec des règles claires, des agents formés et un contrôle citoyen réel.",
        "Jeter les bases de la reconstruction, parce qu'aucun mandat ne suffira à tout rebâtir, mais qu'un mandat suffit à poser des fondations que les suivants ne pourront plus défaire.",
        "Garantir de meilleures conditions de vie, parce que c'est à cela — et à rien d'autre — que se mesure la réussite d'une politique.",
      ],
    },

    pillars: [
      {
        key: 'securite',
        title: 'Sécurité',
        tagline: 'La première des libertés',
        desc: "Sans sécurité, aucun droit n'est exerçable, aucune activité économique n'est possible, aucune élection n'est crédible. Le rétablissement de la sécurité des personnes et des biens est la condition de tout le reste, et donc notre première exigence.",
        points: [
          "Restaurer l'autorité de l'État sur l'ensemble du territoire national",
          "Doter les forces de sécurité des moyens, de la formation et du contrôle nécessaires",
          "Rétablir une chaîne pénale qui fonctionne, de l'enquête au jugement",
          "Permettre le retour digne et encadré des personnes déplacées",
        ],
        icon: 'pi-shield',
      },
      {
        key: 'souverainete',
        title: 'Souveraineté',
        tagline: 'Haïti décide pour Haïti',
        desc: "Un pays dont les décisions se prennent ailleurs ne se relève pas. La souveraineté n'est pas un repli : c'est la capacité de définir soi-même ses priorités, de négocier ses coopérations d'égal à égal et de nourrir sa population par sa propre production.",
        points: [
          'Reprendre la maîtrise nationale de la décision publique',
          'Refonder la coopération internationale sur le partenariat, non la tutelle',
          "Relancer la production nationale, à commencer par l'agriculture",
          'Protéger le patrimoine, les ressources et les frontières du pays',
        ],
        icon: 'pi-globe',
      },
      {
        key: 'legitimite',
        title: 'Légitimité démocratique',
        tagline: 'Le pouvoir vient du peuple',
        desc: "Après tantôt dix ans sans élections, la reconstruction de la légitimité démocratique est une urgence institutionnelle. Des élections crédibles, des mandats respectés, des comptes rendus au peuple : c'est la base du contrat que nous voulons rétablir.",
        points: [
          'Organiser des élections générales libres, honnêtes et vérifiables',
          'Restaurer des institutions élues à tous les niveaux, jusqu’aux collectivités',
          'Garantir le pluralisme politique et la liberté de la presse',
          'Rendre compte publiquement et régulièrement de chaque engagement pris',
        ],
        icon: 'pi-check-square',
      },
      {
        key: 'progres',
        title: 'Progrès',
        tagline: 'Des conditions de vie qui changent',
        desc: "Le progrès n'est pas une promesse abstraite : c'est de l'eau, du courant, une école qui fonctionne, un dispensaire ouvert, un travail qui nourrit sa famille. Toute politique publique doit se juger à ce qu'elle change concrètement dans la vie des gens.",
        points: [
          "Rétablir l'accès aux services essentiels : eau, énergie, santé, éducation",
          "Créer les conditions de l'emploi et de l'investissement productif",
          'Investir dans la jeunesse et la formation professionnelle',
          'Réduire les inégalités territoriales entre la capitale et les régions',
        ],
        icon: 'pi-chart-bar',
      },
    ],

    values: {
      title: 'Nos valeurs',
      lead: "Ce qui nous engage dans la manière de faire, pas seulement dans les objectifs.",
      items: [
        {
          title: 'Patriotisme conséquent',
          desc: "Un patriotisme qui se prouve par les actes et les résultats, pas par les déclarations. Servir Haïti avant de servir les ambitions particulières.",
          icon: 'pi-flag-fill',
        },
        {
          title: 'Unité dans la diversité',
          desc: "Se mettre ensemble sans perdre les identités de chaque composante. La pluralité de nos onze partis est une richesse, pas un obstacle.",
          icon: 'pi-users',
        },
        {
          title: 'Constance',
          desc: "Se tenir debout face aux difficultés sans nombre. Nous n'attendons pas que les conditions deviennent faciles pour agir.",
          icon: 'pi-arrow-up',
        },
        {
          title: 'Intégrité',
          desc: "La gestion des biens publics est un mandat, jamais une opportunité. Nous nous appliquons à nous-mêmes les règles que nous voulons imposer.",
          icon: 'pi-lock',
        },
        {
          title: 'Dignité de la personne',
          desc: "Chaque Haïtienne et chaque Haïtien a droit à la sécurité, au respect et aux moyens d'une vie décente sur sa propre terre.",
          icon: 'pi-heart',
        },
        {
          title: 'Redevabilité',
          desc: "Le pouvoir se rend. Il se contrôle, il s'explique, et il s'évalue devant celles et ceux qui l'ont confié.",
          icon: 'pi-verified',
        },
      ],
    },

    horizon: {
      title: 'Notre horizon',
      lead: "Trois objectifs indissociables, qui donnent son sens à la conquête du pouvoir politique.",
      items: [
        {
          title: "Refonder l'État",
          desc: "Reconstruire des institutions capables d'assurer la sécurité, la justice, les services publics et la régulation de l'économie.",
          icon: 'pi-building-columns',
        },
        {
          title: 'Reconstruire le pays',
          desc: "Jeter les bases d'une reconstruction durable : infrastructures, production nationale, aménagement du territoire, capital humain.",
          icon: 'pi-wrench',
        },
        {
          title: 'Améliorer la vie des gens',
          desc: "Garantir de meilleures conditions de vie à la population : c'est le seul critère de réussite que nous acceptons.",
          icon: 'pi-home',
        },
      ],
    },

    cta: {
      title: "Cette vision n'aura de force que partagée",
      desc: 'Faites-la connaître, discutez-la, portez-la. Et si elle est la vôtre, marchez avec nous.',
      primary: { label: 'Découvrir notre programme', url: '/programme' },
      secondary: { label: 'Devenir membre', url: '/devenir-membre' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* PROGRAMME                                                           */
  /* ------------------------------------------------------------------ */

  program: {
    intro: {
      eyebrow: 'Le Groupement',
      title: 'Notre programme',
      lead: "Les axes de gouvernance sur lesquels les onze partis membres de DEBOUT PATRIOTES se sont accordés, et qui seront soumis au débat public avant les élections générales.",
    },

    disclaimer:
      "Ce document présente les orientations programmatiques arrêtées par l'Assemblée des partis membres. Le programme détaillé et chiffré sera publié et débattu publiquement avant le scrutin.",

    method: {
      title: 'Comment ce programme se construit',
      lead: "Nous refusons le programme écrit à huis clos par quelques-uns et découvert par le peuple le jour du vote.",
      steps: [
        {
          title: '1. Accord sur les axes',
          desc: 'Les onze partis arrêtent ensemble les grands axes en Assemblée des partis membres, par consensus.',
          icon: 'pi-sitemap',
        },
        {
          title: '2. Travail des commissions',
          desc: 'Chaque axe est instruit par une commission thématique associant élus, techniciens et acteurs du secteur.',
          icon: 'pi-briefcase',
        },
        {
          title: '3. Consultation citoyenne',
          desc: 'Les propositions sont confrontées au terrain : assemblées départementales, organisations de base, diaspora.',
          icon: 'pi-megaphone',
        },
        {
          title: '4. Publication et reddition',
          desc: "Le programme final est publié, chiffré, et son exécution fait l'objet de comptes rendus publics réguliers.",
          icon: 'pi-file',
        },
      ],
    },

    axes: [
      {
        number: '01',
        title: 'Sécurité et justice',
        objective:
          'Rétablir la sécurité des personnes et des biens sur tout le territoire, et une justice qui fonctionne et que les citoyens peuvent saisir.',
        measures: [
          "Restaurer l'autorité de l'État sur les zones aujourd'hui hors de contrôle",
          "Renforcer les effectifs, la formation, l'équipement et le contrôle interne de la Police Nationale",
          'Remettre en état la chaîne pénale : enquête, poursuite, jugement, exécution des peines',
          "Lutter contre le trafic d'armes et de munitions et le financement des groupes armés",
          'Assurer le retour encadré et la réinstallation digne des personnes déplacées',
          "Garantir l'indépendance effective du pouvoir judiciaire",
        ],
        icon: 'pi-shield',
      },
      {
        number: '02',
        title: "Refondation de l'État et gouvernance",
        objective:
          'Reconstruire une administration publique capable, intègre et présente sur tout le territoire.',
        measures: [
          "Réforme de l'administration publique : recrutement au mérite, formation, évaluation",
          'Numérisation des services publics essentiels et des registres nationaux',
          'Transparence budgétaire : publication accessible des recettes, dépenses et marchés publics',
          'Renforcement des institutions de contrôle et de lutte contre la corruption',
          'Décentralisation effective et transfert de moyens aux collectivités territoriales',
          'État civil fiable et accessible pour chaque citoyen',
        ],
        icon: 'pi-building-columns',
      },
      {
        number: '03',
        title: 'Économie, production nationale et emploi',
        objective:
          'Relancer la production nationale, créer des emplois et réduire la dépendance alimentaire du pays.',
        measures: [
          "Plan de relance de l'agriculture : intrants, irrigation, crédit rural, stockage, routes agricoles",
          'Appui à la transformation locale et aux filières à forte valeur ajoutée',
          "Soutien aux micro, petites et moyennes entreprises et à l'entrepreneuriat des jeunes",
          "Accès au crédit productif et à l'inclusion financière",
          'Politique énergétique : production, distribution et tarification soutenables',
          'Mobilisation productive des transferts de la diaspora',
        ],
        icon: 'pi-briefcase',
      },
      {
        number: '04',
        title: 'Éducation, santé et protection sociale',
        objective:
          "Rétablir l'accès effectif aux services essentiels, partout, et faire de la jeunesse la priorité budgétaire du pays.",
        measures: [
          'École accessible et de qualité : infrastructures, cantines, manuels, statut des enseignants',
          'Revalorisation et extension de la formation professionnelle et technique',
          'Reconstruction du réseau de santé primaire et approvisionnement en médicaments essentiels',
          'Accès à l’eau potable et à l’assainissement dans les communes et sections communales',
          'Protection sociale ciblée pour les ménages les plus vulnérables',
          'Politique du logement et réponse structurelle à la crise des déplacés',
        ],
        icon: 'pi-heart',
      },
      {
        number: '05',
        title: 'Souveraineté et relations extérieures',
        objective:
          'Rendre à Haïti la maîtrise de ses décisions et refonder ses coopérations sur le partenariat plutôt que la tutelle.',
        measures: [
          'Doctrine nationale claire en matière de coopération et de sécurité',
          'Renégociation des accords contraires aux intérêts supérieurs de la Nation',
          'Contrôle effectif des frontières terrestres et maritimes',
          'Protection des ressources naturelles et du patrimoine national',
          "Diplomatie active au service de la diaspora haïtienne et de l'image du pays",
          'Coopération régionale sur des bases réciproques et vérifiables',
        ],
        icon: 'pi-globe',
      },
      {
        number: '06',
        title: 'Démocratie, jeunesse, femmes et diaspora',
        objective:
          'Rebâtir la légitimité démocratique et ouvrir réellement la décision publique à celles et ceux qui en sont écartés.',
        measures: [
          'Élections générales libres, honnêtes, vérifiables et acceptées de tous',
          'Réforme du financement des partis et transparence des campagnes',
          'Participation effective des femmes à la décision politique et administrative',
          'Politique nationale de la jeunesse : formation, emploi, culture, sport',
          'Droits politiques et participation organisée de la diaspora',
          'Liberté de la presse et protection des journalistes',
        ],
        icon: 'pi-users',
      },
      {
        number: '07',
        title: 'Environnement et aménagement du territoire',
        objective:
          'Protéger un territoire fragilisé et préparer le pays aux risques climatiques et sismiques.',
        measures: [
          'Programme national de reboisement et de protection des bassins versants',
          'Gestion des déchets et assainissement urbain',
          'Normes de construction et prévention des risques sismiques et cycloniques',
          'Aménagement équilibré du territoire et désengorgement de la capitale',
          'Protection du littoral et des ressources halieutiques',
          'Transition énergétique adaptée aux réalités du pays',
        ],
        icon: 'pi-sun',
      },
    ],

    cta: {
      title: 'Ce programme vous concerne',
      desc: 'Il sera débattu publiquement avant le scrutin. Faites-nous parvenir vos observations, vos critiques et vos propositions.',
      primary: { label: 'Contribuer au débat', url: '/contact' },
      secondary: { label: 'Devenir membre', url: '/devenir-membre' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* ORGANIGRAMME                                                        */
  /* ------------------------------------------------------------------ */

  org: {
    intro: {
      eyebrow: 'Le Groupement',
      title: 'Organigramme',
      lead: "Comment DEBOUT PATRIOTES s'organise pour décider ensemble sans effacer aucune de ses composantes.",
    },

    principle: {
      title: 'Un principe simple',
      paragraphs: [
        'DEBOUT PATRIOTES est un groupement, non une fusion. Chacun des onze partis membres conserve son nom, ses organes et sa liberté de parole.',
        "Nos instances communes n'ont qu'un rôle : arrêter la vision partagée, coordonner l'action et porter une parole commune sur ce qui engage la Nation.",
        "Chaque parti membre dispose d'une voix à l'Assemblée des partis membres, quelle que soit sa taille. C'est la condition de la confiance entre nous.",
      ],
    },

    levels: [
      {
        title: 'Assemblée des partis membres',
        role: "Instance souveraine du groupement. Elle réunit les délégations des onze partis, arrête la vision et les orientations communes, valide le programme et désigne la Coordination générale. Une voix par parti membre.",
        // À COMPLÉTER : composition des délégations
        members: ['Onze délégations — composition à publier'],
      },
      {
        title: 'Coordination générale',
        role: "Exécutif du groupement entre deux assemblées. Elle met en œuvre les décisions, représente DEBOUT PATRIOTES à l'extérieur et anime le travail des secrétariats.",
        // À COMPLÉTER : coordonnateur général et coordonnateurs adjoints
        members: ['Coordonnateur·rice général·e — à désigner', 'Coordonnateurs adjoints — à désigner'],
      },
      {
        title: 'Secrétariat exécutif',
        role: 'Cheville ouvrière du groupement : organisation interne, suivi des décisions, relations avec les structures territoriales, archives et vie administrative.',
        members: ['Secrétariat général', 'Trésorerie', 'Organisation et mobilisation'],
      },
      {
        title: 'Secrétariat à la communication',
        role: 'Parole publique du groupement : communiqués, relations avec la presse, réseaux sociaux, site Web et documentation à destination des militants.',
        members: ['Porte-parole — à désigner', 'Presse et relations médias', 'Communication numérique'],
      },
      {
        title: 'Commissions thématiques',
        role: 'Travail de fond sur chacun des axes du programme. Elles associent cadres des partis membres, techniciens et acteurs des secteurs concernés.',
        members: ['Sept commissions, une par axe programmatique'],
      },
      {
        title: 'Coordinations départementales',
        role: "Présence du groupement sur le terrain, dans les dix départements et les sections communales : implantation, mobilisation, remontée des réalités locales.",
        members: ['Dix coordinations départementales', 'Coordinations communales'],
      },
    ],

    commissions: {
      title: 'Les commissions thématiques',
      lead: 'Chaque axe du programme est instruit par une commission dédiée, ouverte aux compétences extérieures au groupement.',
      items: [
        {
          title: 'Sécurité et justice',
          desc: 'Doctrine de sécurité, réforme policière, chaîne pénale, indépendance judiciaire.',
          icon: 'pi-shield',
        },
        {
          title: "Refondation de l'État",
          desc: 'Administration publique, décentralisation, transparence, lutte contre la corruption.',
          icon: 'pi-building-columns',
        },
        {
          title: 'Économie et production',
          desc: 'Agriculture, entreprises, emploi, énergie, finances publiques.',
          icon: 'pi-briefcase',
        },
        {
          title: 'Éducation, santé et social',
          desc: 'École, formation, santé primaire, eau, protection sociale, logement.',
          icon: 'pi-heart',
        },
        {
          title: 'Souveraineté et extérieur',
          desc: 'Coopération internationale, frontières, ressources, diaspora.',
          icon: 'pi-globe',
        },
        {
          title: 'Démocratie et participation',
          desc: 'Élections, jeunesse, femmes, société civile, liberté de la presse.',
          icon: 'pi-users',
        },
        {
          title: 'Environnement et territoire',
          desc: 'Reboisement, risques, assainissement, aménagement du territoire.',
          icon: 'pi-sun',
        },
      ],
    },

    territory: {
      title: 'Notre implantation',
      lead: "Le groupement se construit d'abord sur le terrain, dans les dix départements du pays et auprès de la diaspora.",
      items: [
        {
          title: '10 départements',
          desc: 'Une coordination départementale par département, relayée au niveau communal.',
          icon: 'pi-map',
        },
        {
          title: 'Sections communales',
          desc: 'Des comités de base au plus près des réalités quotidiennes de la population.',
          icon: 'pi-map-marker',
        },
        {
          title: 'Diaspora',
          desc: "Des antennes organisées auprès des communautés haïtiennes à l'étranger.",
          icon: 'pi-globe',
        },
      ],
    },

    cta: {
      title: 'Une structure ouverte',
      desc: 'Les commissions thématiques et les coordinations territoriales accueillent de nouvelles compétences. La vôtre est peut-être celle qui manque.',
      primary: { label: 'Proposer ma contribution', url: '/devenir-membre' },
      secondary: { label: 'Nous écrire', url: '/contact' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* ACTUALITÉS                                                          */
  /* ------------------------------------------------------------------ */

  news: {
    intro: {
      eyebrow: 'Actualités',
      title: 'Actualités du groupement',
      lead: 'Prises de position, activités de terrain, vie des onze partis membres et étapes de notre marche vers les élections générales.',
    },
    categories: ['Tout', 'Communiqués', 'Terrain', 'Vie du groupement', 'Élections'],
    // À COMPLÉTER : remplacer par les publications réelles du groupement.
    items: [],
    empty:
      "Aucune publication pour le moment. Les premières actualités du groupement paraîtront ici. Abonnez-vous à notre lettre d'information pour ne rien manquer.",
  },

  /* ------------------------------------------------------------------ */
  /* ÉVÉNEMENTS                                                          */
  /* ------------------------------------------------------------------ */

  events: {
    intro: {
      eyebrow: 'Actualités',
      title: 'Événements',
      lead: 'Assemblées, rencontres départementales, conférences de presse et mobilisations de DEBOUT PATRIOTES.',
    },
    // À COMPLÉTER : agenda réel du groupement
    items: [],
    empty:
      "Aucun événement programmé publiquement pour l'instant. L'agenda des assemblées et des rencontres départementales sera publié ici.",
  },

  /* ------------------------------------------------------------------ */
  /* PRESSE                                                              */
  /* ------------------------------------------------------------------ */

  press: {
    intro: {
      eyebrow: 'Actualités',
      title: 'Espace presse',
      lead: 'Communiqués officiels, notes de position et documents de référence de DEBOUT PATRIOTES, à disposition des journalistes.',
    },
    contact: {
      title: 'Contact presse',
      desc: "Pour toute demande d'interview, de réaction ou d'accréditation, le Secrétariat à la communication répond aux journalistes.",
      // À COMPLÉTER : coordonnées presse réelles
      email: 'presse@deboutpatriotes.ht',
      phone: '+509 — (à communiquer)',
    },
    items: [],
    empty:
      'Aucun document publié pour le moment. Les communiqués et notes de position du groupement seront archivés ici.',
  },

  /* ------------------------------------------------------------------ */
  /* GALERIE                                                             */
  /* ------------------------------------------------------------------ */

  gallery: {
    intro: {
      eyebrow: 'Actualités',
      title: 'Galerie',
      lead: 'Images de nos assemblées, de nos rencontres de terrain et de la vie du groupement.',
    },
    albums: [],
    empty: 'La galerie sera alimentée au fil des activités du groupement.',
  },

  /* ------------------------------------------------------------------ */
  /* DEVENIR MEMBRE                                                      */
  /* ------------------------------------------------------------------ */

  join: {
    intro: {
      eyebrow: 'Participer',
      title: 'Devenir membre',
      lead: 'La résignation ne reconstruira pas le pays. Se tenir debout commence par un engagement personnel.',
    },

    why: {
      title: 'Pourquoi nous rejoindre',
      items: [
        {
          title: 'Parce que le moment est décisif',
          desc: "Après tantôt dix ans sans élections, la prochaine échéance décidera de l'orientation du pays pour une génération.",
          icon: 'pi-clock',
        },
        {
          title: 'Parce que la dispersion nous a coûté cher',
          desc: 'Onze partis ont choisi de se rassembler plutôt que de se diviser. Ce choix a besoin de militants pour devenir une force.',
          icon: 'pi-users',
        },
        {
          title: 'Parce que votre compétence manque',
          desc: "Nos commissions thématiques ont besoin de techniciens, d'enseignants, de médecins, d'agronomes, de juristes, d'ingénieurs.",
          icon: 'pi-star',
        },
      ],
    },

    profiles: {
      title: 'Il y a plusieurs façons de marcher avec nous',
      lead: "Vous n'avez pas besoin d'être encarté dans un parti pour être utile au groupement.",
      items: [
        {
          title: 'Membre militant',
          desc: "Vous adhérez à l'un des onze partis membres et participez à la vie du groupement.",
          icon: 'pi-flag',
        },
        {
          title: 'Sympathisant',
          desc: 'Vous soutenez la démarche, relayez nos positions et participez aux rencontres publiques.',
          icon: 'pi-heart',
        },
        {
          title: 'Expert et contributeur',
          desc: 'Vous apportez votre compétence technique aux commissions thématiques.',
          icon: 'pi-briefcase',
        },
        {
          title: 'Jeunesse',
          desc: "Vous avez moins de 35 ans et voulez peser sur l'avenir du pays où vous allez vivre.",
          icon: 'pi-bolt',
        },
        {
          title: 'Diaspora',
          desc: "Vous vivez à l'étranger et voulez contribuer autrement qu'en spectateur.",
          icon: 'pi-globe',
        },
        {
          title: 'Bénévole de terrain',
          desc: 'Vous donnez du temps pour la mobilisation, la logistique et les actions locales.',
          icon: 'pi-users',
        },
      ],
    },

    commitment: {
      title: 'Ce à quoi nous nous engageons envers vous',
      items: [
        'Vos données personnelles ne sont utilisées que pour la vie du groupement et ne sont jamais cédées à des tiers.',
        "Vous êtes informé·e des décisions prises par l'Assemblée des partis membres et des positions publiques du groupement.",
        "Vous pouvez contribuer aux travaux d'une commission thématique correspondant à vos compétences.",
        'Vous pouvez vous retirer à tout moment, sur simple demande écrite.',
      ],
    },

    form: {
      title: "Formulaire d'adhésion",
      lead: 'Remplissez ce formulaire : une coordination départementale ou le secrétariat vous recontactera.',
      consent:
        "J'accepte que DEBOUT PATRIOTES conserve ces informations pour me recontacter et m'informer de ses activités.",
      submit: 'Envoyer ma demande',
      success: 'Merci. Votre demande a bien été enregistrée, nous revenons vers vous rapidement.',
    },

    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: 'Dois-je quitter mon parti pour rejoindre DEBOUT PATRIOTES ?',
          a: "Non. DEBOUT PATRIOTES est un groupement, pas une fusion. Chaque parti membre conserve son nom, ses structures et sa doctrine. Si votre parti est membre du groupement, vous marchez déjà avec nous.",
        },
        {
          q: "L'adhésion est-elle payante ?",
          a: "L'adhésion au groupement ne conditionne aucun paiement. Les cotisations éventuelles relèvent de chaque parti membre, selon ses propres statuts.",
        },
        {
          q: "Je vis à l'étranger, puis-je participer ?",
          a: 'Oui. Le groupement organise des antennes auprès des communautés haïtiennes de la diaspora, qui participent aux travaux des commissions et à la mobilisation.',
        },
        {
          q: 'Je ne veux militer dans aucun parti, mais je veux aider. Est-ce possible ?',
          a: "Oui. Vous pouvez être sympathisant, bénévole de terrain ou contributeur technique auprès d'une commission thématique, sans adhérer à aucun parti.",
        },
        {
          q: 'Comment savoir quels sont les onze partis membres ?',
          a: 'La liste officielle, avec les sigles et les responsables de chaque formation, est publiée sur la page « À propos » dès la finalisation des formalités auprès du CEP.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* SOUTENIR                                                            */
  /* ------------------------------------------------------------------ */

  donate: {
    intro: {
      eyebrow: 'Participer',
      title: 'Soutenir le groupement',
      lead: 'Une politique indépendante a besoin de moyens indépendants. Votre soutien en est la condition.',
    },

    why: {
      title: 'Pourquoi votre soutien compte',
      paragraphs: [
        "Un groupement qui dépend d'un petit nombre de bailleurs finit par leur devoir des comptes plutôt qu'au peuple. Nous préférons devoir des comptes à beaucoup de citoyens qu'à quelques intérêts.",
        'Chaque contribution, si modeste soit-elle, finance une activité concrète : une rencontre départementale, un document de travail, une sonorisation, un déplacement de terrain.',
      ],
    },

    uses: {
      title: 'À quoi servent les contributions',
      lead: 'Nous nous engageons à publier la répartition de nos dépenses.',
      items: [
        {
          title: 'Mobilisation de terrain',
          desc: 'Rencontres départementales, assemblées communales, matériel de mobilisation.',
          icon: 'pi-megaphone',
        },
        {
          title: 'Travail programmatique',
          desc: 'Études, consultations techniques et fonctionnement des commissions thématiques.',
          icon: 'pi-file',
        },
        {
          title: 'Communication',
          desc: "Impression, diffusion, site Web et outils d'information des militants.",
          icon: 'pi-send',
        },
        {
          title: 'Fonctionnement',
          desc: 'Secrétariat, logistique et charges courantes du groupement.',
          icon: 'pi-briefcase',
        },
      ],
    },

    methods: {
      title: 'Comment contribuer',
      lead: 'Les modalités de versement sont en cours de mise en place auprès du Secrétariat à la trésorerie.',
      // À COMPLÉTER : coordonnées bancaires, transfert mobile, contacts trésorerie
      items: [
        {
          title: 'Virement bancaire',
          desc: 'Coordonnées bancaires du groupement — à publier.',
          icon: 'pi-building-columns',
        },
        { title: 'Transfert mobile', desc: 'Numéro de transfert mobile — à publier.', icon: 'pi-mobile' },
        {
          title: 'Depuis la diaspora',
          desc: 'Modalités de contribution depuis l’étranger — à publier.',
          icon: 'pi-globe',
        },
        {
          title: 'Soutien en nature',
          desc: 'Matériel, local, compétence, temps bénévole : écrivez-nous.',
          icon: 'pi-gift',
        },
      ],
    },

    rules: {
      title: 'Nos règles de financement',
      lead: 'Nous nous imposons les règles que nous voulons imposer à la vie politique du pays.',
      items: [
        "Aucune contribution n'ouvre droit à une contrepartie politique, présente ou future.",
        "Nous refusons toute contribution dont l'origine ne peut être établie.",
        'Nous refusons tout financement conditionné à une orientation de notre programme.',
        'Les comptes du groupement font l’objet d’une présentation publique annuelle.',
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* CONTACT                                                             */
  /* ------------------------------------------------------------------ */

  contact: {
    intro: {
      eyebrow: 'Participer',
      title: 'Nous contacter',
      lead: 'Une question, une proposition, une critique, une demande presse : écrivez-nous, nous lisons tout.',
    },

    // À COMPLÉTER : coordonnées réelles du groupement
    channels: [
      { title: 'Secrétariat général', desc: 'contact@deboutpatriotes.ht', icon: 'pi-envelope' },
      { title: 'Presse et médias', desc: 'presse@deboutpatriotes.ht', icon: 'pi-megaphone' },
      { title: 'Adhésions', desc: 'adhesion@deboutpatriotes.ht', icon: 'pi-users' },
      { title: 'Téléphone', desc: '+509 — (à communiquer)', icon: 'pi-phone' },
    ],

    form: {
      title: 'Écrivez-nous',
      lead: 'Nous nous efforçons de répondre sous quelques jours ouvrables.',
      subjects: [
        'Information générale',
        'Adhésion et militantisme',
        'Contribution technique',
        'Demande presse',
        'Soutien et contribution',
        'Autre',
      ],
      submit: 'Envoyer le message',
      success: 'Merci, votre message est bien parti. Nous vous répondrons rapidement.',
    },

    office: {
      title: 'Siège du groupement',
      // À COMPLÉTER : adresse réelle du siège
      address: 'Adresse du siège — à communiquer, Port-au-Prince, Haïti',
      hours: 'Du lundi au vendredi, de 9h à 16h',
    },
  },

  /* ------------------------------------------------------------------ */
  /* PIED DE PAGE                                                        */
  /* ------------------------------------------------------------------ */

  footer: {
    about:
      "Groupement politique réunissant onze partis émergents autour d'une même vision : refonder l'État, reconstruire le pays et garantir de meilleures conditions de vie à la population.",
    columns: [
      {
        title: 'Le Groupement',
        links: [
          { label: 'À propos', url: '/a-propos' },
          { label: 'Notre vision', url: '/vision' },
          { label: 'Notre programme', url: '/programme' },
          { label: 'Organigramme', url: '/organigramme' },
        ],
      },
      {
        title: 'Actualités',
        links: [
          { label: 'Actualités', url: '/actualites' },
          { label: 'Événements', url: '/evenements' },
          { label: 'Espace presse', url: '/presse' },
          { label: 'Galerie', url: '/galerie' },
        ],
      },
      {
        title: 'Participer',
        links: [
          { label: 'Devenir membre', url: '/devenir-membre' },
          { label: 'Soutenir le groupement', url: '/faire-un-don' },
          { label: 'Nous contacter', url: '/contact' },
        ],
      },
    ],
    newsletter: {
      title: "Lettre d'information",
      desc: 'Recevez les positions et les activités du groupement.',
      placeholder: 'Votre adresse e-mail',
      submit: "S'abonner",
    },
    legal: 'Tous droits réservés.',
    credits: 'Debout pour Haïti, patriotes pour la Nation.',
  },
};
