"use client";

import React, { useState, useEffect, useMemo } from "react";
import CommandCenterWhoopLayout from "@/components/command-center/CommandCenterWhoopLayout";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import MissingReviewStrip from "@/components/documents/MissingReviewStrip";
import DocumentsFilters from "@/components/documents/DocumentsFilters";
import DocumentsTable from "@/components/documents/DocumentsTable";
import DocumentPreviewPanel from "@/components/documents/DocumentPreviewPanel";
import documentsData from "@/mock/documents.json";
import dashboardData from "@/mock/dashboard.json";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { subMonths, subDays, parseISO, isAfter } from "date-fns";

type DocType = "lab" | "imaging" | "prescription" | "note" | "other";
type DocStatus = "processed" | "processing" | "needs_review" | "failed";
type Source = "provider" | "upload" | "wearable";

export default function DocumentsPage() {
  const { evtAppLoaded } = useCommandCenterStore();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | DocType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | DocStatus>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | Source>("all");
  const [dateRange, setDateRange] = useState<"all" | "30d" | "90d" | "12m" | "custom">("12m");
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [reviewMode, setReviewMode] = useState(false);

  // Initialize on mount
  useEffect(() => {
    evtAppLoaded();
    // Set default selected document to most recent
    if (documentsData.documents && documentsData.documents.length > 0) {
      setSelectedDocumentId(documentsData.documents[0].id);
    }
  }, []);

  // Enable review mode when reviewMode is true
  useEffect(() => {
    if (reviewMode) {
      setStatusFilter("needs_review");
    }
  }, [reviewMode]);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    let docs = documentsData.documents || [];
    const now = new Date();

    // Filter by date range
    if (dateRange !== "all" && dateRange !== "custom") {
      const rangeMap: Record<string, Date> = {
        "30d": subDays(now, 30),
        "90d": subDays(now, 90),
        "12m": subMonths(now, 12),
      };
      const cutoffDate = rangeMap[dateRange];
      if (cutoffDate) {
        docs = docs.filter((d) => {
          const docDate = d.dateOfService ? parseISO(d.dateOfService) : parseISO(d.uploadedAt);
          return isAfter(docDate, cutoffDate);
        });
      }
    }

    // Filter by type
    if (typeFilter !== "all") {
      docs = docs.filter((d) => d.docType === typeFilter);
    }

    // Filter by status
    if (statusFilter !== "all") {
      docs = docs.filter((d) => d.status === statusFilter);
    }

    // Filter by source
    if (sourceFilter !== "all") {
      docs = docs.filter((d) => d.source === sourceFilter);
    }

    // Filter by search query
    if (query.trim()) {
      const searchLower = query.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.title.toLowerCase().includes(searchLower) ||
          d.docType.toLowerCase().includes(searchLower) ||
          d.providerName?.toLowerCase().includes(searchLower) ||
          d.domainTags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by date (most recent first)
    docs.sort((a, b) => {
      const dateA = a.dateOfService ? parseISO(a.dateOfService) : parseISO(a.uploadedAt);
      const dateB = b.dateOfService ? parseISO(b.dateOfService) : parseISO(b.uploadedAt);
      return dateB.getTime() - dateA.getTime();
    });

    return docs;
  }, [query, typeFilter, statusFilter, sourceFilter, dateRange]);

  // Update selected document if current selection is filtered out
  useEffect(() => {
    if (selectedDocumentId && !filteredDocuments.find((d) => d.id === selectedDocumentId)) {
      setSelectedDocumentId(filteredDocuments[0]?.id || null);
    } else if (!selectedDocumentId && filteredDocuments.length > 0) {
      setSelectedDocumentId(filteredDocuments[0].id);
    }
  }, [filteredDocuments, selectedDocumentId]);

  const selectedDocument = filteredDocuments.find((d) => d.id === selectedDocumentId) || null;

  const handleClearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
    setSourceFilter("all");
    setDateRange("12m");
    setReviewMode(false);
  };

  const handleReviewClick = () => {
    setReviewMode(true);
    setStatusFilter("needs_review");
  };

  const needsReviewCount = documentsData.needsReviewCount || 0;
  const missingItemsCount = documentsData.missingItemsCount || 0;

  return (
    <CommandCenterWhoopLayout
      lastUpdated={dashboardData.last_updated_iso}
      notificationsCount={dashboardData.notifications_count}
      pageTitle="Documents"
    >
      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <DocumentsHeader
          onUploadClick={() => useCommandCenterStore.getState().evtAddDataClick()}
          onConnectProviderClick={() => useCommandCenterStore.getState().evtConnectProvider()}
          onExportClick={() => useCommandCenterStore.getState().evtExportClick()}
        />

        {/* Missing/Review Strip */}
        <MissingReviewStrip
          missingCount={missingItemsCount}
          needsReviewCount={needsReviewCount}
          onFixNowClick={() => {
            // Navigate to health map filtered to missing
            window.location.href = "/demo/health-map";
          }}
          onReviewClick={handleReviewClick}
        />

        {/* Search + Filters */}
        <DocumentsFilters
          query={query}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          sourceFilter={sourceFilter}
          dateRange={dateRange}
          onQueryChange={setQuery}
          onTypeFilterChange={setTypeFilter}
          onStatusFilterChange={setStatusFilter}
          onSourceFilterChange={setSourceFilter}
          onDateRangeChange={setDateRange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={
            query.trim() !== "" ||
            typeFilter !== "all" ||
            statusFilter !== "all" ||
            sourceFilter !== "all" ||
            dateRange !== "12m"
          }
        />

        {/* Main Content: Table + Preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", marginTop: "24px" }}>
          {/* Left: Documents Table */}
          <div>
            {filteredDocuments.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "12px",
                  border: "1px dashed var(--border)",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {query.trim() || typeFilter !== "all" || statusFilter !== "all" || sourceFilter !== "all"
                    ? "No documents match your filters."
                    : "No documents yet."}
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                  {query.trim() || typeFilter !== "all" || statusFilter !== "all" || sourceFilter !== "all"
                    ? "Try adjusting your filters or search term."
                    : "Upload files or connect a provider to start building your medical library."}
                </div>
                {query.trim() || typeFilter !== "all" || statusFilter !== "all" || sourceFilter !== "all" ? (
                  <button
                    onClick={handleClearFilters}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Clear filters
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <button
                      onClick={() => useCommandCenterStore.getState().evtAddDataClick()}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "var(--primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Upload documents
                    </button>
                    <button
                      onClick={() => useCommandCenterStore.getState().evtConnectProvider()}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Connect provider
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <DocumentsTable
                documents={filteredDocuments}
                selectedDocumentId={selectedDocumentId}
                onDocumentSelect={setSelectedDocumentId}
              />
            )}
          </div>

          {/* Right: Preview Panel */}
          <DocumentPreviewPanel
            document={selectedDocument}
            signals={dashboardData.signals || []}
            gaps={dashboardData.gaps || []}
          />
        </div>
      </div>
    </CommandCenterWhoopLayout>
  );
}
