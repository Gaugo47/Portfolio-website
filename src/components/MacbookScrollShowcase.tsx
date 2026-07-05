"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Command,
  Globe,
  Mic,
  Moon,
  Play,
  Search,
  SkipBack,
  SkipForward,
  Sun,
  SunDim,
  Table,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/assetPath";
import { ScrambleHover } from "@/components/ui/scramble-hover";

type MacbookScrollShowcaseProps = {
  src: string;
  alt: string;
  title: string;
  eyebrow?: string;
};

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

// Équivalent de useTransform de motion : interpolation linéaire par morceaux, bornée
function interpolate(progress: number, inputs: number[], outputs: number[]) {
  if (progress <= inputs[0]) return outputs[0];
  if (progress >= inputs[inputs.length - 1]) return outputs[outputs.length - 1];

  for (let i = 0; i < inputs.length - 1; i++) {
    if (progress <= inputs[i + 1]) {
      const t = (progress - inputs[i]) / (inputs[i + 1] - inputs[i]);
      return outputs[i] + (outputs[i + 1] - outputs[i]) * t;
    }
  }

  return outputs[outputs.length - 1];
}

// Portage du composant MacBook Scroll d'Aceternity UI (https://ui.aceternity.com/components/macbook-scroll)
// sans dépendance motion : les transforms sont pilotés directement depuis le scroll.
export function MacbookScrollShowcase({ src, alt, title, eyebrow }: MacbookScrollShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const screen = screenRef.current;
    const text = textRef.current;
    if (!section || !screen || !text) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      screen.style.width = "1120px";
      screen.style.height = "565px";
      screen.style.transform = "translate(-50%, 120px) scale(1) rotateX(0deg)";
      text.style.opacity = "1";
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const isMobile = window.innerWidth < 768;
      const isCompactDesktop = window.innerWidth < 1100;
      const rect = section.getBoundingClientRect();
      // Finish the opening early, then keep the screen fixed inside this hero.
      const animationRange = rect.height * (isMobile ? 0.62 : 0.5);
      const progress = clamp(-rect.top / animationRange);
      const sourceRatio = 1766 / 891;
      const openedWidth = isMobile ? 488 : isCompactDesktop ? 900 : 1120;
      const openedHeight = isMobile ? 384 : openedWidth / sourceRatio;
      const frameWidth = isMobile ? 488 : interpolate(progress, [0, 0.34], [672, openedWidth]);
      const frameHeight = isMobile ? 384 : interpolate(progress, [0, 0.34], [378, openedHeight]);

      const startScaleX = isMobile ? 1 : 0.84;
      const startScaleY = isMobile ? 0.6 : 0.6;
      const scaleX = interpolate(progress, [0, 0.34], [startScaleX, 1]);
      const scaleY = interpolate(progress, [0, 0.34], [startScaleY, 1]);
      const translate = interpolate(progress, [0, 0.34, 1], [0, isMobile ? 96 : 120, isMobile ? 96 : 120]);
      const rotate = interpolate(progress, [0.1, 0.12, 0.3], [-28, -28, 0]);
      const textTranslate = interpolate(progress, [0, 0.3], [0, 72]);
      const textOpacity = interpolate(progress, [0, 0.24], [1, 0]);

      screen.style.width = `${frameWidth}px`;
      screen.style.height = `${frameHeight}px`;
      screen.style.willChange = progress < 0.38 ? "transform" : "auto";
      screen.style.transform = `translate(-50%, ${translate}px) scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotate}deg)`;
      text.style.transform = `translateY(${textTranslate}px)`;
      text.style.opacity = String(textOpacity);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="macbook-scroll-showcase relative z-0 flex min-h-[108vh] shrink-0 origin-top flex-col items-center justify-start overflow-visible pt-14 pb-24 [perspective:800px] sm:min-h-[120vh] md:min-h-[135vh] md:pt-14 md:pb-28 lg:min-h-[125vh] lg:pt-10"
      style={{ transform: "scale(min(calc((100vw - 3.25rem) / 32rem), 1))" }}
    >
      <div ref={textRef} className="mb-14 text-center will-change-transform md:mb-16">
        {eyebrow ? (
          <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7cc8ef]/80 md:text-xs">
            <ScrambleHover
              text={eyebrow}
              useOriginalCharsOnly
              scrambleSpeed={38}
              maxIterations={12}
              className="cursor-default"
              scrambledClassName="cursor-default text-[#7cc8ef]"
            />
          </p>
        ) : null}
        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white md:text-5xl">
          {title}
        </h2>
      </div>

      {/* Lid */}
      <div className="relative [perspective:800px]">
        <div
          style={{
            transform: "perspective(800px) rotateX(var(--macbook-lid-rotate)) translateZ(0px)",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="relative h-[12rem] w-[30.5rem] rounded-2xl bg-[#010101] p-2 [--macbook-lid-rotate:-16deg] md:w-[32rem] md:[--macbook-lid-rotate:-25deg]"
        >
          <div
            style={{ boxShadow: "0px 2px 0px 2px #171717 inset" }}
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
          >
            <span className="serif-accent text-2xl text-[#7cc8ef]">gd</span>
          </div>
        </div>
        <div
          ref={screenRef}
          style={{
            transform: "translate(-50%, 0px) scaleX(0.47) scaleY(0.32) rotateX(-28deg)",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
          }}
          className="absolute left-1/2 top-0 h-[23.625rem] w-[42rem] rounded-2xl bg-[#010101] p-2"
        >
          <div className="absolute inset-0 rounded-lg bg-[#272729]" />
          <div className="absolute inset-2 overflow-hidden rounded-lg bg-white">
            <img
              src={assetPath(src)}
              alt={alt}
              className="h-full w-full object-contain object-center"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      {/* Base area */}
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
        {/* above keyboard bar */}
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
      </div>
    </div>
  );
}

function Trackpad() {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
    />
  );
}

function Keypad() {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          esc
        </KBtn>
        <KBtn>
          <SunDim className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <Sun className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <Table className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <Search className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <Mic className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <Moon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <SkipBack className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <Play className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <SkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F9</span>
        </KBtn>
        <KBtn>
          <VolumeX className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <Volume1 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <Volume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn className="w-10 items-end justify-end pb-[2px] pr-[4px]" childrenClassName="items-end">
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          tab
        </KBtn>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
          <KBtn key={letter}>
            <span className="block">{letter}</span>
          </KBtn>
        ))}
        <KBtn>
          <span className="block">{"{"}</span>
          <span className="block">{"["}</span>
        </KBtn>
        <KBtn>
          <span className="block">{"}"}</span>
          <span className="block">{"]"}</span>
        </KBtn>
        <KBtn>
          <span className="block">|</span>
          <span className="block">\</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          caps lock
        </KBtn>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <KBtn key={letter}>
            <span className="block">{letter}</span>
          </KBtn>
        ))}
        <KBtn>
          <span className="block">:</span>
          <span className="block">;</span>
        </KBtn>
        <KBtn>
          <span className="block">&quot;</span>
          <span className="block">&apos;</span>
        </KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pb-[2px] pr-[4px]" childrenClassName="items-end">
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          shift
        </KBtn>
        {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
          <KBtn key={letter}>
            <span className="block">{letter}</span>
          </KBtn>
        ))}
        <KBtn>
          <span className="block">{"<"}</span>
          <span className="block">,</span>
        </KBtn>
        <KBtn>
          <span className="block">{">"}</span>
          <span className="block">.</span>
        </KBtn>
        <KBtn>
          <span className="block">?</span>
          <span className="block">/</span>
        </KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]" childrenClassName="items-end">
          shift
        </KBtn>
      </div>

      {/* Sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <Globe className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <ChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <Command className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <Command className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <ChevronUp className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <ChevronLeft className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <ChevronDown className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <ChevronRight className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function KBtn({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white",
      )}
    >
      <div
        className={cn("flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]", className)}
        style={{
          boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            childrenClassName,
            backlit && "text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

function OptionKey({ className }: { className: string }) {
  return (
    <svg fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
      <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
      <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
      <rect width="32" height="32" stroke="none" />
    </svg>
  );
}
