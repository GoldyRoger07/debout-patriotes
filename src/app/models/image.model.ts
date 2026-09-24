/**
 * Cadrage d'une photo, choisi dans le back-office.
 *
 * Les gabarits du site imposent la proportion de chaque emplacement (carte d'article en 16/9,
 * portrait de candidat en 4/5…) : ce réglage ne change pas cette proportion, il décide de ce qui
 * est conservé de la photo quand elle y est recadrée — et, avec `contain`, de ne rien recadrer du
 * tout en ajoutant des bandes.
 *
 * Les valeurs correspondent aux transformations ImageKit appliquées à la volée.
 *
 * @see https://imagekit.io/docs/transformations#focus
 */
export type ImageFocus =
  | 'auto'
  | 'face'
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'contain';

/**
 * Proportion d'un emplacement d'image, largeur sur hauteur : `{ width: 4, height: 5 }` pour du 4/5.
 * Toutes les photos d'un même emplacement y sont recadrées, selon le cadrage du back-office.
 */
export interface ImageRatio {
  width: number;
  height: number;
}

/**
 * Proportion des photos des cartes candidats, réglée dans le back-office pour chaque emplacement :
 * le défilement de l'accueil et la page « Nos candidats ».
 */
export interface CardFormats {
  home: ImageRatio;
  list: ImageRatio;
}

/** Proportion des cartes tant que l'API n'en fournit pas : le portrait 4/5 d'origine. */
export const DEFAULT_CARD_RATIO: ImageRatio = { width: 4, height: 5 };

export const DEFAULT_CARD_FORMATS: CardFormats = { home: DEFAULT_CARD_RATIO, list: DEFAULT_CARD_RATIO };

/** Formats proposés dans le back-office pour les cartes, dans l'ordre d'affichage. */
export const CARD_RATIO_OPTIONS: ReadonlyArray<{ ratio: ImageRatio; label: string }> = [
  { ratio: { width: 4, height: 5 }, label: 'Portrait 4/5' },
  { ratio: { width: 3, height: 4 }, label: 'Portrait 3/4' },
  { ratio: { width: 2, height: 3 }, label: 'Portrait 2/3' },
  { ratio: { width: 1, height: 1 }, label: 'Carré 1/1' },
  { ratio: { width: 4, height: 3 }, label: 'Paysage 4/3' },
  { ratio: { width: 16, height: 9 }, label: 'Paysage 16/9' },
];

/** Cadrage retenu quand aucun n'a été enregistré (articles, visuels de couverture). */
export const DEFAULT_FOCUS: ImageFocus = 'auto';

/** Cadrage retenu pour les portraits, dont le sujet est presque toujours un visage. */
export const PORTRAIT_FOCUS: ImageFocus = 'face';

/** Les choix proposés dans le back-office, dans l'ordre d'affichage. */
export const FOCUS_OPTIONS: ReadonlyArray<{
  value: ImageFocus;
  label: string;
  icon: string;
  hint: string;
}> = [
  {
    value: 'auto',
    label: 'Automatique',
    icon: 'pi-sparkles',
    hint: 'ImageKit détecte le sujet et recadre autour.',
  },
  {
    value: 'face',
    label: 'Visage',
    icon: 'pi-user',
    hint: 'Recadre autour du visage détecté. Idéal pour un portrait.',
  },
  { value: 'center', label: 'Centre', icon: 'pi-stop', hint: 'Garde le centre de la photo.' },
  { value: 'top', label: 'Haut', icon: 'pi-arrow-up', hint: 'Garde le haut de la photo.' },
  { value: 'bottom', label: 'Bas', icon: 'pi-arrow-down', hint: 'Garde le bas de la photo.' },
  { value: 'left', label: 'Gauche', icon: 'pi-arrow-left', hint: 'Garde la gauche de la photo.' },
  { value: 'right', label: 'Droite', icon: 'pi-arrow-right', hint: 'Garde la droite de la photo.' },
  {
    value: 'contain',
    label: 'Entière',
    icon: 'pi-expand',
    hint: 'Aucun recadrage : la photo entre en entier, complétée par des bandes.',
  },
];
