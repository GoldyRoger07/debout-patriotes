import { Component, inject, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { ImageRef, PostPayload } from '../core/admin.model';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { emptyToNull, fromLocalInput, slugify, toLocalInput } from '../core/form-utils';
import { ImageUpload } from '../ui/image-upload';
import { MarkdownEditor } from '../ui/markdown-editor';
import { Post, PostStatus } from '../../models/blog.model';
import { DEFAULT_FOCUS } from '../../models/image.model';

@Component({
  selector: 'admin-post-form',
  imports: [ReactiveFormsModule, RouterLink, ImageUpload, MarkdownEditor],
  templateUrl: './post-form.html',
})
export default class PostForm {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly router = inject(Router);
  private readonly imageUpload = viewChild(ImageUpload);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', Validators.maxLength(190)],
    categoryId: this.fb.control<number | null>(null),
    excerpt: ['', [Validators.required, Validators.maxLength(600)]],
    cover: this.fb.control<ImageRef | null>(null),
    content: ['', Validators.required],
    status: this.fb.control<PostStatus>('DRAFT'),
    publishedAt: [''],
  });

  protected readonly categories = toSignal(this.api.categories().pipe(catchError(() => of([]))), {
    initialValue: [],
  });
  protected readonly id = signal<number | null>(null);
  protected readonly post = signal<Post | null>(null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly serverErrors = signal<Record<string, string>>({});
  /** Tant que le slug n'a pas été modifié à la main, il suit le titre. */
  private slugEdited = false;

  constructor() {
    const idParam = inject(ActivatedRoute).snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(Number(idParam));
      this.slugEdited = true;
      this.loading.set(true);
      this.api.post(Number(idParam)).subscribe({
        next: (post) => this.fill(post),
        error: (err) => {
          this.feedback.error(apiErrorMessage(err, 'Article introuvable.'));
          this.router.navigateByUrl('/admin/articles');
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
    const value = this.form.getRawValue();
    const payload: PostPayload = {
      slug: emptyToNull(value.slug),
      title: value.title.trim(),
      excerpt: value.excerpt.trim(),
      content: value.content,
      cover: value.cover?.url ?? null,
      coverFileId: value.cover?.fileId ?? null,
      coverFocus: value.cover?.focus ?? null,
      categoryId: value.categoryId,
      status: value.status,
      publishedAt: fromLocalInput(value.publishedAt),
    };

    this.saving.set(true);
    this.serverErrors.set({});
    this.api.savePost(this.id(), payload).subscribe({
      next: (post) => {
        this.saving.set(false);
        this.imageUpload()?.commit();
        this.feedback.success(
          post.status === 'PUBLISHED' ? 'Article enregistré et publié.' : 'Brouillon enregistré.',
        );
        if (this.id() === null) {
          this.router.navigate(['/admin/articles', post.id], { replaceUrl: true });
        }
        this.fill(post);
      },
      error: (err) => {
        this.saving.set(false);
        this.serverErrors.set(apiFieldErrors(err));
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  protected async remove(): Promise<void> {
    const post = this.post();
    if (!post) {
      return;
    }
    const confirmed = await this.feedback.confirm({
      title: 'Supprimer cet article ?',
      message: `« ${post.title} » sera définitivement supprimé, ainsi que son image de couverture.`,
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (confirmed) {
      this.api.deletePost(post.id).subscribe({
        next: () => {
          this.feedback.success('Article supprimé.');
          this.router.navigateByUrl('/admin/articles');
        },
        error: (err) => this.feedback.error(apiErrorMessage(err)),
      });
    }
  }

  /** Erreur à afficher sous un champ : validation locale, sinon retour de l'API. */
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

  private fill(post: Post): void {
    this.id.set(post.id);
    this.post.set(post);
    this.loading.set(false);
    this.form.reset({
      title: post.title,
      slug: post.slug,
      categoryId: post.category?.id ?? null,
      excerpt: post.excerpt,
      cover: post.cover
        ? { url: post.cover, fileId: post.coverFileId ?? null, focus: post.coverFocus ?? DEFAULT_FOCUS }
        : null,
      content: post.content,
      status: post.status,
      publishedAt: toLocalInput(post.publishedAt),
    });
  }
}
