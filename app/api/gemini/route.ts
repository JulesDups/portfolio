import { type NextRequest, NextResponse } from "next/server";

// Configuration pour Vercel Edge Functions (Optionnel, mais plus rapide)
export const runtime = "edge";

// --- PROMPTS DE L'ARCHITECTE (Stockés côté serveur pour sécurité) ---
const PROMPTS = {
  blueprint: (input: string) => `
    Tu es l'assistant architecte logiciel de Jules Dupuis (Expert Java/Angular). 
    Un prospect a une idée de projet : "${input}".
    Agis comme un architecte senior et génère une "Note de Cadrage Technique" concise (max 150 mots) au format JSON strict avec ces champs :
    {
      "foundations": "Suggestion d'architecture Backend (Java/Spring focus)",
      "facade": "Suggestion Frontend (Angular focus)",
      "risk": "Un point de vigilance technique majeur",
      "analogy": "Une métaphore architecturale/bâtiment pour décrire le projet"
    }
    Sois professionnel, rassurant et expert.`,

  roadmap: (input: string) => `
    Pour le projet "${input}", génère un planning prévisionnel simplifié en 3 phases pour un développeur freelance. Remplace les X par des chiffres cohérents aux tâches.
    Format JSON strict :
    [
      { "phase": "Phase 1 : Fondations", "duration": "X semaines", "tasks": ["Tâche A", "Tâche B"] },
      { "phase": "Phase 2 : Élévation (Dev)", "duration": "X semaines", "tasks": ["Tâche C", "Tâche D"] },
      { "phase": "Phase 3 : Finitions & Livraison", "duration": "X semaines", "tasks": ["Tâche E", "Tâche F"] }
    ]`,

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
        { status: 500 }
      );
    }

    const promptText = PROMPTS[action as keyof typeof PROMPTS](input);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
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
      { status: 500 }
    );
  }
}
