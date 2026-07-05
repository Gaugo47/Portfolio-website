"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// Bascule clair/sombre : la classe `light` sur <html> pilote la feuille de
// surcharges de globals.css ; le choix est persisté dans localStorage et
// appliqué avant le premier rendu par le script inline du layout.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // stockage indisponible (navigation privée) : le thème reste pour la session
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Passer au thème sombre" : "Passer au thème clair"}
      aria-pressed={isLight}
      className={`focus-ring cursor-pointer rounded-full p-2 text-slate-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white ${className}`}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
