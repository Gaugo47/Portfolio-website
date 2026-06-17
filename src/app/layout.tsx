import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { SitePreloader } from "@/components/SitePreloader";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Gauthier Defoy | Robotics & AI Engineering",
  description:
    "Portfolio bilingue de Gauthier Defoy, étudiant ingénieur à l'ESILV spécialisé en robotique, IA locale, vision par ordinateur et interfaces humain-machine.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SitePreloader />
        {children}
      </body>
    </html>
  );
}
