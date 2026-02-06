"use client";

import React from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import UploadModal from "./modals/UploadModal";
import ConnectProviderModal from "./modals/ConnectProviderModal";
import ConnectWearablesModal from "./modals/ConnectWearablesModal";
import GapModal from "./modals/GapModal";
import SignalModal from "./modals/SignalModal";
import ReminderModal from "./modals/ReminderModal";
import ServiceModal from "./modals/ServiceModal";
import ExportModal from "./modals/ExportModal";
import EditDocumentModal from "./modals/EditDocumentModal";
import LinkGapModal from "./modals/LinkGapModal";
import dashboardData from "@/mock/dashboard.json";
import documentsData from "@/mock/documents.json";

export default function GlobalModals() {
  const { modal, closeModal } = useCommandCenterStore();

  // Get signal/gap/service data from dashboard data
  const selectedSignal =
    modal.type === "signal" && modal.payload?.signalId
      ? (dashboardData.signals || []).find((s: any) => s.id === modal.payload.signalId) || null
      : null;

  const selectedGap =
    modal.type === "gap" && modal.payload?.gapId
      ? (dashboardData.gaps || []).find((g: any) => g.id === modal.payload.gapId) || null
      : null;

  const selectedService =
    modal.type === "service" && modal.payload?.serviceId
      ? (dashboardData.services || []).find((s: any) => s.id === modal.payload.serviceId) || null
      : null;

  return (
    <>
      <UploadModal
        isOpen={modal.type === "upload"}
        onClose={closeModal}
        gapId={modal.payload?.gapId}
      />

      <ConnectProviderModal isOpen={modal.type === "connect-provider"} onClose={closeModal} />

      <ConnectWearablesModal isOpen={modal.type === "connect-wearables"} onClose={closeModal} />

      <GapModal
        gap={selectedGap}
        onClose={closeModal}
        onUpload={() => {
          closeModal();
          useCommandCenterStore.getState().evtAddDataClick();
        }}
        onSetReminder={() => {
          closeModal();
          useCommandCenterStore.getState().evtActionSetReminder(
            selectedGap?.id || "",
            selectedGap?.title || "",
            "Monthly"
          );
        }}
        onViewServices={() => {
          closeModal();
          window.location.href = "/demo/marketplace";
        }}
      />

      <SignalModal signal={selectedSignal} onClose={closeModal} />

      <ReminderModal
        isOpen={modal.type === "reminder"}
        onClose={closeModal}
        initialData={modal.payload}
      />

      <ServiceModal
        service={selectedService}
        onClose={closeModal}
        onSelect={() => {
          if (selectedService) {
            useCommandCenterStore.getState().evtServiceSelect(selectedService.id);
          }
        }}
      />

      <ExportModal
        isOpen={modal.type === "export"}
        onClose={closeModal}
        selectedCount={0}
        totalCount={documentsData.documents?.length || 0}
      />

      <EditDocumentModal
        isOpen={modal.type === "edit-document"}
        documentId={modal.payload?.documentId || null}
        onClose={closeModal}
        onSave={(document) => {
          // TODO: Save document changes
          console.log("Save document:", document);
        }}
      />

      <LinkGapModal
        isOpen={modal.type === "link-gap"}
        documentId={modal.payload?.documentId || null}
        onClose={closeModal}
        onLink={(gapId) => {
          // TODO: Link document to gap
          console.log("Link document to gap:", gapId);
        }}
      />
    </>
  );
}

