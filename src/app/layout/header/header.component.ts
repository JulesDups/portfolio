import { CommonModule } from '@angular/common'; // Pour *ngIf
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor() {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Optionnel: pour fermer le menu après un clic, même avec des href
  // Si le défilement CSS est suffisant, cette fonction peut ne pas être nécessaire
  // pour les liens, mais elle l'est pour le bouton burger.
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  // Optionnel: si vous voulez un contrôle JS sur le scroll ou une logique après scroll.
  // Sinon, href="#id" et scroll-behavior:smooth suffisent.
  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.closeMobileMenu(); // Ferme le menu mobile après avoir cliqué sur un lien
  }
}
