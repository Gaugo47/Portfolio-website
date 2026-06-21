export type ProjectDetail = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  heroImage?: string;
  imageAlt?: string;
  support?: {
    logo: string;
    logoAlt: string;
    eyebrow: string;
    title: string;
    body: string;
  };
  role: string;
  stack: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  learnings: string[];
  gallery?: Array<{
    src: string;
    alt: string;
    caption: string;
    description: string;
  }>;
  video?: {
    src: string;
    poster?: string;
    caption: string;
    description: string;
  };
  engineeringMetrics?: {
    label: string;
    title: string;
    weight: {
      label: string;
      beforeLabel: string;
      afterLabel: string;
      beforeValue: string;
      afterValue: string;
      beforeKg: number;
      afterKg: number;
      reductionLabel: string;
    };
    centerOfGravity: {
      label: string;
      value: string;
      detail: string;
    };
    cost: {
      label: string;
      value: string;
      detail: string;
    };
    drivetrain: {
      label: string;
      items: Array<{
        motor: string;
        previousRatio: string;
        ratio: string;
        previousValue: number;
        value: number;
        detail: string;
      }>;
    };
  };
  costReduction?: {
    title: string;
    note: string;
    quantityLabel: string;
    baseline: {
      label: string;
      unitCost: number;
      totalCost: number;
    };
    optimized: {
      label: string;
      unitCost: number;
      totalCost: number;
    };
    saving: {
      label: string;
      value: number;
      detail: string;
    };
  };
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "systeme-motorise-projection",
    title: "Créalab Augmenté - système motorisé de projection",
    label: "Prototype mécatronique & interface IA",
    summary:
      "Projet d’ingénierie né d’une idée que je portais depuis longtemps : passer d’un concept mis en scène en 3D avec la lampe Blender à un vrai système motorisé de projection, soutenu par l’IFT.",
    heroImage: "/projects/projector-positioning-clean.webp",
    imageAlt: "Prototype de système motorisé de positionnement pour projecteur",
    support: {
      logo: "/projects/ift-logo.png",
      logoAlt: "Logo de l’Institute for Future Technologies de De Vinci Higher Education",
      eyebrow: "Soutien institutionnel",
      title: "Projet soutenu par l’IFT",
      body:
        "Le soutien de l’Institute for Future Technologies s’est fait par le biais de Marc Teyssier, directeur adjoint de l’institut.",
    },
    role:
      "Chef de projet : formalisation de l’idée, constitution et organisation d’une équipe de 5 personnes au total, conception mécanique, réflexion système, prototypage, intégration d’une interface web et expérimentation d’un assistant IA local dans un projet soutenu par l’IFT.",
    stack: ["SolidWorks", "Impression 3D", "Moteurs pas-à-pas", "Python", "Docker", "Ollama", "Whisper", "HTML/CSS/JS"],
    sections: [
      {
        title: "Origine du projet",
        body:
          "J’avais cette idée de système de projection motorisé depuis longtemps. Dans un premier temps, je l’ai mise sous une forme plus visuelle avec mon projet Blender autour de la lampe, afin d’explorer l’ambiance, l’objet et l’usage. Je voulais ensuite améliorer mes connaissances en mécanique, prototypage et intégration pour pouvoir réaliser ce concept en vrai. Ce passage du rendu 3D au prototype physique s’est concrétisé grâce à ce projet, soutenu par l’IFT (Institute for Future Technologies) par le biais de Marc Teyssier, directeur adjoint.",
      },
      {
        title: "Pilotage d’équipe",
        body:
          "J’ai également été chef du projet. J’ai donc dû constituer une équipe de 5 personnes au total, moi compris, puis organiser le travail pour répartir les sujets entre conception mécanique, prototypage, interface, intégration et validation du système.",
      },
      {
        title: "Problème",
        body:
          "Le besoin initial était d’orienter et déplacer un projecteur dans l’espace avec plus de précision, tout en rendant le système compréhensible et utilisable dans un contexte FabLab.",
      },
      {
        title: "Solution proposée",
        body:
          "Le projet combine une structure mécanique motorisée, des axes de rotation et de translation, ainsi qu’une couche logicielle permettant de contrôler le positionnement et d’assister l’utilisateur.",
      },
      {
        title: "Ce que j’ai construit",
        body:
          "J’ai travaillé sur la logique de prototype : architecture mécanique, assemblage, choix de transmission, réflexion sur l’équilibre du système, puis valorisation de l’usage à travers une interface plus lisible.",
      },
      {
        title: "Couche interface",
        body:
          "L’interface Créalab centralise l’accueil, le contrôle de position, la visualisation de patrons, les tutoriels et une brique d’assistance IA capable de proposer une ressource pertinente.",
      },
    ],
    learnings: [
      "Faire évoluer une idée personnelle depuis une mise en scène 3D jusqu’à un prototype physique.",
      "Constituer et organiser une équipe de 5 personnes autour d’un objectif technique commun.",
      "Penser un prototype comme un système complet, pas seulement comme une pièce mécanique.",
      "Relier contraintes physiques, contrôle moteur et expérience utilisateur.",
      "Présenter un projet technique de manière lisible avec des captures concrètes.",
      "Itérer sur masse, équilibre, coût et maintenabilité.",
    ],
    engineeringMetrics: {
      label: "Optimisation mécanique",
      title: "Version 2 : moins de masse, meilleur équilibre.",
      weight: {
        label: "Poids structure",
        beforeLabel: "Version 1",
        afterLabel: "Version 2",
        beforeValue: "10 kg",
        afterValue: "≈ 4,8 kg",
        beforeKg: 10,
        afterKg: 4.8,
        reductionLabel: "-52% masse",
      },
      centerOfGravity: {
        label: "Centre de gravité",
        value: "≈ 4 cm",
        detail: "Rapproché de la structure du rail pour limiter le porte-à-faux du projecteur.",
      },
      cost: {
        label: "Coût structure",
        value: "÷6",
        detail: "Prix de la structure divisé par 6, hors moteur, électronique et rail.",
      },
      drivetrain: {
        label: "Transmission moteurs",
        items: [
          {
            motor: "2x NEMA 17",
            previousRatio: "1:1",
            ratio: "≈ 3.5:1",
            previousValue: 1,
            value: 3.5,
            detail: "Démultiplication ajoutée sur deux axes de rotation pour augmenter le couple disponible.",
          },
          {
            motor: "NEMA 23",
            previousRatio: "1:1",
            ratio: "40:1",
            previousValue: 1,
            value: 40,
            detail: "Réduction cycloïdale : 40 tours moteur pour 1 tour en sortie du réducteur.",
          },
        ],
      },
    },
    gallery: [
      {
        src: "/projects/crealab-home.webp",
        alt: "Écran d’accueil de l’interface Créalab Augmenté",
        caption: "Accueil modulaire",
        description:
          "Navigation par fonctions : positionnement, extinction, information, patrons, questions et tutoriels.",
      },
      {
        src: "/projects/crealab-positioning.webp",
        alt: "Interface de positionnement du projecteur motorisé Créalab",
        caption: "Contrôle de position",
        description:
          "Sliders et vues de contrôle pour piloter les axes du projecteur sur son rail.",
      },
      {
        src: "/projects/crealab-pattern.webp",
        alt: "Visionneuse 3D de patrons STL dans l’interface Créalab",
        caption: "Patrons & visualisation STL",
        description:
          "Bibliothèque, import et visualisation 3D pour préparer des fichiers liés au FabLab.",
      },
      {
        src: "/projects/crealab-tutorials.webp",
        alt: "Page tutoriels avec vidéo intégrée dans l’interface Créalab",
        caption: "Tutoriels machine",
        description:
          "Sélection de tutoriels et lecture vidéo intégrée pour accompagner les usages atelier.",
      },
      {
        src: "/projects/crealab-ai-video.webp",
        alt: "Réponse IA Créalab affichant une vidéo YouTube pertinente",
        caption: "Tool calling IA",
        description:
          "L’assistant comprend la demande, choisit un tutoriel adapté et insère la vidéo dans la réponse.",
      },
    ],
  },
  {
    slug: "robot-dog-davinci-bot",
    title: "Robot Dog / DaVinci Bot",
    label: "Stage robotique, électronique & prototypage",
    summary:
      "Stage au sein de l’association DaVinci Bot autour d’un chien robot open source, pensé comme vitrine technologique et plateforme de formation pour les élèves de l’ESILV.",
    heroImage: "/projects/davinci-bot-motor-assembly.webp",
    imageAlt: "Assemblage moteur et structure imprimée en 3D pour le robot quadrupède DaVinci Bot",
    role:
      "État de l’art, réduction des coûts, étude des ESC, soudure de connecteurs, assemblage d’une patte, premiers tests et recherche sur Isaac Sim / Isaac Lab.",
    stack: ["VESC MINI 6.7", "ESC", "Moteurs DC", "Soudure", "Impression 3D", "SolidWorks", "Isaac Sim", "Isaac Lab"],
    sections: [
      {
        title: "Objectif du projet",
        body:
          "L’objectif était de contribuer à la réalisation d’un chien robot quadrupède dans l’esprit des robots de Boston Dynamics, mais avec une logique open source, un coût plus accessible et une utilité pédagogique pour l’association.",
      },
      {
        title: "Réduction des coûts",
        body:
          "Une partie importante du travail a consisté à comparer les solutions de contrôle moteur. Le remplacement envisagé des ODrive par des VESC MINI 6.7 permettait de réduire fortement le budget des contrôleurs tout en conservant des fonctionnalités clés.",
      },
      {
        title: "Prototype physique",
        body:
          "J’ai appris à souder, préparé des connecteurs banane pour relier les ESC aux moteurs DC, puis participé à l’assemblage d’une première patte afin de rendre les tests concrets.",
      },
      {
        title: "Piste IA",
        body:
          "Le rapport explore aussi Isaac Sim et Isaac Lab comme piste future pour entraîner le robot en simulation, au-delà d’un contrôle uniquement fondé sur des mouvements prédéfinis.",
      },
    ],
    learnings: [
      "Comprendre le rôle d’un ESC et les contraintes d’asservissement de moteurs DC.",
      "Passer d’une étude de composants à un prototype soudé, assemblé et testable.",
      "Évaluer les compromis entre coût, documentation, disponibilité et performance.",
      "Découvrir une approche complète mêlant électronique, mécanique, IA et travail d’équipe.",
    ],
    video: {
      src: "/projects/davinci-bot-prototype-demo-web.mp4",
      poster: "/projects/davinci-bot-motor-assembly.webp",
      caption: "Démonstration vidéo",
      description:
        "Vidéo du prototype et des essais réalisés autour de la patte motorisée du chien robot.",
    },
    costReduction: {
      title: "Réduction du budget des contrôleurs moteurs",
      note:
        "Estimation issue du rapport : 12 contrôleurs nécessaires, avec un passage d’ODrive S1 à VESC MINI 6.7.",
      quantityLabel: "12 contrôleurs pour le robot complet",
      baseline: {
        label: "ODrive S1 FOC Controller",
        unitCost: 200,
        totalCost: 2400,
      },
      optimized: {
        label: "VESC MINI 6.7",
        unitCost: 50,
        totalCost: 600,
      },
      saving: {
        label: "Économie estimée",
        value: 1800,
        detail: "Budget divisé par 4 sur cette famille de composants.",
      },
    },
    gallery: [
      {
        src: "/projects/davinci-bot-motor-assembly.webp",
        alt: "Moteur et structure de patte imprimée en 3D du chien robot DaVinci Bot",
        caption: "Assemblage moteur",
        description:
          "Vue rapprochée d’un moteur monté sur une structure imprimée en 3D, utilisée pour les premiers tests de patte.",
      },
    ],
  },
  {
    slug: "assistant-vocal-ia",
    title: "Assistant vocal IA",
    label: "IA locale",
    summary:
      "Prototype logiciel pour explorer une interaction vocale avec reconnaissance, modèle local et logique d’actions.",
    role: "Développement Python, expérimentation de pipeline vocal et intégration de briques IA locales.",
    stack: ["Python", "Whisper", "LLM", "TTS", "OpenCV", "MediaPipe"],
    sections: [
      {
        title: "Intention",
        body:
          "Explorer comment une interface vocale peut déclencher des actions utiles sans dépendre d’un produit fermé ou d’une connexion permanente.",
      },
      {
        title: "Architecture",
        body:
          "Le prototype s’organise autour d’une entrée audio, d’une transcription, d’un modèle de langage, d’un routeur d’actions et d’une réponse vocale.",
      },
    ],
    learnings: [
      "Assembler plusieurs briques IA en pipeline utilisable.",
      "Penser les limites d’un assistant local : latence, robustesse, commandes claires.",
      "Prototyper une interaction homme-machine simple et testable.",
    ],
  },
  {
    slug: "generateur-doe",
    title: "Générateur automatique de DOE",
    label: "Automatisation",
    summary:
      "Outil de génération de plans d’expériences pour structurer plus rapidement des essais et scénarios de test.",
    role: "Structuration de la logique, génération des sorties et réflexion sur l’usage par un utilisateur technique.",
    stack: ["Python", "Automatisation", "Données", "Interface"],
    sections: [
      {
        title: "Pourquoi ce projet",
        body:
          "Un plan d’expériences demande de la rigueur et peut devenir répétitif. L’idée est de transformer cette logique en outil plus rapide à utiliser.",
      },
      {
        title: "Ce que le prototype apporte",
        body:
          "Le projet formalise des entrées, génère une structure d’essais et rend le résultat plus facile à modifier ou partager.",
      },
    ],
    learnings: [
      "Transformer une méthode technique en outil logiciel.",
      "Clarifier les données d’entrée et les formats de sortie.",
      "Construire pour gagner du temps sur une tâche répétable.",
    ],
  },
  {
    slug: "globe-interactif-parcours",
    title: "Globe interactif de parcours",
    label: "Visualisation interactive",
    summary:
      "Visualisation du parcours académique et international du portfolio, pensée pour rester lisible sur desktop comme sur mobile.",
    role: "Intégration front-end, adaptation responsive, optimisation du rendu et cohérence avec la narration du portfolio.",
    stack: ["D3", "Canvas", "TypeScript", "Next.js"],
    sections: [
      {
        title: "Rôle dans le portfolio",
        body:
          "Le globe rend le parcours plus vivant sans transformer la page en démonstration gratuite. Il relie des lieux à des étapes d’apprentissage.",
      },
      {
        title: "Contraintes",
        body:
          "Le composant doit rester léger, lisible sur mobile, et ne pas gêner le scroll ou la compréhension des sections principales.",
      },
    ],
    learnings: [
      "Intégrer une visualisation interactive dans une page déjà riche.",
      "Respecter les contraintes de performance et de lisibilité mobile.",
      "Utiliser l’animation pour soutenir le contenu plutôt que le masquer.",
    ],
  },
  {
    slug: "lampe-connectee-modelisee",
    title: "Lampe connectée modélisée",
    label: "CAO & rendu 3D",
    summary:
      "Projet personnel pour apprendre à passer d’une modélisation SolidWorks à une scène Blender crédible et lisible.",
    heroImage: "/projects/blender-lamp-overhead-desk.webp",
    imageAlt: "Rendu Blender d’un bureau avec lampe connectée",
    role: "Modélisation, matériaux, cadrages, mise en scène et rendu produit.",
    stack: ["SolidWorks", "Blender", "Modélisation 3D", "Lighting", "Rendu produit"],
    sections: [
      {
        title: "Objectif",
        body:
          "Comprendre comment valoriser un objet technique : forme, matériaux, cadrage, environnement et lumière.",
      },
      {
        title: "Processus",
        body:
          "Le projet commence par une logique CAO sous SolidWorks, puis se prolonge dans Blender avec un travail de scène et de rendu.",
      },
    ],
    learnings: [
      "Passer d’un modèle fonctionnel à une présentation visuelle crédible.",
      "Améliorer la perception d’un projet par le cadrage et les matériaux.",
      "Relier conception technique et communication visuelle.",
    ],
    gallery: [
      {
        src: "/projects/blender-lamp-base-closeup.webp",
        alt: "Gros plan sur la base de la lampe connectée",
        caption: "Base & interface",
        description: "Détail sur la base, la molette circulaire et les matériaux sombres.",
      },
      {
        src: "/projects/blender-lamp-side-plan.webp",
        alt: "Vue latérale du bureau avec lampe connectée",
        caption: "Plan latéral",
        description: "Mise en scène de la lampe dans un environnement de prototypage.",
      },
      {
        src: "/projects/blender-lamp-top-closeup.webp",
        alt: "Vue rapprochée de la lampe avec faisceau lumineux",
        caption: "Cadrage produit",
        description: "Cadrage plus cinématique centré sur la lampe et son faisceau.",
      },
    ],
  },
];

export function getProjectDetail(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}
