"use client";

import React, { useState } from "react";
import { Database, TestTube, Activity, CheckCircle2, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SystemPreview() {
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [showSignalDetails, setShowSignalDetails] = useState(false);

  const sources = [
    { id: "ehr", icon: <Database className="w-4 h-4" />, label: "EHR", connected: true, relatedTypes: ["lab"] },
    { id: "labs", icon: <TestTube className="w-4 h-4" />, label: "Labs", connected: true, relatedTypes: ["lab"] },
    { id: "wearables", icon: <Activity className="w-4 h-4" />, label: "Wearables", connected: true, relatedTypes: ["wearable"] },
  ];

  const timelineEvents = [
    { 
      id: 0,
      date: "Jan", 
      type: "lab", 
      position: 10,
      title: "Lipid Panel",
      whyItMatters: "Elevated LDL over time increases cardiovascular risk. This baseline helps track intervention effectiveness.",
    },
    { 
      id: 1,
      date: "Feb", 
      type: "wearable", 
      position: 35,
      title: "Resting Heart Rate",
      whyItMatters: "Resting heart rate trends can indicate cardiovascular fitness and recovery status.",
    },
    { 
      id: 2,
      date: "Mar", 
      type: "lab", 
      position: 60,
      title: "HbA1c Test",
      whyItMatters: "HbA1c trends help identify metabolic health patterns before they become problematic.",
    },
    { 
      id: 3,
      date: "Apr", 
      type: "symptom", 
      position: 85,
      title: "Fatigue Report",
      whyItMatters: "Fatigue patterns can correlate with metabolic markers and sleep quality changes.",
    },
  ];

  // Get related event indices for a source
  const getRelatedEventIndices = (sourceId: string) => {
    const source = sources.find(s => s.id === sourceId);
    if (!source) return [];
    return timelineEvents
      .map((event, idx) => source.relatedTypes.includes(event.type) ? idx : -1)
      .filter(idx => idx !== -1);
  };

  const relatedEventIndices = hoveredSource ? getRelatedEventIndices(hoveredSource) : [];
  const selectedEventData = selectedEvent !== null ? timelineEvents[selectedEvent] : null;

  const getEventColor = (type: string) => {
    switch (type) {
      case "lab":
        return "bg-[#6FFFC3]";
      case "wearable":
        return "bg-blue-400";
      case "symptom":
        return "bg-yellow-400";
      default:
        return "bg-white/40";
    }
  };

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            var(--surface-1) 0%,
            var(--surface-0) 50%,
            var(--surface-1) 100%
          )
        `,
        borderRadius: "24px",
        boxShadow: `var(--shadow-2), var(--inner-highlight)`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Faint inner highlight */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 200% 100% at 50% 0%, 
              rgba(255, 255, 255, 0.03) 0%,
              transparent 60%
            )
          `,
          borderRadius: "24px",
        }}
      />
      
      <div className="relative space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white tracking-[0.02em]">
            Live preview
          </h3>
          <span className="text-xs text-[var(--color-text-muted)] font-medium tracking-[0.01em]">3 active</span>
        </div>

        {/* Connected Sources - Icon Chips */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-muted)] tracking-[0.02em] mb-3">
            Connected sources
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map((source, idx) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.8, 0.5, 1], delay: 0.2 + idx * 0.08 }}
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/8 transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] cursor-pointer"
              >
                <div className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-ui)]">
                  {source.icon}
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap">{source.label}</span>
                {source.connected && (
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent opacity-60 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-ui)]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline - Hero Visualization */}
        <div className="pt-6">
          <div className="relative h-12">
            {/* Clean timeline line - draws in slowly */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.8, 0.5, 1], delay: 0.5 }}
              className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-border-base)]/50 transform -translate-y-1/2 origin-left"
            />
            
            {/* Pattern connection line - draws in slowly after base line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1], delay: 0.9 }}
              className="absolute top-1/2 left-[10%] w-[75%] h-px bg-[var(--color-accent-primary)]/40 transform -translate-y-1/2 origin-left"
            />

            {/* Elegant markers */}
            {timelineEvents.map((event, idx) => {
              const isHighlighted = relatedEventIndices.includes(idx);
              const isSelected = selectedEvent === idx;
              const isHovered = hoveredEvent === idx || (hoveredSource && relatedEventIndices.includes(idx));
              
              return (
                <motion.button
                  key={event.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: isSelected ? 1.4 : isHovered || isHighlighted ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1], delay: 1.1 + idx * 0.08 }}
                  onClick={() => {
                    setSelectedEvent(isSelected ? null : idx);
                    setShowSignalDetails(false);
                  }}
                  onMouseEnter={() => {
                    setHoveredEvent(idx);
                    if (!hoveredSource) {
                      const relatedSource = sources.find(s => s.relatedTypes.includes(event.type));
                      if (relatedSource) setHoveredSource(relatedSource.id);
                    }
                  }}
                  onMouseLeave={() => setHoveredEvent(null)}
                  className="group absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card-elevated)] rounded-full"
                  style={{ left: `${event.position}%` }}
                  aria-label={`${event.title} - ${event.date}`}
                >
                  {/* Marker */}
                  <div
                    className={`w-2 h-2 rounded-full ${getEventColor(event.type)} transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] ${
                      isSelected 
                        ? "ring-2 ring-[var(--color-accent-primary)] ring-offset-2 ring-offset-[var(--color-bg-card-elevated)]" 
                        : isHovered || isHighlighted
                        ? "ring-1 ring-white/40"
                        : "group-hover:ring-1 group-hover:ring-white/20"
                    }`}
                  />
                  
                  {/* Tooltip - only on hover/click */}
                  {(isSelected || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.14, ease: [0.25, 0.8, 0.5, 1] }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 rounded-md bg-[var(--color-bg-card-elevated)] shadow-lg whitespace-nowrap pointer-events-none z-10"
                    >
                      <p className="text-[10px] font-medium text-white mb-0.5">{event.title}</p>
                      <p className="text-[9px] text-[var(--color-text-muted)]">{event.date}</p>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                        <div className="w-2 h-2 bg-[var(--color-bg-card-elevated)] transform rotate-45" />
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Signal Slip - Premium slim component */}
        <div className="pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEvent !== null ? `event-${selectedEvent}` : "default"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.25, 0.8, 0.5, 1] }}
            >
              {selectedEventData ? (
                <div className="space-y-2">
                  {/* Signal header */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.8, 0.5, 1],
                        delay: 1.2,
                        times: [0, 0.5, 1]
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                    />
                    <span className="text-[10px] font-medium text-[var(--text-2)] tracking-[0.02em]">
                      Signal
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] ml-auto">{selectedEventData.date}</span>
                  </div>
                  
                  {/* Metric line */}
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium tracking-[0.01em]">
                    {selectedEventData.title}
                  </p>
                  
                  {/* Details toggle */}
                  <button
                    onClick={() => setShowSignalDetails(!showSignalDetails)}
                    className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1 group"
                  >
                    <span>{showSignalDetails ? "Hide" : "Details"}</span>
                    <span className={`transition-transform duration-[var(--duration-fast)] ease-[var(--ease-ui)] ${showSignalDetails ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  
                  {/* Why it matters - hidden by default */}
                  <AnimatePresence>
                    {showSignalDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.8, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[10px] text-[var(--color-text-tertiary)] leading-relaxed pt-1">
                          {selectedEventData.whyItMatters}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      setShowSignalDetails(false);
                    }}
                    className="text-[9px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Signal header */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.8, 0.5, 1],
                        delay: 1.2,
                        times: [0, 0.5, 1]
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                    />
                    <span className="text-[10px] font-medium text-[var(--text-2)] tracking-[0.02em]">
                      Signal
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] ml-auto">2h ago</span>
                  </div>
                  
                  {/* Metric line */}
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium tracking-[0.01em]">
                    LDL trend +12% / 18 months
                  </p>
                  
                  {/* Details toggle */}
                  <button
                    onClick={() => setShowSignalDetails(!showSignalDetails)}
                    className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1 group"
                  >
                    <span>{showSignalDetails ? "Hide" : "Details"}</span>
                    <span className={`transition-transform duration-[var(--duration-fast)] ease-[var(--ease-ui)] ${showSignalDetails ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  
                  {/* Why it matters - hidden by default */}
                  <AnimatePresence>
                    {showSignalDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.8, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[10px] text-[var(--color-text-tertiary)] leading-relaxed pt-1">
                          Rising LDL increases cardiovascular risk. Early detection enables timely intervention.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status Indicator */}
        <div className="pt-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="text-xs text-[var(--color-text-muted)]">System active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
