"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import CreatePatientModal from "../workbench/CreatePatientModal";
import UrgentReviewModal from "../workbench/UrgentReviewModal";

export default function ClinicalTopBar() {
  const pathname = usePathname();
  const [showCreatePatient, setShowCreatePatient] = useState(false);
  const [showUrgentReview, setShowUrgentReview] = useState(false);

  return (
    <>
      {/* Fixed Top Bar - 56px height */}
      <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">TheArc Clinical Workspace</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCreatePatient(true)}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
          >
            <span>➕</span>
            <span>New patient</span>
          </button>
          <button
            onClick={() => setShowUrgentReview(true)}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
          >
            <span>🚨</span>
            <span>Urgent review</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreatePatientModal
        isOpen={showCreatePatient}
        onClose={() => setShowCreatePatient(false)}
        returnTo={pathname || undefined}
      />
      <UrgentReviewModal
        isOpen={showUrgentReview}
        onClose={() => setShowUrgentReview(false)}
      />
    </>
  );
}



