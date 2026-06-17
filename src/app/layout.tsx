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

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://prod.spline.design https://*.spline.design",
  "font-src 'self' data: https://www.gstatic.com",
  "connect-src 'self' https://prod.spline.design https://*.spline.design https://www.gstatic.com https://unpkg.com https://raw.githubusercontent.com",
  "child-src 'self' blob:",
  "worker-src 'self' blob:",
  "media-src 'self' blob:",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <SitePreloader />
        {children}
      </body>
    </html>
  );
}
