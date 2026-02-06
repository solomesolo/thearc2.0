import { create } from "zustand";

export type ContextType = "none" | "domain" | "tile" | "signal" | "gap" | "action" | "service";
export type DomainId = "heart" | "metabolic" | "sleep" | "fitness" | "inflammation" | "mind";
export type TileId = "labs" | "imaging" | "medications" | "diagnoses" | "screenings" | "wearables";

interface UIState {
  // Context driving highlights + inbox filtering (persists across pages)
  context: { type: ContextType; id?: string };
  contextLabel: string; // for chip display e.g. "Heart"

  // Drawer control (inside the center canvas)
  isDrawerOpen: boolean;

  // Right inbox filtering
  inboxFilter: { type: "none" | "domain" | "tile" | "gap" | "action" | "signal"; id?: string; label: string };

  // Modal control
  modal: { type: "none" | "upload" | "gap" | "signal" | "reminder" | "service" | "connect-provider" | "connect-wearables" | "export" | "edit-document" | "link-gap"; payload?: any };

  // Drag upload overlay
  isDragActive: boolean;

  // Scroll + highlight
  highlightTargetId: string | null; // "riskRadar", "healthMapTiles", etc.

  // Selected services basket (for Marketplace)
  selectedServices: string[]; // service IDs

  // WHOOP-style focus state
  selectedFocusTile: "readiness" | "risk" | "confidence" | null;
  selectedDomain: DomainId | null;
}

interface CommandCenterState extends UIState {
  // Event handlers
  evtAppLoaded: () => void;
  evtNavClick: (sectionId: string) => void;
  evtDomainClick: (domainId: DomainId) => void;
  evtTileClick: (tileId: TileId) => void;
  evtSignalClick: (signalId: string, signalName: string) => void;
  evtGapClick: (gapId: string, gapTitle: string) => void;
  evtActionDetails: (actionId: string, actionTitle: string) => void;
  evtActionDoNow: (actionId: string, actionTitle: string, hasServices: boolean, recommendedFrequency?: string) => void;
  evtActionSetReminder: (actionId: string, actionTitle: string, frequency?: string) => void;
  evtInboxClearContext: () => void;
  evtDrawerClose: () => void;
  evtAddDataClick: () => void;
  evtTileAddData: (tileId: TileId) => void;
  evtDragEnter: () => void;
  evtDragLeave: () => void;
  evtDropFiles: (files: FileList) => void;
  evtUploadSuccess: (docType?: string) => void;
  evtReminderSaveSuccess: () => void;
  evtServiceSelect: (serviceId: string) => void;
  evtServiceLearnMore: (serviceId: string) => void;
  evtConnectProvider: () => void;
  evtConnectWearables: () => void;
  evtExportClick: () => void;
  evtClearContext: () => void;
  closeModal: () => void;
}

const domainLabelMap: Record<DomainId, string> = {
  heart: "Heart",
  metabolic: "Metabolic",
  sleep: "Sleep & recovery",
  fitness: "Fitness",
  inflammation: "Inflammation",
  mind: "Mind & stress",
};

const tileLabelMap: Record<TileId, string> = {
  labs: "Labs",
  imaging: "Imaging",
  medications: "Medications",
  diagnoses: "Diagnoses",
  screenings: "Screenings",
  wearables: "Wearables",
};

const tileToDocTypeMap: Record<TileId, string> = {
  labs: "Lab result",
  imaging: "Imaging report",
  medications: "Prescription",
  diagnoses: "Clinical note",
  screenings: "Clinical note",
  wearables: "", // No upload for wearables
};

// Load persisted context from localStorage
const loadPersistedContext = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("arc-ui-context");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        context: parsed.context || { type: "none" },
        contextLabel: parsed.contextLabel || "All",
        inboxFilter: parsed.inboxFilter || { type: "none", label: "All" },
        selectedServices: parsed.selectedServices || [],
      };
    }
  } catch (e) {
    console.error("Failed to load persisted context", e);
  }
  return null;
};

// Save context to localStorage
const savePersistedContext = (state: Partial<UIState>) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      "arc-ui-context",
      JSON.stringify({
        context: state.context,
        contextLabel: state.contextLabel,
        inboxFilter: state.inboxFilter,
        selectedServices: state.selectedServices,
      })
    );
  } catch (e) {
    console.error("Failed to save persisted context", e);
  }
};

const persisted = loadPersistedContext();

export const useCommandCenterStore = create<CommandCenterState>((set, get) => ({
  // Initial state (load from localStorage if available)
  context: persisted?.context || { type: "none" },
  contextLabel: persisted?.contextLabel || "All",
  isDrawerOpen: false,
  inboxFilter: persisted?.inboxFilter || { type: "none", label: "All" },
  modal: { type: "none" },
  isDragActive: false,
  highlightTargetId: null,
  selectedServices: persisted?.selectedServices || [],
  selectedFocusTile: null,
  selectedDomain: null,

  // Event: App loaded
  evtAppLoaded: () => {
    set({
      context: { type: "none" },
      contextLabel: "All",
      isDrawerOpen: false,
      inboxFilter: { type: "none", label: "All" },
      modal: { type: "none" },
      isDragActive: false,
      highlightTargetId: null,
    });
  },

  // Event: Nav click
  evtNavClick: (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      set({ highlightTargetId: sectionId });
      setTimeout(() => {
        set({ highlightTargetId: null });
      }, 1500);
    }
    // DOES NOT change context
  },

  // Event: Domain click
  evtDomainClick: (domainId: DomainId) => {
    const label = domainLabelMap[domainId];
    const newState = {
      context: { type: "domain" as const, id: domainId },
      contextLabel: label,
      isDrawerOpen: true,
      inboxFilter: { type: "domain" as const, id: domainId, label },
      highlightTargetId: "riskRadar" as string | null,
    };
    set(newState);
    savePersistedContext(newState);
    setTimeout(() => {
      set({ highlightTargetId: null });
    }, 1500);
  },

  // Event: Tile click
  evtTileClick: (tileId: TileId) => {
    const label = tileLabelMap[tileId];
    const newState = {
      context: { type: "tile" as const, id: tileId },
      contextLabel: label,
      isDrawerOpen: true,
      inboxFilter: { type: "tile" as const, id: tileId, label },
      highlightTargetId: "healthMapTiles" as string | null,
    };
    set(newState);
    savePersistedContext(newState);
    setTimeout(() => {
      set({ highlightTargetId: null });
    }, 1500);
  },

  // Event: Signal click
  evtSignalClick: (signalId: string, signalName: string) => {
    const newState = {
      context: { type: "signal" as const, id: signalId },
      contextLabel: signalName,
      modal: { type: "signal" as const, payload: { signalId } },
      inboxFilter: { type: "signal" as const, id: signalId, label: signalName },
    };
    set(newState);
    savePersistedContext(newState);
  },

  // Event: Gap click
  evtGapClick: (gapId: string, gapTitle: string) => {
    set({
      context: { type: "gap", id: gapId },
      contextLabel: gapTitle,
      modal: { type: "gap", payload: { gapId } },
      inboxFilter: { type: "gap", id: gapId, label: gapTitle },
    });
  },

  // Event: Action details
  evtActionDetails: (actionId: string, actionTitle: string) => {
    set({
      context: { type: "action", id: actionId },
      contextLabel: actionTitle,
      isDrawerOpen: true,
      inboxFilter: { type: "action", id: actionId, label: actionTitle },
    });
  },

  // Event: Action do now
  evtActionDoNow: (actionId: string, actionTitle: string, hasServices: boolean, recommendedFrequency?: string) => {
    if (hasServices) {
      set({
        context: { type: "action", id: actionId },
        contextLabel: actionTitle,
        inboxFilter: { type: "action", id: actionId, label: actionTitle },
        highlightTargetId: "servicesPanel",
      });
      const element = document.getElementById("servicesPanel");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(() => {
        set({ highlightTargetId: null });
      }, 1500);
    } else {
      set({
        context: { type: "action", id: actionId },
        contextLabel: actionTitle,
        modal: { type: "reminder", payload: { name: actionTitle, frequency: recommendedFrequency || "Monthly" } },
        inboxFilter: { type: "action", id: actionId, label: actionTitle },
      });
    }
  },

  // Event: Action set reminder
  evtActionSetReminder: (actionId: string, actionTitle: string, frequency?: string) => {
    set({
      context: { type: "action", id: actionId },
      contextLabel: actionTitle,
      modal: { type: "reminder", payload: { name: actionTitle, frequency: frequency || "Monthly" } },
      inboxFilter: { type: "action", id: actionId, label: actionTitle },
    });
  },

  // Event: Inbox clear context
  evtInboxClearContext: () => {
    set({
      context: { type: "none" },
      contextLabel: "All",
      isDrawerOpen: false,
      inboxFilter: { type: "none", label: "All" },
      highlightTargetId: null,
    });
  },

  // Event: Drawer close
  evtDrawerClose: () => {
    set({ isDrawerOpen: false });
    // context and inboxFilter remain
  },

  // Event: Add data click
  evtAddDataClick: () => {
    set({ modal: { type: "upload", payload: { prefillType: null } } });
  },

  // Event: Tile add data
  evtTileAddData: (tileId: TileId) => {
    if (tileId === "wearables") {
      // Open connect page instead
      window.location.href = "/connect/wearables";
      return;
    }
    const docType = tileToDocTypeMap[tileId];
    set({ modal: { type: "upload", payload: { prefillType: docType } } });
  },

  // Event: Drag enter
  evtDragEnter: () => {
    set({ isDragActive: true });
  },

  // Event: Drag leave
  evtDragLeave: () => {
    set({ isDragActive: false });
  },

  // Event: Drop files
  evtDropFiles: (files: FileList) => {
    set({
      isDragActive: false,
      modal: { type: "upload", payload: { files, prefillType: null } },
    });
  },

  // Event: Upload success
  evtUploadSuccess: (docType?: string) => {
    set({ modal: { type: "none" } });
    // Optional: set context to tile inferred from docType
    if (docType === "Lab result") {
      set({
        context: { type: "tile", id: "labs" },
        contextLabel: "Labs",
        isDrawerOpen: true,
        inboxFilter: { type: "tile", id: "labs", label: "Labs" },
      });
    }
  },

  // Event: Reminder save success
  evtReminderSaveSuccess: () => {
    set({ modal: { type: "none" } });
  },

  // Event: Service select
  evtServiceSelect: (serviceId: string) => {
    set((state) => {
      const newSelectedServices = state.selectedServices.includes(serviceId)
        ? state.selectedServices.filter((id) => id !== serviceId)
        : [...state.selectedServices, serviceId];
      const newState = {
        context: { type: "service" as const, id: serviceId },
        contextLabel: `Service ${serviceId}`,
        selectedServices: newSelectedServices,
        // inboxFilter remains current
      };
      savePersistedContext({ ...state, ...newState });
      return newState;
    });
  },

  // Event: Service learn more
  evtServiceLearnMore: (serviceId: string) => {
    set({ modal: { type: "service", payload: { serviceId } } });
  },

  // Event: Connect provider
  evtConnectProvider: () => {
    set({ modal: { type: "connect-provider", payload: {} } });
  },

  // Event: Connect wearables
  evtConnectWearables: () => {
    set({ modal: { type: "connect-wearables", payload: {} } });
  },

  // Event: Export click
  evtExportClick: () => {
    set({ modal: { type: "export", payload: {} } });
  },

  // Event: Clear context (cross-page)
  evtClearContext: () => {
    const newState = {
      context: { type: "none" as const },
      contextLabel: "All",
      isDrawerOpen: false,
      inboxFilter: { type: "none" as const, label: "All" },
      highlightTargetId: null,
      selectedServices: [] as string[],
    };
    set(newState);
    savePersistedContext(newState);
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("arc-ui-context");
    }
  },

  // Close modal
  closeModal: () => {
    set({ modal: { type: "none" } });
  },
}));

