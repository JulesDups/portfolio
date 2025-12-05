import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jules Dupuis | Architecte Numérique",
  description:
    "Portfolio de Jules Dupuis, Développeur Freelance & Architecte Logiciel.",
  // Ajout de l'Open Graph dynamique
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
