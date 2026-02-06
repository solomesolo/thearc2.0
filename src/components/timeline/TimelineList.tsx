"use client";

import React from "react";
import { format, isToday, isThisWeek, parseISO, startOfWeek, startOfMonth } from "date-fns";
import TimelineEventRow from "./TimelineEventRow";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface TimelineEvent {
  id: string;
  date_iso: string;
  type: "lab" | "wearable" | "screening" | "imaging" | "medication" | "diagnosis" | "upload";
  title: string;
  summary: string;
  badge?: string;
  needs_review?: boolean;
}

interface TimelineListProps {
  events: TimelineEvent[];
  selectedEventId: string | null;
  onEventClick: (eventId: string) => void;
}

export default function TimelineList({ events, selectedEventId, onEventClick }: TimelineListProps) {
  // Group events by date
  const groupedEvents = React.useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    const today = new Date();
    const thisWeekStart = startOfWeek(today);

    events.forEach((event) => {
      const eventDate = parseISO(event.date_iso);
      let groupKey: string;

      if (isToday(eventDate)) {
        groupKey = "Today";
      } else if (isThisWeek(eventDate)) {
        groupKey = "This week";
      } else {
        const monthStart = startOfMonth(eventDate);
        groupKey = format(monthStart, "MMMM yyyy");
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(event);
    });

    // Sort events within each group (newest first)
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => parseISO(b.date_iso).getTime() - parseISO(a.date_iso).getTime());
    });

    // Sort groups
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      if (a === "This week") return -1;
      if (b === "This week") return 1;
      return parseISO(groups[b][0].date_iso).getTime() - parseISO(groups[a][0].date_iso).getTime();
    });

    return sortedKeys.map((key) => ({ label: key, events: groups[key] }));
  }, [events]);

  if (events.length === 0) {
    return (
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
          No timeline events yet.
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
          Upload documents or connect providers to build your history.
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button
            onClick={() => useCommandCenterStore.getState().evtAddDataClick()}
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
            Upload documents
          </button>
          <button
            onClick={() => useCommandCenterStore.getState().evtConnectProvider()}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Connect provider
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {groupedEvents.map((group) => (
        <div key={group.label} style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              marginBottom: "12px",
              paddingLeft: "4px",
            }}
          >
            {group.label}
          </h3>
          {group.events.map((event) => (
            <TimelineEventRow
              key={event.id}
              event={event}
              isSelected={selectedEventId === event.id}
              onClick={() => onEventClick(event.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

