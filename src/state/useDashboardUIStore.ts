import { create } from "zustand";

export type SectionId =
  | "today"
  | "signals"
  | "watchlist"
  | "healthmap"
  | "nextsteps"
  | "reminders"
  | "marketplace";

export type ContextSelection =
  | { type: "gap"; id: string }
  | { type: "signal"; id: string }
  | { type: "action"; id: string }
  | { type: "service"; id: string }
  | null;

export type ModalId = "gap" | "signal" | "reminder" | "service" | "upload" | null;

export interface MarketplaceFilter {
  sourceType: "gap" | "action";
  sourceId: string;
  label: string; // e.g. "Lipid panel gap"
}

interface DashboardUIState {
  activeSection: SectionId;
  contextSelection: ContextSelection;
  marketplaceFilter: MarketplaceFilter | null;
  openModal: ModalId;
  modalPayload: any | null;
  highlightId: string | null; // element id to ring-highlight for 1.5s

  setActiveSection: (s: SectionId) => void;
  scrollToSection: (s: SectionId) => void;
  openGap: (gapId: string) => void;
  openSignal: (signalId: string) => void;
  openReminder: (prefill?: any) => void;
  openService: (serviceId: string) => void;
  openUpload: (gapId?: string) => void;
  closeModal: () => void;
  setMarketplaceFilter: (f: MarketplaceFilter | null) => void;
  setHighlightId: (id: string | null) => void;
}

export const useDashboardUIStore = create<DashboardUIState>((set, get) => ({
  activeSection: "today",
  contextSelection: null,
  marketplaceFilter: null,
  openModal: null,
  modalPayload: null,
  highlightId: null,

  setActiveSection: (s: SectionId) => {
    set({ activeSection: s });
  },

  scrollToSection: (s: SectionId) => {
    const element = document.getElementById(s);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      set({ activeSection: s, highlightId: s });
      setTimeout(() => {
        set({ highlightId: null });
      }, 1500);
    }
  },

  openGap: (gapId: string) => {
    set({
      contextSelection: { type: "gap", id: gapId },
      openModal: "gap",
    });
  },

  openSignal: (signalId: string) => {
    set({
      contextSelection: { type: "signal", id: signalId },
      openModal: "signal",
    });
  },

  openReminder: (prefill?: any) => {
    set({
      openModal: "reminder",
      modalPayload: prefill || null,
    });
  },

  openService: (serviceId: string) => {
    set({
      contextSelection: { type: "service", id: serviceId },
      openModal: "service",
    });
  },

  openUpload: (gapId?: string) => {
    set({
      openModal: "upload",
      modalPayload: gapId ? { gapId } : null,
    });
  },

  closeModal: () => {
    set({
      openModal: null,
      modalPayload: null,
    });
  },

  setMarketplaceFilter: (f: MarketplaceFilter | null) => {
    set({ marketplaceFilter: f });
  },

  setHighlightId: (id: string | null) => {
    set({ highlightId: id });
    if (id) {
      setTimeout(() => {
        set({ highlightId: null });
      }, 1500);
    }
  },
}));


