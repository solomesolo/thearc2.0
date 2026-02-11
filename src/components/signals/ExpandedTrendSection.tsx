"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

interface Signal {
  id: string;
  name: string;
  series: Array<{ date: string; value: number }>;
  baseline: number | string;
  confidenceLevel: "High" | "Moderate" | "Low";
  dataPointCount: number;
  unit?: string;
}

interface Event {
  id: string;
  date: string;
  type: string;
  title: string;
}

interface ExpandedTrendSectionProps {
  signal: Signal | null;
  events?: Event[];
}

export default function ExpandedTrendSection({ signal, events = [] }: ExpandedTrendSectionProps) {
  if (!signal) return null;

  // Format data for Recharts
  const chartData = signal.series.map((point) => ({
    date: format(new Date(point.date), "MMM d"),
    value: point.value,
    fullDate: point.date,
  }));

  // Get baseline value (convert string to number if needed)
  const baselineValue = typeof signal.baseline === "string" ? parseFloat(signal.baseline) : signal.baseline;

  // Filter events in the signal's date range
  const signalDates = signal.series.map((s) => s.date);
  const minDate = signalDates.length > 0 ? Math.min(...signalDates.map((d) => new Date(d).getTime())) : 0;
  const maxDate = signalDates.length > 0 ? Math.max(...signalDates.map((d) => new Date(d).getTime())) : 0;
  const relatedEvents = events.filter((e) => {
    const eventDate = new Date(e.date).getTime();
    return eventDate >= minDate && eventDate <= maxDate;
  });

  return (
    <div
      id="expanded-trend-section"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        marginTop: "24px",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>
        Trend over time
      </h3>

      {/* Chart */}
      <div style={{ height: "300px", marginBottom: "20px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
              tick={{ fill: "var(--text-tertiary)" }}
            />
            <YAxis
              style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
              tick={{ fill: "var(--text-tertiary)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <ReferenceLine
              y={baselineValue}
              stroke="var(--text-tertiary)"
              strokeDasharray="3 3"
              label={{ value: "Baseline", position: "right", fill: "var(--text-tertiary)", fontSize: "11px" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ fill: "var(--primary)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Confidence note */}
      {signal.dataPointCount < 3 && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "var(--warning-light)",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--warning)" }}>
            Confidence is limited with fewer data points.
          </div>
        </div>
      )}

      {/* Related events */}
      {relatedEvents.length > 0 && (
        <div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
            Related events
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {relatedEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  padding: "6px 8px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "4px",
                }}
              >
                {format(new Date(event.date), "MMM d")} • {event.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



