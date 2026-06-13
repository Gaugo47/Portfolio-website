import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robotics & AI Engineering Portfolio",
  description:
    "Portfolio for a Robotics & AI engineering student building perception, intelligence, robotics, and human-machine interaction systems.",
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
