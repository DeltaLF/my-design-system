import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { THEME_STORAGE } from '@my-ds/theme'; // Import Token
import { LocalStorageStrategy } from './strategy/storage-strategy'; // Import Implementation

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: THEME_STORAGE, useClass: LocalStorageStrategy },
  ],
};
