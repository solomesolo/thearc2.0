"use client";

/**
 * HeroSection Component
 * 
 * Now uses ContinuityRibbonHero - ribbon visualization showing fragment → merge → unified trajectory
 */

import React from "react";
import { ContinuityRibbonHero } from "./hero/ContinuityRibbonHero";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  supportingLine?: string;
  bullets?: string[];
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
  mode?: "idle" | "records" | "trends" | "signals";
}

export function HeroSection({
  title,
  subtitle,
  supportingLine,
  bullets = [],
  primaryCTA,
  secondaryCTA,
  mode = "idle",
}: HeroSectionProps) {
  return (
    <ContinuityRibbonHero
      title={title}
      subtitle={subtitle}
      supportingLine={supportingLine}
      bullets={bullets}
      primaryCTA={primaryCTA}
      secondaryCTA={secondaryCTA}
      mode={mode}
    />
  );
}
