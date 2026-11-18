import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Icon, { type IconName } from "@/components/kit/Icon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LaunchfolioTwoTone from "@/components/kit/LaunchfolioTwoTone";
import { lfSlide } from "@/components/kit/launchfolioReveal";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Tool = { name: string; logoSrc?: string; icon?: IconName };
type Service = { title: string; description?: string; icon?: IconName; href?: string };

type FeaturesToolStackListProps = {
  titleQuiet?: string;
  title: string;
  toolsLabel?: string;
  tools?: Tool[];
  items: Service[];
  ariaLabel?: string;
  className?: string;
};

const FeaturesToolStackList = ({ titleQuiet, title, toolsLabel, tools = [], items, ariaLabel, className }: FeaturesToolStackListProps) => {
  const reduce = useReducedMotion();
  const slide = (i: number) => lfSlide(i, reduce);

  return (
    <section aria-label={ariaLabel ?? [titleQuiet, title].filter(Boolean).join(" ")} className={cn("relative border-b border-border py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-2 lg:gap-x-[clamp(2rem,6vw,6rem)]">
        <div className="flex min-w-0 flex-col gap-[clamp(2rem,5vw,4rem)] lg:sticky lg:top-[clamp(5rem,8vw,7rem)] lg:self-start">
          <LaunchfolioTwoTone
            quiet={titleQuiet}
            strong={title}
            className="text-[length:var(--text-h2)] leading-[1] tracking-[var(--heading-tracking)] [overflow-wrap:break-word]"
          />
          {tools.length > 0 && (
            <div className="flex flex-col gap-4">
              {toolsLabel && <p className="text-[length:var(--text-body)] font-medium leading-[1.4] tracking-[-0.02em]">{toolsLabel}</p>}
              <ul className="flex flex-wrap gap-2">
                {tools.map((tool, i) => {
                  const iconOnly = Boolean(tool.logoSrc || tool.icon);
                  return (
                    <motion.li key={`${i}-${tool.name}`} {...slide(i)} className="group relative">
                      <div
                        tabIndex={iconOnly ? 0 : undefined}
                        aria-label={iconOnly ? tool.name : undefined}
                        className={cn(
                          "kit-card flex h-[clamp(3rem,4vw,3.5rem)] items-center justify-center rounded-[calc(var(--radius-card)*0.75)] outline-none transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring",
                          iconOnly ? "aspect-square" : "px-4",
                        )}
                      >
                        {tool.logoSrc ? (
                          <Media src={tool.logoSrc} alt="" loading="lazy" decoding="async" className="size-[45%] object-contain" />
                        ) : tool.icon ? (
                          <Icon name={tool.icon} aria-hidden="true" className="size-[45%]" strokeWidth={1.75} />
                        ) : (
                          <p className="whitespace-nowrap text-[length:var(--text-small)] font-semibold leading-none tracking-[-0.02em]">{tool.name}</p>
                        )}
                      </div>
                      {iconOnly && (
                        <p
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[var(--radius-button)] bg-primary px-2.5 py-1.5 text-[length:var(--text-label)] font-semibold leading-[1.12] tracking-[-0.02em] text-primary-foreground opacity-0 transition-[opacity,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          {tool.name}
                        </p>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <ul className="flex min-w-0 flex-col gap-[clamp(1.75rem,3.2vw,2.5rem)] lg:pt-[0.5rem]">
          {items.map((item, i) => {
            const body = (
              <>
                {item.icon && (
                  <div
                    aria-hidden="true"
                    className="flex size-[clamp(2.5rem,3vw,2.75rem)] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[inset_0_2px_4px_0_rgb(255_255_255_/_0.35),0_0.6px_0.6px_-1.25px_rgb(0_0_0_/_0.18),0_2.3px_2.3px_-2.5px_rgb(0_0_0_/_0.16),0_10px_10px_-3.75px_rgb(0_0_0_/_0.06)] transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:scale-105"
                  >
                    <Icon name={item.icon} className="size-[45%]" strokeWidth={2.25} />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1 pt-[clamp(0.35rem,0.5vw,0.45rem)]">
                  <h3 className="text-pretty text-[length:calc(var(--text-body-lg)*1.22)] leading-[1.3] tracking-[-0.03em] [overflow-wrap:break-word]">{item.title}</h3>
                  {item.description && <p className="max-w-[34em] text-pretty text-[length:var(--text-small)] leading-[1.6] tracking-[-0.01em] text-muted-foreground">{item.description}</p>}
                </div>
                {item.href && <ArrowUpRight aria-hidden="true" className="mt-[0.75rem] size-4 shrink-0 text-muted-foreground transition-colors duration-[var(--dur-fast)] group-hover:text-foreground" strokeWidth={1.75} />}
              </>
            );
            return (
              <motion.li key={`${i}-${item.title}`} {...slide(i)}>
                {item.href ? (
                  <a href={item.href} className="group flex items-start gap-4">
                    {body}
                  </a>
                ) : (
                  <div className="flex items-start gap-4">{body}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesToolStackList;
