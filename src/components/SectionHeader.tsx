type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeader({ eyebrow, title, copy }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/80">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-normal text-white md:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-300 md:text-lg">{copy}</p>
    </div>
  );
}
