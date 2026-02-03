"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createPatient,
  createQueueItem,
  searchSimilarPatients,
  getPatient,
  PossibleDuplicate,
  UrgencyLevel,
  Sex,
} from "@/lib/patientTypes";
import CreatePatientModal from "./CreatePatientModal";

interface UrgentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UrgentReviewModal({ isOpen, onClose }: UrgentReviewModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PossibleDuplicate[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel>("today");
  const [showCreatePatient, setShowCreatePatient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPatientId, setNewPatientId] = useState<string | null>(null);

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

  const handleSearch = () => {
    if (searchQuery.length >= 2) {
      const results = searchSimilarPatients(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert("Reason is required");
      return;
    }

    if (!selectedPatientId && !showCreatePatient) {
      alert("Please select a patient or create a new one");
      return;
    }

    setIsSubmitting(true);

    try {
      let patientId = selectedPatientId;

      // If creating new patient inline
      if (showCreatePatient && !selectedPatientId) {
        // This will be handled by CreatePatientModal
        // For now, create a minimal patient
        const patient = createPatient({
          fullName: "Unknown",
          sex: "unknown",
          createdFrom: "urgent_review",
        });
        patientId = patient.id;
      }

      if (patientId) {
        // Get patient (in production, fetch from store)
        const patient = getPatient(patientId);
        if (!patient) {
          alert("Patient not found");
          return;
        }

        // Create queue item
        const queueItem = createQueueItem({
          patientId,
          patientName: patient.fullName,
          age: patient.dob ? calculateAge(patient.dob) : undefined,
          sex: patient.sex,
          whyNow: reason,
          category: "manual",
          urgency,
          riskLevel: "medium",
        });

        // Show success toast (in production)
        alert("Added to queue");

        onClose();
        // Optionally open workbench drawer for the created item
      }
    } catch (error) {
      console.error("Error creating urgent review:", error);
      alert("Failed to create urgent review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Urgent Review</h2>
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
            {/* Search Existing Patients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Existing Patients
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Name, DOB, or ID"
                  className="flex-1 h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => setSelectedPatientId(result.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPatientId === result.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">{result.fullName}</div>
                      <div className="text-xs text-gray-500">
                        {result.dob ? `DOB: ${result.dob}` : "DOB: Unknown"} • {result.sex}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="mt-2 text-sm text-gray-500">No patient found</div>
              )}
            </div>

            {/* Create New Patient Option */}
            {(!selectedPatientId || searchResults.length === 0) && (
              <div>
                <button
                  onClick={() => setShowCreatePatient(true)}
                  className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Create new patient
                </button>
              </div>
            )}

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why does this patient need urgent review? (max 140 chars)"
                maxLength={140}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
              <div className="text-xs text-gray-500 mt-1">{reason.length}/140</div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <div className="flex gap-2">
                {(["today", "soon", "monitor"] as UrgencyLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setUrgency(level)}
                    className={`flex-1 h-10 px-3 rounded-lg border text-sm font-medium transition-colors ${
                      urgency === level
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !reason.trim() || (!selectedPatientId && !showCreatePatient)}
                className="flex-1 h-10 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Adding..." : "Add to Queue"}
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

      {/* Create Patient Modal (nested) */}
      {showCreatePatient && (
        <CreatePatientModal
          isOpen={showCreatePatient}
          onClose={() => {
            setShowCreatePatient(false);
            // If patient was created, set it as selected
            // In production, this would be handled via callback or state management
          }}
          isUrgent={true}
        />
      )}
    </>
  );
}

