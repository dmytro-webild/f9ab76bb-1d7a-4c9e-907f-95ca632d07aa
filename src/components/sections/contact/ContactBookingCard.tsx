import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";
import { lfSlide } from "@/components/kit/launchfolioReveal";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type ContactData = { name: string; email: string; message: string };

type ContactBookingCardProps = {
  titleQuiet?: string;
  title?: string;
  fields?: Partial<{ name: string; email: string; message: string }>;
  submitText?: string;
  successText?: string;
  onSubmit?: (data: ContactData) => void;
  cardQuiet?: string;
  cardTitle?: string;
  cardDescription?: string;
  cta?: { text: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const defaults = { name: "Name", email: "Email", message: "Tell me about your project" };

const ContactBookingCard = ({
  titleQuiet,
  title = "Let's work together",
  fields = defaults,
  submitText = "Send message",
  successText = "Thank you, I will be in touch soon.",
  onSubmit,
  cardQuiet,
  cardTitle = "Book a call",
  cardDescription,
  cta = { text: "Pick a time", href: "#contact" },
  imageSrc,
  imageAlt = "",
  ariaLabel,
  className,
}: ContactBookingCardProps) => {
  const uid = useId();
  const reduce = useReducedMotion();
  const { ease, slow } = useKitMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef);
  const [sent, setSent] = useState(false);
  const labels = { ...defaults, ...fields };

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), message: String(data.get("message") ?? "") });
    setSent(true);
  };

  const slide = (index: number) => (reduce ? {} : lfSlide(index, reduce));

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? [titleQuiet, title].filter(Boolean).join(" ")} className={cn("relative border-b border-border py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <LaunchfolioTwoTone
          quiet={titleQuiet}
          strong={title}
          className="max-w-[16em] text-[length:var(--text-h2)] leading-[1] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)]"
        />

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-[clamp(2.5rem,4vw,3rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-[clamp(1.5rem,3vw,3rem)]">
          <form onSubmit={onSend} className="flex min-w-0 flex-col gap-[clamp(1.5rem,2.4vw,2rem)]">
            <div className="grid grid-cols-1 gap-[clamp(1.5rem,2.4vw,2rem)] sm:grid-cols-2 sm:gap-[var(--gap)]">
              <motion.div {...slide(0)} className="flex min-w-0 flex-col gap-2">
                <label htmlFor={`${uid}-name`} className="text-[length:var(--text-label)] font-semibold leading-[1.12] text-muted-foreground [overflow-wrap:anywhere]">
                  {labels.name}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  disabled={sent}
                  className="w-full min-w-0 border-0 border-b border-border bg-transparent py-3 text-[length:var(--text-body-lg)] text-foreground outline-none transition-colors duration-300 focus:border-foreground disabled:opacity-60"
                />
              </motion.div>
              <motion.div {...slide(1)} className="flex min-w-0 flex-col gap-2">
                <label htmlFor={`${uid}-email`} className="text-[length:var(--text-label)] font-semibold leading-[1.12] text-muted-foreground [overflow-wrap:anywhere]">
                  {labels.email}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={sent}
                  className="w-full min-w-0 border-0 border-b border-border bg-transparent py-3 text-[length:var(--text-body-lg)] text-foreground outline-none transition-colors duration-300 focus:border-foreground disabled:opacity-60"
                />
              </motion.div>
            </div>
            <motion.div {...slide(2)} className="flex min-w-0 flex-col gap-2">
              <label htmlFor={`${uid}-message`} className="text-[length:var(--text-label)] font-semibold leading-[1.12] text-muted-foreground [overflow-wrap:anywhere]">
                {labels.message}
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                required
                rows={5}
                disabled={sent}
                className="w-full min-w-0 resize-none border-0 border-b border-border bg-transparent py-3 text-[length:var(--text-body-lg)] leading-[1.4] text-foreground outline-none transition-colors duration-300 focus:border-foreground disabled:opacity-60"
              />
            </motion.div>
            <motion.div {...slide(3)} className="flex min-h-11 flex-wrap items-center gap-x-6 gap-y-3">
              <button type="submit" disabled={sent} className="btn-primary disabled:cursor-default disabled:opacity-60">
                {submitText}
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    role="status"
                    initial={reduce ? false : { opacity: 0.001, filter: "blur(5px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: slow, ease }}
                    className="min-w-0 text-[length:var(--text-small)] leading-[1.4] text-muted-foreground [overflow-wrap:anywhere]"
                  >
                    {successText}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </form>

          <motion.div
            initial={reduce ? false : { opacity: 0.001, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: slow, ease, delay: 0.15 }}
            className="kit-card flex min-w-0 flex-col items-start p-[clamp(1.5rem,2.6vw,2rem)]"
          >
            {imageSrc && (
              <Media src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" className="size-16 shrink-0 rounded-full object-cover" />
            )}
            <LaunchfolioTwoTone
              as="h3"
              quiet={cardQuiet}
              strong={cardTitle}
              className={cn(
                "text-[length:var(--text-h3)] leading-[1.15] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)]",
                imageSrc && "mt-[clamp(1.5rem,3vw,2.5rem)]"
              )}
            />
            {cardDescription && (
              <p className="mt-4 max-w-[26rem] text-[length:var(--text-small)] leading-[1.6] text-muted-foreground [overflow-wrap:anywhere]">{cardDescription}</p>
            )}
            <div className="mt-auto w-full pt-[clamp(1.75rem,3vw,2.5rem)]">
              <a href={cta.href} className="btn-primary w-full sm:w-auto">
                <CalendarCheck aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
                {cta.text}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactBookingCard;
