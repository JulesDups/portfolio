import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.julesdupuis.fr"),
  title: "Jules Dupuis | Architecte Numérique à Bayonne & au Pays Basque",
  description:
    "Jules Dupuis, Développeur Freelance & Architecte Logiciel au Pays Basque. Sites vitrines, applications web et accompagnement digital pour les acteurs locaux.",
  keywords: [
    "développeur freelance",
    "architecte logiciel",
    "Pays Basque",
    "Bayonne",
    "site vitrine",
    "application web",
    "saas",
    "jules dupuis",
    "jules dupuis portfolio",
    "Next.js",
    "React",
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
    title: "Jules Dupuis | Architecte Numérique",
    description:
      "Des fondations solides pour les acteurs locaux. Sites vitrines & Apps.",
    url: "https://www.julesdupuis.fr",
    siteName: "Portfolio Jules Dupuis",
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
    title: "Jules Dupuis | Architecte Numérique",
    description:
      "Développeur Freelance & Architecte Logiciel au Pays Basque. Sites vitrines & Apps.",
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
      </body>
    </html>
  );
}
