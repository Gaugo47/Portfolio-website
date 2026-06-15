type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeader({ eyebrow, title, copy }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 grid max-w-7xl gap-5 border-t border-white/10 pt-7 md:mb-14 md:grid-cols-[0.32fr_0.68fr] md:gap-10 md:pt-9">
      <p className="mono-detail flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
        <span className="h-px w-10 bg-emerald-200/45" aria-hidden="true" />
        {eyebrow}
      </p>
      <div>
        <h2 className="text-balance text-4xl font-semibold leading-[0.98] tracking-normal text-white md:text-6xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg">
          {copy}
        </p>
      </div>
    </div>
  );
}
