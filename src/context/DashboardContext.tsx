"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ActiveSection = "overview" | "documents" | "trends" | "recommendations" | "reminders" | "marketplace";

interface ContextSelection {
  type: "gap" | "metric" | "action" | "service";
  id: string;
}

interface MarketplaceFilter {
  sourceType: "gap" | "action";
  sourceId: string;
}

type OpenModal = "gap" | "trend" | "reminder" | "service" | null;

interface DashboardState {
  activeSection: ActiveSection;
  contextSelection: ContextSelection | null;
  marketplaceFilter: MarketplaceFilter | null;
  openModal: OpenModal;
  openModalPayload: any | null;
}

interface DashboardContextType extends DashboardState {
  setActiveSection: (section: ActiveSection) => void;
  setContextSelection: (selection: ContextSelection | null) => void;
  setMarketplaceFilter: (filter: MarketplaceFilter | null) => void;
  openModal: OpenModal;
  setOpenModal: (modal: OpenModal, payload?: any) => void;
  closeModal: () => void;
  scrollToSection: (section: ActiveSection) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DashboardState>({
    activeSection: "overview",
    contextSelection: null,
    marketplaceFilter: null,
    openModal: null,
    openModalPayload: null,
  });

  const setActiveSection = useCallback((section: ActiveSection) => {
    setState((prev) => ({ ...prev, activeSection: section }));
  }, []);

  const setContextSelection = useCallback((selection: ContextSelection | null) => {
    setState((prev) => ({ ...prev, contextSelection: selection }));
  }, []);

  const setMarketplaceFilter = useCallback((filter: MarketplaceFilter | null) => {
    setState((prev) => ({ ...prev, marketplaceFilter: filter }));
  }, []);

  const setOpenModal = useCallback((modal: OpenModal, payload?: any) => {
    setState((prev) => ({ ...prev, openModal: modal, openModalPayload: payload || null }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, openModal: null, openModalPayload: null }));
  }, []);

  const scrollToSection = useCallback((section: ActiveSection) => {
    setActiveSection(section);
    
    const anchors: Record<ActiveSection, string> = {
      overview: "#overview",
      documents: "#documents",
      trends: "#trends",
      recommendations: "#recommendations",
      reminders: "#reminders",
      marketplace: "#marketplace",
    };

    const anchor = anchors[section];
    const element = document.querySelector(anchor);
    
    if (element) {
      // Scroll to element
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add highlight ring
      element.classList.add("section-highlight");
      setTimeout(() => {
        element.classList.remove("section-highlight");
      }, 1500);
    }
  }, [setActiveSection]);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setActiveSection,
        setContextSelection,
        setMarketplaceFilter,
        setOpenModal,
        closeModal,
        scrollToSection,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}


