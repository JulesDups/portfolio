import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
// app-routing.module.ts
// src/app/app.routes.ts
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';

export const APP_ROUTES: Routes = [
  {
    path: 'accueil',
    component: HomeComponent,
    title: 'Accueil | Jules Dupuis',
    data: { animation: 'HomePage' },
  },
  {
    path: 'a-propos',
    component: AboutComponent,
    title: 'À Propos | Jules Dupuis',
    data: { animation: 'AboutPage' },
  },
  {
    path: 'projets',
    component: ProjectsComponent,
    title: 'Projets | Jules Dupuis',
    data: { animation: 'ProjectsPage' },
  },
  {
    path: 'competences',
    component: SkillsComponent,
    title: 'Compétences | Jules Dupuis',
    data: { animation: 'SkillsPage' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact | Jules Dupuis',
    data: { animation: 'ContactPage' },
  },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/accueil' }, // Ou un composant NotFoundComponent dédié
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    provideClientHydration(withEventReplay()),
  ],
};
