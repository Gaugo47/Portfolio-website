"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BrainCircuit,
  Cpu,
  Eye,
  GraduationCap,
  Hand,
  Languages,
  Mail,
  Map,
  MoveRight,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { NavBar, type Language } from "@/components/NavBar";
import { JourneyGlobe } from "@/components/JourneyGlobe";
import type { Project } from "@/components/ProjectCard";
import { ProjectScrollTrack } from "@/components/ProjectScrollTrack";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { journeys } from "@/data/journeys";

const profileLinks = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/gauthier-defoy/",
  email: "mailto:gauthier.defoy@edu.devinci.fr",
};

const content = {
  fr: {
    nav: {
      brand: "GAUTHIER.AI",
      systems: "Systèmes",
      projects: "Projets",
      journey: "Parcours",
      education: "Formation",
      experience: "Expérience",
      vision: "Vision",
      contact: "Contact",
      skip: "Aller au contenu",
      github: "Profil GitHub",
      linkedin: "Profil LinkedIn de Gauthier Defoy",
    },
    hero: {
      badge: "Gauthier Defoy · Étudiant ingénieur Robotique & IA",
      title: "Je conçois des systèmes intelligents qui perçoivent, décident et interagissent.",
      copy:
        "Étudiant à l’ESILV, je construis des prototypes mêlant IA locale, vision par ordinateur, robotique mécanique et interfaces humain-machine pour des environnements créatifs et industriels.",
      projectsCta: "Voir les projets",
      systemsCta: "Explorer le modèle système",
      contactCta: "Contact",
      credentials: [
        { value: "ESILV", label: "Cycle ingénieur 2023-2028" },
        { value: "TOEFL", label: "Anglais C1 - 653/677" },
        { value: "BIA", label: "Mention Très Bien" },
      ],
    },
    interface: {
      eyebrow: "Interface système",
      title: "Stack robotique créative",
      modules: ["Vision OpenCV", "LLM local Llama", "Robotique mécanique", "Gestes & voix"],
      moduleLabel: "Module",
    },
    systemsHeader: {
      eyebrow: "Vue système",
      title: "Quatre couches pour une boucle de comportement intelligente.",
      copy:
        "Le portfolio est structuré comme une interface robotique : percevoir l’environnement, raisonner sur l’intention, agir via le matériel et garder l’humain dans la boucle.",
    },
    pillars: [
      {
        title: "Perception",
        subtitle: "Vision par ordinateur",
        copy:
          "Transformer des entrées caméra en signaux exploitables avec OpenCV, MediaPipe, détection gestuelle et pipelines visuels temps réel.",
        stat: "Entrée vision",
      },
      {
        title: "Intelligence",
        subtitle: "Systèmes IA / LLM",
        copy:
          "Assembler assistants locaux, modèles Llama, logique de prompts et couches de décision pour rendre les systèmes adaptatifs même hors ligne.",
        stat: "Raisonnement",
      },
      {
        title: "Action",
        subtitle: "Robotique & contrôle",
        copy:
          "Relier logiciel et matériel avec prototypes embarqués, SolidWorks, impression 3D, CNC, actionneurs et contraintes mécaniques.",
        stat: "Sortie physique",
      },
      {
        title: "Interaction",
        subtitle: "UX humain-machine",
        copy:
          "Concevoir des interactions où gestes, voix, projection et feedback rendent la machine lisible, intuitive et digne de confiance.",
        stat: "Signal humain",
      },
    ],
    projectsHeader: {
      eyebrow: "Projets sélectionnés",
      title: "Des cas d’étude présentés comme des systèmes opérationnels.",
      copy:
        "Chaque projet est cadré par le problème, l’architecture, la stack et le résultat pour montrer autant l’ambition créative que la rigueur d’ingénierie.",
    },
    journeyHeader: {
      eyebrow: "My Journey",
      title: "Une trajectoire d’ingénieur qui relie les lieux, les systèmes et les ambitions.",
      copy:
        "Le globe met en scène les déplacements importants de mon parcours. Chaque ligne apparaît au scroll pour relier une étape académique ou personnelle à son contexte.",
    },
    journeyLabels: {
      route: "Trajet actif",
      simplified: "Version mobile simplifiée",
    },
    projectLabels: {
      problem: "Problème",
      architecture: "Architecture système",
      stack: "Stack technique",
      outcome: "Résultat",
      demo: "Flux démo",
      live: "Prototype",
      discuss: "Discuter du système",
    },
    projects: [
      {
        title: "Assistant vocal IA local",
        label: "Système LLM",
        problem:
          "Créer un assistant vocal doté d’intelligence artificielle, fonctionnant sans internet, capable de lancer une interaction via un geste de la main.",
        architecture: ["Audio", "Speech pipeline", "LLM local", "Routeur d’actions", "Réponse vocale"],
        stack: ["Python", "Llama models", "STT type Whisper", "TTS", "Outils locaux"],
        outcome:
          "Un projet personnel codé en Python combinant Llama3, OpenCV et MediaPipe, pertinent pour l’IA embarquée et les assistants locaux.",
        mediaLabel: "Placeholder pour waveform, routage d’intention et état de réponse.",
        accent: "green",
      },
      {
        title: "Pipeline de vision gestuelle",
        label: "Pipeline perception",
        problem:
          "Détecter une intention gestuelle dans un flux caméra temps réel afin de déclencher des comportements d’assistant ou d’interface.",
        architecture: ["Caméra", "MediaPipe", "Landmarks", "Geste reconnu", "Action système"],
        stack: ["OpenCV", "MediaPipe", "Python", "NumPy", "Vidéo temps réel"],
        outcome:
          "Une couche de perception utile pour prototyper des interactions sans contact dans des installations, robots ou interfaces projetées.",
        mediaLabel: "Placeholder pour landmarks main, score de confiance et état gestuel.",
        accent: "cyan",
      },
      {
        title: "Robot octopode mécanique",
        label: "Prototype scolaire",
        problem:
          "Réaliser en équipe un robot octopode en respectant un cahier des charges précis et des moyens mécaniques imposés.",
        architecture: ["Cahier des charges", "Cinématique", "Engrenages", "Fabrication", "Test mécanique"],
        stack: ["SolidWorks", "Impression 3D", "CNC", "Cinématique", "Travail d’équipe"],
        outcome:
          "Un prototype mené sur 9 mois en équipe de 4, combinant conception mécanique, fabrication numérique et résolution de contraintes.",
        mediaLabel: "Placeholder pour schéma cinématique, engrenages et phases de mouvement.",
        accent: "amber",
      },
      {
        title: "Créalab Augmenté",
        label: "Interface agentique & mécatronique",
        problem:
          "Transformer un prototype de projecteur motorisé trop lourd et difficile à déplacer, avec un logiciel limité à une console, en système utilisable par les étudiants du FabLab.",
        architecture: ["Frontend web", "Backend Docker", "Tool calling", "IA locale", "Contrôle projecteur"],
        stack: ["Docker", "Python", "Ollama / Llama 3.1", "Whisper", "Kokoro TTS", "HTML/CSS/JS"],
        outcome:
          "Contribution software centrée sur l’IA locale, le tool calling et l’interface : questions texte/voix, réponses vocalisées, tutoriels vidéo déclenchés selon la machine demandée et intégration dans une architecture conteneurisée.",
        mediaLabel: "Interface web Créalab, contrôle de position, assistant IA et tutoriels machine.",
        media: {
          src: "/projects/projector-positioning-clean.webp",
          alt: "Système hardware de positionnement motorisé pour projecteur",
          eyebrow: "Ingénierie en mouvement",
          title: "Créalab Augmenté",
          headline: ["CRÉALAB", "AUGMENTÉ", "IA LOCALE", "PROJECTEUR"],
          tagline: "Projection. Assistance. Contrôle reproductible.",
          description:
            "Système augmenté combinant interface web, assistant vocal local et positionnement motorisé pour guider les utilisateurs du FabLab dans un environnement projeté.",
          footer: "Projet Créalab · IA locale + interface + mécatronique",
          overviewLabel: "Vue système",
          interfaceLabel: "Couche interface",
          interfaceTitle: "IA locale, contrôle moteur et assistance FabLab dans une interface unique.",
          interfaceCopy:
            "Captures issues du rapport Créalab Augmenté : navigation, positionnement, visualisation 3D et tutoriels déclenchés par l’assistant.",
          impact: {
            lead: "Conçu pour l’usage réel.",
            highlight: "Pensé pour le FabLab.",
          },
          features: [
            { title: "Structure allégée", detail: "Passage vers une conception majoritairement PETG-CF" },
            { title: "Translation sur rail", detail: "Moteur embarqué proche du rail avec entraînement par crémaillère" },
            { title: "Couple & maintien", detail: "Démultiplication, moteurs pas-à-pas et réducteur cycloïdal" },
            { title: "Assistant local", detail: "Chaîne Whisper, Llama 3.1 via Ollama et Kokoro TTS" },
          ],
          interfaceScreens: [
            {
              src: "/projects/crealab-home.webp",
              alt: "Écran d’accueil de l’interface Créalab Augmenté",
              caption: "Accueil modulaire",
              description: "Navigation par fonctions : positionnement, extinction, information, patrons, questions et tutoriels.",
            },
            {
              src: "/projects/crealab-positioning.webp",
              alt: "Interface de positionnement du projecteur motorisé Créalab",
              caption: "Contrôle de position",
              description: "Sliders et vues de contrôle pour piloter les axes du projecteur sur son rail.",
            },
            {
              src: "/projects/crealab-pattern.webp",
              alt: "Visionneuse 3D de patrons STL dans l’interface Créalab",
              caption: "Patrons & visualisation STL",
              description: "Bibliothèque, import et visualisation 3D pour préparer des fichiers liés au FabLab.",
            },
            {
              src: "/projects/crealab-tutorials.webp",
              alt: "Page tutoriels avec vidéo intégrée dans l’interface Créalab",
              caption: "Tutoriels machine",
              description: "Sélection de tutoriels et lecture vidéo intégrée pour accompagner les usages atelier.",
            },
            {
              src: "/projects/crealab-ai-video.webp",
              alt: "Réponse IA Créalab affichant une vidéo YouTube pertinente",
              caption: "Tool calling IA",
              description: "L’assistant comprend la demande, choisit un tutoriel adapté et insère la vidéo dans la réponse.",
            },
          ],
        },
        accent: "green",
      },
    ],
    educationHeader: {
      eyebrow: "Formation & certifications",
      title: "Un socle ingénieur lisible pour les recruteurs.",
      copy:
        "Un focus clair sur les signaux institutionnels de ton parcours : école d’ingénieur, anglais certifié, culture aéronautique et engagement FabLab.",
    },
    education: [
      {
        title: "ESILV - École d’Ingénieurs",
        meta: "Cycle préparatoire intégré puis cursus ingénieur · 2023-2028",
        copy:
          "Formation en sciences de l’ingénieur, projets techniques, mathématiques, physique, conception et prototypage. Positionnement actuel : robotique, industrie et IA.",
        signal: "GPA année 1 : 3.1",
      },
      {
        title: "TOEFL ITP - Anglais C1",
        meta: "Score 653/677",
        copy:
          "Certification linguistique utile pour travailler dans des environnements internationaux de recherche, robotique, IA et technologie créative.",
        signal: "C1",
      },
      {
        title: "Brevet d’Initiation à l’Aéronautique",
        meta: "Mention Très Bien",
        copy:
          "Base aéronautique et culture système : mécanique du vol, navigation, météorologie et compréhension technique d’environnements complexes.",
        signal: "BIA",
      },
      {
        title: "DeVinci Fablab",
        meta: "Co-responsable partenariats · 2024 - en cours",
        copy:
          "Lien direct avec l’écosystème d’innovation : partenariats entreprises, événements, projets techniques et formations autour du prototypage.",
        signal: "FabLab",
      },
    ],
    experience: {
      eyebrow: "Expérience",
      title: "Prototyper vite, tester franchement, raffiner le système.",
      copy:
        "Mon positionnement est celui d’un étudiant ingénieur à l’ESILV qui avance par cycles courts : idée, architecture, prototype, test, démonstration.",
      items: [
        {
          title: "Co-responsable partenariats · DeVinci Fablab",
          copy:
            "Démarchage d’entreprises pour créer des collaborations autour d’événements, de projets techniques et de formations, en lien avec les partenariats parisiens.",
        },
        {
          title: "Projets d’ingénierie · ESILV",
          copy:
            "Cycle préparatoire intégré, projets de conception et prototypage, culture Maths/Physique et approche concrète des systèmes techniques.",
        },
        {
          title: "Tutorat, BIA & culture scientifique",
          copy:
            "Cours particuliers en mathématiques et physique, anglais C1 TOEFL ITP 653/677, BIA mention Très Bien et intérêt marqué pour robotique, électronique, IA et aéronautique.",
        },
      ],
    },
    vision: {
      eyebrow: "Vision",
      title: "Je veux construire des systèmes qui donnent l’impression d’être vivants.",
      copy:
        "Mêler précision d’ingénierie et expériences immersives : robots, assistants locaux et interfaces projetées qui perçoivent le contexte, prennent des décisions lisibles et communiquent avec les humains de manière intuitive, cinématique et fiable.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Construisons la prochaine expérience intelligente.",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  en: {
    nav: {
      brand: "GAUTHIER.AI",
      systems: "Systems",
      projects: "Projects",
      journey: "Journey",
      education: "Education",
      experience: "Experience",
      vision: "Vision",
      contact: "Contact",
      skip: "Skip to content",
      github: "GitHub profile",
      linkedin: "Gauthier Defoy LinkedIn profile",
    },
    hero: {
      badge: "Gauthier Defoy · Robotics & AI Engineering Student",
      title: "I build intelligent systems that perceive, decide, and interact.",
      copy:
        "As an ESILV engineering student, I build prototypes combining local AI, computer vision, mechanical robotics, and human-machine interfaces for creative and industrial environments.",
      projectsCta: "View Projects",
      systemsCta: "Explore System Model",
      contactCta: "Contact",
      credentials: [
        { value: "ESILV", label: "Engineering path 2023-2028" },
        { value: "TOEFL", label: "English C1 - 653/677" },
        { value: "BIA", label: "Highest honors" },
      ],
    },
    interface: {
      eyebrow: "System Interface",
      title: "Creative robotics stack",
      modules: ["OpenCV Vision", "Local Llama LLM", "Mechanical Robotics", "Gesture & Voice"],
      moduleLabel: "Module",
    },
    systemsHeader: {
      eyebrow: "System Overview",
      title: "Four layers, one intelligent behavior loop.",
      copy:
        "The work is organized like a robotics interface: perceive the environment, reason about intent, move through hardware, and keep the human inside the loop.",
    },
    pillars: [
      {
        title: "Perception",
        subtitle: "Computer Vision",
        copy:
          "Turning camera input into usable signals with OpenCV, MediaPipe, gesture detection, and real-time visual pipelines.",
        stat: "Vision input",
      },
      {
        title: "Intelligence",
        subtitle: "AI / LLM Systems",
        copy:
          "Designing local assistants, Llama models, prompt logic, and decision layers that make systems adaptive even offline.",
        stat: "Reasoning",
      },
      {
        title: "Action",
        subtitle: "Robotics Control",
        copy:
          "Bridging software and hardware through prototypes, SolidWorks, 3D printing, CNC, actuators, and mechanical constraints.",
        stat: "Physical output",
      },
      {
        title: "Interaction",
        subtitle: "Human-Machine UX",
        copy:
          "Creating interfaces where gesture, voice, projection, and feedback help people understand and trust intelligent machines.",
        stat: "Human signal",
      },
    ],
    projectsHeader: {
      eyebrow: "Featured Projects",
      title: "Case studies shaped as working systems.",
      copy:
        "Each project is framed by the problem, architecture, stack, and outcome so recruiters can see both the creative ambition and the engineering logic.",
    },
    journeyHeader: {
      eyebrow: "My Journey",
      title: "An engineering path connecting places, systems, and ambition.",
      copy:
        "The globe stages the key moves in my journey. Each line appears with scroll to connect an academic or personal milestone to its context.",
    },
    journeyLabels: {
      route: "Active route",
      simplified: "Simplified mobile version",
    },
    projectLabels: {
      problem: "Problem",
      architecture: "System Architecture",
      stack: "Tech Stack",
      outcome: "Outcome",
      demo: "Demo Feed",
      live: "Prototype",
      discuss: "Discuss this system",
    },
    projects: [
      {
        title: "Local AI Voice Assistant",
        label: "LLM System",
        problem:
          "Create an AI voice assistant that works offline and can start an interaction through a hand gesture.",
        architecture: ["Audio Input", "Speech Pipeline", "Local LLM", "Action Router", "Voice Response"],
        stack: ["Python", "Llama models", "Whisper-style STT", "TTS", "Local tools"],
        outcome:
          "A personal Python project combining Llama3, OpenCV, and MediaPipe, relevant to embedded AI and local assistants.",
        mediaLabel: "Waveform, intent routing, and response-state placeholder.",
        accent: "green",
      },
      {
        title: "Gesture Vision Pipeline",
        label: "Perception Pipeline",
        problem:
          "Detect gestural intent from a real-time camera feed to trigger assistant or interface behaviors.",
        architecture: ["Camera Feed", "MediaPipe", "Landmarks", "Recognized Gesture", "System Action"],
        stack: ["OpenCV", "MediaPipe", "Python", "NumPy", "Realtime video"],
        outcome:
          "A perception layer for contactless interactions in installations, robots, and projected interfaces.",
        mediaLabel: "Hand landmarks, confidence score, and gesture-state placeholder.",
        accent: "cyan",
      },
      {
        title: "Mechanical Octopod Robot",
        label: "School Prototype",
        problem:
          "Build an octopod robot as a team while respecting precise specifications and imposed mechanical means.",
        architecture: ["Requirements", "Kinematics", "Gears", "Fabrication", "Mechanical Test"],
        stack: ["SolidWorks", "3D printing", "CNC", "Kinematics", "Teamwork"],
        outcome:
          "A 9-month team prototype combining mechanical design, digital fabrication, and constraint-driven problem solving.",
        mediaLabel: "Kinematic diagram, gears, and motion-phase placeholder.",
        accent: "amber",
      },
      {
        title: "Augmented Créalab",
        label: "Agentic interface & mechatronics",
        problem:
          "Turn a heavy motorized-projector prototype and a console-only software layer into a usable FabLab system for students.",
        architecture: ["Web frontend", "Docker backend", "Tool calling", "Local AI", "Projector control"],
        stack: ["Docker", "Python", "Ollama / Llama 3.1", "Whisper", "Kokoro TTS", "HTML/CSS/JS"],
        outcome:
          "Software contribution focused on local AI, tool calling, and interface design: text/voice questions, spoken answers, machine-specific video tutorials, and deployment through a containerized architecture.",
        mediaLabel: "Créalab web interface, position control, AI assistant, and machine tutorials.",
        media: {
          src: "/projects/projector-positioning-clean.webp",
          alt: "Hardware system for motorized projector positioning",
          eyebrow: "Engineering in motion",
          title: "Augmented Créalab",
          headline: ["Augmented", "Créalab", "Local AI", "Projector"],
          tagline: "Projection. Assistance. Repeatable control.",
          description:
            "An augmented FabLab system combining a web interface, local voice assistant, and motorized projector positioning for guided projected interaction.",
          footer: "Créalab project · local AI + interface + mechatronics",
          overviewLabel: "System overview",
          interfaceLabel: "Interface layer",
          interfaceTitle: "Local AI, motor control, and FabLab assistance in one interface.",
          interfaceCopy:
            "Screens from the Augmented Créalab report: navigation, positioning, 3D visualization, and tutorials triggered by the assistant.",
          impact: {
            lead: "Built for real usage.",
            highlight: "Designed for the FabLab.",
          },
          features: [
            { title: "Lightweight structure", detail: "Shift toward a mostly PETG-CF mechanical design" },
            { title: "Rail translation", detail: "On-board motor close to the rail with rack-and-pinion motion" },
            { title: "Torque & holding", detail: "Gear reduction, stepper motors, and cycloidal reducer" },
            { title: "Local assistant", detail: "Whisper, Llama 3.1 through Ollama, and Kokoro TTS pipeline" },
          ],
          interfaceScreens: [
            {
              src: "/projects/crealab-home.webp",
              alt: "Augmented Créalab home screen",
              caption: "Modular home screen",
              description: "Function-first navigation: positioning, shutdown, information, patterns, questions, and tutorials.",
            },
            {
              src: "/projects/crealab-positioning.webp",
              alt: "Augmented Créalab projector positioning interface",
              caption: "Position control",
              description: "Sliders and visual previews for controlling the projector axes on the rail.",
            },
            {
              src: "/projects/crealab-pattern.webp",
              alt: "STL pattern viewer inside the Augmented Créalab interface",
              caption: "Patterns & STL viewer",
              description: "Library, import, and 3D visualization tools for FabLab files.",
            },
            {
              src: "/projects/crealab-tutorials.webp",
              alt: "Tutorial page with embedded video inside the Augmented Créalab interface",
              caption: "Machine tutorials",
              description: "Tutorial selection and embedded playback to guide workshop users.",
            },
            {
              src: "/projects/crealab-ai-video.webp",
              alt: "Augmented Créalab AI answer displaying a relevant YouTube video",
              caption: "AI tool calling",
              description: "The assistant understands the request, selects a matching tutorial, and embeds the video in the answer.",
            },
          ],
        },
        accent: "green",
      },
    ],
    educationHeader: {
      eyebrow: "Education & Certifications",
      title: "A clear engineering foundation for recruiters.",
      copy:
        "A clear focus on the institutional signals in the profile: engineering school, certified English level, aviation culture, and FabLab involvement.",
    },
    education: [
      {
        title: "ESILV - Engineering School",
        meta: "Integrated preparatory cycle and engineering curriculum · 2023-2028",
        copy:
          "Engineering-science training with technical projects, mathematics, physics, design, and prototyping. Current focus: robotics, industry, and AI.",
        signal: "Year 1 GPA: 3.1",
      },
      {
        title: "TOEFL ITP - English C1",
        meta: "Score 653/677",
        copy:
          "Language certification for international research, robotics, AI, and creative technology environments.",
        signal: "C1",
      },
      {
        title: "Aeronautics Initiation Certificate",
        meta: "Highest honors",
        copy:
          "Aviation and systems culture: flight mechanics, navigation, meteorology, and technical understanding of complex environments.",
        signal: "BIA",
      },
      {
        title: "DeVinci Fablab",
        meta: "Partnership co-lead · 2024 - present",
        copy:
          "Direct link with the innovation ecosystem: company partnerships, events, technical projects, and prototyping-oriented training.",
        signal: "FabLab",
      },
    ],
    experience: {
      eyebrow: "Experience",
      title: "Prototype fast, test honestly, refine the system.",
      copy:
        "My positioning is ESILV engineering student with short iteration loops: idea, architecture, prototype, test, demonstration.",
      items: [
        {
          title: "Partnership co-lead · DeVinci Fablab",
          copy:
            "Company outreach to create collaborations around events, technical projects, and training, working with the Paris partnerships team.",
        },
        {
          title: "Engineering projects · ESILV",
          copy:
            "Integrated preparatory engineering cycle, design and prototyping projects, Maths/Physics background, and practical systems thinking.",
        },
        {
          title: "Tutoring, BIA & science culture",
          copy:
            "Maths and physics tutoring, English C1 TOEFL ITP 653/677, BIA with highest honors, and strong interest in robotics, electronics, AI, and aviation.",
        },
      ],
    },
    vision: {
      eyebrow: "Vision",
      title: "I want to build systems that feel alive.",
      copy:
        "Combining engineering precision with immersive experiences: robots, local assistants, and projected interfaces that sense context, make clear decisions, and communicate with people in ways that feel intuitive, cinematic, and trustworthy.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build the next intelligent experience.",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
} satisfies Record<Language, unknown>;

const pillarVisuals = [
  { icon: Eye, accent: "text-sky-200" },
  { icon: BrainCircuit, accent: "text-emerald-200" },
  { icon: Cpu, accent: "text-amber-200" },
  { icon: Hand, accent: "text-fuchsia-200" },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");
  const t = content[language];

  const projects = useMemo(() => t.projects as Project[], [t.projects]);

  return (
    <main id="top" className="relative overflow-x-clip">
      <section id="content" className="relative min-h-[100svh] overflow-hidden bg-[#050607] md:aspect-[1570/1002]">
        <Image
          src="/hero-engineering-desk-mobile.png"
          alt="Bureau d'ingÃ©nierie vertical avec imprimante 3D, croquis de robotique, calculatrice et outils"
          fill
          sizes="100vw"
          className="object-contain object-top md:hidden"
          priority
        />
        <Image
          src="/hero-engineering-desk-v2.png"
          alt="Bureau d'ingénierie avec croquis de robotique, calculatrice, pied à coulisse et imprimante 3D"
          fill
          sizes="100vw"
          className="hidden object-cover object-center md:block"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_50%,transparent_0,rgba(0,0,0,0.05)_42%,rgba(0,0,0,0.64)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/48" aria-hidden="true" />

        <div className="relative z-10 h-[100svh] min-h-[48rem] w-full md:min-h-[42rem]">
          <Reveal className="absolute left-0 right-0 top-[1.25rem] px-5 text-center sm:top-[1.8rem] md:top-[3.6rem]">
            <p className="mx-auto w-[min(34rem,90vw)] text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.95)] sm:text-xs md:tracking-[0.22em]">
              {language === "fr" ? "Conçu pour inventer. Fait pour durer." : "Designed to invent. Built to last."}
            </p>
          </Reveal>

          <Reveal delay={0.05} className="absolute left-[clamp(1rem,4.5vw,4rem)] top-[3.6rem] max-w-[calc(100vw-2rem)] sm:top-[3.9rem] md:left-[clamp(1.25rem,3.4vw,4rem)] md:top-[6.4rem] md:max-w-[calc(100vw-2.5rem)] md:whitespace-nowrap">
            <h1 className="select-none font-['Archivo',ui-sans-serif] text-[clamp(2.55rem,13vw,4.9rem)] font-black uppercase leading-[0.78] tracking-[0] text-[#fff8ea] drop-shadow-[0_14px_40px_rgba(0,0,0,0.82)] md:text-[clamp(4.5rem,17vw,13.5rem)]">
              Gauthier
            </h1>
          </Reveal>

          <Reveal delay={0.08} className="absolute left-4 right-4 top-[9.4rem] md:hidden">
            <div className="border border-white/16 bg-zinc-950/54 p-3 shadow-2xl shadow-black/45 backdrop-blur-sm">
              <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase leading-4 tracking-[0.16em] text-slate-100">
                <span className="h-2 w-2 shrink-0 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.8)]" />
                {t.hero.badge}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {t.hero.credentials.map((credential) => (
                  <div key={credential.value} className="border border-white/12 bg-black/32 px-2 py-2">
                    <p className="text-sm font-semibold leading-none text-white">{credential.value}</p>
                    <p className="mt-1 line-clamp-2 text-[0.58rem] leading-3 text-slate-300">{credential.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="absolute left-4 right-4 top-[20.5rem] max-w-none sm:top-[22rem] md:bottom-[11%] md:left-[clamp(1.25rem,3.4vw,4rem)] md:right-auto md:top-auto md:max-w-[18.5rem]">
            <div className="flex min-h-[17rem] flex-col justify-center border border-white/18 bg-zinc-950/68 p-6 shadow-2xl shadow-black/55 md:min-h-0 md:p-6">
              <p className="text-[1.35rem] font-semibold uppercase leading-[1.06] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.7)] sm:text-xl md:text-xl">
                {language === "fr" ? "Conçu pour résoudre. Ingénié pour l’avenir." : "Built to solve. Engineered for what comes next."}
              </p>
              <div className="my-5 h-px w-full bg-white/20" />
              <p className="text-sm leading-6 text-slate-200 md:text-sm md:leading-6">{t.hero.copy}</p>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="absolute bottom-[14.25rem] right-[clamp(1.25rem,4vw,4.5rem)] hidden max-w-lg md:block">
            <div className="border border-white/16 bg-zinc-950/62 p-5 text-right shadow-2xl shadow-black/55">
              <p className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/22 bg-black/48 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-2xl shadow-black/30">
                <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.8)]" />
                {language === "fr" ? "Etudiant ingenieur Robotique & IA" : "Robotics & AI Engineering Student"}
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-tight text-white [text-shadow:0_3px_22px_rgba(0,0,0,0.95)]">
                {t.hero.title}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="absolute bottom-[5.25rem] left-4 right-4 sm:left-auto sm:right-[clamp(1.25rem,4vw,4.5rem)] md:bottom-[8%]">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row md:gap-3">
              <a
                href="#projects"
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-sky-200 md:px-6 md:py-3"
              >
                {t.hero.projectsCta}
                <MoveRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.26] bg-black/48 px-5 py-2.5 text-sm font-semibold text-white shadow-2xl shadow-black/30 transition-colors duration-200 hover:bg-black/62 md:px-6 md:py-3"
              >
                {t.hero.contactCta}
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-[clamp(1rem,4.5vw,4rem)] text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 md:bottom-5 md:justify-between md:px-[clamp(1.25rem,3.4vw,4rem)]">
            <a href="#systems" className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/24 bg-black/48 px-3 py-2 shadow-2xl shadow-black/30 transition-colors duration-200 hover:bg-black/62">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30">
                <MoveRight className="h-3.5 w-3.5 rotate-90" />
              </span>
              {language === "fr" ? "Scroller pour découvrir" : "Scroll to discover"}
            </a>
            <a href="#systems" className="focus-ring hidden cursor-pointer items-center gap-2 rounded-full border border-white/18 bg-black/48 px-4 py-2 shadow-2xl shadow-black/30 transition-colors duration-200 hover:bg-black/62 md:inline-flex">
              {t.hero.systemsCta}
              <Map className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <NavBar language={language} onLanguageChange={setLanguage} labels={t.nav} links={profileLinks} />

      <section id="systems" className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.systemsHeader.eyebrow} title={t.systemsHeader.title} copy={t.systemsHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.pillars.map((pillar, index) => {
              const Icon = pillarVisuals[index].icon;
              return (
                <Reveal key={pillar.title} delay={index * 0.05}>
                  <div className="h-full rounded-lg border border-white/10 bg-slate-950/[0.65] p-6 transition-colors duration-200 hover:border-white/[0.22] hover:bg-white/[0.06]">
                    <div className="mb-10 flex items-center justify-between">
                      <div className="rounded-md border border-white/10 bg-white/5 p-3">
                        <Icon className={`h-5 w-5 ${pillarVisuals[index].accent}`} />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{pillar.stat}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-400">{pillar.subtitle}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{pillar.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.projectsHeader.eyebrow} title={t.projectsHeader.title} copy={t.projectsHeader.copy} />
          </Reveal>
          <ProjectScrollTrack projects={projects} labels={t.projectLabels} />
        </div>
      </section>

      <JourneyGlobe language={language} journeys={journeys} header={t.journeyHeader} labels={t.journeyLabels} />

      <section id="education" className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.educationHeader.eyebrow} title={t.educationHeader.title} copy={t.educationHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {t.education.map((item, index) => {
              const Icon = index === 0 ? GraduationCap : index === 1 ? Languages : index === 2 ? ShieldCheck : Wrench;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-lg border border-white/10 bg-slate-950/[0.65] p-6 transition-colors duration-200 hover:border-emerald-200/35 hover:bg-white/[0.06]">
                    <div className="mb-8 flex items-start justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/5">
                          <Icon className="h-5 w-5 text-emerald-200" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-400">{item.meta}</p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border border-emerald-200/25 bg-emerald-200/[0.08] px-3 py-1.5 text-xs font-semibold text-emerald-100">
                        {item.signal}
                      </span>
                    </div>
                    <p className="leading-7 text-slate-300">{item.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/80">{t.experience.eyebrow}</p>
              <h2 className="text-balance text-3xl font-semibold text-white md:text-5xl">{t.experience.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{t.experience.copy}</p>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {t.experience.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[auto_1fr]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-slate-950">
                    {index === 0 ? <Wrench className="h-5 w-5 text-amber-200" /> : null}
                    {index === 1 ? <Network className="h-5 w-5 text-sky-200" /> : null}
                    {index === 2 ? <Radar className="h-5 w-5 text-emerald-200" /> : null}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{item.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="relative px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.08] via-slate-950/80 to-emerald-300/[0.08] p-8 text-center shadow-2xl shadow-black/30 md:p-14">
            <Sparkles className="mx-auto h-7 w-7 text-emerald-200" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/80">{t.vision.eyebrow}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white md:text-6xl">{t.vision.title}</h2>
            <p className="mx-auto mt-7 max-w-3xl text-pretty text-lg leading-8 text-slate-300 md:text-xl">{t.vision.copy}</p>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="relative px-5 pb-12 pt-20 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{t.contact.eyebrow}</p>
              <h2 className="text-3xl font-semibold text-white md:text-5xl">{t.contact.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="focus-ring cursor-pointer rounded-full border border-white/[0.12] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                href={profileLinks.email}
              >
                gauthier.defoy@edu.devinci.fr
              </a>
              <a
                className="focus-ring cursor-pointer rounded-full border border-white/[0.12] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                href={profileLinks.github}
              >
                {t.contact.github}
              </a>
              <a
                className="focus-ring cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-200"
                href={profileLinks.linkedin}
              >
                {t.contact.linkedin}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
