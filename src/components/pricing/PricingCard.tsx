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
      className="rounded-[16px] border p-8 md:p-10 relative transition-all"
      style={{
        backgroundColor: isHighlighted
          ? "linear-gradient(180deg, rgba(110,211,194,0.06), rgba(255,255,255,0.02))"
          : "rgba(255,255,255,0.02)",
        background: isHighlighted
          ? "linear-gradient(180deg, rgba(110,211,194,0.06), rgba(255,255,255,0.02))"
          : "rgba(255,255,255,0.02)",
        borderRadius: "16px",
        borderColor: isHovered
          ? "rgba(110,211,194,0.18)"
          : "rgba(255,255,255,0.06)",
        transition: "all 200ms ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge (subtle capsule) */}
      {badge && (
        <div style={{ marginBottom: "20px" }}>
          <span
            className="inline-block px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "rgba(110,211,194,0.08)",
              border: "1px solid rgba(110,211,194,0.18)",
              color: "rgba(110,211,194,0.95)",
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3
        style={{
          fontSize: "28px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "rgba(231,240,238,0.95)",
          marginBottom: "12px",
        }}
      >
        {tierName}
      </h3>

      {/* Price */}
      <div style={{ marginBottom: "20px" }}>
        <span
          style={{
            fontSize: "42px",
            fontWeight: 600,
            color: "rgba(231,240,238,0.95)",
          }}
        >
          {price}
        </span>
        <span
          style={{
            fontSize: "16px",
            color: "rgba(143,166,163,0.78)",
            marginLeft: "4px",
          }}
        >
          / month
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.6,
          color: "rgba(143,166,163,0.78)",
          marginBottom: "24px",
        }}
      >
        {tagline}
      </p>

      {/* Primary Value Bullets (max 3) */}
      <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {primaryBullets.map((bullet, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(110,211,194,0.95)",
                marginTop: "2px",
                flexShrink: 0,
              }}
            >
              ✔
            </span>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.5,
                color: "rgba(231,240,238,0.95)",
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
          className="block w-full text-center py-3.5 px-6 rounded-full font-semibold text-sm transition-all"
          style={{
            backgroundColor: "rgba(110,211,194,0.95)",
            color: "#071012",
          }}
          onMouseEnter={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.backgroundColor = "rgba(110,211,194,1)";
            }
          }}
          onMouseLeave={(e) => {
            if (typeof window !== "undefined" && e.currentTarget) {
              e.currentTarget.style.backgroundColor = "rgba(110,211,194,0.95)";
            }
          }}
        >
          {ctaText}
        </Link>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.06)",
          marginBottom: "24px",
        }}
      />

      {/* Expandable Modules List */}
      <div>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "rgba(143,166,163,0.65)",
            marginBottom: "12px",
          }}
        >
          What's inside
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {featureGroups.map((group, idx) => (
            <PricingModuleAccordion
              key={idx}
              title={group.title}
              items={group.features}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
