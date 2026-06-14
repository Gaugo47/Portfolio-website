import type { Language } from "@/components/NavBar";

export type JourneyPoint = {
  city: string;
  lat: number;
  lng: number;
};

export type Journey = {
  year: string;
  from: JourneyPoint;
  to: JourneyPoint;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

export const journeys: Journey[] = [
  {
    year: "2024",
    from: {
      city: "Meaux",
      lat: 48.9602,
      lng: 2.8885,
    },
    to: {
      city: "Nantes",
      lat: 47.2184,
      lng: -1.5536,
    },
    title: {
      fr: "Etudes d'ingenieur a l'ESILV Nantes",
      en: "Engineering studies at ESILV Nantes",
    },
    description: {
      fr: "Debut de mon parcours en ingenierie, prototypage et robotique.",
      en: "The start of my engineering, prototyping, and robotics path.",
    },
  },
  {
    year: "2025",
    from: {
      city: "Nantes",
      lat: 47.2184,
      lng: -1.5536,
    },
    to: {
      city: "Bangkok",
      lat: 13.7563,
      lng: 100.5018,
    },
    title: {
      fr: "Semestre international a Kasetsart University",
      en: "International semester at Kasetsart University",
    },
    description: {
      fr: "Mobilite academique en Thailande pour ouvrir mon approche ingenieur a un contexte international.",
      en: "Academic mobility in Thailand to broaden my engineering practice in an international context.",
    },
  },
  {
    year: "2026",
    from: {
      city: "Bangkok",
      lat: 13.7563,
      lng: 100.5018,
    },
    to: {
      city: "Paris",
      lat: 48.8566,
      lng: 2.3522,
    },
    title: {
      fr: "Retour a Paris avec une vision plus internationale",
      en: "Return to Paris with a broader international perspective",
    },
    description: {
      fr: "Retour en France pour poursuivre mon parcours ingenieur avec l'experience acquise en Asie.",
      en: "Back in France to continue my engineering path with the perspective gained in Asia.",
    },
  },
];
