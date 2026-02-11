"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { Download, Eye, Edit, Link as LinkIcon, Bell, ExternalLink } from "lucide-react";
import DomainStatusDot from "@/components/domain/DomainStatusDot";
import { getDomainLabel } from "@/domain/domainConfig";

interface TimelineEvent {
  id: string;
  date_iso: string;
  type: string;
  title: string;
  summary: string;
  domain_ids: string[];
  category: string;
  source: string;
  document_ids: string[];
  signal_ids: string[];
  related_gap_ids: string[];
  related_action_ids: string[];
  badge?: string;
  needs_review?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface EventDetailPanelProps {
  event: TimelineEvent | null;
  documents?: Record<string, Document>;
  signals?: Array<{ id: string; name: string }>;
  gaps?: Array<{ id: string; title: string }>;
}

export default function EventDetailPanel({ event, documents = {}, signals = [], gaps = [] }: EventDetailPanelProps) {
  const { evtSignalClick, evtGapClick, evtActionSetReminder, evtAddDataClick } = useCommandCenterStore();

  if (!event) {
    return (
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "20px",
          position: "sticky",
          top: "88px",
          alignSelf: "flex-start",
        }}
      >
        <div style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "center", padding: "40px 20px" }}>
          Select an event to see details
        </div>
      </div>
    );
  }

  const eventDocuments = event.document_ids.map((id) => documents[id]).filter(Boolean);
  const eventSignals = signals.filter((s) => event.signal_ids.includes(s.id));
  const eventGaps = gaps.filter((g) => event.related_gap_ids.includes(g.id));

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        position: "sticky",
        top: "88px",
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>
        Event details
      </h3>

      {/* Summary */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>
          Summary
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>{event.summary}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "var(--text-tertiary)" }}>
          <div>
            <strong>Type:</strong> {event.type}
          </div>
          <div>
            <strong>Date:</strong> {format(parseISO(event.date_iso), "MMM d, yyyy 'at' h:mm a")}
          </div>
          <div>
            <strong>Source:</strong> {event.source}
          </div>
          {event.domain_ids.length > 0 && (
            <div>
              <strong>Domain:</strong> {event.domain_ids.map((d) => getDomainLabel(d as any)).join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* Linked Documents */}
      {eventDocuments.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>
            Linked data
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {eventDocuments.map((doc) => (
              <div
                key={doc.id}
                style={{
                  padding: "10px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>{doc.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{doc.type}</div>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => window.open(doc.url, "_blank")}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    title="View document"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = doc.url;
                      link.download = doc.name;
                      link.click();
                    }}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    title="Download"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Signals */}
      {eventSignals.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>
            Related signals
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {eventSignals.slice(0, 3).map((signal) => (
              <button
                key={signal.id}
                onClick={() => evtSignalClick(signal.id, signal.name)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "var(--surface-alt)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {signal.name}
                <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>View</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Missing Items */}
      {eventGaps.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>
            Missing items
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {eventGaps.slice(0, 2).map((gap) => (
              <div
                key={gap.id}
                style={{
                  padding: "10px",
                  backgroundColor: "var(--warning-light)",
                  borderRadius: "6px",
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "6px" }}>
                  {gap.title}
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => evtGapClick(gap.id, gap.title)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    Fix now
                  </button>
                  <button
                    onClick={() => evtAddDataClick()}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "transparent",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div>
        <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>
          Actions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {event.needs_review && (
            <button
              onClick={() => {
                // Open edit type modal
                console.log("Edit type for event:", event.id);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Edit size={14} />
              Edit type
            </button>
          )}
          <button
            onClick={() => evtActionSetReminder(event.id, `${event.title} reminder`)}
            style={{
              width: "100%",
              padding: "8px 12px",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Bell size={14} />
            Set reminder
          </button>
          {event.related_action_ids.length > 0 && (
            <button
              onClick={() => {
                window.location.href = "/demo/marketplace";
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "transparent",
                color: "var(--primary)",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              View options
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



