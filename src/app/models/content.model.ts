/**
 * Formes de contenu partagées par toutes les pages du site.
 * Une locale = un fichier dans `config/content/` qui implémente `SiteContent`.
 */

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

export interface NewsItem {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  cover?: string;
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
    stats: Stat[];
    welcome: { title: string; paragraphs: string[]; cta: { label: string; url: string } };
    identity: { title: string; lead: string; cards: Feature[] };
    pillars: { title: string; lead: string };
    heritage: { eyebrow: string; title: string; paragraphs: string[]; attribution: string };
    news: { title: string; lead: string; cta: { label: string; url: string } };
    cta: CtaContent;
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

  news: {
    intro: PageIntro;
    categories: string[];
    items: NewsItem[];
    empty: string;
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
