import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  kind: 'success' | 'error';
  text: string;
}

export interface ConfirmRequest {
  title: string;
  message: string;
  confirmLabel?: string;
  /** Action destructrice : bouton rouge. */
  danger?: boolean;
}

/** Retours visuels du back-office : notifications éphémères et demandes de confirmation. */
@Injectable({ providedIn: 'root' })
export class Feedback {
  private nextId = 1;
  private pendingConfirm?: (answer: boolean) => void;

  readonly toasts = signal<Toast[]>([]);
  readonly confirmation = signal<ConfirmRequest | null>(null);

  success(text: string): void {
    this.push('success', text);
  }

  error(text: string): void {
    this.push('error', text);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  /** Affiche une boîte de confirmation ; résout `true` si l'utilisateur confirme. */
  confirm(request: ConfirmRequest): Promise<boolean> {
    this.pendingConfirm?.(false);
    this.confirmation.set(request);
    return new Promise((resolve) => (this.pendingConfirm = resolve));
  }

  answer(value: boolean): void {
    this.confirmation.set(null);
    this.pendingConfirm?.(value);
    this.pendingConfirm = undefined;
  }

  private push(kind: Toast['kind'], text: string): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, kind, text }]);
    setTimeout(() => this.dismiss(id), kind === 'error' ? 7000 : 4000);
  }
}
