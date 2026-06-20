import Image from "next/image";
import { BarChart3, ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";
import { assetPath } from "@/lib/assetPath";

type ProjectMedia = {
  src: string;
  desktopSrc?: string;
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
        previousRatio?: string;
        ratio: string;
        detail: string;
      }>;
    };
  };
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

const parseMetricNumber = (value: string) => Number(value.replace(",", ".").match(/\d+(?:\.\d+)?/)?.[0] ?? 0);

function EngineeringMetricsChart({ metrics }: { metrics: NonNullable<ProjectMedia["engineeringMetrics"]> }) {
  const maxWeight = Math.max(metrics.weight.beforeKg, metrics.weight.afterKg);
  const weightBars = [
    {
      label: metrics.weight.beforeLabel,
      value: metrics.weight.beforeKg,
      displayValue: metrics.weight.beforeValue,
      className: "bg-slate-500/90",
    },
    {
      label: metrics.weight.afterLabel,
      value: metrics.weight.afterKg,
      displayValue: metrics.weight.afterValue,
      className: "bg-gradient-to-t from-emerald-400 to-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.35)]",
    },
  ];
  const drivetrainBars = metrics.drivetrain.items.map((item) => ({
    ...item,
    previousRatio: item.previousRatio ?? "1:1",
    previousValue: parseMetricNumber(item.previousRatio ?? "1:1"),
    value: parseMetricNumber(item.ratio),
  }));
  const maxRatio = Math.max(...drivetrainBars.flatMap((item) => [item.previousValue, item.value]), 1);

  return (
    <div className="rounded-md border border-white/14 bg-[#070d13] p-4 shadow-2xl shadow-black/24">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-200" aria-hidden="true" />
            <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
              {metrics.label}
            </p>
          </div>
          <p className="mt-1 text-sm font-semibold text-white">{metrics.title}</p>
        </div>
        <span className="mono-detail shrink-0 rounded-md border border-emerald-200/18 bg-emerald-200/[0.08] px-2.5 py-1 text-[0.68rem] font-semibold text-emerald-100">
          {metrics.weight.reductionLabel}
        </span>
      </div>

      <div className="rounded-md border border-sky-200/14 bg-[#07131d] p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-300">{metrics.weight.label}</p>
          <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
            ordonnee: kg / abscisse: version
          </p>
        </div>
        <div className="relative h-56 pb-12 pl-12" role="img" aria-label={`${metrics.weight.label}: ${metrics.weight.beforeLabel} ${metrics.weight.beforeValue}, ${metrics.weight.afterLabel} ${metrics.weight.afterValue}`}>
          <div className="absolute bottom-10 left-0 top-2 flex w-5 items-center justify-center" aria-hidden="true">
            <span className="mono-detail -rotate-90 whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-sky-200/60">
              ordonnee - masse (kg)
            </span>
          </div>
          <div className="absolute bottom-10 left-12 right-0 top-2 border-b border-l border-slate-500/55" aria-hidden="true">
            <span className="absolute -left-[0.24rem] -top-1 h-2 w-2 rotate-45 border-l border-t border-slate-500/70" />
            <span className="absolute -bottom-[0.24rem] -right-1 h-2 w-2 rotate-45 border-r border-t border-slate-500/70" />
            {[10, 5, 0].map((tick) => (
              <div
                key={tick}
                className="absolute left-0 right-0 border-t border-white/[0.07]"
                style={{ bottom: `${(tick / maxWeight) * 100}%` }}
              >
                <span className="absolute right-[calc(100%+0.6rem)] top-0 -translate-y-1/2 text-[0.62rem] font-medium text-slate-500">
                  {tick}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10 left-12 right-0 top-2 grid grid-cols-2 items-end gap-5 px-5">
            {weightBars.map((bar) => (
              <div key={bar.label} className="flex h-full min-w-0 flex-col justify-end">
                <span className="mono-detail mb-2 text-center text-xs font-semibold text-slate-100">{bar.displayValue}</span>
                <div
                  className={`min-h-2 rounded-t-md ${bar.className}`}
                  style={{ height: `${(bar.value / maxWeight) * 100}%` }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-5 left-12 right-0 grid grid-cols-2 gap-5 px-5">
            {weightBars.map((bar) => (
              <p key={bar.label} className="truncate text-center text-[0.68rem] font-medium text-slate-400">
                {bar.label}
              </p>
            ))}
          </div>
          <p className="mono-detail absolute bottom-0 left-12 right-0 text-center text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-sky-200/60">
            abscisse - version
          </p>
        </div>
      </div>

      <div className="mt-5 grid items-stretch gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
        <div className="flex min-h-[10.75rem] flex-col rounded-md border border-white/10 bg-[#09111a] p-3">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-300">{metrics.centerOfGravity.label}</p>
            <p className="mono-detail text-xs font-semibold text-sky-100">{metrics.centerOfGravity.value}</p>
          </div>
          <div className="relative h-16 rounded-md border border-white/10 bg-black/20 px-3 py-2">
            <div className="absolute bottom-3 left-3 right-3 h-px bg-white/14" />
            <div className="absolute bottom-3 left-[28%] h-8 w-px bg-slate-500/80" />
            <div className="absolute bottom-3 left-[66%] h-8 w-px bg-slate-500/80" />
            <div className="absolute bottom-3 left-[28%] h-6 w-[38%] rounded-r-full bg-gradient-to-r from-sky-300 to-emerald-300 shadow-[0_0_16px_rgba(125,211,252,0.35)]" />
            <span className="absolute bottom-11 left-[27%] text-[0.6rem] font-medium text-slate-500">V1</span>
            <span className="absolute bottom-11 left-[62%] text-[0.6rem] font-medium text-emerald-100">V2</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">{metrics.centerOfGravity.detail}</p>
        </div>

        <div className="flex min-h-[10.75rem] flex-col rounded-md border border-white/10 bg-[#09111a] p-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-300">{metrics.cost.label}</p>
            <p className="mono-detail text-xs font-semibold text-sky-100">{metrics.cost.value}</p>
          </div>
          <div className="mt-4 rounded-md border border-white/10 bg-black/20 p-3">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-md border border-white/10 bg-[#050b12] px-3 py-2">
                <p className="mono-detail text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-slate-500">V1</p>
                <p className="mono-detail mt-1 text-lg font-semibold leading-none text-slate-100">100%</p>
              </div>
              <div className="mono-detail rounded-md border border-sky-200/14 bg-sky-200/[0.06] px-2.5 py-2 text-sm font-semibold text-sky-100">
                {metrics.cost.value}
              </div>
              <div className="rounded-md border border-white/10 bg-[#050b12] px-3 py-2">
                <p className="mono-detail text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-slate-500">V2</p>
                <p className="mono-detail mt-1 text-lg font-semibold leading-none text-sky-100">1/6</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[0.64rem] font-medium text-slate-500">
              <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
              <span className="mono-detail uppercase tracking-[0.14em]">cout relatif ≈ 17%</span>
              <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">{metrics.cost.detail}</p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-sky-200/14 bg-[#07131d] p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-300">{metrics.drivetrain.label}</p>
          <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
            ordonnee: ratio / abscisse: moteur
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,0.95fr)_1.05fr]">
          <div className="relative h-44 pb-10 pl-8" role="img" aria-label={drivetrainBars.map((item) => `${item.motor}: V1 ${item.previousRatio}, V2 ${item.ratio}`).join(", ")}>
            <div className="absolute bottom-8 left-8 right-0 top-1 border-b border-l border-slate-500/45" aria-hidden="true">
              <span className="absolute -left-[0.24rem] -top-1 h-2 w-2 rotate-45 border-l border-t border-slate-500/70" />
              <span className="absolute -bottom-[0.24rem] -right-1 h-2 w-2 rotate-45 border-r border-t border-slate-500/70" />
              <div className="absolute left-0 right-0 top-1/2 border-t border-white/[0.07]" />
              <span className="absolute right-[calc(100%+0.5rem)] top-0 -translate-y-1/2 text-[0.58rem] font-medium text-slate-500">
                {maxRatio}
              </span>
              <span className="absolute right-[calc(100%+0.5rem)] bottom-0 translate-y-1/2 text-[0.58rem] font-medium text-slate-500">
                0
              </span>
            </div>
            <span className="mono-detail absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-sky-200/60">
              ordonnee - ratio
            </span>
            <div className="absolute right-1 top-1 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-slate-500/80" aria-hidden="true" />
                V1 1:1
              </span>
              <span className="inline-flex items-center gap-1.5 text-sky-100">
                <span className="h-2 w-2 rounded-sm bg-sky-300" aria-hidden="true" />
                V2
              </span>
            </div>
            <div className="absolute bottom-10 left-8 right-0 top-5 grid grid-cols-2 items-end gap-4 px-4">
              {drivetrainBars.map((item) => (
                <div key={item.motor} className="flex h-full min-w-0 flex-col justify-end">
                  <span className="mono-detail mb-2 text-center text-xs font-semibold text-sky-100">
                    {item.previousRatio} &rarr; {item.ratio}
                  </span>
                  <div className="grid h-full grid-cols-2 items-end gap-1.5">
                    <div
                      className="min-h-1 rounded-t-sm bg-slate-500/80"
                      style={{ height: `${(item.previousValue / maxRatio) * 100}%` }}
                      aria-hidden="true"
                    />
                    <div
                      className="min-h-2 rounded-t-md bg-gradient-to-t from-sky-500 to-sky-200"
                      style={{ height: `${(item.value / maxRatio) * 100}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-8 right-0 grid grid-cols-2 gap-4 px-4">
              {drivetrainBars.map((item) => (
                <p key={item.motor} className="truncate text-center text-[0.58rem] font-medium text-slate-500">
                  {item.motor}
                </p>
              ))}
            </div>
            <p className="mono-detail absolute bottom-0 left-8 right-0 text-center text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-sky-200/60">
              abscisse - moteur
            </p>
          </div>
          <div className="grid gap-2">
            {drivetrainBars.map((item) => (
              <div key={item.motor} className="rounded-md border border-white/10 bg-[#050b12] p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-slate-300">{item.motor}</p>
                  <p className="mono-detail shrink-0 text-sm font-semibold text-sky-100">
                    {item.previousRatio} &rarr; {item.ratio}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, labels }: { project: Project; index: number; labels: ProjectCardLabels }) {
  const media = project.media;

  if (media) {
    const interfaceScreens = media.interfaceScreens ?? [];
    const hasEngineeringMetrics = Boolean(media.engineeringMetrics);

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

            <div className="relative left-1/2 aspect-[16/10] w-screen -translate-x-1/2 overflow-hidden border-y border-sky-200/10 bg-[#071016]">
              <Image
                src={assetPath(media.src)}
                alt={media.alt}
                fill
                sizes="100vw"
                className="object-cover object-top"
                quality={74}
              />
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
              {media.engineeringMetrics ? <EngineeringMetricsChart metrics={media.engineeringMetrics} /> : null}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{media.footer}</p>
            </div>
          </div>

          <div className="mx-auto hidden max-w-[96rem] px-8 pb-10 pt-10 md:block lg:px-14 lg:pt-12">
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="h-5 w-5 shrink-0 rotate-45 border border-sky-400" aria-hidden="true" />
                <p className="mono-detail text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  {media.eyebrow}
                </p>
              </div>
              <span className="shrink-0 rounded-md border border-sky-200/15 bg-black/35 px-3 py-1.5 text-xs font-semibold text-sky-200">
                {media.indexLabel ?? "01 / 04"}
              </span>
            </div>

            <div className="mt-10">
              <h3 className="max-w-4xl text-5xl font-semibold uppercase leading-[1.02] tracking-normal text-white xl:text-6xl">
                {media.headline.map((line, lineIndex) => (
                  <span key={line} className={lineIndex === 2 ? "inline text-sky-400" : "inline"}>
                    {line}
                    {lineIndex < media.headline.length - 1 ? " " : ""}
                  </span>
                ))}
              </h3>
              <div className="mt-6 grid gap-4 lg:grid-cols-[18rem_minmax(0,34rem)]">
                <p className="text-sm font-semibold leading-6 text-white">{media.tagline}</p>
                <p className="text-sm leading-7 text-slate-300">{media.description}</p>
              </div>

              <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border-y border-sky-200/10 bg-[#071016]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(14,165,233,0.16),transparent_22rem)]" aria-hidden="true" />
                <Image
                  src={assetPath(media.desktopSrc ?? media.src)}
                  alt={media.alt}
                  width={1536}
                  height={1024}
                  sizes="100vw"
                  className="relative h-auto w-full"
                  quality={78}
                />
              </div>
            </div>

            <div className="relative z-10 -mx-8 mt-0 border-t border-white/10 bg-[#050b0f] px-8 pt-8 lg:-mx-14 lg:px-14">
              <div
                className={`grid gap-4 lg:items-start ${
                  hasEngineeringMetrics ? "lg:grid-cols-[18rem_minmax(0,1fr)_18rem]" : "lg:grid-cols-[minmax(0,1fr)_18rem]"
                }`}
              >
                <div className="rounded-md border border-white/20 bg-[#070d13] p-4 shadow-2xl shadow-black/24">
                  <p className="mono-detail mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{media.overviewLabel}</p>
                  <div className="grid gap-3.5">
                    {media.features.map((feature) => (
                      <div key={feature.title} className="grid grid-cols-[2rem_1fr] gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/28 bg-black/30 text-xs text-sky-200">
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

                {media.engineeringMetrics ? <EngineeringMetricsChart metrics={media.engineeringMetrics} /> : null}

                <div className="grid gap-4">
                  <div className="rounded-md border border-white/14 bg-[#070d13] px-4 py-3">
                    <p className="mono-detail text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {media.impact.lead} <span className="text-sky-300">{media.impact.highlight}</span>
                    </p>
                  </div>
                  <p className="mono-detail text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-slate-400">
                    {media.footer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {interfaceScreens.length > 0 ? (
            <div className="mx-auto max-w-[96rem] px-5 py-8 md:px-12 md:py-12 lg:px-14">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mono-detail text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                    {media.interfaceLabel ?? "Interface layer"}
                  </p>
                  <h4 className="mt-2 text-2xl font-semibold tracking-normal text-white md:text-3xl">
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
                        src={assetPath(screen.src)}
                        alt={screen.alt}
                        fill
                        sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 100vw"
                        className="object-cover object-left-top"
                        quality={72}
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
      <article className="grid overflow-hidden rounded-lg border border-white/10 bg-[#07080d]/78 shadow-[0_34px_100px_rgba(0,0,0,0.26)] md:grid-cols-[0.86fr_1.14fr]">
        <div className={`relative min-h-72 bg-gradient-to-br ${mediaAccents[project.accent]} p-6`}>
          <div className="absolute inset-0 opacity-35 interface-grid" aria-hidden="true" />
          <div className="relative flex h-full min-h-60 flex-col justify-between">
              <div>
                <p className="mono-detail text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{project.label}</p>
                <h3 className="mt-4 max-w-sm text-4xl font-semibold leading-[0.98] tracking-normal text-white">{project.title}</h3>
              </div>
              <div className="rounded-md border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
                <div className="mono-detail mb-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
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
            <p className="mono-detail mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.problem}</p>
            <p className="text-base leading-7 text-slate-200">{project.problem}</p>
          </div>

          <div>
            <p className="mono-detail mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.architecture}</p>
            <ArchitectureDiagram nodes={project.architecture} accent={project.accent} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mono-detail mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.stack}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mono-detail mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.outcome}</p>
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
