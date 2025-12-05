"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        {/* Navigation retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-12 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 -ml-2"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          RETOUR AU PORTFOLIO
        </Link>

        <h1 className="font-serif text-4xl mb-8">Mentions Légales & CGV</h1>

        <div className="space-y-12 text-sm leading-relaxed text-foreground/80">
          {/* Section 1 : L'Éditeur */}
          <section className="border-l-2 border-primary pl-6">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4 uppercase">
              01. Éditeur du site
            </h2>
            <p>
              <strong>Éditeur :</strong> Jules Dupuis
              <br />
              <strong>Statut :</strong> Micro-entrepreneur (Immatriculation en
              cours)
              <br />
              <strong>Adresse :</strong> Anglet, France
              <br />
              <strong>Contact :</strong> julesdupspro@gmail.com
            </p>
          </section>

          {/* Section 2 : Hébergement */}
          <section className="border-l-2 border-primary pl-6">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4 uppercase">
              02. Architecture & Hébergement
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Frontend :</strong> Vercel Inc. (USA)
              </li>
              <li>
                <strong>Backend :</strong> Koyeb (France)
              </li>
              <li>
                <strong>Base de Données :</strong> Neon Inc. (USA)
              </li>
            </ul>
          </section>

          {/* Section 3 : Propriété Intellectuelle (La clause clé) */}
          <section className="border-l-2 border-primary pl-6">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4 uppercase">
              03. Propriété Intellectuelle
            </h2>
            <div className="space-y-4">
              <p>
                <strong>Le Produit Fini ("Le Build") :</strong>
                <br />
                Le Prestataire cède au Client la pleine propriété du produit
                fini (fichiers compilés, interface utilisateur, contenus
                spécifiques) lors du paiement intégral de la facture finale.
              </p>
              <p>
                <strong>Les Outils ("Le Template") :</strong>
                <br />
                Le Prestataire conserve la propriété intellectuelle exclusive de
                ses méthodes, bibliothèques de code génériques et templates de
                développement. Une licence d'utilisation non-exclusive et
                illimitée est accordée au Client pour l'exploitation de ce
                projet uniquement. La revente ou la duplication du code source
                structurel pour d'autres projets est interdite sans accord
                écrit.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 text-center font-mono text-xs text-foreground/50">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
