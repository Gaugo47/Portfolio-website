"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Language } from "@/components/NavBar";
import RotatingEarth, { type GlobeRoute } from "@/components/ui/wireframe-dotted-globe";
import type { Journey } from "@/data/journeys";

type JourneyGlobeProps = {
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

export function JourneyGlobe({ language, journeys, header, labels }: JourneyGlobeProps) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeJourney = journeys[activeIndex] ?? journeys[0];

  const routes = useMemo<GlobeRoute[]>(
    () =>
      journeys.map((journey, index) => ({
        from: journey.from,
        to: journey.to,
        color: index % 2 === 0 ? "#7dd3fc" : "#8ee6a8",
      })),
    [journeys],
  );

  useEffect(() => {
    if (journeys.length === 0) return;

    let animationFrame = 0;

    const syncActiveCard = () => {
      const viewportAnchor = window.innerHeight * 0.52;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const isNearViewport = rect.bottom >= 0 && rect.top <= window.innerHeight;

        if (!isNearViewport) return;

        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportAnchor);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    const requestSync = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(syncActiveCard);
    };

    syncActiveCard();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [journeys.length]);

  return (
    <section id="journey" className="relative overflow-x-clip px-5 py-20 md:px-8 md:py-28">
      <div
        className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-sky-200/18 to-transparent"
        aria-hidden="true"
      />

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

        <div className="grid gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="relative lg:self-stretch">
            <div className="md:sticky md:top-0 md:flex md:min-h-screen md:items-center">
              <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-[#07080d]/82 shadow-[0_40px_120px_rgba(0,0,0,0.34)]">
                <div className="absolute inset-0 opacity-45 interface-grid" aria-hidden="true" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(15,23,42,0.72),transparent_20rem)]" />

                <div
                  className="relative z-10 min-h-[24rem] px-3 py-5 md:px-6 md:py-8"
                  role="img"
                  aria-label={`${activeJourney?.from.city ?? ""} to ${activeJourney?.to.city ?? ""}`}
                >
                  <RotatingEarth
                    width={820}
                    height={620}
                    routes={routes}
                    activeRouteIndex={activeIndex}
                    interactionLabel={
                      language === "fr" ? "Faire glisser pour tourner" : "Drag to rotate"
                    }
                    className="mx-auto"
                  />
                </div>

                {activeJourney ? (
                  <div className="mono-detail absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-md border border-white/10 bg-black/48 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 backdrop-blur-md">
                    <span>{labels.route}</span>
                    <span className="text-emerald-200">
                      {activeJourney.from.city} - {activeJourney.to.city}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 md:block" aria-hidden="true" />

            <div className="grid gap-4 md:gap-0">
              {journeys.map((journey, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={`${journey.year}-${journey.to.city}`}
                    className="md:flex md:min-h-[64vh] md:items-center lg:min-h-[72vh]"
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    data-index={index}
                  >
                    <article
                      className={`relative rounded-lg border p-5 transition-colors duration-300 md:ml-10 ${
                        isActive
                          ? "border-emerald-200/35 bg-emerald-200/[0.08] shadow-2xl shadow-emerald-950/20"
                          : "border-white/10 bg-white/[0.035]"
                      }`}
                    >
                      <span
                        className={`absolute -left-[3.25rem] top-6 hidden h-4 w-4 rounded-full border md:block ${
                          isActive
                            ? "border-emerald-200 bg-emerald-300 shadow-[0_0_22px_rgba(142,230,168,0.65)]"
                            : "border-white/20 bg-slate-950"
                        }`}
                        aria-hidden="true"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="mono-detail text-sm font-semibold text-emerald-200">{journey.year}</p>

                        <p className="mono-detail rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {journey.from.city} - {journey.to.city}
                        </p>
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">{journey.title[language]}</h3>

                      <p className="mt-3 leading-7 text-slate-300">{journey.description[language]}</p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
