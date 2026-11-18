import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const CYCLE = { type: "spring", duration: 0.8, bounce: 0 } as const;

type Link = { text: string; href: string };
type Contact = { label: string; text: string; href: string };

type FooterCycleWordmarkProps = {
  brand: string;
  titleLead: string;
  cycleWords: string[];
  titleQuiet?: string;
  contacts?: Contact[];
  socialsLabel?: string;
  socials?: Link[];
  menuTitle?: string;
  links?: Link[];
  copyright?: string;
  ariaLabel?: string;
  className?: string;
};

const FooterCycleWordmark = ({
  brand,
  titleLead,
  cycleWords,
  titleQuiet,
  contacts = [],
  socialsLabel = "Social",
  socials = [],
  menuTitle = "Menu",
  links = [],
  copyright,
  ariaLabel,
  className,
}: FooterCycleWordmarkProps) => {
  const reduce = useReducedMotion();
  const words = cycleWords.filter((word) => word.trim());
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setActive((value) => (value + 1) % words.length), 1500);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const mark = measureRef.current;
    if (!box || !mark) return;
    const fit = () => {
      const width = mark.scrollWidth;
      if (width > 0) setScale(Math.min(1.6, box.clientWidth / width));
    };
    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [brand]);

  const word = words[active % Math.max(1, words.length)] ?? "";
  const columns = contacts.length + (socials.length > 0 ? 1 : 0);

  return (
    <footer aria-label={ariaLabel ?? `${brand} footer`} className={cn("relative -mt-px overflow-hidden bg-deep pt-[var(--section-space)] text-deep-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <motion.h2
          aria-label={[titleLead, words[0], titleQuiet].filter(Boolean).join(" ")}
          initial={reduce ? false : { opacity: 0.001, filter: "blur(5px)", y: 10 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-[18em] text-balance text-[length:var(--text-h1)] leading-[0.95] [overflow-wrap:anywhere]"
        >
          <div className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <p>{titleLead}</p>
            {word && (
              <div aria-hidden="true" className="relative inline-flex">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={`${active}-${word}`}
                    initial={reduce ? false : { opacity: 0, y: "60%", filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-60%", filter: "blur(6px)" }}
                    transition={CYCLE}
                    className="whitespace-nowrap"
                  >
                    {word}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </div>
          {titleQuiet && (
            <p className="text-[color-mix(in_srgb,var(--deep-foreground)_50%,var(--deep))]">
              {titleQuiet}
            </p>
          )}
        </motion.h2>

        {columns > 0 && (
          <div
            className={cn(
              "mt-[clamp(2.5rem,4.5vw,3.5rem)] grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] sm:grid-cols-2",
              columns >= 3 && "lg:grid-cols-3",
              columns >= 4 && "xl:grid-cols-4",
            )}
          >
            {contacts.map((contact, index) => (
              <div key={`${index}-${contact.label}`} className="flex min-w-0 flex-col gap-3">
                <p className="text-[length:var(--text-small)] font-medium leading-[1.2] text-[color-mix(in_srgb,var(--deep-foreground)_55%,var(--deep))]">{contact.label}</p>
                <a
                  href={contact.href}
                  className="w-fit text-[length:var(--text-body-lg)] leading-[1.4] text-deep-foreground [overflow-wrap:anywhere] transition-colors duration-300 hover:text-[color-mix(in_srgb,var(--deep-foreground)_70%,var(--deep))]"
                >
                  {contact.text}
                </a>
              </div>
            ))}
            {socials.length > 0 && (
              <div className="flex min-w-0 flex-col gap-3">
                <p className="text-[length:var(--text-small)] font-medium leading-[1.2] text-[color-mix(in_srgb,var(--deep-foreground)_55%,var(--deep))]">{socialsLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {socials.map((social, index) => (
                    <a
                      key={`${index}-${social.href}`}
                      href={social.href}
                      className="inline-flex min-h-8 items-center rounded-full bg-deep-foreground px-3 text-[length:var(--text-label)] font-semibold leading-[1.12] text-deep transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--deep-foreground)_80%,var(--deep))]"
                    >
                      <p className="whitespace-nowrap">{social.text}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(links.length > 0 || copyright) && (
          <div className="mt-[clamp(1.75rem,3vw,2rem)] flex flex-col gap-6 border-t border-[color-mix(in_srgb,var(--deep-foreground)_22%,var(--deep))] pt-[clamp(1.5rem,2.4vw,2rem)] sm:flex-row sm:items-end sm:justify-between">
            {links.length > 0 && (
              <nav aria-label="Footer" className="flex min-w-0 flex-col gap-3">
                <p className="text-[length:var(--text-label)] font-medium leading-[1.2] text-[color-mix(in_srgb,var(--deep-foreground)_55%,var(--deep))]">{menuTitle}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {links.map((link, index) => (
                    <a
                      key={`${index}-${link.href}`}
                      href={link.href}
                      className="whitespace-nowrap text-[length:var(--text-label)] font-semibold leading-[1.2] text-deep-foreground transition-colors duration-300 hover:text-[color-mix(in_srgb,var(--deep-foreground)_60%,var(--deep))]"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </nav>
            )}
            {copyright && <p className="text-[length:var(--text-label)] font-semibold leading-[1.2] text-[color-mix(in_srgb,var(--deep-foreground)_72%,var(--deep))]">{copyright}</p>}
          </div>
        )}
      </div>

      <div ref={boxRef} aria-hidden="true" className="relative mx-auto mt-[clamp(2.5rem,5vw,4rem)] w-[var(--container)]">
        <p ref={measureRef} className="pointer-events-none invisible absolute left-0 top-0 w-max whitespace-pre font-[family-name:var(--font-heading)] text-[length:var(--text-display)] font-medium leading-[1] tracking-[var(--heading-tracking)]">
          {brand}
        </p>
        <div style={{ height: `calc(var(--text-display) * ${scale} * 0.62)` }} className="relative overflow-hidden">
          <motion.p
            initial={reduce ? false : { opacity: 0.001, y: "30%" }}
            whileInView={{ opacity: 1, y: "0%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ fontSize: `calc(var(--text-display) * ${scale})` }}
            className="whitespace-pre text-center font-[family-name:var(--font-heading)] font-medium leading-[1] tracking-[var(--heading-tracking)] text-deep-foreground"
          >
            {brand}
          </motion.p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </div>
      </div>
    </footer>
  );
};

export default FooterCycleWordmark;
