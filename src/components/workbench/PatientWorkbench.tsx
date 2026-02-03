"use client";

import React, { useState, useEffect } from "react";
import { QueueItem, logAuditEvent } from "@/lib/workbenchTypes";
import WorkbenchHeader from "./WorkbenchHeader";
import DecisionContextPanel from "./DecisionContextPanel";
import ActionsPanel from "./ActionsPanel";
import WorkbenchFooter from "./WorkbenchFooter";
import {
  CallModal,
  MessageModal,
  ScheduleModal,
  TaskModal,
  DelegateModal,
  ResolveModal,
  SnoozeModal,
  EscalateModal,
} from "./ActionModals";

interface PatientWorkbenchProps {
  queueItem: QueueItem;
  onClose: () => void;
  onResolve: (queueItemId: string) => void;
  onSnooze: (queueItemId: string, until: string, reason: string) => void;
  onEscalate: (queueItemId: string, reason: string) => void;
  mode?: "drawer" | "page";
}

export default function PatientWorkbench({
  queueItem,
  onClose,
  onResolve,
  onSnooze,
  onEscalate,
  mode = "drawer",
}: PatientWorkbenchProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [whyHere, setWhyHere] = useState(queueItem.whyHere);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeModal) {
          setActiveModal(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeModal, onClose]);

  const handleResolve = (data: { note?: string }) => {
    onResolve(queueItem.id);
    setShowUndoToast(true);
    setTimeout(() => setShowUndoToast(false), 5000);
    setActiveModal(null);
  };

  const handleSnooze = (data: { snoozeUntil: string; reason: string }) => {
    onSnooze(queueItem.id, data.snoozeUntil, data.reason);
    setActiveModal(null);
  };

  const handleEscalate = (data: { reason: string }) => {
    onEscalate(queueItem.id, data.reason);
    setActiveModal(null);
  };

  const handleActionClick = (actionType: string, actionId?: string) => {
    setActiveModal(actionType);
  };

  return (
    <div
      className={`h-full flex flex-col bg-white ${
        mode === "page" ? "max-w-[960px] mx-auto" : ""
      }`}
      style={{
        height: mode === "drawer" ? "calc(100vh - 56px)" : "100%",
        overflow: "hidden",
      }}
    >
      {/* Header - Fixed/Sticky */}
      <WorkbenchHeader queueItem={queueItem} onClose={onClose} />

      {/* Body - Scrollable, 2-column grid */}
      <div className="flex-1 overflow-hidden flex" style={{ minHeight: 0, flex: "1 1 auto" }}>
        {/* Left Panel - Decision Context (60%) */}
        <div className="flex-shrink-0" style={{ width: "60%", flex: "0 0 60%" }}>
          <DecisionContextPanel
            queueItem={{ ...queueItem, whyHere }}
            onWhyHereChange={setWhyHere}
          />
        </div>

        {/* Right Panel - Actions (40%) */}
        <div className="flex-shrink-0" style={{ width: "40%", flex: "0 0 40%" }}>
          <ActionsPanel queueItem={queueItem} onActionClick={handleActionClick} />
        </div>
      </div>

      {/* Footer - Fixed/Sticky */}
      <WorkbenchFooter
        onResolve={() => setActiveModal("resolve")}
        onSnooze={() => setActiveModal("snooze")}
        onEscalate={() => setActiveModal("escalate")}
      />

      {/* Modals */}
      {activeModal === "call" && (
        <CallModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={(data) => {
            setActiveModal(null);
          }}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}
      {activeModal === "message" && (
        <MessageModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={(data) => {
            setActiveModal(null);
          }}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}
      {activeModal === "schedule" && (
        <ScheduleModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={(data) => {
            setActiveModal(null);
          }}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}
      {activeModal === "task" && (
        <TaskModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={(data) => {
            setActiveModal(null);
          }}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}
      {activeModal === "delegate" && (
        <DelegateModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={(data) => {
            setActiveModal(null);
          }}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}
      {activeModal === "resolve" && (
        <ResolveModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={handleResolve}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
          patientName={queueItem.patient.name}
        />
      )}
      {activeModal === "snooze" && (
        <SnoozeModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={handleSnooze}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}
      {activeModal === "escalate" && (
        <EscalateModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSubmit={handleEscalate}
          queueItemId={queueItem.id}
          patientId={queueItem.patient.id}
        />
      )}

      {/* Undo Toast */}
      {showUndoToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg z-50 w-[280px]">
          <div className="flex items-center justify-between">
            <span className="text-sm">Trigger resolved</span>
            <button
              onClick={() => {
                setShowUndoToast(false);
                // Undo logic would restore the queue item
              }}
              className="text-sm text-blue-400 hover:text-blue-300 underline ml-4"
            >
              Undo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
