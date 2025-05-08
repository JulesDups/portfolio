import { CommonModule } from '@angular/common'; // Pour *ngFor si vous itérez sur une liste de projets
import { Component } from '@angular/core';

interface Project {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects: Project[] = [
    // Vos données de projet ici
    // Exemple :
    // {
    //   id: 1,
    //   name: 'Nom du Projet 1',
    //   imageUrl: 'assets/images/projet1.png',
    //   description: 'Courte description...',
    //   tags: ['Angular', 'TailwindCSS', 'Node.js'],
    //   demoUrl: '#',
    //   sourceUrl: '#'
    // },
  ];
}
