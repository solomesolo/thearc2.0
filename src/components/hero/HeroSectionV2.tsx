"use client";

import React from "react";
import { HeroContinuityCardMini } from "./HeroContinuityCardMini";
import { HeroFloatingUI } from "./HeroFloatingUI";

interface HeroSectionV2Props {
  onPrimaryCTAClick?: () => void;
  onSecondaryCTAClick?: () => void;
}

export function HeroSectionV2({ onPrimaryCTAClick, onSecondaryCTAClick }: HeroSectionV2Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const handlePrimaryClick = () => {
    if (onPrimaryCTAClick) {
      onPrimaryCTAClick();
    } else {
      // Default: scroll to how-it-works section
      if (typeof window !== "undefined") {
        const element = document.getElementById("home.howItWorks");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryCTAClick) {
      onSecondaryCTAClick();
    } else {
      // Default: scroll to how-it-works section
      if (typeof window !== "undefined") {
        const element = document.getElementById("home.howItWorks");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <section className="hero-section-v2-wrapper">
      <div className="hero-section-v2-container">
        {/* 12-column grid */}
        <div className="hero-section-v2-grid">
          {/* Left Column: Text (spans 2-6, 5 cols) */}
          <div className="hero-section-v2-text-column">
            <div className="hero-section-v2-content">
              {/* Eyebrow */}
              <p className="hero-section-v2-eyebrow">YOUR ARC</p>

              {/* Headline */}
              <h1 className="hero-section-v2-headline">
                Your health data already contains patterns.<br />
                Arc helps you see them early — and act with confidence.
              </h1>

              {/* Subtext */}
              <p className="hero-section-v2-subtext">
                Arc brings your medical records into one living timeline — so trends, risks, and missing data become clear in context.
              </p>

              {/* Continuity Confidence Card */}
              <div className="hero-section-v2-card-wrapper">
                <HeroContinuityCardMini
                  coveragePercent={70}
                  trendDirection="up"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              {/* CTA Row */}
              <div className="hero-section-v2-cta-row">
                <button
                  onClick={handlePrimaryClick}
                  className="hero-section-v2-cta-primary"
                >
                  Start building your timeline
                </button>
                <button
                  onClick={handleSecondaryClick}
                  className="hero-section-v2-cta-secondary"
                >
                  See how Arc works
                </button>
              </div>

              {/* Helper Line */}
              <p className="hero-section-v2-helper">Takes less than 2 minutes</p>
            </div>
          </div>

          {/* Right Column: Visual (spans 7-12, 6 cols) */}
          <div className="hero-section-v2-visual-column">
            <HeroFloatingUI prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

