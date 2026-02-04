"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DisclosureProps {
  summary: string;
  details: React.ReactNode;
  label?: string;
  defaultOpen?: boolean;
  className?: string;
}

export default function Disclosure({
  summary,
  details,
  label = "Learn more",
  defaultOpen = false,
  className = "",
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      {/* Summary - Always visible */}
      <p className="typography-body mb-3">{summary}</p>

      {/* Expandable details */}
      {details && (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
            className="group flex items-center gap-2 text-sm font-medium text-accent hover:text-[var(--color-accent-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded px-1 -mx-1"
            aria-expanded={isOpen}
            aria-label={isOpen ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          >
            <span>{isOpen ? "Hide" : label}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1] }}
            >
              <ChevronDown className="w-4 h-4" strokeWidth={2} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.24, 
                  ease: [0.25, 0.8, 0.5, 1] // Using motion token easing
                }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-2 border-t border-[var(--color-border-base)]">
                  <div className="typography-body-secondary">
                    {details}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

