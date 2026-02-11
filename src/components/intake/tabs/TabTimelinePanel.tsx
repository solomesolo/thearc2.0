"use client";

import React from "react";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabTimelinePanelProps {
  intakeData: any;
}

export default function TabTimelinePanel({ intakeData }: TabTimelinePanelProps) {
  // Mock timeline artifacts
  const artifacts = [
    { id: "intake_note", type: "Intake note", status: "Autosaved", timestamp: "2m ago" },
    { id: "orders", type: "Orders", status: "Drafted", timestamp: "5m ago" },
    { id: "tasks", type: "Tasks", status: "None", timestamp: "" },
    { id: "followup", type: "Follow-up", status: "Not scheduled", timestamp: "" },
    { id: "messages", type: "Messages", status: "None", timestamp: "" },
  ];

  const items = artifacts.map((artifact) => ({
    id: artifact.id,
    label: artifact.type,
    value: `${artifact.status}${artifact.timestamp ? ` (${artifact.timestamp})` : ""}`,
  }));

  const quickActions = [
    {
      id: "mark_orders_placed",
      label: "Mark orders placed",
      onClick: () => alert("Mark orders placed (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "finish_unfinished",
      label: "Finish unfinished",
      onClick: () => alert("Finish unfinished (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    {
      id: "orders_draft",
      text: "Orders drafted but not placed",
      type: "prompt" as const,
    },
  ];

  const documentationAnchors = [
    { id: "audit_trail", label: "Audit trail entries: who, what, when", status: "captured" },
  ];

  return (
    <RightRailTabPanel
      title="Today's artifacts"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}




