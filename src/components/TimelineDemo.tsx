"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, TrendingUp, Activity, Heart, AlertCircle, TestTube, Sparkles, HelpCircle } from "lucide-react";
import { TimelineState } from "../hooks/useScrollState";
import WhyThisDrawer from "./WhyThisDrawer";

type EventType = "lab" | "symptom" | "wearable";

interface TimelineEvent {
  id: string;
  type: EventType;
  date: string;
  title: string;
  value?: string;
  position: number; // 0-100 percentage position on timeline
  details: string;
  whyItMatters: string;
  patternConnected?: boolean; // If this event is part of a pattern
}

interface TimelineDemoProps {
  className?: string;
  scrollState?: TimelineState; // Scroll-linked state
}

const events: TimelineEvent[] = [
  {
    id: "1",
    type: "lab",
    date: "Jan 15, 2024",
    title: "Lipid Panel",
    value: "LDL: 145 mg/dL",
    position: 15,
    details: "Complete lipid panel showing elevated LDL cholesterol levels.",
    whyItMatters: "Elevated LDL over time increases cardiovascular risk. This baseline helps track intervention effectiveness.",
    patternConnected: true,
  },
  {
    id: "2",
    type: "wearable",
    date: "Feb 3, 2024",
    title: "Resting Heart Rate",
    value: "RHR: 72 bpm",
    position: 28,
    details: "Average resting heart rate from wearable device over 7 days.",
    whyItMatters: "Resting heart rate trends can indicate cardiovascular fitness and recovery status.",
    patternConnected: true,
  },
  {
    id: "3",
    type: "symptom",
    date: "Feb 18, 2024",
    title: "Fatigue Report",
    value: "Moderate",
    position: 42,
    details: "Self-reported fatigue levels increased over past 2 weeks.",
    whyItMatters: "Fatigue patterns can correlate with metabolic markers and sleep quality changes.",
    patternConnected: true,
  },
  {
    id: "4",
    type: "lab",
    date: "Mar 10, 2024",
    title: "HbA1c Test",
    value: "5.8%",
    position: 58,
    details: "Hemoglobin A1c test showing blood sugar control over 3 months.",
    whyItMatters: "HbA1c trends help identify metabolic health patterns before they become problematic.",
    patternConnected: true,
  },
  {
    id: "5",
    type: "wearable",
    date: "Mar 25, 2024",
    title: "Sleep Quality",
    value: "Score: 78",
    position: 72,
    details: "Sleep quality score from wearable device showing improvement.",
    whyItMatters: "Sleep quality improvements often correlate with better metabolic markers and recovery.",
  },
  {
    id: "6",
    type: "lab",
    date: "Apr 5, 2024",
    title: "Follow-up Lipid Panel",
    value: "LDL: 128 mg/dL",
    position: 85,
    details: "Follow-up lipid panel showing improvement after intervention.",
    whyItMatters: "This 12% reduction in LDL demonstrates the effectiveness of lifestyle interventions tracked over time.",
    patternConnected: true,
  },
];

const getEventIcon = (type: EventType) => {
  switch (type) {
    case "lab":
      return <TestTube className="w-4 h-4" />;
    case "symptom":
      return <AlertCircle className="w-4 h-4" />;
    case "wearable":
      return <Activity className="w-4 h-4" />;
  }
};

const getEventColor = (type: EventType) => {
  switch (type) {
    case "lab":
      return "text-[#6FFFC3]";
    case "symptom":
      return "text-yellow-400";
    case "wearable":
      return "text-blue-400";
  }
};

export default function TimelineDemo({ className = "", scrollState = "fragmented" }: TimelineDemoProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Determine if pattern should be shown based on scroll state
  const showPattern = scrollState === "merged" || scrollState === "recommendation";
  const showRecommendation = scrollState === "recommendation";

  // Pattern events (events with patternConnected: true)
  const patternEvents = events.filter((e) => e.patternConnected);
  const patternStart = Math.min(...patternEvents.map((e) => e.position));
  const patternEnd = Math.max(...patternEvents.map((e) => e.position));
  const patternWidth = patternEnd - patternStart;

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Timeline */}
        <div className="lg:col-span-2">
          <div className="card-premium p-6">
            <div className="space-y-6">
              <div>
                <h3 className="card-title mb-2">Health Timeline</h3>
                <p className="typography-body-secondary text-sm">
                  Interactive timeline showing your health events and patterns
                </p>
              </div>

              {/* Timeline Container */}
              <div className="relative" ref={timelineRef}>
                {/* Timeline Line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-[var(--color-border-base)]" />

                {/* Pattern Connection Line */}
                {showPattern && patternEvents.length >= 2 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-8 h-0.5 bg-[var(--color-accent-primary)]"
                    style={{
                      left: `${patternStart}%`,
                      width: `${patternWidth}%`,
                      transformOrigin: "left",
                    }}
                  />
                )}

                {/* Signal Detected Callout - Shows in merged state */}
                {showPattern && !showRecommendation && patternEvents.length >= 2 && (
                  <motion.div
                    key="signal-detected"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    className="absolute top-0 -translate-y-full mb-2"
                    style={{
                      left: `${patternStart + patternWidth / 2}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="bg-[var(--color-accent-primary)] text-black px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg">
                      Signal Detected
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--color-accent-primary)]"></div>
                  </motion.div>
                )}

                {/* Recommendation Callout - Shows in recommendation state */}
                {showRecommendation && patternEvents.length >= 2 && (
                  <motion.div
                    key="recommendation"
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.38, ease: [0.25, 0.8, 0.5, 1] }}
                    className="absolute top-0 -translate-y-full mb-2 z-20"
                    style={{
                      left: `${patternStart + patternWidth / 2}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-primary-hover)] text-black px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Recommendation: Follow-up screening</span>
                      </div>
                      <button
                        onClick={() => setIsWhyDrawerOpen(true)}
                        className="w-8 h-8 rounded-full bg-[var(--color-accent-primary)] text-black flex items-center justify-center hover:bg-[var(--color-accent-primary-hover)] transition-colors shadow-lg"
                        aria-label="Why this recommendation"
                        title="Why this recommendation"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--color-accent-primary)]"></div>
                  </motion.div>
                )}

                {/* Events */}
                <div className="relative pt-8">
                  {events.map((event) => {
                    const isSelected = selectedEvent?.id === event.id;
                    const isHovered = hoveredEvent === event.id;
                    const isPatternEvent = event.patternConnected;

                    return (
                      <div
                        key={event.id}
                        className="absolute transform -translate-x-1/2"
                        style={{ left: `${event.position}%` }}
                      >
                        {/* Event Dot */}
                        <button
                          onClick={() => setSelectedEvent(event)}
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedEvent(event);
                            }
                            // Arrow key navigation between events
                            const currentIndex = events.findIndex((e) => e.id === event.id);
                            if (e.key === "ArrowRight" && currentIndex < events.length - 1) {
                              e.preventDefault();
                              const nextEvent = events[currentIndex + 1];
                              const nextButton = document.querySelector(
                                `[aria-label*="${nextEvent.title}"]`
                              ) as HTMLElement;
                              nextButton?.focus();
                            }
                            if (e.key === "ArrowLeft" && currentIndex > 0) {
                              e.preventDefault();
                              const prevEvent = events[currentIndex - 1];
                              const prevButton = document.querySelector(
                                `[aria-label*="${prevEvent.title}"]`
                              ) as HTMLElement;
                              prevButton?.focus();
                            }
                          }}
                          className={`relative group cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card)] rounded-full ${
                            isSelected ? "z-20" : "z-10"
                          }`}
                          aria-label={`${event.title} on ${event.date}`}
                          aria-pressed={isSelected}
                          tabIndex={0}
                        >
                          {/* Outer ring for pattern events - Only in merged/recommendation states */}
                          {isPatternEvent && showPattern && (
                            <motion.div
                              key={`ring-${event.id}-${scrollState}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: scrollState === "recommendation" ? 0.5 : 0.3 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ delay: 0.4, duration: 0.24 }}
                              className="absolute inset-0 -m-2 rounded-full border-2 border-[var(--color-accent-primary)]"
                            />
                          )}

                          {/* Event Dot */}
                          <motion.div
                            className={`w-4 h-4 rounded-full transition-all ${
                              isSelected
                                ? "bg-[var(--color-accent-primary)] scale-125"
                                : isHovered
                                ? "bg-[var(--color-accent-primary)] scale-110"
                                : isPatternEvent && showPattern
                                ? "bg-[var(--color-accent-primary)]"
                                : "bg-white/40"
                            }`}
                            animate={{
                              scale: isPatternEvent && showPattern && !isSelected && !isHovered ? 1 : undefined,
                              opacity: isPatternEvent && !showPattern ? 0.6 : 1,
                            }}
                            transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1] }}
                          />

                          {/* Tooltip on Hover */}
                          <AnimatePresence>
                            {isHovered && !isSelected && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1] }}
                                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-64 z-30"
                              >
                                <div className="bg-[var(--color-bg-card-elevated)] rounded-lg p-4 shadow-lg">
                                  <div className="flex items-start gap-2 mb-2">
                                    <div className={getEventColor(event.type)}>
                                      {getEventIcon(event.type)}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-semibold text-white mb-1">
                                        {event.title}
                                      </p>
                                      <p className="text-xs text-gray-400">{event.date}</p>
                                    </div>
                                  </div>
                                  {event.value && (
                                    <p className="text-xs text-[var(--color-accent-primary)] mb-2">
                                      {event.value}
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-300 leading-relaxed">
                                    {event.details}
                                  </p>
                                </div>
                                {/* Tooltip arrow */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--color-bg-card-elevated)]"></div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>

                        {/* Event Label */}
                        <div
                          className={`mt-4 text-center transition-opacity ${
                            isSelected || isHovered ? "opacity-100" : "opacity-60"
                          }`}
                        >
                          <p className="text-xs font-medium text-white mb-1">{event.title}</p>
                          <p className="text-[10px] text-gray-400">{event.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1] }}
                className="card-premium"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`${getEventColor(selectedEvent.type)} flex-shrink-0`}>
                      {getEventIcon(selectedEvent.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="card-title mb-1">{selectedEvent.title}</h3>
                      <p className="text-xs text-gray-400">{selectedEvent.date}</p>
                    </div>
                  </div>

                  {selectedEvent.value && (
                    <div className="p-4 rounded-lg bg-[var(--color-accent-bg-subtle)]">
                      <p className="text-sm font-medium text-[var(--color-accent-primary)]">
                        {selectedEvent.value}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Details</h4>
                    <p className="typography-body-secondary text-sm">{selectedEvent.details}</p>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Why this matters</h4>
                    <p className="typography-body-secondary text-sm">
                      {selectedEvent.whyItMatters}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear selection
                  </button>
                </div>
              </motion.div>
                     ) : (
                       <motion.div
                         key="empty"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         className="card-premium"
                         style={{ minHeight: '300px' }} // Prevent layout shift
                       >
                <div className="space-y-4 text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-bg-subtle)] flex items-center justify-center mx-auto">
                    <Activity className="w-6 h-6 text-[var(--color-accent-primary)]" />
                  </div>
                  <div>
                    <h3 className="card-title mb-2">Select an event</h3>
                    <p className="typography-body-secondary text-sm">
                      Click on any timeline event to see why it matters and how it connects to your
                      health patterns.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Why This Drawer */}
      <WhyThisDrawer isOpen={isWhyDrawerOpen} onClose={() => setIsWhyDrawerOpen(false)} />
    </div>
  );
}

