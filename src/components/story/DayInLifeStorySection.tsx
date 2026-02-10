"use client";

import React, { useState, useEffect, useRef } from "react";
import StoryNarrativeSticky, { StoryStep } from "./StoryNarrativeSticky";
import StageSceneSwitcher from "./StageSceneSwitcher";

export type DayLifeStep = "upload" | "timeline" | "signals" | "action" | "marketplace";

interface DayInLifeStorySectionProps {
  prefersReducedMotion?: boolean;
}

export default function DayInLifeStorySection({
  prefersReducedMotion = false,
}: DayInLifeStorySectionProps) {
  const [activeStep, setActiveStep] = useState<DayLifeStep>("upload");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Scroll handler to detect active step (scrollytelling activation)
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const steps: DayLifeStep[] = ["upload", "timeline", "signals", "action", "marketplace"];
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        // Trigger point: 40% from top of viewport
        const triggerPoint = window.innerHeight * 0.4;
        let active: DayLifeStep = "upload";
        let closestDistance = Infinity;
        let hasVisibleStep = false;

        // Find step closest to trigger point
        steps.forEach((step) => {
          const element = document.getElementById(`story-step-${step}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const distance = Math.abs(stepCenter - triggerPoint);
            
            // Only consider steps that are visible in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              hasVisibleStep = true;
              if (distance < closestDistance) {
                closestDistance = distance;
                active = step;
              }
            }
          }
        });

        // Only update if we found a visible step
        if (hasVisibleStep) {
          setActiveStep(active);
        }
      });
    };

    // Initial call after DOM is ready
    const initTimeout = setTimeout(() => {
      handleScroll();
    }, 800);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(initTimeout);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  const handleStepClick = (step: StoryStep) => {
    setActiveStep(step as DayLifeStep);
    if (typeof window !== "undefined") {
      const element = document.getElementById(`story-step-${step}`);
      if (element) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
      }
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
          <div className="grid grid-cols-12 gap-8 lg:gap-12" style={{ position: "relative" }}>
            {/* Left column - Roadmap steps (scrolls naturally) */}
            <div className="col-span-12 lg:col-span-5">
              {/* Add padding bottom so last step can activate while stage still visible */}
              <div style={{ paddingBottom: "600px" }}>
                <StoryNarrativeSticky
                  activeStep={activeStep}
                  onStepClick={handleStepClick}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>

            {/* Right column - Sticky stage (fixed size, stays in place) */}
            <div className="col-span-12 lg:col-span-7" style={{ position: "relative" }}>
              <div
                style={{
                  position: "sticky",
                  top: "120px", // Fixed position under navbar
                  width: "100%",
                  height: "520px", // Fixed height - stage never resizes
                  zIndex: 10,
                  alignSelf: "flex-start",
                  marginTop: "0",
                }}
              >
                <StageSceneSwitcher
                  activeStep={activeStep}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Mobile: Inline scenes (no sticky) - each step followed by its scene */
          <div className="space-y-12">
            {(["upload", "timeline", "signals", "action", "marketplace"] as StoryStep[]).map(
              (step) => (
                <div key={step} className="space-y-6">
                  {/* Step narrative */}
                  <div>
                    <StoryNarrativeSticky
                      activeStep={step}
                      onStepClick={handleStepClick}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                  {/* Inline scene */}
                  <div className="w-full" style={{ height: "320px" }}>
                    <StageSceneSwitcher
                      activeStep={step as DayLifeStep}
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

