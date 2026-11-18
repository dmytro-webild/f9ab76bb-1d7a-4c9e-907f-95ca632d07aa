import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";
import { MotionMedia } from "@/components/kit/Media";
import { useImageReady, usePreloadImages } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const HAND: Record<number, [number, number, number][]> = {
  1: [[0, 0, 5]],
  2: [
    [-0.09, -0.06, -6],
    [0.1, 0.07, 8],
  ],
  3: [
    [-0.1, -0.12, 8],
    [0.14, -0.06, 14],
    [-0.04, 0.13, -5],
  ],
  4: [
    [-0.01, -0.16, 10],
    [0.16, -0.17, 15],
    [-0.16, 0.06, -5],
    [0.01, 0.15, 5],
  ],
};

type Pose = { x: number; y: number; rotate: number; scale: number };
type Geo = { top: number; height: number; poses: Pose[] };

type GalleryItem = {
  title: string;
  category?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
};

type GalleryCardHandGridProps = {
  titleQuiet?: string;
  title: string;
  items: GalleryItem[];
  itemLinkText?: string;
  viewAll?: { text: string; href: string };
  ariaLabel?: string;
  className?: string;
};

type CardProps = {
  item: GalleryItem;
  index: number;
  count: number;
  fly: boolean;
  intro: number;
  settled: boolean;
  smooth: MotionValue<number>;
  geo: MotionValue<Geo>;
  linkText?: string;
  cellRef: (el: HTMLDivElement | null) => void;
};

const Card = ({ item, index, count, fly, intro, settled, smooth, geo, linkText, cellRef }: CardProps) => {
  const reduce = useReducedMotion();
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { once: true, margin: "0px 0px -10% 0px" });
  const x = useTransform(() => (geo.get().poses[index]?.x ?? 0) * (1 - smooth.get()));
  const y = useTransform(() => (geo.get().poses[index]?.y ?? 0) * (1 - smooth.get()));
  const rotate = useTransform(() => (geo.get().poses[index]?.rotate ?? 0) * (1 - smooth.get()));
  const scale = useTransform(() => {
    const pose = geo.get().poses[index];
    return pose ? pose.scale + (1 - pose.scale) * smooth.get() : 1;
  });
  const framed = fly && !settled && index < 4;
  const ready = useImageReady(innerRef, inView);
  const shown = fly || (inView && ready);

  const body = (
    <>
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] transition-shadow duration-[600ms] ease-[cubic-bezier(0.68,0,0.22,0.83)]",
          framed && "shadow-[0_0_0_8px_var(--card),0_24px_48px_-16px_color-mix(in_srgb,var(--foreground)_28%,transparent)]",
        )}
      >
        <MotionMedia
          initial={reduce ? false : { scale: 1.12 }}
          animate={shown ? { scale: 1 } : undefined}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: fly ? intro : (index % 2) * 0.1 }}
          src={item.imageSrc}
          alt={item.imageAlt ?? ""}
          loading={fly && index < 4 ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover"
        />
      </div>
      <div className={cn("mt-3 flex items-start justify-between gap-4 transition-opacity duration-[600ms] ease-[cubic-bezier(0.68,0,0.22,0.83)]", framed ? "opacity-0" : "opacity-100")}>
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-[length:var(--text-body-lg)] font-medium leading-[1.3] tracking-[-0.02em] [overflow-wrap:anywhere]">{item.title}</h3>
          {item.category && <p className="text-[length:var(--text-label)] font-semibold leading-[1.2] text-muted-foreground">{item.category}</p>}
          {item.description && <p className="mt-1 text-[length:var(--text-small)] text-muted-foreground leading-relaxed">{item.description}</p>}
        </div>
        {item.href && linkText && (
          <div className="mt-1 flex shrink-0 items-center gap-1 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            <p className="whitespace-nowrap text-[length:var(--text-label)] font-semibold leading-[1.2]">{linkText}</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div ref={cellRef} className="min-w-0">
      <motion.div style={{ x, y, rotate, scale, zIndex: framed ? count - index : undefined }} className="relative">
        <motion.div
          ref={innerRef}
          initial={reduce ? false : { opacity: 0.001, y: 40, filter: "blur(5px)" }}
          animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: fly ? 0.5 : 0.8, ease: EASE, delay: fly ? intro : (index % 2) * 0.1 }}
        >
          {item.href ? (
            <a href={item.href} className="group block text-foreground">
              {body}
            </a>
          ) : (
            <div className="text-foreground">{body}</div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

const GalleryCardHandGrid = ({ titleQuiet, title, items, itemLinkText, viewAll, ariaLabel, className }: GalleryCardHandGridProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  usePreloadImages(sectionRef, "150%");
  const reduce = useReducedMotion();
  const [fly, setFly] = useState(false);
  const [intro, setIntro] = useState(0);
  const [settled, setSettled] = useState(true);
  const geo = useMotionValue<Geo>({ top: 0, height: 1, poses: [] });
  const { scrollY } = useScroll();
  const progress = useTransform(() => {
    const g = geo.get();
    if (!g.poses.length) return 1;
    return Math.min(1, Math.max(0, (scrollY.get() - g.top) / g.height));
  });
  const smooth = useSpring(progress, { stiffness: 1000, damping: 130, mass: 1 });

  useMotionValueEvent(smooth, "change", (value) => setSettled(value > 0.9));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    const media = window.matchMedia("(min-width: 880px)");
    const hero = Array.from(document.querySelectorAll<HTMLElement>("[data-card-hand]")).find((el) => el.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING);
    const slot = hero?.querySelector<HTMLElement>("[data-card-hand-slot]");

    setIntro(Number(hero?.dataset.introDelay) || 0);

    const measure = () => {
      const on = !!hero && !!slot && media.matches && hero.getClientRects().length > 0;
      setFly(on);
      if (!on) {
        geo.set({ top: 0, height: 1, poses: [] });
        smooth.jump(1);
        setSettled(true);
        return;
      }
      const sy = window.scrollY;
      const heroRect = hero.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const count = Math.min(items.length, 4);
      const table = HAND[count] ?? [];
      const poses = table.map(([px, py, rotate], i) => {
        const cell = cellRefs.current[i];
        if (!cell) return { x: 0, y: 0, rotate: 0, scale: 1 };
        const rect = cell.getBoundingClientRect();
        return {
          x: slotRect.left + slotRect.width * (0.5 + px) - (rect.left + rect.width / 2),
          y: slotRect.top + slotRect.height * (0.5 + py) - (rect.top + rect.height / 2),
          rotate,
          scale: (slotRect.width * 0.7) / rect.width,
        };
      });
      geo.set({ top: heroRect.top + sy, height: Math.max(1, heroRect.height), poses });
      smooth.jump(progress.get());
      setSettled(progress.get() > 0.9);
    };

    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    if (hero) observer.observe(hero);
    media.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, [reduce, items.length, geo, smooth, progress]);

  return (
    <section
      ref={sectionRef}
      data-card-hand-grid
      aria-label={ariaLabel ?? [titleQuiet, title].filter(Boolean).join(" ")}
      className={cn("relative overflow-x-clip border-b border-border py-[var(--section-space)] text-foreground", fly && "z-[1]", className)}
    >
      <div className="mx-auto w-[var(--container)]">
        <LaunchfolioTwoTone quiet={titleQuiet} strong={title} className="max-w-[16em] text-[length:var(--text-h2)] leading-[1]" />

        <div className="mt-[clamp(2.5rem,5vw,3.75rem)] grid grid-cols-1 gap-x-[clamp(1rem,1.7vw,1.5rem)] gap-y-[clamp(2rem,3vw,2.5rem)] lg:grid-cols-2">
          {items.map((item, index) => (
            <Card
              key={`${index}-${item.imageSrc}`}
              item={item}
              index={index}
              count={Math.min(items.length, 4)}
              fly={fly}
              intro={intro}
              settled={settled}
              smooth={smooth}
              geo={geo}
              linkText={itemLinkText}
              cellRef={(el) => {
                cellRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        {viewAll && (
          <div className="mt-[clamp(2.5rem,5vw,3.5rem)] flex justify-center">
            <a href={viewAll.href} className="btn-link text-[length:var(--text-body-lg)]">
              {viewAll.text}
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryCardHandGrid;
