"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  hue: "sky" | "white";
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = reduceMotionQuery.matches;
    let width = 0;
    let height = 0;
    let animation = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(92, Math.max(44, Math.floor(width / 24)));
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.093 + 0.093;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 1.25 + 0.45,
          alpha: Math.random() * 0.42 + 0.24,
          hue: Math.random() > 0.22 ? "white" : "sky",
        };
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const glow = context.createRadialGradient(width * 0.52, height * 0.42, 0, width * 0.52, height * 0.42, Math.max(width, height) * 0.58);
      glow.addColorStop(0, "rgba(56,189,248,0.075)");
      glow.addColorStop(0.45, "rgba(15,23,42,0.03)");
      glow.addColorStop(1, "rgba(2,6,23,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -24) p.x = width + 24;
          if (p.x > width + 24) p.x = -24;
          if (p.y < -24) p.y = height + 24;
          if (p.y > height + 24) p.y = -24;
        }

        context.globalAlpha = p.alpha;
        context.fillStyle = p.hue === "sky" ? "rgba(125,211,252,0.8)" : "rgba(248,250,252,0.72)";
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.lineWidth = 1;

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 132) {
            context.globalAlpha = (1 - distance / 132) * 0.36;
            context.strokeStyle = a.hue === "sky" || b.hue === "sky" ? "rgba(125,211,252,0.58)" : "rgba(226,232,240,0.48)";
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      context.globalAlpha = 1;
      if (!reduceMotion) {
        animation = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    reduceMotionQuery.addEventListener("change", resize);

    return () => {
      window.removeEventListener("resize", resize);
      reduceMotionQuery.removeEventListener("change", resize);
      window.cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-80 mix-blend-screen"
    />
  );
}
