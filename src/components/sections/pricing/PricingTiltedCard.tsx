import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const LOOP_EASE: [number, number, number, number] = [0.44, 0, 0.56, 1];

type Cta = { text: string; href: string };

type Pitch = {
  badge?: string;
  quiet?: string;
  text: string;
  status?: string;
  title: string;
  description?: string;
};

type Plan = {
  name: string;
  descriptionLead?: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  cta: Cta;
};

type PricingTiltedCardProps = {
  titleQuiet?: string;
  title: string;
  noteLead?: string;
  note?: string;
  pitch: Pitch;
  plan: Plan;
  altPlan?: Omit<Plan, "price" | "period">;
  ariaLabel?: string;
  className?: string;
};

const PricingTiltedCard = ({ titleQuiet, title, noteLead, note, pitch, plan, altPlan, ariaLabel, className }: PricingTiltedCardProps) => {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0.001, filter: "blur(5px)", y: 10 },
    whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section aria-label={ariaLabel ?? [titleQuiet, title].filter(Boolean).join(" ")} className={cn("relative border-b border-border py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <LaunchfolioTwoTone
            quiet={titleQuiet}
            strong={title}
            className="min-w-0 max-w-[16em] text-[length:var(--text-h2)] leading-[1] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
          />
          {(noteLead || note) && (
            <motion.p {...reveal(0.2)} className="max-w-[20em] text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground lg:shrink-0 lg:pb-[0.3em]">
              {noteLead && <strong className="block font-semibold text-foreground">{noteLead}</strong>}
              {note}
            </motion.p>
          )}
        </div>

        <div className="mt-[clamp(2rem,5vw,4.5rem)] flex flex-col gap-2 rounded-[var(--radius-card)] bg-secondary p-2">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="kit-card relative flex min-w-0 flex-col gap-4 px-[clamp(1.25rem,2.5vw,2rem)] pb-[clamp(1.5rem,2.5vw,2rem)] pt-[clamp(1rem,2vw,1.5rem)]">
              <motion.div
                initial={reduce ? false : { rotate: 3, x: 0, y: 0 }}
                animate={reduce ? undefined : { rotate: -6, x: 2, y: -5 }}
                transition={{ duration: 7, ease: LOOP_EASE, repeat: Infinity, repeatType: "mirror" }}
                className="relative z-10 -mx-[clamp(0.25rem,1vw,1rem)] -mt-[clamp(1.5rem,3vw,3rem)] flex min-h-[8.5rem] flex-col justify-between gap-6 lg:aspect-[1.6] lg:min-h-[13rem] rounded-[var(--radius-card)] bg-deep p-[clamp(1rem,2vw,1.5rem)] text-deep-foreground"
                style={{ rotate: reduce ? 3 : undefined }}
              >
                {pitch.badge ? (
                  <p className="w-fit max-w-full rounded-[var(--radius-button)] bg-card px-3 py-1.5 text-[length:var(--text-label)] font-semibold leading-[1.12] text-card-foreground">{pitch.badge}</p>
                ) : (
                  <div aria-hidden="true" />
                )}
                <div className="text-balance text-[length:calc(var(--text-h3)*0.72)] font-medium leading-[1.3] tracking-[-0.03em] [overflow-wrap:anywhere]">
                  {pitch.quiet && <p className="font-medium text-deep-foreground/60">{pitch.quiet}</p>}
                  <p>{pitch.text}</p>
                </div>
              </motion.div>
              <div className="flex flex-col gap-4">
                {pitch.status && (
                  <div className="flex w-fit items-center gap-2 rounded-[var(--radius-button)] bg-card px-3 py-1.5 shadow-[inset_0_0_0_1px_var(--border)]">
                    <div aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
                    <p className="text-[length:var(--text-label)] font-semibold leading-[1.12]">{pitch.status}</p>
                  </div>
                )}
                <h3 className="text-balance text-[length:var(--text-h3)] font-medium leading-[1.15] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere]">{pitch.title}</h3>
                {pitch.description && <p className="max-w-[24em] text-[length:var(--text-small)] leading-[1.6] text-card-foreground [overflow-wrap:anywhere]">{pitch.description}</p>}
              </div>
            </div>

            <div className="kit-card flex min-w-0 flex-col gap-4 p-[clamp(1.25rem,2.5vw,2rem)]">
              <div className="flex flex-col gap-4">
                <h3 className="text-balance text-[length:var(--text-h3)] font-medium leading-[1.15] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere]">{plan.name}</h3>
                {(plan.descriptionLead || plan.description) && (
                  <p className="max-w-[30em] text-[length:var(--text-small)] leading-[1.6] text-muted-foreground [overflow-wrap:anywhere]">
                    {plan.descriptionLead && <strong className="font-medium text-card-foreground">{plan.descriptionLead} </strong>}
                    {plan.description}
                  </p>
                )}
              </div>
              <div className="h-px w-full bg-border" />
              <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                <p className="whitespace-nowrap text-[length:calc(var(--text-h3)*1.25)] font-semibold leading-[1.2] tracking-[-0.03em] tabular-nums">{plan.price}</p>
                {plan.period && <p className="pb-[0.45em] text-[length:var(--text-label)] font-semibold leading-[1.12] text-muted-foreground">{plan.period}</p>}
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:gap-x-6">
                {plan.features.map((feature, index) => (
                  <li key={`${index}-${feature}`} className="flex min-w-0 items-start gap-2">
                    <Check aria-hidden="true" className="mt-[0.2em] size-3.5 shrink-0" strokeWidth={2.25} />
                    <p className="text-[length:var(--text-small)] font-medium leading-[1.4] [overflow-wrap:anywhere]">{feature}</p>
                  </li>
                ))}
              </ul>
              <a href={plan.cta.href} className="btn-primary mt-auto w-fit max-w-full">
                {plan.cta.text}
              </a>
            </div>
          </div>

          {altPlan && (
            <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-deep p-[clamp(1.25rem,2.5vw,2rem)] text-deep-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="flex min-w-0 flex-col gap-3 lg:max-w-[22rem]">
                <h3 className="text-balance text-[length:var(--text-h3)] font-medium leading-[1.15] tracking-[var(--heading-tracking)] [overflow-wrap:anywhere]">{altPlan.name}</h3>
                {(altPlan.descriptionLead || altPlan.description) && (
                  <p className="text-[length:var(--text-small)] leading-[1.6] text-deep-foreground/70 [overflow-wrap:anywhere]">
                    {altPlan.descriptionLead && <strong className="font-medium text-deep-foreground">{altPlan.descriptionLead} </strong>}
                    {altPlan.description}
                  </p>
                )}
              </div>
              {altPlan.features.length > 0 && (
                <ul className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-3 lg:flex-1 lg:gap-x-6">
                  {altPlan.features.map((feature, index) => (
                    <li key={`${index}-${feature}`} className="flex min-w-0 items-start gap-2">
                      <Check aria-hidden="true" className="mt-[0.2em] size-3.5 shrink-0" strokeWidth={2.25} />
                      <p className="text-[length:var(--text-small)] font-medium leading-[1.4] [overflow-wrap:anywhere]">{feature}</p>
                    </li>
                  ))}
                </ul>
              )}
              <a href={altPlan.cta.href} className="btn-secondary w-fit max-w-full shrink-0">
                {altPlan.cta.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingTiltedCard;
