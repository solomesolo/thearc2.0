"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Using simple SVG instead of lucide-react for compatibility

interface PricingModuleAccordionProps {
  title: string;
  items: string[];
  prefersReducedMotion?: boolean;
  isFirst?: boolean;
}

export default function PricingModuleAccordion({
  title,
  items,
  prefersReducedMotion = false,
  isFirst = false,
}: PricingModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pricing-accordion-row" style={{ padding: "14px 0" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left transition-colors"
        style={{
          color: "var(--text-primary)",
        }}
      >
        <span
          className="accordion-title"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--text-muted)",
          }}
        >
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            color: "var(--text-muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: "12px", paddingLeft: "0px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", lineHeight: 1.6 }}>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(77,174,158,0.60)",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      •
                    </span>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-primary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

