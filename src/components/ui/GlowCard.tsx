"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}

export function GlowCard({ children, className = "", delay = 0, animate = false }: GlowCardProps) {
  if (animate) {
    return (
      <motion.div
        className={`glow-card ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`glow-card ${className}`}>
      {children}
    </div>
  );
}

