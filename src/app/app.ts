import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { SeoService } from './services/seo.service';
import { themeConfig } from './config/brand/theme';

/** Racine : le site public (`PublicLayout`) et le back-office (`/admin`) ont chacun leur habillage. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    inject(ThemeService).init(themeConfig);
    // Met à jour description et balises Open Graph à chaque navigation.
    inject(SeoService).init();
  }
}
