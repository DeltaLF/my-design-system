import {
  Injectable,
  Inject,
  signal,
  Optional,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { THEME_STORAGE, ThemeStorage } from './theme.types';

@Injectable({
  providedIn: 'root', // Singleton service
})
export class ThemeService {
  // Signal allows components to react instantly (no Observables needed)
  readonly currentTheme = signal<'light' | 'dark'>('light');
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    // We try to inject the storage. If the App didn't provide it, it's null (Optional).
    @Optional() @Inject(THEME_STORAGE) private storage: ThemeStorage | null
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  toggleTheme() {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: 'light' | 'dark') {
    // 1. Update State
    this.currentTheme.set(theme);

    // 2. Update DOM (The Mechanism)
    // We use setAttribute on <html>. Because it inherits, this handles global scoping.
    this.renderer.setAttribute(
      this.document.documentElement,
      'data-theme',
      theme
    );

    // 3. Persist (The Policy)
    // Only save if a Storage Strategy was provided!
    if (this.storage) {
      this.storage.saveTheme(theme);
    }
  }

  private initTheme() {
    // 1. Check Storage Strategy first
    const storedTheme = this.storage?.getTheme();

    if (storedTheme) {
      this.setTheme(storedTheme);
      return;
    }

    // 2. Fallback to System Preference (Browser Native)
    // This logic only runs if no storage preference was found.
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.setTheme(systemDark ? 'dark' : 'light');
  }
}
