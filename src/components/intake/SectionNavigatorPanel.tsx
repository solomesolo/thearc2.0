"use client";

import React, { useState, useEffect, useRef } from "react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  sectionId: string;
}

const tabs: TabItem[] = [
  { id: "overview", label: "Overview", icon: <OverviewIcon />, sectionId: "overview" },
  { id: "cardiovascular", label: "Cardiovascular", icon: <HeartIcon />, sectionId: "cardiovascular" },
  { id: "metabolic", label: "Metabolic", icon: <MetabolicIcon />, sectionId: "metabolic" },
  { id: "cancer", label: "Cancer / Screening", icon: <CancerIcon />, sectionId: "cancer-screening" },
  { id: "neuro", label: "Neuro", icon: <NeuroIcon />, sectionId: "neuro" },
  { id: "sleep", label: "Sleep", icon: <SleepIcon />, sectionId: "sleep" },
  { id: "fitness", label: "Fitness", icon: <FitnessIcon />, sectionId: "fitness" },
  { id: "plan", label: "Plan", icon: <PlanIcon />, sectionId: "plan" },
  { id: "timeline", label: "Timeline", icon: <TimelineIcon />, sectionId: "timeline" },
  { id: "documents", label: "Documents", icon: <DocumentsIcon />, sectionId: "documents" },
];

interface SectionNavigatorPanelProps {
  centerScrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function SectionNavigatorPanel({ centerScrollContainerRef }: SectionNavigatorPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up IntersectionObserver to track which section is visible
  useEffect(() => {
    if (!centerScrollContainerRef.current) return;

    const container = centerScrollContainerRef.current;
    // Use querySelector within the center scroll container, not document
    const sections = tabs
      .map((tab) => container.querySelector(`#${tab.sectionId}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let activeSection = "";

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSection = entry.target.id;
          }
        });

        // Update active tab if we found a section with significant visibility
        if (activeSection && maxRatio > 0.1) {
          const tab = tabs.find((t) => t.sectionId === activeSection);
          if (tab) {
            setActiveTab(tab.id);
          }
        }
      },
      {
        root: container,
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper 20% of viewport
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
    // Use querySelector within the center scroll container, not document.getElementById
    const section = centerScrollContainerRef.current?.querySelector(`#${sectionId}`) as HTMLElement;
    if (section && centerScrollContainerRef.current) {
      // Use scrollIntoView with the container as the scroll parent
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleTabClick = (tab: TabItem) => {
    setActiveTab(tab.id);
    scrollToSection(tab.sectionId);
  };

  return (
    <div
      className="bg-white border-b border-gray-200"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Header with collapse toggle */}
      <div className="flex items-center justify-between" style={{ padding: "12px 16px" }}>
        <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide">
          Important Tabs
        </h3>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Tab list */}
      {!collapsed && (
        <div className="pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
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
                  padding: "0 16px 0 14px", // Left padding accounts for border
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

      {/* Collapsed mode - icons only */}
      {collapsed && (
        <div className="pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`w-full flex items-center justify-center transition-colors ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
                style={{
                  height: "32px",
                }}
                aria-label={tab.label}
              >
                <span style={{ width: "16px", height: "16px" }}>{tab.icon}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Icon components
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




