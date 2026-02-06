"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { MoreVertical, FileText, Image, Pill, Stethoscope, File } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface Document {
  id: string;
  title: string;
  docType: "lab" | "imaging" | "prescription" | "note" | "other";
  dateOfService?: string;
  uploadedAt: string;
  source: "provider" | "upload" | "wearable";
  status: "processed" | "processing" | "needs_review" | "failed";
  providerName?: string;
  domainTags?: string[];
}

interface DocumentsTableProps {
  documents: Document[];
  selectedDocumentId: string | null;
  onDocumentSelect: (docId: string) => void;
}

export default function DocumentsTable({
  documents,
  selectedDocumentId,
  onDocumentSelect,
}: DocumentsTableProps) {
  // Document actions will be handled via modals

  const getDocTypeIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <FileText size={16} />;
      case "imaging":
        return <Image size={16} />;
      case "prescription":
        return <Pill size={16} />;
      case "note":
        return <Stethoscope size={16} />;
      default:
        return <File size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "var(--success)";
      case "processing":
        return "var(--info)";
      case "needs_review":
        return "var(--warning)";
      case "failed":
        return "var(--danger)";
      default:
        return "var(--text-tertiary)";
    }
  };

  const getDocTypeLabel = (type: string) => {
    switch (type) {
      case "lab":
        return "Lab results";
      case "imaging":
        return "Imaging";
      case "prescription":
        return "Prescription";
      case "note":
        return "Clinical note";
      default:
        return "Other";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "var(--surface-alt)", borderBottom: "1px solid var(--border)" }}>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Document
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Type
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Date
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Source
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                width: "40px",
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => {
            const isSelected = selectedDocumentId === doc.id;
            const displayDate = doc.dateOfService || doc.uploadedAt;

            return (
              <tr
                key={doc.id}
                onClick={() => onDocumentSelect(doc.id)}
                style={{
                  backgroundColor: isSelected ? "var(--surface-alt)" : "transparent",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "var(--surface-alt)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ color: "var(--text-secondary)" }}>{getDocTypeIcon(doc.docType)}</div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          marginBottom: "2px",
                        }}
                      >
                        {doc.title}
                      </div>
                      {doc.providerName && (
                        <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                          {doc.providerName}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-secondary)" }}>
                  {getDocTypeLabel(doc.docType)}
                </td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-secondary)" }}>
                  {format(parseISO(displayDate), "MMM d, yyyy")}
                </td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-secondary)" }}>
                  {doc.source.charAt(0).toUpperCase() + doc.source.slice(1)}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: getStatusColor(doc.status),
                      backgroundColor: `${getStatusColor(doc.status)}20`,
                      padding: "4px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    {doc.status === "needs_review" ? "Needs review" : doc.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Open row menu
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-secondary)",
                      padding: "4px",
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

