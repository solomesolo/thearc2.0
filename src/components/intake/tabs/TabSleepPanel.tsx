"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabSleepPanelProps {
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
}

export default function TabSleepPanel({ intakeData, onUpdateIntakeData }: TabSleepPanelProps) {
  const items = [
    { id: "duration", label: "Duration", value: "Not captured" },
    { id: "quality", label: "Quality", value: "Not captured" },
    { id: "timing", label: "Timing", value: "Not captured" },
    { id: "awakenings", label: "Awakenings", value: "Not captured" },
    { id: "snoring", label: "Snoring risk", value: "Not captured" },
    { id: "circadian", label: "Circadian stability", value: "Not captured" },
  ];

  const quickActions = [
    {
      id: "capture_baseline",
      label: "Capture sleep baseline",
      onClick: () => alert("Capture sleep baseline (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "no_action",
      label: "Mark: no action now",
      onClick: () => alert("Set monitor (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "add_questions",
      label: "Add sleep questions",
      onClick: () => alert("Add sleep questions (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    {
      id: "no_concerns",
      text: "No sleep concerns detected",
      type: "info" as const,
    },
  ];

  const documentationAnchors = [
    { id: "sleep_reviewed", label: "Sleep reviewed stable/unstable", status: "not_started" },
    { id: "risks_asked", label: "Risks asked", status: "not_started" },
    { id: "monitor", label: "Monitor vs investigate", status: "not_started" },
  ];

  return (
    <RightRailTabPanel
      title="Sleep snapshot"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}




