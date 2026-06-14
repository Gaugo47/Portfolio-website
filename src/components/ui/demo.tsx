"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export default function DemoOne() {
  return <RotatingEarth />;
}

export function SplineSceneBasic() {
  return (
    <Card className="relative min-h-[620px] w-full overflow-hidden bg-black/[0.96] md:h-[500px] md:min-h-0">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="flex h-full min-h-[620px] flex-col md:min-h-0 md:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-6 md:p-8">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Interactive 3D
          </h1>
          <p className="mt-4 max-w-lg text-neutral-300">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences that capture attention and
            enhance your design.
          </p>
        </div>

        <div className="relative min-h-[280px] flex-1">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
        </div>
      </div>
    </Card>
  );
}
