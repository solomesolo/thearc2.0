"use client";

import React, { useState, useEffect, useMemo } from "react";
import CommandCenterWhoopLayout from "@/components/command-center/CommandCenterWhoopLayout";
import TimelineHeader from "@/components/timeline/TimelineHeader";
import DomainStatusStrip from "@/components/timeline/DomainStatusStrip";
import CategoryFilterChips from "@/components/timeline/CategoryFilterChips";
import TimelineList from "@/components/timeline/TimelineList";
import EventDetailPanel from "@/components/timeline/EventDetailPanel";
import timelineDataRaw from "@/mock/timeline.json";
import dashboardData from "@/mock/dashboard.json";

// Ensure timelineData has the correct structure with fallback
const timelineData = (timelineDataRaw && typeof timelineDataRaw === 'object' && 'events' in timelineDataRaw) 
  ? timelineDataRaw as { events: any[]; documents: any }
  : { events: [], documents: {} };
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { computeAllDomainStatuses } from "@/domain/computeDomainStatus";
import { DomainId } from "@/domain/domainConfig";
import { subMonths, subDays, parseISO, isAfter } from "date-fns";

type Domain = "all" | DomainId;
type Category = "all" | "labs" | "wearables" | "screenings" | "imaging" | "medications" | "diagnoses" | "uploads";
type Range = "30d" | "90d" | "6m" | "12m" | "24m" | "all";

export default function TimelinePage() {
  const { evtAppLoaded, context, evtClearContext } = useCommandCenterStore();
  const [domain, setDomain] = useState<Domain>("all");
  const [category, setCategory] = useState<Category>("all");
  const [range, setRange] = useState<Range>("12m");
  const [search, setSearch] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Initialize on mount only
  useEffect(() => {
    evtAppLoaded();
  }, []); // Empty dependency array - only run once on mount

  // Set initial domain from context if available (separate effect)
  useEffect(() => {
    if (context.type === "domain" && context.id) {
      const domainMap: Record<string, DomainId> = {
        heart: "cardiovascular",
        metabolic: "metabolic",
        sleep: "sleep",
        fitness: "fitness",
      };
      const mappedDomain = domainMap[context.id] || "all";
      setDomain(mappedDomain);
    }
  }, [context.type, context.id]); // Only depend on context properties, not the whole context object

  // Compute domain statuses
  const domainStatuses = useMemo(() => {
    const domainData: Record<DomainId, any> = {
      overview: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Fair" },
      cardiovascular: {
        gaps: dashboardData.gaps?.filter((g: any) => g.domain === "cardiovascular") || [],
        signals: dashboardData.signals?.filter((s: any) => s.domain === "cardiovascular") || [],
        screenings: [],
        predispositions: dashboardData.predispositions?.filter((p: any) => p.domain === "cardiovascular") || [],
        dataConfidence: "High",
      },
      metabolic: {
        gaps: [],
        signals: dashboardData.signals?.filter((s: any) => s.domain === "metabolic") || [],
        screenings: [],
        predispositions: [],
        dataConfidence: "High",
      },
      cancer_screening: {
        gaps: [],
        signals: [],
        screenings: dashboardData.screenings?.filter((s: any) => s.domain === "cancer_screening") || [],
        predispositions: [],
        dataConfidence: "Low",
      },
      neuro: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Low" },
      sleep: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "Fair" },
      fitness: { gaps: [], signals: [], screenings: [], predispositions: [], dataConfidence: "High" },
    };
    return computeAllDomainStatuses(domainData);
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    // Debug logging
    console.log("=== Timeline Debug ===");
    console.log("timelineData:", timelineData);
    console.log("timelineData type:", typeof timelineData);
    console.log("timelineData.events:", timelineData?.events);
    console.log("events length:", timelineData?.events?.length);
    
    let events = Array.isArray(timelineData?.events) ? timelineData.events : [];
    console.log("Final events array length:", events.length);
    
    if (events.length === 0) {
      console.error("⚠️ No events found! timelineData structure:", Object.keys(timelineData || {}));
    }
    
    const now = new Date();

    // Filter by range
    if (range !== "all") {
      const rangeMap: Record<string, Date> = {
        "30d": subDays(now, 30),
        "90d": subDays(now, 90),
        "6m": subMonths(now, 6),
        "12m": subMonths(now, 12),
        "24m": subMonths(now, 24),
      };
      const cutoffDate = rangeMap[range];
      if (cutoffDate) {
        events = events.filter((e) => isAfter(parseISO(e.date_iso), cutoffDate));
      }
    }

    // Filter by domain
    if (domain !== "all") {
      events = events.filter((e) => e.domain_ids.includes(domain));
    }

    // Filter by category
    if (category !== "all") {
      events = events.filter((e) => e.category === category);
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(searchLower) ||
          e.summary.toLowerCase().includes(searchLower) ||
          e.type.toLowerCase().includes(searchLower)
      );
    }

    return events;
  }, [domain, category, range, search]);

  // Set default selected event
  useEffect(() => {
    if (filteredEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(filteredEvents[0].id);
    } else if (filteredEvents.length === 0) {
      setSelectedEventId(null);
    } else if (selectedEventId && !filteredEvents.find((e) => e.id === selectedEventId)) {
      setSelectedEventId(filteredEvents[0]?.id || null);
    }
  }, [filteredEvents, selectedEventId]);

  const selectedEvent = filteredEvents.find((e) => e.id === selectedEventId) || null;

  const handleDomainChange = (newDomain: Domain) => {
    setDomain(newDomain);
    if (newDomain !== "all") {
      evtClearContext(); // Clear context when filtering
    }
  };

  const handleClearFilters = () => {
    setDomain("all");
    setCategory("all");
    setSearch("");
    evtClearContext();
  };

  return (
    <CommandCenterWhoopLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
      pageTitle="Timeline"
    >
      {/* Header */}
      <TimelineHeader range={range} search={search} onRangeChange={setRange} onSearchChange={setSearch} />

      {/* Domain Status Strip */}
      <DomainStatusStrip
        statuses={domainStatuses}
        selectedDomain={domain}
        onDomainClick={handleDomainChange}
      />

      {/* Category Filter Chips */}
      <CategoryFilterChips selectedCategory={category} onCategoryChange={setCategory} />

      {/* Clear filters button (if any filters active) */}
      {(domain !== "all" || category !== "all" || search.trim()) && (
        <div style={{ marginBottom: "16px" }}>
          <button
            onClick={handleClearFilters}
            style={{
              padding: "6px 12px",
              backgroundColor: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Main Content: Timeline List + Detail Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px" }}>
        {/* Left: Timeline List */}
        <div>
          {filteredEvents.length === 0 && search.trim() ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "var(--surface-alt)",
                borderRadius: "12px",
                border: "1px dashed var(--border)",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px" }}>
                No results found.
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                Try a different filter or search term.
              </div>
              <button
                onClick={handleClearFilters}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <TimelineList events={filteredEvents} selectedEventId={selectedEventId} onEventClick={setSelectedEventId} />
          )}
        </div>

        {/* Right: Event Detail Panel */}
        <EventDetailPanel
          event={selectedEvent}
          documents={timelineData.documents}
          signals={dashboardData.signals || []}
          gaps={dashboardData.gaps || []}
        />
      </div>
    </CommandCenterWhoopLayout>
  );
}
