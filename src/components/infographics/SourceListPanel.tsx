"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export interface SourceItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  connected?: boolean;
  status?: "active" | "pending" | "disconnected";
}

interface SourceListPanelProps {
  title?: string;
  sources: SourceItem[];
  showHeader?: boolean;
  className?: string;
  onSourceHover?: (sourceId: string | null) => void;
  hoveredSourceId?: string | null;
}

export default function SourceListPanel({
  title = "Connected Sources",
  sources,
  showHeader = true,
  className = "",
  onSourceHover,
  hoveredSourceId,
}: SourceListPanelProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {showHeader && (
        <p className="text-xs font-medium text-[var(--color-text-muted)] tracking-[0.02em]">
          {title}
        </p>
      )}
      <div className="space-y-2">
        {sources.map((source, idx) => {
          const isHovered = hoveredSourceId === source.id;
          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1], delay: 0.1 + idx * 0.1 }}
              onMouseEnter={() => onSourceHover?.(source.id)}
              onMouseLeave={() => onSourceHover?.(null)}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] group cursor-pointer ${
                isHovered
                  ? "bg-white/10"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-ui)]">
                {source.icon}
              </div>
              <span className="text-sm text-[var(--color-text-secondary)] flex-1">{source.label}</span>
              {source.connected && (
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              )}
              {source.status === "pending" && (
                <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
              )}
              {source.status === "disconnected" && (
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-disabled)] flex-shrink-0" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

