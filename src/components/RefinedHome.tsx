"use client";

import {
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  Download,
  Eye,
  Mail,
  Menu,
  MoveRight,
  Network,
  Route,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { LazyJourneyGlobe } from "@/components/LazyJourneyGlobe";
import { NavBar, type Language } from "@/components/NavBar";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SplineShowcase } from "@/components/SplineShowcase";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import { SplineScene } from "@/components/ui/splite";
import { journeys } from "@/data/journeys";
import { assetPath } from "@/lib/assetPath";

const profileLinks = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/gauthier-defoy/",
  email: "mailto:gauthier.defoy@edu.devinci.fr",
  cv: "/cv-gauthier-defoy.pdf",
};

const heroSplineScene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const portfolioCopy = {
  fr: {
    nav: {
      brand: "GAUTHIER.AI",
      systems: "Construire",
      projects: "Projets",
      journey: "Parcours",
      education: "Compétences",
      experience: "Méthode",
      vision: "Actuellement",
      contact: "Contact",
      skip: "Aller au contenu",
      github: "Profil GitHub",
      linkedin: "Profil LinkedIn de Gauthier Defoy",
    },
    hero: {
      badge: "Gauthier Defoy · Étudiant ingénieur à l’ESILV",
      title: "De l’idée au prototype fonctionnel.",
      copy:
        "Étudiant ingénieur à l’ESILV, passionné par la robotique, les systèmes embarqués et l’intelligence artificielle. Je conçois des projets mêlant mécanique, électronique et logiciel pour transformer des concepts en systèmes réels.",
      projectsCta: "Voir mes projets",
      cvCta: "Télécharger mon CV",
      contactCta: "Me contacter",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      quickLinks: [
        { label: "GitHub", href: profileLinks.github },
        { label: "LinkedIn", href: profileLinks.linkedin },
        { label: "Email", href: profileLinks.email },
      ],
      credentials: [
        { value: "ESILV", label: "Formation ingénieur" },
        { value: "Robotique", label: "Spécialisation en construction" },
        { value: "Prototypage", label: "Mécanique, code, IA" },
      ],
    },
    proof: [
      { value: "Prototypes", label: "mécatroniques" },
      { value: "IA", label: "outils & automatisation" },
      { value: "Embarqué", label: "capteurs, moteurs, ESP32" },
      { value: "Approche", label: "multidisciplinaire" },
    ],
    interface: {
      eyebrow: "Laboratoire visuel",
      title: "Un portfolio qui montre une direction, pas une prétention.",
      modules: ["Mécanique", "Électronique", "Logiciel", "IA locale"],
      moduleLabel: "Exploration",
      copy:
        "La scène 3D garde l’ambiance futuriste du portfolio, tout en servant une idée simple : apprendre vite, prototyper concrètement et relier plusieurs disciplines d’ingénierie.",
    },
    systemsHeader: {
      eyebrow: "Ce que je construis",
      title: "Trois terrains d’exploration techniques.",
      copy:
        "Mes projets ne sont pas présentés comme des produits industriels finis. Ce sont des prototypes sérieux, utiles pour apprendre, tester et rendre une idée visible.",
    },
    pillars: [
      {
        title: "Prototypes mécatroniques",
        subtitle: "Mécanique + actionneurs",
        copy:
          "Conception de systèmes combinant mécanique, actionneurs, impression 3D et assemblage.",
        stat: "Prototype réel",
      },
      {
        title: "Systèmes embarqués",
        subtitle: "Capteurs + microcontrôleurs",
        copy:
          "Exploration de l’électronique, des capteurs, des microcontrôleurs et du contrôle moteur.",
        stat: "Signal physique",
      },
      {
        title: "Logiciel & IA",
        subtitle: "Python + interfaces",
        copy:
          "Développement d’outils en Python, vision par ordinateur, automatisation et interfaces intelligentes.",
        stat: "Outil utile",
      },
    ],
    featuredProject: {
      eyebrow: "Projet phare",
      title: "Système motorisé de projection",
      image: "/projects/projector-positioning-clean.webp",
      imageAlt: "Système motorisé de positionnement de projecteur",
      points: [
        { label: "Problème", value: "Orienter et déplacer précisément un projecteur dans l’espace." },
        { label: "Solution", value: "Conception d’un système motorisé avec axes de rotation et translation." },
        { label: "Ce que j’ai fait", value: "Conception mécanique, prototypage, assemblage et réflexion système." },
        { label: "Résultat", value: "Un prototype visuel et fonctionnel présenté comme projet d’ingénierie." },
      ],
      technologies: ["SolidWorks", "Impression 3D", "Moteurs", "Mécanique", "Prototypage"],
    },
    projectsHeader: {
      eyebrow: "Projets",
      title: "Des projets d’apprentissage, de prototypage et d’ingénierie.",
      copy:
        "Chaque carte met en avant le rôle, les technologies et l’intérêt du projet, sans donner l’impression d’un produit déjà industrialisé.",
    },
    projectLabels: {
      role: "Mon rôle",
      tech: "Technologies",
      cta: "Voir le projet",
    },
    projects: [
      {
        slug: "systeme-motorise-projection",
        title: "Système motorisé de projection",
        label: "Prototype mécatronique",
        description:
          "Architecture mécanique pour déplacer et orienter un projecteur avec plus de précision.",
        role: "Conception mécanique, assemblage, réflexion système.",
        stack: ["SolidWorks", "Impression 3D", "Moteurs"],
        image: "/projects/projector-positioning-clean.webp",
        accent: "cyan",
      },
      {
        slug: "robot-dog-davinci-bot",
        title: "Robot Dog / DaVinci Bot",
        label: "Robotique associative",
        description:
          "Exploration robotique autour d’un robot quadrupède et de premières briques mécaniques.",
        role: "Participation, prototypage et apprentissage en équipe.",
        stack: ["Robotique", "Mécanique", "Prototypage"],
        image: "/projects/davinci-bot-motor-assembly.webp",
        accent: "amber",
      },
      {
        slug: "smart-screen",
        title: "Smart Screen",
        label: "Stage DaVinci Bot",
        description:
          "Plateforme web sur Raspberry Pi pour partager un écran vers une télévision lors des formations de l’association.",
        role: "Développement web, réseau, WebRTC et support Raspberry Pi modélisé en 3D.",
        stack: ["Raspberry Pi", "WebRTC", "WebSocket", "HTML/JS"],
        image: "/projects/smart-screen-raspberry-stand.webp",
        accent: "green",
      },
      {
        slug: "assistant-vocal-ia",
        title: "Assistant vocal IA",
        label: "IA locale",
        description:
          "Assistant expérimental combinant interaction vocale, logique d’actions et modèles locaux.",
        role: "Développement Python et expérimentation IA.",
        stack: ["Python", "Whisper", "LLM", "TTS"],
        accent: "green",
      },
      {
        slug: "generateur-doe",
        title: "Générateur automatique de DOE",
        label: "Automatisation",
        description:
          "Outil pensé pour accélérer la génération structurée de plans d’expériences.",
        role: "Structuration logique, génération et interface d’usage.",
        stack: ["Python", "Automatisation", "Données"],
        accent: "cyan",
      },
      {
        slug: "globe-interactif-parcours",
        title: "Globe interactif de parcours",
        label: "Data visualisation",
        description:
          "Visualisation interactive du parcours académique et international dans le portfolio.",
        role: "Intégration front-end, animation et optimisation mobile.",
        stack: ["D3", "Canvas", "TypeScript"],
        accent: "green",
      },
      {
        slug: "lampe-connectee-modelisee",
        title: "Lampe connectée modélisée",
        label: "CAO & rendu",
        description:
          "Exercice personnel pour passer d’un modèle SolidWorks à une scène Blender crédible.",
        role: "Modélisation, matériaux, cadrages et rendu produit.",
        stack: ["SolidWorks", "Blender", "Rendu 3D"],
        image: "/projects/blender-lamp-overhead-desk.webp",
        accent: "amber",
      },
    ],
    learningHeader: {
      eyebrow: "Apprentissages",
      title: "Ce que mes projets m’ont appris",
      copy:
        "Ces projets montrent surtout une manière de progresser : comprendre, construire, tester, puis améliorer.",
    },
    learnings: [
      { title: "Concevoir", copy: "Passer d’une idée à une architecture technique claire." },
      { title: "Prototyper", copy: "Tester rapidement des solutions mécaniques ou logicielles." },
      { title: "Programmer", copy: "Développer des outils, interfaces et scripts utiles." },
      { title: "Itérer", copy: "Corriger, améliorer et rendre un système plus fiable." },
    ],
    method: {
      eyebrow: "Comment j’aborde un projet",
      title: "Une méthode simple, concrète et itérative.",
      copy:
        "Je cherche d’abord à rendre le problème manipulable, puis à construire une première version qui permet d’apprendre quelque chose de réel.",
      items: [
        "Comprendre le besoin",
        "Définir l’architecture",
        "Prototyper rapidement",
        "Tester sur un cas réel",
        "Améliorer par itérations",
      ],
    },
    journeyHeader: {
      eyebrow: "Parcours",
      title: "Quelques étapes seulement, pour garder le fil lisible.",
      copy:
        "Le parcours relie formation, projets robotiques, automatisation logicielle et ouverture internationale.",
    },
    journeyLabels: {
      route: "Trajet actif",
      simplified: "Version mobile simplifiée",
    },
    trustTitle: "Ils m'ont fait confiance",
    journeySteps: [
      { title: "ESILV", copy: "Formation ingénieur et socle scientifique.", logo: "/logos/esilv.png", logoAlt: "Logo ESILV" },
      { title: "DaVinci Bot", copy: "Premiers projets robotiques et travail d’équipe.", logo: "/logos/davinci-bot.png", logoAlt: "Logo DaVinci Bot" },
      { title: "Pian", copy: "Automatisation logicielle et outils techniques.", logo: "/logos/pian-entreprise.png", logoAlt: "Logo PIAN entreprise" },
      { title: "DeVinci Créalab", copy: "Projet Créalab Augmenté et contexte atelier.", logo: "/logos/crealab-nantes.png", logoAlt: "Logo Créalab Nantes" },
      { title: "IFT", copy: "Soutien institutionnel pour prototyper une idée technique.", logo: "/projects/ift-logo.png", logoAlt: "Logo IFT" },
      {
        title: "Kasetsart University",
        copy: "Ouverture internationale et spécialisation à venir.",
        logo: "/logos/kasetsart-university.png",
        logoAlt: "Logo Kasetsart University",
      },
    ],
    skillsHeader: {
      eyebrow: "Compétences",
      title: "Des outils que j’utilise ou que j’explore.",
      copy:
        "La grille est organisée par familles pour montrer les directions de progression sans surjouer une maîtrise totale.",
    },
    skills: [
      {
        title: "Robotique & mécatronique",
        items: ["SolidWorks", "Impression 3D", "Moteurs", "Prototypage", "Architecture système"],
      },
      {
        title: "Électronique & embarqué",
        items: ["ESP32", "Capteurs", "PCB", "KiCad", "Contrôle moteur"],
      },
      {
        title: "Logiciel",
        items: ["Python", "C++", "TypeScript", "Node.js", "Docker"],
      },
      {
        title: "IA & vision",
        items: ["OpenCV", "MediaPipe", "Whisper", "LLM"],
      },
    ],
    current: {
      eyebrow: "Actuellement",
      title: "Je prépare ma spécialisation en robotique et systèmes intelligents.",
      copy:
        "Mes projets personnels me permettent d’explorer progressivement le contrôle moteur, la vision par ordinateur, l’embarqué et les architectures robotiques.",
      tags: ["Robotique", "Systèmes embarqués", "Vision", "Prototypage", "IA"],
    },
    about: {
      eyebrow: "À propos",
      title: "Ce qui m’intéresse le plus : le moment où une idée devient réelle.",
      copy:
        "Une pièce imprimée, un mécanisme qui bouge, un programme qui automatise une tâche ou un prototype qui commence à fonctionner. Mon objectif est de continuer à construire des projets de plus en plus ambitieux en robotique et systèmes intelligents.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Construisons quelque chose ensemble.",
      copy:
        "Je suis ouvert aux stages, collaborations, projets techniques et opportunités liées à la robotique, au prototypage et aux systèmes intelligents.",
      email: "Me contacter",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "Télécharger mon CV",
    },
  },
  en: {
    nav: {
      brand: "GAUTHIER.AI",
      systems: "Build",
      projects: "Projects",
      journey: "Journey",
      education: "Skills",
      experience: "Method",
      vision: "Now",
      contact: "Contact",
      skip: "Skip to content",
      github: "GitHub profile",
      linkedin: "Gauthier Defoy LinkedIn profile",
    },
    hero: {
      badge: "Gauthier Defoy · ESILV engineering student",
      title: "From idea to working prototype.",
      copy:
        "Engineering student at ESILV, passionate about robotics, embedded systems and artificial intelligence. I build projects combining mechanics, electronics and software to turn concepts into real systems.",
      projectsCta: "View my projects",
      cvCta: "Download my resume",
      contactCta: "Contact me",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      quickLinks: [
        { label: "GitHub", href: profileLinks.github },
        { label: "LinkedIn", href: profileLinks.linkedin },
        { label: "Email", href: profileLinks.email },
      ],
      credentials: [
        { value: "ESILV", label: "Engineering program" },
        { value: "Robotics", label: "Specialization in progress" },
        { value: "Prototyping", label: "Mechanics, code, AI" },
      ],
    },
    proof: [
      { value: "Prototypes", label: "mechatronics" },
      { value: "AI", label: "tools & automation" },
      { value: "Embedded", label: "sensors, motors, ESP32" },
      { value: "Approach", label: "multidisciplinary" },
    ],
    interface: {
      eyebrow: "Visual Lab",
      title: "A portfolio that shows direction, not overclaiming.",
      modules: ["Mechanics", "Electronics", "Software", "Local AI"],
      moduleLabel: "Exploration",
      copy:
        "The 3D scene keeps the futuristic feel of the portfolio while serving a simple idea: learn fast, prototype concretely, and connect several engineering disciplines.",
    },
    systemsHeader: {
      eyebrow: "What I Build",
      title: "Three technical exploration areas.",
      copy:
        "The projects are not presented as finished industrial products. They are serious prototypes used to learn, test and make an idea visible.",
    },
    pillars: [
      {
        title: "Mechatronic prototypes",
        subtitle: "Mechanics + actuators",
        copy: "Designing systems that combine mechanics, actuators, 3D printing and assembly.",
        stat: "Real prototype",
      },
      {
        title: "Embedded systems",
        subtitle: "Sensors + microcontrollers",
        copy: "Exploring electronics, sensors, microcontrollers and motor control.",
        stat: "Physical signal",
      },
      {
        title: "Software & AI",
        subtitle: "Python + interfaces",
        copy: "Building Python tools, computer vision experiments, automation and intelligent interfaces.",
        stat: "Useful tool",
      },
    ],
    featuredProject: {
      eyebrow: "Featured project",
      title: "Motorized projection system",
      image: "/projects/projector-positioning-clean.webp",
      imageAlt: "Motorized projector positioning system",
      points: [
        { label: "Problem", value: "Precisely orient and move a projector in space." },
        { label: "Solution", value: "Design of a motorized system with rotation and translation axes." },
        { label: "What I did", value: "Mechanical design, prototyping, assembly and system thinking." },
        { label: "Result", value: "A visual and functional prototype presented as an engineering project." },
      ],
      technologies: ["SolidWorks", "3D printing", "Motors", "Mechanics", "Prototyping"],
    },
    projectsHeader: {
      eyebrow: "Projects",
      title: "Learning, prototyping and engineering projects.",
      copy:
        "Each card highlights the role, technologies and technical interest without presenting the project as an already industrialized product.",
    },
    projectLabels: {
      role: "My role",
      tech: "Technologies",
      cta: "View project",
    },
    projects: [
      {
        slug: "systeme-motorise-projection",
        title: "Motorized projection system",
        label: "Mechatronic prototype",
        description:
          "Mechanical architecture for moving and orienting a projector with better precision.",
        role: "Mechanical design, assembly and system thinking.",
        stack: ["SolidWorks", "3D printing", "Motors"],
        image: "/projects/projector-positioning-clean.webp",
        accent: "cyan",
      },
      {
        slug: "robot-dog-davinci-bot",
        title: "Robot Dog / DaVinci Bot",
        label: "Robotics association",
        description:
          "Robotics exploration around a quadruped robot and early mechanical building blocks.",
        role: "Participation, prototyping and team learning.",
        stack: ["Robotics", "Mechanics", "Prototyping"],
        image: "/projects/davinci-bot-motor-assembly.webp",
        accent: "amber",
      },
      {
        slug: "smart-screen",
        title: "Smart Screen",
        label: "DaVinci Bot internship",
        description:
          "Web platform on a Raspberry Pi to share a computer screen to a large TV during association training sessions.",
        role: "Web development, networking, WebRTC, and 3D-modeled Raspberry Pi mount.",
        stack: ["Raspberry Pi", "WebRTC", "WebSocket", "HTML/JS"],
        image: "/projects/smart-screen-raspberry-stand.webp",
        accent: "green",
      },
      {
        slug: "assistant-vocal-ia",
        title: "AI voice assistant",
        label: "Local AI",
        description:
          "Experimental assistant combining voice interaction, action logic and local models.",
        role: "Python development and AI experimentation.",
        stack: ["Python", "Whisper", "LLM", "TTS"],
        accent: "green",
      },
      {
        slug: "generateur-doe",
        title: "Automatic DOE generator",
        label: "Automation",
        description:
          "Tool designed to accelerate structured design-of-experiments generation.",
        role: "Logic structuring, generation and usage interface.",
        stack: ["Python", "Automation", "Data"],
        accent: "cyan",
      },
      {
        slug: "globe-interactif-parcours",
        title: "Interactive journey globe",
        label: "Data visualization",
        description:
          "Interactive visualization of the academic and international journey inside the portfolio.",
        role: "Front-end integration, animation and mobile optimization.",
        stack: ["D3", "Canvas", "TypeScript"],
        accent: "green",
      },
      {
        slug: "lampe-connectee-modelisee",
        title: "Modeled smart desk lamp",
        label: "CAD & rendering",
        description:
          "Personal exercise moving from a SolidWorks model to a credible Blender scene.",
        role: "Modeling, materials, framing and product rendering.",
        stack: ["SolidWorks", "Blender", "3D render"],
        image: "/projects/blender-lamp-overhead-desk.webp",
        accent: "amber",
      },
    ],
    learningHeader: {
      eyebrow: "Learnings",
      title: "What these projects taught me",
      copy: "These projects mainly show a way to progress: understand, build, test and improve.",
    },
    learnings: [
      { title: "Design", copy: "Move from an idea to a clear technical architecture." },
      { title: "Prototype", copy: "Quickly test mechanical or software solutions." },
      { title: "Program", copy: "Develop useful tools, interfaces and scripts." },
      { title: "Iterate", copy: "Correct, improve and make a system more reliable." },
    ],
    method: {
      eyebrow: "How I approach a project",
      title: "A simple, concrete and iterative method.",
      copy:
        "I first make the problem tangible, then build a first version that can teach something real.",
      items: [
        "Understand the need",
        "Define the architecture",
        "Prototype quickly",
        "Test on a real case",
        "Improve through iterations",
      ],
    },
    journeyHeader: {
      eyebrow: "Journey",
      title: "Only a few steps, so the path stays readable.",
      copy:
        "The journey connects engineering studies, robotics projects, software automation and an international opening.",
    },
    journeyLabels: {
      route: "Active route",
      simplified: "Simplified mobile version",
    },
    trustTitle: "They trusted me",
    journeySteps: [
      { title: "ESILV", copy: "Engineering studies and scientific foundation.", logo: "/logos/esilv.png", logoAlt: "ESILV logo" },
      { title: "DaVinci Bot", copy: "First robotics projects and teamwork.", logo: "/logos/davinci-bot.png", logoAlt: "DaVinci Bot logo" },
      { title: "Pian", copy: "Software automation and technical tools.", logo: "/logos/pian-entreprise.png", logoAlt: "PIAN entreprise logo" },
      { title: "DeVinci Créalab", copy: "Créalab Augmenté project and workshop context.", logo: "/logos/crealab-nantes.png", logoAlt: "Créalab Nantes logo" },
      { title: "IFT", copy: "Institutional support to prototype a technical idea.", logo: "/projects/ift-logo.png", logoAlt: "IFT logo" },
      {
        title: "Kasetsart University",
        copy: "International opening and upcoming specialization.",
        logo: "/logos/kasetsart-university.png",
        logoAlt: "Kasetsart University logo",
      },
    ],
    skillsHeader: {
      eyebrow: "Skills",
      title: "Tools I use or explore.",
      copy:
        "The grid is organized by families to show progression directions without overplaying complete mastery.",
    },
    skills: [
      {
        title: "Robotics & mechatronics",
        items: ["SolidWorks", "3D printing", "Motors", "Prototyping", "System architecture"],
      },
      {
        title: "Electronics & embedded",
        items: ["ESP32", "Sensors", "PCB", "KiCad", "Motor control"],
      },
      {
        title: "Software",
        items: ["Python", "C++", "TypeScript", "Node.js", "Docker"],
      },
      {
        title: "AI & vision",
        items: ["OpenCV", "MediaPipe", "Whisper", "LLM"],
      },
    ],
    current: {
      eyebrow: "Now",
      title: "I am preparing my specialization in robotics and intelligent systems.",
      copy:
        "My personal projects help me progressively explore motor control, computer vision, embedded systems and robotic architectures.",
      tags: ["Robotics", "Embedded systems", "Vision", "Prototyping", "AI"],
    },
    about: {
      eyebrow: "About",
      title: "What interests me most: the moment an idea becomes real.",
      copy:
        "A printed part, a mechanism that moves, a program that automates a task, or a prototype that starts working. My goal is to keep building increasingly ambitious projects in robotics and intelligent systems.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build something together.",
      copy:
        "I am open to internships, collaborations, technical projects and opportunities related to robotics, prototyping and intelligent systems.",
      email: "Contact me",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "Download my resume",
    },
  },
};

const proofIcons = [Wrench, BrainCircuit, CircuitBoard, Route];
const pillarVisuals = [
  { icon: Wrench, accent: "text-amber-200" },
  { icon: Cpu, accent: "text-sky-200" },
  { icon: BrainCircuit, accent: "text-emerald-200" },
];
const learningVisuals = [
  { src: "/emoji/design.webp", alt: "Crayon et règle", color: "orange" as const },
  { src: "/emoji/prototype.webp", alt: "Marteau et tournevis", color: "purple" as const },
  { src: "/emoji/code.webp", alt: "Ordinateur avec du code", color: "blue" as const },
  { src: "/emoji/iterate.webp", alt: "Flèche circulaire", color: "emerald" as const },
];
const skillIcons = [Wrench, CircuitBoard, Code2, Eye];

const projectAccentClasses: Record<string, string> = {
  green: "border-emerald-200/18 bg-emerald-200/[0.07] text-emerald-100",
  cyan: "border-sky-200/18 bg-sky-200/[0.07] text-sky-100",
  amber: "border-amber-200/18 bg-amber-200/[0.07] text-amber-100",
};

export function RefinedHome() {
  const [language, setLanguage] = useState<Language>("fr");
  const [mobileHeroMenuOpen, setMobileHeroMenuOpen] = useState(false);
  const t = portfolioCopy[language];
  const heroNavLinks = [
    { label: t.nav.systems, href: "#systems" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.journey, href: "#journey" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.vision, href: "#vision" },
  ];

  return (
    <main id="top" className="relative overflow-x-clip">
      <section id="content" className="relative min-h-[100svh] overflow-hidden bg-black/[0.9] px-5 pb-14 pt-7 md:px-8 md:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_44%,rgba(56,189,248,0.16),transparent_31%),radial-gradient(circle_at_28%_24%,rgba(245,158,11,0.1),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.34),rgba(0,0,0,0.9))]" aria-hidden="true" />

        <div className="relative z-10 md:hidden">
          <div className="relative z-40 flex items-center justify-between border-b border-white/10 pb-7">
            <a href="#top" className="focus-ring mono-detail text-2xl font-black uppercase tracking-[0] text-white">
              GD
            </a>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMobileHeroMenuOpen((isOpen) => !isOpen)}
                className="focus-ring inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white transition-colors duration-200 hover:bg-white/[0.08]"
                aria-expanded={mobileHeroMenuOpen}
                aria-label={mobileHeroMenuOpen ? t.hero.menuClose : t.hero.menuOpen}
              >
                {mobileHeroMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-8 w-8" />}
              </button>

              {mobileHeroMenuOpen ? (
                <div className="absolute right-0 top-full z-50 mt-4 w-64 rounded-lg border border-white/12 bg-black/92 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                  {heroNavLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileHeroMenuOpen(false)}
                      className="focus-ring block cursor-pointer rounded-md px-4 py-3 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setMobileHeroMenuOpen(false)}
                    className="focus-ring mt-2 flex cursor-pointer items-center justify-between rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-sky-200"
                  >
                    {t.nav.contact}
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <Reveal className="-mx-5 border-b border-white/10">
            <div className="relative h-[21.5rem] overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(56,189,248,0.28),transparent_42%)]" aria-hidden="true" />
              <SplineScene
                scene={heroSplineScene}
                className="pointer-events-none absolute left-1/2 top-[-1.75rem] h-[25.5rem] w-[25.5rem] -translate-x-1/2 scale-[0.96]"
                continuous
                keepAliveMs={9000}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/88 to-transparent" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative z-10 -mt-10">
            <p className="mono-detail text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-sky-100">
              {t.hero.badge}
            </p>
            <h1 className="mt-3 text-balance text-[clamp(2.85rem,13vw,4.45rem)] font-black uppercase leading-[0.86] tracking-[0] text-white">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-[0.9rem] leading-6 text-slate-300">{t.hero.copy}</p>

            <div className="mt-5 grid grid-cols-[1fr_auto] gap-2.5">
              <a
                href="#projects"
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-semibold text-slate-950 transition-colors duration-200 hover:bg-sky-200"
              >
                {t.hero.projectsCta}
                <MoveRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={assetPath(profileLinks.cv)}
                download
                className="focus-ring inline-flex h-full w-12 cursor-pointer items-center justify-center rounded-full border border-white/[0.22] bg-white/[0.03] text-white transition-colors duration-200 hover:bg-white/[0.09]"
                aria-label={t.hero.cvCta}
              >
                <Download className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {t.hero.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="focus-ring cursor-pointer rounded-full border border-white/12 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/12 pt-4">
              {t.hero.credentials.map((credential) => (
                <div key={credential.value} className="border-r border-white/12 pr-2 last:border-r-0 last:pr-0">
                  <p className="text-sm font-semibold leading-none text-white">{credential.value}</p>
                  <p className="mt-1.5 text-[0.68rem] leading-3 text-slate-400">{credential.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="h-[max(0px,calc(100svh-44rem))]" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto hidden min-h-[calc(100svh-7rem)] w-full max-w-[96rem] items-center gap-10 md:grid md:min-h-[100svh] md:grid-cols-[minmax(0,0.92fr)_minmax(28rem,1.08fr)] lg:gap-14">
          <Reveal className="max-w-3xl">
            <p className="mono-detail text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sky-200">
              {t.hero.badge}
            </p>
            <h1 className="mt-5 text-balance text-[clamp(4.2rem,7.3vw,8.3rem)] font-black uppercase leading-[0.86] tracking-[0] text-white">
              {t.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">{t.hero.copy}</p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
              <a
                href="#projects"
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-sky-200"
              >
                {t.hero.projectsCta}
                <MoveRight className="h-4 w-4" />
              </a>
              <a
                href={assetPath(profileLinks.cv)}
                download
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/[0.09]"
              >
                {t.hero.cvCta}
                <Download className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {t.hero.quickLinks.map((link, index) => {
                const Icon = index === 0 ? Code2 : index === 1 ? Network : Mail;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {t.hero.credentials.map((credential) => (
                <div key={credential.value} className="border-t border-white/16 pt-3">
                  <p className="text-lg font-semibold leading-none text-white">{credential.value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{credential.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative hidden min-h-[34rem] md:block lg:min-h-[40rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_56%_48%,rgba(125,211,252,0.18),transparent_34%),radial-gradient(circle_at_50%_75%,rgba(16,185,129,0.12),transparent_28%)]" aria-hidden="true" />
            <SplineScene scene={heroSplineScene} className="absolute inset-0" interactive continuous keepAliveMs={9000} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black to-transparent" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      <NavBar language={language} onLanguageChange={setLanguage} labels={t.nav} links={profileLinks} />

      <section aria-label={language === "fr" ? "Preuve rapide" : "Quick proof"} className="relative px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.proof.map((item, index) => {
            const Icon = proofIcons[index] ?? Sparkles;

            return (
              <Reveal key={item.value} delay={index * 0.04}>
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <Icon className="h-5 w-5 text-sky-200" />
                  <p className="mt-6 text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SplineShowcase labels={t.interface} />

      <section id="systems" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.systemsHeader.eyebrow} title={t.systemsHeader.title} copy={t.systemsHeader.copy} />
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            {t.pillars.map((pillar, index) => {
              const Icon = pillarVisuals[index].icon;
              return (
                <Reveal key={pillar.title} delay={index * 0.05}>
                  <div className="h-full rounded-lg border border-white/10 bg-[#080a10]/72 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:border-white/[0.22] hover:bg-white/[0.055]">
                    <div className="mb-10 flex items-center justify-between">
                      <div className="rounded-md border border-white/10 bg-white/5 p-3">
                        <Icon className={`h-5 w-5 ${pillarVisuals[index].accent}`} />
                      </div>
                      <span className="mono-detail text-xs uppercase tracking-[0.18em] text-slate-500">{pillar.stat}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-400">{pillar.subtitle}</p>
                    <h3 className="mt-2 text-3xl font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{pillar.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="defer-render relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-[#050b0f] shadow-[0_40px_120px_rgba(0,0,0,0.32)] lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative min-h-[20rem] border-b border-white/10 bg-[#071016] lg:min-h-full lg:border-b-0 lg:border-r">
            <img
              src={assetPath(t.featuredProject.image)}
              alt={t.featuredProject.imageAlt}
              className="h-full min-h-[20rem] w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/64 via-transparent to-transparent" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.08} className="p-6 md:p-10 lg:p-12">
            <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">{t.featuredProject.eyebrow}</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-6xl">{t.featuredProject.title}</h2>
            <div className="mt-8 grid gap-4">
              {t.featuredProject.points.map((item) => (
                <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {t.featuredProject.technologies.map((item) => (
                <span key={item} className="rounded-full border border-sky-200/16 bg-sky-200/[0.07] px-3 py-1.5 text-sm text-sky-100">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.projectsHeader.eyebrow} title={t.projectsHeader.title} copy={t.projectsHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.04}>
                <article className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#07080d]/78 shadow-[0_30px_90px_rgba(0,0,0,0.22)] transition-colors duration-200 hover:border-white/[0.22] hover:bg-white/[0.055]">
                  <div className="relative h-40 border-b border-white/10 bg-[#071016]">
                    {project.image ? (
                      <img
                        src={assetPath(project.image)}
                        alt={project.title}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className={`rounded-full border p-5 ${projectAccentClasses[project.accent]}`}>
                          <Sparkles className="h-7 w-7" />
                        </div>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full border border-white/14 bg-black/45 px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur">
                      {project.label}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl font-semibold leading-tight text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
                    <div className="mt-5">
                      <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.projectLabels.role}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{project.role}</p>
                    </div>
                    <div className="mt-5">
                      <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.projectLabels.tech}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={assetPath(`/projects/${project.slug}`)}
                      className="focus-ring mt-auto inline-flex w-fit cursor-pointer items-center gap-2 pt-6 text-sm font-semibold text-sky-100 transition-colors duration-200 hover:text-white"
                    >
                      {t.projectLabels.cta}
                      <MoveRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.learningHeader.eyebrow} title={t.learningHeader.title} copy={t.learningHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.learnings.map((item, index) => {
              const visual = learningVisuals[index];

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <AnimatedFeatureCard
                    index={String(index + 1).padStart(3, "0")}
                    tag={item.title}
                    title={item.copy}
                    imageSrc={assetPath(visual?.src ?? "/emoji/design.webp")}
                    imageAlt={visual?.alt}
                    color={visual?.color ?? "orange"}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div>
              <p className="mono-detail mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80">{t.method.eyebrow}</p>
              <h2 className="text-balance text-4xl font-semibold leading-[0.98] text-white md:text-6xl">{t.method.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{t.method.copy}</p>
            </div>
          </Reveal>
          <div className="grid gap-3">
            {t.method.items.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="grid gap-4 rounded-lg border border-white/10 bg-[#080a10]/72 p-5 transition-colors duration-200 hover:border-emerald-200/25 hover:bg-white/[0.055] sm:grid-cols-[4rem_1fr] sm:items-center">
                  <div className="mono-detail flex h-12 w-12 items-center justify-center rounded-md border border-emerald-200/18 bg-emerald-200/[0.08] text-sm font-semibold text-emerald-100">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-xl font-semibold text-white">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LazyJourneyGlobe language={language} journeys={journeys} header={t.journeyHeader} labels={t.journeyLabels} />

      <section className="defer-render relative px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-8 text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">{t.trustTitle}</h2>
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {t.journeySteps.map((item, index) => {
            const logo = item.logo;
            const logoAlt = item.logoAlt;

            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex min-h-14 items-start justify-between gap-4">
                    <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    {logo ? (
                      <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
                        <img
                          src={assetPath(logo)}
                          alt={logoAlt}
                          className="h-full w-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-emerald-200/18 bg-emerald-200/[0.08] text-emerald-100">
                        <Sparkles className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="education" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.skillsHeader.eyebrow} title={t.skillsHeader.title} copy={t.skillsHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {t.skills.map((group, index) => {
              const Icon = skillIcons[index] ?? Sparkles;

              return (
                <Reveal key={group.title} delay={index * 0.05}>
                  <article className="h-full rounded-lg border border-white/10 bg-[#080a10]/72 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:border-emerald-200/35 hover:bg-white/[0.055]">
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-emerald-200" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="vision" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="h-full rounded-lg border border-white/10 bg-[#07080d]/82 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.26)] md:p-10">
              <Sparkles className="h-7 w-7 text-emerald-200" />
              <p className="mono-detail mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80">{t.current.eyebrow}</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">{t.current.title}</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">{t.current.copy}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {t.current.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-emerald-200/16 bg-emerald-200/[0.07] px-3 py-1.5 text-sm text-emerald-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-lg border border-white/10 bg-white/[0.035] p-8 md:p-10">
              <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">{t.about.eyebrow}</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">{t.about.title}</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">{t.about.copy}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="relative px-5 pb-12 pt-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 pt-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.62fr)] lg:items-start">
          <Reveal>
            <div>
              <p className="mono-detail mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{t.contact.eyebrow}</p>
              <h2 className="text-balance text-4xl font-semibold leading-[0.98] text-white md:text-6xl">{t.contact.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{t.contact.copy}</p>
            </div>
          </Reveal>
          <div className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.035] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur md:p-5 lg:justify-self-end">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="mono-detail text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                {t.contact.eyebrow}
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.75)]" />
            </div>
            <div className="grid gap-3">
              <a
                className="focus-ring inline-flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-200"
                href={profileLinks.email}
              >
                {t.contact.email}
                <Mail className="h-4 w-4" />
              </a>
              <div className="grid gap-3">
                <a
                  className="focus-ring inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  href={profileLinks.linkedin}
                >
                  {t.contact.linkedin}
                  <Network className="h-4 w-4 shrink-0" />
                </a>
                <a
                  className="focus-ring inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  href={profileLinks.github}
                >
                  {t.contact.github}
                  <Code2 className="h-4 w-4 shrink-0" />
                </a>
                <a
                  className="focus-ring inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/[0.12] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  href={assetPath(profileLinks.cv)}
                  download
                >
                  {t.contact.cv}
                  <Download className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
