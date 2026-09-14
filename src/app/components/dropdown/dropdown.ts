import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkItem } from '../../models/link-item.model';

/**
 * Menu déroulant de la barre de navigation (bureau uniquement).
 * Sur mobile, le header affiche ses propres accordéons.
 */
@Component({
  selector: 'my-dropdown',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  label = input.required<string>();
  items = input.required<LinkItem[]>();
}
