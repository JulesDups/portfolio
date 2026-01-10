import { type NextRequest, NextResponse } from "next/server";

// Configuration pour Vercel Edge Functions (Optionnel, mais plus rapide)
export const runtime = "edge";

// --- PROMPTS DE L'ARCHITECTE (Stockés côté serveur pour sécurité) ---
const PROMPTS = {
  estimate: (input: string) => `
    Tu es l'assistant commercial de Jules Dupuis, "Partenaire Numérique" pour artisans et indépendants.
    
    CONTEXTE CLIENT : "${input}"
    
    TÂCHE : Analyse ce projet et fournis une estimation commerciale précise et réaliste.
    
    CONTRAINTES :
    - Ton ton doit être simple, rassurant et sans jargon technique (Approche "Client First")
    - Base-toi sur les nouvelles offres pour CATÉGORISER, mais adapte le budget à la réalité :
      * L'ESSENTIEL (850€) : Strictement pour Site Vitrine simple (3-5 pages, pas de fonctionnalité complexe)
      * L'ARTISAN (1600€) : Site Vitrine Premium + SEO + Blog (PAS d'e-commerce complet)
      * L'ATELIER (Sur devis, min 2500€) : Web Apps, Outils Métier, E-commerce, Espaces Membres
      * RENFORT TECH (450€/j) : Régie / Freelance
    - RÈGLE D'OR : Un E-commerce ou un outil métier ne coûte JAMAIS 1600€. Si demande complexe -> Budget > 2500€.
    - Identifie 4-5 fonctionnalités clés CONCRÈTES
    - Durée réaliste (un e-commerce ne se fait pas en 1 semaine)
    
    FORMAT JSON STRICT :
    {
      "projectType": "Type de projet en 2-4 mots max",
      "complexity": "Simple|Moyen|Complexe",
      "estimatedBudget": "Fourchette réaliste (ex: 850€ (Fixe) ou 2500-4000€)",
      "estimatedDuration": "Durée en semaines",
      "recommendedPlan": "L'ESSENTIEL|L'ARTISAN|L'ATELIER|RENFORT TECH",
      "keyFeatures": ["Fonctionnalité 1", "Fonctionnalité 2"],
      "nextSteps": "Appel à l'action"
    }
    
    EXEMPLE DE RÉPONSE :
    {
      "projectType": "Site Vitrine Plombier",
      "complexity": "Simple",
      "estimatedBudget": "1600€",
      "estimatedDuration": "2-3 semaines",
      "recommendedPlan": "L'ARTISAN",
      "keyFeatures": ["Présentation des services", "Formulaire de contact rapide", "Section avis clients", "Optimisation Google Local"],
      "nextSteps": "Je vous propose un échange rapide pour valider ces besoins."
    }`,

  brief: (input: string) => `
    Tu es un Partenaire Numérique aidant un artisan/indépendant à structurer son projet.
    
    DESCRIPTION PROJET : "${input}"
    
    TÂCHE : Transforme cette idée en cahier des charges simple et compréhensible.
    
    CONTRAINTES :
    - Identifie l'OBJECTIF principal (gagner du temps ? trouver des clients ?)
    - Évite le jargon technique, parle "bénéfices métier"
    - Suggère l'offre la plus adaptée (L'ESSENTIEL, L'ARTISAN, L'ATELIER)
    - Distingue l'indispensable (Maintenant) du confort (Plus tard)
    
    FORMAT JSON STRICT :
    {
      "projectTitle": "Titre simple du projet",
      "coreObjective": "Objectif principal en 1 phrase",
      "targetUsers": ["Client", "Artisan"],
      "mustHaveFeatures": ["Fonctionnalité 1", "Fonctionnalité 2"],
      "niceToHaveFeatures": ["Idée pour plus tard"],
      "technicalConstraints": "Contraintes (ex: usage mobile sur chantier)",
      "estimatedScope": "Recommandation d'offre avec justification simple"
    }
    
    EXEMPLE DE RÉPONSE :
    {
      "projectTitle": "Outil de Suivi de Chantier",
      "coreObjective": "Remplacer le carnet papier pour ne plus perdre d'infos clients",
      "targetUsers": ["Artisan", "Secrétaire"],
      "mustHaveFeatures": ["Fiche client simple", "Prise de photos chantier", "Notes vocales"],
      "niceToHaveFeatures": ["Signature électronique devis", "Envoi facture auto"],
      "technicalConstraints": "Doit fonctionner sur smartphone sans réseau idéalement",
      "estimatedScope": "Offre L'ATELIER - C'est un outil de gestion sur-mesure pour votre activité"
    }`,

  email: (input: string) => `
    Tu agis en tant que client potentiel souhaitant contacter Jules Dupuis (Partenaire Numérique).
    Ta tâche est de rédiger un email de premier contact basé sur ces éléments : "${input}". 
    
    Si une offre spécifique est mentionnée (Essentiel, Artisan, Atelier), mentionne-la.
    Le ton doit être simple, direct et cordial.
    
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
