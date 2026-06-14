import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";

type ProjectMedia = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  headline: string[];
  tagline: string;
  description: string;
  footer: string;
  overviewLabel: string;
  interfaceLabel?: string;
  interfaceTitle?: string;
  interfaceCopy?: string;
  indexLabel?: string;
  impact: {
    lead: string;
    highlight: string;
  };
  features: Array<{
    title: string;
    detail: string;
  }>;
  interfaceScreens?: Array<{
    src: string;
    alt: string;
    caption: string;
    description: string;
  }>;
};

export type Project = {
  title: string;
  label: string;
  problem: string;
  architecture: string[];
  stack: string[];
  outcome: string;
  mediaLabel: string;
  media?: ProjectMedia;
  accent: "green" | "cyan" | "amber";
};

export type ProjectCardLabels = {
  problem: string;
  architecture: string;
  stack: string;
  outcome: string;
  demo: string;
  live: string;
  discuss: string;
};

const mediaAccents = {
  green: "from-emerald-300/[0.18] via-white/[0.08] to-transparent",
  cyan: "from-sky-300/[0.18] via-white/[0.08] to-transparent",
  amber: "from-amber-300/[0.18] via-white/[0.08] to-transparent",
};

export function ProjectCard({ project, index, labels }: { project: Project; index: number; labels: ProjectCardLabels }) {
  const media = project.media;

  if (media) {
    const interfaceScreens = media.interfaceScreens ?? [];

    return (
      <Reveal delay={index * 0.06}>
        <article className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#050b0f] shadow-2xl shadow-black/30">
          <div className="md:hidden">
            <div className="px-5 pb-6 pt-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-5 w-5 shrink-0 rotate-45 border border-sky-400" aria-hidden="true" />
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-300">
                    {media.eyebrow}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-sky-200/15 bg-black/35 px-3 py-1.5 text-xs font-semibold text-sky-200">
                  {media.indexLabel ?? "01 / 04"}
                </span>
              </div>

              <div className="mt-10">
                <h3 className="text-[2.45rem] font-semibold uppercase leading-[1.08] tracking-normal text-white">
                  {media.headline.map((line, lineIndex) => (
                    <span key={line} className={lineIndex === 2 ? "block text-sky-400" : "block"}>
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-7 text-sm font-semibold leading-6 text-white">{media.tagline}</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">{media.description}</p>
              </div>
            </div>

            <div className="relative h-64 overflow-hidden border-y border-sky-200/10">
              <div className="absolute inset-x-0 top-1/2 h-px bg-sky-200/22" aria-hidden="true" />
              <Image src={media.src} alt={media.alt} fill sizes="100vw" className="object-contain object-center" priority={index === 0} />
            </div>

            <div className="space-y-5 px-5 pb-8 pt-6">
              <div className="rounded-md border border-white/20 bg-slate-950/80 p-4">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">{media.overviewLabel}</p>
                <div className="grid gap-3.5">
                  {media.features.map((feature) => (
                    <div key={feature.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/28 bg-black/20 text-xs text-sky-200">
                        <span className="h-3 w-3 rounded-sm border border-current" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-100">{feature.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-400">{feature.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-md border border-white/14 bg-slate-950/80 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {media.impact.lead} <span className="text-sky-300">{media.impact.highlight}</span>
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{media.footer}</p>
            </div>
          </div>

          <div className="relative mx-auto hidden max-w-[96rem] md:block md:aspect-[3/2]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(14,165,233,0.12),transparent_22rem)]" aria-hidden="true" />
            <div className="absolute inset-x-0 top-[17rem] h-px bg-sky-200/20 md:top-[47%]" aria-hidden="true" />

            <div className="absolute inset-0" aria-hidden="true">
              <Image
                src={media.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>

            <div className="absolute inset-0 z-10 grid grid-rows-[auto_1fr_auto] px-12 py-12 lg:px-14">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 rotate-45 border border-sky-400" aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                    {media.eyebrow}
                  </p>
                </div>
                <span className="rounded-md border border-sky-200/15 bg-black/35 px-3 py-1.5 text-xs font-semibold text-sky-200 backdrop-blur-sm">
                  {media.indexLabel ?? "01 / 04"}
                </span>
              </div>

              <div className="mt-10 max-w-[17rem] self-start md:mt-16">
                <h3 className="text-3xl font-semibold uppercase leading-[1.12] tracking-normal text-white md:text-4xl">
                  {media.headline.map((line, lineIndex) => (
                    <span key={line} className={lineIndex === 2 ? "block text-sky-400" : "block"}>
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-7 text-sm font-semibold text-white">{media.tagline}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{media.description}</p>
              </div>

              <div className="mt-auto grid gap-4 pt-[19rem] md:mt-0 md:grid-cols-[18rem_1fr_18rem] md:items-end md:pt-0">
                <div className="grid gap-7">
                  <div className="rounded-md border border-white/20 bg-slate-950/72 p-4 shadow-2xl shadow-black/30 backdrop-blur-md">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">{media.overviewLabel}</p>
                    <div className="grid gap-3.5">
                      {media.features.map((feature) => (
                        <div key={feature.title} className="grid grid-cols-[2rem_1fr] gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/28 bg-black/20 text-xs text-sky-200">
                            <span className="h-3 w-3 rounded-sm border border-current" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-100">{feature.title}</p>
                            <p className="mt-0.5 text-xs leading-5 text-slate-400">{feature.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {media.footer}
                  </p>
                </div>

                <div className="hidden md:block" aria-hidden="true" />

                <div className="md:justify-self-end">
                  <div className="rounded-md border border-white/14 bg-slate-950/72 px-4 py-3 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                      {media.impact.lead} <span className="text-sky-300">{media.impact.highlight}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {interfaceScreens.length > 0 ? (
            <div className="mx-auto max-w-[96rem] px-5 py-8 md:px-12 md:py-12 lg:px-14">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                    {media.interfaceLabel ?? "Interface layer"}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold tracking-normal text-white md:text-2xl">
                    {media.interfaceTitle ?? "Local AI, motor control and assistance in one interface."}
                  </h4>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-400">
                  {media.interfaceCopy ??
                    "Interface captures from the project: navigation, positioning, 3D visualization and assistant-triggered tutorials."}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {interfaceScreens.map((screen) => (
                  <figure
                    key={screen.src}
                    className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20"
                  >
                    <div className="relative aspect-[16/9] bg-white">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        fill
                        sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw"
                        className="object-cover object-left-top"
                      />
                    </div>
                    <figcaption className="p-4">
                      <p className="text-sm font-semibold text-slate-100">{screen.caption}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{screen.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal delay={index * 0.06}>
      <article className="grid overflow-hidden rounded-lg border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/20 md:grid-cols-[0.86fr_1.14fr]">
        <div className={`relative min-h-72 bg-gradient-to-br ${mediaAccents[project.accent]} p-6`}>
          <div className="absolute inset-0 opacity-35 interface-grid" aria-hidden="true" />
          <div className="relative flex h-full min-h-60 flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">{project.label}</p>
                <h3 className="mt-4 max-w-sm text-3xl font-semibold tracking-normal text-white">{project.title}</h3>
              </div>
              <div className="rounded-md border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                  <span>{labels.demo}</span>
                  <span className="signal-text">{labels.live}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 15 }).map((_, cell) => (
                    <div
                      key={cell}
                      className="aspect-square rounded-sm border border-white/10 bg-white/5"
                      style={{ opacity: cell % 4 === 0 ? 1 : 0.42 }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-300">{project.mediaLabel}</p>
              </div>
          </div>
        </div>

        <div className="space-y-7 p-6 md:p-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{labels.problem}</p>
            <p className="text-base leading-7 text-slate-200">{project.problem}</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{labels.architecture}</p>
            <ArchitectureDiagram nodes={project.architecture} accent={project.accent} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{labels.stack}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{labels.outcome}</p>
              <p className="text-sm leading-6 text-slate-300">{project.outcome}</p>
            </div>
          </div>

          <a
            href="#contact"
            className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:border-emerald-200/50 hover:bg-white/[0.08]"
          >
            {labels.discuss}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}
