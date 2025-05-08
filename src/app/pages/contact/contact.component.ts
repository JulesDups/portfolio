import { CommonModule } from '@angular/common'; // Pour *ngIf si vous en avez besoin
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
