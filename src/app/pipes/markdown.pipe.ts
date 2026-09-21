import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

/**
 * Convertit le Markdown d'un article en HTML, à lier avec `[innerHTML]`.
 * Angular assainit ensuite ce HTML (scripts et attributs d'événement retirés).
 */
@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(markdown: string | null | undefined): string {
    return markdown ? (marked.parse(markdown, { async: false, gfm: true, breaks: true }) as string) : '';
  }
}
