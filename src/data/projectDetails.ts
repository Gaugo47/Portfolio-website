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
  versionOne?: {
    label: string;
    title: string;
    body: string;
    media: Array<{
      type?: "image" | "video";
      fit?: "cover" | "contain";
      src: string;
      poster?: string;
      alt: string;
      caption: string;
      description: string;
    }>;
  };
  gallery?: Array<{
    type?: "image" | "video";
    fit?: "cover" | "contain";
    src: string;
    poster?: string;
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
    media?: Array<{
      src: string;
      alt: string;
      caption: string;
      description: string;
    }>;
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
    versionOne: {
      label: "Version 1",
      title: "Première version sur rail",
      body:
        "La première version du projet Créalab Augmenté reposait déjà sur un déplacement sur rail et un ensemble motorisé capable d’orienter le projecteur. Cette V1 m’a servi de base concrète pour observer les limites mécaniques du système : masse importante, encombrement, câblage exposé, équilibre du bras et intégration encore difficile dans l’espace. Elle a ensuite guidé la conception d’une version plus légère, mieux équilibrée et plus simple à maintenir.",
      media: [
        {
          src: "/projects/crealab-v1-rail-prototype.webp",
          alt: "Version 1 du système Créalab Augmenté montée sur rail",
          caption: "V1 sur rail",
          description:
            "Première version du système motorisé de projection, utile pour identifier les limites de masse, d’équilibre, de câblage et d’intégration avant la V2.",
        },
        {
          type: "video",
          src: "/projects/crealab-v1-motion-test.mp4",
          poster: "/projects/crealab-v1-motion-test-poster.webp",
          alt: "Vidéo de test de mouvement de la version 1 du système Créalab Augmenté",
          caption: "Test de mouvement",
          description:
            "Séquence de test montrant le comportement du prototype V1 avant l’optimisation mécanique.",
        },
        {
          type: "video",
          src: "/projects/crealab-v1-rail-demo.mp4",
          poster: "/projects/crealab-v1-rail-demo-poster.webp",
          alt: "Vidéo de démonstration de la version 1 du système Créalab Augmenté sur rail",
          caption: "Démonstration sur rail",
          description:
            "Démonstration de la première version sur son rail, utilisée pour observer les limites d’intégration et préparer la V2.",
        },
      ],
    },
    sections: [
      {
        title: "Origine du projet",
        body:
          "J’avais cette idée de système de projection motorisé depuis longtemps. Dans un premier temps, je l’ai mise sous une forme plus visuelle avec mon projet Blender autour de la lampe, afin d’explorer l’ambiance, l’objet et l’usage. Je voulais ensuite améliorer mes connaissances en mécanique, prototypage et intégration pour pouvoir réaliser ce concept en vrai. Ce passage du rendu 3D au prototype physique s’est concrétisé grâce à ce projet, soutenu par l’IFT (Institute for Future Technologies) par le biais de Marc Teyssier, directeur adjoint.",
      },
      {
        title: "Version 1",
        body:
          "La première version du projet Créalab Augmenté reposait déjà sur un déplacement sur rail et un ensemble motorisé capable d’orienter le projecteur. Cette V1 m’a servi de base concrète pour observer les limites mécaniques du système : masse importante, encombrement, câblage exposé, équilibre du bras et intégration encore difficile dans l’espace. Elle a ensuite guidé la conception d’une version plus légère, mieux équilibrée et plus simple à maintenir.",
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
      "Analyser une première version réelle pour identifier les limites mécaniques avant de concevoir une V2 plus légère.",
      "Constituer et organiser une équipe de 5 personnes autour d’un objectif technique commun.",
      "Penser un prototype comme un système complet, pas seulement comme une pièce mécanique.",
      "Relier contraintes physiques, contrôle moteur et expérience utilisateur.",
      "Présenter un projet technique de manière lisible avec des captures concrètes.",
      "Itérer sur masse, équilibre, coût et maintenabilité.",
    ],
    engineeringMetrics: {
      label: "Optimisation mécanique",
      title: "Version 2 : moins de masse, meilleur équilibre.",
      media: [
        {
          src: "/projects/crealab-v2-installed-side.webp",
          alt: "Version 2 du système Créalab Augmenté installée sur le rail avec le projecteur monté",
          caption: "V2 installée sur rail",
          description:
            "Prototype physique de la version 2 : structure plus compacte, projecteur monté et ensemble motorisé rapproché du rail.",
        },
        {
          src: "/projects/crealab-v2-solidworks-side.webp",
          alt: "Vue de profil SolidWorks de la version 2 du système Créalab Augmenté",
          caption: "Vue CAO de profil",
          description:
            "Modèle SolidWorks utilisé pour vérifier l’encombrement, le positionnement du bras et l’angle de projection.",
        },
        {
          src: "/projects/crealab-v2-solidworks-front.webp",
          alt: "Vue de face SolidWorks de la version 2 du système Créalab Augmenté",
          caption: "Vue CAO de face",
          description:
            "Vue de face de la transmission et des supports, pensée pour améliorer l’équilibre et la maintenance du système.",
        },
        {
          src: "/projects/crealab-v2-solidworks-assembly.webp",
          alt: "Vue d’ensemble SolidWorks de la version 2 du système Créalab Augmenté sur rail",
          caption: "Vue CAO d’ensemble",
          description:
            "Vue globale de l’assemblage V2 sur rail, utile pour visualiser la liaison entre le chariot, les bras, la platine projecteur et les axes motorisés.",
        },
        {
          src: "/projects/crealab-v2-installed-front.webp",
          alt: "Version 2 du système Créalab Augmenté avec projecteur monté vue de face",
          caption: "Prototype V2 finalisé",
          description:
            "Assemblage réel de la version 2, avec le projecteur fixé sur la structure motorisée et les axes de rotation intégrés.",
        },
      ],
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
        src: "/projects/crealab-v1-rail-prototype.webp",
        alt: "Version 1 du système Créalab Augmenté montée sur rail",
        caption: "Version 1 sur rail",
        description:
          "Première version du système motorisé de projection, utile pour identifier les limites de masse, d’équilibre, de câblage et d’intégration avant la V2.",
      },
      {
        type: "video",
        src: "/projects/crealab-v1-motion-test.mp4",
        poster: "/projects/crealab-v1-motion-test-poster.webp",
        alt: "Vidéo de test de mouvement de la version 1 du système Créalab Augmenté",
        caption: "V1 - test de mouvement",
        description:
          "Courte séquence de test montrant le comportement du prototype V1 avant l’optimisation mécanique.",
      },
      {
        type: "video",
        src: "/projects/crealab-v1-rail-demo.mp4",
        poster: "/projects/crealab-v1-rail-demo-poster.webp",
        alt: "Vidéo de démonstration de la version 1 du système Créalab Augmenté sur rail",
        caption: "V1 - démonstration sur rail",
        description:
          "Démonstration de la première version sur son rail, utilisée pour observer les limites d’intégration et préparer la V2.",
      },
      {
        fit: "contain",
        src: "/projects/crealab-home.webp",
        alt: "Écran d’accueil de l’interface Créalab Augmenté",
        caption: "Accueil modulaire",
        description:
          "Navigation par fonctions : positionnement, extinction, information, patrons, questions et tutoriels.",
      },
      {
        fit: "contain",
        src: "/projects/crealab-positioning.webp",
        alt: "Interface de positionnement du projecteur motorisé Créalab",
        caption: "Contrôle de position",
        description:
          "Sliders et vues de contrôle pour piloter les axes du projecteur sur son rail.",
      },
      {
        fit: "contain",
        src: "/projects/crealab-pattern.webp",
        alt: "Visionneuse 3D de patrons STL dans l’interface Créalab",
        caption: "Patrons & visualisation STL",
        description:
          "Bibliothèque, import et visualisation 3D pour préparer des fichiers liés au FabLab.",
      },
      {
        fit: "contain",
        src: "/projects/crealab-tutorials.webp",
        alt: "Page tutoriels avec vidéo intégrée dans l’interface Créalab",
        caption: "Tutoriels machine",
        description:
          "Sélection de tutoriels et lecture vidéo intégrée pour accompagner les usages atelier.",
      },
      {
        fit: "contain",
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
    slug: "smart-screen",
    title: "Smart Screen",
    label: "Stage DaVinci Bot - partage d’écran & Raspberry Pi",
    summary:
      "Projet réalisé pendant mon stage chez DaVinci Bot pour permettre aux membres de l’association de partager facilement l’écran d’un PC vers une télévision reliée à une Raspberry Pi 4, afin de faciliter les formations.",
    heroImage: "/projects/smart-screen-raspberry-stand.webp",
    imageAlt: "Raspberry Pi 4 dans son support imprimé en 3D pour le projet Smart Screen",
    role:
      "Développement d’une plateforme web de partage d’écran, apprentissage des bases réseau, intégration WebSocket/WebRTC, modélisation SolidWorks d’un support Raspberry Pi et automatisation du lancement sur la carte.",
    stack: ["Raspberry Pi 4", "WebRTC", "WebSocket WSS", "HTTPS", "HTML", "JavaScript", "SolidWorks", "Bash"],
    sections: [
      {
        title: "Contexte",
        body:
          "Smart Screen est né pendant mon stage chez DaVinci Bot, en parallèle du projet de chien robot. L’objectif était d’aider les membres de l’association pendant les formations en leur permettant de projeter simplement du contenu sur un grand écran.",
      },
      {
        title: "Choix technique",
        body:
          "J’ai d’abord exploré des solutions plus directes de projection, notamment via les réglages Windows ou des librairies comme MiracleCast. Après plusieurs tests non concluants, je suis revenu vers une solution web plus maîtrisable et documentable.",
      },
      {
        title: "Architecture web",
        body:
          "La solution repose sur une Raspberry Pi 4 reliée à l’écran, avec un serveur WebSocket sécurisé en WSS/HTTPS pour coordonner les clients et éviter que plusieurs personnes ne partagent du contenu en même temps.",
      },
      {
        title: "Transmission vidéo",
        body:
          "Le flux vidéo est transmis avec WebRTC, une technologie open source permettant une communication temps réel entre navigateurs. Dans cette architecture, le serveur joue aussi le rôle de peer pour transmettre le flux.",
      },
      {
        title: "Support physique",
        body:
          "J’ai aussi modélisé un support en 3D sur SolidWorks pour clipser et déclipser facilement la Raspberry Pi à l’arrière de la télévision, afin de rendre l’installation plus modulaire.",
      },
      {
        title: "Documentation",
        body:
          "Le projet a été documenté dans un repository GitHub pour permettre à d’autres membres de reprendre le code, l’améliorer ou comprendre les choix techniques réalisés.",
      },
    ],
    learnings: [
      "Me former rapidement au développement web, à HTML, JavaScript et aux bases réseau.",
      "Comprendre le rôle de WebSocket, HTTPS et WebRTC dans une application temps réel.",
      "Relier une couche logicielle à une contrainte matérielle concrète avec une Raspberry Pi.",
      "Concevoir une pièce imprimée en 3D pour améliorer l’usage réel du prototype.",
      "Documenter un projet pour qu’il soit réutilisable par d’autres membres de l’association.",
    ],
    gallery: [
      {
        src: "/projects/smart-screen-raspberry-stand.webp",
        alt: "Raspberry Pi 4 avec support imprimé en 3D pour Smart Screen",
        caption: "Support Raspberry Pi",
        description:
          "Prototype du support imprimé en 3D, conçu pour maintenir la Raspberry Pi 4 de manière simple et modulaire.",
      },
      {
        src: "/projects/smart-screen-installed-tv.webp",
        alt: "Raspberry Pi 4 installée à l’arrière d’une télévision",
        caption: "Installation sur la télévision",
        description:
          "La Raspberry Pi est clipsée à l’arrière de l’écran pour servir de point de réception du partage d’écran.",
      },
      {
        src: "/projects/smart-screen-stand-back.webp",
        alt: "Vue arrière du support imprimé en 3D pour Raspberry Pi 4",
        caption: "Conception du support",
        description:
          "Vue du support côté arrière, pensé pour faciliter l’accroche et le retrait de la Raspberry Pi.",
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
