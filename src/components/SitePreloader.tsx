"use client";

import { useEffect, useMemo, useState } from "react";
import { assetPath } from "@/lib/assetPath";

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
};

const mobileHeroAssetUrl = "/hero-engineering-desk-mobile.webp";
const desktopHeroAssetUrl = "/hero-engineering-desk-v2.webp";

const backgroundAssetUrls = [
  "/projects/projector-positioning-clean.webp",
  "/projects/blender-lamp-overhead-desk.webp",
];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

function warmImagesSequentially(urls: string[]) {
  let index = 0;

  const loadNext = () => {
    const src = urls[index];
    if (!src) return;

    index += 1;
    void preloadImage(src).then(() => {
      window.setTimeout(loadNext, 180);
    });
  };

  loadNext();
}

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const backgroundAssets = useMemo(() => backgroundAssetUrls, []);

  useEffect(() => {
    let cancelled = false;
    let completed = 0;
    const criticalAssets = [
      window.matchMedia("(max-width: 767px)").matches ? mobileHeroAssetUrl : desktopHeroAssetUrl,
    ];
    const totalSteps = criticalAssets.length + 2;

    document.body.style.overflow = "hidden";

    const updateProgress = () => {
      completed += 1;
      if (!cancelled) {
        setProgress(Math.min(96, Math.round((completed / totalSteps) * 100)));
      }
    };

    const fontPromise = document.fonts
      ? document.fonts.ready.then(updateProgress).catch(updateProgress)
      : Promise.resolve().then(updateProgress);

    const pagePromise = new Promise<void>((resolve) => {
      if (document.readyState !== "loading") {
        resolve();
        return;
      }

      document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
    }).then(updateProgress);

    const imagePromises = criticalAssets.map((src) => preloadImage(assetPath(src)).then(updateProgress));
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 1800));

    Promise.race([Promise.all([fontPromise, pagePromise, ...imagePromises]).then(() => undefined), timeout]).then(() => {
      if (cancelled) return;

      setProgress(100);
      window.setTimeout(() => {
        if (cancelled) return;
        document.body.style.overflow = "";
        setIsVisible(false);

        const warmRest = () => {
          warmImagesSequentially(backgroundAssets.map(assetPath));
        };

        const idleWindow = window as WindowWithIdleCallback;
        if (idleWindow.requestIdleCallback) {
          idleWindow.requestIdleCallback(warmRest, { timeout: 3500 });
        } else {
          window.setTimeout(warmRest, 1200);
        }
      }, 280);
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [backgroundAssets]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-[#020617] text-white">
      <div className="w-[min(34rem,82vw)]">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="mono-detail text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
              Chargement des assets
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Préparation du portfolio
            </p>
          </div>
          <p className="mono-detail text-sm font-semibold text-sky-200">{progress}%</p>
        </div>

        <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-200 via-sky-300 to-blue-500 shadow-[0_0_24px_rgba(125,211,252,0.65)] transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
