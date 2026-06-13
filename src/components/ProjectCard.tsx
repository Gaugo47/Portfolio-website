import { ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";

export type Project = {
  title: string;
  label: string;
  problem: string;
  architecture: string[];
  stack: string[];
  outcome: string;
  mediaLabel: string;
  accent: "green" | "cyan" | "amber";
};

type ProjectCardLabels = {
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
