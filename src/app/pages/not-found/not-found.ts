import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../components/container/container';
import { LanguageService } from '../../services/language.service';
import { LocalizePipe } from '../../pipes/localize.pipe';

@Component({
  selector: 'app-not-found',
  imports: [Container, RouterLink, LocalizePipe],
  templateUrl: './not-found.html',
})
export default class NotFound {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().notFound);
}
