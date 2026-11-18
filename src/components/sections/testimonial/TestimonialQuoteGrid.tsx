import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";
import { lfSlide } from "@/components/kit/launchfolioReveal";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Testimonial = {
  quote: string;
  highlight?: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt?: string;
};

type TestimonialQuoteGridProps = {
  titleQuiet?: string;
  title: string;
  proofLabel?: string;
  items: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

const splitQuote = (quote: string, highlight?: string) => {
  const at = highlight ? quote.indexOf(highlight) : -1;
  if (!highlight || at < 0) return [quote, "", ""];
  return [quote.slice(0, at), highlight, quote.slice(at + highlight.length)];
};

const TestimonialQuoteGrid = ({ titleQuiet, title, proofLabel, items, ariaLabel, className }: TestimonialQuoteGridProps) => {
  const reduce = useReducedMotion();
  const faces = items.slice(0, 5);

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative border-b border-border py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <LaunchfolioTwoTone quiet={titleQuiet} strong={title} className="min-w-0 max-w-[14em] text-[length:var(--text-h2)] leading-[1] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]" />
          {proofLabel && (
            <motion.div
              initial={reduce ? false : { opacity: 0.001 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex shrink-0 items-center gap-3 lg:pb-[0.4rem]"
            >
              <div className="flex">
                {faces.map((face, index) => (
                  <Media
                    key={`${index}-${face.name}`}
                    src={face.imageSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="-ml-2 size-8 rounded-full object-cover ring-2 ring-background first:ml-0"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <div aria-hidden="true" className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <svg key={star} viewBox="0 0 12 12" className="size-3 text-foreground" fill="currentColor">
                      <path d="M6 .6l1.6 3.4 3.8.4-2.8 2.6.8 3.7L6 8.8 2.6 10.7l.8-3.7L.6 4.4l3.8-.4z" />
                    </svg>
                  ))}
                </div>
                <p className="whitespace-nowrap text-[length:var(--text-small)] font-semibold leading-[1.12] text-muted-foreground">{proofLabel}</p>
              </div>
            </motion.div>
          )}
        </div>
        <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-[clamp(0.75rem,1.2vw,1rem)] lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const [before, lead, after] = splitQuote(item.quote, item.highlight);
            return (
              <motion.li
                key={`${index}-${item.name}`}
                {...lfSlide(index % 6, reduce)}
                className="kit-card flex min-w-0 flex-col p-[clamp(1.25rem,1.8vw,1.5rem)]"
              >
                <svg aria-hidden="true" viewBox="0 0 14 12" className="size-3.5 text-foreground" fill="currentColor">
                  <path d="M0 12V7.2C0 3.4 1.9 1 5.6 0l.7 1.6C4.4 2.3 3.5 3.6 3.4 5.4H6V12H0zm8 0V7.2C8 3.4 9.9 1 13.6 0l.7 1.6c-1.9.7-2.8 2-2.9 3.8H14V12H8z" />
                </svg>
                <blockquote className="mt-4 text-[length:var(--text-small)] leading-[1.6] text-muted-foreground [overflow-wrap:anywhere]">
                  <p>
                    {before}
                    {lead && <strong className="font-medium text-foreground">{lead}</strong>}
                    {after}
                  </p>
                </blockquote>
                <div className="mt-auto flex items-center gap-3 pt-[clamp(1.75rem,3vw,2.75rem)]">
                  <Media
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.name}
                    loading="lazy"
                    decoding="async"
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[length:var(--text-small)] font-semibold leading-[1.3] [overflow-wrap:anywhere]">{item.name}</p>
                    <p className="mt-1 text-[length:var(--text-label)] font-semibold leading-[1.3] text-muted-foreground [overflow-wrap:anywhere]">{item.role}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TestimonialQuoteGrid;
