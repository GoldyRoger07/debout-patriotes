import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { SeoService } from './services/seo.service';
import { themeConfig } from './config/brand/theme';
import { Header2 } from './components/header2/header2';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header2, Footer],
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
