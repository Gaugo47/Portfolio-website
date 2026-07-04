import { assetPath } from "@/lib/assetPath";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <p className="mono-detail text-xs font-semibold uppercase tracking-[0.24em] text-[#7cc8ef]/80">Erreur 404</p>
      <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white md:text-7xl">
        Cette page n’existe <span className="serif-accent text-[#a7d9f5]">pas encore.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
        Le prototype que vous cherchez a peut-être changé d’adresse. Retournez à l’accueil pour retrouver les projets.
      </p>
      <a
        href={assetPath("/")}
        className="focus-ring mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-sky-200"
      >
        Retour à l’accueil
      </a>
    </main>
  );
}
