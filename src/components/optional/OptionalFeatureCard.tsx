"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FlowStep {
  emoji: string;
  text: string;
}

interface OptionalFeatureCardProps {
  title: string;
  description: string;
  connectionBullets: string[];
  flowSteps: FlowStep[];
  benefits: string[];
  primaryCTA: string;
  secondaryCTA: string;
  variant: "blueprint" | "investigation";
  primaryCTALink: string;
  secondaryCTALink: string;
  prefersReducedMotion?: boolean;
}

export default function OptionalFeatureCard({
  title,
  description,
  connectionBullets,
  flowSteps,
  benefits,
  primaryCTA,
  secondaryCTA,
  variant,
  primaryCTALink,
  secondaryCTALink,
  prefersReducedMotion = false,
}: OptionalFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className="rounded-[24px] border p-8 md:p-10 transition-all"
      style={{
        backgroundColor: "#0C1416",
        borderRadius: "24px",
        borderColor: isHovered
          ? "rgba(110,211,194,0.22)"
          : "rgba(231,240,238,0.08)",
        boxShadow: isHovered
          ? "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(110,211,194,0.08), inset 0 1px 0 rgba(231,240,238,0.04)"
          : "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 200ms ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon placeholder - can be replaced with SVG */}
      <div className="mb-6">
        <div
          className="w-12 h-12 rounded-[12px] flex items-center justify-center"
          style={{
            backgroundColor: variant === "blueprint" 
              ? "rgba(110,211,194,0.1)"
              : "rgba(110,211,194,0.1)",
            border: `1px solid ${variant === "blueprint" 
              ? "rgba(110,211,194,0.2)"
              : "rgba(110,211,194,0.2)"}`,
          }}
        >
          <span className="text-2xl">
            {variant === "blueprint" ? "🗺️" : "🔬"}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-semibold mb-3"
        style={{
          color: "rgba(231,240,238,0.95)",
          fontWeight: 500,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-sm mb-6 leading-relaxed"
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {/* Connection bullets */}
      <div className="mb-6">
        <p
          className="text-xs font-medium uppercase mb-3"
          style={{
            color: "var(--text-muted)",
            letterSpacing: "0.8px",
          }}
        >
          How it connects to what you just saw
        </p>
        <div className="space-y-2">
          {connectionBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{
                  backgroundColor: "var(--accent-alpha-60)",
                }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Flow steps */}
      <div className="mb-6 p-4 rounded-[12px]" style={{ backgroundColor: "rgba(231,240,238,0.02)" }}>
        <div className="space-y-3">
          {flowSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-base flex-shrink-0">{step.emoji}</span>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <p
          className="text-xs font-medium uppercase mb-3"
          style={{
            color: "var(--text-muted)",
            letterSpacing: "0.8px",
          }}
        >
          What you get
        </p>
        <div className="space-y-2">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span
                className="text-sm mt-0.5"
                style={{
                  color: "var(--accent)",
                }}
              >
                ✓
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3 pt-4 border-t" style={{ borderColor: "rgba(231,240,238,0.06)" }}>
        <Link
          href={primaryCTALink}
          className="block w-full text-center py-3 px-6 rounded-full font-semibold text-sm transition-all"
          style={{
            backgroundColor: "var(--accent)",
            color: "#071012",
          }}
          onMouseEnter={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.backgroundColor = "var(--accent-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.backgroundColor = "var(--accent)";
            }
          }}
        >
          {primaryCTA}
        </Link>
        <Link
          href={secondaryCTALink}
          className="block w-full text-center py-2 px-6 text-sm font-medium transition-colors"
          style={{
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.color = "var(--accent-hover)";
              e.currentTarget.style.textDecoration = "underline";
            }
          }}
          onMouseLeave={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.textDecoration = "none";
            }
          }}
        >
          {secondaryCTA}
        </Link>
      </div>
    </motion.div>
  );
}

