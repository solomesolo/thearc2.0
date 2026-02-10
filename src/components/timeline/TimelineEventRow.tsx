"use client";

import React from "react";
import { FileText, Watch, Stethoscope, Image as ImageIcon, Pill, FileCheck, Upload, AlertCircle } from "lucide-react";
import { format, isToday, isThisWeek, parseISO } from "date-fns";

interface TimelineEvent {
  id: string;
  date_iso: string;
  type: "lab" | "wearable" | "screening" | "imaging" | "medication" | "diagnosis" | "upload";
  title: string;
  summary: string;
  badge?: string;
  needs_review?: boolean;
}

interface TimelineEventRowProps {
  event: TimelineEvent;
  isSelected: boolean;
  onClick: () => void;
}

export default function TimelineEventRow({ event, isSelected, onClick }: TimelineEventRowProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <FileText size={16} style={{ color: "var(--text-secondary)" }} />;
      case "wearable":
        return <Watch size={16} style={{ color: "var(--text-secondary)" }} />;
      case "screening":
        return <Stethoscope size={16} style={{ color: "var(--text-secondary)" }} />;
      case "imaging":
        return <ImageIcon size={16} style={{ color: "var(--text-secondary)" }} />;
      case "medication":
        return <Pill size={16} style={{ color: "var(--text-secondary)" }} />;
      case "diagnosis":
        return <FileCheck size={16} style={{ color: "var(--text-secondary)" }} />;
      case "upload":
        return <Upload size={16} style={{ color: "var(--text-secondary)" }} />;
      default:
        return <FileText size={16} style={{ color: "var(--text-secondary)" }} />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      lab: "Lab",
      wearable: "Wearable",
      screening: "Screening",
      imaging: "Imaging",
      medication: "Medication",
      diagnosis: "Diagnosis",
      upload: "Upload",
    };
    return labels[type] || type;
  };

  const eventDate = parseISO(event.date_iso);
  const dateStr = isToday(eventDate)
    ? "Today"
    : isThisWeek(eventDate)
    ? format(eventDate, "EEEE")
    : format(eventDate, "MMM d, yyyy");

  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px",
        backgroundColor: isSelected ? "var(--primary-light)" : "var(--surface-alt)",
        border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
        marginBottom: "8px",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "var(--surface)";
          e.currentTarget.style.borderColor = "var(--primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "var(--surface-alt)";
          e.currentTarget.style.borderColor = "var(--border)";
        }
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Icon */}
        <div style={{ flexShrink: 0, marginTop: "2px" }}>{getTypeIcon(event.type)}</div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>{event.title}</span>
            <span
              style={{
                fontSize: "10px",
                padding: "2px 6px",
                backgroundColor: "var(--surface)",
                color: "var(--text-secondary)",
                borderRadius: "3px",
                fontWeight: 500,
              }}
            >
              {getTypeLabel(event.type)}
            </span>
            {event.badge && (
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 6px",
                  backgroundColor: "var(--warning-light)",
                  color: "var(--warning)",
                  borderRadius: "3px",
                  fontWeight: 500,
                }}
              >
                {event.badge}
              </span>
            )}
            {event.needs_review && (
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 6px",
                  backgroundColor: "var(--danger-light)",
                  color: "var(--danger)",
                  borderRadius: "3px",
                  fontWeight: 500,
                }}
              >
                Needs review
              </span>
            )}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>{event.summary}</div>
        </div>

        {/* Date */}
        <div style={{ flexShrink: 0, fontSize: "11px", color: "var(--text-tertiary)", textAlign: "right" }}>
          {dateStr}
        </div>
      </div>
    </div>
  );
}


