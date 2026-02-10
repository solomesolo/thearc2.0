import { useEffect, useState } from "react";
import type { DayLifeStepId } from "./dayInLifeSteps";

export function useActiveStepObserver(stepIds: DayLifeStepId[]) {
  const [activeStep, setActiveStep] = useState<DayLifeStepId>("upload");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    const setupObserver = () => {
      const elements = stepIds
        .map((id) => document.querySelector(`[data-step="${id}"]`))
        .filter(Boolean) as Element[];

      if (!elements.length) {
        // Retry if elements not found yet
        retryTimeout = setTimeout(setupObserver, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          // Choose the entry closest to center by highest intersection ratio.
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

          if (visible[0]) {
            const id = visible[0].target.getAttribute("data-step") as DayLifeStepId;
            if (id) setActiveStep(id);
          }
        },
        {
          root: null,
          threshold: [0.2, 0.5, 0.8],
          rootMargin: "-45% 0px -45% 0px",
        }
      );

      elements.forEach((el) => observer!.observe(el));
      
      // Set initial active step
      const firstElement = elements[0];
      if (firstElement) {
        const firstId = firstElement.getAttribute("data-step") as DayLifeStepId;
        if (firstId) setActiveStep(firstId);
      }
    };

    const timeoutId = setTimeout(setupObserver, 300);
    
    return () => {
      clearTimeout(timeoutId);
      if (retryTimeout) clearTimeout(retryTimeout);
      if (observer) observer.disconnect();
    };
  }, [stepIds.join(",")]);

  return { activeStep };
}

