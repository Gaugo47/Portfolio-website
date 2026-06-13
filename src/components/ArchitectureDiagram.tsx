import { ArrowRight } from "lucide-react";

type ArchitectureDiagramProps = {
  nodes: string[];
  accent?: "green" | "cyan" | "amber";
};

const accents = {
  green: "border-emerald-300/30 bg-emerald-300/[0.08] text-emerald-100",
  cyan: "border-sky-300/30 bg-sky-300/[0.08] text-sky-100",
  amber: "border-amber-300/30 bg-amber-300/[0.08] text-amber-100",
};

export function ArchitectureDiagram({ nodes, accent = "green" }: ArchitectureDiagramProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
      {nodes.map((node, index) => (
        <div key={node} className="contents">
          <div className={`rounded-md border px-4 py-3 text-sm font-medium ${accents[accent]}`}>{node}</div>
          {index < nodes.length - 1 ? (
            <div className="flex justify-center text-slate-500 md:block" aria-hidden="true">
              <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
