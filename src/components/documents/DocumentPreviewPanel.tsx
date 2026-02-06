"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { Download, Edit, Link as LinkIcon } from "lucide-react";
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
  linkedGapIds?: string[];
  downloadUrl?: string;
}

interface DocumentPreviewPanelProps {
  document: Document | null;
  signals: any[];
  gaps: any[];
}

export default function DocumentPreviewPanel({
  document,
  signals,
  gaps,
}: DocumentPreviewPanelProps) {
  const { closeModal } = useCommandCenterStore();

  const handleEditClick = () => {
    const store = useCommandCenterStore.getState();
    store.closeModal();
    setTimeout(() => {
      useCommandCenterStore.setState({
        modal: { type: "edit-document", payload: { documentId: document.id } },
      });
    }, 100);
  };

  const handleLinkGapClick = () => {
    const store = useCommandCenterStore.getState();
    store.closeModal();
    setTimeout(() => {
      useCommandCenterStore.setState({
        modal: { type: "link-gap", payload: { documentId: document.id } },
      });
    }, 100);
  };

  if (!document) {
    return (
      <div
        style={{
          position: "sticky",
          top: "24px",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "24px",
          height: "fit-content",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "var(--text-tertiary)" }}>
          <div style={{ fontSize: "14px", marginBottom: "4px" }}>Select an event to see details</div>
        </div>
      </div>
    );
  }

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

  const displayDate = document.dateOfService || document.uploadedAt;
  const linkedGaps = document.linkedGapIds
    ? gaps.filter((g) => document.linkedGapIds?.includes(g.id))
    : [];

  return (
    <div
      style={{
        position: "sticky",
        top: "24px",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        height: "fit-content",
        maxHeight: "calc(100vh - 48px)",
        overflowY: "auto",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "20px",
        }}
      >
        Preview
      </h3>

      {/* Preview placeholder */}
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "var(--surface-alt)",
          border: "1px dashed var(--border)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          color: "var(--text-tertiary)",
          fontSize: "13px",
        }}
      >
        PDF/Image preview placeholder
      </div>

      {/* Details Section */}
      <div style={{ marginBottom: "24px" }}>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Details
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Type: </span>
            <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
              {getDocTypeLabel(document.docType)}
            </span>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Date of service: </span>
            <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
              {format(parseISO(displayDate), "MMM d, yyyy")}
            </span>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Source: </span>
            <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
              {document.source.charAt(0).toUpperCase() + document.source.slice(1)}
            </span>
          </div>
          {document.providerName && (
            <div>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Provider: </span>
              <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                {document.providerName}
              </span>
            </div>
          )}
          {document.domainTags && document.domainTags.length > 0 && (
            <div>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Domain tags: </span>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
                {document.domainTags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "11px",
                      color: "var(--text-primary)",
                      backgroundColor: "var(--surface-alt)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Status: </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: getStatusColor(document.status),
                backgroundColor: `${getStatusColor(document.status)}20`,
                padding: "4px 8px",
                borderRadius: "12px",
              }}
            >
              {document.status === "needs_review" ? "Needs review" : document.status}
            </span>
          </div>
        </div>
      </div>

      {/* Links Section */}
      {linkedGaps.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "12px",
            }}
          >
            Links
          </h4>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Related missing items: </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "8px" }}>
              {linkedGaps.map((gap) => (
                <span
                  key={gap.id}
                  style={{
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--surface-alt)",
                    padding: "6px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {gap.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => {
            // TODO: Implement download
            console.log("Download document:", document.id);
          }}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Download size={16} />
          Download
        </button>
        <button
          onClick={handleEditClick}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Edit size={16} />
          Edit details
        </button>
        <button
          onClick={handleLinkGapClick}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <LinkIcon size={16} />
          Link to missing item
        </button>
      </div>
    </div>
  );
}

