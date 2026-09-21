import { Injectable, signal } from '@angular/core';
import { GalleryImage, ImageFolder } from './admin.model';

export interface ImagePickerRequest {
  /** Dossier ouvert à l'arrivée ; les autres restent accessibles par les onglets. */
  folder: ImageFolder;
  title: string;
}

/**
 * Ouvre la médiathèque en fenêtre modale pour choisir une image.
 *
 * Même mécanique que {@link Feedback.confirm} : la fenêtre est rendue une seule fois par
 * `AdminShell`, et `open()` résout avec l'image choisie — ou `null` si l'utilisateur renonce.
 */
@Injectable({ providedIn: 'root' })
export class ImagePicker {
  private pending?: (image: GalleryImage | null) => void;

  readonly request = signal<ImagePickerRequest | null>(null);

  open(folder: ImageFolder, title = 'Choisir une image'): Promise<GalleryImage | null> {
    this.pending?.(null);
    this.request.set({ folder, title });
    return new Promise((resolve) => (this.pending = resolve));
  }

  answer(image: GalleryImage | null): void {
    this.request.set(null);
    this.pending?.(image);
    this.pending = undefined;
  }
}
