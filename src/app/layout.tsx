import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gauthier Defoy | Robotics & AI Engineering",
  description:
    "Portfolio bilingue de Gauthier Defoy, étudiant ingénieur à l'ESILV spécialisé en robotique, IA locale, vision par ordinateur et interfaces humain-machine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
