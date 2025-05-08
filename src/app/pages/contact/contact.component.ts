import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Pour Reactive Forms

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Ajoutez ceci pour les formulaires réactifs
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submissionMessage = '';
  submissionError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Affiche les erreurs de validation
      return;
    }

    this.isSubmitting = true;
    this.submissionMessage = '';
    this.submissionError = false;

    // Logique d'envoi du formulaire (ex: vers Formspree, Netlify, ou une API)
    // Exemple SIMULÉ :
    try {
      // const response = await fetch('VOTRE_ENDPOINT_FORMSPREE_OU_AUTRE', {
      //   method: 'POST',
      //   body: JSON.stringify(this.contactForm.value),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // if (!response.ok) throw new Error('Network response was not ok.');

      console.log('Form Data:', this.contactForm.value); // Pour le test
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simule une attente réseau

      this.submissionMessage = 'Message envoyé avec succès !';
      this.contactForm.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      this.submissionMessage = "Erreur lors de l'envoi. Veuillez réessayer.";
      this.submissionError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}
