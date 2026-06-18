"use client";

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const unloadTimerRef = useRef<number | null>(null);
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
    spline.renderOnDemand = true;
    spline.setGlobalEvents(false);
    spline.requestRender();
  }, []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewportQuery = window.matchMedia("(max-width: 767px)");
    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };

    const updateCapability = () => {
      setCanUse3D(!reducedMotionQuery.matches && !compactViewportQuery.matches && (navigatorWithMemory.deviceMemory ?? 8) >= 4);
    };

    updateCapability();
    reducedMotionQuery.addEventListener("change", updateCapability);
    compactViewportQuery.addEventListener("change", updateCapability);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateCapability);
      compactViewportQuery.removeEventListener("change", updateCapability);
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

        splineAppRef.current?.stop();
        unloadTimerRef.current = window.setTimeout(() => {
          disposeSpline();
          setIsMounted(false);
        }, 900);
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      disposeSpline();
    };
  }, [canUse3D, disposeSpline]);

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
          <Spline scene={scene} className="h-full w-full" onLoad={handleLoad} renderOnDemand />
        </Suspense>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black/18">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}
