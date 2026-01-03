import { type NextRequest, NextResponse } from "next/server";

// Configuration pour Vercel Edge Functions (Optionnel, mais plus rapide)
export const runtime = "edge";

// --- PROMPTS DE L'ARCHITECTE (Stockés côté serveur pour sécurité) ---
const PROMPTS = {
  estimate: (input: string) => `
    Tu es l'assistant commercial de Jules Dupuis, développeur freelance expert Java/Angular.
    
    CONTEXTE CLIENT : "${input}"
    
    TÂCHE : Analyse ce projet et fournis une estimation commerciale précise et réaliste.
    
    CONTRAINTES :
    - Sois réaliste sur le budget (ne sous-estime JAMAIS, mieux vaut surestimer légèrement)
    - Base-toi sur les offres : L'ESQUISSE (dès 1500€ - sites vitrines), LA RÉSIDENCE (dès 3000€ - apps métier), LA CITADELLE (sur devis - SaaS complexes)
    - Identifie 4-5 fonctionnalités clés CONCRÈTES (pas de généralités)
    - Durée réaliste : 1-3 semaines = simple, 4-8 semaines = moyen, 8+ semaines = complexe
    - Le nextSteps doit être un appel à l'action personnalisé et engageant
    
    FORMAT JSON STRICT :
    {
      "projectType": "Type de projet en 2-4 mots max",
      "complexity": "Simple|Moyen|Complexe",
      "estimatedBudget": "Fourchette réaliste (ex: 2500-4000€)",
      "estimatedDuration": "Durée en semaines (ex: 4-6 semaines)",
      "recommendedPlan": "L'ESQUISSE|LA RÉSIDENCE|LA CITADELLE",
      "keyFeatures": ["Fonctionnalité concrète 1", "Fonctionnalité concrète 2", "Fonctionnalité concrète 3", "Fonctionnalité concrète 4"],
      "nextSteps": "Phrase d'appel à l'action personnalisée et engageante"
    }
    
    EXEMPLE DE RÉPONSE :
    {
      "projectType": "Site E-commerce Artisanal",
      "complexity": "Moyen",
      "estimatedBudget": "3500-5500€",
      "estimatedDuration": "5-7 semaines",
      "recommendedPlan": "LA RÉSIDENCE",
      "keyFeatures": ["Catalogue produits avec galerie photos", "Panier et paiement sécurisé Stripe", "Interface d'administration des stocks", "Système de gestion des commandes", "Optimisation SEO pour Google Shopping"],
      "nextSteps": "Planifions un appel de 30 minutes pour affiner le périmètre et vous fournir un devis détaillé sur-mesure."
    }`,

  brief: (input: string) => `
    Tu es un Product Owner expérimenté travaillant avec Jules Dupuis, architecte logiciel freelance.
    
    DESCRIPTION PROJET : "${input}"
    
    TÂCHE : Transforme cette idée en cahier des charges structuré et exploitable.
    
    CONTRAINTES :
    - Identifie clairement l'objectif MÉTIER (pas juste technique) - quel problème ça résout ?
    - Différencie Must-Have (MVP - version 1) vs Nice-to-Have (V2 - améliorations futures)
    - Liste 3-5 fonctionnalités essentielles CONCRÈTES maximum pour le MVP
    - Identifie 2-3 types d'utilisateurs cibles
    - Sois concret, actionnable et réaliste
    - Le estimatedScope doit recommander une offre ET justifier pourquoi
    
    FORMAT JSON STRICT :
    {
      "projectTitle": "Titre court et percutant du projet",
      "coreObjective": "Objectif métier principal en 1 phrase claire",
      "targetUsers": ["Type utilisateur 1", "Type utilisateur 2"],
      "mustHaveFeatures": ["Fonctionnalité MVP 1", "Fonctionnalité MVP 2", "Fonctionnalité MVP 3"],
      "niceToHaveFeatures": ["Amélioration V2 1", "Amélioration V2 2"],
      "technicalConstraints": "Contraintes techniques identifiées (mobile, temps réel, etc.)",
      "estimatedScope": "Recommandation d'offre (L'ESQUISSE/LA RÉSIDENCE/LA CITADELLE) avec justification courte"
    }
    
    EXEMPLE DE RÉPONSE :
    {
      "projectTitle": "Plateforme de Réservation Restaurant",
      "coreObjective": "Réduire les no-shows et optimiser le taux de remplissage du restaurant via un système de réservation en ligne automatisé",
      "targetUsers": ["Clients du restaurant", "Personnel de salle", "Manager"],
      "mustHaveFeatures": ["Calendrier de réservation temps réel avec disponibilités", "Confirmation automatique par email/SMS", "Tableau de bord de gestion des tables", "Système de rappels 24h avant"],
      "niceToHaveFeatures": ["Programme de fidélité avec points", "Intégration Google Maps et avis", "Analytics de fréquentation"],
      "technicalConstraints": "Application responsive (mobile + desktop), synchronisation temps réel des réservations, notifications automatiques",
      "estimatedScope": "Projet type LA RÉSIDENCE (3000€+) - Application métier avec automatisation de workflows et gestion de données en temps réel"
    }`,

  email: (input: string) => `
    Tu agis en tant que client potentiel souhaitant contacter Jules Dupuis (Architecte Numérique / Freelance).
    Ta tâche est de rédiger un email de premier contact basé sur ces éléments : "${input}". 
    
    Si une offre spécifique est mentionnée (Esquisse, Résidence, Citadelle), mentionne-la clairement comme base de travail.
    Le ton doit être professionnel mais engageant, montrant un intérêt sérieux pour une collaboration.
    
    Format JSON strict : { "subject": "Objet percutant de l'email", "body": "Corps de l'email (sans signature, juste le texte)" }`,
};

export async function POST(req: NextRequest) {
  try {
    // 1. Récupération des données du Frontend
    const { action, input } = await req.json();

    if (!input || !action || !PROMPTS[action as keyof typeof PROMPTS]) {
      return new NextResponse(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
      });
    }

    // 2. Appel Sécurisé à Gemini (Serveur à Serveur)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new NextResponse(
        JSON.stringify({ error: "API Key not configured on server" }),
        { status: 500 },
      );
    }

    const promptText = PROMPTS[action as keyof typeof PROMPTS](input);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      },
    );

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No content generated");
    }

    // 3. Retourner le résultat au Frontend
    return new NextResponse(generatedText, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini Proxy Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
