import { ImageResponse } from "next/og";

// Configuration pour l'Edge Runtime (plus rapide)
export const runtime = "edge";

export async function GET() {
  // On peut charger des polices ici si tu veux être très précis
  // Pour l'instant, on utilise des polices système/web standard pour faire léger

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfbf7", // Ton background "papier"
          backgroundImage: "radial-gradient(#1f4045 1px, transparent 1px)", // La grille subtile
          backgroundSize: "30px 30px",
          fontFamily: "serif",
        }}
      >
        {/* Cadre décoratif */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #1f4045", // Ton foreground
            padding: "40px 80px",
            backgroundColor: "#fcfbf7", // Pour masquer la grille sous le texte
            boxShadow: "12px 12px 0px 0px #bf2c23", // Ton primary (l'ombre portée "Architecte")
          }}
        >
          {/* Logo {JD.} */}
          <div
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#bf2c23", // Primary
              marginBottom: 20,
              fontFamily: "monospace",
            }}
          >
            {`{ JD. }`}
          </div>

          {/* Gros Titre */}
          <div
            style={{
              fontSize: 70,
              fontWeight: 900,
              color: "#1f4045", // Foreground
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: 10,
            }}
          >
            JULES DUPUIS
          </div>

          {/* Sous-titre Technique */}
          <div
            style={{
              fontSize: 30,
              color: "#4A5568", // Une teinte secondaire plus douce
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Architecte Numérique
          </div>

          {/* Tagline Locale */}
          <div
            style={{
              fontSize: 20,
              color: "#bf2c23",
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            /// PAYS BASQUE
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
