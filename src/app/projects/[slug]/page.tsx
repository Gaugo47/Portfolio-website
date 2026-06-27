import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, BarChart3, ExternalLink, Layers3 } from "lucide-react";
import { getProjectDetail, projectDetails } from "@/data/projectDetails";
import { assetPath } from "@/lib/assetPath";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (!project) {
    return {
      title: "Projet introuvable | Gauthier Defoy",
    };
  }

  return {
    title: `${project.title} | Gauthier Defoy`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (!project) {
    notFound();
  }

  const costReduction = project.costReduction;
  const engineeringMetrics = project.engineeringMetrics;
  const maxCost = costReduction
    ? Math.max(costReduction.baseline.totalCost, costReduction.optimized.totalCost)
    : 0;
  const maxWeight = engineeringMetrics
    ? Math.max(engineeringMetrics.weight.beforeKg, engineeringMetrics.weight.afterKg)
    : 0;
  const maxDrivetrainRatio = engineeringMetrics
    ? Math.max(...engineeringMetrics.drivetrain.items.flatMap((item) => [item.previousValue, item.value]))
    : 0;
  const formatEuros = (value: number) => `${value.toLocaleString("fr-FR")} €`;

  const versionOneMediaSources = new Set(project.versionOne?.media.map((item) => item.src) ?? []);
  const displayedSections = project.sections.filter((section) => section.title !== project.versionOne?.label);
  const displayedGallery = project.gallery?.filter((item) => !versionOneMediaSources.has(item.src));

  return (
    <main className="relative min-h-screen overflow-x-clip px-5 py-7 md:px-8 md:py-10">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_76%_12%,rgba(56,189,248,0.16),transparent_28rem),radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.1),transparent_24rem),linear-gradient(180deg,#020617_0%,#050816_46%,#020617_100%)]" />

      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <a
            href={assetPath("/#projects")}
            className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux projets
          </a>
          <a
            href={assetPath("/#contact")}
            className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-200"
          >
            Discuter du projet
            <ExternalLink className="h-4 w-4" />
          </a>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">
              {project.label}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black uppercase leading-[0.86] tracking-[0] text-white md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
              {project.summary}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
            <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Mon rôle
            </p>
            <p className="mt-3 text-base leading-7 text-slate-200">{project.role}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-sky-200/16 bg-sky-200/[0.07] px-3 py-1.5 text-sm text-sky-100">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {project.support ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.24)] lg:col-start-2">
              <div className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-center">
                <div className="overflow-hidden rounded-md border border-white/10 bg-[#07887f]">
                  <img
                    src={assetPath(project.support.logo)}
                    alt={project.support.logoAlt}
                    className="h-auto w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
                    {project.support.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{project.support.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{project.support.body}</p>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {project.heroImage ? (
          <figure className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-[#071016] shadow-[0_36px_110px_rgba(0,0,0,0.32)]">
            <img
              src={assetPath(project.heroImage)}
              alt={project.imageAlt ?? project.title}
              className="h-auto w-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        ) : (
          <div className="mt-10 flex min-h-[22rem] items-center justify-center rounded-lg border border-white/10 bg-[#071016] shadow-[0_36px_110px_rgba(0,0,0,0.32)]">
            <div className="rounded-full border border-sky-200/18 bg-sky-200/[0.07] p-8 text-sky-100">
              <Layers3 className="h-10 w-10" />
            </div>
          </div>
        )}

        {project.video ? (
          <section className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-[#050b0f] shadow-[0_36px_110px_rgba(0,0,0,0.28)]">
            <div className="border-b border-white/10 p-5 md:p-6">
              <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-sky-200/80">
                {project.video.caption}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                {project.video.description}
              </p>
            </div>
            <video
              className="aspect-video w-full bg-[#071016] object-cover"
              controls
              preload="metadata"
              poster={project.video.poster ? assetPath(project.video.poster) : undefined}
            >
              <source src={assetPath(project.video.src)} type="video/mp4" />
            </video>
          </section>
        ) : null}

        {costReduction ? (
          <section className="mt-16 overflow-hidden rounded-lg border border-white/10 bg-[#050b0f] shadow-[0_36px_110px_rgba(0,0,0,0.28)]">
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:p-10">
              <div>
                <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
                  Réduction des coûts
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">
                  {costReduction.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-300">
                  {costReduction.note}
                </p>
                <div className="mt-6 rounded-md border border-emerald-200/18 bg-emerald-200/[0.08] p-4">
                  <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-100/80">
                    {costReduction.saving.label}
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-white">
                    {formatEuros(costReduction.saving.value)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                    {costReduction.saving.detail}
                  </p>
                </div>
              </div>

              <div
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-6"
                role="img"
                aria-label={`${costReduction.baseline.label}: ${formatEuros(costReduction.baseline.totalCost)}. ${costReduction.optimized.label}: ${formatEuros(costReduction.optimized.totalCost)}.`}
              >
                <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Comparaison estimée
                    </p>
                    <p className="mt-2 text-sm text-slate-300">{costReduction.quantityLabel}</p>
                  </div>
                  <p className="mono-detail text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/80">
                    Total contrôleurs
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      ...costReduction.baseline,
                      barClassName: "bg-slate-500/90",
                      textClassName: "text-slate-100",
                    },
                    {
                      ...costReduction.optimized,
                      barClassName: "bg-gradient-to-r from-emerald-400 to-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.34)]",
                      textClassName: "text-emerald-100",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-white">{item.label}</p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatEuros(item.unitCost)} / contrôleur
                          </p>
                        </div>
                        <p className={`mono-detail text-xl font-semibold ${item.textClassName}`}>
                          {formatEuros(item.totalCost)}
                        </p>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-black/35">
                        <div
                          className={`h-full rounded-full ${item.barClassName}`}
                          style={{ width: `${(item.totalCost / maxCost) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
                  <div>
                    <p className="mono-detail text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Avant
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">
                      {formatEuros(costReduction.baseline.totalCost)}
                    </p>
                  </div>
                  <div>
                    <p className="mono-detail text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Après
                    </p>
                    <p className="mt-1 text-lg font-semibold text-emerald-100">
                      {formatEuros(costReduction.optimized.totalCost)}
                    </p>
                  </div>
                  <div>
                    <p className="mono-detail text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Gain
                    </p>
                    <p className="mt-1 text-lg font-semibold text-sky-100">
                      -75%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {project.versionOne ? (
          <section className="mt-16 overflow-hidden rounded-lg border border-white/10 bg-[#050b0f] shadow-[0_36px_110px_rgba(0,0,0,0.28)]">
            <div className="grid gap-8 border-b border-white/10 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <Layers3 className="h-5 w-5 text-emerald-200" aria-hidden="true" />
                  <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
                    {project.versionOne.label}
                  </p>
                </div>
                <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">
                  {project.versionOne.title}
                </h2>
              </div>
              <p className="max-w-4xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                {project.versionOne.body}
              </p>
            </div>

            <div className="grid gap-4 p-6 md:p-8 lg:p-10 xl:grid-cols-3">
              {project.versionOne.media.map((item) => (
                <figure key={item.src} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
                  <div className="relative aspect-[16/10] bg-[#071016]">
                    {item.type === "video" ? (
                      <video
                        className="h-full w-full bg-[#071016] object-cover"
                        controls
                        preload="metadata"
                        poster={item.poster ? assetPath(item.poster) : undefined}
                        aria-label={item.alt}
                      >
                        <source src={assetPath(item.src)} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={assetPath(item.src)}
                        alt={item.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <figcaption className="p-4">
                    <p className="text-sm font-semibold text-slate-100">{item.caption}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {engineeringMetrics ? (
          <section className="mt-16 overflow-hidden rounded-lg border border-white/10 bg-[#050b0f] shadow-[0_36px_110px_rgba(0,0,0,0.28)]">
            <div className="border-b border-white/10 p-6 md:p-8 lg:p-10">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-sky-200" aria-hidden="true" />
                    <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">
                      {engineeringMetrics.label}
                    </p>
                  </div>
                  <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">
                    {engineeringMetrics.title}
                  </h2>
                </div>
                <span className="mono-detail w-fit rounded-full border border-emerald-200/18 bg-emerald-200/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                  {engineeringMetrics.weight.reductionLabel}
                </span>
              </div>
            </div>

            {engineeringMetrics.media && engineeringMetrics.media.length > 0 ? (
              <div className="border-b border-white/10 p-6 md:p-8 lg:p-10">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {engineeringMetrics.media.map((item) => (
                    <figure key={item.src} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
                      <div className="flex aspect-[16/10] items-center justify-center bg-[#071016]">
                        <img
                          src={assetPath(item.src)}
                          alt={item.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <figcaption className="p-4">
                        <p className="text-sm font-semibold text-slate-100">{item.caption}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
              <article className="rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-6">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {engineeringMetrics.weight.label}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">Comparaison de masse entre la première version et la version optimisée.</p>
                  </div>
                  <p className="mono-detail text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/80">
                    kg / version
                  </p>
                </div>

                <div
                  className="grid min-h-72 grid-cols-2 items-end gap-6 rounded-md border border-white/10 bg-black/24 p-5"
                  role="img"
                  aria-label={`${engineeringMetrics.weight.beforeLabel}: ${engineeringMetrics.weight.beforeValue}. ${engineeringMetrics.weight.afterLabel}: ${engineeringMetrics.weight.afterValue}.`}
                >
                  {[
                    {
                      label: engineeringMetrics.weight.beforeLabel,
                      value: engineeringMetrics.weight.beforeKg,
                      displayValue: engineeringMetrics.weight.beforeValue,
                      className: "bg-slate-500/90",
                    },
                    {
                      label: engineeringMetrics.weight.afterLabel,
                      value: engineeringMetrics.weight.afterKg,
                      displayValue: engineeringMetrics.weight.afterValue,
                      className: "bg-gradient-to-t from-emerald-400 to-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.34)]",
                    },
                  ].map((bar) => (
                    <div key={bar.label} className="flex h-60 min-w-0 flex-col justify-end">
                      <p className="mono-detail mb-3 text-center text-lg font-semibold text-white">{bar.displayValue}</p>
                      <div className="flex h-48 items-end">
                        <div
                          className={`w-full min-w-0 rounded-t-md ${bar.className}`}
                          style={{ height: `${(bar.value / maxWeight) * 100}%` }}
                        />
                      </div>
                      <p className="mt-3 truncate text-center text-sm font-medium text-slate-400">{bar.label}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4">
                <article className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {engineeringMetrics.centerOfGravity.label}
                      </p>
                      <p className="mt-2 text-4xl font-semibold text-white">{engineeringMetrics.centerOfGravity.value}</p>
                    </div>
                    <span className="rounded-full border border-sky-200/16 bg-sky-200/[0.07] px-3 py-1 text-xs font-semibold text-sky-100">
                      V2
                    </span>
                  </div>
                  <div className="mt-5 rounded-md border border-white/10 bg-black/24 p-4">
                    <div
                      className="relative h-40 sm:h-32"
                      role="img"
                      aria-label="Axe X du centre de gravité : origine à 0, version 2 placée plus loin sur l’axe, puis version 1 placée 4 centimètres après la version 2."
                    >
                      <div className="absolute left-2 right-4 top-14 h-px bg-white/18" />
                      <div className="absolute right-4 top-[3.15rem] h-2 w-2 rotate-45 border-r border-t border-white/35" />

                      <div className="absolute left-[8%] top-[3.05rem] h-5 w-px bg-slate-500/70" />
                      <div className="absolute left-[8%] top-[3.33rem] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-slate-400/80" />
                      <span className="absolute left-[8%] bottom-12 -translate-x-1/2 text-[0.68rem] font-semibold text-slate-400 sm:bottom-3">0</span>

                      <div className="absolute left-[36%] top-[2.35rem] h-14 w-px bg-sky-200/80" />
                      <div className="absolute left-[36%] top-[3.2rem] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-sky-200 shadow-[0_0_14px_rgba(125,211,252,0.38)]" />
                      <span className="absolute left-[36%] bottom-12 -translate-x-1/2 text-xs font-semibold text-sky-100 sm:bottom-3">V2</span>

                      <div className="absolute left-[80%] top-[2.35rem] h-14 w-px bg-slate-400/80" />
                      <div className="absolute left-[80%] top-[3.25rem] h-3 w-3 -translate-x-1/2 rounded-full bg-slate-400" />
                      <span className="absolute left-[80%] bottom-12 -translate-x-1/2 text-xs font-semibold text-slate-300 sm:bottom-3">V1</span>

                      <div className="absolute left-[36%] right-[20%] top-4 h-px bg-gradient-to-r from-sky-300 to-slate-400" />
                      <div className="absolute left-[36%] top-3 h-2.5 w-px bg-sky-200/80" />
                      <div className="absolute left-[80%] top-3 h-2.5 w-px bg-slate-300/70" />
                      <span className="absolute left-[58%] top-0 -translate-x-1/2 text-xs font-semibold text-slate-100">+4 cm</span>
                      <span className="absolute left-1/2 bottom-5 -translate-x-1/2 whitespace-nowrap text-[0.68rem] font-semibold text-sky-100 sm:left-[58%] sm:bottom-3">
                        écart entre V1 et V2
                      </span>
                      <span className="mono-detail absolute bottom-1 right-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:bottom-3">
                        axe x
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{engineeringMetrics.centerOfGravity.detail}</p>
                </article>

                <article className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {engineeringMetrics.cost.label}
                  </p>
                  <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="rounded-md border border-white/10 bg-black/24 p-3">
                      <p className="mono-detail text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-500">V1</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-100">100%</p>
                    </div>
                    <div className="mono-detail rounded-md border border-emerald-200/18 bg-emerald-200/[0.08] px-3 py-2 text-lg font-semibold text-emerald-100">
                      {engineeringMetrics.cost.value}
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/24 p-3">
                      <p className="mono-detail text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-500">V2</p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-100">≈17%</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{engineeringMetrics.cost.detail}</p>
                </article>
              </div>
            </div>

            <div className="border-t border-white/10 p-6 md:p-8 lg:p-10">
              <article className="rounded-lg border border-white/10 bg-white/[0.035] p-5 md:p-6">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {engineeringMetrics.drivetrain.label}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">Ratios ajoutés pour augmenter le couple disponible sur les axes motorisés.</p>
                  </div>
                  <p className="mono-detail text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/80">
                    ratio / moteur
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div
                    className="grid h-72 grid-cols-2 items-end gap-5 rounded-md border border-white/10 bg-black/24 p-5"
                    role="img"
                    aria-label={engineeringMetrics.drivetrain.items.map((item) => `${item.motor}: ${item.previousRatio} vers ${item.ratio}`).join(". ")}
                  >
                    {engineeringMetrics.drivetrain.items.map((item) => (
                      <div key={item.motor} className="flex h-full min-w-0 flex-col justify-end">
                        <p className="mono-detail mb-3 text-center text-sm font-semibold text-sky-100">
                          {item.previousRatio} → {item.ratio}
                        </p>
                        <div className="grid h-48 grid-cols-2 items-end gap-2">
                          <div
                            className="min-h-1 rounded-t-sm bg-slate-500/80"
                            style={{ height: `${(item.previousValue / maxDrivetrainRatio) * 100}%` }}
                            aria-hidden="true"
                          />
                          <div
                            className="min-h-2 rounded-t-md bg-gradient-to-t from-sky-500 to-sky-200 shadow-[0_0_18px_rgba(125,211,252,0.26)]"
                            style={{ height: `${(item.value / maxDrivetrainRatio) * 100}%` }}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-3 truncate text-center text-xs font-medium text-slate-400">{item.motor}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3">
                    {engineeringMetrics.drivetrain.items.map((item) => (
                      <div key={item.motor} className="rounded-md border border-white/10 bg-black/24 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-100">{item.motor}</p>
                          <p className="mono-detail text-sm font-semibold text-sky-100">
                            {item.previousRatio} → {item.ratio}
                          </p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          {displayedSections.map((section) => (
            <article key={section.title} className="rounded-lg border border-white/10 bg-[#080a10]/72 p-6">
              <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
                {section.title}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-300">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-8 max-w-4xl">
            <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">
              Apprentissages
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">
              Ce que ce projet m’a appris
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {project.learnings.map((learning, index) => (
              <div
                key={learning}
                className="flex min-h-36 flex-col rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.025] p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="mono-detail flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-emerald-200/18 bg-emerald-200/[0.08] text-xs font-semibold text-emerald-100">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-200/24 to-transparent" />
                </div>
                <p className="mt-7 text-sm font-medium leading-6 text-slate-200 md:text-base md:leading-7">{learning}</p>
              </div>
            ))}
          </div>
        </section>

        {displayedGallery && displayedGallery.length > 0 ? (
          <section className="mt-16 py-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">
                  Galerie
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] text-white md:text-5xl">
                  Captures et éléments visuels du projet
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">
                Ces images replacent le prototype dans son contexte d’usage : interface, contrôle, tutoriels et démonstration.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {displayedGallery.map((item) => (
                <figure key={item.src} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
                  <div className={`relative bg-[#071016] ${item.fit === "contain" ? "aspect-video" : "aspect-[16/10]"}`}>
                    {item.type === "video" ? (
                      <video
                        className="h-full w-full bg-[#071016] object-cover"
                        controls
                        preload="metadata"
                        poster={item.poster ? assetPath(item.poster) : undefined}
                        aria-label={item.alt}
                      >
                        <source src={assetPath(item.src)} type="video/mp4" />
                      </video>
                    ) : (
                      <>
                        {item.fit === "contain" ? (
                          <img
                            src={assetPath(item.src)}
                            alt=""
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl"
                            loading="lazy"
                            decoding="async"
                            aria-hidden="true"
                          />
                        ) : null}
                        <img
                          src={assetPath(item.src)}
                          alt={item.alt}
                          className={`relative h-full w-full bg-[#071016] ${
                            item.fit === "contain" ? "object-contain p-2" : "object-cover object-left-top"
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                      </>
                    )}
                  </div>
                  <figcaption className="p-4">
                    <p className="text-sm font-semibold text-slate-100">{item.caption}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
