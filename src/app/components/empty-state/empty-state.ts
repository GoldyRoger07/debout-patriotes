import { Component, input } from '@angular/core';

/** Message affiché quand une rubrique ne contient encore aucune publication. */
@Component({
  selector: 'my-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
})
export class EmptyState {
  message = input.required<string>();
  icon = input('pi-inbox');
}
