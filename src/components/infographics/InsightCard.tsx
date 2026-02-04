"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, TrendingUp, Bell, CheckCircle2 } from "lucide-react";

export type InsightType = "pattern" | "trend" | "alert" | "recommendation";

export interface InsightCardProps {
  type?: InsightType;
  title: string;
  description: string;
  whyItMatters: string;
  nextStep?: string;
  timestamp?: string;
  className?: string;
  variant?: "default" | "compact";
}

const getInsightIcon = (type: InsightType) => {
  switch (type) {
    case "pattern":
      return <TrendingUp className="w-4 h-4 text-accent" />;
    case "trend":
      return <TrendingUp className="w-4 h-4 text-accent" />;
    case "alert":
      return <AlertCircle className="w-4 h-4 text-accent" />;
    case "recommendation":
      return <Bell className="w-4 h-4 text-accent" />;
    default:
      return <AlertCircle className="w-4 h-4 text-accent" />;
  }
};

export default function InsightCard({
  type = "pattern",
  title,
  description,
  whyItMatters,
  nextStep,
  timestamp,
  className = "",
  variant = "default",
}: InsightCardProps) {
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1] }}
      className={`p-4 rounded-lg bg-[var(--color-accent-bg-subtle)] ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getInsightIcon(type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-semibold text-white ${isCompact ? "text-xs" : "text-xs"}`}>
              {title}
            </span>
            {timestamp && (
              <span className="text-[10px] text-accent font-medium">{timestamp}</span>
            )}
          </div>
          {description && (
            <p className={`text-[var(--color-text-secondary)] mb-2 ${isCompact ? "text-xs" : "text-xs"}`}>
              {description}
            </p>
          )}
          <div className="pt-3">
            <p className="text-[10px] font-medium text-[var(--color-text-muted)] tracking-[0.02em] mb-1">
              Why it matters
            </p>
            <p className={`text-[var(--color-text-tertiary)] leading-relaxed ${isCompact ? "text-xs" : "text-xs"}`}>
              {whyItMatters}
            </p>
          </div>
          {nextStep && (
            <div className="pt-2 mt-2 border-t border-[var(--color-border-accent)]/20">
              <p className="text-[10px] font-medium text-[var(--color-text-muted)] tracking-[0.02em] mb-1">
                Next step
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0" />
                <p className={`text-[var(--color-text-tertiary)] ${isCompact ? "text-xs" : "text-xs"}`}>
                  {nextStep}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

