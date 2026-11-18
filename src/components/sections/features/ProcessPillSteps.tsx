import { motion, useReducedMotion } from "motion/react";
import Icon, { type IconName } from "@/components/kit/Icon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";
import { lfSlide } from "@/components/kit/launchfolioReveal";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

type Step = {
  title: string;
  description?: string;
  icon?: IconName;
};

type ProcessPillStepsProps = {
  titleQuiet?: string;
  title: string;
  descriptionLead?: string;
  description?: string;
  items: Step[];
  ariaLabel?: string;
  className?: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

const ProcessPillSteps = ({ titleQuiet, title, descriptionLead, description, items, ariaLabel, className }: ProcessPillStepsProps) => {
  const reduce = useReducedMotion();
  const count = items.length;

  return (
    <section aria-label={ariaLabel ?? [titleQuiet, title].filter(Boolean).join(" ")} className={cn("relative border-b border-border py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <LaunchfolioTwoTone
            quiet={titleQuiet}
            strong={title}
            className="min-w-0 max-w-[16em] text-[length:var(--text-h2)] leading-[1] tracking-[var(--heading-tracking)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
          />
          {(descriptionLead || description) && (
            <motion.p
              initial={reduce ? false : { opacity: 0.001, filter: "blur(5px)", y: 10 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="max-w-[24em] text-[length:var(--text-body-lg)] leading-[1.4] text-muted-foreground lg:shrink-0 lg:pb-[0.3em]"
            >
              {descriptionLead && <strong className="font-semibold text-foreground">{descriptionLead} </strong>}
              {description}
            </motion.p>
          )}
        </div>
        <ol
          className={cn(
            "mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-[var(--gap)] sm:grid-cols-2",
            count === 1 && "sm:grid-cols-1 lg:max-w-[50%]",
            count === 3 && "lg:grid-cols-3",
            count === 4 && "xl:grid-cols-4",
            count >= 5 && "lg:grid-cols-3",
            count >= 7 && "xl:grid-cols-4",
          )}
        >
          {items.map((step, index) => (
            <motion.li
              key={`${index}-${step.title}`}
              {...lfSlide(index % 8, reduce)}
              className="kit-card flex min-w-0 flex-col gap-[clamp(1.5rem,3vw,2.5rem)] p-[clamp(1.25rem,2vw,1.5rem)]"
            >
              <div className="flex items-center justify-between gap-4">
                {step.icon && <Icon name={step.icon} aria-hidden="true" className="size-5 shrink-0 text-foreground" strokeWidth={1.75} />}
                <p aria-hidden="true" className="text-[length:var(--text-label)] font-semibold leading-[1.12] text-muted-foreground tabular-nums">{pad(index + 1)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[length:var(--text-body-lg)] font-semibold leading-[1.3] tracking-[-0.02em] [overflow-wrap:anywhere]">{step.title}</h3>
                {step.description && (
                  <p className="text-[length:var(--text-small)] leading-[1.6] text-muted-foreground [overflow-wrap:anywhere]">{step.description}</p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessPillSteps;
