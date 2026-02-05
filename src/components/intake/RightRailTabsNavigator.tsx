"use client";

import React, { useState, useEffect, useRef } from "react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  sectionId: string;
  group?: "intake" | "outputs";
}

const tabs: TabItem[] = [
  { id: "overview", label: "Overview", icon: <OverviewIcon />, sectionId: "overview", group: "intake" },
  { id: "cardiovascular", label: "Cardiovascular", icon: <HeartIcon />, sectionId: "cardiovascular", group: "intake" },
  { id: "metabolic", label: "Metabolic", icon: <MetabolicIcon />, sectionId: "metabolic", group: "intake" },
  { id: "cancer", label: "Cancer / Screening", icon: <CancerIcon />, sectionId: "cancer-screening", group: "intake" },
  { id: "neuro", label: "Neuro", icon: <NeuroIcon />, sectionId: "neuro", group: "intake" },
  { id: "sleep", label: "Sleep", icon: <SleepIcon />, sectionId: "sleep", group: "intake" },
  { id: "fitness", label: "Fitness", icon: <FitnessIcon />, sectionId: "fitness", group: "intake" },
  { id: "plan", label: "Plan", icon: <PlanIcon />, sectionId: "plan", group: "outputs" },
  { id: "timeline", label: "Timeline", icon: <TimelineIcon />, sectionId: "timeline", group: "outputs" },
  { id: "documents", label: "Documents", icon: <DocumentsIcon />, sectionId: "documents", group: "outputs" },
];

interface RightRailTabsNavigatorProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  centerScrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function RightRailTabsNavigator({
  activeTab,
  onTabChange,
  centerScrollContainerRef,
}: RightRailTabsNavigatorProps) {
  const [activeTabFromScroll, setActiveTabFromScroll] = useState<string>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up IntersectionObserver to track which section is visible
  useEffect(() => {
    if (!centerScrollContainerRef.current) return;

    const container = centerScrollContainerRef.current;
    const sections = tabs
      .map((tab) => container.querySelector(`#${tab.sectionId}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let activeSection = "";

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSection = entry.target.id;
          }
        });

        if (activeSection && maxRatio > 0.1) {
          const tab = tabs.find((t) => t.sectionId === activeSection);
          if (tab) {
            setActiveTabFromScroll(tab.id);
            // Optionally update parent's activeTab if desired
          }
        }
      },
      {
        root: container,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observerRef.current?.unobserve(section);
      });
      observerRef.current?.disconnect();
    };
  }, [centerScrollContainerRef]);

  const scrollToSection = (sectionId: string) => {
    const section = centerScrollContainerRef.current?.querySelector(`#${sectionId}`) as HTMLElement;
    if (section && centerScrollContainerRef.current) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleTabClick = (tab: TabItem) => {
    onTabChange(tab.id);
    scrollToSection(tab.sectionId);
  };

  const intakeTabs = tabs.filter((t) => t.group === "intake");
  const outputsTabs = tabs.filter((t) => t.group === "outputs");

  // Use activeTab from props, but sync with scroll if needed
  const currentActiveTab = activeTab || activeTabFromScroll;

  return (
    <div
      className="bg-white border-b border-gray-200 overflow-y-auto"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        maxHeight: "280px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Intake group */}
      <div className="pb-2">
        {intakeTabs.length > 0 && (
          <>
            <div className="px-3 py-2">
              <span className="text-[10px] leading-[14px] font-medium text-gray-400 uppercase tracking-wide">
                Intake
              </span>
            </div>
            {intakeTabs.map((tab) => {
              const isActive = currentActiveTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`w-full flex items-center gap-2 text-left transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-900 border-l-2 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{
                    height: "32px",
                    padding: "0 12px 0 10px", // Left padding accounts for border
                  }}
                >
                  <span className="flex-shrink-0" style={{ width: "16px", height: "16px" }}>
                    {tab.icon}
                  </span>
                  <span className="text-[13px] leading-[18px] font-normal">{tab.label}</span>
                </button>
              );
            })}
          </>
        )}
      </div>

      {/* Outputs group */}
      {outputsTabs.length > 0 && (
        <div className="border-t border-gray-200 pt-2">
          <div className="px-3 py-2">
            <span className="text-[10px] leading-[14px] font-medium text-gray-400 uppercase tracking-wide">
              Outputs
            </span>
          </div>
          {outputsTabs.map((tab) => {
            const isActive = currentActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`w-full flex items-center gap-2 text-left transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-900 border-l-2 border-blue-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{
                  height: "32px",
                  padding: "0 12px 0 10px",
                }}
              >
                <span className="flex-shrink-0" style={{ width: "16px", height: "16px" }}>
                  {tab.icon}
                </span>
                <span className="text-[13px] leading-[18px] font-normal">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Icon components (same as before)
function OverviewIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function MetabolicIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function CancerIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function NeuroIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function SleepIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function FitnessIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DocumentsIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}


