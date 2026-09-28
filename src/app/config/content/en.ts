import { SiteContent } from '../../models/content.model';

/**
 * Contenu éditorial du site — version anglaise.
 *
 * Traduction de `fr.ts`, qui reste la version de référence : toute modification du texte
 * français doit être reportée ici. Les URL sont celles du site français ; le préfixe `/en`
 * est ajouté à l'affichage (voir `LocalizePipe`).
 */
export const en: SiteContent = {
  meta: {
    name: 'DEBOUT PATRIOTES',
    tagline: 'Standing for Haiti, patriots for the Nation.',
    description:
      'A Haitian political coalition bringing together eleven emerging parties around a shared vision of governance: rebuild the State, rebuild the country and guarantee better living conditions for the people.',
    // À COMPLÉTER : jour exact de la constitution formelle
    foundedOn: 'August 2026',
    partyCount: 'eleven (11)',
  },

  seo: {
    titleSuffix: ' — DEBOUT PATRIOTES',
    pages: {
      home: {
        title: 'DEBOUT PATRIOTES — Standing for Haiti, patriots for the Nation',
        description:
          'Eleven emerging political parties united around a shared vision: rebuild the State, rebuild the country and guarantee better living conditions for the Haitian people.',
      },
      about: {
        title: 'About us',
        description:
          'Formed in August 2026 upon registration with the CEP, DEBOUT PATRIOTES brings together eleven emerging political parties at a decisive crossroads in Haitian history.',
      },
      vision: {
        title: 'Our vision',
        description:
          'Putting Haiti back on the path to security, sovereignty, democratic legitimacy and progress: the vision of DEBOUT PATRIOTES.',
      },
      program: {
        title: 'Our programme',
        description:
          'The seven governance priorities agreed by the eleven member parties of DEBOUT PATRIOTES, submitted to public debate ahead of the general elections.',
      },
      org: {
        title: 'Organisation',
        description:
          'Assembly of member parties, General Coordination, secretariats, thematic commissions and departmental coordinations: how DEBOUT PATRIOTES is organised.',
      },
      candidates: {
        title: 'Our candidates',
        description:
          'The women and men carrying the colours of DEBOUT PATRIOTES in the upcoming general elections.',
      },
      news: {
        title: 'News',
        description:
          'Positions, field activities and the life of the eleven member parties of DEBOUT PATRIOTES.',
      },
      events: {
        title: 'Events',
        description:
          'Assemblies, departmental meetings, press conferences and mobilisations of DEBOUT PATRIOTES.',
      },
      press: {
        title: 'Press room',
        description: 'Official press releases, position papers and press contact for DEBOUT PATRIOTES.',
      },
      gallery: {
        title: 'Gallery',
        description:
          'Pictures from the assemblies, field meetings and life of the DEBOUT PATRIOTES coalition.',
      },
      join: {
        title: 'Become a member',
        description:
          'Activist, supporter, technical contributor, young person or member of the diaspora: join DEBOUT PATRIOTES.',
      },
      donate: {
        title: 'Support the coalition',
        description:
          'Independent politics needs independent means. Support the work of DEBOUT PATRIOTES.',
      },
      contact: {
        title: 'Contact us',
        description:
          'A question, a proposal, a criticism or a press enquiry: write to DEBOUT PATRIOTES.',
      },
      notFound: {
        title: 'Page not found',
        description: 'This page does not exist or has moved.',
      },
    },
    candidateNotFound: 'Candidate not found',
    postNotFound: 'Article not found',
  },

  ui: {
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    homeLink: 'DEBOUT PATRIOTES — home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    support: 'Donate',
    supportLong: 'Support the coalition',
    join: 'Become a member',
    otherLanguage: { label: 'FR', ariaLabel: 'Lire cette page en français' },
    contact: 'Contact',
    follow: 'Follow us',
    form: {
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
      choose: 'Choose…',
    },
  },

  nav: [
    { label: 'Home', url: '/' },
    {
      label: 'The Coalition',
      children: [
        { label: 'About us', url: '/a-propos' },
        { label: 'Our vision', url: '/vision' },
        { label: 'Our programme', url: '/programme' },
        { label: 'Organisation', url: '/organigramme' },
      ],
    },
    {
      label: 'News',
      children: [
        { label: 'News', url: '/actualites' },
        { label: 'Events', url: '/evenements' },
        { label: 'Press room', url: '/presse' },
        { label: 'Gallery', url: '/galerie' },
      ],
    },
    {
      label: 'Get involved',
      children: [
        { label: 'Become a member', url: '/devenir-membre' },
        { label: 'Support the coalition', url: '/faire-un-don' },
        { label: 'Contact us', url: '/contact' },
      ],
    },
    { label: 'Candidates', url: '/candidats' },
  ],

  /* ------------------------------------------------------------------ */
  /* ACCUEIL                                                             */
  /* ------------------------------------------------------------------ */

  home: {
    hero: {
      eyebrow: 'Political coalition · Haiti',
      title: 'Eleven parties, one single',
      highlight: 'demand for Haiti',
      subtitle:
        'At a decisive crossroads in our history, eleven emerging political parties are pooling their strengths and energy behind a shared vision of governance and of the defence of the higher interests of the Nation.',
      primaryCta: { label: 'Become a member', url: '/devenir-membre' },
      secondaryCta: { label: 'Discover our vision', url: '/vision' },
      imageAlt: 'DEBOUT PATRIOTES activists gathered together',
    },

    emblem: {
      eyebrow: 'Official identity',
      title: 'Our symbols',
      lead: 'A logo, three colours and a number: the official markers of DEBOUT PATRIOTES.',
      logoLabel: 'Official logo',
      logo: { src: '/img/home/bg-dp.png', alt: 'Official logo of DEBOUT PATRIOTES' },
      colorsLabel: 'Official colours',
      colors: [
        { name: 'Red', hex: '#BE1E2D' },
        { name: 'Green', hex: '#006838' },
        { name: 'Black', hex: '#000000' },
      ],
      numberLabel: 'Official number',
      number: '#16',
    },

    stats: [
      { value: '11', label: 'emerging political parties united' },
      { value: '1', label: 'shared vision of governance' },
      { value: '10 years', label: 'without general elections in Haiti' },
      { value: '2026', label: 'formal constitution of the coalition' },
    ],

    welcome: {
      eyebrow: 'Welcome',
      title: 'Welcome to DEBOUT PATRIOTES',
      paragraphs: [
        'The DEBOUT PATRIOTES political coalition is pleased to welcome you to its website.',
        'Formally constituted in August 2026, when political parties and coalitions registered with the Provisional Electoral Council (CEP) to take part in the upcoming general elections — the first in nearly ten years —, DEBOUT PATRIOTES brings together eleven emerging political parties that have chosen to walk together.',
        'Faced with the collapse of the State, the failure of the national elites and the rapid and alarming deterioration of the country’s overall situation, our leaders, members and supporters are standing up, ready to march, to move deliberately towards winning political power.',
      ],
      cta: { label: 'Read our full presentation', url: '/a-propos' },
      imageAlt: 'DEBOUT PATRIOTES rally',
    },

    identity: {
      title: 'Why DEBOUT? Why PATRIOTES?',
      lead: 'Our name is not a slogan. It is a commitment in two words, and each of them says something about who we are.',
      cards: [
        {
          title: 'DEBOUT',
          desc: '“Standing.” Because resignation, as we know, will not rebuild the country. To stand is to refuse to give up, to refuse to wait and see, and to get ready to march where others turn away.',
          icon: 'pi-flag',
        },
        {
          title: 'PATRIOTES',
          desc: '“Patriots.” Because we are convinced that politics must serve Haiti first, before it serves personal ambitions. The country comes before the party; the Nation comes before the career.',
          icon: 'pi-heart',
        },
      ],
    },

    pillars: {
      eyebrow: 'Our demands',
      title: 'Four demands to get Haiti moving again',
      lead: 'On the eve of the general elections, DEBOUT PATRIOTES is carrying a clear demand: put Haiti back on the path to security, sovereignty, democratic legitimacy and progress.',
      more: 'Read our vision in detail',
    },

    heritage: {
      eyebrow: 'Our heritage',
      title: 'The lesson of Independence',
      paragraphs: [
        'Without turning history into a slogan, DEBOUT PATRIOTES draws an essential lesson from the founder of the homeland, the Great Jean-Jacques Dessalines, and from the struggle for national Independence:',
        'when the Nation faces a historic ordeal, the ability to unite around a higher cause becomes a strength.',
        'This is the lesson we apply today: to come together without losing the identity of each member, to stand firm in the face of countless difficulties, and to act as consistent patriots.',
      ],
      attribution: 'The legacy of 1804, applied to the present',
    },

    candidates: {
      eyebrow: 'Our candidates',
      title: 'The faces of DEBOUT PATRIOTES',
      lead: 'Women and men standing tall, ready to serve Haiti in every department.',
      cta: { label: 'See all candidates', url: '/candidats' },
    },

    news: {
      title: 'Coalition news',
      lead: 'Positions, field activities and the life of the eleven member parties.',
      cta: { label: 'All news', url: '/actualites' },
    },

    cta: {
      title: 'The country needs you standing',
      desc: 'Activist, supporter, member of the diaspora or simply a citizen concerned about Haiti’s future: there is a place for you in this movement.',
      primary: { label: 'Join DEBOUT PATRIOTES', url: '/devenir-membre' },
      secondary: { label: 'Contact us', url: '/contact' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* CANDIDATS                                                           */
  /* ------------------------------------------------------------------ */

  candidates: {
    intro: {
      eyebrow: 'General elections',
      title: 'Our candidates',
      lead: '',
    },
    // Les fiches sont gérées dans le back-office (/admin/candidats).
    empty: 'The list of candidates will be published here once it has been approved by the CEP.',
    profile: {
      back: 'All candidates',
      sheet: 'At a glance',
      position: 'Running for',
      constituency: 'Constituency',
      party: 'Coalition',
      profession: 'Profession',
      professions: 'Professions',
      birthplace: 'Place of birth',
      bio: 'Biography',
      priorities: 'Priorities',
      career: 'Career',
      education: 'Education',
      contact: 'Contact',
      others: 'Meet the other candidates',
      notFound: 'This candidate could not be found. They may have been removed from the list, or the address is incorrect.',
      cta: {
        title: 'Support our candidates',
        desc: 'Join the DEBOUT PATRIOTES campaign teams or help fund our candidacies.',
        primary: { label: 'Become a member', url: '/devenir-membre' },
        secondary: { label: 'Donate', url: '/faire-un-don' },
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* À PROPOS                                                            */
  /* ------------------------------------------------------------------ */

  about: {
    intro: {
      eyebrow: 'The Coalition',
      title: 'About DEBOUT PATRIOTES',
      lead: 'A union of eleven emerging political parties, formed at a decisive and defining crossroads in Haitian history.',
    },

    story: {
      title: 'How we were born',
      paragraphs: [
        'DEBOUT PATRIOTES was formally constituted in August 2026, when the political parties and coalitions called to take part in the upcoming general elections registered with the Provisional Electoral Council (CEP).',
        'These elections have been awaited for nearly ten years. A decade during which the country has seen the legitimacy of its institutions erode, the safety of its citizens collapse and trust between the governing and the governed fall apart.',
        'It is in this context that eleven emerging political parties made a choice: rather than scatter, pool their strengths and energy behind a shared vision of how the country should be governed and of the defence of the higher interests of the Nation.',
      ],
    },

    diagnosis: {
      eyebrow: 'Where we start from',
      title: 'The reality that compels us',
      lead: 'We do not start from an abstraction. We start from what the Haitian people live through every day.',
      items: [
        {
          title: 'The collapse of the State',
          desc: 'Institutions unable to carry out their most basic duties: protecting, delivering justice, educating, providing care, overseeing the economy. The State has not only weakened — it has stopped being present where citizens need it.',
          icon: 'pi-building-columns',
        },
        {
          title: 'The failure of the national elites',
          desc: 'Political, economic and intellectual elites that have too often preferred preserving their positions to the responsibility that comes with their place in the Nation.',
          icon: 'pi-users',
        },
        {
          title: 'A rapid and alarming decline',
          desc: 'Insecurity, forced displacement, collapsing public services, impoverishment, brain drain: the country’s overall situation is deteriorating at a pace that no longer allows us to wait and see.',
          icon: 'pi-chart-line',
        },
      ],
    },

    answer: {
      title: 'Our response',
      paragraphs: [
        'As committed patriots, the leaders, members and supporters of our eleven parties are standing up, ready to march, to move deliberately towards winning political power.',
        'Winning power is not an end in itself. It is the means to reach three inseparable goals: rebuild the State, lay the foundations for the reconstruction of the country and guarantee better living conditions for the people.',
        'We do not ask for trust in the name of the past. We ask for it in the name of the work ahead, and we accept to be held accountable to citizens for it.',
      ],
    },

    charter: {
      eyebrow: 'Our charter',
      title: 'What holds us together',
      lead: 'A coalition is not a merger. These are the principles that guide our common path.',
      principles: [
        {
          title: 'Together, without losing our identities',
          desc: 'Each member party keeps its name, its structures, its doctrine and its freedom of speech. The coalition coordinates a shared vision; it absorbs no one.',
          icon: 'pi-share-alt',
        },
        {
          title: 'The Nation before the party',
          desc: 'The higher interests of the Nation come before party calculations. Every decision of the coalition is judged by that standard.',
          icon: 'pi-flag',
        },
        {
          title: 'Decisions by consensus',
          desc: 'Common orientations are adopted collectively by the Assembly of member parties, where each member has one vote.',
          icon: 'pi-comments',
        },
        {
          title: 'Accountability to citizens',
          desc: 'Whatever we announce, we must be able to explain it, cost it and account for it. Patriotism without accountability is just talk.',
          icon: 'pi-verified',
        },
      ],
    },

    parties: {
      eyebrow: 'Our members',
      title: 'The eleven member parties',
      lead: 'Eleven emerging political organisations, eleven histories, one shared vision of how to govern the country.',
      // À COMPLÉTER : remplacer par les dénominations officielles, sigles et
      // responsables communiqués par chaque parti membre.
      note: 'The official list of the eleven member parties, with their acronyms and leaders, will be published here as soon as the formalities with the CEP are completed.',
      list: [
        { name: 'Member party 1', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 2', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 3', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 4', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 5', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 6', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 7', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 8', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 9', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 10', acronym: '—', note: 'Name to be confirmed' },
        { name: 'Member party 11', acronym: '—', note: 'Name to be confirmed' },
      ],
    },

    cta: {
      title: 'Do you share this view?',
      desc: 'Then you are already halfway there. Join the women and men who have decided not to give up.',
      primary: { label: 'Become a member', url: '/devenir-membre' },
      secondary: { label: 'Read our vision', url: '/vision' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* VISION                                                              */
  /* ------------------------------------------------------------------ */

  vision: {
    intro: {
      eyebrow: 'The Coalition',
      title: 'Our vision',
      lead: 'Putting Haiti back on the path to security, sovereignty, democratic legitimacy and progress.',
    },

    statement: {
      title: 'What we want for the country',
      paragraphs: [
        'Our vision fits in one sentence: rebuild the State, lay the foundations for the reconstruction of the country and guarantee better living conditions for the people.',
        'Rebuild the State, because you cannot repair an institution that no longer fulfils any of its functions: you rebuild it on sound foundations, with clear rules, trained staff and real citizen oversight.',
        'Lay the foundations for reconstruction, because no single term will be enough to rebuild everything, but one term is enough to lay foundations that those who follow can no longer undo.',
        'Guarantee better living conditions, because that — and nothing else — is how the success of a policy is measured.',
      ],
    },

    pillarsIntro: {
      eyebrow: 'Our four pillars',
      title: 'Security, sovereignty, democratic legitimacy, progress',
      lead: 'Four inseparable demands. None holds without the other three.',
    },
    pillarCount: (index, total) => `Pillar ${index} / ${total}`,
    pillarPoints: 'What this means',

    pillars: [
      {
        key: 'securite',
        title: 'Security',
        tagline: 'The first of all freedoms',
        desc: 'Without security, no right can be exercised, no economic activity is possible, no election is credible. Restoring the safety of people and property is the precondition for everything else, and therefore our first demand.',
        points: [
          'Restore the authority of the State across the entire national territory',
          'Give the security forces the resources, training and oversight they need',
          'Rebuild a criminal justice chain that works, from investigation to trial',
          'Enable the dignified and organised return of displaced people',
        ],
        icon: 'pi-shield',
      },
      {
        key: 'souverainete',
        title: 'Sovereignty',
        tagline: 'Haiti decides for Haiti',
        desc: 'A country whose decisions are made elsewhere cannot get back on its feet. Sovereignty is not isolation: it is the ability to set one’s own priorities, to negotiate cooperation as an equal and to feed one’s people with one’s own production.',
        points: [
          'Take back national control of public decision-making',
          'Rebuild international cooperation on partnership, not guardianship',
          'Revive national production, starting with agriculture',
          'Protect the country’s heritage, resources and borders',
        ],
        icon: 'pi-globe',
      },
      {
        key: 'legitimite',
        title: 'Democratic legitimacy',
        tagline: 'Power comes from the people',
        desc: 'After nearly ten years without elections, rebuilding democratic legitimacy is an institutional emergency. Credible elections, respected mandates, accountability to the people: this is the basis of the contract we want to restore.',
        points: [
          'Hold free, fair and verifiable general elections',
          'Restore elected institutions at every level, down to local government',
          'Guarantee political pluralism and freedom of the press',
          'Report publicly and regularly on every commitment made',
        ],
        icon: 'pi-check-square',
      },
      {
        key: 'progres',
        title: 'Progress',
        tagline: 'Living conditions that change',
        desc: 'Progress is not an abstract promise: it is water, electricity, a school that works, an open clinic, a job that feeds a family. Every public policy must be judged by what it concretely changes in people’s lives.',
        points: [
          'Restore access to essential services: water, energy, health, education',
          'Create the conditions for jobs and productive investment',
          'Invest in young people and vocational training',
          'Reduce regional inequalities between the capital and the provinces',
        ],
        icon: 'pi-chart-bar',
      },
    ],

    values: {
      eyebrow: 'Our values',
      title: 'Our values',
      lead: 'What binds us in how we act, not only in what we aim for.',
      items: [
        {
          title: 'Consistent patriotism',
          desc: 'A patriotism proven by actions and results, not by statements. Serving Haiti before serving personal ambitions.',
          icon: 'pi-flag-fill',
        },
        {
          title: 'Unity in diversity',
          desc: 'Coming together without losing the identity of each member. The plurality of our eleven parties is a strength, not an obstacle.',
          icon: 'pi-users',
        },
        {
          title: 'Perseverance',
          desc: 'Standing firm in the face of countless difficulties. We do not wait for conditions to become easy before acting.',
          icon: 'pi-arrow-up',
        },
        {
          title: 'Integrity',
          desc: 'Managing public goods is a mandate, never an opportunity. We apply to ourselves the rules we want to impose.',
          icon: 'pi-lock',
        },
        {
          title: 'Human dignity',
          desc: 'Every Haitian woman and man has the right to safety, respect and the means of a decent life on their own land.',
          icon: 'pi-heart',
        },
        {
          title: 'Accountability',
          desc: 'Power must answer for itself. It is overseen, it explains itself, and it is assessed by those who entrusted it.',
          icon: 'pi-verified',
        },
      ],
    },

    horizon: {
      title: 'Our horizon',
      lead: 'Three inseparable goals that give meaning to winning political power.',
      items: [
        {
          title: 'Rebuild the State',
          desc: 'Rebuild institutions capable of ensuring security, justice, public services and the regulation of the economy.',
          icon: 'pi-building-columns',
        },
        {
          title: 'Rebuild the country',
          desc: 'Lay the foundations for lasting reconstruction: infrastructure, national production, land-use planning, human capital.',
          icon: 'pi-wrench',
        },
        {
          title: 'Improve people’s lives',
          desc: 'Guarantee better living conditions for the people: the only measure of success we accept.',
          icon: 'pi-home',
        },
      ],
    },

    cta: {
      title: 'This vision will only have strength if it is shared',
      desc: 'Spread it, discuss it, carry it forward. And if it is yours too, march with us.',
      primary: { label: 'Discover our programme', url: '/programme' },
      secondary: { label: 'Become a member', url: '/devenir-membre' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* PROGRAMME                                                           */
  /* ------------------------------------------------------------------ */

  program: {
    intro: {
      eyebrow: 'The Coalition',
      title: 'Our programme',
      lead: 'The governance priorities agreed by the eleven member parties of DEBOUT PATRIOTES, to be submitted to public debate ahead of the general elections.',
    },

    disclaimer:
      'This document sets out the policy orientations adopted by the Assembly of member parties. The detailed, fully costed programme will be published and publicly debated before the vote.',

    method: {
      eyebrow: 'Our method',
      title: 'How this programme is built',
      lead: 'We reject a programme written behind closed doors by a few and discovered by the people on election day.',
      steps: [
        {
          title: '1. Agreement on the priorities',
          desc: 'The eleven parties set the main priorities together, by consensus, in the Assembly of member parties.',
          icon: 'pi-sitemap',
        },
        {
          title: '2. Work of the commissions',
          desc: 'Each priority is developed by a thematic commission bringing together elected officials, experts and people from the sector.',
          icon: 'pi-briefcase',
        },
        {
          title: '3. Citizen consultation',
          desc: 'Proposals are tested on the ground: departmental assemblies, grassroots organisations, the diaspora.',
          icon: 'pi-megaphone',
        },
        {
          title: '4. Publication and accountability',
          desc: 'The final programme is published and costed, and its implementation is reported on publicly and regularly.',
          icon: 'pi-file',
        },
      ],
    },

    axesSummary: (count) => `The ${count} priorities of the programme`,
    measuresLabel: 'Key measures',

    axes: [
      {
        number: '01',
        title: 'Security and justice',
        objective:
          'Restore the safety of people and property across the whole territory, and a justice system that works and that citizens can turn to.',
        measures: [
          'Restore the authority of the State over areas currently out of control',
          'Strengthen the staffing, training, equipment and internal oversight of the Haitian National Police',
          'Repair the criminal justice chain: investigation, prosecution, trial, enforcement of sentences',
          'Fight arms and ammunition trafficking and the financing of armed groups',
          'Ensure the organised return and dignified resettlement of displaced people',
          'Guarantee the genuine independence of the judiciary',
        ],
        icon: 'pi-shield',
      },
      {
        number: '02',
        title: 'Rebuilding the State and governance',
        objective:
          'Rebuild a public administration that is capable, honest and present across the whole territory.',
        measures: [
          'Public administration reform: merit-based recruitment, training, evaluation',
          'Digitisation of essential public services and national registers',
          'Budget transparency: accessible publication of revenue, spending and public contracts',
          'Strengthening oversight institutions and the fight against corruption',
          'Genuine decentralisation and transfer of resources to local authorities',
          'A reliable and accessible civil registry for every citizen',
        ],
        icon: 'pi-building-columns',
      },
      {
        number: '03',
        title: 'Economy, national production and jobs',
        objective:
          'Revive national production, create jobs and reduce the country’s food dependency.',
        measures: [
          'Agricultural recovery plan: inputs, irrigation, rural credit, storage, farm roads',
          'Support for local processing and high value-added sectors',
          'Support for micro, small and medium-sized enterprises and youth entrepreneurship',
          'Access to productive credit and financial inclusion',
          'Energy policy: sustainable production, distribution and pricing',
          'Channelling diaspora remittances into productive investment',
        ],
        icon: 'pi-briefcase',
      },
      {
        number: '04',
        title: 'Education, health and social protection',
        objective:
          'Restore real access to essential services everywhere, and make young people the country’s budget priority.',
        measures: [
          'Accessible, quality schools: infrastructure, canteens, textbooks, teacher status',
          'Upgrading and expanding vocational and technical training',
          'Rebuilding the primary healthcare network and supplying essential medicines',
          'Access to drinking water and sanitation in communes and communal sections',
          'Targeted social protection for the most vulnerable households',
          'Housing policy and a structural response to the displacement crisis',
        ],
        icon: 'pi-heart',
      },
      {
        number: '05',
        title: 'Sovereignty and foreign relations',
        objective:
          'Give Haiti back control over its decisions and rebuild its cooperation on partnership rather than guardianship.',
        measures: [
          'A clear national doctrine on cooperation and security',
          'Renegotiation of agreements contrary to the higher interests of the Nation',
          'Effective control of land and maritime borders',
          'Protection of natural resources and the national heritage',
          'Active diplomacy serving the Haitian diaspora and the country’s image',
          'Regional cooperation on reciprocal and verifiable terms',
        ],
        icon: 'pi-globe',
      },
      {
        number: '06',
        title: 'Democracy, youth, women and the diaspora',
        objective:
          'Rebuild democratic legitimacy and truly open public decision-making to those who are excluded from it.',
        measures: [
          'Free, fair, verifiable general elections accepted by all',
          'Reform of party funding and transparency of campaigns',
          'Real participation of women in political and administrative decision-making',
          'A national youth policy: training, jobs, culture, sport',
          'Political rights and organised participation of the diaspora',
          'Freedom of the press and protection of journalists',
        ],
        icon: 'pi-users',
      },
      {
        number: '07',
        title: 'Environment and land-use planning',
        objective:
          'Protect a fragile territory and prepare the country for climate and seismic risks.',
        measures: [
          'National programme of reforestation and watershed protection',
          'Waste management and urban sanitation',
          'Building standards and prevention of earthquake and hurricane risks',
          'Balanced land-use planning and easing congestion in the capital',
          'Protection of the coastline and fishery resources',
          'An energy transition suited to the country’s realities',
        ],
        icon: 'pi-sun',
      },
    ],

    cta: {
      title: 'This programme concerns you',
      desc: 'It will be publicly debated before the vote. Send us your comments, criticisms and proposals.',
      primary: { label: 'Join the debate', url: '/contact' },
      secondary: { label: 'Become a member', url: '/devenir-membre' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* ORGANIGRAMME                                                        */
  /* ------------------------------------------------------------------ */

  org: {
    intro: {
      eyebrow: 'The Coalition',
      title: 'Organisation',
      lead: 'How DEBOUT PATRIOTES organises itself to decide together without erasing any of its members.',
    },

    principle: {
      title: 'A simple principle',
      paragraphs: [
        'DEBOUT PATRIOTES is a coalition, not a merger. Each of the eleven member parties keeps its name, its bodies and its freedom of speech.',
        'Our common bodies have only one role: to set the shared vision, coordinate action and speak with one voice on matters that commit the Nation.',
        'Each member party has one vote in the Assembly of member parties, whatever its size. This is the condition for trust between us.',
      ],
    },

    levelsIntro: {
      eyebrow: 'Our bodies',
      title: 'From the Assembly to the communal sections',
      lead: 'Six levels, from the most sovereign to the closest to the ground.',
    },

    levels: [
      {
        title: 'Assembly of member parties',
        role: 'The sovereign body of the coalition. It brings together the delegations of the eleven parties, sets the shared vision and orientations, approves the programme and appoints the General Coordination. One vote per member party.',
        // À COMPLÉTER : composition des délégations
        members: ['Eleven delegations — composition to be published'],
      },
      {
        title: 'General Coordination',
        role: 'The executive of the coalition between assemblies. It implements decisions, represents DEBOUT PATRIOTES externally and leads the work of the secretariats.',
        // À COMPLÉTER : coordonnateur général et coordonnateurs adjoints
        members: ['General Coordinator — to be appointed', 'Deputy Coordinators — to be appointed'],
      },
      {
        title: 'Executive Secretariat',
        role: 'The backbone of the coalition: internal organisation, follow-up of decisions, relations with local structures, archives and administration.',
        members: ['General Secretariat', 'Treasury', 'Organisation and mobilisation'],
      },
      {
        title: 'Communications Secretariat',
        role: 'The public voice of the coalition: press releases, media relations, social networks, website and materials for activists.',
        members: ['Spokesperson — to be appointed', 'Press and media relations', 'Digital communications'],
      },
      {
        title: 'Thematic commissions',
        role: 'In-depth work on each of the programme’s priorities. They bring together officials of the member parties, experts and people from the sectors concerned.',
        members: ['Seven commissions, one per programme priority'],
      },
      {
        title: 'Departmental coordinations',
        role: 'The coalition’s presence on the ground, in the ten departments and the communal sections: local roots, mobilisation, feedback on local realities.',
        members: ['Ten departmental coordinations', 'Communal coordinations'],
      },
    ],

    namesNote:
      'The people in charge of each body will be named on this page as soon as they are appointed by the Assembly of member parties.',

    commissions: {
      title: 'The thematic commissions',
      lead: 'Each priority of the programme is developed by a dedicated commission, open to expertise from outside the coalition.',
      items: [
        {
          title: 'Security and justice',
          desc: 'Security doctrine, police reform, criminal justice chain, judicial independence.',
          icon: 'pi-shield',
        },
        {
          title: 'Rebuilding the State',
          desc: 'Public administration, decentralisation, transparency, fight against corruption.',
          icon: 'pi-building-columns',
        },
        {
          title: 'Economy and production',
          desc: 'Agriculture, businesses, jobs, energy, public finances.',
          icon: 'pi-briefcase',
        },
        {
          title: 'Education, health and social affairs',
          desc: 'Schools, training, primary healthcare, water, social protection, housing.',
          icon: 'pi-heart',
        },
        {
          title: 'Sovereignty and foreign affairs',
          desc: 'International cooperation, borders, resources, diaspora.',
          icon: 'pi-globe',
        },
        {
          title: 'Democracy and participation',
          desc: 'Elections, youth, women, civil society, freedom of the press.',
          icon: 'pi-users',
        },
        {
          title: 'Environment and territory',
          desc: 'Reforestation, risks, sanitation, land-use planning.',
          icon: 'pi-sun',
        },
      ],
    },

    territory: {
      title: 'Where we are present',
      lead: 'The coalition is built first on the ground, in the country’s ten departments and within the diaspora.',
      items: [
        {
          title: '10 departments',
          desc: 'One departmental coordination per department, relayed at commune level.',
          icon: 'pi-map',
        },
        {
          title: 'Communal sections',
          desc: 'Grassroots committees as close as possible to people’s daily realities.',
          icon: 'pi-map-marker',
        },
        {
          title: 'Diaspora',
          desc: 'Organised branches within Haitian communities abroad.',
          icon: 'pi-globe',
        },
      ],
    },

    cta: {
      title: 'An open structure',
      desc: 'The thematic commissions and local coordinations welcome new skills. Yours may be the one that is missing.',
      primary: { label: 'Offer my contribution', url: '/devenir-membre' },
      secondary: { label: 'Write to us', url: '/contact' },
    },
  },

  /* ------------------------------------------------------------------ */
  /* ACTUALITÉS                                                          */
  /* ------------------------------------------------------------------ */

  news: {
    intro: {
      eyebrow: 'News',
      title: 'Coalition news',
      lead: 'Positions, field activities, the life of the eleven member parties and the milestones of our path to the general elections.',
    },
    // Rubriques et articles sont gérés dans le back-office (/admin/articles).
    all: 'All',
    filterLabel: 'Filter by category',
    empty:
      'No posts yet. The coalition’s first news will appear here. Subscribe to our newsletter so you don’t miss anything.',
    more: 'Show more news',
    readMore: 'Read the article',
    article: {
      back: 'All news',
      related: 'Also worth reading',
      notFound: 'This article could not be found. It may have been removed, or the address is incorrect.',
      cta: {
        title: 'The country needs you standing',
        desc: 'Activist, supporter, member of the diaspora or simply a citizen concerned about Haiti’s future: there is a place for you in this movement.',
        primary: { label: 'Join DEBOUT PATRIOTES', url: '/devenir-membre' },
        secondary: { label: 'Contact us', url: '/contact' },
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* ÉVÉNEMENTS                                                          */
  /* ------------------------------------------------------------------ */

  events: {
    intro: {
      eyebrow: 'News',
      title: 'Events',
      lead: 'Assemblies, departmental meetings, press conferences and mobilisations of DEBOUT PATRIOTES.',
    },
    // À COMPLÉTER : agenda réel du groupement
    items: [],
    empty:
      'No public events scheduled yet. The calendar of assemblies and departmental meetings will be published here.',
  },

  /* ------------------------------------------------------------------ */
  /* PRESSE                                                              */
  /* ------------------------------------------------------------------ */

  press: {
    intro: {
      eyebrow: 'News',
      title: 'Press room',
      lead: 'Official press releases, position papers and reference documents from DEBOUT PATRIOTES, available to journalists.',
    },
    contact: {
      title: 'Press contact',
      desc: 'For interview requests, reactions or accreditation, the Communications Secretariat answers journalists.',
      // À COMPLÉTER : coordonnées presse réelles
      email: 'presse@deboutpatriotes.ht',
      phone: '+509 — (to be announced)',
    },
    documents: {
      title: 'Press releases and documents',
      lead: 'All official documents published by the coalition, from newest to oldest.',
    },
    kinds: {
      communique: 'Press release',
      note: 'Note',
      declaration: 'Statement',
      dossier: 'Briefing',
    },
    download: 'Download the document',
    items: [],
    empty:
      'No documents published yet. The coalition’s press releases and position papers will be archived here.',
  },

  /* ------------------------------------------------------------------ */
  /* GALERIE                                                             */
  /* ------------------------------------------------------------------ */

  gallery: {
    intro: {
      eyebrow: 'News',
      title: 'Gallery',
      lead: 'Pictures from our assemblies, our field meetings and the life of the coalition.',
    },
    albums: [],
    photos: 'photos',
    empty: 'The gallery will be filled as the coalition’s activities unfold.',
  },

  /* ------------------------------------------------------------------ */
  /* DEVENIR MEMBRE                                                      */
  /* ------------------------------------------------------------------ */

  join: {
    intro: {
      eyebrow: 'Get involved',
      title: 'Become a member',
      lead: 'Resignation will not rebuild the country. Standing up starts with a personal commitment.',
    },

    why: {
      title: 'Why join us',
      items: [
        {
          title: 'Because this is a decisive moment',
          desc: 'After nearly ten years without elections, the next vote will set the country’s direction for a generation.',
          icon: 'pi-clock',
        },
        {
          title: 'Because division has cost us dearly',
          desc: 'Eleven parties chose to unite rather than divide. That choice needs activists to become a force.',
          icon: 'pi-users',
        },
        {
          title: 'Because your skills are needed',
          desc: 'Our thematic commissions need technicians, teachers, doctors, agronomists, lawyers and engineers.',
          icon: 'pi-star',
        },
      ],
    },

    profiles: {
      title: 'There are many ways to march with us',
      lead: 'You do not need to be a card-carrying party member to be useful to the coalition.',
      items: [
        {
          title: 'Party member',
          desc: 'You join one of the eleven member parties and take part in the life of the coalition.',
          icon: 'pi-flag',
        },
        {
          title: 'Supporter',
          desc: 'You back the initiative, share our positions and attend public meetings.',
          icon: 'pi-heart',
        },
        {
          title: 'Expert and contributor',
          desc: 'You bring your technical expertise to the thematic commissions.',
          icon: 'pi-briefcase',
        },
        {
          title: 'Youth',
          desc: 'You are under 35 and want to shape the future of the country you will live in.',
          icon: 'pi-bolt',
        },
        {
          title: 'Diaspora',
          desc: 'You live abroad and want to contribute as more than a spectator.',
          icon: 'pi-globe',
        },
        {
          title: 'Field volunteer',
          desc: 'You give your time for mobilisation, logistics and local action.',
          icon: 'pi-users',
        },
      ],
    },

    commitment: {
      title: 'Our commitments to you',
      items: [
        'Your personal data is used only for the life of the coalition and is never passed on to third parties.',
        'You are kept informed of the decisions of the Assembly of member parties and of the coalition’s public positions.',
        'You can contribute to the work of a thematic commission that matches your skills.',
        'You can withdraw at any time, simply by asking in writing.',
      ],
    },

    form: {
      title: 'Membership form',
      lead: 'Fill in this form: a departmental coordination or the secretariat will get back to you.',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      phone: 'Phone',
      departement: 'Department',
      profile: 'I would like to be',
      skills: 'Skills or area of expertise',
      skillsPlaceholder: 'Agronomy, law, public health, engineering, education…',
      message: 'Your message',
      messagePlaceholder: 'Tell us in a few words what you would like to bring to the coalition.',
      consentRequired: 'Your consent is required to continue.',
      consent:
        'I agree that DEBOUT PATRIOTES may keep this information to contact me and keep me informed of its activities.',
      submit: 'Send my application',
      success: 'Thank you. Your application has been received and we will get back to you shortly.',
    },

    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Do I have to leave my party to join DEBOUT PATRIOTES?',
          a: 'No. DEBOUT PATRIOTES is a coalition, not a merger. Each member party keeps its name, its structures and its doctrine. If your party is a member of the coalition, you are already marching with us.',
        },
        {
          q: 'Is there a membership fee?',
          a: 'Joining the coalition does not require any payment. Any membership dues are a matter for each member party, according to its own statutes.',
        },
        {
          q: 'I live abroad — can I take part?',
          a: 'Yes. The coalition organises branches within Haitian diaspora communities, which take part in the work of the commissions and in mobilisation.',
        },
        {
          q: 'I don’t want to be active in any party, but I want to help. Is that possible?',
          a: 'Yes. You can be a supporter, a field volunteer or a technical contributor to a thematic commission, without joining any party.',
        },
        {
          q: 'How can I find out which eleven parties are members?',
          a: 'The official list, with the acronyms and leaders of each organisation, will be published on the “About us” page as soon as the formalities with the CEP are completed.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* SOUTENIR                                                            */
  /* ------------------------------------------------------------------ */

  donate: {
    intro: {
      eyebrow: 'Get involved',
      title: 'Support the coalition',
      lead: 'Independent politics needs independent means. Your support makes it possible.',
    },

    why: {
      title: 'Why your support matters',
      paragraphs: [
        'A coalition that depends on a handful of donors ends up answering to them rather than to the people. We would rather answer to many citizens than to a few interests.',
        'Every contribution, however modest, funds something concrete: a departmental meeting, a working paper, a sound system, a field trip.',
      ],
    },

    uses: {
      title: 'What contributions are used for',
      lead: 'We are committed to publishing a breakdown of our spending.',
      items: [
        {
          title: 'Field mobilisation',
          desc: 'Departmental meetings, communal assemblies, campaign materials.',
          icon: 'pi-megaphone',
        },
        {
          title: 'Policy work',
          desc: 'Studies, technical consultations and the running of the thematic commissions.',
          icon: 'pi-file',
        },
        {
          title: 'Communication',
          desc: 'Printing, distribution, website and information tools for activists.',
          icon: 'pi-send',
        },
        {
          title: 'Operations',
          desc: 'Secretariat, logistics and the coalition’s running costs.',
          icon: 'pi-briefcase',
        },
      ],
    },

    methods: {
      title: 'How to contribute',
      lead: 'Payment options are currently being set up with the Treasury Secretariat.',
      // À COMPLÉTER : coordonnées bancaires, transfert mobile, contacts trésorerie
      items: [
        {
          title: 'Bank transfer',
          desc: 'The coalition’s bank details — to be published.',
          icon: 'pi-building-columns',
        },
        { title: 'Mobile money', desc: 'Mobile money number — to be published.', icon: 'pi-mobile' },
        {
          title: 'From the diaspora',
          desc: 'How to contribute from abroad — to be published.',
          icon: 'pi-globe',
        },
        {
          title: 'In-kind support',
          desc: 'Equipment, premises, skills, volunteer time: write to us.',
          icon: 'pi-gift',
        },
      ],
      note: {
        before: 'Until the official payment details are published,',
        link: 'write to us',
        after: ': the Treasury Secretariat will tell you how to proceed.',
      },
    },

    rules: {
      title: 'Our funding rules',
      lead: 'We hold ourselves to the rules we want to impose on the country’s political life.',
      items: [
        'No contribution entitles anyone to any political favour, now or in the future.',
        'We refuse any contribution whose origin cannot be established.',
        'We refuse any funding that is conditional on the direction of our programme.',
        'The coalition’s accounts are presented publicly every year.',
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* CONTACT                                                             */
  /* ------------------------------------------------------------------ */

  contact: {
    intro: {
      eyebrow: 'Get involved',
      title: 'Contact us',
      lead: 'A question, a proposal, a criticism, a press enquiry: write to us — we read everything.',
    },

    channelsTitle: 'How to reach us',
    // À COMPLÉTER : coordonnées réelles du groupement
    channels: [
      { title: 'General Secretariat', desc: 'contact@deboutpatriotes.ht', icon: 'pi-envelope' },
      { title: 'Press and media', desc: 'presse@deboutpatriotes.ht', icon: 'pi-megaphone' },
      { title: 'Membership', desc: 'adhesion@deboutpatriotes.ht', icon: 'pi-users' },
      { title: 'Phone', desc: '+509 — (to be announced)', icon: 'pi-phone' },
    ],

    form: {
      title: 'Write to us',
      lead: 'We aim to reply within a few working days.',
      name: 'Full name',
      email: 'Email address',
      subject: 'Subject',
      message: 'Message',
      messageTooShort: 'Your message must be at least 10 characters long.',
      subjects: [
        'General information',
        'Membership and activism',
        'Technical contribution',
        'Press enquiry',
        'Support and donations',
        'Other',
      ],
      submit: 'Send message',
      success: 'Thank you, your message has been sent. We will get back to you shortly.',
    },

    office: {
      title: 'Coalition headquarters',
      // À COMPLÉTER : adresse réelle du siège
      address: 'Headquarters address — to be announced, Port-au-Prince, Haiti',
      hours: 'Monday to Friday, 9 a.m. to 4 p.m.',
    },

    networks: {
      title: 'On social media',
      desc: 'Follow the coalition’s positions and activities day by day.',
    },
  },

  /* ------------------------------------------------------------------ */
  /* PAGE INTROUVABLE                                                    */
  /* ------------------------------------------------------------------ */

  notFound: {
    title: 'This page could not be found',
    lead: 'The link you followed leads nowhere, or the page has moved. Let’s start again from the beginning.',
    home: 'Back to the home page',
    report: 'Report the problem',
  },

  /* ------------------------------------------------------------------ */
  /* PIED DE PAGE                                                        */
  /* ------------------------------------------------------------------ */

  footer: {
    about:
      'A political coalition bringing together eleven emerging parties around a shared vision: rebuild the State, rebuild the country and guarantee better living conditions for the people.',
    columns: [
      {
        title: 'The Coalition',
        links: [
          { label: 'About us', url: '/a-propos' },
          { label: 'Our vision', url: '/vision' },
          { label: 'Our programme', url: '/programme' },
          { label: 'Organisation', url: '/organigramme' },
        ],
      },
      {
        title: 'News',
        links: [
          { label: 'News', url: '/actualites' },
          { label: 'Events', url: '/evenements' },
          { label: 'Press room', url: '/presse' },
          { label: 'Gallery', url: '/galerie' },
        ],
      },
      {
        title: 'Get involved',
        links: [
          { label: 'Become a member', url: '/devenir-membre' },
          { label: 'Support the coalition', url: '/faire-un-don' },
          { label: 'Contact us', url: '/contact' },
        ],
      },
    ],
    newsletter: {
      title: 'Newsletter',
      desc: 'Receive the coalition’s positions and activities.',
      placeholder: 'Your email address',
      submit: 'Subscribe',
    },
    legal: 'All rights reserved.',
    credits: 'Standing for Haiti, patriots for the Nation.',
  },
};
