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
    surface: "from-[#1c2229] via-[#141a20] to-[#0c1015]",
    glow: "bg-[#7cc8ef]/12",
    tag: "text-[#1d6c99]",
    image: "h-32 w-32",
  },
  purple: {
    surface: "from-[#1c2229] via-[#141a20] to-[#0c1015]",
    glow: "bg-[#7cc8ef]/12",
    tag: "text-[#1d6c99]",
    image: "h-36 w-36",
  },
  blue: {
    surface: "from-[#1c2229] via-[#141a20] to-[#0c1015]",
    glow: "bg-[#7cc8ef]/12",
    tag: "text-[#1d6c99]",
    image: "h-44 w-44",
  },
  emerald: {
    surface: "from-[#1c2229] via-[#141a20] to-[#0c1015]",
    glow: "bg-[#7cc8ef]/12",
    tag: "text-[#1d6c99]",
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
          <p className="mono-detail text-sm font-semibold tracking-[0.1em] text-slate-400">{index}</p>

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
            <span className={cn("mono-detail inline-flex rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold uppercase leading-none tracking-[0.14em]", variant.tag)}>
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
