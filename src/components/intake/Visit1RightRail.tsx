"use client";

import React, { useState, RefObject } from "react";
import { Visit1IntakeData, SuggestedDiagnostic } from "@/lib/intakeTypes";
import RightRailTabsNavigator from "./RightRailTabsNavigator";
import TabOverviewPanel from "./tabs/TabOverviewPanel";
import TabCardioPanel from "./tabs/TabCardioPanel";
import TabMetabolicPanel from "./tabs/TabMetabolicPanel";
import TabCancerPanel from "./tabs/TabCancerPanel";
import TabNeuroPanel from "./tabs/TabNeuroPanel";
import TabSleepPanel from "./tabs/TabSleepPanel";
import TabFitnessPanel from "./tabs/TabFitnessPanel";
import TabPlanPanel from "./tabs/TabPlanPanel";
import TabTimelinePanel from "./tabs/TabTimelinePanel";
import TabDocumentsPanel from "./tabs/TabDocumentsPanel";

interface Visit1RightRailProps {
  centerScrollContainerRef: RefObject<HTMLDivElement>;
  intakeData: Visit1IntakeData;
  patient: any;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onReviewOrders: () => void;
}

export default function Visit1RightRail({
  centerScrollContainerRef,
  intakeData,
  patient,
  onUpdateIntakeData,
  onReviewOrders,
}: Visit1RightRailProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const renderTabPanel = () => {
    switch (activeTab) {
      case "overview":
        return (
          <TabOverviewPanel
            intakeData={intakeData}
            patient={patient}
            onUpdateIntakeData={onUpdateIntakeData}
            onReviewOrders={onReviewOrders}
          />
        );
      case "cardiovascular":
        return (
          <TabCardioPanel
            intakeData={intakeData}
            onUpdateIntakeData={onUpdateIntakeData}
            onReviewOrders={onReviewOrders}
          />
        );
      case "metabolic":
        return (
          <TabMetabolicPanel
            intakeData={intakeData}
            onUpdateIntakeData={onUpdateIntakeData}
            onReviewOrders={onReviewOrders}
          />
        );
      case "cancer":
        return <TabCancerPanel intakeData={intakeData} onUpdateIntakeData={onUpdateIntakeData} />;
      case "neuro":
        return <TabNeuroPanel intakeData={intakeData} onUpdateIntakeData={onUpdateIntakeData} />;
      case "sleep":
        return <TabSleepPanel intakeData={intakeData} onUpdateIntakeData={onUpdateIntakeData} />;
      case "fitness":
        return <TabFitnessPanel intakeData={intakeData} onUpdateIntakeData={onUpdateIntakeData} />;
      case "plan":
        return <TabPlanPanel intakeData={intakeData} onUpdateIntakeData={onUpdateIntakeData} />;
      case "timeline":
        return <TabTimelinePanel intakeData={intakeData} />;
      case "documents":
        return <TabDocumentsPanel intakeData={intakeData} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="border-l border-gray-200 bg-white flex-shrink-0 flex flex-col"
      style={{
        width: "360px",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* Part A: Tabs Navigator (sticky, max ~280px) */}
      <div className="flex-shrink-0">
        <RightRailTabsNavigator
          activeTab={activeTab}
          onTabChange={setActiveTab}
          centerScrollContainerRef={centerScrollContainerRef}
        />
      </div>

      {/* Part B: Tab Content Panel (scrollable, fills remaining height) */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          minHeight: 0,
        }}
      >
        {renderTabPanel()}
      </div>
    </div>
  );
}

