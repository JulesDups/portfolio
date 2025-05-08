import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Ou provideNoopAnimations()

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // Toujours utile pour les animations Angular si vous en utilisez
    // Si vous utilisez HttpClient, vous le fourniriez ici : provideHttpClient()
  ],
}).catch((err) => console.error(err));
