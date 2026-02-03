"use client";

import React from "react";
import RightRailTabPanel from "../RightRailTabPanel";

interface TabDocumentsPanelProps {
  intakeData: any;
}

export default function TabDocumentsPanel({ intakeData }: TabDocumentsPanelProps) {
  const items = [
    { id: "uploaded", label: "Uploaded records", value: "0 documents" },
    { id: "missing", label: "Missing documents", value: "Not known" },
    { id: "tags", label: "Tag categories", value: "—" },
    { id: "review_status", label: "Review status", value: "Not reviewed" },
  ];

  const quickActions = [
    {
      id: "upload",
      label: "Upload document",
      onClick: () => alert("Upload document (to be implemented)"),
      variant: "primary" as const,
    },
    {
      id: "tag",
      label: "Tag to category",
      onClick: () => alert("Tag document (to be implemented)"),
      variant: "outline" as const,
    },
    {
      id: "mark_reviewed",
      label: "Mark reviewed",
      onClick: () => alert("Mark reviewed (to be implemented)"),
      variant: "outline" as const,
    },
  ];

  const suggestions = [
    {
      id: "ingestion",
      text: "Document ingestion assist (stub): detect key values / duplicates",
      type: "info" as const,
    },
  ];

  const documentationAnchors = [
    { id: "documents_reviewed", label: "Documents reviewed/awaiting", status: "not_started" },
    { id: "imported_history", label: "Imported history acknowledged", status: "not_started" },
  ];

  return (
    <RightRailTabPanel
      title="Documents"
      items={items}
      quickActions={quickActions}
      suggestions={suggestions}
      documentationAnchors={documentationAnchors}
    />
  );
}

