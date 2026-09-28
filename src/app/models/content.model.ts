/**
 * Formes de contenu partagées par toutes les pages du site.
 * Une locale = un fichier dans `config/content/` qui implémente `SiteContent`.
 */

import { ImageFocus } from './image.model';

export interface PageIntro {
  eyebrow?: string;
  title: string;
  lead: string;
}

export interface Feature {
  title: string;
  desc: string;
  icon?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Pillar {
  key: string;
  title: string;
  tagline: string;
  desc: string;
  points: string[];
  icon: string;
}

export interface ProgramAxis {
  number: string;
  title: string;
  objective: string;
  measures: string[];
  icon: string;
}

export interface OrgNode {
  title: string;
  role: string;
  members?: string[];
}

export interface MemberParty {
  name: string;
  acronym: string;
  lead?: string;
  note?: string;
}

/** Fiche candidat telle que renvoyée par l'API (`GET /api/candidates`), saisie dans le back-office. */
export interface Candidate {
  id?: number;
  /** Identifiant d'URL : `/candidats/<slug>`. */
  slug: string;
  name: string;
  subtitle?: string | null;
  /** Portrait ImageKit affiché sur la fiche, à côté de la biographie. */
  photo?: string | null;
  /** Cadrage du portrait choisi dans le back-office. */
  photoFocus?: ImageFocus | null;
  /** Visuel de couverture des cartes (accueil et liste complète). À défaut, le portrait est repris. */
  cover?: string | null;
  /** Cadrage de la couverture choisi dans le back-office. */
  coverFocus?: ImageFocus | null;
  /** Poste brigué. */
  position?: string | null;
  constituency?: string | null;
  party?: string | null;
  /** Une ou plusieurs professions. */
  professions: string[];
  birthplace?: string | null;
  quote?: string | null;
  bio: string[];
  priorities: Feature[];
  career: { period: string; title: string; desc?: string | null }[];
  education: string[];
  contact?: { email?: string; facebook?: string; x?: string; instagram?: string } | null;
}

export interface EventItem {
  slug: string;
  date: string;
  time?: string;
  place: string;
  city: string;
  title: string;
  desc: string;
  kind: string;
}

export interface PressItem {
  date: string;
  kind: 'communique' | 'note' | 'declaration' | 'dossier';
  title: string;
  excerpt: string;
  file?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface CtaContent {
  title: string;
  desc: string;
  primary: { label: string; url: string };
  secondary?: { label: string; url: string };
}

/** Pages dont le titre d'onglet et la description SEO sont fixes (voir `app.routes.ts`). */
export type SeoPage =
  | 'home'
  | 'about'
  | 'vision'
  | 'program'
  | 'org'
  | 'candidates'
  | 'news'
  | 'events'
  | 'press'
  | 'gallery'
  | 'join'
  | 'donate'
  | 'contact'
  | 'notFound';

/** Libellés des champs d'un formulaire. */
export interface FormLabels {
  required: string;
  invalidEmail: string;
  choose: string;
}

export interface SiteContent {
  meta: {
    name: string;
    tagline: string;
    description: string;
    foundedOn: string;
    partyCount: string;
  };

  /** Titres d'onglet (sans le suffixe, sauf l'accueil) et descriptions SEO. */
  seo: {
    titleSuffix: string;
    pages: Record<SeoPage, { title: string; description: string }>;
    candidateNotFound: string;
    postNotFound: string;
  };

  /** Libellés d'interface communs : en-tête, pied de page, formulaires. */
  ui: {
    skipToContent: string;
    mainNav: string;
    homeLink: string;
    openMenu: string;
    closeMenu: string;
    support: string;
    supportLong: string;
    join: string;
    /** Nom de la langue proposée par le sélecteur, et son libellé accessible. */
    otherLanguage: { label: string; ariaLabel: string };
    contact: string;
    follow: string;
    form: FormLabels;
  };

  nav: {
    label: string;
    url?: string;
    children?: { label: string; url: string }[];
  }[];

  home: {
    hero: {
      eyebrow: string;
      title: string;
      highlight: string;
      subtitle: string;
      primaryCta: { label: string; url: string };
      secondaryCta: { label: string; url: string };
      imageAlt: string;
    };
    emblem: {
      eyebrow: string;
      title: string;
      lead: string;
      logoLabel: string;
      logo: { src: string; alt: string };
      colorsLabel: string;
      colors: { name: string; hex: string }[];
      numberLabel: string;
      number: string;
    };
    stats: Stat[];
    welcome: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      cta: { label: string; url: string };
      imageAlt: string;
    };
    identity: { title: string; lead: string; cards: Feature[] };
    pillars: { eyebrow: string; title: string; lead: string; more: string };
    heritage: { eyebrow: string; title: string; paragraphs: string[]; attribution: string };
    candidates: { eyebrow: string; title: string; lead: string; cta: { label: string; url: string } };
    news: { title: string; lead: string; cta: { label: string; url: string } };
    cta: CtaContent;
  };

  /** Libellés des pages candidats ; les fiches elles-mêmes viennent de l'API. */
  candidates: {
    intro: PageIntro;
    empty: string;
    profile: {
      back: string;
      sheet: string;
      position: string;
      constituency: string;
      party: string;
      profession: string;
      /** Employé dès qu'un candidat exerce plusieurs professions. */
      professions: string;
      birthplace: string;
      bio: string;
      priorities: string;
      career: string;
      education: string;
      contact: string;
      others: string;
      notFound: string;
      cta: CtaContent;
    };
  };

  about: {
    intro: PageIntro;
    story: { title: string; paragraphs: string[] };
    diagnosis: { eyebrow: string; title: string; lead: string; items: Feature[] };
    answer: { title: string; paragraphs: string[] };
    charter: { eyebrow: string; title: string; lead: string; principles: Feature[] };
    parties: { eyebrow: string; title: string; lead: string; note: string; list: MemberParty[] };
    cta: CtaContent;
  };

  vision: {
    intro: PageIntro;
    statement: { title: string; paragraphs: string[] };
    pillarsIntro: { eyebrow: string; title: string; lead: string };
    /** Numérotation des piliers, ex. « Pilier 1 / 4 ». */
    pillarCount: (index: number, total: number) => string;
    pillarPoints: string;
    pillars: Pillar[];
    values: { eyebrow: string; title: string; lead: string; items: Feature[] };
    horizon: { title: string; lead: string; items: Feature[] };
    cta: CtaContent;
  };

  program: {
    intro: PageIntro;
    disclaimer: string;
    method: { eyebrow: string; title: string; lead: string; steps: Feature[] };
    /** Titre du sommaire, ex. « Les 7 axes du programme ». */
    axesSummary: (count: number) => string;
    measuresLabel: string;
    axes: ProgramAxis[];
    cta: CtaContent;
  };

  org: {
    intro: PageIntro;
    principle: { title: string; paragraphs: string[] };
    levelsIntro: { eyebrow: string; title: string; lead: string };
    levels: OrgNode[];
    namesNote: string;
    commissions: { title: string; lead: string; items: Feature[] };
    territory: { title: string; lead: string; items: Feature[] };
    cta: CtaContent;
  };

  /** Libellés du blog ; rubriques et articles viennent de l'API. */
  news: {
    intro: PageIntro;
    /** Filtre « toutes rubriques ». */
    all: string;
    filterLabel: string;
    empty: string;
    more: string;
    readMore: string;
    article: { back: string; related: string; notFound: string; cta: CtaContent };
  };

  events: {
    intro: PageIntro;
    items: EventItem[];
    empty: string;
  };

  press: {
    intro: PageIntro;
    contact: { title: string; desc: string; email: string; phone: string };
    documents: { title: string; lead: string };
    kinds: Record<PressItem['kind'], string>;
    download: string;
    items: PressItem[];
    empty: string;
  };

  gallery: {
    intro: PageIntro;
    albums: { title: string; date: string; count: number; cover?: string }[];
    photos: string;
    empty: string;
  };

  join: {
    intro: PageIntro;
    why: { title: string; items: Feature[] };
    profiles: { title: string; lead: string; items: Feature[] };
    commitment: { title: string; items: string[] };
    form: {
      title: string;
      lead: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      departement: string;
      profile: string;
      skills: string;
      skillsPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      consent: string;
      consentRequired: string;
      submit: string;
      success: string;
    };
    faq: { title: string; items: Faq[] };
  };

  donate: {
    intro: PageIntro;
    why: { title: string; paragraphs: string[] };
    uses: { title: string; lead: string; items: Feature[] };
    methods: {
      title: string;
      lead: string;
      items: Feature[];
      /** Encadré sous les moyens de paiement : texte avant le lien, lien, texte après. */
      note: { before: string; link: string; after: string };
    };
    rules: { title: string; lead: string; items: string[] };
  };

  contact: {
    intro: PageIntro;
    channelsTitle: string;
    channels: Feature[];
    form: {
      title: string;
      lead: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      messageTooShort: string;
      subjects: string[];
      submit: string;
      success: string;
    };
    office: { title: string; address: string; hours: string };
    networks: { title: string; desc: string };
  };

  notFound: { title: string; lead: string; home: string; report: string };

  footer: {
    about: string;
    columns: { title: string; links: { label: string; url: string }[] }[];
    newsletter: { title: string; desc: string; placeholder: string; submit: string };
    legal: string;
    credits: string;
  };
}
