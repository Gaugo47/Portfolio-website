"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BrainCircuit,
  Cpu,
  Eye,
  Gauge,
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
import { ParticleField } from "@/components/ParticleField";
import type { Project } from "@/components/ProjectCard";
import { ProjectScrollTrack } from "@/components/ProjectScrollTrack";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

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
        title: "Interface projetée interactive",
        label: "Prototype HMI",
        problem:
          "Diriger un projet d’interface projetée amovible électriquement, interactive et utilisable via gestes ou commande vocale.",
        architecture: ["Projection", "Entrée geste/voix", "Assistant LLM", "Interface", "Action mécanique"],
        stack: ["Gestion projet", "LLM", "Voix", "Interaction gestuelle", "Équipe de 6"],
        outcome:
          "Un projet personnel en cours comme chef et directeur de projet, à la croisée de l’IA, de l’interaction et du hardware.",
        mediaLabel: "Placeholder pour projection, commande vocale et état d’interface.",
        media: {
          src: "/projects/projector-positioning-clean.png",
          alt: "Système hardware de positionnement motorisé pour projecteur",
          eyebrow: "Ingénierie en mouvement",
          title: "Système motorisé de positionnement de projecteur",
          headline: ["SYSTÈME", "MOTORISÉ", "POSITIONNEMENT", "PROJECTEUR"],
          tagline: "Précision. Automatisation. Alignement reproductible.",
          description:
            "Système motorisé quatre axes conçu pour positionner intelligemment un projecteur et obtenir une performance stable dans un environnement d’interface projetée.",
          footer: "Projet mécatronique · hardware prototype",
          overviewLabel: "Vue système",
          impact: {
            lead: "Conçu pour la précision.",
            highlight: "Pensé pour l’impact.",
          },
          features: [
            { title: "Axe de translation linéaire", detail: "Rail en extrusion aluminium" },
            { title: "Rotation quatre axes", detail: "Mécanisme type gimbal de précision" },
            { title: "Contrôle par moteurs pas-à-pas", detail: "Architecture pensée pour couple et répétabilité" },
            { title: "Conçu pour la précision", detail: "Composants robustes et intégration mécatronique" },
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
        title: "Interactive Projected Interface",
        label: "HMI Prototype",
        problem:
          "Lead a removable electrically actuated projected interface usable through gestures or voice.",
        architecture: ["Projection", "Gesture/Voice Input", "LLM Assistant", "Interface", "Mechanical Action"],
        stack: ["Project management", "LLM", "Voice", "Gesture interaction", "Team of 6"],
        outcome:
          "An ongoing personal project as project lead, combining AI, interaction design, and hardware.",
        mediaLabel: "Projection, voice command, and interface-state placeholder.",
        media: {
          src: "/projects/projector-positioning-clean.png",
          alt: "Hardware system for motorized projector positioning",
          eyebrow: "Engineering in motion",
          title: "Motorized projector positioning system",
          headline: ["Motorized", "Projector", "Positioning", "System"],
          tagline: "Precision. Automation. Repeatable alignment.",
          description:
            "Four-axis motorized system designed for intelligent projector positioning and stable performance inside a projected-interface environment.",
          footer: "Mechatronics portfolio project · hardware prototype",
          overviewLabel: "System overview",
          impact: {
            lead: "Built for precision.",
            highlight: "Designed for impact.",
          },
          features: [
            { title: "Linear translation axis", detail: "Aluminium extrusion rail" },
            { title: "Four-axis rotation", detail: "Precision gimbal-style mechanism" },
            { title: "Stepper motor control", detail: "Architecture designed for torque and repeatability" },
            { title: "Engineered for precision", detail: "Robust components and mechatronic integration" },
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
    <main id="top" className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 interface-grid opacity-60" aria-hidden="true" />
      <NavBar language={language} onLanguageChange={setLanguage} labels={t.nav} links={profileLinks} />

      <section id="content" className="relative flex min-h-screen items-center px-5 pb-20 pt-36 md:px-8 md:pt-28">
        <ParticleField />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(142,230,168,0.8)]" />
                {t.hero.badge}
              </div>
              <h1 className="max-w-5xl text-balance text-4xl font-semibold tracking-normal text-white sm:text-5xl md:text-6xl xl:text-7xl">
                {t.hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-300 md:text-xl">{t.hero.copy}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-200"
                >
                  {t.hero.projectsCta}
                  <MoveRight className="h-4 w-4" />
                </a>
                <a
                  href="#systems"
                  className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  {t.hero.systemsCta}
                  <Map className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  {t.hero.contactCta}
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {t.hero.credentials.map((credential) => (
                  <div key={credential.value} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                    <p className="text-lg font-semibold text-white">{credential.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{credential.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass-panel rounded-lg p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/5">
                    <Image src="/profile.jpg" alt="Gauthier Defoy" fill sizes="56px" className="object-cover" priority />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{t.interface.eyebrow}</p>
                    <p className="mt-1 font-medium text-white">{t.interface.title}</p>
                  </div>
                </div>
                <Gauge className="h-5 w-5 text-emerald-200" />
              </div>
              <div className="grid gap-3">
                {t.interface.modules.map((item, index) => (
                  <div key={item} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4">
                    <div>
                      <p className="text-sm font-medium text-white">{item}</p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-200"
                          style={{ width: `${68 + index * 7}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-slate-400">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {["ESILV", "LLM", "HMI"].map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/20 px-3 py-4">
                    <p className="text-2xl font-semibold text-white">{item}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{t.interface.moduleLabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
