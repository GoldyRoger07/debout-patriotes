import { Component, ElementRef, forwardRef, inject, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImagePicker } from '../core/image-picker.service';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

interface ToolbarAction {
  label: string;
  icon: string;
  apply: (selection: string) => { text: string; select?: [number, number] };
  /** Syntaxe de début de ligne (titre, liste, citation). */
  line?: boolean;
}

/**
 * Éditeur Markdown du corps des articles : barre d'outils, insertion d'images depuis la
 * médiathèque ImageKit et aperçu fidèle au rendu du site.
 */
@Component({
  selector: 'admin-markdown-editor',
  imports: [MarkdownPipe],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MarkdownEditor), multi: true },
  ],
  template: `
    <div
      class="overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-primary"
    >
      <div
        class="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-surface px-2 py-1.5"
      >
        @for (action of actions; track action.label) {
          <button
            type="button"
            class="rounded px-2 py-1 text-sm text-secondary hover:bg-white hover:text-primary disabled:opacity-40"
            [title]="action.label"
            [attr.aria-label]="action.label"
            [disabled]="preview() || disabled()"
            (click)="run(action)"
          >
            <i class="pi {{ action.icon }}" aria-hidden="true"></i>
          </button>
        }
        <button
          type="button"
          class="rounded px-2 py-1 text-sm text-secondary hover:bg-white hover:text-primary disabled:opacity-40"
          [disabled]="preview() || disabled()"
          title="Insérer une image de la médiathèque"
          (click)="insertImage()"
        >
          <i class="pi pi-image" aria-hidden="true"></i>
          <span class="sr-only">Insérer une image</span>
        </button>

        <div
          class="ml-auto flex rounded-md bg-white p-0.5 text-xs font-semibold ring-1 ring-gray-200"
        >
          <button
            type="button"
            class="rounded px-3 py-1"
            [class]="!preview() ? 'bg-secondary text-white' : 'text-foreground-muted'"
            (click)="preview.set(false)"
          >
            Rédaction
          </button>
          <button
            type="button"
            class="rounded px-3 py-1"
            [class]="preview() ? 'bg-secondary text-white' : 'text-foreground-muted'"
            (click)="preview.set(true)"
          >
            Aperçu
          </button>
        </div>
      </div>

      @if (preview()) {
        <div class="prose-dp min-h-80 p-6" [innerHTML]="value() | markdown"></div>
      } @else {
        <textarea
          #area
          class="block min-h-80 w-full resize-y p-4 font-mono text-sm leading-relaxed outline-none"
          [value]="value()"
          [disabled]="disabled()"
          (input)="update(area.value)"
          (blur)="onTouched()"
          placeholder="Rédigez l'article… ## pour un intertitre, **gras**, *italique*, - liste, > citation."
        ></textarea>
      }
    </div>
  `,
})
export class MarkdownEditor implements ControlValueAccessor {
  private readonly picker = inject(ImagePicker);
  private readonly area = viewChild<ElementRef<HTMLTextAreaElement>>('area');

  protected readonly value = signal('');
  protected readonly preview = signal(false);
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected readonly actions: ToolbarAction[] = [
    {
      label: 'Intertitre',
      icon: 'pi-heading',
      line: true,
      apply: (s) => ({ text: `## ${s || 'Intertitre'}` }),
    },
    { label: 'Gras', icon: 'pi-bold', apply: (s) => wrap(s, '**', 'texte en gras') },
    { label: 'Italique', icon: 'pi-italic', apply: (s) => wrap(s, '*', 'texte en italique') },
    {
      label: 'Liste',
      icon: 'pi-list',
      line: true,
      apply: (s) => ({
        text: (s || 'élément')
          .split('\n')
          .map((l) => `- ${l}`)
          .join('\n'),
      }),
    },
    {
      label: 'Citation',
      icon: 'pi-comment',
      line: true,
      apply: (s) => ({ text: `> ${s || 'citation'}` }),
    },
    {
      label: 'Lien',
      icon: 'pi-link',
      apply: (s) => {
        const text = `[${s || 'texte du lien'}](https://)`;
        // Sélectionne « https:// » pour que l'URL soit saisie directement.
        return { text, select: [text.length - 9, text.length - 1] };
      },
    },
  ];

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  protected update(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  protected run(action: ToolbarAction): void {
    const area = this.area()?.nativeElement;
    if (!area) {
      return;
    }
    const { selectionStart: start, selectionEnd: end, value } = area;
    // Les syntaxes de ligne doivent commencer en début de ligne.
    const prefix = action.line && start > 0 && value[start - 1] !== '\n' ? '\n' : '';
    const result = action.apply(value.slice(start, end));
    this.replaceRange(
      start,
      end,
      prefix + result.text,
      result.select?.map((i) => i + prefix.length) as [number, number],
    );
  }

  /** Ouvre la médiathèque : l'image choisie — ou téléversée à cette occasion — est insérée ici. */
  protected async insertImage(): Promise<void> {
    // La position du curseur est relevée avant l'ouverture : la fenêtre modale prend le focus.
    const at = this.area()?.nativeElement.selectionStart ?? this.value().length;
    const image = await this.picker.open('blog', "Insérer une image dans l'article");
    if (image) {
      this.replaceRange(at, at, `\n![${image.name}](${image.url})\n`);
    }
  }

  private replaceRange(start: number, end: number, text: string, select?: [number, number]): void {
    const current = this.value();
    this.update(current.slice(0, start) + text + current.slice(end));
    const area = this.area()?.nativeElement;
    if (area) {
      area.value = this.value();
      area.focus();
      const [from, to] = select ?? [text.length, text.length];
      area.setSelectionRange(start + from, start + to);
    }
  }
}

function wrap(selection: string, marker: string, placeholder: string) {
  const inner = selection || placeholder;
  const text = `${marker}${inner}${marker}`;
  return { text, select: [marker.length, marker.length + inner.length] as [number, number] };
}
