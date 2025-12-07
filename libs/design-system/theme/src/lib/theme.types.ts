import { InjectionToken } from '@angular/core';

// 1. The Interface (The Contract)
// Any App using this library must implement this if they want persistence.
export interface ThemeStorage {
  getTheme(): 'light' | 'dark' | null;
  saveTheme(theme: 'light' | 'dark'): void;
}

// 2. The Token
// This is the "Key" we use to find the implementation in the Dependency Injection system.
export const THEME_STORAGE = new InjectionToken<ThemeStorage>('THEME_STORAGE');
