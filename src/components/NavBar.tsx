"use client";

import { Code2, Mail, Network } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrambleHover } from "@/components/ui/scramble-hover";
import { ThemeToggle } from "@/components/ThemeToggle";

export type Language = "fr" | "en";

type NavBarProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  labels: {
    about: string;
    systems: string;
    projects: string;
    journey: string;
    education: string;
    experience: string;
    vision: string;
    contact: string;
    skip: string;
    github: string;
    linkedin: string;
    brand: string;
  };
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export function NavBar({ language, onLanguageChange, labels, links }: NavBarProps) {
  const navLinks = [
    { label: labels.about, href: "#about" },
    { label: labels.systems, href: "#systems" },
    { label: labels.projects, href: "#projects" },
    { label: labels.journey, href: "#journey" },
    { label: labels.education, href: "#education" },
    { label: labels.experience, href: "#experience" },
    { label: labels.vision, href: "#vision" },
  ];

  const [activeSection, setActiveSection] = useState<string>("");
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
    // navLinks est recalculé à chaque rendu mais les ancres sont stables
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.08 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#content"
        className="focus-ring fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-200 focus-visible:translate-y-0"
      >
        {labels.skip}
      </a>
      <header
        className={`sticky top-3 z-50 px-3 py-3 transition-[opacity,transform] duration-300 md:top-5 md:px-6 ${
          isFooterVisible ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"
        }`}
      >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/12 bg-[#05060a]/78 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
        aria-label="Primary navigation"
      >
        <a className="focus-ring mono-detail rounded-full text-sm font-semibold uppercase tracking-[0.22em] text-white" href="#top">
          <ScrambleHover
            text={labels.brand}
            useOriginalCharsOnly
            scrambleSpeed={34}
            maxIterations={14}
            scrambledClassName="text-[#7cc8ef]"
          />
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href ? "true" : undefined}
              className={`focus-ring cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeSection === link.href
                  ? "bg-white/[0.09] text-white"
                  : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] p-1 sm:flex" aria-label="Language selector">
            {(["fr", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLanguageChange(item)}
                className={`focus-ring cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition-colors duration-200 ${
                  language === item ? "bg-white text-slate-950" : "text-slate-400 hover:bg-white/[0.08] hover:text-white"
                }`}
                aria-pressed={language === item}
              >
                {item}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <a
            href={links.github}
            className="focus-ring cursor-pointer rounded-full p-2 text-slate-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            aria-label={labels.github}
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            href={links.linkedin}
            className="focus-ring cursor-pointer rounded-full p-2 text-slate-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            aria-label={labels.linkedin}
          >
            <Network className="h-4 w-4" />
          </a>
          <a
            href={links.email}
            className="focus-ring cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-sky-200"
          >
            <span className="hidden sm:inline">{labels.contact}</span>
            <Mail className="h-4 w-4 sm:hidden" />
          </a>
        </div>
      </nav>
      <div className="mx-auto mt-2 flex w-fit rounded-full border border-white/10 bg-slate-950/80 p-1 shadow-xl shadow-black/20 backdrop-blur-xl sm:hidden">
        {(["fr", "en"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onLanguageChange(item)}
            className={`focus-ring cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition-colors duration-200 ${
              language === item ? "bg-white text-slate-950" : "text-slate-400 hover:bg-white/[0.08] hover:text-white"
            }`}
            aria-pressed={language === item}
          >
            {item}
          </button>
        ))}
      </div>
    </header>
    </>
  );
}
