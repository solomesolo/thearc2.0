"use client";

import React from "react";
import { SuggestedDiagnostic } from "@/lib/intakeTypes";
import SuggestedDiagnosticsAccordion from "./SuggestedDiagnosticsAccordion";
import MissingInfoAlerts from "./MissingInfoAlerts";

interface DecisionSupportPanelProps {
  diagnostics: SuggestedDiagnostic[];
  onDiagnosticsChange: (diagnostics: SuggestedDiagnostic[]) => void;
}

export default function DecisionSupportPanel({
  diagnostics,
  onDiagnosticsChange,
}: DecisionSupportPanelProps) {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#FFFFFF", // Surface (white)
      }}
    >
      {/* Suggested Diagnostics Accordion */}
      <SuggestedDiagnosticsAccordion
        diagnostics={diagnostics}
        onDiagnosticsChange={onDiagnosticsChange}
      />

      {/* Missing Information Alerts */}
      <MissingInfoAlerts />
    </div>
  );
}



