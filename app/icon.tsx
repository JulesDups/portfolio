import { ImageResponse } from "next/og";

// Configuration de l'image (Standard Favicon)
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Génération de l'icône
export default function Icon() {
  return new ImageResponse(
    // Container principal (Le carré)
    <div
      style={{
        fontSize: 18, // Taille calibrée pour du 32px
        background: "#1f4045", // Ton "Brand Dark" (fond sombre pour contraster avec les onglets clairs)
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fcfbf7", // Ton "Brand Light" (texte clair)
        borderRadius: "6px", // Un peu d'arrondi (comme une app)
        fontFamily: "monospace",
        fontWeight: 900,
        border: "2px solid #bf2c23", // Ta bordure "Primary" (la touche Architecte)
      }}
    >
      JD
    </div>,
    {
      ...size,
    },
  );
}
