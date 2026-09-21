import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { apiErrorMessage } from '../core/api-error';
import { Page, PostStatus, PostSummary } from '../../models/blog.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

const PAGE_SIZE = 20;

@Component({
  selector: 'admin-posts-list',
  imports: [RouterLink, DatePipe, ImageKitPipe],
  templateUrl: './posts-list.html',
})
export default class PostsList {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly search$ = new Subject<string>();
  private request?: Subscription;

  protected readonly tabs: { label: string; status: PostStatus | null }[] = [
    { label: 'Tous', status: null },
    { label: 'Publiés', status: 'PUBLISHED' },
    { label: 'Brouillons', status: 'DRAFT' },
  ];
  protected readonly status = signal<PostStatus | null>(null);
  protected readonly query = signal('');
  protected readonly page = signal<Page<PostSummary> | null>(null);
  protected readonly loading = signal(true);
  protected readonly now = Date.now();

  constructor() {
    this.search$.pipe(debounceTime(300), takeUntilDestroyed()).subscribe((q) => {
      this.query.set(q);
      this.load(0);
    });
    inject(DestroyRef).onDestroy(() => this.request?.unsubscribe());
    this.load(0);
  }

  protected setStatus(status: PostStatus | null): void {
    this.status.set(status);
    this.load(0);
  }

  protected onSearch(value: string): void {
    this.search$.next(value.trim());
  }

  protected load(pageIndex: number): void {
    this.request?.unsubscribe();
    this.loading.set(true);
    this.request = this.api
      .posts({ status: this.status(), q: this.query(), page: pageIndex, size: PAGE_SIZE })
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.feedback.error(apiErrorMessage(err));
        },
      });
  }

  /** Publié mais daté dans le futur : l'article n'apparaîtra qu'à cette date. */
  protected isScheduled(post: PostSummary): boolean {
    return (
      post.status === 'PUBLISHED' &&
      !!post.publishedAt &&
      new Date(post.publishedAt).getTime() > this.now
    );
  }

  protected async remove(post: PostSummary): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Supprimer cet article ?',
      message: `« ${post.title} » sera définitivement supprimé, ainsi que son image de couverture.`,
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (!confirmed) {
      return;
    }
    this.api.deletePost(post.id).subscribe({
      next: () => {
        this.feedback.success('Article supprimé.');
        const current = this.page();
        // Revient à la page précédente si l'on vient de vider la dernière.
        this.load(
          current && current.items.length === 1 && current.page > 0
            ? current.page - 1
            : (current?.page ?? 0),
        );
      },
      error: (err) => this.feedback.error(apiErrorMessage(err)),
    });
  }
}
