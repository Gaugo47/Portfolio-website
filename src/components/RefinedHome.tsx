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
import { AsciiHandsFinale } from "@/components/AsciiHandsFinale";
import { LazyJourneyGlobe } from "@/components/LazyJourneyGlobe";
import { NavBar, type Language } from "@/components/NavBar";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionHeader } from "@/components/SectionHeader";
import { AnimatedFeatureCard } from "@/components/ui/feature-card-1";
import { ScrambleHover } from "@/components/ui/scramble-hover";
import { SplineScene } from "@/components/ui/splite";
import { journeys } from "@/data/journeys";
import { assetPath } from "@/lib/assetPath";

const profileLinks = {
  github: "https://github.com/Gaugo47",
  linkedin: "https://www.linkedin.com/in/gauthier-defoy/",
  email: "mailto:gauthier.defoy@edu.devinci.fr",
  cv: "/cv-gauthier-defoy.pdf",
};

const heroSplineScene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const portfolioCopy = {
  fr: {
    nav: {
      brand: "GAUTHIER.AI",
      about: "À propos",
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
      name: "Gauthier Defoy",
      badge: "Étudiant ingénieur · ESILV — Robotique, IA & systèmes embarqués",
      title: "De l’idée au",
      titleAccent: "prototype fonctionnel.",
      copy:
        "Étudiant ingénieur à l’ESILV, je conçois des systèmes qui mêlent mécanique, électronique, logiciel et IA locale. J’aime transformer une idée en prototype réel : de la conception CAO au code embarqué, jusqu’à la démonstration.",
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
        { value: "ESILV", label: "Cycle ingénieur · 2023–2028" },
        { value: "TOEFL C1", label: "Anglais · 653/677" },
        { value: "BIA", label: "Mention Très Bien" },
      ],
    },
    proof: [
      { value: "6+", label: "projets d’ingénierie menés" },
      { value: "−52%", label: "de masse sur la structure Créalab v2" },
      { value: "3 domaines", label: "mécanique · électronique · IA" },
      { value: "100% local", label: "IA embarquée, sans cloud" },
    ],
    aboutIntro: {
      eyebrow: "About me",
      title: "Construire est ma façon",
      titleAccent: "de comprendre.",
      portraitAlt: "Portrait de Gauthier Defoy",
      portraitCaption: "Fig. 01 — entre deux prototypes",
      paragraphs: [
        [
          { text: "Étudiant ingénieur à l’ESILV, j’ai besoin de ", accent: false },
          { text: "fabriquer", accent: true },
          {
            text:
              " pour comprendre. Un robot octopode entièrement mécanique, un assistant vocal qui tourne sans internet, une interface projetée pilotée au geste et à la voix : chaque projet est une excuse pour creuser un problème complexe jusqu’à ce qu’il fonctionne.",
            accent: false,
          },
        ],
        [
          {
            text:
              "En parallèle des cours, je dirige une équipe de six sur un projet d’interface interactive et je monte des partenariats pour le DeVinci Fablab. Et parce qu’",
            accent: false,
          },
          { text: "expliquer", accent: true },
          {
            text:
              " est une autre manière d’apprendre, j’ai passé un été à donner des cours de maths et de physique à des lycéens.",
            accent: false,
          },
        ],
      ],
    },
    systemsHeader: {
      eyebrow: "Ce que je construis",
      title: "Trois terrains où je fais fonctionner des",
      titleAccent: "systèmes réels.",
      copy:
        "De la mécanique au logiciel embarqué, je conçois, prototype et démontre des systèmes complets — pensés pour être manipulés, pas seulement décrits.",
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
      title: "Des systèmes conçus, prototypés et menés",
      titleAccent: "jusqu’au résultat.",
      copy:
        "Chaque projet expose le problème, mon rôle, la stack technique et le résultat concret obtenu — du prototype mécanique à l’IA embarquée.",
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
        image: "/projects/auto-doe-interface.webp",
        accent: "cyan",
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
      eyebrow: "Ma méthode",
      title: "Une manière de travailler qui se répète sur",
      titleAccent: "chaque projet",
      copy:
        "Un même réflexe d’ingénieur d’un projet à l’autre : comprendre le besoin, construire une première version, la tester en réel, puis l’améliorer.",
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
      title: "Les outils avec lesquels je conçois",
      titleAccent: "et je livre.",
      copy:
        "Organisées par familles : de la conception mécanique au logiciel, jusqu’à la vision par ordinateur et l’IA embarquée.",
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
      title: "Construisons quelque chose",
      titleAccent: "ensemble.",
      copy:
        "Je suis ouvert aux stages, collaborations, projets techniques et opportunités liées à la robotique, au prototypage et aux systèmes intelligents.",
      email: "Me contacter",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "Télécharger mon CV",
    },
    footer: {
      note: "Conçu et développé par Gauthier Defoy",
      rights: "© 2026 Gauthier Defoy",
      backToTop: "Haut de page",
    },
  },
  en: {
    nav: {
      brand: "GAUTHIER.AI",
      about: "About",
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
      name: "Gauthier Defoy",
      badge: "Engineering student · ESILV — Robotics, AI & embedded systems",
      title: "From idea to",
      titleAccent: "working prototype.",
      copy:
        "Engineering student at ESILV, I build systems that blend mechanics, electronics, software and local AI. I turn ideas into real prototypes — from CAD design to embedded code, all the way to a working demo.",
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
        { value: "ESILV", label: "Engineering · 2023–2028" },
        { value: "TOEFL C1", label: "English · 653/677" },
        { value: "BIA", label: "Highest honors" },
      ],
    },
    proof: [
      { value: "6+", label: "engineering projects delivered" },
      { value: "−52%", label: "mass cut on Créalab structure v2" },
      { value: "3 domains", label: "mechanics · electronics · AI" },
      { value: "100% local", label: "on-device AI, no cloud" },
    ],
    aboutIntro: {
      eyebrow: "About me",
      title: "Building is how I",
      titleAccent: "make sense of things.",
      portraitAlt: "Portrait of Gauthier Defoy",
      portraitCaption: "Fig. 01 — between two prototypes",
      paragraphs: [
        [
          { text: "Engineering student at ESILV, I need to ", accent: false },
          { text: "build", accent: true },
          {
            text:
              " things to understand them. A fully mechanical octopod robot, a voice assistant that runs without internet, a projected interface driven by gesture and voice: every project is an excuse to dig into a complex problem until it works.",
            accent: false,
          },
        ],
        [
          {
            text:
              "Alongside my studies, I lead a team of six on an interactive interface project and build partnerships for the DeVinci Fablab. And because ",
            accent: false,
          },
          { text: "explaining", accent: true },
          {
            text:
              " is another way of learning, I spent a summer teaching maths and physics to high-school students.",
            accent: false,
          },
        ],
      ],
    },
    systemsHeader: {
      eyebrow: "What I Build",
      title: "Three areas where I make real",
      titleAccent: "systems work.",
      copy:
        "From mechanics to embedded software, I design, prototype and demo complete systems — built to be handled, not just described.",
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
      title: "Systems designed, prototyped and",
      titleAccent: "taken to a result.",
      copy:
        "Each project lays out the problem, my role, the tech stack and the concrete result delivered — from mechanical prototype to embedded AI.",
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
        image: "/projects/auto-doe-interface.webp",
        accent: "cyan",
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
      eyebrow: "My method",
      title: "A way of working that repeats across",
      titleAccent: "every project",
      copy: "The same engineering reflex from one project to the next: understand the need, build a first version, test it for real, then improve.",
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
      title: "The tools I",
      titleAccent: "design and ship with.",
      copy:
        "Organized by families: from mechanical design to software, all the way to computer vision and embedded AI.",
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
      title: "Let’s build something",
      titleAccent: "together.",
      copy:
        "I am open to internships, collaborations, technical projects and opportunities related to robotics, prototyping and intelligent systems.",
      email: "Contact me",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "Download my resume",
    },
    footer: {
      note: "Designed and built by Gauthier Defoy",
      rights: "© 2026 Gauthier Defoy",
      backToTop: "Back to top",
    },
  },
};

const proofIcons = [Wrench, BrainCircuit, CircuitBoard, Route];
const pillarVisuals = [
  { icon: Wrench, accent: "text-[#a7d9f5]" },
  { icon: Cpu, accent: "text-[#a7d9f5]" },
  { icon: BrainCircuit, accent: "text-[#a7d9f5]" },
];
const learningVisuals = [
  { src: "/emoji/design.webp", alt: "Crayon et règle", color: "orange" as const },
  { src: "/emoji/prototype.webp", alt: "Marteau et tournevis", color: "purple" as const },
  { src: "/emoji/code.webp", alt: "Ordinateur avec du code", color: "blue" as const },
  { src: "/emoji/iterate.webp", alt: "Flèche circulaire", color: "emerald" as const },
];
const skillIcons = [Wrench, CircuitBoard, Code2, Eye];

const projectAccentClasses: Record<string, string> = {
  green: "border-[#7cc8ef]/20 bg-[#7cc8ef]/[0.07] text-[#a7d9f5]",
  cyan: "border-[#7cc8ef]/20 bg-[#7cc8ef]/[0.07] text-[#a7d9f5]",
  amber: "border-[#7cc8ef]/20 bg-[#7cc8ef]/[0.07] text-[#a7d9f5]",
};

export function RefinedHome() {
  const [language, setLanguage] = useState<Language>("fr");
  const [mobileHeroMenuOpen, setMobileHeroMenuOpen] = useState(false);
  const t = portfolioCopy[language];
  const heroNavLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.systems, href: "#systems" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.journey, href: "#journey" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.vision, href: "#vision" },
  ];

  return (
    <main id="top" className="relative overflow-x-clip">
      <ScrollProgress />
      <section id="content" className="relative min-h-[100svh] overflow-hidden bg-black/[0.9] px-5 pb-14 pt-7 md:px-8 md:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_44%,rgba(56,189,248,0.16),transparent_31%),radial-gradient(circle_at_28%_24%,rgba(245,158,11,0.1),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.34),rgba(0,0,0,0.9))]" aria-hidden="true" />

        <div className="relative z-10 md:hidden">
          <div className="relative z-40 flex items-center justify-between border-b border-white/10 pb-7">
            <a href="#top" className="focus-ring mono-detail text-2xl font-bold uppercase tracking-[0.06em] text-white">
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
            <p className="mt-2 text-base font-semibold tracking-tight text-white">{t.hero.name}</p>
            <h1 className="mt-2 text-balance text-[clamp(2.5rem,11vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {t.hero.title} <span className="serif-accent text-[#a7d9f5]">{t.hero.titleAccent}</span>
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
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7cc8ef] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7cc8ef]" />
              </span>
              <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200">
                {t.hero.badge}
              </p>
            </div>
            <p className="mt-6 text-xl font-semibold tracking-tight text-white md:text-2xl">{t.hero.name}</p>
            <h1 className="mt-3 text-balance text-[clamp(3.4rem,5.9vw,6.6rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-white">
              {t.hero.title}
              <br />
              <span className="serif-accent text-[#a7d9f5]">{t.hero.titleAccent}</span>
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
                <div className="group h-full rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(2,8,20,0.3)] transition-colors duration-200 hover:border-[#7cc8ef]/25 hover:bg-white/[0.05]">
                  <Icon className="h-5 w-5 text-[#7cc8ef] transition-transform duration-300 group-hover:scale-110" />
                  <p className="mono-detail mt-6 text-3xl font-semibold leading-none tracking-tight text-white md:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-slate-400">{item.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="about" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              <span className="absolute -left-2.5 -top-2.5 h-6 w-6 border-l-2 border-t-2 border-[#7cc8ef]/50" aria-hidden="true" />
              <span className="absolute -right-2.5 -top-2.5 h-6 w-6 border-r-2 border-t-2 border-[#7cc8ef]/50" aria-hidden="true" />
              <span className="absolute -bottom-2.5 -left-2.5 h-6 w-6 border-b-2 border-l-2 border-[#7cc8ef]/50" aria-hidden="true" />
              <span className="absolute -bottom-2.5 -right-2.5 h-6 w-6 border-b-2 border-r-2 border-[#7cc8ef]/50" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#080a10]/72 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
                <img
                  src={assetPath("/profile.jpg")}
                  alt={t.aboutIntro.portraitAlt}
                  className="aspect-[4/5] w-full object-cover object-top saturate-[0.9]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070c]/85 via-transparent to-transparent" aria-hidden="true" />
                <p className="mono-detail absolute inset-x-0 bottom-0 px-4 pb-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {t.aboutIntro.portraitCaption}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mono-detail flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7cc8ef]/80">
              <span className="h-px w-10 bg-[#7cc8ef]/40" aria-hidden="true" />
              <ScrambleHover
                text={t.aboutIntro.eyebrow}
                useOriginalCharsOnly
                scrambleSpeed={38}
                maxIterations={12}
                className="cursor-default"
                scrambledClassName="cursor-default text-[#7cc8ef]"
              />
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
              {t.aboutIntro.title} <span className="serif-accent text-[#a7d9f5]">{t.aboutIntro.titleAccent}</span>
            </h2>
            {t.aboutIntro.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                {paragraph.map((segment, segmentIndex) =>
                  segment.accent ? (
                    <span key={segmentIndex} className="serif-accent text-[1.12em] text-[#a7d9f5]">
                      {segment.text}
                    </span>
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  ),
                )}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="systems" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.systemsHeader.eyebrow} title={t.systemsHeader.title} titleAccent={t.systemsHeader.titleAccent} copy={t.systemsHeader.copy} />
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
                <span key={item} className="rounded-full border border-[#7cc8ef]/16 bg-[#7cc8ef]/[0.07] px-3 py-1.5 text-sm text-[#a7d9f5]">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={assetPath("/projects/systeme-motorise-projection")}
              className="focus-ring mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#7cc8ef]/40 hover:bg-white/[0.08]"
            >
              {t.projectLabels.cta}
              <MoveRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.projectsHeader.eyebrow} title={t.projectsHeader.title} titleAccent={t.projectsHeader.titleAccent} copy={t.projectsHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.04}>
                <a
                  href={assetPath(`/projects/${project.slug}`)}
                  className="focus-ring group flex h-full min-h-[28rem] cursor-pointer flex-col overflow-hidden rounded-lg border border-white/10 bg-[#07090e]/80 shadow-[0_30px_90px_rgba(2,8,20,0.32)] transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#7cc8ef]/30 hover:shadow-[0_36px_110px_rgba(2,8,20,0.45)] motion-reduce:transform-none"
                >
                  <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[#080d14]">
                    {project.image ? (
                      <img
                        src={assetPath(project.image)}
                        alt={project.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
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
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090e]/70 via-transparent to-transparent" aria-hidden="true" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/14 bg-black/50 px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur">
                      {project.label}
                    </div>
                    <span className="mono-detail absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[0.65rem] font-semibold text-slate-300 backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.01em] text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
                    <div className="mt-5 border-t border-white/[0.07] pt-4">
                      <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.projectLabels.role}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{project.role}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-[#a7d9f5] transition-colors duration-200 group-hover:text-white">
                      {t.projectLabels.cta}
                      <MoveRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-render relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow={t.learningHeader.eyebrow} title={t.learningHeader.title} titleAccent={t.learningHeader.titleAccent} copy={t.learningHeader.copy} />
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
              <p className="mono-detail mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#7cc8ef]/80">{t.method.eyebrow}</p>
              <h2 className="text-balance text-4xl font-semibold leading-[0.98] text-white md:text-6xl">{t.method.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{t.method.copy}</p>
            </div>
          </Reveal>
          <div className="grid gap-3">
            {t.method.items.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="grid gap-4 rounded-lg border border-white/10 bg-[#080a10]/72 p-5 transition-colors duration-200 hover:border-[#7cc8ef]/30 hover:bg-white/[0.055] sm:grid-cols-[4rem_1fr] sm:items-center">
                  <div className="mono-detail flex h-12 w-12 items-center justify-center rounded-md border border-[#7cc8ef]/20 bg-[#7cc8ef]/[0.08] text-sm font-semibold text-[#a7d9f5]">
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
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-[#a7d9f5]">
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
            <SectionHeader eyebrow={t.skillsHeader.eyebrow} title={t.skillsHeader.title} titleAccent={t.skillsHeader.titleAccent} copy={t.skillsHeader.copy} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {t.skills.map((group, index) => {
              const Icon = skillIcons[index] ?? Sparkles;

              return (
                <Reveal key={group.title} delay={index * 0.05}>
                  <article className="h-full rounded-lg border border-white/10 bg-[#080a10]/72 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:border-[#7cc8ef]/35 hover:bg-white/[0.055]">
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-[#7cc8ef]" />
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
              <Sparkles className="h-7 w-7 text-[#7cc8ef]" />
              <p className="mono-detail mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#7cc8ef]/80">{t.current.eyebrow}</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">{t.current.title}</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">{t.current.copy}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {t.current.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#7cc8ef]/18 bg-[#7cc8ef]/[0.07] px-3 py-1.5 text-sm text-[#a7d9f5]">
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
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-10">
          <Reveal>
            <div>
              <p className="mono-detail mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{t.contact.eyebrow}</p>
              <h2 className="text-balance text-4xl font-semibold leading-[0.98] text-white md:text-6xl">
                {t.contact.title} <span className="serif-accent text-[#a7d9f5]">{t.contact.titleAccent}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{t.contact.copy}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <AsciiHandsFinale
        firstName="Gauthier"
        lastName="Defoy."
        quickLinks={t.hero.quickLinks}
        cvHref={profileLinks.cv}
        cvLabel={t.contact.cv}
        rights={t.footer.rights}
        note={t.footer.note}
        backToTop={t.footer.backToTop}
      />
    </main>
  );
}
