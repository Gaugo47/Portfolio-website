"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import type { Language } from "@/components/NavBar";
import type { Journey } from "@/data/journeys";

type LazyJourneyGlobeProps = {
  language: Language;
  journeys: Journey[];
  header: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  labels: {
    route: string;
    simplified: string;
  };
};

function JourneyFallback({ header }: Pick<LazyJourneyGlobeProps, "header">) {
  return (
    <section id="journey" className="relative overflow-x-clip px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid max-w-7xl gap-5 border-t border-white/10 pt-7 md:mb-16 md:grid-cols-[0.32fr_0.68fr] md:gap-10 md:pt-9">
          <p className="mono-detail flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
            <span className="h-px w-10 bg-emerald-200/45" aria-hidden="true" />
            {header.eyebrow}
          </p>
          <div>
            <h2 className="text-balance text-4xl font-semibold leading-[0.98] tracking-normal text-white md:text-6xl">
              {header.title}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg">
              {header.copy}
            </p>
          </div>
        </div>

        <div className="grid min-h-[80vh] gap-9 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-lg border border-white/10 bg-[#07080d]/82 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.34)]">
            <div className="grid min-h-[24rem] place-items-center rounded-lg border border-white/10 bg-black/40">
              <span className="loader" />
            </div>
          </div>
          <div className="grid content-center gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-36 rounded-lg border border-white/10 bg-white/[0.035]"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LazyJourneyGlobe(props: LazyJourneyGlobeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [JourneyGlobe, setJourneyGlobe] = useState<ComponentType<LazyJourneyGlobeProps> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || JourneyGlobe) return;

    let mounted = true;

    void import("@/components/JourneyGlobe").then((module) => {
      if (mounted) {
        setJourneyGlobe(() => module.JourneyGlobe);
      }
    });

    return () => {
      mounted = false;
    };
  }, [JourneyGlobe, shouldLoad]);

  return (
    <div ref={containerRef}>
      {JourneyGlobe ? <JourneyGlobe {...props} /> : <JourneyFallback header={props.header} />}
    </div>
  );
}
