import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.julesdupuis.fr"),
  title: "Jules Dupuis | Architecte Numérique à Bayonne & au Pays Basque",
  description:
    "Développeur Web Freelance au Pays Basque (Bayonne, Biarritz, Anglet). Création de sites vitrines, e-commerce, logiciels de gestion sur-mesure et refonte de sites existants. Devis gratuit.",
  keywords: [
    // Recherches principales - Développeur
    "développeur web pays basque",
    "développeur freelance bayonne",
    "développeur freelance biarritz",
    "développeur web anglet",
    "développeur web côte basque",
    "développeur indépendant pays basque",

    // Services - Site Web & Vitrine
    "création site web pays basque",
    "création site internet bayonne",
    "création site web biarritz",
    "site vitrine pays basque",
    "site vitrine bayonne",
    "site vitrine biarritz",
    "refonte site web",
    "refonte site internet",

    // Services - E-commerce
    "création site e-commerce pays basque",
    "boutique en ligne pays basque",
    "site marchand bayonne",

    // Services - Applications & SaaS
    "logiciel de gestion sur mesure",
    "application de gestion",
    "logiciel métier",
    "saas de gestion",
    "outil de gestion personnalisé",
    "digitalisation entreprise",

    // Services - Accompagnement
    "accompagnement digital",
    "conseil web",
    "audit site web",
    "maintenance site web",
    "migration technologique",

    // Localisation précise
    "Bayonne",
    "Biarritz",
    "Anglet",
    "Pays Basque",
    "64",
    "Côte Basque",
    "Sud Landes",

    // Identité
    "Jules Dupuis",
    "architecte logiciel",
    "architecte numérique",
    "freelance",
  ],
  authors: [{ name: "Jules Dupuis" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Développeur Web Freelance Pays Basque | Sites Vitrines & SaaS",
    description:
      "Des fondations solides pour les acteurs locaux. Sites vitrines & Apps.",
    url: "https://www.julesdupuis.fr",
    siteName: "Jules Dupuis - Développeur Web Freelance",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Jules Dupuis - Architecte Numérique",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Web Freelance Pays Basque | Bayonne Biarritz",
    description:
      "Sites vitrines, e-commerce & logiciels de gestion sur-mesure au Pays Basque. Devis gratuit.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
