"use client";

import { BrainCircuit, Cpu, Hand, Radar } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";

const sceneUrl = "https://prod.spline.design/ojIWewmuVPBkMtIz/scene.splinecode";
const moduleIcons = [Radar, BrainCircuit, Cpu, Hand];

type SplineShowcaseProps = {
  labels: {
    eyebrow: string;
    title: string;
    copy: string;
    modules: string[];
    moduleLabel: string;
  };
};

export function SplineShowcase({ labels }: SplineShowcaseProps) {
  return (
    <section id="interactive-3d" className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-white/10 bg-[#07080d]/82 shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:min-h-[34rem] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 lg:p-12">
          <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">{labels.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-balance text-4xl font-semibold leading-[0.98] tracking-normal text-white md:text-6xl">
            {labels.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 md:text-lg">
            {labels.copy}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {labels.modules.map((module, index) => {
              const Icon = moduleIcons[index] ?? Cpu;

              return (
                <div key={module} className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition-colors duration-200 hover:border-sky-200/25 hover:bg-white/[0.055]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-sky-200/18 bg-sky-200/[0.08] text-sky-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="mono-detail text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {labels.moduleLabel} {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-100">{module}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden border-t border-white/10 bg-black lg:min-h-full lg:border-l lg:border-t-0">
          <div className="absolute inset-0 opacity-40 interface-grid" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(125,211,252,0.16),transparent_28rem)]" aria-hidden="true" />
          <SplineScene scene={sceneUrl} className="pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/72 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
