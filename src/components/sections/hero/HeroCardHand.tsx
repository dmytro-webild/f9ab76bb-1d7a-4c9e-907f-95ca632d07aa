import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";
import Media from "@/components/kit/Media";

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

type HandImage = { src: string; alt?: string };
type Button = { text: string; href: string };

type HeroCardHandProps = {
  availability?: string;
  titleQuiet?: string;
  title: string;
  descriptionLead?: string;
  description?: string;
  primaryButton?: Button & { avatarSrc?: string; youText?: string };
  secondaryButton?: Button;
  images: HandImage[];
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const HeroCardHand = ({
  availability,
  titleQuiet,
  title,
  descriptionLead,
  description,
  primaryButton,
  secondaryButton,
  images,
  introDelay = 0,
  ariaLabel,
  className,
}: HeroCardHandProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [paired, setPaired] = useState(false);
  const hand = images.slice(0, 4);
  const poses = HAND[hand.length] ?? [];

  useEffect(() => {
    const el = sectionRef.current;
    const grid = document.querySelector("[data-card-hand-grid]");
    setPaired(!!el && !!grid && !!(el.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING));
  }, []);

  const fade = (delay: number) => (reduce ? {} : { initial: { opacity: 0.001 }, animate: { opacity: 1 }, transition: { duration: 0.6, ease: EASE, delay: introDelay + delay } });

  return (
    <section
      ref={sectionRef}
      data-card-hand
      data-intro-delay={introDelay}
      aria-label={ariaLabel ?? [titleQuiet, title].filter(Boolean).join(" ")}
      className={cn("relative overflow-x-clip border-b border-border pb-[var(--section-space)] pt-[clamp(7.5rem,11vw,9.5rem)] text-foreground", className)}
    >
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 items-center gap-[clamp(3rem,6vw,4rem)] lg:grid-cols-[1.15fr_1fr] lg:gap-[clamp(1rem,2vw,2rem)]">
        <div className="flex min-w-0 flex-col items-start">
          {availability && (
            <motion.div {...fade(0.4)} data-hero-pill className="mb-[clamp(1.25rem,2vw,1.75rem)] inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2.5 pr-3">
              <div aria-hidden="true" className="relative size-2 shrink-0">
                <motion.div
                  animate={reduce ? undefined : { transform: ["scale(1)", "scale(2.4)"], opacity: [0.45, 0] }}
                  transition={{ duration: 2.2, ease: [0, 0, 0.2, 1], repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
                <div className="absolute inset-0 rounded-full bg-accent" />
              </div>
              <p className="truncate text-[length:var(--text-label)] font-semibold leading-[1.12]">{availability}</p>
            </motion.div>
          )}

          <LaunchfolioTwoTone as="h1" quiet={titleQuiet} strong={title} onLoad delay={introDelay + 0.2} className="max-w-[12em] text-[length:var(--text-h1)] leading-[0.95]" />

          {(descriptionLead || description) && (
            <motion.div
              initial={reduce ? false : { opacity: 0.001, filter: "blur(5px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: introDelay + 0.55 }}
              className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[24rem] text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground [overflow-wrap:anywhere]"
            >
              {descriptionLead && <p className="inline font-semibold text-foreground">{descriptionLead}</p>}
              {descriptionLead && description && " "}
              {description && <p className="inline">{description}</p>}
            </motion.div>
          )}

          {(primaryButton || secondaryButton) && (
            <motion.div {...fade(0.4)} className="mt-[clamp(1.75rem,3vw,2.25rem)] flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {primaryButton && (
                <a href={primaryButton.href} data-hero-button className={cn("btn-primary group w-full sm:w-auto", primaryButton.avatarSrc && "pl-2.5")}>
                  {primaryButton.avatarSrc && (
                    <div className="flex shrink-0 items-center">
                      <Media src={primaryButton.avatarSrc} alt="" decoding="async" className="relative z-[1] size-6 shrink-0 rounded-full object-cover" />
                      <p
                        aria-hidden="true"
                        className="flex h-6 w-0 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-foreground text-[0.5625rem] font-semibold leading-none tracking-[-0.02em] text-primary opacity-0 transition-[width,margin,opacity] duration-[400ms] ease-[var(--ease-out)] group-hover:-ml-1.5 group-hover:w-6 group-hover:opacity-100"
                      >
                        {primaryButton.youText ?? "You"}
                      </p>
                    </div>
                  )}
                  {primaryButton.avatarSrc ? <p>{primaryButton.text}</p> : primaryButton.text}
                </a>
              )}
              {secondaryButton && (
                <a href={secondaryButton.href} className="btn-secondary w-full sm:w-auto">
                  {secondaryButton.text}
                </a>
              )}
            </motion.div>
          )}
        </div>

        <div data-card-hand-slot className="relative mx-auto aspect-[5/4] w-full max-w-[28rem] lg:max-w-none">
          <motion.div
            initial={reduce ? false : { opacity: 0.001, scale: 0.8, y: 200 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: introDelay }}
            aria-hidden={paired && !reduce ? true : undefined}
            className={cn("absolute inset-0", paired && !reduce && "lg:invisible")}
          >
            {hand.map((image, index) => {
              const [x, y, rotate] = poses[index];
              return (
                <div
                  key={`${index}-${image.src}`}
                  style={{ left: `${50 + x * 100 - 35}%`, top: `${50 + y * 100}%`, zIndex: hand.length - index, transform: `translateY(-50%) rotate(${rotate}deg)` }}
                  className="absolute aspect-[4/3] w-[70%] overflow-hidden rounded-[var(--radius-image)] shadow-[0_0_0_6px_var(--card),0_24px_48px_-16px_color-mix(in_srgb,var(--foreground)_28%,transparent)]"
                >
                  <Media src={image.src} alt={image.alt ?? ""} loading="eager" decoding="async" className="size-full object-cover" />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroCardHand;
