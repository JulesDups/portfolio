import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jules Dupuis | Architecte Numérique à Bayonne & au Pays Basque",
  description:
    "Jules Dupuis, Développeur Freelance & Architecte Logiciel au Pays Basque",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
