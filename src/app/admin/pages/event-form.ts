import { Component, inject, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { EventPayload, ImageRef, VideoRef } from '../core/admin.model';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { emptyToNull, fromLocalInput, slugify, toLocalInput } from '../core/form-utils';
import { ImageUpload } from '../ui/image-upload';
import { VideoUpload } from '../ui/video-upload';
import { AgendaEvent } from '../../models/event.model';
import { DEFAULT_FOCUS } from '../../models/image.model';

@Component({
  selector: 'admin-event-form',
  imports: [ReactiveFormsModule, RouterLink, ImageUpload, VideoUpload],
  templateUrl: './event-form.html',
})
export default class EventForm {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly imageUpload = viewChild(ImageUpload);
  private readonly videoUpload = viewChild(VideoUpload);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', Validators.maxLength(190)],
    kind: ['', Validators.maxLength(80)],
    startsAt: ['', Validators.required],
    place: ['', Validators.maxLength(255)],
    city: ['', Validators.maxLength(160)],
    description: [''],
    cover: this.fb.control<ImageRef | null>(null),
    video: this.fb.control<VideoRef | null>(null),
    published: [true],
  });

  protected readonly id = signal<number | null>(null);
  protected readonly event = signal<AgendaEvent | null>(null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly serverErrors = signal<Record<string, string>>({});
  private slugEdited = false;

  constructor() {
    const idParam = inject(ActivatedRoute).snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(Number(idParam));
      this.slugEdited = true;
      this.loading.set(true);
      this.api.event(Number(idParam)).subscribe({
        next: (event) => this.fill(event),
        error: (err) => {
          this.feedback.error(apiErrorMessage(err, 'Événement introuvable.'));
          this.router.navigateByUrl('/admin/evenements');
        },
      });
    }
    this.form.controls.title.valueChanges.subscribe((title) => {
      if (!this.slugEdited) {
        this.form.controls.slug.setValue(slugify(title), { emitEvent: false });
      }
    });
  }

  protected onSlugInput(): void {
    this.slugEdited = true;
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.feedback.error('Complétez les champs obligatoires avant d’enregistrer.');
      return;
    }
    const v = this.form.getRawValue();
    const payload: EventPayload = {
      slug: emptyToNull(v.slug),
      title: v.title.trim(),
      kind: emptyToNull(v.kind),
      description: emptyToNull(v.description),
      startsAt: fromLocalInput(v.startsAt)!,
      place: emptyToNull(v.place),
      city: emptyToNull(v.city),
      cover: v.cover?.url ?? null,
      coverFileId: v.cover?.fileId ?? null,
      coverFocus: v.cover?.focus ?? null,
      video: v.video?.url ?? null,
      videoFileId: v.video?.fileId ?? null,
      published: v.published,
    };

    this.saving.set(true);
    this.serverErrors.set({});
    this.api.saveEvent(this.id(), payload).subscribe({
      next: (event) => {
        this.saving.set(false);
        this.imageUpload()?.commit();
        this.videoUpload()?.commit();
        this.feedback.success('Événement enregistré.');
        if (this.id() === null) {
          this.router.navigate(['/admin/evenements', event.id], { replaceUrl: true });
        }
        this.fill(event);
      },
      error: (err) => {
        this.saving.set(false);
        this.serverErrors.set(apiFieldErrors(err));
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  protected async remove(): Promise<void> {
    const event = this.event();
    if (!event) {
      return;
    }
    const confirmed = await this.feedback.confirm({
      title: 'Supprimer cet événement ?',
      message: `« ${event.title} » sera définitivement supprimé, avec sa couverture et sa vidéo.`,
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (confirmed) {
      this.api.deleteEvent(event.id).subscribe({
        next: () => {
          this.feedback.success('Événement supprimé.');
          this.router.navigateByUrl('/admin/evenements');
        },
        error: (err) => this.feedback.error(apiErrorMessage(err)),
      });
    }
  }

  protected error(field: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[field];
    if (control.touched && control.errors) {
      if (control.errors['required']) {
        return 'Champ obligatoire.';
      }
      if (control.errors['maxlength']) {
        return `${control.errors['maxlength'].requiredLength} caractères maximum.`;
      }
    }
    return this.serverErrors()[field] ?? null;
  }

  private fill(event: AgendaEvent): void {
    this.id.set(event.id);
    this.event.set(event);
    this.loading.set(false);
    this.form.reset({
      title: event.title,
      slug: event.slug,
      kind: event.kind ?? '',
      startsAt: toLocalInput(event.startsAt),
      place: event.place ?? '',
      city: event.city ?? '',
      description: event.description ?? '',
      cover: event.cover
        ? { url: event.cover, fileId: event.coverFileId ?? null, focus: event.coverFocus ?? DEFAULT_FOCUS }
        : null,
      video: event.video ? { url: event.video, fileId: event.videoFileId ?? null } : null,
      published: event.published,
    });
  }
}
