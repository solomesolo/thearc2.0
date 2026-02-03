"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Visit1IntakeData,
  getIntakeData,
  saveIntakeData,
  extractRiskFactors,
  suggestDiagnostics,
  AutosaveStatus,
  VisitStatus,
  RiskCategory,
  RiskLevel,
  SuggestedDiagnostic,
  initializeDummyData,
} from "@/lib/intakeTypes";
import { getPatient, getVisit1 } from "@/lib/patientTypes";
import IntakeHeader from "./IntakeHeader";
import PatientContextPanel from "./PatientContextPanel";
import PatientStoryEditor from "./PatientStoryEditor";
import GuidedReviewAccordion from "./GuidedReviewAccordion";
import LiveRiskMap from "./LiveRiskMap";
import OpenQuestionsEditor from "./OpenQuestionsEditor";
import VisitFooterActions from "./VisitFooterActions";
import OrderDiagnosticsModal from "./OrderDiagnosticsModal";
import Visit1TabSanityDrawer from "./Visit1TabSanityDrawer";
import { computeVisit1Progress } from "@/lib/visit1ProgressEngine";

interface FirstVisitIntakeWorkspaceProps {
  patientId: string;
}

export default function FirstVisitIntakeWorkspace({ patientId }: FirstVisitIntakeWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/cabinet/priority-queue";

  const [patient, setPatient] = useState<any>(null);
  const [visit, setVisit] = useState<any>(null);
  const [intakeData, setIntakeData] = useState<Visit1IntakeData | null>(null);
  const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>("saved");
      const [visitElapsedTime, setVisitElapsedTime] = useState(0);
      const [showOrderModal, setShowOrderModal] = useState(false);
      const [selectedTab, setSelectedTab] = useState<string | null>(null);
      const centerScrollContainerRef = useRef<HTMLDivElement>(null);
      
      // Compute tab statuses from intake data
      const tabStatuses = intakeData ? computeVisit1Progress(intakeData) : {};

  // Load patient and visit data
  useEffect(() => {
    const patientData = getPatient(patientId);
    const visitData = getVisit1(patientId);
    let intake = getIntakeData(patientId);

    // Initialize intake data if it doesn't exist
    if (!intake && patientData) {
      // Initialize with dummy data for demo
      intake = initializeDummyData(patientId);
    }

    setPatient(patientData);
    setVisit(visitData);
    setIntakeData(intake);

    // Start visit timer
    if (visitData?.startedAtISO) {
      const startTime = new Date(visitData.startedAtISO).getTime();
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes
        setVisitElapsedTime(elapsed);
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [patientId]);

  // Autosave every 10 seconds
  useEffect(() => {
    if (!intakeData) return;

    const interval = setInterval(() => {
      setAutosaveStatus("saving");
      saveIntakeData(patientId, intakeData);
      
      // Update risk map based on narrative
      if (intakeData.patientStory.narrative) {
        const { risks, riskMap } = extractRiskFactors(intakeData.patientStory.narrative);
        const updatedRiskMap = riskMap;
        const updatedDiagnostics = suggestDiagnostics(intakeData.patientStory.narrative, updatedRiskMap);
        
        setIntakeData((prev) => ({
          ...prev!,
          knownRisks: risks,
          riskMap: updatedRiskMap,
          suggestedDiagnostics: updatedDiagnostics,
        }));
      }

      setTimeout(() => setAutosaveStatus("saved"), 500);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [intakeData, patientId]);

  const updateIntakeData = useCallback((updates: Partial<Visit1IntakeData>) => {
    setIntakeData((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      saveIntakeData(patientId, updated);
      return updated;
    });
  }, [patientId]);

  const handleCompleteVisit = () => {
    if (!intakeData) return;

    // Update visit status
    updateIntakeData({ visitStatus: "completed" });

    // Generate summaries and update queue (mocked for now)
    // In production: 
    // - Generate visit summary
    // - Generate patient summary
    // - Update Priority Queue (remove visit/intake triggers)
    // - Create audit events
    // - Send notifications if needed
    
    console.log("Visit completed - generating summaries...");
    console.log("Visit summary generated");
    console.log("Patient summary generated");
    console.log("Priority Queue updated");
    console.log("Audit events logged");

    // Show completion feedback
    alert("Visit completed! Summary generated and queue updated.");

    // Navigate back
    router.push(returnTo);
  };

  const handleOrderDiagnostics = () => {
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (finalSelected: SuggestedDiagnostic[]) => {
    if (!intakeData) return;

    // Update diagnostics with final selection
    const updatedDiagnostics = intakeData.suggestedDiagnostics.map((d) => ({
      ...d,
      selected: finalSelected.some((selected) => selected.id === d.id),
    }));

    updateIntakeData({ suggestedDiagnostics: updatedDiagnostics });

    // Log audit event (already logged in modal, but confirm here)
    console.log("Diagnostics ordered successfully");

    // Optional: Clear selected diagnostics after ordering
    // Uncomment if desired:
    // const clearedDiagnostics = updatedDiagnostics.map((d) => ({ ...d, selected: false }));
    // updateIntakeData({ suggestedDiagnostics: clearedDiagnostics });

    // Show success feedback
    alert(`Ordered ${finalSelected.length} diagnostic${finalSelected.length !== 1 ? "s" : ""}.`);
  };

  if (!patient || !intakeData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    // IntakePageRoot (height: 100%)
    // Root container: display: flex; flex-direction: column; height: 100%; overflow: hidden;
    <div 
      className="flex flex-col bg-[#F7F8FA] overflow-hidden" 
      style={{ 
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header (fixed 64px) */}
      <div className="flex-shrink-0" style={{ height: "64px" }}>
        <IntakeHeader
          patient={patient}
          visit={visit}
          autosaveStatus={autosaveStatus}
          elapsedTime={visitElapsedTime}
        />
      </div>

      {/* Body: flex: 1 1 auto; min-height: 0; overflow: hidden; display: flex; */}
      <div 
        className="flex overflow-hidden" 
        style={{ 
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* LeftContext (fixed width; overflow: auto optional) */}
        <div 
          className="w-[260px] border-r border-gray-200 bg-white flex-shrink-0"
          style={{ 
            minHeight: 0,
            overflow: "auto", // Optional: only scrolls if content overflows
          }}
        >
          <PatientContextPanel
            patient={patient}
            patientGoals={intakeData.patientGoals}
            knownRisks={intakeData.knownRisks}
            onGoalsChange={(goals) => updateIntakeData({ patientGoals: goals })}
            tabStatuses={tabStatuses}
            onTabClick={(tabId) => setSelectedTab(tabId)}
          />
        </div>

        {/* CenterScroll: flex: 1 1 auto; min-width: 0; min-height: 0; overflow-y: auto; padding: 24px; ✅ main scroll container */}
        <div 
          ref={centerScrollContainerRef}
          className="bg-[#F7F8FA]" 
          style={{ 
            flex: "1 1 auto",
            minWidth: 0,
            minHeight: 0,
            overflowY: "auto",
            padding: "24px",
          }}
        >
          {/* Content wrapper - no height constraints, allows natural growth */}
          <div style={{ 
            maxWidth: "calc(75ch + 48px)", 
            margin: "0 auto",
            // Ensure no height constraints
            minHeight: "auto",
            height: "auto",
          }}>
            {/* Sections container - flex column, allows all sections to grow naturally */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "32px",
              // Ensure no height constraints
              minHeight: "auto",
              height: "auto",
            }}>
              {/* Patient Story */}
              <PatientStoryEditor
                narrative={intakeData.patientStory.narrative}
                onNarrativeChange={(narrative) =>
                  updateIntakeData({ patientStory: { ...intakeData.patientStory, narrative } })
                }
              />

              {/* Guided Review */}
              <GuidedReviewAccordion
                sections={intakeData.guidedReview}
                onSectionUpdate={(sections) => updateIntakeData({ guidedReview: sections })}
              />

              {/* Live Risk Map */}
              <LiveRiskMap riskTiles={intakeData.riskMap} />

              {/* Open Questions / Working hypotheses */}
              <OpenQuestionsEditor
                questions={intakeData.openQuestions}
                onQuestionsChange={(questions) => updateIntakeData({ openQuestions: questions })}
              />

              {/* Timeline section (placeholder - collapsible shell) */}
              <div id="timeline" className="border border-gray-200 rounded-[10px] bg-white" style={{ minHeight: "120px", padding: "16px" }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[16px] leading-[24px] font-semibold text-gray-900">Timeline</h3>
                  <span className="text-[12px] leading-[16px] text-gray-500">Coming soon</span>
                </div>
                <p className="text-[13px] leading-[18px] text-gray-600">
                  Visit timeline and key events will appear here.
                </p>
              </div>

              {/* Documents section (placeholder - collapsible shell) */}
              <div id="documents" className="border border-gray-200 rounded-[10px] bg-white" style={{ minHeight: "120px", padding: "16px" }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[16px] leading-[24px] font-semibold text-gray-900">Documents</h3>
                  <span className="text-[12px] leading-[16px] text-gray-500">Coming soon</span>
                </div>
                <p className="text-[13px] leading-[18px] text-gray-600">
                  Patient documents and attachments will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Orders draft + Missing info hints only */}
        <div
          className="w-[320px] border-l border-gray-200 bg-white flex-shrink-0 flex flex-col"
          style={{
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <div className="flex-1 overflow-y-auto" style={{ padding: "16px" }}>
            {/* Orders draft mini (if diagnostics selected) */}
            {intakeData.suggestedDiagnostics.filter((d) => d.selected).length > 0 && (
              <div className="mb-4">
                <div className="border border-gray-200 rounded-[8px] bg-gray-50/50" style={{ padding: "10px 12px" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] leading-[16px] font-medium text-gray-700">
                      Orders draft: <span style={{ fontVariantNumeric: "tabular-nums" }}>
                        {intakeData.suggestedDiagnostics.filter((d) => d.selected).length}
                      </span>
                    </span>
                    <button
                      onClick={() => setShowOrderModal(true)}
                      className="text-[12px] leading-[16px] text-gray-600 hover:text-gray-700 font-medium transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Missing info reminders (quiet, non-blocking) */}
            <div className="space-y-2">
              {tabStatuses.cardiovascular?.hint && (
                <div className="text-[11px] leading-[16px] text-gray-500 bg-gray-50/50 border border-gray-200/50 rounded-[8px]" style={{ padding: "8px 12px" }}>
                  {tabStatuses.cardiovascular.hint}
                </div>
              )}
              {tabStatuses.metabolic?.hint && (
                <div className="text-[11px] leading-[16px] text-gray-500 bg-gray-50/50 border border-gray-200/50 rounded-[8px]" style={{ padding: "8px 12px" }}>
                  {tabStatuses.metabolic.hint}
                </div>
              )}
              {tabStatuses.cancer?.hint && (
                <div className="text-[11px] leading-[16px] text-gray-500 bg-gray-50/50 border border-gray-200/50 rounded-[8px]" style={{ padding: "8px 12px" }}>
                  {tabStatuses.cancer.hint}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer (sticky 64px; always visible) */}
      <div className="flex-shrink-0" style={{ height: "64px" }}>
        <VisitFooterActions
          onSaveDraft={() => {
            setAutosaveStatus("saving");
            saveIntakeData(patientId, intakeData!);
            setTimeout(() => setAutosaveStatus("saved"), 500);
          }}
          onOrderDiagnostics={handleOrderDiagnostics}
          onScheduleVisit2={() => {
            // In production: open scheduling modal
            alert("Schedule Visit 2 (to be implemented)");
          }}
          onSendSummary={() => {
            // In production: open summary sending modal
            alert("Send patient summary (to be implemented)");
          }}
          onCompleteVisit={handleCompleteVisit}
          visitStatus={intakeData.visitStatus}
        />
      </div>

          {/* Order Diagnostics Modal */}
          {showOrderModal && intakeData && (
            <OrderDiagnosticsModal
              selectedDiagnostics={intakeData.suggestedDiagnostics.filter((d) => d.selected)}
              allDiagnostics={intakeData.suggestedDiagnostics}
              onClose={() => setShowOrderModal(false)}
              onSubmit={handleOrderSubmit}
            />
          )}

          {/* Sanity-Check Drawer (opens on tab click) */}
          {selectedTab && intakeData && tabStatuses[selectedTab] && (
            <Visit1TabSanityDrawer
              tabId={selectedTab}
              tabLabel={
                selectedTab === "cardiovascular" ? "Cardiovascular" :
                selectedTab === "metabolic" ? "Metabolic" :
                selectedTab === "cancer" ? "Cancer / Screening" :
                selectedTab === "neuro" ? "Neuro" :
                selectedTab === "sleep" ? "Sleep" :
                selectedTab === "fitness" ? "Fitness" :
                selectedTab === "plan" ? "Plan" :
                selectedTab === "timeline" ? "Timeline" :
                selectedTab === "documents" ? "Documents" :
                selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)
              }
              tabStatus={tabStatuses[selectedTab].status}
              tabHint={tabStatuses[selectedTab]?.hint || null}
              intakeData={intakeData}
              onUpdateIntakeData={updateIntakeData}
              onClose={() => setSelectedTab(null)}
              onJumpToOverview={(sectionId) => {
                // Scroll to section in center column
                // Note: JumpToOverviewLink will handle closing the overlay after scroll
                const section = centerScrollContainerRef.current?.querySelector(`#${sectionId}`) as HTMLElement;
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
            />
          )}
        </div>
      );
    }

