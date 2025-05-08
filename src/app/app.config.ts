// MODIFIÉ: Suppression des imports et de provideRouter liés à la navigation par routeur

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(APP_ROUTES), // Supprimé
    provideClientHydration(), // Simplifié
    provideAnimations(),
    // provideHttpClient() // À ajouter si besoin
  ],
};
