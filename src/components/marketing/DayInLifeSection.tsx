"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DAYLIFE_STEPS, type DayLifeStepId } from "./dayInLifeSteps";
import StageSceneSwitcher from "./StageSceneSwitcher";
import { usePinnedStage } from "./usePinnedStage";

export default function DayInLifeSection() {
  const [activeStep, setActiveStep] = useState<DayLifeStepId>("upload");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageWrapRef = useRef<HTMLDivElement | null>(null);
  const stageStyle = usePinnedStage(sectionRef as any, 520, 120);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStepChange = useCallback((step: DayLifeStepId) => {
    setActiveStep(step);
  }, []);

  // Scroll detection for desktop scrollytelling
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      rafId = requestAnimationFrame(() => {
        const stepsContainer = document.getElementById("daylife-steps");
        if (!stepsContainer) {
          ticking = false;
          return;
        }

        const viewportCenter = window.innerHeight * 0.4;
        let closestStep: DayLifeStepId | null = null;
        let closestDistance = Infinity;

        DAYLIFE_STEPS.forEach((step) => {
          const element = document.querySelector(`[data-step="${step.id}"]`) as HTMLElement;
          if (element) {
            const rect = element.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const distance = Math.abs(stepCenter - viewportCenter);

            if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
              if (distance < closestDistance) {
                closestDistance = distance;
                closestStep = step.id;
              }
            }
          }
        });

        if (closestStep && closestStep !== activeStep) {
          console.log("[DayInLife] Changing step from", activeStep, "to", closestStep);
          handleStepChange(closestStep);
        }

        ticking = false;
      });
    };

    // Wait a bit for DOM to be ready
    const timeout = setTimeout(() => {
      console.log("[DayInLife] Setting up scroll listener, found steps:", DAYLIFE_STEPS.map(s => {
        const el = document.querySelector(`[data-step="${s.id}"]`);
        return `${s.id}: ${el ? 'found' : 'missing'}`;
      }).join(', '));
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };

  }, [activeStep, handleStepChange, isMobile]);

  // Mobile: inline scenes
  if (isMobile) {
    return (
      <section id="day-in-life" className="relative w-full py-24" style={{ backgroundColor: "var(--bg)" }}>
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <div className="mb-10 text-center">
            <div className="text-xs tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>IN PRACTICE</div>
            <h2 className="mt-3 text-4xl font-semibold" style={{ color: "var(--text)" }}>A day in the life with Arc</h2>
            <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>Five minutes. One timeline. Clear next steps.</p>
          </div>
          <div className="space-y-12">
            {DAYLIFE_STEPS.map((step) => (
              <div key={step.id} className="space-y-6">
                <div className="min-h-[220px] relative pl-6">
                  <div className="absolute left-[10px] top-0 h-full w-px" style={{ backgroundColor: "var(--accent-soft)" }} />
                  {activeStep === step.id && (
                    <div className="absolute left-[6px] top-[6px] w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  )}
                  <div className="text-xs font-semibold uppercase mb-2" style={{ color: activeStep === step.id ? "var(--accent)" : "var(--text-muted)" }}>
                    {step.label}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: activeStep === step.id ? "var(--text)" : "var(--text-muted)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: activeStep === step.id ? "var(--text-muted)" : "var(--text-muted)" }}>
                    {step.body}
                  </p>
                  <div className="mb-4 p-3 rounded-[8px] border" style={{ backgroundColor: activeStep === step.id ? "var(--accent-soft)" : "var(--surface-2)", borderColor: activeStep === step.id ? "var(--accent)" : "var(--border)" }}>
                    <p className="text-[10px] font-medium uppercase mb-1" style={{ color: "var(--text-muted)" }}>What you see:</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {step.whatYouSee}
                    </p>
                  </div>
                  <div className="text-xs font-medium inline-flex items-center gap-1" style={{ color: activeStep === step.id ? "var(--accent)" : "var(--text-muted)" }}>
                    {step.cta.text}
                  </div>
                </div>
                <div className="w-full">
                  <StageSceneSwitcher activeStep={step.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: scrollytelling layout - SIMPLIFIED like reference site
  return (
    <section ref={sectionRef as any} id="day-in-life" className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto w-full max-w-[1400px] px-6">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="text-xs tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>IN PRACTICE</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold" style={{ color: "var(--text)" }}>A day in the life with Arc</h2>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>Five minutes. One timeline. Clear next steps.</p>
        </div>

        {/* Scrollytelling boundary (DO NOT remove) */}
        <div className="relative overflow-visible">
          {/* This wrapper creates the sticky boundary height */}
          <div className="grid grid-cols-12 gap-10 items-start">
            {/* Left narrative */}
            <div className="col-span-5">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[10px] top-0 h-full w-px" style={{ backgroundColor: "var(--accent-soft)" }} />

                {/* Steps container - no extra padding, ends exactly after last step */}
                <div id="daylife-steps" className="space-y-12">
                  {DAYLIFE_STEPS.map((step) => {
                    const isActive = activeStep === step.id;
                    return (
                      <div
                        key={step.id}
                        data-step={step.id}
                        className="min-h-[280px] relative pl-6 pt-2 pb-2"
                      >
                        {/* Active dot */}
                        {isActive && (
                          <div className="absolute left-[6px] top-[6px] w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                        )}

                        <div
                          className="text-xs font-semibold uppercase mb-2 tracking-[1.2px]"
                          style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                        >
                          {step.label}
                        </div>

                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}
                        >
                          {step.title}
                        </h3>

                        <p
                          className="text-sm mb-3 leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {step.body}
                        </p>

                        <div
                          className="mb-4 p-3 rounded-[8px] border transition-all"
                          style={{
                            backgroundColor: isActive ? "var(--accent-soft)" : "var(--surface-2)",
                            borderColor: isActive ? "var(--accent)" : "var(--border)",
                          }}
                        >
                          <p className="text-[10px] font-medium uppercase mb-1 tracking-[0.8px]" style={{ color: "var(--text-muted)" }}>
                            What you see:
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {step.whatYouSee}
                          </p>
                        </div>

                        <div className="text-xs font-medium inline-flex items-center gap-1 transition-colors" style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}>
                          {step.cta.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right stage (pinned with JS - works even with transforms) */}
            <div className="col-span-7 self-start relative">
              {/* This wrapper preserves layout width while stage is fixed */}
              <div ref={stageWrapRef} style={stageStyle}>
                <StageSceneSwitcher activeStep={activeStep} />
              </div>
            </div>
          </div>

          {/* No spacer needed - section ends exactly after steps */}
        </div>
      </div>
    </section>
  );
}
