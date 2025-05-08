import { CommonModule } from '@angular/common'; // Si vous générez dynamiquement les listes
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {}
