/**
 * Formes de contenu partagées par toutes les pages du site.
 * Une locale = un fichier dans `config/content/` qui implémente `SiteContent`.
 */

import { ImageFocus, ImageRatio } from './image.model';

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

export interface SiteContent {
  meta: {
    name: string;
    tagline: string;
    description: string;
    foundedOn: string;
    partyCount: string;
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
    welcome: { title: string; paragraphs: string[]; cta: { label: string; url: string } };
    identity: { title: string; lead: string; cards: Feature[] };
    pillars: { title: string; lead: string };
    heritage: { eyebrow: string; title: string; paragraphs: string[]; attribution: string };
    candidates: {
      eyebrow: string;
      title: string;
      lead: string;
      cta: { label: string; url: string };
      /** Proportion commune à toutes les photos des cartes du défilement. */
      cardRatio: ImageRatio;
    };
    news: { title: string; lead: string; cta: { label: string; url: string } };
    cta: CtaContent;
  };

  /** Libellés des pages candidats ; les fiches elles-mêmes viennent de l'API. */
  candidates: {
    intro: PageIntro;
    empty: string;
    /** Proportion commune à toutes les photos des cartes de la liste. */
    cardRatio: ImageRatio;
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
    diagnosis: { title: string; lead: string; items: Feature[] };
    answer: { title: string; paragraphs: string[] };
    charter: { title: string; lead: string; principles: Feature[] };
    parties: { title: string; lead: string; note: string; list: MemberParty[] };
    cta: CtaContent;
  };

  vision: {
    intro: PageIntro;
    statement: { title: string; paragraphs: string[] };
    pillars: Pillar[];
    values: { title: string; lead: string; items: Feature[] };
    horizon: { title: string; lead: string; items: Feature[] };
    cta: CtaContent;
  };

  program: {
    intro: PageIntro;
    disclaimer: string;
    method: { title: string; lead: string; steps: Feature[] };
    axes: ProgramAxis[];
    cta: CtaContent;
  };

  org: {
    intro: PageIntro;
    principle: { title: string; paragraphs: string[] };
    levels: OrgNode[];
    commissions: { title: string; lead: string; items: Feature[] };
    territory: { title: string; lead: string; items: Feature[] };
    cta: CtaContent;
  };

  /** Libellés du blog ; rubriques et articles viennent de l'API. */
  news: {
    intro: PageIntro;
    /** Filtre « toutes rubriques ». */
    all: string;
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
    items: PressItem[];
    empty: string;
  };

  gallery: {
    intro: PageIntro;
    albums: { title: string; date: string; count: number; cover?: string }[];
    empty: string;
  };

  join: {
    intro: PageIntro;
    why: { title: string; items: Feature[] };
    profiles: { title: string; lead: string; items: Feature[] };
    commitment: { title: string; items: string[] };
    form: { title: string; lead: string; consent: string; submit: string; success: string };
    faq: { title: string; items: Faq[] };
  };

  donate: {
    intro: PageIntro;
    why: { title: string; paragraphs: string[] };
    uses: { title: string; lead: string; items: Feature[] };
    methods: { title: string; lead: string; items: Feature[] };
    rules: { title: string; lead: string; items: string[] };
  };

  contact: {
    intro: PageIntro;
    channels: Feature[];
    form: {
      title: string;
      lead: string;
      subjects: string[];
      submit: string;
      success: string;
    };
    office: { title: string; address: string; hours: string };
  };

  footer: {
    about: string;
    columns: { title: string; links: { label: string; url: string }[] }[];
    newsletter: { title: string; desc: string; placeholder: string; submit: string };
    legal: string;
    credits: string;
  };
}
