import { Component, computed, inject } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { EmptyState } from '../../components/empty-state/empty-state';
import { VideoPlayer } from '../../components/video-player/video-player';
import { LanguageService } from '../../services/language.service';
import { EventsApi } from '../../services/events-api.service';
import { AgendaEvent } from '../../models/event.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/**
 * Agenda : les événements à venir, du plus proche au plus lointain, puis les événements passés,
 * du plus récent au plus ancien. La vidéo d'un événement sert d'annonce, puis de rediffusion.
 */
@Component({
  selector: 'app-evenements',
  imports: [Container, PageHeader, EmptyState, VideoPlayer, NgTemplateOutlet, DatePipe, ImageKitPipe],
  templateUrl: './evenements.html',
})
export default class Evenements {
  private readonly content = inject(LanguageService).content;
  protected readonly language = inject(LanguageService).language;

  protected readonly page = computed(() => this.content().events);
  /** `undefined` pendant le chargement ; l'API les renvoie du plus lointain au plus ancien. */
  private readonly events = toSignal(inject(EventsApi).list());
  private readonly now = Date.now();

  protected readonly loaded = computed(() => this.events() !== undefined);
  protected readonly upcoming = computed(() =>
    (this.events() ?? []).filter((e) => !this.isPast(e)).reverse(),
  );
  protected readonly past = computed(() => (this.events() ?? []).filter((e) => this.isPast(e)));

  protected isPast(event: AgendaEvent): boolean {
    return new Date(event.startsAt).getTime() < this.now;
  }

  /** « Place d'Armes, Cap-Haïtien », avec ce qui est renseigné. */
  protected where(event: AgendaEvent): string {
    return [event.place, event.city].filter(Boolean).join(', ');
  }
}
