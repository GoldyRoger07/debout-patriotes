import { Component, inject, viewChild } from '@angular/core';
import { ImagePicker, ImagePickerRequest } from '../core/image-picker.service';
import { GalleryImage } from '../core/admin.model';
import { ImageGallery } from './image-gallery';

/**
 * Fenêtre modale de la médiathèque : rendue une seule fois par `AdminShell` et pilotée par
 * {@link ImagePicker}.
 */
@Component({
  selector: 'admin-image-picker',
  imports: [ImageGallery],
  template: `
    <div
      class="fixed inset-0 z-[65] flex items-center justify-center bg-black/40 p-4"
      (click)="picker.answer(null)"
    >
      <div
        class="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="picker-title"
        (click)="$event.stopPropagation()"
        (keydown.escape)="picker.answer(null)"
      >
        <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 id="picker-title" class="font-heading text-lg font-bold text-secondary">
            {{ request.title }}
          </h2>
          <button
            type="button"
            class="text-foreground-muted hover:text-secondary"
            aria-label="Fermer"
            (click)="picker.answer(null)"
          >
            <i class="pi pi-times" aria-hidden="true"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4">
          <admin-image-gallery [startFolder]="request.folder" (chosen)="picker.answer($event)" />
        </div>

        <div class="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <p class="mr-auto truncate text-xs text-foreground-muted">
            {{
              gallery()?.selected()?.name ??
                'Sélectionnez une image, ou double-cliquez pour valider.'
            }}
          </p>
          <button type="button" class="admin-btn admin-btn-ghost" (click)="picker.answer(null)">
            Annuler
          </button>
          <button
            type="button"
            class="admin-btn admin-btn-primary"
            [disabled]="!gallery()?.selected()"
            (click)="choose()"
          >
            Utiliser cette image
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ImagePickerDialog {
  protected readonly picker = inject(ImagePicker);
  protected readonly gallery = viewChild(ImageGallery);

  /** Figée à l'ouverture : `AdminShell` ne crée cette fenêtre que pour une demande en cours. */
  protected readonly request: ImagePickerRequest = this.picker.request()!;

  protected choose(): void {
    const image: GalleryImage | null = this.gallery()?.selected() ?? null;
    if (image) {
      this.picker.answer(image);
    }
  }
}
