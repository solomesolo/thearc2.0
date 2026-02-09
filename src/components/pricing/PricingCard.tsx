"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeatureGroup {
  title: string;
  features: string[];
}

interface PricingCardProps {
  tierName: string;
  badge: string;
  price: string;
  tagline: string;
  featureGroups: FeatureGroup[];
  ctaText: string;
  ctaLink: string;
  isHighlighted?: boolean;
  prefersReducedMotion?: boolean;
}

export default function PricingCard({
  tierName,
  badge,
  price,
  tagline,
  featureGroups,
  ctaText,
  ctaLink,
  isHighlighted = false,
  prefersReducedMotion = false,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className="rounded-[24px] border p-8 md:p-10 relative transition-all z-10"
      style={{
        backgroundColor: "#0C1416",
        borderRadius: "24px",
        borderColor: isHighlighted
          ? isHovered
            ? "rgba(110,211,194,0.4)"
            : "rgba(110,211,194,0.25)"
          : "rgba(231,240,238,0.08)",
        boxShadow: isHighlighted
          ? isHovered
            ? "0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(110,211,194,0.15), inset 0 1px 0 rgba(231,240,238,0.04)"
            : "0 8px 32px rgba(0,0,0,0.45), 0 0 20px rgba(110,211,194,0.1), inset 0 1px 0 rgba(231,240,238,0.04)"
          : isHovered
          ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(231,240,238,0.04)"
          : "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
        transform: isHighlighted
          ? isHovered
            ? "translateY(-4px) scale(1.02)"
            : "translateY(-2px) scale(1.02)"
          : isHovered
          ? "translateY(-2px)"
          : "translateY(0)",
        transition: "all 200ms ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight gradient border for Tier 2 */}
      {isHighlighted && (
        <div
          className="absolute -inset-[1px] rounded-[25px] pointer-events-none z-0"
          style={{
            background: "linear-gradient(135deg, rgba(110,211,194,0.3) 0%, rgba(110,211,194,0.1) 50%, rgba(110,211,194,0.05) 100%)",
            filter: "blur(0.5px)",
          }}
        />
      )}

      {/* Badge */}
      <div className="mb-4">
        <span
          className="text-xs font-semibold uppercase px-3 py-1.5 rounded-full inline-block"
          style={{
            backgroundColor: isHighlighted
              ? "rgba(110,211,194,0.15)"
              : "rgba(231,240,238,0.08)",
            color: isHighlighted ? "var(--accent)" : "var(--text-muted)",
            letterSpacing: "0.8px",
          }}
        >
          {badge}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-2xl font-semibold mb-2"
        style={{
          color: "rgba(231,240,238,0.95)",
          fontWeight: 500,
        }}
      >
        {tierName}
      </h3>

      {/* Price */}
      <div className="mb-3">
        <span
          className="text-4xl font-semibold"
          style={{
            color: "rgba(231,240,238,0.95)",
            fontWeight: 600,
          }}
        >
          {price}
        </span>
        <span
          className="text-lg ml-1"
          style={{
            color: "var(--text-muted)",
          }}
        >
          / month
        </span>
      </div>

      {/* Tagline */}
      <p
        className="text-sm mb-8 leading-relaxed"
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {tagline}
      </p>

      {/* Feature Groups */}
      <div className="space-y-6 mb-8">
        {featureGroups.map((group, groupIdx) => {
          // Handle header-only groups (like "Includes Everything...")
          if (group.features.length === 0) {
            return (
              <div key={groupIdx}>
                <p
                  className="text-sm font-medium mb-4"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {group.title}
                </p>
              </div>
            );
          }
          return (
            <div key={groupIdx}>
              <h4
                className="text-xs font-semibold uppercase mb-3"
                style={{
                  color: "var(--text-muted)",
                  letterSpacing: "1px",
                }}
              >
                {group.title}
              </h4>
              <div className="space-y-2.5">
                {group.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-start gap-2.5">
                    <span
                      className="text-sm mt-0.5 flex-shrink-0"
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
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <Link
        href={ctaLink}
        className="block w-full text-center py-3.5 px-6 rounded-full font-semibold text-sm transition-all"
        style={{
          backgroundColor: isHighlighted
            ? isHovered
              ? "var(--accent-hover)"
              : "var(--accent)"
            : isHovered
            ? "rgba(110,211,194,0.9)"
            : "var(--accent)",
          color: "#071012",
        }}
        onMouseEnter={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.backgroundColor = isHighlighted
              ? "var(--accent-hover)"
              : "var(--accent-hover)";
          }
        }}
        onMouseLeave={(e) => {
          if (typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.backgroundColor = isHighlighted
              ? "var(--accent)"
              : "var(--accent)";
          }
        }}
      >
        {ctaText}
      </Link>
    </motion.div>
  );
}

