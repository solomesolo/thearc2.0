"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./ui/Button";
import TrajectoryHeroArtifact from "./TrajectoryHeroArtifact";
import Container from "./Container";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
}

// Trust chips removed - replaced with single trust line

export function HeroSection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Defer animations until after initial render to improve FCP
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(() => setShouldAnimate(true), { timeout: 200 });
    } else {
      setTimeout(() => setShouldAnimate(true), 100);
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden hero-section">
      {/* Museum Lighting: Radial gradient behind text (left) - 2-4% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 600px at 15% 45%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      {/* Museum Lighting: Radial gradient behind visual (right) - 2-4% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 700px 500px at 85% 50%, rgba(255, 255, 255, 0.025) 0%, transparent 65%)`,
          zIndex: 0,
        }}
      />
      
      {/* Subtle vignette edges - Deep and soft, not flat */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.03) 100%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="editorial" className="relative z-10">
        {/* Editorial Grid: 12 columns, left 5 cols, right 6 cols, 1 col gap, center-ish alignment */}
        <div className="grid grid-cols-12 hero-grid">
          {/* Left Column: Text Content (spans 5 columns) - Editorial grid alignment */}
          <div className="col-span-12 lg:col-span-5 relative z-10 hero-left-column">
            {/* H1 - Hero type scale (expensive, not oversized marketing) */}
            {shouldAnimate ? (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1] }}
                className="hero-h1"
              >
                {headline}
              </motion.h1>
            ) : (
              <h1 className="hero-h1">{headline}</h1>
            )}

            {/* Subheadline - Hero subhead type scale (calm and clinical) */}
            {shouldAnimate ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1], delay: 0.1 }}
                className="hero-subhead"
              >
                {subheadline}
              </motion.p>
            ) : (
              <p className="hero-subhead">
                {subheadline}
              </p>
            )}

            {/* CTA Row - Hero spacing rhythm */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-cta-row">
              {shouldAnimate ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  {/* Primary CTA - Reduced size for premium feel */}
                  {primaryCTA && (
                    <Button
                      variant="primary"
                      size="md"
                      href={primaryCTA.href}
                      onClick={primaryCTA.onClick}
                    >
                      {primaryCTA.label}
                    </Button>
                  )}
                  
                  {/* Secondary CTA - Text link with underline on hover */}
                  <Link
                    href="/clinics"
                    className="group relative inline-flex items-center gap-1.5 text-sm font-normal text-[var(--text-1)] hover:text-[var(--text-0)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-sm px-1 -mx-1 hero-secondary-cta"
                  >
                    <span>For Clinics</span>
                    <span className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-ui)] group-hover:translate-x-0.5">→</span>
                  </Link>
                </motion.div>
              ) : (
                <>
                  {/* Primary CTA - Reduced size for premium feel */}
                  {primaryCTA && (
                    <Button
                      variant="primary"
                      size="md"
                      href={primaryCTA.href}
                      onClick={primaryCTA.onClick}
                    >
                      {primaryCTA.label}
                    </Button>
                  )}
                  
                  {/* Secondary CTA - Text link with underline on hover */}
                  <Link
                    href="/clinics"
                    className="group relative inline-flex items-center gap-1.5 text-sm font-normal text-[var(--text-1)] hover:text-[var(--text-0)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-sm px-1 -mx-1 hero-secondary-cta"
                  >
                    <span>For Clinics</span>
                    <span className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-ui)] group-hover:translate-x-0.5">→</span>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Line - Hero trust line type scale (muted, quiet) */}
            {shouldAnimate ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1], delay: 0.3 }}
                className="hero-trust-line"
              >
                Connect EHR • Labs • Wearables — Export anytime — Privacy-first
              </motion.p>
            ) : (
              <p className="hero-trust-line">
                Connect EHR • Labs • Wearables — Export anytime — Privacy-first
              </p>
            )}
          </div>

          {/* Right Column: Trajectory Hero Artifact (spans 6 columns) */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 relative z-10 hero-right-column">
            {shouldAnimate ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 }}
                className="w-full"
              >
                <TrajectoryHeroArtifact />
              </motion.div>
            ) : (
              <TrajectoryHeroArtifact />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
