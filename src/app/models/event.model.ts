/** Forme JSON d'un événement de l'agenda (voir `EventDtos` côté Spring). */

import { ImageFocus } from './image.model';

export interface AgendaEvent {
  id: number;
  slug: string;
  title: string;
  /** Nature : assemblée, conférence de presse, meeting… */
  kind?: string | null;
  description?: string | null;
  /** Date et heure de début, ISO 8601. */
  startsAt: string;
  place?: string | null;
  city?: string | null;
  cover?: string | null;
  coverFileId?: string | null;
  coverFocus?: ImageFocus | null;
  /** Vidéo ImageKit : annonce avant l'événement, rediffusion après. */
  video?: string | null;
  videoFileId?: string | null;
  published: boolean;
  updatedAt: string;
}
