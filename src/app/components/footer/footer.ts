import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../container/container';
import { CompanyService } from '../../services/company.service';
import { SocialService } from '../../services/social.service';
import { LanguageService } from '../../services/language.service';
import { LocalizePipe } from '../../pipes/localize.pipe';

@Component({
  selector: 'my-footer',
  imports: [Container, RouterLink, LocalizePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly content = inject(LanguageService).content;

  protected readonly company = inject(CompanyService).company;
  protected readonly networks = inject(SocialService).enabledNetworks;
  protected readonly footer = computed(() => this.content().footer);
  protected readonly meta = computed(() => this.content().meta);
  protected readonly ui = computed(() => this.content().ui);
  protected readonly year = new Date().getFullYear();
}
