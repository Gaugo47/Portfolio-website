"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import type { Language } from "@/components/NavBar";
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

type RouteMesh = {
  lines: Array<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>>;
  arcPoints: THREE.Vector3[];
  pointsCount: number;
};

const globeRadius = 1.72;
const frameCount = 42;
const frameSize = 768;
const cameraFacingVector = new THREE.Vector3(0, 0, 1);
const worldNorthVector = new THREE.Vector3(0, 1, 0);
const worldEastVector = new THREE.Vector3(1, 0, 0);

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createArcPoints(from: Journey["from"], to: Journey["to"]) {
  const start = latLngToVector3(from.lat, from.lng, globeRadius + 0.045);
  const end = latLngToVector3(to.lat, to.lng, globeRadius + 0.045);
  const distance = start.angleTo(end);
  const altitude = globeRadius + 0.42 + distance * 0.62;
  const mid = start.clone().add(end).normalize().multiplyScalar(altitude);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

  return curve.getPoints(32);
}

function getUniqueCities(journeys: Journey[]) {
  const cities = new Map<string, Journey["from"]>();

  journeys.forEach((journey) => {
    cities.set(`${journey.from.city}-${journey.from.lat}-${journey.from.lng}`, journey.from);
    cities.set(`${journey.to.city}-${journey.to.lat}-${journey.to.lng}`, journey.to);
  });

  return Array.from(cities.values());
}

export function JourneyGlobe({ language, journeys, header, labels }: JourneyGlobeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const globeCardRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [useWebGlobe, setUseWebGlobe] = useState(false);

  const cities = useMemo(() => getUniqueCities(journeys), [journeys]);
  const activeJourney = journeys[activeIndex] ?? journeys[0];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");

    const syncPreference = () => {
      setUseWebGlobe(media.matches);
    };

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => {
      media.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const globeCard = globeCardRef.current;
    const mount = mountRef.current;

    if (!section || !globeCard || !mount || !useWebGlobe || journeys.length === 0) {
      return;
    }

    let cancelled = false;
    let displayCanvas: HTMLCanvasElement | null = document.createElement("canvas");
    let displayContext = displayCanvas.getContext("2d", { alpha: true });
    let frames: HTMLCanvasElement[] = [];
    let currentFrameIndex = -1;

    displayCanvas.className = "relative z-10 h-full w-full";
    mount.appendChild(displayCanvas);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.02, 5.25);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(1);
    renderer.setSize(frameSize, frameSize, false);

    gsap.registerPlugin(ScrollTrigger);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeGeometry = new THREE.SphereGeometry(globeRadius, 36, 36);

    let framesGenerated = false;
    const earthTexture = new THREE.TextureLoader().load("/textures/earth.jpg", () => {
      generateFrames();
    });

    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

    const globe = new THREE.Mesh(
      globeGeometry,
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
      }),
    );

    globeGroup.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius * 1.035, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x8ee6a8,
        opacity: 0.06,
        side: THREE.BackSide,
        transparent: true,
      }),
    );

    globeGroup.add(atmosphere);

    scene.add(new THREE.AmbientLight(0x7dd3fc, 0.8));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-2.5, 3.5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8ee6a8, 1.5);
    rimLight.position.set(3, -1, 2);
    scene.add(rimLight);

    const routeMeshes: RouteMesh[] = journeys.map((journey, index) => {
      const arcPoints = createArcPoints(journey.from, journey.to);
      const geometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
      geometry.setDrawRange(0, 0);

      const material = new THREE.LineBasicMaterial({
        color: index % 2 === 0 ? 0x7dd3fc : 0x8ee6a8,
        linewidth: 2,
        opacity: 0,
        transparent: true,
      });
      const glowMaterial = material.clone();
      const wideGlowMaterial = material.clone();

      const line = new THREE.Line(geometry, material);
      const glowLine = new THREE.Line(geometry, glowMaterial);
      const wideGlowLine = new THREE.Line(geometry, wideGlowMaterial);
      glowLine.scale.setScalar(1.006);
      wideGlowLine.scale.setScalar(1.012);

      globeGroup.add(wideGlowLine);
      globeGroup.add(line);
      globeGroup.add(glowLine);

      return {
        lines: [line, glowLine, wideGlowLine],
        arcPoints,
        pointsCount: geometry.getAttribute("position").count,
      };
    });

    const pointGeometry = new THREE.SphereGeometry(0.026, 8, 8);
    const pointMaterials = new Map<string, THREE.MeshBasicMaterial>();

    cities.forEach((city) => {
      const material = new THREE.MeshBasicMaterial({
        color: 0x7dd3fc,
        opacity: 0.74,
        transparent: true,
      });

      const point = new THREE.Mesh(pointGeometry, material);
      point.position.copy(latLngToVector3(city.lat, city.lng, globeRadius + 0.075));

      globeGroup.add(point);
      pointMaterials.set(city.city, material);
    });

    let latestFocusedRoute = 0;
    let latestRouteProgress = 0;

    const targetQuaternion = new THREE.Quaternion();
    const localBasis = new THREE.Matrix4();
    const worldBasis = new THREE.Matrix4().makeBasis(worldEastVector, worldNorthVector, cameraFacingVector);

    const orientGlobeToRoute = () => {
      const route = routeMeshes[latestFocusedRoute];

      if (!route) {
        return;
      }

      const pointIndex = Math.min(
        route.arcPoints.length - 1,
        Math.max(0, Math.round(latestRouteProgress * (route.arcPoints.length - 1))),
      );

      const focusPoint = route.arcPoints[pointIndex].clone().normalize();
      const localNorth = worldNorthVector.clone().sub(focusPoint.clone().multiplyScalar(worldNorthVector.dot(focusPoint)));

      if (localNorth.lengthSq() < 0.0001) {
        localNorth.copy(new THREE.Vector3(0, 0, -Math.sign(focusPoint.y || 1)));
      } else {
        localNorth.normalize();
      }

      const localEast = localNorth.clone().cross(focusPoint).normalize();

      // Map the focused route point to the camera while keeping geographic north visually upward.
      localBasis.makeBasis(localEast, localNorth, focusPoint);
      targetQuaternion.setFromRotationMatrix(worldBasis.clone().multiply(localBasis.clone().invert()));
      globeGroup.quaternion.copy(targetQuaternion);
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = Math.max(mount.clientHeight, 420);

      if (!displayCanvas) {
        return;
      }

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      displayCanvas.width = Math.max(1, Math.floor(width * pixelRatio));
      displayCanvas.height = Math.max(1, Math.floor(height * pixelRatio));
      displayCanvas.style.width = `${Math.floor(width)}px`;
      displayCanvas.style.height = `${Math.floor(height)}px`;
      drawFrame(currentFrameIndex);
    };

    const setSceneProgress = (progress: number, updateTimeline: boolean) => {
      progressRef.current = progress;

      const nextActiveIndex = Math.min(
        journeys.length - 1,
        Math.floor(clamp(progress, 0, 0.999) * journeys.length),
      );

      if (updateTimeline && activeIndexRef.current !== nextActiveIndex) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }

      const focusedJourney = journeys[nextActiveIndex] ?? journeys[0];
      latestFocusedRoute = nextActiveIndex;

      routeMeshes.forEach((route, index) => {
        const start = index / journeys.length;
        const end = (index + 0.78) / journeys.length;
        const routeProgress = clamp((progress - start) / (end - start));

        if (index === nextActiveIndex) {
          latestRouteProgress = routeProgress;
        }

        route.lines[0].geometry.setDrawRange(
          0,
          routeProgress <= 0 ? 0 : Math.max(2, Math.ceil(route.pointsCount * routeProgress)),
        );

        const routeOpacity = routeProgress <= 0 ? 0 : 0.32 + routeProgress * 0.68;
        route.lines.forEach((line, lineIndex) => {
          line.material.opacity = lineIndex === 0 ? routeOpacity : lineIndex === 1 ? routeOpacity * 0.5 : routeOpacity * 0.28;
        });
      });

      pointMaterials.forEach((material, city) => {
        const isActive = city === focusedJourney.from.city || city === focusedJourney.to.city;

        material.color.set(isActive ? 0x38bdf8 : 0x7dd3fc);
        material.opacity = isActive ? 1 : 0.74;
      });
    };

    const renderSceneToFrame = (progress: number) => {
      setSceneProgress(progress, false);
      orientGlobeToRoute();
      renderer.render(scene, camera);

      const frame = document.createElement("canvas");
      frame.width = frameSize;
      frame.height = frameSize;
      frame.getContext("2d")?.drawImage(renderer.domElement, 0, 0);

      return frame;
    };

    function drawFrame(frameIndex: number) {
      if (!displayCanvas || !displayContext || frameIndex < 0 || frames.length === 0) {
        return;
      }

      const frame = frames[Math.min(frames.length - 1, frameIndex)];
      const bottomReserve = displayCanvas.height * 0.12;
      const size = Math.min(displayCanvas.width * 0.98, displayCanvas.height - bottomReserve);
      const x = (displayCanvas.width - size) / 2;
      const y = Math.max(displayCanvas.height * 0.02, (displayCanvas.height - bottomReserve - size) / 2);

      displayContext.imageSmoothingEnabled = true;
      displayContext.imageSmoothingQuality = "high";
      displayContext.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayContext.drawImage(frame, x, y, size, size);
    }

    const drawProgress = (progress: number) => {
      setSceneProgress(progress, true);

      if (frames.length === 0) {
        return;
      }

      const nextFrame = Math.round(clamp(progress) * (frames.length - 1));

      if (nextFrame !== currentFrameIndex) {
        currentFrameIndex = nextFrame;
        drawFrame(currentFrameIndex);
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: globeCard,
      start: "center center",
      endTrigger: section,
      end: "bottom 92%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: 0.25,
      onUpdate: (self) => {
        drawProgress(self.progress);
      },
    });

    const syncInitialProgress = () => {
      drawProgress(scrollTrigger.progress);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      syncInitialProgress();
    });

    resizeObserver.observe(mount);

    window.addEventListener("resize", resize, { passive: true });

    resize();

    const generateFrames = () => {
      if (cancelled || framesGenerated) {
        return;
      }

      framesGenerated = true;
      frames = Array.from({ length: frameCount }, (_, index) => {
        return renderSceneToFrame(index / (frameCount - 1));
      });

      renderer.forceContextLoss();
      renderer.dispose();
      syncInitialProgress();
    };

    return () => {
      cancelled = true;

      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      scrollTrigger.kill();

      displayCanvas?.remove();
      displayCanvas = null;
      displayContext = null;
      frames = [];

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh | THREE.Line | THREE.Points;

        mesh.geometry?.dispose();

        const material = mesh.material;

        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material?.dispose();
        }
      });

      renderer.dispose();
      earthTexture.dispose();
    };
  }, [cities, journeys, useWebGlobe]);

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-x-clip px-5 py-20 md:min-h-[260vh] md:px-8 md:py-28">
      <div
        className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-sky-200/18 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/80">
            {header.eyebrow}
          </p>

          <h2 className="text-balance text-3xl font-semibold tracking-normal text-white md:text-5xl">
            {header.title}
          </h2>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg">
            {header.copy}
          </p>
        </div>

        <div className="grid gap-9 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
          <div className="relative">
            <div
              ref={globeCardRef}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/25"
            >
              <div className="absolute inset-0 opacity-45 interface-grid" aria-hidden="true" />

              <div
                ref={mountRef}
                className="relative mx-auto hidden aspect-square min-h-[24rem] w-full md:block"
                role="img"
                aria-label={`${activeJourney?.from.city ?? ""} to ${activeJourney?.to.city ?? ""}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(125,211,252,0.2),transparent_16rem)]" />
              </div>

            <div className="relative grid min-h-[23rem] place-items-center p-6 md:hidden">
              <img
                src="/textures/journey-mobile-map.png"
                alt="Globe terrestre sombre avec trajets bleus entre Nantes, Paris et Bangkok"
                className="w-full rounded-md border border-sky-200/20 object-cover shadow-[0_0_70px_rgba(14,165,233,0.22)]"
                loading="lazy"
              />

              <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {labels.simplified}
                </p>
              </div>

              {activeJourney && (
                <div className="absolute bottom-4 left-4 right-4 hidden items-center justify-between rounded-md border border-white/10 bg-black/42 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md md:flex">
                  <span>{labels.route}</span>
                  <span className="text-emerald-200">
                    {activeJourney.from.city} - {activeJourney.to.city}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative md:pt-[42vh] md:pb-[82vh]">
            <div
              className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 md:block"
              aria-hidden="true"
            />

            <div className="grid gap-4 md:gap-[58vh]">
              {journeys.map((journey, index) => {
                const isActive = index === activeIndex;

                return (
                  <div key={`${journey.year}-${journey.to.city}`}>
                    <article
                      className={`relative rounded-lg border p-5 transition-colors duration-300 md:ml-10 ${
                        isActive
                          ? "border-emerald-200/35 bg-emerald-200/[0.08] shadow-2xl shadow-emerald-950/20"
                          : "border-white/10 bg-white/[0.04]"
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
                        <p className="text-sm font-semibold text-emerald-200">{journey.year}</p>

                        <p className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {journey.from.city} - {journey.to.city}
                        </p>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {journey.title[language]}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-300">
                        {journey.description[language]}
                      </p>
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
