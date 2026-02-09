"use client";

import React, { useState, useEffect, useRef } from "react";
import StoryNarrativeSticky, { StoryStep } from "./StoryNarrativeSticky";
import StoryVisualPanel from "./StoryVisualPanel";

interface DayInLifeStorySectionProps {
  prefersReducedMotion?: boolean;
}

export default function DayInLifeStorySection({
  prefersReducedMotion = false,
}: DayInLifeStorySectionProps) {
  const [activeStep, setActiveStep] = useState<StoryStep>("upload");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<{ [key in StoryStep]?: HTMLDivElement }>({});

  // Check if mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based step detection using Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const steps: StoryStep[] = ["upload", "timeline", "signal", "action", "marketplace"];
    const observers: IntersectionObserver[] = [];

    // Wait for refs to be set
    const checkRefs = () => {
      const allRefsReady = steps.every((step) => stepRefs.current[step]);
      if (!allRefsReady) {
        setTimeout(checkRefs, 100);
        return;
      }

      steps.forEach((step) => {
        const element = stepRefs.current[step];
        if (!element) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Check if this step is in the middle 60% of viewport
                const rect = entry.boundingClientRect;
                const viewportMiddle = window.innerHeight / 2;
                const isInMiddle = rect.top <= viewportMiddle && rect.bottom >= viewportMiddle;

                if (isInMiddle) {
                  setActiveStep(step);
                }
              }
            });
          },
          {
            rootMargin: "-20% 0px -20% 0px", // Trigger when step is in middle 60% of viewport
            threshold: [0, 0.5, 1],
          }
        );

        observer.observe(element);
        observers.push(observer);
      });
    };

    checkRefs();

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isMobile]);

  const handleStepClick = (step: StoryStep) => {
    setActiveStep(step);
    const element = stepRefs.current[step];
    if (element && typeof window !== "undefined") {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20"
      style={{
        backgroundColor: "#060B0C",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-7 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{
              color: "var(--text-muted)",
            }}
          >
            IN PRACTICE
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            style={{
              color: "rgba(231,240,238,0.95)",
              fontWeight: 500,
              letterSpacing: "-0.2px",
            }}
          >
            A day in the life with Arc
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Five minutes. One timeline. Clear next steps.
          </p>
        </div>

        {/* Two-column layout (desktop) or stacked (mobile) */}
        {!isMobile ? (
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {/* Left column - Sticky narrative */}
            <div className="col-span-12 lg:col-span-5">
              <div
                className="sticky top-24"
                style={{
                  maxWidth: "480px",
                }}
              >
                <StoryNarrativeSticky
                  activeStep={activeStep}
                  onStepClick={handleStepClick}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>

            {/* Right column - Visual panel */}
            <div className="col-span-12 lg:col-span-7 relative">
              {/* Invisible anchor points for scroll detection */}
              <div
                ref={(el) => {
                  if (el) stepRefs.current["upload"] = el;
                }}
                className="absolute top-0 h-[100vh] pointer-events-none"
                style={{ top: "-20vh" }}
              />
              <div
                ref={(el) => {
                  if (el) stepRefs.current["timeline"] = el;
                }}
                className="absolute top-[20vh] h-[100vh] pointer-events-none"
              />
              <div
                ref={(el) => {
                  if (el) stepRefs.current["signal"] = el;
                }}
                className="absolute top-[40vh] h-[100vh] pointer-events-none"
              />
              <div
                ref={(el) => {
                  if (el) stepRefs.current["action"] = el;
                }}
                className="absolute top-[60vh] h-[100vh] pointer-events-none"
              />
              <div
                ref={(el) => {
                  if (el) stepRefs.current["marketplace"] = el;
                }}
                className="absolute top-[80vh] h-[100vh] pointer-events-none"
              />
              <div className="sticky top-24">
                <StoryVisualPanel
                  activeStep={activeStep}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Mobile: Stacked layout */
          <div className="space-y-12">
            {(["upload", "timeline", "signal", "action", "marketplace"] as StoryStep[]).map(
              (step) => (
                <div key={step} className="space-y-4">
                  <div
                    ref={(el) => {
                      if (el) stepRefs.current[step] = el;
                    }}
                  >
                    <StoryNarrativeSticky
                      activeStep={step}
                      onStepClick={handleStepClick}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                  <div className="w-full">
                    <StoryVisualPanel
                      activeStep={step}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Footer reassurance */}
        <div className="mt-16 text-center">
          <p
            className="text-sm leading-relaxed max-w-[720px] mx-auto"
            style={{
              color: "var(--text-muted)",
            }}
          >
            Arc does not make medical decisions. It helps you see clearly so you can decide
            deliberately.
          </p>
        </div>
      </div>
    </section>
  );
}

