"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/assetPath";

type QuickLink = { label: string; href: string };

type AsciiHandsFinaleProps = {
  firstName: string;
  lastName: string;
  quickLinks: QuickLink[];
  rights: string;
  note: string;
  backToTop: string;
};

// Rampes de caractères par densité (clair -> dense), inspiré du footer de lukebaffait.fr
const POOLS = [" ", "·.,", ":;`-~^", "=+<>?!", "|/\\()[]{}", "#%&$@"];
// Images des mains (à déposer dans public/footer/) : humaine à gauche, robot à droite
const HAND_LEFT_SRC = "/footer/hand-human.png";
const HAND_RIGHT_SRC = "/footer/hand-robot.png";
// Fallback emoji si une image manque, pour ne jamais casser le footer
const HAND_LEFT_FALLBACK = "\u{1FAF1}"; // 🫱 main tendue vers la droite
const HAND_RIGHT_FALLBACK = "\u{1FAF2}"; // 🫲 main tendue vers la gauche
const DESKTOP_COLS = 92;
const MOBILE_COLS = 76;

type AsciiResult = { text: string; poolGrid: number[][] };

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

// Un pixel est "vide" s'il est transparent (emoji) ou quasi-blanc (fond des photos)
function isEmptyPixel(r: number, g: number, b: number, a: number) {
  return a < 16 || (r > 238 && g > 238 && b > 238);
}

// Convertit un canvas source (image rasterisée) en grille ASCII :
// détecte la boîte englobante du sujet, la recadre, puis mappe l'obscurité -> densité.
function rasterToAscii(srcCanvas: HTMLCanvasElement, cols: number): AsciiResult | null {
  const sw = srcCanvas.width;
  const sh = srcCanvas.height;
  const sctx = srcCanvas.getContext("2d", { willReadFrequently: true });
  if (!sctx) return null;
  const full = sctx.getImageData(0, 0, sw, sh).data;

  let minX = sw;
  let minY = sh;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const i = (y * sw + x) * 4;
      if (!isEmptyPixel(full[i], full[i + 1], full[i + 2], full[i + 3])) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0 || maxX - minX < sw * 0.08) return null;

  const boxW = maxX - minX + 1;
  const boxH = maxY - minY + 1;
  const rows = Math.max(8, Math.round(cols * (boxH / boxW)));
  const small = document.createElement("canvas");
  small.width = cols;
  small.height = rows;
  const dctx = small.getContext("2d", { willReadFrequently: true });
  if (!dctx) return null;
  dctx.drawImage(srcCanvas, minX, minY, boxW, boxH, 0, 0, cols, rows);
  const px = dctx.getImageData(0, 0, cols, rows).data;

  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const lines: string[] = [];
  const poolGrid: number[][] = [];
  for (let y = 0; y < rows; y++) {
    let line = "";
    const poolRow: number[] = [];
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      const a = px[i + 3];
      if (isEmptyPixel(r, g, b, a)) {
        line += " ";
        poolRow.push(-1);
        continue;
      }
      const lum = ((0.299 * r + 0.587 * g + 0.114 * b) / 255) * (a / 255);
      const darkness = 1 - lum;
      const poolIndex = Math.max(1, Math.min(POOLS.length - 1, Math.round(darkness * (POOLS.length - 1) * 1.18)));
      const pool = POOLS[poolIndex];
      line += pool[Math.floor(rand() * pool.length)];
      poolRow.push(poolIndex);
    }
    lines.push(line);
    poolGrid.push(poolRow);
  }
  return { text: lines.join("\n"), poolGrid };
}

// Rasterise une image chargée (avec miroir optionnel) puis la convertit en ASCII
function imageToAscii(img: HTMLImageElement, cols: number, mirror: boolean): AsciiResult | null {
  const maxDim = 620;
  const scale = Math.min(maxDim / img.width, maxDim / img.height, 1) || 1;
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.save();
  if (mirror) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(img, 0, 0, w, h);
  ctx.restore();
  return rasterToAscii(c, cols);
}

// Fallback : rasterise un emoji puis le convertit (rejette le tofu monochrome)
function emojiToAscii(emoji: string, cols: number, mirror: boolean): AsciiResult | null {
  const size = 480;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.save();
  if (mirror) {
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
  }
  ctx.font = `${Math.floor(size * 0.78)}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2);
  ctx.restore();

  const data = ctx.getImageData(0, 0, size, size).data;
  let colorful = 0;
  let opaque = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 20) {
      opaque++;
      if (Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) > 24) colorful++;
    }
  }
  if (opaque === 0 || colorful / opaque < 0.06) return null;
  return rasterToAscii(c, cols);
}

// Effet "décodage" au survol de l'ASCII : les cellules proches du curseur
// flashent des caractères aléatoires sur fond accent, puis se rétablissent.
function attachScramble(preEl: HTMLPreElement, poolGrid: number[][], disposers: (() => void)[]) {
  const rows = poolGrid.length;
  const cols = poolGrid[0]?.length ?? 0;
  if (!rows || !cols) return;

  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const noise: number[][] = [];
  const hitTime: number[][] = [];
  const cellDuration: number[][] = [];
  for (let y = 0; y < rows; y++) {
    const noiseRow: number[] = [];
    const hitRow: number[] = [];
    const durationRow: number[] = [];
    for (let x = 0; x < cols; x++) {
      noiseRow.push(rand() * 2.5);
      hitRow.push(0);
      durationRow.push(300 + rand() * 420);
    }
    noise.push(noiseRow);
    hitTime.push(hitRow);
    cellDuration.push(durationRow);
  }

  let origGrid: string[][] | null = null;
  let origText = "";
  let animating = false;
  let raf = 0;
  const radius = 3.5;

  const esc = (ch: string) => (ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch === "&" ? "&amp;" : ch);

  const tick = () => {
    const now = performance.now();
    let anyActive = false;
    let html = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const poolIndex = poolGrid[y][x];
        if (poolIndex <= 0) {
          html += " ";
          continue;
        }
        const elapsed = now - hitTime[y][x];
        if (hitTime[y][x] > 0 && elapsed < cellDuration[y][x]) {
          anyActive = true;
          const pool = POOLS[POOLS.length - 1 - poolIndex];
          const ch = pool[Math.floor(Math.random() * pool.length)];
          html += `<span style="color:#05070c;background:#7cc8ef">${esc(ch)}</span>`;
        } else {
          html += esc(origGrid?.[y]?.[x] ?? " ");
        }
      }
      html += "\n";
    }
    preEl.innerHTML = html;
    if (anyActive) {
      raf = requestAnimationFrame(tick);
    } else {
      animating = false;
      preEl.textContent = origText;
    }
  };

  const onMove = (e: MouseEvent) => {
    if (!origGrid) {
      origText = preEl.textContent ?? "";
      origGrid = origText.split("\n").map((line) => line.split(""));
    }
    const rect = preEl.getBoundingClientRect();
    const charW = rect.width / cols;
    const charH = rect.height / rows;
    const mxC = (e.clientX - rect.left) / charW;
    const myC = (e.clientY - rect.top) / charH;

    const now = performance.now();
    const maxR = radius + 3;
    const yMin = Math.max(0, Math.floor(myC - maxR));
    const yMax = Math.min(rows - 1, Math.ceil(myC + maxR));
    const xMin = Math.max(0, Math.floor(mxC - maxR));
    const xMax = Math.min(cols - 1, Math.ceil(mxC + maxR));
    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        const dx = x - mxC;
        const dy = y - myC;
        const reach = radius + noise[y][x];
        if (dx * dx + dy * dy < reach * reach) {
          hitTime[y][x] = now;
        }
      }
    }
    if (!animating) {
      animating = true;
      tick();
    }
  };

  preEl.addEventListener("mousemove", onMove);
  disposers.push(() => {
    preEl.removeEventListener("mousemove", onMove);
    cancelAnimationFrame(raf);
  });
}

// Lien avec roulement de caractères au survol (deux copies empilées, décalage par lettre)
function RollLink({ href, label, accent }: { href: string; label: string; accent?: boolean }) {
  return (
    <a href={href} className="focus-ring group relative inline-flex cursor-pointer overflow-hidden text-xs font-semibold text-slate-400">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="flex">
        {Array.from(label).map((ch, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <span
              className="block transition-transform duration-300 ease-out group-hover:-translate-y-full motion-reduce:transform-none"
              style={{ transitionDelay: `${i * 16}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
            <span
              className={`absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full motion-reduce:hidden ${
                accent ? "text-[#a7d9f5]" : "text-white"
              }`}
              style={{ transitionDelay: `${i * 16}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          </span>
        ))}
      </span>
    </a>
  );
}

const preStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono), "SFMono-Regular", Consolas, monospace',
  fontWeight: 500,
  color: "#7cc8ef",
  opacity: 0.78,
  whiteSpace: "pre",
  textShadow: "0 0 24px rgba(124, 200, 239, 0.18)",
};

export function AsciiHandsFinale({ firstName, lastName, quickLinks, rights, note, backToTop }: AsciiHandsFinaleProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftWrapRef = useRef<HTMLDivElement | null>(null);
  const rightWrapRef = useRef<HTMLDivElement | null>(null);
  const leftPreRef = useRef<HTMLPreElement | null>(null);
  const rightPreRef = useRef<HTMLPreElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftWrap = leftWrapRef.current;
    const rightWrap = rightWrapRef.current;
    const leftPre = leftPreRef.current;
    const rightPre = rightPreRef.current;
    const nameEl = nameRef.current;
    if (!section || !leftWrap || !rightWrap || !leftPre || !rightPre || !nameEl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disposers: (() => void)[] = [];

    const render = (preEl: HTMLPreElement, result: AsciiResult | null) => {
      if (!result) return;
      preEl.textContent = result.text;
      if (!reduceMotion) attachScramble(preEl, result.poolGrid, disposers);
    };
    const getCols = () => (window.innerWidth < 768 ? MOBILE_COLS : DESKTOP_COLS);

    // Charge l'image de main ; bascule sur l'emoji si le fichier est absent
    const loadHand = (preEl: HTMLPreElement, src: string, fallbackEmoji: string, fallbackMirror: boolean) => {
      const img = new Image();
      img.onload = () => render(preEl, imageToAscii(img, getCols(), false));
      img.onerror = () => render(preEl, emojiToAscii(fallbackEmoji, getCols(), fallbackMirror));
      img.src = assetPath(src);
    };
    loadHand(leftPre, HAND_LEFT_SRC, HAND_LEFT_FALLBACK, false);
    loadHand(rightPre, HAND_RIGHT_SRC, HAND_RIGHT_FALLBACK, true);

    // Ordre de révélation des lettres : du centre vers l'extérieur
    const leftLetters = Array.from(nameEl.querySelectorAll<HTMLElement>('[data-side="left"]')).reverse();
    const rightLetters = Array.from(nameEl.querySelectorAll<HTMLElement>('[data-side="right"]'));
    const ordered: HTMLElement[] = [];
    for (let i = 0; i < Math.max(leftLetters.length, rightLetters.length); i++) {
      if (rightLetters[i]) ordered.push(rightLetters[i]);
      if (leftLetters[i]) ordered.push(leftLetters[i]);
    }

    if (reduceMotion) {
      return () => {
        disposers.forEach((dispose) => dispose());
      };
    }

    leftWrap.style.transform = "translateX(-100%)";
    rightWrap.style.transform = "translateX(100%)";
    ordered.forEach((el) => {
      el.style.transform = "translateY(115%)";
    });

    // Scrub au scroll : mains qui glissent depuis les bords + lettres qui montent
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const den = Math.min(rect.height, vh * 0.9);
      const progress = clamp01((vh - rect.top) / den);
      const slide = clamp01(progress / 0.62);
      leftWrap.style.transform = `translateX(${(slide - 1) * 100}%)`;
      rightWrap.style.transform = `translateX(${(1 - slide) * 100}%)`;
      ordered.forEach((el, i) => {
        const local = clamp01((progress - 0.34 - i * 0.017) / 0.3);
        const eased = 1 - Math.pow(1 - local, 3);
        el.style.transform = `translateY(${(1 - eased) * 115}%)`;
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    disposers.push(() => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    });

    // Parallaxe souris sur les mains, active uniquement quand le footer est visible
    let mx = 0;
    let my = 0;
    let sx = 0;
    let sy = 0;
    let visible = false;
    let parallaxFrame = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      if (!visible) return;
      sx += (mx - sx) * 0.05;
      sy += (my - sy) * 0.05;
      const lx = Math.min(0, sx * -15 - 15);
      const rx = Math.max(0, sx * 15 + 15);
      const py = sy * -10;
      leftPre.style.transform = `translate(${lx}px, ${py}px)`;
      rightPre.style.transform = `translate(${rx}px, ${py}px)`;
      parallaxFrame = window.requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMouse, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visible = entry.isIntersecting;
        if (visible) {
          window.cancelAnimationFrame(parallaxFrame);
          loop();
        }
      }
    });
    observer.observe(section);
    disposers.push(() => {
      document.removeEventListener("mousemove", onMouse);
      window.cancelAnimationFrame(parallaxFrame);
      observer.disconnect();
    });

    return () => {
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  return (
    <footer ref={sectionRef} className="relative overflow-hidden px-5 pb-4 pt-12 md:px-8 md:pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mono-detail text-xs text-slate-500">{rights}</p>
          <p className="mt-1 text-xs text-slate-500">{note}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {quickLinks.map((link) => (
            <RollLink key={link.label} href={link.href} label={link.label} />
          ))}
          <RollLink href="#top" label={`${backToTop} ↑`} accent />
        </div>
      </div>

      <div className="relative left-1/2 mt-6 h-[38vh] min-h-[15rem] w-screen -translate-x-1/2 sm:left-auto sm:h-[34vh] sm:min-h-[15rem] sm:w-auto sm:translate-x-0 md:h-[46vh]" aria-hidden="true">
        <div className="absolute inset-0 flex justify-between">
          <div ref={leftWrapRef} className="flex h-full w-1/2 origin-left items-center justify-start overflow-hidden will-change-transform">
            <pre ref={leftPreRef} className="ascii-hand-pre pointer-events-auto select-none" style={preStyle} />
          </div>
          <div ref={rightWrapRef} className="flex h-full w-1/2 origin-right items-center justify-end overflow-hidden will-change-transform">
            <pre ref={rightPreRef} className="ascii-hand-pre pointer-events-auto select-none" style={preStyle} />
          </div>
        </div>
      </div>

      <div
        ref={nameRef}
        role="img"
        aria-label={`${firstName} ${lastName}`}
        className="mx-auto flex w-full max-w-[110rem] items-end justify-between gap-[0.4em] whitespace-nowrap pb-2 text-[10.5vw] leading-[0.95]"
      >
        <span
          aria-hidden="true"
          className="font-semibold tracking-[-0.05em] text-white"
          style={{ fontFamily: "var(--font-display), Inter, ui-sans-serif, system-ui, sans-serif" }}
        >
          {Array.from(firstName).map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span data-side="left" className="inline-block will-change-transform">
                {ch}
              </span>
            </span>
          ))}
        </span>
        <span aria-hidden="true" className="serif-accent text-[#a7d9f5]">
          {Array.from(lastName).map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span data-side="right" className="inline-block will-change-transform">
                {ch}
              </span>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
