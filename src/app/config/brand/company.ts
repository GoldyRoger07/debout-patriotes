import { Company } from '../../models/company.model';

// À COMPLÉTER : e-mail, téléphone et adresse officiels du groupement.
export const companyConfig: Company = {
  name: 'DEBOUT PATRIOTES',
  legalName: 'Debout Patriotes',
  slogan: 'Debout pour Haïti, patriotes pour la Nation.',
  description:
    "Groupement politique haïtien réunissant onze partis émergents autour d'une même vision de la gouvernance et de la défense des intérêts supérieurs de la Nation.",
  logo: {
    light: 'logo-debout-patriotes.png',
    dark: 'logo-debout-patriotes.png',
  },
  contact: {
    email: 'contact@deboutpatriotes.ht',
    phone: '+509 — (à communiquer)',
    address: 'Port-au-Prince, Haïti',
  },
};
