"use client";

import { useEffect, useRef } from "react";
import { ProjectCard, type Project, type ProjectCardLabels } from "@/components/ProjectCard";

type ProjectScrollTrackProps = {
  projects: Project[];
  labels: ProjectCardLabels;
};

export function ProjectScrollTrack({ projects, labels }: ProjectScrollTrackProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      line.style.transform = "scaleY(1)";
      return;
    }

    let animationFrame = 0;

    const updateProgress = () => {
      const rect = track.getBoundingClientRect();
      const startOffset = window.innerHeight * 0.72;
      const endOffset = window.innerHeight * 0.28;
      const total = rect.height + startOffset - endOffset;
      const progress = total > 0 ? (startOffset - rect.top) / total : 0;
      const clampedProgress = Math.min(1, Math.max(0, progress));

      line.style.transform = `scaleY(${clampedProgress})`;
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative mt-2">
      <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px overflow-hidden rounded-full bg-sky-200/12 md:left-6" aria-hidden="true">
        <div
          ref={lineRef}
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-sky-300 via-cyan-200 to-blue-500 shadow-[0_0_24px_rgba(125,211,252,0.65)] will-change-transform"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`relative ${
              project.media ? "py-4" : "grid gap-5 pl-12 md:grid-cols-[3rem_1fr] md:pl-0"
            }`}
          >
            {!project.media ? (
              <div className="absolute left-4 top-10 z-10 md:static md:flex md:justify-center md:pt-10" aria-hidden="true">
                <div className="relative h-5 w-5 rounded-full border border-sky-200/45 bg-slate-950 shadow-[0_0_22px_rgba(125,211,252,0.28)]">
                  <div className="absolute inset-1.5 rounded-full bg-sky-300" />
                </div>
              </div>
            ) : null}
            <ProjectCard project={project} index={index} labels={labels} />
          </div>
        ))}
      </div>
    </div>
  );
}
