"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import documentsData from "@/mock/documents.json";

interface Document {
  id: string;
  title: string;
  docType: "lab" | "imaging" | "prescription" | "note" | "other";
  dateOfService?: string;
  domainTags?: string[];
}

interface EditDocumentModalProps {
  isOpen: boolean;
  documentId: string | null;
  onClose: () => void;
  onSave: (document: Document) => void;
}

export default function EditDocumentModal({
  isOpen,
  documentId,
  onClose,
  onSave,
}: EditDocumentModalProps) {
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState<"lab" | "imaging" | "prescription" | "note" | "other">("other");
  const [dateOfService, setDateOfService] = useState("");
  const [domainTags, setDomainTags] = useState<string[]>([]);

  const document = documentId
    ? documentsData.documents.find((d) => d.id === documentId)
    : null;

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setDocType(document.docType);
      setDateOfService(document.dateOfService || "");
      setDomainTags(document.domainTags || []);
    }
  }, [document]);

  if (!isOpen || !document) return null;

  const availableDomains = [
    "cardiovascular",
    "metabolic",
    "cancer_screening",
    "neuro",
    "sleep",
    "fitness",
    "overview",
  ];

  const handleTagToggle = (tag: string) => {
    if (domainTags.includes(tag)) {
      setDomainTags(domainTags.filter((t) => t !== tag));
    } else {
      setDomainTags([...domainTags, tag]);
    }
  };

  const handleSave = () => {
    onSave({
      id: document.id,
      title,
      docType,
      dateOfService: dateOfService || undefined,
      domainTags,
    });
    // Show toast
    alert("Saved.");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          padding: "24px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}>Edit details</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Title */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px", display: "block" }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                color: "var(--text-primary)",
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Document type */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px", display: "block" }}>
              Document type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                color: "var(--text-primary)",
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <option value="lab">Lab results</option>
              <option value="imaging">Imaging</option>
              <option value="prescription">Prescription</option>
              <option value="note">Clinical note</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of service */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px", display: "block" }}>
              Date of service
            </label>
            <input
              type="date"
              value={dateOfService}
              onChange={(e) => setDateOfService(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                color: "var(--text-primary)",
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Domain tags */}
          <div>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px", display: "block" }}>
              Domain tags
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {availableDomains.map((domain) => (
                <label
                  key={domain}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    backgroundColor: domainTags.includes(domain) ? "var(--primary)" : "var(--surface-alt)",
                    color: domainTags.includes(domain) ? "white" : "var(--text-primary)",
                    fontSize: "13px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={domainTags.includes(domain)}
                    onChange={() => handleTagToggle(domain)}
                    style={{ cursor: "pointer" }}
                  />
                  {domain.replace("_", " ")}
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
            <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



