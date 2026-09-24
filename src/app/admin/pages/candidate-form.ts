import { Component, computed, inject, signal, viewChildren } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { AdminCandidate, CandidatePayload, ImageRef } from '../core/admin.model';
import { DEFAULT_CARD_FORMATS, PORTRAIT_FOCUS } from '../../models/image.model';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { emptyToNull, slugify } from '../core/form-utils';
import { ImageUpload } from '../ui/image-upload';

/** Icônes proposées pour les priorités (PrimeIcons). */
const PRIORITY_ICONS = [
  { value: 'pi-shield', label: 'Sécurité' },
  { value: 'pi-heart', label: 'Santé' },
  { value: 'pi-book', label: 'Éducation' },
  { value: 'pi-briefcase', label: 'Emploi' },
  { value: 'pi-building', label: 'Institutions' },
  { value: 'pi-eye', label: 'Transparence' },
  { value: 'pi-globe', label: 'Diaspora / international' },
  { value: 'pi-sun', label: 'Agriculture' },
  { value: 'pi-home', label: 'Logement' },
  { value: 'pi-bolt', label: 'Énergie' },
  { value: 'pi-truck', label: 'Infrastructures' },
  { value: 'pi-wallet', label: 'Économie' },
  { value: 'pi-users', label: 'Jeunesse / société' },
  { value: 'pi-flag', label: 'Souveraineté' },
  { value: 'pi-lightbulb', label: 'Innovation' },
];

function priorityGroup(
  fb: NonNullableFormBuilder,
  value?: { title: string; desc: string; icon?: string | null },
) {
  return fb.group({
    title: [value?.title ?? '', [Validators.required, Validators.maxLength(160)]],
    desc: [value?.desc ?? '', Validators.required],
    icon: [value?.icon ?? 'pi-shield'],
  });
}

function careerGroup(
  fb: NonNullableFormBuilder,
  value?: { period: string; title: string; desc?: string | null },
) {
  return fb.group({
    period: [value?.period ?? '', [Validators.required, Validators.maxLength(60)]],
    title: [value?.title ?? '', [Validators.required, Validators.maxLength(255)]],
    desc: [value?.desc ?? ''],
  });
}

@Component({
  selector: 'admin-candidate-form',
  imports: [ReactiveFormsModule, RouterLink, NgTemplateOutlet, ImageUpload],
  templateUrl: './candidate-form.html',
})
export default class CandidateForm {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly imageUploads = viewChildren(ImageUpload);

  protected readonly icons = PRIORITY_ICONS;

  /** Format des cartes réglé dans la liste des candidats : l'aperçu de la couverture suit celui de l'accueil. */
  protected readonly cardFormats = signal(DEFAULT_CARD_FORMATS);
  protected readonly coverRatio = computed(
    () => `${this.cardFormats().home.width}/${this.cardFormats().home.height}`,
  );
  protected readonly listRatio = computed(
    () => `${this.cardFormats().list.width}/${this.cardFormats().list.height}`,
  );

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(160)]],
    slug: ['', Validators.maxLength(190)],
    subtitle: ['', Validators.maxLength(255)],
    position: ['', Validators.maxLength(160)],
    constituency: ['', Validators.maxLength(160)],
    party: ['DEBOUT PATRIOTES', Validators.maxLength(160)],
    birthplace: ['', Validators.maxLength(160)],
    quote: ['', Validators.maxLength(500)],
    /** Portrait de la fiche, affiché à côté de la biographie. */
    photo: this.fb.control<ImageRef | null>(null),
    /** Couverture des cartes : accueil et liste complète des candidats. */
    cover: this.fb.control<ImageRef | null>(null),
    published: [true],
    professions: this.fb.array<FormControl<string>>([]),
    bio: this.fb.array<FormControl<string>>([]),
    priorities: this.fb.array<ReturnType<typeof priorityGroup>>([]),
    career: this.fb.array<ReturnType<typeof careerGroup>>([]),
    education: this.fb.array<FormControl<string>>([]),
    contact: this.fb.group({
      email: ['', [Validators.email, Validators.maxLength(190)]],
      facebook: ['', Validators.maxLength(255)],
      x: ['', Validators.maxLength(255)],
      instagram: ['', Validators.maxLength(255)],
    }),
  });

  protected readonly id = signal<number | null>(null);
  protected readonly candidate = signal<AdminCandidate | null>(null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly serverErrors = signal<Record<string, string>>({});
  private slugEdited = false;

  constructor() {
    this.api.cardFormats().subscribe({ next: (formats) => this.cardFormats.set(formats), error: () => {} });
    const idParam = inject(ActivatedRoute).snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(Number(idParam));
      this.slugEdited = true;
      this.loading.set(true);
      this.api.candidate(Number(idParam)).subscribe({
        next: (candidate) => this.fill(candidate),
        error: (err) => {
          this.feedback.error(apiErrorMessage(err, 'Candidat introuvable.'));
          this.router.navigateByUrl('/admin/candidats');
        },
      });
    }
    this.form.controls.name.valueChanges.subscribe((name) => {
      if (!this.slugEdited) {
        this.form.controls.slug.setValue(slugify(name), { emitEvent: false });
      }
    });
  }

  // --- Listes dynamiques -----------------------------------------------------

  protected paragraph(value = ''): FormControl<string> {
    return this.fb.control(value, Validators.required);
  }

  protected professionEntry(value = ''): FormControl<string> {
    return this.fb.control(value, [Validators.required, Validators.maxLength(160)]);
  }

  protected priority(value?: Parameters<typeof priorityGroup>[1]) {
    return priorityGroup(this.fb, value);
  }

  protected careerStep(value?: Parameters<typeof careerGroup>[1]) {
    return careerGroup(this.fb, value);
  }

  protected educationEntry(value = ''): FormControl<string> {
    return this.fb.control(value, [Validators.required, Validators.maxLength(500)]);
  }

  protected move(array: FormArray, index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= array.length) {
      return;
    }
    const control = array.at(index);
    array.removeAt(index);
    array.insert(target, control);
    array.markAsDirty();
  }

  protected removeAt(array: FormArray, index: number): void {
    array.removeAt(index);
    array.markAsDirty();
  }

  // --- Enregistrement --------------------------------------------------------

  protected onSlugInput(): void {
    this.slugEdited = true;
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.feedback.error('Certains champs sont incomplets : ils sont signalés en rouge.');
      return;
    }
    const v = this.form.getRawValue();
    const payload: CandidatePayload = {
      slug: emptyToNull(v.slug) ?? '',
      name: v.name.trim(),
      subtitle: emptyToNull(v.subtitle),
      photo: v.photo?.url ?? null,
      photoFileId: v.photo?.fileId ?? null,
      photoFocus: v.photo?.focus ?? null,
      cover: v.cover?.url ?? null,
      coverFileId: v.cover?.fileId ?? null,
      coverFocus: v.cover?.focus ?? null,
      position: emptyToNull(v.position),
      constituency: emptyToNull(v.constituency),
      party: emptyToNull(v.party),
      professions: v.professions.map((p) => p.trim()),
      birthplace: emptyToNull(v.birthplace),
      quote: emptyToNull(v.quote),
      bio: v.bio.map((p) => p.trim()),
      priorities: v.priorities.map((p) => ({
        title: p.title.trim(),
        desc: p.desc.trim(),
        icon: p.icon,
      })),
      career: v.career.map((c) => ({
        period: c.period.trim(),
        title: c.title.trim(),
        desc: emptyToNull(c.desc),
      })),
      education: v.education.map((e) => e.trim()),
      contact: {
        email: emptyToNull(v.contact.email) ?? undefined,
        facebook: emptyToNull(v.contact.facebook) ?? undefined,
        x: emptyToNull(v.contact.x) ?? undefined,
        instagram: emptyToNull(v.contact.instagram) ?? undefined,
      },
      published: v.published,
    };

    this.saving.set(true);
    this.serverErrors.set({});
    this.api.saveCandidate(this.id(), payload).subscribe({
      next: (candidate) => {
        this.saving.set(false);
        this.imageUploads().forEach((upload) => upload.commit());
        this.feedback.success(`Fiche de ${candidate.name} enregistrée.`);
        if (this.id() === null) {
          this.router.navigate(['/admin/candidats', candidate.id], { replaceUrl: true });
        }
        this.fill(candidate);
      },
      error: (err) => {
        this.saving.set(false);
        this.serverErrors.set(apiFieldErrors(err));
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  protected async remove(): Promise<void> {
    const candidate = this.candidate();
    if (!candidate) {
      return;
    }
    const confirmed = await this.feedback.confirm({
      title: `Supprimer ${candidate.name} ?`,
      message: 'La fiche et sa photo seront définitivement supprimées.',
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (confirmed) {
      this.api.deleteCandidate(candidate.id).subscribe({
        next: () => {
          this.feedback.success('Candidat supprimé.');
          this.router.navigateByUrl('/admin/candidats');
        },
        error: (err) => this.feedback.error(apiErrorMessage(err)),
      });
    }
  }

  /** Message d'erreur d'un champ simple : validation locale, sinon retour de l'API. */
  protected error(field: string): string | null {
    const control = this.form.get(field);
    if (control?.touched && control.errors) {
      if (control.errors['required']) {
        return 'Champ obligatoire.';
      }
      if (control.errors['email']) {
        return 'Adresse e-mail invalide.';
      }
      if (control.errors['maxlength']) {
        return `${control.errors['maxlength'].requiredLength} caractères maximum.`;
      }
    }
    return this.serverErrors()[field] ?? null;
  }

  private fill(c: AdminCandidate): void {
    this.id.set(c.id);
    this.candidate.set(c);
    this.loading.set(false);

    const { professions, bio, priorities, career, education } = this.form.controls;
    professions.clear();
    (c.professions ?? []).forEach((p) => professions.push(this.professionEntry(p)));
    bio.clear();
    c.bio.forEach((p) => bio.push(this.paragraph(p)));
    priorities.clear();
    c.priorities.forEach((p) => priorities.push(this.priority(p)));
    career.clear();
    c.career.forEach((step) => career.push(this.careerStep(step)));
    education.clear();
    c.education.forEach((e) => education.push(this.educationEntry(e)));

    this.form.reset({
      name: c.name,
      slug: c.slug,
      subtitle: c.subtitle ?? '',
      position: c.position ?? '',
      constituency: c.constituency ?? '',
      party: c.party ?? '',
      birthplace: c.birthplace ?? '',
      quote: c.quote ?? '',
      photo: c.photo
        ? { url: c.photo, fileId: c.photoFileId ?? null, focus: c.photoFocus ?? PORTRAIT_FOCUS }
        : null,
      cover: c.cover
        ? { url: c.cover, fileId: c.coverFileId ?? null, focus: c.coverFocus ?? PORTRAIT_FOCUS }
        : null,
      published: c.published,
      contact: {
        email: c.contact?.email ?? '',
        facebook: c.contact?.facebook ?? '',
        x: c.contact?.x ?? '',
        instagram: c.contact?.instagram ?? '',
      },
    });
  }
}
