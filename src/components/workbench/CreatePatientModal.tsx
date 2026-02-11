"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Patient,
  Sex,
  createPatient,
  createVisit1,
  createQueueItem,
  searchSimilarPatients,
  PossibleDuplicate,
  logAuditEvent,
} from "@/lib/patientTypes";

interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillName?: string;
  isUrgent?: boolean;
  returnTo?: string;
}

type DuplicateOverrideReason =
  | "confirmed_different"
  | "dob_unknown"
  | "patient_requested_new"
  | "other";

export default function CreatePatientModal({
  isOpen,
  onClose,
  prefillName = "",
  isUrgent = false,
  returnTo,
}: CreatePatientModalProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(prefillName);
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState<Sex>("unknown");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [possibleDuplicates, setPossibleDuplicates] = useState<PossibleDuplicate[]>([]);
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [duplicateOverrideReason, setDuplicateOverrideReason] = useState<DuplicateOverrideReason | "">("");
  const [showOverrideReason, setShowOverrideReason] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFullName(prefillName);
      setDob("");
      setSex("unknown");
      setPhone("");
      setEmail("");
      setPossibleDuplicates([]);
      setShowDuplicates(false);
      setDuplicateOverrideReason("");
      setShowOverrideReason(false);
    }
  }, [isOpen, prefillName]);

  // Search for duplicates as user types
  useEffect(() => {
    if (fullName.length >= 3) {
      const matches = searchSimilarPatients(fullName, dob || undefined);
      setPossibleDuplicates(matches);
      setShowDuplicates(matches.length > 0);

      if (matches.length > 0) {
        logAuditEvent({
          eventType: "patient.possible_duplicate_warning_shown",
          actorId: "doctor_1",
          entityId: "",
          metadata: { name: fullName, dob, matchCount: matches.length },
        });
      }
    } else {
      setPossibleDuplicates([]);
      setShowDuplicates(false);
    }
  }, [fullName, dob]);

  const handleCreateAndStartVisit = async () => {
    if (!fullName.trim() && !isUrgent) {
      alert("Full name is required");
      return;
    }

    if (possibleDuplicates.length > 0 && !duplicateOverrideReason && !showOverrideReason) {
      setShowOverrideReason(true);
      return;
    }

    setIsCreating(true);

    try {
      // Create patient
      const patient = createPatient({
        fullName: fullName.trim() || "Unknown",
        dob: dob || undefined,
        sex,
        phone: phone || undefined,
        email: email || undefined,
        createdFrom: isUrgent ? "urgent_review" : prefillName ? "search_create" : "new_patient",
      });

      // Create Visit 1
      const visit = createVisit1(patient.id);

      // Create queue item for visit
      createQueueItem({
        patientId: patient.id,
        patientName: patient.fullName,
        age: patient.dob ? calculateAge(patient.dob) : undefined,
        sex: patient.sex,
        whyNow: "First visit intake started — needs completion",
        category: "visit",
        urgency: "today", // Could be dynamic based on appointment date
        linkedVisitId: visit.id,
      });

      // Log override reason if provided
      if (duplicateOverrideReason) {
        logAuditEvent({
          eventType: "patient.duplicate_override_reason_selected",
          actorId: "doctor_1",
          entityId: patient.id,
          metadata: { reason: duplicateOverrideReason },
        });
      }

      // Navigate to intake
      const intakePath = `/cabinet/patients/${patient.id}/visits/visit-1/intake`;
      if (returnTo) {
        router.push(`${intakePath}?returnTo=${encodeURIComponent(returnTo)}`);
      } else {
        router.push(intakePath);
      }

      onClose();
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateOnly = async () => {
    if (!fullName.trim() && !isUrgent) {
      alert("Full name is required");
      return;
    }

    if (possibleDuplicates.length > 0 && !duplicateOverrideReason && !showOverrideReason) {
      setShowOverrideReason(true);
      return;
    }

    setIsCreating(true);

    try {
      const patient = createPatient({
        fullName: fullName.trim() || "Unknown",
        dob: dob || undefined,
        sex,
        phone: phone || undefined,
        email: email || undefined,
        createdFrom: isUrgent ? "urgent_review" : prefillName ? "search_create" : "new_patient",
      });

      if (duplicateOverrideReason) {
        logAuditEvent({
          eventType: "patient.duplicate_override_reason_selected",
          actorId: "doctor_1",
          entityId: patient.id,
          metadata: { reason: duplicateOverrideReason },
        });
      }

      onClose();
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenExisting = (patientId: string) => {
    // In production, this would open the patient workbench or patient page
    router.push(`/cabinet/patients/${patientId}`);
    onClose();
  };

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isUrgent ? "Create Patient (Urgent)" : "New Patient"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name {!isUrgent && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!isUrgent}
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth {isUrgent && <span className="text-gray-400 text-xs">(optional)</span>}
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="unknown">Unknown</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
              <option value="X">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@example.com"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Possible Duplicates */}
          {showDuplicates && possibleDuplicates.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-yellow-800">Possible Matches</h3>
                <button
                  onClick={() => setShowDuplicates(false)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                {possibleDuplicates.map((dup) => (
                  <div
                    key={dup.id}
                    className="bg-white border border-yellow-200 rounded p-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">{dup.fullName}</div>
                      <div className="text-xs text-gray-500">
                        {dup.dob ? `DOB: ${dup.dob}` : "DOB: Unknown"} • {dup.sex}
                        {dup.lastVisit && ` • Last visit: ${new Date(dup.lastVisit).toLocaleDateString()}`}
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenExisting(dup.id)}
                      className="ml-4 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Open existing
                    </button>
                  </div>
                ))}
              </div>

              {showOverrideReason && (
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for creating new record:
                  </label>
                  <select
                    value={duplicateOverrideReason}
                    onChange={(e) =>
                      setDuplicateOverrideReason(e.target.value as DuplicateOverrideReason)
                    }
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select reason</option>
                    <option value="confirmed_different">Confirmed different person</option>
                    <option value="dob_unknown">DOB unknown / missing</option>
                    <option value="patient_requested_new">Patient requested new record</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleCreateAndStartVisit}
              disabled={isCreating || (!fullName.trim() && !isUrgent)}
              className="flex-1 h-10 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? "Creating..." : "Create & Start Visit 1"}
            </button>
            <button
              onClick={handleCreateOnly}
              disabled={isCreating || (!fullName.trim() && !isUrgent)}
              className="px-4 h-10 border border-gray-300 text-gray-700 bg-white text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create only
            </button>
            <button
              onClick={onClose}
              className="px-4 h-10 border border-gray-300 text-gray-700 bg-white text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




