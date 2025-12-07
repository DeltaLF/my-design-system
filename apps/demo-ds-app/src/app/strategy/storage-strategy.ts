import { Injectable } from '@angular/core';
import { ThemeStorage } from '@my-ds/theme'; // Import interface from lib

@Injectable()
export class LocalStorageStrategy implements ThemeStorage {
  private readonly KEY = 'user-theme-preference';

  getTheme(): 'light' | 'dark' | null {
    return localStorage.getItem(this.KEY) as 'light' | 'dark' | null;
  }

  saveTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(this.KEY, theme);
  }
}
