"use client";

import { useMemo, useState } from "react";
import {
  BrainCircuit,
  Cpu,
  Eye,
  Gauge,
  Hand,
  Mail,
  Map,
  MoveRight,
  Network,
  Radar,
  Sparkles,
  Wrench,
} from "lucide-react";
import { NavBar, type Language } from "@/components/NavBar";
import { ParticleField } from "@/components/ParticleField";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const profileLinks = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/gauthier-defoy/",
  email: "mailto:hello@example.com",
};

const content = {
  fr: {
    nav: {
      brand: "GAUTHIER.AI",
      systems: "Systèmes",
      projects: "Projets",
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
        "Portfolio bilingue pour équipes de robotique, laboratoires IA et studios de technologie créative qui recherchent une approche système, rapide à prototyper et centrée sur l’humain.",
      projectsCta: "Voir les projets",
      systemsCta: "Explorer le modèle système",
      contactCta: "Contact",
    },
    interface: {
      eyebrow: "Interface système",
      title: "Stack robotique créative",
      modules: ["Fusion capteurs", "Raisonnement local", "Contrôle moteur", "Retour humain"],
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
          "Transformer des entrées capteurs bruitées en compréhension exploitable avec OpenCV, MediaPipe, suivi d’objets et pipelines visuels.",
        stat: "Entrée vision",
      },
      {
        title: "Intelligence",
        subtitle: "Systèmes IA / LLM",
        copy:
          "Assembler assistants locaux, orchestration de modèles, logique de prompts et couches de décision pour rendre les systèmes adaptatifs.",
        stat: "Raisonnement",
      },
      {
        title: "Action",
        subtitle: "Robotique & contrôle",
        copy:
          "Relier logiciel et matériel avec prototypes embarqués, actionneurs, boucles de contrôle et intégration hardware/software.",
        stat: "Sortie physique",
      },
      {
        title: "Interaction",
        subtitle: "UX humain-machine",
        copy:
          "Concevoir des interactions où gestes, voix, feedback et comportement spatial rendent la machine lisible et digne de confiance.",
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
          "Construire un assistant privé capable d’écouter, comprendre une intention et répondre sans dépendre d’un workflow cloud-first.",
        architecture: ["Audio", "Speech pipeline", "LLM local", "Routeur d’actions", "Réponse vocale"],
        stack: ["Python", "Llama models", "STT type Whisper", "TTS", "Outils locaux"],
        outcome:
          "Une architecture modulaire extensible vers la mémoire, le contrôle local d’appareils et l’expérimentation IA.",
        mediaLabel: "Placeholder pour waveform, routage d’intention et état de réponse.",
        accent: "green",
      },
      {
        title: "Système de détection d’objets",
        label: "Pipeline perception",
        problem:
          "Détecter et classifier des objets dans un flux caméra temps réel tout en gardant le pipeline explicable et réglable.",
        architecture: ["Caméra", "Prétraitement", "Modèle détection", "Tracking", "Overlay UI"],
        stack: ["OpenCV", "MediaPipe", "Python", "NumPy", "Vidéo temps réel"],
        outcome:
          "Une couche de perception utile pour prototyper des comportements robotiques, installations interactives et interfaces spatiales.",
        mediaLabel: "Placeholder pour grille de détection et carte de confiance.",
        accent: "cyan",
      },
      {
        title: "Prototype robotique embarqué",
        label: "Intégration hardware",
        problem:
          "Connecter capteurs, logique de contrôle et sortie matérielle dans un prototype testable rapidement et itérable proprement.",
        architecture: ["Capteurs", "Microcontrôleur", "Boucle contrôle", "Actionneurs", "Télémétrie"],
        stack: ["Arduino / ESP32", "C++", "Télémétrie série", "Moteurs", "Prototypage"],
        outcome:
          "Une boucle hardware/software concrète pour valider mouvement, contraintes et feedback opérateur avant de complexifier.",
        mediaLabel: "Placeholder pour barres de télémétrie et états actionneurs.",
        accent: "amber",
      },
      {
        title: "Interaction gestuelle humain-machine",
        label: "Prototype HMI",
        problem:
          "Permettre à un utilisateur de communiquer naturellement avec une machine via gestes, feedback visible et calibration légère.",
        architecture: ["Mouvement", "Landmarks", "Classifieur geste", "État interaction", "Feedback"],
        stack: ["MediaPipe", "OpenCV", "TypeScript UI", "Machines à états", "Prototypage"],
        outcome:
          "Un modèle d’interaction pour environnements immersifs où la technologie doit répondre clairement sans devenir opaque.",
        mediaLabel: "Placeholder pour landmarks main et état d’interaction.",
        accent: "green",
      },
    ],
    experience: {
      eyebrow: "Expérience",
      title: "Prototyper vite, tester franchement, raffiner le système.",
      copy:
        "Mon positionnement est celui d’un étudiant ingénieur Robotique & IA qui avance par cycles courts : idée, architecture, prototype, test, démonstration.",
      items: [
        {
          title: "FabLab & prototypage",
          copy:
            "Transformer rapidement des idées de systèmes en expériences physiques avec capteurs, outils de fabrication et boucles d’itération.",
        },
        {
          title: "Projets d’ingénierie",
          copy:
            "Travailler sur toute la chaîne : besoin, architecture, implémentation, debug, démonstration et documentation.",
        },
        {
          title: "Recherche appliquée & défis",
          copy:
            "Avancer sous contrainte avec des solutions claires, fiables, explicables et prêtes à être montrées.",
        },
      ],
    },
    vision: {
      eyebrow: "Vision",
      title: "Je veux construire des systèmes qui donnent l’impression d’être vivants.",
      copy:
        "Mêler précision d’ingénierie et expériences immersives : robots, assistants et espaces intelligents qui perçoivent le contexte, prennent des décisions lisibles et communiquent avec les humains de manière intuitive, cinématique et fiable.",
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
        "A bilingual portfolio for robotics teams, AI labs, and creative technology studios looking for systems thinking, prototyping velocity, and human-centered machine intelligence.",
      projectsCta: "View Projects",
      systemsCta: "Explore System Model",
      contactCta: "Contact",
    },
    interface: {
      eyebrow: "System Interface",
      title: "Creative robotics stack",
      modules: ["Sensor Fusion", "Local Reasoning", "Motion Control", "Human Feedback"],
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
          "Turning noisy sensor input into structured scene understanding with OpenCV, MediaPipe, object tracking, and visual pipelines.",
        stat: "Vision input",
      },
      {
        title: "Intelligence",
        subtitle: "AI / LLM Systems",
        copy:
          "Designing local assistants, model orchestration, prompt logic, and decision layers that make systems feel adaptive and useful.",
        stat: "Reasoning",
      },
      {
        title: "Action",
        subtitle: "Robotics Control",
        copy:
          "Bridging software and hardware through embedded prototypes, actuator control, feedback loops, and practical system integration.",
        stat: "Physical output",
      },
      {
        title: "Interaction",
        subtitle: "Human-Machine UX",
        copy:
          "Creating interfaces where gestures, voice, feedback, and spatial behavior help people understand and trust intelligent machines.",
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
          "Build a private assistant that can listen, interpret intent, and respond without depending on a cloud-first workflow.",
        architecture: ["Audio Input", "Speech Pipeline", "Local LLM", "Action Router", "Voice Response"],
        stack: ["Python", "Llama models", "Whisper-style STT", "TTS", "Local tools"],
        outcome:
          "A modular assistant architecture that can be extended with memory, local device control, and research-grade experimentation.",
        mediaLabel: "Waveform, intent routing, and response-state placeholder.",
        accent: "green",
      },
      {
        title: "Computer Vision Object Detection System",
        label: "Perception Pipeline",
        problem:
          "Detect and classify objects in a real-time camera feed while keeping the pipeline understandable and tunable.",
        architecture: ["Camera Feed", "Preprocess", "Detection Model", "Tracking", "Overlay UI"],
        stack: ["OpenCV", "MediaPipe", "Python", "NumPy", "Realtime video"],
        outcome:
          "A perception layer suitable for prototyping robotics behaviors, interactive installations, and spatial UI experiments.",
        mediaLabel: "Detection grid and confidence-map placeholder.",
        accent: "cyan",
      },
      {
        title: "Robotics Prototype Control System",
        label: "Embedded Integration",
        problem:
          "Connect sensing, control logic, and hardware output in a prototype that can be tested quickly and iterated safely.",
        architecture: ["Sensors", "Microcontroller", "Control Loop", "Actuators", "Telemetry"],
        stack: ["Arduino / ESP32", "C++", "Serial telemetry", "Motors", "Prototyping"],
        outcome:
          "A practical hardware/software loop for validating movement, constraints, and operator feedback before scaling complexity.",
        mediaLabel: "Telemetry bars and actuator-state placeholder.",
        accent: "amber",
      },
      {
        title: "Gesture-Based Human Interaction System",
        label: "HMI Prototype",
        problem:
          "Let users communicate with a machine naturally through gesture input, visible system feedback, and low-friction calibration.",
        architecture: ["User Motion", "Landmarks", "Gesture Classifier", "Interaction State", "Feedback"],
        stack: ["MediaPipe", "OpenCV", "TypeScript UI", "State machines", "Prototyping"],
        outcome:
          "An interaction model for immersive environments where technology needs to feel responsive without disappearing into magic.",
        mediaLabel: "Hand landmark and interaction-state placeholder.",
        accent: "green",
      },
    ],
    experience: {
      eyebrow: "Experience",
      title: "Prototype fast, test honestly, refine the system.",
      copy:
        "My positioning is Robotics & AI engineering student with short iteration loops: idea, architecture, prototype, test, demonstration.",
      items: [
        {
          title: "FabLab & prototyping",
          copy:
            "Rapidly turning system ideas into physical experiments with sensors, fabrication tools, and iteration loops.",
        },
        {
          title: "Engineering projects",
          copy:
            "Working across the full chain: requirements, architecture, implementation, debugging, demonstration, and documentation.",
        },
        {
          title: "Applied research & challenges",
          copy:
            "Working under constraints where the best solution is clear, reliable, explainable, and ready to demo.",
        },
      ],
    },
    vision: {
      eyebrow: "Vision",
      title: "I want to build systems that feel alive.",
      copy:
        "Combining engineering precision with immersive experiences: robots, assistants, and intelligent spaces that sense context, make clear decisions, and communicate with people in ways that feel intuitive, cinematic, and trustworthy.",
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
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass-panel rounded-lg p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{t.interface.eyebrow}</p>
                  <p className="mt-1 font-medium text-white">{t.interface.title}</p>
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
                {["CV", "LLM", "HMI"].map((item) => (
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
          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} labels={t.projectLabels} />
            ))}
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
                {t.contact.email}
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
