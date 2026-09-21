import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostSummary } from '../../models/blog.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/** Carte d'un article du blog : couverture, rubrique, date, titre et chapô. Mène à l'article. */
@Component({
  selector: 'my-post-card',
  imports: [RouterLink, DatePipe, ImageKitPipe],
  template: `
    @let item = post();
    <a
      [routerLink]="['/actualites', item.slug]"
      class="group flex h-full flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-card transition-colors hover:border-primary/40"
    >
      @if (item.cover) {
        <img
          [src]="item.cover | ik: 'w-640,h-360,fo-auto'"
          [alt]="item.title"
          loading="lazy"
          class="aspect-video w-full object-cover"
        />
      }
      <div class="flex flex-1 flex-col gap-2 p-6">
        <p class="text-xs font-semibold uppercase tracking-wider text-primary">
          @if (item.category) {
            {{ item.category.name }} ·
          }
          {{ item.publishedAt | date: 'longDate' }}
        </p>
        <h3 class="font-heading text-lg font-bold text-secondary transition-colors group-hover:text-primary">
          {{ item.title }}
        </h3>
        <p class="flex-1 text-sm leading-relaxed text-foreground-muted">{{ item.excerpt }}</p>
        @if (readMore()) {
          <span class="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary">
            {{ readMore() }}
            <i class="pi pi-arrow-right text-xs" aria-hidden="true"></i>
          </span>
        }
      </div>
    </a>
  `,
})
export class PostCard {
  post = input.required<PostSummary>();
  readMore = input<string>();
}
