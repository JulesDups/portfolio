import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
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
  // changeDetection: ChangeDetectionStrategy.OnPush, // Commenté pour test
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Portfolio Jules DUPUIS';

  @ViewChildren(HeaderComponent, { read: ElementRef }) headerRef!: QueryList<ElementRef>;

  private sectionObserver?: IntersectionObserver;
  private animationObserver?: IntersectionObserver;

  // **Variables pour débogage**
  debugObserverStatus = 'Initializing...';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.debugObserverStatus = 'ngAfterViewInit called.';

    // **Mettre en commentaire l'initialisation des observers pour tester**

    setTimeout(() => {
      try {
        this.debugObserverStatus = 'Attempting to init observers...';
        this.initSectionObserver();
        this.initAnimationObserver();
        this.observeSections();
        this.observeAnimatedElements();
        this.debugObserverStatus = 'Observers initialized and sections observed.';
        this.cdr.detectChanges();
      } catch (error) {
        this.debugObserverStatus = `Error initializing observers: ${error}`;
      }
    }, 100); // Augmenter légèrement le délai pour être sûr que le DOM est prêt

    this.cdr.detectChanges(); // Déclencher une fois même sans observers
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.animationObserver?.disconnect();
  }

  private initSectionObserver(): void {
    // ... (logique précédente) ...
    // Logique simplifiée pour test
    const options = { root: null, threshold: 0.5 }; // Plus simple pour tester
    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('id');
        console.log(`Section Observer: Element ${sectionId} intersecting: ${entry.isIntersecting}`);
        // Pour l'instant, ne rien faire avec les liens header pour simplifier
      });
    }, options);
  }

  private initAnimationObserver(): void {
    console.log('AppComponent: initAnimationObserver');
    // ... (logique précédente) ...
    // Logique simplifiée pour test
    const options = { root: null, threshold: 0.1 };
    this.animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible'); // Ajoute la classe pour la transition CSS simple
          observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  private observeSections(): void {
    const sectionsToObserve = this.elementRef.nativeElement.querySelectorAll('main > *[id]');
    sectionsToObserve.forEach((section: Element) => {
      this.sectionObserver?.observe(section);
    });
  }

  private observeAnimatedElements(): void {
    const elementsToAnimate = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((element: Element) => {
      // Pas besoin de classe initiale si on utilise juste opacity/transform dans .animate-on-scroll
      this.animationObserver?.observe(element);
    });
  }
}
