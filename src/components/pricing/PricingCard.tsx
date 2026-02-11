"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { regionAvailability } from "@/config/regionAvailability";
import PricingModuleAccordion from "./PricingModuleAccordion";

interface FeatureGroup {
  title: string;
  features: string[];
}

interface PricingCardProps {
  tierName: string;
  badge?: string;
  price: string;
  tagline: string;
  primaryBullets: string[]; // Max 3 visible bullets
  featureGroups: FeatureGroup[]; // Expandable modules
  ctaText: string;
  ctaLink: string;
  isHighlighted?: boolean;
  prefersReducedMotion?: boolean;
  onRegionUnavailable?: (source: string) => void;
}

export default function PricingCard({
  tierName,
  badge,
  price,
  tagline,
  primaryBullets,
  featureGroups,
  ctaText,
  ctaLink,
  isHighlighted = false,
  prefersReducedMotion = false,
  onRegionUnavailable,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCTAClick = (e: React.MouseEvent) => {
    // Check if this is "Start Health Intelligence" and region is unavailable
    if (
      ctaText === "Start Health Intelligence" &&
      !regionAvailability.healthIntelligence &&
      onRegionUnavailable
    ) {
      e.preventDefault();
      onRegionUnavailable("pricing_health_intelligence");
      return;
    }
    // Otherwise, let Link handle navigation normally
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className="pricing-card rounded-[24px] border p-8 md:p-10 relative transition-all"
      data-featured={isHighlighted ? "true" : undefined}
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "24px",
        border: "1px solid var(--border)",
        transition: "all 180ms ease-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge (plan badge) */}
      {badge && (
        <div style={{ marginBottom: "18px" }}>
          <span
            className="plan-badge inline-block rounded-full"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "6px 10px",
              borderRadius: "9999px",
              background: "var(--accent-soft)",
              color: "var(--accent-2)",
              border: "1px solid rgba(77,174,158,0.18)",
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3
        style={{
          fontSize: "26px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          marginBottom: "14px",
        }}
      >
        {tierName}
      </h3>

      {/* Price */}
      <div style={{ marginBottom: "18px" }}>
        <span
          style={{
            fontSize: "38px",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {price}
        </span>
        <span
          style={{
            fontSize: "16px",
            color: "var(--text-muted)",
            marginLeft: "4px",
            fontWeight: 400,
          }}
        >
          /month
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "var(--text-muted)",
          marginBottom: "24px",
        }}
      >
        {tagline}
      </p>

      {/* Primary Value Bullets (max 3) */}
      <div className="feature-list" style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {primaryBullets.map((bullet, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", lineHeight: 1.6 }}>
            <span
              className="feature-icon"
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                marginTop: "2px",
                flexShrink: 0,
              }}
            >
              ✔
            </span>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                color: "var(--text-primary)",
              }}
            >
              {bullet}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div style={{ marginBottom: "24px" }}>
        <Link
          href={ctaLink}
          onClick={handleCTAClick}
          className="pricing-cta block w-full text-center rounded-full font-medium text-sm transition-all"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "#ffffff",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 30px rgba(14,26,24,0.12)",
          }}
          onMouseEnter={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.backgroundColor = "var(--accent-strong)";
            }
          }}
          onMouseLeave={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.backgroundColor = "var(--accent-primary)";
            }
          }}
        >
          {ctaText}
        </Link>
      </div>

      {/* Expandable Modules List */}
      <div className="accordion" style={{ marginTop: "18px" }}>
        <p
          className="accordion-title"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--text-muted)",
            marginBottom: "12px",
          }}
        >
          What's inside
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {featureGroups.map((group, idx) => (
            <PricingModuleAccordion
              key={idx}
              title={group.title}
              items={group.features}
              prefersReducedMotion={prefersReducedMotion}
              isFirst={idx === 0}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
