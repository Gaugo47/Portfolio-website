import { ScrambleHover } from "@/components/ui/scramble-hover";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
  index?: string;
  titleAccent?: string;
};

export function SectionHeader({ eyebrow, title, copy, index, titleAccent }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 grid max-w-7xl gap-5 border-t border-white/10 pt-8 md:mb-16 md:grid-cols-[0.32fr_0.68fr] md:gap-10 md:pt-10">
      <div className="flex items-start gap-3">
        {index ? (
          <span className="mono-detail text-[0.68rem] font-semibold leading-5 text-slate-600">{index}</span>
        ) : null}
        <p className="mono-detail flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7cc8ef]/80">
          <span className="h-px w-10 bg-[#7cc8ef]/40" aria-hidden="true" />
          <ScrambleHover
            text={eyebrow}
            useOriginalCharsOnly
            scrambleSpeed={38}
            maxIterations={12}
            className="cursor-default"
            scrambledClassName="cursor-default text-[#7cc8ef]"
          />
        </p>
      </div>
      <div>
        <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
          {title}
          {titleAccent ? (
            <>
              {" "}
              <span className="serif-accent text-[#a7d9f5]">{titleAccent}</span>
            </>
          ) : null}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg">
          {copy}
        </p>
      </div>
    </div>
  );
}
