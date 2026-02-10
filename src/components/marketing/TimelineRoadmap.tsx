"use client";

import React, { useEffect, useRef } from "react";
import type { DayLifeStepId } from "./dayInLifeSteps";
import { DAYLIFE_STEPS } from "./dayInLifeSteps";

interface TimelineRoadmapProps {
  activeStep: DayLifeStepId;
  onStepChange?: (step: DayLifeStepId) => void;
}

export default function TimelineRoadmap({ activeStep, onStepChange }: TimelineRoadmapProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<Map<DayLifeStepId, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!onStepChange) return;

    let rafId: number | null = null;
    let ticking = false;
    let timeoutId: NodeJS.Timeout | null = null;

    // Find the section container
    const findSection = () => {
      const section = document.getElementById("day-in-life");
      if (section) {
        sectionRef.current = section;
        return true;
      }
      return false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          ticking = false;
          return;
        }

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight * 0.4; // 40% from top

        // Only process if section is in viewport
        if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) {
          ticking = false;
          return;
        }

        let closestStep: DayLifeStepId | null = null;
        let closestDistance = Infinity;

        DAYLIFE_STEPS.forEach((step) => {
          const element = stepRefs.current.get(step.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const distance = Math.abs(stepCenter - viewportCenter);

            // Consider all steps that are within reasonable distance (even if slightly outside viewport)
            if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
              if (distance < closestDistance) {
                closestDistance = distance;
                closestStep = step.id;
              }
            }
          }
        });

        if (closestStep && closestStep !== activeStep) {
          onStepChange(closestStep);
        }

        ticking = false;
      });
    };

    // Setup function
    const setup = () => {
      if (findSection()) {
        // Initial check
        handleScroll();

        // Listen to scroll events
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
      } else {
        // Retry after a short delay
        timeoutId = setTimeout(setup, 100);
      }
    };

    // Start setup
    setup();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [activeStep, onStepChange]);

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div
        className="absolute left-[10px] top-0 bottom-0 w-px"
        style={{
          backgroundColor: "rgba(110,211,194,0.18)",
        }}
      />

      {/* Timeline steps */}
      <div className="relative">
        {DAYLIFE_STEPS.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              ref={(el) => {
                if (el) {
                  stepRefs.current.set(step.id, el);
                } else {
                  stepRefs.current.delete(step.id);
                }
              }}
              data-step-id={step.id}
              className="min-h-[200px] relative pl-6 py-6"
            >
              {/* Active dot indicator */}
              <div
                className="absolute left-[6px] top-[8px] w-3 h-3 rounded-full z-10 transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "rgba(110,211,194,0.95)" : "rgba(110,211,194,0.3)",
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                  boxShadow: isActive ? "0 0 12px rgba(110,211,194,0.5)" : "none",
                }}
              />

              {/* Label */}
              <div
                className="text-xs font-semibold uppercase mb-2 tracking-[1.2px] transition-colors duration-300"
                style={{
                  color: isActive ? "rgba(110,211,194,0.95)" : "rgba(231,240,238,0.65)",
                }}
              >
                {step.label}
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold mb-2 transition-colors duration-300"
                style={{
                  color: isActive ? "rgba(231,240,238,0.95)" : "rgba(231,240,238,0.65)",
                }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p
                className="text-sm mb-3 leading-relaxed transition-colors duration-300"
                style={{
                  color: isActive ? "rgba(143,166,163,0.95)" : "rgba(143,166,163,0.65)",
                }}
              >
                {step.body}
              </p>

              {/* What you see box */}
              <div
                className="mb-3 p-3 rounded-[8px] border transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "rgba(110,211,194,0.05)" : "rgba(231,240,238,0.02)",
                  borderColor: isActive ? "rgba(110,211,194,0.1)" : "rgba(231,240,238,0.06)",
                }}
              >
                <p className="text-[10px] font-medium uppercase mb-1 tracking-[0.8px]" style={{ color: "rgba(143,166,163,0.65)" }}>
                  What you see:
                </p>
                <p
                  className="text-xs leading-relaxed transition-colors duration-300"
                  style={{
                    color: isActive ? "rgba(143,166,163,0.95)" : "rgba(143,166,163,0.65)",
                  }}
                >
                  {step.whatYouSee}
                </p>
              </div>

              {/* CTA */}
              <div
                className="text-xs font-medium inline-flex items-center gap-1 transition-colors duration-300"
                style={{
                  color: isActive ? "rgba(110,211,194,0.95)" : "rgba(143,166,163,0.65)",
                }}
              >
                {step.cta.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
