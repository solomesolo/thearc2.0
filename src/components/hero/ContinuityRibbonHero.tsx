"use client";

import React from "react";
import { ContinuityRibbon, RibbonMode } from "./ContinuityRibbon";
import { RibbonChips } from "./RibbonChips";
import { RibbonCaption } from "./RibbonCaption";
import { ArcButton } from "../ui/ArcButton";

interface ContinuityRibbonHeroProps {
  title: string;
  subtitle: string;
  supportingLine?: string;
  bullets?: string[];
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
  mode?: RibbonMode;
}

export function ContinuityRibbonHero({
  title,
  subtitle,
  supportingLine,
  bullets = [],
  primaryCTA,
  secondaryCTA,
  mode: initialMode = "idle",
}: ContinuityRibbonHeroProps) {
  const [mode, setMode] = React.useState<RibbonMode>(initialMode);
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

  return (
    <section className="hero-section-wrapper">
      <div className="hero-container">
        {/* 2-column grid */}
        <div className="hero-grid">
          {/* Left Column: Text */}
          <div className="hero-text-column">
            <div className="hero-content">
              {/* Headline Block */}
              <div className="hero-headline-block">
                <h1 className="hero-headline">{title}</h1>
              </div>

              {/* Subhead */}
              <p className="hero-subhead">{subtitle}</p>

              {/* Supporting Line */}
              {supportingLine && (
                <p className="hero-supporting-line">{supportingLine}</p>
              )}

              {/* Bullets */}
              {bullets.length > 0 && (
                <div className="hero-bullets">
                  {bullets.map((line, idx) => (
                    <p key={idx} className="hero-bullet">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* CTAs */}
              {(primaryCTA || secondaryCTA) && (
                <div className="hero-ctas">
                  {primaryCTA && (
                    <ArcButton href={primaryCTA.href} onClick={primaryCTA.onClick}>
                      {primaryCTA.label}
                    </ArcButton>
                  )}
                  {secondaryCTA && (
                    <ArcButton
                      href={secondaryCTA.href}
                      onClick={secondaryCTA.onClick}
                      className="hero-secondary-cta"
                    >
                      {secondaryCTA.label}
                    </ArcButton>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Continuity Ribbon */}
          <div className="hero-visual-column">
            <div className="continuity-ribbon-hero-container">
              <ContinuityRibbon mode={mode} prefersReducedMotion={prefersReducedMotion} />
              <RibbonChips
                mode={mode}
                onModeChange={setMode}
                prefersReducedMotion={prefersReducedMotion}
              />
              <RibbonCaption mode={mode} prefersReducedMotion={prefersReducedMotion} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

