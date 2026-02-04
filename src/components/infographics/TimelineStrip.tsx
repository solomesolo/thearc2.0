"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TimelineEvent {
  id: string;
  date: string;
  type: "lab" | "wearable" | "symptom" | "visit" | "other";
  position: number; // Percentage (0-100)
  label?: string;
}

interface TimelineStripProps {
  events: TimelineEvent[];
  showPatternLine?: boolean;
  patternStart?: number; // Percentage
  patternEnd?: number; // Percentage
  highlightedEventIds?: string[];
  selectedEventId?: string | null;
  onEventClick?: (eventId: string) => void;
  onEventHover?: (eventId: string | null) => void;
  className?: string;
}

const getEventColor = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "lab":
      return "bg-[#6FFFC3]";
    case "wearable":
      return "bg-blue-400";
    case "symptom":
      return "bg-yellow-400";
    case "visit":
      return "bg-purple-400";
    default:
      return "bg-white/40";
  }
};

export default function TimelineStrip({
  events,
  showPatternLine = true,
  patternStart = 10,
  patternEnd = 85,
  highlightedEventIds = [],
  selectedEventId = null,
  onEventClick,
  onEventHover,
  className = "",
}: TimelineStripProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[var(--color-text-muted)] tracking-[0.02em]">
          Timeline
        </p>
        {events.length > 0 && (
          <span className="text-[10px] text-[var(--color-text-muted)]">
            {events.length} {events.length === 1 ? "event" : "events"}
          </span>
        )}
      </div>
      <div className="relative h-16">
        {/* Timeline base line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--color-border-base)] transform -translate-y-1/2" />
        
        {/* Pattern connection line */}
        {showPatternLine && events.length > 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1], delay: 0.3 }}
            className="absolute top-1/2 h-0.5 bg-[var(--color-accent-primary)] transform -translate-y-1/2 origin-left"
            style={{
              left: `${patternStart}%`,
              width: `${patternEnd - patternStart}%`,
            }}
          />
        )}

        {/* Events */}
        {events.map((event, idx) => {
          const isHighlighted = highlightedEventIds.includes(event.id);
          const isSelected = selectedEventId === event.id;
          
          return (
            <motion.button
              key={event.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHighlighted || isSelected ? 1 : 0.6,
                scale: isSelected ? 1.3 : isHighlighted ? 1.15 : 1,
              }}
              transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 + idx * 0.1 }}
              onClick={() => onEventClick?.(event.id)}
              onMouseEnter={() => onEventHover?.(event.id)}
              onMouseLeave={() => onEventHover?.(null)}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card-elevated)] rounded-full"
              style={{ left: `${event.position}%` }}
              aria-label={`${event.label || event.type} - ${event.date}`}
            >
              <div
                className={`w-3 h-3 rounded-full ${getEventColor(event.type)} transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] ${
                  isSelected 
                    ? "shadow-[0_0_8px_var(--color-accent-glow-medium)] ring-2 ring-[var(--color-accent-primary)]/50" 
                    : isHighlighted
                    ? "shadow-[0_0_4px_var(--color-accent-glow-soft)] ring-1 ring-white/30"
                    : "group-hover:ring-1 group-hover:ring-white/20"
                }`}
              />
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-[10px] whitespace-nowrap transition-colors ${
                isSelected || isHighlighted 
                  ? "text-[var(--color-text-secondary)] font-medium" 
                  : "text-[var(--color-text-muted)]"
              }`}>
                {event.date}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

