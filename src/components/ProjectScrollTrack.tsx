"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { ProjectCard, type Project, type ProjectCardLabels } from "@/components/ProjectCard";

type ProjectScrollTrackProps = {
  projects: Project[];
  labels: ProjectCardLabels;
};

export function ProjectScrollTrack({ projects, labels }: ProjectScrollTrackProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 28%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
  });

  return (
    <div ref={trackRef} className="relative mt-2">
      <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px overflow-hidden rounded-full bg-sky-200/12 md:left-6" aria-hidden="true">
        <motion.div
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-sky-300 via-cyan-200 to-blue-500 shadow-[0_0_24px_rgba(125,211,252,0.65)]"
          style={{ scaleY: reduceMotion ? 1 : lineScale }}
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
            <motion.div
              initial={reduceMotion ? false : { opacity: 0.38, y: 42, filter: "blur(4px)" }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.42 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
            >
              <ProjectCard project={project} index={index} labels={labels} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
