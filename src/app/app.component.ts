// MODIFIÉ: Ajout logique Intersection Observer
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';

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
    CommonModule,
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
  // Utiliser OnPush peut améliorer les perfs si les changements sont rares
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Portfolio Jules DUPUIS'; // Titre mis à jour

  // Référence au composant header pour trouver les liens
  @ViewChildren(HeaderComponent, { read: ElementRef }) headerRef!: QueryList<ElementRef>;

  private sectionObserver?: IntersectionObserver;
  private animationObserver?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef, // Injecter ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    // léger délai pour s'assurer que tout est rendu
    setTimeout(() => {
      this.initSectionObserver();
      this.initAnimationObserver();
      this.observeSections();
      this.observeAnimatedElements();
      this.cdr.detectChanges(); // Déclencher la détection de changement si OnPush est utilisé
    }, 0);
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.animationObserver?.disconnect();
  }

  // Observer pour le lien actif dans le header
  private initSectionObserver(): void {
    const options = {
      root: null, // observe par rapport au viewport
      rootMargin: '-40% 0px -60% 0px', // Zone d'activation au milieu de l'écran
      threshold: 0, // Dès qu'un pixel entre dans la marge
    };

    this.sectionObserver = new IntersectionObserver((entries) => {
      let activeSectionId: string | null = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Prend le dernier ID intersectant dans la zone cible
          activeSectionId = entry.target.getAttribute('id');
        }
      });

      // Met à jour les liens du header
      const headerEl = this.headerRef?.first?.nativeElement;
      if (headerEl && activeSectionId) {
        const navLinks = headerEl.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach((link: Element) => {
          link.classList.remove(
            'active-link',
            'text-brand-accent',
            'border-b-2',
            'border-brand-accent',
          ); // Nettoie tous les liens
          const href = link.getAttribute('href');
          if (href === `#${activeSectionId}`) {
            link.classList.add(
              'active-link',
              'text-brand-accent',
              'border-b-2',
              'border-brand-accent',
            ); // Active le bon lien
          }
        });
      }
      this.cdr.detectChanges(); // Informer Angular du changement potentiel (pour OnPush)
    }, options);
  }

  // Observer pour déclencher les animations douces
  private initAnimationObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -15% 0px', // Déclenche quand l'élément est à 15% du bas
      threshold: 0.1, // Au moins 10% visible
    };

    this.animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          // Optionnel: arrêter d'observer une fois animé
          observer.unobserve(entry.target);
        }
      });
      this.cdr.detectChanges(); // Informer Angular du changement potentiel (pour OnPush)
    }, options);
  }

  private observeSections(): void {
    const sectionsToObserve = this.elementRef.nativeElement.querySelectorAll('main > *[id]');
    sectionsToObserve.forEach((section: Element) => {
      this.sectionObserver?.observe(section);
    });
  }

  private observeAnimatedElements(): void {
    // Cible les éléments *à l'intérieur* des sections qui doivent être animés
    const elementsToAnimate = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((element: Element) => {
      element.classList.add('initial-hidden'); // Classe pour gérer l'état initial si besoin
      this.animationObserver?.observe(element);
    });
  }
}
