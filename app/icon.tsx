import { ImageResponse } from "next/og";

// Configuration de l'image (Taille Google Friendly : 192x192)
export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

// Génération de l'icône
export default function Icon() {
  return new ImageResponse(
    // Container principal
    <div
      style={{
        fontSize: 108, // Ajusté pour 192px (ratio ~x6)
        background: "#1f4045",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fcfbf7",
        borderRadius: "36px", // Ajusté pour 192px
        fontFamily: "monospace",
        fontWeight: 900,
        border: "12px solid #bf2c23", // Bordure épaissie pour rester visible
      }}
    >
      JD
    </div>,
    {
      ...size,
    },
  );
}
