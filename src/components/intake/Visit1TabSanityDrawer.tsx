"use client";

import React from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import { TabStatus } from "@/lib/visit1ProgressEngine";
import CardioTabView from "./tabs/CardioTabView";
import MetabolicTabView from "./tabs/MetabolicTabView";
import CancerTabView from "./tabs/CancerTabView";
import NeuroTabView from "./tabs/NeuroTabView";
import SleepTabView from "./tabs/SleepTabView";
import FitnessTabView from "./tabs/FitnessTabView";
import PlanTabView from "./tabs/PlanTabView";
import TimelineTabView from "./tabs/TimelineTabView";
import DocumentsTabView from "./tabs/DocumentsTabView";
import JumpToOverviewLink from "./shared/JumpToOverviewLink";
import Visit1TabOverlay from "./Visit1TabOverlay";

interface Visit1TabSanityDrawerProps {
  tabId: string;
  tabLabel: string;
  tabStatus: TabStatus;
  tabHint?: string | null;
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onClose: () => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function Visit1TabSanityDrawer({
  tabId,
  tabLabel,
  tabStatus,
  tabHint,
  intakeData,
  onUpdateIntakeData,
  onClose,
  onJumpToOverview,
}: Visit1TabSanityDrawerProps) {
  const getStatusIndicator = () => {
    switch (tabStatus) {
      case "reviewed":
        return <span className="text-[12px]" style={{ color: "#10B981" }}>🟢</span>;
      case "partial":
        return <span className="text-[12px]" style={{ color: "#F59E0B" }}>🟡</span>;
      case "not_reviewed":
        return <span className="text-[12px]" style={{ color: "#9CA3AF" }}>⬜</span>;
    }
  };

  const getSectionId = (): string => {
    const sectionMap: Record<string, string> = {
      cardiovascular: "cardiovascular",
      metabolic: "metabolic",
      cancer: "cancer-screening",
      neuro: "neuro",
      sleep: "sleep",
      fitness: "fitness",
      plan: "plan",
      timeline: "timeline",
      documents: "documents",
    };
    return sectionMap[tabId] || "overview";
  };

  const renderTabContent = () => {
    const commonProps = {
      intakeData,
      hint: tabHint,
      onUpdateIntakeData,
      onJumpToOverview,
    };

    switch (tabId) {
      case "cardiovascular":
        return <CardioTabView {...commonProps} />;
      case "metabolic":
        return <MetabolicTabView {...commonProps} />;
      case "cancer":
        return <CancerTabView {...commonProps} />;
      case "neuro":
        return <NeuroTabView {...commonProps} />;
      case "sleep":
        return <SleepTabView {...commonProps} />;
      case "fitness":
        return <FitnessTabView {...commonProps} />;
      case "plan":
        return <PlanTabView {...commonProps} />;
      case "timeline":
        return <TimelineTabView {...commonProps} />;
      case "documents":
        return <DocumentsTabView {...commonProps} />;
      default:
        return <div className="text-[13px] text-gray-500">Tab content not available.</div>;
    }
  };

  const sectionId = getSectionId();
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  return (
    <Visit1TabOverlay
      title={tabLabel}
      statusIndicator={getStatusIndicator()}
      onClose={onClose}
      isEditing={false} // Can be enhanced to track editing state from tab views
      hasUnsavedChanges={hasUnsavedChanges}
      footer={
        <JumpToOverviewLink
          sectionId={sectionId}
          onJump={(sectionId) => {
            // Scroll to section first, then close
            onJumpToOverview(sectionId);
            // onClose is called by JumpToOverviewLink after jump
          }}
          onClose={onClose}
        />
      }
    >
      <div className="p-6">
        {renderTabContent()}
      </div>
    </Visit1TabOverlay>
  );
}

