import { CommonModule } from '@angular/common'; // Utile pour [style.backgroundImage] si on considère la détection de changement, bien que pas strictement requis pour le binding de style simple.
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor() {}

  scrollToInternal(sectionId: string): void {
    // S'assure que l'élément existe avant de tenter de défiler
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Élément avec l'ID '${sectionId}' non trouvé pour le défilement.`);
    }
  }
}
