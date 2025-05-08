import { Component } from '@angular/core';

// Importez tous vos composants de page/section standalone
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Plus besoin de RouterOutlet ici
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ExperiencesComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'mon-portfolio-parallax';
}
