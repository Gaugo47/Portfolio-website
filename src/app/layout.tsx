import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { ParticleField } from "@/components/ParticleField";
import { SitePreloader } from "@/components/SitePreloader";
import { assetPath } from "@/lib/assetPath";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Gauthier Defoy — Robotique & IA",
    template: "%s | Gauthier Defoy",
  },
  description:
    "Portfolio de Gauthier Defoy, étudiant ingénieur à l'ESILV. Robotique, IA locale, vision par ordinateur et prototypes mécatroniques — de l'idée au prototype fonctionnel.",
  icons: {
    icon: assetPath("/favicon.svg"),
  },
  openGraph: {
    title: "Gauthier Defoy — Robotique & IA",
    description:
      "Étudiant ingénieur à l'ESILV. Systèmes mécatroniques, IA embarquée et interfaces humain-machine, présentés en études de cas.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070c",
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
    <html
      lang="fr"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <ParticleField />
        <SitePreloader />
        {children}
      </body>
    </html>
  );
}
