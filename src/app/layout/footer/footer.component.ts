import { Component } from '@angular/core';
// CommonModule n'est pas strictement nécessaire ici si vous n'utilisez pas de directives comme *ngIf, *ngFor ou des pipes.
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    // CommonModule // Décommentez si besoin
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
