"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

type GlobePoint = {
  city: string;
  lat: number;
  lng: number;
};

export type GlobeRoute = {
  from: GlobePoint;
  to: GlobePoint;
  color?: string;
};

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  routes?: GlobeRoute[];
  activeRouteIndex?: number;
  interactionLabel?: string;
}

type PolygonGeometry = {
  type: "Polygon";
  coordinates: number[][][];
};

type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

type LandFeature = {
  geometry: PolygonGeometry | MultiPolygonGeometry;
  properties?: Record<string, unknown>;
};

type DotData = {
  lng: number;
  lat: number;
};

const landDataUrl =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";

function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

function pointInFeature(point: [number, number], feature: LandFeature): boolean {
  const { geometry } = feature;

  if (geometry.type === "Polygon") {
    if (!pointInPolygon(point, geometry.coordinates[0])) return false;

    for (let index = 1; index < geometry.coordinates.length; index += 1) {
      if (pointInPolygon(point, geometry.coordinates[index])) return false;
    }

    return true;
  }

  for (const polygon of geometry.coordinates) {
    if (!pointInPolygon(point, polygon[0])) continue;

    const isInHole = polygon.slice(1).some((ring) => pointInPolygon(point, ring));
    if (!isInHole) return true;
  }

  return false;
}

function generateDotsInPolygon(feature: LandFeature, dotSpacing = 16) {
  const dots: DotData[] = [];
  const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature as Parameters<typeof d3.geoBounds>[0]);
  const stepSize = dotSpacing * 0.08;

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      if (pointInFeature([lng, lat], feature)) {
        dots.push({ lng, lat });
      }
    }
  }

  return dots;
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  routes = [],
  activeRouteIndex = 0,
  interactionLabel = "Drag to rotate - Scroll to zoom",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRouteRef = useRef(activeRouteIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const routeSegments = useMemo(
    () =>
      routes.map((route) => {
        const interpolate = d3.geoInterpolate([route.from.lng, route.from.lat], [route.to.lng, route.to.lat]);
        return d3.range(0, 1.001, 1 / 72).map((step) => interpolate(step) as [number, number]);
      }),
    [routes],
  );

  useEffect(() => {
    activeRouteRef.current = activeRouteIndex;
  }, [activeRouteIndex]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    let cancelled = false;
    let dimensions = { width: 1, height: 1, radius: 1, dpr: 1 };
    let allDots: DotData[] = [];
    let landFeatures: LandFeature[] = [];
    let autoRotate = true;
    const rotation: [number, number, number] = [0, -8, 0];

    const projection = d3.geoOrthographic().clipAngle(90);
    const path = d3.geoPath().projection(projection).context(context);

    const resize = () => {
      const parentWidth = canvas.parentElement?.clientWidth ?? width;
      const containerWidth = Math.max(280, Math.min(width, parentWidth, window.innerWidth - 40));
      const containerHeight = Math.max(320, Math.min(height, window.innerHeight - 100));
      const radius = Math.min(containerWidth, containerHeight) / 2.45;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      dimensions = { width: containerWidth, height: containerHeight, radius, dpr };
      canvas.width = Math.floor(containerWidth * dpr);
      canvas.height = Math.floor(containerHeight * dpr);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection.scale(radius).translate([containerWidth / 2, containerHeight / 2]).rotate(rotation);
      render();
    };

    const drawRoute = (points: [number, number][], color: string, isActive: boolean) => {
      context.beginPath();

      let isDrawing = false;
      points.forEach((point) => {
        const projected = projection(point);

        if (!projected) {
          isDrawing = false;
          return;
        }

        if (!isDrawing) {
          context.moveTo(projected[0], projected[1]);
          isDrawing = true;
        } else {
          context.lineTo(projected[0], projected[1]);
        }
      });

      context.globalAlpha = isActive ? 0.95 : 0.28;
      context.lineWidth = isActive ? 2.8 : 1.4;
      context.strokeStyle = color;
      context.shadowColor = color;
      context.shadowBlur = isActive ? 18 : 0;
      context.stroke();
      context.shadowBlur = 0;
      context.globalAlpha = 1;
    };

    const drawMarker = (point: GlobePoint, color: string, isActive: boolean) => {
      const projected = projection([point.lng, point.lat]);
      if (!projected) return;

      context.beginPath();
      context.arc(projected[0], projected[1], isActive ? 4.8 : 3.2, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.shadowColor = color;
      context.shadowBlur = isActive ? 18 : 8;
      context.fill();
      context.shadowBlur = 0;
    };

    const render = () => {
      const { width: containerWidth, height: containerHeight, radius } = dimensions;
      const scaleFactor = projection.scale() / radius;

      context.clearRect(0, 0, containerWidth, containerHeight);

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, projection.scale(), 0, 2 * Math.PI);
      context.fillStyle = "#000000";
      context.fill();
      context.strokeStyle = "rgba(248,250,252,0.78)";
      context.lineWidth = 1.4 * scaleFactor;
      context.stroke();

      const graticule = d3.geoGraticule();
      context.beginPath();
      path(graticule());
      context.strokeStyle = "rgba(248,250,252,0.24)";
      context.lineWidth = 0.8 * scaleFactor;
      context.stroke();

      if (landFeatures.length > 0) {
        context.beginPath();
        landFeatures.forEach((feature) => {
          path(feature as Parameters<typeof path>[0]);
        });
        context.strokeStyle = "rgba(248,250,252,0.62)";
        context.lineWidth = 0.9 * scaleFactor;
        context.stroke();

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);

          if (!projected) return;

          context.beginPath();
          context.arc(projected[0], projected[1], 1.15 * scaleFactor, 0, 2 * Math.PI);
          context.fillStyle = "rgba(226,232,240,0.74)";
          context.fill();
        });
      }

      routeSegments.forEach((points, index) => {
        const isActive = index === activeRouteRef.current;
        drawRoute(points, routes[index]?.color ?? (index % 2 === 0 ? "#7dd3fc" : "#8ee6a8"), isActive);
      });

      routes.forEach((route, index) => {
        const isActive = index === activeRouteRef.current;
        const color = isActive ? "#38bdf8" : "rgba(125,211,252,0.72)";
        drawMarker(route.from, color, isActive);
        drawMarker(route.to, isActive ? "#8ee6a8" : color, isActive);
      });
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(landDataUrl);
        if (!response.ok) throw new Error("Failed to load land data");

        const landData = (await response.json()) as { features: LandFeature[] };
        if (cancelled) return;

        landFeatures = landData.features;
        allDots = landFeatures.flatMap((feature) => generateDotsInPolygon(feature, 16));
        render();
        setIsLoading(false);
      } catch {
        if (!cancelled) {
          setError("Failed to load land map data");
          setIsLoading(false);
        }
      }
    };

    const rotationTimer = d3.timer(() => {
      if (!autoRotate) return;

      rotation[0] += 0.22;
      projection.rotate(rotation);
      render();
    });

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number, number] = [...rotation];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.42;
        rotation[0] = startRotation[0] + (moveEvent.clientX - startX) * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (moveEvent.clientY - startY) * sensitivity));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        window.setTimeout(() => {
          autoRotate = true;
        }, 1200);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const nextScale = event.deltaY > 0 ? projection.scale() * 0.9 : projection.scale() * 1.1;
      projection.scale(Math.max(dimensions.radius * 0.6, Math.min(dimensions.radius * 2.2, nextScale)));
      render();
    };

    resize();
    loadWorldData();

    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      cancelled = true;
      rotationTimer.stop();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [height, routeSegments, routes, width]);

  if (error) {
    return (
      <div className={`dark flex items-center justify-center rounded-2xl bg-card p-8 ${className}`}>
        <div className="text-center">
          <p className="mb-2 font-semibold text-destructive">Error loading Earth visualization</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="dark h-auto w-full cursor-grab rounded-2xl bg-background active:cursor-grabbing"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      {isLoading ? (
        <div className="absolute inset-0 grid place-items-center">
          <span className="loader" />
        </div>
      ) : null}
      <div className="dark absolute bottom-4 left-4 rounded-md bg-neutral-900 px-2 py-1 text-xs text-muted-foreground">
        {interactionLabel}
      </div>
    </div>
  );
}
