"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Using simple SVG instead of lucide-react for compatibility

interface PricingModuleAccordionProps {
  title: string;
  items: string[];
  prefersReducedMotion?: boolean;
}

export default function PricingModuleAccordion({
  title,
  items,
  prefersReducedMotion = false,
}: PricingModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left transition-colors"
        style={{
          color: "rgba(231,240,238,0.95)",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {isOpen ? "▾" : "▸"} {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            color: "rgba(143,166,163,0.78)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
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
            <div style={{ paddingLeft: "20px", paddingBottom: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(110,211,194,0.95)",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      •
                    </span>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(143,166,163,0.78)",
                        lineHeight: 1.5,
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

