"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FeatureCardColor = "orange" | "purple" | "blue" | "emerald";

interface AnimatedFeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  index: string;
  tag: string;
  title: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  color: FeatureCardColor;
}

const colorVariants: Record<
  FeatureCardColor,
  {
    surface: string;
    glow: string;
    tag: string;
    image: string;
  }
> = {
  orange: {
    surface: "from-[#2a281f] via-[#1d1c18] to-[#11110f]",
    glow: "bg-amber-300/14",
    tag: "text-amber-500",
    image: "h-32 w-32",
  },
  purple: {
    surface: "from-[#25222e] via-[#1a1922] to-[#101015]",
    glow: "bg-violet-300/14",
    tag: "text-violet-500",
    image: "h-36 w-36",
  },
  blue: {
    surface: "from-[#20262c] via-[#171d22] to-[#0f1216]",
    glow: "bg-sky-300/14",
    tag: "text-sky-500",
    image: "h-44 w-44",
  },
  emerald: {
    surface: "from-[#1f2a27] via-[#171f1d] to-[#0f1412]",
    glow: "bg-emerald-300/14",
    tag: "text-emerald-500",
    image: "h-32 w-32",
  },
};

const AnimatedFeatureCard = React.forwardRef<HTMLDivElement, AnimatedFeatureCardProps>(
  ({ className, index, tag, title, imageSrc, imageAlt, color, ...props }, ref) => {
    const variant = colorVariants[color];

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex h-full min-h-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_38px_120px_rgba(0,0,0,0.42)] motion-reduce:transform-none",
          variant.surface,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-[36%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-transform duration-300 group-hover:scale-125 motion-reduce:transform-none",
            variant.glow,
          )}
          aria-hidden="true"
        />

        <div className="relative z-10 flex w-full flex-col">
          <p className="mono-detail text-sm font-black text-slate-300">{index}</p>

          <div className="flex min-h-40 flex-1 items-center justify-center pt-5">
            <img
              src={imageSrc}
              alt={imageAlt ?? tag}
              className={cn(
                "object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.34)] transition-transform duration-300 ease-out group-hover:-translate-y-5 group-hover:scale-125 motion-reduce:transform-none",
                variant.image,
              )}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="rounded-lg border border-white/10 bg-black/72 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-sm">
            <span className={cn("inline-flex rounded-full bg-white px-3 py-1 text-[0.68rem] font-black uppercase leading-none", variant.tag)}>
              {tag}
            </span>
            <p className="mt-3 text-[0.98rem] font-semibold leading-6 text-white">{title}</p>
          </div>
        </div>
      </div>
    );
  },
);

AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
