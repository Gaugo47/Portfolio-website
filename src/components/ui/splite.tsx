"use client";

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

function SplineFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 opacity-45 interface-grid" aria-hidden="true" />
      <div className="absolute h-52 w-52 rounded-full border border-sky-200/18 bg-sky-300/[0.06] shadow-[0_0_80px_rgba(125,211,252,0.18)]" />
      <div className="relative grid h-28 w-28 place-items-center rounded-full border border-emerald-200/20 bg-black/35 shadow-[0_0_48px_rgba(142,230,168,0.16)]">
        <div className="h-12 w-12 rounded-md border border-sky-200/50 bg-sky-200/[0.08]" />
      </div>
    </div>
  );
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  interactive?: boolean;
  keepAliveMs?: number;
  continuous?: boolean;
}

export function SplineScene({ scene, className, interactive = false, keepAliveMs = 900, continuous = false }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const unloadTimerRef = useRef<number | null>(null);
  const loadedAtRef = useRef(0);
  const [canUse3D, setCanUse3D] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const disposeSpline = useCallback(() => {
    if (unloadTimerRef.current) {
      window.clearTimeout(unloadTimerRef.current);
      unloadTimerRef.current = null;
    }

    splineAppRef.current?.dispose();
    splineAppRef.current = null;
  }, []);

  const handleLoad = useCallback((spline: Application) => {
    splineAppRef.current = spline;
    loadedAtRef.current = window.performance.now();
    spline.renderOnDemand = !(interactive || continuous);
    spline.setGlobalEvents(interactive);
    spline.requestRender();
  }, [continuous, interactive]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapability = () => {
      setCanUse3D(!reducedMotionQuery.matches);
    };

    updateCapability();
    reducedMotionQuery.addEventListener("change", updateCapability);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateCapability);
    };
  }, []);

  useEffect(() => {
    if (!canUse3D) {
      disposeSpline();
      setIsMounted(false);
    }
  }, [canUse3D, disposeSpline]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const spline = splineAppRef.current;
      if (!spline) return;

      if (document.visibilityState === "hidden") {
        spline.stop();
      } else {
        spline.play();
        spline.requestRender();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canUse3D) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (unloadTimerRef.current) {
            window.clearTimeout(unloadTimerRef.current);
            unloadTimerRef.current = null;
          }

          setIsMounted(true);
          splineAppRef.current?.play();
          splineAppRef.current?.requestRender();
          return;
        }

        const elapsedSinceLoad = loadedAtRef.current ? window.performance.now() - loadedAtRef.current : keepAliveMs;
        const delayBeforeUnload = Math.max(keepAliveMs - elapsedSinceLoad, 0);

        unloadTimerRef.current = window.setTimeout(() => {
          splineAppRef.current?.stop();
          disposeSpline();
          setIsMounted(false);
        }, delayBeforeUnload);
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      disposeSpline();
    };
  }, [canUse3D, disposeSpline, keepAliveMs]);

  return (
    <div ref={containerRef} className={className}>
      {canUse3D && isMounted ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="loader"></span>
            </div>
          }
        >
          <Spline scene={scene} className="h-full w-full" onLoad={handleLoad} renderOnDemand={!(interactive || continuous)} />
        </Suspense>
      ) : canUse3D ? (
        <div className="flex h-full w-full items-center justify-center bg-black/18">
          <span className="loader"></span>
        </div>
      ) : (
        <SplineFallback />
      )}
    </div>
  );
}
